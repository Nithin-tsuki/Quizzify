// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/quiz.css';

// const quizzes = [
//   {
//     id: 1,
//     title: "React Basics Quiz",
//     description: "Test your understanding of React components, props, and state.",
//     status: "Live Now",
//     instructorId: "instructor_01",
//     instructorName: "John Doe"
//   },
//   {
//     id: 2,
//     title: "Python Logic Test",
//     description: "Sharpen your Python skills with these logical puzzles.",
//     status: "Live Now",
//     instructorId: "instructor_02",
//     instructorName: "Jane Smith"
//   },
//   {
//     id: 3,
//     title: "CSS Challenge",
//     description: "Can you spot the right styles? Put your CSS knowledge to the test!",
//     status: "Upcoming",
//     instructorId: "instructor_03",
//     instructorName: "Alice Johnson"
//   }
// ];

// const Quiz = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');
//   const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
//   const [selectedQuiz, setSelectedQuiz] = useState(null); // State to hold selected quiz for confirmation

//   // Function to handle click on "Join Now" button
//   const handleJoinClick = (quiz) => {
//     if (!role) {
//       navigate('/login');
//     } else {
//       setSelectedQuiz(quiz);
//       setShowPopup(true); // Show the confirmation popup
//     }
//   };

//   // Function to handle confirmation and join the quiz
//   const handleConfirmJoin = () => {
//     setShowPopup(false);
//     navigate('/quiztest');
//   };

//   // Function to handle cancel and close the popup
//   const handleCancel = () => {
//     setShowPopup(false); // Close the popup without joining
//   };

//   // Function to close the popup when clicking outside of it
//   const handleOverlayClick = (e) => {
//     if (e.target.className === "overlay") {
//       setShowPopup(false); // Close the popup if the overlay is clicked
//     }
//   };

//   return (
//     <div className="page">
//       <h1 className="quiz-heading">🧠 Live Quizzes</h1>
//       <p className="quiz-subtext">Join an active quiz or prepare for the upcoming ones!</p>
//       <div className="quiz-grid">
//         {quizzes.map(({ id, title, description, status, instructorId, instructorName }) => (
//           <div key={id} className="quiz-card">
//             <h2>{title}</h2>
//             <p style={{ color: 'white' }}>{description}</p>
//             <span className="quiz-status">{status}</span>
//             <p className="instructor-info" style={{color:"white"}}>
//               <strong>Instructor:</strong> {instructorName} (ID: {instructorId})
//             </p>
//             <button
//               className="quiz-btn"
//               style={{ color: 'white' }}
//               onClick={() => handleJoinClick({ id, title, status })}
//               disabled={status !== "Live Now"}
//             >
//               {status === "Live Now" ? "Join Now" : "Coming Soon"}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Confirmation Popup */}
//       {showPopup && (
//         <div className="overlay" onClick={handleOverlayClick}>
//           <div className="popup">
//             <h3>Are you sure you want to join the quiz?</h3>
//             <p>{selectedQuiz?.title}</p>
//             <div className="popup-buttons">
//               <button onClick={handleConfirmJoin}>Yes, Join</button>
//               <button onClick={handleCancel}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001"); // Adjust URL for deployment

const Quiz = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const subjects = ["Math", "Science", "Programming"];

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
      console.log("Leaderboard updated:", updatedLeaderboard);
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
    const correctText = typeof correctAnswer === "object" ? correctAnswer.optionText : correctAnswer;
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 relative">
      {/* Leaderboard Toggle Button */}
      <button
        onClick={() => setShowLeaderboard((prev) => !prev)}
        className="absolute top-4 right-4 bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
      </button>

      {/* Leaderboard */}
      {showLeaderboard && (
        <div className="absolute top-16 right-4 bg-white shadow-lg p-4 rounded-lg border border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800">🏆 Leaderboard</h3>
          <ul className="mt-2">
            {leaderboard.length > 0 ? (
              leaderboard.map((player, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {player.name} - {player.score} pts
                </li>
              ))
            ) : (
              <p className="text-gray-500">No scores yet</p>
            )}
          </ul>
        </div>
      )}

      {!selectedTest ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Subject</h2>
          <div className="flex space-x-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleSubjectClick(subject)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {subject}
              </button>
            ))}
          </div>
          {loading && <p className="mt-4 text-lg text-gray-700">Loading tests...</p>}
          {selectedSubject && !loading && (
            <div className="mt-6 w-full max-w-lg bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">Available {selectedSubject} Tests</h3>
              {tests.length > 0 ? (
                <ul className="mt-3">
                  {tests.map((test) => (
                    <li
                      key={test._id}
                      onClick={() => handleTestClick(test)}
                      className="p-2 border-b text-gray-700 cursor-pointer hover:bg-gray-200 rounded"
                    >
                      {test.description} - {test.duration} mins
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-600">No tests available.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="w-full max-w-lg bg-white p-6 shadow-md rounded-lg text-center">
          {!quizFinished ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTest.description}</h2>
              <p className="text-lg font-medium text-gray-700 mb-4">
                {questions[currentQuestionIndex]?.question}
              </p>
              <div className="flex flex-col gap-3">
                {questions[currentQuestionIndex]?.options.map((option, index) => (
                  <button
                    key={option._id || index}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleAnswerClick(option.optionText)}
                  >
                    {option.optionText}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
              <p className="text-lg text-gray-700">
                Your Score: {score} / {questions.length}
              </p>
              <button
                onClick={() => setSelectedTest(null)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
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
