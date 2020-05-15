import React from "react";
import { mainUrl, fetchAPI } from "../../config";
import ViewMode from "./ViewMode";

class SingleBook extends React.Component {
  constructor(props) {
    super(props);
    this._ismounted = true;
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
  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    return <ViewMode book={this.state.book} />;
  }
}

export default SingleBook;
