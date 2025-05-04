import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  instructorName: {
    type: String,
    required: true
  },
  instructorId: {
    type: String,
    required: true
  },
  topics: [{
    title: { type: String, required: true },
    video: { type: String },
    note: { type: String }
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
