import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, testCredentials } = useContext(AuthContext); // assuming you provide testCredentials here
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (success) {
      navigate("/admin/jobs");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleFillTestCredentials = () => {
    if (testCredentials) {
      setEmail(testCredentials.email);
      setPassword(testCredentials.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-center text-2xl mb-6 font-bold">Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
        {/* Test Credentials Button */}
        <button
          type="button"
          onClick={handleFillTestCredentials}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Use Test Credentials
        </button>
      </form>
    </div>
  );
}
