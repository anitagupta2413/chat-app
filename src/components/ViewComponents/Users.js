import React , {useEffect , useState} from "react";
import { Typography, Avatar } from "@mui/material";
import axios from 'axios';

const Users = ({ userId , handleChat }) => {

  const [allUsers , setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/fetch");
        const filteredUsers = response.data.filter((user) => user._id !== userId);
        setAllUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  } , []);

  return (
    <div>
      <ul>
        {allUsers.map((row, index) => (
          <li
            onClick={() => handleChat(row._id)}
            key={index}
            className="flex flex-row items-center border-b border-purple-700 gap-4 p-4 hover:bg-purple-100"
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
              <Typography variant="h6">{row.name}</Typography>
              <Typography variant="text">{row._id}</Typography>
              <Typography variant="text">{row.email}</Typography>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
