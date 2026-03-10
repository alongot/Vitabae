import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Leaf, ShieldCheck } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'Which best describes your current life stage?',
    options: [
      { text: 'Reproductive age (18–35)', value: 'reproductive', description: 'Everyday wellness & cycle support' },
      { text: 'Preparing for pregnancy', value: 'trying-to-conceive', description: 'Optimizing health before conception' },
      { text: 'Currently pregnant', value: 'pregnancy', description: 'Supporting you and your baby' },
      { text: 'Post-pregnancy / Lactation', value: 'postpartum', description: 'Recovery and new motherhood' },
      { text: 'Perimenopause', value: 'perimenopause', description: 'Navigating the transition' },
      { text: 'Menopause', value: 'menopause', description: 'Hormonal balance & vitality' },
      { text: 'Post-menopause', value: 'postmenopause', description: 'Long-term wellness support' },
    ],
  },
  {
    id: 2,
    question: "What's your primary wellness goal?",
    options: [
      { text: 'Energy & vitality', value: 'energy' },
      { text: 'Stress & mood balance', value: 'stress' },
      { text: 'Digestive comfort', value: 'digestive' },
      { text: 'Hormonal harmony', value: 'hormonal' },
      { text: 'Sleep support', value: 'sleep' },
      { text: 'Skin & hair vitality', value: 'beauty' },
    ],
  },
  {
    id: 3,
    question: 'How would you describe your stress levels?',
    options: [
      { text: 'High — stressed most days', value: 'high' },
      { text: 'Moderate — occasional stress', value: 'moderate' },
      { text: 'Low — I manage stress well', value: 'low' },
    ],
  },
  {
    id: 4,
    question: 'Do you experience occasional digestive discomfort?',
    options: [
      { text: 'Yes, frequently', value: 'frequent' },
      { text: 'Sometimes', value: 'sometimes' },
      { text: 'Rarely or never', value: 'rarely' },
    ],
  },
];

const resultMap = {
  'reproductive': { stage: 'Reproductive Age', path: '/Collection?stage=reproductive', ingredients: ['Ashwagandha', 'Shatavari', 'Amla'], message: 'Support your energy, cycle balance, and daily vitality.' },
  'trying-to-conceive': { stage: 'Pre-Conception', path: '/Collection?stage=preconception', ingredients: ['Shatavari', 'Ashwagandha', 'Moringa'], message: 'Foundational support as you prepare for pregnancy.' },
  'pregnancy': { stage: 'Pregnancy', path: '/Collection?stage=pregnancy', ingredients: ['Ginger', 'Moringa', 'Amla'], message: 'Gentle, pregnancy-appropriate botanical support.' },
  'postpartum': { stage: 'Post-Pregnancy', path: '/Collection?stage=postpartum', ingredients: ['Shatavari', 'Moringa', 'Ashwagandha'], message: 'Recovery, replenishment, and resilience for the fourth trimester.' },
  'perimenopause': { stage: 'Perimenopause', path: '/Collection?stage=perimenopause', ingredients: ['Ashwagandha', 'Shatavari', 'Amla'], message: 'Navigate the transition with adaptogenic support.' },
  'menopause': { stage: 'Menopause', path: '/Collection?stage=menopause', ingredients: ['Ashwagandha', 'Shatavari', 'Amla'], message: 'Hormonal balance and vitality during menopause.' },
  'postmenopause': { stage: 'Post-Menopause', path: '/Collection?stage=postmenopause', ingredients: ['Ashwagandha', 'Moringa', 'Amla'], message: 'Long-term wellness and sustained vitality.' },
};

export default function PersonalizationResults() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const isComplete = step > quizQuestions.length;

  if (!isComplete) {
    const q = quizQuestions[step - 1];
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full">
          {/* Progress */}
          <div className="w-full h-1 bg-gray-200 rounded-full mb-12">
            <div
              className="h-full bg-[#1E2A3A] rounded-full transition-all duration-500"
              style={{ width: `${(step / quizQuestions.length) * 100}%` }}
            />
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3 text-center">
            Question {step} of {quizQuestions.length}
          </p>
          <h2 className="text-2xl md:text-3xl text-[#1E2A3A] text-center mb-10 font-light">
            {q.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  const newAnswers = { ...answers, [q.id]: opt.value };
                  setAnswers(newAnswers);
                  setTimeout(() => setStep(step + 1), 300);
                }}
                className={`text-left p-5 border rounded-xl transition-all duration-300 hover:border-[#1E2A3A] hover:shadow-md ${
                  answers[q.id] === opt.value
                    ? 'border-[#1E2A3A] bg-[#1E2A3A]/5 shadow-md'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-sm font-medium text-[#1E2A3A] block">{opt.text}</span>
                {opt.description && (
                  <span className="text-xs text-gray-400 mt-1 block">{opt.description}</span>
                )}
              </button>
            ))}
          </div>

          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 text-xs text-gray-400 hover:text-[#1E2A3A] uppercase tracking-wider transition-colors mx-auto block"
            >
              &larr; Back
            </button>
          )}
        </div>
      </div>
    );
  }

  // Results
  const lifeStageAnswer = answers[1];
  const result = resultMap[lifeStageAnswer] || resultMap['reproductive'];

  return (
    <div className="min-h-screen bg-[#FFFBF5] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-[#C8D6B9] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={28} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl text-[#1E2A3A] mb-3">
            <span className="font-light">Your stage: </span>
            <span className="font-serif italic">{result.stage}</span>
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg mx-auto">
            {result.message}
          </p>
        </div>

        {/* Recommended ingredients */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {result.ingredients.map((ing) => (
            <div key={ing} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-square bg-[#EBEAE6] p-6">
                <img src="/images/ilona-isha.jpg" alt={ing} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#1E2A3A] mb-1">{ing}</h3>
                <p className="text-xs text-gray-500 mb-3">Single-ingredient formula</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Leaf size={10} /> Organic</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={10} /> Lab Tested</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border border-gray-100 rounded-xl p-8 mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Your Answers</h3>
          <div className="space-y-3">
            {quizQuestions.map((q) => {
              const selected = q.options.find(o => o.value === answers[q.id]);
              return (
                <div key={q.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                  <span className="text-gray-500">{q.question}</span>
                  <span className="font-medium text-[#1E2A3A]">{selected?.text || '—'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white rounded-none px-10 py-6 text-[11px] uppercase tracking-[0.2em] font-medium group">
            <Link to={result.path}>
              View {result.stage} Collection
              <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => { setStep(1); setAnswers({}); }}
            className="rounded-none px-8 py-6 text-[11px] uppercase tracking-[0.2em] border-gray-300 text-gray-500 hover:text-[#1E2A3A]"
          >
            Retake Quiz
          </Button>
        </div>

        <p className="text-[10px] text-gray-400 mt-8 italic text-center max-w-md mx-auto">
          These suggestions are for educational purposes only and are not intended as medical advice.
          Consult your healthcare provider before starting any supplement.
        </p>
      </div>
    </div>
  );
}
