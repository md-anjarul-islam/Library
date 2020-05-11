import React from "react";

const Card = (props) => {
  return (
    <div
      className="container"
      style={{ width: "400px", position: "sticky", top: 0 }}
    >
      <div className="card shadow-lg">
        {props.title && (
          <h5 style={{ textAlign: "center" }} className="card-header">
            {props.title}
          </h5>
        )}
        {props.image && (
          <img
            src={`http://localhost:3001/uploads/${props.image}`}
            alt={props.title}
          />
        )}
        <div className="m-3 p-2">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
