const { CrudRepository } = require('.');
const Application=require('../models/application');

class ApplicationRepository extends CrudRepository{
    constructor(){
        super(Application)
    }
}

module.exports=ApplicationRepository;