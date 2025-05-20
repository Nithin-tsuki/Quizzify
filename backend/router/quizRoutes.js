// import express from "express";
// import Quiz from "../models/quiz.js"; // Assuming 'Quiz' model schema
// const router = express.Router();

// router.post("/saveQuiz", async (req, res) => {
//   try {
//     const {
//       testName,            // From frontend
//       description,
//       subjectName,
//       duration,
//       questions,           // With question, options, correctAnswer
//       instructorName,         // instructorName
//       instructorId,           // instructorId (must be a valid ObjectId string)
//       startTime,           // Must be provided from frontend now
//       endTime              // Optional
//     } = req.body;
//     console.log("Received data:", req.body);
//     if (!testName || !description || !subjectName || !duration || !questions?.length || !instructorName || !instructorId || !startTime) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // const formattedQuestions = questions.map((q) => {
//     //   const correctOptionIndex = q.options.findIndex(opt => opt === q.correctAnswer);

//     //   return {
//     //     questionText: q.question,
//     //     options: q.options.map(opt => ({ optionText: opt })),
//     //     correctAnswer: q.correctAnswer,
//     //     correctOptionIndex
//     //   };
//     // });
//     const formattedQuestions = questions.map(q => ({
//         questionText: q.questionText,
//         options: q.options.map(o => ({ optionText: o })), // Treating each `o` as a string
//         correctAnswer: q.correctAnswer,
//         correctOptionIndex: q.correctOptionIndex
//       }));
      
      
      
//       console.log("Formatted Questions:", formattedQuestions);
//     const newQuiz = new Quiz({
//         testName,
//         description,
//         subjectName,
//         duration,
//         questions: formattedQuestions,
//         startTime: new Date(startTime),
//         endTime: endTime ? new Date(endTime) : null,
//         instructorName,
//         instructorId
//       });
      

//     await newQuiz.save();
//     res.status(201).json({ message: "Quiz saved successfully!" });
//   } catch (error) {
//     console.error("Error saving quiz:", error);
//     res.status(500).json({ error: "Error saving quiz", details: error.message });
//   }
// });
// router.post("/exam", async (req, res) => {
//     try {
//         const { subjectName } = req.body; // Extract from request body
//         if (!subjectName) return res.status(400).json({ error: "Subject is required" });
  
//         const quizzes = await Quiz.find({ subjectName });
  
//         if (quizzes.length === 0) {
//             return res.status(404).json({ message: "No quizzes available for this subject" });
//         }
  
//         res.json({ tests: quizzes });
//     } catch (error) {
//         console.error("Error fetching quizzes:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
//   });


// export default router;


import express from "express";
import Quiz from "../models/quiz.js";
import QuizChallenge from "../models/quizChallenge.js";
import Student from "../models/student.js";
import { submitQuiz } from "../controllers/quizController.js";
const router = express.Router();

// POST: Save a new quiz
router.post("/saveQuiz", async (req, res) => {
  try {
    const {
      testName,
      description,
      subjectName,
      duration,
      questions,
      instructorName,
      instructorId,
      startTime,
      endTime,
    } = req.body;

    if (!testName || !description || !subjectName || !duration || !questions?.length || !instructorName || !instructorId || !startTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const formattedQuestions = questions.map(q => ({
      questionText: q.questionText,
      options: q.options.map(o => ({ optionText: o })),
      correctAnswer: q.correctAnswer,
      correctOptionIndex: q.correctOptionIndex,
    }));

    const newQuiz = new Quiz({
      testName,
      description,
      subjectName,
      duration,
      questions: formattedQuestions,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
      instructorName,
      instructorId,
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved successfully!" });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(500).json({ error: "Error saving quiz", details: error.message });
  }
});

// POST: Get quizzes by subject
router.post("/exam", async (req, res) => {
  try {
    const { subjectName, username } = req.body;
    console.log("Received data:", req.body);
    if (!subjectName) {
      return res.status(400).json({ error: "Subject is required" });
    }

    // Increment quizzesAttended for the student
    if (username) {
      await Student.findOneAndUpdate(
        { username },                 // Assuming 'username' is a unique field in Student
        { $inc: { quizAttended: 1 } },
        { new: true }
      );
    }

    const quizzes = await Quiz.find({ subjectName });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes available for this subject" });
    }

    res.json({ tests: quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// GET: Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("testName description subjectName duration startTime endTime instructorName");
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
});

// GET: Get quiz by challenge ID and userId
router.get("/:id", async (req, res) => {
  try {
    const challengeId = req.params.id;
    const userId = req.query.userId;

    const quizChallenge = await QuizChallenge.findById(challengeId);
    if (!quizChallenge) return res.status(404).json({ message: "Quiz challenge not found" });

    const quiz = await Quiz.findById(quizChallenge.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const student = await Student.findById(userId).select("quizzesAttempted");
    if (student?.quizzesAttempted?.includes(quiz._id)) {
      return res.status(403).json({ message: "You have already attempted this quiz" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error getting quiz by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Submit a quiz
// router.post("/submit", async (req, res) => {
//   try {
//     const { userId, quizId, answers } = req.body;

//     const student = await Student.findById(userId);
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     if (student.quizzesAttempted.includes(quizId)) {
//       return res.status(403).json({ message: "You have already submitted this quiz" });
//     }

//     // TODO: Add grading logic using `answers` and `Quiz.findById(quizId)`

//     await Student.findByIdAndUpdate(userId, {
//       $addToSet: { quizzesAttempted: quizId },
//       $inc: { quizAttended: 1 },
//     });

//     res.status(200).json({ message: "Quiz submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting quiz:", error);
//     res.status(500).json({ message: "Server error while submitting quiz" });
//   }
// });

router.post('/submit-quiz', submitQuiz);

export default router;
