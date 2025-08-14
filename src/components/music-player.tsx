"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className={`w-16 h-16 rounded-full transition-all duration-300 hover:scale-110 ${
          isPlaying ? "animate-spin" : ""
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <Image
          src="/Music.svg"
          alt="Music player"
          width={64}
          height={64}
          className="w-full h-full"
        />
      </button>
      <audio ref={audioRef} loop preload="metadata">
        <source src="/placeholder-wedding-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
