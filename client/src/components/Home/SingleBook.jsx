import React, { useState, useEffect, Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Card from "../../layouts/Card";
import { fetchAPI, mainUrl } from "../../config";

class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = { book: {} };
    this._isMounted = true;
  }

  async componentDidMount() {
    axios({
      url: `${mainUrl}/api/books/${this.props.match.params.bookId}`,
      method: "get",
    })
      .then(({ data }) => {
        console.log("component did mount", data);
        console.log(
          "comp",
          JSON.stringify(this.state.book) == JSON.stringify(data)
        );
        if (this._isMounted) this.setState({ book: data });
      })
      .catch((err) => console.log(err));
  }

  async componentDidUpdate(prevProp, prevState) {
    try {
      let { data } = await axios({
        url: `${mainUrl}/api/books/${this.props.match.params.bookId}`,
        method: "get",
      });
      if (
        this._isMounted &&
        JSON.stringify(prevState.book) != JSON.stringify(data)
      )
        this.setState({ book: data });
    } catch (err) {
      console.log(err);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Card title={this.state.book.title} image={this.state.book.image}>
        <p>Author: {this.state.book.author}</p>
      </Card>
    );
  }
}
export default SingleBook;
