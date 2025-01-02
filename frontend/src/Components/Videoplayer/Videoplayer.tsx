import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  urls: { SD: string; HD: string; FHD: string };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ urls }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null); // Ref to hold the HLS instance
  type Quality = 'SD' | 'HD' | 'FHD';
  const [currentQuality, setCurrentQuality] = useState<Quality>("FHD");

  useEffect(() => {
    const initializePlayer = (source: string) => {
      if (videoRef.current) {
        if (Hls.isSupported()) {
          if (!hlsRef.current) {
            const hls = new Hls();
            hlsRef.current = hls;
            hls.attachMedia(videoRef.current);
          }
          hlsRef.current.loadSource(source);
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
          // Fallback for Safari
          videoRef.current.src = source;
        }
      }
    };

    initializePlayer(urls[currentQuality as Quality]);
    initializePlayer(urls[currentQuality]);

    return () => {
      // Cleanup the HLS instance when component unmounts
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentQuality, urls]);

  const handleQualityChange = (quality: string) => {
    setCurrentQuality(quality as Quality); // Update the quality state
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        autoPlay
      />
      <div className="absolute bottom-2 right-2 flex gap-2 bg-black bg-opacity-50 p-2 rounded">
        {Object.keys(urls).map((quality) => (
          <button
            key={quality}
            className={`px-2 py-1 text-sm ${
              currentQuality === quality
                ? "bg-white text-black font-bold"
                : "bg-gray-500 text-white"
            } rounded`}
            onClick={() => handleQualityChange(quality)}
          >
            {quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
