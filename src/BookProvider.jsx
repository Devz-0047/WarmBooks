import { createContext, useState } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState([]);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
