import React, { useState } from 'react';
import './styles/login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');  // Added role state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password || !role) {
      setError('Please enter both username, password, and select a role.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
      });
  
      const data = await response.json();
  
      if (response.ok) {  // Check if the response status is 200-299
        // Store the entire user object in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        
        // Redirect to /home after successful login
        navigate('/home');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error('Login error:', err);
    }
  };
  return (
    <div className="sample">
      <div className="section">
        <div className="containers">
          <div className="box boxes">
            <h3>Login</h3>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div id="und">
                <label htmlFor="username">Username</label><br />
                <input
                  type="text"
                  name="un"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div id="pwdd">
                <label htmlFor="password">Password</label><br />
                <input
                  type="password"
                  name="pwd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div id="role">
                <label htmlFor="role">Role</label><br />
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}  // Set role on change
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <br />
              <div id="sd">
                <input type="submit" value="Submit" />
              </div>
              <br />
              <div id="rd">
                <Link to="/signup">
                  <input
                    type="button"
                    value="New to Quizzify? Create account"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
