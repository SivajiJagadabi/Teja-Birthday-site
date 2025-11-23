import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LiveVisitorCounter({ initial = 400 }) {
  const [count, setCount] = useState(initial);
  const [realCount, setRealCount] = useState(null);

  // Simulate auto increment 400 → 500
  useEffect(() => {
    let current = initial;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 500) clearInterval(interval);
    }, 50); // fast animation
    return () => clearInterval(interval);
  }, [initial]);

  // Fetch real visitor count from API (simulate here)
  useEffect(() => {
    // Replace this with your API call if you have one
    const timer = setTimeout(() => {
      const realVisitorCount = 678; // Example fetched number
      setRealCount(realVisitorCount);
    }, 3000); // simulate API delay
    return () => clearTimeout(timer);
  }, []);

  // Animate to real visitor count after initial animation
  useEffect(() => {
    if (realCount !== null) {
      const stepTime = 30; // ms per step
      const step = realCount > count ? 1 : -1;
      const interval = setInterval(() => {
        setCount(prev => {
          if ((step > 0 && prev >= realCount) || (step < 0 && prev <= realCount)) {
            clearInterval(interval);
            return realCount;
          }
          return prev + step;
        });
      }, stepTime);
      return () => clearInterval(interval);
    }
  }, [realCount]);

  return (
    <div className="text-center mt-4">
      <motion.div
        key={count}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-wider drop-shadow-lg"
      >
        {count}+ Visitors
      </motion.div>
      <div className="text-xs text-gray-300 mt-1">Live Visitors</div>
    </div>
  );
}


export default LiveVisitorCounter