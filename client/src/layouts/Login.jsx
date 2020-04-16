import React from "react";
import { Link, Redirect, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Register from "./Register";

function LoginLayout(props) {
  console.log("in login", props);
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

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
        let token = data.headers["x-token"];
        localStorage.setItem("token", token);
        setLoggedIn(true);
        setUser(data.data);
        // console.log("inside", data.data);
        return data.data;
      })
      .catch((err) => {
        // props.history.push("/login");
        // console.log(err.response.data);
      });
  }
  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <Redirect to="/register" />
      </BrowserRouter>
    );
    // props.history.push("/user/123");
  }
  return (
    <div className="container" style={{ width: "400px" }}>
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
          <div style={{ textAlign: "center" }}>
            <Link to="/register"> Not registered? </Link>
          </div>
        </div>
      </div>
      <p id="validationmsg"></p>
    </div>
  );
}

export default LoginLayout;
