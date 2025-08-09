import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        "https://jobs-portal-backend-t3m4.onrender.com/api/jobs"
      );
      setJobs(res.data.data || res.data);
    } catch (err) {
      setError("Failed to load jobs. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(
        `https://jobs-portal-backend-t3m4.onrender.com/api/jobs/${id}`,
        { withCredentials: true }
      );
      setSuccessMsg("Job deleted successfully!");
      fetchJobs();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to delete job.");
      console.error(err);
    }
  };

 
  const handleLogout = () => {
    localStorage.removeItem("userRole"); 
    navigate("/"); 
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading jobs...</p>
      </div>
    );

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel - Manage Jobs</h1>
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/post")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded"
          >
            Post New Job
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-5 rounded shadow border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-700 text-sm line-clamp-4">
                  {job.description}
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate(`/edit/${job._id}`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
