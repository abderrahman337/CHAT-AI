import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Keep useHistory for React Router v5
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";


const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    } catch (error) {
      console.error("Error fetching user avatar:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    const fetchUser = async () => {
      try {
        await axios.get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": process.env.PROJECT_ID_FETCH,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        });
        console.log("ChatEngine User Response:", response.data);
        setLoading(false);
      } catch {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        if (user.photoURL) {
          const avatar = await getFile(user.photoURL);
          if (avatar) {
            formdata.append("avatar", avatar, avatar.name);
          }
        }

        axios
          .post("https://api.chatengine.io/users/", formdata, {
            headers: { "private-key": process.env.PRIVATE_KEY_CHAT },
          })
          .then(() => setLoading(false))
          .catch((error) => {
            console.error("ChatEngine user creation error:", error);
            setLoading(false);
          });
      }
    };

    fetchUser();
  }, [user, history]);

  if (!user || loading) {
    console.log("Loading state:", loading);
    return <p>Loading...</p>;
}

console.log("Rendering ChatEngine for:", user.email);
return (
    <div className="chats-page">
        <div className="nav-bar">
            <div className="logo-tab">Unichats</div>
            <div className="logout-tab" onClick={handleLogout}>
                Logout
            </div>
        </div>
        <ChatEngine
            height="calc(100vh - 66px)"
            projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
            userName={user.email}
            userSecret={user.uid}
        />
    </div>
);
};

export default Chats;
