import Stars from "./Stars";
import { motion } from "framer-motion";
import { forwardRef } from "react";
const Book = forwardRef(({ title, author, publishedYear, coverUrl }, ref) => {
  return (
    <div
      className="flex flex-col items-center gap-6 p-12 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-lg sm:flex-row hover:shadow-xl"
      ref={ref}
    >
      {/* Book Cover */}
      <div className="w-32 h-44">
        <img
          src={coverUrl}
          alt={`${title} cover`}
          className="object-cover w-full h-full "
        />
      </div>

      {/* Book Details */}
      <div className="text-center sm:text-left">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mb-1 text-gray-600">
          <span className="font-medium text-gray-700">Author:</span> {author}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-700">Published:</span>{" "}
          {publishedYear}
        </p>
        <motion.div
          className="flex flex-row items-center justify-center pt-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Stars />
        </motion.div>
      </div>
    </div>
  );
});
Book.displayName = "Book";
export default Book;
