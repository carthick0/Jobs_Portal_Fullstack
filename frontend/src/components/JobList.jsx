import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const { role } = useContext(AuthContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };

  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="border p-2"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filtered.map((job) => (
          <li key={job._id} className="border p-3 my-2">
            <h3 className="font-bold">{job.title}</h3>
            <p>
              {job.company} - {job.location}
            </p>
            <p>{job.description}</p>

            {role === "admin" ? (
              <div className="flex gap-3 mt-2">
                <Link
                  to={`/edit/${job._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ) : (
              <Link
                to={`/apply/${job._id}`}
                className="text-green-500 hover:underline"
              >
                Apply
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
