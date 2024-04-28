import React, { useState, useEffect } from "react";
import Header from "../ViewComponents/Header";
import Users from "../ViewComponents/Users";
import ChatRoom from "../ViewComponents/ChatRoom";
import Login from "../authentication/login";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Home from '../Home/Home'

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
      if (!uuid || !user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setLoggedInUser(user);
      }
    };

    userInfo();
  }, []);

  // handling login
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

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

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("loggin in");
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email: inputValues.email,
        password: inputValues.password,
      });
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("uuid", token);
      setIsLoggedIn(true);
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

  //handling logout
  const logOutUser = () => {
    Cookies.remove("uuid");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {isLoggedIn ? (
        <Home
        loggedInUserName = {loggedInUser.name}
        loggedInUserID = {loggedInUser._id}
        handleLogout = {logOutUser}
        />
      ) : (
        <Login
          email={inputValues.email}
          password={inputValues.password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={loginUser}
        />
      )}
    </>
  );
};

export default Screen;
