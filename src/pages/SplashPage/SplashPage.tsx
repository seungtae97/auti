import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import './SplashPage.css';

const SplashPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <div className="splash-content">
                <div className="logo-icon-wrapper">
                    <Brain size={64} className="brain-icon" />
                </div>
                <h1 className="app-title">AUTI AI</h1>
                <p className="app-subtitle">우리 아이 발달의 모든 것</p>
            </div>
        </div>
    );
};

export default SplashPage;
