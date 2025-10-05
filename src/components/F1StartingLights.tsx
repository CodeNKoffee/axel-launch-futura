import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import axelLogo from '@/assets/axel-logo.png';

interface F1StartingLightsProps {
  onComplete: () => void;
}

export const F1StartingLights: React.FC<F1StartingLightsProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    // Fade out the entire intro after the animations
    timeline.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '+=5.0');

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Horizontal Speed Lines - Racing Motion Blur */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${(i / 30) * 100}%`,
              left: '-100%',
              width: '200%',
            }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '100%',
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 1.8,
              delay: i * 0.03,
              ease: 'easeIn',
              repeat: 2,
              repeatDelay: 0.4
            }}
          />
        ))}
      </div>

      {/* Central Logo with Dramatic Zoom */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ 
          scale: [0.3, 1.1, 1],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.75, 1],
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {/* Rotating Ring Accent */}
        <motion.div
          className="absolute inset-0 -m-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            ease: 'linear',
            repeat: Infinity
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/40 border-r-accent/40" />
        </motion.div>

        {/* Pulsing Glow Background */}
        <motion.div
          className="absolute inset-0 -m-16 rounded-full bg-primary/20 blur-[60px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Logo */}
        <motion.img
          src={axelLogo}
          alt="AXEL"
          className="w-48 h-48 md:w-64 md:h-64 relative z-10"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(33, 150, 243, 0.6))'
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 40px rgba(33, 150, 243, 0.6))',
              'drop-shadow(0 0 60px rgba(76, 175, 80, 0.6))',
              'drop-shadow(0 0 40px rgba(33, 150, 243, 0.6))'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* Corner Racing Brackets */}
      {[
        { position: 'top-8 left-8', rotate: 0 },
        { position: 'top-8 right-8', rotate: 90 },
        { position: 'bottom-8 right-8', rotate: 180 },
        { position: 'bottom-8 left-8', rotate: 270 }
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position}`}
          style={{ rotate: `${corner.rotate}deg` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1.2] }}
          transition={{
            duration: 4,
            delay: 0.5,
            times: [0, 0.2, 0.8, 1],
            ease: 'easeOut'
          }}
        >
          <div className="w-20 h-20 border-l-4 border-t-4 border-primary/60" />
        </motion.div>
      ))}

      {/* Bottom Text Reveal */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 1, 0], y: [20, 0, 0, 0, -10] }}
        transition={{
          duration: 5.5,
          delay: 1.5,
          times: [0, 0.15, 0.3, 0.75, 1],
          ease: 'easeOut'
        }}
      >
        <div className="text-center">
          <motion.p 
            className="text-white/80 text-sm md:text-base tracking-[0.15em] font-light mb-3 italic mx-auto"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            "The will to win is nothing without the will to prepare"
          </motion.p>
          <motion.div 
            className="h-[1px] w-40 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"
            animate={{ scaleX: [0, 1, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 5.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black pointer-events-none" />
    </motion.div>
  );
};
