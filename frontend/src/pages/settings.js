// import React from "react";
// import "../styles/settings.css";

// const Settings = () => {
//   return (
//     <div className="settings-container">
//       <h2 className="settings-title">Settings</h2>
//       <form className="settings-form">
//         <label>
//           Username:
//           <input type="text" defaultValue="Naruto" />
//         </label>
//         <label>
//           Email:
//           <input type="email" defaultValue="naruto@example.com" />
//         </label>
//         <label>
//           Change Password:
//           <input type="password" placeholder="New password" />
//         </label>
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import "../styles/settings.css";

const Settings = () => {
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here (e.g., saving to backend)
    alert("Changes saved!");
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="profile-pic-section">
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
        </div>

        <label>
          Username:
          <input type="text" defaultValue={role === "teacher" ? "Kakashi" : "Naruto"} />
        </label>

        <label>
          Email:
          <input type="email" defaultValue={role === "teacher" ? "kakashi@example.com" : "naruto@example.com"} />
        </label>

        <label>
          Change Password:
          <input type="password" placeholder="New password" />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
