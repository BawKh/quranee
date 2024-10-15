import React, { useRef, useEffect } from "react";

const AyahAudioPlayer = ({
  ayah,
  index,
  totalAyahs,
  activeAyah,
  setActiveAyah,
  audioUrl,
  surahNumber,
  isPlaying,
  setisPlaying,
  setPlayed,
}) => {
  const audioRef = useRef(null);

  // Play the selected ayah
  const playAudio = () => {
    if (audioRef.current) {
      setActiveAyah(index); // Set the current ayah as active
      audioRef.current.pause(); // Pause any currently playing audio
      audioRef.current.currentTime = 0; // Reset audio to the beginning
      const playPromise = audioRef.current.play(); // Try to play the new ayah
      setisPlaying(true); // Update the playing state
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Play request was interrupted or failed:", error);
        });
      }
    }
  };

  // Sync play/pause state with the isPlaying prop
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && activeAyah === index) {
        audioRef.current.play().catch((error) => {
          console.error("Play failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeAyah, index]);

  // Handle when the ayah finishes playing
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleAudioEnd = () => {
      if (index < totalAyahs - 1) {
        setActiveAyah(index + 1); // Set the next ayah as active
        setisPlaying(true); // Start playing the next ayah
      } else {
        setisPlaying(false); // Stop if it’s the last ayah
      }
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, [index, totalAyahs, setActiveAyah, setisPlaying]);

  return (
    <div
      className={`ayah d-inline-flex flex-row ms-1 mb-3 ${
        activeAyah === index ? "active" : ""
      }`}
      onClick={() => {
        playAudio();
        setPlayed(true);
      }}
      style={{ cursor: "pointer" }}
    >
      <span className="w-100 link">
        {ayah}
        <span className="d-inline-block after">
          {(index + 1).toString().padStart(3, "0")}
        </span>
      </span>
      <audio
        id={`audio-${surahNumber}-${index}`}
        ref={audioRef}
        src={audioUrl[index]}
        style={{ display: "none" }}
        preload="auto"
        onError={(e) => console.error(`Error loading audio: ${e.target.src}`)}
      />
    </div>
  );
};

export default AyahAudioPlayer;
