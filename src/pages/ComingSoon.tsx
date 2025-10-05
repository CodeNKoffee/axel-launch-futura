import { useState, useEffect } from 'react';
import { Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import axelLogo from '@/assets/axel-logo.png';
import racingBg1 from '@/assets/racing-bg-1.jpg';
import racingBg2 from '@/assets/racing-bg-2.jpg';
import { MusicPlayer } from '@/components/ui/music-player';

const ComingSoon = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const backgrounds = [racingBg1, racingBg2];

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
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Dynamic Background Images */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
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
      <div className="absolute inset-0 hero-overlay" />

      {/* Music Player */}
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
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <img
                  src={axelLogo}
                  alt="AXEL Logo"
                  className="w-full h-full"
                />
              </motion.div>
            </div>

            {/* Tagline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in gradient-text">
              Racing into the Future
            </h1>

            {/* Coming Soon Notice */}
            <div className="mb-8 fade-in-delay">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-white pulse-glow">
                Launching Soon
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Full site coming Fall 2025
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto fade-in-delay">
              AXEL (Autonomous eXperimental Engineering Lab) is pushing the boundaries of 
              autonomous racing technology at the intersection of AI and motorsport.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-6">Follow our journey</p>
            <div className="flex justify-center space-x-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 racing-glow p-2 rounded-full hover:bg-secondary/20"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;