import React from "react";
import BookSelf from "./BookSelf";
import Search from "./Search";

class HomePage extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookSelf
              title="Currently Reading"
              book={this.props.currentlyReading}
              move={this.props.move}
            />
            <BookSelf
              title="Want to Read"
              book={this.props.wantToRead}
              move={this.props.move}
            />
            <BookSelf
              title="Read"
              book={this.props.read}
              move={this.props.move}
            />
          </div>
        </div>
        <Search />
      </div>
    );
  }
}

export default HomePage;
