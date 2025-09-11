import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../deployment/deploy";
import type { LoginModel } from "../model/LoginModel";



// Service: login user
export const loginUser = async (
  credentials: LoginModel
): Promise<{ token: string; name: string; email: string }> => {
  const response = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

// React component
export const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      throw new Error("Invalid Login Name");
    } else if (!email) {
      throw new Error("Invalid Email");
    } else if (!password) {
      throw new Error("Invalid Password");
    }

    try {
      const credentials: LoginModel = { name, email, password };
      const login = await loginUser(credentials);

      // Save to localStorage
      localStorage.setItem("token", login.token);
      localStorage.setItem("email", login.email);
      localStorage.setItem("name", login.name);

      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Login Failed. Please check your credentials.");
    }
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    handleLogin,
  };
};

export default Login;
