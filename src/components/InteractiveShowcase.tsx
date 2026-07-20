import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, MapPin, 
  Car, Compass, ChevronRight, RefreshCw, Utensils
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const steps = [
    {
      guest: "Book an Ocean View Suite for tomorrow.",
      ai: "Your Ocean View Suite has been reserved successfully.",
      module: "Room Reservation"
    },
    {
      guest: "Reserve a table tonight.",
      ai: "Table reserved at La Mer Dining for 7:30 PM tonight.",
      module: "Restaurant Table"
    },
    {
      guest: "Schedule a spa treatment.",
      ai: "Royal Balinese Therapy booked for 9:00 AM.",
      module: "Wellness Spa"
    },
    {
      guest: "Arrange airport pickup.",
      ai: "VIP Airport S-Class pickup scheduled for 12:30 PM.",
      module: "Airport Pickup"
    },
    {
      guest: "Show today's itinerary.",
      ai: "Your curated daily itinerary is ready.",
      module: "Daily Itinerary"
    },
    {
      guest: "Show my invoice.",
      ai: "Your billing summary is ready. Settle folio automatically.",
      module: "Invoice & Billing"
    }
  ];

  // Dynamic voice waves
  const baseWaveforms = [16, 32, 48, 24, 38, 20, 32, 14, 8];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pinning the showcase for 5 viewport heights of scrolling progress (6 steps total)
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map progress to 6 conversation steps (0 to 5)
        const currentStep = Math.min(Math.floor(progress * 6), 5);
        setStep(currentStep);
      }
    });

    return () => pin.kill();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-screen bg-luxury-navy overflow-hidden z-10 py-10 flex items-center"
    >
      {/* Background with slowly moving gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-gold-base/5 filter blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 filter blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-transparent to-luxury-navy/80" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 relative z-20 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT SIDE (35% width / 4 Cols): AI Voice Assistant Interface */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <span className="text-xs tracking-[0.25em] font-semibold text-gold-base uppercase block">
              AI Concierge Core
            </span>

            {/* Glowing Avatar Orb */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center mx-auto lg:mx-0">
              {/* Outer breathing ring */}
              <motion.div 
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-gold-base/30 filter blur-[2px]"
              />
              {/* Inner glass orb container */}
              <div className="absolute w-28 h-28 rounded-full bg-radial-gradient(circle, rgba(14,22,36,0.85) 0%, rgba(8,11,17,0.95) 100%) border border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(197,168,128,0.15)] overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, transparent 60%)" />
                
                {/* Waveform synced to active speech */}
                <div className="flex items-center gap-1 z-10 h-6">
                  {baseWaveforms.map((h, i) => (
                    <motion.span 
                      key={i}
                      animate={{ height: [h * 0.3, h * 0.95, h * 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
                      className="w-0.5 rounded-full bg-gold-base"
                      style={{ transformOrigin: 'center' }}
                    />
                  ))}
                </div>
                <span className="text-[7px] uppercase tracking-widest text-gold-base font-bold mt-1.5 z-10">
                  Concierge Live
                </span>
              </div>
            </div>

            {/* Transcription speech bubble */}
            <div className="w-full glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative text-left">
              <div className="absolute -top-3 left-12 w-6 h-6 bg-radial-gradient(circle, rgba(14,22,36,0.85) 0%, rgba(8,11,17,0.95) 100%) border-t border-l border-white/10 rotate-45" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block mb-1">GUEST</span>
                    <p className="text-sm text-gold-light italic">"{steps[step].guest}"</p>
                  </div>
                  <div className="w-full h-[1px] bg-white/5" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                    <p className="text-xs md:text-sm text-white/90 leading-relaxed font-light font-sans">
                      "{steps[step].ai}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest pl-2">
              Scroll to progress live dialogue demo
            </div>
          </div>

          {/* RIGHT SIDE (65% width / 8 Cols): Immersive Hotel Dashboard Mockup */}
          <div className="lg:col-span-8 relative w-full h-[450px] md:h-[500px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            
            {/* Dashboard content header */}
            <div className="w-full border-b border-white/5 px-6 py-4 flex items-center justify-between z-10 bg-luxury-navy/30">
              <div className="text-left flex items-center space-x-3">
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                  Live Dashboard
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                <span className="text-xs font-semibold text-gold-base">
                  {steps[step].module}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">System Status Syncing</span>
                <RefreshCw className="w-3.5 h-3.5 text-gold-base animate-spin" />
              </div>
            </div>

            {/* Dashboard Panel Viewport */}
            <div className="flex-1 w-full relative p-6 flex items-center justify-center bg-luxury-navy/20">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Room Reservation */}
                {step === 0 && (
                  <motion.div 
                    key="room-reserv"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                  >
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <img src="/media__1784531547754.jpg" className="w-full h-full object-cover brightness-[0.25]" alt="" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="glass-panel p-4 rounded-xl border border-gold-base/30 bg-gold-base/5 shadow-[0_0_15px_rgba(197,168,128,0.05)]">
                        <span className="text-[9px] text-gold-base uppercase tracking-widest block font-bold">Selected Room</span>
                        <h4 className="text-lg font-serif text-white mt-1">King Ocean View Suite</h4>
                        <p className="text-[10px] text-white/50 mt-0.5">Balcony • Open ocean wind deck</p>
                      </div>
                      
                      <div className="glass-panel p-4 rounded-xl border border-white/5">
                        <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">Dates</span>
                        <h4 className="text-sm font-semibold text-white mt-1">June 26 - June 28</h4>
                        <p className="text-[10px] text-white/50 mt-0.5">2 Nights • 2 Guests</p>
                      </div>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h4 className="text-xs font-semibold text-white">Lodging status updated</h4>
                          <p className="text-[9px] text-white/40">Suite 204 allocated successfully</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded font-bold">CONFIRMED</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Restaurant Reservation */}
                {step === 1 && (
                  <motion.div 
                    key="restaurant"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                  >
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <img src="/bali_light_pool_1784282527802.png" className="w-full h-full object-cover brightness-[0.3]" alt="" />
                    </div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                        <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">La Mer Dining</span>
                        <h3 className="text-xl font-serif text-white mt-1">Oceanfront Table Reserved</h3>
                      </div>
                      <span className="glass-panel px-2.5 py-1 rounded text-[9px] text-white/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold-base" /> Ocean Deck
                      </span>
                    </div>
                    <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/15 flex items-center justify-between shadow-2xl">
                      <div>
                        <h4 className="text-xs font-semibold text-white">Table 12 Selection</h4>
                        <p className="text-[9px] text-white/50">Tonight • 7:30 PM • 2 Guests</p>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">CONFIRMED</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Spa Treatment */}
                {step === 2 && (
                  <motion.div 
                    key="spa"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                  >
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <img src="/bali_pool_night_1784281621817.png" className="w-full h-full object-cover brightness-[0.3]" alt="" />
                    </div>
                    <div className="relative z-10 text-left">
                      <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Anantara Wellness</span>
                      <h3 className="text-xl font-serif text-white mt-1">Balinese Massage Appointment</h3>
                    </div>
                    <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between shadow-2xl">
                      <div>
                        <h4 className="text-xs font-semibold text-white">Royal Balinese Therapy</h4>
                        <p className="text-[9px] text-white/50">90 mins • Massage • Tomorrow 9:00 AM</p>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">CONFIRMED</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Airport Pickup */}
                {step === 3 && (
                  <motion.div 
                    key="airport"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                  >
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <img src="/luxury_lobby_1784286683995.png" className="w-full h-full object-cover brightness-[0.25]" alt="" />
                    </div>
                    <div className="relative z-10 text-left">
                      <span className="text-[8px] bg-gold-base/20 text-gold-light px-2 py-0.5 rounded font-bold uppercase">Airport pickup</span>
                      <h3 className="text-xl font-serif text-white mt-1">Luxury Transfer Dispatch</h3>
                    </div>
                    <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-4 shadow-2xl">
                      <div className="w-10 h-10 rounded-lg bg-gold-base/10 flex items-center justify-center text-gold-base">
                        <Car className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-white">Mercedes Benz S-Class Pickup</h4>
                        <p className="text-[9px] text-white/50">June 26 • 12:30 PM • Flight VN-102</p>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded font-bold">DISPATCHED</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Daily Itinerary */}
                {step === 4 && (
                  <motion.div 
                    key="itinerary"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                  >
                    <div className="text-left mb-2">
                      <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">Timeline curations</span>
                      <h3 className="text-sm font-semibold text-white">Daily Itinerary Summary</h3>
                    </div>

                    <div className="flex-1 flex flex-col gap-2.5 justify-center">
                      {[
                        { time: "08:00 AM", title: "Organic Bayside Breakfast", icon: Utensils },
                        { time: "09:00 AM", title: "Royal Balinese Spa Therapy", icon: Sparkles },
                        { time: "05:00 PM", title: "Da Nang Bay Sunset Yacht Cruise", icon: Compass }
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div 
                            key={idx}
                            className="glass-panel p-3 rounded-lg border border-white/5 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-7 h-7 rounded-md bg-gold-base/10 flex items-center justify-center text-gold-base">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-semibold text-white">{item.title}</span>
                            </div>
                            <span className="text-[10px] text-white/40 font-mono">{item.time}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Invoice & Billing */}
                {step === 5 && (
                  <motion.div 
                    key="billing"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                  >
                    <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-xs text-white/40">
                        <span>Invoice #INV-2901</span>
                        <span>Client: Guest Folio</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/5" />
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-light">
                          <span className="text-white/60">Deluxe Suite Lodging</span>
                          <span className="text-white">₹52,000</span>
                        </div>
                        <div className="flex justify-between text-xs font-light">
                          <span className="text-white/60">Anantara Spa Therapy Session</span>
                          <span className="text-white">₹8,000</span>
                        </div>
                        <div className="flex justify-between text-xs font-light">
                          <span className="text-white/60">Bayside Dining POS Billing</span>
                          <span className="text-white">₹4,500</span>
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-white/5" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">Total Charge</span>
                        <span className="text-lg font-bold text-gold-light">₹64,500</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Folio settled</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3.5 py-1.5 rounded-full font-bold border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>PAYMENT RECEIVED</span>
                      </span>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
