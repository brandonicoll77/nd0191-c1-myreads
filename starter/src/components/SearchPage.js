import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

function SearchPage({ books, onShelfChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);

    const inputIsEmpty = !userInput.trim();
    if (inputIsEmpty) {
      setResults([]);
      return;
    }

    BooksAPI.search(userInput).then((apiResults) => {
      const gotValidResults = apiResults && !apiResults.error;

      if (gotValidResults) {
        const resultsWithShelves = apiResults.map((apiBook) => {
          const alreadyOnShelf = books.find((myBook) => myBook.id === apiBook.id);

          if (alreadyOnShelf) {
            return { ...apiBook, shelf: alreadyOnShelf.shelf };
          } else {
            return apiBook;
          }
        });

        setResults(resultsWithShelves);
      } else {
        setResults([]);
      }
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
