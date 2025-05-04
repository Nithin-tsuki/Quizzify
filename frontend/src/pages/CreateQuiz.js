// import React, { useState } from 'react';
// import '../styles/createquiz.css';

// const CreateQuiz = () => {
//   const [quizData, setQuizData] = useState({
//     title: '',
//     subject: 'Math',
//     totalQuestions: 1,
//     timeLimit: 60,
//     startTime: '',
//     endTime: '',
//     challenge: false, // New state for challenge feature
//     questions: [
//       {
//         question: '',
//         options: ['', '', '', ''],
//         correctAnswer: '',
//         points: 1,
//       },
//     ],
//   });

//   const handleInputChange = (e, questionIndex, field) => {
//     const value = e.target.value;
//     const newQuizData = { ...quizData };

//     if (field === 'title' || field === 'subject' || field === 'timeLimit' || field === 'startTime' || field === 'endTime' || field === 'challenge') {
//       if (field === 'challenge') {
//         newQuizData[field] = e.target.checked; // Handle checkbox change
//       } else {
//         newQuizData[field] = value;
//       }
//     } else if (field === 'totalQuestions') {
//       newQuizData.totalQuestions = value;
//       while (newQuizData.questions.length < value) {
//         newQuizData.questions.push({
//           question: '',
//           options: ['', '', '', ''],
//           correctAnswer: '',
//           points: 1,
//         });
//       }
//     } else if (field === 'options') {
//       newQuizData.questions[questionIndex].options = value;
//     } else {
//       newQuizData.questions[questionIndex][field] = value;
//     }

//     setQuizData(newQuizData);
//   };

//   const handleAddQuestion = () => {
//     const newQuizData = { ...quizData };
//     newQuizData.questions.push({
//       question: '',
//       options: ['', '', '', ''],
//       correctAnswer: '',
//       points: 1,
//     });
//     setQuizData(newQuizData);
//   };

//   const handleRemoveQuestion = (index) => {
//     const newQuizData = { ...quizData };
//     newQuizData.questions.splice(index, 1);
//     setQuizData(newQuizData);
//   };

//   return (
//     <div className="page">
//       <h1 className="quiz-title">Create a Quiz</h1>

//       <div className="quiz-settings">
//         <label>
//           Quiz Title:
//           <input
//             type="text"
//             value={quizData.title}
//             onChange={(e) => handleInputChange(e, null, 'title')}
//             placeholder="Enter quiz title"
//           />
//         </label>

//         <label>
//           Subject:
//           <select
//             value={quizData.subject}
//             onChange={(e) => handleInputChange(e, null, 'subject')}
//           >
//             <option value="Math">Math</option>
//             <option value="Physics">Physics</option>
//             <option value="Chemistry">Chemistry</option>
//           </select>
//         </label>

//         <label>
//           Number of Questions:
//           <input
//             type="number"
//             min="1"
//             value={quizData.totalQuestions}
//             onChange={(e) => handleInputChange(e, null, 'totalQuestions')}
//           />
//         </label>

//         <label>
//           Time Limit (Minutes):
//           <input
//             type="number"
//             min="1"
//             value={quizData.timeLimit}
//             onChange={(e) => handleInputChange(e, null, 'timeLimit')}
//           />
//         </label>

//         <label>
//           Start Time:
//           <input
//             type="datetime-local"
//             value={quizData.startTime}
//             onChange={(e) => handleInputChange(e, null, 'startTime')}
//           />
//         </label>

//         <label>
//           End Time:
//           <input
//             type="datetime-local"
//             value={quizData.endTime}
//             onChange={(e) => handleInputChange(e, null, 'endTime')}
//           />
//         </label>

//         <label>
//           Challenge Quiz:
//           <input
//             type="checkbox"
//             checked={quizData.challenge}
//             onChange={(e) => handleInputChange(e, null, 'challenge')}
//           />
//         </label>
//       </div>

//       <div className="questions-section">
//         <h2>Questions</h2>
//         {quizData.questions.map((q, index) => (
//           <div key={index} className="question-card">
//             <label>
//               Question:
//               <input
//                 type="text"
//                 value={q.question}
//                 onChange={(e) => handleInputChange(e, index, 'question')}
//                 placeholder="Enter your question"
//               />
//             </label>

//             <label>
//               Points:
//               <input
//                 type="number"
//                 min="1"
//                 value={q.points}
//                 onChange={(e) => handleInputChange(e, index, 'points')}
//               />
//             </label>

//             {q.options.map((opt, i) => (
//               <label key={i}>
//                 Option {i + 1}:
//                 <input
//                   type="text"
//                   value={opt}
//                   onChange={(e) => {
//                     const options = [...q.options];
//                     options[i] = e.target.value;
//                     handleInputChange({ target: { value: options } }, index, 'options');
//                   }}
//                 />
//               </label>
//             ))}

//             <label>
//               Correct Answer:
//               <input
//                 type="text"
//                 value={q.correctAnswer}
//                 onChange={(e) => handleInputChange(e, index, 'correctAnswer')}
//                 placeholder="Enter correct answer"
//               />
//             </label>

//             <button type="button" className="remove-btn" onClick={() => handleRemoveQuestion(index)}>
//               Remove Question
//             </button>
//           </div>
//         ))}

//         <button type="button" className="add-btn" onClick={handleAddQuestion}>
//           Add Question
//         </button>
//       </div>

//       <div className="submit-section">
//         <button type="submit" className="submit-btn">Submit Quiz</button>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;


// import React, { useState } from "react";
// import "../styles/createquiz.css"
// const CreateQuiz = () => {
//   const [questions, setQuestions] = useState([
//     { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 },
//   ]);
//   const [testName, setTestName] = useState("");
//   const [description, setDescription] = useState("");
//   const [subjectName, setSubjectName] = useState("general");
//   const [duration, setDuration] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check that all options are filled in
//     for (let q of questions) {
//       if (q.options.some((opt) => !opt.trim())) {
//         alert("Please fill in all the options for each question.");
//         return;
//       }
//     }

//     // Check for valid correctOptionIndex
//     for (let q of questions) {
//       if (q.correctOptionIndex < 0 || q.correctOptionIndex >= q.options.length) {
//         alert("Correct option index is invalid.");
//         return;
//       }
//     }

//     const instructor = JSON.parse(localStorage.getItem("user")) || {
//       name: "Anonymous",
//       _id: "000000000000000000000000",
//     };

//     // Format questions
//     const formattedQuestions = questions
//       .map((q) => {
//         if (q.correctOptionIndex !== undefined && q.options[q.correctOptionIndex]) {
//           return {
//             questionText: q.questionText,
//             options: q.options, // Ensure this is correctly passed as an array of strings
//             correctAnswer: q.options[q.correctOptionIndex], // Get the option text for the correct answer
//             correctOptionIndex: q.correctOptionIndex, // Correct index
//           };
//         } else {
//           console.error(Missing correctOptionIndex or options for question: ${q.questionText});
//           return null; // Ensure this won't be null or undefined
//         }
//       })
//       .filter((q) => q !== null); // Remove null questions if any

//     const quizData = {
//       testName,
//       description,
//       subjectName,
//       duration: parseInt(duration),
//       startTime: new Date(startTime),
//       endTime: endTime ? new Date(endTime) : null,
//       questions: formattedQuestions,
//       instructorName: instructor.username,
//       instructorId: instructor.userid,
//     };

//     // Log quiz data to check
//     console.log("Quiz Data being sent:", quizData);

//     try {
//       const response = await fetch("http://localhost:5001/quiz/saveQuiz", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(quizData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Quiz saved successfully!");
//         setTestName("");
//         setDescription("");
//         setSubjectName("general");
//         setDuration("");
//         setStartTime("");
//         setEndTime("");
//         setQuestions([{ questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 }]);
//       } else {
//         alert(Error: ${data.error});
//       }
//     } catch (error) {
//       console.error("Error saving quiz:", error);
//     }
//   };

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options[oIndex] = value.trim();  // Ensure no extra spaces
//     setQuestions(updatedQuestions);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           Create a Quiz
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">Test Name:</label>
//             <input
//               type="text"
//               value={testName}
//               onChange={(e) => setTestName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Description:</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               rows="3"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Subject Name:</label>
//             <select
//               value={subjectName}
//               onChange={(e) => setSubjectName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             >
//               <option value="general">General Knowledge</option>
//               <option value="science">Science</option>
//               <option value="math">Mathematics</option>
//               <option value="history">History</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Start Time:</label>
//             <input
//               type="datetime-local"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">End Time (Optional):</label>
//             <input
//               type="datetime-local"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Total Duration (mins):</label>
//             <input
//               type="number"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               min="1"
//               required
//             />
//           </div>

//           <div className="space-y-6">
//             {questions.map((q, qIndex) => (
//               <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
//                 <label className="block text-gray-700 font-medium">Question:</label>
//                 <input
//                   type="text"
//                   value={q.questionText}
//                   onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md"
//                   required
//                 />

//                 <label className="block text-gray-700 font-medium mt-2">Options:</label>
//                 {q.options.map((opt, oIndex) => (
//                   <input
//                     key={oIndex}
//                     type="text"
//                     value={opt}
//                     onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
//                     className="w-full px-4 py-2 border rounded-md mt-1"
//                     placeholder={Option ${oIndex + 1}}
//                     required
//                   />
//                 ))}

//                 <label className="block text-gray-700 font-medium mt-2">Correct Option Index (0-3):</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="3"
//                   value={q.correctOptionIndex}
//                   onChange={(e) => handleQuestionChange(qIndex, "correctOptionIndex", Number(e.target.value))}
//                   className="w-full px-4 py-2 border rounded-md"
//                   required
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={handleAddQuestion}
//             className="w-full bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700"
//           >
//             Add Next Question
//           </button>

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//           >
//             Save Quiz
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;
import React, { useState } from "react";
import '../styles/createquiz.css';

const CreateQuiz = () => {
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

    for (let q of questions) {
      if (q.options.some((opt) => !opt.trim())) {
        alert("Please fill in all the options for each question.");
        return;
      }
      if (q.correctOptionIndex < 0 || q.correctOptionIndex >= q.options.length) {
        alert("Correct option index is invalid.");
        return;
      }
    }

    const instructor = JSON.parse(localStorage.getItem("user")) || {
      name: "Anonymous",
      _id: "000000000000000000000000",
    };

    const formattedQuestions = questions
      .map((q) => {
        if (q.correctOptionIndex !== undefined && q.options[q.correctOptionIndex]) {
          return {
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.options[q.correctOptionIndex],
            correctOptionIndex: q.correctOptionIndex,
          };
        } else {
          console.error(`Missing correctOptionIndex or options for question: ${q.questionText}`);
          return null;
        }
      })
      .filter((q) => q !== null);

    const quizData = {
      testName,
      description,
      subjectName,
      duration: parseInt(duration),
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
      questions: formattedQuestions,
      instructorName: instructor.username,
      instructorId: instructor.userid,
    };

    try {
      const response = await fetch("http://localhost:5001/quiz/saveQuiz", {
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
    updatedQuestions[qIndex].options[oIndex] = value.trim();
    setQuestions(updatedQuestions);
  };

  return (
    <div className="cqz-container">
      <div className="cqz-form-box">
        <h2 className="cqz-heading">Create a Quiz</h2>
        <form onSubmit={handleSubmit} className="cqz-form">
          <div>
            <label className="cqz-label">Test Name:</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="cqz-input"
              required
            />
          </div>

          <div>
            <label className="cqz-label">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="cqz-input"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="cqz-label">Subject Name:</label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="cqz-input"
              required
            >
              <option value="general">General Knowledge</option>
              <option value="science">Science</option>
              <option value="math">Mathematics</option>
              <option value="history">History</option>
            </select>
          </div>

          <div>
            <label className="cqz-label">Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="cqz-input"
              required
            />
          </div>

          <div>
            <label className="cqz-label">End Time (Optional):</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="cqz-input"
            />
          </div>

          <div>
            <label className="cqz-label">Total Duration (mins):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="cqz-input"
              min="1"
              required
            />
          </div>

          <div className="cqz-questions">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="cqz-question-block">
                <label className="cqz-label">Question:</label>
                <input
                  type="text"
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "questionText", e.target.value)
                  }
                  className="cqz-input"
                  required
                />

                <label className="cqz-label mt-2">Options:</label>
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="cqz-input mt-1"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                ))}

                <label className="cqz-label mt-2">Correct Option Index (0-3):</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={q.correctOptionIndex}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "correctOptionIndex", Number(e.target.value))
                  }
                  className="cqz-input"
                  required
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="cqz-button cqz-add-btn"
          >
            Add Next Question
          </button>

          <button type="submit" className="cqz-button cqz-save-btn">
            Save Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;