import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from '../../../components/Button/Button'; // Unused
import { WizardHeader } from '../../../components/WizardHeader/WizardHeader';
// import { Card } from '../../../components/Card/Card';
import './RiskFactorPage.css';

interface RiskAnswers {
    q6?: 'yes' | 'no';
    q7?: number; // Weeks
    q8?: 'under_34' | 'over_35';
    q9?: 'under_39' | 'over_40';
    q10?: 'yes' | 'no';
    q11?: 'under_12' | 'over_13' | 'na';
    q12?: 'under_12' | 'over_13' | 'na';
    q13?: 'yes' | 'no';
}

const RiskFactorPage: React.FC = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<RiskAnswers>({});
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Define all steps in an array
    const steps = [
        { id: 'q6', type: 'yesno', question: "임신 중 자가면역질환(당뇨, 고혈압 등)이 있었나요?", stepTitle: "임신 및 출산 정보" },
        { id: 'q7', type: 'counter', question: "출산 시 임신 주수는?", stepTitle: "임신 및 출산 정보", min: 20, max: 50, unit: "주" },
        {
            id: 'q8', type: 'choice', question: "출산 시 엄마의 나이", stepTitle: "부모님 연령", options: [
                { value: 'under_34', label: "만 34세 이하 (권장 시기)" },
                { value: 'over_35', label: "만 35세 이상 (고령 산모)" }
            ]
        },
        {
            id: 'q9', type: 'choice', question: "출산 시 아빠의 나이", stepTitle: "부모님 연령", options: [
                { value: 'under_39', label: "만 39세 이하" },
                { value: 'over_40', label: "만 40세 이상" }
            ]
        },
        { id: 'q10', type: 'yesno', question: "생후 6개월 경 낯가림이 있었나요?", stepTitle: "발달 및 가족력" },
        {
            id: 'q11', type: 'choice', question: "첫 걸음마(보행) 시기", stepTitle: "발달 및 가족력", options: [
                { value: 'under_12', label: "돌 이전 (12개월 미만/전후)" },
                { value: 'over_13', label: "13~15개월 이후" },
                { value: 'na', label: "아직 못함" }
            ]
        },
        {
            id: 'q12', type: 'choice', question: "첫 말문 트인 시기 (\"엄마\" 등 의미있는 단어)", stepTitle: "발달 및 가족력", options: [
                { value: 'under_12', label: "돌 이전 (12개월 미만/전후)" },
                { value: 'over_13', label: "13개월 이후" },
                { value: 'na', label: "아직 못함" }
            ]
        },
        { id: 'q13', type: 'yesno', question: "형제/자매 중 자폐 스펙트럼이 있나요?", stepTitle: "발달 및 가족력" }
    ];

    const currentStep = steps[currentStepIndex];

    const handleAnswer = (key: keyof RiskAnswers, value: any) => {
        setAnswers(prev => ({ ...prev, [key]: value }));

        // Auto-advance logic for yes/no and choice
        if (currentStep.type === 'yesno' || currentStep.type === 'choice') {
            setTimeout(() => {
                handleNextStep();
            }, 300);
        }
    };

    // Helper for number increment/decrement - REMOVED (Replaced by Grid)
    // const adjustNumber = (key: 'q7', delta: number, min: number, max: number) => { ... }

    // For counter, manual next
    const handleNextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            // Finish
            finishRiskAssessment();
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else {
            navigate('/home');
        }
    };

    const calculateScore = () => {
        let score = 0;
        if (answers.q6 === 'yes') score += 1;
        if ((answers.q7 || 38) < 37) score += 1;
        if (answers.q8 === 'over_35') score += 1;
        if (answers.q9 === 'over_40') score += 1;
        if (answers.q10 === 'no') score += 1;
        if (answers.q11 === 'over_13' || answers.q11 === 'na') score += 1;
        if (answers.q12 === 'over_13' || answers.q12 === 'na') score += 1;
        if (answers.q13 === 'yes') score += 2;
        return score;
    };

    const finishRiskAssessment = () => {
        const score = calculateScore();
        localStorage.setItem('riskScore', score.toString());
        localStorage.setItem('riskAnswers', JSON.stringify(answers));
        navigate('/test/setup');
    }

    const handleWeekSelect = (week: number) => {
        handleAnswer('q7', week);
        // Auto-advance for week selection
        setTimeout(() => {
            handleNextStep();
        }, 300);
    };

    // Render Step Content
    const renderStepContent = () => {
        switch (currentStep.type) {
            case 'yesno':
                return (
                    <div className="wizard-options">
                        <button className={`wizard-option-btn ${answers[currentStep.id as keyof RiskAnswers] === 'yes' ? 'selected' : ''}`} onClick={() => handleAnswer(currentStep.id as keyof RiskAnswers, 'yes')}>
                            <span>예</span>
                            <div className="selection-indicator" />
                        </button>
                        <button className={`wizard-option-btn ${answers[currentStep.id as keyof RiskAnswers] === 'no' ? 'selected' : ''}`} onClick={() => handleAnswer(currentStep.id as keyof RiskAnswers, 'no')}>
                            <span>아니오</span>
                            <div className="selection-indicator" />
                        </button>
                    </div>
                );
            case 'choice':
                return (
                    <div className="wizard-options">
                        {(currentStep as any).options.map((opt: any) => (
                            <button
                                key={opt.value}
                                className={`wizard-option-btn ${answers[currentStep.id as keyof RiskAnswers] === opt.value ? 'selected' : ''}`}
                                onClick={() => handleAnswer(currentStep.id as keyof RiskAnswers, opt.value)}
                            >
                                <span>{opt.label}</span>
                                <div className="selection-indicator" />
                            </button>
                        ))}
                    </div>
                );
            case 'counter':
                // Changed to Button Grid as requested
                const min = (currentStep as any).min;
                const max = (currentStep as any).max;
                const weeks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
                const selectedWeek = answers[currentStep.id as keyof RiskAnswers] as number;

                return (
                    <div className="weeks-grid-container">
                        <div className="weeks-grid">
                            {weeks.map((week) => (
                                <button
                                    key={week}
                                    className={`week-btn ${selectedWeek === week ? 'selected' : ''}`}
                                    onClick={() => handleWeekSelect(week)}
                                >
                                    {week}주
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    // Calculate progress for ProgressBar component
    // currentStepIndex is 0-based, totalSteps is length.
    // We want to show 1 to N.

    return (
        <div className="risk-container">
            {/* Top Navigation */}
            <WizardHeader
                title="상세 설문"
                currentStage={1}
                onBack={handleBack}
            />
            {/* Dot Indicator for current section */}
            <div className="dot-indicator-container">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`dot-indicator ${index <= currentStepIndex ? 'filled' : ''}`}
                    />
                ))}
            </div>

            <div className="risk-content wizard-layout">
                <div className="wizard-question-container">
                    <span className="q-badge">{currentStep.stepTitle}</span>
                    <h1 className="wizard-question-text">{currentStep.question}</h1>
                </div>

                {renderStepContent()}
            </div>
        </div>
    );
};
export default RiskFactorPage;
