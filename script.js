/* ==========================================================================
   Aurelia AI Interactive Script (Monalisa Inspired)
   ========================================================================== */

let lenis;

// Dialogue sequence for AI Booking Concierge Demo
const bookingScript = [
  { text: "Welcome to Grand Hotel Da Nang. I am Aurelia, your AI concierge. Let me show you how to book a suite.", delay: 4000 },
  { text: "First, let's select a check-in date. I'll reserve starting June 26th.", action: () => selectCheckIn(), delay: 3500 },
  { text: "Now, let's choose our departure check-out date: June 29th.", action: () => selectCheckOut(), delay: 3500 },
  { text: "We will allocate the reservation for 03 guests.", action: () => selectGuests(), delay: 3000 },
  { text: "Searching room availability ledger in real-time...", action: () => clickAvailability(), delay: 4000 },
  { text: "Luxury suite allocated! Your booking confirmation email has been dispatched.", action: () => showToast(), delay: 5000 }
];

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCustomCursor();
  initScrollAnimations();
  initRoomsList();
  initMobileMenu();
  lucide.createImages();
  
  // Start the AI Booking loop
  startAiBookingDemo();
});

// ==========================================================================
// 1. Lenis Smooth Scroll
// ==========================================================================
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easeOut
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Global Scroll Helper
window.scrollToSection = function(targetSelector) {
  lenis.scrollTo(targetSelector, {
    offset: -80,
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });
};

// ==========================================================================
// 2. Custom Cursor Follower
// ==========================================================================
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  
  if (!cursor || !follower) return;

  document.addEventListener('mousemove', (e) => {
    // Immediate cursor position
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Delayed follower position
    follower.style.left = `${e.clientX}px`;
    follower.style.top = `${e.clientY}px`;
  });

  // Scale follower on links and button hovers
  const targets = document.querySelectorAll('a, button, .room-item, [onclick]');
  targets.forEach((t) => {
    t.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hovering');
    });
    t.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hovering');
    });
  });
}

// ==========================================================================
// 3. Scroll-driven Reveals (GSAP & ScrollTrigger)
// ==========================================================================
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Viewport Image transitions (opacity, scale, blur)
  const cinematicImgs = document.querySelectorAll('.cinematic-zoom-img');
  cinematicImgs.forEach((img) => {
    gsap.set(img, {
      scale: 0.85,
      opacity: 0,
      filter: 'blur(8px)'
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: img.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    tl.to(img, {
      scale: 1.0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'none'
    })
    .to(img, {
      scale: 1.12,
      yPercent: 8,
      duration: 0.4,
      ease: 'none'
    })
    .to(img, {
      scale: 1.25,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.3,
      ease: 'none'
    });
  });

  // Cards entrance reveal
  const cards = document.querySelectorAll('.room-item, .about-photo, .testimonial-box');
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      rotateX: 8,
      rotateY: -8,
      scale: 0.96,
      transformPerspective: 1000,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// ==========================================================================
// 4. Interactive AI Booking loop demo
// ==========================================================================
async function startAiBookingDemo() {
  const transcriptEl = document.getElementById('ai-transcript');
  if (!transcriptEl) return;

  while (true) {
    // Reset inputs
    resetBookingWidget();
    await delay(1500);

    for (const step of bookingScript) {
      // Typewriter transcript update
      await typeText(transcriptEl, step.text);
      
      // Trigger widget updates
      if (step.action) {
        step.action();
      }
      
      await delay(step.delay);
    }
  }
}

function resetBookingWidget() {
  document.getElementById('val-checkin').textContent = '--';
  document.getElementById('val-checkout').textContent = '--';
  document.getElementById('val-guests').textContent = '--';
  document.getElementById('booking-toast').classList.remove('show');
  
  const boxes = document.querySelectorAll('.form-input-box');
  boxes.forEach(b => b.classList.remove('active'));
}

function selectCheckIn() {
  const el = document.getElementById('val-checkin');
  el.textContent = '26 / June';
  el.parentElement.classList.add('active');
}

function selectCheckOut() {
  const el = document.getElementById('val-checkout');
  el.textContent = '29 / June';
  document.querySelectorAll('.form-input-box')[0].classList.remove('active');
  el.parentElement.classList.add('active');
}

function selectGuests() {
  const el = document.getElementById('val-guests');
  el.textContent = '03';
  document.querySelectorAll('.form-input-box')[1].classList.remove('active');
  el.parentElement.classList.add('active');
}

function clickAvailability() {
  document.querySelectorAll('.form-input-box')[2].classList.remove('active');
  const btn = document.getElementById('btn-availability');
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

function showToast() {
  document.getElementById('booking-toast').classList.add('show');
}

function typeText(element, text) {
  return new Promise(resolve => {
    element.textContent = '';
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < text.length) {
        element.textContent += text[idx];
        idx++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, 25);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================================================
// 5. Rooms tab switcher list
// ==========================================================================
function initRoomsList() {
  const rooms = document.querySelectorAll('.room-item');
  const displayImg = document.getElementById('active-room-img');

  rooms.forEach((room) => {
    room.addEventListener('click', () => {
      // Remove active class
      rooms.forEach(r => r.classList.remove('active'));
      room.classList.add('active');
      
      // Update display image
      const newImg = room.getAttribute('data-image');
      if (displayImg && newImg) {
        gsap.to(displayImg, {
          opacity: 0,
          scale: 0.96,
          duration: 0.3,
          onComplete: () => {
            displayImg.setAttribute('src', newImg);
            gsap.to(displayImg, {
              opacity: 1,
              scale: 1,
              duration: 0.5
            });
          }
        });
      }
    });
  });
}

// ==========================================================================
// 6. Navigation and Modals
// ==========================================================================
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      lucide.createImages();
    });
  }
}

window.openContactModal = function() {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.classList.add('open');
};

window.closeContactModal = function() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.remove('open');
    const form = modal.querySelector('form');
    if (form) form.classList.remove('hidden');
    const msg = document.getElementById('modal-success-msg');
    if (msg) msg.classList.remove('show');
  }
};

window.submitDemoForm = function() {
  const form = document.querySelector('.modal-form');
  const msg = document.getElementById('modal-success-msg');
  if (form) form.classList.add('hidden');
  if (msg) {
    msg.classList.add('show');
    lucide.createImages();
  }
};
