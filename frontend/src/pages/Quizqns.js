import { useState } from "react";
import "../styles/quizqns.css";

export default function QuizQns({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });
    alert(`You scored ${score} out of ${questions.length}`);
  };

  return (
    <div className="quiz-container">
      {/* Main Quiz Area */}
      <div className="quiz-main">
        <h2 className="quiz-title">Quiz Title</h2>
        <div className="quiz-question-block">
          <h3 className="quiz-question-number">
            Question {questions[currentQuestion].id}
          </h3>
          <p className="quiz-question-text">{questions[currentQuestion].question}</p>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`quiz-option ${
                  answers[currentQuestion] === option ? "selected" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button
            className="nav-button"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            Prev
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button className="nav-button" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="quiz-sidebar">
        <div className="sidebar-header">
          <p>
            Question {currentQuestion + 1}/{questions.length}
          </p>
          <p className="help-text">Need Help?</p>
        </div>

        <div className="sidebar-questions">
          {questions.map((q, index) => (
            <div
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`sidebar-question ${
                answers[index] ? "answered" : ""
              }`}
            >
              {q.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import "../styles/quizqns.css";

// export default function QuizQns({ questions }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//     const navigate=useNavigate();
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
//     alert(You scored ${score} out of ${questions.length});
//     navigate('/quiz');
// };

//   return (
//     <div className="qq-quiz-container">
//       <div className="qq-quiz-main">
//         <h2 className="qq-quiz-title">Quiz Title</h2>
//         <div className="qq-quiz-question-block">
//           <h3 className="qq-quiz-question-number">
//             Question {questions[currentQuestion].id}
//           </h3>
//           <p className="qq-quiz-question-text">{questions[currentQuestion].question}</p>
//           <div className="qq-quiz-options">
//             {questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleOptionSelect(option)}
//                 className={`qq-quiz-option ${
//                   answers[currentQuestion] === option ? "selected" : ""
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="qq-quiz-navigation">
//           <button
//             className="qq-nav-button"
//             onClick={handlePrev}
//             disabled={currentQuestion === 0}
//           >
//             Prev
//           </button>
//           {currentQuestion === questions.length - 1 ? (
//             <button className="qq-nav-button" onClick={handleSubmit}>
//               Submit
//             </button>
//           ) : (
//             <button
//               className="qq-nav-button"
//               onClick={handleNext}
//               disabled={currentQuestion === questions.length - 1}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="qq-quiz-sidebar">
//         <div className="qq-sidebar-header">
//           <p>
//             Question {currentQuestion + 1}/{questions.length}
//           </p>
//           <p className="qq-help-text">Need Help?</p>
//         </div>

//         <div className="qq-sidebar-questions">
//           {questions.map((q, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrentQuestion(index)}
//               className={`qq-sidebar-question ${
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
