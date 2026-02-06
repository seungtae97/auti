import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { TestStageIndicator } from '../../../components/TestStageIndicator/TestStageIndicator';
import { RotateCcw, CheckCircle } from 'lucide-react';
import './RecordingPage.css';

const RecordingPage: React.FC = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // States: 'idle' | 'recording' | 'review'
    const [status, setStatus] = useState<'idle' | 'recording' | 'review'>('idle');
    const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds limit
    // const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]); // Generated but unused
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [permissionError, setPermissionError] = useState<boolean>(false);

    // Camera Access
    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        setPermissionError(false);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }, // Rear camera preferred
                audio: true
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Camera access error:", err);
            setPermissionError(true);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    // Recording Logic
    const startRecording = () => {
        if (!stream) return;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            // setRecordedChunks(chunks);
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
            setStatus('review');
        };

        mediaRecorder.start();
        setStatus('recording');
        setTimeLeft(60); // Reset timer
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && status === 'recording') {
            mediaRecorderRef.current.stop();
            // setStatus('review') is handled in onstop event
        }
    };

    const handleRetry = () => {
        setStatus('idle');
        setVideoUrl(null);
        // setRecordedChunks([]);
        startCamera(); // Restart camera stream
    };

    const handleConfirm = () => {
        // Navigate to results page with data (mock for now)
        // In real app, upload blob here
        stopCamera();
        navigate('/test/result');
    };

    // Timer Logic
    useEffect(() => {
        let interval: any;
        if (status === 'recording' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (status === 'recording' && timeLeft === 0) {
            stopRecording();
        }
        return () => clearInterval(interval);
    }, [status, timeLeft]);

    return (
        <div className="recording-page">
            <TestStageIndicator currentStage={3} /> {/* Recording Phase Progress */}

            {/* Camera Viewport */}
            <div className="camera-viewport">
                {permissionError ? (
                    <div className="error-overlay">
                        <p>카메라 접근 권한이 필요합니다.<br />브라우저 설정에서 권한을 허용해주세요.</p>
                        <Button onClick={startCamera} size="sm" variant="outline" className="mt-4">
                            다시 시도
                        </Button>
                    </div>
                ) : status === 'review' && videoUrl ? (
                    <video src={videoUrl} controls className="video-preview" playsInline />
                ) : (
                    <video ref={videoRef} autoPlay playsInline muted className="video-preview" />
                )}

                {/* Guidelines Overlay */}
                {status === 'idle' && !permissionError && (
                    <div className="guide-overlay">
                        <div className="guide-frame" />
                        <p className="guide-text">아이의 전신이 화면에 들어오게 비춰주세요</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="controls-panel">
                {/* Timer Display */}
                {!permissionError && status === 'recording' && (
                    <div className="timer-badge">
                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                    {status === 'idle' && (
                        <div className="record-btn-outer" onClick={startRecording}>
                            <div className="record-btn-inner" />
                        </div>
                    )}

                    {status === 'recording' && (
                        <div className="record-btn-outer recording" onClick={stopRecording}>
                            <div className="record-btn-inner" />
                        </div>
                    )}

                    {status === 'review' && (
                        <>
                            <button className="secondary-btn" onClick={handleRetry}>
                                <RotateCcw size={24} />
                            </button>
                            <Button
                                size="lg"
                                className="confirm-btn"
                                onClick={handleConfirm}
                                disabled={false}
                            >
                                <CheckCircle size={20} className="mr-2" />
                                제출하기
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecordingPage;
