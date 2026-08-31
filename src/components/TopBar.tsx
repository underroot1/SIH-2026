import { useApp } from '@/context/AppContext';
import { LANGUAGES, type Language } from '@/data/mockData';
import { Globe, Type, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function TopBar() {
  const { language, setLanguage, textScale, setTextScale } = useApp();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center shadow-warm shrink-0">
            <span className="text-white font-display font-extrabold text-xl">S</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-extrabold text-ink-800 text-lg leading-tight">
              Sahyog
            </p>
            <p className="text-ink-400 text-sm leading-tight">Your caring companion</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Text size control */}
          <div className="flex items-center gap-1 bg-cream-100 rounded-2xl p-1.5 border border-cream-300">
            <Type className="w-5 h-5 text-ink-400 ml-1.5" />
            <button
              onClick={() => setTextScale((Math.max(1, textScale - 1)) as 1 | 2 | 3 | 4)}
              className="w-9 h-9 rounded-xl text-ink-600 hover:bg-cream-200 transition flex items-center justify-center font-bold text-lg"
              aria-label="Make text smaller"
            >
              A−
            </button>
            <button
              onClick={() => setTextScale((Math.min(4, textScale + 1)) as 1 | 2 | 3 | 4)}
              className="w-9 h-9 rounded-xl text-ink-600 hover:bg-cream-200 transition flex items-center justify-center font-bold text-xl"
              aria-label="Make text larger"
            >
              A+
            </button>
          </div>

          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-2 bg-cream-100 rounded-2xl px-3 sm:px-4 py-2.5 border border-cream-300 hover:bg-cream-200 transition font-semibold text-ink-700"
            >
              <Globe className="w-5 h-5 text-honey-600" />
              <span className="text-base">{current?.nativeLabel}</span>
              <ChevronDown className={`w-4 h-4 text-ink-400 transition ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-lift border border-cream-200 py-2 w-48 animate-scaleIn origin-top-right">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-cream-100 transition text-left"
                  >
                    <div>
                      <p className="font-bold text-ink-800 text-base">{lang.nativeLabel}</p>
                      <p className="text-sm text-ink-400">{lang.label}</p>
                    </div>
                    {language === lang.code && <Check className="w-5 h-5 text-honey-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
