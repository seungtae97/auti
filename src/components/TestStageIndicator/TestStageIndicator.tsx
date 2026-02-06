import React from 'react';
import './TestStageIndicator.css';

interface TestStageIndicatorProps {
    currentStage: 1 | 2 | 3;
}

export const TestStageIndicator: React.FC<TestStageIndicatorProps> = ({ currentStage }) => {
    const stages = [
        { id: 1, label: '사전설문' },
        { id: 2, label: '가이드' },
        { id: 3, label: '촬영' }
    ];

    return (
        <div className="stage-indicator-container">
            {stages.map((stage, index) => {
                const isActive = stage.id === currentStage;
                const isCompleted = stage.id < currentStage;

                return (
                    <div key={stage.id} className={`stage-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                        <div className="stage-circle">
                            {isCompleted ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <span>{stage.id}</span>
                            )}
                        </div>
                        <span className="stage-label">{stage.label}</span>
                        {index < stages.length - 1 && (
                            <div className="stage-connector-wrapper">
                                <div className={`stage-connector ${stage.id < currentStage ? 'filled' : ''}`} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
