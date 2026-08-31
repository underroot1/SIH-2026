import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/UI';
import { Phone, UserCog, Volume2, ArrowLeft, ShieldCheck } from 'lucide-react';

export function HelpPage() {
  const { goBack } = useApp();

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

      {/* Reassurance banner */}
      <div className="card-base p-6 mb-6 bg-sage-50 border-2 border-sage-200 text-center animate-fadeIn">
        <p className="text-2xl font-display font-extrabold text-sage-700 mb-1">You are safe. 🌿</p>
        <p className="text-lg text-sage-600">Your family and caregivers are here to help.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button className="card-base card-hover p-6 flex items-center gap-5 text-left group">
          <div className="w-16 h-16 rounded-2xl bg-sage-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
            <Phone className="w-9 h-9 text-sage-600" />
          </div>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-2xl">Call My Family</p>
            <p className="text-ink-500 text-lg">Talk to someone you love.</p>
          </div>
        </button>

        <button className="card-base card-hover p-6 flex items-center gap-5 text-left group">
          <div className="w-16 h-16 rounded-2xl bg-honey-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
            <UserCog className="w-9 h-9 text-honey-600" />
          </div>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-2xl">Contact My Caregiver</p>
            <p className="text-ink-500 text-lg">Reach the person who helps you.</p>
          </div>
        </button>

        <button className="card-base card-hover p-6 flex items-center gap-5 text-left group">
          <div className="w-16 h-16 rounded-2xl bg-coral-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
            <Volume2 className="w-9 h-9 text-coral-600" />
          </div>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-2xl">Read This Screen Aloud</p>
            <p className="text-ink-500 text-lg">Listen to the words on this page.</p>
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
