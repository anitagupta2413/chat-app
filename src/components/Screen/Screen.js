import React, { useState, useEffect } from "react";
import Header from "../ViewComponents/Header";
import Users from "../ViewComponents/Users";
import ChatRoom from "../ViewComponents/ChatRoom";
import Login from "../authentication/login";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Home from "../Home/Home";

const Screen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});

  //check user login
  useEffect(() => {
    const userInfo = () => {
      const uuid = Cookies.get("uuid");
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      if (!uuid) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setLoggedInUser(user);
      }
    };

    userInfo();
  }, []);

  //handling logout
  const logOutUser = () => {
    Cookies.remove("uuid");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    try {
      const data = {
        userId: loggedInUser._id,
      };
      await axios
        .delete("http://localhost:8000/api/deleteAccount", {
          data: {
            userId: loggedInUser._id,
          },
        })
        .then((response) => {
          if (response.data.success) {
            Cookies.remove("uuid");
            localStorage.removeItem("user");
            navigation("/signup");
          }
        });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      } else {
        alert("internal server error");
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Home
          loggedInUserName={loggedInUser.name}
          loggedInUserID={loggedInUser._id}
          handleLogout={logOutUser}
          handleDeleteAccount={handleDeleteAccount}
        />
      ) : (
        <Login />
      )}
    </>
  );
};

export default Screen;
