import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from 'lucide-react';

export default function CustomOrder() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation of form submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-4">
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-lg border border-[#DDD6C9]">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 size={32} />
             </div>
             <h2 className="text-3xl font-serif mb-4">Request Received</h2>
             <p className="text-gray-600 mb-8">Thank you for your interest in Vitabae Pro. A wholesale representative will review your application and contact you within 48 hours.</p>
             <Button onClick={() => setSubmitted(false)} variant="outline">Return to Form</Button>
          </div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
       <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
             <span className="uppercase tracking-widest text-[#F4A492] text-xs font-bold mb-2 block">Vitabae Pro</span>
             <h1 className="text-4xl font-serif text-[#1E2A3A] mb-4">Wholesale & Custom Formulations</h1>
             <p className="text-gray-600">Partner with us to bring premium wellness to your clinic, spa, or store.</p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First Name</label>
                      <Input required placeholder="Jane" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last Name</label>
                      <Input required placeholder="Doe" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Business Email</label>
                   <Input required type="email" placeholder="jane@company.com" />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Business Type</label>
                   <Select>
                      <SelectTrigger>
                         <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="clinic">Medical Clinic / Doctor</SelectItem>
                         <SelectItem value="spa">Spa / Wellness Center</SelectItem>
                         <SelectItem value="retail">Retail Store</SelectItem>
                         <SelectItem value="gym">Gym / Fitness Studio</SelectItem>
                         <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                   </Select>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Inquiry Type</label>
                   <Select>
                      <SelectTrigger>
                         <SelectValue placeholder="What are you interested in?" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="wholesale">Wholesale (Stocking Vitabae)</SelectItem>
                         <SelectItem value="custom">Custom Formulation (White Label)</SelectItem>
                         <SelectItem value="bulk">Bulk Ingredient Purchasing</SelectItem>
                      </SelectContent>
                   </Select>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Estimated Monthly Volume</label>
                   <Select>
                      <SelectTrigger>
                         <SelectValue placeholder="Select volume" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="low">50-200 units</SelectItem>
                         <SelectItem value="medium">201-1000 units</SelectItem>
                         <SelectItem value="high">1000+ units</SelectItem>
                      </SelectContent>
                   </Select>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Message / Specific Requirements</label>
                   <Textarea className="h-32" placeholder="Tell us more about your needs..." />
                </div>

                <Button type="submit" className="w-full bg-[#1E2A3A] hover:bg-[#243B53] text-white py-6 uppercase tracking-widest">
                   Submit Application
                </Button>
             </form>
          </div>
       </div>
    </div>
  );
}