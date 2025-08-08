const applicationRepository = require("../repositories/applicationRepository");

async function applyJob(jobId, data) {
  try {
  const response = await applicationRepository.create({
  job: jobId,
  applicantName: data.applicantName,
  applicantEmail: data.applicantEmail,
  resumeLink: data.resumeLink
});

    return response;
  } catch (error) {
    console.log("Apply Job Error at service layer", error);
    throw error;
  }
}
async function getApplicationsForJob(jobId){
    try {
        const res=await applicationRepository.findByJob(jobId);
        return res;
    } catch (error) {
         console.log("getApplicationsForJob Error at service layer", error);
         throw error;
    }
}
async function getApplicationsForUser(email) {
    try {
        const res=applicationRepository.findByApplicantEmail(email);
        return res;
    } catch (error) {
        console.log("getApplicationsForUser Error at service")
    }
}
module.exports = {
  applyJob
};
