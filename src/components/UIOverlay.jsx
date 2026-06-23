import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function UIOverlay({ part, onClose }) {
  if (!part) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute z-50 pointer-events-auto"
      style={{
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '1rem'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-80 bg-black/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* The little pointer arrow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black/10 backdrop-blur-sm border-b border-r border-white/20 transform rotate-45 z-[-1]"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-3xl font-heading font-black mb-3 pr-6 text-white">{part.name}</h2>
        <p className="text-slate-300 font-medium text-sm mb-8 leading-relaxed">{part.desc}</p>
        
        <div className="space-y-4 border-t border-white/10 pt-6">
          <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-black mb-4">Specifications</h3>
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
