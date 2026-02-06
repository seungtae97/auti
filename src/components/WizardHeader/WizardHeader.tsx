import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TestStageIndicator } from '../TestStageIndicator/TestStageIndicator';
import './WizardHeader.css';

interface WizardHeaderProps {
    title: string;
    currentStage: 1 | 2 | 3;
    onBack?: () => void;
    showBackBtn?: boolean;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
    title,
    currentStage,
    onBack,
    showBackBtn = true
}) => {
    return (
        <div className="wizard-header-unified">
            <div className="header-top-row">
                <div className="header-left-area">
                    {showBackBtn && onBack && (
                        <button className="wizard-back-btn" onClick={onBack}>
                            <ChevronLeft size={24} />
                        </button>
                    )}
                </div>

                <div className="header-center-area">
                    <h1 className="header-title">{title}</h1>
                </div>

                <div className="header-right-area"></div> {/* Spacer for center alignment */}
            </div>
            <TestStageIndicator currentStage={currentStage} />
        </div>
    );
};
