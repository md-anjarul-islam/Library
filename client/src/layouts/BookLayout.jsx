import React from "react";

const BookLayout = props => {
  const book = props.book;
  return (
    <div className="col-sm" style={{ marginBottom: "50px" }}>
      <div
        className="card shadow-lg"
        style={{ width: "200px", padding: "5px !important" }}
      >
        <img
          src={`http://localhost:3001/uploads/${book.image}`}
          width="100%"
          height="200px"
          style={{ padding: "10px" }}
        />
        <div className="card-body" style={{ height: "180px", margin: "5px" }}>
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text" style={{ overflow: "ellipsis" }}>
            {" "}
            Rating: {book.rating}
          </p>
          <a
            href="#"
            className="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target={book._id}
          >
            Details
          </a>
        </div>

        <div
          className="modal fade"
          id={book._id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ width: "400px" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  {" "}
                  {book.title}
                </h5>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div
                  className="modal-image mb-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <h5> Cover Page: </h5>
                  <img
                    src={`http://localhost:3001/uploads/${book.image}`}
                    width="150px"
                    height="200px"
                  />
                </div>

                <div
                  className="modal-author mb-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <h5> Author: </h5>
                  <h6> {book.author}</h6>
                </div>

                <div
                  className="modal-seller mb-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <h5> About: </h5>
                  <div style={{ paddingTop: "4px", paddingLeft: "6px" }}>
                    {" "}
                    <h6> {book.description}></h6>{" "}
                  </div>
                </div>

                <div
                  className="modal-image mb-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <h5> Rating: </h5>
                  <h6> {book.rating} </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLayout;
