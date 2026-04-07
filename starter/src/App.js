import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';

const shelves = [
  { key: 'currentlyReading', title: 'Currently Reading' },
  { key: 'wantToRead', title: 'Want to Read' },
  { key: 'read', title: 'Already Read' },
];

function App() {
  const [books, updateBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((allBooks) => {
      updateBooks(allBooks);
    });
  }, []);

  const handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      updateBooks((currentBooks) => {

        if (shelf === 'none') {
          return currentBooks.filter((b) => b.id !== book.id);
        }

        const alreadyOnShelf = currentBooks.find((b) => b.id === book.id);

        if (alreadyOnShelf) {
          return currentBooks.map((currentBook) => {
            if (currentBook.id === book.id) {
              return { ...currentBook, shelf };
            }
            return currentBook;
          });
        }

        const updatedBooks = currentBooks.concat({ ...book, shelf });

        return updatedBooks;
      });
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                  {shelves.map(({ key, title }) => (
                    <BookShelf
                      key={key}
                      title={title}
                      books={books.filter((b) => b.shelf === key)}
                      onShelfChange={handleShelfChange}
                    />
                  ))}
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            }
          />

          <Route
            path="/search"
            element={
              <SearchPage books={books} onShelfChange={handleShelfChange} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
