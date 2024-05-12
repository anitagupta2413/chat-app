import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image from "../assets/login.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

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
    try {
      await axios
        .post("http://localhost:8000/api/login", {
          email: inputValues.email,
          password: inputValues.password,
        })
        .then((response) => {
          if (response.data.success) {
            const { user, token } = response.data;
            localStorage.setItem("user", JSON.stringify(user));
            Cookies.set("uuid", token);
            window.location.reload();
            navigation("/");
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
        console.log("internal server error", error);
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
            className="flex flex-col gap-4 py-24"
            onSubmit={loginUser}
            method="POST"
          >
            <Typography variant="h4" className="text-purple-700 font-bold">
              Welcome Back!
            </Typography>
            <Typography variant="text">login to your account</Typography>

            <TextField
              label="Email"
              color="warning"
              variant="outlined"
              type="text"
              // sx={styles}
              className="w-3/4"
              value={inputValues.email}
              onChange={handleEmailChange}
            />

            <TextField
              label="Password"
              color="warning"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              // sx={styles}
              className="w-3/4"
              value={inputValues.password}
              onChange={handlePasswordChange}
            />
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
            <button
              type="submit"
              className=" bg-purple-700 hover:bg-purple-800 p-2 text-white rounded-lg w-32"
            >
              Submit
            </button>
            <div>
              <Typography variant="text">
                not having an account ?
                <Link to="/signup" className="text-blue-500">
                  {" "}
                  Signup
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
