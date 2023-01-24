import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wall from "./pages/Wall";
import NotFound from "./pages/NotFound";
import RouteGuard from "./utils/RouteGuard";
import { useToken } from "./store";
import axios from "axios";
import { API_URL } from "./http";
import { AuthType } from "./types/AuthResponse";

function App() {
  useEffect(() => {
    const tokens = useToken.getState();
    if (tokens) {
      axios
        .post<AuthType>(
          `${API_URL}auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${tokens.refresh}` },
          }
        )
        .then((res) => {
          useToken.setState({
            access: res.data.AccessToken,
            refresh: res.data.RefreshToken,
          });
        })
        .catch((e) => {
          useToken.setState({ access: "", refresh: "" });
        });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<RouteGuard />}>
          <Route element={<Wall />} path="/" />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
