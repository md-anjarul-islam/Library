import React, { useState, useEffect, Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Card from "../../layouts/Card";
import { fetchAPI, mainUrl } from "../../config";
/* 
const SingleBook = (props) => {
  console.log("Single book mounting");
  const [book, bookHandler] = useState({});
  useEffect(() => {
    let abortController = new AbortController();
    axios({
      method: "get",
      url: `http://localhost:3001/api/books/${props.match.params.bookId}`,
      headers: { token: localStorage.getItem("token") },
    })
      .then(({ data }) => {
        console.log("single book", data);
        bookHandler(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => abortController.abort();
  }, []);

  return (
    <Card title={book.title} image={book.image}>
      <h5>Author: {book.author}</h5>
      {book.description && <fieldset>Description: {book.description}</fieldset>}
      {book.rating && <p>Rating: {book.rating}</p>}
    </Card>
  );
};
 */

async function getBook(bookId) {
  axios({
    url: `${mainUrl}/api/books/${bookId}`,
    method: "get",
  })
    .then(({ data }) => {
      console.log("component did mount".response);
      // if (this._isMounted) this.setState({ book: data });
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

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

  async componentWillUpdate(prevProp, prevState) {
    // console.log("COmponent updated", this.props);
    // console.log("prev prop", prevProp, "next prop", prevState);
    // console.log("this state", this.state.book);
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
        if (JSON.stringify(this.state.book) != JSON.stringify(data))
          if (this._isMounted) this.setState({ book: data });
      })
      .catch((err) => console.log(err));
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
