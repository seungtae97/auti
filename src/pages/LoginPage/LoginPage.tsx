import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Brain } from 'lucide-react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleTomatoLogin = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            const childName = localStorage.getItem('childName');
            if (childName) {
                navigate('/home');
            } else {
                navigate('/register-child');
            }
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="flex justify-center mb-4">
                    <Brain size={48} className="text-primary" />
                </div>
                <h1 className="login-title text-brand">AUTI AI</h1>
                <p className="login-subtitle">우리 아이를 위한 똑똑한 발달 검사</p>
            </div>

            <div className="login-content">
                <Card className="login-card">
                    <div className="tomato-logo-area">
                        <span className="tomato-icon">🍅</span>
                        <h2>Tomato One-ID</h2>
                    </div>
                    <p className="login-desc">
                        토마토 통합 계정으로 간편하게<br />
                        모든 서비스를 이용할 수 있습니다.
                    </p>
                    <Button
                        className="tomato-login-btn"
                        fullWidth
                        size="lg"
                        onClick={handleTomatoLogin}
                        disabled={loading}
                    >
                        {loading ? '로그인 중...' : '토마토 One-ID로 로그인'}
                    </Button>
                </Card>

                <div className="login-help">
                    <button className="text-btn">계정 찾기</button>
                    <span className="divider">|</span>
                    <button className="text-btn">회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
