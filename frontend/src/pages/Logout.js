// src/pages/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem("role");
    localStorage.removeItem("token"); // if you're using one
    localStorage.clear(); // optional: clears everything

    // Redirect to login or home page
    navigate("/login");
  }, [navigate]);

  return null; // or a loading spinner
};

export default Logout;
