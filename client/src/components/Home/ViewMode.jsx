import React from "react";
import { mainUrl, fetchAPI } from "../../config";

const ViewMode = (props) => {
  return (
    <div
      style={{
        width: "500px",
        position: "-webkit-sticky",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        className="container"
        style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}
      >
        <div className="card shadow-lg">
          <h5 style={{ textAlign: "center" }} className="card-header">
            {props.book.title}
          </h5>
          {props.book.image && (
            <img
              src={`${mainUrl}/uploads/${props.book.image}`}
              alt={props.book.title}
              style={{
                width: "220px",
                height: "200x",
                maxHeight: "200px",
                margin: "auto",
              }}
            />
          )}
          <div
            className="m-3 p-2"
            style={{ height: "100px", overflow: "scroll" }}
          >
            {props.book.description && (
              <fieldset>Description: {props.book.description}</fieldset>
            )}
            {props.book.rating && <p>Rating: {props.book.rating}</p>}
          </div>
          {props.changeMode && (
            <button
              className="btn btn-block btn-primary"
              onClick={() => props.changeMode()}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMode;
