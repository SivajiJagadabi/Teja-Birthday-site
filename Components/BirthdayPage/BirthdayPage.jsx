// Luxury First Birthday - Single Page React Component
// File: BirthdayPage.jsx
// Description: Single-file, fully responsive, luxurious birthday landing page using TailwindCSS + Framer Motion.
// Instructions:
// 1) Install dependencies: `npm install framer-motion react-icons`
// 2) TailwindCSS must be configured in your project. (https://tailwindcss.com/docs/guides/create-react-app)
// 3) Replace placeholder image URLs with your son's photos in the `GALLERY_IMAGES` array.
// 4) This component is default-exported. Import into App.jsx and render.

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';

// --- Configuration ---
const BIRTHDAY_DATE = '2025-12-27 T18:00:00'; // <-- set to your son's birthday (YYYY-MM-DDTHH:mm:ss)
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80',
  'https://images.unsplash.com/photo-1556228599-9d9c0f4a3f3b?w=1200&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
  'https://images.unsplash.com/photo-1542332213-0c9c0fbe3f8b?w=1200&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&q=80'
];

// Palette inspired by a luxurious theme
// Primary: Royal Blue - #0A1A44    Accent: Gold - #D4AF37    Cream - #FFF5E1

function useCountdown(targetDate) {
  const countDownDate = new Date(targetDate).getTime();
  const [countdown, setCountdown] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, finished: false };
  }

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}

function FloatingBalloon({ style, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: -120, opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 6 + Math.random() * 6, delay }}
      className="absolute"
      style={style}
    >
      <div className="w-12 h-16 rounded-full transform rotate-6 shadow-lg flex items-end justify-center" style={{ background: 'linear-gradient(180deg,#FDE68A,#F59E0B)' }}>
        <div className="w-0.5 h-8 bg-gray-300 -mb-3" />
      </div>
    </motion.div>
  );
}

export default function BirthdayPage() {
  const countdown = useCountdown(BIRTHDAY_DATE);
  const [wishes, setWishes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('birthday_wishes_v1')) || []; } catch { return []; }
  });
  const [wishForm, setWishForm] = useState({ name: '', message: '' });

  useEffect(() => {
    localStorage.setItem('birthday_wishes_v1', JSON.stringify(wishes));
  }, [wishes]);

  function addWish(e) {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) return;
    const newWish = { id: Date.now(), ...wishForm, time: new Date().toISOString() };
    setWishes(prev => [newWish, ...prev]);
    setWishForm({ name: '', message: '' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071033] via-[#0a1a44] to-[#071033] text-white antialiased">
      {/* Decorative balloons */}
      <div className="pointer-events-none">
        <FloatingBalloon style={{ right: '6%', top: '40%', zIndex: 0 }} delay={0} />
        <FloatingBalloon style={{ left: '8%', top: '55%', zIndex: 0 }} delay={1} />
        <FloatingBalloon style={{ left: '60%', top: '30%', zIndex: 0 }} delay={2} />
        <FloatingBalloon style={{ right: '28%', top: '20%', zIndex: 0 }} delay={0.5} />
      </div>

      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FEEBC8] flex items-center justify-center text-[#0A1A44] font-bold shadow-xl">B</div>
          <div>
            <div className="text-sm opacity-80">Celebrating</div>
            <div className="text-xl font-semibold tracking-tight">Baby's 1st Birthday</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm opacity-90">
          <a href="#hero" className="hover:underline">Home</a>
          <a href="#gallery" className="hover:underline">Gallery</a>
          <a href="#timeline" className="hover:underline">Journey</a>
          <a href="#wishes" className="hover:underline">Wishes</a>
          <a href="#invite" className="hover:underline">Invite</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* Hero */}
        <section id="hero" className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-6">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl font-serif leading-tight"
                style={{ color: '#FFF9F0' }}
              >
                Happy 1st Birthday — <span className="text-[#D4AF37]">Our Little Prince</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-xl opacity-85">
                A year of firsts — smiles, giggles and tiny steps. Join us in celebrating this precious milestone.
              </motion.p>

              <div className="flex gap-4 items-center flex-wrap">
                <div className="flex gap-3 items-center">
                  <div className="rounded-lg bg-white/5 px-4 py-3 text-center">
                    <div className="text-xs opacity-80">Days</div>
                    <div className="text-2xl font-semibold">{String(countdown.days).padStart(2, '0')}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 px-4 py-3 text-center">
                    <div className="text-xs opacity-80">Hours</div>
                    <div className="text-2xl font-semibold">{String(countdown.hours).padStart(2, '0')}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 px-4 py-3 text-center">
                    <div className="text-xs opacity-80">Minutes</div>
                    <div className="text-2xl font-semibold">{String(countdown.minutes).padStart(2, '0')}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 px-4 py-3 text-center">
                    <div className="text-xs opacity-80">Seconds</div>
                    <div className="text-2xl font-semibold">{String(countdown.seconds).padStart(2, '0')}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href="#wishes" className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium" style={{ background: 'linear-gradient(90deg,#D4AF37,#FCD34D)', color: '#071033' }}>
                    <FaBirthdayCake /> Send Wishes
                  </a>
                  <a href="#gallery" className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium border border-white/20">View Gallery</a>
                </div>
              </div>

              <div className="mt-3 text-sm opacity-80 flex items-center gap-3">
                <FaClock /> <span>Born on: <strong>Feb 10, 2025 — 6:00 PM</strong></span>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="#invite" className="px-5 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] font-semibold">You're Invited</a>
                <a href="#" className="px-5 py-3 rounded-lg bg-white/5">Share</a>
              </div>
            </div>

            <motion.figure initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-w-md mx-auto">
              <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: 'linear-gradient(180deg,#0a1a44,#2b3d6b)' }}>
                <img src={GALLERY_IMAGES[0]} alt="baby" className="object-cover w-full h-full brightness-95" />
                <div className="absolute left-4 bottom-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/5">
                  <div className="text-xs opacity-80">Baby</div>
                  <div className="font-semibold">Your Son's Name</div>
                </div>
              </div>
            </motion.figure>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Memories & Gallery</h2>
            <div className="text-sm opacity-80">Hover images for detail</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img src={src} alt={`gallery-${idx}`} className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="mt-12 bg-white/3 p-6 rounded-2xl border border-white/5">
          <h3 className="text-2xl font-semibold mb-6">Journey — Month by Month</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { m: '1 Month', t: 'First Smile' },
              { m: '3 Months', t: 'Rolling Over' },
              { m: '6 Months', t: 'First Solid Food' },
              { m: '9 Months', t: 'Crawling' },
              { m: '11 Months', t: 'First Steps' },
              { m: '12 Months', t: 'Birthday' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-4 rounded-xl bg-white/5 border border-white/6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#FDE68A] text-[#071033] font-semibold shadow">{i + 1}</div>
                  <div>
                    <div className="text-sm opacity-80">{item.m}</div>
                    <div className="font-medium">{item.t}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Wishes */}
        <section id="wishes" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold mb-4">Wishes from Family & Friends</h3>

              <div className="space-y-4 max-h-[360px] overflow-auto pr-3">
                {wishes.length === 0 && (
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">No wishes yet — be the first to write!</div>
                )}

                {wishes.map(w => (
                  <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FDE68A] flex items-center justify-center text-[#071033] font-semibold">{w.name ? w.name[0].toUpperCase() : 'G'}</div>
                    <div>
                      <div className="text-sm font-semibold">{w.name}</div>
                      <div className="text-sm opacity-80 mt-1">{w.message}</div>
                      <div className="text-xs opacity-60 mt-2">{new Date(w.time).toLocaleString()}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            <aside className="p-6 rounded-2xl bg-white/3 border border-white/6">
              <h4 className="font-semibold mb-3">Write a Wish</h4>
              <form onSubmit={addWish} className="space-y-3">
                <input value={wishForm.name} onChange={e => setWishForm({...wishForm, name: e.target.value})} placeholder="Your name" className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/8 text-sm" />
                <textarea value={wishForm.message} onChange={e => setWishForm({...wishForm, message: e.target.value})} placeholder="Your wishes..." rows={4} className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/8 text-sm" />
                <button className="w-full px-4 py-2 rounded-md font-semibold" style={{ background: 'linear-gradient(90deg,#D4AF37,#FCD34D)', color: '#071033' }}>Send Wish</button>

                <div className="text-xs opacity-80 mt-2">Wishes are stored locally in your browser. (You can implement a backend to persist.)</div>
              </form>
            </aside>
          </div>
        </section>

        {/* Invite / Location */}
        <section id="invite" className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-white/3 to-white/2 border border-white/6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold">Party Details</h3>
              <p className="mt-2 opacity-80">Join us to celebrate the first birthday. We look forward to your presence and blessings.</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/6 flex items-start gap-3">
                  <div className="text-2xl"><FaMapMarkerAlt /></div>
                  <div>
                    <div className="text-sm opacity-80">Venue</div>
                    <div className="font-medium">123 Celebration Avenue, Your City</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/6 flex items-start gap-3">
                  <div className="text-2xl"><FaClock /></div>
                  <div>
                    <div className="text-sm opacity-80">Date & Time</div>
                    <div className="font-medium">Feb 10, 2026 — 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe title="map" src={`https://www.google.com/maps?q=Central+Park&output=embed`} className="w-full h-44" />
            </div>
          </div>
        </section>

        {/* Footer with simple CTA */}
        <footer className="mt-12 text-center opacity-90">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10">
            <FaHeart className="text-[#D4AF37]" />
            <div>
              <div className="text-sm">Made with love</div>
              <div className="text-xs opacity-80">Replace images and text with your son's photos and details.</div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating bottom-right badge */}
      <div className="fixed right-6 bottom-6">
        <motion.a whileHover={{ scale: 1.05 }} href="#wishes" className="px-4 py-3 rounded-full shadow-2xl flex items-center gap-2" style={{ background: 'linear-gradient(90deg,#D4AF37,#FDE68A)', color: '#071033' }}>
          <FaBirthdayCake /> Wish
        </motion.a>
      </div>

      {/* Small custom styles for richness */}
      <style jsx>{`
        :root { --gold: #D4AF37; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      `}</style>
    </div>
  );
}
