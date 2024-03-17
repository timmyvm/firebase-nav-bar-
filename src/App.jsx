import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./Firebase/firebase.js";
import { db } from "./Firebase/firebase.js";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  function createNewPost() {
    const post = {
      caption: "build an amazing project ",
      text: "with asap frontend",
      uid: user.uid,
    };

    addDoc(collection(db, "posts"), post);
  }

  async function fetchAllposts() {
    const { docs } = await getDocs(collection(dc, "posts"));
    const posts = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async function fetchAllPostsByUser() {
    const postsByUserRef = query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );

    const { docs } = await getDocs(postsByUserRef);
    const posts = docs.map((doc) => doc.data());
  }

  async function fetchPostById(postId) {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();

    return post;
  }

  async function updatePost() {
    const postId = "y48H6FYmAeMJ6zE3NepT";
    const postRef = doc(db, "posts", postId);
    const currentPost = await fetchPostById(postId);

    console.log(currentPost);

    const newPost = {
      ...currentPost,
      caption: "land a 100K job",
    };

    console.log(newPost);

    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const postId = "y48H6FYmAeMJ6zE3NepT";
    const postRef = doc(db, "posts", postId);

    deleteDoc(postRef);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }, []);

  function signUp() {
    createUserWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  }

  function logIn() {
    signInWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
      .then((response) => setUser(response.user))
      .catch((error) => console.log(error));
  }

  function logOut() {
    signOut(auth);
    setUser({});
  }

  return (
    <div>
      <button onClick={() => signUp()}> Sign up </button>
      <button onClick={() => logIn()}> Sign up </button>
      <button onClick={() => logOut()}> Sign Out</button>
      {loading ? "Loading..." : user.email}
      <button onClick={() => createNewPost()}> Create New post</button>
      <button onClick={() => fetchAllposts()}> fetch all posts</button>
      <button onClick={() => fetchAllPostsByUser()}>
        fetch posts by user id
      </button>
      <button onClick={() => fetchPostById("y48H6FYmAeMJ6zE3NepT")}>
        Fetch Post by Id
      </button>
      <button onClick={() => updatePost()}> Update Post </button>
      <button onClick={() => deletePost()}> Delete Post </button>
    </div>
  );
}

// const App = () => {
//   const [loggedin, setLoggedin] = useState(false);
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   function signUp() {
//     createUserWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
//       .then((user) => console.log(user))
//       .catch((error) => console.log(error));
//   }

//   function logIn() {
//     signInWithEmailAndPassword(auth, "tim.mota21@gmail.com", "password")
//       .then((response) => setUser(response.user))
//       .catch((error) => console.log(error));
//     setLoggedin(true);
//   }

//   function logOut() {
//     signOut(auth)
//     setLoggedin(false)
//   }

//   useEffect(() => {
//          onAuthStateChanged(auth, (loggedin) => {

//            if (loggedin) {
//              setLoggedin(true);
//            } else{
//             setLoggedin(false)
//            }
//            setLoading(false)

//          });
//        }, []);

//   return (
//     <nav>
//       <div className="all">
//         {loading ? "loading" : loggedin === false ? (
//           <div>
//             <button onClick={() => signUp()}> Sign up </button>
//             <button onClick={() => logIn()}> Log in </button>
//           </div>
//         ) : (
//           <div>
//             <button onClick={() => logOut()}> Log Out</button>
//             <span> {user.email?.charAt(0)}</span>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

export default App;
