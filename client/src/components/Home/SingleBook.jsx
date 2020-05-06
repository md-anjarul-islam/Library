import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Card from "../../layouts/Card";

const SingleBook = (props) => {
  console.log("Single book mounting");
  const [book, bookHandler] = useState({});
  useEffect(() => {
    let abortController = new AbortController();
    axios({
      method: "get",
      url: `http://localhost:3001/api/books/${props.match.params.bookId}`,
      headers: { token: localStorage.getItem("token") },
    })
      .then(({ data }) => {
        console.log("single book", data);
        bookHandler(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => abortController.abort();
  }, []);

  return (
    <Card title={book.title} image={book.image}>
      <h5>Author: {book.author}</h5>
      {book.description && <fieldset>Description: {book.description}</fieldset>}
      {book.rating && <p>Rating: {book.rating}</p>}
    </Card>
  );
};

export default SingleBook;
