import Quiz from '../models/quiz.js';
import QuizChallenge from '../models/quizChallenge.js';
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

    // First find the quiz challenge
    const quizChallenge = await QuizChallenge.findById(challengeId);
    if (!quizChallenge) {
      return res.status(404).json({ message: 'Quiz challenge not found' });
    }

    // Then get the actual quiz
    const quiz = await Quiz.findById(quizChallenge.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error getting quiz by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
