import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./App.css";
import { app } from "./firebase/firebase.init";

import "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const handelGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  const handelGoogleAuthSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
        console.log(error);
      });
  };
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handelGoogleAuthSingOut}>Sing Out</button>
      ) : (
        <button onClick={handelGoogleAuth}>continue with google</button>
      )}
      <div>
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
