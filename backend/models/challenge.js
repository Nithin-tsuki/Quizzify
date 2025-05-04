import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
  day: Number,
  videoUrl: String,
  notesUrl: String,
});

const challengeSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  days: [daySchema],
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
