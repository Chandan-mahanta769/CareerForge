import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import LandingPage from './pages/Landing';
import ExplorePage from './pages/Explore';
import AuthCallback from './pages/AuthCallback';
import DashboardPage from './pages/Dashboard';
import TopicPage from './pages/TopicPage';
import RoadmapPage from './pages/Roadmap';
import PracticePage from './pages/Practice';
import InterviewPage from './pages/Interview';
import InterviewCategoryPage from './pages/InterviewCategory';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import HRInterviewPage from './pages/HRInterview';
import TechnicalInterviewPage from './pages/TechnicalInterview';
import VivaInterviewPage from './pages/VivaInterview';
import MockInterviewPage from './pages/MockInterview';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/topic/:categoryId/:trackId/:stackId/:stepId" element={<PrivateRoute><TopicPage /></PrivateRoute>} />
        <Route path="/roadmap" element={<PrivateRoute><RoadmapPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/practice" element={<PrivateRoute><PracticePage /></PrivateRoute>} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/interview/:type" element={<InterviewCategoryPage />} />
        <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/interview/hr" element={<PrivateRoute><HRInterviewPage /></PrivateRoute>} />
        <Route path="/interview/technical" element={<PrivateRoute><TechnicalInterviewPage /></PrivateRoute>} />
        <Route path="/interview/viva" element={<PrivateRoute><VivaInterviewPage /></PrivateRoute>} />
        <Route path="/interview/mock" element={<PrivateRoute><MockInterviewPage /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;