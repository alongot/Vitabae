import React from 'react';
import { ArrowRight, CheckCircle2, FlaskConical, Users, Building2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Professional() {
  return (
    <div className="bg-white min-h-screen">
       <div className="bg-[#1E2A3A] text-white py-24 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Vitabae Professional</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
             Empower your practice with precision-formulated supplements.
             Customized solutions for hospitals, clinics, and nutritionists.
          </p>
          <Button className="bg-[#F4A492] text-[#1E2A3A] hover:bg-white hover:text-[#1E2A3A] px-8 py-6 rounded-full uppercase tracking-widest text-xs font-bold">
             Apply for Account
          </Button>
       </div>

       <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FlaskConical size={48} className="text-[#F4A492] mx-auto mb-6" />
                <h3 className="text-xl font-serif text-[#1E2A3A] mb-4">Custom Formulation</h3>
                <p className="text-gray-600 text-sm">Create tailored supplement protocols specific to your patient demographics and treatment plans.</p>
             </div>
             <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Users size={48} className="text-[#F4A492] mx-auto mb-6" />
                <h3 className="text-xl font-serif text-[#1E2A3A] mb-4">Patient Management</h3>
                <p className="text-gray-600 text-sm">Track patient adherence, automate refills, and adjust dosages through our professional portal.</p>
             </div>
             <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Building2 size={48} className="text-[#F4A492] mx-auto mb-6" />
                <h3 className="text-xl font-serif text-[#1E2A3A] mb-4">Wholesale Pricing</h3>
                <p className="text-gray-600 text-sm">Access exclusive B2B pricing tiers and bulk ordering options for your clinic inventory.</p>
             </div>
          </div>
       </div>

       <div className="bg-[#EBE6DD] py-20 px-4">
          <div className="container mx-auto max-w-4xl">
             <h2 className="text-3xl font-serif text-[#1E2A3A] mb-12 text-center">How It Works</h2>
             <div className="space-y-8">
                {[
                   "Register your practice and verify credentials.",
                   "Consult with our scientific team to select or customize formulas.",
                   "Set up your patient portal or order bulk inventory.",
                   "Monitor results and adjust protocols as needed."
                ].map((step, i) => (
                   <div key={i} className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-[#1E2A3A] text-white flex items-center justify-center font-bold flex-shrink-0">
                         {i + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}