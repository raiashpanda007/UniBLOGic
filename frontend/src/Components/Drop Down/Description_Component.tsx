interface Descriptions_ComponentProps {
  text: string;
  text_length?: number;
}
import { useState } from "react";

function Descriptions_Component({ text, text_length = 120 }: Descriptions_ComponentProps) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  const shouldTruncate = text.length > text_length;
  const displayedText = shouldTruncate && !showFullText ? text.slice(0, text_length) + '...' : text;

  return (
    <div className={text?'w-full p-2  rounded font-medium font-sans dark:text-white':'hidden'}>
      <p>{displayedText}</p>
      {shouldTruncate && (
        <span onClick={toggleShowMore} className="text-blue-500 cursor-pointer">
          {showFullText ? "Show Less" : "Show More"}
        </span>
      )}
    </div>
  );
}

export default Descriptions_Component;