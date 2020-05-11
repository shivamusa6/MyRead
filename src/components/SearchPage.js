import React from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      books: [],
    };
  }

  handleChange = async (e) => {
    try {
      const query = e.target.value;
      const result = await search(query);
      this.setState({ query: query });

      if (result.error) {
        this.setState({ books: [] });
      } else {
        this.setState({ books: result });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 &&
              this.state.books.map((book) => {
                this.props.books.map(
                  (searchBook) => {
                    if(book.id === searchBook.id){
                      book.shelf = searchBook.shelf
                    }
                    return searchBook
                  }
                )
                return <Book key={book.id} {...book} move={this.props.move} shelf={book.shelf ? book.shelf :'none'} />;
              })}
            {this.state.books.length === 0 && (
              <h1 style={{ textAlign: "center" }}> No Search Result</h1>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
