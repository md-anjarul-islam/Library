import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "../../layouts/UserProfile";
import UserBooks from "../../layouts/UserBooks";
import axios from "axios";

const User = (props) => {
  console.log("User");
  return (
    <Switch>
      <Route
        path={props.match.path + ":id/books"}
        props={props}
        component={UserBooks}
      />
      <Route
        path={props.match.path + ":id"}
        props={props}
        component={UserProfile}
      />
    </Switch>
  );
};

export default User;
