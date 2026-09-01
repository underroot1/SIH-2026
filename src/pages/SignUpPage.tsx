import { useApp } from '@/context/AppContext';
import { LANGUAGES, type Language } from '@/data/mockData';
import { useState } from 'react';
import { UserPlus, Eye, EyeOff, Check, ChevronDown, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export function SignUpPage() {
  const { navigate, setOnboardingStep, setPatientName, language, setLanguage } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(language);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please choose a password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Your passwords do not match. Please try again.');
      return;
    }
    if (password.length < 6) {
      setError('Your password is too short. Please use at least 6 characters.');
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: fullName.trim() } },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setLanguage(preferredLanguage);

    if (data.session) {
      // Email confirmation is off for this project — the account is
      // ready to use right away. Set the name immediately so the
      // onboarding screens don't wait on the profile row to load.
      setPatientName(fullName.trim());
      setOnboardingStep(0);
      navigate('onboarding');
    } else {
      // Email confirmation is required before a session is issued.
      setSuccess('Account created! Please check your email to confirm your account, then log in.');
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === preferredLanguage);

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="card-base p-8 max-w-md w-full animate-scaleIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center shadow-warm">
            <span className="text-white font-display font-extrabold text-2xl">S</span>
          </div>
          <h1 className="section-title text-3xl mb-1">Create your account</h1>
          <p className="text-ink-500 text-lg">Let's get started together.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-lg font-bold text-ink-700 mb-2">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border-2 border-cream-300 bg-white px-5 py-4 text-lg focus:border-honey-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="signupEmail" className="block text-lg font-bold text-ink-700 mb-2">Email</label>
            <input
              id="signupEmail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-2 border-cream-300 bg-white px-5 py-4 text-lg focus:border-honey-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-ink-700 mb-2">Preferred Language</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                className="w-full flex items-center justify-between rounded-2xl border-2 border-cream-300 bg-white px-5 py-4 text-lg focus:border-honey-400 focus:outline-none transition"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-honey-600" />
                  {currentLang?.nativeLabel}
                </span>
                <ChevronDown className={`w-5 h-5 text-ink-400 transition ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-lift border border-cream-200 py-2 z-10 animate-scaleIn origin-top">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setPreferredLanguage(lang.code as Language);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-cream-100 transition text-left"
                    >
                      <div>
                        <p className="font-bold text-ink-800 text-lg">{lang.nativeLabel}</p>
                        <p className="text-sm text-ink-400">{lang.label}</p>
                      </div>
                      {preferredLanguage === lang.code && <Check className="w-5 h-5 text-honey-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-bold text-ink-700 mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border-2 border-cream-300 bg-white px-5 py-4 pr-14 text-lg focus:border-honey-400 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-ink-400 hover:text-ink-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-bold text-ink-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border-2 border-cream-300 bg-white px-5 py-4 pr-14 text-lg focus:border-honey-400 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-ink-400 hover:text-ink-600"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-coral-600 font-semibold text-base bg-coral-50 rounded-xl px-4 py-3">{error}</p>
          )}
          {success && (
            <p className="text-sage-700 font-semibold text-base bg-sage-50 rounded-xl px-4 py-3">{success}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full text-xl">
            <UserPlus className="w-6 h-6" />
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-ink-500 text-lg">Already have an account?</p>
          <button
            onClick={() => navigate('login')}
            className="text-honey-600 font-bold text-lg hover:text-honey-700 transition mt-1"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
