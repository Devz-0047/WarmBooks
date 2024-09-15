import { useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "./assets/logo.png";

function BookSearch() {
  // State to hold the current search query entered by the user
  const [searchBook, setSearchBook] = useState("");
  // State to store the list of books fetched from the API
  const [books, setBooks] = useState([]);
  // State to show loading indicator when data is being fetched
  const [loading, setLoading] = useState(false);
  // State to handle any errors during the API request
  const [error, setError] = useState(null);
  // State to store the selected book when a user clicks on a book suggestion
  const [selectedBook, setSelectedBook] = useState(null);
  // Ref to focus the search input on page load
  const inputRef = useRef(null);

  // Effect to fetch books whenever the user types in the search bar
  useEffect(() => {
    let cancel;

    // Async function to fetch books from the OpenLibrary API
    const fetchBooks = async () => {
      // If the search query is empty, clear the book list and return early
      if (searchBook.trim() === "") {
        setBooks([]);
        return;
      }

      // Start loading, and clear any previous errors
      setLoading(true);
      setError(null);

      try {
        // Cancel the previous API request if it's still pending
        if (cancel) cancel();

        // Make the API call to OpenLibrary to search for books
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            searchBook
          )}&fields=title,author_name,cover_i,first_publish_year`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );

        // Limit the results to 5 books to reduce data load
        setBooks(response.data.docs.slice(0, 5));
      } catch (err) {
        // If the request was canceled, do nothing
        if (axios.isCancel(err)) {
          console.log("Previous request canceled");
        } else {
          // If another error occurred, set the error message
          setError("Failed to fetch books");
        }
      } finally {
        // Stop the loading indicator after the request is completed
        setLoading(false);
      }
    };

    // Debounce mechanism: wait for 300ms after the user stops typing to make the API request
    const debounceFetch = setTimeout(() => {
      if (searchBook) fetchBooks();
    }, 300);

    // Cleanup: clear the timeout when the component is unmounted or when searchBook changes
    return () => clearTimeout(debounceFetch);
  }, [searchBook]); // Effect runs whenever searchBook changes

  // Effect to automatically focus the input field when the component mounts
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, []);

  // Function to handle form submission, for example, when the user presses Enter
  const handleForm = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    console.log("Selected book:", selectedBook); // Log the selected book (if any)
  };

  // Function to handle when a user clicks on a book from the suggestions
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book state
    setSearchBook(book.title); // Update the search input with the selected book title
    setBooks([]); // Clear the suggestions after selection
  };

  // Function to get the book cover URL (if available) or a placeholder image
  const getBookCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`; // Use 'M' for medium size cover
    }
    return "https://via.placeholder.com/150x200?text=No+Cover"; // Placeholder if no cover image
  };

  return (
    <div
      className="flex flex-row items-center pb-4 justify-evenly"
      style={{ backgroundColor: "#2257bf" }}
    >
      {/* Logo */}
      <img src={logo} alt="logo" className="h-20 pt-2 pl-6 w-18" />

      {/* Search form */}
      <form
        className="relative flex items-center justify-center gap-2 pt-4"
        onSubmit={handleForm}
      >
        {/* Search input field */}
        <input
          placeholder="Search a book or author"
          type="text"
          value={searchBook} // The current value typed by the user
          className="flex-shrink-0 p-2 px-12 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchBook(e.target.value)} // Update state when typing
          ref={inputRef} // Use the ref to focus on this input
        />

        {/* Submit button (magnifying glass icon) */}
        <button className="flex-shrink-0" type="submit">
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
        </button>

        {/* Show loading message if data is being fetched */}
        {loading && (
          <p className="absolute mt-2 text-sm text-gray-500">Loading...</p>
        )}

        {/* Show error message if there was an error during the API call */}
        {error && <p className="absolute mt-2 text-red-500">{error}</p>}

        {/* Show book suggestions in a dropdown if available */}
        {!loading && books.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border rounded-lg shadow-lg top-14 max-h-60">
            {books.map((book) => (
              <li
                key={book.key} // Use book key as a unique identifier
                onClick={() => handleBookClick(book)} // Select the book on click
                className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-100"
              >
                {/* Display the book cover image */}
                <img
                  src={getBookCoverUrl(book)}
                  alt={book.title}
                  className="w-12 h-16 mr-4"
                />
                {/* Display the book title and author */}
                <div>
                  <strong>{book.title}</strong>
                  <p className="text-sm text-gray-600">
                    {book.author_name?.join(", ")}{" "}
                    {/* Join multiple authors with a comma */}
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

export default BookSearch;
