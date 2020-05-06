import React from "react";
import { Link } from "react-router-dom";

const BookLayout = (props) => {
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
            src={`http://localhost:3001/uploads/${image}`}
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

export default BookLayout;
