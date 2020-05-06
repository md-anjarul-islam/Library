import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem("token") == null) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      ></Route>
    );
  }
};

export default PrivateRoute;