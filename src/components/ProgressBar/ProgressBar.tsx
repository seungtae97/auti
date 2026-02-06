import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    // Percentage for accessibility or advanced fluid animation if needed
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
