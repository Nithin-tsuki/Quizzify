// import React from 'react';
// import '../styles/dashboard.css';

// const Dashboard = () => (
//   <div className="page">
//     <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Teacher Dashboard</h1>
//     <p>Overview of your teaching tools and stats.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

// The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

// Where can I get some?
// There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
//   </div>
// );

// export default Dashboard;
import React, { useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  // Sample state for role (this can be dynamic based on actual user role, here it's hardcoded for demonstration)
  const [role, setRole] = useState('teacher'); // Change to 'student' for student view
  
  const renderTeacherDashboard = () => (
    <div className="teacher-dashboard">
      <h2>Teacher Dashboard</h2>
      <p>Welcome to your dashboard! Here are the things you can do:</p>
      <ul>
        <li>Manage your profile and update your details.</li>
        <li>Access your settings to customize your experience.</li>
        <li>View and track your students' progress and performance.</li>
        <li>Manage your students' details and assignments.</li>
      </ul>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <p>Welcome to your dashboard! Here's what you can do:</p>
      <ul>
        <li>Update your personal profile and details.</li>
        <li>Check your settings and customize your preferences.</li>
        <li>View your performance reports and progress over time.</li>
        <li>Track your achievements and milestones.</li>
      </ul>
    </div>
  );

  return (
    <div className="page">
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Dashboard</h1>
      <p style={{ textAlign: 'center' }}>Overview of your tools and settings.</p>
      
      {/* Render dashboard based on role */}
      {role === 'teacher' ? renderTeacherDashboard() : renderStudentDashboard()}
    </div>
  );
};

export default Dashboard;
