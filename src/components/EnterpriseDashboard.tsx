import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, BedDouble, ClipboardList, Utensils, 
  Receipt, BarChart3, Sparkles, User, RefreshCw, 
  CheckCircle, Compass, TrendingUp, AlertCircle 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EnterpriseDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState(0);

  // States to simulate internal data changes
  const [occupancyVal, setOccupancyVal] = useState(88);
  const [revenueVal, setRevenueVal] = useState(255000);
  const [cleaningStatus, setCleaningStatus] = useState("Cleaning");
  const [housekeepingProgress, setHousekeepingProgress] = useState(72);
  const [billingPaid, setBillingPaid] = useState(false);

  const stages = [
    { label: "Reservations", icon: CalendarDays },
    { label: "Room Status", icon: BedDouble },
    { label: "Housekeeping", icon: ClipboardList },
    { label: "Restaurant POS", icon: Utensils },
    { label: "Billing & Folio", icon: Receipt },
    { label: "Analytics", icon: BarChart3 },
    { label: "AI Insights", icon: Sparkles }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Pinning the dashboard for 6 viewport heights of scroll progress
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Divide progress into 7 equal stages (0 to 6)
        const currentStage = Math.min(Math.floor(progress * 7), 6);
        setStage(currentStage);
      }
    });

    // Simulate real-time dashboard events based on active stages
    let interval: any;
    if (stage === 0) {
      // Stage 0: Reservations Booking simulation
      const t1 = setTimeout(() => {
        setOccupancyVal(92);
        setRevenueVal(290000);
      }, 2000);
      return () => clearTimeout(t1);
    } 
    else if (stage === 1) {
      // Stage 1: Room status toggle
      const t2 = setTimeout(() => {
        setCleaningStatus("Available");
      }, 2000);
      return () => clearTimeout(t2);
    } 
    else if (stage === 2) {
      // Stage 2: Housekeeping progress bar
      const t3 = setTimeout(() => {
        setHousekeepingProgress(96);
      }, 2000);
      return () => clearTimeout(t3);
    }
    else if (stage === 4) {
      // Stage 4: Billing paid state
      const t4 = setTimeout(() => {
        setBillingPaid(true);
      }, 2500);
      return () => clearTimeout(t4);
    }

    return () => {
      pin.kill();
      clearInterval(interval);
    };
  }, [stage]);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-[600vh] bg-luxury-navy overflow-hidden z-10"
    >
      {/* Pinned Dashboard Container */}
      <div 
        ref={containerRef}
        className="w-full h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* Layered Background Lights */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-gold-base/5 filter blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 filter blur-[120px]" />
        </div>

        {/* Immersive Dashboard Layout */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-20 relative z-10 h-full flex flex-col justify-center gap-8">
          
          {/* Narrative Intro & Transition Header */}
          <div className="text-left max-w-2xl">
            <span className="text-xs tracking-[0.25em] font-semibold text-gold-base uppercase block mb-2">
              The Hotel Operating System
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white leading-tight">
              Behind the Elegance
            </h2>
            <p className="text-white/60 font-sans text-xs md:text-sm mt-2 font-light">
              "Behind every unforgettable stay is intelligent automation." System tracks lodging, check-outs, room cleanings, and dining tallies in a single dashboard.
            </p>
          </div>

          {/* Interactive Tablet Dashboard Frame */}
          <div className="w-full h-[450px] md:h-[500px] rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl grid grid-cols-12">
            
            {/* 1. Left Sidebar Navigation Panel */}
            <div className="col-span-3 border-r border-white/5 bg-luxury-blue/40 p-4 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Brand Logo */}
                <div className="flex items-center space-x-2 px-2">
                  <span className="logo-serif text-white font-bold text-lg">Grand Portal</span>
                  <span className="text-[8px] bg-gold-base/20 text-gold-light px-1.5 py-0.5 rounded font-bold uppercase">
                    v1.0
                  </span>
                </div>

                {/* Sidebar menu links */}
                <nav className="flex flex-col gap-1.5">
                  {stages.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = stage === idx;
                    return (
                      <div 
                        key={idx}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-300 text-left ${
                          isActive 
                            ? 'bg-gold-base/10 text-gold-light border-l-2 border-gold-base' 
                            : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-[11px] font-semibold tracking-wider font-sans">{item.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar bottom indicator */}
              <div className="flex items-center space-x-2 px-2 text-white/30 text-[9px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CORE LOGISTICS ONLINE</span>
              </div>
            </div>

            {/* 2. Main Content Area viewport with morphing screens */}
            <div className="col-span-9 bg-luxury-navy/40 relative overflow-hidden flex flex-col">
              
              {/* Dashboard Content Header */}
              <div className="w-full border-b border-white/5 px-6 py-4 flex items-center justify-between z-10 bg-luxury-navy/20">
                <div className="text-left">
                  <h4 className="text-xs uppercase tracking-wider text-white/50 font-bold">
                    Module View
                  </h4>
                  <h3 className="text-sm font-semibold text-white mt-0.5">
                    {stages[stage].label}
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Live Synced</span>
                  <RefreshCw className="w-3.5 h-3.5 text-gold-base animate-spin" />
                </div>
              </div>

              {/* Morphing screen displays */}
              <div className="flex-1 w-full relative p-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  
                  {stage === 0 && (
                    <motion.div 
                      key="reservation"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        <div className="glass-panel p-4 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block">Daily Occupancy</span>
                          <h4 className="text-2xl font-bold text-white mt-1 animate-pulse">{occupancyVal}%</h4>
                          <span className="text-[9px] text-emerald-400 mt-1 block">▲ +4% Booking in progress</span>
                        </div>
                        <div className="glass-panel p-4 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block">Revenue Generated</span>
                          <h4 className="text-2xl font-bold text-gold-light mt-1">₹{revenueVal.toLocaleString()}</h4>
                          <span className="text-[9px] text-white/30 mt-1 block">Live Folio settling</span>
                        </div>
                        <div className="glass-panel p-4 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block">Check-ins Today</span>
                          <h4 className="text-2xl font-bold text-white mt-1">12 / 16</h4>
                          <span className="text-[9px] text-white/30 mt-1 block">4 pending arrivals</span>
                        </div>
                      </div>

                      {/* Live reservation progress message */}
                      <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-gold-base/10 flex items-center justify-center text-gold-base">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold text-white">Guest Reservation Requested</h5>
                            <p className="text-[10px] text-white/50">Room 204 • Deluxe Beach Front</p>
                          </div>
                        </div>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                          SUCCESSFULLY BOOKED
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 1 && (
                    <motion.div 
                      key="rooms"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="grid grid-cols-4 gap-4 flex-1 items-center">
                        {[
                          { room: "101", status: "Occupied", color: "bg-red-500/20 text-red-400 border-red-500/40" },
                          { room: "102", status: "Available", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
                          { room: "103", status: cleaningStatus, color: cleaningStatus === "Cleaning" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
                          { room: "104", status: "Maintenance", color: "bg-white/5 text-white/50 border-white/10" }
                        ].map((item, idx) => (
                          <div 
                            key={idx}
                            className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col justify-between h-28"
                          >
                            <span className="text-xs text-white/40 font-bold uppercase">Suite {item.room}</span>
                            <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase border text-center ${item.color}`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-white/40 flex items-center space-x-2 pt-4">
                        <AlertCircle className="w-4 h-4 text-gold-base" />
                        <span>Interactive Room status shifts dynamically once housekeeping logs checkout.</span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 2 && (
                    <motion.div 
                      key="housekeeping"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="space-y-4">
                        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-semibold text-white">Suite 202 Clean Task</h5>
                            <p className="text-[10px] text-white/50">Assigned to housekeeping lead: Maria</p>
                          </div>
                          <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded font-bold uppercase">
                            IN PROGRESS
                          </span>
                        </div>

                        {/* Animated progress bar */}
                        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white/60">Housekeeping Completion Rate</span>
                            <span className="text-gold-light font-bold">{housekeepingProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: "72%" }}
                              animate={{ width: `${housekeepingProgress}%` }}
                              className="h-full bg-gold-base"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-white/40 flex items-center space-x-2 pt-4">
                        <CheckCircle className="w-4 h-4 text-gold-base" />
                        <span>Auto-assigned cleaning shifts update task dashboards.</span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 3 && (
                    <motion.div 
                      key="pos"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="space-y-3">
                        {[
                          { item: "1x Grilled Sea Bass, 1x Chardonnay", table: "Table 12", time: "2 min ago", status: "PREPARING", color: "bg-amber-500/20 text-amber-400 border-amber-500/20" },
                          { item: "2x Wagyu Beef Medallions, 1x Pinot Noir", table: "Table 04", time: "Just Now", status: "SERVED", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20" }
                        ].map((order, idx) => (
                          <div 
                            key={idx}
                            className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center justify-between"
                          >
                            <div className="text-left">
                              <h5 className="text-xs font-semibold text-white">{order.item}</h5>
                              <p className="text-[10px] text-white/50">{order.table} • {order.time}</p>
                            </div>
                            <span className={`text-[9px] border px-2 py-1 rounded font-bold ${order.color}`}>
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-white/40 flex items-center space-x-2 pt-4">
                        <Compass className="w-4 h-4 text-gold-base" />
                        <span>Dining orders sync directly to guest room invoices.</span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 4 && (
                    <motion.div 
                      key="billing"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/40">Invoice #INV-2901</span>
                          <span className="text-white/40">Client: Clara Valenzuela</span>
                        </div>
                        <div className="w-full h-[1px] bg-white/5" />
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-light">
                            <span className="text-white/60">Deluxe Beach Front Suite (2 Nights)</span>
                            <span className="text-white">₹52,000</span>
                          </div>
                          <div className="flex justify-between text-xs font-light">
                            <span className="text-white/60">Anantara Spa Therapy Session</span>
                            <span className="text-white">₹8,000</span>
                          </div>
                          <div className="flex justify-between text-xs font-light">
                            <span className="text-white/60">La Mer Dining Pavillion POS</span>
                            <span className="text-white">₹4,500</span>
                          </div>
                        </div>
                        <div className="w-full h-[1px] bg-white/5" />
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">Total Charge</span>
                          <span className="text-lg font-bold text-gold-light">₹64,500</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Folio Settlement</span>
                        <AnimatePresence mode="wait">
                          {!billingPaid ? (
                            <motion.span 
                              key="processing"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-[10px] bg-gold-base/20 text-gold-light px-3.5 py-1 rounded-full font-bold flex items-center gap-1.5"
                            >
                              <span className="w-2.5 h-2.5 border border-gold-base border-t-transparent rounded-full animate-spin" />
                              <span>Processing Settle</span>
                            </motion.span>
                          ) : (
                            <motion.span 
                              key="paid"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full font-bold border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                            >
                              PAYMENT RECEIVED
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {stage === 5 && (
                    <motion.div 
                      key="analytics"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="grid grid-cols-2 gap-4 flex-1 items-center">
                        {/* Revenue line chart mockup */}
                        <div className="glass-panel p-4 rounded-xl border border-white/5 h-36 flex flex-col justify-between relative overflow-hidden">
                          <div className="relative z-10 text-left">
                            <span className="text-[8px] text-white/40 uppercase tracking-widest block font-bold">Revenue Growth</span>
                            <span className="text-lg font-bold text-white font-sans mt-0.5">₹4,25,000 / mo</span>
                          </div>
                          
                          {/* Animated line chart drawing simulation */}
                          <div className="w-full h-10 flex items-end gap-1.5 z-10">
                            {[15, 30, 25, 45, 60, 50, 75, 90].map((h, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.08, duration: 0.8 }}
                                className="flex-1 bg-gold-base/30 rounded-t border-t border-gold-base/50"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Guest Satisfaction gauge */}
                        <div className="glass-panel p-4 rounded-xl border border-white/5 h-36 flex flex-col justify-between">
                          <div className="text-left">
                            <span className="text-[8px] text-white/40 uppercase tracking-widest block font-bold">Satisfaction</span>
                            <span className="text-lg font-bold text-white mt-0.5">98.4% Exceptional</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] text-gold-light font-bold">
                            <TrendingUp className="w-4 h-4" />
                            <span>+1.2% higher guest rating</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-white/40 flex items-center space-x-2 pt-4">
                        <AlertCircle className="w-4 h-4 text-gold-base" />
                        <span>Data feeds update automatically from checkout invoice closures.</span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 6 && (
                    <motion.div 
                      key="ai"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">Expected Revenue</span>
                          <h4 className="text-lg font-bold text-gold-light mt-0.5 animate-pulse">₹4,25,000</h4>
                        </div>
                        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">VIP Guests Arriving</span>
                          <h4 className="text-lg font-bold text-white mt-0.5">5 Guests</h4>
                        </div>
                        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">Check-outs Today</span>
                          <h4 className="text-lg font-bold text-white mt-0.5">12 Rooms</h4>
                        </div>
                        <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                          <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">Rooms Need Cleaning</span>
                          <h4 className="text-lg font-bold text-white mt-0.5">7 Suites</h4>
                        </div>
                      </div>

                      {/* Final AI insights confirmation bubble */}
                      <div className="glass-panel p-4 rounded-xl border border-gold-base/30 bg-gold-base/5 flex items-center justify-between shadow-2xl">
                        <div className="flex items-center space-x-3">
                          <Sparkles className="w-5 h-5 text-gold-base animate-pulse shrink-0" />
                          <p className="text-xs text-white/80 leading-relaxed font-light">
                            "System is stable. Housekeeping, booking folios, and POS billing updates are successfully synced."
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
