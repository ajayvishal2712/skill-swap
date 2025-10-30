// import { auth } from "../../firebase/config";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";


// function Dashboard() {

//     const navigate = useNavigate();
//     const user = auth.currentUser;

//     const handleLogOut = async () =>{
//         try{
//             await signOut(auth);
//             navigate("/login");
//         }catch(error){
//             console.error(error.message);
//         }
//     };
//     console.log(user)
//   return (
//   <div className="dashboard">
//     <h2>Welcome, user</h2>
//     <button onClick={handleLogOut}>Logout</button>
//   </div>
// );

// }

// export default Dashboard;


import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // to store user details
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      console.log(userSnap.data())

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.log("No user data found in Firestore");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="dashboard">
      {userData ? (
        <>
          <h2>Welcome, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}

export default Dashboard;
