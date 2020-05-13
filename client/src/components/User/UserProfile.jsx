import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import Card from "./../../layouts/Card";
import { fetchAPI, mainUrl } from "../../config";

const verifyUser = (user) =>
  new Promise((resolve, reject) => {
    fetchAPI(`${mainUrl}/api/users/${user._id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userVerified: false,
      errorVerification: false,
    };
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    setTimeout(() => {
      verifyUser(user)
        .then((response) => {
          this.setState({
            user: response.data,
            userVerified: true,
            errorVerification: false,
          });
        })
        .catch((err) => {
          localStorage.clear();
          this.setState({ errorVerification: true, userVerified: false });
        });
    }, 2000);
  }
  render() {
    if (this.state.userVerified == true)
      return (
        <Card title={"Profile page"}>
          <h1>Welcome {this.state.user.fullname}</h1>
          <p>{this.state.user.email}</p>
          <Link to={`${this.props.match.url}/books`}>Show my books</Link>
        </Card>
      );
    else if (this.state.errorVerification == true)
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              message: "Authentication failed or token expired",
            },
          }}
        ></Redirect>
      );
    else
      return (
        <div>
          <h1>Loading profile...</h1>
        </div>
      );
  }
}

export default Profile;
