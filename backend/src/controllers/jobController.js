const jobService = require('../service/jobService');

const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const job = await jobService.createJob({ title, company, location, description });
    return res.status(201).json({ message: 'Job created', data: job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const q = req.query.search || ''; // optional search query
    const jobs = await jobService.getAllJobs(q);
    return res.json({ data: jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    return res.json({ data: job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const updated = await jobService.updateJob(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Job not found' });
    return res.json({ message: 'Job updated', data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deleted = await jobService.deleteJob(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Job not found' });
    return res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};
