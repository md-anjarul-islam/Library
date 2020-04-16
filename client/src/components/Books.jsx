import React from "react";
import { useState, useEffect } from "react";
import BookLayout from "../layouts/BookLayout";

function BookComponent() {
  const [books, bookHandler] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        bookHandler(data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="container" style={{ width: "900px" }}>
      <div className="row">
        {books.map(book => {
          return <BookLayout key={book._id} book={book} />;
        })}
      </div>
    </div>
  );
}

export default BookComponent;
