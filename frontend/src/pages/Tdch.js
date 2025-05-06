import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tdch.css';

// Backend API helpers
const API_BASE = 'http://localhost:5001/api';

const fetchChallenges = async () => {
  const res = await fetch(`${API_BASE}/challenges`);
  return res.json();
};

const fetchProgress = async (userId, challengeId) => {
  const res = await fetch(`${API_BASE}/progress?userId=${userId}&challengeId=${challengeId}`);
  return res.json();
};

const toggleProgress = async (studentId, challengeId, dayIndex) => {
  const res = await fetch(`${API_BASE}/progress/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, challengeId, dayIndex }),
  });
  return res.json();
};


const ChallengeTracker = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const role = user ? JSON.parse(user).role : null;
  const userId = user ? JSON.parse(user).userid : null;

  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseConfirmation, setShowCourseConfirmation] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  useEffect(() => {
    const loadCoursesWithProgress = async () => {
      try {
        const challenges = await fetchChallenges();
  
        if (!Array.isArray(challenges)) {
          console.error("Invalid challenge data:", challenges);
          return;
        }
  
        const updatedCourses = await Promise.all(
          challenges.map(async (challenge) => {
            const lessons = challenge.days.map((day) => ({
              completed: false,
              videoUrl: day.videoUrl || "#",
              notes: day.notesUrl || "#",
              title: `Day ${day.day}: ${day.title}`,
            }));
  
            const progressData = await fetchProgress(userId, challenge._id);
            const completedLessons = new Set(progressData?.completedLessons || []);
  
            const lessonsWithProgress = lessons.map((lesson, i) => ({
              ...lesson,
              completed: completedLessons.has(i + 1),
            }));
  
            return {
              id: challenge._id,
              name: challenge.subject,
              instructor: challenge.instructorId,
              lessons: lessonsWithProgress,
            };
          })
        );
  
        setCourseData(updatedCourses);
      } catch (error) {
        console.error('Error loading courses or progress:', error);
      }
    };
  
    if (userId) loadCoursesWithProgress();
  }, [userId]);
  
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchChallenges();

        if (!Array.isArray(response)) {
          console.error("Invalid course data:", response);
          return;
        }

        const formattedCourses = response.map(challenge => ({
          id: challenge._id,  // Using _id from MongoDB
          name: challenge.subject,
          instructor: challenge.instructorId,  // Assuming instructor is represented by ID
          lessons: challenge.days.map((day, index) => ({
            completed: false,
            videoUrl: day.videoUrl || "#",
            notes: day.notesUrl || "#",
            title: `Day ${day.day}: ${day.title}`
          }))
        }));

        console.log("Formatted courses:", formattedCourses);
        setCourseData(formattedCourses);
      } catch (error) {
        console.error('Error loading courses:', error);
      }
    };

    loadCourses();
  }, []);

  const toggleLesson = async (courseIndex, lessonIndex) => {
    const course = courseData[courseIndex];
    const day = lessonIndex + 1;

    await toggleProgress(userId, course.id, day);

    const updatedCourses = [...courseData];
    const currentLesson = updatedCourses[courseIndex].lessons[lessonIndex];
    updatedCourses[courseIndex].lessons[lessonIndex] = {
      ...currentLesson,
      completed: !currentLesson.completed,
    };
    setCourseData(updatedCourses);
  };

  const getCourseProgress = (lessons) =>
    (lessons.filter((lesson) => lesson.completed).length / lessons.length) * 100;

  const overallProgress = courseData.length
    ? (courseData.reduce((acc, course) => acc + course.lessons.filter((l) => l.completed).length, 0) /
        (30 * courseData.length)) *
      100
    : 0;

    const handleCourseClick = (index) => {
      if (!role) {
        navigate('/login');
        return;
      }
    
      const course = courseData[index];
      const hasProgress = course.lessons.some((lesson) => lesson.completed);
    
      if (hasProgress) {
        setSelectedCourse(index);
      } else {
        setCurrentCourseIndex(index);
        setShowCourseConfirmation(true);
      }
    };
    

  // const handleConfirmAccess = async () => {
  //   const course = courseData[currentCourseIndex];

  //   const progressData = await fetchProgress(userId, course.id);
  //   const completedLessons = new Set(progressData?.completedLessons || []);

  //   const updatedLessons = course.lessons.map((lesson, i) => ({
  //     ...lesson,
  //     completed: completedLessons.has(i + 1),
  //   }));

  //   const updatedCourses = [...courseData];
  //   updatedCourses[currentCourseIndex].lessons = updatedLessons;

  //   setCourseData(updatedCourses);
  //   setSelectedCourse(currentCourseIndex);
  //   setShowCourseConfirmation(false);
  // };
  const handleConfirmAccess = () => {
    setSelectedCourse(currentCourseIndex);
    setShowCourseConfirmation(false);
  };
  

  const handleDayClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleOverlayClick = (e) => {
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('lesson-details-overlay')
    ) {
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
      <p className="tracker-subtext">
        Pick a course, track your lessons, and stay on track!
      </p>

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
              <div
                className="progress-bar"
                style={{ width: `${getCourseProgress(course.lessons)}%` }}
              />
            </div>

            {selectedCourse === courseIndex && (
              <div className="lesson-grid">
                {course.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className={`lesson-day ${lesson.completed ? 'completed' : ''}`}
                    onClick={() => handleDayClick(lesson)}
                  >
                    <span>
                      {lesson.title} - Lesson {lessonIndex + 1}
                    </span>
                    <input
                      type="checkbox"
                      checked={lesson.completed}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleLesson(courseIndex, lessonIndex)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showCourseConfirmation && currentCourseIndex !== null && (
        <div className="overlay">
          <div className="confirmation-popup">
            <p>
              Do you want to access the course: {courseData[currentCourseIndex].name}?
            </p>
            <button onClick={handleConfirmAccess}>Yes</button>
            <button onClick={() => setShowCourseConfirmation(false)}>No</button>
          </div>
        </div>
      )}

      {selectedLesson && (
        <div className="lesson-details-overlay">
          <div className="lesson-details-popup">
            <a
              href={selectedLesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
            <a
              href={selectedLesson.notes}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Notes (PDF)
            </a>
            <button onClick={() => setSelectedLesson(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeTracker;
