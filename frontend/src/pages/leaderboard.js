// import React from "react";
// import "../styles/leaderboard.css";

// const Leaderboard = () => {
//   const users = [
//     { name: "Naruto", xp: 1420 },
//     { name: "Sasuke", xp: 1370 },
//     { name: "Sakura", xp: 1220 },
//     { name: "Kakashi", xp: 1150 },
//   ];

//   // Function to determine level based on XP with adjusted thresholds
//   const getLevel = (xp) => {
//     if (xp >= 2000) return "God";        // XP >= 2000 for "God"
//     if (xp >= 1700) return "Hokage";     // XP >= 1700 for "Hokage"
//     if (xp >= 1400) return "Jonin";      // XP >= 1400 for "Jonin"
//     if (xp >= 1100) return "Chunin";     // XP >= 1100 for "Chunin"
//     return "Genin";                      // Anything below 1100 is "Genin"
//   };

//   return (
//     <div className="leaderboard-container">
//       <h2 className="leaderboard-title">Leaderboard</h2>
//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>Level</th>
//             <th>XP</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td>{u.name}</td>
//               <td>{getLevel(u.xp)}</td>
//               <td>{u.xp}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data (students sorted by points)
    axios.get('/api/users/leaderboard')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);
console.log(students);
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <div className="header-item">Rank</div>
          <div className="header-item">Name</div>
          <div className="header-item">Username</div>
          <div className="header-item">Email</div>
          <div className="header-item">Points</div>
        </div>
        {students.map((student, index) => (
          <div className="leaderboard-row" key={student._id}>
            <div className="row-item">{index + 1}</div>
            <div className="row-item">{student.fullName}</div>
            <div className="row-item">{student.username}</div>
            <div className="row-item">{student.email}</div>
            <div className="row-item">{student.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
