import express from "express";
import multer from "multer";
import { createChallenge, updateDay ,getAllChallenges} from "../controllers/challengeController.js";

const router = express.Router();
const upload = multer();

router.post("/create", createChallenge);
router.post("/update-day", upload.fields([
  { name: "video", maxCount: 1 },
  { name: "notes", maxCount: 1 }
]), updateDay);


router.get('/', getAllChallenges);

export default router;
