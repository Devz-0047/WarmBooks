import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
const createArray = (length) => [...Array(length)];
export default function Stars({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);

  return (
    <div className="flex items-center justify-start">
      {createArray(totalStars).map((n, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.6 }}
          whileTap={{ scale: 1.4 }}
        >
          <Star
            key={i}
            selected={hoveredStars ? hoveredStars > i : selectedStars > i}
            onSelect={() => setSelectedStars(i + 1)}
            onHover={() => setHoveredStars(i + 1)}
            onHoverOut={() => setHoveredStars(0)}
          />
        </motion.div>
      ))}
      <p className="px-2 font-semibold">
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
}

const Star = ({
  selected = false,
  onSelect = (f) => f,
  onHover = (f) => f,
  onHoverOut = (f) => f,
}) => (
  <FaStar
    color={selected ? "#2257BF" : "grey"}
    onClick={onSelect}
    onMouseEnter={onHover}
    onMouseLeave={onHoverOut}
  />
);
