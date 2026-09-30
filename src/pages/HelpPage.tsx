import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/UI';
import { Phone, UserCog, Volume2, ShieldCheck, HeartPulse } from 'lucide-react';
import { useState } from 'react';

const REASSURANCE: Record<string, { title: string; body: string }> = {
  dementia:      { title: 'You are safe. 🌿', body: 'Your family and helpers are here.' },
  parkinsons:    { title: 'Take your time. 🌿', body: 'Sit comfortably. Help is close by.' },
  stroke:        { title: 'You are understood. 🌿', body: 'Tap any card below to speak for you.' },
  mci:           { title: 'All is well. 🌿', body: 'Your family is just one tap away.' },
  healthy_aging: { title: 'You are loved. 🌿', body: 'Your family and helpers are near.' },
};

const HELP_ACTIONS = [
  {
    id: 'family',
    label: 'Call My Family',
    sub: 'Talk to someone who loves you.',
    icon: Phone,
    color: 'bg-sage-100 text-sage-600',
    speech: 'Calling your family now. Someone who loves you will answer.',
  },
  {
    id: 'caregiver',
    label: 'Call My Helper',
    sub: 'Your caregiver will come.',
    icon: UserCog,
    color: 'bg-honey-100 text-honey-600',
    speech: 'Contacting your caregiver. They are on their way.',
  },
  {
    id: 'read',
    label: 'Read This Aloud',
    sub: 'Hear calming words.',
    icon: Volume2,
    color: 'bg-coral-100 text-coral-600',
    speech: null, // built dynamically below
  },
];

const STROKE_CARDS = [
  { label: 'Need Help',  text: 'I need help right now, please.' },
  { label: 'Feeling Pain', text: 'I am in pain.' },
  { label: 'Need Water', text: 'I need water, please.' },
  { label: 'Call Family', text: 'Please call my family.' },
];

export function HelpPage() {
  const { careCondition } = useApp();
  const [speaking, setSpeaking] = useState<string | null>(null);

  const reassurance = REASSURANCE[careCondition] ?? REASSURANCE.dementia;

  const speak = (text: string, label: string) => {
    setSpeaking(label);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
    setTimeout(() => setSpeaking(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="I Need Help"
        icon={
          <div className="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-coral-600" />
          </div>
        }
        showBack={false}
      />

      {/* Reassurance banner */}
      <div className="card-base p-6 mb-6 bg-sage-50 border-2 border-sage-200 text-center">
        <p className="text-2xl font-display font-extrabold text-sage-700 mb-1">{reassurance.title}</p>
        <p className="text-lg text-sage-600">{reassurance.body}</p>
      </div>

      {/* Speaking notice */}
      {speaking && (
        <div className="mb-4 bg-coral-500 text-white font-bold text-center py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 animate-pulse">
          <Volume2 className="w-5 h-5" />
          <span>Speaking: {speaking}</span>
        </div>
      )}

      {/* Stroke quick-speak cards */}
      {careCondition === 'stroke' && (
        <div className="card-base p-5 mb-6 border-2 border-coral-200 bg-coral-50/40">
          <p className="font-bold text-ink-800 text-base mb-3 flex items-center gap-1.5">
            <HeartPulse className="w-5 h-5 text-coral-600" />
            Tap to speak
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {STROKE_CARDS.map((c) => (
              <button
                key={c.label}
                onClick={() => speak(c.text, c.label)}
                className="p-3 bg-white rounded-xl border border-coral-200 hover:border-coral-400 font-bold text-ink-900 text-sm text-left active:scale-95 shadow-xs"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main help buttons */}
      <div className="grid grid-cols-1 gap-4">
        {HELP_ACTIONS.map((action) => {
          const Icon = action.icon;
          const text =
            action.speech ??
            `You are on the Help screen. ${reassurance.title} ${reassurance.body} You can press Call My Family or Call My Helper anytime.`;
          return (
            <button
              key={action.id}
              onClick={() => speak(text, action.label)}
              className="card-base card-hover p-6 flex items-center gap-5 text-left group"
            >
              <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition`}>
                <Icon className="w-9 h-9" />
              </div>
              <div>
                <p className="font-display font-extrabold text-ink-800 text-2xl">{action.label}</p>
                <p className="text-ink-500 text-lg">{action.sub}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
