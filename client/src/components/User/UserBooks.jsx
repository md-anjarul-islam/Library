import React from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SingleBook from "../Home/SingleBook";
import BookLayout from "../Home/BookLayout";
import { mainUrl, fetchAPI } from "../../config";

const UserBooks = (props) => {
  const [books, bookHandler] = useState([]);
  const [isError, LoadError] = useState({});
  const [isLodaded, LoadData] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();
    fetchAPI(`${mainUrl}/api/admin/books`, {
      method: "get",
      headers: { token: localStorage.getItem("token") },
    })
      .then(({ data }) => {
        setTimeout(() => {
          LoadData(true);
          bookHandler(data);
        }, 2000);
      })
      .catch((err) => {
        LoadData(true);
        LoadError(err);
      });
    return () => abortController.abort();
  }, []);

  if (!isLodaded) return <div>Loading...</div>;

  return (
    <div className="container" style={{ width: "900px", display: "flex" }}>
      <div className="row">
        {books.map((book) => {
          return (
            <BookLayout
              key={book._id}
              book={book}
              currentUrl={props.match.url}
            />
          );
        })}
      </div>
      <Switch>
        <Route
          path={`${props.match.path}/:bookId`}
          component={SingleBook}
          props={props}
        />
      </Switch>
    </div>
  );
};

export default UserBooks;
