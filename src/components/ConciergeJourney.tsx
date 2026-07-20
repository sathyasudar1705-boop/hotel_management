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
    <div className="relative w-full min-h-screen lg:h-[750px] bg-gradient-to-b from-warm-white via-soft-sand to-warm-white flex items-center justify-center overflow-hidden z-10 py-16">
      {/* Ambient background blur circles */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-base/8 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-ocean-blue/8 filter blur-[120px] pointer-events-none" />

      {/* Static Container (No Scroll Pinning) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT SIDE (40% width / 5 Cols): AI Concierge Interface */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Avatar Video Container */}
            <div className="relative mx-auto lg:mx-0 lg:ml-8">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold-base/20 via-transparent to-ocean-blue/10 blur-xl pointer-events-none" />
              {/* Animated border ring */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-gold-base/40 via-gold-light/20 to-gold-base/40 animate-[spin_8s_linear_infinite] pointer-events-none" />
              {/* Video card */}
              <div className="relative w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden border border-gold-base/20 shadow-[0_12px_40px_rgba(205,170,109,0.18)] bg-gradient-to-b from-[#fdf8f0] to-[#f7f3eb]">
                <video
                  src="/Avatar_video_for_landing_page.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                />
                {/* Bottom name badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-transparent pt-8 pb-3 px-4 text-center">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-gold-base font-bold">AURELIA</p>
                  <p className="text-[7px] uppercase tracking-widest text-warm-gray/60 mt-0.5">AI Concierge · Grand Hotel</p>
                </div>
                {/* Live indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border-beige shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[7px] uppercase tracking-wider text-charcoal/60 font-bold">Live</span>
                </div>
              </div>
            </div>

            {/* Conversation text bubble */}
            <div className="w-full bg-white p-6 rounded-2xl border border-border-beige shadow-[0_4px_20px_rgba(43,43,43,0.06)] relative">
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
                      <span className="text-[9px] uppercase tracking-wider text-warm-gray/60 font-bold block mb-1">GUEST</span>
                      <p className="text-sm text-charcoal italic">"Book a table for two tonight."</p>
                    </div>
                    <div className="w-full h-[1px] bg-border-beige" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                      <p className="text-sm text-warm-gray leading-relaxed font-light">
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
                      <span className="text-[9px] uppercase tracking-wider text-warm-gray/60 font-bold block mb-1">GUEST</span>
                      <p className="text-sm text-charcoal italic">"Book a spa treatment tomorrow morning."</p>
                    </div>
                    <div className="w-full h-[1px] bg-border-beige" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                      <p className="text-sm text-warm-gray leading-relaxed font-light">
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
                      <span className="text-[9px] uppercase tracking-wider text-warm-gray/60 font-bold block mb-1">GUEST</span>
                      <p className="text-sm text-charcoal italic">"Recommend something special."</p>
                    </div>
                    <div className="w-full h-[1px] bg-border-beige" />
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-gold-base font-bold block mb-1">AURELIA</span>
                      <p className="text-sm text-warm-gray leading-relaxed font-light">
                        "Here are some curated experiences for your stay. I'll take care of everything during your stay."
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE (60% width / 7 Cols): Luxury Management Mockup */}
          <div className="lg:col-span-7 relative w-full h-[480px] md:h-[520px] rounded-3xl bg-white border border-border-beige overflow-hidden shadow-[0_8px_40px_rgba(43,43,43,0.08)] flex items-center justify-center">
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
                      className="w-full h-full object-cover brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  </div>

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">GUEST APP</span>
                      <h3 className="text-2xl font-serif text-charcoal font-light mt-1">La Mer Dining</h3>
                    </div>
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] text-warm-gray flex items-center gap-1.5 border border-border-beige">
                      <MapPin className="w-3 h-3 text-gold-base" />
                      <span>Ocean Pavilion</span>
                    </span>
                  </div>

                  {/* Booking Card Confirmation Overlay */}
                  <div className="relative z-10 w-full max-w-sm mx-auto bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-border-beige shadow-[0_4px_20px_rgba(43,43,43,0.1)] flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold-base/10 flex items-center justify-center text-gold-base">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-semibold text-charcoal">Table for Two</h4>
                        <p className="text-[10px] text-warm-gray">Tonight • 7:30 PM</p>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-border-beige" />

                    {/* Booking Confirmation Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">Status</span>
                      <AnimatePresence mode="wait">
                        {!restaurantConfirmed ? (
                          <motion.div 
                            key="confirming"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gold-base/20 border border-gold-base/40 text-gold-dark px-3 py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5"
                          >
                            <span className="w-3 h-3 border-2 border-gold-base border-t-transparent rounded-full animate-spin" />
                            <span>Confirming...</span>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="confirmed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>TABLE RESERVED</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="relative z-10 text-left">
                    <p className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">Seating preference</p>
                    <p className="text-xs text-warm-gray mt-1 font-light">Seaside breeze deck, outdoor terrace</p>
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
                      className="w-full h-full object-cover brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  </div>

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">GUEST APP</span>
                      <h3 className="text-2xl font-serif text-charcoal font-light mt-1">Anantara Wellness</h3>
                    </div>
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] text-warm-gray flex items-center gap-1.5 border border-border-beige">
                      <Sparkle className="w-3 h-3 text-gold-base" />
                      <span>Spa Suite 04</span>
                    </span>
                  </div>

                  {/* Selected Spa treatments list with confirmations */}
                  <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-3">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-border-beige flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-soft-sand flex items-center justify-center text-warm-gray font-semibold text-xs">A</div>
                        <div className="text-left">
                          <h4 className="text-xs font-semibold text-charcoal">Lotus Flower Facial</h4>
                          <p className="text-[9px] text-warm-gray">60 mins • Facial</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-warm-gray/60 uppercase tracking-widest font-bold">Selected</span>
                    </div>

                    <motion.div 
                      animate={{ borderColor: spaConfirmed ? "rgba(16, 185, 129, 0.4)" : "rgba(205,170,109,0.5)" }}
                      className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border flex items-center justify-between shadow-[0_4px_15px_rgba(43,43,43,0.06)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold-base/15 flex items-center justify-center text-gold-base font-semibold text-xs">B</div>
                        <div className="text-left">
                          <h4 className="text-xs font-semibold text-charcoal">Royal Balinese Therapy</h4>
                          <p className="text-[9px] text-gold-base">90 mins • Massage</p>
                        </div>
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {!spaConfirmed ? (
                          <motion.span 
                            key="confirming-spa"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] bg-gold-base/15 text-gold-dark px-3 py-1 rounded-full font-bold flex items-center gap-1.5"
                          >
                            <span className="w-2.5 h-2.5 border border-gold-base border-t-transparent rounded-full animate-spin" />
                            <span>Confirming</span>
                          </motion.span>
                        ) : (
                          <motion.span 
                            key="confirmed-spa"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[10px] bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full font-bold"
                          >
                            CONFIRMED
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="relative z-10 flex justify-between text-left">
                    <div>
                      <p className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">Therapist</p>
                      <p className="text-xs text-warm-gray mt-0.5 font-light">Senior Balinese Therapist</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">Appt Time</p>
                      <p className="text-xs text-warm-gray mt-0.5 font-light">Tomorrow • 9:00 AM</p>
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
                      className="w-full h-full object-cover brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  </div>

                  {/* Header info */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">AI CONCIERGE RECOMMENDATIONS</span>
                      <h3 className="text-2xl font-serif text-charcoal font-light mt-1">Special Experiences</h3>
                    </div>
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] text-warm-gray flex items-center gap-1.5 border border-border-beige">
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
                        className="group relative h-24 rounded-xl border border-border-beige overflow-hidden flex items-center justify-between p-4 cursor-pointer hover:border-gold-base/50 transition-colors duration-500 bg-white/60 backdrop-blur-sm"
                      >
                        {/* Card background image */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover brightness-[0.65] group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="relative z-10 text-left">
                          <span className="text-[8px] text-gold-base font-bold uppercase tracking-widest">{item.time}</span>
                          <h4 className="text-sm font-serif text-charcoal font-medium mt-0.5">{item.title}</h4>
                          <p className="text-[10px] text-warm-gray line-clamp-1 font-light max-w-sm mt-0.5">{item.subtitle}</p>
                        </div>
                        <div className="relative z-10 w-8 h-8 rounded-full bg-white/80 border border-border-beige flex items-center justify-center text-warm-gray group-hover:text-gold-base group-hover:bg-gold-base/10 group-hover:border-gold-base/30 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative z-10 text-left">
                    <p className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">Exclusive Access</p>
                    <p className="text-xs text-warm-gray mt-1 font-light">Confirm with one tap. Folio will settle automatically at checkout.</p>
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
