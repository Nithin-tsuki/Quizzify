import express from "express";
import Quiz from "../models/quiz.js"; // Assuming 'Quiz' model schema
const router = express.Router();

router.post("/saveQuiz", async (req, res) => {
  try {
    const {
      testName,            // From frontend
      description,
      subjectName,
      duration,
      questions,           // With question, options, correctAnswer
      instructorName,         // instructorName
      instructorId,           // instructorId (must be a valid ObjectId string)
      startTime,           // Must be provided from frontend now
      endTime              // Optional
    } = req.body;
    console.log("Received data:", req.body);
    if (!testName || !description || !subjectName || !duration || !questions?.length || !instructorName || !instructorId || !startTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // const formattedQuestions = questions.map((q) => {
    //   const correctOptionIndex = q.options.findIndex(opt => opt === q.correctAnswer);

    //   return {
    //     questionText: q.question,
    //     options: q.options.map(opt => ({ optionText: opt })),
    //     correctAnswer: q.correctAnswer,
    //     correctOptionIndex
    //   };
    // });
    const formattedQuestions = questions.map(q => ({
        questionText: q.questionText,
        options: q.options.map(o => ({ optionText: o })), // Treating each `o` as a string
        correctAnswer: q.correctAnswer,
        correctOptionIndex: q.correctOptionIndex
      }));
      
      
      
      console.log("Formatted Questions:", formattedQuestions);
    const newQuiz = new Quiz({
        testName,
        description,
        subjectName,
        duration,
        questions: formattedQuestions,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        instructorName,
        instructorId
      });
      

    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved successfully!" });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(500).json({ error: "Error saving quiz", details: error.message });
  }
});
router.post("/exam", async (req, res) => {
    try {
        const { subjectName } = req.body; // Extract from request body
        if (!subjectName) return res.status(400).json({ error: "Subject is required" });
  
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

export default router;
