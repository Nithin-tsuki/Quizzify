import React, { useState } from "react";
import "../styles/ctdch.css";

const Ctdch = () => {
  const [challengeCreated, setChallengeCreated] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [days, setDays] = useState(
    Array.from({ length: 30 }, (_, index) => ({
      day: index + 1,
      videoFile: null,
      notesFile: null,
    }))
  );

  const handleFileChange = (field, file) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === currentDayIndex ? { ...day, [field]: file } : day
      )
    );
  };

  const handleNextDay = () => {
    if (currentDayIndex < days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else {
      alert("You have completed uploading for all 30 days!");
    }
  };

  const handleEditDay = (index) => {
    setCurrentDayIndex(index);
  };

  const handleCreateChallenge = () => setChallengeCreated(true);

  const handleSaveChallenge = () => {
    console.log("Challenge Saved!", days);
    alert("Thirty Day Challenge saved successfully!");
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
