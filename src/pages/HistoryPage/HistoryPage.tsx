import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import './HistoryPage.css';

const HistoryPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="history-container">
            <Header title="검사 기록" />

            <div className="history-content">
                {/* Mock Data List */}
                <div className="history-list-group">
                    <div className="history-item" onClick={() => navigate('/test/result')}>
                        <div className="history-info">
                            <span className="history-date">2026년 2월 5일</span>
                            <span className="history-result">발달 지수 85점 • 양호</span>
                        </div>
                        <span className="status-badge complete">분석 완료</span>
                    </div>

                    {/* Add more mock items if needed */}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default HistoryPage;
