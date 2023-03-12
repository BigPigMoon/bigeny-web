import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wall from "./pages/Wall";
import NotFound from "./pages/NotFound";
import RouteGuard from "./utils/RouteGuard";
import { useToken } from "./store";
import axios from "axios";
import { API_URL } from "./http";
import { AuthType } from "./types/AuthResponse.type";
import Now from "./pages/Now";
import Messanger from "./pages/Messanger";
import Channels from "./pages/Channels";
import NavBar from "./components/common/navbar/NavBar";
import ChannelView from "./pages/ChannelView";
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    const tokens = useToken.getState();
    if (tokens.access.length > 0 && tokens.refresh.length > 0) {
      axios
        .post<AuthType>(
          `${API_URL}/auth/refresh`,
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

  const location = useLocation();
  const shouldRenderNavBar = !["/signup", "/signin"].includes(
    location.pathname
  );

  return (
    <>
      {shouldRenderNavBar && <NavBar />}

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<RouteGuard />}>
          <Route element={<Wall />} path="/" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Now />} path="/new" />
          <Route element={<Messanger />} path="/messanger" />
          <Route element={<Channels />} path="/messanger/channels" />
          <Route element={<ChannelView />} path="/channel/:id" />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
