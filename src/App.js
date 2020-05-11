import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import { Switch, Route } from "react-router-dom";
import { getAll } from "./BooksAPI";

class BooksApp extends React.Component {
  async componentDidMount() {
    try {
      const books = await getAll();
      this.setState({ books: books });
      this.state.addToShelf(books);
    } catch (error) {
      console.log(error);
    }
  }

  constructor() {
    super();
    this.state = {
      books: [],
      currentlyReading: [],
      read: [],
      wantToRead: [],
      addToShelf: (books) => {
        console.log(books)
        const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
        console.log(currentlyReading);
        const wantToRead = books.filter((book) => book.shelf === "wantToRead");
        const read = books.filter((book) => book.shelf === "read");
        this.setState({ currentlyReading, read, wantToRead });
      },
      move: (shelf, result) => {
        const newBooks = this.state.books.map((moveBook) => {
          const foundID = result[shelf].find(
            (bookId) => bookId === moveBook.id
          );
          if (foundID) {
            moveBook.shelf = shelf;
          }
          return moveBook;
        });
        this.state.addToShelf(newBooks);
      },
    };
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <HomePage {...this.state} />}
          />
          <Route
            exact
            path="/search"
            render={(routeProps) => <SearchPage {...this.state} />}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
