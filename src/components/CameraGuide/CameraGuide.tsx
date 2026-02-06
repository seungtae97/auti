import React from 'react';
import './CameraGuide.css';

interface CameraGuideProps {
    step: number; // 1 to 5 (mapped to 5/8 to 9/8 in flow)
    opacity?: number;
}

export const CameraGuide: React.FC<CameraGuideProps> = ({ step, opacity = 0.5 }) => {
    const getGuideContent = () => {
        switch (step) {
            case 1: // 정면 얼굴
                return (
                    <div className="guide-shape face-guide">
                        <div className="guide-box dashed-border">
                            <span className="guide-label">얼굴을 이 안에 맞춰주세요</span>
                        </div>
                        <div className="guide-silhouette face-silhouette"></div>
                    </div>
                );
            case 2: // 손 동작
                return (
                    <div className="guide-shape hand-guide">
                        <div className="guide-box dashed-border wide">
                            <span className="guide-label">양손이 보이도록 해주세요</span>
                        </div>
                    </div>
                );
            case 3: // 전신
                return (
                    <div className="guide-shape body-guide">
                        <div className="guide-silhouette full-body-silhouette"></div>
                        <span className="guide-label">전신이 나오도록 해주세요</span>
                    </div>
                );
            default:
                return (
                    <div className="guide-shape default-guide">
                        <div className="guide-box dashed-border"></div>
                        <span className="guide-label">화면 중앙에 맞춰주세요</span>
                    </div>
                );
        }
    };

    return (
        <div className="camera-guide-overlay" style={{ opacity }}>
            {getGuideContent()}
        </div>
    );
};
