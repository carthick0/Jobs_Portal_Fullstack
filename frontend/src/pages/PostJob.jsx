import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostJob() {
  const [job, setJob] = useState({ title: "", company: "", location: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("https://jobs-portal-backend-t3m4.onrender.com/api/jobs", job, {
        withCredentials: true,
      });
      navigate("/admin/jobs");
    } catch {
      setError("Failed to post job");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Post New Job</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full p-3 border rounded"
        />
        <input
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="w-full p-3 border rounded"
        />
        <input
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-3 border rounded"
        />
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-3 border rounded h-32"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
