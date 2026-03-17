import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import {
  Sprout, Handshake, ClipboardCheck, Warehouse, Lock, FlaskConical, Microscope,
  TestTubes, CheckCircle2, Droplets, Thermometer, Scissors, CogIcon, Beaker,
  Wind, Blend, Layers, Pill, Hash, Package, ShieldCheck, FileSearch,
  ArrowRight, ArrowLeft, Eye, AlertTriangle, Award, X, ChevronLeft, ChevronRight
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
  { num: 10, title: 'Cleaning & Material Preparation', icon: Droplets, phase: 'processing', short: 'Every material must be cleaned and prepared before it moves into production. This is where hands-on work begins.' },
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

const PHASE_COLORS = {
  origin: '#6B8E23',
  intake: '#E8A598',
  testing: '#5B8DB8',
  processing: '#D4A0C0',
  finishing: '#1E2A3A',
};

/* ══════════════════════════════════════════════════════════
   STEP DETAIL CONTENT
══════════════════════════════════════════════════════════ */
const STEP_DETAILS = {
  1: {
    visual: 'soil-study',
    points: [
      { label: 'Soil', desc: 'Structure, mineral composition, drainage, and pH' },
      { label: 'Climate', desc: 'Rainfall, temperatures, seasonal variations, and long-term stability' },
      { label: 'Environment', desc: 'Sunlight exposure, wind, and humidity' },
      { label: 'Biological Pressure', desc: 'Pests, plant-specific diseases, and natural resilience' },
      { label: 'Water Resources', desc: 'Irrigation requirements and dependence on natural rainfall' },
    ],
    body: 'Every ingredient has its own story. Before anything else, we take the time to understand the ingredient itself: how it grows, what it needs, and under which natural conditions it can truly thrive. There is no one-size-fits-all method. Each ingredient is studied individually, based on scientific and nutritional data, agronomic research, botanical studies, and observations of how the plant behaves in different environments.',
  },
  2: {
    visual: 'farm-visit',
    points: [
      { label: 'Direct Relationships', desc: 'No large intermediary organizations between us and the farmer' },
      { label: 'Field Visits', desc: 'Our own team members visit farms, organized by region' },
      { label: 'Practice Verification', desc: 'We observe actual agricultural practices on-site' },
      { label: 'Long-term Trust', desc: 'Some collaborations take years to fully develop' },
    ],
    body: 'Sourcing is not a transaction. It\'s a relationship built over time. We send our own Vitabae team members into the field to identify growing areas that match our criteria, meet with farmers directly, and assess whether what is claimed matches what is actually done. By the time raw materials arrive at our facility, we already know their origin, their journey, and the hands that cultivated them.',
  },
  3: {
    visual: 'inspection',
    points: [
      { label: 'Invoice & PO Alignment', desc: 'Purchase order verification against delivery' },
      { label: 'Organic Certificate', desc: 'Validity and authenticity confirmed' },
      { label: 'Certificate of Analysis', desc: 'CoA reviewed against specifications' },
      { label: 'Transport Inspection', desc: 'Vehicle cleanliness, chemical residues, and conditions checked' },
    ],
    body: 'When raw materials arrive, nothing is accepted by default. Every delivery goes through the same process — regardless of the supplier or how long we\'ve worked together. If either the vehicle or the documentation is non-compliant, the batch is immediately blocked. No exceptions.',
  },
  4: {
    visual: 'warehouse',
    points: [
      { label: 'Complete Separation', desc: 'Organic and non-organic materials never share space' },
      { label: 'Sealed Environment', desc: 'Walls and doors with no gaps, adequate ventilation' },
      { label: 'Clean Pallets Only', desc: 'Materials stored on clean plastic pallets, never reused bags' },
      { label: 'FIFO Rotation', desc: 'First In, First Out — strict inventory management' },
    ],
    body: 'Storage is part of quality control, not just logistics. Organic raw materials are stored in a warehouse strictly dedicated to organic products. Shipping containers are never used as storage areas. Pallets are kept away from walls and floors with clear aisles for inspection and cleaning.',
  },
  5: {
    visual: 'quarantine',
    points: [
      { label: 'QC HOLD Label', desc: 'Blue label applied to every incoming batch' },
      { label: 'No Use Permitted', desc: 'Material cannot be used during quarantine' },
      { label: 'No Transfer', desc: 'No movement to production until testing is complete' },
      { label: 'No Exceptions', desc: 'Mandatory even for approved or long-term suppliers' },
    ],
    body: 'Quarantine is not a storage step — it is a controlled safety barrier. It ensures that no material can move into production until its identity, purity, and safety are fully verified. Trust does not bypass verification.',
  },
  6: {
    visual: 'sampling',
    points: [
      { label: 'Dedicated Tools', desc: 'Clean, dry sampling tools — one per raw material' },
      { label: 'Multi-Bag Sampling', desc: 'Samples taken from multiple bags to represent the full batch' },
      { label: 'Tagged & Tracked', desc: 'Sampled bags marked with identification tags' },
      { label: 'Full Documentation', desc: 'Material name, batch number, dates, and personnel recorded' },
    ],
    body: 'Sampling is carried out exclusively by our Quality Assurance / Quality Control team. This is not delegated. Samples are taken from multiple bags using dedicated tools to ensure the full batch is represented.',
  },
  7: {
    visual: 'internal-lab',
    points: [
      { label: 'Visual Inspection', desc: 'Color, odor, and appearance verification' },
      { label: 'Botanical Identity', desc: 'Confirmation against reference standards' },
      { label: 'Moisture Content', desc: 'Measured to ensure within specification' },
      { label: 'Particle Size', desc: 'Analysis where applicable for processing suitability' },
    ],
    body: 'The first level of verification happens in-house. These tests verify consistency with documentation and suitability for processing. A batch can be blocked at this stage if any anomaly is detected.',
  },
  8: {
    visual: 'external-lab',
    points: [
      { label: 'Heavy Metals', desc: 'Lead, arsenic, cadmium, mercury screening' },
      { label: 'Microbiological', desc: 'Total plate count, yeast, mold, E. coli, Salmonella' },
      { label: 'Pesticide Residues', desc: 'Screened against organic certification standards' },
      { label: 'Regulatory Compliance', desc: 'All applicable safety and quality parameters' },
    ],
    body: 'We test to find what\'s actually there — not to confirm what we hope. Samples are sent to qualified, independent external laboratories. External testing is mandatory, even if internal results are acceptable. Both levels must pass.',
  },
  9: {
    visual: 'release-reject',
    points: [
      { label: 'If Compliant', desc: 'Green "RELEASED" label applied, dated, signed by QA/QC' },
      { label: 'If Non-Compliant', desc: 'Red "REJECTED" label — returned to supplier or destroyed' },
      { label: 'No Middle Ground', desc: 'One decision per batch, no conditional approvals' },
      { label: 'Normal & Necessary', desc: 'Some batches never make it through. That\'s how it should work.' },
    ],
    body: 'Once all results are received, a single, final decision is made for each batch. There is no middle ground. Rejection is a normal and necessary part of the process.',
  },
  10: {
    visual: 'cleaning',
    points: [
      { label: 'Dry Materials', desc: 'Visual inspection on sorting tables, manual foreign matter removal' },
      { label: 'Fresh Materials', desc: 'Washed 25 kg at a time in RO-purified water, 30-minute cycles' },
      { label: 'Steam Balancing', desc: '25 kg per batch, 30 minutes of controlled steam exposure' },
      { label: 'Rapid Cooling', desc: 'Followed by chilled water to stop thermal effects' },
    ],
    body: 'Every material must be cleaned and prepared before it moves into production. This is where hands-on work begins. Two paths, one standard: dry materials go through sorting, fresh materials through washing.',
  },
  11: {
    visual: 'vacuum-drying',
    points: [
      { label: '200 kg Capacity', desc: 'Vacuum tray dryer for controlled moisture removal' },
      { label: 'Low Temperature', desc: 'Reduced pressure lowers the boiling point of water' },
      { label: 'Continuous Monitoring', desc: 'Temperature, duration, and vacuum pressure tracked throughout' },
      { label: 'Preserves Bioactives', desc: 'Protects heat-sensitive gingerols, shogaols, and other compounds' },
    ],
    body: 'Heat is the enemy of the very compounds we\'re trying to protect. By lowering air pressure, water evaporates at temperatures far below what conventional drying requires. This is slower than conventional drying. That\'s the point.',
  },
  12: {
    visual: 'cutting',
    points: [
      { label: 'Mechanical Cutter', desc: 'Consistent 1–3 cm pieces' },
      { label: 'Uniformity', desc: 'Determines consistency in all downstream steps' },
    ],
    body: 'Dried materials are fed into our mechanical cutter and cut into pieces approximately 1–3 cm in size, creating uniform material suitable for the grinding stages that follow. Uniformity here determines consistency later.',
  },
  13: {
    visual: 'pre-grinding',
    points: [
      { label: 'Pulveriser', desc: '25 kg per batch, 30-minute cycle' },
      { label: 'Impact & Shear', desc: 'Coarse granules created through mechanical force' },
      { label: 'Cleaning Between Batches', desc: '20 minutes of thorough cleaning between each run' },
    ],
    body: 'Cut material is loaded into our pulveriser and reduced to coarse granules over a 30-minute cycle using impact, shear, and friction. This creates the uniform particle size needed for efficient, reproducible extraction or milling downstream.',
  },
  14: {
    visual: 'extraction',
    points: [
      { label: 'Water Only', desc: 'Purified RO water as the only solvent — no chemicals' },
      { label: '4.5 Hours', desc: '25 kg in a 250-litre tank at ~70°C with continuous stirring' },
      { label: 'Vacuum Concentration', desc: '5 hours of controlled heating under vacuum' },
      { label: 'Target Brix 45–55%', desc: 'Precise concentration for optimal potency' },
    ],
    body: 'Not every ingredient goes through extraction. But when it does, this is the most complex stage in our entire process. Active compounds are drawn into water over 4 hours and 30 minutes. No harsh solvents. No chemical shortcuts. Water only.',
  },
  15: {
    visual: 'final-drying',
    points: [
      { label: '25–35 kg Per Batch', desc: 'Concentrated extract back in vacuum tray dryer' },
      { label: '8 Hours Under Vacuum', desc: 'Steam-heated shelves at controlled pressure' },
      { label: '1 Hour Cleaning', desc: 'Full cleaning between every batch' },
    ],
    body: 'The concentrated extract moves back to our vacuum tray dryer for final moisture removal. 8 hours under vacuum with steam-heated shelves at controlled pressure. Rushing this step would compromise everything that came before it.',
  },
  16: {
    visual: 'milling',
    points: [
      { label: 'Multi Mill', desc: 'Up to 100 kg per hour through impact and shear forces' },
      { label: 'Uniform Powder', desc: 'Consistent particle size for accurate blending' },
      { label: '30-Minute Cleaning', desc: 'Between every batch for purity' },
    ],
    body: 'Dried material enters our multi mill, processing up to 100 kg per hour. The result: consistent, uniform powder with the particle size needed for accurate blending and encapsulation. What comes out must be the same — every time.',
  },
  17: {
    visual: 'sieving',
    points: [
      { label: 'Vibro Sifter', desc: 'Up to 200 kg per hour through 80-mesh screens' },
      { label: 'Oversized Removal', desc: 'Particles that don\'t meet spec are removed' },
      { label: 'Uniformity Check', desc: 'Bulk density confirmed before moving forward' },
    ],
    body: 'Powder passes through our vibro sifter, filtered through 80-mesh screens. Only powder that passes this check moves to blending. This is the last quality gate before ingredients are combined.',
  },
  18: {
    visual: 'blending',
    points: [
      { label: 'Ribbon Blender', desc: '20-litre capacity, controlled temperature and humidity' },
      { label: 'Full Hour Cycle', desc: 'Runs until complete uniformity is confirmed' },
      { label: 'Zero Tolerance', desc: 'Non-uniform blends are rejected. No exceptions.' },
    ],
    body: 'Ingredients are precisely weighed, then combined in our ribbon blender under controlled conditions. If the blend isn\'t right, nothing that follows will be either.',
  },
  19: {
    visual: 'encapsulation',
    points: [
      { label: 'Vacuum Separation', desc: 'Opens each capsule shell precisely' },
      { label: 'Continuous Weight Monitoring', desc: 'Every capsule weighed in real-time' },
      { label: 'Real-Time Adjustments', desc: 'Automatic corrections during filling' },
    ],
    body: 'Capsules are filled using our capsule filling machine. Vacuum separation opens each shell, precise amounts of powder are deposited, and capsules are reclosed and locked. Every capsule is weighed. Every variation is tracked. Consistency is not a goal — it\'s a requirement.',
  },
  20: {
    visual: 'counting',
    points: [
      { label: 'High-Accuracy Sensors', desc: 'Count each capsule automatically' },
      { label: 'No Manual Handling', desc: 'Capsules transfer directly into bottles' },
      { label: 'Auto-Rejection', desc: 'Incorrect counts automatically rejected' },
    ],
    body: 'No human hand touches the capsules at this stage. High-accuracy sensors count each capsule and transfer them directly into bottles. If the count isn\'t exact, the bottle doesn\'t move forward.',
  },
  21: {
    visual: 'sealing',
    points: [
      { label: 'Controlled Torque', desc: 'Caps placed with precise, consistent force' },
      { label: 'Induction Sealing', desc: 'Airtight closure where applicable' },
      { label: 'Verification', desc: 'Torque and seal integrity checked on every bottle' },
    ],
    body: 'Bottles move through our automatic capping and sealing machine. What\'s inside is protected. What\'s outside stays out.',
  },
  22: {
    visual: 'traceability',
    points: [
      { label: 'Unique Batch Number', desc: 'Every batch carries full identification' },
      { label: 'Complete Records', desc: 'Processing parameters and quality control documentation' },
      { label: 'Farm to Capsule', desc: 'Unbroken chain of documentation' },
    ],
    body: '22 documented process steps. Two independent testing levels. 100% batch traceability. This is what happens between the soil and your bottle.',
  },
};

/* ══════════════════════════════════════════════════════════
   MOTION TYPES per step
══════════════════════════════════════════════════════════ */
const STEP_MOTIONS = {
  1: 'grow', 2: 'shake', 3: 'scan', 4: 'bounce', 5: 'pulse',
  6: 'drip', 7: 'magnify', 8: 'pulse', 9: 'stamp', 10: 'shake',
  11: 'float', 12: 'cut', 13: 'shake', 14: 'drip', 15: 'float',
  16: 'shake', 17: 'bounce', 18: 'spin', 19: 'bounce', 20: 'pulse',
  21: 'stamp', 22: 'grow',
};

/* ══════════════════════════════════════════════════════════
   STEP DETAIL — inline, scroll-locked, wheel swaps steps
══════════════════════════════════════════════════════════ */
function StepDetail({ stepNum, onChangeStep, onClose }) {
  const step = STEPS[stepNum - 1];
  const detail = STEP_DETAILS[stepNum];
  const StepIcon = step.icon;
  const color = PHASE_COLORS[step.phase];
  const motion = STEP_MOTIONS[stepNum] || 'pulse';
  const phaseLabel = step.phase === 'origin' ? 'Origin' :
    step.phase === 'intake' ? 'Intake & Storage' :
    step.phase === 'testing' ? 'Testing' :
    step.phase === 'processing' ? 'Processing' : 'Finishing';

  const motionStyle = {
    grow: 'detailPulse 2s ease-in-out infinite',
    shake: 'detailShake 1.5s ease-in-out infinite',
    scan: 'detailSlide 2s ease-in-out infinite',
    bounce: 'detailBounce 1.5s ease-in-out infinite',
    pulse: 'detailPulse 1.2s ease-in-out infinite',
    drip: 'detailDrip 1.5s ease-in-out infinite',
    magnify: 'detailPulse 2.5s ease-in-out infinite',
    stamp: 'detailStamp 0.8s ease-in-out infinite',
    float: 'detailFloat 2s ease-in-out infinite',
    cut: 'detailShake 0.6s ease-in-out infinite',
    spin: 'detailSpin 6s linear infinite',
  }[motion] || 'detailPulse 1.2s ease-in-out infinite';

  // Stop Lenis + capture wheel/touch/keyboard to advance steps
  useEffect(() => {
    // Pause Lenis smooth scroll
    if (window.lenis) window.lenis.stop();

    let cooldown = false;
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (cooldown) return;
      cooldown = true;

      if (e.deltaY > 0) {
        if (stepNum < 22) onChangeStep(stepNum + 1);
        else onClose();
      } else {
        if (stepNum > 1) onChangeStep(stepNum - 1);
        else onClose();
      }

      setTimeout(() => { cooldown = false; }, 400);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) < 30) return;
      if (cooldown) return;
      cooldown = true;
      touchStartY = e.touches[0].clientY;

      if (deltaY > 0) {
        if (stepNum < 22) onChangeStep(stepNum + 1);
        else onClose();
      } else {
        if (stepNum > 1) onChangeStep(stepNum - 1);
        else onClose();
      }
      setTimeout(() => { cooldown = false; }, 400);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (stepNum < 22) onChangeStep(stepNum + 1);
        else onClose();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (stepNum > 1) onChangeStep(stepNum - 1);
        else onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Resume Lenis
      if (window.lenis) window.lenis.start();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stepNum, onChangeStep, onClose]);

  if (!detail) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <style>{`
        @keyframes detailPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes detailShake { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(4deg)} 75%{transform:rotate(-4deg)} }
        @keyframes detailSlide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(12px)} }
        @keyframes detailBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes detailDrip { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes detailStamp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes detailFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.04)} }
        @keyframes detailSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>

      {/* Top bar */}
      <div className="border-b border-gray-100 sticky top-0 z-30 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color }}>{phaseLabel}</span>
            <span className="text-gray-300 mx-1">·</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Step {stepNum} / 22</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-0.5 mr-2">
              {STEPS.map((s) => (
                <button
                  key={s.num}
                  onClick={() => onChangeStep(s.num)}
                  className={`rounded-full transition-all ${s.num === stepNum ? 'w-5 h-2.5' : 'w-2 h-2 opacity-30 hover:opacity-60'}`}
                  style={{ backgroundColor: PHASE_COLORS[s.phase] }}
                />
              ))}
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gray-500 hover:text-[#1E2A3A] bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-colors"
            >
              <X size={12} /> Back to Map
            </button>
          </div>
        </div>
      </div>

      {/* Content — visual left, description right */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">

          {/* LEFT — Animated visual */}
          <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: `${color}06`, border: `1px solid ${color}12` }}>
            <div className="aspect-[4/3] flex flex-col items-center justify-center p-6 md:p-10 relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[75%] h-[75%] rounded-full border border-dashed opacity-[0.06]" style={{ borderColor: color }} />
              </div>
              <div className="mb-6">
                <div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}15`, animation: motionStyle }}
                >
                  <StepIcon size={48} style={{ color }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-md">
                {detail.points.map((pt, i) => (
                  <div key={i} className="bg-white/90 rounded-lg p-2.5 md:p-3 shadow-sm border border-gray-100">
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color }}>{pt.label}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-500 leading-snug">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Text */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] font-bold mb-2" style={{ color: `${color}90` }}>Step {stepNum}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1E2A3A] mb-4 leading-[1.1]">
              {step.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 italic mb-6 leading-relaxed">
              {step.short}
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              {detail.body}
            </p>
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">What Happens</h4>
              {detail.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ backgroundColor: color }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-base font-medium text-[#1E2A3A]">{pt.label}</p>
                    <p className="text-sm text-gray-500">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows + scroll hint */}
      <div className="pb-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { if (stepNum > 1) onChangeStep(stepNum - 1); else onClose(); }}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#1E2A3A] hover:border-gray-400 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[10px] uppercase tracking-wider text-gray-400">
            {stepNum < 22 ? `Scroll for Step ${stepNum + 1}` : 'Scroll to finish'}
          </span>
          <button
            onClick={() => { if (stepNum < 22) onChangeStep(stepNum + 1); else onClose(); }}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#1E2A3A] hover:border-gray-400 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <ChevronRight size={14} className="rotate-90 animate-bounce text-gray-300" />
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
══════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const num = parseInt(value) || 0;
    const isPercent = value.includes('%');

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: num,
          duration,
          ease: 'power2.out',
          onUpdate: function () {
            setDisplay(Math.round(this.targets()[0].val) + (isPercent ? '%' : '') + suffix);
          },
        });
      },
    });
    return () => trigger.kill();
  }, [value, suffix, duration]);

  return <span ref={ref}>{display}</span>;
}

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export default function OurProcess() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [activeStep, setActiveStep] = useState(null);

  const topRow = STEPS.slice(0, 11);
  const bottomRow = STEPS.slice(11);

  const selectAndScroll = (step) => {
    setActiveStep(step.num);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.process-hero-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.process-hero-title', { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }, '-=0.3')
        .fromTo('.process-hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo('.process-hero-stat', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 }, '-=0.3');

      /* Top row — stagger in from left */
      gsap.fromTo('.step-node-top',
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.step-grid-top', start: 'top 85%' },
        }
      );

      /* Bottom row — stagger in from right */
      gsap.fromTo('.step-node-bottom',
        { y: -40, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.step-grid-bottom', start: 'top 85%' },
        }
      );

      /* Connecting line animation */
      gsap.fromTo('.connect-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.step-grid-top', start: 'top 80%' },
        }
      );

      /* Risk cards */
      document.querySelectorAll('.risk-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.5, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });

      gsap.fromTo('.standards-block',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.standards-block', start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);


  return (
    <div className="bg-[#FFFBF5] min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-[#1E2A3A] text-white py-28 md:py-36 px-4 overflow-hidden">
        <video
          src="/videos/farm-documentary.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="process-hero-label text-[10px] uppercase tracking-[0.3em] text-[#E8A598] font-semibold mb-6 block">
            Our Process
          </span>
          <div className="overflow-hidden">
            <h1 className="process-hero-title text-4xl md:text-6xl lg:text-7xl mb-6">
              <span className="font-light">From Farm </span>
              <span className="font-serif italic">to Capsule</span>
            </h1>
          </div>
          <p className="process-hero-sub text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-12">
            22 documented steps. Two independent testing levels. 100% batch traceability. Click any step to explore.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { num: '22', label: 'Process Steps' },
              { num: '2', label: 'Testing Levels' },
              { num: '100%', label: 'Batch Traceability' },
            ].map((s, i) => (
              <div key={i} className="process-hero-stat text-center">
                <span className="text-4xl md:text-5xl font-light text-white block mb-1">
                  <AnimatedCounter value={s.num} duration={2 + i * 0.3} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="process-hero-sub mt-14">
            <div className="w-5 h-8 rounded-full border border-white/20 mx-auto flex justify-center pt-1.5">
              <div className="w-0.5 h-2 bg-white/40 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          22 STEPS — TWO ROWS OF 11
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={gridRef} className="py-20 md:py-32 scroll-mt-4">
        <div className="mx-auto px-4 md:px-8 max-w-[1400px]">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">The Full Journey</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#1E2A3A]">
              22 Steps. <span className="font-serif italic">Zero Shortcuts.</span>
            </h2>
          </div>

          {/* TOP ROW — Steps 1–11 */}
          <div className="step-grid-top relative mb-6 pb-4">
            {/* Connecting line — below text */}
            <div className="connect-line absolute bottom-0 left-[4%] right-[4%] h-[2px] bg-gradient-to-r from-[#6B8E23] via-[#5B8DB8] to-[#D4A0C0] origin-left z-0 hidden md:block" />

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-3 md:gap-3 relative z-10">
              {topRow.map((step) => {
                const Icon = step.icon;
                const color = PHASE_COLORS[step.phase];
                const isSelected = false;
                return (
                  <button
                    key={step.num}
                    onClick={() => selectAndScroll(step)}
                    className={`step-node-top group flex flex-col items-center gap-2.5 py-5 px-2 rounded-2xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-white shadow-lg scale-105 border border-gray-200'
                        : 'hover:bg-white/80 hover:shadow-md hover:-translate-y-1'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                        isSelected ? 'border-white shadow-md scale-110' : 'border-transparent group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: isSelected ? color : `${color}18` }}
                    >
                      <Icon size={22} style={{ color: isSelected ? '#fff' : color }} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#1E2A3A]' : 'text-gray-400'}`}>
                      {step.num}
                    </span>
                    <span className={`text-[10px] leading-tight text-center line-clamp-2 max-w-[100px] hidden md:block ${isSelected ? 'text-[#1E2A3A] font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Arrow connector between rows */}
          <div className="flex justify-center my-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gray-200" />
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-gray-200 flex items-center justify-center">
                <ChevronRight size={14} className="text-gray-400 rotate-90" />
              </div>
              <div className="w-12 h-px bg-gray-200" />
            </div>
          </div>

          {/* BOTTOM ROW — Steps 12–22 */}
          <div className="step-grid-bottom relative mt-6 pb-4">
            {/* Connecting line — below text */}
            <div className="connect-line absolute bottom-0 left-[4%] right-[4%] h-[2px] bg-gradient-to-r from-[#D4A0C0] via-[#D4A0C0] to-[#1E2A3A] origin-left z-0 hidden md:block" />

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-3 md:gap-3 relative z-10">
              {bottomRow.map((step) => {
                const Icon = step.icon;
                const color = PHASE_COLORS[step.phase];
                const isSelected = false;
                return (
                  <button
                    key={step.num}
                    onClick={() => selectAndScroll(step)}
                    className={`step-node-bottom group flex flex-col items-center gap-2.5 py-5 px-2 rounded-2xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-white shadow-lg scale-105 border border-gray-200'
                        : 'hover:bg-white/80 hover:shadow-md hover:-translate-y-1'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                        isSelected ? 'border-white shadow-md scale-110' : 'border-transparent group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: isSelected ? color : `${color}18` }}
                    >
                      <Icon size={22} style={{ color: isSelected ? '#fff' : color }} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#1E2A3A]' : 'text-gray-400'}`}>
                      {step.num}
                    </span>
                    <span className={`text-[10px] leading-tight text-center line-clamp-2 max-w-[100px] hidden md:block ${isSelected ? 'text-[#1E2A3A] font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {[
              { key: 'origin', label: 'Origin' },
              { key: 'intake', label: 'Intake & Storage' },
              { key: 'testing', label: 'Testing' },
              { key: 'processing', label: 'Processing' },
              { key: 'finishing', label: 'Finishing' },
            ].map((p) => (
              <div key={p.key} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PHASE_COLORS[p.key] }} />
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP DETAIL — Single section, scroll swaps content
          ═══════════════════════════════════════════════════════════════ */}
      {activeStep && <StepDetail
        stepNum={activeStep}
        onChangeStep={(num) => setActiveStep(num)}
        onClose={() => setActiveStep(null)}
      />}

      {/* ═══════════════════════════════════════════════════════════════
          PROCESS VIDEO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E2A3A] py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E8A598] font-semibold mb-3">Watch the Process</p>
            <h2 className="text-2xl md:text-3xl font-light text-white">From Root to Capsule</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-black/30">
              <video
                src="/videos/capsule-firefly.mp4"
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INVISIBLE RISK + STANDARDS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">

          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">Verification & Risk Control</p>
            <h2 className="text-2xl md:text-4xl font-light text-[#1E2A3A] mb-4">
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
                <div key={i} className="risk-card bg-[#FAF8F5] rounded-xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <IconComp size={20} className="text-[#1E2A3A] mb-3" />
                  <h3 className="text-sm font-medium text-[#1E2A3A] mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          {/* Standards */}
          <div className="standards-block bg-[#1E2A3A] rounded-2xl p-8 md:p-12 text-white mb-14">
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
                <div key={i} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/15 transition-colors duration-300">
                  <Award size={20} className="mx-auto mb-2 text-[#E8A598]" />
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{cert.label}</p>
                  <p className="text-[10px] text-gray-400">{cert.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-light text-[#1E2A3A] mb-4">
              This Is Our Process — And We Don't <span className="font-serif italic">Simplify It</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              We don't simplify this for marketing. We don't gloss over the complexity. This is what actually happens — from the soil to your bottle.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium">
              When research shows we should do something differently, we'll change. Until then, our process follows evidence, verification, and a deep respect for how plants naturally grow.
            </p>

            <p className="text-sm text-gray-500 mb-6">You've seen the process. Now meet the products it creates.</p>

            <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-full px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group">
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
