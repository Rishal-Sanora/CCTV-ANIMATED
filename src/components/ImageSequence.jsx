import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Eagerly load all frames from assets
const frameModules = import.meta.glob('../assets/ffout*.gif', { eager: true, import: 'default' });

// Extract and sort the URLs
const frames = Object.entries(frameModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([_, url]) => url);

export default function ImageSequence() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const sequence = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      // Ensure frame index is valid
      const currentFrame = Math.round(sequence.current.frame);
      const img = imagesRef.current[currentFrame];
      
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to perfectly fit and cover the screen
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Preload images
    let loadedCount = 0;
    if (frames.length === 0) {
      console.warn("No frames found. Ensure the assets directory contains ffout*.gif files.");
      return;
    }

    frames.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        // Trigger first render as soon as the first frame loads, or all load
        if (index === 0) render();
        if (loadedCount === frames.length) render();
      };
      imagesRef.current[index] = img;
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);

    // Set up GSAP ScrollTrigger timeline to open AND close
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sequence-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
          onUpdate: render // Render on every scroll update
        }
      });

      // Phase 1: Open/Explode
      tl.to(sequence.current, {
        frame: frames.length - 1,
        ease: "power2.inOut",
        duration: 1.5
      }, 0)
      // Also scale up canvas slightly during Phase 1
      .to(canvasRef.current, {
        scale: 1.05,
        rotation: 2,
        ease: "power2.inOut",
        duration: 1.5
      }, 0)

      // Phase 2: Hold exploded view, but add gentle continuous rotation/scale
      .to(sequence.current, {
        frame: frames.length - 1,
        duration: 0.8
      }, 1.5)
      .to(canvasRef.current, {
        scale: 1.15,
        rotation: 6,
        ease: "power1.inOut",
        duration: 0.8
      }, 1.5)

      // Phase 3: Close/Reassemble and reset canvas
      .to(sequence.current, {
        frame: 0,
        ease: "power2.inOut",
        duration: 1.5
      }, 2.3)
      .to(canvasRef.current, {
        scale: 1,
        rotation: 0,
        ease: "power2.inOut",
        duration: 1.5
      }, 2.3);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
