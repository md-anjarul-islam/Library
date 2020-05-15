import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Link, Route } from "react-router-dom";
import Card from "../../layouts/Card";
import { mainUrl, fetchAPI } from "../../config";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this._ismounted = true;
    // this.cancelTokenSource = axios.CancelToken.source();
    this.state = { book: {} };
  }
  componentDidMount() {
    fetchAPI(`${mainUrl}/api/books/${this.props.match.params.bookId}`, {
      method: "get",
    })
      .then(({ data }) => {
        if (this._ismounted) this.setState({ book: data });
        console.log(data, this.state.book);
      })
      .catch((err) => {
        if (this._ismounted) console.log(err);
      });
  }
  componentWillUpdate() {
    fetchAPI(`${mainUrl}/api/books/${this.props.match.params.bookId}`, {
      method: "get",
    })
      .then(({ data }) => {
        if (this._ismounted) this.setState({ book: data });
      })
      .catch((err) => {
        if (this._ismounted) console.log(err);
      });
  }
  componentWillUnmount() {
    this.abortController.abort();
    this._ismounted = false;
    // this.cancelTokenSource.cancel();
  }

  render() {
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
              {this.state.book.title}
            </h5>
            {this.state.book.image && (
              <img
                src={`${mainUrl}/uploads/${this.state.book.image}`}
                alt={this.state.book.title}
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
              {this.state.book.description && (
                <fieldset>Description: {this.state.book.description}</fieldset>
              )}
              {this.state.book.rating && (
                <p>Rating: {this.state.book.rating}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  title: propTypes.string,
  author: propTypes.string,
  description: propTypes.string,
  rating: propTypes.number,
  image: propTypes.string,
};
export default Book;
