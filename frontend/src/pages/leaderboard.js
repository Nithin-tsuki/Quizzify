// import React from "react";
// import "../styles/leaderboard.css";

// const Leaderboard = () => {
//   const users = [
//     { name: "Naruto", xp: 1420 },
//     { name: "Sasuke", xp: 1370 },
//     { name: "Sakura", xp: 1220 },
//     { name: "Kakashi", xp: 1150 },
//   ];

//   return (
//     <div className="leaderboard-container">
//       <h2 className="leaderboard-title">Leaderboard</h2>
//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>XP</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td>{u.name}</td>
//               <td>{u.xp}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;
import React from "react";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const users = [
    { name: "Naruto", xp: 1420 },
    { name: "Sasuke", xp: 1370 },
    { name: "Sakura", xp: 1220 },
    { name: "Kakashi", xp: 1150 },
  ];

  // Function to determine level based on XP with adjusted thresholds
  const getLevel = (xp) => {
    if (xp >= 2000) return "God";        // XP >= 2000 for "God"
    if (xp >= 1700) return "Hokage";     // XP >= 1700 for "Hokage"
    if (xp >= 1400) return "Jonin";      // XP >= 1400 for "Jonin"
    if (xp >= 1100) return "Chunin";     // XP >= 1100 for "Chunin"
    return "Genin";                      // Anything below 1100 is "Genin"
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Level</th>
            <th>XP</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{getLevel(u.xp)}</td>
              <td>{u.xp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
