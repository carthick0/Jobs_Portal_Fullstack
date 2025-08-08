const applicationService = require('../service/applicationService');

const applyJob = async (req, res) => {
  try {
    const { jobid } = req.params;
    const { applicantName, applicantEmail, resumeLink } = req.body;

    if (!applicantName || !applicantEmail || !resumeLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const application = await applicationService.applyJob(
      jobid,
      { applicantName, applicantEmail, resumeLink }
    );

    return res.status(201).json({ message: 'Application submitted', data: application });
  } catch (err) {
    console.error("Apply Job Error at controller layer", err);
    return res.status(500).json({ message: 'Server error' });
  }
};



const getApplicationsForJob = async (req, res) => {
  try {
    const { jobid } = req.params;
    const apps = await applicationService.getApplicationsForJob(jobid);
    return res.json({ data: apps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: 'Email query param required' });
    const apps = await applicationService.getApplicationsForUser(email);
    return res.json({ data: apps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  applyJob,
  getApplicationsForJob,
  getMyApplications
};
