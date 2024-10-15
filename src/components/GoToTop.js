import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // You can use any icon library

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="go-to-top">
      {isVisible && (
        <div onClick={scrollToTop} className="go-to-top-button">
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default GoToTopButton;
