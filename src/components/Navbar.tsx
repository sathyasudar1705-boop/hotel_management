import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_ITEMS = ['Home', 'Experience', 'AI Concierge', 'Rooms', 'Services', 'About', 'Contact'];
const MORE_ITEMS = ['Dining', 'Spa', 'Gallery'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile]     = useState(false);
  const [active, setActive]     = useState('Home');
  const [show, setShow]         = useState(false);   // triggers full intro
  const [showNav, setShowNav]   = useState(false);   // triggers nav+cta stagger

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function setIsScrolled(v: boolean) { setScrolled(v); }

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 150);
    const t2 = setTimeout(() => setShowNav(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* Fixed centering wrapper */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">

        {/* Animating pill */}
        <motion.nav
          initial={{ width: 52, opacity: 0, y: -28 }}
          animate={{
            width:  show ? '92%'  : 52,
            opacity: show ? 1     : 0,
            y:       show ? 0     : -28,
            paddingTop:    scrolled ? 6  : 12,
            paddingBottom: scrolled ? 6  : 12,
            paddingLeft:   show ? (scrolled ? 20 : 16) : 8,
            paddingRight:  show ? (scrolled ? 20 : 16) : 8,
          }}
          transition={{
            width:         { duration: 1.1,  ease: [0.16,1,0.3,1] },
            opacity:       { duration: 0.4,  ease: 'easeOut' },
            y:             { duration: 0.55, ease: [0.16,1,0.3,1] },
            paddingTop:    { duration: 0.4 },
            paddingBottom: { duration: 0.4 },
            paddingLeft:   { duration: 1.05, ease: [0.16,1,0.3,1] },
            paddingRight:  { duration: 1.05, ease: [0.16,1,0.3,1] },
          }}
          style={{ maxWidth: '80rem' }}
          className={`flex items-center justify-between rounded-full overflow-hidden
            transition-[background,border-color,box-shadow] duration-500
            ${scrolled
              ? 'bg-white/95 border border-border-beige backdrop-blur-2xl shadow-[0_8px_28px_rgba(43,43,43,0.09)]'
              : 'bg-white/20 border border-white/30 backdrop-blur-md'
            }`}
        >
          {/* ── Logo ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none">
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1], delay: 0.15 }}
              className="w-7 h-7 rounded-full bg-gold-base/10 border border-gold-base/25
                         flex items-center justify-center shrink-0"
            >
              <span className="text-[11px] font-serif font-bold text-gold-base">G</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1], delay: 0.4 }}
            >
              <p className={`font-serif font-light text-charcoal tracking-[0.16em] leading-none
                transition-all duration-500 ${scrolled ? 'text-[11px]' : 'text-[13px]'}`}>
                GRAND <span className="font-sans font-bold">HOTEL</span>
              </p>
              <p className="text-[5.5px] uppercase tracking-[0.28em] text-charcoal/45 font-semibold mt-0.5">
                Da Nang, Vietnam
              </p>
            </motion.div>
          </div>

          {/* ── Nav items ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.22,1,0.36,1], delay: i * 0.07 }}
                onClick={() => setActive(item)}
                className="relative py-1 text-[8px] uppercase tracking-[0.2em] font-bold
                           font-sans transition-all duration-300 hover:-translate-y-px"
                style={{ color: active === item ? '#CDAA6D' : 'rgba(43,43,43,0.6)' }}
              >
                <span className="hover:text-charcoal transition-colors duration-300">{item}</span>
                {active === item && (
                  <motion.span
                    layoutId="activeBar"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold-base rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* More */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.22,1,0.36,1], delay: NAV_ITEMS.length * 0.07 }}
              className="relative group"
            >
              <button className="py-1 text-[8px] uppercase tracking-[0.2em] font-bold font-sans
                                 text-charcoal/60 hover:text-charcoal transition-colors duration-300
                                 flex items-center gap-1 cursor-pointer">
                <span>More</span><span className="text-[6px]">▼</span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 py-1.5
                              bg-white/96 border border-border-beige backdrop-blur-xl rounded-xl
                              shadow-2xl opacity-0 invisible group-hover:opacity-100
                              group-hover:visible transition-all duration-300 z-50">
                {MORE_ITEMS.map(s => (
                  <button key={s} onClick={() => setActive(s)}
                    className="w-full text-left px-4 py-2 text-[8px] uppercase tracking-[0.2em]
                               font-bold font-sans text-charcoal/60 hover:text-gold-base
                               hover:bg-soft-sand/50 transition-colors duration-200 cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── CTA Buttons ───────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <motion.button
              initial={{ opacity: 0, x: 16 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.45, ease: [0.16,1,0.3,1], delay: (NAV_ITEMS.length + 1) * 0.07 }}
              className="px-4 py-1.5 bg-white/80 border border-border-beige text-charcoal font-semibold
                         text-[8.5px] tracking-wider uppercase rounded-full hover:bg-soft-sand/50
                         transition-colors duration-300 cursor-pointer font-sans"
            >
              Book a Demo
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 16 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.45, ease: [0.16,1,0.3,1], delay: (NAV_ITEMS.length + 1) * 0.07 + 0.1 }}
              className="px-4 py-1.5 bg-gradient-to-r from-gold-base to-gold-dark hover:brightness-110
                         text-white font-bold text-[8.5px] tracking-wider uppercase rounded-full
                         flex items-center gap-1.5 shadow-[0_4px_14px_rgba(205,170,109,0.22)]
                         transition-all duration-300 cursor-pointer font-sans"
            >
              <span>Start AI</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            onClick={() => setMobile(true)}
            className="lg:hidden w-8 h-8 rounded-full bg-white/80 border border-border-beige
                       flex items-center justify-center text-charcoal
                       hover:bg-soft-sand/40 transition-colors duration-300 shrink-0"
          >
            <Menu className="w-4 h-4" />
          </motion.button>
        </motion.nav>
      </div>

      {/* ── Mobile overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38 }}
            className="fixed inset-0 z-[100] bg-warm-white/98 backdrop-blur-3xl p-10
                       flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gold-base/10 border border-gold-base/25
                                flex items-center justify-center">
                  <span className="text-[11px] font-serif font-bold text-gold-base">G</span>
                </div>
                <p className="font-serif font-light text-charcoal tracking-[0.16em] text-xs">
                  GRAND <span className="font-sans font-bold">HOTEL</span>
                </p>
              </div>
              <button onClick={() => setMobile(false)}
                className="w-8 h-8 rounded-full bg-white border border-border-beige
                           flex items-center justify-center text-charcoal
                           hover:bg-soft-sand transition-colors duration-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-5 my-auto">
              {[...NAV_ITEMS, ...MORE_ITEMS].map((item, i) => (
                <motion.button key={item}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => { setActive(item); setMobile(false); }}
                  className="text-2xl font-serif font-light text-left hover:text-gold-base
                             transition-colors duration-300"
                  style={{ color: active === item ? '#CDAA6D' : '#2B2B2B' }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button className="w-full py-3.5 bg-gradient-to-r from-gold-base to-gold-dark
                                 text-white font-bold font-sans text-xs tracking-widest uppercase rounded-full">
                Start AI Concierge
              </button>
              <button className="w-full py-3.5 border border-border-beige bg-white
                                 text-charcoal font-semibold font-sans text-xs
                                 tracking-widest uppercase rounded-full">
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
