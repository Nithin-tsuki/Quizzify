import Challenge from "../models/challenge.js";
import cloudinary from '../utils/cloudinary.js';

// Utility to save file to Cloudinary
const uploadToCloudinary = (file, folder, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: resourceType,
          public_id: file.originalname.split('.')[0],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
  
      stream.end(file.buffer); // send the buffer directly
    });
  };
  

export const createChallenge = async (req, res) => {
  const { subject, instructorId } = req.body;
  try {
    const days = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      videoUrl: "",
      notesUrl: ""
    }));
    const challenge = new Challenge({ subject, instructorId, days });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Failed to create challenge" });
  }
};

export const updateDay = async (req, res) => {
  const { challengeId, dayIndex } = req.body;

  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const dayToUpdate = challenge.days[parseInt(dayIndex)];
    if (!dayToUpdate) {
      return res.status(404).json({ error: "Day not found" });
    }

    // Upload video file if present
    if (req.files?.video?.[0]) {
      const videoUpload = await uploadToCloudinary(req.files.video[0], 'quizzify/videos', 'video');
      dayToUpdate.videoUrl = videoUpload.secure_url;
    }

    // Upload notes file if present
    if (req.files?.notes?.[0]) {
      const notesUpload = await uploadToCloudinary(req.files.notes[0], 'quizzify/notes');
      dayToUpdate.notesUrl = notesUpload.secure_url;
    }

    await challenge.save();
    res.status(200).json({ message: "Day updated successfully", challenge });
  } catch (err) {
    console.error("Error updating day:", err);
    res.status(500).json({ error: "Failed to update day" });
  }
};

export const getAllChallenges = async (req, res) => {
    try {
      const challenges = await Challenge.find();
      res.json(challenges);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch challenges' });
    }
  };