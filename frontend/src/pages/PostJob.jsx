import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("https://jobs-portal-backend-t3m4.onrender.com/api/jobs", form, { withCredentials: true })
      .then(() => {
        setSuccessMessage("✅ Job posted successfully!");
        setForm({ title: "", company: "", location: "", description: "" });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setSuccessMessage("❌ Failed to post job. Please try again.");
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h1>
      {successMessage && (
        <p
          className={`mb-4 p-3 rounded-lg text-center ${
            successMessage.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <input
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
        </div>

        <div>
          <input
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        <div>
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Job Description"
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
