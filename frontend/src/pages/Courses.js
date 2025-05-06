// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/courses.css';

// const Courses = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const courses = [
//     {
//       id: 'M101',
//       title: 'DSA Mastery',
//       teacher: 'Prof. Kunal Shah',
//       description: 'Deep dive into Data Structures and Algorithms with hands-on problems and solutions.',
//     },
//     {
//       id: 'W102',
//       title: 'Web Development',
//       teacher: 'Ms. Neha Mehta',
//       description: 'Learn HTML, CSS, JavaScript, and modern frameworks like React to build stunning websites.',
//     },
//     {
//       id: 'ML103',
//       title: 'Machine Learning',
//       teacher: 'Dr. Raghav Menon',
//       description: 'Get started with Python, NumPy, pandas, and dive into real-world ML models and projects.',
//     },
//     {
//       id: 'DB104',
//       title: 'Database Essentials',
//       teacher: 'Prof. Ayesha Khan',
//       description: 'Master SQL, relational databases, normalization, and query optimization techniques.',
//     },
//     {
//       id: 'SD105',
//       title: 'System Design',
//       teacher: 'Mr. Tanmay Bhat',
//       description: 'Understand the fundamentals of designing scalable and reliable systems from scratch.',
//     },
//     {
//       id: 'P106',
//       title: 'Python',
//       teacher: 'Dr. Arjun Dev',
//       description: 'Learn Python programming from scratch with interactive examples and projects.',
//       path: '/py',
//     },
//     {
//       id: 'H107',
//       title: 'HTML',
//       teacher: 'Ms. Sakshi Verma',
//       description: 'Build the structure of web pages with semantic and modern HTML5.',
//       path: '/html',
//     },
//     {
//       id: 'C108',
//       title: 'CSS',
//       teacher: 'Mr. Prakash Reddy',
//       description: 'Style your websites beautifully with CSS3 and responsive design.',
//       path: '/css',
//     },
//     {
//       id: 'M109',
//       title: 'Math',
//       teacher: 'Prof. S. Narayanan',
//       description: 'Sharpen your mathematics skills with fun quizzes and challenges.',
//       path: '/math',
//     },
//   ];

//   const handleClick = (course) => {
//     if (!role) {
//       navigate('/login');
//     } else {
//       setSelectedCourse(course);
//     }
//   };

//   const handleJoin = () => {
//     if (selectedCourse?.path) {
//       navigate(selectedCourse.path);
//     }
//     setSelectedCourse(null);
//   };

//   const handleClose = () => {
//     setSelectedCourse(null);
//   };

//   return (
//     <div className="page">
//       <h1 className="title">All Courses</h1>
//       <p className="subtitle">Explore all the learning paths offered by Quizzify:</p>
//       <div className="scourses-container">
//         {courses.map((course, index) => (
//           <div
//             key={index}
//             className="scourse-card clickable"
//             onClick={() => handleClick(course)}
//           >
//             <h2>{course.title}</h2>
//             <p>{course.description}</p>
//           </div>
//         ))}
//       </div>

//       {selectedCourse && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h2>{selectedCourse.title}</h2>
//             <p><strong>Subject ID:</strong> {selectedCourse.id}</p>
//             <p><strong>Lecturer:</strong> {selectedCourse.teacher}</p>
//             <p>Do you want to join this course?</p>
//             <div className="modal-buttons">
//               <button onClick={handleJoin}>Yes, Join</button>
//               <button onClick={handleClose}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Courses;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const user=localStorage.getItem('user');
  const studentId = user ? JSON.parse(user).userid : null;

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleClick = (course) => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    const isEnrolled = course.students.includes(studentId);
  
    if (isEnrolled) {
      navigate(`/courses/${course._id}`);
    } else {
      setSelectedCourse(course);
      setShowModal(true);
    }
  };
  

  const confirmJoin = async () => {
    try {
      console.log('Enrolling in course:', studentId, selectedCourse._id);
      await axios.post(`http://localhost:5001/api/courses/enroll/${selectedCourse._id}`, {
        studentId,
      });
      navigate(`/courses/${selectedCourse._id}`);
    } catch (err) {
      alert('Error enrolling in course');
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="page">
      <h1 className="title">All Courses</h1>
      <p className="subtitle">Explore all the learning paths offered by Quizzify:</p>
      <div className="scourses-container">
        {courses.map((course) => (
          <div
            key={course._id}
            className="scourse-card clickable"
            onClick={() => handleClick(course)}
          >
            <h2>{course.courseName}</h2>
            <p><strong>Lecturer:</strong> {course.instructorName}</p>
            <p><strong>Topics:</strong> {course.topics.length} topic(s)</p>
          </div>
        ))}
      </div>

      {showModal && selectedCourse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Join Course</h3>
            <p>Do you want to join <strong>{selectedCourse.courseName}</strong>?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmJoin}>Yes, Join</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
