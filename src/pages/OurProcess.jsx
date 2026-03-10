import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import {
  Sprout, Handshake, ClipboardCheck, Warehouse, Lock, FlaskConical, Microscope,
  TestTubes, CheckCircle2, Droplets, Thermometer, Scissors, CogIcon, Beaker,
  Wind, Blend, Layers, Pill, Hash, Package, ShieldCheck, FileSearch,
  ArrowRight, ChevronDown, ChevronUp, Eye, AlertTriangle, Award, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   22 PROCESS STEPS
══════════════════════════════════════════════════════════ */
const STEPS = [
  { num: 1,  title: 'Understanding the Ingredient', icon: Sprout, phase: 'origin', short: 'We study each plant individually — its ideal soil, climate, and growing conditions — before sourcing begins.' },
  { num: 2,  title: 'Finding Farms That Share Our Standards', icon: Handshake, phase: 'origin', short: 'We work directly with certified organic farmers in India, building long-term relationships based on trust and shared values.' },
  { num: 3,  title: 'Receipt & Inspection', icon: ClipboardCheck, phase: 'intake', short: 'Every delivery is checked on arrival — documents, certifications, and transport conditions — before anything is unloaded.' },
  { num: 4,  title: 'Storing What We\'ve Sourced', icon: Warehouse, phase: 'intake', short: 'Organic materials are stored in a dedicated warehouse with strict separation, clean pallets, and FIFO rotation.' },
  { num: 5,  title: 'Mandatory Quarantine', icon: Lock, phase: 'intake', short: 'Every batch is held under a blue "QC HOLD" label. No material enters production until all testing is complete.' },
  { num: 6,  title: 'Raw Material Sampling', icon: FlaskConical, phase: 'testing', short: 'Our QA/QC team takes samples from multiple bags using dedicated tools. Every detail is logged.' },
  { num: 7,  title: 'Internal Quality Testing', icon: Microscope, phase: 'testing', short: 'Visual inspection, botanical identity, moisture content, and particle size are checked in-house first.' },
  { num: 8,  title: 'External Laboratory Testing', icon: TestTubes, phase: 'testing', short: 'Independent labs test for heavy metals, microbiologicals, pesticide residues, and regulatory compliance.' },
  { num: 9,  title: 'Released or Rejected', icon: CheckCircle2, phase: 'testing', short: 'One final decision per batch. Compliant batches are released. Non-compliant batches are returned or destroyed.' },
  { num: 10, title: 'Cleaning & Material Preparation', icon: Droplets, phase: 'processing', short: 'Fresh materials are washed and prepared. Dry materials are visually inspected. Nothing moves forward until it\'s clean.' },
  { num: 11, title: 'Primary Drying', icon: Thermometer, phase: 'processing', short: 'Materials enter our vacuum tray dryer, where moisture is removed at low temperatures to protect heat-sensitive compounds.' },
  { num: 12, title: 'Size Reduction', icon: Scissors, phase: 'processing', short: 'Dried materials are cut into uniform 1–3 cm pieces, preparing them for grinding.' },
  { num: 13, title: 'Pre-Grinding', icon: CogIcon, phase: 'processing', short: 'Cut material is reduced to coarse granules, creating uniform particle size for efficient processing.' },
  { num: 14, title: 'Extraction & Concentration', icon: Beaker, phase: 'processing', short: 'Where applicable, active compounds are drawn out using only purified water, then concentrated under vacuum.' },
  { num: 15, title: 'Final Drying', icon: Wind, phase: 'processing', short: 'Concentrated extract undergoes slow, precise vacuum drying to reach its final dry specification.' },
  { num: 16, title: 'Fine Milling', icon: Blend, phase: 'processing', short: 'Dried material is ground into consistent, uniform powder ready for blending.' },
  { num: 17, title: 'Sieving', icon: Layers, phase: 'processing', short: 'Powder is filtered through 80-mesh screens. Oversized particles are removed. Uniformity is confirmed.' },
  { num: 18, title: 'Blending', icon: Blend, phase: 'finishing', short: 'Ingredients are precisely weighed and blended under controlled conditions until fully uniform.' },
  { num: 19, title: 'Encapsulation', icon: Pill, phase: 'finishing', short: 'Powder is deposited into capsules with continuous weight monitoring and real-time adjustments.' },
  { num: 20, title: 'Counting & Bottle Filling', icon: Hash, phase: 'finishing', short: 'High-accuracy sensors count each capsule into bottles. Incorrect counts are automatically rejected.' },
  { num: 21, title: 'Capping & Sealing', icon: Package, phase: 'finishing', short: 'Bottles are capped with controlled torque and sealed. Every seal is verified before moving forward.' },
  { num: 22, title: 'Traceability & Batch Release', icon: FileSearch, phase: 'finishing', short: 'Every capsule is fully traceable from farm to finished bottle with complete batch documentation.' },
];

const PHASE_META = {
  origin:     { label: 'Origin', color: '#6B8E23' },
  intake:     { label: 'Intake & Storage', color: '#E8A598' },
  testing:    { label: 'Testing', color: '#5B8DB8' },
  processing: { label: 'Processing', color: '#D4A0C0' },
  finishing:  { label: 'Finishing', color: '#1E2A3A' },
};

/* ══════════════════════════════════════════════════════════
   STEP DETAIL CONTENT
══════════════════════════════════════════════════════════ */
const STEP_DETAILS = {
  1: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Every ingredient has its own story. Before anything else, we take the time to understand the ingredient itself: how it grows, what it needs, and under which natural conditions it can truly thrive.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">An Ingredient-by-Ingredient Approach</h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">There is no one-size-fits-all method. Each ingredient is studied individually, based on scientific and nutritional data, agronomic research, botanical studies, and observations of how the plant behaves in different environments.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Defining the Right Growing Conditions</h4>
      <ul className="space-y-1.5 text-sm text-gray-600 mb-4">
        <li>• <strong>Soil</strong> — structure, mineral composition, drainage, and pH</li>
        <li>• <strong>Climate</strong> — rainfall, temperatures, seasonal variations, and long-term stability</li>
        <li>• <strong>Natural Environment</strong> — sunlight exposure, wind, and humidity</li>
        <li>• <strong>Biological Pressure</strong> — pests, plant-specific diseases, and natural resilience</li>
        <li>• <strong>Water Resources</strong> — irrigation requirements and dependence on natural rainfall</li>
      </ul>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Identifying Naturally Suitable Areas</h4>
      <p className="text-sm text-gray-600 leading-relaxed">We select regions for their natural conditions, not for their convenience. This is where everything begins.</p>
    </>
  ),
  2: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Sourcing is not a transaction. It's a relationship built over time. We work directly with farmers — no large intermediary organizations standing between us.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">One Farm at a Time</h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">We send our own Vitabae team members into the field, organized by region. Their role is to identify growing areas that match our criteria, meet with farmers directly, observe actual agricultural practices, and assess whether what is claimed matches what is actually done. In some cases, several months are needed to identify a single compatible farm.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">From First Contact to Trust</h4>
      <p className="text-sm text-gray-600 leading-relaxed">Most farmers do not trust immediately — and this is entirely understandable. Building a long-term relationship requires transparency, consistency, respect for local practices, and above all, time. Some collaborations take years to fully develop. By the time raw materials arrive at our facility, we already know their origin, their journey, and the hands that cultivated them.</p>
    </>
  ),
  3: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">When raw materials arrive, nothing is accepted by default. Every delivery goes through the same process — regardless of the supplier or how long we've worked together.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Document Verification</h4>
      <ul className="space-y-1 text-sm text-gray-600 mb-4">
        <li>• Invoice and purchase order alignment</li>
        <li>• Organic certificate validity</li>
        <li>• Certificate of Analysis (CoA)</li>
        <li>• Batch number and traceability information</li>
        <li>• Manufacturing and expiry dates</li>
      </ul>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Transport Vehicle Inspection</h4>
      <ul className="space-y-1 text-sm text-gray-600 mb-4">
        <li>• Overall cleanliness</li>
        <li>• Absence of chemical residues or unusual odors</li>
        <li>• Transport conditions (heat, humidity exposure)</li>
      </ul>
      <p className="text-xs text-gray-500 italic">If either the vehicle or the documentation is non-compliant, the batch is immediately blocked. No exceptions.</p>
    </>
  ),
  4: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Storage is part of quality control, not just logistics. Organic raw materials are stored in a warehouse strictly dedicated to organic products.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Non-Negotiable Rules</h4>
      <ul className="space-y-1 text-sm text-gray-600 mb-4">
        <li>• Complete separation between organic and non-organic materials</li>
        <li>• Sealed walls and doors with no gaps</li>
        <li>• Adequate ventilation and lighting</li>
        <li>• Shipping containers are never used as storage areas</li>
      </ul>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Physical Organization</h4>
      <ul className="space-y-1 text-sm text-gray-600">
        <li>• Materials stored only on clean plastic pallets</li>
        <li>• New storage bags only (never reused)</li>
        <li>• Pallets kept away from walls and floors</li>
        <li>• Clear aisles for inspection and cleaning</li>
        <li>• Strict application of FIFO (First In, First Out)</li>
      </ul>
    </>
  ),
  5: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Quarantine is not a storage step — it is a controlled safety barrier. It ensures that no material can move into production until its identity, purity, and safety are fully verified.</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">A blue "QC HOLD" label is applied to each batch. During quarantine:</p>
      <ul className="space-y-1 text-sm text-gray-600 mb-4">
        <li>• No use is permitted</li>
        <li>• No transfer to production is allowed</li>
        <li>• The material stays on hold until all testing is complete</li>
      </ul>
      <p className="text-xs text-gray-500 italic">Quarantine is mandatory — even for approved or long-term suppliers. Trust does not bypass verification.</p>
    </>
  ),
  6: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Sampling is carried out exclusively by our Quality Assurance / Quality Control team. This is not delegated.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Sampling Rules</h4>
      <ul className="space-y-1 text-sm text-gray-600 mb-4">
        <li>• Clean, dry, dedicated sampling tools</li>
        <li>• One tool per raw material</li>
        <li>• Samples taken from multiple bags to represent the full batch</li>
        <li>• Sampled bags clearly marked with an "S" identification tag</li>
      </ul>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">What Gets Recorded</h4>
      <ul className="space-y-1 text-sm text-gray-600">
        <li>• Material name & Batch number</li>
        <li>• Quantity received</li>
        <li>• Receiving and sampling dates</li>
        <li>• Responsible personnel</li>
      </ul>
    </>
  ),
  7: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">The first level of verification happens in-house. Internal tests include:</p>
      <ul className="space-y-1 text-sm text-gray-600 mb-4">
        <li>• Visual inspection (color, odor, appearance)</li>
        <li>• Botanical identity confirmation</li>
        <li>• Moisture content measurement</li>
        <li>• Particle size analysis where applicable</li>
      </ul>
      <p className="text-sm text-gray-600 leading-relaxed">These tests verify consistency with documentation and suitability for processing. A batch can be blocked at this stage if any anomaly is detected.</p>
    </>
  ),
  8: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">We test to find what's actually there — not to confirm what we hope. Samples are sent to qualified, independent external laboratories.</p>
      <div className="border border-gray-100 rounded-lg overflow-hidden mb-4">
        <table className="w-full text-xs">
          <thead><tr className="bg-[#FAF8F5]">
            <th className="text-left px-4 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Test</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">What We Check</th>
          </tr></thead>
          <tbody>
            <tr className="border-t border-gray-100"><td className="px-4 py-2.5 font-medium text-[#1E2A3A]">Heavy Metals</td><td className="px-4 py-2.5 text-gray-600">Lead, arsenic, cadmium, mercury</td></tr>
            <tr className="border-t border-gray-100"><td className="px-4 py-2.5 font-medium text-[#1E2A3A]">Microbiological</td><td className="px-4 py-2.5 text-gray-600">Total plate count, yeast, mold, E. coli, Salmonella</td></tr>
            <tr className="border-t border-gray-100"><td className="px-4 py-2.5 font-medium text-[#1E2A3A]">Pesticide Residues</td><td className="px-4 py-2.5 text-gray-600">Screened against organic certification standards</td></tr>
            <tr className="border-t border-gray-100"><td className="px-4 py-2.5 font-medium text-[#1E2A3A]">Regulatory Compliance</td><td className="px-4 py-2.5 text-gray-600">All applicable safety and quality parameters</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 italic">External testing is mandatory, even if internal results are acceptable. Both levels must pass.</p>
    </>
  ),
  9: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">One decision. No middle ground. Once all results are received, a single, final decision is made for each batch.</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2">If Compliant</h5>
          <ul className="space-y-1 text-xs text-green-700">
            <li>• Green "RELEASED" label applied</li>
            <li>• Date and QA/QC signature added</li>
            <li>• Transfer to approved storage</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h5 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">If Non-Compliant</h5>
          <ul className="space-y-1 text-xs text-red-700">
            <li>• Red "REJECTED" label applied</li>
            <li>• Immediate transfer to rejected area</li>
            <li>• Returned to supplier or destroyed</li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-gray-500 italic">Rejection is a normal and necessary part of the process. Some batches never make it through. That's how it should work.</p>
    </>
  ),
  10: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Every material must be cleaned and prepared before it moves into production. This is where hands-on work begins.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Two Paths, One Standard</h4>
      <p className="text-sm text-gray-600 mb-3"><strong>Dry materials</strong> go through visual inspection on sorting tables, with manual removal of foreign matter and non-conforming pieces.</p>
      <p className="text-sm text-gray-600 mb-3"><strong>Fresh materials</strong> are loaded into our washing machine — 25 kg at a time — and washed using RO-purified water. Each 30-minute cycle removes soil, dust, and debris while reducing surface microbial load.</p>
      <p className="text-sm text-gray-600">Where required, materials then pass through our steam balancer — 25 kg per batch, 30 minutes of controlled steam exposure followed by rapid cooling in chilled water.</p>
    </>
  ),
  11: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Heat is the enemy of the very compounds we're trying to protect. Conventional drying applies direct heat and destroys bioactive compounds — the natural molecules that give each ingredient its beneficial properties.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">How It Works</h4>
      <p className="text-sm text-gray-600 leading-relaxed">Cleaned materials enter our 200 kg-capacity vacuum tray dryer, where moisture is removed under reduced pressure at controlled low temperatures. By lowering air pressure, water evaporates at temperatures far below what conventional drying requires. Temperature, drying duration, and vacuum pressure are continuously monitored throughout the cycle. This is slower than conventional drying. That's the point.</p>
    </>
  ),
  12: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed">Dried materials are fed into our mechanical cutter and cut into pieces approximately 1–3 cm in size, creating uniform material suitable for the grinding stages that follow. It's a simple step — but uniformity here determines consistency later.</p>
    </>
  ),
  13: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed">Cut material is loaded into our pulveriser — 25 kg per batch — and reduced to coarse granules over a 30-minute cycle using impact, shear, and friction. The machine is cleaned for 20 minutes between batches. This step creates the uniform particle size needed for efficient, reproducible extraction or milling downstream.</p>
    </>
  ),
  14: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">Not every ingredient goes through extraction. But when it does, this is the most complex stage in our entire process.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Drawing Out What Matters</h4>
      <p className="text-sm text-gray-600 mb-3">Material enters our stainless steel extractor — 25 kg in a 250-litre tank — with purified RO water as the only solvent. At approximately 70°C with continuous stirring, active compounds are drawn into the water over 4 hours and 30 minutes. No harsh solvents. No chemical shortcuts. Water only.</p>
      <h4 className="text-sm font-bold text-[#1E2A3A] mb-2 uppercase tracking-wider">Filtering & Concentrating</h4>
      <p className="text-sm text-gray-600">The filtered extract enters our 250-litre vacuum concentrator, where water is removed through controlled heating under vacuum over 5 hours. The target concentration: Brix 45–55%.</p>
    </>
  ),
  15: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed">The concentrated extract moves back to our vacuum tray dryer — 25 to 35 kg per batch — for final moisture removal. 8 hours under vacuum with steam-heated shelves at controlled pressure. After each batch, the dryer undergoes 1 full hour of cleaning before it's loaded again. Rushing this step would compromise everything that came before it.</p>
    </>
  ),
  16: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed">Dried material enters our multi mill, processing up to 100 kg per hour through impact and shear forces. The result: consistent, uniform powder with the particle size needed for accurate blending and encapsulation. The mill is cleaned for 30 minutes between batches. What comes out must be the same — every time.</p>
    </>
  ),
  17: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed">Powder passes through our vibro sifter at up to 200 kg per hour, filtered through 80-mesh screens. Oversized particles are removed. What remains is checked for uniformity and bulk density. Only powder that passes this check moves to blending. This is the last quality gate before ingredients are combined.</p>
    </>
  ),
  18: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">Ingredients are precisely weighed, then combined in our 20-litre ribbon blender. Under controlled temperature and humidity, the blender runs for a full hour — or until complete uniformity is confirmed. Cleaning between batches: 15 minutes.</p>
      <p className="text-xs text-gray-500 italic">Non-uniform blends are rejected. There are no exceptions. If the blend isn't right, nothing that follows will be either.</p>
    </>
  ),
  19: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">Capsules are filled using our capsule filling machine. Vacuum separation opens each shell, precise amounts of powder are deposited, and capsules are reclosed and locked — all with continuous weight monitoring and real-time adjustments.</p>
      <p className="text-xs text-gray-500 italic">Every capsule is weighed. Every variation is tracked. Consistency is not a goal — it's a requirement.</p>
    </>
  ),
  20: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">No human hand touches the capsules at this stage. High-accuracy sensors count each capsule and transfer them directly into bottles without manual handling.</p>
      <p className="text-xs text-gray-500 italic">Any bottle with an incorrect count is automatically rejected. If the count isn't exact, the bottle doesn't move forward.</p>
    </>
  ),
  21: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">Bottles move through our automatic capping and sealing machine, where caps are placed with controlled torque. Where applicable, induction sealing ensures airtight closure.</p>
      <p className="text-xs text-gray-500 italic">Every bottle undergoes torque verification and seal integrity checks. What's inside is protected. What's outside stays out.</p>
    </>
  ),
  22: (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">Each batch carries a unique batch number, complete processing parameters, full quality control records, and an unbroken chain of documentation from farm to finished capsule.</p>
      <p className="text-sm text-gray-600 leading-relaxed font-medium">22 documented process steps. Two independent testing levels. 100% batch traceability. This is what happens between the soil and your bottle.</p>
    </>
  ),
};

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export default function OurProcess() {
  const heroRef = useRef(null);
  const [expandedStep, setExpandedStep] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.process-hero-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.process-hero-title', { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }, '-=0.3')
        .fromTo('.process-hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo('.process-hero-stat', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3');

      // Animate step cards on scroll
      document.querySelectorAll('.step-card').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const toggleStep = (num) => {
    setExpandedStep(expandedStep === num ? null : num);
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-[#1E2A3A] text-white py-24 md:py-32 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <span className="process-hero-label text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-6 block">
            Our Process
          </span>
          <div className="overflow-hidden">
            <h1 className="process-hero-title text-4xl md:text-6xl lg:text-7xl mb-6">
              <span className="font-light">From Farm </span>
              <span className="font-serif italic">to Capsule</span>
            </h1>
          </div>
          <p className="process-hero-sub text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-4">
            Behind every capsule is a documented journey — one that begins long before anything is harvested or processed. This is the full story of how we work. Not simplified. Not glossed over. Everything that happens between the soil and your bottle.
          </p>
          <p className="process-hero-sub text-[#E8A598] text-sm font-medium mb-10">
            22 documented process steps. Click any stage to explore it in detail.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { num: '22', label: 'Process Steps' },
              { num: '2', label: 'Testing Levels' },
              { num: '100%', label: 'Batch Traceability' },
            ].map((s, i) => (
              <div key={i} className="process-hero-stat text-center">
                <span className="text-3xl md:text-4xl font-light text-white block">{s.num}</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LINEAR TIMELINE — 22 STEPS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">

          {/* Phase legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {Object.entries(PHASE_META).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{meta.label}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gray-200" />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const phase = PHASE_META[step.phase];
              const isExpanded = expandedStep === step.num;
              const prevPhase = i > 0 ? STEPS[i - 1].phase : null;
              const isNewPhase = step.phase !== prevPhase;

              return (
                <React.Fragment key={step.num}>
                  {/* Phase divider */}
                  {isNewPhase && (
                    <div className="relative flex items-center mb-6 mt-2">
                      <div className="absolute left-6 md:left-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white z-10" style={{ backgroundColor: phase.color }} />
                      <div className="ml-14 md:ml-16">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: phase.color }}>
                          {phase.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step node */}
                  <div
                    className="step-card relative flex items-start mb-1 cursor-pointer group"
                    onClick={() => toggleStep(step.num)}
                  >
                    {/* Node dot on the line */}
                    <div className="absolute left-6 md:left-8 -translate-x-1/2 z-10 mt-5">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-all duration-300 ${
                          isExpanded ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                        style={{ backgroundColor: isExpanded ? phase.color : `${phase.color}20` }}
                      >
                        <Icon size={16} className={isExpanded ? 'text-white' : ''} style={isExpanded ? {} : { color: phase.color }} />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="ml-14 md:ml-16 flex-grow mb-4 transition-all duration-300">
                      <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'border-gray-300 shadow-lg' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                      }`}>
                        <div className="p-4 md:p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Step {step.num}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: phase.color }}>
                                  {phase.label}
                                </span>
                              </div>
                              <h3 className="text-sm md:text-base font-medium text-[#1E2A3A] mb-1.5 leading-tight">{step.title}</h3>
                              <p className="text-xs text-gray-500 leading-relaxed">{step.short}</p>
                            </div>
                            <div className="flex-shrink-0 mt-1">
                              {isExpanded ? (
                                <ChevronUp size={16} className="text-gray-400" />
                              ) : (
                                <ChevronDown size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded detail */}
                        {isExpanded && STEP_DETAILS[step.num] && (
                          <div className="px-4 md:px-5 pb-5 border-t border-gray-100 pt-4 animate-in fade-in duration-300">
                            {STEP_DETAILS[step.num]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

            {/* End marker */}
            <div className="relative flex items-center mt-2">
              <div className="absolute left-6 md:left-8 -translate-x-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-[#1E2A3A] flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
              </div>
              <div className="ml-14 md:ml-16">
                <p className="text-xs text-gray-500 font-medium">Your bottle is complete.</p>
              </div>
            </div>
          </div>

          {/* Process Video */}
          <div className="mt-16 rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-[#1E2A3A]">
              <video
                src="/videos/capsule-firefly.mp4"
                autoPlay muted loop playsInline
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/80 text-sm font-light tracking-wider">From Root to Capsule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — INVISIBLE RISK + STANDARDS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">

          {/* What You Don't See */}
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">Verification & Risk Control</p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1E2A3A] mb-4">
              What You Don't See — But We <span className="font-serif italic">Never Stop Watching</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              The 22 steps above are what we can show you. But behind every one of them is something harder to photograph: the things we monitor that you'll never see.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              { icon: Eye, title: 'Biofilm Monitoring', text: 'Equipment surfaces are tracked for biofilm formation that could compromise purity.' },
              { icon: Droplets, title: 'Moisture Intrusion', text: 'Humidity and moisture levels are monitored at every storage and processing stage.' },
              { icon: ShieldCheck, title: 'Gasket & Seal Integrity', text: 'All machine seals and gaskets are inspected to prevent cross-contact.' },
              { icon: AlertTriangle, title: 'Cross-Contact Prevention', text: 'Material flow is controlled to prevent any cross-contamination between batches.' },
              { icon: ClipboardCheck, title: 'Operator Hygiene', text: 'Every person in the facility follows strict hygiene protocols — tracked and documented.' },
              { icon: FileSearch, title: 'Point-of-Risk Documentation', text: 'Identified risks at each machine and stage are tracked in our quality systems.' },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="bg-[#FAF8F5] rounded-xl p-6 border border-gray-100">
                  <IconComp size={20} className="text-[#1E2A3A] mb-3" />
                  <h3 className="text-sm font-medium text-[#1E2A3A] mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-14">
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
              We don't just test the finished product. We control risk at every point along the way.
            </p>
          </div>

          {/* The Standards Behind Our Standards */}
          <div className="bg-[#1E2A3A] rounded-2xl p-8 md:p-12 text-white mb-14">
            <h3 className="text-xl md:text-2xl font-light mb-6">
              The Standards Behind <span className="font-serif italic">Our Standards</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-8">
              Our facility operates under current Good Manufacturing Practices (cGMP) in accordance with 21 CFR Part 111 for dietary supplements. Our quality management systems incorporate FSSC 22000 Version 6 food safety certification. These aren't badges we display. They're the framework behind every decision described on this page.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'cGMP', sub: '21 CFR Part 111' },
                { label: 'FSSC 22000', sub: 'Version 6' },
                { label: 'ISO 22000', sub: '2018 Standard' },
                { label: 'Third-Party', sub: 'Lab Tested' },
              ].map((cert, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                  <Award size={20} className="mx-auto mb-2 text-[#E8A598]" />
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{cert.label}</p>
                  <p className="text-[10px] text-gray-400">{cert.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-[#1E2A3A] mb-4">
              This Is Our Process — And We Don't <span className="font-serif italic">Simplify It</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              Waiting is built into how we work. Testing takes time. Verification takes time. Building relationships with farmers takes time. Some ingredients move through quickly. Others take longer. Some batches never make it through at all.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              We don't simplify this for marketing. We don't gloss over the complexity. This is what actually happens — from the soil to your bottle.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium">
              When research shows we should do something differently, we'll change. Until then, our process follows evidence, verification, and a deep respect for how plants naturally grow. This is how we define quality.
            </p>

            <p className="text-sm text-gray-500 mb-6">You've seen the process. Now meet the products it creates.</p>

            <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group">
              <Link to="/Collection">
                Explore Our Products
                <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-[#FAF8F5] border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] text-gray-400 italic">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>
    </div>
  );
}
