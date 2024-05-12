import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import image from "../assets/login.png";

const Signup = () => {
  const navigation = useNavigate();
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
  });

  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleName = (name) => {
    const digitRegex = /\d/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (digitRegex.test(name)) {
      setValidation((prevState) => ({
        ...prevState,
        name: "There should be no digit in name ",
      }));
    } else if (specialCharacterRegex.test(name)) {
      setValidation((prevState) => ({
        ...prevState,
        name: "Name should not contain special characters",
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        name: "",
      }));
      setInputValues((prevState) => ({
        ...prevState,
        name: name,
      }));
    }
  };

  const handleUserName = (userName) => {
    const hasSpecialCharacters = /[^\w]/.test(userName);
    const hasSpaces = /\s/.test(userName);
    if (hasSpecialCharacters || hasSpaces) {
      setValidation((prevState) => ({
        ...prevState,
        userName:
          "Username can only contain digits, characters, and underscores",
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        userName: "",
      }));
      setInputValues((prevState) => ({
        ...prevState,
        userName: userName,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !(
        validation.name === "" &&
        validation.email === "" &&
        validation.password === "" &&
        validation.userName === ""
      )
    ) {
      return false;
    } else {
      try {
        const userData = {
          name: inputValues.name,
          email: inputValues.email,
          username: inputValues.userName,
          password: inputValues.password,
        };
        await axios
          .post("http://localhost:8000/api/signup", userData)
          .then((response) => {
            if (response.data.success) {
              const { newUser, token } = response.data;
              localStorage.setItem("user", JSON.stringify(newUser));
              Cookies.set("uuid", token);
              navigation("/");
            } else {
              alert("an unexpected error occurred");
            }
          });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error;
          alert(errorMessage);
        } else if (error.response && error.response.status === 401) {
          const errorMessage = error.response.data.error;
          alert(errorMessage);
        } else {
          alert("internal server error", error);
        }
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-2">
        <div>
          <img src={image} alt="Your Image" className="w-full h-screen" />
        </div>
        <div>
          <form
            className="flex flex-col gap-4 py-16"
            onSubmit={handleSubmit}
            method="POST"
          >
            <Typography variant="h4" className="text-purple-700 font-bold">
              Welcome !
            </Typography>
            <Typography variant="text">
              Signup with your gmail account
            </Typography>
            <div>
              <TextField
                label="Name"
                color="warning"
                variant="outlined"
                type="text"
                className="w-3/4"
                value={inputValues.name}
                onChange={(e) => handleName(e.target.value)}
              />
              <Typography className="text-red-500">
                {validation.name}
              </Typography>
            </div>
            <div>
              <TextField
                label="choose a username"
                color="warning"
                variant="outlined"
                type="text"
                className="w-3/4"
                value={inputValues.userName}
                onChange={(e) => handleUserName(e.target.value)}
              />
              <Typography className="text-red-500">
                {validation.userName}
              </Typography>
            </div>
            <div>
              <TextField
                label="Email"
                color="warning"
                variant="outlined"
                type="email"
                value={inputValues.email}
                className="w-3/4"
                onChange={(e) =>
                  setInputValues((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              <Typography className="text-red-500">
                {validation.email}
              </Typography>
            </div>
            <div>
              <TextField
                label="Password"
                color="warning"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                className="w-3/4"
                value={inputValues.password}
                onChange={(e) =>
                  setInputValues((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
              <Typography sx={{ color: "red" }}>{validation.pass}</Typography>
            </div>
            <div>
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <div className="flex flex-row gap-2 justify-left items-center">
                    <FaRegEyeSlash />
                    <Typography variant="text">Hide password</Typography>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 justify-left items-center">
                    <IoEyeOutline />
                    <Typography variant="text">Show password</Typography>
                  </div>
                )}
              </span>
            </div>
            <div>
              <button
                type="submit"
                className=" bg-purple-700 hover:bg-purple-800 p-2 text-white rounded-lg w-32"
              >
                Submit
              </button>
            </div>
            <div>
              <div>
                <Typography variant="text">
                  already have an account ?
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </Typography>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
