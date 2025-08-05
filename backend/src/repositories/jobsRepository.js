const Job=require('../models/jobs');
const CrudRepository = require('./crudRepository');
class JobRepository extends CrudRepository{
    constructor(){
        super(Job)
    }
}
module.exports=JobRepository;