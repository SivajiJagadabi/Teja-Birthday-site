// Luxury First Birthday - Single Page React Component
// File: BirthdayPage.jsx
// Description: Single-file, fully responsive, luxurious birthday landing page using TailwindCSS + Framer Motion.
// Instructions:
// 1) Install dependencies: `npm install framer-motion react-icons`
// 2) TailwindCSS must be configured in your project. (https://tailwindcss.com/docs/guides/create-react-app)
// 3) Replace placeholder image URLs with your son's photos in the `GALLERY_IMAGES` array.
// 4) This component is default-exported. Import into App.jsx and render.

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';
import i1 from "../Images/i1.png"
import G11 from "../Images/G11.jpg"
import G22 from "../Images/G22.jpg"
import G33 from "../Images/G33.jpg"
import G44 from "../Images/G44.png"
import G1 from "../Images/G1.png"
import G2 from "../Images/G2.png"
import G4 from "../Images/G4.png"
import G5 from "../Images/G5.jpg"
import G7 from "../Images/G7.jpg"
import G6 from "../Images/G6.png"
import G8 from "../Images/G8.png"
import mp3 from '../Images/music.mp3'

import logo  from '../Images/logo.png'
import LiveVisitorCounter from './LiveVisitorCounter';

// --- Configuration ---
const BIRTHDAY_DATE = '2025-12-27T00:00:00';// <-- set to your son's birthday (YYYY-MM-DDTHH:mm:ss)

const GALLERY_IMAGES = [G11, G22, G33, G44, G1, G2, G4, G5, G6, G7, G8];
const API_URL = "https://script.google.com/macros/s/AKfycbxLqyWWnLfRhYC1pGsGCazgVvIDZ0QI-cj6tWm3z6BjA4q19sliLI0c1k6bzV_uCmpqiw/exec";

const GALLERY_IMAGES_TOP = [G11, G22, G33];
const GALLERY_IMAGES_BOTTOM = [G44, G1, G2];


const FAMILY_WISHES = [
  { name: "Sivaji", relation: "Father", message: "Happy Birthday my little prince TeJansh! You are my world." },
  { name: "Manasa", relation: "Mother", message: "My sweet angel, TeJansh, you made our lives beautiful." },
  { name: "Vamika", relation: "Sister", message: "Happy Birthday little brother! Love you so much." },
  { name: "Balaji", relation: "Bava", message: "Lots of love to you little champ! Grow with joy." },
  { name: "Adukondalu", relation: "Bava", message: "Wishing you a blessed and joyful life, dear TeJansh." },
  { name: "Nani", relation: "Mama", message: "Happy Birthday sweetheart! Your smile lights everyone’s heart." },
  { name: "Siva Sankar", relation: "Grand Father", message: "Blessings to my dear grandson. Stay healthy & happy." }
];


// Palette inspired by a luxurious theme
// Primary: Royal Blue - #0A1A44    Accent: Gold - #D4AF37    Cream - #FFF5E1
// --- Countdown Hook ---
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


function FloatingBalloon({ style, delay = 0, color = ['#FDE68A', '#F59E0B'], size = 40 }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: [-20, -180], x: [0, 10, -10, 0], opacity: [0, 1, 1, 0.8] }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 6 + Math.random() * 6,
        delay,
        ease: "easeInOut",
      }}
      className="absolute"
      style={style}
    >
      {/* Balloon */}
      <div
        className="rounded-full shadow-lg"
        style={{
          width: `${size}px`,
          height: `${size * 1.2}px`,
          background: `linear-gradient(180deg, ${color[0]}, ${color[1]})`,
        }}
      ></div>

      {/* Thin string */}
      <div
        className="mx-auto"
        style={{
          width: '1px', // thin string
          height: `${size * 1.5}px`,
          backgroundColor: 'gray',
          marginTop: '-2px',
        }}
      ></div>
    </motion.div>
  );
}



export default function BirthdayPage() {
  const countdown = useCountdown(BIRTHDAY_DATE);
const [wishes, setWishes] = useState([]);

  const [wishForm, setWishForm] = useState({ name: '', message: '' });

  const [sending, setSending] = useState(false);
const [showWishBox, setShowWishBox] = useState(false);


const audioRef = useRef(null);
const [unlocked, setUnlocked] = useState(false);


useEffect(() => {
  const unlock = () => {
    if (!audioRef.current) return;

    audioRef.current.play()
      .then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setUnlocked(true);
      })
      .catch(() => {});

    window.removeEventListener("pointerdown", unlock);
  };

  window.addEventListener("pointerdown", unlock);
  return () => window.removeEventListener("pointerdown", unlock);
}, []);

useEffect(() => {
  if (countdown.finished && unlocked && audioRef.current) {
    audioRef.current.play();
  }
}, [countdown.finished, unlocked]);



  useEffect(() => {
    localStorage.setItem('birthday_wishes_v1', JSON.stringify(wishes));
  }, [wishes]);


  useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => setWishes(data))
    .catch(err => console.log(err));
}, []);


async function addWish(e) {
  e.preventDefault();
  if (!wishForm.name.trim() || !wishForm.message.trim()) return;

  const newWish = {
    id: Date.now(),
    name: wishForm.name,
    message: wishForm.message,
    time: new Date().toISOString()
  };

  try {
    setSending(true); // start loader
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newWish)
    });

    setWishes(prev => [...prev, newWish]); // append instead of prepend
    setWishForm({ name: '', message: '' });
  } catch (err) {
    console.log(err);
  } finally {
    setSending(false); // stop loader
  }
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
        
          <div> 
              <img src={logo} alt="Logo" className="w-40  object-contain" />
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

              
            {/* Countdown OR Celebration */}
     {countdown.finished ? (
  <div className="relative w-full h-64 flex flex-col items-center justify-center overflow-hidden">
    {/* Smaller heading */}
    <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-4 text-center drop-shadow-lg">
      🎉 Happy Birthday TeJansh! 🎉
    </h2>

    {/* Balloons with thin strings */}
    {Array.from({ length: 12 }).map((_, idx) => (
      <FloatingBalloon
        key={idx}
        color={['#F87171', '#34D399', '#60A5FA', '#FBBF24'][idx % 4]}
        style={{ left: `${Math.random() * 90}%`, bottom: `-10%` }}
        delay={Math.random() * 3}
        stringWidth={1}
      />
    ))}
  </div>
) : (
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
)}
<audio ref={audioRef} src={mp3} loop preload="auto" />



          <div className="mt-3 text-sm opacity-80 flex items-center gap-3">
  🎉 <span>Double Celebration: <strong>TeJansh – Dec 27 • Dad – Dec 28</strong></span>
</div>


              <div className="mt-6 flex gap-3">
                <a href="#invite" className="px-5 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] font-semibold">You're Invited</a>
                <a href="#" className="px-5 py-3 rounded-lg bg-white/5">Share</a>
              </div>
            </div>

          <motion.figure
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="relative w-full max-w-md mx-auto"
>
  <div
    className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
    style={{ background: 'linear-gradient(180deg,#0a1a44,#2b3d6b)' }}
  >
    <img
      src={GALLERY_IMAGES[6]}
      alt="baby"
      className="object-cover w-full h-full brightness-95"
    />

    {/* NAME + LABEL */}
  <div className="absolute right-4 bottom-4 p-4 bg-black/30 rounded-xl backdrop-blur-md border border-white/10 z-20 shadow-xl">
 

      {/* Stylish Gradient Name */}
      <div
        className="font-bold text-lg tracking-wide bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-transparent bg-clip-text drop-shadow-lg"
      >
          <span className="text-2xl">🎈</span>
        TeJansh
          <span className="text-2xl">🎈</span>
      </div>
    </div>
  </div>
</motion.figure>

          </div>
        </section>


            {/* GAllery */}
{/* Gallery */}
<section id="gallery" className="mt-12 overflow-hidden">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-semibold">Memories & Gallery</h2>
    <div className="text-sm opacity-80">Hover images for detail</div>
  </div>

  {/* Top Row */}
  <motion.div
    className="flex gap-4 mb-4"
    animate={{ x: ["0%", "-50%"] }}
    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
  >
    {[...GALLERY_IMAGES.slice(0, 6), ...GALLERY_IMAGES.slice(0, 6)].map((src, idx) => (
      <div
        key={`top-${idx}`}
        className="w-64 h-49 rounded-xl overflow-hidden border border-white/10 shadow-lg flex-shrink-0"
      >
        <img
          src={src}
          alt={`top-gallery-${idx}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
    ))}
  </motion.div>

  {/* Bottom Row */}
  <motion.div
    className="flex gap-4"
    animate={{ x: ["0%", "-50%"] }}
    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
  >
    {[...GALLERY_IMAGES.slice(6), ...GALLERY_IMAGES.slice(6)].map((src, idx) => (
      <div
        key={`bottom-${idx}`}
        className="w-64 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg flex-shrink-0"
      >
        <img
          src={src}
          alt={`bottom-gallery-${idx}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
    ))}
  </motion.div>
</section>


<section
  id="timeline"
  className="mt-12 relative bg-white/5 p-4 sm:p-8 lg:px-32 xl:px-40 rounded-3xl border border-white/10"
>
  <h3 className="text-3xl font-bold mb-12 text-center text-yellow-400">
    Tejansh — Milestones
  </h3>

  <div className="relative">
    {/* Vertical timeline line only for md+ screens */}
    <div className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-yellow-300 to-yellow-500 h-full -translate-x-1/2 rounded-full"></div>

    {[
      { m: '1 Month', t: 'First Smile', img: G11 },
      { m: '3 Months', t: 'Rolling Over', img: G22 },
      { m: '6 Months', t: 'First Solid Food', img: G2 },
      { m: '9 Months', t: 'Crawling', img: G7 },
      { m: '11 Months', t: 'First Steps', img: G33 },
      { m: '12 Months', t: 'Birthday', img: G1 },
    ].map((item, i) => {
      const isLeft = i % 2 === 0;

      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full mb-12"
        >
          <div
            className={`flex flex-col md:flex-row items-center ${
              isLeft ? 'md:justify-start' : 'md:justify-end'
            }`}
          >
            {/* Milestone card */}
            <div className="relative w-full max-w-sm sm:max-w-md md:w-80 lg:w-96 xl:w-[28rem] rounded-3xl shadow-2xl overflow-hidden border border-white/10">
              <img
                src={item.img}
                alt={item.t}
                className="w-full h-auto aspect-[4/5] object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <div
                  className={`text-sm text-yellow-300 font-semibold ${
                    isLeft ? 'text-left' : 'text-right'
                  }`}
                >
                  {item.m}
                </div>
                <div
                  className={`text-xl md:text-2xl font-bold text-white ${
                    isLeft ? 'text-left' : 'text-right'
                  }`}
                >
                  {item.t}
                </div>
              </div>
            </div>

            {/* Circle marker only for md+ screens */}
            <div className="hidden md:block absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 border-2 border-white shadow-lg z-10"></div>
          </div>
        </motion.div>
      );
    })}
  </div>
</section>



        {/* Footer with simple CTA */}
       <footer className="mt-12 mb-12 text-center opacity-95 space-y-4">
  <div className="inline-flex flex-col items-center gap-3 px-6 py-6 rounded-xl bg-white/5 border border-white/10">
    <FaHeart className="text-[#D4AF37] text-2xl" />

    {/* Heartfelt Quote */}
    <div className="text-lg md:text-xl font-semibold text-yellow-300 italic max-w-md">
      "Every tiny step, every giggle, every milestone… you are our greatest adventure."
    </div>


  </div>
</footer>



  {/* Wishes */}
<section id="wishes" className="mt-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Wishes List */}
    <div className="md:col-span-2">
      <h3 className="text-2xl font-semibold mb-4">Wishes from Family & Friends</h3>

      <div className="space-y-5 max-h-[380px] overflow-auto pr-3">
        {/* No wishes message */}
        {wishes.length === 0 && FAMILY_WISHES.length === 0 && (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            No wishes yet — be the first to write!
          </div>
        )}

        {/* Family Wishes */}
        {FAMILY_WISHES.map((w, idx) => (
          <motion.div
            key={`family-${idx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FDE68A] 
                  flex items-center justify-center text-[#071033] font-semibold shadow">
              {w.name[0].toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex justify-center items-center">
                <div className="text-sm font-semibold">{w.name}</div>
                <div className="text-xs opacity-60">-{w.relation}</div>
              </div>
              <div className="text-sm opacity-80 mt-1">{w.message}</div>
            </div>
          </motion.div>
        ))}

        {/* User Submitted Wishes */}
        {wishes.map(w => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FDE68A] 
                  flex items-center justify-center text-[#071033] font-semibold shadow">
              {w.name ? w.name[0].toUpperCase() : "?"}
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold">{w.name}</div>
              <div className="text-sm opacity-80 mt-1">{w.message}</div>
              <div className="text-xs opacity-60 mt-2">
              <div className="text-xs opacity-60 mt-2">
{new Date(w.time).toLocaleDateString('en-GB')} {new Date(w.time).toLocaleTimeString('en-GB')}

</div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Wish Form */}
    <aside className="p-6 mt-2 rounded-2xl bg-white/3 border border-white/6">
      <h4 className="font-semibold mb-3">Write a Wish</h4>
      <form onSubmit={addWish} className="space-y-3">
        <input
          value={wishForm.name}
          onChange={e => setWishForm({ ...wishForm, name: e.target.value })}
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/8 text-sm"
        />
        <textarea
          value={wishForm.message}
          onChange={e => setWishForm({ ...wishForm, message: e.target.value })}
          placeholder="Your wishes..."
          rows={4}
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/8 text-sm"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(90deg,#D4AF37,#FCD34D)', color: '#071033' }}
          disabled={sending}
        >
          {sending ? <span className="animate-bounce text-xl">🎂</span> : "Send Wish"}
        </button>

        <div className="text-xs opacity-80 mt-2">
          Wishes are stored locally in your browser. (You can implement a backend to persist.)
        </div>
      </form>
    </aside>
  </div>
</section>


    


      </main>

{/* Floating bottom-right wish button - always visible */}
{/* Floating bottom-right badge */}
<div className="fixed right-6 bottom-6 z-50">
  <motion.button
    whileHover={{ scale: 1.05 }}
    onClick={() => setShowWishBox(true)}
    className="px-4 py-3 rounded-full shadow-2xl flex items-center gap-2"
    style={{ background: 'linear-gradient(90deg,#D4AF37,#FDE68A)', color: '#071033' }}
  >
    <FaBirthdayCake /> Wish
  </motion.button>
</div>


{/* Chat-style Wish Box Modal */}
{showWishBox && (
  <motion.div
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 300 }}
    transition={{ type: 'spring', stiffness: 120 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50"
  >
    <div className="w-full max-w-md md:max-w-lg h-full bg-white/10 backdrop-blur-lg p-6 flex flex-col rounded-l-3xl shadow-2xl">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-yellow-300">Write a Wish 🎂</h4>
        <button
          onClick={() => setShowWishBox(false)}
          className="text-white text-xl font-bold"
        >
          &times;
        </button>
      </div>

      {/* Wishes scroll */}
      <div className="flex-1 overflow-auto space-y-3 mb-4">
        {wishes.length === 0 && FAMILY_WISHES.length === 0 && (
          <div className="text-sm opacity-70 text-center">No wishes yet — be the first!</div>
        )}
        {[...FAMILY_WISHES, ...wishes].map((w, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FDE68A] flex items-center justify-center text-[#071033] font-semibold">
              {w.name ? w.name[0].toUpperCase() : "?"}
            </div>
            <div className="flex-1 text-sm">
              <div className="font-semibold">{w.name}</div>
              <div className="opacity-80">{w.message}</div>
              <div className="text-xs opacity-60">{w.time ? new Date(w.time).toLocaleString() : null}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={addWish} className="space-y-3 flex flex-col">
        <input
          value={wishForm.name}
          onChange={e => setWishForm({ ...wishForm, name: e.target.value })}
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/8 text-sm"
        />
        <textarea
          value={wishForm.message}
          onChange={e => setWishForm({ ...wishForm, message: e.target.value })}
          placeholder="Your wishes..."
          rows={3}
          className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/8 text-sm"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 rounded-md font-semibold flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(90deg,#D4AF37,#FCD34D)', color: '#071033' }}
          disabled={sending}
        >
          {sending ? <span className="animate-bounce text-xl">🎂</span> : "Send Wish"}
        </button>
      </form>
    </div>
  </motion.div>
)}
<footer className="mt-12 text-center py-8 bg-gradient-to-r from-[#0A1A44] via-[#071033] to-[#0A1A44] text-white rounded-t-3xl shadow-inner">
  <div className="max-w-xl mx-auto space-y-4">
    {/* Heart icon */}
    <div className="flex justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>

    {/* Emotional text */}
    <p className="text-lg md:text-xl font-semibold text-yellow-300 italic">
      "This little website is a gift of love from a proud father to his little prince 🎈."
    </p>

    <p className="text-sm md:text-base text-gray-300">
      Developed with ❤️ by TeJansh’s Dad to celebrate his first birthday.
    </p>
    {/* <LiveVisitorCounter initial={400} /> */}
    {/* Optional small detail */}
    <p className="text-xs text-gray-400">
      Made with love, memories, and tiny giggles on 27/12/2025 

    </p>
  </div>
</footer>


      {/* Small custom styles for richness */}
      <style jsx>{`
        :root { --gold: #D4AF37; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      `}</style>
    </div>
  );
}
