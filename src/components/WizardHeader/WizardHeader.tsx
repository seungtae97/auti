import React from 'react';
import { ChevronLeft } from 'lucide-react';
import './WizardHeader.css';

interface WizardHeaderProps {
    title: string;
    currentStage: 1 | 2 | 3;
    totalStages?: number;
    onBack?: () => void;
    showBackBtn?: boolean;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
    title,
    currentStage,
    totalStages = 3,
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

                <div className="header-right-area">
                    <span className="step-indicator">
                        <span className="step-current">{currentStage}</span>
                        <span className="step-divider">/</span>
                        <span className="step-total">{totalStages}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};
