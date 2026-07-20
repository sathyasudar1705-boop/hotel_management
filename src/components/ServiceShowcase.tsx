import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  const scenes = [
    {
      title: "Fine Dining",
      subtitle: "La Mer Dining Pavilion",
      desc: "Experience award-winning seaside cuisine with personalized AI recommendations and seamless reservations.",
      image: "/scene_dining.png",
      aiDetails: [
        { label: "Seating", value: "Oceanfront Window Deck" },
        { label: "Menu", value: "Chef's Special Tasting Menu" },
        { label: "Pairing", value: "Organic Sommelier Wine Pairing" }
      ],
      aiStatus: "RESERVATION CONFIRMED"
    },
    {
      title: "Spa & Wellness",
      subtitle: "Anantara Spa Suites",
      desc: "Restore your body and mind through personalized wellness experiences curated by your AI Concierge.",
      image: "/scene_spa.png",
      aiDetails: [
        { label: "Treatment", value: "Royal Balinese Therapy (90m)" },
        { label: "Therapist", value: "Senior Balinese Practitioner" },
        { label: "Aroma", value: "Sandalwood & Jasmine Oils" }
      ],
      aiStatus: "APPOINTMENT CONFIRMED"
    },
    {
      title: "Infinity Pool",
      subtitle: "Bespoke Guest Curations",
      desc: "Relax above the horizon while enjoying breathtaking panoramic views of the East Sea.",
      image: "/scene_infinity.png",
      aiDetails: [
        { label: "Allocation", value: "VIP Cliffside Cabana 03" },
        { label: "Amenities", value: "Premium Towel Service" },
        { label: "Refreshments", value: "Local Fruit Platters & Water" }
      ],
      aiStatus: "CABANA DISPATCHED"
    },
    {
      title: "Luxury Suites",
      subtitle: "Ocean Front Lodges",
      desc: "Discover spacious accommodations designed for exceptional comfort and unforgettable moments.",
      image: "/scene_suite.png",
      aiDetails: [
        { label: "Room", value: "King Ocean Front Suite" },
        { label: "Settle", value: "Late Checkout (2:00 PM)" },
        { label: "Inclusions", value: "Complimentary Breakfast Buffet" }
      ],
      aiStatus: "SUITE ASSIGNED"
    },
    {
      title: "Private Experiences",
      subtitle: "Bespoke Guest Curations",
      desc: "Immerse yourself in multiple luxury experiences arranged by our background automated logistics.",
      image: "/scene_private.png",
      aiDetails: [
        { label: "Transportation", value: "VIP Airport S-Class Pickup" },
        { label: "Curations", value: "Sunset Bay Yacht Charter" },
        { label: "Staff", value: "24/7 Dedicated Butler Service" }
      ],
      aiStatus: "LOGISTICS SECURED"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pinning the section itself for 4 viewport heights of scrolling progress (5 scenes total)
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400%",
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const segment = Math.min(Math.floor(progress * 5), 4);
        setActiveScene(segment);
      }
    });

    // Ken Burns background scale transitions on scroll
    const bgTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=400%",
        scrub: true
      }
    });

    scenes.forEach((_, idx) => {
      const startPos = idx / 5;
      bgTimeline.fromTo(`.bg-scene-${idx}`,
        { scale: 1.0 },
        { scale: 1.15, ease: "none" },
        startPos
      );
    });

    return () => {
      pin.kill();
      bgTimeline.kill();
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full h-screen bg-warm-white overflow-hidden z-10"
    >
      {/* Layered Ken Burns Backgrounds */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {scenes.map((scene, idx) => (
          <div 
            key={idx}
            className={`bg-scene-${idx} absolute inset-0 w-full h-full bg-cover bg-center origin-center transition-opacity duration-1000 ease-in-out`}
            style={{ 
              backgroundImage: `url('${scene.image}')`,
              opacity: activeScene === idx ? 0.5 : 0,
              zIndex: activeScene === idx ? 2 : 1
            }}
          />
        ))}
        {/* No overlay — images show at full brightness */}
      </div>

      {/* Content Box Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 relative z-20 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left side: Editorial Headings */}
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-[11px] tracking-[0.3em] font-bold uppercase block" style={{ color: '#A07020' }}>
              {scenes[activeScene].subtitle}
            </span>
            
            <div className="h-44 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-tight" style={{ color: '#111111' }}>
                    {scenes[activeScene].title.split(" ").map((w, i) => (
                      w === "Wellness" || w === "Suites" || w === "Experiences" || w === "Pool" || w === "Dining" ? (
                        <span key={i} className="font-serif italic font-semibold ml-2" style={{ color: '#9A6F1A' }}>{w}</span>
                      ) : (
                        <span key={i} className="font-sans font-extrabold uppercase">{w} </span>
                      )
                    ))}
                  </h2>

                  <p className="font-sans text-sm md:text-base leading-relaxed max-w-lg font-medium" style={{ color: '#2a2a2a' }}>
                    {scenes[activeScene].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Indicator Dots */}
            <div className="flex items-center gap-3 pt-4">
              {scenes.map((_, idx) => (
                <div 
                  key={idx}
                  className="relative w-8 h-1 bg-charcoal/10 rounded-full overflow-hidden"
                >
                  {activeScene === idx && (
                    <motion.div 
                      layoutId="active-indicator-bar"
                      className="absolute inset-0 bg-gold-base"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: AI Personalization Card Panels */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-[340px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene}
                  initial={{ opacity: 0, scale: 0.96, rotateY: 10, y: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotateY: -10, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-border-beige shadow-[0_8px_30px_rgba(43,43,43,0.08)] relative flex flex-col justify-between"
                >
                  {/* Header bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gold-base font-bold">
                      AI Concierge Allocation
                    </span>
                    <Sparkles className="w-4 h-4 text-gold-base animate-pulse" />
                  </div>

                  {/* Specifications List */}
                  <div className="flex flex-col gap-3 my-6">
                    {scenes[activeScene].aiDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-border-beige pb-2">
                        <span className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">
                          {detail.label}
                        </span>
                        <span className="text-xs font-semibold text-charcoal">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Settle Action bar */}
                  <div className="flex items-center justify-between border-t border-border-beige pt-4">
                    <span className="text-[10px] text-warm-gray/60 uppercase tracking-widest font-bold">
                      Status
                    </span>
                    <span className="bg-gold-base/15 border border-gold-base/40 text-gold-dark px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-base" />
                      <span>{scenes[activeScene].aiStatus}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll down indicator for within-showcase progress */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-charcoal/30 text-[9px] uppercase tracking-widest select-none z-30">
        <span>Continue Scroll for experiences</span>
      </div>
    </div>
  );
}
