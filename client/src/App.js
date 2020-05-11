import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Books from "./components/Home/Books";
import User from "./components/User";
import Admin from "./components/Admin";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "./components/Home/SingleBook";
import Home from "./components/Home";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/admin/" component={Admin} />
          <PrivateRoute path="/user/" component={User} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
