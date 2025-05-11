  // import React, { useState } from "react";
  // import "../styles/qngen.css";

  // const QuestionGenerator = () => {
  //   const [pdfFile, setPdfFile] = useState(null);
  //   const [startPage, setStartPage] = useState("");
  //   const [endPage, setEndPage] = useState("");
  //   const [numQuestions, setNumQuestions] = useState("");
  //   const [questions, setQuestions] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");

  //   const handleFileChange = (e) => {
  //     setPdfFile(e.target.files[0]);
  //     setQuestions([]);
  //     setError("");
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!pdfFile) {
  //       setError("Please upload a PDF file.");
  //       return;
  //     }
  //     if (!startPage || !endPage || !numQuestions) {
  //       setError("Please fill in all input fields.");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("pdf", pdfFile);
  //     formData.append("start_page", startPage);
  //     formData.append("end_page", endPage);
  //     formData.append("num_questions", numQuestions);

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const response = await fetch("http://localhost:5000/generate-questions", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         setQuestions(data.questions || []);
  //       } else {
  //         setError(data.error || "Something went wrong.");
  //       }
  //     } catch (err) {
  //       setError("Server error. Make sure Flask backend is running.");
  //     }

  //     setLoading(false);
  //   };

  //   return (
  //     <div className="question-generator-container">
  //       <h2 className="title">Dynamic Question Generator</h2>
  //       <form className="upload-form" onSubmit={handleSubmit}>
  //         <input
  //           type="file"
  //           accept=".pdf"
  //           onChange={handleFileChange}
  //           className="file-input"
  //         />
  //         <div className="input-group">
  //           <input
  //             type="number"
  //             placeholder="Start Page"
  //             value={startPage}
  //             onChange={(e) => setStartPage(e.target.value)}
  //             className="number-input"
  //           />
  //           <input
  //             type="number"
  //             placeholder="End Page"
  //             value={endPage}
  //             onChange={(e) => setEndPage(e.target.value)}
  //             className="number-input"
  //           />
  //           <input
  //             type="number"
  //             placeholder="No. of Questions"
  //             value={numQuestions}
  //             onChange={(e) => setNumQuestions(e.target.value)}
  //             className="number-input"
  //           />
  //         </div>
  //         <button type="submit" className="generate-button" disabled={loading}>
  //           {loading ? "Generating..." : "Generate Questions"}
  //         </button>
  //       </form>

  //       {error && <div className="error-message">{error}</div>}

  //       {questions.length > 0 && (
  //         <div className="questions-section">
  //           <h3>Generated Questions</h3>
  //           <ul className="question-list">
  //             {questions.map((q, index) => (
  //               <li key={index} className="question-item">{q}</li>
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
    const [startPage, setStartPage] = useState("");
    const [endPage, setEndPage] = useState("");
    const [numQuestions, setNumQuestions] = useState("");
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
      if (!startPage || !endPage || !numQuestions) {
        setError("Please fill in all input fields.");
        return;
      }

      const formData = new FormData();
      formData.append("file", pdfFile); // Match the Flask backend key here
      formData.append("start_page", startPage);
      formData.append("end_page", endPage);
      formData.append("num_questions", numQuestions);

      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5001/generate-questions", {
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
          <div className="input-group">
            <input
              type="number"
              placeholder="Start Page"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              className="number-input"
            />
            <input
              type="number"
              placeholder="End Page"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              className="number-input"
            />
            <input
              type="number"
              placeholder="No. of Questions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="number-input"
            />
          </div>
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
