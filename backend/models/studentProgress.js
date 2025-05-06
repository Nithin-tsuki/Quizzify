import mongoose from 'mongoose';

const lessonProgressSchema = new mongoose.Schema({
  dayIndex: Number,
  completed: { type: Boolean, default: false }
});

const studentProgressSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  challengeId: mongoose.Schema.Types.ObjectId,
  lessons: [lessonProgressSchema]
});

const StudentProgress = mongoose.model('StudentProgress', studentProgressSchema);
export default StudentProgress;
