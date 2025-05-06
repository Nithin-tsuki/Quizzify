import StudentProgress  from '../models/studentProgress.js';
import mongoose from 'mongoose';

export const getStudentProgress = async (req, res) => {
  const { studentId } = req.params;
  try {
    const progress = await StudentProgress.find({ studentId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

export const updateLessonStatus = async (req, res) => {
  const { studentId, challengeId, dayIndex } = req.body;

  try {
    const sId = new mongoose.Types.ObjectId(studentId);
    const cId = new mongoose.Types.ObjectId(challengeId);

    let progress = await StudentProgress.findOne({ studentId: sId, challengeId: cId });

    if (!progress) {
      progress = new StudentProgress({
        studentId: sId,
        challengeId: cId,
        lessons: Array.from({ length: 30 }, (_, i) => ({
          dayIndex: i,
          completed: i === dayIndex
        }))
      });
    } else {
      const lesson = progress.lessons.find(l => l.dayIndex === dayIndex);
      if (lesson) {
        lesson.completed = !lesson.completed;
      } else {
        progress.lessons.push({ dayIndex, completed: true });
      }
    }

    await progress.save();
    res.json({ message: 'Progress updated', progress });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

export const getUserProgress = async (req, res) => {
  const { userId, challengeId } = req.query;

  try {
    const progress = await StudentProgress.findOne({
      studentId: userId,
      challengeId: challengeId
    });

    if (!progress) return res.json({ completedLessons: [] });

    const completedLessons = progress.lessons
      .filter(l => l.completed)
      .map(l => l.dayIndex);

    res.json({ completedLessons });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user progress' });
  }
};
