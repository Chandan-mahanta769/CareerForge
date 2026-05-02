import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const LoginPage = lazy(() => import('./pages/Login'))
const LandingPage = lazy(() => import('./pages/Landing'))
const ExplorePage = lazy(() => import('./pages/Explore'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const TopicPage = lazy(() => import('./pages/TopicPage'))
const RoadmapPage = lazy(() => import('./pages/Roadmap'))
const PracticePage = lazy(() => import('./pages/Practice'))
const InterviewPage = lazy(() => import('./pages/Interview'))
const InterviewCategoryPage = lazy(() => import('./pages/InterviewCategory'))
const Progress = lazy(() => import('./pages/Progress'))
const Settings = lazy(() => import('./pages/Settings'))
const HRInterviewPage = lazy(() => import('./pages/HRInterview'))
const TechnicalInterviewPage = lazy(() => import('./pages/TechnicalInterview'))
const VivaInterviewPage = lazy(() => import('./pages/VivaInterview'))
const MockInterviewPage = lazy(() => import('./pages/MockInterview'))

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0F0F1A]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C3EF4]"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App;