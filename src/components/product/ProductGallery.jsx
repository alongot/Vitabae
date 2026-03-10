import React from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery({ product }) {
  // User requested keeping only one image
  return (
    <motion.div 
      className="relative bg-[#FAF8F5] overflow-hidden aspect-square"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img 
        src={product.image_url} 
        alt={product.name} 
        className="w-full h-full object-cover" 
      />
    </motion.div>
  );
}