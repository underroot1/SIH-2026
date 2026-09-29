import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/UI';
import { Phone, UserCog, Volume2, ArrowLeft, ShieldCheck, HeartPulse } from 'lucide-react';
import { useState } from 'react';

export function HelpPage() {
  const { goBack, careCondition } = useApp();
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  const handleReadAloud = (text: string) => {
    setSpeechNotice(text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setSpeechNotice(null), 3000);
  };

  const reassuranceTitles: Record<string, { title: string; subtitle: string }> = {
    dementia: {
      title: 'You are safe. 🌿',
      subtitle: 'Your family and caregivers are right here to help you.',
    },
    parkinsons: {
      title: 'Take your time. 🌿',
      subtitle: 'Sit down comfortably. Medication and physical help are readily available.',
    },
    stroke: {
      title: 'You are understood. 🌿',
      subtitle: 'Tap any speech card below or call your family with one touch.',
    },
    mci: {
      title: 'Everything is in order. 🌿',
      subtitle: 'Your routine and family contacts are always right beside you.',
    },
    healthy_aging: {
      title: 'You are loved and never alone. 🌿',
      subtitle: 'Your family and caregivers are only one touch away.',
    },
  };

  const currentReassurance = reassuranceTitles[careCondition] || reassuranceTitles.dementia;

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Do You Need Help?"
        icon={
          <div className="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-coral-600" />
          </div>
        }
        showBack={false}
      />

      {/* Condition-specific reassurance banner */}
      <div className="card-base p-6 mb-6 bg-sage-50 border-2 border-sage-200 text-center animate-fadeIn">
        <p className="text-2xl font-display font-extrabold text-sage-700 mb-1">
          {currentReassurance.title}
        </p>
        <p className="text-lg text-sage-600">{currentReassurance.subtitle}</p>
      </div>

      {speechNotice && (
        <div className="mb-4 bg-coral-500 text-white font-bold text-center py-2 px-4 rounded-xl text-base animate-pulse">
          Reading: {speechNotice}
        </div>
      )}

      {/* Special Aphasia / Stroke Quick Help Cards */}
      {careCondition === 'stroke' && (
        <div className="card-base p-5 mb-6 border-2 border-coral-200 bg-coral-50/40">
          <p className="font-bold text-ink-800 text-base mb-3 flex items-center gap-1.5">
            <HeartPulse className="w-5 h-5 text-coral-600" /> Quick Spoken Emergency Words:
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Need Help Now', text: 'I need help right now, please.' },
              { label: 'Feeling Pain', text: 'I am experiencing pain.' },
              { label: 'Need Water', text: 'I need a glass of water.' },
              { label: 'Call Daughter / Son', text: 'Please call my family immediately.' },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleReadAloud(btn.text)}
                className="p-3 bg-white rounded-xl border border-coral-200 text-left hover:border-coral-400 font-bold text-ink-900 text-sm active:scale-95 shadow-xs"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => handleReadAloud('Calling your family now. Someone who loves you will answer.')}
          className="card-base card-hover p-6 flex items-center gap-5 text-left group"
        >
          <div className="w-16 h-16 rounded-2xl bg-sage-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
            <Phone className="w-9 h-9 text-sage-600" />
          </div>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-2xl">Call My Family</p>
            <p className="text-ink-500 text-lg">Talk to someone you love right now.</p>
          </div>
        </button>

        <button
          onClick={() => handleReadAloud('Contacting your caregiver. They are on their way to help.')}
          className="card-base card-hover p-6 flex items-center gap-5 text-left group"
        >
          <div className="w-16 h-16 rounded-2xl bg-honey-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
            <UserCog className="w-9 h-9 text-honey-600" />
          </div>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-2xl">Contact My Caregiver</p>
            <p className="text-ink-500 text-lg">Reach the person dedicated to assisting you.</p>
          </div>
        </button>

        <button
          onClick={() => handleReadAloud(`You are looking at the Help Screen. ${currentReassurance.title} ${currentReassurance.subtitle} You can press Call My Family or Contact Caregiver anytime.`)}
          className="card-base card-hover p-6 flex items-center gap-5 text-left group"
        >
          <div className="w-16 h-16 rounded-2xl bg-coral-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
            <Volume2 className="w-9 h-9 text-coral-600" />
          </div>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-2xl">Read This Screen Aloud</p>
            <p className="text-ink-500 text-lg">Listen to reassuring words in a calm voice.</p>
          </div>
        </button>
      </div>

      <button onClick={goBack} className="btn-secondary w-full mt-6 text-xl">
        <ArrowLeft className="w-6 h-6" />
        Go Back
      </button>
    </div>
  );
}
