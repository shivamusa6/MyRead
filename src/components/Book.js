import React from "react";
import { update } from "../BooksAPI";

class Book extends React.Component {
  handleChange = async (e) => {
    const book = this.props;
    const shelf = e.target.value;
    try {
      const result = await update(book, shelf);
      if (result) {
        this.props.move(shelf, result);
      }
    } catch (error) { }
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.imageLinks &&
                this.props.imageLinks.thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={this.props.shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">
          {this.props.authors ? this.props.authors.join(",") : "Unknow"}
          {this.props.averageRating && (<div style={{ color: "red" }}>Rating  : {this.props.averageRating}</div>)}
        </div>
      </div>
    );
  }
}

export default Book;
