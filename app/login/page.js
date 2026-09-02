'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GradientBackground from '../components/GradientBackground';
import Nav from '../components/Nav';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <main>
      <Nav />
      <GradientBackground />

      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 10,
        fontFamily: 'var(--font-roboto), sans-serif',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 36px',
          borderRadius: '28px',
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 300,
              fontStyle: 'normal',
              color: '#fff',
              margin: '0 0 8px 0',
              letterSpacing: '-0.02em',
            }}>
              Welcome <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>back</span>
            </h1>
            <p style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
              lineHeight: 1.4,
            }}>
              Sign in to your ShopKite Enterprise workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: '0.02em',
              }}>
                Work Email
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.8)',
                  letterSpacing: '0.02em',
                }}>
                  Password
                </label>
                <a href="#forgot" style={{
                  fontSize: '12px',
                  color: '#ff6600',
                  textDecoration: 'none',
                  fontWeight: 400,
                }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="remember"
                style={{
                  accentColor: '#ff6600',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                }}
              />
              <label htmlFor="remember" style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                userSelect: 'none',
              }}>
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '15px',
                fontSize: '16px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.55)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
          }}>
            Don&rsquo;t have an enterprise account?{' '}
            <Link href="/" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}>
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
