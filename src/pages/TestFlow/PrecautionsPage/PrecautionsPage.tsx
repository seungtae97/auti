import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { WizardHeader } from '../../../components/WizardHeader/WizardHeader';
import { AlertTriangle, Ban, AlertCircle, CheckCircle2 } from 'lucide-react';
import './PrecautionsPage.css';

const PrecautionsPage: React.FC = () => {
    const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false);
    const [showError, setShowError] = useState(false);

    return (
        <div className="precautions-container">
            <WizardHeader
                title="검사 가이드"
                currentStage={2}
                onBack={() => navigate('/test/setup')}
            />

            <div className="precautions-content">
                <div className="header-icon-wrapper">
                    <AlertTriangle size={40} className="header-icon" />
                </div>
                <h1 className="page-title text-center">검사 전 꼭 확인해주세요!</h1>
                <p className="page-subtitle text-center">정확한 결과를 위해 양육자의 협조가 필요합니다.</p>

                {/* Section 1: General Precautions */}
                <section className="precaution-section">
                    <h2 className="section-header">
                        <AlertCircle size={20} className="section-icon" />
                        검사 진행 수칙
                    </h2>
                    <div className="card-box warning-bg">
                        <div className="rule-item">
                            <span className="bullet">1</span>
                            <p>검사 도중 <b>가이드에 없는 말이나 신체 접촉</b>은 피해주세요.</p>
                        </div>
                        <div className="rule-item">
                            <span className="bullet">2</span>
                            <p>아이가 울거나 너무 산만한 경우, <b>검사를 일시 중단</b>하고 안정이 되면 다시 시작해주세요.</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Prohibited Expressions */}
                <section className="precaution-section">
                    <h2 className="section-header error-text">
                        <Ban size={20} className="section-icon" />
                        절대 하면 안 되는 말 (금지어)
                    </h2>
                    <div className="card-box error-bg">
                        <p className="dont-desc">아이의 반응을 유도하는 말은 결과를 왜곡시킵니다.</p>
                        <ul className="banned-list">
                            <li>"OO아, 여기 봐!" ❌</li>
                            <li>"엄마 봐야지~" ❌</li>
                            <li>"집중해!" ❌</li>
                        </ul>
                    </div>
                </section>

                {/* Confirmation Toggle */}
                <div
                    className={`confirmation-wrapper ${confirmed ? 'active' : ''} ${showError ? 'shake-animation' : ''}`}
                    onClick={() => {
                        setConfirmed(!confirmed);
                        if (showError) setShowError(false);
                    }}
                >
                    <div className={`check-circle ${confirmed ? 'active' : ''}`}>
                        {confirmed && <CheckCircle2 size={16} color="white" />}
                    </div>
                    <span>위 주의사항을 모두 확인하였으며,<br />검사를 진행합니다.</span>
                </div>
            </div>

            <div className="precautions-footer">
                <Button
                    fullWidth
                    size="lg"
                    onClick={() => {
                        if (!confirmed) {
                            setShowError(true);
                            setTimeout(() => setShowError(false), 500); // Reset animation
                            return;
                        }
                        navigate('/test/recording');
                    }}
                >
                    확인했습니다 (다음)
                </Button>
            </div>
        </div>
    );
};

export default PrecautionsPage;
