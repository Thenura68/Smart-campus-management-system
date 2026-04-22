import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    if (role) {
      localStorage.setItem("role", role);
    }

    console.log("Token stored successfully");
    console.log("Role stored:", role);

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "TECHNICIAN") {
      navigate("/technician/dashboard");
    } else {
      navigate("/user/home");
    }
  }, [navigate, searchParams]);

  return <div style={{ padding: "24px" }}>Signing you in...</div>;
};

export default OAuthSuccess;