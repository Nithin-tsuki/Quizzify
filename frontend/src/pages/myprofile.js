import React from 'react';
import '../styles/myprofile.css';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <div className="no-user">No user data found.</div>;

  const avatarUrl = `https://i.pravatar.cc/150?u=${user._id}+6`;

  return (
    <div className="profile-card">
      <img src={avatarUrl} alt="Profile" className="profile-pic" />
      <h2 className="name">{user.fullName}</h2>
      <p className="username">@{user.username}</p>
      <p className="email">{user.email}</p>
      <span className="role">{user.role}</span>

      {user.role === 'teacher' ? (
        <div className="details">
          <p><strong>Teacher ID:</strong> {user.userid}</p>
        </div>
      ) : (
        <div className="details">
          <p><strong>Student ID:</strong> {user.userid}</p>
          <p><strong>Points:</strong> {user.points}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
