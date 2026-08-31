import { useApp } from '@/context/AppContext';
import { useMemories } from '@/hooks/useMemories';
import { PageHeader, ErrorState } from '@/components/UI';
import { Illustration } from '@/components/Illustration';
import { Volume2, ArrowLeft } from 'lucide-react';

export function MemoryDetailPage() {
  const { selectedMemoryId, goBack } = useApp();
  const { memories, error, refresh } = useMemories();
  const memory = memories.find((m) => m.id === selectedMemoryId);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader title="My Memories" />
        <ErrorState message={error} onRetry={refresh} />
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Memory not found" />
        <button onClick={goBack} className="btn-secondary">
          <ArrowLeft className="w-6 h-6" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title={memory.title} subtitle={memory.year} />

      <div className="card-base overflow-hidden animate-scaleIn">
        <Illustration id={memory.image} label={memory.title} className="w-full aspect-[4/3]" rounded="rounded-none" />

        <div className="p-6 sm:p-8">
          <p className="text-2xl font-display font-extrabold text-ink-800 mb-3">{memory.caption}</p>
          <p className="text-xl text-ink-600 leading-relaxed mb-6">{memory.detail}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-primary flex-1 text-xl">
              <Volume2 className="w-7 h-7" />
              Listen to This
            </button>
            <button onClick={goBack} className="btn-secondary flex-1 text-xl">
              <ArrowLeft className="w-6 h-6" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
