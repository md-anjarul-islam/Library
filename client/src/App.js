import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Books from "./components/Books";
import User from "./components/User";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Login} />
          <PrivateRoute path="/user" component={User} />
          <Route path="/">
            <Books />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
