import { createContext, useState, useEffect } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  // Retrieve stored books from localStorage or set empty array if none found
  const [selectedBook, setSelectedBook] = useState(() => {
    const storedBooks = localStorage.getItem("selectedBook");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  // Update localStorage whenever selectedBook changes
  useEffect(() => {
    localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
  }, [selectedBook]);

  const handleDelete = (bookKey) => {
    if (!bookKey) return;
    console.log("Deleting book with key:", bookKey);
    const updatedBooks = selectedBook.filter((book) => book.key !== bookKey);
    setSelectedBook(updatedBooks);
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
