const ApplicationRepository = require("../repositories/applicationRepository");

const applicationRepository=new ApplicationRepository();

async function applyJob(jobId,data){
    try {
        const response=await applicationRepository.create({jobId,data});
        return response;
    } catch (error) {
        console.log("Apply Job Error at service layer",error);
        throw error;
    }
}

module.exports={
    applyJob
}