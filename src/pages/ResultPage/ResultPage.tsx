import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
// import { BottomNav } from '../../components/BottomNav/BottomNav'; // Unused
import { CheckCircle, AlertTriangle, AlertOctagon, Home, Share2, Download } from 'lucide-react';
import './ResultPage.css';

interface ResultData {
    score: number;
    level: 'low' | 'caution' | 'high';
    title: string;
    description: string;
    color: string;
}

const ResultPage: React.FC = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState<ResultData | null>(null);
    const [displayScore, setDisplayScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [analysisProgress, setAnalysisProgress] = useState(0);

    // Simulate Analysis Process
    useEffect(() => {
        let interval: any;
        if (isAnalyzing) {
            interval = setInterval(() => {
                setAnalysisProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setIsAnalyzing(false), 500); // Wait a bit at 100%
                        return 100;
                    }
                    return prev + 2; // Speed of progress
                });
            }, 30); // Update check interval
        }
        return () => clearInterval(interval);
    }, [isAnalyzing]);

    // Load score from storage once analysis is visualized 'done'
    useEffect(() => {
        if (!isAnalyzing) {
            const storedRiskScore = localStorage.getItem('riskScore');
            const riskScore = storedRiskScore ? Number(storedRiskScore) : 0;
            // Mock random addition
            const finalScore = Math.min(riskScore + Math.floor(Math.random() * 2), 10);
            calculateResult(finalScore);
        }
    }, [isAnalyzing]);

    // Animate score count up
    useEffect(() => {
        if (!result) return;
        const timer = setTimeout(() => {
            setDisplayScore(result.score);
        }, 100);
        return () => clearTimeout(timer);
    }, [result]);

    const calculateResult = (score: number) => {
        let level: ResultData['level'] = 'low';
        let title = '';
        let description = '';
        let color = '';

        if (score <= 1) {
            level = 'low';
            title = '자폐 위험도 낮음';
            description = '아이의 발달 상태가 또래와 비슷하며 안정적입니다. 지금처럼 양육자와의 상호작용을 충분히 유지해주세요.';
            color = '#38C976'; // Success Green
        } else if (score <= 4) {
            level = 'caution';
            title = '전문가 상담 권장 (추적 관찰)';
            description = '일부 영역에서 발달이 조금 느릴 수 있습니다. 가정에서 자극을 주며 3개월 후 다시 검사해보는 것을 권장합니다.';
            color = '#FFD43B'; // Warning Yellow
        } else {
            level = 'high';
            title = '자폐 위험도 높음';
            description = '사회적 상호작용 및 의사소통 영역에서 지연이 관찰됩니다. 빠른 시일 내에 전문기관을 방문하여 정밀 평가를 받아보세요.';
            color = '#FF5D5D'; // Danger Red
        }

        setResult({ score, level, title, description, color });
    };

    const renderIcon = () => {
        if (!result) return null;
        switch (result.level) {
            case 'low': return <CheckCircle size={64} color={result.color} />;
            case 'caution': return <AlertTriangle size={64} color={result.color} />;
            case 'high': return <AlertOctagon size={64} color={result.color} />;
        }
    };

    // Circular Progress Props
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (displayScore / 10) * circumference;

    // --- Loading View Component ---
    if (isAnalyzing) {
        return (
            <div className="analyzing-container">
                <div className="analyzing-content">
                    <div className="pulse-circle">
                        <AlertOctagon size={48} color="#3B82F6" className="analyzing-icon" />
                    </div>
                    <h2 className="analyzing-title">AI가 영상을 분석 중입니다</h2>
                    <p className="analyzing-desc">아이의 표정, 시선, 반응을<br />정밀하게 확인하고 있습니다.</p>

                    <div className="analysis-progress-bar">
                        <div className="analysis-progress-fill" style={{ width: `${analysisProgress}%` }} />
                    </div>
                    <span className="progress-text">{analysisProgress}%</span>

                    <div className="analysis-steps">
                        <div className={`step-item ${analysisProgress > 20 ? 'active' : ''}`}>• 얼굴 검출</div>
                        <div className={`step-item ${analysisProgress > 50 ? 'active' : ''}`}>• 시선 추적</div>
                        <div className={`step-item ${analysisProgress > 80 ? 'active' : ''}`}>• 반응 분석</div>
                    </div>

                    {/* Insight Cards */}
                    <div className="insight-cards-container">
                        <div className={`insight-card ${analysisProgress > 10 ? 'active' : ''}`}>
                            <p className="insight-title">표정 분석</p>
                            <p className="insight-text">아이의 다양한 표정 변화를 감지하여 감정 상태를 파악합니다.</p>
                        </div>
                        <div className={`insight-card ${analysisProgress > 40 ? 'active' : ''}`}>
                            <p className="insight-title">시선 추적</p>
                            <p className="insight-text">양육자와의 눈 맞춤 빈도, 특정 사물에 대한 집중도를 분석합니다.</p>
                        </div>
                        <div className={`insight-card ${analysisProgress > 70 ? 'active' : ''}`}>
                            <p className="insight-title">반응 분석</p>
                            <p className="insight-text">소리나 움직임에 대한 반응 속도와 패턴을 정밀하게 측정합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) return null;

    return (
        <div className="result-container">
            <div className="result-content">
                <header className="result-header">
                    <h1 className="result-page-title">분석 결과</h1>
                    <p className="result-date">2026.02.05 검사</p>
                </header>

                <div className="score-card">
                    {/* Gauge Chart */}
                    <div className="gauge-wrapper">
                        <svg
                            height={radius * 2}
                            width={radius * 2}
                            className="score-gauge"
                        >
                            <circle
                                stroke="#E2E8F0"
                                strokeWidth={stroke}
                                r={normalizedRadius}
                                cx={radius}
                                cy={radius}
                            />
                            <circle
                                stroke={result.color}
                                strokeDasharray={circumference + ' ' + circumference}
                                style={{ strokeDashoffset }}
                                strokeWidth={stroke}
                                strokeLinecap="round"
                                r={normalizedRadius}
                                cx={radius}
                                cy={radius}
                                className="gauge-progress"
                            />
                        </svg>
                        <div className="score-text">
                            <span className="current-score" style={{ color: result.color }}>{displayScore}</span>
                            <span className="max-score">/10</span>
                        </div>
                    </div>

                    <div className="result-info">
                        <div className="result-icon-wrapper" style={{ backgroundColor: `${result.color}15` }}>
                            {renderIcon()}
                        </div>
                        <h2 className="result-title" style={{ color: result.color }}>{result.title}</h2>
                        <p className="result-desc">{result.description}</p>
                    </div>
                </div>

                <div className="action-card">
                    <h3>맞춤형 솔루션</h3>
                    <ul className="guide-list">
                        {result.level === 'low' && (
                            <>
                                <li>✨ <b>상호작용 놀이하기</b>: 아이와 눈을 맞추고 까꿍 놀이를 자주 해주세요.</li>
                                <li>📚 <b>감정 단어 들려주기</b>: "기뻐요", "슬퍼요" 등 감정 표현을 다양하게 해주세요.</li>
                            </>
                        )}
                        {result.level === 'caution' && (
                            <>
                                <li>👀 <b>호명 반응 연습</b>: 아이 이름을 부르고 눈이 마주치면 즉시 보상해주세요.</li>
                                <li>🧩 <b>공동 주의 집중</b>: 손가락으로 물건을 가리키며 아이가 따라보게 유도하세요.</li>
                            </>
                        )}
                        {result.level === 'high' && (
                            <>
                                <li>🏥 <b>전문의 상담</b>: 소아정신과나 발달센터 예약 및 상담을 권장합니다.</li>
                                <li>📝 <b>관찰 일지 작성</b>: 아이의 특이 행동 빈도와 상황을 기록해두세요.</li>
                            </>
                        )}
                    </ul>
                    <div className="action-buttons-row">
                        <Button variant="outline" className="action-btn-sm">
                            <Download size={18} className="mr-2" /> 리포트 저장
                        </Button>
                        <Button variant="outline" className="action-btn-sm">
                            <Share2 size={18} className="mr-2" /> 결과 공유
                        </Button>
                    </div>
                </div>

                <div className="bottom-spacing" />
            </div>

            <div className="fixed-bottom-action">
                <Button
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/home')}
                    className="home-btn"
                >
                    <Home size={20} className="mr-2" />
                    홈으로 돌아가기
                </Button>
            </div>
        </div>
    );
};

export default ResultPage;
