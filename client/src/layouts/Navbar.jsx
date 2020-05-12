import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  console.log("Navbar");

  return (
    <NavbarUI>
      <UnorderList>
        <ListItem>
          <form action="/searchbook" method="POST">
            <input type="text" name="keyword" placeholder="search book..." />
            <button type="submit"> Search </button>
          </form>
        </ListItem>

        <ListItem>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </ListItem>
        <ListItem>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </ListItem>
        <ListItem>
          <Link
            className="nav-link"
            to="/logout"
            onClick={(ev) => {
              ev.preventDefault();
              localStorage.clear();
            }}
          >
            Logout
          </Link>
        </ListItem>
      </UnorderList>
    </NavbarUI>
  );
};

const NavbarUI = ({ children }) => {
  return (
    <div
      className="top-bar p-3 mb-2 bg-dark"
      style={{ marginBottom: "30px !important" }}
    >
      {children}
    </div>
  );
};

const UnorderList = ({ children }) => {
  return <ul className="nav justify-content-end">{children}</ul>;
};

const ListItem = ({ children }) => {
  return <li className="nav-item">{children}</li>;
};
export default Navbar;
