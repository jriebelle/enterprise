'use client';

import Link from 'next/link';
import AdminSidebar from '../components/AdminSidebar';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Gross Volume',
      value: '₦48,820,050.00',
      change: '+14.2% from last month',
      subtext: 'Across all enterprise retail channels',
    },
    {
      title: 'Active Products (SKUs)',
      value: '25 Master SKUs',
      change: '22 in stock • 3 out of stock',
      subtext: 'FMCG & Pharmaceuticals catalog',
    },
    {
      title: 'B2B Invoiced & Receivables',
      value: '₦34,350,000.00',
      change: '5 Active customer accounts',
      subtext: 'Commercial quotes & customer statements',
    },
    {
      title: 'Monthly Staff Payroll',
      value: '₦6,750,000.00',
      change: '6 Staff on payroll roster',
      subtext: 'Disbursement & PAYE remittance ready',
    },
  ];

  const coreModules = [
    {
      title: 'Products (SKUs) & Catalog',
      description: 'Manage master SKUs, barcode registry, pack sizes, cost margins, selling prices, and bulk actions.',
      href: '/products',
      cta: 'Open Products List',
      tag: 'Master Data',
    },
    {
      title: 'Sales & Invoicing Suite',
      description: 'Create commercial price estimates/quotes, issue customer invoices, recurring cycles, and ledger statements.',
      href: '/accounting/sales',
      cta: 'Manage Sales & Invoices',
      tag: 'Accounting',
    },
    {
      title: 'Accounting & Financial Reports',
      description: 'Review real-time Profit & Loss (P&L), accounts receivable aging analysis, and VAT tax return summaries.',
      href: '/accounting/reports',
      cta: 'View Financial Reports',
      tag: 'Accounting',
    },
    {
      title: 'Staff Payroll & Remittances',
      description: 'Manage monthly staff salaries, PAYE tax withholding schedules, PenCom pensions, and bank disbursement batches.',
      href: '/accounting/payroll',
      cta: 'Manage Staff Payroll',
      tag: 'Accounting',
    },
    {
      title: 'Financial Ledger & Transactions',
      description: 'Inspect distributor settlements, pharmaceutical ledger entries, compliance fees, and bank reconciliations.',
      href: '/accounting',
      cta: 'View Transactions Ledger',
      tag: 'Operations',
    },
    {
      title: 'Users & Access Control',
      description: 'Configure Business Owner, Accounts Director, and Finance Manager roles with fine-grained module permissions.',
      href: '/users',
      cta: 'Manage Team Access',
      tag: 'Management',
    },
    {
      title: 'Upload History & Logs',
      description: 'Review comprehensive audit logs of all bulk CSV product imports, validation outcomes, and error reports.',
      href: '/products/upload-history',
      cta: 'View Upload Logs',
      tag: 'Master Data',
    },
  ];

  const recentActivity = [
    {
      id: 'ACT-401',
      title: 'Commercial Quote EST-2026-001 Issued',
      desc: 'MedPlus Pharmacy Group issued quote of ₦4,850,000.00 for bulk analgesics',
      time: '10 mins ago',
      category: 'Sales',
    },
    {
      id: 'ACT-402',
      title: 'August Payroll Cycle Processed',
      desc: 'Authorized ₦6,750,000.00 in gross wages and PAYE remittances for 6 staff',
      time: '25 mins ago',
      category: 'Payroll',
    },
    {
      id: 'ACT-403',
      title: 'Bulk CSV Upload Batch Processed',
      desc: 'Batch IMP-2026-0831-B4 (12 SKUs processed: 6 Successful, 2 Processing, 4 Failed)',
      time: '45 mins ago',
      category: 'Catalog',
    },
    {
      id: 'ACT-404',
      title: 'Emzor Pharma Supply Settlement Reconciled',
      desc: 'Transaction TXN-9021 of ₦14,850,000.00 marked as Settled in ledger',
      time: '2 hours ago',
      category: 'Finance',
    },
    {
      id: 'ACT-405',
      title: 'Staff Access Permissions Updated',
      desc: 'Accounts Director granted access to Sales, Invoicing, and Financial Reports',
      time: 'Yesterday',
      category: 'Access',
    },
  ];

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', minWidth: 0, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', boxSizing: 'border-box' }}>
          
          {/* Header & Page Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Executive <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Dashboard</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                High-level operational overview across master product catalogs, sales invoicing, staff payroll, and financial reports.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                href="/accounting/sales"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', color: '#64748b' }}
              >
                Sales & Quotes
              </Link>
              <Link
                href="/products"
                className="btn btn-primary"
                style={{ background: '#ff6600', color: '#ffffff', textDecoration: 'none' }}
              >
                Go to Products List ❯
              </Link>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', width: '100%' }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.title}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#ff6600', fontWeight: 600 }}>
                  <span>●</span> {stat.change}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{stat.subtext}</div>
              </div>
            ))}
          </div>

          {/* Core Enterprise Modules Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                Core Enterprise Modules
              </h2>
              <span style={{ fontSize: '13px', color: '#64748b' }}>7 Integrated systems</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {coreModules.map((mod, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                        {mod.title}
                      </h3>
                      <span className="badge badge-neutral" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {mod.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {mod.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={mod.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ff6600',
                        textDecoration: 'none',
                      }}
                    >
                      {mod.cta} ➔
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Operations Activity Log */}
          <div className="glass-card" style={{ padding: '0px', width: '100%', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                  Recent System & Operational Activity
                </h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Live operational audit trail across all enterprise modules
                </div>
              </div>
              <span className="badge badge-success">
                <span className="badge-dot"></span> System Live
              </span>
            </div>

            <div style={{ padding: '8px 24px 20px 24px', display: 'flex', flexDirection: 'column' }}>
              {recentActivity.map((act, i) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: i !== recentActivity.length - 1 ? '1px solid #f1f5f9' : 'none',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#ff6600',
                      marginTop: '6px',
                      flexShrink: 0,
                    }}></div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                          {act.title}
                        </span>
                        <span style={{ fontSize: '11px', color: '#94a3b8', background: '#f8fafc', padding: '1px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                          {act.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
                        {act.desc}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {act.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminSidebar>
  );
}
