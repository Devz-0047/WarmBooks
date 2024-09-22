import Stars from "./Stars";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";

const shakeAnimation = {
  whileHover: {
    x: ["0%", "-10%", "10%", "-10%", "10%", "-5%", "5%", "0%"],
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      x: { duration: 0.5, ease: "easeInOut" },
      rotate: { duration: 0.5, ease: "easeInOut" },
    },
    color: "red",
  },
};

const flipAnimation = {
  hidden: { rotateY: 180, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
  flipBack: { rotateY: 180, opacity: 1, transition: { duration: 0.6 } },
};

const Book = forwardRef(
  (
    {
      title,
      author,
      publishedYear,
      coverUrl,
      description,
      handleDelete,
      bookKey,
    },
    ref
  ) => {
    const [viewDis, setViewDis] = useState(false);

    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center gap-6 p-12 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-lg sm:flex-row hover:shadow-xl"
        layout
        variants={flipAnimation}
        initial="hidden"
        animate={viewDis ? "flipBack" : "visible"}
        style={{ perspective: "1000px" }} // Add perspective for 3D effect
      >
        <motion.div
          className="w-full h-full"
          style={{ rotateY: viewDis ? 180 : 0 }}
        >
          {!viewDis ? (
            <div className="flex flex-row gap-4 justify-evenly align-center">
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
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {title}
                </h3>
                <p className="mb-1 text-gray-600">
                  <span className="font-medium text-gray-700">Author:</span>{" "}
                  {author}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Published:</span>{" "}
                  {publishedYear}
                </p>

                <motion.button
                  onClick={() => setViewDis(!viewDis)}
                  className="font-medium text-gray-700"
                  whileHover={{ scale: 1.1, color: "#2257bf" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {" "}
                  <p className="mt-1 mb-1 text-base font-semibold text-gray-600">
                    Read Description
                  </p>
                </motion.button>

                <div className="flex flex-row items-center justify-start pt-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Stars />
                  </motion.div>
                  <motion.div
                    whileHover={shakeAnimation.whileHover}
                    whileTap={{ scale: 0.9 }}
                    className="ml-auto"
                  >
                    <button onClick={() => handleDelete(bookKey)}>
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between gap-6">
              <div className="flex justify-center">
                {description.length > description.slice(0, 300).length
                  ? description.slice(0, 300) + " . . ."
                  : description}
              </div>
              <div className="mb-auto">
                <motion.button
                  whileHover={{ scale: 1.1, color: "#2257bf" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewDis(!viewDis)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  }
);

Book.displayName = "Book";
export default Book;
