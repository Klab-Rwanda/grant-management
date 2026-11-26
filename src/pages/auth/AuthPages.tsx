import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Landmark,
  ShieldCheck,
  Sparkles,
  Wallet,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useApp();
  
  const [email, setEmail] = useState('amani@tembo-agritech.example');
  const [password, setPassword] = useState('•••••••••');
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, _setShowError] = useState(false);

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

          <Link
            to="/auth/register"
            className="w-full py-2.5 px-4 bg-white border border-[#DDD8CC] hover:border-[#0E6466] text-[#0E6466] font-medium text-xs rounded-md shadow-sm transition flex items-center justify-center gap-2"
          >
            Create account with invitation <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <p className="text-[11px] text-[#5A6275] text-center pt-2">
            Have an invitation? Open the link in your email or create your account here.
          </p>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useApp();

  const [role, setRole] = useState<UserRole>('STARTUP_FOUNDER');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [invitationCode, setInvitationCode] = useState('GRANT-2026-ALPHA');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleOptions: { role: UserRole; label: string; icon: LucideIcon }[] = [
    { role: 'STARTUP_FOUNDER', label: 'Startup', icon: Wallet },
    { role: 'INSTITUTION_OFFICER', label: 'Reviewer', icon: Landmark },
    { role: 'PLATFORM_ADMIN', label: 'Admin', icon: ShieldCheck },
  ];

  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const passwordLabels = ['Enter a password', 'Weak', 'Fair', 'Good', 'Strong'];
  const passwordColors = ['bg-[#DDD8CC]', 'bg-[#9B1C1C]', 'bg-[#7A4A00]', 'bg-[#0E6466]', 'bg-[#1D5E3A]'];

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (!fullName.trim() || !workEmail.trim() || !organization.trim() || !invitationCode.trim()) {
      setError('Complete every field from your invitation before continuing.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      setError('Enter a valid work email address.');
      return;
    }
    if (password.length < 8) {
      setError('Create a password with at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!acceptTerms) {
      setError('Accept the workspace terms to finish registration.');
      return;
    }

    setError(null);
    switchRole(role);

    if (role === 'STARTUP_FOUNDER') navigate('/auth/onboarding');
    else if (role === 'INSTITUTION_OFFICER') navigate('/institution/dashboard');
    else navigate('/admin/tenants');
  };

  return (
    <div className="min-h-screen flex bg-[#F7F5F0]">
      <div className="hidden lg:flex lg:w-5/12 bg-[#16213A] text-white p-12 flex-col justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-white text-[#16213A] flex items-center justify-center font-bold text-xs">
            G
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">Grant Ledger</span>
        </div>

        <div className="max-w-md my-auto">
          <h1 className="text-3xl font-serif font-normal leading-tight text-white mb-4">
            Start from an invitation, land in the right workspace.
          </h1>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            Your organization, role and grant access are confirmed before your account is created. No open signups and
            no guesswork about permissions.
          </p>
          <div className="mt-8 space-y-3">
            {[
              'Set up your organization profile',
              'Choose your chart-of-accounts template',
              'Enter a workspace built for your role',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
                <CheckCircle2 className="w-4 h-4 text-[#8FD3D1] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-[#94A3B8]">
          Accounts are provisioned by a workspace administrator before registration.
        </div>
      </div>

      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-lg space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">Create your account</h2>
              <p className="text-[11px] text-[#5A6275] mt-1">Accept your invitation and set a secure password.</p>
            </div>
            <span className="px-2.5 py-1 rounded-pill bg-[#E5EEF9] text-[#1E4E8C] border border-[#CADDF4] text-[10px] font-mono font-bold tracking-wider shrink-0">
              INVITE ONLY
            </span>
          </div>

          <div className="p-3 bg-white border border-[#DDD8CC] rounded-lg shadow-ledger flex items-start gap-2.5">
            <Building2 className="w-4 h-4 mt-0.5 text-[#0E6466] shrink-0" />
            <p className="text-[11px] text-[#5A6275] leading-relaxed">
              Use the exact details from your invitation email. Your role determines the workspace you will see after
              setup.
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6275] block mb-2">
              I was invited as
            </span>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                const active = role === option.role;
                return (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => {
                      setRole(option.role);
                      setError(null);
                    }}
                    className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-md border text-[11px] font-medium transition ${
                      active
                        ? 'border-[#0E6466] bg-[#E5EEF9] text-[#0E6466]'
                        : 'border-[#DDD8CC] bg-[#F1EEE7] text-[#3E4A63] hover:border-[#8C8573]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[#FBE6E4] border border-[#F7C6C2] text-xs text-[#9B1C1C] flex items-start gap-2.5">
              <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Full legal name</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Work email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={workEmail}
                  onChange={(event) => setWorkEmail(event.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Organization</label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                  placeholder="BioGenix Labs Inc."
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Invitation code</label>
                <input
                  type="text"
                  required
                  value={invitationCode}
                  onChange={(event) => setInvitationCode(event.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Create password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-3 py-2 pr-10 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#5A6275] hover:text-[#0E6466]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <span
                        key={level}
                        className={`h-1 flex-1 rounded-full ${level <= passwordScore ? passwordColors[passwordScore] : 'bg-[#ECEAE4]'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#5A6275] w-16 text-right">{passwordLabels[passwordScore]}</span>
                </div>
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Confirm password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1.5 text-[10px] text-[#9B1C1C]">Passwords do not match.</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="register-terms"
                checked={acceptTerms}
                onChange={(event) => setAcceptTerms(event.target.checked)}
                className="mt-0.5 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-[#0E6466]"
              />
              <label htmlFor="register-terms" className="text-[11px] text-[#5A6275] cursor-pointer leading-relaxed">
                I confirm the invitation details are correct and agree to the workspace access and audit terms.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium text-xs rounded-md shadow-sm transition flex items-center justify-center gap-2"
            >
              Complete registration <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[11px] text-[#5A6275] text-center">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-[#0E6466] hover:underline font-medium">
              Sign in
            </Link>
          </p>
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
