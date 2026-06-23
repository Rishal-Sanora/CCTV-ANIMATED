import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatePresence } from 'framer-motion';
import UIOverlay from './UIOverlay';

export const partsData = [
  {
    id: 'glass',
    position: { top: '50%', left: '15%' },
    name: 'Front Glass',
    desc: 'Chemically strengthened anti-reflective glass with hydrophobic coating to repel water and dust.',
    specs: ['Scratch Resistant', 'Anti-Glare', 'Self-Cleaning Coating']
  },
  {
    id: 'lens',
    position: { top: '55%', left: '25%' },
    name: 'Camera Lens',
    desc: 'Multi-element optical grade lens assembly precision engineered for zero distortion.',
    specs: ['f/1.6 Aperture', '8-Element Glass', 'Auto-Focus Stepper Motor']
  },
  {
    id: 'ir',
    position: { top: '45%', left: '32%' },
    name: 'IR LED Ring',
    desc: 'High-power infrared array providing even illumination for zero-lux environments.',
    specs: ['850nm Wavelength', '30m Range', 'Smart IR Dimming']
  },
  {
    id: 'cmos',
    position: { top: '52%', left: '42%' },
    name: 'CMOS Sensor',
    desc: '1/1.8" progressive scan 8MP CMOS image sensor for crystal clear nighttime recording.',
    specs: ['4K Resolution', 'Low Light Sensitivity', 'HDR Enabled']
  },
  {
    id: 'ai',
    position: { top: '48%', left: '50%' },
    name: 'Neural Processor',
    desc: 'Dedicated AI accelerator for on-device machine learning tasks.',
    specs: ['2 TOPS Processing', 'Human/Vehicle Detection', 'Zero Latency']
  },
  {
    id: 'poe',
    position: { top: '60%', left: '58%' },
    name: 'PoE Module',
    desc: 'Power over Ethernet adapter providing data and power over a single cable.',
    specs: ['802.3af Compliant', 'Surge Protection', '15W Max Draw']
  },
  {
    id: 'sd',
    position: { top: '40%', left: '65%' },
    name: 'MicroSD Slot',
    desc: 'On-board edge storage slot for network-loss redundancy.',
    specs: ['Up to 512GB', 'Class 10 / UHS-I', 'Auto-Overwrite']
  },
  {
    id: 'seal',
    position: { top: '65%', left: '72%' },
    name: 'Weather Seal',
    desc: 'Military-spec silicon gasket preventing moisture and dust ingress.',
    specs: ['IP66 Rating', 'Temperature Resistant', 'Anti-Corrosion']
  },
  {
    id: 'housing',
    position: { top: '50%', left: '80%' },
    name: 'Main Housing',
    desc: 'Die-cast aerospace aluminum chassis acting as a thermal heatsink.',
    specs: ['IP66 Rated', 'IK10 Vandal Proof', 'Thermal Dissipation']
  },
  {
    id: 'mount',
    position: { top: '65%', left: '90%' },
    name: 'Articulated Mount',
    desc: 'Heavy-duty 3-axis bracket allowing infinite adjustment angles.',
    specs: ['360° Rotation', '90° Tilt', 'Tamper-Proof Screws']
  }
];

export default function HotspotsOverlay({ onSelectPart, selectedPart }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sequence-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 3
        }
      });

      // Phase 1: Explode outward
      partsData.forEach(part => {
        tl.fromTo(`#hotspot-${part.id}`, 
          { top: '50%', left: '50%' },
          { top: part.position.top, left: part.position.left, ease: "power2.inOut", duration: 1.5 },
          0
        );
      });
      tl.to(containerRef.current, {
        scale: 1.05,
        rotation: 2,
        ease: "power2.inOut",
        duration: 1.5
      }, 0);

      // Phase 2: Hold (duration 0.8)
      // Implicitly handled by starting Phase 3 at 2.3
      tl.to(containerRef.current, {
        scale: 1.15,
        rotation: 6,
        ease: "power1.inOut",
        duration: 0.8
      }, 1.5);
      
      // Phase 3: Reassemble inward
      partsData.forEach(part => {
        tl.to(`#hotspot-${part.id}`, 
          { top: '50%', left: '50%', ease: "power2.inOut", duration: 1.5 },
          2.3
        );
      });
      tl.to(containerRef.current, {
        scale: 1,
        rotation: 0,
        ease: "power2.inOut",
        duration: 1.5
      }, 2.3);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-30 pointer-events-none">
      {partsData.map((part) => (
        <div
          key={part.id}
          id={`hotspot-${part.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPart(part);
          }}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer pointer-events-auto border-2 border-transparent hover:border-blue-500/50 transition-colors bg-blue-500/0 hover:bg-blue-500/10 flex flex-col items-center justify-center"
        >
          {/* Invisible click target / optional visual indicator */}
          
          <AnimatePresence>
            {selectedPart?.id === part.id && (
              <UIOverlay part={part} onClose={(e) => {
                e.stopPropagation();
                onSelectPart(null);
              }} />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
