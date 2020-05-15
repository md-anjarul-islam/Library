import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [updated, setUpdated] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const publicLinks = [
    { name: "Home", url: "/" },
    { name: "Login", url: "/login" },
    { name: "Register", url: "/register" },
  ];

  const privateLinks = [
    { name: "Home", url: "/" },
    { name: "Profile", url: `/user/${user && user._id}` },
    { name: "Dashboard", url: `/user/${user && user._id}/books` },
    {
      name: "Logout",
      url: "/",
      method: () => {
        localStorage.clear();
        setUpdated(true);
      },
    },
  ];

  return (
    <NavbarUI>
      <UnorderList>
        <ListItem>
          <form action="/searchbook" method="POST">
            <input type="text" name="keyword" placeholder="search book..." />
            <button type="submit"> Search </button>
          </form>
        </ListItem>

        {user && user._id
          ? createNavbar(privateLinks)
          : createNavbar(publicLinks)}
      </UnorderList>
    </NavbarUI>
  );
};

const createNavbar = (links) => {
  return links.map((link) => (
    <ListItem>
      <Link
        className={link.class || "nav-link"}
        to={link.url}
        onClick={() => link.method && link.method()}
      >
        {link.name}
      </Link>
    </ListItem>
  ));
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
