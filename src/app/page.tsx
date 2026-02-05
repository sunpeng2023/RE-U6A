'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Info, Bug, Search, Activity, 
  Lightbulb, Users, CheckCircle, Sparkles, Box, 
  Globe, Trees, Waves, Microscope, Leaf, Notebook, Users2, Gem, Layers,
  Compass, Sprout, Tent, MessageSquare, ListChecks, Coffee, Map, Volume2
} from 'lucide-react';

interface Slide {
  id: number;
  bg: string;
  layout: string;
  steps: number;
  title?: string;
  subtitle?: string;
  footer?: string;
  header?: string;
  subHeader?: string;
  questions?: (string | { q: string; link?: number; icon?: React.ReactNode })[];
  facts?: { label: string; text: string }[];
  task?: string;
  prompts?: string[];
  icon?: React.ReactNode;
  question?: string;
  answer?: string;
  highlights?: string[];
  vocab?: { word: string; def: string }[];
  vocabList?: { icon: string | React.ReactNode; zh: string; en: string }[];
  wordBank?: string[];
  instruction?: string;
  points?: { title: string; text: string; icon: React.ReactNode }[];
  closing?: string;
  scenarios?: { q: string; keywords: string[]; icon: React.ReactNode; possibleAnswer?: string }[];
  returnTo?: number;
  colorTheme?: 'emerald' | 'amber' | 'blue' | 'indigo' | 'lime' | 'rose' | 'cyan' | 'teal' | 'orange';
  audio?: string;
  fullText?: string;
}

const getThemeColors = (slide: Slide) => {
  const themes = {
    emerald: { primary: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/30', highlight: 'bg-emerald-500/10', glow: 'shadow-emerald-500/40' },
    amber: { primary: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/30', highlight: 'bg-amber-500/10', glow: 'shadow-amber-500/40' },
    blue: { primary: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500/30', highlight: 'bg-blue-500/10', glow: 'shadow-blue-500/40' },
    indigo: { primary: 'text-indigo-400', bg: 'bg-indigo-500', border: 'border-indigo-500/30', highlight: 'bg-indigo-500/10', glow: 'shadow-indigo-500/40' },
    lime: { primary: 'text-lime-400', bg: 'bg-lime-500', border: 'border-lime-500/30', highlight: 'bg-lime-500/10', glow: 'shadow-lime-500/40' },
    rose: { primary: 'text-rose-400', bg: 'bg-rose-500', border: 'border-rose-500/30', highlight: 'bg-rose-500/10', glow: 'shadow-rose-500/40' },
    cyan: { primary: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500/30', highlight: 'bg-cyan-500/10', glow: 'shadow-cyan-500/40' },
    teal: { primary: 'text-teal-400', bg: 'bg-teal-500', border: 'border-teal-500/30', highlight: 'bg-teal-500/10', glow: 'shadow-teal-500/40' },
    orange: { primary: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-500/30', highlight: 'bg-orange-500/10', glow: 'shadow-orange-500/40' }
  };
  return themes[slide.colorTheme || 'emerald'];
};

const targetWords = [
  'organisms', 'insects', 'dweller', 'naturalist', 'cycle', 'break down', 
  'material', 'process', 'nutrients', 'maintain', 'coral reef', 'discover', 
  'gem', 'species', 'region'
];

const slides: Slide[] = [
  {
    id: 1,
    bg: '/images/slide1.png',
    title: 'IN ONE CUBIC FOOT',
    subtitle: 'The Hidden Heart of Life on Earth',
    footer: 'NATURE EXPLORATION // STATUS: ACTIVE',
    layout: 'title',
    steps: 3,
    colorTheme: 'emerald'
  },
  {
    id: 2,
    bg: '/images/slide2.png',
    header: 'THINK & SHARE',
    questions: [
      { q: 'What animals do you see in your garden? Big ones or small ones?', link: 2, icon: <Search size={24} /> },
      { q: 'Do you think tiny bugs are important for our Earth? Why?', link: 3, icon: <Bug size={24} /> }
    ],
    layout: 'questions',
    steps: 3,
    colorTheme: 'blue'
  },
  {
    id: 3,
    bg: '/images/slide3.png',
    header: 'BIG VS. SMALL',
    subHeader: 'FIRST IMPRESSIONS',
    facts: [
      { label: 'VISIBLE GIANTS', text: 'Big animals like birds and dogs are very easy to see.' },
      { label: 'HIDDEN WORLD', text: 'But thousands of tiny bugs live under our feet every day.' },
      { label: 'BOTH MATTER', text: 'Small animals are just as important as the big ones.' }
    ],
    layout: 'history',
    steps: 4,
    returnTo: 1,
    colorTheme: 'amber'
  },
  {
    id: 4,
    bg: '/images/slide4.png',
    header: 'SMALL BUT STRONG',
    subHeader: 'WHY THEY MATTER',
    facts: [
      { label: 'HEART OF LIFE', text: 'Small creatures are the "heart of life" on our planet.' },
      { label: 'ECO-HELPERS', text: 'They help the Earth stay healthy and clean for everyone.' },
      { label: 'BIG JOBS', text: 'Every tiny bug has a very big job to do in nature.' }
    ],
    layout: 'history',
    steps: 4,
    returnTo: 1,
    colorTheme: 'emerald'
  },
  {
    id: 5,
    bg: '/images/slide5.png',
    header: 'LOOK & PREDICT',
    task: 'Look at the title "In One Cubic Foot" and the green cube:',
    prompts: [
      'Why is the team using a small 30cm cube to study nature?',
      'How many different bugs can live in this tiny space?',
      'What happens if we take all the tiny creatures away?'
    ],
    layout: 'predict',
    steps: 3,
    icon: <Box size={48} />,
    colorTheme: 'emerald'
  },
  {
    id: 6,
    bg: '/images/slide1.png',
    layout: 'fullReading',
    steps: 3,
    header: 'ARTICLE READING',
    audio: '/images/one_cubic_foot.wav',
    fullText: `IN ONE CUBIC FOOT. In any environment—forest, mountain, water—you always see the big animals first: birds, mammals, fish. But under your feet, both on land and in the water, there are many smaller organisms: insects, tiny plants, miniature sea creatures. They may seem unimportant, but, in fact, these sea creatures and ground dwellers are "the heart of life on Earth," according to naturalist E. O. Wilson. Without them, our world would be a very different place.

The Cycle of Life. Most organisms on Earth live on the ground or just below it. Here, they are part of an important cycle. When plants and animals die, they fall to the ground. Later, tiny insects and other organisms break down the dead plant and animal material. This process eventually returns nutrients to the soil and gives living plants energy. These plants can then help to maintain a healthy environment for humans and other animals.

Discoveries in a Cube. Despite their importance, scientists know very little about most ground organisms. To learn more, photographer David Littschwager went to different places around the world, including a forest and a coral reef. In each place, he put a green 30-centimeter cube on the ground or in the water. Then he and his team counted and photographed the organisms that lived in or moved through the cube. Often they discovered hundreds of organisms, some only a millimeter in size. "It was like finding little gems," he says.`,
    watermark: 'NATURE',
    colorTheme: 'blue'
  },
  {
    id: 7,
    bg: '/images/slide6.png',
    header: 'UNDER YOUR FEET',
    icon: <Search size={32} />,
    question: 'Why do we usually notice big animals like birds and mammals first?',
    answer: 'We see them first because of their size, but we often ignore smaller organisms like insects living right under our feet.',
    highlights: ['organisms', 'insects'],
    vocab: [
      { word: 'organisms', def: 'Living things such as plants, animals, and bacteria.' },
      { word: 'insects', def: 'Small animals with six legs and usually one or two pairs of wings.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 8,
    bg: '/images/slide7.png',
    header: 'THE NATURALIST VIEW',
    icon: <Notebook size={32} />,
    question: 'Why did naturalist E. O. Wilson call small creatures "the heart of life"?',
    answer: 'Wilson believes that these sea creatures and ground dwellers are essential; without them, the world would be different.',
    highlights: ['naturalist', 'dwellers'],
    vocab: [
      { word: 'naturalist', def: 'A person who studies plants and animals as they live in nature.' },
      { word: 'dweller', def: 'A person or animal that lives in a particular place.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'amber'
  },
  {
    id: 9,
    bg: '/images/slide8.png',
    header: 'FUN FACT #1',
    icon: <Lightbulb size={32} />,
    question: 'Did you know?',
    answer: 'A single cubic foot of healthy soil can contain more living organisms than there are people on the entire Earth!',
    highlights: ['organisms'],
    layout: 'qa',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 10,
    bg: '/images/slide9.png',
    header: 'THE VITAL CYCLE',
    icon: <Activity size={32} />,
    question: 'How do tiny organisms help the ground stay healthy?',
    answer: 'They are part of an important cycle. When things die, they break down the dead plant and animal material.',
    highlights: ['cycle', 'break down', 'material'],
    vocab: [
      { word: 'cycle', def: 'A series of events that are regularly repeated in the same order.' },
      { word: 'break down', def: 'To decay or make something decay (become simpler parts).' },
      { word: 'material', def: 'The matter from which a thing is or can be made.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 11,
    bg: '/images/slide10.png',
    header: 'GIVING LIFE ENERGY',
    icon: <Sparkles size={32} />,
    question: 'What happens after the material is broken down?',
    answer: 'This process eventually returns nutrients to the soil, giving living plants the energy to grow.',
    highlights: ['process', 'nutrients'],
    vocab: [
      { word: 'process', def: 'A series of actions or steps taken in order to achieve a particular end.' },
      { word: 'nutrients', def: 'Substances that provide nourishment essential for growth and the maintenance of life.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'lime'
  },
  {
    id: 12,
    bg: '/images/slide11.png',
    header: 'FUN FACT #2',
    icon: <Lightbulb size={32} />,
    question: 'Did you know?',
    answer: 'Some of the most important organisms in the cube are only a millimeter in size—smaller than a single grain of rice!',
    highlights: [],
    layout: 'qa',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 13,
    bg: '/images/slide12.png',
    header: 'STAYING HEALTHY',
    icon: <Leaf size={32} />,
    question: 'Why are healthy plants important for us?',
    answer: 'They help to maintain a healthy environment for humans and other animals.',
    highlights: ['maintain'],
    vocab: [
      { word: 'maintain', def: 'To keep something at the same level or in good condition.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 14,
    bg: '/images/slide13.png',
    header: 'OCEAN REGIONS',
    icon: <Waves size={32} />,
    question: 'Where did David Littschwager study these organisms?',
    answer: 'He went to different regions, including a forest and a coral reef, to place his green cube.',
    highlights: ['regions', 'coral reef'],
    vocab: [
      { word: 'region', def: 'A particular area or part of a country or the world.' },
      { word: 'coral reef', def: 'A ridge of rock in the sea formed by the growth and deposit of coral.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'blue'
  },
  {
    id: 15,
    bg: '/images/slide14.png',
    header: 'FUN FACT #3',
    icon: <Lightbulb size={32} />,
    question: 'Did you know?',
    answer: 'Coral reefs are often called the "rainforests of the sea" because they are packed with thousands of species in a tiny space.',
    highlights: ['species'],
    layout: 'qa',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 16,
    bg: '/images/slide15.png',
    header: 'FINDING GEMS',
    icon: <Gem size={32} />,
    question: 'What did the team discover inside the cube?',
    answer: 'They were surprised to discover hundreds of organisms. He described them as "little gems."',
    highlights: ['discover', 'gems'],
    vocab: [
      { word: 'discover', def: 'To find unexpectedly or during a search.' },
      { word: 'gem', def: 'A precious or semi-precious stone, or something prized for its beauty/worth.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'cyan'
  },
  {
    id: 17,
    bg: '/images/slide16.png',
    header: 'MASSIVE VARIETY',
    icon: <Layers size={32} />,
    question: 'How diverse is the life within one cubic foot?',
    answer: 'They found hundreds of different species, proving that small spaces hold huge variety.',
    highlights: ['species'],
    vocab: [
      { word: 'species', def: 'A group of living organisms consisting of similar individuals.' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'rose'
  },
  {
    id: 18,
    bg: '/images/slide17.png',
    header: 'VOCAB_CHECKPOINT_01',
    vocabList: [
      { icon: '🌱', zh: '生物', en: 'organisms' },
      { icon: '🐜', zh: '昆虫', en: 'insects' },
      { icon: '🏠', zh: '居住者', en: 'dweller' },
      { icon: '📜', zh: '博物学家', en: 'naturalist' },
      { icon: '🔄', zh: '循环', en: 'cycle' },
      { icon: '🔨', zh: '分解', en: 'break down' },
      { icon: '📦', zh: '材料', en: 'material' }
    ],
    layout: 'vocabCheck',
    steps: 8,
    colorTheme: 'emerald'
  },
  {
    id: 19,
    bg: '/images/slide18.png',
    header: 'VOCAB_CHECKPOINT_02',
    vocabList: [
      { icon: '⚙️', zh: '过程', en: 'process' },
      { icon: '🍎', zh: '养分', en: 'nutrients' },
      { icon: '🛠️', zh: '维持', en: 'maintain' },
      { icon: '🪸', zh: '珊瑚礁', en: 'coral reef' },
      { icon: '🔍', zh: '发现', en: 'discover' },
      { icon: '💎', zh: '宝石', en: 'gem' },
      { icon: '🧬', zh: '物种', en: 'species' },
      { icon: '🗺️', zh: '地区', en: 'region' }
    ],
    layout: 'vocabCheck',
    steps: 9,
    colorTheme: 'blue'
  },
  {
    id: 20,
    bg: '/images/slide19.png',
    header: 'PRACTICE: THE LIVING EARTH',
    instruction: 'Fill in the blanks using the correct form of the words from the box.',
    wordBank: ['region', 'cycle', 'organisms', 'break down', 'material', 'nutrients', 'process', 'maintain'],
    layout: 'fillBlanks',
    steps: 9,
    colorTheme: 'emerald'
  },
  {
    id: 21,
    bg: '/images/slide20.png',
    header: 'SCENARIO 1: DISCOVERY',
    scenarios: [
      {
        q: "You are looking at a small leaf in your garden and you see a strange tiny animal. What do you say?", 
        keywords: ['discover', 'insects'],
        icon: <Search size={32} />,
        possibleAnswer: "Look! I just discovered one of the weirdest insects I have ever seen on this leaf!"
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'emerald'
  },
  {
    id: 22,
    bg: '/images/slide21.png',
    header: 'SCENARIO 2: THE CYCLE',
    scenarios: [
      {
        q: "You see old leaves and wood turning into soil. How do you explain this to a friend?", 
        keywords: ['break down', 'nutrients', 'cycle'],
        icon: <Sprout size={32} />,
        possibleAnswer: "Tiny organisms break down the dead material to return nutrients to the soil as part of a natural cycle."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 23,
    bg: '/images/slide22.png',
    header: 'SCENARIO 3: PROTECTION',
    scenarios: [
      {
        q: "Why is it important to protect the ocean from pollution?", 
        keywords: ['maintain', 'coral reef', 'species'],
        icon: <Waves size={32} />,
        possibleAnswer: "We must maintain clean water to protect the coral reef and the thousands of species that live there."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'blue'
  },
  {
    id: 24,
    bg: '/images/slide23.png',
    header: 'FOLLOW-UP DISCUSSION',
    icon: <MessageSquare className="text-emerald-400" size={32} />,
    questions: [
      { q: "After reading this, would you like to work as a naturalist like E. O. Wilson? Why or why not?", icon: <Compass size={24} /> },
      { q: "Why is studying a small space (one cubic foot) sometimes better than studying a whole forest?", icon: <Microscope size={24} /> }
    ],
    layout: 'discussion',
    steps: 3,
    colorTheme: 'emerald'
  },
  {
    id: 25,
    bg: '/images/slide24.png',
    header: 'SUMMARY: THE WORLD IN A CUBE',
    points: [
      { title: 'Hidden Gems', text: 'Tiny organisms are just as important and beautiful as big animals.', icon: <Gem size={24} /> },
      { title: 'The Cycle', text: 'Life depends on the process of breaking down and returning nutrients.', icon: <Activity size={24} /> },
      { title: 'Discovery', text: 'There is a massive variety of species waiting to be found in every region.', icon: <Globe size={24} /> }
    ],
    closing: "Protect the small, and you protect the whole world.",
    layout: 'summary',
    steps: 5,
    colorTheme: 'teal'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getTheme = (s: Slide) => {
    const themes = {
      emerald: { primary: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/30', highlight: 'bg-emerald-500/10', glow: 'shadow-emerald-500/40' },
      amber: { primary: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/30', highlight: 'bg-amber-500/10', glow: 'shadow-amber-500/40' },
      blue: { primary: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500/30', highlight: 'bg-blue-500/10', glow: 'shadow-blue-500/40' },
      indigo: { primary: 'text-indigo-400', bg: 'bg-indigo-500', border: 'border-indigo-500/30', highlight: 'bg-indigo-500/10', glow: 'shadow-indigo-500/40' },
      lime: { primary: 'text-lime-400', bg: 'bg-lime-500', border: 'border-lime-500/30', highlight: 'bg-lime-500/10', glow: 'shadow-lime-500/40' },
      rose: { primary: 'text-rose-400', bg: 'bg-rose-500', border: 'border-rose-500/30', highlight: 'bg-rose-500/10', glow: 'shadow-rose-500/40' },
      cyan: { primary: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500/30', highlight: 'bg-cyan-500/10', glow: 'shadow-cyan-500/40' },
      teal: { primary: 'text-teal-400', bg: 'bg-teal-500', border: 'border-teal-500/30', highlight: 'bg-teal-500/10', glow: 'shadow-teal-500/40' },
      orange: { primary: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-500/30', highlight: 'bg-orange-500/10', glow: 'shadow-orange-500/40' }
    };
    return themes[s.colorTheme || 'emerald'];
  };

  const slide = slides[currentSlide];
  const theme = getTheme(slide);

  useEffect(() => {
    if (slide.audio && currentStep === 1) {
      if (audioRef.current) {
        audioRef.current.src = slide.audio;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    } else if (!slide.audio && audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentSlide, currentStep, slide.audio]);

  const nextAction = useCallback(() => {
    const s = slides[currentSlide];
    if (currentStep < s.steps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentSlide < slides.length - 1) {
      let nextIndex = currentSlide + 1;
      if (currentSlide === 1) nextIndex = 4;
      setCurrentSlide(nextIndex);
      setCurrentStep(0);
    }
  }, [currentSlide, currentStep]);

  const prevAction = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentSlide > 0) {
      let prevIndex = currentSlide - 1;
      if (currentSlide === 4) prevIndex = 1;
      const prevSlide = slides[prevIndex];
      setCurrentSlide(prevIndex);
      setCurrentStep(prevSlide.steps);
    }
  }, [currentSlide, currentStep]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setCurrentStep(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'ArrowDown') nextAction();
      if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp' || e.key === 'ArrowUp') prevAction();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextAction, prevAction]);

  const highlightText = (text: string, words: string[] = targetWords) => {
    if (!text) return text;
    const parts = text.split(new RegExp(`(${words.join('|')})`, 'gi'));
    return parts.map((part, i) => 
      words.some(w => w.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className={`${theme.primary} font-bold underline decoration-current/40 underline-offset-8 decoration-4`}>{part}</span>
      ) : part
    );
  };

  return (
    <main 
      className={`relative w-screen h-screen overflow-hidden bg-[#0D0E12] text-white font-sans cursor-pointer`}
      onClick={nextAction}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(13,14,18,0.3) 0%, rgba(13,14,18,0.95) 100%), url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="text-[25vw] font-black text-white/[0.03] tracking-tighter uppercase select-none">
              {slide.id < 10 ? `0${slide.id}` : slide.id}
            </span>
          </div>

          <div className="container mx-auto px-12 md:px-24 h-full flex flex-col justify-center items-center text-center relative z-10">
            <div className="w-full max-w-7xl">
              
              {slide.layout === 'title' && (
                <div className="space-y-10">
                  {currentStep >= 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
                      <div className={`w-16 h-[1px] ${theme.bg}`} />
                      <span className={`text-xs tracking-[0.6em] ${theme.primary} uppercase font-bold`}>Discovery Journal</span>
                      <div className={`w-16 h-[1px] ${theme.bg}`} />
                    </motion.div>
                  )}
                  {currentStep >= 2 && (
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-[10vw] font-black tracking-tighter leading-[0.9] text-white italic">
                      {slide.title}
                    </motion.h1>
                  )}
                  {currentStep >= 3 && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-light text-white/40 tracking-tight max-w-2xl mx-auto border-t border-white/10 pt-8 uppercase tracking-[0.3em]">
                      {slide.subtitle}
                    </motion.p>
                  )}
                </div>
              )}

              {slide.layout === 'questions' && (
                <div className="max-w-5xl w-full text-left mx-auto space-y-12">
                  <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase opacity-60`}>{slide.header}</h2>
                  <div className="grid gap-8">
                    {slide.questions?.map((q, i) => currentStep >= i + 2 && (
                      <motion.div 
                        key={i}
                        initial={{ x: -30, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        onClick={(e) => {
                          if (typeof q !== 'string' && q.link !== undefined) {
                            e.stopPropagation();
                            goToSlide(q.link);
                          }
                        }}
                        className={`p-10 bg-white/[0.03] border ${theme.border} backdrop-blur-3xl rounded-2xl flex gap-8 items-start transition-all duration-300 hover:bg-white/[0.07] group ${typeof q !== 'string' && q.link !== undefined ? 'cursor-pointer' : ''}`}
                      >
                        <div className={`${theme.primary} p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform`}>
                          {typeof q === 'string' ? <MessageSquare size={32} /> : q.icon}
                        </div>
                        <div className="space-y-3">
                          <p className="text-4xl italic text-white leading-tight font-medium">"{typeof q === 'string' ? q : q.q}"</p>
                          {typeof q !== 'string' && q.link !== undefined && (
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.3em] ${theme.primary} opacity-40 group-hover:opacity-100`}>Click to Explore Section</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {slide.layout === 'history' && (
                <div className="max-w-6xl w-full text-left mx-auto space-y-12">
                  <div className="flex justify-between items-end">
                    <div className="space-y-4">
                      <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase`}>{slide.header}</h2>
                      <h3 className="text-6xl font-black italic text-white/90 leading-tight">{slide.subHeader}</h3>
                    </div>
                    {slide.returnTo !== undefined && (
                      <motion.button 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={(e) => { e.stopPropagation(); goToSlide(slide.returnTo!); }}
                        className={`px-8 py-4 ${theme.highlight} hover:bg-white/10 border ${theme.border} rounded-2xl ${theme.primary} font-black flex items-center gap-3 transition-all mb-4 shadow-lg`}
                      >
                        <ChevronLeft size={24} /> Back to Menu
                      </motion.button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slide.facts?.map((fact, i) => currentStep >= i + 2 && (
                      <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex flex-col gap-6 p-10 border ${theme.border} bg-white/[0.04] rounded-xl w-full backdrop-blur-sm relative overflow-hidden shadow-xl`}>
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${theme.bg} opacity-40`}></div>
                        <h4 className={`text-xs font-bold tracking-[0.5em] ${theme.primary} uppercase`}>{fact.label}</h4>
                        <p className="text-2xl text-white/80 font-light leading-snug">{fact.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {slide.layout === 'fullReading' && (
                <div className="max-w-6xl w-full text-left mx-auto space-y-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex items-center gap-6">
                      <div className={`p-4 ${theme.highlight} rounded-2xl ${theme.primary}`}><Volume2 size={32} /></div>
                      <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase`}>{slide.header}</h2>
                    </div>
                    {currentStep >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${theme.bg} animate-ping`} />
                        <span className={`text-[10px] font-bold ${theme.primary} tracking-widest`}>PLAYING_AUDIO</span>
                      </motion.div>
                    )}
                  </div>
                  <div className={`p-10 bg-white/[0.03] border ${theme.border} backdrop-blur-3xl rounded-[40px] max-h-[60vh] overflow-y-auto custom-scrollbar`}>
                    <p className="text-2xl font-light leading-relaxed text-white/80 whitespace-pre-line font-sans">
                      {highlightText(slide.fullText || '')}
                    </p>
                  </div>
                </div>
              )}

              {slide.layout === 'qa' && (
                <div className="max-w-7xl w-full text-left mx-auto grid grid-cols-12 gap-16 items-center">
                  <div className="col-span-8 space-y-10">
                    <div className="flex items-center gap-6 text-white/30 border-b border-white/5 pb-6">
                      <div className={`${theme.primary}`}>{slide.icon}</div>
                      <h2 className="text-sm font-bold tracking-[0.8em] uppercase">{slide.header}</h2>
                    </div>
                    <div className="space-y-12">
                      {currentStep >= 2 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                          <span className={`text-[10px] font-bold ${theme.primary} opacity-60 uppercase tracking-[0.5em] block`}>RESEARCH_QUESTION</span>
                          <p className="text-5xl italic text-white leading-tight">{highlightText(slide.question || '')}</p>
                        </motion.div>
                      )}
                      {currentStep >= 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`p-12 ${theme.highlight} border-l-4 ${theme.border} backdrop-blur-3xl rounded-r-3xl`}>
                          <span className={`text-[10px] font-bold ${theme.primary} uppercase tracking-[0.5em] block mb-6`}>OBSERVATION_DATA</span>
                          <p className="text-3xl font-light text-white/90 leading-relaxed italic">{highlightText(slide.answer || '')}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 h-full flex items-center">
                    {currentStep >= 4 && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`w-full border ${theme.border} bg-[#0D0E12]/90 backdrop-blur-3xl p-10 rounded-3xl shadow-2xl text-left`}>
                        <h3 className={`text-xs font-bold tracking-[0.5em] ${theme.primary} mb-10 uppercase border-b border-white/10 pb-4`}>Biological_Terms</h3>
                        <div className="space-y-10">
                          {slide.vocab?.map((v, i) => (
                            <div key={i} className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 ${theme.bg} rotate-45`} />
                                <span className={`text-2xl font-bold ${theme.primary} italic`}>{v.word}</span>
                              </div>
                              <p className="text-base text-white/60 leading-relaxed pl-6 border-l border-white/5">{v.def}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {slide.layout === 'vocabCheck' && (
                <div className="max-w-6xl w-full mx-auto space-y-12 text-left">
                  <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase`}>{slide.header}</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {slide.vocabList?.map((v, i) => (
                      <div key={i} className={`flex items-center justify-between p-8 border ${theme.border} bg-white/[0.03] backdrop-blur-xl group hover:bg-white/[0.08] transition-all rounded-2xl`}>
                        <div className="flex items-center gap-6">
                          <div className={`p-4 ${theme.highlight} rounded-2xl ${theme.primary} text-3xl`}>{v.icon}</div>
                          <span className="text-xl text-white/40 uppercase tracking-widest font-bold">{v.zh}</span>
                        </div>
                        {currentStep >= i + 2 && (
                          <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-3xl italic ${theme.primary} font-black uppercase tracking-tight`}>{v.en}</motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.layout === 'fillBlanks' && (
                <div className="max-w-6xl w-full text-left mx-auto space-y-12">
                  <div className="space-y-6">
                    <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase`}>{slide.header}</h2>
                    <div className="flex flex-wrap gap-4 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <span className="text-white/30 font-bold mr-4 text-sm uppercase tracking-widest self-center">Specimen Bank:</span>
                      {slide.wordBank?.map((word, i) => (
                        <span key={i} className={`px-6 py-3 ${theme.highlight} border ${theme.border} rounded-xl ${theme.primary} font-bold text-xl shadow-lg`}>{word}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`p-16 bg-white/[0.03] border ${theme.border} backdrop-blur-3xl rounded-[40px]`}>
                    <p className="text-3xl font-light leading-[1.8] text-white/70">
                      In every (1) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 2 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>region</span>, from deep forests to the sea, life exists in a massive (2) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 3 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>cycle</span>. Small (3) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 4 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>organisms</span> are the key. They (4) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 5 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>break down</span> old (5) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 6 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>material</span> to create (6) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 7 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>nutrients</span>. This important (7) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 8 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>process</span> helps to (8) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[120px] transition-all duration-700 ${currentStep >= 9 ? `${theme.border} ${theme.primary} font-black` : 'border-white/10 text-transparent'}`}>maintain</span> the health of our planet.
                    </p>
                  </div>
                </div>
              )}

              {slide.layout === 'scenario' && (
                <div className="max-w-6xl w-full text-left mx-auto space-y-12">
                  <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase`}>{slide.header}</h2>
                  <div className="space-y-10">
                    {slide.scenarios?.map((s, i) => (
                      <div key={i} className="space-y-10">
                        {currentStep >= 1 && (
                          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={`p-12 bg-white/[0.03] border ${theme.border} backdrop-blur-2xl rounded-[40px] flex gap-10 items-start shadow-xl`}>
                            <div className={`p-6 ${theme.highlight} rounded-3xl ${theme.primary} shadow-lg`}>{s.icon}</div>
                            <p className="text-4xl italic leading-tight text-white font-medium">"{s.q}"</p>
                          </motion.div>
                        )}
                        {currentStep >= 2 && (
                          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex flex-wrap gap-6 items-center p-8 ${theme.highlight} border ${theme.border} rounded-3xl backdrop-blur-md shadow-inner`}>
                            <span className={`${theme.primary} font-black uppercase tracking-widest text-xs`}>Keywords:</span>
                            {s.keywords.map((word, idx) => (
                              <span key={idx} className="px-6 py-2 bg-black/40 rounded-xl text-white font-bold text-2xl border border-white/5 uppercase tracking-widest">{word}</span>
                            ))}
                          </motion.div>
                        )}
                        {currentStep >= 3 && (
                          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-12 ${theme.highlight} rounded-[50px] border ${theme.border} ${theme.glow} relative overflow-hidden`}>
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${theme.bg}`}></div>
                            <span className={`${theme.primary} font-black uppercase tracking-widest text-[10px] mb-4 block opacity-60`}>Suggested Observation</span>
                            <p className="text-3xl italic font-medium text-white/90 leading-relaxed">{highlightText(s.possibleAnswer || '', s.keywords)}</p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {slide.layout === 'predict' && (
                <div className="max-w-6xl w-full text-left mx-auto space-y-16">
                  <h2 className="text-[8vw] italic text-white/90 leading-none tracking-tighter font-black">{slide.header}</h2>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    {currentStep >= 2 && (
                      <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={`bg-white/5 backdrop-blur-3xl p-12 rounded-[40px] border ${theme.border} relative overflow-hidden shadow-2xl`}>
                        <p className="text-3xl font-light text-white leading-tight italic">{slide.task}</p>
                      </motion.div>
                    )}
                    <div className="space-y-6">
                      {slide.prompts?.map((p, i) => currentStep >= 3 && (
                        <motion.div key={i} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-6 p-8 bg-white/5 rounded-3xl border border-white/5 shadow-xl hover:bg-white/10 transition-colors">
                          <span className={`flex-shrink-0 w-14 h-14 rounded-full ${theme.highlight} border ${theme.border} flex items-center justify-center font-black ${theme.primary} text-xl`}>{i + 1}</span>
                          <p className="text-2xl font-medium text-gray-200 italic leading-snug">{p}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {slide.layout === 'discussion' && (
                <div className="max-w-5xl w-full text-left mx-auto space-y-12">
                  <h2 className={`text-sm font-bold tracking-[0.8em] ${theme.primary} uppercase opacity-60`}>{slide.header}</h2>
                  <div className="space-y-8">
                    {slide.questions?.map((q, i) => currentStep >= i + 2 && (
                      <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={`p-12 bg-white/[0.03] border ${theme.border} backdrop-blur-2xl rounded-[40px] flex gap-8 items-start shadow-2xl`}>
                        <div className={`p-5 ${theme.highlight} rounded-2xl ${theme.primary}`}>{typeof q === 'object' ? q.icon : <MessageSquare />}</div>
                        <p className="text-4xl italic leading-tight text-white font-medium">"{typeof q === 'object' ? q.q : q}"</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {slide.layout === 'summary' && (
                <div className="max-w-6xl w-full text-left mx-auto space-y-12">
                  <h2 className={`text-7xl md:text-9xl font-black mb-16 tracking-tighter ${theme.primary} italic`}>{slide.header}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {slide.points?.map((p, i) => currentStep >= i + 2 && (
                      <motion.div key={i} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex flex-col gap-6 p-10 bg-white/[0.03] backdrop-blur-xl rounded-[40px] border ${theme.border} shadow-2xl relative overflow-hidden`}>
                        <div className={`p-4 ${theme.highlight} rounded-2xl ${theme.primary} w-fit`}>{p.icon}</div>
                        <div>
                          <h3 className={`text-2xl font-black ${theme.primary} uppercase tracking-widest mb-2`}>{p.title}</h3>
                          <p className="text-xl text-gray-300 font-light leading-snug">{p.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {currentStep >= 5 && <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center"><p className={`text-3xl font-black italic ${theme.primary} ${theme.glow} px-12 py-6 bg-white/5 border ${theme.border} rounded-full inline-block shadow-2xl`}>{slide.closing}</p></motion.div>}
                </div>
              )}

            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 ${theme.bg}/10 blur-[150px] rounded-full animate-pulse`}></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 ${theme.bg}/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Progress Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/4 z-50 px-4 group opacity-40 hover:opacity-100 transition-all duration-500">
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div 
            className={`absolute top-0 left-0 h-full ${theme.bg} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
            initial={false}
            animate={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
              className="w-4 h-4 rounded-full transition-all duration-300 relative group/dot"
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i <= currentSlide ? `${theme.bg} scale-50` : 'bg-white/10 scale-25 group-hover/dot:scale-75'}`} />
              <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-md rounded-lg text-[10px] font-bold ${theme.primary} border border-white/10 opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl`}>P.{i + 1}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-12 z-50 flex gap-4">
        <button onClick={(e) => { e.stopPropagation(); prevAction(); }} className={`group relative p-6 rounded-3xl bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-2xl`}>
          <ChevronLeft size={32} className={`relative z-10 text-white/40 group-hover:${theme.primary} transition-colors`} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); nextAction(); }} className={`group relative p-6 rounded-3xl bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-2xl`}>
          <ChevronRight size={32} className={`relative z-10 text-white/40 group-hover:${theme.primary} transition-colors`} />
        </button>
      </div>

      <div className={`absolute top-12 left-12 flex items-center gap-6 text-[10px] font-black tracking-[0.5em] ${theme.primary} opacity-60 uppercase`}>
        <div className={`w-12 h-[1px] ${theme.bg} opacity-40`}></div>
        Biosphere Explorer
      </div>
      <div className="absolute top-12 right-12 text-sm font-jetbrains tracking-[0.3em] text-white/20">
        <span className={`${theme.primary} opacity-80 font-black`}>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
        <span className={`ml-8 text-[10px] font-bold uppercase`}>Step {currentStep} / {slide.steps}</span>
      </div>
      <audio ref={audioRef} className="hidden" />
    </main>
  );
}
