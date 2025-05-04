
// import { useState } from "react";
// import "../styles/quiztest.css";

// const questions = [
//   {
//     id: 1,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 2,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 3,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 4,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 5,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 6,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 7,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 8,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 9,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 10,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   },
//   {
//     id: 11,
//     question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
//     options: ["120 m", "240 m", "300 m", "None of these"],
//     correctAnswer: "240 m",
//   }
//   // Add more questions like this...
// ];

// export default function QuizTest() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});

//   const handleOptionSelect = (option) => {
//     setAnswers({ ...answers, [currentQuestion]: option });
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
//   };

//   const handleSubmit = () => {
//     let score = 0;
//     questions.forEach((q, index) => {
//       if (answers[index] === q.correctAnswer) {
//         score++;
//       }
//     });
//     alert(`You scored ${score} out of ${questions.length}`);
//   };

//   return (
//     <div className="quiz-container">
//       {/* Main Quiz Area */}
//       <div className="quiz-main">
//         <h2 className="quiz-title">Quiz Title</h2>

//         <div className="quiz-question-block">
//           <h3 className="quiz-question-number">
//             Question {questions[currentQuestion].id}
//           </h3>
//           <p className="quiz-question-text">{questions[currentQuestion].question}</p>

//           <div className="quiz-options">
//             {questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleOptionSelect(option)}
//                 className={`quiz-option ${
//                   answers[currentQuestion] === option ? "selected" : ""
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="quiz-navigation">
//           <button
//             className="nav-button"
//             onClick={handlePrev}
//             disabled={currentQuestion === 0}
//           >
//             Prev
//           </button>
//           {currentQuestion === questions.length - 1 ? (
//             <button className="nav-button" onClick={handleSubmit}>
//               Submit
//             </button>
//           ) : (
//             <button
//               className="nav-button"
//               onClick={handleNext}
//               disabled={currentQuestion === questions.length - 1}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="quiz-sidebar">
//         <div className="sidebar-header">
//           <p>Question {currentQuestion + 1}/{questions.length}</p>
//           <p className="help-text">Need Help?</p>
//         </div>

//         <div className="sidebar-questions">
//           {questions.map((q, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrentQuestion(index)}
//               className={`sidebar-question ${
//                 answers[index] ? "answered" : ""
//               }`}
//             >
//               {q.id}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

const QuizTest = () => {
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 },
  ]);
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [subjectName, setSubjectName] = useState("general");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const instructor = JSON.parse(localStorage.getItem("user")) || {
      name: "Anonymous",
      _id: "000000000000000000000000",
    };

    const formattedQuestions = questions.map((q) => ({
      questionText: q.questionText,
      options: q.options.map((opt) => ({ optionText: opt })),
      correctAnswer: q.options[q.correctOptionIndex],
      correctOptionIndex: q.correctOptionIndex,
    }));

    const quizData = {
      testName,
      description,
      subjectName,
      duration: parseInt(duration),
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
      questions: formattedQuestions,
      instructorName: instructor.name,
      instructorId: instructor._id,
    };

    try {
      const response = await fetch("https://localhost:5001/quiz/saveQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Quiz saved successfully!");
        setTestName("");
        setDescription("");
        setSubjectName("general");
        setDuration("");
        setStartTime("");
        setEndTime("");
        setQuestions([{ questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }]);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create a Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Test Name:</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Subject Name:</label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="general">General Knowledge</option>
              <option value="science">Science</option>
              <option value="math">Mathematics</option>
              <option value="history">History</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">End Time (Optional):</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Total Duration (mins):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              min="1"
              required
            />
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-gray-700 font-medium">Question:</label>
                <input
                  type="text"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />

                <label className="block text-gray-700 font-medium mt-2">Options:</label>
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="w-full px-4 py-2 border rounded-md mt-1"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                ))}

                <label className="block text-gray-700 font-medium mt-2">Correct Option Index (0-3):</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={q.correctOptionIndex}
                  onChange={(e) => handleQuestionChange(qIndex, "correctOptionIndex", Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700"
          >
            Add Next Question
          </button>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Save Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizTest;
