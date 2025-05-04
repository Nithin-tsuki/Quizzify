import { StudentProgress } from '../models/studentProgress.js';

export const getStudentProgress = async (req, res) => {
  const { studentId } = req.params;
  console.log('Fetching progress for student:', studentId); // Debug log
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
    let progress = await StudentProgress.findOne({ studentId, challengeId });

    if (!progress) {
      progress = new StudentProgress({
        studentId,
        challengeId,
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
    const { userId, courseId } = req.query;
    console.log('Fetching progress for user:', userId, 'in course:', courseId); // Debug log
    const progress = await StudentProgress.findOne({ userId, courseId });
    res.json(progress || { completedLessons: [] });
  };
  
  export const toggleLessonCompletion = async (req, res) => {
    const { userId, courseId, day } = req.body;
    let progress = await StudentProgress.findOne({ userId, courseId });
  
    if (!progress) {
      progress = new StudentProgress({ userId, courseId, completedLessons: [day] });
    } else {
      const index = progress.completedLessons.indexOf(day);
      if (index > -1) {
        progress.completedLessons.splice(index, 1);
      } else {
        progress.completedLessons.push(day);
      }
    }
  
    await progress.save();
    res.json(progress);
  };