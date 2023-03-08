import React, { useState, useEffect } from "react";
import Input from "../components/Input";
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
  const [error, setError] = useState(false);

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
      .catch((e) => setError(true));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form className="form-control" onSubmit={submit}>
              <Input name="Email" error={error} setVar={setEmail} type="text" />
              <Input
                name="Password"
                error={error}
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
