// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link component
// import { useParams, useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
// import "../styles/quiz.css";
// import axios from "axios";
// const socket = io("http://localhost:5001"); // Adjust URL for deployment

// const Quiz = () => {
//   const { id } = useParams(); // Get quiz id from URL
//   const location = useLocation();
//   const isChallenge = new URLSearchParams(location.search).get("challenged") === "true";
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
//     const fetchQuizById = async () => {
//       if (id) {
//         try {
//           const res = await axios.get(`http://localhost:5001/quizzes/${id}`);
//           const quiz = res.data;
//           setSelectedTest(quiz);
//           setQuestions(quiz.questions || []);
//           setCurrentQuestionIndex(0);
//           setScore(0);
//           setQuizFinished(false);
//         } catch (error) {
//           console.error("Error loading quiz:", error);
//         }
//       }
//     };
//     fetchQuizById();
//   }, [id]);
//   useEffect(() => {
//     socket.on("update_leaderboard", (updatedLeaderboard) => {
//       setLeaderboard(updatedLeaderboard);
//       console.log("Updated leaderboard:", updatedLeaderboard);
//     });

//     return () => {
//       socket.off("update_leaderboard");
//     };
//   }, []);

//   const handleSubjectClick = async (subject) => {
//     setSelectedSubject(subject);
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5001/quiz/exam`, {
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
//     const isCorrect = selectedOptionText === correctText;
//     const newScore = isCorrect ? score + 1 : score;
//     setScore(newScore);
  
//     // Emit score update while playing
//     const user = JSON.parse(localStorage.getItem("user")) || { username: "Anonymous" };
//     socket.emit("update_score_live", { name: user.username, score: newScore });
  
//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setQuizFinished(true);
//       socket.emit("submit_score", { name: user.username, score: newScore });
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
//                   {index + 1}. {player.username} - {player.points} pts
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
//               <p className="question">{questions[currentQuestionIndex]?.questionText}</p>
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
import { Link, useParams, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "../styles/quiz.css";
import axios from "axios";

const socket = io("http://localhost:5001");

const Quiz = () => {
  const { id } = useParams();
  const location = useLocation();
  const isChallenge = new URLSearchParams(location.search).get("challenged") === "true";

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [tests, setTests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  const user = localStorage.getItem("user");
  const studentId = user ? JSON.parse(user).userid : null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/courses/student/${studentId}`);
        const courses = res.data || [];
        const subjectNames = courses.map(course => course.courseName);
        setSubjects(subjectNames);
      } catch (err) {
        console.error("Error fetching student courses:", err);
      }
    };

    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  useEffect(() => {
    const fetchQuizById = async () => {
      if (id) {
        try {
          const res = await axios.get(`http://localhost:5001/quizzes/${id}`);
          const quiz = res.data;
          setSelectedTest(quiz);
          setQuestions(quiz.questions || []);
          setCurrentQuestionIndex(0);
          setScore(0);
          setQuizFinished(false);
        } catch (error) {
          console.error("Error loading quiz:", error);
        }
      }
    };
    fetchQuizById();
  }, [id]);

  useEffect(() => {
    socket.on("update_leaderboard", (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
      console.log("Updated leaderboard:", updatedLeaderboard);
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
    const isCorrect = selectedOptionText === correctText;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const user = JSON.parse(localStorage.getItem("user")) || { username: "Anonymous" };
    socket.emit("update_score_live", { name: user.username, score: newScore });

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
      socket.emit("submit_score", { name: user.username, score: newScore });
    }
  };

  return (
    <div className="quiz-container">
      <button
        onClick={() => setShowLeaderboard((prev) => !prev)}
        className="liveleaderboard-toggle"
      >
        {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
      </button>

      {showLeaderboard && (
        <div className="liveleaderboard">
          <h3>🏆 Leaderboard</h3>
          <ul>
            {leaderboard.length > 0 ? (
              leaderboard.map((player, index) => (
                <li key={index}>
                  {index + 1}. {player.username} - {player.points} pts
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
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectClick(subject)}
                  className="subject-btn"
                >
                  {subject}
                </button>
              ))
            ) : (
              <p>No enrolled courses found.</p>
            )}
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
              <p className="question">{questions[currentQuestionIndex]?.questionText}</p>
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
