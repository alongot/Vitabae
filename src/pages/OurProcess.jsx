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
  { num: 1,  title: 'Understanding the Ingredient', icon: Sprout, phase: 'origin', phaseLabel: 'Sourcing', short: 'We study each plant individually — its ideal soil, climate, and growing conditions — before sourcing begins.', bullets: ['Botanical research', 'Efficacy profiling', 'Origin mapping'], img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&q=80' },
  { num: 2,  title: 'Finding Farms That Share Our Standards', icon: Handshake, phase: 'origin', short: 'We work directly with certified organic farmers in India, building long-term relationships based on trust and shared values.', bullets: ['Organic certification', 'On-site farm audits', 'Ethical sourcing'], img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80' },
  { num: 3,  title: 'Receipt & Inspection', icon: ClipboardCheck, phase: 'intake', short: 'Every delivery is checked on arrival — documents, certifications, and transport conditions — before anything is unloaded.', bullets: ['Document check', 'Visual condition', 'Transport form'], img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80' },
  { num: 4,  title: 'Storing What We\'ve Sourced', icon: Warehouse, phase: 'intake', short: 'Organic materials are stored in a dedicated warehouse with strict separation, clean pallets, and FIFO rotation.', bullets: ['Climate-controlled', 'Spaced from walls', 'Clean pallets'], img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=300&q=80' },
  { num: 5,  title: 'Mandatory Quarantine', icon: Lock, phase: 'intake', short: 'Every batch is held under a blue "QC HOLD" label. No material enters production until all testing is complete.', bullets: ['QC hold section', 'No access until cleared', 'Isolation labelled'], img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&q=80' },
  { num: 6,  title: 'Raw Material Sampling', icon: FlaskConical, phase: 'testing', short: 'Our QA/QC team takes samples from multiple bags using dedicated tools. Every detail is logged.', bullets: ['Batch sampling', 'Moisture & size', 'Sent to lab'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&q=80' },
  { num: 7,  title: 'Internal Quality Testing', icon: Microscope, phase: 'testing', phaseLabel: 'Quality', short: 'Visual inspection, botanical identity, moisture content, and particle size are checked in-house first.', bullets: ['Botanical ID', 'Moisture testing', 'Particle analysis'], img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&q=80' },
  { num: 8,  title: 'External Laboratory Testing', icon: TestTubes, phase: 'testing', short: 'Independent labs test for heavy metals, microbiologicals, pesticide residues, and regulatory compliance.', bullets: ['Heavy metals', 'Microbial testing', 'Pesticide screening'], img: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=300&q=80' },
  { num: 9,  title: 'Released or Rejected', icon: CheckCircle2, phase: 'testing', short: 'One final decision per batch. Compliant batches are released. Non-compliant batches are returned or destroyed.', bullets: ['Pass/fail decision', 'Certificate issued', 'Failed batches returned'], img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80' },
  { num: 10, title: 'Cleaning & Material Preparation', icon: Droplets, phase: 'processing', short: 'Every material must be cleaned and prepared before it moves into production. This is where hands-on work begins.', bullets: ['Debris removal', 'Foreign matter check', 'Pre-process sort'], img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&q=80' },
  { num: 11, title: 'Primary Drying', icon: Thermometer, phase: 'processing', short: 'Materials enter our vacuum tray dryer, where moisture is removed at low temperatures to protect heat-sensitive compounds.', bullets: ['Low-temp air drying', 'Moisture monitored', 'Tray-dried evenly'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80' },
  { num: 12, title: 'Size Reduction', icon: Scissors, phase: 'processing', phaseLabel: 'Processing', short: 'Dried materials are cut into uniform 1–3 cm pieces, preparing them for grinding.', bullets: ['Coarse cutting', 'Consistent particle form', 'Preps for grinding'], img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&q=80' },
  { num: 13, title: 'Pre-Grinding', icon: CogIcon, phase: 'processing', short: 'Cut material is reduced to coarse granules, creating uniform particle size for efficient processing.', bullets: ['Hammer mill stage', 'Coarse powder output', 'Heat monitored'], img: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=300&q=80' },
  { num: 14, title: 'Extraction & Concentration', icon: Beaker, phase: 'processing', short: 'Where applicable, active compounds are drawn out using only purified water, then concentrated under vacuum.', bullets: ['Water-based extraction', 'Vacuum concentration', 'Bioactives preserved'], img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&q=80' },
  { num: 15, title: 'Final Drying', icon: Wind, phase: 'processing', short: 'Concentrated extract undergoes slow, precise vacuum drying to reach its final dry specification.', bullets: ['Vacuum dried', 'Residual moisture removed', 'Shelf stability ensured'], img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&q=80' },
  { num: 16, title: 'Fine Milling', icon: Blend, phase: 'processing', short: 'Dried material is ground into consistent, uniform powder ready for blending.', bullets: ['80-mesh target', 'Uniform particle size', 'Max bioavailability'], img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&q=80' },
  { num: 17, title: 'Sieving', icon: Layers, phase: 'processing', short: 'Powder is filtered through 80-mesh screens. Oversized particles are removed. Uniformity is confirmed.', bullets: ['Grades particles', '80-mesh standard', 'Rejects foreign matter'], img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=300&q=80' },
  { num: 18, title: 'Blending', icon: Blend, phase: 'finishing', short: 'Ingredients are precisely weighed and blended under controlled conditions until fully uniform.', bullets: ['Precise ratio mixing', 'FIFO batch rotation', 'Homogeneity verified'], img: 'https://images.unsplash.com/photo-1563804447971-6e113ab80713?w=300&q=80' },
  { num: 19, title: 'Encapsulation', icon: Pill, phase: 'finishing', phaseLabel: 'Packaging', short: 'Powder is deposited into capsules with continuous weight monitoring and real-time adjustments.', bullets: ['Auto capsule filling', 'Weight checked', 'Clean-room conditions'], img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80' },
  { num: 20, title: 'Counting & Bottle Filling', icon: Hash, phase: 'finishing', short: 'High-accuracy sensors count each capsule into bottles. Incorrect counts are automatically rejected.', bullets: ['Automated counting', 'FIFO rotation', 'Fill qty verified'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80' },
  { num: 21, title: 'Capping & Sealing', icon: Package, phase: 'finishing', short: 'Bottles are capped with controlled torque and sealed. Every seal is verified before moving forward.', bullets: ['Induction seal', 'Tamper-evident', 'Torque verified'], img: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=300&q=80' },
  { num: 22, title: 'Traceability & Batch Release', icon: FileSearch, phase: 'finishing', short: 'Every capsule is fully traceable from farm to finished bottle with complete batch documentation.', bullets: ['Batch record complete', 'Label & barcode', 'Final QC sign-off'], img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80' },
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

  useEffect(() => {
    if (window.lenis) window.lenis.stop();
    let cooldown = false;
    const handleWheel = (e) => {
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      if (e.deltaY > 0) { if (stepNum < 22) onChangeStep(stepNum + 1); else onClose(); }
      else { if (stepNum > 1) onChangeStep(stepNum - 1); }
      setTimeout(() => { cooldown = false; }, 500);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); if (stepNum < 22) onChangeStep(stepNum + 1); else onClose(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); if (stepNum > 1) onChangeStep(stepNum - 1); }
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (window.lenis) window.lenis.start();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stepNum, onChangeStep, onClose]);

  if (!detail) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#f7f4ef]">
      <style>{`
        @keyframes detailPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes detailShake { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(4deg)} 75%{transform:rotate(-4deg)} }
        @keyframes detailSlide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(12px)} }
        @keyframes detailBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes detailDrip { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes detailStamp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes detailFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.04)} }
        @keyframes detailSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes contentSlideIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── Sticky top navigation ── */}
      <div className="shrink-0 bg-white border-b border-gray-100 z-30">
        <div className="px-4 md:px-8 py-3 flex items-center justify-between">
          {/* Step pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 mr-4">
            {STEPS.map((s) => {
              const isActive = s.num === stepNum;
              const sColor = PHASE_COLORS[s.phase];
              return (
                <button
                  key={s.num}
                  onClick={() => onChangeStep(s.num)}
                  className={`shrink-0 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'px-3 py-1 text-white text-[10px] font-semibold'
                      : 'w-2.5 h-2.5 opacity-30 hover:opacity-70 hover:scale-125'
                  }`}
                  style={{ backgroundColor: sColor }}
                  title={s.title}
                >
                  {isActive && s.num}
                </button>
              );
            })}
          </div>
          {/* Close */}
          <button onClick={onClose} className="shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 hover:text-[#1E2A3A] bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-colors">
            <X size={12} /> Close
          </button>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT — Animated Visual */}
        <div className="lg:w-1/2 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${color}08` }}>
          <style>{`
            @keyframes orbitSlow { 0% { transform: rotate(0deg) translateX(120px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
            @keyframes orbitMed { 0% { transform: rotate(0deg) translateX(80px) rotate(0deg); } 100% { transform: rotate(-360deg) translateX(80px) rotate(360deg); } }
            @keyframes particleRise { 0% { transform: translateY(0) scale(1); opacity:0.7; } 100% { transform: translateY(-200px) scale(0); opacity:0; } }
            @keyframes flowDown { 0%,100% { transform: translateY(-20px); opacity:0; } 20% { opacity:0.6; } 80% { opacity:0.6; } 100% { transform: translateY(200px); opacity:0; } }
            @keyframes gearSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes gearSpinRev { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
            @keyframes scaleBreath { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
            @keyframes dashMove { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -40; } }
            @keyframes fillUp { 0% { height: 0%; } 100% { height: 70%; } }
            @keyframes dropFall { 0% { transform: translateY(-30px); opacity:1; } 100% { transform: translateY(60px); opacity:0; } }
            @keyframes capsuleFill { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          `}</style>

          <div className="relative w-full h-full min-h-[300px] lg:min-h-0 flex items-center justify-center" key={stepNum} style={{ animation: 'contentSlideIn 0.5s ease-out' }}>

            {/* Background decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] rounded-full border border-dashed opacity-[0.06]" style={{ borderColor: color }} />
              <div className="absolute w-[45%] h-[45%] rounded-full border opacity-[0.04]" style={{ borderColor: color }} />
            </div>

            {/* Step-specific animations */}
            {/* Origin steps (1-2): Growing plant */}
            {step.phase === 'origin' && (
              <div className="relative flex flex-col items-center">
                {/* Soil */}
                <div className="w-48 h-3 rounded-full bg-[#8B6914]/30 mt-16" />
                {/* Stem growing */}
                <div className="absolute bottom-12 w-1 bg-[#6B8E23]/60 rounded-full" style={{ height: '80px', animation: 'scaleBreath 3s ease-in-out infinite', transformOrigin: 'bottom' }} />
                {/* Leaves */}
                {[0, 1, 2].map(i => (
                  <div key={i} className="absolute rounded-full" style={{
                    width: `${20 + i * 8}px`, height: `${12 + i * 5}px`,
                    backgroundColor: `${color}${40 + i * 15}`,
                    bottom: `${60 + i * 25}px`,
                    left: i % 2 === 0 ? '55%' : 'auto',
                    right: i % 2 !== 0 ? '55%' : 'auto',
                    animation: `detailFloat ${2 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                  }} />
                ))}
                {/* Main icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${color}20`, animation: motionStyle }}>
                    <StepIcon size={40} style={{ color }} />
                  </div>
                </div>
                {/* Particles rising */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="absolute w-2 h-2 rounded-full" style={{
                    backgroundColor: `${color}50`,
                    left: `${25 + Math.random() * 50}%`,
                    bottom: '30%',
                    animation: `particleRise ${2 + Math.random() * 2}s ease-out ${i * 0.4}s infinite`,
                  }} />
                ))}
              </div>
            )}

            {/* Intake steps (3-5): Conveyor/boxes */}
            {step.phase === 'intake' && (
              <div className="relative flex items-center justify-center">
                {/* Conveyor belt */}
                <svg width="280" height="200" viewBox="0 0 280 200" className="absolute">
                  <line x1="20" y1="140" x2="260" y2="140" stroke={color} strokeWidth="2" strokeDasharray="8 4" style={{ animation: 'dashMove 1s linear infinite' }} />
                  {/* Boxes moving */}
                  {[0, 1, 2].map(i => (
                    <rect key={i} x={40 + i * 80} y={115} width="30" height="25" rx="3" fill={`${color}${30 + i * 10}`} stroke={color} strokeWidth="1" style={{ animation: `detailSlide ${2 + i * 0.3}s ease-in-out ${i * 0.5}s infinite` }} />
                  ))}
                </svg>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg z-10" style={{ backgroundColor: `${color}20`, animation: motionStyle }}>
                  <StepIcon size={40} style={{ color }} />
                </div>
              </div>
            )}

            {/* Testing steps (6-9): Lab/microscope */}
            {step.phase === 'testing' && (
              <div className="relative flex items-center justify-center">
                {/* Orbiting test elements */}
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="absolute" style={{
                    animation: `${i % 2 === 0 ? 'orbitSlow' : 'orbitMed'} ${6 + i}s linear infinite`,
                    animationDelay: `${i * 1.5}s`,
                  }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm" style={{ backgroundColor: `${color}${60 + i * 10}` }}>
                      {['✓', '?', '✓', '!'][i]}
                    </div>
                  </div>
                ))}
                {/* Scanning line */}
                <div className="absolute w-40 h-px" style={{ backgroundColor: `${color}40`, animation: 'detailSlide 2s ease-in-out infinite' }} />
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg z-10" style={{ backgroundColor: `${color}20`, animation: 'scaleBreath 2s ease-in-out infinite' }}>
                  <StepIcon size={44} style={{ color }} />
                </div>
              </div>
            )}

            {/* Processing steps (10-17): Gears/grinding */}
            {step.phase === 'processing' && (
              <div className="relative flex items-center justify-center">
                {/* Spinning gears */}
                <svg width="260" height="260" viewBox="0 0 260 260" className="absolute opacity-20">
                  <circle cx="90" cy="100" r="45" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 3" style={{ animation: 'gearSpin 8s linear infinite', transformOrigin: '90px 100px' }} />
                  <circle cx="170" cy="130" r="35" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 3" style={{ animation: 'gearSpinRev 6s linear infinite', transformOrigin: '170px 130px' }} />
                  <circle cx="130" cy="180" r="25" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" style={{ animation: 'gearSpin 5s linear infinite', transformOrigin: '130px 180px' }} />
                </svg>
                {/* Falling particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute rounded-full" style={{
                    width: `${3 + Math.random() * 4}px`,
                    height: `${3 + Math.random() * 4}px`,
                    backgroundColor: `${color}${30 + Math.floor(Math.random() * 30)}`,
                    left: `${30 + Math.random() * 40}%`,
                    top: '20%',
                    animation: `flowDown ${2 + Math.random() * 2}s ease-in ${i * 0.3}s infinite`,
                  }} />
                ))}
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg z-10" style={{ backgroundColor: `${color}20`, animation: motionStyle }}>
                  <StepIcon size={44} style={{ color }} />
                </div>
              </div>
            )}

            {/* Finishing steps (18-22): Capsule/packaging */}
            {step.phase === 'finishing' && (
              <div className="relative flex items-center justify-center">
                {/* Capsule shapes floating */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="absolute" style={{
                    left: `${20 + i * 14}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    animation: `capsuleFill ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                  }}>
                    <div className="w-4 h-8 rounded-full border" style={{ borderColor: `${color}40`, backgroundColor: `${color}10` }} />
                  </div>
                ))}
                {/* Assembly line dots */}
                <div className="absolute bottom-[35%] left-[15%] right-[15%] flex items-center justify-between">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{
                      backgroundColor: `${color}${20 + i * 8}`,
                      animation: `detailBounce 1s ease-in-out ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg z-10" style={{ backgroundColor: `${color}20`, animation: motionStyle }}>
                  <StepIcon size={44} style={{ color }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Text content */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 overflow-y-auto bg-white" key={`text-${stepNum}`} style={{ animation: 'contentSlideIn 0.5s ease-out 0.1s both' }}>
          {/* Phase + step number */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color }}>
              {step.phase === 'origin' ? 'Origin' : step.phase === 'intake' ? 'Intake' : step.phase === 'testing' ? 'Testing' : step.phase === 'processing' ? 'Processing' : 'Finishing'}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Step {stepNum}</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1E2A3A] mb-4 leading-[1.08]">
            {step.title}
          </h2>

          {/* Short description */}
          <p className="text-lg text-gray-400 font-light italic mb-6 leading-relaxed">
            {step.short}
          </p>

          {/* Full body */}
          <p className="text-[15px] text-gray-600 leading-[1.8] mb-8">
            {detail.body}
          </p>

          {/* What happens list */}
          <div className="space-y-3 mb-8">
            {detail.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white mt-0.5" style={{ backgroundColor: color }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1E2A3A]">{pt.label}</p>
                  <p className="text-[13px] text-gray-500">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button
              onClick={() => { if (stepNum > 1) onChangeStep(stepNum - 1); }}
              disabled={stepNum <= 1}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-400 hover:text-[#1E2A3A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Previous
            </button>
            <span className="text-[10px] text-gray-300 uppercase tracking-wider">{stepNum} / 22</span>
            <button
              onClick={() => { if (stepNum < 22) onChangeStep(stepNum + 1); else onClose(); }}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-400 hover:text-[#1E2A3A] transition-colors group"
            >
              {stepNum < 22 ? 'Next' : 'Finish'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
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
      <section ref={gridRef} className="py-16 md:py-24 bg-[#f7f4ef] scroll-mt-4">
        <div className="mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9b8fcc] font-medium mb-3">The Full Journey</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1714]">
              22 Steps. <em className="italic font-normal">Zero Shortcuts.</em>
            </h2>
          </div>

          {/* ROW 1 — Steps 1–11 */}
          <div className="step-grid-top flex items-stretch gap-0 overflow-x-auto no-scrollbar pb-4">
            {topRow.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div
                  className="step-node-top flex-shrink-0 flex flex-col bg-white border border-[#e8e2da] rounded-lg relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:z-10 group"
                  style={{ minWidth: '120px', flex: '1 1 0' }}
                  onClick={() => selectAndScroll(step)}
                >
                  {/* Image or gradient */}
                  <div className="w-full h-[110px] overflow-hidden relative rounded-t-lg">
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PHASE_COLORS[step.phase]}30 0%, ${PHASE_COLORS[step.phase]}60 100%)` }}>
                      <step.icon size={28} className="text-white/50" />
                    </div>
                    <img src={step.img} alt={step.title} className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  {/* Number badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-[30px] h-[30px] rounded-full bg-[#2c2622] text-[#f7f4ef] text-[11px] font-semibold flex items-center justify-center border-[3px] border-[#f7f4ef] z-10" style={{ top: '90px' }}>
                    {step.num}
                  </div>
                  {/* Body */}
                  <div className="px-2.5 pt-5 pb-3 flex-1 flex flex-col gap-1.5">
                    {step.phaseLabel && (
                      <span className="text-[8px] font-semibold tracking-[0.18em] uppercase text-[#9b8fcc]">{step.phaseLabel}</span>
                    )}
                    <p className="text-[10.5px] font-semibold text-[#1a1714] leading-[1.35]">{step.title}</p>
                    <ul className="flex flex-col gap-1 mt-0.5">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="text-[9px] font-light text-[#6a6460] leading-[1.5] pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-[#9b8fcc] before:text-[9px]">{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {idx < topRow.length - 1 && (
                  <div className="flex-shrink-0 w-[22px] flex items-center justify-center text-[#9b8fcc] text-base" style={{ paddingBottom: '48px' }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Row spacer */}
          <div className="my-4" />

          {/* ROW 2 — Steps 12–22 */}
          <div className="step-grid-bottom flex items-stretch gap-0 overflow-x-auto no-scrollbar pb-4">
            {bottomRow.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div
                  className="step-node-bottom flex-shrink-0 flex flex-col bg-white border border-[#e8e2da] rounded-lg relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:z-10 group"
                  style={{ minWidth: '120px', flex: '1 1 0' }}
                  onClick={() => selectAndScroll(step)}
                >
                  {/* Image or gradient */}
                  <div className="w-full h-[110px] overflow-hidden relative rounded-t-lg">
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PHASE_COLORS[step.phase]}30 0%, ${PHASE_COLORS[step.phase]}60 100%)` }}>
                      <step.icon size={28} className="text-white/50" />
                    </div>
                    <img src={step.img} alt={step.title} className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  {/* Number badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-[30px] h-[30px] rounded-full bg-[#2c2622] text-[#f7f4ef] text-[11px] font-semibold flex items-center justify-center border-[3px] border-[#f7f4ef] z-10" style={{ top: '90px' }}>
                    {step.num}
                  </div>
                  {/* Body */}
                  <div className="px-2.5 pt-5 pb-3 flex-1 flex flex-col gap-1.5">
                    {step.phaseLabel && (
                      <span className="text-[8px] font-semibold tracking-[0.18em] uppercase text-[#9b8fcc]">{step.phaseLabel}</span>
                    )}
                    <p className="text-[10.5px] font-semibold text-[#1a1714] leading-[1.35]">{step.title}</p>
                    <ul className="flex flex-col gap-1 mt-0.5">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="text-[9px] font-light text-[#6a6460] leading-[1.5] pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-[#9b8fcc] before:text-[9px]">{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {idx < bottomRow.length - 1 && (
                  <div className="flex-shrink-0 w-[22px] flex items-center justify-center text-[#9b8fcc] text-base" style={{ paddingBottom: '48px' }}>→</div>
                )}
              </React.Fragment>
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

      {/* Video section removed */}

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
