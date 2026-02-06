import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    // 접근성이나 고급 유동 애니메이션을 위한 퍼센트 계산 (필요 시 사용)
    // const percentage = Math.min((currentStep / totalSteps) * 100, 100);

    return (
        <div className="progress-container">
            <div className="progress-info">
                <span className="step-label">진행 상황</span>
                <span className="step-fraction">
                    <span className="current">{currentStep}</span>
                    <span className="total">/{totalSteps}</span>
                </span>
            </div>

            <div className="segmented-track">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNum = index + 1;
                    let statusClass = '';
                    if (stepNum < currentStep) statusClass = 'completed';
                    else if (stepNum === currentStep) statusClass = 'current';

                    return (
                        <div key={index} className={`segment ${statusClass}`} />
                    );
                })}
            </div>
        </div>
    );
};
