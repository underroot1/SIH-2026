import { useState, useEffect } from 'react';
import { playSuccessChime } from '@/utils/audio';
import { Trophy, Sparkles, RotateCcw, Wind } from 'lucide-react';

export function BreathingGame({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'Inhale gently...' | 'Hold softly...' | 'Exhale slowly...' | 'Rest...'>('Inhale gently...');
  const [cycleCount, setCycleCount] = useState(0);
  const [scale, setScale] = useState(0.7);
  const [completed, setCompleted] = useState(false);

  const TARGET_CYCLES = 3;

  useEffect(() => {
    let isCancelled = false;

    // 12-second cycle: 4s inhale, 2s hold, 4s exhale, 2s rest
    const runCycle = async () => {
      while (!isCancelled && cycleCount < TARGET_CYCLES) {
        // Inhale
        setPhase('Inhale gently...');
        setScale(1.25);
        await new Promise((r) => setTimeout(r, 4000));
        if (isCancelled) return;

        // Hold
        setPhase('Hold softly...');
        await new Promise((r) => setTimeout(r, 2000));
        if (isCancelled) return;

        // Exhale
        setPhase('Exhale slowly...');
        setScale(0.7);
        await new Promise((r) => setTimeout(r, 4000));
        if (isCancelled) return;

        // Rest
        setPhase('Rest...');
        await new Promise((r) => setTimeout(r, 2000));
        if (isCancelled) return;

        setCycleCount((prev) => {
          const next = prev + 1;
          if (next >= TARGET_CYCLES) {
            playSuccessChime();
            setCompleted(true);
          }
          return next;
        });
      }
    };

    runCycle();

    return () => {
      isCancelled = true;
    };
  }, [completed]);

  const restart = () => {
    setCycleCount(0);
    setScale(0.7);
    setPhase('Inhale gently...');
    setCompleted(false);
  };

  return (
    <div className="text-center max-w-lg mx-auto select-none">
      <div className="mb-4">
        <h3 className="text-2xl font-display font-extrabold text-ink-800">Serene Breathing Circle</h3>
        <p className="text-ink-500 text-lg">Follow the gentle circle for calm, deep relaxation.</p>
      </div>

      {completed ? (
        <div className="card-base p-8 bg-rose-50 border-2 border-rose-300 animate-scaleIn">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-200 flex items-center justify-center text-rose-800">
            <Trophy className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-extrabold text-rose-900 mb-2">Deep Peace Achieved! 🌿</h4>
          <p className="text-lg text-rose-800 mb-6">
            You completed 3 mindful breathing cycles. Your heart rate, oxygen levels, and mind are relaxed and grounded.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={restart} className="btn-secondary">
              <RotateCcw className="w-5 h-5" />
              Breathe Again
            </button>
            <button onClick={onFinish} className="btn-success">
              <Sparkles className="w-5 h-5" />
              Done
            </button>
          </div>
        </div>
      ) : (
        <div className="card-base p-8 border-2 border-rose-200 flex flex-col items-center">
          <div className="h-10 flex items-center justify-center mb-6">
            <p className="text-2xl font-extrabold text-rose-800 animate-pulse flex items-center gap-2">
              <Wind className="w-6 h-6 text-rose-500" />
              <span>{phase}</span>
            </p>
          </div>

          {/* Smooth Expanding Breathing Circle */}
          <div className="relative w-72 h-72 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-rose-200 opacity-60" />
            <div
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="w-48 h-48 rounded-full bg-gradient-to-tr from-rose-300 via-pink-200 to-amber-100 shadow-2xl border-4 border-white flex items-center justify-center"
            >
              <span className="text-4xl">🌸</span>
            </div>
          </div>

          {/* Cycles Indicator */}
          <div className="flex items-center gap-3 mb-2">
            {Array.from({ length: TARGET_CYCLES }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all ${
                  i < cycleCount ? 'bg-rose-500 scale-110 shadow-sm' : 'bg-cream-300'
                }`}
              />
            ))}
          </div>

          <p className="text-sm font-semibold text-ink-400">
            {cycleCount} of {TARGET_CYCLES} calm breath cycles
          </p>
        </div>
      )}
    </div>
  );
}
