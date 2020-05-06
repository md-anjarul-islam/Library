import React from "react";
import { Link, Redirect, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function LoginLayout(props) {
  console.log("Login", props);

  const [user, setUser] = useState(localStorage.getItem("user") || {});
  // const [isLoggedIn, setLoggedIn] = useState(false);

  function fetchApi(event) {
    event.preventDefault();
    let form = document.getElementById("form");
    let userInfo = {
      username: form.username.value,
      password: form.password.value,
    };
    axios({
      url: "http://localhost:3001/api/login",
      method: "POST",
      data: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => {
        console.log(data.data);
        let token = data.headers["x-token"];
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
        return data.data;
      })
      .catch((err) => {
        console.log("Error", err);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        let errorMessage = document.getElementById("errorMessage");
        errorMessage.innerText = `${err.message}.\n Please try again`;
      });
  }
  if (user && user._id) {
    console.log("redirecting to user profile");
    return (
      <Redirect
        to={{ pathname: `/user/${user._id}`, state: { user: { ...user } } }}
      />
    );
  }
  return (
    <div className="container" style={{ width: "500px" }}>
      <div className="card shadow-lg">
        <h5 style={{ textAlign: "center" }} className="card-header">
          Login
        </h5>
        <div className="p-3">
          <form id="form" onSubmit={(event) => fetchApi(event)}>
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
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Submit
            </button>
          </form>
          <p id="errorMessage" className="alert"></p>
          <div style={{ textAlign: "center" }}>
            <Link to="/register"> Not registered? </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
