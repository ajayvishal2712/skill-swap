import React from "react";


// function ProtectedRoute({ children }) {
//   const user = auth.currentUser;

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
// src/components/ProtectedRoute.jsx
// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

function ProtectedRoute({ children }) {
  // State to manage user and loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set logged-in user
      setLoading(false); // Stop loading once we get response
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Show loading state until Firebase confirms user status
  if (loading) {
    return <p>Loading...</p>;
  }

  // If user not logged in → redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → show the protected page (children)
  return children;
}

export default ProtectedRoute;


