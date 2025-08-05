const { ApplicationService } = require("../service");

// Apply to a job
async function applyToJob(req, res) {
  try {
    const jobId = req.params.jobId;
    const { name, email, resumeUrl } = req.body;

    // Basic validation
    if (!name || !email || !resumeUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const application = await ApplicationService.applyToJob(jobId, {
      name,
      email,
      resumeUrl,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error in applyToJob:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  applyToJob,
};
