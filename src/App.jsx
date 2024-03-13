import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./Firebase/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// function App() {
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       console.log(user);

//       if (user) {
//         setUser(user);
//       }
//       setLoading(false)
//     });
//   }, []);

// function signUp() {
//   createUserWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
//     .then((user) => console.log(user))
//     .catch((error) => console.log(error));
// }

//   function logIn() {
//     signInWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
//       .then((response) => setUser(response.user))
//       .catch((error) => console.log(error));
//   }

//   function logOut() {
//     signOut(auth);
//     setUser({});
//   }

//   return (
//     <div>
//       <button onClick={() => signUp()}> Sign up </button>
//       <button onClick={() => logIn()}> Sign up </button>
//       <button onClick={() => logOut()}> Sign Out</button>
//       {loading ? "Loading..." : user.email }
//     </div>
//   );
// }

const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState({});

  function signUp() {
    createUserWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  }

  function logIn() {
    signInWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
      .then((response) => setUser(response.user))
      .catch((error) => console.log(error));
    setLoggedin(true);
  }

  function logOut() {
    signOut(auth)
    setLoggedin(false)
  }

  return (
    <nav>
      <div className="all">
        {loggedin === false ? (
          <div>
            <button onClick={() => signUp()}> Sign up </button>
            <button onClick={() => logIn()}> Log in </button>
          </div>
        ) : (
          <div>
            <button onClick={() => logOut()}> Log Out</button>
            <span> {user.email?.charAt(0)}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default App;
