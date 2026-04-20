import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored successfully");
      navigate("/user/bookings");
    } else {
      console.error("No token found in redirection");
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#01071a',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Authenticating...</h2>
        <p>Please wait while we complete your login.</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
