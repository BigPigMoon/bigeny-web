import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col place-content-center items-center h-screen bg-gray-900">
        <h1 className="h1 font-bold text-5xl text-white">Error 404</h1>
        <p className="text-base text-white">Page not found</p>
        <Link to="/" className="text-base text-white">
          Go back
        </Link>
      </div>
    </>
  );
};

export default NotFound;
