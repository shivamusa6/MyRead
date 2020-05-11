import React from "react";
import Book from "./Book";

class BookSelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.book &&
              this.props.book.map((book) => (
                <Book key={book.id} {...book} move={this.props.move} />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSelf;
