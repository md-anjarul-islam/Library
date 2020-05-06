import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Books from "./components/Home/Books";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "./layouts/SingleBook";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/admin/" component={Admin} />
          <PrivateRoute path="/user/" component={User} />
          <Route path="/books/:bookId" component={SingleBook}></Route>
          <Route path="/">
            <div style={{ display: "flex" }}>
              <Books />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>

            <Footer />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
