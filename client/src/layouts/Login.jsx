import React from "react";
import { Link, Redirect, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { mainUrl, fetchAPI } from "../config";
import Card from "./Card";
function LoginLayout(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  let message = props.location.state ? props.location.state.message : "";

  function login(event) {
    event.preventDefault();
    let form = document.getElementById("form");
    let userInfo = {
      username: form.username.value,
      password: form.password.value,
    };
    fetchAPI(`${mainUrl}/api/login`, {
      method: "POST",
      data: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposne) => {
        let token = resposne.headers["x-token"];
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(resposne.data));
        setUser(resposne.data);
        return resposne.data;
      })
      .catch((err) => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        message = `${err.message}.\n Please try again`;
      });
  }
  if (user && user._id) {
    const { state } = props.location;
    let referrer = `/user/${user._id}`;
    if (state && state.from && state.from.pathname)
      referrer = state.from.pathname;
    return <Redirect to={referrer} />;
  }
  return (
    <Card title={"Login"}>
      <div className="p-1">
        <form id="form" onSubmit={(event) => login(event)}>
          <div className="form-group" style={{ width: "100%" }}>
            <label htmlFor="username">User Name</label>
            <input
              required
              type="text"
              name="username"
              className="form-control"
            />
          </div>
          <div className="form-group" style={{ width: "100%" }}>
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block m-2">
            Submit
          </button>
        </form>
        {message && (
          <p id="errorMessage" className="alert alert-danger">
            {message}
          </p>
        )}
        <div style={{ textAlign: "center" }}>
          <Link to="/register"> Not registered? </Link>
        </div>
      </div>
    </Card>
  );
}

export default LoginLayout;
