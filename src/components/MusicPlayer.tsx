"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  Pause,
  Play,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type PlayerState = "playing" | "paused" | "loading";

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "#0d0d0f" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Music note icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #A78BFA 0%, #D946EF 50%, #EC4899 100%)",
              boxShadow: "0 0 40px rgba(139,92,246,0.5)",
            }}
          >
            <img 
              src="/pic/music_note.png" 
              alt="Music" 
              width={40} 
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 overflow-hidden">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            Ready to vibe?
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}
          >
            Your music player is loading...
          </motion.p>
        </div>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(139,92,246,0.7)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Equalizer Bars ───────────────────────────────────────────────────────────
function EqualizerBars({ state }: { state: PlayerState }) {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="flex items-end gap-1" style={{ height: "24px" }}>
      {bars.map((i) => {
        const isPlaying = state === "playing";
        const isLoading = state === "loading";

        return (
          <motion.div
            key={i}
            className="w-1 rounded-sm"
            style={{
              background: isPlaying
                ? "linear-gradient(to top, #7C3AED, #8B5CF6)"
                : "rgba(139,92,246,0.5)",
              transformOrigin: "bottom",
            }}
            animate={{
              height: isPlaying 
                ? ["20%", "80%", "40%", "90%", "30%", "70%", "20%"]
                : isLoading 
                ? "50%" 
                : "20%",
              opacity: isPlaying ? 1 : isLoading ? 0.5 : 0.6,
            }}
            transition={{
              duration: isPlaying ? 1.2 : 0.3,
              repeat: isPlaying ? Infinity : 0,
              ease: isPlaying ? "easeInOut" : "easeOut",
              delay: isPlaying ? i * 0.1 : 0,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Album Art ────────────────────────────────────────────────────────────────
function AlbumArt({ state }: { state: PlayerState }) {
  const scaleMap = { playing: 1, paused: 0.95, loading: 0.9 };

  return (
    <motion.div
      animate={{ scale: scaleMap[state] }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20"
    >
      {/* Rotating ring when playing */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "conic-gradient(from 0deg, #A78BFA, #D946EF, #EC4899, #A78BFA)",
          padding: "2px",
        }}
        animate={{ rotate: state === "playing" ? 360 : 0 }}
        transition={
          state === "playing"
            ? { duration: 20, repeat: Infinity, ease: "linear" }
            : { duration: 0.5 }
        }
      />

      {/* Album cover */}
      <div
        className="absolute inset-0.5 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #9333EA 0%, #EC4899 100%)",
          inset: "2px",
          borderRadius: "10px",
          position: "absolute",
        }}
      >
        <img 
          src="/pic/music_note.png" 
          alt="Album" 
          width={36} 
          height={36}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ 
  state, 
  progress, 
  currentTime, 
  totalDuration, 
  onClick 
}: { 
  state: PlayerState; 
  progress: number;
  currentTime: number;
  totalDuration: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds);
    const secs = Math.floor((seconds % 1) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className="w-full rounded-full overflow-hidden cursor-pointer"
        style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}
        onClick={onClick}
      >
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{
            background:
              state === "playing"
                ? "linear-gradient(to right, #7C3AED, #8B5CF6)"
                : "rgba(139,92,246,0.6)",
          }}
        />
      </div>
      <div
        className="flex justify-between"
        style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(totalDuration)}</span>
      </div>
    </div>
  );
}

// ─── Control Button ───────────────────────────────────────────────────────────
function ControlBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ color: "#ffffff", scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        color: "rgba(255,255,255,0.5)",
        background: "transparent",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </motion.button>
  );
}

// ─── Play/Pause Button ────────────────────────────────────────────────────────
function PlayPauseButton({
  state,
  onToggle,
}: {
  state: PlayerState;
  onToggle: () => void;
}) {
  const isLoading = state === "loading";

  return (
    <motion.button
      onClick={onToggle}
      disabled={isLoading}
      whileHover={!isLoading ? { scale: 1.05 } : {}}
      whileTap={!isLoading ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      animate={{
        background: isLoading
          ? "rgba(100,100,100,0.8)"
          : "linear-gradient(135deg, #7C3AED, #8B5CF6)",
        boxShadow: isLoading
          ? "none"
          : state === "playing"
          ? "0 0 24px rgba(139,92,246,0.6)"
          : "0 0 12px rgba(139,92,246,0.3)",
      }}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "none",
        cursor: isLoading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid rgba(255,255,255,0.3)",
              borderTop: "2px solid white",
              borderRadius: "50%",
            }}
          />
        ) : state === "playing" ? (
          <motion.div
            key="pause"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Pause size={22} fill="white" />
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Play size={22} fill="white" style={{ marginLeft: "2px" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Volume Slider ────────────────────────────────────────────────────────────
function VolumeSlider({ onVolumeChange }: { onVolumeChange?: (volume: number) => void }) {
  const [volume, setVolume] = useState(70);
  const [hovered, setHovered] = useState(false);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    onVolumeChange?.(newVolume);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Volume2 size={14} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
      <div
        className="relative flex-1 rounded-full cursor-pointer"
        style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = ((e.clientX - rect.left) / rect.width) * 100;
          handleVolumeChange(Math.max(0, Math.min(100, pct)));
        }}
      >
        <motion.div
          className="h-full rounded-full"
          animate={{
            width: `${volume}%`,
            background: hovered
              ? "linear-gradient(to right, #7C3AED, #8B5CF6)"
              : "rgba(139,92,246,0.5)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Main Music Player ────────────────────────────────────────────────────────
function MusicPlayer({ 
  currentSongIndex, 
  onSongChange,
  playlist
}: { 
  currentSongIndex: number;
  onSongChange: (index: number) => void;
  playlist: Array<{title: string, artist: string, file: string, duration: number}>;
}) {
  const [playerState, setPlayerState] = useState<PlayerState>("paused");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const currentSong = playlist[currentSongIndex] || playlist[0];
  const totalDuration = currentSong.duration;

  // Progress bar animation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (playerState === "playing") {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1;
          if (newTime >= totalDuration) {
            setPlayerState("paused");
            return 0;
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [playerState, totalDuration]);

  // Update progress percentage
  React.useEffect(() => {
    setProgress((currentTime / totalDuration) * 100);
  }, [currentTime, totalDuration]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds);
    const secs = Math.floor((seconds % 1) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleFixed = () => {
    if (playerState === "loading") return;
    
    console.log("Toggle clicked, current state:", playerState);
    const newState = playerState === "playing" ? "paused" : "playing";
    console.log("Setting new state:", newState);
    setPlayerState(newState);
    
    // Control audio if it exists
    if (audioRef.current) {
      console.log("Audio element exists, trying to", newState);
      if (newState === "playing") {
        audioRef.current.play().catch(err => console.error("Play failed:", err));
      } else {
        audioRef.current.pause();
      }
    } else {
      console.error("Audio element not found!");
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const newTime = (percentage / 100) * totalDuration;
    setCurrentTime(newTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const isPlaying = playerState === "playing";

  return (
    <motion.div
      animate={{
        background:
          isPlaying
            ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(145deg, #111114 0%, #18181b 100%)",
        boxShadow: isPlaying
          ? "0 0 60px rgba(139,92,246,0.25), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 20px 60px rgba(0,0,0,0.5)",
      }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Top row: album art + song info + equalizer */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        <AlbumArt state={playerState} />

        <div className="flex-1 flex flex-col gap-1 sm:gap-1.5 min-w-0">
          <motion.h2
            className="text-sm sm:text-base md:text-lg font-bold text-white truncate"
            style={{
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {currentSong.title}
          </motion.h2>
          <p className="text-xs sm:text-sm text-white/50 truncate" style={{ margin: 0 }}>
            {currentSong.artist}
          </p>
          <div className="mt-1 sm:mt-1.5">
            <EqualizerBars state={playerState} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4 sm:mb-5">
        <ProgressBar 
          state={playerState} 
          progress={progress}
          currentTime={currentTime}
          totalDuration={totalDuration}
          onClick={handleProgressClick}
        />
      </div>

      {/* Controls */}
      <div
        className="flex items-center justify-between mb-3 sm:mb-4"
      >
        <ControlBtn>
          <Shuffle size={16} className="sm:w-[18px] sm:h-[18px]" />
        </ControlBtn>
        <ControlBtn>
          <SkipBack size={18} className="sm:w-[20px] sm:h-[20px]" />
        </ControlBtn>
        <PlayPauseButton state={playerState} onToggle={handleToggleFixed} />
        <ControlBtn>
          <SkipForward size={18} className="sm:w-[20px] sm:h-[20px]" />
        </ControlBtn>
        <ControlBtn>
          <Repeat size={16} className="sm:w-[18px] sm:h-[18px]" />
        </ControlBtn>
      </div>

      {/* Volume */}
      <VolumeSlider onVolumeChange={handleVolumeChange} />

      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentSong.file} 
        preload="auto"
        style={{ display: 'none' }}
        onLoadedData={() => console.log("✅ Audio loaded:", currentSong.file)}
        onError={(e) => {
          const target = e.currentTarget as HTMLAudioElement;
          console.error("❌ Audio error details:", {
            file: currentSong.file,
            src: target.src,
            currentSrc: target.currentSrc,
            networkState: target.networkState,
            readyState: target.readyState,
            error: target.error,
            errorCode: target.error?.code,
            errorMessage: target.error?.message
          });
        }}
        onEnded={() => {
          // Auto-play next song
          if (currentSongIndex < playlist.length - 1) {
            onSongChange(currentSongIndex + 1);
            setCurrentTime(0);
          } else {
            setPlayerState("paused");
            setCurrentTime(0);
          }
        }}
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MusicPlayerPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Playlist - your actual MP3 files from /public/playlist/
  const playlist = [
    { title: "The Scientist", artist: "Coldplay", file: "/playlist/Coldplay - The Scientist.mp3", duration: 316 },
    { title: "Bring Me To Life", artist: "Evanescence", file: "/playlist/Evanescence - Bring Me To Life.mp3", duration: 236 },
    { title: "The Reason", artist: "Hoobastank", file: "/playlist/Hoobastank - The Reason.mp3", duration: 232 },
    { title: "In The End", artist: "Linkin Park", file: "/playlist/Linkin Park - In the End.mp3", duration: 216 },
    { title: "25 Minutes", artist: "Michael Learns To Rock", file: "/playlist/Michael Learns To Rock - 25 Minutes.mp3", duration: 240 },
    { title: "Welcome To The Black Parade", artist: "My Chemical Romance", file: "/playlist/My Chemical Romance - Welcome To The Black Parade.mp3", duration: 311 },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          background: #0d0d0f !important;
          margin: 0;
          padding: 0;
        }
        
        html {
          background: #0d0d0f !important;
        }
      `}</style>
      
      <div
        className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8"
        style={{
          background: "#0d0d0f",
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Ambient background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Playlist button - floating */}
        {!showSplash && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center z-50"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
              border: "none",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
            </svg>
          </motion.button>
        )}

        {/* Playlist Modal */}
        <AnimatePresence>
          {showPlaylist && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPlaylist(false)}
                className="fixed inset-0 bg-black/80 z-40"
              />
              
              {/* Playlist Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
                style={{
                  background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "24px",
                  maxHeight: "70vh",
                  overflow: "auto",
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-xl font-bold">Playlist</h3>
                  <button
                    onClick={() => setShowPlaylist(false)}
                    className="text-white/50 hover:text-white"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                {/* Playlist items */}
                <div className="space-y-2">
                  {playlist.map((song, i) => (
                    <motion.div
                      key={i}
                      onClick={() => {
                        setCurrentSongIndex(i);
                        setShowPlaylist(false);
                      }}
                      whileHover={{ backgroundColor: "rgba(139,92,246,0.1)" }}
                      className="p-3 rounded-lg cursor-pointer transition-colors"
                      style={{ 
                        border: i === currentSongIndex 
                          ? "1px solid rgba(139,92,246,0.5)" 
                          : "1px solid rgba(255,255,255,0.05)",
                        backgroundColor: i === currentSongIndex 
                          ? "rgba(139,92,246,0.15)" 
                          : "transparent"
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white text-sm font-medium">{song.title}</p>
                          <p className="text-white/50 text-xs">{song.artist}</p>
                        </div>
                        <span className="text-white/40 text-xs">{formatTime(song.duration)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" onDone={() => setShowSplash(false)} />
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              className="w-full max-w-[420px]"
            >
              <MusicPlayer 
                currentSongIndex={currentSongIndex}
                onSongChange={setCurrentSongIndex}
                playlist={playlist}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}