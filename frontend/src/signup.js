import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    role: 'student',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { role, username, password, confirmPassword, email, fullName } = formData;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, username, password, email, fullName })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user.');
      }
  
      const result = await response.json();
      console.log('User registered:', result);
  
      // Save entire user object to localStorage
      localStorage.setItem('user', JSON.stringify({
        role,
        username,
        email,
        fullName
      }));
  
      navigate('/home');
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };
  

  return (
    <section id="section1" className="section">
      <div className="containers" id="signup">
        <form onSubmit={handleSubmit}>
          <div id="reg" className='s'>
            <label htmlFor="role">Register as</label><br />
            <select name="role" id="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div><br />

          <div id="fullname" className='s'>
            <label htmlFor="fullName">Full Name</label><br />
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div><br />

          <div id="und" className='s'>
            <label htmlFor="username">Username</label><br />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div><br />

          <div id="pwdd" className='s'>
            <label htmlFor="password">Password</label><br />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div><br />

          <div id="cpwdd" className='s'>
            <label htmlFor="confirmPassword">Confirm Password</label><br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div><br />

          <div id="email" className='s'>
            <label htmlFor="email">Email ID</label><br />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div><br />

          <div id="sd" className='s' style={{ marginTop: 30 }}>
            <input type="submit" value="Register" />
          </div><br />
        </form>
      </div>
    </section>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './styles/signup.css';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     role: 'student',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     fullName: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { role, username, password, confirmPassword, email, fullName } = formData;

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5001/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ role, username, password, email, fullName })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to register user.');
//       }

//       // Store the entire user object in localStorage (same as login)
//       localStorage.setItem('user', JSON.stringify(data));

//       // Redirect to home
//       navigate('/home');
//     } catch (error) {
//       alert(`Registration failed: ${error.message}`);
//     }
//   };

//   return (
//     <section id="section1" className="section">
//       <div className="containers" id="signup">
//         <form onSubmit={handleSubmit}>
//           <div id="reg" className='s'>
//             <label htmlFor="role">Register as</label><br />
//             <select name="role" id="role" value={formData.role} onChange={handleChange}>
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//             </select>
//           </div><br />

//           <div id="fullname" className='s'>
//             <label htmlFor="fullName">Full Name</label><br />
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div><br />

//           <div id="und" className='s'>
//             <label htmlFor="username">Username</label><br />
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div><br />

//           <div id="pwdd" className='s'>
//             <label htmlFor="password">Password</label><br />
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div><br />

//           <div id="cpwdd" className='s'>
//             <label htmlFor="confirmPassword">Confirm Password</label><br />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div><br />

//           <div id="email" className='s'>
//             <label htmlFor="email">Email ID</label><br />
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div><br />

//           <div id="sd" className='s' style={{ marginTop: 30 }}>
//             <input type="submit" value="Register" />
//           </div><br />
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Signup;
