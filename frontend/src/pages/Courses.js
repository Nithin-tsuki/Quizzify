// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/courses.css';

// const Courses = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');
//   const user=localStorage.getItem('user');
//   const studentId = user ? JSON.parse(user).userid : null;

//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/api/courses');
//         setCourses(res.data);
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleClick = (course) => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }
  
//     const isEnrolled = course.students.includes(studentId);
  
//     if (isEnrolled) {
//       navigate(`/courses/${course._id}`);
//     } else {
//       setSelectedCourse(course);
//       setShowModal(true);
//     }
//   };
  

//   const confirmJoin = async () => {
//     try {
//       console.log('Enrolling in course:', studentId, selectedCourse._id);
//       await axios.post(`http://localhost:5001/api/courses/enroll/${selectedCourse._id}`, {
//         studentId,
//       });
//       navigate(`/courses/${selectedCourse._id}`);
//     } catch (err) {
//       alert('Error enrolling in course');
//     } finally {
//       setShowModal(false);
//     }
//   };

//   return (
//     <div className="page">
//       <h1 className="title">All Courses</h1>
//       <p className="subtitle">Explore all the learning paths offered by Quizzify:</p>
//       <div className="scourses-container">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="scourse-card clickable"
//             onClick={() => handleClick(course)}
//           >
//             <h2>{course.courseName}</h2>
//             <p><strong>Lecturer:</strong> {course.instructorName}</p>
//             <p><strong>Topics:</strong> {course.topics.length} topic(s)</p>
//           </div>
//         ))}
//       </div>

//       {showModal && selectedCourse && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Join Course</h3>
//             <p>Do you want to join <strong>{selectedCourse.courseName}</strong>?</p>
//             <div className="modal-buttons">
//               <button className="confirm-btn" onClick={confirmJoin}>Yes, Join</button>
//               <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
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
  const user = localStorage.getItem('user');
  const studentId = user ? JSON.parse(user).userid : null;

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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

      {/* <div className="search-container">
        <button
          className="search-icon-btn"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          className={`search-input ${showSearch ? 'expanded' : ''}`}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
<div className={`search-wrapper ${showSearch ? 'active' : ''}`}>
  <input
    type="text"
    className="styled-search-input"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button className="styled-search-btn" onClick={() => setShowSearch((prev) => !prev)}>
    <i className="fas fa-search"></i>
  </button>
</div>

      <div className="scourses-container">
        {courses
          .filter((course) =>
            course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((course) => (
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
