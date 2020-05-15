import React, { useState, Component } from "react";
import { mainUrl, fetchAPI } from "../../config";

class ViewMode extends Component {
  constructor(props) {
    super(props);
    this.state = { book: props.book, updatedBook: {}, updatedProperty: {} };

    this.updateBooksProperty = function(ev) {
      ev.persist();
      let newChange = { [ev.target.name]: ev.target.value };
      this.setState({
        book: { ...this.state.book, ...newChange },
        updatedBook: {
          ...this.state.updatedBook,
          ...newChange,
        },
        updatedProperty: { ...this.state.updatedProperty, [ev.target.name]: 1 },
      });
    };

    this.updateImage = (ev) => {
      ev.persist();
      this.setState({
        updatedBook: {
          ...this.state.updatedBook,
          [ev.target.name]: ev.target.files[0],
        },
      });
    };

    this.updateBook = function(ev) {
      ev.preventDefault();
      let user = JSON.parse(localStorage.getItem("user"));
      let formData = new FormData();
      Object.keys(this.state.updatedBook).forEach((key) =>
        formData.append([key], this.state.updatedBook[key])
      );
      fetchAPI(`${mainUrl}/api/users/${user._id}/books/${props.book._id}`, {
        method: "patch",
        data: formData,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log("update response", response.data);
          props.changeMode();
        })
        .catch((err) => {
          let elem = document.getElementById("errorMessage");
          elem.style.display = "block";
          elem.innerText = "Error updating data";
          console.log(err);
        });
    };
  }

  render() {
    return (
      <div
        style={{
          width: "500px",
          margin: "5px",
        }}
      >
        <div
          className="container"
          style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}
        >
          <div className="card shadow-lg">
            <form id="form" onSubmit={(ev) => this.updateBook(ev)}>
              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="title"> Title </label>
                <input
                  type="text"
                  name="title"
                  value={this.state.book.title}
                  className="form-control"
                  onChange={(ev) => this.updateBooksProperty(ev)}
                />
              </div>
              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="description"> Description </label>
                <textarea
                  type="text"
                  name="description"
                  value={this.state.book.description}
                  onChange={(ev) => this.updateBooksProperty(ev)}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="rating"> Rating </label>
                <input
                  type="number"
                  name="rating"
                  value={this.state.book.rating}
                  onChange={(ev) => this.updateBooksProperty(ev)}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="image"> Image </label>
                <input
                  type="file"
                  name="image"
                  onChange={(ev) => this.updateImage(ev)}
                  className="form-control"
                />
              </div>
              <button className="btn btn-block btn-primary m-2" type="submit">
                Save Changes
              </button>

              <p
                id="errorMessage"
                className="alert alert-danger"
                style={{ display: "none" }}
              ></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
// const ViewMode = () => {
//   //   console.log("updatedbook");
//   return <h1>Hello</h1>;
//   //   return (
//   //     <div
//   //       style={{
//   //         width: "500px",
//   //         position: "-webkit-sticky",
//   //         position: "sticky",
//   //         top: 0,
//   //         margin: "5px",
//   //       }}
//   //     >
//   //       <div
//   //         className="container"
//   //         style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}
//   //       >
//   //         <div className="card shadow-lg">
//   //           <form id="form">
//   //             <div className="form-group" style={{ width: "100%" }}>
//   //               <label htmlFor="title"> Title </label>
//   //               <input
//   //                 required
//   //                 type="text"
//   //                 name="title"
//   //                 value={props.book.title}
//   //                 className="form-control"
//   //               />
//   //             </div>
//   //             <div className="form-group" style={{ width: "100%" }}>
//   //               <label htmlFor="description"> Description </label>
//   //               <textarea
//   //                 required
//   //                 type="text"
//   //                 name="description"
//   //                 value={props.book.description}
//   //                 className="form-control"
//   //               />
//   //             </div>

//   //             <div className="form-group" style={{ width: "100%" }}>
//   //               <label htmlFor="rating"> Rating </label>
//   //               <input
//   //                 required
//   //                 type="number"
//   //                 name="rating"
//   //                 value={props.book.rating}
//   //                 className="form-control"
//   //               />
//   //             </div>

//   //             <div className="form-group" style={{ width: "100%" }}>
//   //               <label htmlFor="image"> Image </label>
//   //               <input
//   //                 required
//   //                 type="file"
//   //                 name="image"
//   //                 className="form-control"
//   //               />
//   //             </div>
//   //             <button
//   //               className="btn btn-block btn-primary m-2"
//   //               onClick={() => props.changeMode()}
//   //             >
//   //               Save Changes
//   //             </button>
//   //           </form>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
// };

export default ViewMode;
