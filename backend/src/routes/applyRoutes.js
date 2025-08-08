const express = require('express');
const{ ApplicationController }= require('../controllers');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public: apply
router.post('/:jobid', ApplicationController.applyJob);

// Admin: view applications for a job
router.get('/job/:jobid', verifyToken, ApplicationController.getApplicationsForJob);

// User: view own applications
router.get('/my', ApplicationController.getMyApplications);

module.exports = router;
