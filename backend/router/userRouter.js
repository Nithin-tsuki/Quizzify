import express from "express";
import {createUser,loginUser,logoutUser} from "../controllers/users.js";
const router=express.Router();
// router.route('/').post(createUser);
router.post('/',createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser)
export default router;