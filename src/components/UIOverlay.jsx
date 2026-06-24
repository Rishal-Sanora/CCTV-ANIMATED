import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function UIOverlay({ part, onClose }) {
  if (!part) return null;

  const leftPos = parseFloat(part.position.left);
  const topPos = parseFloat(part.position.top);

  // Smart horizontal positioning to prevent clipping
  let horizontalStyle = {};
  let arrowStyle = {};
  if (leftPos > 60) {
    horizontalStyle = { right: '50%', marginRight: '-2rem' };
    arrowStyle = { right: '1rem' };
  } else if (leftPos < 40) {
    horizontalStyle = { left: '50%', marginLeft: '-2rem' };
    arrowStyle = { left: '1rem' };
  } else {
    horizontalStyle = { left: '50%', transform: 'translateX(-50%)' };
    arrowStyle = { left: '50%', transform: 'translateX(-50%)' };
  }

  // Smart vertical positioning to prevent clipping
  let verticalStyle = {};
  if (topPos < 50) {
    // Place below
    verticalStyle = { top: '100%', marginTop: '1rem' };
    arrowStyle.top = '-0.5rem';
    arrowStyle.borderTop = '1px solid rgba(255,255,255,0.2)';
    arrowStyle.borderLeft = '1px solid rgba(255,255,255,0.2)';
  } else {
    // Place above
    verticalStyle = { bottom: '100%', marginBottom: '1rem' };
    arrowStyle.bottom = '-0.5rem';
    arrowStyle.borderBottom = '1px solid rgba(255,255,255,0.2)';
    arrowStyle.borderRight = '1px solid rgba(255,255,255,0.2)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: topPos < 50 ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
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
        {/* The little pointer arrow */}
        <div 
          className="absolute w-4 h-4 bg-slate-900/95 backdrop-blur-3xl rotate-45 z-[-1]"
          style={arrowStyle}
        ></div>
        
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
