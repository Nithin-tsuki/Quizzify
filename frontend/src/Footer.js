// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import "./styles/footer.css";
// import ChatBot from './pages/chatbot';

// const Footer = () => {
//   const [role, setRole] = useState(localStorage.getItem("role") || "student");
//   const [botInjected, setBotInjected] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updatedRole = localStorage.getItem("role");
//       if (updatedRole && updatedRole !== role) {
//         setRole(updatedRole);
//         setBotInjected(false); // Reset bot injection on role change
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [role]);

//   useEffect(() => {
//     if (role === "student" && !botInjected) {
//       const botScript = document.createElement("script");
//       botScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
//       botScript.async = true;
//       botScript.id = "botpress-script";
//       document.body.appendChild(botScript);

//       const configScript = document.createElement("script");
//       configScript.src = "https://files.bpcontent.cloud/2025/02/20/13/20250220133411-61FE6YLJ.js";
//       configScript.async = true;
//       configScript.id = "botpress-config";
//       document.body.appendChild(configScript);

//       setBotInjected(true);

//       return () => {
//         const bot = document.getElementById("botpress-script");
//         const config = document.getElementById("botpress-config");
//         if (bot) document.body.removeChild(bot);
//         if (config) document.body.removeChild(config);
//       };
//     }
//   }, [role, botInjected]);

//   if (role === "student") {
//     return (
//       <footer id="f">
//         {/* <ChatBot/> */}
//         <div id="fc">
//           <div id="comp">
//             <div><Link to="/about">About</Link></div>
//             <div><Link to="/blog">Blog</Link></div>
//             <div><Link to="/shop">Shop</Link></div>
//             <div><Link to="/community">Community</Link></div>
//             <div><Link to="/help">Help Center</Link></div>
//             <div><Link to="/pricing">Pricing</Link></div>
//           </div>
//           <div id="practice">
//             <div><Link to="/challenges">Challenges</Link></div>
//             <div><Link to="/quiz">Quiz</Link></div>
//             <div><Link to="/tdch">#30dayChallenge</Link></div>
//           </div>
//           <div id="learn">
//             <div><Link to="/courses">All Courses</Link></div>
//             <div><Link to="/html">HTML</Link></div>
//             <div><Link to="/py">Python</Link></div>
//             <div><Link to="/css">CSS</Link></div>
//           </div>
//         </div>
//         <div style={{ marginTop: "10px", paddingLeft: "13%" }}>
//           &copy;2025 Quizzify, Inc. &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/policy">Privacy Policy</Link>
//         </div>
//       </footer>
//     );
//   }

//   if (role === "teacher") {
//     return (
//       <footer id="f">
//         <div style={{ marginTop: "10px", paddingLeft: "13%" }}>
//           &copy;2025 Quizzify, Inc. &nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//           <Link to="/policy">Privacy Policy</Link>
//         </div>
//       </footer>
//     );
//   }

//   return (
//     <footer id="f">
//       <div style={{ marginTop: "10px", textAlign: 'center' }}>
//         &copy;2025 Quizzify, Inc. &nbsp;&nbsp;&nbsp;&nbsp;
//         <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//         <Link to="/policy">Privacy Policy</Link>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles/footer.css";
import ChatBot from './pages/chatbot.js';

const Footer = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || "student");

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRole = localStorage.getItem("role");
      if (updatedRole && updatedRole !== role) {
        setRole(updatedRole);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [role]);

  const renderFooterLinks = () => (
    <>
      <div id="fc">
        <div id="comp">
          <div><Link to="/about">About</Link></div>
          <div><Link to="/blog">Blog</Link></div>
          <div><Link to="/shop">Shop</Link></div>
          <div><Link to="/community">Community</Link></div>
          <div><Link to="/help">Help Center</Link></div>
          <div><Link to="/pricing">Pricing</Link></div>
        </div>
        <div id="practice">
          <div><Link to="/challenges">Challenges</Link></div>
          <div><Link to="/quiz">Quiz</Link></div>
          <div><Link to="/tdch">#30dayChallenge</Link></div>
        </div>
        <div id="learn">
          <div><Link to="/courses">All Courses</Link></div>
          <div><Link to="/html">HTML</Link></div>
          <div><Link to="/py">Python</Link></div>
          <div><Link to="/css">CSS</Link></div>
        </div>
      </div>
      <div style={{ marginTop: "10px", paddingLeft: "13%" }}>
        &copy;2025 Quizzify, Inc. &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/policy">Privacy Policy</Link>
      </div>
    </>
  );

  return (
    <footer id="f">
      {role === "student" && <ChatBot />}
      {role === "student" && renderFooterLinks()}
      {role === "teacher" && (
        <div style={{ marginTop: "10px", paddingLeft: "13%" }}>
          &copy;2025 Quizzify, Inc. &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/policy">Privacy Policy</Link>
        </div>
      )}
      {role !== "student" && role !== "teacher" && (
        <div style={{ marginTop: "10px", textAlign: 'center' }}>
          &copy;2025 Quizzify, Inc. &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/terms">Terms</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/policy">Privacy Policy</Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
