// import React, { useState, useEffect } from "react";
// import { Link, useParams, useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
// import "../styles/quiz.css";
// import axios from "axios";

// const socket = io("http://localhost:5001");

// const Quiz = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const isChallenge = new URLSearchParams(location.search).get("challenged") === "true";

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);
//   const [showLeaderboard, setShowLeaderboard] = useState(true);
//   const [user, setUser] = useState(null);
//   const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = typeof storedUser === "string" ? JSON.parse(storedUser) : storedUser;
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user from localStorage:", error);
//       }
//     }
//   }, []);

//   const studentId = user ? user.userid : null;

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5001/api/courses/student/${studentId}`);
//         const courses = res.data || [];
//         const subjectNames = courses.map(course => course.courseName);
//         setSubjects(subjectNames);
//       } catch (err) {
//         console.error("Error fetching student courses:", err);
//       }
//     };

//     if (studentId) {
//       fetchCourses();
//     }
//   }, [studentId]);

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
//           setHasAnsweredCurrent(false);
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
//         body: JSON.stringify({
//           subjectName: subject.toLowerCase(),
//           username: user?.username,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setTests(data.tests || []);
//       } else {
//         console.error("Server responded with error:", data.error || data.message);
//         setTests([]);
//       }
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
//     setHasAnsweredCurrent(false);
//   };

//   const handleAnswerClick = (selectedOptionText) => {
//     const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;
//     const correctText =
//       typeof correctAnswer === "object" ? correctAnswer.optionText : correctAnswer;
//     const isCorrect = selectedOptionText === correctText;
//     const newScore = isCorrect ? score + 1 : score;
//     setScore(newScore);

//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       setHasAnsweredCurrent(false);
//     } else {
//       setHasAnsweredCurrent(true);
//     }
//   };

//   const handleSubmitQuiz = () => {
//     setQuizFinished(true);

//     const localUser = JSON.parse(localStorage.getItem("user")) || { username: "Anonymous" };
//     socket.emit("submit_score", { name: localUser.username, score });

//     const existingPoints = localUser.points || 0;
//     const updatedUser = { ...localUser, points: existingPoints + score };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     window.dispatchEvent(new Event("userUpdated"));
//   };

//   return (
//     <div className="quiz-container">
//       <button
//         onClick={() => setShowLeaderboard((prev) => !prev)}
//         className="liveleaderboard-toggle"
//       >
//         {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
//       </button>

//       {showLeaderboard && (
//         <div className="liveleaderboard">
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
//             {subjects.length > 0 ? (
//               subjects.map((subject) => (
//                 <button
//                   key={subject}
//                   onClick={() => handleSubjectClick(subject)}
//                   className="subject-btn"
//                 >
//                   {subject}
//                 </button>
//               ))
//             ) : (
//               <p>No enrolled courses found.</p>
//             )}
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
//               {currentQuestionIndex === questions.length - 1 && hasAnsweredCurrent && (
//                 <button className="qu-submit-btn" onClick={handleSubmitQuiz}>
//                   Submit Quiz
//                 </button>
//               )}
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
import { useParams, useLocation } from "react-router-dom";
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
  const [user, setUser] = useState(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = typeof storedUser === "string" ? JSON.parse(storedUser) : storedUser;
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const studentId = user?.userid || null;

  useEffect(() => {
    if (!studentId) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/courses/student/${studentId}`);
        const courses = res.data || [];
        setSubjects(courses.map(course => course.courseName));
      } catch (err) {
        console.error("Error fetching student courses:", err);
      }
    };

    fetchCourses();
  }, [studentId]);

  useEffect(() => {
    if (!id) return;

    const fetchQuizById = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/quizzes/${id}`);
        const quiz = res.data;
        setSelectedTest(quiz);
        setQuestions(quiz.questions || []);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
        setHasAnsweredCurrent(false);
      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };

    fetchQuizById();
  }, [id]);

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
        body: JSON.stringify({
          subjectName: subject.toLowerCase(),
          username: user?.username,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTests(data.tests || []);
      } else {
        console.error("Server responded with error:", data.error || data.message);
        setTests([]);
      }
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
    setHasAnsweredCurrent(false);
  };

  const handleAnswerClick = (selectedOptionText) => {
    if (hasAnsweredCurrent) return; // prevent multiple answers per question

    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;
    const correctText = typeof correctAnswer === "object" ? correctAnswer.optionText : correctAnswer;
    const isCorrect = selectedOptionText === correctText;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    // Emit live score update
    if (user?.username) {
      socket.emit("update_score_live", { name: user.username, score: newScore });
    }

    setHasAnsweredCurrent(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasAnsweredCurrent(false);
    } else {
      // Last question answered, show submit button
      setHasAnsweredCurrent(true);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizFinished(true);

    const localUser = JSON.parse(localStorage.getItem("user")) || { username: "Anonymous" };
    socket.emit("submit_score", { name: localUser.username, score });

    const existingPoints = localUser.points || 0;
    const updatedUser = { ...localUser, points: existingPoints + score };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("userUpdated"));
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
                    disabled={hasAnsweredCurrent}
                  >
                    {option.optionText}
                  </button>
                ))}
              </div>

              {hasAnsweredCurrent && currentQuestionIndex + 1 < questions.length && (
                <button className="back-btn" onClick={handleNextQuestion}>
                  Next Question
                </button>
              )}

              {hasAnsweredCurrent && currentQuestionIndex + 1 === questions.length && (
                <button className="back-btn" onClick={handleSubmitQuiz}>
                  Submit Quiz
                </button>
              )}
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
