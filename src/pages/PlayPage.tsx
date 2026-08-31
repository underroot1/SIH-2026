import { PageHeader, SuccessToast, LoadingState, ErrorState } from '@/components/UI';
import { GameThumbnail } from '@/components/Illustration';
import { useGames } from '@/hooks/useGames';
import { Puzzle, Users, Palette, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';

const gameIcons: Record<string, typeof Puzzle> = {
  puzzle: Puzzle,
  users: Users,
  palette: Palette,
};

export function PlayPage() {
  const { games, loading, error } = useGames();
  const [playing, setPlaying] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Play & Exercise Your Mind"
        subtitle="Choose a game to enjoy a fun activity."
        icon={
          <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-sage-600" />
          </div>
        }
        showBack={false}
      />

      {playing ? (
        <div className="card-base p-8 text-center animate-scaleIn">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
            <Play className="w-10 h-10 text-sage-600" />
          </div>
          <p className="text-2xl font-display font-extrabold text-ink-800 mb-2">
            Loading {games.find((g) => g.id === playing)?.title}...
          </p>
          <p className="text-lg text-ink-500 mb-6">Your game is getting ready. Please wait a moment.</p>
          <div className="w-full max-w-xs mx-auto h-3 bg-cream-200 rounded-full overflow-hidden">
            <div className="h-full bg-sage-400 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
          <button
            onClick={() => { setPlaying(null); setShowSuccess(true); }}
            className="btn-secondary mt-6"
          >
            Back to Games
          </button>
        </div>
      ) : loading ? (
        <LoadingState message="Loading your games..." />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((game, idx) => {
            const Icon = gameIcons[game.icon] ?? Puzzle;
            return (
              <div
                key={game.id}
                className="card-base p-5 flex flex-col animate-slideUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <GameThumbnail
                  icon={<Icon className="w-16 h-16" strokeWidth={1.8} />}
                  gradient={game.gradient}
                  className="w-full aspect-[4/3] mb-4"
                />
                <p className="font-display font-extrabold text-ink-800 text-2xl mb-1">{game.title}</p>
                <p className="text-ink-500 text-lg mb-4 flex-1">{game.description}</p>
                <button
                  onClick={() => setPlaying(game.id)}
                  className="btn-primary w-full text-xl"
                >
                  <Play className="w-6 h-6" />
                  Play Now
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showSuccess && (
        <SuccessToast
          message="Wonderful! You played a game today ⭐"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
