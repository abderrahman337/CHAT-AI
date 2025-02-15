import React from "react";
import { auth } from "../firebase"; // Ensure this points to your firebase.js file
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Facebook Sign-In Successful");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
    }
  };

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat</h2>

        <div className="login-button google" onClick={signInWithGoogle}>
          <GoogleOutlined /> Sign in with Google
        </div>
        <br />
        <br />
        <div className="login-button facebook" onClick={signInWithFacebook}>
          <FacebookOutlined /> Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
