import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ApplyForm() {
  const [form, setForm] = useState({ name: "", email: "", resume: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const { jobId } = useParams();
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!form.resume.trim()) tempErrors.resume = "Resume URL is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post(`/apply/${jobId}`, {
        applicantName: form.name,
        applicantEmail: form.email,
        resumeLink: form.resume
      });

      setSuccess("✅ Application submitted successfully!");
      setForm({ name: "", email: "", resume: "" });

      // Redirect after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Application submission failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Apply for this Job
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-400 rounded-lg">
            {success}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <input
            className={`block w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            className={`block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Resume URL */}
        <div className="mb-4">
          <input
            className={`block w-full border ${
              errors.resume ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Resume Link (Google Drive / URL)"
            value={form.resume}
            onChange={(e) => setForm({ ...form, resume: e.target.value })}
          />
          {errors.resume && (
            <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}