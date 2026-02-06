import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
// import { Card } from '../../../components/Card/Card'; // Not used in wizard mode
import { WizardHeader } from '../../../components/WizardHeader/WizardHeader';
import './SurveyPage.css';

const SurveyPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showFailModal, setShowFailModal] = useState<boolean>(false);

    const questions = [
        { id: 1, text: "아이는 스스로 잘 앉아있을 수 있습니까?" },
        { id: 2, text: "시력에 문제가 없습니까?(안경 착용 가능)" },
        { id: 3, text: "청력에 문제가 없습니까?(보청기 착용 가능)" }
    ];

    const handleAnswer = (questionId: number, value: string) => {
        // Update answer
        setAnswers(prev => ({ ...prev, [questionId]: value }));

        if (value === 'no') {
            setShowFailModal(true);
            return;
        }

        // Auto advance
        if (currentStep < questions.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 300); // Small delay for visual feedback
        } else {
            // Last question answered yes -> navigate
            setTimeout(() => navigate('/test/risk-factor'), 300);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            navigate(-1); // Go back to Home
        }
    };

    const currentQuestion = questions[currentStep];

    return (
        <div className="survey-container">
            {/* Top Navigation */}
            <WizardHeader
                title="기본 설문"
                currentStage={1}
                onBack={handleBack}
            />
            {/* Dot Indicator for current section */}
            <div className="dot-indicator-container">
                {questions.map((q, index) => (
                    <div
                        key={q.id}
                        className={`dot-indicator ${index === currentStep ? 'active' : ''}`}
                    />
                ))}
            </div>

            <div className="survey-content wizard-layout">
                <div className="wizard-question-container">
                    <span className="q-badge">Question {currentQuestion.id}</span>
                    <h1 className="wizard-question-text">{currentQuestion.text}</h1>
                </div>

                <div className="wizard-options">
                    <button
                        className={`wizard-option-btn ${answers[currentQuestion.id] === 'yes' ? 'selected' : ''}`}
                        onClick={() => handleAnswer(currentQuestion.id, 'yes')}
                    >
                        <span>네, 그렇습니다</span>
                        <div className="selection-indicator" />
                    </button>
                    <button
                        className={`wizard-option-btn ${answers[currentQuestion.id] === 'no' ? 'selected' : ''}`}
                        onClick={() => handleAnswer(currentQuestion.id, 'no')}
                    >
                        <span>아니오</span>
                        <div className="selection-indicator" />
                    </button>
                </div>
            </div>

            {/* Ineligibility Modal */}
            {showFailModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>검사 불가 안내</h3>
                        <p>죄송합니다.<br />검사가 가능한 대상자가 아닙니다.</p>
                        <Button
                            fullWidth
                            onClick={() => {
                                setShowFailModal(false);
                                navigate('/home');
                            }}
                            variant="primary"
                        >
                            홈으로 돌아가기
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SurveyPage;
