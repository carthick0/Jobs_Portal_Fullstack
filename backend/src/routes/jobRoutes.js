const express = require("express");


const { JobController } = require("../controllers");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", JobController.getAllJobs);
router.get("/:id", JobController.getJobById);

// Admin-only routes
router.post("/", verifyToken, JobController.createJob);
router.put("/:id", verifyToken, JobController.updateJob);
router.delete("/:id", verifyToken, JobController.deleteJob);

module.exports = router;
