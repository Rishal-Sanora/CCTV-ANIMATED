import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import ImageSequence from './components/ImageSequence';
import FeatureGrid from './components/FeatureGrid';
import HotspotsOverlay from './components/HotspotsOverlay';
import IntroLoader from './components/IntroLoader';
import Footer from './components/Footer';
import { Shield, Cloud, Eye, Camera, Maximize, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef();
  const [selectedPart, setSelectedPart] = useState(null);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedPart) {
        setSelectedPart(null);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPart]);

  useLayoutEffect(() => {
    // Force scroll to top on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      // Text fade in/out during exploded section
      gsap.to(".explode-text", {
        opacity: 1,
        y: -50,
        scrollTrigger: {
          trigger: ".section-exploded",
          start: "top 50%",
          end: "top 20%",
          scrub: 1
        }
      });
      
      gsap.to(".explode-text", {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: ".section-exploded",
          start: "bottom 80%",
          end: "bottom 50%",
          scrub: 2
        }
      });
      
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden font-sans">
      
      {/* Global Presentation Frame - Elegantly Blended */}
      <div className="fixed inset-2 sm:inset-4 md:inset-6 border-2 border-slate-800/60 rounded-[3rem] md:rounded-[4rem] pointer-events-none z-[100] shadow-[0_0_60px_rgba(0,0,0,0.9)_inset,0_0_20px_rgba(34,211,238,0.05)]"></div>
      <div className="fixed inset-2 sm:inset-4 md:inset-6 border border-white/5 rounded-[3rem] md:rounded-[4rem] pointer-events-none z-[100] mix-blend-overlay"></div>

      <AnimatePresence>
        {!introFinished && <IntroLoader onComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>

      {/* Background HTML5 Canvas and Hotspots */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Canvas remains full screen so its background doesn't clip */}
        <div className="absolute inset-0">
          <ImageSequence />
        </div>
        {/* Hotspots are mathematically scaled by 0.8 to match the internal camera scale */}
        <div className="absolute inset-0 scale-[0.8] origin-center">
          <HotspotsOverlay onSelectPart={setSelectedPart} selectedPart={selectedPart} />
        </div>
      </div>

      {/* HTML Scroll Sections */}
      <div className="relative z-10 w-full sequence-container pointer-events-none">
        
        {/* Section 1: Hero */}
        <section className="section-hero h-[120vh] flex flex-col items-center justify-start pt-32 pointer-events-auto relative z-20 overflow-hidden">
          <AnimatePresence>
            {introFinished && (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="w-full flex flex-col items-center text-center px-4"
              >
                {/* Sleek top badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
                  className="mb-8 px-6 py-2 rounded-full bg-white/90 border border-blue-200 shadow-lg inline-flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="text-sm font-black tracking-widest text-blue-900 uppercase">Vision System Active</span>
                </motion.div>

                <h1 className="text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter mb-6 flex flex-col md:flex-row gap-4 items-center drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
                  <span className="bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-600 bg-clip-text text-transparent">Next-Gen</span>
                  <span className="bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 bg-clip-text text-transparent">Security</span>
                </h1>
                
                <p className="text-2xl md:text-3xl text-slate-100 font-bold mb-16 max-w-3xl leading-relaxed drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                  Enterprise-grade optical precision meets <span className="font-black text-cyan-300">cutting-edge AI</span>.
                </p>

                {/* Animated scroll indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="animate-bounce flex flex-col items-center mt-8 drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-sm font-extrabold text-white uppercase tracking-widest mb-4">Scroll to Explode</span>
                  <div className="w-[3px] h-24 bg-gradient-to-b from-cyan-400 to-transparent rounded-full shadow-lg"></div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 2: Camera Types (NEW) */}
        <section className="py-32 bg-transparent relative z-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20 flex justify-center">
              <div className="bg-transparent backdrop-blur-sm px-12 py-8 rounded-3xl border border-white/20 shadow-2xl inline-block drop-shadow-xl hover:bg-white/5 transition-all duration-300">
                <h2 className="text-5xl font-heading font-bold text-white mb-4">Designed for Every Environment</h2>
                <p className="text-xl text-slate-200 max-w-2xl mx-auto font-medium">Whether you need discreet indoor monitoring or outdoor surveillance, our series adapts to your needs.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-transparent backdrop-blur-sm rounded-3xl p-10 border border-white/20 shadow-2xl drop-shadow-xl hover:bg-white/5 transition-all duration-300">
                <Camera className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-heading font-bold text-white mb-4">Dome Series</h3>
                <p className="text-slate-300 mb-6 font-medium">Vandal-resistant and highly discreet. Perfect for indoor retail, offices, and high-traffic corridors.</p>
                <ul className="text-sm text-slate-400 space-y-2 font-bold">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> IK10 Vandal Rating</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 360° Panoramic Options</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Flush Mount Capable</li>
                </ul>
              </div>
              <div className="bg-transparent backdrop-blur-sm rounded-3xl p-10 border border-white/20 shadow-2xl drop-shadow-xl relative overflow-hidden hover:bg-white/5 transition-all duration-300">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-lg">BEST SELLER</div>
                <Target className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-heading font-bold text-white mb-4">Bullet Series</h3>
                <p className="text-slate-300 mb-6 font-medium">Highly visible deterrent with extended long-range night vision. Ideal for perimeters and parking lots.</p>
                <ul className="text-sm text-slate-400 space-y-2 font-bold">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Long-Range IR (100m)</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> IP67 Weatherproof</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> LPR Capable</li>
                </ul>
              </div>
              <div className="bg-transparent backdrop-blur-sm rounded-3xl p-10 border border-white/20 shadow-2xl drop-shadow-xl hover:bg-white/5 transition-all duration-300">
                <Maximize className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-heading font-bold text-white mb-4">PTZ Series</h3>
                <p className="text-slate-300 mb-6 font-medium">Pan, Tilt, and Zoom capabilities for active tracking of subjects across vast outdoor spaces.</p>
                <ul className="text-sm text-slate-400 space-y-2 font-bold">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 36x Optical Zoom</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Auto-Tracking AI</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 360° Endless Pan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Exploded View Anchor */}
        <section className="section-exploded h-[300vh] pointer-events-none relative z-10">
          <div className="sticky top-0 w-full h-[100vh] flex justify-center items-center">
            <div className="absolute top-1/4 opacity-0 explode-text drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight backdrop-blur-sm bg-transparent px-10 py-6 rounded-3xl border border-white/20 shadow-2xl text-white text-center">
                Anatomy of Precision
              </h2>
            </div>
          </div>
        </section>

        {/* Section 4: Features Grid */}
        <section className="section-features min-h-[100vh] flex flex-col items-center justify-center bg-transparent pt-24 pb-24 z-20 relative pointer-events-auto">
          <div className="bg-transparent backdrop-blur-sm px-12 py-6 rounded-3xl border border-white/20 shadow-2xl mb-16 drop-shadow-xl">
            <h2 className="text-5xl font-heading font-bold text-white tracking-tight text-center">Advanced Technology</h2>
          </div>
          <FeatureGrid />
        </section>

        {/* Section 5: Marketing Detail Section */}
        <section className="section-marketing py-32 bg-transparent relative z-20 pointer-events-auto">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center bg-transparent backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/5 transition-all duration-300">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-white">Military-Grade Security</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                End-to-end 256-bit AES encryption ensures your footage remains entirely yours. Built to withstand physical tampering.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-transparent backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/5 transition-all duration-300">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <Eye className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-white">AI Subject Tracking</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                The onboard neural engine instantly differentiates between humans, animals, and vehicles, eliminating false alarms.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-transparent backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/5 transition-all duration-300">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <Cloud className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-white">Seamless Cloud Sync</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                Access up to 30 days of continuous 4K footage from anywhere in the world with absolute reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Subscription Plans (NEW) */}
        <section className="py-32 bg-transparent relative z-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20 flex justify-center">
              <div className="bg-transparent backdrop-blur-sm px-12 py-8 rounded-3xl border border-white/20 shadow-2xl inline-block drop-shadow-xl">
                <h2 className="text-5xl font-heading font-bold text-white mb-4">Cloud Storage Plans</h2>
                <p className="text-xl text-slate-200 max-w-2xl mx-auto font-medium">Choose the retention plan that perfectly scales with your security infrastructure.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Tier */}
              <div className="bg-transparent backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col hover:bg-white/5 transition-all duration-300">
                <h3 className="text-xl font-heading font-bold text-white mb-2">Basic</h3>
                <p className="text-slate-300 text-sm mb-6 font-medium">For residential monitoring.</p>
                <div className="text-4xl font-bold text-white mb-6">$4.99<span className="text-lg text-slate-400 font-medium">/mo</span></div>
                <ul className="text-slate-200 space-y-4 mb-8 flex-grow font-bold">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 7-Day Video History</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Standard AI Alerts</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 1 Camera Supported</li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-white/50 text-white font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">Select Basic</button>
              </div>

              {/* Pro Tier */}
              <div className="bg-cyan-900/10 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/30 shadow-2xl flex flex-col relative transform md:-translate-y-4 hover:bg-cyan-900/20 transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">RECOMMENDED</div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Professional</h3>
                <p className="text-slate-300 text-sm mb-6 font-medium">For small businesses.</p>
                <div className="text-4xl font-bold text-white mb-6">$14.99<span className="text-lg text-cyan-200 font-medium">/mo</span></div>
                <ul className="text-slate-100 space-y-4 mb-8 flex-grow font-bold">
                  <li className="flex items-center gap-2"><span className="text-cyan-300">✓</span> 30-Day Video History</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-300">✓</span> Advanced Neural AI Tracking</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-300">✓</span> Up to 5 Cameras Supported</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-300">✓</span> 24/7 Priority Support</li>
                </ul>
                <button className="w-full py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 shadow-lg transition-colors">Select Pro</button>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-transparent backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col hover:bg-white/5 transition-all duration-300">
                <h3 className="text-xl font-heading font-bold text-white mb-2">Enterprise</h3>
                <p className="text-slate-300 text-sm mb-6 font-medium">For large-scale deployments.</p>
                <div className="text-4xl font-bold text-white mb-6">Custom<span className="text-lg text-slate-400 font-medium"> pricing</span></div>
                <ul className="text-slate-200 space-y-4 mb-8 flex-grow font-bold">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Unlimited Video History</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Custom AI Models</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Unlimited Cameras</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Dedicated Account Manager</li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-white/50 text-white font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
      
    </main>
  );
}

export default App;