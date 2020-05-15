import React from "react";
import { useState, useEffect } from "react";
import UserBookLayout from "./UserBookLayout";

import { mainUrl, fetchAPI } from "../../config";

const UserBooks = (props) => {
  const [books, bookHandler] = useState([]);
  const [isError, LoadError] = useState({});
  const [isLodaded, LoadData] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let abortController = new AbortController();

    fetchAPI(`${mainUrl}/api/users/${user._id}/books`, {
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

  if (!isLodaded)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="container" style={{ width: "900px", display: "flex" }}>
      <div className="row">
        {books.map((book) => {
          return (
            <UserBookLayout
              key={book._id}
              book={book}
              currentUrl={props.match.url}
              link={`${props.match.url}/${book._id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserBooks;
