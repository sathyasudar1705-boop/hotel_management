import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Sparkles, ArrowRight } from 'lucide-react';
import ConciergeJourney from './components/ConciergeJourney';
import ServiceShowcase from './components/ServiceShowcase';
import FinalChapter from './components/FinalChapter';
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const [bookingForm, setBookingForm] = useState({ email: '', password: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
  };

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

      // Floating elements scroll parallax
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



    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      ctx.revert();
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-luxury-navy overflow-x-hidden"
    >
      {/* Floating Pill Navbar */}
      <Navbar />
      {/* Background with layered Ken Burns & Environmental sunlight filter */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0 bg-warm-white">
        <div 
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover origin-center filter brightness-[1.0]"
          style={{ backgroundImage: `url('/media__1784531917027.jpg')`, backgroundPosition: 'center 20%' }}
        />
        {/* Soft Golden Sunset overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-white/70 via-transparent to-transparent z-1" />
        <div className="absolute inset-0 bg-radial-gradient(circle at 70% 30%, rgba(205, 170, 109, 0.15) 0%, transparent 60%) z-1" />
        {/* Living atmospheric particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-base/5 via-transparent to-transparent opacity-40 z-1 pointer-events-none" />
      </div>

      {/* Fullscreen Hero Section */}
      <section className="relative w-full h-screen flex items-center px-6 md:px-20 z-10 pt-20 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full max-w-7xl mx-auto">
          
          {/* Left Column: Premium Editorial Typography & CTAs */}
          <div 
            ref={heroContentRef} 
            className="lg:col-span-7 flex flex-col items-start text-left space-y-4 md:space-y-5"
          >


            {/* Main Headline */}
            <div className="flex flex-col space-y-0">
              <div className="overflow-hidden">
                <h1 className="reveal-line text-2xl sm:text-3xl md:text-[2.8rem] font-sans font-extrabold leading-tight tracking-tight uppercase"
                  style={{ color: '#111111', textShadow: '0 1px 8px rgba(255,255,255,0.8)' }}>
                  Experience
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="reveal-line text-2xl sm:text-3xl md:text-[2.8rem] font-serif font-semibold italic leading-tight tracking-tight"
                  style={{ color: '#A07020', textShadow: '0 1px 8px rgba(255,255,255,0.8)' }}>
                  Luxury
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="reveal-line text-2xl sm:text-3xl md:text-[2.8rem] font-sans font-extrabold leading-tight tracking-tight uppercase"
                  style={{ color: '#111111', textShadow: '0 1px 8px rgba(255,255,255,0.8)' }}>
                  Where Elegance
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="reveal-line text-2xl sm:text-3xl md:text-[2.8rem] font-serif font-semibold italic leading-tight tracking-tight"
                  style={{ color: '#A07020', textShadow: '0 1px 8px rgba(255,255,255,0.8)' }}>
                  Meets Innovation
                </h1>
              </div>
            </div>

            {/* Description */}
            <p className="reveal-desc font-sans text-xs md:text-sm leading-relaxed max-w-xs font-medium mt-3"
              style={{ color: '#222222', textShadow: '0 1px 6px rgba(255,255,255,0.9)' }}>
              Your personal AI concierge awaits. From fine dining reservations to spa bookings, experience world-class hospitality powered by intelligent automation.
            </p>

            {/* Premium Interactive Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 md:pt-8">
              <button className="reveal-btn relative overflow-hidden group px-5 py-2.5 bg-gradient-to-r from-gold-base to-gold-dark text-white font-bold font-sans text-[10px] tracking-wider uppercase rounded-full shadow-md transition-all duration-500 hover:brightness-110 cursor-pointer">
                <span className="relative z-10 flex items-center space-x-1.5">
                  <span>Explore Hotel</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>

              <button className="reveal-btn relative overflow-hidden group px-5 py-2.5 bg-white border border-border-beige text-charcoal font-semibold font-sans text-[10px] tracking-wider uppercase rounded-full transition-all duration-500 hover:bg-soft-sand/40 cursor-pointer">
                <span className="relative z-10 flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-gold-base" />
                  <span>AI Concierge</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xs bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_rgba(43,43,43,0.11)] border border-border-beige overflow-hidden">

              {/* Header */}
              <div className="px-6 pt-7 pb-5 border-b border-border-beige">
                <h2 className="text-lg font-serif font-light text-charcoal leading-snug">Welcome</h2>
                <p className="text-[11px] text-warm-gray mt-1.5 leading-relaxed font-sans font-light">
                  Sign in to access your personal concierge and manage your stay.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleBooking} className="px-6 py-5 space-y-3.5">

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-charcoal/60 font-bold font-sans block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleFormChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-3.5 py-2.5 text-xs text-charcoal placeholder-warm-gray/50
                               bg-soft-sand/30 border border-border-beige rounded-lg
                               focus:outline-none focus:border-gold-base/50 focus:bg-white
                               transition-all duration-300 font-sans"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-charcoal/60 font-bold font-sans block">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="w-full px-3.5 py-2.5 text-xs text-charcoal placeholder-warm-gray/50
                               bg-soft-sand/30 border border-border-beige rounded-lg
                               focus:outline-none focus:border-gold-base/50 focus:bg-white
                               transition-all duration-300 font-sans"
                  />
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-gold-base to-gold-dark
                             hover:brightness-110 text-white font-bold text-[10px] uppercase
                             tracking-[0.18em] rounded-lg transition-all duration-300
                             shadow-[0_4px_16px_rgba(205,170,109,0.28)] cursor-pointer font-sans mt-1"
                >
                  Sign In
                </button>
              </form>

              {/* Footer */}
              <div className="px-6 pb-5 text-center">
                <p className="text-[8px] text-warm-gray/50 font-sans">
                  © 2025 Grand Hotel Da Nang &nbsp;·&nbsp; All rights reserved
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Floating Action Hint Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-charcoal/40 select-none z-20">
        <span className="text-[9px] uppercase tracking-widest font-semibold">Scroll Down</span>
        <span className="w-[1px] h-12 bg-gradient-to-b from-charcoal/30 to-transparent relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gold-base animate-scrollHint" />
        </span>
      </div>

      {/* Section 2: Pinned split-layout Scroll-progress Concierge Journey */}
      <ConciergeJourney />

      {/* Section 3: Pinned split-layout Scroll-progress Service Showcase (Fine Dining, Spa, Suites, Pool, Private Experiences) */}
      <ServiceShowcase />





      {/* Section 6: Breathtaking Final Chapter & Footer */}
      <FinalChapter />

      {/* Audio & Waveframe CSS Inject */}
      <style>{`
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
