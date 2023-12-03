import "./style.css";
import "react-toastify/dist/ReactToastify.css";

import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { tokenStore } from "@stores/tokenStore";
import Header from "@components/header/Header";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Login from "@pages/user/Login";
import Register from "@pages/user/Register";
import ResetPassword from "@pages/user/ResetPassword";
import User from "@pages/user/User";
import TitleSearch from "@pages/search/TitleSearch";
import { userStore } from "@stores/userStore";
import Restaurant from "@pages/restaurant/Restaurant";
import UserSetting from "@pages/user/UserSettings";
import useGetUserRequest from "@api/user/getUserRequest";
import React from "react";
import {Flip, toast, ToastContainer} from "react-toastify";

export function App() {
  const token = tokenStore(state => state.token);
  const [user, setUser] = userStore(state => [state.user, state.set]);

  if (token !== null && user === null) {
    const tokenData = JSON.parse(window.atob(token.split(".")[1]));
    
    const { call } = useGetUserRequest(
      tokenData.userId,
      data => setUser(data),
      error => toast.error(error.message),
    );
    
    call();
  }

  return (
    <div class="text-nord6 bg-nord0">
      <ToastContainer
        position="bottom-right"
        limit={5}
        toastClassName="bg-nord3"
        autoClose={3000}
        theme="colored"
        closeOnClick
        pauseOnHover
        transition={Flip}
      />
      <Header />
      <div class="flex flex-col justify-center mx-auto mt-2 w-4/6">
        <LocationProvider>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/user/:id" component={User} />
            <Route path="/userSettings/:id" component={UserSetting} />
            <Route path="/search/:name" component={TitleSearch} />
            <Route path="/restaurant/:id" component={Restaurant} />
            <Route default component={NotFound} />
          </Router>
        </LocationProvider>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
