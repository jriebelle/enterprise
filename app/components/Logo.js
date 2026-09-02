import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
      <Image
        src="/enterprise-logo-white.png"
        alt="Enterprise Logo"
        width={180}
        height={40}
        priority
        style={{
          height: '40px',
          width: 'auto',
          display: 'block',
          marginTop: '10px',
        }}
      />
    </Link>
  );
}
