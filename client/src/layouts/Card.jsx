import React from "react";
import { mainUrl, fetchAPI } from "../config";
import propTypes from "prop-types";
const Card = (props) => {
  return (
    <div
      className="container"
      style={{ width: "400px", position: "sticky", top: 0 }}
    >
      <div className="card shadow-lg">
        <h5 style={{ textAlign: "center" }} className="card-header">
          {props.title}
        </h5>
        {props.image && (
          <img src={`${mainUrl}/uploads/${props.image}`} alt={props.title} />
        )}
        <div className="m-2">{props.children}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: propTypes.string,
  image: propTypes.any,
  children: propTypes.node,
};

export default Card;
