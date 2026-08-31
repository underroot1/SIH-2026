import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import { LogIn, Eye, EyeOff, Sun } from 'lucide-react';

export function LoginPage() {
  const { navigate, setAuthState, setPatientName } = useApp();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setPatientName(fullName.trim());
    setAuthState('authenticated');
    navigate('my-day');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="card-base p-8 max-w-md w-full animate-scaleIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center shadow-warm">
            <Sun className="w-9 h-9 text-white" />
          </div>
          <h1 className="section-title text-3xl mb-1">Welcome back</h1>
          <p className="text-ink-500 text-lg">We're happy to see you again.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="loginName" className="block text-lg font-bold text-ink-700 mb-2">Your Name</label>
            <input
              id="loginName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border-2 border-cream-300 bg-white px-5 py-4 text-lg focus:border-honey-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="loginPassword" className="block text-lg font-bold text-ink-700 mb-2">Password</label>
            <div className="relative">
              <input
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
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

          {error && (
            <p className="text-coral-600 font-semibold text-base bg-coral-50 rounded-xl px-4 py-3">{error}</p>
          )}

          <button type="submit" className="btn-primary w-full text-xl">
            <LogIn className="w-6 h-6" />
            Log In
          </button>
        </form>

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => navigate('signup')}
            className="text-honey-600 font-bold text-lg hover:text-honey-700 transition"
          >
            Create an account
          </button>
          <button
            onClick={() => setError('Please ask a family member to help you reset your password.')}
            className="text-ink-400 font-semibold text-base hover:text-ink-600 transition"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
