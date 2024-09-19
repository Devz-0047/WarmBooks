import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "./assets/logo.png";
import { BookContext } from "./BookProvider";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

function Navbar() {
  const [searchBook, setSearchBook] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSelectedBook } = useContext(BookContext);
  const inputRef = useRef(null);

  useEffect(() => {
    let cancel;

    const fetchBooks = async () => {
      if (searchBook.trim() === "") {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (cancel) cancel();

        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            searchBook
          )}&fields=title,author_name,cover_i,first_publish_year`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );

        setBooks(response.data.docs.slice(0, 5));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Previous request canceled");
        } else {
          setError("Failed to fetch books");
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (searchBook) fetchBooks();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchBook]);

  // Auto focus the input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Listen for 'Esc' key to close the dropdown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setBooks([]); // Close the list on Esc
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setSearchBook("");
    setBooks([]); // Close the list when form is submitted
  };

  const handleBookClick = (book) => {
    setSelectedBook((prevSelectedBooks) => [...prevSelectedBooks, book]);
    setSearchBook(book.title); // Populate the search bar with the book title
    setBooks([]); // Close the list after selection
    setSearchBook("");
    toast.success("Book added Successfully!");
  };

  const getBookCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return "https://via.placeholder.com/150x200?text=No+Cover";
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 flex flex-row items-center w-full p-3 bg-white shadow-md justify-evenly position:fixed border-spacing-y-1.5 "
      style={{ backgroundColor: "#2257bf" }}
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        src={logo}
        alt="logo"
        className="h-12 pt-2 w-14 sm:h-20 sm:w-40 sm:pl-6 "
      />

      <form
        className="relative flex items-center justify-center gap-2 pt-4"
        onSubmit={handleForm}
      >
        <motion.input
          placeholder="Search a book"
          type="text"
          value={searchBook}
          className="flex-shrink-0 p-0.5  px-3 ml-4 mr-4 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 sm:px-12"
          onChange={(e) => setSearchBook(e.target.value)}
          ref={inputRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <span>
          <motion.button
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 1.2 }}
            onClick={() => setSearchBook("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </span>

        {/* Conditionally render either the loading spinner or the search icon */}
        {loading ? (
          <svg
            className="w-6 h-6 ml-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path d="M4 12a8 8 0 0 1 8-8v8H4z" fill="currentColor" />
          </svg>
        ) : (
          <motion.button
            className="flex-shrink-0 ml-4"
            type="submit"
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 1.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </motion.button>
        )}

        {error && toast.error(`${error}`)}

        {!loading && books.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border rounded-lg shadow-lg top-14 max-h-60">
            {books.map((book) => (
              <li
                key={book.key}
                onClick={() => handleBookClick(book)}
                className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={getBookCoverUrl(book)}
                  alt={book.title}
                  className="w-12 h-16 mr-4"
                />
                <div>
                  <strong>{book.title}</strong>
                  <p className="text-sm text-gray-600">
                    {book.author_name?.join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default Navbar;
