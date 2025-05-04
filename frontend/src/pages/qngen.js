// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/qngen.css";

// const QuestionGenerator = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const handleGenerate = async () => {
//     if (!pdfFile) return alert("Please upload a PDF first!");

//     const formData = new FormData();
//     formData.append("file", pdfFile);

//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/generate-questions", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setQuestions(res.data.questions || []);
//     } catch (err) {
//       console.error("Error generating questions:", err);
//       alert("Failed to generate questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="generator-container">
//       <h2>Upload PDF to Generate Questions</h2>

//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={handleGenerate} disabled={loading}>
//         {loading ? "Generating..." : "Generate Questions"}
//       </button>

//       {questions.length > 0 && (
//         <div className="questions-list">
//           <h3>Generated Questions:</h3>
//           <ul>
//             {questions.map((q, index) => (
//               <li key={index}>{q}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionGenerator;
import React, { useState } from "react";
import "../styles/qngen.css";

const QuestionGenerator = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setQuestions([]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/generate-questions", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions || []);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Make sure Flask backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="question-generator-container">
      <h2 className="title">Dynamic Question Generator</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="generate-button" disabled={loading}>
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {questions.length > 0 && (
        <div className="questions-section">
          <h3>Generated Questions</h3>
          <ul className="question-list">
            {questions.map((q, index) => (
              <li key={index} className="question-item">{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionGenerator;
