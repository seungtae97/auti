import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage/SplashPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterChildPage from './pages/RegisterChildPage/RegisterChildPage';
import HomePage from './pages/HomePage/HomePage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import SetupPage from './pages/TestFlow/SetupPage/SetupPage';
import PrecautionsPage from './pages/TestFlow/PrecautionsPage/PrecautionsPage';
import SurveyPage from './pages/TestFlow/SurveyPage/SurveyPage';
import RiskFactorPage from './pages/TestFlow/RiskFactorPage/RiskFactorPage';
import RecordingPage from './pages/TestFlow/RecordingPage/RecordingPage';
import ResultPage from './pages/ResultPage/ResultPage';
import MyPage from './pages/MyPage/MyPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-child" element={<RegisterChildPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />

        {/* Test Flow */}
        <Route path="/test">
          <Route path="setup" element={<SetupPage />} />
          <Route path="precautions" element={<PrecautionsPage />} />
          <Route path="survey" element={<SurveyPage />} />
          <Route path="risk-factor" element={<RiskFactorPage />} />
          <Route path="recording" element={<RecordingPage />} />
          <Route path="result" element={<ResultPage />} />
        </Route>

        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
