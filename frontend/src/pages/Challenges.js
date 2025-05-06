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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/challenges.css';

const Challenges = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [friends, setFriends] = useState([]); // New state for friend list
  const [loading, setLoading] = useState(false); // Loading state for fetching friends

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
const role = user?.role;
const userId = user?.userid;

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [currentView, setCurrentView] = useState('challenges');
  const [sentChallenges, setSentChallenges] = useState([]);
  const [receivedChallenges, setReceivedChallenges] = useState([]);

  useEffect(() => {
    // console.log("User ID:", userId); // Log the userId to check if it's correct
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/quizchallenges/${userId}`);
        const { sent, received } = response.data;
        setSentChallenges(sent);
        setReceivedChallenges(received);
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
    };
    fetchChallenges();
  }, [userId]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/friends/${userId}`);
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeClick = async (challenge) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedChallenge(challenge);
      await fetchFriends(); // Fetch friends before showing overlay
      setShowOverlay(true);
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  const handleStartChallenge = async () => {
    if (!selectedFriend) return alert("Select a friend!");

    try {
      const payload = {
        senderId: userId,
        receiverId: selectedFriend._id,
        quizId: selectedChallenge.id,
        status: "Pending"
      };

      await axios.post('http://localhost:5001/quizchallenges', payload);

      setSentChallenges([...sentChallenges, {
        challenge: selectedChallenge,
        friend: selectedFriend,
        status: 'Pending'
      }]);

      alert(`Challenge sent to ${selectedFriend.username}`);
      setShowOverlay(false);
    } catch (error) {
      console.error("Error sending challenge:", error);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleAcceptChallenge = async ({ challenge, friend }) => {
    try {
      await axios.patch(`http://localhost:5001/quizchallenges/${challenge.id}`, {
        status: "Accepted"
      });

      setReceivedChallenges((prev) =>
        prev.map((item) =>
          item.challenge.id === challenge.id ? { ...item, status: 'Accepted' } : item
        )
      );

      navigate(`/quiz/${challenge.id}?challenged=true`);
    } catch (error) {
      console.error("Error accepting challenge:", error);
    }
  };

  const handleRejectChallenge = ({ challenge, friend }) => {
    const updatedChallenges = receivedChallenges.filter((item) => item.challenge.id !== challenge.id);
    setReceivedChallenges(updatedChallenges);
    alert(`${friend.name} rejected your challenge to ${challenge.title}`);
  };

  const renderChallenges = () => quizzes.map(({ _id, title, description }) => (
    <div className="challenge-card" key={_id}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="challenge-btn" onClick={() => handleChallengeClick({ id: _id, title, description })}>
        Challenge Now
      </button>
    </div>
  ));

  const renderPendingChallenges = () => sentChallenges
    .filter((challenge) => challenge.status === 'Pending')
    .map(({ challenge, friend }, index) => (
      <div key={index} className="challenge-card">
        <h2>{challenge.title}</h2>
        <p>Challenge sent to {friend.name}</p>
        <p>Status: Pending</p>
      </div>
    ));

  const renderReceivedChallenges = () => receivedChallenges
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

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Select a Friend to Challenge</h2>
            {loading ? (
              <p>Loading friends...</p>
            ) : (
              <ul className="friends-list">
                {friends.map(friend => (
                  <li
                    key={friend._id}
                    onClick={() => handleFriendSelect(friend)}
                    className={selectedFriend?._id === friend._id ? 'selected' : ''}
                  >
                    {friend.username}
                  </li>
                ))}
              </ul>
            )}
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
