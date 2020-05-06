import React from "react";
import { Route, Switch } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserBooks from "./UserBooks";

const User = (props) => {
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
