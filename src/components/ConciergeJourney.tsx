import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Sparkle, MapPin, Compass, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ConciergeJourney() {
  const [stage, setStage] = useState(0);
  
  // Booking simulation states
  const [restaurantConfirmed, setRestaurantConfirmed] = useState(false);
  const [spaConfirmed, setSpaConfirmed] = useState(false);



  useEffect(() => {
    let timer: any;

    // Simulation Sequence
    if (stage === 0) {
      // 1. Reset states
      setRestaurantConfirmed(false);
      setSpaConfirmed(false);

      // 2. Confirm restaurant booking after 2.5 seconds
      timer = setTimeout(() => {
        setRestaurantConfirmed(true);
        
        // 3. Transition to next stage 1.8 seconds after confirmation completes
        timer = setTimeout(() => {
          setStage(1);
        }, 1800);
      }, 2500);
    } 
    else if (stage === 1) {
      // 1. Confirm spa booking after 2.5 seconds
      timer = setTimeout(() => {
        setSpaConfirmed(true);

        // 2. Transition to next stage 1.8 seconds after confirmation
        timer = setTimeout(() => {
          setStage(2);
        }, 1800);
      }, 2500);
    } 
    else if (stage === 2) {
      // 1. Stay on recommendations for 6 seconds, then reset loop back to restaurant
      timer = setTimeout(() => {
        setStage(0);
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="relative w-full min-h-screen lg:h-[750px] bg-gradient-to-b from-luxury-navy via-luxury-blue to-luxury-navy flex items-center justify-center overflow-hidden z-10 py-16">
      {/* Ambient background blur circles */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-base/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 filter blur-[100px] pointer-events-none" />

      {/* Static Container (No Scroll Pinning) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT SIDE (40% width / 5 Cols): AI Concierge Interface */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Glowing Avatar Video Container (no roundness, standard aspect ratio card) */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center mx-auto lg:mx-0 lg:ml-12 bg-[radial-gradient(circle_at_center,_rgba(197,168,128,0.18)_0%,_rgba(14,22,36,0.95)_100%)]">
              {/* Embedded Video */}
              <video 
                src="/Avatar_video_for_landing_page.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-contain opacity-100 mix-blend-screen"
              />
            </div>

            {/* Conversation text bubble */}
            <div className="w-full glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {stage === 0 && (
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block mb-1">GUEST</span>
                      <p className="text-sm text-gold-light italic">"Book a table for two tonight."</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        {restaurantConfirmed 
                          ? "Table successfully reserved! I have allocated a candlelight table for two at La Mer overlooking the bay at 7:30 PM." 
                          : "Welcome to Grand Hotel. I'm your personal AI Concierge. Searching for open reservations at La Mer restaurant..."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {stage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block mb-1">GUEST</span>
                      <p className="text-sm text-gold-light italic">"Book a spa treatment tomorrow morning."</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        {spaConfirmed 
                          ? "Your Royal Balinese Therapy at 9:00 AM is officially confirmed. A private spa suite has been allocated for you."
                          : "Reserving your wellness treatment at Anantara Spa. Allocating senior therapist for tomorrow morning..."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {stage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block mb-1">GUEST</span>
                      <p className="text-sm text-gold-light italic">"Recommend something special."</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        "Here are some curated experiences for your stay. I'll take care of everything during your stay."
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE (60% width / 7 Cols): Luxury Management Mockup */}
          <div className="lg:col-span-7 relative w-full h-[480px] md:h-[520px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div 
                  key="restaurant-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  {/* Backdrop photo */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img 
                      src="/bali_light_pool_1784282527802.png" 
                      alt="La Mer Restaurant"
                      className="w-full h-full object-cover brightness-[0.4]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-transparent to-black/30" />
                  </div>

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">GUEST APP</span>
                      <h3 className="text-2xl font-serif text-white font-light mt-1">La Mer Dining</h3>
                    </div>
                    <span className="glass-panel px-3 py-1.5 rounded-full text-[10px] text-white/60 flex items-center gap-1.5 border border-white/5">
                      <MapPin className="w-3 h-3 text-gold-base" />
                      <span>Ocean Pavilion</span>
                    </span>
                  </div>

                  {/* Booking Card Confirmation Overlay */}
                  <div className="relative z-10 w-full max-w-sm mx-auto glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold-base/10 flex items-center justify-center text-gold-base">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-semibold text-white">Table for Two</h4>
                        <p className="text-[10px] text-white/50">Tonight • 7:30 PM</p>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-white/5" />

                    {/* Booking Confirmation Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Status</span>
                      <AnimatePresence mode="wait">
                        {!restaurantConfirmed ? (
                          <motion.div 
                            key="confirming"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gold-base/20 border border-gold-base/40 text-gold-light px-3 py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(197,168,128,0.1)]"
                          >
                            <span className="w-3 h-3 border-2 border-gold-base border-t-transparent rounded-full animate-spin" />
                            <span>Confirming...</span>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="confirmed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>TABLE RESERVED</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="relative z-10 text-left">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Seating preference</p>
                    <p className="text-xs text-white/70 mt-1 font-light">Seaside breeze deck, outdoor terrace</p>
                  </div>
                </motion.div>
              )}

              {stage === 1 && (
                <motion.div 
                  key="spa-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  {/* Backdrop photo */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img 
                      src="/bali_pool_night_1784281621817.png" 
                      alt="The Anantara Spa"
                      className="w-full h-full object-cover brightness-[0.45]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-transparent to-black/30" />
                  </div>

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">GUEST APP</span>
                      <h3 className="text-2xl font-serif text-white font-light mt-1">Anantara Wellness</h3>
                    </div>
                    <span className="glass-panel px-3 py-1.5 rounded-full text-[10px] text-white/60 flex items-center gap-1.5 border border-white/5">
                      <Sparkle className="w-3 h-3 text-gold-base" />
                      <span>Spa Suite 04</span>
                    </span>
                  </div>

                  {/* Selected Spa treatments list with confirmations */}
                  <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-3">
                    <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 font-semibold text-xs">A</div>
                        <div className="text-left">
                          <h4 className="text-xs font-semibold text-white">Lotus Flower Facial</h4>
                          <p className="text-[9px] text-white/40">60 mins • Facial</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Selected</span>
                    </div>

                    <motion.div 
                      animate={{ borderColor: spaConfirmed ? "rgba(16, 185, 129, 0.4)" : "rgba(197,168,128,0.4)" }}
                      className="glass-panel p-4 rounded-xl border flex items-center justify-between shadow-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold-base/20 flex items-center justify-center text-gold-base font-semibold text-xs">B</div>
                        <div className="text-left">
                          <h4 className="text-xs font-semibold text-gold-light">Royal Balinese Therapy</h4>
                          <p className="text-[9px] text-gold-base/70">90 mins • Massage</p>
                        </div>
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {!spaConfirmed ? (
                          <motion.span 
                            key="confirming-spa"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] bg-gold-base/20 text-gold-light px-3 py-1 rounded-full font-bold flex items-center gap-1.5"
                          >
                            <span className="w-2.5 h-2.5 border border-gold-base border-t-transparent rounded-full animate-spin" />
                            <span>Confirming</span>
                          </motion.span>
                        ) : (
                          <motion.span 
                            key="confirmed-spa"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                          >
                            CONFIRMED
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="relative z-10 flex justify-between text-left">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Therapist</p>
                      <p className="text-xs text-white/70 mt-0.5 font-light">Senior Balinese Therapist</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Appt Time</p>
                      <p className="text-xs text-white/70 mt-0.5 font-light">Tomorrow • 9:00 AM</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 2 && (
                <motion.div 
                  key="recommendations-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                >
                  {/* Backdrop photo */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img 
                      src="/bali_light_suite_1784282511608.png" 
                      alt="Recommended Experiences backdrop"
                      className="w-full h-full object-cover brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-transparent to-black/30" />
                  </div>

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">AI CONCIERGE RECOMMENDATIONS</span>
                      <h3 className="text-2xl font-serif text-white font-light mt-1">Special Experiences</h3>
                    </div>
                    <span className="glass-panel px-3 py-1.5 rounded-full text-[10px] text-white/60 flex items-center gap-1.5 border border-white/5">
                      <Compass className="w-3 h-3 text-gold-base" />
                      <span>Curated For You</span>
                    </span>
                  </div>

                  {/* Recommendation Cards */}
                  <div className="relative z-10 w-full flex flex-col gap-3">
                    {[
                      { 
                        title: "Sunset Infinity Cruise", 
                        subtitle: "Private luxury catamaran tour around Da Nang Bay", 
                        image: "/luxury_pool_1784286709723.png",
                        time: "5:00 PM - 7:30 PM"
                      },
                      { 
                        title: "Private Beach Canopy", 
                        subtitle: "VIP beach setup with candlelit massage treatments", 
                        image: "/bali_light_hero_1784282500805.png",
                        time: "Full Day Access"
                      }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 + 0.2, ease: "easeOut" }}
                        className="group relative h-24 rounded-xl border border-white/15 overflow-hidden flex items-center justify-between p-4 cursor-pointer hover:border-gold-base/50 transition-colors duration-500"
                      >
                        {/* Card background image */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="relative z-10 text-left">
                          <span className="text-[8px] text-gold-base font-bold uppercase tracking-widest">{item.time}</span>
                          <h4 className="text-sm font-serif text-white font-medium mt-0.5">{item.title}</h4>
                          <p className="text-[10px] text-white/60 line-clamp-1 font-light max-w-sm mt-0.5">{item.subtitle}</p>
                        </div>
                        <div className="relative z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-gold-base/20 group-hover:border-gold-base/30 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative z-10 text-left">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Exclusive Access</p>
                    <p className="text-xs text-white/60 mt-1 font-light">Confirm with one tap. Folio will settle automatically at checkout.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
