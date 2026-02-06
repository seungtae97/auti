import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './RegisterChildPage.css';

const RegisterChildPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | ''>('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem('childName');
        const storedBirth = localStorage.getItem('childBirthdate');
        const storedGender = localStorage.getItem('childGender');

        if (storedName) {
            setName(storedName);
            setIsEditMode(true);
        }
        if (storedBirth) setBirthdate(storedBirth);
        if (storedGender) setGender(storedGender as 'male' | 'female');
    }, []);

    const calculateMonths = (dateStr: string) => {
        if (!dateStr) return null;
        const birth = new Date(dateStr);
        const now = new Date();
        const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
        return months;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && birthdate && gender) {
            // Save child data
            localStorage.setItem('childName', name);
            localStorage.setItem('childBirthdate', birthdate);
            localStorage.setItem('childGender', gender);
            localStorage.setItem('childMonths', String(calculateMonths(birthdate)));

            // Navigate back to home or mypage
            navigate('/home');
        }
    };

    const isValid = name.length > 0 && birthdate.length > 0 && gender !== '';

    return (
        <div className="register-container">
            <div className="register-header">
                <h1 className="page-title">{isEditMode ? '아이 정보 수정' : '우리 아이 등록'}</h1>
                <p className="page-subtitle">{isEditMode ? '수정할 정보를 입력해주세요' : '정확한 검사를 위해 아이 정보를 입력해주세요'}</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">아이 이름</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 김토마"
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="birthdate">생년월일</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="input-field"
                    />
                    {birthdate && (
                        <span className="helper-text">
                            생후 {calculateMonths(birthdate)}개월입니다
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>성별</label>
                    <div className="gender-selector">
                        <button
                            type="button"
                            className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                            onClick={() => setGender('male')}
                        >
                            남아
                        </button>
                        <button
                            type="button"
                            className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                            onClick={() => setGender('female')}
                        >
                            여아
                        </button>
                    </div>
                </div>

                <div className="register-footer">
                    <Button type="submit" fullWidth size="lg" disabled={!isValid}>
                        {isEditMode ? '수정 완료' : '등록 완료'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterChildPage;
