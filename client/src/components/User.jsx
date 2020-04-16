import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "../layouts/UserProfile";
import axios from "axios";

const User = (props) => {
  console.log("in user.jsx", props);
  const [user, userHandler] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${props.match.params.id}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("profile data", data));
  }, []);
  return (
    <Router>
      <Route path="/:id" props={props} component={UserProfile} />
    </Router>
  );
};

export default User;
