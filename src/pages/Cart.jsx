import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center py-20 px-4 text-center">
       <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full">
          <div className="w-20 h-20 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#F4A492]">
             <ShoppingBag size={32} />
          </div>
          <h1 className="text-3xl font-serif mb-4">Your Bag is Empty</h1>
          <p className="text-gray-500 mb-8">Invest in your wellness today. Free shipping on orders over $75.</p>
          <Button asChild className="w-full bg-[#1E2A3A] hover:bg-[#243B53] text-white py-6 uppercase tracking-widest">
             <Link to="/Collection">Start Shopping</Link>
          </Button>
       </div>
    </div>
  );
}