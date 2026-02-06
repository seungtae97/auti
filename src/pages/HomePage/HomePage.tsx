import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { PlayCircle } from 'lucide-react';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import childProfileImg from '../../assets/images/child_profile.png';
import './HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [childName, setChildName] = useState<string>('');
    const [childBirth, setChildBirth] = useState<string>('');
    const [childGender, setChildGender] = useState<string>('');
    // const [childMonths, setChildMonths] = useState<number>(0); // Removed as requested to replace with birthdate

    useEffect(() => {
        const name = localStorage.getItem('childName');
        const birth = localStorage.getItem('childBirthdate');
        const gender = localStorage.getItem('childGender');

        if (!name) {
            navigate('/register-child');
            return;
        }

        setChildName(name);
        if (birth) setChildBirth(birth.replace(/-/g, '.')); // Format YYYY.MM.DD
        if (gender) setChildGender(gender === 'male' ? '남아' : '여아');
    }, [navigate]);

    const startTest = () => {
        navigate('/test/survey');
    };

    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                <span className="home-logo">AUTI AI</span>
            </header>

            <div className="home-content">
                {/* Greeting Section - Redesigned */}
                <div className="home-greeting-card">
                    <div className="greeting-header">
                        <h2 className="greeting-title">{childName} 부모님 반가워요 <span className="hello-emoji">👋</span></h2>
                    </div>
                    <div className="child-info-row">
                        <div className="child-profile-icon">
                            <img src={childProfileImg} alt="Child Profile" className="profile-img" />
                        </div>
                        <div className="child-details">
                            <strong className="child-name">{childName}</strong>
                            <span className="child-meta">{childBirth} ({childGender})</span>
                        </div>
                    </div>
                </div>

                {/* Main Hero Action Banner - Straightforward */}
                <div className="hero-banner" onClick={startTest}>
                    <div className="hero-content">
                        <h3 className="hero-title">
                            발달 검사<br />
                            시작하기
                        </h3>
                        <Button size="lg" variant="primary" className="hero-btn pulse-animation">
                            <PlayCircle size={24} />
                        </Button>
                    </div>
                    <div className="hero-visual">
                        {/* Abstract visual element if needed */}
                    </div>
                </div>

                {/* Quick Info Cards - Data focused */}
                <div className="info-grid">
                    <div className="info-card" onClick={() => navigate('/history')}>
                        <span className="info-label">최근 검사</span>
                        <div className="info-value-group">
                            <span className="info-value empty-text">-</span>
                        </div>
                    </div>
                    <div className="info-card">
                        <span className="info-label">다음 검사</span>
                        <div className="info-value-group">
                            <span className="info-value">Today</span>
                            <span className="notification-dot"></span>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default HomePage;
