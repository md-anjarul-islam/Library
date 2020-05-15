import React from "react";
import propTypes from "prop-types";
import BookListItem from "./BookListItem";

const BookList = (props) => {
  return (
    <div className="container" style={{ width: "900px" }}>
      <div className="row">
        {props.books.map((book) => {
          return <BookListItem key={book._id} book={book} />;
        })}
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string,
      title: propTypes.string,
      author: propTypes.string,
      description: propTypes.string,
      rating: propTypes.number,
      image: propTypes.any,
      seller: propTypes.string,
      modifier: propTypes.string,
    })
  ),
};

export default BookList;
