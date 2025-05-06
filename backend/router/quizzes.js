import express from 'express';
import { getAllQuizzes, getQuizById} from '../controllers/quizController.js';

const router = express.Router();

router.get('/', getAllQuizzes);

router.get('/:id', getQuizById); // 👈 Add this line
export default router;
