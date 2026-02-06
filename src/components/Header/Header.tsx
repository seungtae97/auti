import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './Header.css';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    transparent?: boolean;
    rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, transparent = false, rightAction }) => {
    const navigate = useNavigate();

    return (
        <header className={`common-header ${transparent ? 'transparent' : ''}`}>
            <div className="header-left">
                {showBack && (
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft size={24} />
                    </button>
                )}
            </div>
            <div className="header-center">
                {title && <h1 className="header-title-text">{title}</h1>}
            </div>
            <div className="header-right">
                {rightAction}
            </div>
        </header>
    );
};
