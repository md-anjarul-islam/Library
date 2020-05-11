import React from "react";
import { mainUrl, fetchAPI } from "../config";

const RegisterLayout = () => {
  const serverUrl = mainUrl;
  return (
    <div
      className="container"
      style={{ width: "400px", position: "sticky", top: 0 }}
    >
      <div className="card shadow-lg">
        <h5 style={{ textAlign: "center" }} className="card-header">
          Register
        </h5>
        <div className="p-3">
          <form id="form" action={`${serverUrl}/register`} method="POST">
            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="username"> User Name </label>
              <input
                required
                type="text"
                name="username"
                className="form-control"
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="fullname"> Full Name </label>
              <input
                required
                type="text"
                name="fullname"
                className="form-control"
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="email"> E-mail </label>
              <input
                required
                type="email"
                name="email"
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

            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="confirmpass">Confirm Password</label>
              <input
                required
                type="password"
                name="confirmpass"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
      <p id="validationmsg"></p>
    </div>
  );
};

export default RegisterLayout;
