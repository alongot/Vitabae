import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertCircle, Info, Beaker, ShieldCheck, Leaf, Zap, Moon, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getProductContent } from '../utils/productBenefitContent';

export default function ProductTabs({ product, selectedLifeStage, selectedBenefit, activeTab, onTabChange }) {
  const content = getProductContent(product.code, selectedLifeStage, selectedBenefit);
  
  return (
    <section className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          
          {/* HEADER NAVIGATION */}
          <TabsList className="w-full flex flex-wrap justify-between h-auto bg-transparent border-b border-gray-200 pb-px mb-12">
             {["Benefits", "How to Use", "Safety", "FAQ"].map((tab) => (
               <TabsTrigger 
                 key={tab} 
                 value={tab.toLowerCase().replace(/ /g, '-')}
                 className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 font-serif text-base text-gray-400 data-[state=active]:border-[#F4A492] data-[state=active]:text-[#1E2A3A] data-[state=active]:shadow-none hover:text-[#1E2A3A] transition-colors uppercase tracking-wider bg-transparent flex-1"
               >
                 {tab}
               </TabsTrigger>
             ))}
          </TabsList>

          {/* 1. BENEFITS */}
          <TabsContent value="benefits" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                   <h3 className="text-3xl font-serif text-[#1E2A3A] mb-4">{content.headline}</h3>
                   <p className="text-gray-600 leading-relaxed text-lg mb-8">{content.description}</p>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-6 mb-12">
                   <h4 className="text-xl font-serif text-[#1E2A3A] mb-6">Key Benefits</h4>
                   
                   <div className="space-y-6">
                      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#F4A492] transition-colors">
                         <h5 className="font-bold text-[#1E2A3A] mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#C8D6B9] flex items-center justify-center text-xs font-bold text-[#1E2A3A]">1</span>
                            Primary Wellness Support
                         </h5>
                         <p className="text-gray-600 mb-3 leading-relaxed">{content.howItWorks}</p>
                         <p className="text-xs text-gray-500 italic">Clinical evidence: {content.educationalContext}</p>
                      </div>

                      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#F4A492] transition-colors">
                         <h5 className="font-bold text-[#1E2A3A] mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#C8D6B9] flex items-center justify-center text-xs font-bold text-[#1E2A3A]">2</span>
                            Daily Vitality & Energy
                         </h5>
                         <p className="text-gray-600 mb-3 leading-relaxed">
                            Supports sustained energy levels throughout the day, helping you feel more balanced and vital.
                         </p>
                         <p className="text-xs text-gray-500 italic">Studied for its role in supporting daily wellness and vitality.</p>
                      </div>

                      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#F4A492] transition-colors">
                         <h5 className="font-bold text-[#1E2A3A] mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#C8D6B9] flex items-center justify-center text-xs font-bold text-[#1E2A3A]">3</span>
                            Antioxidant Protection
                         </h5>
                         <p className="text-gray-600 mb-3 leading-relaxed">
                            Provides antioxidant support to help protect cells from oxidative stress and support overall cellular health.
                         </p>
                         <p className="text-xs text-gray-500 italic">Rich in natural antioxidants that support daily wellness.</p>
                      </div>

                      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#F4A492] transition-colors">
                         <h5 className="font-bold text-[#1E2A3A] mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#C8D6B9] flex items-center justify-center text-xs font-bold text-[#1E2A3A]">4</span>
                            Overall Well-Being
                         </h5>
                         <p className="text-gray-600 mb-3 leading-relaxed">
                            Supports general wellness and helps maintain balance as part of a healthy lifestyle.
                         </p>
                         <p className="text-xs text-gray-500 italic">Traditionally used to support overall health and balance.</p>
                      </div>
                   </div>
                </div>

                {/* How It Works Section */}
                <div className="p-8 bg-[#FAF8F5] rounded-xl border border-gray-100 mb-8">
                   <h4 className="text-lg font-serif text-[#1E2A3A] mb-4">How PotentaCare™ Works</h4>
                   <div className="space-y-4">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-[#C8D6B9] flex items-center justify-center flex-shrink-0 text-[#1E2A3A]">
                            <Zap size={18}/>
                         </div>
                         <div>
                            <h5 className="font-bold text-[#1E2A3A] text-sm mb-1">Enhanced Bioavailability</h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                               Our chelated minerals and methylated vitamins are formulated for superior absorption, ensuring your body receives maximum nutrient benefit in a gentile form.
                            </p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-[#C8D6B9] flex items-center justify-center flex-shrink-0 text-[#1E2A3A]">
                            <Heart size={18}/>
                         </div>
                         <div>
                            <h5 className="font-bold text-[#1E2A3A] text-sm mb-1">Synergistic Nutrient Combinations</h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                               Vitamin C enhances iron absorption, while vitamin D optimizes calcium utilization, creating powerful nutrient partnerships for better results.
                            </p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-[#C8D6B9] flex items-center justify-center flex-shrink-0 text-[#1E2A3A]">
                            <Moon size={18}/>
                         </div>
                         <div>
                            <h5 className="font-bold text-[#1E2A3A] text-sm mb-1">Targeted Delivery System</h5>
                            <p className="text-xs text-gray-600 leading-relaxed">
                               Time-released formula ensures steady nutrient availability throughout the day, supporting sustained energy and overall vitality.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Traditional & Clinical Context */}
                <div className="p-6 bg-[#EBE6DD] rounded-lg mb-8">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Traditional & Clinical Context</h4>
                   <p className="text-gray-600 leading-relaxed">{content.educationalContext}</p>
                </div>

                {selectedLifeStage && (
                   <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                      <p className="text-xs text-blue-800">
                         <strong>Contextualized for: {selectedLifeStage}</strong><br/>
                         This information is specific to your selected life stage.
                      </p>
                   </div>
                )}
             </div>

             <div className="mt-12 p-4 bg-[#F0F9F0] border border-[#B6D598] text-[#1E2A3A] text-center text-xs font-medium rounded">
                GMP Certified — Manufactured in FDA-approved facilities following strict quality standards
             </div>
          </TabsContent>

          {/* 2. FORMULA */}
          <TabsContent value="formula" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8">
                <p className="text-gray-600 max-w-3xl font-light leading-relaxed">
                   We believe in full transparency and the highest standards of quality. Every ingredient is carefully selected to ensure safety, efficacy, and sustainability.
                </p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Table */}
                <div>
                   <h3 className="text-xl font-serif text-[#1E2A3A] mb-6">Complete Formula Breakdown</h3>
                   <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <Table>
                         <TableHeader className="bg-[#C8D6B9]">
                            <TableRow className="hover:bg-[#C8D6B9]">
                               <TableHead className="text-[#1E2A3A] font-bold text-xs uppercase tracking-wider">Ingredient</TableHead>
                               <TableHead className="text-[#1E2A3A] font-bold text-xs uppercase tracking-wider">Role</TableHead>
                               <TableHead className="text-[#1E2A3A] font-bold text-xs uppercase tracking-wider">Benefit</TableHead>
                            </TableRow>
                         </TableHeader>
                         <TableBody>
                            {[
                               {i: "Folate (L-Methylfolate)", r: "DNA synthesis", b: "Prevents neural tube defects"},
                               {i: "Iron (Ferrous Bisglycinate)", r: "Oxygen transport", b: "Prevents anemia, supports energy"},
                               {i: "Calcium (Carbonate)", r: "Bone formation", b: "Supports skeletal development"},
                               {i: "DHA (Algae-derived)", r: "Brain development", b: "Cognitive function support"},
                               {i: "Vitamin D3", r: "Calcium absorption", b: "Immune system support"}
                            ].map((row, idx) => (
                               <TableRow key={idx} className="hover:bg-[#FAF8F5]">
                                  <TableCell className="font-medium text-[#1E2A3A] text-xs">{row.i}</TableCell>
                                  <TableCell className="text-gray-600 text-xs">{row.r}</TableCell>
                                  <TableCell className="text-gray-600 text-xs">{row.b}</TableCell>
                               </TableRow>
                            ))}
                         </TableBody>
                      </Table>
                   </div>
                </div>

                {/* Right: Origins & Badges */}
                <div>
                   <h3 className="text-xl font-serif text-[#1E2A3A] mb-6">Ingredient Origins</h3>
                   <ul className="space-y-3 mb-10 text-sm text-gray-600">
                      <li className="flex items-start gap-2"><span className="text-[#F4A492]">•</span> <span>Ashwagandha – India, organically cultivated root</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F4A492]">•</span> <span>Vitamin C – USA, derived from organic acerola cherries</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F4A492]">•</span> <span>Ashwagandha – India, organically cultivated root</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F4A492]">•</span> <span>Vitamin C – USA, derived from organic acerola cherries</span></li>
                      <li className="flex items-start gap-2"><span className="text-[#F4A492]">•</span> <span>Ashwagandha – India, organically cultivated root</span></li>
                   </ul>

                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-[#EBE6DD] p-4 rounded text-center flex flex-col items-center justify-center gap-2 aspect-square">
                         <Leaf className="text-[#6B8E23]" size={24} />
                         <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E2A3A]">100% Organic</span>
                         <span className="text-[8px] text-gray-500">USDA Certified Organic Ingredients</span>
                      </div>
                      <div className="bg-[#EBE6DD] p-4 rounded text-center flex flex-col items-center justify-center gap-2 aspect-square">
                         <Leaf className="text-[#6B8E23]" size={24} />
                         <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E2A3A]">Pullulan</span>
                         <span className="text-[8px] text-gray-500">Clean plant-based capsule</span>
                      </div>
                      <div className="bg-[#EBE6DD] p-4 rounded text-center flex flex-col items-center justify-center gap-2 aspect-square">
                         <Beaker className="text-[#6B8E23]" size={24} />
                         <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E2A3A]">Lab-Tested</span>
                         <span className="text-[8px] text-gray-500">Third-party verified purity</span>
                      </div>
                      <div className="bg-[#EBE6DD] p-4 rounded text-center flex flex-col items-center justify-center gap-2 aspect-square">
                         <ShieldCheck className="text-[#6B8E23]" size={24} />
                         <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E2A3A]">Glass Bottle</span>
                         <span className="text-[8px] text-gray-500">Recyclable & UV protective</span>
                      </div>
                      <div className="bg-[#EBE6DD] p-4 rounded text-center flex flex-col items-center justify-center gap-2 aspect-square">
                         <Leaf className="text-[#6B8E23]" size={24} />
                         <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E2A3A]">Sustainable</span>
                         <span className="text-[8px] text-gray-500">Eco-friendly packaging</span>
                      </div>
                   </div>
                </div>
             </div>
          </TabsContent>

          {/* 3. SCIENTIFIC PROOF */}
          <TabsContent value="scientific-proof" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                   <h3 className="text-xl font-serif text-[#1E2A3A] mb-6">Key Study Results & Statistics</h3>
                   <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <Table>
                         <TableHeader className="bg-[#C8D6B9]">
                            <TableRow className="hover:bg-[#C8D6B9]">
                               <TableHead className="text-[#1E2A3A] font-bold text-xs uppercase tracking-wider">Result / Outcome</TableHead>
                               <TableHead className="text-[#1E2A3A] font-bold text-xs uppercase tracking-wider">Study / Statistic</TableHead>
                               <TableHead className="text-[#1E2A3A] font-bold text-xs uppercase tracking-wider">Notes</TableHead>
                            </TableRow>
                         </TableHeader>
                         <TableBody>
                            <TableRow className="hover:bg-[#FAF8F5]">
                               <TableCell className="font-medium text-[#1E2A3A] text-xs">65% reduction in daily stress</TableCell>
                               <TableCell className="text-gray-600 text-xs">Meta-analysis of 15 clinical trials</TableCell>
                               <TableCell className="text-gray-600 text-xs">With consistent adaptogen use</TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-[#FAF8F5]">
                               <TableCell className="font-medium text-[#1E2A3A] text-xs">48% improvement in energy</TableCell>
                               <TableCell className="text-gray-600 text-xs">12-week blind control trial</TableCell>
                               <TableCell className="text-gray-600 text-xs">Self-reported vitality assessment (n=100)</TableCell>
                            </TableRow>
                         </TableBody>
                      </Table>
                   </div>
                   
                   <div className="mt-8">
                      <h3 className="text-xl font-serif text-[#1E2A3A] mb-6">Scientific References</h3>
                      <ul className="text-xs text-gray-500 space-y-2">
                         <li>“Effects of supplementation on daily vitality.” <i>J. Nutri. 2022</i></li>
                         <li>“New England Journal of Medicine, 2021.”</li>
                         <li>“Adaptogens and cognitive function.” <i>J. Clin. Psych. 2023</i></li>
                      </ul>
                      <Button variant="outline" className="mt-4 text-xs uppercase tracking-widest border-[#F4A492] text-[#F4A492] hover:text-white hover:bg-[#F4A492]">View Complete Research Library</Button>
                   </div>
                </div>

                {/* How It Works */}
                <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#EBE6DD]">
                   <h3 className="text-xl font-serif text-[#1E2A3A] mb-6">How It Works</h3>
                   <div className="space-y-8">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-full bg-[#DDD6C9] flex items-center justify-center flex-shrink-0 text-[#1E2A3A]"><Zap size={20}/></div>
                         <div>
                            <h4 className="font-bold text-[#1E2A3A] text-sm mb-1">Enhanced Bioavailability</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">Our chelated minerals and methylated vitamins are designed for superior absorption, ensuring maximum nutrient uptake compared to standard synthetic forms.</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-full bg-[#DDD6C9] flex items-center justify-center flex-shrink-0 text-[#1E2A3A]"><Heart size={20}/></div>
                         <div>
                            <h4 className="font-bold text-[#1E2A3A] text-sm mb-1">Synergistic Nutrient Combinations</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">Vitamin C enhances iron absorption, while vitamin D optimizes calcium utilization, creating powerful nutrient partnerships for better results.</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-full bg-[#DDD6C9] flex items-center justify-center flex-shrink-0 text-[#1E2A3A]"><Moon size={20}/></div>
                         <div>
                            <h4 className="font-bold text-[#1E2A3A] text-sm mb-1">Targeted Delivery System</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">Time-released formula ensures steady nutrient availability throughout the day, supporting sustained energy and overall vitality.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </TabsContent>

          {/* 4. HOW TO USE */}
          <TabsContent value="how-to-use" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                   {[
                      { num: 1, title: "Take Daily", desc: "Take 1 capsule daily with food, preferably with breakfast." },
                      { num: 2, title: "Best Time", desc: "Morning intake sets a positive tone for your metabolism." },
                      { num: 3, title: "Duration", desc: "Consistent daily use yields best long-term results." }
                   ].map((step) => (
                      <div key={step.num} className="flex gap-6 items-start">
                         <div className="w-10 h-10 rounded-full bg-[#C8D6B9] flex items-center justify-center font-serif font-bold text-[#1E2A3A] text-lg">{step.num}</div>
                         <div>
                            <h4 className="font-bold text-[#1E2A3A] mb-1">{step.title}</h4>
                            <p className="text-gray-600 text-sm">{step.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#EBE6DD]">
                   <h4 className="text-lg font-serif text-[#1E2A3A] mb-4">Tips for Best Results</h4>
                   <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                         <span className="text-[#F4A492] text-lg leading-none">•</span>
                         Take with Vitamin C-rich foods to enhance iron absorption
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                         <span className="text-[#F4A492] text-lg leading-none">•</span>
                         Avoid taking with calcium-rich foods if possible
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                         <span className="text-[#F4A492] text-lg leading-none">•</span>
                         Stay hydrated throughout the day
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                         <span className="text-[#F4A492] text-lg leading-none">•</span>
                         Set a daily reminder to maintain consistency
                      </li>
                   </ul>
                   <Button className="mt-8 bg-[#C8D6B9] text-[#1E2A3A] hover:bg-[#B6C9A3] uppercase tracking-widest text-xs w-full">Set Up Subscription</Button>
                </div>
             </div>
          </TabsContent>

          {/* 5. COMPATIBILITY */}
          <TabsContent value="compatibility" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                   <h4 className="flex items-center gap-2 text-[#1E2A3A] font-bold uppercase tracking-wider text-xs mb-6">
                      <CheckCircle2 className="text-green-600" size={18} /> Suitable With
                   </h4>
                   <div className="bg-green-50/50 border border-green-100 p-6 rounded-lg">
                      <p className="text-xs text-green-800 mb-4">Vitabae Daily can be safely combined with the following supplements and foods to enhance overall nutrition:</p>
                      <ul className="space-y-2 text-xs text-green-700">
                         <li>• <strong>Omega-3 Supplements</strong> – For enhanced cognitive support</li>
                         <li>• <strong>Probiotics</strong> – Supports daily digestive health</li>
                         <li>• <strong>Vitamin D3</strong> – Additional immune system support</li>
                      </ul>
                   </div>
                </div>

                <div>
                   <h4 className="flex items-center gap-2 text-[#1E2A3A] font-bold uppercase tracking-wider text-xs mb-6">
                      <AlertCircle className="text-red-500" size={18} /> To Avoid
                   </h4>
                   <div className="bg-red-50/50 border border-red-100 p-6 rounded-lg">
                      <p className="text-xs text-red-800 mb-4">For optimal absorption and safety, avoid combining Vitabae Daily with the following:</p>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <strong className="block text-xs text-red-900 mb-2">Supplements & Medications:</strong>
                            <ul className="space-y-1 text-[10px] text-red-800">
                               <li>• High-dose calcium</li>
                               <li>• Iron supplements</li>
                               <li>• Antacids</li>
                            </ul>
                         </div>
                         <div>
                            <strong className="block text-xs text-red-900 mb-2">Foods & Beverages:</strong>
                            <ul className="space-y-1 text-[10px] text-red-800">
                               <li>• Coffee or black tea</li>
                               <li>• High-fiber meals</li>
                               <li>• Dairy products</li>
                            </ul>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <h4 className="flex items-center gap-2 text-[#1E2A3A] font-bold uppercase tracking-wider text-xs mb-6">
                Suitable Profiles
             </h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                   { label: "Busy Professionals", sub: "Sustained Focus", icon: Zap },
                   { label: "Active Lifestyle", sub: "Recovery & Energy", icon: Heart },
                   { label: "Hormonal Balance", sub: "Cycle Support", icon: Moon },
                   { label: "General Wellness", sub: "Daily Vitality", icon: Leaf },
                ].map((profile, i) => (
                   <div key={i} className="border border-gray-200 p-4 rounded-lg text-center hover:border-[#F4A492] transition-colors">
                      <div className="w-10 h-10 mx-auto bg-[#EBE6DD] rounded-full flex items-center justify-center text-[#F4A492] mb-3">
                         <profile.icon size={18} />
                      </div>
                      <h5 className="text-sm font-bold text-[#1E2A3A]">{profile.label}</h5>
                      <p className="text-[10px] text-gray-500">{profile.sub}</p>
                   </div>
                ))}
             </div>
          </TabsContent>

          {/* 6. SAFETY */}
          <TabsContent value="safety" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-serif text-[#1E2A3A] mb-8 text-center">Safety & Quality Standards</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                   <h4 className="text-lg font-serif text-[#1E2A3A] mb-6">Laboratory Testing & Compliance</h4>
                   <div className="bg-[#FAF8F5] p-6 rounded-lg border border-gray-100 mb-6">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#1E2A3A] mb-4">Certifications & Standards:</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                         <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={14} /> GMP Certified — Good Manufacturing Practices</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={14} /> FDA Registered Facility</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={14} /> USDA Organic Certified</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={14} /> Non-GMO Project Verified</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={14} /> ISO 22000 Compliant</li>
                      </ul>
                   </div>
                   <div className="bg-[#FAF8F5] p-6 rounded-lg border border-gray-100">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#1E2A3A] mb-4">Laboratory Testing:</h4>
                      <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                         <li className="flex items-center gap-2"><ShieldCheck className="text-[#F4A492]" size={14} /> Heavy Metal Testing</li>
                         <li className="flex items-center gap-2"><ShieldCheck className="text-[#F4A492]" size={14} /> Microbial Testing</li>
                         <li className="flex items-center gap-2"><ShieldCheck className="text-[#F4A492]" size={14} /> Potency Verification</li>
                         <li className="flex items-center gap-2"><ShieldCheck className="text-[#F4A492]" size={14} /> Pesticide Residue</li>
                         <li className="flex items-center gap-2"><ShieldCheck className="text-[#F4A492]" size={14} /> Identity Testing</li>
                      </ul>
                   </div>
                </div>

                <div>
                   <h4 className="text-lg font-serif text-[#1E2A3A] mb-6">Known & Rare Side Effects</h4>
                   <div className="p-6 bg-yellow-50/50 border border-yellow-100 rounded-lg">
                      <h5 className="flex items-center gap-2 text-yellow-800 font-bold uppercase tracking-wider text-xs mb-3">
                         <AlertCircle size={16} /> Important Safety Information
                      </h5>
                      <p className="text-xs text-yellow-900/80 mb-4 leading-relaxed">
                         Vitabae Daily is generally well-tolerated. However, as with any supplement, some individuals may experience side effects.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs text-yellow-900/70">
                         <div>
                            <strong>Common Side Effects (1-5%):</strong>
                            <ul className="list-disc pl-4 mt-1">
                               <li>Mild digestive discomfort</li>
                               <li>Nausea (take with food)</li>
                               <li>Constipation (increase water)</li>
                            </ul>
                         </div>
                         <div>
                            <strong>Rare Side Effects (Less than 1%):</strong>
                            <ul className="list-disc pl-4 mt-1">
                               <li>Allergic reactions</li>
                               <li>Severe stomach upset</li>
                               <li>Headaches</li>
                            </ul>
                         </div>
                      </div>
                   </div>

                   <div className="mt-6 p-6 bg-[#F0F9F0] border border-green-100 rounded-lg">
                      <h5 className="font-bold text-[#1E2A3A] text-sm mb-2">Always Consult Your Healthcare Provider</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">
                         Before starting any new supplement regimen, please consult with your healthcare provider. This is especially important if you have pre-existing medical conditions or are taking prescription medications.
                      </p>
                   </div>
                   </div>
                   </div>

                   {/* Storage & Shelf Life */}
                   <div className="mt-12 bg-white p-8 rounded-lg border border-gray-200">
                   <h4 className="text-lg font-serif text-[#1E2A3A] mb-6">Storage & Shelf Life</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <h5 className="font-bold text-sm text-[#1E2A3A] mb-3 uppercase tracking-wider">Storage Instructions:</h5>
                       <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                             <CheckCircle2 className="text-[#C8D6B9] flex-shrink-0 mt-0.5" size={16} />
                             <span>Store in a cool, dry place away from direct sunlight</span>
                          </li>
                          <li className="flex items-start gap-2">
                             <CheckCircle2 className="text-[#C8D6B9] flex-shrink-0 mt-0.5" size={16} />
                             <span>Keep lid tightly closed when not in use</span>
                          </li>
                          <li className="flex items-start gap-2">
                             <CheckCircle2 className="text-[#C8D6B9] flex-shrink-0 mt-0.5" size={16} />
                             <span>Avoid exposure to excessive heat or moisture</span>
                          </li>
                          <li className="flex items-start gap-2">
                             <CheckCircle2 className="text-[#C8D6B9] flex-shrink-0 mt-0.5" size={16} />
                             <span>Keep out of reach of children</span>
                          </li>
                       </ul>
                    </div>
                    <div>
                       <h5 className="font-bold text-sm text-[#1E2A3A] mb-3 uppercase tracking-wider">Shelf Life Information:</h5>
                       <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                             <Info className="text-[#F4A492] flex-shrink-0 mt-0.5" size={16} />
                             <span><strong>Unopened:</strong> 24 months from manufacturing date</span>
                          </li>
                          <li className="flex items-start gap-2">
                             <Info className="text-[#F4A492] flex-shrink-0 mt-0.5" size={16} />
                             <span><strong>After Opening:</strong> Best used within 6 months</span>
                          </li>
                          <li className="flex items-start gap-2">
                             <Info className="text-[#F4A492] flex-shrink-0 mt-0.5" size={16} />
                             <span>Expiration date printed on bottom of bottle</span>
                          </li>
                          <li className="flex items-start gap-2">
                             <Info className="text-[#F4A492] flex-shrink-0 mt-0.5" size={16} />
                             <span>Do not use if seal is broken or missing</span>
                          </li>
                       </ul>
                    </div>
                   </div>
                   </div>
                   </div>
          </TabsContent>

          {/* 7. RECIPES */}
          <TabsContent value="recipes" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center py-12 bg-[#FAF8F5] rounded-xl border border-[#DDD6C9]">
                <h3 className="text-2xl font-serif text-[#1E2A3A] mb-4">Simple Recipe Idea</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg font-light">
                   Try opening the capsule into your morning smoothie.
                </p>
                <div className="inline-block bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-left max-w-sm mx-auto">
                   <h4 className="font-bold text-[#1E2A3A] mb-2 text-sm uppercase tracking-wide">The Glow Smoothie</h4>
                   <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• 1 Cup Almond Milk</li>
                      <li>• 1 Banana</li>
                      <li>• 1 Handful Spinach</li>
                      <li>• <strong>1 Vitabae Capsule (Opened)</strong></li>
                   </ul>
                   <p className="text-xs text-gray-400 italic">Blend and enjoy immediately for maximum potency.</p>
                </div>
             </div>
          </TabsContent>

          {/* 8. FAQ */}
          <TabsContent value="faq" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="product" className="w-full">
                   <TabsList className="w-full flex justify-center mb-8 bg-transparent">
                      {["Product", "Shipping", "Subscription", "Safety"].map(tab => (
                         <TabsTrigger 
                            key={tab} 
                            value={tab.toLowerCase()}
                            className="data-[state=active]:border-b-2 data-[state=active]:border-[#F4A492] data-[state=active]:text-[#1E2A3A] text-gray-400 rounded-none bg-transparent px-6 pb-2 uppercase tracking-widest text-xs font-bold"
                         >
                            {tab}
                         </TabsTrigger>
                      ))}
                   </TabsList>
                   
                   <TabsContent value="product" className="space-y-4">
                       {[
                         { q: "Can I combine this formula with other supplements?", a: "Yes, our formulas are designed to be stackable. However, we recommend consulting with your healthcare provider if you are taking prescription medications." },
                         { q: "When will I start seeing benefits?", a: "Most women report feeling a difference in energy and mood within 2-3 weeks, with full hormonal balance benefits accruing over 2-3 months of consistent use." },
                         { q: "Is this safe for daily use?", a: "Absolutely. Our ingredients are dosed for long-term daily support, not just quick fixes." }
                       ].map((item, i) => (
                         <Accordion key={i} type="single" collapsible className="w-full">
                            <AccordionItem value={`item-${i}`} className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm mb-4">
                               <AccordionTrigger className="hover:no-underline text-left font-bold text-[#1E2A3A] py-6 text-sm uppercase tracking-wider">
                                  <span className="flex-1">{item.q}</span>
                               </AccordionTrigger>
                               <AccordionContent className="text-gray-600 pb-6 leading-relaxed">{item.a}</AccordionContent>
                            </AccordionItem>
                         </Accordion>
                       ))}
                   </TabsContent>

                   <TabsContent value="shipping" className="space-y-4">
                       {[
                         { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Expedited options are available at checkout." },
                         { q: "Do you ship internationally?", a: "Currently we ship to the US and Canada. We are working on expanding to Europe and Asia soon." },
                         { q: "How can I track my order?", a: "You will receive a tracking number via email as soon as your order ships." }
                       ].map((item, i) => (
                         <Accordion key={i} type="single" collapsible className="w-full">
                            <AccordionItem value={`item-${i}`} className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm mb-4">
                               <AccordionTrigger className="hover:no-underline text-left font-bold text-[#1E2A3A] py-6 text-sm uppercase tracking-wider">
                                  <span className="flex-1">{item.q}</span>
                               </AccordionTrigger>
                               <AccordionContent className="text-gray-600 pb-6 leading-relaxed">{item.a}</AccordionContent>
                            </AccordionItem>
                         </Accordion>
                       ))}
                   </TabsContent>

                   <TabsContent value="subscription" className="space-y-4">
                       {[
                         { q: "Can I pause or cancel my subscription?", a: "Yes, you can pause, skip, or cancel your subscription at any time from your account dashboard." },
                         { q: "What is the subscription discount?", a: "Subscribers save 25% on every order and get free shipping." },
                         { q: "How often will I receive my order?", a: "Subscriptions renew every 30 days by default, but you can adjust the frequency to 45 or 60 days." }
                       ].map((item, i) => (
                         <Accordion key={i} type="single" collapsible className="w-full">
                            <AccordionItem value={`item-${i}`} className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm mb-4">
                               <AccordionTrigger className="hover:no-underline text-left font-bold text-[#1E2A3A] py-6 text-sm uppercase tracking-wider">
                                  <span className="flex-1">{item.q}</span>
                               </AccordionTrigger>
                               <AccordionContent className="text-gray-600 pb-6 leading-relaxed">{item.a}</AccordionContent>
                            </AccordionItem>
                         </Accordion>
                       ))}
                   </TabsContent>
                   
                   <TabsContent value="safety" className="space-y-4">
                       {[
                         { q: "Are your products third-party tested?", a: "Yes, every batch is tested by independent ISO-certified labs for purity and potency." },
                         { q: "Where are the products manufactured?", a: "All our products are manufactured in our own FDA-registered, GMP-certified facility in the USA." },
                         { q: "Are there any allergens?", a: "Our products are free from common allergens like gluten, dairy, soy, and nuts. Please check the label for specific details." }
                       ].map((item, i) => (
                         <Accordion key={i} type="single" collapsible className="w-full">
                            <AccordionItem value={`item-${i}`} className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm mb-4">
                               <AccordionTrigger className="hover:no-underline text-left font-bold text-[#1E2A3A] py-6 text-sm uppercase tracking-wider">
                                  <span className="flex-1">{item.q}</span>
                               </AccordionTrigger>
                               <AccordionContent className="text-gray-600 pb-6 leading-relaxed">{item.a}</AccordionContent>
                            </AccordionItem>
                         </Accordion>
                       ))}
                   </TabsContent>
                </Tabs>
             </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
}