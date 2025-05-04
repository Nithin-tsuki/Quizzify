import React from "react";
import "../styles/mycourses.css";

const MyCourses = () => {
  const courses = [
    { title: "Intro to Ninjutsu", progress: "80%" },
    { title: "Advanced Chakra Control", progress: "65%" },
    { title: "Team Strategies", progress: "100%" },
  ];

  return (
    <div className="courses-containers">
      <h2 className="courses-titles">My Courses</h2>
      <ul className="course-lists">
        {courses.map((course, idx) => (
          <li key={idx} className="course-item">
            <span>{course.title}</span>
            <span>{course.progress}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCourses;
