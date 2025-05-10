// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown, faBolt } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from 'react-router-dom';
// import './styles/header.css';

// const Header = () => {
//   const [role, setRole] = useState(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user?.role || null;
//   });
//   useEffect(() => {
//     const updateUser = () => {
//       const updatedUser = JSON.parse(localStorage.getItem("user"));
//       setRole(updatedUser?.role || null);
//       setXp(updatedUser?.points || 0);
//     };
  
//     window.addEventListener("userUpdated", updateUser);
//     return () => window.removeEventListener("userUpdated", updateUser);
//   }, []);
  
  

//   const [xp, setXp] = useState(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user?.points || 0;
//   });
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const currentRole = user?.role || null;
//       const currentXp = user?.points || 0;
//       if (currentRole !== role) setRole(currentRole);
//       if (currentXp !== xp) setXp(currentXp);
//     }, 500);
  
//     return () => clearInterval(interval);
//   }, [role, xp]);
  
//   const navigate = useNavigate();


//   const handleProtectedNavigation = (e, path) => {
//     if (!role) {
//       e.preventDefault();
//       navigate('/login');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch('http://localhost:3000/api/users/logout', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (err) {
//       console.error('Logout failed:', err);
//     } finally {
//       localStorage.clear();
//       navigate('/login');
//     }
//   };

//   const commonStudentLinks = (
//     <>
//       <div><Link to="/home">Home</Link></div>
//       <div id="hovers">
//         <Link to="#" onClick={(e) => handleProtectedNavigation(e, '/py')}>
//           Learn <FontAwesomeIcon icon={faChevronDown} />
//         </Link>
//         <div className="dropdown_menu">
//           <div id="ha">
//             <p style={{ color: 'white' }}>Recommended</p>
//             <div><Link to="/py"><p>Python</p></Link></div>
//             <div><Link to="/html"><p>HTML</p></Link></div>
//             <p style={{ color: 'white' }}>Others</p>
//             <div><Link to="/css"><p>CSS</p></Link></div>
//             <div><Link to="/math"><p>Math</p></Link></div>
//             <div><Link to="/courses"><p>All Courses</p></Link></div>
//           </div>
//         </div>
//       </div>
//       <div id="hovers">
//         <Link to="#">Practice <FontAwesomeIcon icon={faChevronDown} /></Link>
//         <div className="dropdown_menu">
//           <div id="ha">
//             <div><Link to="/challenges"><p>Challenges</p></Link></div>
//             <div><Link to="/quiz"><p>Quiz</p></Link></div>
//             <div><Link to="/tdch"><p>#30dayChallenge</p></Link></div>
//           </div>
//         </div>
//       </div>
//       <div id="hovers">
//         <Link to="#">Community <FontAwesomeIcon icon={faChevronDown} /></Link>
//         <div className="dropdown_menu">
//           <div id="ha">
//             <div><Link to="/chat"><p>Friends</p></Link></div>
//             <div><Link to="/gc"><p>World</p></Link></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <header id="main-header">
//       <nav id="navbar">
//         <div className="container">
//           <div id="nav_logo">
//             <div id="logo"></div>
//           </div>
//           <div id="nav_links">
//             {role === 'teacher' ? (
//               <>
//                 <div><Link to="/home">Home</Link></div>
//                 <div><Link to="/create-quiz">Create Quiz</Link></div>
//                 <div><Link to="/mycourse">My Courses</Link></div>
//                 <div id="hovers">
//                   <Link to="/profile">Community <FontAwesomeIcon icon={faChevronDown} /></Link>
//                   <div className="dropdown_menu">
//                     <div id="ha">
//                       <div><Link to="/chat"><p>Students</p></Link></div>
//                       <div><Link to="/gc"><p>World</p></Link></div>
//                     </div>
//                   </div>
//                 </div>
//                 <div id="hovers">
//                   <Link to="/profile">Profile <FontAwesomeIcon icon={faChevronDown} /></Link>
//                   <div className="dropdown_menu">
//                     <div id="ha">
//                       <div><Link to="/myprofile"><p>My Profile</p></Link></div>
//                       <div><Link to="/leaderboard"><p>Students Leaderboard</p></Link></div>
//                       <div><Link to="/settings"><p>Settings</p></Link></div>
//                       <div>
//                         <button
//                           onClick={handleLogout}
//                           style={{
//                             background: 'none',
//                             border: 'none',
//                             padding: 0,
//                             color: 'white',
//                             cursor: 'pointer',
//                             textAlign: 'left',
//                           }}
//                         >
//                           <p className="hab">Logout</p>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : role === 'student' ? (
//               <>
//                 {commonStudentLinks}
//                 <div id="hovers">
//                   <Link to="/profile">Profile <FontAwesomeIcon icon={faChevronDown} /></Link>
//                   <div className="dropdown_menu">
//                     <div id="ha">
//                       <div><Link to="/myprofile"><p>My Profile</p></Link></div>
//                       <div><Link to="/leaderboard"><p>Leaderboard</p></Link></div>
//                       <div><Link to="/mycourses"><p>My Courses</p></Link></div>
//                       <div><Link to="/settings"><p>Settings</p></Link></div>
//                       <div><Link to="/qngen"><p>Generate Dynamic Questions</p></Link></div>
//                       <div>
//                         <button
//                           onClick={handleLogout}
//                           style={{
//                             background: 'none',
//                             border: 'none',
//                             padding: 0,
//                             color: 'white',
//                             cursor: 'pointer',
//                             textAlign: 'left',
//                           }}
//                         >
//                           <p className="hab">Logout</p>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div id="xp_display">
//                   <FontAwesomeIcon icon={faBolt} className="xp-icon" />{xp}
//                 </div>
//               </>
//             ) : (
//               <>
//                 {commonStudentLinks}
//                 <div><Link to="/login">Login</Link></div>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBolt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import './styles/header.css';

const Header = () => {
  const [role, setRole] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || null;
  });
  useEffect(() => {
    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setRole(updatedUser?.role || null);
      setXp(updatedUser?.points || 0);
    };
  
    window.addEventListener("userUpdated", updateUser);
    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);
  
  

  const [xp, setXp] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.points || 0;
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const currentRole = user?.role || null;
      const currentXp = user?.points || 0;
      if (currentRole !== role) setRole(currentRole);
      if (currentXp !== xp) setXp(currentXp);
    }, 500);
  
    return () => clearInterval(interval);
  }, [role, xp]);
  
  const navigate = useNavigate();


  const handleProtectedNavigation = (e, path) => {
    if (!role) {
      e.preventDefault();
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };

  const commonStudentLinks = (
    <>
      <div><Link to="/home">Home</Link></div>
      <div id="hovers">
        <Link to="#" onClick={(e) => handleProtectedNavigation(e, '/py')}>
          Learn <FontAwesomeIcon icon={faChevronDown} />
        </Link>
        <div className="dropdown_menu">
          <div id="ha">
            <p style={{ color: 'white' }}>Recommended</p>
            <div><Link to="/courses/68172e33113183636e39dadc"><p>Math</p></Link></div>
            <div><Link to="/courses/6816cd6ef1d37844690c3456"><p>Up</p></Link></div>
            <p style={{ color: 'white' }}>Others</p>
            <div><Link to="/courses/68112eeb64c620c04982820d"><p>React</p></Link></div>
            <div><Link to="/courses/6816e2971ab7ac1d4c7735cb"><p>Wp</p></Link></div>
            <div><Link to="/courses"><p>All Courses</p></Link></div>
          </div>
        </div>
      </div>
      <div id="hovers">
        <Link to="#">Practice <FontAwesomeIcon icon={faChevronDown} /></Link>
        <div className="dropdown_menu">
          <div id="ha">
            <div><Link to="/challenges"><p>Challenges</p></Link></div>
            <div><Link to="/quiz"><p>Quiz</p></Link></div>
            <div><Link to="/tdch"><p>#30dayChallenge</p></Link></div>
          </div>
        </div>
      </div>
      <div id="hovers">
        <Link to="/chat">Community </Link>
      </div>
    </>
  );

  return (
    <header id="main-header">
      <nav id="navbar">
        <div className="container">
          <div id="nav_logo">
            <div id="logo"></div>
          </div>
          <div id="nav_links">
            {role === 'teacher' ? (
              <>
                <div><Link to="/home">Home</Link></div>
                <div><Link to="/create-quiz">Create Quiz</Link></div>
                <div><Link to="/mycourse">My Courses</Link></div>
                <div id="hovers">
                  <Link to="/chat">Community </Link>
                </div>
                <div id="hovers">
                  <Link to="/profile">Profile <FontAwesomeIcon icon={faChevronDown} /></Link>
                  <div className="dropdown_menu">
                    <div id="ha">
                      <div><Link to="/myprofile"><p>My Profile</p></Link></div>
                      <div><Link to="/leaderboard"><p>Students Leaderboard</p></Link></div>
                      <div>
                        <button
                          onClick={handleLogout}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: 'white',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          <p className="hab">Logout</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : role === 'student' ? (
              <>
                {commonStudentLinks}
                <div id="hovers">
                  <Link to="/profile">Profile <FontAwesomeIcon icon={faChevronDown} /></Link>
                  <div className="dropdown_menu">
                    <div id="ha">
                      <div><Link to="/myprofile"><p>My Profile</p></Link></div>
                      <div><Link to="/leaderboard"><p>Leaderboard</p></Link></div>
                      <div><Link to="/resume"><p>My Courses</p></Link></div>
                      <div><Link to="/qngen"><p>Generate Dynamic Questions</p></Link></div>
                      <div>
                        <button
                          onClick={handleLogout}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: 'white',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          <p className="hab">Logout</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="xp_display">
                  <FontAwesomeIcon icon={faBolt} className="xp-icon" />{xp}
                </div>
              </>
            ) : (
              <>
                {commonStudentLinks}
                <div><Link to="/login">Login</Link></div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;