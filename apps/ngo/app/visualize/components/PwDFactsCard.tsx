'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Sparkles, RefreshCw, Pause, Play } from 'lucide-react';
import { generatePwDFact, type PwDFact } from '../../actions/pwd-facts';

const ROTATION_INTERVAL = 7000; // 7 seconds

// Fallback facts for initial render
const INITIAL_FACTS: PwDFact[] = [
  {
    fact: "India has over 26.8 million persons with disabilities, representing 2.21% of the population according to the 2011 Census.",
    source: "Census of India 2011",
    region: "india"
  },
  {
    fact: "Globally, about 1.3 billion people (16% of the world's population) experience significant disability, making it the world's largest minority group.",
    source: "WHO 2023",
    region: "global"
  },
  {
    fact: "The Rights of Persons with Disabilities Act 2016 in India recognizes 21 types of disabilities and mandates 4% reservation in government jobs.",
    source: "RPwD Act 2016",
    region: "india"
  },
  {
    fact: "Only 3% of the world's 70 million deaf people have access to education in sign language, highlighting a critical accessibility gap.",
    source: "World Federation of the Deaf",
    region: "global"
  },
  {
    fact: "Karnataka has one of India's most progressive disability policies, with over 1,300 registered NGOs serving the differently abled community in Bengaluru alone.",
    source: "NGO Darpan 2024",
    region: "india"
  }
];

export function PwDFactsCard() {
  const [facts, setFacts] = useState<PwDFact[]>(INITIAL_FACTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFact = facts[currentIndex];
  const effectivelyPaused = isPaused || isHovered;

  // Fetch new fact from API
  const fetchNewFact = useCallback(async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const nextRegion = currentFact?.region === 'india' ? 'global' : 'india';
      const newFact = await generatePwDFact(nextRegion);

      setFacts(prev => {
        // Add new fact, keep last 10
        const updated = [...prev, newFact].slice(-10);
        return updated;
      });
    } catch (error) {
      console.error('Failed to fetch new fact:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [currentFact?.region, isGenerating]);

  // Rotate to next fact
  const rotateToNext = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % facts.length);
      setIsLoading(false);
    }, 300);
  }, [facts.length]);

  // Auto-rotate every 7 seconds (unless paused)
  useEffect(() => {
    if (effectivelyPaused) return;

    const interval = setInterval(() => {
      rotateToNext();
      // Fetch a new fact in the background every other rotation
      if (currentIndex % 2 === 0) {
        fetchNewFact();
      }
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [rotateToNext, fetchNewFact, currentIndex, effectivelyPaused]);

  // Initial fetch
  useEffect(() => {
    fetchNewFact();
  }, []);

  if (!currentFact) return null;

  return (
    <Card
      ref={containerRef}
      className="h-full border-slate-200 shadow-sm bg-gradient-to-br from-white to-purple-50/50 overflow-hidden cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 md:pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500 shrink-0" />
            <CardTitle className="text-base md:text-lg font-display text-slate-900 truncate">PwD Facts & Stats</CardTitle>
          </div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Pause/Play Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-1 md:p-1.5 rounded-full transition-colors ${
                effectivelyPaused
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
              title={effectivelyPaused ? 'Resume auto-rotate' : 'Pause'}
            >
              {effectivelyPaused ? (
                <Play className="w-2.5 h-2.5 md:w-3 md:h-3" />
              ) : (
                <Pause className="w-2.5 h-2.5 md:w-3 md:h-3" />
              )}
            </button>
            {isGenerating && (
              <RefreshCw className="w-2.5 h-2.5 md:w-3 md:h-3 text-purple-400 animate-spin" />
            )}
            <span className={`inline-flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-medium ${
              currentFact.region === 'india'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {currentFact.region === 'india' ? (
                <>
                  <MapPin className="w-2 h-2 md:w-2.5 md:h-2.5" />
                  India
                </>
              ) : (
                <>
                  <Globe className="w-2 h-2 md:w-2.5 md:h-2.5" />
                  Global
                </>
              )}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="min-h-[160px] md:min-h-[200px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-1"
            >
              <p className="text-lg md:text-2xl text-slate-800 leading-relaxed font-medium">
                {currentFact.fact}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <p className="text-[9px] md:text-[10px] text-slate-400 font-medium truncate">
              Source: {currentFact.source}
            </p>

            {/* Progress dots */}
            <div className="flex items-center gap-1 shrink-0">
              {facts.slice(0, 5).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors duration-300 ${
                    i === currentIndex % 5
                      ? 'bg-purple-500'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
