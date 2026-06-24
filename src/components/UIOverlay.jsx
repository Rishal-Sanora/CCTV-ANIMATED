import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function UIOverlay({ part, onClose }) {
  if (!part) return null;

  const leftPos = parseFloat(part.position.left);
  const topPos = parseFloat(part.position.top);

  // Smart horizontal positioning to prevent clipping
  let horizontalStyle = {};
  if (leftPos > 50) {
    // For parts on the right side of the screen, show card on their left
    horizontalStyle = { right: '70%', marginRight: '1rem' };
  } else {
    // For parts on the left side of the screen, show card on their right
    horizontalStyle = { left: '70%', marginLeft: '1rem' };
  }

  // Vertically center the card relative to the massive hitbox
  let verticalStyle = { top: '50%', transform: 'translateY(-50%)' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: topPos < 50 ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1.25, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: topPos < 50 ? -10 : 10 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute z-50 pointer-events-auto"
      style={{
        ...horizontalStyle,
        ...verticalStyle
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-80 bg-slate-900/95 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* We remove the tiny pointer arrow since the card now elegantly floats next to the entire part */}
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-3 pr-6 text-white relative z-10">{part.name}</h2>
        <p className="text-slate-200 font-medium text-sm mb-6 leading-relaxed relative z-10">{part.desc}</p>
        
        <div className="space-y-4 border-t border-white/10 pt-6">
          <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4 relative z-10">Specifications</h3>
          <ul className="space-y-3">
            {part.specs.map((spec, i) => (
              <li key={i} className="flex items-center text-sm font-bold text-white">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
