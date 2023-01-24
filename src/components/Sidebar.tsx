import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../store";
import $api from "../http";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    $api.post("/auth/logout").then((res) => {
      useToken.setState({ access: "", refresh: "" });
      navigate("/signin");
    });
  };
  return (
    <>
      <div className="flex flex-col">
        <Link to="/">
          <button className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-32 h-10 my-2">
            Wall
          </button>
        </Link>
        <Link to="/news">
          <button className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-32 h-10 my-2">
            News
          </button>
        </Link>
        <Link to="/channels">
          <button className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-32 h-10 my-2">
            Channels
          </button>
        </Link>
        <Link to="/dialogs">
          <button className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-32 h-10 my-2">
            Dialogs
          </button>
        </Link>
        {/* TODO: move logout button to float menu */}
        <button
          className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-32 h-10 my-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
