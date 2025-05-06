// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../styles/CourseDetail.css";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       const res = await axios.get(http://localhost:5001/api/courses);
//       const found = res.data.find(c => c._id === courseId);
//       setCourse(found);
//     };
//     fetchCourse();
//   }, [courseId]);

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div className="course-detail">
//       <h2>{course.courseName}</h2>
//       <h4>Instructor: {course.instructorName}</h4>
//       <h5>Topics:</h5>
//       <ul>
//         {course.topics.map((topic, idx) => (
//           <li key={idx}>
//             <h4>{topic.title}</h4>
//             {topic.video && <video controls src={topic.video} width="400" />}
//             {topic.note && <p>{topic.note}</p>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/CourseDetail.css";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [activeTopic, setActiveTopic] = useState(null); // Track active topic

//   useEffect(() => {
//     const fetchCourse = async () => {
//       const res = await axios.get("http://localhost:5001/api/courses");
//       const found = res.data.find((c) => c._id === courseId);
//       setCourse(found);
//     };
//     fetchCourse();
//   }, [courseId]);

//   const handleTopicClick = (topic) => {
//     setActiveTopic(activeTopic === topic ? null : topic); // Toggle active topic
//   };

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div className="cd-course-detail-wrapper">
//       <h2 className="cd-course-header">{course.courseName} Course</h2>
//       <div className="cd-course-detail-card">
//         <h4 className="cd-instructor-name">Instructor: {course.instructorName}</h4>
//         <h5 className="cd-topic-header">Topics:</h5>
//         <ul className="cd-topic-list">
//           {course.topics.map((topic, idx) => (
//             <li key={idx}>
//               <div
//                 className="cd-topic-box"
//                 onClick={() => handleTopicClick(topic)} // Make the entire div clickable
//               >
//                 <div className="cd-topic-header">
//                   <span className="cd-topic-title">
//                     {activeTopic === topic ? "▼" : "➤"} {topic.title}
//                   </span>
//                 </div>
//                 {activeTopic === topic && (
//                   <div className="cd-topic-details">
//                     {topic.video && (
//                       <div className="cd-video-container">
//                         <video controls width="100%">
//                           <source src={topic.video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                     )}
//                     {topic.note && (
//                       <div className="cd-notes-container">
//                         <a
//                           href={topic.note}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="cd-notes-link"
//                         >
//                           📄 View Notes (PDF)
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/CourseDetail.css";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [activeTopic, setActiveTopic] = useState(null); // Track active topic
//   const [completedTopics, setCompletedTopics] = useState({}); // Track completion status

//   useEffect(() => {
//     const fetchCourse = async () => {
//       const res = await axios.get("http://localhost:5001/api/courses");
//       const found = res.data.find((c) => c._id === courseId);
//       setCourse(found);
//     };
//     fetchCourse();
//   }, [courseId]);

//   const handleTopicClick = (topic) => {
//     setActiveTopic(activeTopic === topic ? null : topic); // Toggle active topic
//   };

//   const handleCheckboxChange = (event, topic) => {
//     event.stopPropagation(); // Prevent topic box from opening when checkbox is clicked
//     setCompletedTopics((prevState) => ({
//       ...prevState,
//       [topic.title]: !prevState[topic.title], // Toggle completion status for the topic
//     }));
//   };

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div className="cd-course-detail-wrapper">
//       <h2 className="cd-course-header">{course.courseName} Course</h2>
//       <div className="cd-course-detail-card">
//         <h4 className="cd-instructor-name">Instructor: {course.instructorName}</h4>
//         <h5 className="cd-topic-header">Topics:</h5>
//         <ul className="cd-topic-list">
//           {course.topics.map((topic, idx) => (
//             <li key={idx}>
//               <div
//                 className="cd-topic-box"
//                 onClick={() => handleTopicClick(topic)} // Make the entire div clickable
//               >
//                 <div className="cd-topic-header">
//                   <span className="cd-topic-title">
//                     {activeTopic === topic ? "▼" : "➤"} {topic.title}
//                   </span>
//                   <input
//                     type="checkbox"
//                     checked={completedTopics[topic.title] || false} // Set checked status based on completion state
//                     onChange={(event) => handleCheckboxChange(event, topic)} // Handle checkbox click
//                     className="cd-checkbox"
//                   />
//                 </div>
//                 {activeTopic === topic && (
//                   <div className="cd-topic-details">
//                     {topic.video && (
//                       <div className="cd-video-container">
//                         <video controls width="100%">
//                           <source src={topic.video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                     )}
//                     {topic.note && (
//                       <div className="cd-notes-container">
//                         <a
//                           href={topic.note}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="cd-notes-link"
//                         >
//                           📄 View Notes (PDF)
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CourseDetail.css";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [completedTopics, setCompletedTopics] = useState({});
  const user = localStorage.getItem('user');
  const studentId = user ? JSON.parse(user).userid : null;

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get("http://localhost:5001/api/courses");
      const found = res.data.find((c) => c._id === courseId);
      setCourse(found);
    };

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/progress/${studentId}/${courseId}`);
        const progMap = {};
        res.data.lessons.forEach((lesson) => {
          progMap[lesson.dayIndex] = lesson.completed;
        });
        setCompletedTopics(progMap);
      } catch (err) {
        console.error("Failed to load progress", err);
      }
    };

    fetchCourse();
    if (studentId && courseId) fetchProgress();
  }, [courseId, studentId]);

  const handleCheckboxChange = async (event, topic, idx) => {
    event.stopPropagation();

    const newStatus = !completedTopics[idx];
    setCompletedTopics((prev) => ({
      ...prev,
      [idx]: newStatus,
    }));

    try {
      await axios.post('http://localhost:5001/api/progress/updatecourse', {
        studentId,
        challengeId: courseId,
        topicIndex: idx,
        completed: newStatus,
      });
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="cd-course-detail-wrapper">
      <h2 className="cd-course-header">{course.courseName} Course</h2>
      <div className="cd-course-detail-card">
        <h4 className="cd-instructor-name">Instructor: {course.instructorName}</h4>
        <h5 className="cd-topic-header">Topics:</h5>
        <ul className="cd-topic-list">
          {course.topics.map((topic, idx) => (
            <li key={idx}>
              <div className="cd-topic-box" onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}>
                <div className="cd-topic-header">
                  <span className="cd-topic-title">
                    {activeTopic === topic ? "▼" : "➤"} {topic.title}
                  </span>
                  <input
                    type="checkbox"
                    checked={completedTopics[idx] || false}
                    onChange={(e) => handleCheckboxChange(e, topic, idx)}
                    onClick={(e) => e.stopPropagation()}
                    className="cd-checkbox"
                  />
                </div>
                {activeTopic === topic && (
                  <div className="cd-topic-details">
                    {topic.video && (
                      <div className="cd-video-container">
                        <video controls width="100%" onClick={(e) => e.stopPropagation()}>
                          <source src={topic.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    {topic.note && (
                      <div className="cd-notes-container">
                        <a
                          href={topic.note}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cd-notes-link"
                        >
                          📄 View Notes (PDF)
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;
