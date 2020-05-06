import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import Card from "./../../layouts/Card";

const Profile = (props) => {
  const user = props.location.state ? props.location.state.user : undefined;
  if (user !== undefined)
    return (
      <Card title={"Profile page"}>
        <h1>Welcome {user.fullname}</h1>
        <p>{user.email}</p>
        <Link to={`${props.match.url}/books`}>Show my books</Link>
      </Card>
    );
  else return <Redirect to="/login"></Redirect>;
};

export default Profile;
