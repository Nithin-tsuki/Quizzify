// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/challenges.css';

// const challenges = [
//   {
//     id: 1,
//     title: "HTML Tag Race",
//     description: "Structure a web page layout using HTML tags in under 3 minutes!"
//   },
//   {
//     id: 2,
//     title: "CSS Styling Showdown",
//     description: "Apply styles to match the target design using Flexbox and Grid."
//   },
//   {
//     id: 3,
//     title: "JS Logic Lightning",
//     description: "Solve JavaScript puzzles faster than your opponent."
//   },
//   {
//     id: 4,
//     title: "Python Quick Quiz",
//     description: "Answer Python code questions correctly under time pressure."
//   }
// ];

// // Sample friends data (can be replaced with actual data)
// const friendsList = [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' },
//   { id: 4, name: 'David' }
// ];

// const Challenges = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');
  
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [selectedChallenge, setSelectedChallenge] = useState(null);
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   const handleChallengeClick = (challenge) => {
//     if (!role) {
//       navigate('/login');
//     } else {
//       setSelectedChallenge(challenge);
//       setShowOverlay(true);
//     }
//   };

//   const handleFriendSelect = (friend) => {
//     setSelectedFriend(friend);
//   };

//   const handleStartChallenge = () => {
//     if (selectedFriend) {
//       alert(`Challenge started! You challenged ${selectedFriend.name} to ${selectedChallenge.title}`);
//       setShowOverlay(false); // Close the overlay
//     } else {
//       alert('Please select a friend to challenge!');
//     }
//   };

//   const handleCloseOverlay = () => {
//     setShowOverlay(false);
//   };

//   return (
//     <div className="page">
//       <h1 className="challenge-heading">⚔️ Challenge a Friend</h1>
//       <p className="challenge-subtext">Pick a challenge below and invite a friend to duel!</p>

//       <div className="challenge-grid">
//         {challenges.map(({ id, title, description }) => (
//           <div className="challenge-card" key={id}>
//             <h2>{title}</h2>
//             <p style={{ color: 'white' }}>{description}</p>
//             <button className="challenge-btn" onClick={() => handleChallengeClick({ id, title, description })}>
//               Challenge Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Overlay for selecting a friend */}
//       {showOverlay && (
//         <div className="overlay">
//           <div className="overlay-content">
//             <h2>Select a Friend to Challenge</h2>
//             <ul className="friends-list">
//               {friendsList.map(friend => (
//                 <li key={friend.id} onClick={() => handleFriendSelect(friend)} className={selectedFriend?.id === friend.id ? 'selected' : ''}>
//                   {friend.name}
//                 </li>
//               ))}
//             </ul>
//             <div className="overlay-buttons">
//               <button onClick={handleStartChallenge} className="start-challenge-btn">Start Challenge</button>
//               <button onClick={handleCloseOverlay} className="close-overlay-btn">Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Challenges;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/challenges.css';

const challenges = [
  {
    id: 1,
    title: "HTML Tag Race",
    description: "Structure a web page layout using HTML tags in under 3 minutes!"
  },
  {
    id: 2,
    title: "CSS Styling Showdown",
    description: "Apply styles to match the target design using Flexbox and Grid."
  },
  {
    id: 3,
    title: "JS Logic Lightning",
    description: "Solve JavaScript puzzles faster than your opponent."
  },
  {
    id: 4,
    title: "Python Quick Quiz",
    description: "Answer Python code questions correctly under time pressure."
  }
];

// Sample friends data (can be replaced with actual data)
const friendsList = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' }
];

const Challenges = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [currentView, setCurrentView] = useState('challenges'); // New state for view toggle
  const [sentChallenges, setSentChallenges] = useState([]); // Store sent challenges
  const [receivedChallenges, setReceivedChallenges] = useState([]); // Store received challenges

  const handleChallengeClick = (challenge) => {
    if (!role) {
      navigate('/login');
    } else {
      setSelectedChallenge(challenge);
      setShowOverlay(true);
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  const handleStartChallenge = () => {
    if (selectedFriend) {
      // Add sent challenge
      setSentChallenges([...sentChallenges, { challenge: selectedChallenge, friend: selectedFriend, status: 'Pending' }]);
      // Notify the friend about the received challenge
      setReceivedChallenges([...receivedChallenges, { challenge: selectedChallenge, friend: selectedFriend, status: 'Received' }]);

      alert(`Challenge started! You challenged ${selectedFriend.name} to ${selectedChallenge.title}`);
      setShowOverlay(false); // Close the overlay
    } else {
      alert('Please select a friend to challenge!');
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleAcceptChallenge = (challenge) => {
    // Update received challenge status to 'Accepted'
    const updatedChallenges = receivedChallenges.map((item) =>
      item === challenge ? { ...item, status: 'Accepted' } : item
    );
    setReceivedChallenges(updatedChallenges);
    alert(`${challenge.friend.name} accepted your challenge to ${challenge.challenge.title}`);
  };

  const handleRejectChallenge = (challenge) => {
    // Remove the received challenge from the list
    const updatedChallenges = receivedChallenges.filter((item) => item !== challenge);
    setReceivedChallenges(updatedChallenges);
    alert(`${challenge.friend.name} rejected your challenge to ${challenge.challenge.title}`);
  };

  const renderChallenges = () => {
    return challenges.map(({ id, title, description }) => (
      <div className="challenge-card" key={id}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="challenge-btn" onClick={() => handleChallengeClick({ id, title, description })}>
          Challenge Now
        </button>
      </div>
    ));
  };

  const renderPendingChallenges = () => {
    return sentChallenges
      .filter((challenge) => challenge.status === 'Pending')
      .map(({ challenge, friend }, index) => (
        <div key={index} className="challenge-card">
          <h2>{challenge.title}</h2>
          <p>Challenge sent to {friend.name}</p>
          <p>Status: Pending</p>
        </div>
      ));
  };

  const renderReceivedChallenges = () => {
    return receivedChallenges
      .filter((challenge) => challenge.status === 'Received')
      .map(({ challenge, friend }, index) => (
        <div key={index} className="challenge-card">
          <h2>{challenge.title}</h2>
          <p>Received from {friend.name}</p>
          <p>Status: Received</p>
          <div>
            <button onClick={() => handleAcceptChallenge({ challenge, friend })} className="start-challenge-btn">
              Accept
            </button>
            <button onClick={() => handleRejectChallenge({ challenge, friend })} className="close-overlay-btn">
              Reject
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div className="page">
      <h1 className="challenge-heading">⚔️ Challenge a Friend</h1>
      <p className="challenge-subtext">Pick a challenge below and invite a friend to duel!</p>

      <div className="challenge-buttons">
        <button onClick={() => setCurrentView('challenges')} className="challenge-btn1">Challenges</button>
        <button onClick={() => setCurrentView('pending')} className="challenge-btn1">Pending Challenges</button>
        <button onClick={() => setCurrentView('received')} className="challenge-btn1">Received Challenges</button>
      </div>

      <div className="challenge-grid">
        {currentView === 'challenges' && renderChallenges()}
        {currentView === 'pending' && renderPendingChallenges()}
        {currentView === 'received' && renderReceivedChallenges()}
      </div>

      {/* Overlay for selecting a friend */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Select a Friend to Challenge</h2>
            <ul className="friends-list">
              {friendsList.map(friend => (
                <li
                  key={friend.id}
                  onClick={() => handleFriendSelect(friend)}
                  className={selectedFriend?.id === friend.id ? 'selected' : ''}
                >
                  {friend.name}
                </li>
              ))}
            </ul>
            <div className="overlay-buttons">
              <button onClick={handleStartChallenge} className="start-challenge-btn">Start Challenge</button>
              <button onClick={handleCloseOverlay} className="close-overlay-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
