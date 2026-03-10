import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function LogoStrip() {
  const logos = [
    "In-House Formulation", "100% Organic, Vegan", "Third-Party Lab Tested", "Ingredient Traceability", "GMP Certified", "Science-Backed", "Clean Label",
    "In-House Formulation", "100% Organic, Vegan", "Third-Party Lab Tested", "Ingredient Traceability", "GMP Certified", "Science-Backed", "Clean Label"
  ];

  return (
    <div className="w-full bg-[#EBE6DD] border-b border-gray-50 py-8 overflow-hidden flex">
      <motion.div 
        className="flex space-x-16 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center gap-3 text-gray-400 font-medium text-sm uppercase tracking-widest">
             <ShieldCheck size={18} className="text-[#F4A492]" />
             {logo}
          </div>
        ))}
      </motion.div>
    </div>
  );
}