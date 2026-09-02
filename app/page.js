import Link from 'next/link';
import GradientBackground from './components/GradientBackground';
import Nav from './components/Nav';
import DiamondIcon from './components/DiamondIcon';

export const metadata = {
  title: 'Enterprise',
  description: 'Enterprise landing page',
};

export default function Home() {
  return (
    <main>
      <Nav />
      <GradientBackground />
      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '0 24px',
        pointerEvents: 'auto',
        fontFamily: 'var(--font-roboto), sans-serif',
      }}>
        <DiamondIcon />
        <h1 className="hero-title">
          Let&rsquo;s{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#ffffff' }}>uncook</em>
          {' '}the books
        </h1>
        <p style={{
          margin: 0,
          fontSize: '17px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          maxWidth: '560px',
          lineHeight: 1.4,
          letterSpacing: '0.01em',
        }}>
          ShopKite Enterprise was built to untangle the complications of
          bookkeeping and provide businesses with a bird&rsquo;s-eye view of
          how their businesses are really progressing.
        </p>
        <div className="btn-group">
          <Link href="/login" className="btn">Get started</Link>
          <button className="btn">Book a demo</button>
        </div>
      </div>
    </main>
  );
}
