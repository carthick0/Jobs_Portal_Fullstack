const { JobService } = require("../service");


// Create a new job (admin only)
async function createJob(req, res) {
  try {
    const job = await JobService.createJob({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
    });

    return res.status(201).json({
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error in createJob:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all jobs
async function getAllJobs(req, res) {
  try {
    const jobs = await JobService.getAllJobs();
    return res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get a job by ID
async function getJobById(req, res) {
  try {
    const job = await JobService.getJobById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update a job by ID (admin only)
async function updateJob(req, res) {
  try {
    const updatedJob = await JobService.updateJob(req.params.id, req.body);

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error in updateJob:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete a job by ID (admin only)
async function deleteJob(req, res) {
  try {
    const deletedJob = await JobService.deleteJob(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
