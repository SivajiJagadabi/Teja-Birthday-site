import { motion } from "framer-motion";
import React from "react";

export function FloatingBalloon({ style, delay = 0, color }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, x: 0 }}
      animate={{ y: [-20, -140], x: [0, 10, -10, 0], opacity: [0, 1, 1, 0.8] }}
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
      <div
        className="w-12 h-16 rounded-full shadow-lg flex items-end justify-center"
        style={{
          backgroundImage: `linear-gradient(180deg, ${color[0]}, ${color[1]})`,
        }}
      >
        <div className="w-0.5 h-8 bg-gray-300 -mb-3" />
      </div>
    </motion.div>
  );
}
