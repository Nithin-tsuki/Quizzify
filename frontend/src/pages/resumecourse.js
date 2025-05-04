import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/resume.css';

const ResumeCourse = () => {
  const selectedCourses = [
    {
      id: 1,
      courseName: 'Maths',
      path: '/math',
    },
    {
      id: 2,
      courseName: 'Python',
      path: '/py',
    },
    {
      id: 3,
      courseName: 'HTML',
      path: '/html',
    },
    {
        id: 4,
        courseName: 'CSS',
        path: '/css',
    },
  ];

  return (
    <div className="resume-container">
      <h1 className="resume-title">My Selected Courses</h1>
      <div className="course-box-container">
        {selectedCourses.map((course) => (
          <Link to={course.path} key={course.id} className="course-box">
            <h2>{course.courseName}</h2>
            <p>Subject ID: {course.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResumeCourse;
