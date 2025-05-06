import express from 'express';
import {
  sendChallenge,
  getChallengesByUser,
  updateChallengeStatus
} from '../controllers/quizChallengeController.js';

const router = express.Router();

router.post('/', sendChallenge);
router.get('/:userId', getChallengesByUser);
router.patch('/:challengeId', updateChallengeStatus);

export default router;
