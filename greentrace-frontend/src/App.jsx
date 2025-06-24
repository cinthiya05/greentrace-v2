import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import SubmitActivity from "./pages/SubmitActivity";
// import ChatAssistant from "./pages/ChatAssistant";
// import HistoryPage from "./pages/HistoryPage";
// import GraphPage from "./pages/GraphPage";
// import AdminOverview from "./pages/AdminOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitActivity />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/admin" element={<AdminOverview />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
