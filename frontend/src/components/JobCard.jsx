import { Link } from "react-router-dom";

export default function JobCard({ job, role, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-gray-200">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 truncate">{job.title}</h2>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {job.company} — {job.location}
        </p>
        <p className="mt-4 text-gray-700 text-sm line-clamp-4 leading-relaxed">
          {job.description}
        </p>
      </div>
      <div className="mt-6 flex gap-3">
        {role === "admin" ? (
          <>
            <Link
              to={`/edit/${job._id}`}
              className="flex-1 px-5 py-3 bg-yellow-500 text-white rounded-xl text-center font-semibold
              hover:bg-yellow-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(job._id)}
              className="flex-1 px-5 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        ) : (
          <Link
            to={`/apply/${job._id}`}
            className="w-full px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold text-center
            hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
}
