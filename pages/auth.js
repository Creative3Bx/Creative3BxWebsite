import React, { useContext, useState } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  var filteredUsers = "";
  const checkUserExists = async () => {
    try {
      const response = await axios.get("https://api.chatengine.io/users/", {
        headers: {
          "Private-Key": process.env.NEXT_PUBLIC_CE_PRIVATE_KEY,
        },
      });

      if (response.status === 200) {
        const usersData = response.data;
        filteredUsers = usersData.filter(
          (user) => user.email === "ramiAlzuhairi89@gmail.com"
        );
        
        if (filteredUsers.length > 0) {
          // User exists, allow login to chats
          router.push("/chats");
        } else {
          // User doesn't exist
          setErrorMessage("User doesn't exist or incorrect login credentials");
        }
      } else {
        // Error retrieving users
        console.log("Error retrieving users:", response.data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) return;

    if (username === "Rami Tech Support") {
      axios
        .put(
          "https://api.chatengine.io/users/",
          { username, secret },
          { headers: { "Private-Key": process.env.NEXT_PUBLIC_CE_PRIVATE_KEY } }
        )
        .then((r) => {
          checkUserExists();
        });
    } else {
      setErrorMessage("User doesn't exist or incorrect login credentials");
    }
  };

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-title">Support Login</div>

          <div className="input-container">
            <input
              placeholder="username"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <br />
          <div className="error-message">{errorMessage}</div>
          <br />
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
