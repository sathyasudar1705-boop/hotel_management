import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, Clock, Utensils, 
  BedDouble, CreditCard, Smile, Wifi, Smartphone, ArrowUpRight 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GuestJourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const timelineNodes = [
    { label: "Booking", icon: BedDouble },
    { label: "Prep", icon: Clock },
    { label: "Arrival", icon: Wifi },
    { label: "Dining", icon: Utensils },
    { label: "Spa", icon: Sparkles },
    { label: "Stay", icon: Smartphone },
    { label: "Checkout", icon: CreditCard },
    { label: "Feedback", icon: Smile }
  ];

  // Visual text dialogue corresponding to each guest journey step
  const conciergeTexts = [
    "From the moment you book until the moment you leave, I'll handle everything. Let's begin by securing your suite.",
    "Pre-arrival preparations are starting. Allocating housekeeping resources to Suite 101.",
    "Welcome to Grand Hotel. Check-in is complete, and your digital room key is now active.",
    "I have curated some exclusive dining selections at La Mer overlooking the bay.",
    "Your room service order has been routed to the kitchen. Delivery status is live.",
    "Your wellness appointment for Royal Balinese Therapy has been booked.",
    "Your checkout folio has been compiled and settled automatically. Your perfect stay is complete.",
    "Thank you for your feedback. Have a safe journey home."
  ];

  // Dynamic voice waves
  const baseWaveforms = [12, 28, 44, 20, 36, 18, 30, 14, 8];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pinning the section itself for 7 viewport heights of scrolling progress (8 stages total)
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=700%",
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map progress to 8 timeline steps (0 to 7)
        const currentStep = Math.min(Math.floor(progress * 8), 7);
        setStep(currentStep);
      }
    });

    return () => pin.kill();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-screen bg-luxury-navy overflow-hidden z-10 py-10 flex flex-col justify-between"
    >
      {/* Layered Sunset Backdrop for Checkout Stage */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: "url('/luxury_pool_1784286709723.png')",
            opacity: step >= 6 ? 0.7 : 0
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/90 via-luxury-navy/30 to-luxury-navy/60 z-10" />
      </div>

      {/* 1. TOP SECTION: Animated Luxury Timeline Progress */}
      <div className="w-full max-w-5xl mx-auto px-6 relative z-20 flex flex-col items-center">
        <div className="relative w-full flex items-center justify-between mt-4">
          
          {/* Connection Line backdrop */}
          <div className="absolute left-0 right-0 h-0.5 bg-white/5 z-0" />
          
          {/* Active Drawing Line */}
          <div 
            className="absolute left-0 h-0.5 bg-gradient-to-r from-gold-base to-gold-light z-0 transition-all duration-700"
            style={{ width: `${(step / 7) * 100}%` }}
          />

          {/* Timeline Nodes */}
          {timelineNodes.map((node, idx) => {
            const Icon = node.icon;
            const isPassed = step >= idx;
            const isActive = step === idx;
            return (
              <div key={idx} className="flex flex-col items-center z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    isActive 
                      ? 'bg-gold-base border-gold-light text-luxury-navy shadow-[0_0_20px_rgba(197,168,128,0.4)] scale-110'
                      : isPassed
                        ? 'bg-luxury-blue border-gold-base text-gold-base'
                        : 'bg-luxury-navy border-white/10 text-white/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span 
                  className={`text-[8px] uppercase tracking-widest font-bold mt-2 font-sans transition-colors duration-500 ${
                    isActive ? 'text-gold-light' : 'text-white/30'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* 2. MIDDLE SECTION: Immersive Narrative Split-layout */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 relative z-20 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Side: Glowing Orb & Speech Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            
            {/* Glowing Concierge Avatar Orb ( Continuity from Section 2 ) */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center mx-auto lg:mx-0">
              {/* Outer breathing ring */}
              <motion.div 
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-gold-base/30 filter blur-[2px]"
              />
              {/* Inner glass orb container */}
              <div className="absolute w-28 h-28 rounded-full bg-radial-gradient(circle, rgba(14,22,36,0.85) 0%, rgba(8,11,17,0.95) 100%) border border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(197,168,128,0.1)] overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, transparent 60%)" />
                
                {/* Waveform synced to concierge speech */}
                <div className="flex items-center gap-1 z-10 h-6">
                  {baseWaveforms.map((h, i) => (
                    <motion.span 
                      key={i}
                      animate={{ height: [h * 0.3, h * 0.9, h * 0.3] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                      className="w-0.5 rounded-full bg-gold-base"
                      style={{ transformOrigin: 'center' }}
                    />
                  ))}
                </div>
                <span className="text-[7px] uppercase tracking-widest text-gold-base font-bold mt-1.5 z-10">
                  Aurelia Active
                </span>
              </div>
            </div>

            {/* Speech bubble */}
            <div className="w-full glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative text-left">
              <div className="absolute -top-3 left-12 w-6 h-6 bg-radial-gradient(circle, rgba(14,22,36,0.85) 0%, rgba(8,11,17,0.95) 100%) border-t border-l border-white/10 rotate-45" />
              <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AI Concierge Speech</span>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs md:text-sm text-white/95 leading-relaxed font-light font-sans"
                >
                  "{conciergeTexts[step]}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest pl-2">
              Scroll to progress guest journey
            </div>
          </div>

          {/* Right Side: Virtual Tablet App Mockup Screens */}
          <div className="lg:col-span-7 relative w-full h-[400px] md:h-[450px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Guest Books stay */}
              {step === 0 && (
                <motion.div 
                  key="step-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img src="/media__1784531547754.jpg" className="w-full h-full object-cover brightness-[0.4]" alt="" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Suite Booking</span>
                    <h3 className="text-xl font-serif text-white mt-1">King Ocean Front Lodge</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[8px] text-white/40 uppercase block">Check-in</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">June 26, 2026</h4>
                    </div>
                    <div className="w-[1px] h-8 bg-white/5" />
                    <div className="text-right">
                      <span className="text-[8px] text-white/40 uppercase block">Status</span>
                      <span className="text-xs font-bold text-emerald-400 mt-0.5 block flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Calendar availability logs synchronized automatically.
                  </div>
                </motion.div>
              )}

              {/* Step 2: Prep / Housekeeping */}
              {step === 1 && (
                <motion.div 
                  key="step-1"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img src="/bali_light_pool_1784282527802.png" className="w-full h-full object-cover brightness-[0.35]" alt="" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">Housekeeping</span>
                    <h3 className="text-xl font-serif text-white mt-1">Suite 101 Preparation</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Pre-arrival deep cleaning</span>
                      <span className="text-gold-light font-bold">85% Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-base w-[85%]" />
                    </div>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Assigning senior housekeeping personnel automatically.
                  </div>
                </motion.div>
              )}

              {/* Step 3: Guest Arrives */}
              {step === 2 && (
                <motion.div 
                  key="step-2"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img src="/luxury_lobby_1784286683995.png" className="w-full h-full object-cover brightness-[0.35]" alt="" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold uppercase">Arrival Check-in</span>
                    <h3 className="text-xl font-serif text-white mt-1">Digital Key Allocation</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-xs mx-auto glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gold-base/20 flex items-center justify-center text-gold-base shadow-[0_0_20px_rgba(197,168,128,0.2)]">
                      <Smartphone className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xs font-semibold text-white">Deluxe Suite 101 Key</h4>
                      <p className="text-[9px] text-emerald-400 mt-1 uppercase tracking-widest font-bold">Active & Secure</p>
                    </div>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Guest check-in complete. Smart lock credentials sent.
                  </div>
                </motion.div>
              )}

              {/* Step 4: AI Recommends */}
              {step === 3 && (
                <motion.div 
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img src="/bali_light_hero_1784282500805.png" className="w-full h-full object-cover brightness-[0.3]" alt="" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">AI Suggestions</span>
                    <h3 className="text-xl font-serif text-white mt-1">Curated Experiences</h3>
                  </div>
                  <div className="relative z-10 w-full flex flex-col gap-2">
                    {[
                      { title: "La Mer Dining", time: "Table Reserved 7:30 PM", img: "/bali_light_pool_1784282527802.png" },
                      { title: "Sunset Cruise Tour", time: "Suggested 5:00 PM Tomorrow", img: "/luxury_pool_1784286709723.png" }
                    ].map((item, idx) => (
                      <div key={idx} className="glass-panel p-3 rounded-lg border border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-left">
                          <img src={item.img} className="w-8 h-8 rounded object-cover" alt="" />
                          <div>
                            <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                            <p className="text-[9px] text-white/50">{item.time}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gold-base" />
                      </div>
                    ))}
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Personalized recommendations based on booking history.
                  </div>
                </motion.div>
              )}

              {/* Step 5: Room Service */}
              {step === 4 && (
                <motion.div 
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img src="/bali_light_pool_1784282527802.png" className="w-full h-full object-cover brightness-[0.4]" alt="" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Room Service</span>
                    <h3 className="text-xl font-serif text-white mt-1">Seaside Platter Order</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="text-left">
                      <h4 className="text-xs font-semibold text-white">Table 12 Refreshments</h4>
                      <p className="text-[9px] text-white/40">1x Fresh Fruit Salad, 2x Fresh Juice</p>
                    </div>
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded font-bold uppercase">
                      PREPARING
                    </span>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Order sent directly to kitchen display nodes.
                  </div>
                </motion.div>
              )}

              {/* Step 6: Spa Treatment */}
              {step === 5 && (
                <motion.div 
                  key="step-5"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img src="/bali_pool_night_1784281621817.png" className="w-full h-full object-cover brightness-[0.4]" alt="" />
                  </div>
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Anantara Wellness</span>
                    <h3 className="text-xl font-serif text-white mt-1">Balinese Massage Appt</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="text-left">
                      <h4 className="text-xs font-semibold text-white">Royal Balinese Therapy</h4>
                      <p className="text-[9px] text-white/40">Tomorrow • 9:00 AM</p>
                    </div>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                      CONFIRMED
                    </span>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Reminder scheduled automatically.
                  </div>
                </motion.div>
              )}

              {/* Step 7: Checkout Day */}
              {step === 6 && (
                <motion.div 
                  key="step-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Checkout Settle</span>
                    <h3 className="text-xl font-serif text-white mt-1">Folio Settle Invoice</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/40">Total Folio Charge</span>
                      <span className="text-lg font-bold text-gold-light">₹64,500</span>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full font-bold border border-emerald-500/40 text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      PAYMENT RECEIVED
                    </span>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Invoice closed. Digital key deactivated.
                  </div>
                </motion.div>
              )}

              {/* Step 8: Thank You */}
              {step === 7 && (
                <motion.div 
                  key="step-7"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  <div className="relative z-10 text-left">
                    <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Experience Complete</span>
                    <h3 className="text-xl font-serif text-white mt-1">Perfect Stay Concluded</h3>
                  </div>
                  <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-gold-base/10 flex items-center justify-center text-gold-base shadow-[0_0_20px_rgba(197,168,128,0.15)]">
                      <Smile className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">We'd Love Your Review</h4>
                      <p className="text-xs text-white/60 mt-1 font-light">Feedback helps us curate your next booking.</p>
                    </div>
                  </div>
                  <div className="relative z-10 text-xs text-white/30 text-left">
                    Your stay is complete. Thank you.
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM SECTION: Scroll guidance indicator */}
      <div className="w-full text-center relative z-20 select-none">
        <span className="text-[9px] uppercase tracking-widest text-white/30 font-semibold block">
          {step === 7 ? "End of Journey" : "Continue scrolling"}
        </span>
      </div>
    </div>
  );
}
