import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { motion } from 'framer-motion';
import axelLogo from '@/assets/raven-logo.png';
import racingBg1 from '@/assets/racing-bg-1.jpg';
import racingBg2 from '@/assets/racing-bg-2.jpg';
import ambientVideo from '@/assets/AI Video Generation Bosch Future Mobility - Site.mp4';
import { MusicPlayer } from '@/components/ui/music-player';
import { F1StartingLights } from '@/components/F1StartingLights';
import {
  RoadToAutonomous,
  TechnicalGrid,
  EngineeringScoreboard,
  HardwareSpecs,
  OurJourney,
} from '@/components/sections';

const backgrounds = [racingBg1, racingBg2];

const ComingSoon = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoVisible, setVideoVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Handle video replay with 10 second delay and fade effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Fade out
      setVideoVisible(false);

      setTimeout(() => {
        video.currentTime = 0;
        // Fade in and play
        setVideoVisible(true);
        video.play();
      }, 10000); // 10 second delay before replay
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000); // Change background every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Listen for music player state (check for audio playing in the page)
  useEffect(() => {
    const checkAudioPlaying = () => {
      const audioElements = document.querySelectorAll('audio');
      const anyPlaying = Array.from(audioElements).some(audio => !audio.paused);
      setIsPlaying(anyPlaying);
    };

    const interval = setInterval(checkAudioPlaying, 500);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/ravengp-ai', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/ravengp.ai', label: 'Instagram' },
    // { icon: SiTiktok, href: 'https://tiktok.com/@raven.guc', label: 'TikTok' },
  ];

  return (
    <>
      {/* F1 Starting Lights Intro */}
      {showIntro && <F1StartingLights onComplete={handleIntroComplete} />}

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Ambient Background Video - subtle, atmospheric layer */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover blur-[1px] scale-105"
            style={{ filter: 'saturate(0.8) brightness(0.6)' }}
          >
            <source src={ambientVideo} type="video/mp4" />
          </video>
        </div>

        {/* Dynamic Background Images */}
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-[1] transition-opacity duration-2000 ${index === currentBg ? 'opacity-70' : 'opacity-0'
              }`}
          >
            <img
              src={bg}
              alt="Racing background"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 z-[2] hero-overlay" />

        {/* Music Player - starts collapsed */}
        <MusicPlayer hidden={false} />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <main className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo */}
              <div className="mb-8 fade-in relative">
                <motion.div
                  className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6"
                  initial={{
                    filter: 'drop-shadow(0 0 20px rgba(33, 150, 243, 0.4)) drop-shadow(0 0 40px rgba(33, 150, 243, 0.2))'
                  }}
                  animate={{
                    filter: isPlaying
                      ? [
                        'drop-shadow(0 0 20px rgba(33, 150, 243, 0.6)) drop-shadow(0 0 40px rgba(33, 150, 243, 0.4))',
                        'drop-shadow(0 0 20px rgba(0, 188, 212, 0.6)) drop-shadow(0 0 40px rgba(0, 188, 212, 0.4))',
                        'drop-shadow(0 0 20px rgba(76, 175, 80, 0.6)) drop-shadow(0 0 40px rgba(76, 175, 80, 0.4))',
                        'drop-shadow(0 0 20px rgba(0, 188, 212, 0.6)) drop-shadow(0 0 40px rgba(0, 188, 212, 0.4))',
                        'drop-shadow(0 0 20px rgba(33, 150, 243, 0.6)) drop-shadow(0 0 40px rgba(33, 150, 243, 0.4))'
                      ]
                      : 'drop-shadow(0 0 20px rgba(33, 150, 243, 0.4)) drop-shadow(0 0 40px rgba(33, 150, 243, 0.2))'
                  }}
                  transition={
                    isPlaying
                      ? {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }
                      : {
                        duration: 2,
                        ease: "easeInOut"
                      }
                  }
                >
                  <img
                    src={axelLogo}
                    alt="RAVEN Logo"
                    className="w-full h-full"
                  />
                </motion.div>
              </div>

              {/* Tagline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 fade-in gradient-text racing-headline">
                Intelligence Takes Flight
              </h1>

              {/* Constructor Bio */}
              <div className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto fade-in-delay space-y-2">
                <p className="text-xl md:text-2xl font-semibold text-white">RAVEN GP</p>
                <p>Egypt's First Autonomous Constructor.</p>
                <p>Official Entrant: <a href="https://boschfuturemobility.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">Bosch Future Mobility Challenge 2026</a>.</p>
              </div>
            </div>
          </main>

          {/* Scroll indicator - positioned at absolute bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-0 right-0 z-20 flex justify-center"
          >
            <a
              href="#road-to-autonomous"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-white/70 hover:text-primary transition-colors duration-300"
            >
              Explore
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Page Sections */}
      <div id="road-to-autonomous">
        <RoadToAutonomous />
      </div>
      <TechnicalGrid />
      <EngineeringScoreboard />
      <HardwareSpecs />
      <OurJourney />

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-6">Follow our journey</p>
          <div className="flex justify-center space-x-8 mb-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 racing-glow p-2 rounded-full hover:bg-secondary/20"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>© 2026 RAVEN GP. Intelligence Takes Flight.</p>
            <p>Official Entrant: Bosch Future Mobility Challenge 2026</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ComingSoon;