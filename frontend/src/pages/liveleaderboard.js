import React from "react";
import "../styles/liveleader.css";
const LiveLeaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h3>🏆 Leaderboard</h3>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((player, index) => (
            <li key={index}>
              {index + 1}. {player.name} - {player.score} pts
            </li>
          ))
        ) : (
          <p>No scores yet</p>
        )}
      </ul>
    </div>
  );
};

export default LiveLeaderboard;