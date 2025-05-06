import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/resume.css';

const ResumeCourse = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const user = localStorage.getItem('user');
  const studentId = user ? JSON.parse(user).userid : null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/courses/student/${studentId}`);
        setSelectedCourses(res.data);
      } catch (err) {
        console.error('Error fetching student courses:', err);
      }
    };

    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  return (
    <div className="resume-container">
      <h1 className="resume-title">My Selected Courses</h1>
      <div className="course-box-container">
        {selectedCourses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id} className="course-box">
            <h2>{course.courseName}</h2>
            <p>Instructor: {course.instructorName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResumeCourse;
