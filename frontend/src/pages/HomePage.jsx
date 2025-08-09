import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { AuthContext } from "../context/AuthContext";

const quotes = [
  "Choose a job you love, and you will never have to work a day in your life. — Confucius",
  "Opportunities don't happen. You create them.",
  "Dream big. Work hard. Stay focused.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Your work is going to fill a large part of your life."
];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { role } = useContext(AuthContext);
  const [quote, setQuote] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    fetchJobs();

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setFadeIn(true);

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFadeIn(true);
      }, 300);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://jobs-portal-backend-t3m4.onrender.com/api/jobs");
      setJobs(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jobs-portal-backend-t3m4.onrender.com/api/jobs/${id}`, {
        withCredentials: true,
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Quote Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <h1
          className={`text-4xl md:text-6xl font-extrabold text-gray-800 max-w-4xl px-4 leading-snug
          transition-opacity duration-500 ease-in-out
          ${fadeIn ? "opacity-100" : "opacity-0"}`}
          style={{ textShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          {quote}
        </h1>

        <div className="mt-20 animate-bounce text-blue-600 flex flex-col items-center select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <p className="mt-2 font-semibold text-blue-700 tracking-wide">Scroll Down</p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Available Jobs</h2>
          {role === "admin" && (
            <Link
              to="/post"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Post Job
            </Link>
          )}
        </div>

        <input
          type="text"
          placeholder="Search jobs by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 mb-8 border border-gray-300 rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {filteredJobs.length === 0 ? (
          <p className="text-gray-600 text-lg mt-12 text-center">No jobs found matching your search.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} role={role} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
