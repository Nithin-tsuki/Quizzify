// import React, { useState } from 'react';
// import '../styles/studentreports.css';

// const StudentReports = () => {
//   const coursesData = [
//     {
//       courseName: "Math 101",
//       students: [
//         { name: "John", xp: 120 },
//         { name: "Alice", xp: 180 },
//         { name: "Bob", xp: 90 },
//       ],
//     },
//     {
//       courseName: "Physics 101",
//       students: [
//         { name: "Mike", xp: 150 },
//         { name: "Sara", xp: 200 },
//         { name: "Tom", xp: 140 },
//       ],
//     },
//     {
//       courseName: "Chemistry 101",
//       students: [
//         { name: "Emma", xp: 130 },
//         { name: "James", xp: 170 },
//         { name: "Sophia", xp: 110 },
//       ],
//     },
//   ];

//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const handleCourseClick = (course) => {
//     setSelectedCourse(course);
//   };

//   const renderLeaderboard = () => {
//     const sortedStudents = [...selectedCourse.students].sort((a, b) => b.xp - a.xp);

//     return (
//       <div className="leaderboard">
//         <h2>Leaderboard - {selectedCourse.courseName}</h2>
//         <ul>
//           {sortedStudents.map((student, index) => (
//             <li key={index}>
//               {student.name} - {student.xp} XP
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div className="page">
//       <h1>Student Reports</h1>
//       <p style={{ textAlign: 'center', marginTop: '50px' }}>Click on a course to view the leaderboard.</p>

//       <div className="course-list">
//         <h2>Courses</h2>
//         <ul>
//           {coursesData.map((course, index) => (
//             <li key={index} onClick={() => handleCourseClick(course)} className="course-item">
//               {course.courseName}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedCourse && renderLeaderboard()}
//     </div>
//   );
// };

// export default StudentReports;
import React, { useState } from 'react';
import '../styles/mycourse.css';
import * as XLSX from 'xlsx';

const coursesData = [
  {
    id: 1,
    courseName: 'Math 101',
    topics: [],
    students: [
      { name: 'John', quizzes: 5, score: 85, xp: 120, level: 3 },
      { name: 'Alice', quizzes: 6, score: 95, xp: 180, level: 4 },
      { name: 'Bob', quizzes: 3, score: 75, xp: 90, level: 2 },
    ],
  },
  {
    id: 2,
    courseName: 'Physics 101',
    topics: [],
    students: [
      { name: 'Mike', quizzes: 4, score: 80, xp: 150, level: 3 },
      { name: 'Sara', quizzes: 6, score: 98, xp: 200, level: 5 },
      { name: 'Tom', quizzes: 4, score: 70, xp: 140, level: 3 },
    ],
  },
  {
    id: 3,
    courseName: 'Chemistry 101',
    topics: [],
    students: [
      { name: 'Eve', quizzes: 5, score: 88, xp: 170, level: 4 },
      { name: 'Leo', quizzes: 4, score: 92, xp: 160, level: 4 },
      { name: 'Nina', quizzes: 3, score: 78, xp: 130, level: 3 },
    ],
  },
];

const StudentReports = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [topicTitle, setTopicTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [noteFile, setNoteFile] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleAddTopic = () => {
    if (!topicTitle) return;
    const newTopic = {
      title: topicTitle,
      video: videoFile,
      note: noteFile,
    };
    selectedCourse.topics.push(newTopic);
    setTopicTitle('');
    setVideoFile(null);
    setNoteFile(null);
    alert('Topic added successfully!');
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedCourse.students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Report');
    XLSX.writeFile(workbook, `${selectedCourse.courseName}-report.xlsx`);
  };

  return (
    <div className="page">
      <h1>Teacher Course Dashboard</h1>
      <p className="subtext">Click on a subject box to get student reports.</p>

      <div className="course-boxes">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className="course-box"
            onClick={() => handleCourseClick(course)}
          >
            {course.courseName}
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="course-details">
          <h2>{selectedCourse.courseName}</h2>
          <div className="student-report">
            <h2>Student Leaderboard</h2>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quizzes</th>
                  <th>Score</th>
                  <th>XP</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.students.map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.name}</td>
                    <td>{s.quizzes}</td>
                    <td>{s.score}</td>
                    <td>{s.xp}</td>
                    <td>{s.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="download-btn" onClick={downloadExcel}>Download Excel Report</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReports;
