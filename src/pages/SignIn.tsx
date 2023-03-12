import React, { useState, useEffect } from "react";
import Input from "../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import { useTheme, useToken } from "../store";
import axios from "axios";
import { API_URL } from "../http";

const SignIn = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);

  const navigate = useNavigate();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${API_URL}/auth/local/singin`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const { AccessToken, RefreshToken } = res.data;
        useToken.setState({ access: AccessToken, refresh: RefreshToken });
        navigate("/");
      })
      .catch((e) => {
        if (e.response) {
          const message = e.response.data.message;
          if (message === "User not found") {
            setUserNotFound(true);
          }
        }
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {userNotFound && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Invalid password or email!</span>
                </div>
              </div>
            )}
            <form className="form-control" onSubmit={submit}>
              <Input
                name="Your Email"
                error={userNotFound}
                setVar={setEmail}
                type="text"
              />
              <Input
                name="Your Password"
                error={userNotFound}
                setVar={setPassword}
                type="password"
              />
              <button type="submit" className="btn btn-accent my-4">
                Sign In
              </button>
              <Link to="/signup" className="link link-accent my-3 text-center">
                Don't have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
