import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css"; // Import the CSS module

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send POST request to backend for signup
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/auth/signup`,
        {
          username,
          email,
          password,
        }
      );

      // If successful, store token and redirect to home page
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response.data.error || "Something went wrong");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.signupTitle}>Sign Up</h2>
      {error && <p className={styles.signupError}>{error}</p>}
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          className={styles.signupInput}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className={styles.signupInput}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className={styles.signupInput}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          className={styles.signupInput}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.signupButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
