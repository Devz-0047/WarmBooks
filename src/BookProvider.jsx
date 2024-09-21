import { createContext, useState } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState([]);
  const handleDelete = (bookKey) => {
    if (!bookKey) return;
    console.log("Deleting book with key:", bookKey);
    setSelectedBook(selectedBook.filter((book) => book.key !== bookKey));
  };

  return (
    <BookContext.Provider
      value={{ selectedBook, setSelectedBook, handleDelete }}
    >
      {children}
      {console.log(selectedBook)}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
