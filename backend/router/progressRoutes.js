import express from 'express';
import {
  getStudentProgress,
  updateLessonStatus,
  getUserProgress
} from '../controllers/progressController.js';
import Course from '../models/course.js';
import StudentProgress from '../models/studentProgress.js';
const router = express.Router();
router.post('/updatecourse', async (req, res) => {
  const { studentId, challengeId, topicIndex, completed } = req.body;

  try {
    let progress = await StudentProgress.findOne({ studentId, challengeId });

    if (!progress) {
      progress = new StudentProgress({
        studentId,
        challengeId,
        lessons: []
      });
    }

    // Ensure lessons array has the right length
    while (progress.lessons.length <= topicIndex) {
      progress.lessons.push({ dayIndex: progress.lessons.length, completed: false });
    }

    progress.lessons[topicIndex].completed = completed;

    await progress.save();
    res.status(200).json({ message: 'Progress updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});
// GET /api/progress/:studentId/:challengeId
router.get('/:studentId/:challengeId', async (req, res) => {
  const { studentId, challengeId } = req.params;

  try {
    const progress = await StudentProgress.findOne({ studentId, challengeId });
    if (!progress) return res.json({ lessons: [] });

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get progress' });
  }
});

router.get('/:studentId', getStudentProgress);
router.post('/update', updateLessonStatus);
router.get('/', getUserProgress);  // ?userId=...&challengeId=...
export default router;
