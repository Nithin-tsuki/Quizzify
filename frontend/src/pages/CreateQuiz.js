// import React, { useState } from "react";
// import '../styles/createquiz.css';

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

//     for (let q of questions) {
//       if (q.options.some((opt) => !opt.trim())) {
//         alert("Please fill in all the options for each question.");
//         return;
//       }
//       if (q.correctOptionIndex < 0 || q.correctOptionIndex >= q.options.length) {
//         alert("Correct option index is invalid.");
//         return;
//       }
//     }

//     const instructor = JSON.parse(localStorage.getItem("user")) || {
//       name: "Anonymous",
//       _id: "000000000000000000000000",
//     };

//     const formattedQuestions = questions
//       .map((q) => {
//         if (q.correctOptionIndex !== undefined && q.options[q.correctOptionIndex]) {
//           return {
//             questionText: q.questionText,
//             options: q.options,
//             correctAnswer: q.options[q.correctOptionIndex],
//             correctOptionIndex: q.correctOptionIndex,
//           };
//         } else {
//           console.error(`Missing correctOptionIndex or options for question: ${q.questionText}`);
//           return null;
//         }
//       })
//       .filter((q) => q !== null);

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
//         alert(`Error: ${data.error}`);
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
//     updatedQuestions[qIndex].options[oIndex] = value.trim();
//     setQuestions(updatedQuestions);
//   };

//   return (
//     <div className="cqz-container">
//       <div className="cqz-form-box">
//         <h2 className="cqz-heading">Create a Quiz</h2>
//         <form onSubmit={handleSubmit} className="cqz-form">
//           <div>
//             <label className="cqz-label">Test Name:</label>
//             <input
//               type="text"
//               value={testName}
//               onChange={(e) => setTestName(e.target.value)}
//               className="cqz-input"
//               required
//             />
//           </div>

//           <div>
//             <label className="cqz-label">Description:</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="cqz-input"
//               rows="3"
//               required
//             />
//           </div>

//           <div>
//             <label className="cqz-label">Subject Name:</label>
//             <select
//               value={subjectName}
//               onChange={(e) => setSubjectName(e.target.value)}
//               className="cqz-input"
//               required
//             >
//               <option value="general">General Knowledge</option>
//               <option value="science">Science</option>
//               <option value="math">Mathematics</option>
//               <option value="history">History</option>
//             </select>
//           </div>

//           <div>
//             <label className="cqz-label">Start Time:</label>
//             <input
//               type="datetime-local"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="cqz-input"
//               required
//             />
//           </div>

//           <div>
//             <label className="cqz-label">End Time (Optional):</label>
//             <input
//               type="datetime-local"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="cqz-input"
//             />
//           </div>

//           <div>
//             <label className="cqz-label">Total Duration (mins):</label>
//             <input
//               type="number"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//               className="cqz-input"
//               min="1"
//               required
//             />
//           </div>

//           <div className="cqz-questions">
//             {questions.map((q, qIndex) => (
//               <div key={qIndex} className="cqz-question-block">
//                 <label className="cqz-label">Question:</label>
//                 <input
//                   type="text"
//                   value={q.questionText}
//                   onChange={(e) =>
//                     handleQuestionChange(qIndex, "questionText", e.target.value)
//                   }
//                   className="cqz-input"
//                   required
//                 />

//                 <label className="cqz-label mt-2">Options:</label>
//                 {q.options.map((opt, oIndex) => (
//                   <input
//                     key={oIndex}
//                     type="text"
//                     value={opt}
//                     onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
//                     className="cqz-input mt-1"
//                     placeholder={`Option ${oIndex + 1}`}
//                     required
//                   />
//                 ))}

//                 <label className="cqz-label mt-2">Correct Option Index (0-3):</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="3"
//                   value={q.correctOptionIndex}
//                   onChange={(e) =>
//                     handleQuestionChange(qIndex, "correctOptionIndex", Number(e.target.value))
//                   }
//                   className="cqz-input"
//                   required
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={handleAddQuestion}
//             className="cqz-button cqz-add-btn"
//           >
//             Add Next Question
//           </button>

//           <button type="submit" className="cqz-button cqz-save-btn">
//             Save Quiz
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;
import React, { useState, useEffect } from "react";
import '../styles/createquiz.css';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0 },
  ]);
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    const instructor = JSON.parse(localStorage.getItem("user"));

    if (instructor && instructor.userid) {
      fetch(`http://localhost:5001/api/courses/teacher/${instructor.userid}`)
        .then((res) => res.json())
        .then((data) => {
          const courseNames = data.map(course => course.courseName);
          setAvailableSubjects(courseNames);
          if (courseNames.length > 0) setSubjectName(courseNames[0]); // set default
        })
        .catch((err) => console.error("Error fetching courses:", err));
    }
  }, []);

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
        setSubjectName(availableSubjects[0] || "");
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
              {availableSubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
              {availableSubjects.length === 0 && (
                <option disabled>No courses found</option>
              )}
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
