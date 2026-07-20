import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ArrowUpRight, Mail } from 'lucide-react';

function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const end = value;
        if (start === end) return;
        const totalMs = duration * 1000;
        const stepTime = Math.max(Math.floor(totalMs / 40), 30);
        const timer = setInterval(() => {
          start += Math.ceil(end / 30);
          if (start >= end) {
            clearInterval(timer);
            if (active) setCount(end);
          } else {
            if (active) setCount(start);
          }
        }, stepTime);
        return () => clearInterval(timer);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function FinalChapter() {
  const testimonials = [
    {
      quote: "Our guest satisfaction increased dramatically after implementing the AI Concierge.",
      author: "General Manager",
      hotel: "Grand Hotel",
      rating: 5
    },
    {
      quote: "Our reception workload dropped significantly while guest experience improved.",
      author: "Hotel Operations Manager",
      hotel: "Luxury Resort",
      rating: 5
    },
    {
      quote: "Guests love the instant recommendations and seamless booking experience.",
      author: "Hospitality Director",
      hotel: "Ocean View Hotel",
      rating: 5
    }
  ];

  const partners = ["THE SAVOY", "ANANTARA", "AMAN", "ONE&ONLY", "BELMOND"];

  return (
    <div className="relative w-full bg-soft-sand overflow-hidden z-10 py-24 flex flex-col justify-between">
      
      {/* 1. Cinematic Full-Screen Background Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="/luxury_lobby_1784286683995.png" 
          alt="Grand Hotel Lobby Closing scene"
          className="w-full h-full object-cover brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-soft-sand/80 via-transparent to-soft-sand/90 z-10" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 relative z-20 space-y-24">
        
        {/* 2. Editorial Opening */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs tracking-[0.25em] font-semibold text-gold-base uppercase block">
            Proven Performance
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-charcoal leading-tight">
            Trusted by Luxury Hotels. <br />
            <span className="italic text-gold-base font-light">Powered by Intelligent Hospitality.</span>
          </h2>
          <p className="text-warm-gray font-sans text-sm md:text-base leading-relaxed font-light">
            Luxury hotels choose our AI Concierge Platform to deliver unforgettable guest experiences with intelligent automation and world-class service.
          </p>
        </div>

        {/* 3. Premium Animated Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 pt-6">
          {[
            { label: "Guest Rating", val: 5, suffix: " ★", text: "★★★★★ Rating" },
            { label: "Platform Uptime", val: 99, suffix: ".9%", text: "Uptime SLA" },
            { label: "Bookings Managed", val: 50000, suffix: "+", text: "Reservations" },
            { label: "Luxury Hotels", val: 250, suffix: "+", text: "Partner Properties" },
            { label: "Availability", val: 24, suffix: "/7", text: "Live Concierge" },
            { label: "Satisfaction", val: 98, suffix: "%", text: "Guest Experience" }
          ].map((metric, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-border-beige shadow-[0_4px_20px_rgba(43,43,43,0.06)] text-center flex flex-col justify-between">
              <span className="text-[9px] uppercase tracking-widest text-warm-gray/60 font-bold block mb-2">
                {metric.label}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-gold-base font-sans">
                {metric.label === "Guest Rating" ? (
                  <>
                    <Counter value={5} />★
                  </>
                ) : (
                  <Counter value={metric.val} suffix={metric.suffix} />
                )}
              </h3>
              <p className="text-[10px] text-warm-gray mt-1 font-light">{metric.text}</p>
            </div>
          ))}
        </div>

        {/* 4. Floating Premium Glass Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {testimonials.map((card, idx) => (
            <motion.div 
              key={idx}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 5 + idx, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: idx * 0.5 
              }}
              className="bg-white p-6 rounded-2xl border border-border-beige shadow-[0_4px_20px_rgba(43,43,43,0.06)] flex flex-col justify-between hover:border-gold-base/30 transition-colors duration-500 text-left min-h-[220px] hover:shadow-[0_8px_30px_rgba(205,170,109,0.12)]"
            >
              <div className="flex items-center gap-1.5 text-gold-base mb-4">
                {[...Array(card.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-base text-gold-base" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light italic font-sans flex-1">
                "{card.quote}"
              </p>
              <div className="border-t border-border-beige pt-4 mt-4">
                <h4 className="text-xs font-semibold text-charcoal">{card.author}</h4>
                <p className="text-[10px] text-warm-gray font-sans mt-0.5">{card.hotel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. Elegant Client Logos Lineup */}
        <div className="border-y border-border-beige py-8 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, idx) => (
            <span 
              key={idx}
              className="text-[10px] font-serif tracking-[0.3em] font-semibold text-charcoal/35 hover:text-charcoal transition-all duration-500 cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>

        {/* 6. Breathtaking Final Call-To-Action */}
        <div className="text-center max-w-4xl mx-auto space-y-8 pt-6">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-charcoal leading-tight">
            Every Exceptional Stay <br />
            Begins With <span className="italic text-gold-base font-light">Intelligent Hospitality.</span>
          </h2>
          <p className="text-warm-gray font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
            Experience the future of luxury hotel management with an AI Concierge designed to elevate every guest journey.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-gradient-to-r from-gold-base to-gold-dark hover:brightness-110 text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 shadow-[0_8px_25px_rgba(205,170,109,0.25)] cursor-pointer"
            >
              <span>Start AI Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white hover:bg-soft-sand text-charcoal border border-border-beige px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(43,43,43,0.06)]"
            >
              <span>Book a Live Demo</span>
              <ArrowUpRight className="w-4 h-4 text-warm-gray" />
            </motion.button>
          </div>
        </div>

        {/* 7. Premium Minimal Footer */}
        <footer className="border-t border-border-beige pt-16 mt-16 text-left space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <h4 className="logo-serif text-charcoal font-bold text-lg">Grand Portal</h4>
              <p className="text-[11px] text-warm-gray leading-relaxed font-light max-w-xs">
                The world's leading intelligence engine crafted exclusively for five-star hospitality brands, luxury suites, and private resorts.
              </p>
              
              {/* Newsletter subscribe */}
              <div className="pt-2">
                <span className="text-[9px] uppercase tracking-widest text-gold-base font-bold block mb-2">
                  Subscribe to updates
                </span>
                <div className="flex max-w-sm rounded-full overflow-hidden border border-border-beige bg-white p-1">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-transparent px-4 py-2 text-xs text-charcoal placeholder-warm-gray/50 focus:outline-none"
                  />
                  <button className="bg-gold-base hover:bg-gold-dark text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["AI Concierge", "Guest Folio", "Operations POS", "Smart Locks"]
              },
              {
                title: "Solutions",
                links: ["Luxury Resorts", "Boutique Hotels", "Private Villas", "Guest App"]
              },
              {
                title: "Support",
                links: ["Documentation", "API Reference", "SLA Status", "Contact Desk"]
              }
            ].map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-gold-base font-bold">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs font-light text-warm-gray">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href="#" className="hover:text-charcoal transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border-beige pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-warm-gray/50 gap-4">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-charcoal transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-charcoal transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-charcoal transition-colors duration-300">PCI Compliance</a>
            </div>
            <div>
              <span>© 2026 MONALISA RESORTS. ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
