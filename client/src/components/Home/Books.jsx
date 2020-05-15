import React from "react";
import { useState, useEffect } from "react";
import { mainUrl, fetchAPI } from "../../config";
import propTypes from "prop-types";
import BookList from "../../UI-components/BookList";

function BookComponent(props) {
  const [books, setBooks] = useState([]);
  const [error, setErrorData] = useState({});
  const [isError, setErrorFlag] = useState(false);
  const [isLodaded, setLoad] = useState(false);
  const [modified, setModified] = useState(false);
  function updateBookList() {
    setModified(true);
  }

  useEffect(() => {
    let abortController = new AbortController();
    fetchAPI(`${mainUrl}/api/books`, {
      method: "get",
      headers: { token: localStorage.getItem("token") },
    })
      .then(({ data }) => {
        setTimeout(() => {
          setLoad(true);
          setErrorFlag(false);
          setBooks(data);
        }, 2000);
      })
      .catch((err) => {
        setLoad(false);
        setErrorFlag(true);
        setErrorData(err);
      });
    return () => abortController.abort();
  }, []);

  if (isError)
    return (
      <div>
        <h3>{error.message}</h3>
      </div>
    );
  else if (!isLodaded)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  else if (isLodaded) return <BookList books={books} />;
}

BookComponent.propTypes = {
  book: propTypes.shape({
    _id: propTypes.string,
    title: propTypes.string,
    author: propTypes.string,
    description: propTypes.string,
    rating: propTypes.number,
    image: propTypes.any,
    seller: propTypes.string,
    modifier: propTypes.string,
  }),
};
export default BookComponent;
