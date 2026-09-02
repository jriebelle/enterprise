import Logo from './Logo';

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: '20px',
      right: '20px',
      zIndex: 100,
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      padding: '0',
    }}>
      <Logo />
    </nav>
  );
}
