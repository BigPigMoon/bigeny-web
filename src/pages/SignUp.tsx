import React, { useState, useEffect } from "react";
import Input from "../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme, useToken } from "../store";
import { AuthType } from "../types/AuthResponse.type";
import { API_URL } from "../http";
import ErrorAlert from "../components/common/ErrorAlert";

const SignUp = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nicknameInUse, setNicknameInUse] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailInUse(false);
    setNicknameInUse(false);
    axios
      .post<AuthType>(`${API_URL}/auth/local/singup`, {
        email: email,
        password: password,
        nickname: name,
      })
      .then((res) => {
        const { AccessToken, RefreshToken } = res.data;
        useToken.setState({ access: AccessToken, refresh: RefreshToken });
        navigate("/");
      })
      .catch((e) => {
        if (e.response) {
          const message = e.response.data.message;
          if (message === "Email already in used") {
            setEmailInUse(true);
          }
          if (message === "Nickname already in used") {
            setNicknameInUse(true);
          }
        }
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create Account</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {emailInUse && <ErrorAlert message="Email already in use!" />}
              {nicknameInUse && (
                <ErrorAlert message="Nickname already in use!" />
              )}
              <form className="form-control" onSubmit={submit}>
                <Input
                  name="Your Name"
                  error={nicknameInUse}
                  setVar={setName}
                  type="text"
                />
                <Input
                  name="Your Email"
                  error={emailInUse}
                  setVar={setEmail}
                  type="text"
                />
                <Input name="Your Password" setVar={setPassword} type="password" />
                <button type="submit" className="btn btn-accent my-4">
                  Sign Up
                </button>
                <Link
                  to="/signin"
                  className="link link-accent my-3 text-center"
                >
                  Already have an account?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
