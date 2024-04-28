import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "../authentication/login";
import Home from "./Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../socket/Socket";

const View = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});

  const handleEmailChange = (e) => {
    setInputValues((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setInputValues((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  //check user login
  useEffect(() => {
    const userInfo = async () => {
      const uuid = Cookies.get("uuid");
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (!uuid || !user) {
        setLoggedIn(false);
        console.log(`user doesn't exist`);
      } else {
        setLoggedIn(true);
        setLoggedInUser(user)
      }
    };

    userInfo();
  }, []);

  //handle login
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email: inputValues.email,
        password: inputValues.password,
      });
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("uuid", token);
      setLoggedIn(true);
      setLoggedInUser(user);
      navigation("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      } else if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      } else {
        console.log("internal server error", error);
      }
    }
  };

  //handle logout
  const userLogOut = () => {
    Cookies.remove("uuid");
    localStorage.removeItem("user");
    // setLoggedIn(false);
    socket.emit('removeSocketId' , {user_id : loggedInUser._id} )
    window.location.reload();
  };

  return (
    <>
      {loggedIn ? (
        <Home
          handleClick={userLogOut}
          name={loggedInUser.name}
          id={loggedInUser._id}
        />
      ) : (
        <Login
          handleSubmit={loginUser}
          email={inputValues.email}
          password={inputValues.password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          error={error}
        />
      )}
    </>
  );
};

export default View;
