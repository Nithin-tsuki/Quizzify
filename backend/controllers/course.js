import Course from '../models/course.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: 'auto',
    folder: folder
  });
  fs.unlinkSync(filePath);
  return result.secure_url;
};

const createCourse = async (req, res) => {
  try {
    const { courseName, instructorName, instructorId, topic } = req.body;
    const topics = Array.isArray(topic) ? topic : [topic];

    const notesFile = req.files['notes']?.[0];
    const videoFiles = req.files['video'] || [];

    if (!notesFile || videoFiles.length === 0) {
      return res.status(400).json({ message: 'Notes and at least one video file are required.' });
    }

    const notesUrl = await uploadToCloudinary(notesFile.path, 'notes');
    const videoUrls = [];

    for (const file of videoFiles) {
      const url = await uploadToCloudinary(file.path, 'videos');
      videoUrls.push(url);
    }

    const newCourse = new Course({
      courseName,
      instructorName,
      instructorId,
      notes: notesUrl,
      video: videoUrls,
      topic: topics
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default createCourse;
