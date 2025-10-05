"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  title: string;
  artist: string;
  src: string;
}

// F1 Movie Soundtrack by Daniel Pemberton
const tracks: Track[] = [
  { title: 'Main Titles', artist: 'Daniel Pemberton', src: '/songs/Main%20Titles.mp3' },
  { title: 'Race Ready', artist: 'Daniel Pemberton', src: '/songs/Race%20Ready.mp3' },
  { title: 'Lights Out', artist: 'Daniel Pemberton', src: '/songs/Lights%20Out.mp3' },
  { title: 'Full Throttle', artist: 'Daniel Pemberton', src: '/songs/Full%20Throttle.mp3' },
  { title: 'Apex Legends', artist: 'Daniel Pemberton', src: '/songs/Apex%20Legends.mp3' },
  { title: 'Podium Finish', artist: 'Daniel Pemberton', src: '/songs/Podium%20Finish.mp3' }
];

const fmt = (s: number) => {
  if (!isFinite(s)) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

interface MusicPlayerProps { hidden?: boolean }

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ hidden }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [history, setHistory] = useState<number[]>([]); // for back navigation when shuffled
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const current = tracks[index];

  const onLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
    setError(null);
  };
  const onTime = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };
  const onEnded = () => {
    if (repeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }
    next();
  };

  const onError = () => {
    setError('Audio unavailable');
  };

  const play = useCallback(() => { setIsPlaying(true); audioRef.current?.play(); }, []);
  const pause = useCallback(() => { setIsPlaying(false); audioRef.current?.pause(); }, []);
  const toggle = useCallback(() => { (isPlaying ? pause : play)(); }, [isPlaying, pause, play]);

  const next = useCallback(() => {
    setIndex(i => {
      if (shuffle) {
        const choices = tracks.map((_, idx) => idx).filter(idx => idx !== i);
        const rand = choices[Math.floor(Math.random() * choices.length)] ?? i;
        setHistory(h => [...h, i]);
        return rand;
      }
      return (i + 1) % tracks.length;
    });
  }, [shuffle]);
  const prev = useCallback(() => {
    setIndex(i => {
      if (shuffle && history.length) {
        const clone = [...history];
        const last = clone.pop() as number;
        setHistory(clone);
        return last;
      }
      return (i - 1 + tracks.length) % tracks.length;
    });
  }, [shuffle, history]);

  // Track index change handling (retain duration when only play/pause toggles)
  const prevIndexRef = useRef(index);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const indexChanged = prevIndexRef.current !== index;
    if (indexChanged) {
      setDuration(0);
      setCurrentTime(0);
      if (isPlaying) {
        const id = setTimeout(() => { a.play().catch(()=>{}); }, 60);
        prevIndexRef.current = index;
        return () => clearTimeout(id);
      }
      prevIndexRef.current = index;
    }
  }, [index, isPlaying]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.code === 'Space') { e.preventDefault(); toggle(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [toggle]);

  const remaining = Math.max(0, duration - currentTime);
  const progress = duration ? currentTime / duration : 0;

  // If first track already has metadata and user presses play quickly, ensure duration/time display updates.
  useEffect(() => {
    const a = audioRef.current;
    if (isPlaying && a && a.readyState >= 1 && duration === 0) {
      setDuration(a.duration || 0);
    }
  }, [isPlaying, duration]);

  return (
    <AnimatePresence>
      <motion.div
        key="music-player"
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: hidden ? 400 : (isCollapsed ? 320 : 0), opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 right-0 z-40 h-screen w-80 ${hidden ? 'pointer-events-none select-none' : ''}`}
        aria-hidden={hidden}
      >
        {/* Floating Toggle Button - visible when collapsed */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isCollapsed ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`absolute -left-12 top-1/2 -translate-y-1/2 h-24 w-12 rounded-l-2xl border border-r-0 border-primary/30 bg-gradient-to-br from-black/95 to-black/80 backdrop-blur-xl flex items-center justify-center hover:border-primary/60 shadow-[-4px_0_20px_rgba(33,150,243,0.1)] ${isCollapsed ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onClick={() => setIsCollapsed(false)}
          aria-label="Open music player"
        >
          <div className="flex flex-col items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </motion.button>

        <div className="relative h-full overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-xl border-l border-primary/20 flex flex-col shadow-[-8px_0_30px_rgba(33,150,243,0.15)]">
          {/* Racing stripe accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-70" />
          
          {/* Close/Collapse Button */}
          <motion.button
            onClick={() => setIsCollapsed(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-4 z-50 h-8 w-8 rounded-lg border border-primary/30 bg-secondary/50 flex items-center justify-center hover:border-primary hover:bg-primary/10 group"
            aria-label="Collapse music player"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary transition-colors">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
          
          {/* Header */}
          <div className="relative p-6 border-b border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Now Playing</h3>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold text-white truncate mb-1" title={current.title}>
                {current.title}
              </h2>
              <p className="text-sm text-muted-foreground truncate" title={current.artist}>
                {current.artist}
              </p>
              <p className="text-xs text-primary/60 mt-1">F1 Movie Soundtrack</p>
            </div>
          </div>

          {/* Waveform visualization placeholder */}
          <div className="relative px-6 py-4 border-b border-primary/10">
            <div className="flex items-end justify-between h-12 gap-1">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t transition-all duration-150"
                  style={{
                    height: `${isPlaying ? 20 + Math.random() * 80 : 20}%`,
                    opacity: isPlaying ? 0.4 + Math.random() * 0.6 : 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="relative px-6 py-4 border-b border-primary/10">
            <div className="mb-2 flex justify-between text-xs font-mono text-muted-foreground">
              <span>{fmt(currentTime)}</span>
              <span>-{fmt(remaining)}</span>
            </div>
            <div className="relative h-2 group cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-secondary/50 overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-[width] duration-150 ease-linear" 
                  style={{ width: `${progress * 100}%` }} 
                />
              </div>
              <input 
                aria-label="Seek" 
                type="range" 
                min={0} 
                max={duration || 0} 
                step={0.1} 
                value={currentTime} 
                onChange={(e)=>{ const val = Number(e.target.value); if(audioRef.current) audioRef.current.currentTime = val; setCurrentTime(val); }} 
                className="absolute inset-0 w-full opacity-0 cursor-pointer" 
              />
            </div>
          </div>

          {/* Transport Controls */}
          <div className="relative px-6 py-6 flex items-center justify-center gap-4">
            <button 
              aria-label="Previous" 
              onClick={prev} 
              className="h-12 w-12 rounded-full border border-primary/30 bg-secondary/50 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 racing-glow group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-primary transition-colors">
                <path d="M19 20L9 12l10-8v16Z"/>
                <path d="M5 19V5"/>
              </svg>
            </button>
            
            <button 
              aria-label={isPlaying ? 'Pause' : 'Play'} 
              onClick={toggle} 
              className="h-16 w-16 rounded-full border-2 border-primary bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center hover:from-primary/40 hover:to-accent/40 transition-all duration-300 shadow-[0_0_30px_rgba(33,150,243,0.4)] hover:shadow-[0_0_50px_rgba(33,150,243,0.6)] group"
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary group-hover:scale-110 transition-transform">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-primary group-hover:scale-110 transition-transform ml-1">
                  <path d="M6 4v16l13-8-13-8Z" />
                </svg>
              )}
            </button>
            
            <button 
              aria-label="Next" 
              onClick={next} 
              className="h-12 w-12 rounded-full border border-primary/30 bg-secondary/50 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 racing-glow group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-primary transition-colors">
                <path d="M5 4l10 8-10 8V4Z"/>
                <path d="M19 5v14"/>
              </svg>
            </button>
          </div>

          {/* Options */}
          <div className="relative px-6 py-4 flex items-center justify-between border-t border-primary/10">
            <button 
              aria-label="Toggle Shuffle" 
              onClick={() => setShuffle(s => !s)} 
              className={`h-10 w-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                shuffle 
                  ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(33,150,243,0.3)]' 
                  : 'border-primary/30 bg-secondary/30 text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
            > 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 4h2v4" />
                <path d="M4 4h5l5 8 3 4h3" />
                <path d="M18 20h2v-4" />
                <path d="M4 20h5l2.5-4" />
              </svg>
            </button>
            
            <button 
              aria-label="Toggle Repeat" 
              onClick={() => setRepeat(r => !r)} 
              className={`h-10 w-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                repeat 
                  ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(33,150,243,0.3)]' 
                  : 'border-primary/30 bg-secondary/30 text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <div className="relative px-6 py-4 border-t border-primary/10">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <div className="relative flex-1 h-2">
                <div className="absolute inset-0 rounded-full bg-secondary/50 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${volume * 100}%` }} />
                </div>
                <input 
                  aria-label="Volume" 
                  type="range" 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  value={volume} 
                  onChange={(e)=>{ const v = Number(e.target.value); setVolume(v); if(audioRef.current) audioRef.current.volume = v; }} 
                  className="absolute inset-0 w-full opacity-0 cursor-pointer" 
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">{Math.round(volume * 100)}</span>
            </div>
          </div>

          {/* Track List */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-2">Playlist</h4>
            {tracks.map((track, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`w-full text-left p-2 rounded-lg transition-all duration-300 ${
                  idx === index
                    ? 'bg-primary/20 border border-primary/30 shadow-[0_0_15px_rgba(33,150,243,0.2)]'
                    : 'hover:bg-secondary/30 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono w-6 ${idx === index ? 'text-primary' : 'text-muted-foreground'}`}>
                    {idx === index && isPlaying ? '▶' : String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${idx === index ? 'text-white font-semibold' : 'text-muted-foreground'}`}>
                      {track.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <div className="px-6 py-2 border-t border-destructive/20 bg-destructive/10">
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <audio
            ref={audioRef}
            src={current.src}
            onLoadedMetadata={onLoaded}
            onTimeUpdate={onTime}
            onEnded={onEnded}
            onError={onError}
            preload="metadata"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;
