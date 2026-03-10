import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeBar() {
  const items = [
    "Free Shipping on Orders Over $75",
    "30-Day Happiness Guarantee",
    "Sustainably Sourced",
    "Recyclable Packaging",
    "Science-Backed Formulas",
    "Free Shipping on Orders Over $75",
    "30-Day Happiness Guarantee",
    "Sustainably Sourced",
    "Recyclable Packaging",
    "Science-Backed Formulas"
  ];

  return (
    <div className="bg-[#1E2A3A] text-[#DDD6C9] py-4 overflow-hidden flex items-center">
      <motion.div 
        className="flex space-x-12 whitespace-nowrap font-serif italic text-lg"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            {item}
            <span className="w-2 h-2 rounded-full bg-[#F4A492]"></span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}