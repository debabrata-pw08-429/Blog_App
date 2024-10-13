import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/login`,
        { email, password }
      );
      sessionStorage.setItem("authToken", res.data.token);
      navigate("/editor");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles.loginInput}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.loginInput}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
