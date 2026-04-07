import React from 'react';

function Book({ book, onShelfChange }) {
  const thumbnail = book.imageLinks?.thumbnail;
  const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
  const currentShelf = book.shelf || 'none';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: thumbnail ? `url("${thumbnail}")` : 'none',
          }}
        >
          {!thumbnail && (
            <div className="book-cover-title">{book.title}</div>
          )}
        </div>
        <div className="book-shelf-changer">
          <select
            value={currentShelf}
            onChange={(e) => onShelfChange(book, e.target.value)}
          >
            <option value="" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

export default Book;
