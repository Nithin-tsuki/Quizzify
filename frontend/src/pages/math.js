import React, { useState } from "react";
import "../styles/math.css";

const Math = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState({
    algebra: false,
    geometry: false,
    trigonometry: false,
    calculus: false,
  });

  const toggleModule = (moduleName) => {
    setActiveModule(activeModule === moduleName ? null : moduleName);
  };

  const handleCheckboxChange = (moduleName) => {
    setCompletedModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  const renderModuleBox = (moduleName, label, videoSrc, notesSrc) => (
    <div className="module-box" onClick={() => toggleModule(moduleName)}>
      <div className="module-header">
        <span className="module-title">
          {activeModule === moduleName ? "▼" : "➤"} {label}
        </span>
        <label className="checkbox-label" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={completedModules[moduleName]}
            onChange={() => handleCheckboxChange(moduleName)}
          />
          <span className="checkbox-custom"></span>
        </label>
      </div>
      {activeModule === moduleName && (
        <div className="module-content">
          <div className="resource-section">
            <div className="video-box">
              <video controls width="100%">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="notes-box">
              <a
                href={notesSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="notes-link"
              >
                📄 View Notes (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="math-wrapper">
      <h2 className="math-header">Math Modules</h2>
      {renderModuleBox(
        "algebra",
        "Algebra",
        "/videos/algebra.mp4",
        "/notes/algebra.pdf"
      )}
      {renderModuleBox(
        "geometry",
        "Geometry",
        "/videos/geometry.mp4",
        "/notes/geometry.pdf"
      )}
      {renderModuleBox(
        "trigonometry",
        "Trigonometry",
        "/videos/trigonometry.mp4",
        "/notes/trigonometry.pdf"
      )}
      {renderModuleBox(
        "calculus",
        "Calculus",
        "/videos/calculus.mp4",
        "/notes/calculus.pdf"
      )}
    </div>
  );
};

export default Math;
