import {
  FacebookAuthProvider,
  GithubAuthProvider,
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
  const fbProvider = new FacebookAuthProvider();
  const gitProvider = new GithubAuthProvider();
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

  const handelFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelGithub = () => {
    signInWithPopup(auth, gitProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
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
      <button onClick={handelFacebook}>facebook</button>
      <button onClick={handelGithub}>Github</button>
    </div>
  );
}

export default App;
