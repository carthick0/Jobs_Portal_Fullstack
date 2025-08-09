import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { role, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {role === "admin" && <Link to="/post">Post a Job</Link>}
      </div>
      <div>
        {role === "admin" ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login as Admin</Link>
        )}
      </div>
    </nav>
  );
}
