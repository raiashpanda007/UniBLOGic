interface Descriptions_ComponentProps {
  text: string;
  text_length?: number;
  needShowmore: boolean
}
import { useState } from "react";

function Descriptions_Component({ text, text_length = 120,needShowmore=true }: Descriptions_ComponentProps) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  const shouldTruncate = text.length > text_length;
  const displayedText = shouldTruncate && !showFullText ? text.slice(0, text_length) + '...' : text;

  return (
    <div className={text?'w-full p-2 rounded font-medium dark:text-white':'hidden font-poppins'}>
      <p>{displayedText}</p>
      {shouldTruncate && needShowmore && (
        <span onClick={toggleShowMore} className="text-blue-500 cursor-pointer">
          {showFullText ? "Show Less" : "Show More"}
        </span>
      )}
    </div>
  );
}

export default Descriptions_Component;