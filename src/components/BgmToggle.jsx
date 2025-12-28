import { useEffect, useRef, useState } from "react";
import { FiMusic, FiPause } from "react-icons/fi";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/config";

const BgmToggle = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [bgmUrl, setBgmUrl] = useState(null);

  // Fetch BGM URL from Firebase
  useEffect(() => {
    const bgmRef = ref(database, 'portfolio/bgm/audioUrl');
    const unsubscribe = onValue(bgmRef, (snapshot) => {
      const url = snapshot.val();
      if (url && url.trim() !== '') {
        setBgmUrl(url.trim());
      } else {
        setBgmUrl(null);
      }
    }, (error) => {
      console.error("Error fetching BGM URL:", error);
      setBgmUrl(null);
    });

    return () => unsubscribe();
  }, []);

  const initAudio = () => {
    if (!audioRef.current && bgmUrl) {
      const audio = new Audio(bgmUrl);
      audio.loop = true;
      audio.preload = "none";
      audioRef.current = audio;
    }
  };

  const togglePlay = async () => {
    if (hasError || !bgmUrl) return;
    initAudio();
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Unable to play BGM:", error);
      setHasError(true);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Only render the button if there's an audio URL configured
  if (!bgmUrl) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={togglePlay}
      className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500 dark:border-slate-700 dark:text-slate-200"
      disabled={hasError}
      title={hasError ? "Unable to play audio" : "Toggle ambient BGM"}
    >
      {isPlaying ? <FiPause className="h-4 w-4" /> : <FiMusic className="h-4 w-4" />}
      <span>{isPlaying ? "Pause BGM" : "Play BGM"}</span>
    </button>
  );
};

export default BgmToggle;
