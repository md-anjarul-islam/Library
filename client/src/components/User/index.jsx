import React from "react";
import { Route, Switch } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserBooks from "./UserBooks";
import UserSingleBook from "./UserSingleBook"

const User = (props) => {
  return (
    <Switch>
      <Route
          path={props.match.path+":id/books/:bookId"}
          component={UserSingleBook}
          props={props}
        />
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
