// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../App.css"; // optional styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user.email);
      navigate("/dashboard"); // go to dashboard after login
    } catch (error) {
      console.error(error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Skill-Swap</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <button
          className="link"
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
