import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Body from './Body';
import Login from './login';
import Signup from './signup';
import ChatApp from './pages/ChatApp.js';
// Placeholder components
import CourseDetail from './pages/CourseDetail.js';
import About from './pages/About';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Community from './pages/Community';
import Help from './pages/Help';
import Pricing from './pages/Pricing.js';
import Challenges from './pages/Challenges';
import Quiz from './pages/Quiz';
import Tdch from './pages/Tdch.js';
import Courses from './pages/Courses';
import HTML from './pages/Html.js'; 
import Python from './pages/Python.js';
import Math from './pages/math.js';
import Css from './pages/Css.js';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz.js';
import StudentReports from './pages/StudentReports';
import Resources from './pages/Resources';
import Terms from './pages/Terms';
import Policy from './pages/Policy';
import Logout from './pages/Logout';
import Chat from './pages/chat.js';
import GCChat from './pages/gchat.js';
import MyProfile from './pages/myprofile.js';
import Leaderboard from './pages/leaderboard.js';
import MyCourses from './pages/mycourses.js';
import Settings from './pages/settings.js';
import MyCourse from './pages/mycourse.js';
import QuestionGenerator from './pages/qngen.js';
import ResumeCourse from './pages/resumecourse.js';
import Ctdch from './pages/ctdch.js';
import QuizTest from './pages/quiztest.js';
import Social from './chats/Social.js'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/home" element={<Body />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Student Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/community" element={<Community />} />
      <Route path="/help" element={<Help />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/tdch" element={<Tdch />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />

      <Route path="/html" element={<HTML />} />
      <Route path="/math" element={<Math/>} />
      <Route path="/py" element={<Python />} />
      <Route path="/css" element={<Css />} />
      <Route path="/chat" element={<Social/>}/>
      <Route path="/gc" element={<GCChat/>}/>
      <Route path="/myprofile" element={<MyProfile/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/mycourses" element={<MyCourses/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/qngen" element={<QuestionGenerator/>}/>
      <Route path="/resume" element={<ResumeCourse/>}/>
      <Route path="/quiztest" element={<QuizTest/>}/>
      {/* Teacher Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/report" element={<StudentReports />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/mycourse" element={<MyCourse/>} />
      <Route path="/ctdch" element={<Ctdch/>}/>
      {/* Legal */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />
    </Routes>
  );
};

export default AppRoutes;
