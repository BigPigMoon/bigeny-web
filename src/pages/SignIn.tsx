import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../store";
import axios from "axios";
import { API_URL } from "../http";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = () => {
    axios
      .post(`${API_URL}auth/local/singin`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const { AccessToken, RefreshToken } = res.data;
        useToken.setState({ access: AccessToken, refresh: RefreshToken });
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex place-content-center items-center h-screen bg-gray-900">
      <div className="flex flex-row">
        <h1 className="h1 font-bold text-5xl whitespace-pre-wrap max-w-min text-white mr-3 mt-3">
          Welcome Back
        </h1>
        <div className="flex flex-col m-3">
          <Input name="Email" setVar={setEmail} type="text" />
          <Input name="Password" setVar={setPassword} type="password" />
          <button
            onClick={submit}
            className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-64 h-10 my-3"
          >
            Sign In
          </button>
          <Link
            to="/signup"
            className="text-green-500 hover:text-white my-3 text-center"
          >
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
