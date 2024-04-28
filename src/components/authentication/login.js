import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image from "../assets/login.png";

const Login = ({
  handleSubmit,
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen">
      <div className="grid grid-cols-2">
        <div>
          <img src={image} alt="Your Image" className="w-full h-screen" />
        </div>
        <div>
          <form
            className="flex flex-col gap-4 py-24"
            onSubmit={handleSubmit}
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
              value={email}
              onChange={handleEmailChange}
            />

            <TextField
              label="Password"
              color="warning"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              // sx={styles}
              className="w-3/4"
              value={password}
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
