import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Initializing Security Protocols...",
  "Calibrating Neural Sensors...",
  "Establishing Secure Connection...",
  "Vision Online."
];

export default function IntroLoader({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    if (index < messages.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        document.body.style.overflow = 'auto'; // Restore scroll
        onComplete();
      }, 1500);
      return () => clearTimeout(finalTimer);
    }
  }, [index, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }} // Slow dramatic fade to reveal the bright camera
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 border-2 border-slate-700 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 border-2 border-t-transparent border-r-transparent border-b-blue-400 border-l-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
        </div>

        {/* Text Sequence */}
        <div className="h-8 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-slate-300 font-mono tracking-widest uppercase text-sm md:text-base font-bold"
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
