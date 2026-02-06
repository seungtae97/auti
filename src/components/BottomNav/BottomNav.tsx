import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ClipboardList, User } from 'lucide-react';
import './BottomNav.css';

export const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check active state
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bottom-nav-container">
            <button
                className={`nav-item ${isActive('/home') ? 'active' : ''}`}
                onClick={() => navigate('/home')}
            >
                <div className="icon-wrapper">
                    <Home size={24} strokeWidth={isActive('/home') ? 2.5 : 2} />
                </div>
                <span className="nav-label">홈</span>
            </button>

            <button
                className={`nav-item ${isActive('/history') ? 'active' : ''}`}
                onClick={() => navigate('/history')}
            >
                <div className="icon-wrapper">
                    <ClipboardList size={24} strokeWidth={isActive('/history') ? 2.5 : 2} />
                </div>
                <span className="nav-label">기록</span>
            </button>

            <button
                className={`nav-item ${isActive('/mypage') ? 'active' : ''}`}
                onClick={() => navigate('/mypage')}
            >
                <div className="icon-wrapper">
                    <User size={24} strokeWidth={isActive('/mypage') ? 2.5 : 2} />
                </div>
                <span className="nav-label">마이페이지</span>
            </button>
        </nav>
    );
};
