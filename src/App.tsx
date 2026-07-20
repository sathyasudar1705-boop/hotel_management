import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { Sparkles, Play, ArrowRight, Star, CalendarDays, Volume2, VolumeX } from 'lucide-react';
import ConciergeJourney from './components/ConciergeJourney';
import ServiceShowcase from './components/ServiceShowcase';
import GuestJourneyTimeline from './components/GuestJourneyTimeline';
import InteractiveShowcase from './components/InteractiveShowcase';
import FinalChapter from './components/FinalChapter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [isPlayingVoice, setIsPlayingVoice] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  // Dialogue lines for the AI Concierge simulator
  const conciergePhrases = [
    "Welcome to the Grand Hotel. I am your AI concierge.",
    "I can schedule your spa session at 4 PM today.",
    "Would you like me to book a seaside dinner at 7 PM?",
    "Confirming your Luxury Suite 101 booking. Confirmation sent."
  ];

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Scroll Trigger Animations
    const ctx = gsap.context(() => {
      // Background scroll zoom & fade
      gsap.to(bgRef.current, {
        scale: 1.15,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Content scroll parallax/fade
      gsap.to(heroContentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        }
      });

      // Floating elements scroll parallax
      gsap.to(orbRef.current, {
        y: -150,
        x: 50,
        opacity: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "80% top",
          scrub: true,
        }
      });

      gsap.to(card1Ref.current, {
        y: -250,
        x: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(card2Ref.current, {
        y: -180,
        x: 60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(card3Ref.current, {
        y: -300,
        x: -80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    // 3. Staggered Entrance Animations on Page Load
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.fromTo(bgRef.current, 
      { scale: 1.3, opacity: 0 }, 
      { scale: 1.05, opacity: 0.75, duration: 2.5 }
    );

    tl.fromTo('.reveal-line', 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.15 },
      '-=1.8'
    );

    tl.fromTo('.reveal-desc', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    );

    tl.fromTo('.reveal-btn', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      '-=0.6'
    );

    tl.fromTo(orbRef.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.8, ease: 'back.out(1.2)' },
      '-=1.2'
    );

    tl.fromTo(['.float-card'], 
      { opacity: 0, scale: 0.8, y: 50 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' },
      '-=1'
    );

    // 4. Mouse movement parallax event
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      // Subtle translations for 3D depth
      gsap.to(orbRef.current, { x: xPos * 25, y: yPos * 25, duration: 0.8 });
      gsap.to(card1Ref.current, { x: xPos * 40 + 20, y: yPos * 40 - 20, duration: 1 });
      gsap.to(card2Ref.current, { x: xPos * 30 - 30, y: yPos * 30 + 10, duration: 1.2 });
      gsap.to(card3Ref.current, { x: xPos * 50 + 10, y: yPos * 50 - 40, duration: 1.1 });
      gsap.to(heroContentRef.current, { x: xPos * 10, y: yPos * 10, duration: 0.6 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Speak simulation loop
    let textIndex = 0;
    const voiceInterval = setInterval(() => {
      if (isPlayingVoice) {
        setNotificationText(conciergePhrases[textIndex]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4500);
        textIndex = (textIndex + 1) % conciergePhrases.length;
      }
    }, 6500);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(voiceInterval);
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(tick);
    };
  }, [isPlayingVoice]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-luxury-navy overflow-x-hidden"
    >
      {/* Background with layered Ken Burns & Environmental sunlight filter */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div 
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center origin-center filter brightness-[0.8]"
          style={{ backgroundImage: `url('/hero_main_banner.jpg')` }}
        />
        {/* Soft Golden Sunset overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/30 to-transparent z-1" />
        <div className="absolute inset-0 bg-radial-gradient(circle at 70% 30%, rgba(197, 168, 128, 0.15) 0%, transparent 60%) z-1" />
        {/* Living atmospheric particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 z-1 pointer-events-none" />
      </div>

      {/* Fullscreen Hero Section */}
      <section className="relative w-full h-screen flex items-center px-6 md:px-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
          
          {/* Left Column: Premium Editorial Typography & CTAs */}
          <div 
            ref={heroContentRef} 
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8 select-none"
          >
            {/* Top Tagline */}
            <div className="overflow-hidden flex items-center space-x-3 text-gold-base font-semibold tracking-[0.25em] text-xs">
              <span className="reveal-line block font-sans">GRAND HOTEL</span>
              <span className="reveal-line block w-1.5 h-1.5 rounded-full bg-gold-base" />
              <span className="reveal-line block font-sans text-white/60">Da Nang, Vietnam</span>
            </div>

            {/* Main Headline */}
            <div className="flex flex-col space-y-1 md:space-y-2">
              <div className="overflow-hidden">
                <h1 className="reveal-line text-4xl sm:text-6xl md:text-[5.2rem] font-display font-bold leading-[1.05] tracking-tight uppercase text-white">
                  Experience
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="reveal-line text-4xl sm:text-6xl md:text-[5.2rem] font-serif font-light italic leading-[1.05] tracking-tight text-gold-light">
                  Luxury
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="reveal-line text-4xl sm:text-6xl md:text-[5.2rem] font-display font-bold leading-[1.05] tracking-tight uppercase text-white">
                  Where Elegance
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="reveal-line text-4xl sm:text-6xl md:text-[5.2rem] font-serif font-light italic leading-[1.05] tracking-tight text-gold-light">
                  Meets Innovation
                </h1>
              </div>
            </div>

            {/* Description */}
            <p className="reveal-desc text-white/70 font-sans text-sm md:text-base leading-relaxed max-w-xl font-light">
              Your personal AI concierge awaits. From fine dining reservations to spa bookings, experience world-class hospitality powered by intelligent automation.
            </p>

            {/* Premium Interactive Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="reveal-btn relative overflow-hidden group px-8 py-4 bg-white text-luxury-navy font-bold font-sans text-xs tracking-wider uppercase rounded-full shadow-lg transition-all duration-500 hover:text-white hover:bg-transparent">
                {/* Glowing border outline */}
                <span className="absolute inset-0 border border-white rounded-full group-hover:scale-100 scale-95 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-gold-base to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-1" />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start AI Concierge</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>

              <button className="reveal-btn relative overflow-hidden group px-8 py-4 glass-panel text-white font-semibold font-sans text-xs tracking-wider uppercase rounded-full transition-all duration-500 hover:bg-white/10">
                <span className="relative z-10 flex items-center space-x-2">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Experience</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: AI Concierge Breathing Orb & Drifting Cards */}
          <div className="lg:col-span-5 relative w-full h-[380px] lg:h-[500px] flex items-center justify-center">
            
            {/* The Elegant AI Concierge Orb */}
            <div 
              ref={orbRef}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center z-10 select-none cursor-pointer"
              onClick={() => setIsPlayingVoice(!isPlayingVoice)}
            >
              {/* Radial Blur Glowing Rings */}
              <div className="absolute inset-0 rounded-full bg-radial-gradient(circle, rgba(197, 168, 128, 0.2) 0%, rgba(14, 22, 36, 0.4) 60%, transparent 100%)" />
              <div className="absolute inset-0 rounded-full border border-gold-base/15 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Central Glowing Capsule/Sphere */}
              <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-luxury-blue/90 to-luxury-navy/95 border border-white/10 shadow-[0_0_50px_rgba(197,168,128,0.15)] flex items-center justify-center group overflow-hidden">
                {/* Breathing Inner Radial Core */}
                <div className="absolute inset-4 rounded-full bg-radial-gradient(circle, rgba(197, 168, 128, 0.25) 0%, transparent 70%) animate-[pulse_4s_ease-in-out_infinite]" />
                
                {/* Live sound waveform bars */}
                <div className="flex items-center gap-1.5 z-10 h-8">
                  {[0.5, 0.8, 1.2, 0.7, 1.5, 0.9, 1.3, 0.6, 1.0].map((val, i) => (
                    <span 
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-gold-base to-gold-light opacity-80"
                      style={{
                        height: `${val * 24}px`,
                        animation: isPlayingVoice 
                          ? `wave 1.${i + 3}s ease-in-out infinite alternate`
                          : 'none',
                        transformOrigin: 'center'
                      }}
                    />
                  ))}
                </div>

                {/* Voice toggle button */}
                <div className="absolute bottom-4 z-10 text-[9px] uppercase tracking-widest text-gold-base font-semibold flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {isPlayingVoice ? (
                    <>
                      <Volume2 className="w-3 h-3" />
                      <span>Live Concierge</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3 h-3 text-white/40" />
                      <span className="text-white/40">Muted</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Drifting Premium Card 1: 24/7 AI Concierge */}
            <div 
              ref={card1Ref}
              className="float-card absolute top-4 left-4 md:-left-4 z-20 glass-panel px-5 py-4 rounded-2xl flex items-center space-x-3 shadow-lg select-none border border-white/10 hover:border-gold-base/30 transition-colors duration-500"
            >
              <div className="w-9 h-9 rounded-full bg-gold-base/10 flex items-center justify-center text-gold-base">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] tracking-wider uppercase text-gold-base font-bold">Intelligence</p>
                <h4 className="text-xs font-semibold text-white font-sans">24/7 AI Concierge</h4>
              </div>
            </div>

            {/* Drifting Premium Card 2: 5 Stars Service */}
            <div 
              ref={card2Ref}
              className="float-card absolute bottom-6 right-4 md:-right-8 z-20 glass-panel px-5 py-4 rounded-2xl flex items-center space-x-3 shadow-lg select-none border border-white/10 hover:border-gold-base/30 transition-colors duration-500"
            >
              <div className="w-9 h-9 rounded-full bg-gold-base/10 flex items-center justify-center text-gold-base">
                <Star className="w-4 h-4 fill-gold-base" />
              </div>
              <div className="text-left">
                <p className="text-[10px] tracking-wider uppercase text-gold-base font-bold">Standard</p>
                <h4 className="text-xs font-semibold text-white font-sans">★★★★★ Luxury Service</h4>
              </div>
            </div>

            {/* Drifting Premium Card 3: Instant Bookings */}
            <div 
              ref={card3Ref}
              className="float-card absolute bottom-12 left-8 md:-left-8 z-20 glass-panel px-5 py-4 rounded-2xl flex items-center space-x-3 shadow-lg select-none border border-white/10 hover:border-gold-base/30 transition-colors duration-500"
            >
              <div className="w-9 h-9 rounded-full bg-gold-base/10 flex items-center justify-center text-gold-base">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] tracking-wider uppercase text-gold-base font-bold">Automation</p>
                <h4 className="text-xs font-semibold text-white font-sans">Instant Bookings</h4>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Concierge Speaking Subtitle Overlay Bubble */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none max-w-sm w-[90%]">
        <motion.div 
          animate={{ opacity: showNotification ? 1 : 0, y: showNotification ? 0 : 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass-panel px-6 py-4 rounded-2xl border border-white/10 shadow-2xl flex items-start space-x-3 backdrop-blur-xl text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gold-base/20 flex items-center justify-center text-gold-base shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h5 className="text-[9px] uppercase tracking-widest text-gold-base font-bold">AI Concierge Speech</h5>
            <p className="text-xs text-white/90 leading-relaxed font-light mt-1">{notificationText}</p>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Hint Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-white/40 select-none z-20">
        <span className="text-[9px] uppercase tracking-widest font-semibold">Scroll Down</span>
        <span className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scrollHint" />
        </span>
      </div>

      {/* Section 2: Pinned split-layout Scroll-progress Concierge Journey */}
      <ConciergeJourney />

      {/* Section 3: Pinned split-layout Scroll-progress Service Showcase (Fine Dining, Spa, Suites, Pool, Private Experiences) */}
      <ServiceShowcase />

      {/* Section 5: Pinned scroll-driven Guest Journey Timeline */}
      <GuestJourneyTimeline />

      {/* Section 7: Interactive AI Concierge Dashboard Demonstration */}
      <InteractiveShowcase />

      {/* Section 6: Breathtaking Final Chapter & Footer */}
      <FinalChapter />

      {/* Audio & Waveframe CSS Inject */}
      <style>{`
        @keyframes wave {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.3); }
        }
        @keyframes scrollHint {
          0% { transform: translateY(-100%); }
          80%, 100% { transform: translateY(200%); }
        }
        .animate-scrollHint {
          animation: scrollHint 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </div>
  );
}
