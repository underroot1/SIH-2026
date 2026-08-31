import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { type Language, type TextScale } from '@/data/mockData';
import i18n from '@/i18n';

export type Route =
  | 'my-day'
  | 'play'
  | 'memories'
  | 'memory-detail'
  | 'people'
  | 'person-detail'
  | 'help'
  | 'reminder'
  | 'signup'
  | 'login'
  | 'onboarding'
  | 'caregiver-dashboard';

export type AuthState = 'guest' | 'authenticated' | 'onboarding';

export type OnboardingStep = 0 | 1 | 2 | 3 | 4 | 5;

interface AppState {
  route: Route;
  navigate: (route: Route, params?: Record<string, string>) => void;
  goBack: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  selectedMemoryId: string | null;
  selectedPersonId: string | null;
  activeReminderId: string | null;
  setActiveReminderId: (id: string | null) => void;
  patientName: string;
  setPatientName: (name: string) => void;
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  onboardingStep: OnboardingStep;
  setOnboardingStep: (step: OnboardingStep) => void;
  isCaregiverMode: boolean;
  setCaregiverMode: (val: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>('login');
  const [history, setHistory] = useState<Route[]>([]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState<Language>('en');
  const [textScale, setTextScale] = useState<TextScale>(2);
  const [activeReminderId, setActiveReminderId] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('Amar');
  const [authState, setAuthState] = useState<AuthState>('guest');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(0);
  const [isCaregiverMode, setIsCaregiverMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-scale-1', 'text-scale-2', 'text-scale-3', 'text-scale-4');
    root.classList.add(`text-scale-${textScale}`);
  }, [textScale]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const navigate = (newRoute: Route, newParams: Record<string, string> = {}) => {
    setHistory((h) => [...h, route]);
    setRoute(newRoute);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setHistory((h) => {
      if (h.length === 0) {
        setRoute('my-day');
        return h;
      }
      const prev = h[h.length - 1];
      setRoute(prev);
      return h.slice(0, -1);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value: AppState = {
    route,
    navigate,
    goBack,
    language,
    setLanguage,
    textScale,
    setTextScale,
    selectedMemoryId: params.memoryId ?? null,
    selectedPersonId: params.personId ?? null,
    activeReminderId,
    setActiveReminderId,
    patientName,
    setPatientName,
    authState,
    setAuthState,
    onboardingStep,
    setOnboardingStep,
    isCaregiverMode,
    setCaregiverMode: setIsCaregiverMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}