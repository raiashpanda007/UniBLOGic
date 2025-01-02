import React, { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string; // The text to animate
  interval: number; // Time in milliseconds between each character
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, interval }) => {
  const [displayedText, setDisplayedText] = useState(""); // Holds the currently displayed text
  const [index, setIndex] = useState(0); // Tracks the current character index

  useEffect(() => {
    const animate = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        // Restart the animation after a short pause
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 1000);
      }
    };

    const intervalId = setInterval(animate, interval);

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [index, text, interval]);

  return <div>{displayedText}</div>;
};

export default AnimatedText;
