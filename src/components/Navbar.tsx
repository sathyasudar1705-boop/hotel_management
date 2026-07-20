import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const mainNavItems = [
    'Home',
    'Experience',
    'AI Concierge',
    'Rooms',
    'Services',
    'About',
    'Contact'
  ];

  const dropdownItems = [
    'Dining',
    'Spa',
    'Gallery'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Navbar Container */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full z-50 transition-all duration-500 flex items-center justify-between ${
          isScrolled 
            ? 'bg-luxury-navy/80 border border-white/10 backdrop-blur-xl py-2 px-6 shadow-[0_12px_30px_rgba(8,11,17,0.45)] scale-[0.98]' 
            : 'bg-transparent border border-white/5 py-3.5 px-5'
        }`}
      >
        {/* LEFT SIDE: Branding */}
        <div className="flex items-center space-x-2.5 cursor-pointer select-none">
          <div className="w-7 h-7 rounded-full bg-gold-base/10 border border-gold-base/20 flex items-center justify-center text-gold-base">
            <span className="text-[10px] font-serif font-bold tracking-wider text-gold-base">G</span>
          </div>
          <div className="text-left">
            <h1 className={`font-serif font-light text-white tracking-[0.16em] transition-all duration-500 ${
              isScrolled ? 'text-xs' : 'text-sm'
            }`}>
              GRAND <span className="font-sans font-bold">HOTEL</span>
            </h1>
            <p className="text-[6px] uppercase tracking-[0.25em] text-white/40 font-semibold font-sans mt-0.5">
              Da Nang, Vietnam
            </p>
          </div>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {mainNavItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveItem(item)}
              className="relative text-[8px] uppercase tracking-[0.2em] font-bold font-sans transition-all duration-300 py-1 hover:translate-y-[-1px]"
              style={{
                color: activeItem === item ? '#C5A880' : 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <span className="hover:text-white transition-colors duration-300">
                {item}
              </span>
              {activeItem === item && (
                <motion.span
                  layoutId="navbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-base rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* More Dropdown menu */}
          <div className="relative group">
            <button className="text-[8px] uppercase tracking-[0.2em] font-bold font-sans text-white/60 hover:text-white transition-all duration-300 py-1 flex items-center space-x-1 cursor-pointer">
              <span>More</span>
              <span className="text-[6px] opacity-75">▼</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-luxury-navy/95 border border-white/10 backdrop-blur-xl rounded-xl py-1.5 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {dropdownItems.map((subItem) => (
                <button
                  key={subItem}
                  onClick={() => setActiveItem(subItem)}
                  className="w-full text-left px-4 py-2 text-[8px] uppercase tracking-[0.2em] font-sans font-bold text-white/60 hover:text-gold-base hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                >
                  {subItem}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <button className="px-4 py-2 glass-panel text-white font-semibold font-sans text-[9px] tracking-wider uppercase rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer">
            Book a Demo
          </button>
          <button className="px-4 py-2 bg-gold-base hover:bg-gold-light text-luxury-navy font-bold font-sans text-[9px] tracking-wider uppercase rounded-full transition-colors duration-300 flex items-center space-x-1 shadow-[0_0_15px_rgba(197,168,128,0.12)] cursor-pointer">
            <span>Start AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 w-full h-screen bg-luxury-navy/95 backdrop-blur-3xl z-[100] p-10 flex flex-col justify-between text-left"
          >
            {/* Header bar */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-gold-base">
                  <span className="text-[10px] font-serif font-bold text-gold-base">G</span>
                </div>
                <h1 className="font-serif font-light text-white tracking-[0.16em] text-xs">
                  GRAND <span className="font-sans font-bold">HOTEL</span>
                </h1>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col space-y-3.5 my-auto">
              {[...mainNavItems, ...dropdownItems].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => {
                    setActiveItem(item);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xl font-serif font-light text-left hover:text-gold-base transition-colors duration-300"
                  style={{
                    color: activeItem === item ? '#C5A880' : '#FFFFFF'
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* CTA / Footer bottom in Mobile */}
            <div className="flex flex-col space-y-3 w-full">
              <button className="w-full py-3.5 bg-gold-base text-luxury-navy font-bold font-sans text-xs tracking-widest uppercase rounded-full transition-colors duration-300">
                Start AI Concierge
              </button>
              <button className="w-full py-3.5 border border-white/10 glass-panel text-white font-semibold font-sans text-xs tracking-widest uppercase rounded-full transition-colors duration-300">
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
