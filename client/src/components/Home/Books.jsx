import React from "react";
import { useState, useEffect } from "react";
import BookLayout from "../../layouts/BookLayout";
import axios from "axios";

function BookComponent(props) {
  const [books, setBooks] = useState([]);
  const [error, setErrorData] = useState({});
  const [isError, setErrorFlag] = useState(false);
  const [isLodaded, setLoad] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();
    axios({
      method: "get",
      url: "http://localhost:3001/api/books",
      headers: { token: localStorage.getItem("token") },
    })
      .then(({ data }) => {
        setTimeout(() => {
          setLoad(true);
          setErrorFlag(false);
          setBooks(data);
        }, 2000);
      })
      .catch((err) => {
        setLoad(false);
        setErrorFlag(true);
        setErrorData(err);
      });
    return () => abortController.abort();
  }, []);

  if (isError)
    return (
      <div>
        <h3>{error.message}</h3>
      </div>
    );
  else if (!isLodaded)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  else if (isLodaded)
    return (
      <div className="container" style={{ width: "900px" }}>
        <div className="row">
          {books.map((book) => {
            return <BookLayout key={book._id} book={book} />;
          })}
        </div>
      </div>
    );
}

export default BookComponent;
