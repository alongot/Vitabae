import React, { useState } from 'react';
import { Star, Minus, Plus, Heart, Check, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { getProductContent } from '../utils/productBenefitContent';

export default function ProductHero({ product, selectedLifeStage, selectedBenefit, onReviewsClick, onRecipeClick }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(true);

  // Get contextualized content
  const content = getProductContent(product.code, selectedLifeStage, selectedBenefit);
  const displayLifeStage = selectedLifeStage || "Across Adult Stage";

  return (
    <div className="h-full">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <span className="inline-block px-3 py-1 bg-[#EBE6DD] text-[10px] font-bold uppercase tracking-widest text-[#F4A492] mb-3 rounded-full">
                    Single Ingredient
                 </span>
                 <h1 className="text-4xl md:text-5xl font-serif text-[#1E2A3A]">{product.ingredient_name}</h1>
              </div>
              <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#F4A492]"><Heart size={24} /></Button>
              </div>
           </div>

           <div className="flex items-center gap-4 mb-6">
              <div className="flex text-[#F4A492]">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <button onClick={onReviewsClick} className="text-xs font-bold uppercase tracking-widest text-[#1E2A3A] hover:text-[#F4A492] transition-colors">Review</button>
              <span className="ml-auto text-xs text-gray-500">1 month supply</span>
           </div>

           {/* Life Stage Context Badge */}
           {selectedLifeStage && (
              <div className="mb-4 p-3 bg-[#FAF8F5] rounded-lg border border-gray-100">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-500">For: </span>
                 <span className="text-sm font-medium text-[#1E2A3A]">{displayLifeStage}</span>
              </div>
           )}

           <h2 className="text-2xl font-serif text-[#1E2A3A] mb-3">{content.headline}</h2>
           <p className="text-gray-600 text-lg font-light mb-2">
              {content.description}
           </p>
           <p className="text-sm text-gray-500 mb-6">
              Format: {product.format} • Dosage: {product.dosage}
           </p>

           {/* How it Works */}
           <div className="mb-6 p-4 bg-[#FAF8F5] rounded-lg border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F4A492] mb-2">How It Supports You</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{content.howItWorks}</p>
           </div>

           {/* Controls Grid */}
           <div className="space-y-6 mb-8">

              {/* Row: Quantity & Price */}
              <div className="flex items-end justify-between gap-4">
                 <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Quantity</label>
                    <div className="flex items-center border border-gray-200 rounded bg-white h-10">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center hover:bg-gray-50"><Minus size={14}/></button>
                       <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-gray-50"><Plus size={14}/></button>
                    </div>
                 </div>

                 <div className="flex-1 text-right">
                     <span className="text-4xl font-serif text-[#1E2A3A]">${product.price}</span>
                     <span className="text-sm text-gray-500 font-serif">.00</span>
                 </div>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="space-y-3">
              <Button 
                 onClick={() => setIsSubscribed(true)}
                 className={`w-full h-auto py-3 text-sm uppercase tracking-widest flex justify-between items-center px-8 ${isSubscribed ? 'bg-[#C8D6B9] hover:bg-[#B6C9A3] text-[#1E2A3A]' : 'bg-[#EBE6DD] text-gray-500 hover:bg-[#DDD6C9]'}`}
              >
                 <div className="flex flex-col items-start text-left">
                    <span>Subscribe & Save 20%</span>
                    <span className="text-xs font-bold opacity-80">${(product.price * quantity * 0.8).toFixed(2)}</span>
                 </div>
                 {isSubscribed && <Check size={18} />}
              </Button>

              <Button 
                 onClick={() => setIsSubscribed(false)}
                 className={`w-full h-14 text-sm uppercase tracking-widest ${!isSubscribed ? 'bg-[#1E2A3A] hover:bg-[#141D28] text-white' : 'bg-[#C8D6B9] hover:bg-[#B6C9A3] text-[#1E2A3A]'}`}
              >
                 Add to cart - ${(product.price * quantity * (isSubscribed ? 0.75 : 1)).toFixed(2)}
              </Button>
           </div>

           <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#EBE6DD] rounded-lg">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Traditional & Clinical Context</h3>
                 <p className="text-xs text-gray-600 leading-relaxed">{content.educationalContext}</p>
              </div>
              <div className="p-3 bg-[#F0F9F0] border border-[#C8D6B9] rounded-lg text-center">
                 <p className="text-xs text-gray-600">
                    <strong>Same ingredient. Same dosage. Same format.</strong><br/>
                    Only the benefits adapt to your life stage.
                 </p>
              </div>
           </div>
    </div>
  );
}