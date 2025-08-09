import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostJob from "./pages/PostJob";
import LoginPage from "./pages/LoginPage";
import ApplyPage from "./pages/ApplyPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
      </Routes>
    </Router>
  );
}
