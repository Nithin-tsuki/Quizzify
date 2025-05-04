// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import "../styles/quiz.css";

// const socket = io("http://localhost:5001"); // Adjust URL for deployment

// const Quiz = () => {
//   const [showLeaderboard, setShowLeaderboard] = useState(true);
//   const subjects = ["Math", "Science", "Programming", "General Knowledge"];

//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);

//   useEffect(() => {
//     socket.on("update_leaderboard", (updatedLeaderboard) => {
//       setLeaderboard(updatedLeaderboard);
//     });

//     return () => {
//       socket.off("update_leaderboard");
//     };
//   }, []);

//   const handleSubjectClick = async (subject) => {
//     setSelectedSubject(subject);
//     setLoading(true);
//     try {
//       const response = await fetch(http://localhost:5001/quiz/exam, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ subjectName: subject.toLowerCase() }),
//       });
//       const data = await response.json();
//       setTests(response.ok ? data.tests || [] : []);
//     } catch (error) {
//       console.error("Error fetching tests:", error);
//       setTests([]);
//     }
//     setLoading(false);
//   };

//   const handleTestClick = (test) => {
//     setSelectedTest(test);
//     setQuestions(test.questions || []);
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setQuizFinished(false);
//   };

//   const handleAnswerClick = (selectedOptionText) => {
//     const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;
//     const correctText =
//       typeof correctAnswer === "object" ? correctAnswer.optionText : correctAnswer;
//     const newScore = selectedOptionText === correctText ? score + 1 : score;
//     setScore(newScore);

//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setQuizFinished(true);
//       const user = JSON.parse(localStorage.getItem("user")) || { name: "Anonymous" };
//       socket.emit("submit_score", { name: user.name, score: newScore });
//     }
//   };

//   return (
//     <div className="quiz-container">
//       <button
//         onClick={() => setShowLeaderboard((prev) => !prev)}
//         className="leaderboard-toggle"
//       >
//         {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
//       </button>

//       {showLeaderboard && (
//         <div className="leaderboard">
//           <h3>🏆 Leaderboard</h3>
//           <ul>
//             {leaderboard.length > 0 ? (
//               leaderboard.map((player, index) => (
//                 <li key={index}>
//                   {index + 1}. {player.name} - {player.score} pts
//                 </li>
//               ))
//             ) : (
//               <p>No scores yet</p>
//             )}
//           </ul>
//         </div>
//       )}

//       {!selectedTest ? (
//         <>
//           <h2 className="heading">Select a Subject</h2>
//           <div className="subject-buttons">
//             {subjects.map((subject) => (
//               <button
//                 key={subject}
//                 onClick={() => handleSubjectClick(subject)}
//                 className="subject-btn"
//               >
//                 {subject}
//               </button>
//             ))}
//           </div>
//           {loading && <p className="loading-text">Loading tests...</p>}
//           {selectedSubject && !loading && (
//             <div className="test-list">
//               <h3>Available {selectedSubject} Tests</h3>
//               {tests.length > 0 ? (
//                 <ul>
//                   {tests.map((test) => (
//                     <li
//                       key={test._id}
//                       onClick={() => handleTestClick(test)}
//                       className="test-item"
//                     >
//                       {test.description} - {test.duration} mins
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No tests available.</p>
//               )}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="quiz-box">
//           {!quizFinished ? (
//             <>
//               <h2>{selectedTest.description}</h2>
//               <p className="question">{questions[currentQuestionIndex]?.question}</p>
//               <div className="options">
//                 {questions[currentQuestionIndex]?.options.map((option, index) => (
//                   <button
//                     key={option._id || index}
//                     className="option-btn"
//                     onClick={() => handleAnswerClick(option.optionText)}
//                   >
//                     {option.optionText}
//                   </button>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <h2>Quiz Completed!</h2>
//               <p className="score">
//                 Your Score: {score} / {questions.length}
//               </p>
//               <button
//                 onClick={() => setSelectedTest(null)}
//                 className="back-btn"
//               >
//                 Back to Tests
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component
import { io } from "socket.io-client";
import "../styles/quiz.css";

const socket = io("http://localhost:5001"); // Adjust URL for deployment

const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const subjects = ["Math", "Science", "Programming", "General Knowledge"];

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [tests, setTests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    socket.on("update_leaderboard", (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.off("update_leaderboard");
    };
  }, []);

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/quiz/exam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectName: subject.toLowerCase() }),
      });
      const data = await response.json();
      setTests(response.ok ? data.tests || [] : []);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setTests([]);
    }
    setLoading(false);
  };

  const handleTestClick = (test) => {
    setSelectedTest(test);
    setQuestions(test.questions || []);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerClick = (selectedOptionText) => {
    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;
    const correctText =
      typeof correctAnswer === "object" ? correctAnswer.optionText : correctAnswer;
    const newScore = selectedOptionText === correctText ? score + 1 : score;
    setScore(newScore);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
      const user = JSON.parse(localStorage.getItem("user")) || { name: "Anonymous" };
      socket.emit("submit_score", { name: user.name, score: newScore });
    }
  };

  return (
    <div className="quiz-container">
      <button
        onClick={() => setShowLeaderboard((prev) => !prev)}
        className="leaderboard-toggle"
      >
        {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
      </button>

      {showLeaderboard && (
        <div className="leaderboard">
          <h3>🏆 Leaderboard</h3>
          <ul>
            {leaderboard.length > 0 ? (
              leaderboard.map((player, index) => (
                <li key={index}>
                  {index + 1}. {player.name} - {player.score} pts
                </li>
              ))
            ) : (
              <p>No scores yet</p>
            )}
          </ul>
        </div>
      )}

      {!selectedTest ? (
        <>
          <h2 className="heading">Select a Subject</h2>
          <div className="subject-buttons">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleSubjectClick(subject)}
                className="subject-btn"
              >
                {subject}
              </button>
            ))}
          </div>
          {loading && <p className="loading-text">Loading tests...</p>}
          {selectedSubject && !loading && (
            <div className="test-list">
              <h3>Available {selectedSubject} Tests</h3>
              {tests.length > 0 ? (
                <ul>
                  {tests.map((test) => (
                    <li
                      key={test._id}
                      onClick={() => handleTestClick(test)}
                      className="test-item"
                    >
                      {test.description} - {test.duration} mins
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tests available.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="quiz-box">
          {!quizFinished ? (
            <>
              <h2>{selectedTest.description}</h2>
              <p className="question">{questions[currentQuestionIndex]?.question}</p>
              <div className="options">
                {questions[currentQuestionIndex]?.options.map((option, index) => (
                  <button
                    key={option._id || index}
                    className="option-btn"
                    onClick={() => handleAnswerClick(option.optionText)}
                  >
                    {option.optionText}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>Quiz Completed!</h2>
              <p className="score">
                Your Score: {score} / {questions.length}
              </p>
              <Link to="/quiz-test" className="start-test-link">Start New Test</Link> {/* Added Link */}
              <button
                onClick={() => setSelectedTest(null)}
                className="back-btn"
              >
                Back to Tests
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;