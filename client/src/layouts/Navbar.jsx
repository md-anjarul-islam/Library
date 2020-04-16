import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="top-bar p-3 mb-2 bg-dark"
      style={{ marginBottom: "30px !important" }}
    >
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <form action="/searchbook" method="POST">
            <input type="text" name="keyword" placeholder="search book..." />
            <button type="submit"> Search </button>
          </form>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/">
            {" "}
            Home{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            {" "}
            Login{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            {" "}
            Register{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
