import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminJobsPage from "./pages/AdminJobsPage"; // the admin job list page
import PostJob from "./pages/PostJob";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"
import ApplyPage from "./pages/ApplyPage";
export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/jobs" element={<AdminJobsPage />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="apply/:jobId" element={<ApplyPage />} />
      </Routes>
    </Router>
  );
}
