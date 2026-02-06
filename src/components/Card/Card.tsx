import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, title }) => {
    return (
        <div className={`card ${className} ${onClick ? 'card-clickable' : ''}`} onClick={onClick}>
            {title && <h3 className="card-title">{title}</h3>}
            {children}
        </div>
    );
};
