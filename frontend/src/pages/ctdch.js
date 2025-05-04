// import React, { useState } from "react";
// import "../styles/ctdch.css";

// const Ctdch = () => {
//   const [challengeCreated, setChallengeCreated] = useState(false);
//   const [currentDayIndex, setCurrentDayIndex] = useState(0);
//   const [subject, setSubject] = useState("");
// const [challengeId, setChallengeId] = useState(null);
// const user = JSON.parse(localStorage.getItem("user")); // or whatever key you're using
// const instructorId = user?.userid || user?._id;
//   const [days, setDays] = useState(
//     Array.from({ length: 30 }, (_, index) => ({
//       day: index + 1,
//       videoFile: null,
//       notesFile: null,
//     }))
//   );

//   const handleFileChange = async (field, file) => {
//     const updatedDay = { ...days[currentDayIndex], [field]: file };
//     const updatedDays = days.map((d, i) =>
//       i === currentDayIndex ? updatedDay : d
//     );
//     setDays(updatedDays);
  
//     if (challengeId) {
//       const formData = new FormData();
//       formData.append("challengeId", challengeId);
//       formData.append("dayIndex", currentDayIndex);
//       if (field === "videoFile") formData.append("video", file);
//       if (field === "notesFile") formData.append("notes", file);
  
//       try {
//         await fetch("http://localhost:5001/api/challenges/update-day", {
//           method: "POST",
//           body: formData,
//         });
//       } catch (err) {
//         console.error("Failed to upload", err);
//         alert("Error uploading file");
//       }
//     }
//   };
  

//   const handleNextDay = () => {
//     if (currentDayIndex < days.length - 1) {
//       setCurrentDayIndex(currentDayIndex + 1);
//     } else {
//       alert("You have completed uploading for all 30 days!");
//     }
//   };

//   const handleEditDay = (index) => {
//     setCurrentDayIndex(index);
//   };

//   const handleCreateChallenge = async () => {
//     const enteredSubject = prompt("Enter Subject Name:");
//     if (!enteredSubject) return;
  
//     setSubject(enteredSubject);
//     try {
//       const res = await fetch("http://localhost:5001/api/challenges/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           subject: enteredSubject,
//           instructorId: instructorId // Replace with real ID from context/auth
//         }),
//       });
//       const data = await res.json();
//       setChallengeId(data._id);
//       setChallengeCreated(true);
//     } catch (err) {
//       console.error("Failed to create challenge", err);
//       alert("Error creating challenge");
//     }
//   };
  
//   const handleSaveChallenge = () => {
//     console.log("Challenge Saved!", days);
//     alert("Thirty Day Challenge saved successfully!");
//   };

//   return (
//     <div className="ctdch-container">
//       {!challengeCreated ? (
//         <div className="ctdch-start-section">
//           <h2>Create Your Thirty Day Challenge</h2>
//           <button className="ctdch-start-button" onClick={handleCreateChallenge}>
//             Start Creating
//           </button>
//         </div>
//       ) : (
//         <div className="ctdch-challenge-section">
//           <h2>Day {days[currentDayIndex].day}</h2>
//           <div className="ctdch-upload-section">
//             <div className="ctdch-upload-card">
//               <h3>Upload Video</h3>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleFileChange("videoFile", e.target.files[0])}
//               />
//               {days[currentDayIndex].videoFile && (
//                 <video
//                   className="ctdch-preview-video"
//                   src={URL.createObjectURL(days[currentDayIndex].videoFile)}
//                   controls
//                 />
//               )}
//             </div>
//             <div className="ctdch-upload-card">
//               <h3>Upload Notes</h3>
//               <input
//                 type="file"
//                 accept=".pdf,.txt,.docx"
//                 onChange={(e) => handleFileChange("notesFile", e.target.files[0])}
//               />
//               {days[currentDayIndex].notesFile && (
//                 <div className="ctdch-file-preview">
//                   📄 {days[currentDayIndex].notesFile.name}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="ctdch-button-group">
//             <button className="ctdch-next-button" onClick={handleNextDay}>
//               {currentDayIndex < 29 ? "Save & Next Day" : "Finish"}
//             </button>
//             <button className="ctdch-save-button" onClick={handleSaveChallenge}>
//               Save Challenge
//             </button>
//           </div>
//           <div className="ctdch-day-list">
//             <h3>Edit Days</h3>
//             <div className="ctdch-days">
//               {days.map((day, index) => (
//                 <button
//                   key={index}
//                   className={`ctdch-day-button ${index === currentDayIndex ? "active" : ""}`}
//                   onClick={() => handleEditDay(index)}
//                 >
//                   {day.day}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ctdch;
import React, { useState } from "react";
import "../styles/ctdch.css";

const Ctdch = () => {
  const [challengeCreated, setChallengeCreated] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [subject, setSubject] = useState("");
  const [challengeId, setChallengeId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
  const instructorId = user?.userid || user?._id;

  const [days, setDays] = useState(
    Array.from({ length: 30 }, (_, index) => ({
      day: index + 1,
      videoFile: null,
      notesFile: null,
    }))
  );

  const handleFileChange = async (field, file) => {
    const updatedDay = { ...days[currentDayIndex], [field]: file };
    const updatedDays = days.map((d, i) =>
      i === currentDayIndex ? updatedDay : d
    );
    setDays(updatedDays);

    if (challengeId) {
      const formData = new FormData();
      formData.append("challengeId", challengeId);
      formData.append("dayIndex", currentDayIndex);
      if (field === "videoFile") formData.append("video", file);
      if (field === "notesFile") formData.append("notes", file);

      try {
        await fetch("http://localhost:5001/api/challenges/update-day", {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.error("Failed to upload", err);
        alert("Error uploading file");
      }
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else {
      handleSaveChallenge(); // Trigger final save on Day 30
    }
  };

  const handleEditDay = (index) => {
    setCurrentDayIndex(index);
  };

  const handleCreateChallenge = async () => {
    const enteredSubject = prompt("Enter Subject Name:");
    if (!enteredSubject) return;

    setSubject(enteredSubject);
    try {
      const res = await fetch("http://localhost:5001/api/challenges/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: enteredSubject,
          instructorId: instructorId,
        }),
      });
      const data = await res.json();
      setChallengeId(data._id);
      setChallengeCreated(true);
    } catch (err) {
      console.error("Failed to create challenge", err);
      alert("Error creating challenge");
    }
  };

  const handleSaveChallenge = async () => {
    try {
      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const formData = new FormData();
        formData.append("challengeId", challengeId);
        formData.append("dayIndex", i);
        if (day.videoFile) formData.append("video", day.videoFile);
        if (day.notesFile) formData.append("notes", day.notesFile);

        await fetch("http://localhost:5001/api/challenges/update-day", {
          method: "POST",
          body: formData,
        });
      }

      alert("Thirty Day Challenge saved successfully!");
    } catch (err) {
      console.error("Failed to save challenge", err);
      alert("Error saving challenge");
    }
  };

  return (
    <div className="ctdch-container">
      {!challengeCreated ? (
        <div className="ctdch-start-section">
          <h2>Create Your Thirty Day Challenge</h2>
          <button className="ctdch-start-button" onClick={handleCreateChallenge}>
            Start Creating
          </button>
        </div>
      ) : (
        <div className="ctdch-challenge-section">
          <h2>Day {days[currentDayIndex].day}</h2>
          <div className="ctdch-upload-section">
            <div className="ctdch-upload-card">
              <h3>Upload Video</h3>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange("videoFile", e.target.files[0])}
              />
              {days[currentDayIndex].videoFile && (
                <video
                  className="ctdch-preview-video"
                  src={URL.createObjectURL(days[currentDayIndex].videoFile)}
                  controls
                />
              )}
            </div>
            <div className="ctdch-upload-card">
              <h3>Upload Notes</h3>
              <input
                type="file"
                accept=".pdf,.txt,.docx"
                onChange={(e) => handleFileChange("notesFile", e.target.files[0])}
              />
              {days[currentDayIndex].notesFile && (
                <div className="ctdch-file-preview">
                  📄 {days[currentDayIndex].notesFile.name}
                </div>
              )}
            </div>
          </div>
          <div className="ctdch-button-group">
            <button className="ctdch-next-button" onClick={handleNextDay}>
              {currentDayIndex < 29 ? "Save & Next Day" : "Finish"}
            </button>
            <button className="ctdch-save-button" onClick={handleSaveChallenge}>
              Save Challenge
            </button>
          </div>
          <div className="ctdch-day-list">
            <h3>Edit Days</h3>
            <div className="ctdch-days">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`ctdch-day-button ${index === currentDayIndex ? "active" : ""}`}
                  onClick={() => handleEditDay(index)}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ctdch;
