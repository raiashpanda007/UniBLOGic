import React, { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';


const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative top-48 flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-lg shadow-md">
      {/* Attachment Icon */}
      <label htmlFor="file-input" className="cursor-pointer">
        {/* <FiPaperclip className="text-gray-400 mr-3" size={20} /> */} file
        <input 
          type="file" 
          id="file-input" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="hidden"
        />
      </label>

      {/* Message Text Input */}
      <Input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Message ChatGPT"
        className="bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 flex-grow"
      />

      {/* Send Button */}
      <button 
        type="submit"
        className="ml-3 text-gray-400 hover:text-gray-200 transition-colors"
        onClick={() => {
          // Handle send action
          console.log("Message sent:", message);
          if (image) console.log("Image attached:", image);
          setMessage(''); // Clear input after send
        }}
      >
        {/* <FiSend size={20} /> */}
        Send
      </button>
    </div>
  );
};

export default Chat;
