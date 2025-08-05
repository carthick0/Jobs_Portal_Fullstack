const JobRepository = require("../repositories/jobsRepository");

const jobsRepository = new JobRepository();

async function createJob(data){
    try {
        const response=await jobsRepository.create(data);
        return response;
    } catch (error) {
        console.log("Create Jobs Error at service layer",error);
        throw error;
    }
}
async function getAllJobs(){
    try {
        const response=await jobsRepository.getAll();
        return response
    } catch (error) {
        console.log("Get all Jobs Error at service layer",error);
        throw error;
    }
}

async function getJobById(id){
    try {
        const response=await jobsRepository.get(id);
        return response;
    } catch (error) {
        console.log("Get  Job Error at service layer",error);
        throw error;
    }
}

async function updateJob(id,data){
    try {
        const response=await jobsRepository.update(id,data);
        return response
    } catch (error) {
        console.log("Update Jobs Error at service layer",error);
        throw error;
    }
}

async function deleteJob(id){
    try {
        const response=await jobsRepository.delete(id)
    } catch (error) {
        console.log("Delete Jobs Error at service layer",error);
        throw error;
    }
}

module.exports={
    createJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobById
}