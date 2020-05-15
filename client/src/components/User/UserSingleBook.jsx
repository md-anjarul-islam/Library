import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { mainUrl, fetchAPI } from "../../config";
import ViewMode from "./ViewMode";
import UpdateMode from "./UpdateMode";

class UserSingleBook extends React.Component {
  constructor(props) {
    super(props);
    this._ismounted = true;
    this.state = { book: {}, mode: "view" };
    this.changeMode = () => {
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
      if (this.state.mode === "view") this.setState({ mode: "update" });
      else this.setState({ mode: "view" });
    };
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
  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    if (this.state.mode === "view")
      return <ViewMode book={this.state.book} changeMode={this.changeMode} />;
    else
      return <UpdateMode book={this.state.book} changeMode={this.changeMode} />;
  }
}

export default UserSingleBook;
