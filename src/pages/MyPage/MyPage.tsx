import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Header } from '../../components/Header/Header';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import './MyPage.css';

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const [childName, setChildName] = useState<string>('');
    const [childMonths, setChildMonths] = useState<number>(0);

    useEffect(() => {
        const name = localStorage.getItem('childName');
        const months = localStorage.getItem('childMonths');
        if (name) setChildName(name);
        if (months) setChildMonths(Number(months));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="mypage-container">
            <Header
                title="마이페이지"
            />

            <div className="mypage-content">
                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-avatar">
                        <User size={32} color="#FFF" />
                    </div>
                    <div className="profile-details">
                        <h2 className="profile-name">{childName || '이름 없음'}</h2>
                        <span className="profile-meta">생후 {childMonths || 0}개월</span>
                    </div>
                </div>

                {/* Settings Actions */}
                <div className="menu-group">
                    <button className="menu-item">
                        <div className="menu-item-left">
                            <Settings size={20} className="menu-icon" />
                            <span className="menu-text">앱 설정</span>
                        </div>
                        <ChevronRight size={20} color="#CBD5E0" />
                    </button>
                    <button className="menu-item" onClick={() => navigate('/register-child')}>
                        <div className="menu-item-left">
                            <User size={20} className="menu-icon" />
                            <span className="menu-text">아이 정보 수정</span>
                        </div>
                        <ChevronRight size={20} color="#CBD5E0" />
                    </button>
                    <button className="menu-item" onClick={handleLogout}>
                        <div className="menu-item-left">
                            <LogOut size={20} className="menu-icon logout-text" />
                            <span className="menu-text logout-text">로그아웃</span>
                        </div>
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default MyPage;
