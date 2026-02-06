import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { WizardHeader } from '../../../components/WizardHeader/WizardHeader';
import { Check, Armchair, Baby, Smartphone, Box, VolumeX, Eye } from 'lucide-react';
import './SetupPage.css';

const SetupPage: React.FC = () => {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false]);

    const handleCheck = (index: number) => {
        const newItems = [...checkedItems];
        newItems[index] = !newItems[index];
        setCheckedItems(newItems);
    };

    const allChecked = checkedItems.every(Boolean);

    return (
        <div className="setup-container">
            <WizardHeader
                title="검사 준비"
                currentStage={2}
                onBack={() => navigate('/test/risk-factor')}
            />

            <div className="setup-content">
                <h1 className="page-title">검사 준비 가이드</h1>
                <p className="page-subtitle">정확한 검사를 위해 아래 3단계를 준비해주세요.</p>

                {/* Step 1: Preparation Items */}
                <section className="guide-section">
                    <div className="section-header-row">
                        <span className="step-badge">STEP 1</span>
                        <h2 className="section-title">준비물 및 환경</h2>
                    </div>
                    <div className="guide-card">
                        <ul className="guide-list">
                            <li><Box size={20} className="icon" /> 적당한 공간 (좁은 방, 차량 ❌)</li>
                            <li><VolumeX size={20} className="icon" /> 조용한 환경 (TV, 소음 ❌)</li>
                            <li><Armchair size={20} className="icon" /> 아이 고정 의자 (식탁의자, 카시트)</li>
                            <li><Baby size={20} className="icon" /> 아이가 좋아하는 놀잇감 (적응용)</li>
                            <li><Eye size={20} className="icon" /> 양육자용 의자 (눈높이 맞춤)</li>
                        </ul>
                    </div>
                </section>

                {/* Step 2: Environment Setup */}
                <section className="guide-section">
                    <div className="section-header-row">
                        <span className="step-badge">STEP 2</span>
                        <h2 className="section-title">환경 설정 방법</h2>
                    </div>
                    <div className="guide-card info-bg">
                        <div className="step-row">
                            <span className="num">1</span>
                            <p>아이를 고정된 의자에 앉히고, <b>양 옆 1m 공간</b>을 확보해주세요.</p>
                        </div>
                        <div className="step-row">
                            <span className="num">2</span>
                            <p>아이가 앉으려 하지 않으면 <b>놀잇감으로 적응</b> 시킨 후 치워주세요.</p>
                        </div>
                        <div className="step-row">
                            <span className="num">3</span>
                            <p>양육자는 아이와 <b>정면 1m 거리</b>에서 마주 앉습니다.</p>
                        </div>
                    </div>
                </section>

                {/* Step 3: Camera Position */}
                <section className="guide-section">
                    <div className="section-header-row">
                        <span className="step-badge">STEP 3</span>
                        <h2 className="section-title">휴대폰 위치</h2>
                    </div>
                    <div className="guide-card camera-bg">
                        <div className="cam-guide-row">
                            <Smartphone size={32} className="cam-icon" />
                            <div className="cam-text">
                                <strong>세로 모드 촬영</strong>
                                <p>카메라를 양육자의 목 위치에 고정해주세요.</p>
                            </div>
                        </div>
                        <div className="cam-check-list">
                            <p>✓ 아이의 얼굴과 상반신이 정면에서 잘 보여야 합니다.</p>
                            <p>✓ 휴대폰이 흔들리지 않도록 고정해주세요.</p>
                        </div>
                    </div>
                </section>

                {/* Confirmation Checklist */}
                <section className="confirmation-section">
                    <h3>준비가 완료되셨나요?</h3>
                    <div className="check-group">
                        <div className={`check-item ${checkedItems[0] ? 'checked' : ''}`} onClick={() => handleCheck(0)}>
                            <div className="check-box">{checkedItems[0] && <Check size={14} color="white" />}</div>
                            <span>준비물 및 조용한 환경 확보</span>
                        </div>
                        <div className={`check-item ${checkedItems[1] ? 'checked' : ''}`} onClick={() => handleCheck(1)}>
                            <div className="check-box">{checkedItems[1] && <Check size={14} color="white" />}</div>
                            <span>아이와 양육자 자리 배치 완료</span>
                        </div>
                        <div className={`check-item ${checkedItems[2] ? 'checked' : ''}`} onClick={() => handleCheck(2)}>
                            <div className="check-box">{checkedItems[2] && <Check size={14} color="white" />}</div>
                            <span>카메라 위치 및 각도 설정 완료</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="setup-footer">
                <Button
                    fullWidth
                    size="lg"
                    disabled={!allChecked}
                    onClick={() => navigate('/test/precautions')}
                >
                    설정 확인 완료 (다음)
                </Button>
            </div>
        </div>
    );
};

export default SetupPage;
