// import Course from '../models/course.js';
// import cloudinary from '../utils/cloudinary.js'; // Adjust path if needed

// // Create a new course
// const uploadToCloudinary = (buffer, filename, folder, resourceType = 'auto') => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         resource_type: resourceType,
//         public_id: filename.split('.')[0],
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result.secure_url);
//       }
//     );
//     stream.end(buffer);
//   });
// };

// export const createCourse = async (req, res) => {
//   try {
//     const { courseName, instructorName, instructorId, notes, video, topic } = req.body;
//     console.log(req.body); // Log the request body for debugging
//     if (!courseName || !instructorName || !instructorId || !topic || topic.length === 0) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newCourse = new Course({ courseName, instructorName, instructorId, notes, video, topic });
//     await newCourse.save();

//     res.status(201).json(newCourse);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// export const createTopic = async (req, res) => {
//   try {
//     const { courseName, instructorName, topic } = req.body;
//     console.log(req.body); // Log the request body for debugging
//     const instructorId = req.body.instructorId || 'defaultId'; // fallback for now

//     if (!courseName || !instructorName || !topic) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Upload note file to Cloudinary
//     let noteUrl = '';
//     if (req.files?.note?.[0]) {
//       const noteFile = req.files.note[0];
//       noteUrl = await uploadToCloudinary(noteFile.buffer, noteFile.originalname, 'notes', 'raw');
//     }

//     // Upload videos to Cloudinary
//     const videoUrls = [];
//     if (req.files?.video?.length) {
//       for (const videoFile of req.files.video) {
//         const videoUrl = await uploadToCloudinary(videoFile.buffer, videoFile.originalname, 'videos', 'video');
//         videoUrls.push(videoUrl);
//       }
//     }

//     // Create and save course
//     const newCourse = new Course({
//       courseName,
//       instructorName,
//       instructorId,
//       notes: noteUrl,
//       video: videoUrls,
//       topic: Array.isArray(topic) ? topic : [topic]  // ensure array
//     });

//     await newCourse.save();
//     res.status(201).json(newCourse);
//   } catch (error) {
//     console.error('Create course error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
// // Get all courses
// export const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     console.log(courses); // Log the courses for debugging
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// export const getTopicsForCourse = async (req, res) => {
//   try {
//     const { courseName, instructorName } = req.query;
//     console.log(req.query); // Log the request query for debugging
//     if (!courseName || !instructorName) {
//       return res.status(400).json({ message: 'Missing courseName or instructorName' });
//     }

//     const course = await Course.findOne({ courseName, instructorName });

//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     res.status(200).json(course.topic || []);
//   } catch (error) {
//     console.error('Error fetching topics:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
// controllers/courseController.js

import Course from '../models/course.js';
import cloudinary from '../utils/cloudinary.js';

// Upload file to Cloudinary
const uploadToCloudinary = (buffer, filename, folder, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: filename.split('.')[0],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { courseName, instructorName, instructorId } = req.body;

    if (!courseName || !instructorName || !instructorId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if course already exists
    const existingCourse = await Course.findOne({ courseName, instructorName });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course already exists with this name and instructor.' });
    }

    const newCourse = new Course({ courseName, instructorName, instructorId, topics: [], students: [] });
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new topic to an existing course
export const createTopic = async (req, res) => {
  try {
    const { courseName, instructorName, topic } = req.body;
    const instructorId = req.body.instructorId || 'defaultId';

    if (!courseName || !instructorName || !topic) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Upload note file to Cloudinary
    let noteUrl = '';
    if (req.files?.note?.[0]) {
      const noteFile = req.files.note[0];
      noteUrl = await uploadToCloudinary(noteFile.buffer, noteFile.originalname, 'notes', 'raw');
    }

    // Upload video to Cloudinary
    let videoUrl = '';
    if (req.files?.video?.[0]) {
      const videoFile = req.files.video[0];
      videoUrl = await uploadToCloudinary(videoFile.buffer, videoFile.originalname, 'videos', 'video');
    }

    // Find the existing course
    const course = await Course.findOne({ courseName, instructorName });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Add new topic to the course
    course.topics.push({
      title: topic,
      video: videoUrl,
      note: noteUrl,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(req);
    console.log("hello");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getTeacherCourses = async (req, res) => {
  try {
    const instructorId = req.params.id;

    const courses = await Course.find({ instructorId });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get topics for a specific course
export const getTopicsForCourse = async (req, res) => {
  try {
    const { courseName, instructorName } = req.query;
    console.log(req.query); // Debug log

    if (!courseName || !instructorName) {
      console.log('Missing courseName or instructorName'); // Debug log
      return res.status(400).json({ message: 'Missing courseName or instructorName' });
    }

    const course = await Course.findOne({ courseName, instructorName });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log('Course found:', course); // Debug log
    // Ensure topics array exists
    const topics = course.topics || [];
    console.log('Topics:', topics); // Debug log
    res.status(200).json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select('-__v');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
};

export const getStudentCourses = async (req, res) => {
  const { studentId } = req.params;
  try {
    const courses = await Course.find({ students: studentId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve student courses' });
  }
};
export const getStudentList = async (req, res) => {
  const { courseName, instructorName } = req.query;
  console.log(req.query); // Debug log
  try {
    const course = await Course.findOne({ courseName, instructorName }).populate({
      path: 'students',
      select: 'name email -_id'
    });

    if (!course) {
      console.log('Course not found for:', courseName, instructorName);
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course.students || []);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to get students' });
  }
};

