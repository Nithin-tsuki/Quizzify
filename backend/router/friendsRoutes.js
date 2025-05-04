import  express from "express";
import { getFriends, unfollowFriend,addFriend,getAvailableStudents } from "../controllers/friendsController.js";

const router = express.Router();

router.get("/:userId", getFriends);
router.post("/unfollow", unfollowFriend);
router.post("/add-friend", addFriend);
router.get("/students/:userId", getAvailableStudents);
export default router;
