'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GradientBackground from '../components/GradientBackground';
import Nav from '../components/Nav';
import { checkEmail } from '../utils/accountsApi';

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('shopkite_saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // Handle email submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your work email address.');
      return;
    }

    setLoading(true);

    try {
      const result = await checkEmail(trimmedEmail);

      if (result && (result.exists || result.registered)) {
        // Email is registered -> Route to dedicated password page
        sessionStorage.setItem('login_email', trimmedEmail);
        router.push(`/login/password?email=${encodeURIComponent(trimmedEmail)}`);
      } else {
        // Email is not registered -> Route to accounts registration
        const accountsUrl = new URL('https://accounts.shopkite.com.ng/register');
        accountsUrl.searchParams.set('signup', 'enterprise');
        accountsUrl.searchParams.set('email', trimmedEmail);
        window.location.href = accountsUrl.toString();
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(
        err.message || 'Unable to verify email address. Please check your connection and try again.'
      );
    }
  };

  return (
    <main>
      <Nav />
      <GradientBackground />

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
                fontSize: '36px',
                fontWeight: 300,
                fontStyle: 'normal',
                color: '#fff',
                margin: '0 0 8px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome{' '}
              <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>
                back
              </span>
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
              Sign in to your ShopKite Enterprise workspace
            </p>
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

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.8)',
                  letterSpacing: '0.02em',
                }}
              >
                Work Email
              </label>
              <input
                type="email"
                required
                autoFocus
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="input-field"
                disabled={loading}
              />
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
                  <span>Checking account...</span>
                </>
              ) : (
                'Continue'
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
            Don&rsquo;t have an enterprise account?{' '}
            <Link
              href="/"
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>

      {/* Global CSS helper for spinner animation */}
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
