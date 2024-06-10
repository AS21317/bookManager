import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BooksShelfPage';
import BookDetailPage from './pages/BookDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<BookSearchPage />} />
        <Route path="/bookshelf" element={<BookshelfPage />} />
        <Route path="/bookdetail" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
