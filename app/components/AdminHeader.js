'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Accounting', href: '/accounting', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    )},
    { label: 'Users & Access', href: '/users', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )},
    { label: 'Products', href: '/products', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    )},
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: '72px',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/enterprise-logo-white.png"
            alt="ShopKite Enterprise Logo"
            width={160}
            height={36}
            priority
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
        </Link>
      </div>

      {/* Center Navigation Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px',
        borderRadius: '9999px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                background: isActive ? '#ff6600' : 'transparent',
                boxShadow: isActive ? '0 4px 15px rgba(255, 102, 0, 0.4)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right User & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6600 0%, #ff8c5a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            color: '#fff',
          }}>
            EA
          </div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)' }}>
            Enterprise Admin
          </div>
        </div>

        <Link
          href="/login"
          style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.5)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#ff6600'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
        >
          Sign Out
        </Link>
      </div>
    </header>
  );
}
