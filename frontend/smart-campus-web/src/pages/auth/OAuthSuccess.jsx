import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserRole } from "../../utils/jwtUtils";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored successfully");
      
      const role = getUserRole();
      if (role === "ADMIN") {
        navigate("/admin/tickets");
      } else if (role === "TECHNICIAN") {
        navigate("/technician/tickets");
      } else {
        navigate("/user/bookings");
      }
    } else {
      navigate("/user/home");
    }
  }, [navigate, searchParams]);

  return <div style={{ padding: "24px" }}>Signing you in...</div>;
};

export default OAuthSuccess;