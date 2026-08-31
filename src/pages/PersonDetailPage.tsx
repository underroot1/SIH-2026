import { useApp } from '@/context/AppContext';
import { usePeople } from '@/hooks/usePeople';
import { PageHeader, ErrorState } from '@/components/UI';
import { Illustration } from '@/components/Illustration';
import { Phone, Volume2, ArrowLeft } from 'lucide-react';

export function PersonDetailPage() {
  const { selectedPersonId, goBack } = useApp();
  const { people, error, refresh } = usePeople();
  const person = people.find((p) => p.id === selectedPersonId);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader title="My People" />
        <ErrorState message={error} onRetry={refresh} />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Person not found" />
        <button onClick={goBack} className="btn-secondary">
          <ArrowLeft className="w-6 h-6" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title={person.name} subtitle={person.relationship} />

      <div className="card-base overflow-hidden animate-scaleIn">
        <Illustration id={person.image} label={person.name} className="w-full aspect-square sm:aspect-[4/3]" rounded="rounded-none" />

        <div className="p-6 sm:p-8">
          <p className="text-2xl font-display font-extrabold text-ink-800 mb-2">{person.name}</p>
          <p className="text-xl text-honey-600 font-bold mb-4">{person.relationship}</p>
          <p className="text-xl text-ink-600 leading-relaxed mb-6">{person.info}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-success flex-1 text-xl">
              <Phone className="w-7 h-7" />
              Call {person.name}
            </button>
            <button className="btn-primary flex-1 text-xl">
              <Volume2 className="w-7 h-7" />
              Listen
            </button>
          </div>
          <button onClick={goBack} className="btn-secondary w-full mt-3 text-xl">
            <ArrowLeft className="w-6 h-6" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
