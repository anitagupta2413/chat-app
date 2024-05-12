import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import axios from "axios";
import Header from "./Header";

const Users = ({
  userId,
  handleChat,
  loggedInUserName,
  handleLogout,
  handleDeleteAccount,
}) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/fetch/users")
          .then((response) => {
            if (response.data.success) {
              const filteredUsers = response.data.users.filter(
                (user) => user._id !== userId
              );
              setAllUsers(filteredUsers);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        <Header
          name={loggedInUserName}
          handleLogout={handleLogout}
          handleDeleteAccount={handleDeleteAccount}
        />
      </div>
      <div>
        <ul>
          {allUsers.map((row, index) => (
            <li
              onClick={() => handleChat(row._id)}
              key={index}
              className="flex flex-row items-center border-b border-purple-700 gap-4 p-4 hover:border-purple-100"
            >
              <div>
                <Avatar
                  style={{
                    zIndex: 1,
                    backgroundColor: "#8B5CF6",
                    color: "white",
                  }}
                >
                  {row.name.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              <div className="flex flex-col">
                <Typography variant="h6">{row.username}</Typography>
                <Typography variant="text">{row.name}</Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
