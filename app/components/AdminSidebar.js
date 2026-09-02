'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Expandable Tree State
  const [expandedSections, setExpandedSections] = useState({
    accounting: true, // Accounting tree expanded by default
    sales: true,      // Sales sub-tree expanded by default
  });

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navSections = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          )
        },
      ]
    },
    {
      title: 'Products List & Master Data',
      items: [
        {
          label: 'Products (SKUs)',
          href: '/products',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          ),
          badge: 'App'
        },
        {
          label: 'Upload History',
          href: '/products/upload-history',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          )
        },
      ]
    },
    {
      title: 'Accounting',
      isTree: true,
      treeKey: 'accounting',
      items: [
        {
          label: 'Sales',
          href: '/accounting/sales',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4v16"></path>
              <path d="M6 4l12 16"></path>
              <path d="M18 4v16"></path>
              <path d="M4 10h16"></path>
              <path d="M4 14h16"></path>
            </svg>
          ),
          badge: 'Coming Soon',
          isSubTree: true,
          subTreeKey: 'sales',
          subItems: [
            { label: 'Invoices', href: '/accounting/sales?tab=invoices' },
            { label: 'Recurring invoices', href: '/accounting/sales?tab=recurring' },
            { label: 'Customers', href: '/accounting/sales?tab=customers' },
            { label: 'Customer Statement', href: '/accounting/sales?tab=statements' },
          ]
        },
        {
          label: 'Reports',
          href: '/accounting/reports',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          ),
          badge: 'Coming Soon'
        },
        {
          label: 'Payroll',
          href: '/accounting/payroll',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          ),
          badge: 'Coming Soon'
        },
      ]
    },
    {
      title: 'Operations & Management',
      items: [
        {
          label: 'Transactions',
          href: '/accounting',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 14 14"></polyline>
            </svg>
          ),
          badge: 'Coming Soon'
        },
        {
          label: 'Users & Access',
          href: '/users',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          )
        },
      ]
    }
  ];

  const getBreadcrumbTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/products':
        return 'Products (SKUs)';
      case '/products/upload-history':
        return 'Product Upload History';
      case '/products/bulk-upload-results':
      case '/products/bulk-upload':
        return 'Bulk Upload Status';
      case '/accounting/sales':
        return 'Sales & Invoicing';
      case '/accounting/reports':
        return 'Financial Reports';
      case '/accounting/payroll':
        return 'Staff Payroll';
      case '/users':
        return 'Users & Access Control';
      case '/accounting':
        return 'Transactions & Ledger';
      default:
        return 'Dashboard';
    }
  };

  const sidebarWidth = collapsed ? '76px' : '260px';

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', display: 'flex' }}>
      
      {/* ── Collapsible Left Sidebar ─────────────────────────── */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        zIndex: 50,
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxShadow: '2px 0 12px rgba(0,0,0,0.02)',
      }}>
        <div>
          {/* Sidebar Top: Logo & Toggle */}
          <div style={{
            height: '70px',
            padding: collapsed ? '0 12px' : '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid #f1f5f9',
            flexShrink: 0,
          }}>
            {!collapsed && (
              <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Image
                  src="/enterprise-logo.png"
                  alt="ShopKite Enterprise Logo"
                  width={140}
                  height={36}
                  priority
                  style={{ height: '36px', width: 'auto', display: 'block' }}
                />
              </Link>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label="Toggle Sidebar"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 102, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 102, 0, 0.3)';
                e.currentTarget.style.color = '#ff6600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#64748b';
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
                style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
              >
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            </button>
          </div>

          {/* Navigation Links with Tree Support */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navSections.map((section, idx) => {
              const isTreeOpen = section.isTree ? !!expandedSections[section.treeKey] : true;

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  
                  {/* Section Title / Tree Toggle Header */}
                  {!collapsed && (
                    <div
                      onClick={() => section.isTree && toggleSection(section.treeKey)}
                      style={{
                        padding: '8px 12px 4px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: section.isTree ? 'pointer' : 'default',
                        userSelect: 'none',
                      }}
                    >
                      <span>{section.title}</span>
                      {section.isTree && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isTreeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      )}
                    </div>
                  )}

                  {/* Section Items */}
                  {isTreeOpen && section.items.map((item, itemIdx) => {
                    const isActive = pathname === item.href;
                    const isSubTreeOpen = item.isSubTree ? !!expandedSections[item.subTreeKey] : false;

                    return (
                      <div key={itemIdx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        
                        {/* Parent Item Row */}
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                          <Link
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: collapsed ? 'center' : 'space-between',
                              padding: collapsed ? '12px' : '10px 14px',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: isActive ? 600 : 500,
                              textDecoration: 'none',
                              color: isActive ? '#ff6600' : '#475569',
                              background: isActive ? 'rgba(255, 102, 0, 0.08)' : 'transparent',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.color = '#1e293b';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#475569';
                              }
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ display: 'flex', alignItems: 'center', color: isActive ? '#ff6600' : '#64748b' }}>
                                {item.icon}
                              </span>
                              {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
                            </div>

                            {!collapsed && item.badge && (
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: 'rgba(255, 102, 0, 0.12)',
                                color: '#ff6600',
                              }}>
                                {item.badge}
                              </span>
                            )}
                          </Link>

                          {/* Subtree Expand Toggle Chevron */}
                          {!collapsed && item.isSubTree && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleSection(item.subTreeKey);
                              }}
                              style={{
                                width: '26px',
                                height: '26px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#94a3b8',
                                padding: 0,
                                marginRight: '4px',
                                borderRadius: '4px',
                              }}
                              title="Toggle section"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  transform: isSubTreeOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s ease',
                                }}
                              >
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Child Sub-items in Tree (e.g. Invoices, Recurring Invoices, Customers, Statements under Sales) */}
                        {!collapsed && item.isSubTree && isSubTreeOpen && item.subItems && (
                          <div style={{
                            marginLeft: '28px',
                            paddingLeft: '12px',
                            borderLeft: '1.5px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            marginVertical: '2px',
                          }}>
                            {item.subItems.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                style={{
                                  padding: '7px 10px',
                                  fontSize: '13px',
                                  color: '#64748b',
                                  textDecoration: 'none',
                                  borderRadius: '6px',
                                  transition: 'all 0.15s ease',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = '#ff6600';
                                  e.currentTarget.style.background = '#fff7ed';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#64748b';
                                  e.currentTarget.style.background = 'transparent';
                                }}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Admin User Info */}
        <div style={{
          padding: '16px 14px',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          flexShrink: 0,
        }}>
          {!collapsed ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6600 0%, #ff8c5a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  JR
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>Joshua Riebelle</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Business Owner</div>
                </div>
              </div>

              <Link
                href="/login"
                title="Sign Out"
                style={{
                  color: '#94a3b8',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ff6600'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              title="Sign Out"
              style={{
                color: '#94a3b8',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </Link>
          )}
        </div>
      </aside>

      {/* ── Main App Layout Wrapper ──────────────────────────── */}
      <div style={{
        flex: 1,
        marginLeft: sidebarWidth,
        transition: 'margin-left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: 0,
      }}>
        {/* Top Navbar */}
        <header style={{
          height: '70px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          {/* Breadcrumb Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
            <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
              Admin
            </Link>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>{getBreadcrumbTitle()}</span>
          </div>

          {/* Right Action Icons & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            <button
              title="Notifications"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                background: '#ff6600',
                borderRadius: '50%',
              }}></span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>

    </div>
  );
}
