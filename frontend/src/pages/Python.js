// import React, { useState } from "react";
// import "../styles/python.css";

// const Python = () => {
//   const [activeTopic, setActiveTopic] = useState(null);
//   const [checkedTopics, setCheckedTopics] = useState({});

//   const toggleTopic = (topicKey) => {
//     setActiveTopic(activeTopic === topicKey ? null : topicKey);
//   };

//   const toggleCheckbox = (topicKey) => {
//     setCheckedTopics((prev) => ({
//       ...prev,
//       [topicKey]: !prev[topicKey],
//     }));
//   };

//   const renderTopicBox = (title, content, topicKey) => (
//     <div className="topic-box" onClick={() => toggleTopic(topicKey)}>
//       <div className="topic-header">
//         <span className="topic-title">
//           {activeTopic === topicKey ? "▼" : "➤"} {title}
//         </span>
//         <input
//           type="checkbox"
//           className="topic-checkbox"
//           checked={!!checkedTopics[topicKey]}
//           onClick={(e) => e.stopPropagation()}
//           onChange={() => toggleCheckbox(topicKey)}
//         />
//       </div>
//       {activeTopic === topicKey && <div className="topic-content">{content}</div>}
//     </div>
//   );

//   return (
//     <div className="course-wrapper">
//       <h2 className="course-header">Python Course</h2>
//       {renderTopicBox(
//         "Introduction to Python",
//         <p>Start coding with Python today. Understand syntax, variables, data types and the power of simplicity.</p>,
//         "intro"
//       )}
//       {renderTopicBox(
//         "Control Structures",
//         <p>Learn about if-else conditions, loops (for, while), and how Python controls logic flow.</p>,
//         "control"
//       )}
//       {renderTopicBox(
//         "Functions and Modules",
//         <p>Define reusable code blocks using functions, and explore modular programming with Python modules.</p>,
//         "functions"
//       )}
//       {renderTopicBox(
//         "Object-Oriented Programming",
//         <p>Dive into classes, objects, inheritance, and the OOP paradigm in Python.</p>,
//         "oop"
//       )}
//     </div>
//   );
// };

// export default Python;
import React, { useState } from "react";
import "../styles/python.css";

const Python = () => {
  const [openSections, setOpenSections] = useState({
    intro: false,
    control: false,
    functions: false,
    oop: false,
  });

  const [completed, setCompleted] = useState({
    intro: false,
    control: false,
    functions: false,
    oop: false,
  });

  const toggleOpen = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const toggleComplete = (section, e) => {
    e.stopPropagation();
    setCompleted({
      ...completed,
      [section]: !completed[section],
    });
  };

  const sections = [
    {
      key: "intro",
      title: "Introduction to Python",
      description: "Start coding with Python today. Understand syntax, variables, data types, and the power of simplicity.",
      video: "/videos/python-intro.mp4",
      notes: "/notes/python-intro.pdf",
    },
    {
      key: "control",
      title: "Control Structures",
      description: "Learn about if-else conditions, loops (for, while), and how Python controls logic flow.",
      video: "/videos/python-control.mp4",
      notes: "/notes/python-control.pdf",
    },
    {
      key: "functions",
      title: "Functions and Modules",
      description: "Define reusable code blocks using functions, and explore modular programming with Python modules.",
      video: "/videos/python-functions.mp4",
      notes: "/notes/python-functions.pdf",
    },
    {
      key: "oop",
      title: "Object-Oriented Programming",
      description: "Dive into classes, objects, inheritance, and the OOP paradigm in Python.",
      video: "/videos/python-oop.mp4",
      notes: "/notes/python-oop.pdf",
    },
  ];

  return (
    <div className="course-wrapper">
      <h2 className="course-header">Python Course</h2>

      {sections.map((section) => (
        <div
          key={section.key}
          className={`module-box ${openSections[section.key] ? "active" : ""}`}
          onClick={() => toggleOpen(section.key)}
        >
          <div className="module-header">
            <div className="module-title">
              {openSections[section.key] ? "▼" : "➤"} {section.title}
            </div>
            <label className="checkbox-label" onClick={(e) => toggleComplete(section.key, e)}>
              <input
                type="checkbox"
                checked={completed[section.key]}
                onChange={() => {}}
              />
              <span className="checkbox-custom"></span>
            </label>
          </div>

          {openSections[section.key] && (
            <div className="module-content">
              <p>{section.description}</p>

              <div className="resource-section">
                <div className="video-box">
                  <video controls width="100%">
                    <source src={section.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="notes-box">
                  <a
                    href={section.notes}
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
      ))}
    </div>
  );
};

export default Python;
