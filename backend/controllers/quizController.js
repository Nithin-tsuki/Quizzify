// import Quiz from '../models/quiz.js';
// import QuizChallenge from '../models/quizChallenge.js';
// export const getAllQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find().select('testName description subjectName duration startTime endTime instructorName');
//     res.status(200).json(quizzes);
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);
//     res.status(500).json({ message: 'Failed to fetch quizzes' });
//   }
// };
// export const getQuizById = async (req, res) => {
//   try {
//     const challengeId = req.params.id;

//     // First find the quiz challenge
//     const quizChallenge = await QuizChallenge.findById(challengeId);
//     if (!quizChallenge) {
//       return res.status(404).json({ message: 'Quiz challenge not found' });
//     }

//     // Then get the actual quiz
//     const quiz = await Quiz.findById(quizChallenge.quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     res.json(quiz);
//   } catch (error) {
//     console.error("Error getting quiz by ID:", error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import Quiz from '../models/quiz.js';
import QuizChallenge from '../models/quizChallenge.js';
import Student from '../models/student.js';

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('testName description subjectName duration startTime endTime instructorName');
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const userId = req.query.userId;

    const quizChallenge = await QuizChallenge.findById(challengeId);
    if (!quizChallenge) {
      return res.status(404).json({ message: 'Quiz challenge not found' });
    }

    const quiz = await Quiz.findById(quizChallenge.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const student = await Student.findById(userId).select('quizzesAttempted');
    if (student?.quizzesAttempted?.includes(quiz._id)) {
      return res.status(403).json({ message: 'You have already attempted this quiz' });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error getting quiz by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ADD THIS FUNCTION — to handle quiz submission
export const submitQuiz = async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

    const student = await Student.findById(userId);

    if (student.quizzesAttempted.includes(quizId)) {
      return res.status(403).json({ message: 'You have already submitted this quiz' });
    }

    // (Add your quiz grading logic here)

    await Student.findByIdAndUpdate(userId, {
      $addToSet: { quizzesAttempted: quizId },
      $inc: { quizAttended: 1 }
    });

    res.status(200).json({ message: 'Quiz submitted successfully' });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: 'Server error while submitting quiz' });
  }
};
