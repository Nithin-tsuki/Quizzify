import React, { useEffect, useState } from 'react';
import "../styles/myprofile.css";

const MyProfile = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || "default");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentRole = localStorage.getItem("role") || "default";
      if (currentRole !== role) {
        setRole(currentRole);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [role]);

  // Teacher Profile
  if (role === "teacher") {
    return (
      <div className="profile-container">
        <section className="profile-header">
          <img src={require("../imagesVideos/teacher.jpg")} alt="Teacher Profile" className="profile-image" />
          <h1>Welcome, Teacher!</h1>
          <p>Empower your students to reach their full potential! 📚</p>
        </section>

        <section className="teacher-profile">
          <p>Name: <strong>John Doe</strong></p>
          <p>Email: <strong>john.doe@school.com</strong></p>
          <p>Role: <strong>Teacher</strong></p>
          <p>Teacher ID: <strong>T-12345</strong></p>
        </section>
      </div>
    );
  }

  // Student Profile
  if (role === "student") {
    return (
      <div className="profile-container">
        <section className="profile-header">
          <img src={require("../imagesVideos/student.png")} alt="Student Profile" className="profile-image" />
          <h1>Welcome, Student!</h1>
          <p>Keep up the good work, and continue your learning journey! 🌱</p>
        </section>

        <section className="student-profile">
          <p>Name: <strong>Jane Smith</strong></p>
          <p>Email: <strong>jane.smith@student.com</strong></p>
          <p>Role: <strong>Student</strong></p>
          <p>Student ID: <strong>S-98765</strong></p>
          <p>Level: <strong>Chunin</strong></p>
          <p>XP: <strong>1200</strong></p>
          <p>Completed Courses: <strong>4</strong></p>
        </section>
      </div>
    );
  }

  // Default view for guest or no role
  return (
    <div className="profile-container">
      <section className="profile-header">
        <h1>Welcome to MyProfile</h1>
        <p>Please sign in to view your profile</p>
      </section>
    </div>
  );
};

export default MyProfile;
