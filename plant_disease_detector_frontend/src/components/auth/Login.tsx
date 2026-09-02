import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Leaf } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:p-0">
      {/* Language Selector */}
      <div className="absolute right-4 top-4 z-20 rounded-xl border border-emerald-900/10 bg-white/70 backdrop-blur-lg">
        <LanguageSelector />
      </div>
      
      <section className="relative hidden overflow-hidden bg-[#12382d] p-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border-[60px] border-emerald-300/10" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-emerald-950"><Leaf className="h-7 w-7" /></div>
          <span className="text-xl font-bold">{t('app.title')}</span>
        </div>
        <div className="relative max-w-xl">
          <span className="mb-5 inline-flex rounded-full border border-emerald-200/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-emerald-200">AI-powered plant care</span>
          <h2 className="text-5xl font-bold leading-[1.08] tracking-tight">Healthier plants start with an early diagnosis.</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-emerald-50/70">Upload a leaf photo, identify possible disease, and get practical treatment guidance in moments.</p>
        </div>
        <p className="relative text-sm text-emerald-100/50">Fast insights · Clear recommendations · Better plant care</p>
      </section>

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center py-16 lg:min-h-0">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 shadow-xl shadow-emerald-900/20 lg:hidden">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{t('app.title')}</h1>
          <p className="text-gray-600">{t('app.subtitle')}</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="surface-card rounded-[2rem] p-7 sm:p-9">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('auth.login.title')}</h2>
            <p className="text-gray-600">{t('auth.login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-emerald-950/10 bg-white/80 px-4 py-3.5 transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                placeholder={t('auth.login.emailPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-emerald-950/10 bg-white/80 px-4 py-3.5 pr-12 transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  placeholder={t('auth.login.passwordPlaceholder')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-animate w-full rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 py-3.5 font-semibold text-white shadow-lg shadow-emerald-800/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? t('auth.login.signingIn') : t('auth.login.signIn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('auth.login.noAccount')}{' '}
              <Link 
                to="/signup" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                {t('auth.login.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
