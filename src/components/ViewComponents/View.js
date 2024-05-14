import React from "react";
import imageSrc from "../assets/carousel-1.png";
import { FaCheck } from "react-icons/fa";

const View = () => {
  return (
    <div
      className="h-full flex flex-column justify-center items-center border border-purple-500"
    >
      <img src={imageSrc} alt="Description" className="max-w-full h-auto" />
      <h3>Select the user from users list to have a chat !</h3>
      <ul className="flex flex-column justify-start items-start" >
        <li className="flex flex-row justify-center items-center">
          <FaCheck className="text-purple-500"/>
          <p className="ml-5">Messages are end to end encrypted for the privacy concerns.</p>
        </li>
        <li className="flex flex-row justify-center items-center">
          <FaCheck className="text-purple-500"/>
          <p className="ml-5">One to one communication has been established between users.</p>
        </li>
        <li className="flex flex-row justify-center items-center">
          <FaCheck className="text-purple-500"/>
          <p className="ml-5">unique username facility has been provided to each user.</p>
        </li>
      </ul>
    </div>
  );
};

export default View;
