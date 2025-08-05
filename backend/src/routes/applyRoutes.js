const express=require('express');
const { ApplicationController } = require('../controllers');
const router=express.Router();

router.post('/:jobid',ApplicationController.applyToJob)

module.exports=router;