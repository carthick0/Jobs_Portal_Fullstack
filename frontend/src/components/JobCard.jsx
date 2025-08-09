import { Link } from "react-router-dom";

export default function JobCard({ job, role, onDelete }) {
  const isAdmin = role === "admin";

  return (
    <div className="bg-white rounded shadow p-5 flex flex-col justify-between border border-gray-200">
      <div>
        <h2 className="text-xl font-semibold truncate">{job.title}</h2>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {job.company} — {job.location}
        </p>
        <p className="mt-3 text-gray-700 text-sm line-clamp-4">{job.description}</p>
      </div>
      <div className="mt-4 flex gap-3">
        {isAdmin ? (
          <>
            <Link
              to={`/edit/${job._id}`}
              className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 text-center"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(job._id)}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        ) : (
          <Link
            to={`/apply/${job._id}`}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
}
