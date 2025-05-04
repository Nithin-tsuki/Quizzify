// import React from 'react';
// import questionVideo from './imagesVideos/question.mp4';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from 'react-router-dom';
// import Left from "./leftcnt.js";
// import Right from "./rightcnt.js";
// import { faUserPlus, faGamepad, faBookOpen } from "@fortawesome/free-solid-svg-icons";
// import "./styles/body.css";
// const firstSub={course:"COURSE",sub:"Python",details:"Learn programming fundamentals such as variables, control flow, and loops with the world's most popular and versatile coding language — Python!"}
// const secondSub={course:"COURSE",sub:"Html",details:"Create your first website with HTML, the building blocks of the web and dive into the world of web development."}
// const thirdSub={course:"COURSE",sub:"CSS",details:"Learn to use CSS selectors and properties to stylize your HTML pages with colors, fonts, sizing, layouts, and more!"}
// const fourthSub={course:"COURSE",sub:"Math",details:"Learn to solve problems, understand concepts, and sharpen your logic with interactive Math challenges!"}


// const firstAbout={img:"https://www.avanse.com/blogs/images/next-top-30.jpg",topic:"Level up your learning",ctnt:"Gain XP and collect badges as you complete bite-sized lessons in Python, HTML, JavaScript, and more. Our beginner-friendly curriculum makes learning to code as motivating as completing your next quest."}
// const secondAbout={img:"https://www.avanse.com/blogs/images/next-top-30.jpg",topic:"Practice your coding chops",ctnt:"Take your skills further with code challenges and project tutorials designed to help you apply what you learned to real-world problems and examples."}
// const thirdAbout={img:"https://www.avanse.com/blogs/images/next-top-30.jpg",topic:"Smart Chatbot for quick explanations",ctnt:"Stuck on a tricky question or need a quick concept refresh? Our AI-powered chatbot has your back! Just ask, and get instant, beginner-friendly answers — no need to leave your quiz or dig through search results. It’s like having a personal tutor available 24/7, right inside Quizzify."}
// const fourthAbout={img:"https://www.avanse.com/blogs/images/next-top-30.jpg",topic:"Make friends along the way",ctnt:"Building is so much better together than alone. Join our community forum and Discord to give and receive help, collaborate on projects, and connect over shared passions."}

// const Body = () => {
//   return (
//     <section className="section" id="mc">
//       <section id="hero">
//         <div className="content">
//           <h1>Boost Your Learning with Quizzify</h1>
//           <p>Challenge yourself with engaging quizzes & master new skills.</p>
//           <Link to="/signup" className="btn1">Get Started</Link>
//         </div>
//       </section>

//       <section id="howwork">
//         <h2>How It Works</h2>
//         <div className="steps">
//           <div className="step">
//             <FontAwesomeIcon icon={faUserPlus} />
//             <h3>Sign Up</h3>
//             <p>Create your free account & start learning.</p>
//           </div>
//           <div className="step">
//             <FontAwesomeIcon icon={faBookOpen} />
//             <h3>Pick a Subject</h3>
//             <p>Choose from various subjects & topics.</p>
//           </div>
//           <div className="step">
//             <FontAwesomeIcon icon={faGamepad} />
//             <h3>Play & Learn</h3>
//             <p>Test your knowledge with quizzes & challenges.</p>
//           </div>
//         </div>
//       </section>

//       <div id="subjects">
//         <h1>Explore Our Subjects</h1>
//         <div className="subs">
//           <SubBox {...firstSub} />
//           <SubBox {...secondSub} />
//           <SubBox {...thirdSub} />
//           <SubBox {...fourthSub} />
//         </div>
//         <div><button className="btn1">Explore All Subjects</button></div>
//       </div>

//       <Left {...firstAbout} />
//       <Right {...secondAbout} />
//       <Left {...thirdAbout} />
//       <Right {...fourthAbout} />

//       <section id="cta">
//         <video autoPlay loop muted playsInline id="bgVideo">
//           <source src={questionVideo} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="urke">
//           <h2>Ready to Get Started?</h2>
//           <Link to="/signup" className="btn4">Join Now for Free</Link>
//         </div>
//       </section>
//     </section>
//   );
// };

// const SubBox = (props) => {
//   return (
//     <div className="sub">
//       <div id="up"></div>
//       <div id="down">
//         <h4>{props.course}</h4>
//         <h3>{props.sub}</h3>
//         <p>{props.details}</p>
//       </div>
//     </div>
//   );
// };

// export default Body;
import React, { useEffect, useState } from 'react';
import questionVideo from './imagesVideos/question.mp4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Left from "./leftcnt.js";
import Right from "./rightcnt.js";
import { faUserPlus, faGamepad, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import "./styles/body.css";

const Body = () => {
  const [role, setRole] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || "default";
  });
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role) {
      setRole(user.role);
    }
  }, []);
  
  if (role === "teacher") {
    return (
      <section className="section" id="teacher-view">
        <section className="teacher-hero">
          <h1>Welcome, Teacher!</h1>
          <p>Empower minds. Inspire learning 📚</p>
        </section>

        <section className="teacher-tools">
          <h2>Your Teaching Tools</h2>
          <div className="teacher-cards">
            <div className="card">
              <h3>Create Quizzes</h3>
              <p>Design custom quizzes for your students and track their performance.</p>
              <Link to="/create-quiz" className="btn2">Create Now</Link>
            </div>
            <div className="card">
              <h3>View Reports</h3>
              <p>Get detailed insights on student progress, strengths, and gaps.</p>
              <Link to="/report" className="btn2">View Reports</Link>
            </div>
            <div className="card">
              <h3>Create a Thirty-Day Challenge</h3>
              <p>Design and launch a thirty-day challenge to engage and motivate your students consistently.</p>
              <Link to="/ctdch" className="btn2">Start Creating</Link>
            </div>
          </div>
        </section>
      </section>
    );
  }

  if (role === "student") {
    return (
      <section className="section" id="student-view">
        <section className="student-hero">
          <h1>Welcome, Student!</h1>
          <p>Keep learning, keep growing 🌱</p>
          <Link to="/courses" className="btn1">Explore Subjects</Link>
        </section>

        <section className="student-highlights">
          <h2>Your Learning Journey</h2>
          <div className="student-cards">
            <div className="card">
              <h3>Continue Learning</h3>
              <p>Pick up where you left off and finish your pending quizzes and lessons.</p>
              <Link to="/resume" className="btn2">Resume Course</Link>
            </div>
            <div className="card">
              <h3>Leaderboard</h3>
              <p>See how you rank among your peers in quiz scores and XP!</p>
              <Link to="/leaderboard" className="btn2">View Leaderboard</Link>
            </div>
            <div className="card">
              <h3>Chat With friends</h3>
              <p>Interact with friends, compete with them, and improve your skills.</p>
              <Link to="/chat" className="btn2">Chat Now</Link>
            </div>
          </div>
        </section>
      </section>
    );
  }

  // Default (guest) view
  return (
    <section className="section" id="mc">
      <section id="hero">
        <div className="content">
          <h1>Boost Your Learning with Quizzify</h1>
          <p>Challenge yourself with engaging quizzes & master new skills.</p>
          <Link to="/signup" className="btn1">Get Started</Link>
        </div>
      </section>

      <section id="howwork">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <FontAwesomeIcon icon={faUserPlus} />
            <h3>Sign Up</h3>
            <p>Create your free account & start learning.</p>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faBookOpen} />
            <h3>Pick a Subject</h3>
            <p>Choose from various subjects & topics.</p>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faGamepad} />
            <h3>Play & Learn</h3>
            <p>Test your knowledge with quizzes & challenges.</p>
          </div>
        </div>
      </section>

      <div id="subjects">
        <h1>Explore Our Subjects</h1>
        <div className="subs">
          <SubBox {...firstSub} />
          <SubBox {...secondSub} />
          <SubBox {...thirdSub} />
          <SubBox {...fourthSub} />
        </div>
        <Link to="/courses" className="btn1">Explore All Subjects</Link>
      </div>

      <Left {...firstAbout} />
      <Right {...secondAbout} />
      <Left {...thirdAbout} />
      <Right {...fourthAbout} />

      <section id="cta">
        <video autoPlay loop muted playsInline id="bgVideo">
          <source src={questionVideo} type="video/mp4" />
        </video>
        <div className="urke">
          <h2>Ready to Get Started?</h2>
          <Link to="/signup" className="btn4">Join Now for Free</Link>
        </div>
      </section>
    </section>
  );
};

// Reuseable Subject Box Component
const SubBox = ({ course, sub, details }) => (
  <div className="sub">
    <div id="up"></div>
    <div id="down">
      <h4>{course}</h4>
      <h3>{sub}</h3>
      <p>{details}</p>
    </div>
  </div>
);

// Static Subject & About Data
const firstSub = {
  course: "COURSE",
  sub: "Python",
  details: "Learn programming fundamentals such as variables, control flow, and loops with Python!"
};
const secondSub = {
  course: "COURSE",
  sub: "Html",
  details: "Create your first website with HTML and dive into web development."
};
const thirdSub = {
  course: "COURSE",
  sub: "CSS",
  details: "Use CSS to stylize your HTML pages with colors, fonts, layouts, and more!"
};
const fourthSub = {
  course: "COURSE",
  sub: "Math",
  details: "Solve problems and sharpen your logic with interactive Math challenges!"
};

const firstAbout = {
  img: "https://www.avanse.com/blogs/images/next-top-30.jpg",
  topic: "Level up your learning",
  ctnt: "Gain XP and badges as you complete bite-sized lessons."
};
const secondAbout = {
  img: "https://www.avanse.com/blogs/images/next-top-30.jpg",
  topic: "Practice your coding chops",
  ctnt: "Take your skills further with code challenges and projects."
};
const thirdAbout = {
  img: "https://www.avanse.com/blogs/images/next-top-30.jpg",
  topic: "Smart Chatbot for quick explanations",
  ctnt: "Get instant, beginner-friendly answers from our AI tutor!"
};
const fourthAbout = {
  img: "https://www.avanse.com/blogs/images/next-top-30.jpg",
  topic: "Make friends along the way",
  ctnt: "Join our community forums to collaborate and connect."
};

export default Body;
