import express from 'express';
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats
} from '../controllers/jobsController.js';



// CREATE AN JOB POSITION AND GET ALL JOBS
router.route('/').post(createJob).get(getAllJobs)

// EDIT A JOB
router.route('/:id').patch(updateJob).delete(deleteJob);

//SHOW STATUS
router.route('/stats').get(showStats);
export default router;
