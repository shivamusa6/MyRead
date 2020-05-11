import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import { Switch, Route } from "react-router-dom";
import { getAll } from "./BooksAPI";

class BooksApp extends React.Component {

  componentDidMount = () => {
    getAll()
      .then(books => {
        this.setState({ books: books });
        this.addToShelf(books)
      })
      .catch(err => {
        console.log(err);
      });
  };

  addToShelf = (books) => {
    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    this.setState({ currentlyReading, read, wantToRead });
  }

  move = (shelf, result, book) => {
    const newBooks = this.state.books.map((moveBook) => {
      const foundID = result[shelf].find(
        (bookId) => bookId === moveBook.id
      )
      if (foundID) {
        moveBook.shelf = shelf;
      }
      return moveBook;
    });

    let pushToState = true;
    for (var i = 0; i < newBooks.length; i++) {
      if (book.id === newBooks[i].id) {
        pushToState = false;
      }
    }
    if (pushToState) {
      let newBook = Object.assign({}, book);
      newBook.shelf = shelf;
      newBooks.push(newBook);
    }
    this.addToShelf(newBooks);
  };


  constructor() {
    super();
    this.state = {
      books: [],
      currentlyReading: [],
      read: [],
      wantToRead: []
    };
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <HomePage {...this.state} move={this.move} />}
          />
          <Route
            exact
            path="/search"
            render={(routeProps) => <SearchPage {...this.state} move={this.move} />}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
