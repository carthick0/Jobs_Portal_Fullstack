import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function JobForm() {
  const [form, setForm] = useState({ title: "", company: "", location: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/jobs/${id}`).then((res) => setForm(res.data.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/jobs/${id}`, form);
    } else {
      await api.post("/jobs", form);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border">
      <input className="block w-full border p-2 mb-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="block w-full border p-2 mb-2" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <input className="block w-full border p-2 mb-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <textarea className="block w-full border p-2 mb-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
      <button className="bg-green-500 text-white px-4 py-2">Save</button>
    </form>
  );
}
