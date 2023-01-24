import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../store";
import { AuthType } from "../types/AuthResponse";
import { API_URL } from "../http";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submit = () => {
    axios
      .post<AuthType>(`${API_URL}auth/local/singup`, {
        email: email,
        password: password,
        nickname: name,
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
      <div className="flex flex-row-reverse">
        <h1 className="h1 font-bold text-5xl whitespace-pre-wrap max-w-min text-white ml-3 mt-3">
          Create Accaount
        </h1>
        <div className="flex flex-col m-3">
          <Input name="Name" setVar={setName} type="text" />
          <Input name="Email" setVar={setEmail} type="text" />
          <Input name="Password" setVar={setPassword} type="password" />
          <button
            onClick={submit}
            className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-64 h-10 my-3"
          >
            Sign Up
          </button>
          <Link
            to="/signin"
            className="text-green-500 hover:text-white my-3 text-center"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
