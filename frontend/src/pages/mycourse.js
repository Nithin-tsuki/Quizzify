
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/mycourse.css';
// import * as XLSX from 'xlsx';

// const MyCourse = () => {
//   const [courses, setCourses] = useState([]);


//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [topicTitle, setTopicTitle] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [noteFile, setNoteFile] = useState(null);
//   const [newSubjectName, setNewSubjectName] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/courses/all');
//       console.log('Fetched courses:', res.data); // Debugging line to check fetched data
//       setCourses(res.data);
//     } catch (err) {
//       console.error('Error fetching courses:', err);
//     }
//   };

//   const handleCourseClick = (course) => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     setSelectedCourse(course);
//     fetchTopicsForCourse(course.courseName, user.username);
//   };
  
//   const fetchTopicsForCourse = async (courseName, instructorName) => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/courses/topics', {
//         params: { courseName, instructorName }
//       });
  
//       const updatedCourse = { ...selectedCourse, topics: res.data };
//       setSelectedCourse(updatedCourse);
//     } catch (err) {
//       console.error('Error fetching topics:', err);
//     }
//   };
  

//   const handleAddTopic = async () => {
//     if (!topicTitle || !videoFile || !noteFile) {
//       alert('Please enter title, video and note file.');
//       return;
//     }
  
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.username) {
//       alert('User info not found');
//       return;
//     }
//   console.log(selectedCourse); // Debugging line to check user info
//     const formData = new FormData();
//     formData.append('topic', topicTitle);
//     formData.append('video', videoFile);
//     formData.append('note', noteFile);
//     formData.append('instructorName', user.username);
//     formData.append('courseName', selectedCourse.courseName);
//     formData.append('instructorId', user.userid);
  
//     try {
//       await axios.post('http://localhost:5001/api/courses/topics/create', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
      
//       alert('Topic added successfully!');
//       setTopicTitle('');
//       setVideoFile(null);
//       setNoteFile(null);
      
//       // 🔁 Re-fetch topics from backend
//       fetchTopicsForCourse(selectedCourse.courseName, user.username);
//     } catch (err) {
//       console.error('Error adding topic:', err);
//       alert('Failed to add topic.');
//     }
//   };
  

//   const handleCreateSubject = async () => {
//     if (!newSubjectName) return;
  
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user || !user.username || !user.userid) {
//         alert('User information not found in local storage.');
//         return;
//       }
  
//       const payload = {
//         courseName: newSubjectName,
//         instructorName: user.username,
//         instructorId: user.userid,
//         notes: 'ddd', // required and default is '' in schema
//         video: ['dddd'], // required with default '', so at least one string should be passed
//         topic: 'Introduction' // required in schema, must be non-empty
//       };
  
//       const res = await axios.post('http://localhost:5001/api/courses/create', payload);
//       setCourses((prev) => [...prev, res.data]);
//       setNewSubjectName('');
//       alert('Subject created!');
//     } catch (err) {
//       console.error('Error creating course:', err);
//       alert('Failed to create subject.');
//     }
//   };
  
//   const downloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(selectedCourse.students);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Report');
//     XLSX.writeFile(workbook, `${selectedCourse.courseName}-report.xlsx`);
//   };

//   return (
//     <div className="page">
//       <h1>Teacher Course Dashboard</h1>
//       <p className="subtext">Click on a subject box to manage topics and student reports.</p>

//       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Enter new subject name"
//           value={newSubjectName}
//           onChange={(e) => setNewSubjectName(e.target.value)}
//           style={{ marginRight: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
//         />
//         <button className="save-btn" onClick={handleCreateSubject}>Create Subject</button>
//       </div>

//       <div className="course-boxes">
//       {courses.map((course) => (
//   <div
//     key={course._id}
//     className="course-box"
//     onClick={() => handleCourseClick(course)}
//   >
//     {course.courseName}
//   </div>
// ))}

//       </div>

//       {selectedCourse && (
//         <div className="course-details">
//           <h2>{selectedCourse.courseName} (ID: {selectedCourse.id}) - Add Topic</h2>
//           <input
//             type="text"
//             value={topicTitle}
//             onChange={(e) => setTopicTitle(e.target.value)}
//             placeholder="Enter Topic Title"
//           />

//           <div className="upload-section">
//             <label className="upload-label">Upload Video:</label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setVideoFile(e.target.files[0])}
//               className="upload-input"
//             />

//             <label className="upload-label">Upload Notes (PDF/DOC/TXT):</label>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,.txt"
//               onChange={(e) => setNoteFile(e.target.files[0])}
//               className="upload-input"
//             />
//           </div>

//           <button className="save-btn" onClick={handleAddTopic}>Add Topic</button>

//           <div className="topics-list">
//             <h3>Topics</h3>
//             <ul>
//             {selectedCourse?.topics?.length > 0 && (
//   <ul>
//    {selectedCourse?.topic?.length > 0 ? (
//   <ul>
//     {selectedCourse.topic.map((topic, idx) => (
//       <li key={idx}>
//         {topic.title} - 
//         <a href={topic.video?.[0]} target="_blank" rel="noopener noreferrer">Video</a> - 
//         <a href={topic.note} target="_blank" rel="noopener noreferrer">Notes</a>
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p>No topics available for this course.</p>
// )}

//   </ul>
// )}
//             </ul>
//           </div>

//           <div className="student-report">
//             <h2>Student Leaderboard</h2>
//             <table className="leaderboard-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Quizzes</th>
//                   <th>Score</th>
//                   <th>XP</th>
//                   <th>Level</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {selectedCourse.students && selectedCourse.students.length > 0 && (
//   <tbody>
//     {selectedCourse.students.map((s, idx) => (
//       <tr key={idx}>
//         <td>{s.name}</td>
//         <td>{s.quizzes}</td>
//         <td>{s.score}</td>
//         <td>{s.xp}</td>
//         <td>{s.level}</td>
//       </tr>
//     ))}
//   </tbody>
// )}
//               </tbody>
//             </table>

//             <button className="download-btn" onClick={downloadExcel}>Download Excel Report</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCourse;
// components/MyCourse.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/mycourse.css';
// import * as XLSX from 'xlsx';

// const MyCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [topicTitle, setTopicTitle] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [noteFile, setNoteFile] = useState(null);
//   const [newSubjectName, setNewSubjectName] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/courses/all');
//       // Remove duplicate courses based on courseName and instructorName
//       const uniqueCourses = Array.from(
//         new Map(res.data.map((item) => [item.courseName + item.instructorName, item])).values()
//       );
//       setCourses(uniqueCourses);
//     } catch (err) {
//       console.error('Error fetching courses:', err);
//     }
//   };

//   const handleCourseClick = (course) => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     setSelectedCourse(course);
//     fetchTopicsForCourse(course.courseName, user.username);
//   };

//   const fetchTopicsForCourse = async (courseName, instructorName) => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/courses/topics', {
//         params: { courseName, instructorName },
//       });
//       console.log('Fetched topics:', res.data,courseName); // Debugging line to check fetched data
//       const updatedCourse = { ...selectedCourse, topics: res.data };
//       setSelectedCourse(updatedCourse);
//     } catch (err) {
//       console.error('Error fetching topics:', err);
//     }
//   };

//   const handleAddTopic = async () => {
//     if (!topicTitle || !videoFile || !noteFile) {
//       alert('Please enter title, video and note file.');
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.username) {
//       alert('User info not found');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('topic', topicTitle);
//     formData.append('video', videoFile);
//     formData.append('note', noteFile);
//     formData.append('instructorName', user.username);
//     formData.append('courseName', selectedCourse.courseName);
//     formData.append('instructorId', user.userid);

//     try {
//       await axios.post('http://localhost:5001/api/courses/topics/create', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       alert('Topic added successfully!');
//       setTopicTitle('');
//       setVideoFile(null);
//       setNoteFile(null);

//       // Re-fetch topics from backend
//       console.log(selectedCourse.courseName, user.username,"after adding"); // Debugging line to check user info
//       fetchTopicsForCourse(selectedCourse.courseName, user.username);
//     } catch (err) {
//       console.error('Error adding topic:', err);
//       alert('Failed to add topic.');
//     }
//   };

//   const handleCreateSubject = async () => {
//     if (!newSubjectName) return;

//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user || !user.username || !user.userid) {
//         alert('User information not found in local storage.');
//         return;
//       }

//       const payload = {
//         courseName: newSubjectName,
//         instructorName: user.username,
//         instructorId: user.userid,
//       };

//       const res = await axios.post('http://localhost:5001/api/courses/create', payload);
//       setCourses((prev) => [...prev, res.data]);
//       setNewSubjectName('');
//       alert('Subject created!');
//     } catch (err) {
//       console.error('Error creating course:', err);
//       alert('Failed to create subject.');
//     }
//   };

//   const downloadExcel = () => {
//     if (!selectedCourse || !selectedCourse.students) {
//       alert('No student data available to download.');
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(selectedCourse.students);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Report');
//     XLSX.writeFile(workbook, `${selectedCourse.courseName}-report.xlsx`);
//   };

//   return (
//     <div className="page">
//       <h1>Teacher Course Dashboard</h1>
//       <p className="subtext">Click on a subject box to manage topics and student reports.</p>

//       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Enter new subject name"
//           value={newSubjectName}
//           onChange={(e) => setNewSubjectName(e.target.value)}
//           style={{ marginRight: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
//         />
//         <button className="save-btn" onClick={handleCreateSubject}>
//           Create Subject
//         </button>
//       </div>

//       <div className="course-boxes">
//       {courses.map((course, idx) => (
//           <div
//             key={idx}
//             className="course-box"
//             onClick={() => handleCourseClick(course)}
//           >
//             <h3>{course.courseName}</h3>
//             <p>Instructor: {course.instructorName}</p>
//           </div>
//         ))}
//       </div>

//       {selectedCourse && (
//         <div className="course-details">
//           <h2>Managing: {selectedCourse.courseName}</h2>

//           <div className="topic-upload">
//             <input
//               type="text"
//               placeholder="Topic title"
//               value={topicTitle}
//               onChange={(e) => setTopicTitle(e.target.value)}
//             />
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => setVideoFile(e.target.files[0])}
//             />
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={(e) => setNoteFile(e.target.files[0])}
//             />
//             <button className="save-btn" onClick={handleAddTopic}>
//               Add Topic
//             </button>
//           </div>

//           <h3>Topics:</h3>
//           <ul className="topics-list">
//             {selectedCourse.topics && selectedCourse.topics.length > 0 ? (
//               selectedCourse.topics.map((topic, idx) => (
//                 <li key={idx}>{topic.topic}</li>
//               ))
//             ) : (
//               <p>No topics added yet.</p>
//             )}
//           </ul>

//           <button className="download-btn" onClick={downloadExcel}>
//             Download Student Report (Excel)
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCourse;

 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/mycourse.css';
import * as XLSX from 'xlsx';

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [topicTitle, setTopicTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [noteFile, setNoteFile] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/courses/teacher/${user.userid}`);
      const uniqueCourses = Array.from(
        new Map(res.data.map((item) => [item.courseName + item.instructorName, item])).values()
      ); 
      setCourses(uniqueCourses);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleCourseClick = async (course) => {
    if (!user || !user.username) return;
  
    try {
      const [topicsRes, studentsRes] = await Promise.all([
        axios.get('http://localhost:5001/api/courses/topics', {
          params: { courseName: course.courseName, instructorName: user.username },
        }),
        axios.get('http://localhost:5001/api/courses/students', {
          params: { courseName: course.courseName, instructorName: user.username },
        })
      ]);
  
      setSelectedCourse({ ...course, topics: topicsRes.data, students: studentsRes.data });
    } catch (err) {
      console.error('Error fetching course details:', err);
    }
  };
  

  const handleAddTopic = async () => {
    if (!topicTitle || !videoFile || !noteFile) {
      alert('Please enter title, video and note file.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.username || !user.userid || !selectedCourse) {
      alert('User or course info not found.');
      return;
    }

    const formData = new FormData();
    formData.append('topic', topicTitle);
    formData.append('video', videoFile);
    formData.append('note', noteFile);
    formData.append('instructorName', user.username);
    formData.append('courseName', selectedCourse.courseName);
    formData.append('instructorId', user.userid);

    try {
      await axios.post('http://localhost:5001/api/courses/topics/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Topic added successfully!');
      setTopicTitle('');
      setVideoFile(null);
      setNoteFile(null);

      // Refresh course topics after addition
      const updatedTopics = await axios.get('http://localhost:5001/api/courses/topics', {
        params: { courseName: selectedCourse.courseName, instructorName: user.username },
      });

      setSelectedCourse((prev) => ({
        ...prev,
        topics: updatedTopics.data,
      }));
    } catch (err) {
      console.error('Error adding topic:', err);
      alert('Failed to add topic.');
    }
  };

  const handleCreateSubject = async () => {
    if (!newSubjectName) return;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.username || !user.userid) {
      alert('User information not found in local storage.');
      return;
    }

    try {
      const payload = {
        courseName: newSubjectName,
        instructorName: user.username,
        instructorId: user.userid,
      };

      const res = await axios.post('http://localhost:5001/api/courses/create', payload);
      setCourses((prev) => [...prev, res.data]);
      setNewSubjectName('');
      alert('Subject created!');
    } catch (err) {
      console.error('Error creating course:', err);
      alert('Failed to create subject.');
    }
  };

  const downloadExcel = () => {
    if (!selectedCourse || !selectedCourse.students) {
      alert('No student data available to download.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selectedCourse.students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Report');
    XLSX.writeFile(workbook, `${selectedCourse.courseName}-report.xlsx`);
  };

  return (
    <div className="page">
      <h1>Teacher Course Dashboard</h1>
      <p className="subtext">Click on a subject box to manage topics and student reports.</p>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter new subject name"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button className="save-btn" onClick={handleCreateSubject}>
          Create Subject
        </button>
      </div>

      <div className="course-boxes">
        {courses.map((course, idx) => (
          <div key={idx} className="course-box" onClick={() => handleCourseClick(course)}>
            <h3>{course.courseName}</h3>
            <p>Instructor: {course.instructorName}</p>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="course-details">
          <h2>Managing: {selectedCourse.courseName}</h2>

          <div className="topic-upload">
            <input
              type="text"
              placeholder="Topic title"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setNoteFile(e.target.files[0])}
            />
            <button className="save-btn" onClick={handleAddTopic}>
              Add Topic
            </button>
          </div>

          <h3>Topics:</h3>
          <ul className="topics-list">
            {selectedCourse.topics && selectedCourse.topics.length > 0 ? (
              selectedCourse.topics.map((topic, idx) => (
                <li key={idx}>{topic.title}</li>
              ))
            ) : (
              <p>No topics added yet.</p>
            )}
          </ul>
         <h3>Enrolled Students:</h3>
{selectedCourse.students && selectedCourse.students.length > 0 ? (
  <table className="students-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Points</th>
        <th>Quizzes Attended</th>
      </tr>
    </thead>
    <tbody>
      {selectedCourse.students.map((student, idx) => (
        <tr key={idx}>
          <td>{student.username}</td>
          <td>{student.email}</td>
          <td>{student.points ?? 0}</td>
          <td>{student.quizAttended ?? 0}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No students enrolled yet.</p>
)}
  

          <button className="download-btn" onClick={downloadExcel}>
            Download Student Report (Excel)
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourse;
