// src/components/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
//import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../App.css"; // optional styling
import { auth, db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // initialize navigate

  const handleSignUp = async (e) => {
    e.preventDefault();
     if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    alert("Password must contain at least one uppercase letter");
    return;
  }

  if (!/[0-9]/.test(password)) {
    alert("Password must contain at least one number");
    return;
  }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user.email);

      // await setDoc(doc(db, "users", user.uid), {
      //   name,
      //   email,
      //   createdAt: new Date(),
      // });
         await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      });


      // alert("Account created successfully!");
      navigate("/dashboard"); // go to dashboard after signup
    } catch (error) {
      console.error(error.message);
      alert("Sign Up failed: " + error.message);
    }
  };

  return (
    <div className = "d-flex justify-center align-center">
    <div className="auth-container">
      <h1>Skill-Swap</h1> 
      <h2>Sign Up</h2> 
      <form onSubmit={handleSignUp}>
           <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
         <button className="link"
            onClick={() => navigate("/login")}
            style={{
            backgroundColor: "#4CAF50",   // green background
            color: "white",               // white text
            border: "none",               // remove border
            borderRadius: "5px",          // rounded corners
            padding: "8px 16px",          // space inside button
            cursor: "pointer",            // pointer on hover
  }}
>
          Sign In
        </button>
      </p>
    </div>
    </div>
  );
}

export default SignUp;
