'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import GradientBackground from '../../components/GradientBackground';
import Nav from '../../components/Nav';
import {
  login,
  requestPasswordReset,
  verifyResetCode,
  resetPassword,
} from '../../utils/accountsApi';

function PasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Feedback State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Extract email from query or session
  useEffect(() => {
    const queryEmail = searchParams.get('email');
    const sessionEmail = typeof window !== 'undefined' ? sessionStorage.getItem('login_email') : null;
    const resolvedEmail = queryEmail || sessionEmail || '';

    if (!resolvedEmail) {
      router.replace('/login');
      return;
    }

    setEmail(resolvedEmail);
    setForgotEmail(resolvedEmail);

    const savedEmail = localStorage.getItem('shopkite_saved_email');
    if (savedEmail && savedEmail.toLowerCase() === resolvedEmail.toLowerCase()) {
      setRememberMe(true);
    }
  }, [searchParams, router]);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const data = await login({ login: email, password });

      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        if (rememberMe) {
          localStorage.setItem('shopkite_saved_email', email);
        } else {
          localStorage.removeItem('shopkite_saved_email');
        }

        setSuccessMessage(data.message || 'Signed in successfully! Redirecting...');

        setTimeout(() => {
          router.push('/dashboard');
        }, 700);
      } else {
        setErrorMessage(data.message || 'Authentication failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid password. Please try again.');
      setLoading(false);
    }
  };

  // Open Forgot Password Modal
  const openForgotPassword = (e) => {
    e.preventDefault();
    setForgotEmail(email);
    setForgotStep(1);
    setForgotError('');
    setForgotSuccess('');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setShowForgotModal(true);
  };

  const closeForgotPassword = () => {
    setShowForgotModal(false);
    setForgotError('');
    setForgotSuccess('');
  };

  // Step 1: Request Password Reset OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your registered email address.');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await requestPasswordReset(forgotEmail);
      setForgotSuccess(res.message || 'A 6-digit reset code has been sent to your email.');
      setForgotLoading(false);
      setForgotStep(2);
    } catch (err) {
      setForgotError(err.message || 'Failed to send reset code. Please check your email.');
      setForgotLoading(false);
    }
  };

  // Step 2: Verify 6-digit Reset Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!resetCode.trim() || resetCode.trim().length < 4) {
      setForgotError('Please enter the verification code sent to your email.');
      return;
    }

    setForgotLoading(true);
    try {
      await verifyResetCode(forgotEmail, resetCode);
      setForgotSuccess('Code verified successfully. Now choose a new password.');
      setForgotLoading(false);
      setForgotStep(3);
    } catch (err) {
      setForgotError(err.message || 'The verification code is invalid or has expired.');
      setForgotLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!newPassword || newPassword.length < 6) {
      setForgotError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match. Please confirm your password.');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await resetPassword({
        email: forgotEmail,
        code: resetCode,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setForgotSuccess(res.message || 'Your password has been reset successfully!');
      setForgotLoading(false);
      setForgotStep(4);
      setPassword('');
    } catch (err) {
      setForgotError(err.message || 'Failed to reset password. Please try again.');
      setForgotLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 10,
        fontFamily: 'var(--font-roboto), sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 36px',
          borderRadius: '28px',
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 300,
              fontStyle: 'normal',
              color: '#fff',
              margin: '0 0 8px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Enter your <span style={{ color: '#ff6600', fontWeight: 500 }}>password</span>
          </h1>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Verify your identity to access your workspace
          </p>
        </div>

        {/* Selected Email Badge with Change Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span
              style={{
                fontSize: '13px',
                color: '#fff',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={email}
            >
              {email || 'Loading...'}
            </span>
          </div>
          <Link
            href="/login"
            style={{
              fontSize: '12px',
              color: '#ff6600',
              textDecoration: 'none',
              fontWeight: 500,
              flexShrink: 0,
              marginLeft: '8px',
            }}
          >
            Change
          </Link>
        </div>

        {/* Feedback Alert */}
        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              fontSize: '13px',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#86efac',
              fontSize: '13px',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.8)',
                  letterSpacing: '0.02em',
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={openForgotPassword}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '12px',
                  color: '#ff6600',
                  cursor: 'pointer',
                  fontWeight: 400,
                  fontFamily: 'inherit',
                }}
              >
                Forgot password?
              </button>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="input-field"
                disabled={loading}
                style={{ paddingRight: '42px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                accentColor: '#ff6600',
                width: '16px',
                height: '16px',
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor="remember"
              style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              Remember this device
            </label>
          </div>

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '15px',
              fontSize: '16px',
              opacity: loading ? 0.75 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.55)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
          }}
        >
          <Link
            href="/login"
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to email sign in
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeForgotPassword();
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: '#1c1c1c',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '36px 32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <button
              onClick={closeForgotPassword}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                {forgotStep === 1 && 'Reset Password'}
                {forgotStep === 2 && 'Enter Verification Code'}
                {forgotStep === 3 && 'Create New Password'}
                {forgotStep === 4 && 'Password Reset!'}
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', margin: 0, lineHeight: 1.5 }}>
                {forgotStep === 1 && 'Enter your registered email address and we will send you a 6-digit OTP code.'}
                {forgotStep === 2 && `We sent a 6-digit verification code to ${forgotEmail}. Code is valid for 60 minutes.`}
                {forgotStep === 3 && 'Choose a strong password with at least 6 characters.'}
                {forgotStep === 4 && 'Your password has been successfully updated. You can now sign in.'}
              </p>
            </div>

            {forgotError && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5',
                  fontSize: '13px',
                }}
              >
                {forgotError}
              </div>
            )}

            {forgotSuccess && forgotStep !== 4 && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#86efac',
                  fontSize: '13px',
                }}
              >
                {forgotSuccess}
              </div>
            )}

            {forgotStep === 1 && (
              <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="input-field"
                    disabled={forgotLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={forgotLoading}
                  style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                >
                  {forgotLoading ? 'Sending code...' : 'Send Verification Code'}
                </button>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={handleVerifyCode} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="input-field"
                    style={{ letterSpacing: '6px', fontSize: '20px', textAlign: 'center', fontWeight: 600 }}
                    disabled={forgotLoading}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotStep(1);
                      setForgotError('');
                    }}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '12px' }}
                    disabled={forgotLoading}
                  >
                    Change Email
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={forgotLoading}
                    style={{ flex: 2, padding: '12px' }}
                  >
                    {forgotLoading ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>
              </form>
            )}

            {forgotStep === 3 && (
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                    disabled={forgotLoading}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    disabled={forgotLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={forgotLoading}
                  style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                >
                  {forgotLoading ? 'Resetting...' : 'Reset & Save Password'}
                </button>
              </form>
            )}

            {forgotStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                  }}
                >
                  ✓
                </div>
                <p style={{ fontSize: '14px', color: '#e2e8f0', margin: 0 }}>
                  Password has been reset. You can now log into your account with your new password.
                </p>
                <button
                  type="button"
                  onClick={closeForgotPassword}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                >
                  Return to Password Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PasswordPage() {
  return (
    <main>
      <Nav />
      <GradientBackground />
      <Suspense
        fallback={
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              color: '#fff',
            }}
          >
            Loading...
          </div>
        }
      >
        <PasswordForm />
      </Suspense>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
