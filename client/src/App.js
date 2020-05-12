import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import User from "./components/User";
import Admin from "./components/Admin";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import PrivateRoute from "./PrivateRoute";
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
