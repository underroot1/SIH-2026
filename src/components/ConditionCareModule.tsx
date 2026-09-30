import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Brain,
  Activity,
  HeartPulse,
  Sparkles,
  Sun,
  Droplets,
  Volume2,
  CheckCircle2,
  Heart,
  Phone,
  Images,
  Smile,
  Shield,
} from 'lucide-react';
import { CONDITIONS, type CareCondition } from '@/data/mockData';

export function ConditionCareModule() {
  const { careCondition, setCareCondition, navigate } = useApp();
  const [waterCount, setWaterCount] = useState(() => {
    return parseInt(localStorage.getItem('haven_water_count') || '3', 10);
  });
  const [heartSent, setHeartSent] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  // MCI checklist state
  const [mciTasks, setMciTasks] = useState([
    { id: 1, text: 'Morning gentle walk & fresh air', done: true },
    { id: 2, text: 'Daily brain puzzle / word exercise', done: false },
    { id: 3, text: 'Placed keys & glasses in basket', done: true },
    { id: 4, text: 'Afternoon hydration & snack', done: false },
  ]);

  const handleWater = () => {
    const next = Math.min(8, waterCount + 1);
    setWaterCount(next);
    localStorage.setItem('haven_water_count', next.toString());
  };

  const handleSpeech = (phrase: string, spokenText: string) => {
    setSpeechNotice(`"${phrase}"`);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 0.9; // clear, gentle pace
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setSpeechNotice(null), 3500);
  };

  const handleHeart = () => {
    setHeartSent(true);
    setTimeout(() => setHeartSent(false), 4000);
  };

  const toggleMciTask = (id: number) => {
    setMciTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const currentCondition = CONDITIONS.find((c) => c.id === careCondition) || CONDITIONS[0];

  return (
    <div className="mb-8 animate-scaleIn">
      {/* Condition label + caregiver link */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs text-ink-500 font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-honey-500 animate-pulse" />
          <span>Care Mode:</span>
          <span className="text-honey-700 bg-honey-100 px-2.5 py-0.5 rounded-full">{currentCondition.title.split('&')[0]}</span>
        </div>
        <button
          onClick={() => navigate('caregiver-dashboard')}
          className="text-xs text-honey-700 font-bold hover:underline"
        >
          Change in Helper Dashboard
        </button>
      </div>

      {/* ── 1. PARKINSON'S DISEASE HUB ────────────────────────────────────────── */}
      {careCondition === 'parkinsons' && (
        <div className="card-base p-6 border-2 border-teal-300 bg-gradient-to-br from-teal-50/60 to-cream-50 shadow-warm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-xs">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-display font-extrabold text-ink-900 leading-tight">
                  Movement & Medicine
                </h2>
                <p className="text-sm text-teal-800 font-semibold">
                  Your medicine times and gentle movement reminders
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-xs uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" /> On Time
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-white p-4 rounded-2xl border border-teal-200">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">Next Medicine</p>
              <p className="text-2xl font-display font-extrabold text-ink-900 mt-0.5">12:30 PM</p>
              <p className="text-xs text-ink-400 mt-1">Take on time to feel your best.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-teal-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">Water Today</p>
                <p className="text-2xl font-display font-extrabold text-ink-900 mt-0.5">{waterCount} / 6 Glasses</p>
                <p className="text-xs text-ink-400 mt-1">Tap to log a glass of water.</p>
              </div>
              <button
                onClick={handleWater}
                className="w-11 h-11 rounded-2xl bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center justify-center font-bold text-lg transition active:scale-95 shrink-0"
                title="Log +1 glass of water"
              >
                <Droplets className="w-5 h-5 text-teal-700" />
              </button>
            </div>
          </div>

          {/* Tremor-friendly large tap action */}
          <button
            onClick={() => handleSpeech('Gentle movement', 'Let us do a gentle two-minute seated arm and leg stretch to keep your muscles relaxed.')}
            className="w-full bg-white hover:bg-teal-50 border-2 border-teal-400 text-teal-900 font-extrabold py-4 px-5 rounded-2xl flex items-center justify-center gap-3 text-lg transition shadow-xs active:scale-98"
          >
            <Activity className="w-6 h-6 text-teal-600" />
            <span>Start Gentle 2-Minute Stretch</span>
          </button>
        </div>
      )}

      {/* ── 2. POST-STROKE & APHASIA RECOVERY BOARD ───────────────────────────── */}
      {careCondition === 'stroke' && (
        <div className="card-base p-6 border-2 border-coral-300 bg-gradient-to-br from-coral-50/70 to-cream-50 shadow-warm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-coral-500 text-white flex items-center justify-center shadow-xs">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-display font-extrabold text-ink-900 leading-tight">
                  Tap to Speak
                </h2>
                <p className="text-sm text-coral-800 font-semibold">
                  These cards speak for you — just tap one
                </p>
              </div>
            </div>
          </div>

          {speechNotice && (
            <div className="mb-3 bg-coral-500 text-white font-bold text-center py-2 px-4 rounded-xl text-base animate-pulse flex items-center justify-center gap-2">
              <Volume2 className="w-5 h-5" />
              <span>Speaking: {speechNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Want Water', spoken: 'I would like a glass of water, please.', icon: '💧', color: 'bg-blue-50 border-blue-200' },
              { label: 'Hungry / Food', spoken: 'I am hungry and would like something to eat.', icon: '🍲', color: 'bg-amber-50 border-amber-200' },
              { label: 'Call Family', spoken: 'I would like to speak to my family, please.', icon: '👨‍👩‍👧', color: 'bg-rose-50 border-rose-200' },
              { label: 'Need to Rest', spoken: 'I am feeling tired and need to rest.', icon: '🛌', color: 'bg-purple-50 border-purple-200' },
              { label: 'Yes, Agree', spoken: 'Yes, thank you.', icon: '👍', color: 'bg-emerald-50 border-emerald-200' },
              { label: 'No, Disagree', spoken: 'No, thank you.', icon: '👎', color: 'bg-slate-50 border-slate-200' },
            ].map((card) => (
              <button
                key={card.label}
                onClick={() => handleSpeech(card.label, card.spoken)}
                className={`p-4 rounded-2xl border-2 ${card.color} hover:scale-102 active:scale-95 transition text-left flex flex-col justify-between shadow-xs min-h-[90px]`}
              >
                <span className="text-2xl mb-1">{card.icon}</span>
                <p className="font-display font-extrabold text-ink-900 text-base leading-tight">
                  {card.label}
                </p>
                <span className="text-[11px] text-ink-400 mt-0.5 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-coral-600" /> Tap to speak
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. MILD COGNITIVE IMPAIRMENT (MCI) CHECKLIST ─────────────────────── */}
      {careCondition === 'mci' && (
        <div className="card-base p-6 border-2 border-amber-300 bg-gradient-to-br from-amber-50/60 to-cream-50 shadow-warm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-display font-extrabold text-ink-900 leading-tight">
                  Today's Tasks
                </h2>
                <p className="text-sm text-amber-800 font-semibold">
                  Tap each task when done — you're doing great!
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('play')}
              className="btn-primary text-sm px-3.5 py-2 shrink-0"
            >
              Brain Workout
            </button>
          </div>

          <div className="space-y-2 mb-3">
            {mciTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleMciTask(t.id)}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                  t.done ? 'bg-amber-100/50 border-amber-300' : 'bg-white border-cream-300 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${t.done ? 'bg-amber-600 text-white' : 'border-2 border-cream-400'}`}>
                    {t.done && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className={`text-base font-bold ${t.done ? 'line-through text-ink-400' : 'text-ink-800'}`}>
                    {t.text}
                  </span>
                </div>
                <span className="text-xs text-ink-400 font-semibold">{t.done ? 'Done ⭐' : 'To do'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. SENIOR LIVING & LONELINESS WELLNESS CORNER ────────────────────── */}
      {careCondition === 'healthy_aging' && (
        <div className="card-base p-6 border-2 border-sage-300 bg-gradient-to-br from-sage-50/70 to-cream-50 shadow-warm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sage-500 text-white flex items-center justify-center shadow-xs">
                <Sun className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-display font-extrabold text-ink-900 leading-tight">
                  Stay Connected
                </h2>
                <p className="text-sm text-sage-800 font-semibold">
                  Your family is close — reach out anytime
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <button
              onClick={() => navigate('people')}
              className="p-4 rounded-2xl bg-white border-2 border-sage-200 hover:border-sage-400 transition text-left flex items-center gap-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-sage-600" />
              </div>
              <div>
                <p className="font-bold text-ink-900 text-base">Call Family</p>
                <p className="text-xs text-ink-400">Tap to call your daughter or son</p>
              </div>
            </button>

            <button
              onClick={handleHeart}
              className="p-4 rounded-2xl bg-white border-2 border-coral-200 hover:border-coral-400 transition text-left flex items-center gap-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center shrink-0">
                <Heart className={`w-6 h-6 text-coral-600 ${heartSent ? 'animate-bounce fill-coral-500' : ''}`} />
              </div>
              <div>
                <p className="font-bold text-ink-900 text-base">Send Love to Family</p>
                <p className="text-xs text-ink-400">{heartSent ? '❤️ Heart sent! They love you.' : 'Let them know you are smiling'}</p>
              </div>
            </button>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-sage-200 flex items-center gap-3">
            <Smile className="w-6 h-6 text-sage-600 shrink-0" />
            <p className="text-xs sm:text-sm text-ink-700 font-medium">
              "A cheerful heart is good medicine. You are deeply cherished and appreciated today."
            </p>
          </div>
        </div>
      )}

      {/* ── 5. DEMENTIA & ALZHEIMER'S (DEFAULT) REASSURANCE ─────────────────── */}
      {careCondition === 'dementia' && (
        <div className="card-base p-6 border-2 border-honey-300 bg-gradient-to-br from-honey-50/70 to-cream-50 shadow-warm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-honey-500 text-white flex items-center justify-center shadow-xs">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-display font-extrabold text-ink-900 leading-tight">
                  You are safe. 🌿
                </h2>
                <p className="text-sm text-honey-800 font-semibold">
                  Your family and helpers are right here with you.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <button
              onClick={() => navigate('memories')}
              className="p-3.5 rounded-2xl bg-white border-2 border-honey-200 hover:border-honey-400 transition text-left flex items-center gap-3 shadow-xs"
            >
              <Images className="w-6 h-6 text-coral-500" />
              <div>
                <p className="font-bold text-ink-900 text-sm">See Family Photos</p>
                <p className="text-[11px] text-ink-400">Remember happy moments</p>
              </div>
            </button>
            <button
              onClick={() => handleSpeech('Calm Reassurance', 'Elena, you are safe at home. Everything is taken care of, and your family loves you very much.')}
              className="p-3.5 rounded-2xl bg-white border-2 border-honey-200 hover:border-honey-400 transition text-left flex items-center gap-3 shadow-xs"
            >
              <Volume2 className="w-6 h-6 text-honey-600" />
              <div>
                <p className="font-bold text-ink-900 text-sm">Read Calming Words</p>
                <p className="text-[11px] text-ink-400">Listen to gentle reminder</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
