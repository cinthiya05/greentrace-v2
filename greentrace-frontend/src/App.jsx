import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SubmitActivity from './pages/SubmitActivity';
import Layout from './layout/Layout';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage'; // adjust the path as needed
import GraphPage from './pages/GraphPage';
import GreenChat from './pages/GreenChat';
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes with Navbar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submitactivity" element={<SubmitActivity />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/greenchat" element={<GreenChat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
