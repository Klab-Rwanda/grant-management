import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { XCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useApp();
  
  const [email, setEmail] = useState('amani@tembo-agritech.example');
  const [password, setPassword] = useState('•••••••••');
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Normal direct role redirection based on email
    if (email.includes('admin') || email.includes('gov')) {
      switchRole('PLATFORM_ADMIN');
      navigate('/admin/tenants');
    } else if (email.includes('riverbend') || email.includes('invest') || email.includes('david')) {
      switchRole('INSTITUTION_OFFICER');
      navigate('/institution/dashboard');
    } else {
      switchRole('STARTUP_FOUNDER');
      navigate('/startup/dashboard');
    }
  };

  const handleQuickPersona = (role: UserRole) => {
    switchRole(role);
    if (role === 'STARTUP_FOUNDER') navigate('/startup/dashboard');
    else if (role === 'INSTITUTION_OFFICER') navigate('/institution/dashboard');
    else navigate('/admin/tenants');
  };

  return (
    <div className="min-h-screen flex bg-[#F7F5F0]">
      {/* Left Column: Deep Navy Brand Panel (Matching G-02) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#16213A] text-white p-12 flex-col justify-between">
        {/* Brand header */}
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-white text-[#16213A] flex items-center justify-center font-bold text-xs">
            G
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            Grant Ledger
          </span>
        </div>

        {/* Center Headline */}
        <div className="max-w-md my-auto">
          <h1 className="text-3xl font-serif font-normal leading-tight text-white mb-4">
            One sign-in for every workspace you belong to
          </h1>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            Founders, finance leads, reviewers and committee members each see only what their role allows.
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-[11px] text-[#94A3B8]">
          Accounts are created by invitation from a workspace admin.
        </div>
      </div>

      {/* Right Column: Sign In Form (Matching G-02) */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Sign in
            </h2>
            <span className="px-2.5 py-1 rounded-pill bg-[#FBF0D9] text-[#7A4A00] border border-[#F4DCAC] text-[11px] font-mono font-bold tracking-wider">
              SAMPLE DATA
            </span>
          </div>

          {/* Quick 1-Click Persona Bar */}
          <div className="p-3 bg-white border border-[#DDD8CC] rounded-lg shadow-ledger space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6275] block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#7A4A00]" />
              Quick Sample Personas:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersona('STARTUP_FOUNDER')}
                className="py-1.5 px-2 bg-[#F1EEE7] hover:bg-[#EAE6DE] rounded text-[11px] font-medium text-[#16213A] text-center border border-[#DDD8CC]"
              >
                🌾 Startup (Amani)
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersona('INSTITUTION_OFFICER')}
                className="py-1.5 px-2 bg-[#F1EEE7] hover:bg-[#EAE6DE] rounded text-[11px] font-medium text-[#16213A] text-center border border-[#DDD8CC]"
              >
                🏛️ Reviewer (David)
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersona('PLATFORM_ADMIN')}
                className="py-1.5 px-2 bg-[#F1EEE7] hover:bg-[#EAE6DE] rounded text-[11px] font-medium text-[#16213A] text-center border border-[#DDD8CC]"
              >
                ⚙️ Admin (Sara)
              </button>
            </div>
          </div>

          {/* Optional Error banner demo (as seen in G-02) */}
          {showError && (
            <div className="p-3.5 rounded-lg bg-[#FBE6E4] border border-[#F7C6C2] text-xs text-[#9B1C1C] flex items-start gap-2.5">
              <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9B1C1C]" />
              <div>
                <strong className="font-semibold block">Email or password is incorrect</strong>
                <span className="text-[11px]">4 attempts left before the account is locked for 15 minutes.</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#16213A] font-medium mb-1">
                Work email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[#16213A] font-medium">
                  Password
                </label>
                <Link to="/auth/forgot" className="text-[#0E6466] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-[#0E6466]"
              />
              <label htmlFor="remember" className="text-[#5A6275] cursor-pointer">
                Keep me signed in on this device for 12 hours
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium text-xs rounded-md shadow-sm transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-[11px] text-[#5A6275] text-center pt-2">
            Have an invitation? Open the link in your email to set your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-6 text-xs">
      <div className="w-full max-w-md bg-white border border-[#DDD8CC] rounded-lg p-8 shadow-ledger space-y-4">
        <h2 className="text-2xl font-serif text-[#16213A]">Accept Grantee Invitation</h2>
        <p className="text-[#5A6275]">Set your organization credentials to access your allocated tranche.</p>
        <div className="space-y-3 pt-2">
          <input type="text" placeholder="Full legal name" className="w-full p-2 border border-[#DDD8CC] rounded" />
          <input type="password" placeholder="Create strong password" className="w-full p-2 border border-[#DDD8CC] rounded" />
          <button onClick={() => navigate('/auth/login')} className="w-full py-2 bg-[#0E6466] text-white rounded font-medium">
            Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-6 text-xs">
      <div className="w-full max-w-md bg-white border border-[#DDD8CC] rounded-lg p-8 shadow-ledger space-y-4">
        <h2 className="text-2xl font-serif text-[#16213A]">Reset Password</h2>
        <p className="text-[#5A6275]">Enter your corporate email to receive a secure recovery token.</p>
        <input type="email" placeholder="name@company.com" className="w-full p-2 border border-[#DDD8CC] rounded" />
        <button onClick={() => navigate('/auth/login')} className="w-full py-2 bg-[#0E6466] text-white rounded font-medium">
          Send Recovery Link
        </button>
      </div>
    </div>
  );
};
