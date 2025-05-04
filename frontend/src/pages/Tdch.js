import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tdch.css';

const ChallengeTracker = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const courses = [
    { 
      id: 'course1', 
      name: "Front-End Development", 
      instructor: "John Doe", 
      lessons: Array(30).fill({ completed: false, videoUrl: "#", notes: "https://example.com/notes1.pdf" }) 
    },
    { 
      id: 'course2', 
      name: "Data Structures & Algorithms", 
      instructor: "Jane Smith", 
      lessons: Array(30).fill({ completed: false, videoUrl: "#", notes: "https://example.com/notes2.pdf" }) 
    },
    { 
      id: 'course3', 
      name: "Deep Learning", 
      instructor: "Dr. Emily Clark", 
      lessons: Array(30).fill({ completed: false, videoUrl: "#", notes: "https://example.com/notes3.pdf" }) 
    }
  ];

  const [courseData, setCourseData] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseConfirmation, setShowCourseConfirmation] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null); // New for overlay

  const toggleLesson = (courseIndex, lessonIndex) => {
    const newCourseData = [...courseData];
    newCourseData[courseIndex].lessons[lessonIndex] = {
      ...newCourseData[courseIndex].lessons[lessonIndex],
      completed: !newCourseData[courseIndex].lessons[lessonIndex].completed
    };
    setCourseData(newCourseData);
  };

  const getCourseProgress = (lessons) => {
    return (lessons.filter(lesson => lesson.completed).length / 30) * 100;
  };

  const overallProgress = (courseData.reduce((acc, course) => acc + course.lessons.filter(lesson => lesson.completed).length, 0) / (30 * courseData.length)) * 100;

  const handleCourseClick = (index) => {
    if (!role) {
      navigate('/login');
    } else {
      setCurrentCourseIndex(index);
      setShowCourseConfirmation(true);
    }
  };

  const handleConfirmAccess = () => {
    setShowCourseConfirmation(false);
    setSelectedCourse(currentCourseIndex);
  };

  const handleDayClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('lesson-details-overlay')) {
      setShowCourseConfirmation(false);
      setSelectedLesson(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOverlayClick);
    return () => {
      window.removeEventListener('click', handleOverlayClick);
    };
  }, []);

  return (
    <div className="tracker-page">
      <h1 className="tracker-heading">#30DayChallenge Tracker</h1>
      <p className="tracker-subtext">Pick a course, track your lessons, and stay on track!</p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${overallProgress}%` }} />
      </div>

      <div className="courses-section">
        {courseData.map((course, courseIndex) => (
          <div key={courseIndex} className="course-container">
            <h2
              className="course-name"
              onClick={() => handleCourseClick(courseIndex)}
              style={{ cursor: 'pointer' }}
            >
              {course.name} - {course.instructor} (ID: {course.id})
            </h2>
            <div className="course-progress-bar">
              <div className="progress-bar" style={{ width: `${getCourseProgress(course.lessons)}%` }} />
            </div>

            {selectedCourse === courseIndex && (
              <div className="lesson-grid">
                {course.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className={`lesson-day ${lesson.completed ? 'completed' : ''}`}
                    onClick={() => handleDayClick(lesson)}
                  >
                    <span>Day {lessonIndex + 1} - Lesson {lessonIndex + 1}</span>
                    <input
                      type="checkbox"
                      checked={lesson.completed}
                      onClick={(e) => e.stopPropagation()}  // ← add stopPropagation here
                      onChange={() => toggleLesson(courseIndex, lessonIndex)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showCourseConfirmation && (
        <div className="overlay">
          <div className="confirmation-popup">
            <p>Do you want to access the course: {courseData[currentCourseIndex].name}?</p>
            <button onClick={handleConfirmAccess}>Yes</button>
            <button onClick={() => setShowCourseConfirmation(false)}>No</button>
          </div>
        </div>
      )}

      {selectedLesson && (
        <div className="lesson-details-overlay">
          <div className="lesson-details-popup">
            <a href={selectedLesson.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
            <a href={selectedLesson.notes} target="_blank" rel="noopener noreferrer">View Notes (PDF)</a>
            <button onClick={() => setSelectedLesson(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeTracker;
