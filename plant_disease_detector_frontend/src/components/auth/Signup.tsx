import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Leaf } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

const Signup = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const success = await signup(email, password, name);
    if (success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Failed to create account');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 lg:grid lg:grid-cols-[.9fr_1.1fr] lg:p-0">
      {/* Language Selector */}
      <div className="absolute right-4 top-4 z-20 rounded-xl border border-emerald-900/10 bg-white/70 backdrop-blur-lg">
        <LanguageSelector />
      </div>
      
      <section className="relative hidden overflow-hidden bg-[#12382d] p-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full border-[72px] border-emerald-300/10" />
        <div className="relative flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-emerald-950"><Leaf className="h-7 w-7" /></div><span className="text-xl font-bold">{t('app.title')}</span></div>
        <div className="relative max-w-lg"><p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-emerald-200">Grow with confidence</p><h2 className="text-5xl font-bold leading-[1.08] tracking-tight">Your personal plant health companion.</h2><p className="mt-6 text-lg leading-relaxed text-emerald-50/70">Keep your analyses organized and turn every scan into a clearer next step for your plants.</p></div>
        <p className="relative text-sm text-emerald-100/50">Built for growers, gardeners, and curious plant parents.</p>
      </section>

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center py-16">
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('auth.signup.title')}</h2>
            <p className="text-gray-600">{t('auth.signup.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.name')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-emerald-950/10 bg-white/80 px-4 py-3 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                placeholder={t('auth.signup.namePlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-emerald-950/10 bg-white/80 px-4 py-3 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                placeholder={t('auth.signup.emailPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-emerald-950/10 bg-white/80 px-4 py-3 pr-12 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  placeholder={t('auth.signup.passwordPlaceholder')}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.signup.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-emerald-950/10 bg-white/80 px-4 py-3 pr-12 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
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
              {isLoading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccount')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('auth.signup.haveAccount')}{' '}
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                {t('auth.signup.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
