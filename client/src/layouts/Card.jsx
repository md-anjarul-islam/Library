import React from "react";

const Card = (props) => {
  console.log("Card");

  return (
    <div className="container" style={{ width: "400px" }}>
      <div className="card shadow-lg">
        <h5 style={{ textAlign: "center" }} className="card-header">
          {props.title}
        </h5>
        <img
          src={`http://localhost:3001/uploads/${props.image}`}
          alt={props.title}
        />
        <div className="m-3 p-2">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
