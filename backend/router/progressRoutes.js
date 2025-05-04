import express from 'express';
import {
  getStudentProgress,
  updateLessonStatus,
  getUserProgress, toggleLessonCompletion
} from '../controllers/progressController.js';

const router = express.Router();

router.get('/:studentId', getStudentProgress);
router.post('/update', updateLessonStatus);
router.get('/', getUserProgress);
router.post('/toggle', toggleLessonCompletion);
export default router;
