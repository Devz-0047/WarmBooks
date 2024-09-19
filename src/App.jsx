import "./App.css";
import Navbar from "./Navbar";
import Book from "./Book";
import { useContext, useState } from "react";
import { BookContext } from "./BookProvider";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const MotionBook = motion(Book);

function App() {
  const { selectedBook } = useContext(BookContext);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9; // You can adjust the number of books per page

  // Ensure selectedBook is an array, even if undefined
  const bookList = Array.isArray(selectedBook) ? selectedBook : [];

  // Calculate total pages
  const totalPages = Math.ceil(bookList.length / booksPerPage);

  // Get the books to display for the current page
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = bookList.slice(startIndex, startIndex + booksPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get book cover URL
  const getBookCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return "https://via.placeholder.com/150x200?text=No+Cover";
  };

  return (
    <div>
      <div>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
      <Navbar />
      {bookList.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-6 p-4 mt-24 sm:grid-cols-2 lg:grid-cols-3 lg:ml-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {paginatedBooks.map((book, key) => (
            <MotionBook
              key={key}
              title={book.title}
              author={
                book.author_name
                  ? book.author_name.join(", ")
                  : "Unknown Author"
              }
              publishedYear={book.first_publish_year}
              coverUrl={getBookCoverUrl(book)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div
            className="flex items-center justify-center h-48 text-2xl text-black rounded-lg shadow-md w-96"
            style={{ backgroundColor: "rgb(224 242 254)" }}
          >
            No Books Added
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border mb-4 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default App;
