import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../store";

const NotFound = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Error 404</h1>
            <p className="py-6">Page not found</p>
            <Link to="/" className="link link-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
