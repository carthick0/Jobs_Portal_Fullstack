import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const[message,setMessage]=useState("")
  useEffect(() => {

    fetchJob();
  }, [id, navigate]);

  const fetchJob = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://jobs-portal-backend-t3m4.onrender.com/api/jobs/${id}`,
        { withCredentials: true }
      );
      setJob(res.data);
    } catch (err) {
      setError("Failed to load job data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await axios.put(
        `https://jobs-portal-backend-t3m4.onrender.com/api/jobs/${id}`,
        job,
        { withCredentials: true }
      );
      navigate("/admin/jobs");
    } catch (err) {
      setError("Failed to update job. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
    setMessage("✅ Application updated successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Job</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="title">
            Job Title
          </label>
          {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-400 rounded-lg">
            {message}
          </div>
        )}
          <input
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job location"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="description">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job description"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-3 rounded text-white font-semibold ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saving ? "Saving..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
