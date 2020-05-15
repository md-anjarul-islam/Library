import React from "react";
import { Link } from "react-router-dom";
import { mainUrl, fetchAPI } from "../config";
import propTypes from "prop-types";

const BookListItem = (props) => {
  const book = props.book;
  const { image, title } = book;
  return (
    <div className="col-sm" style={{ marginBottom: "50px" }}>
      <div
        className="card shadow-lg"
        style={{ width: "200px", padding: "5px !important" }}
      >
        {image && (
          <img
            src={`${mainUrl}/uploads/${image}`}
            width="100%"
            height="200px"
            style={{ padding: "10px" }}
          />
        )}
        <div className="card-body" style={{ height: "180px", margin: "5px" }}>
          {title && <h5 className="card-title">{book.title}</h5>}
          <p className="card-text" style={{ overflow: "ellipsis" }}>
            Rating: {book.rating}
          </p>
          <Link to={"/books/" + book._id} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

BookListItem.propTypes = {
  book: propTypes.shape({
    _id: propTypes.string,
    title: propTypes.string,
    author: propTypes.string,
    description: propTypes.string,
    rating: propTypes.number,
    image: propTypes.any,
    seller: propTypes.string,
    modifier: propTypes.string,
  }),
};

export default BookListItem;
