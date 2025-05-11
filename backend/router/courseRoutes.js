// import fs from 'fs';
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import createCourse from '../controllers/course.js';

// const router = express.Router();

// // Ensure the 'temp' directory exists
// const tempDir = 'temp';
// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, tempDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// router.post('/add', upload.fields([
//   { name: 'notes', maxCount: 1 },
//   { name: 'video', maxCount: 5 }
// ]), createCourse);

// export default router;
import express from 'express';
import { createCourse, getCourses,createTopic,getTopicsForCourse,getAllCourses,enrollInCourse,getStudentCourses,getStudentList,getTeacherCourses} from '../controllers/courseController.js';
import upload from '../middlewares/upload.js';
import { get } from 'mongoose';
import Course from '../models/course.js';
const router = express.Router();

router.post('/create', createCourse);
router.get('/all', getCourses);
router.post(
    '/topics/create',
    upload.fields([
      { name: 'video', maxCount: 10 },   // multiple videos allowed
      { name: 'note', maxCount: 1 }      // only one note file
    ]),
    createTopic
  );
router.get('/topics', getTopicsForCourse);
router.get('/teacher/:id', getTeacherCourses);
  
router.get('/', getAllCourses);
router.post('/enroll/:courseId', enrollInCourse);
router.get('/my-courses/:studentId', getStudentCourses);
router.get('/students', getStudentList);

// GET /api/courses/student/:studentId
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await Course.find({ students: studentId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

export default router;

