// import mongoose from "mongoose";

// // Option schema to define each option as an object with optionText
// const optionSchema = new mongoose.Schema({
//   optionText: {
//     type: String,
//     required: true
//   }
// });

// // Question schema that uses the optionSchema for options
// const questionSchema = new mongoose.Schema({
//   questionText: { 
//     type: String, 
//     required: true 
//   },
//   options: [optionSchema], // Using the optionSchema for each option
//   correctAnswer: { 
//     type: String, 
//     required: true 
//   },
//   correctOptionIndex: { 
//     type: Number, 
//     required: true 
//   }
// });

// // Main quiz schema
// const quizSchema = new mongoose.Schema({
//   testName: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   subjectName: {
//     type: String,
//     required: true
//   },
//   duration: {
//     type: Number, // Duration in minutes
//     required: true
//   },
//   questions: [questionSchema], // Array of questions using questionSchema
//   startTime: {
//     type: Date,
//     required: true
//   },
//   endTime: {
//     type: Date,
//     default: null // If endTime is not provided, it will be available forever
//   },
//   instructorName: {
//     type: String,
//     required: true

//   },
//   instructorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Instructor',
//     required: true
//   }
// });

// // Create and export the Quiz model
// const Quiz = mongoose.model('Quiz', quizSchema);
// export default Quiz;

import mongoose from "mongoose";

// Option schema to define each option as an object with optionText
const optionSchema = new mongoose.Schema({
  optionText: {
    type: String,
    required: true
  }
});

// Question schema that uses the optionSchema for options
const questionSchema = new mongoose.Schema({
  questionText: { 
    type: String, 
    required: true 
  },
  options: [optionSchema], // Using the optionSchema for each option
  correctAnswer: { 
    type: String, 
    required: true 
  },
  correctOptionIndex: { 
    type: Number, 
    required: true 
  }
});

// Main quiz schema
const quizSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true
  },
  questions: [questionSchema], // Array of questions using questionSchema
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    default: null // If endTime is not provided, it will be available forever
  },
  instructorName: {
    type: String,
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  }
});

// TTL index to auto-delete quiz documents after endTime
quizSchema.index({ endTime: 1 }, { expireAfterSeconds: 0 });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
