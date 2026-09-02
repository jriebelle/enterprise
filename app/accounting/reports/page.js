'use client';

import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const pnlSummary = [
  { category: 'Operating Revenue', items: [
    { name: 'Gross Pharmaceutical Sales', amount: 84500000.00 },
    { name: 'FMCG Packaged Goods Distribution', amount: 62400000.00 },
    { name: 'Household & Personal Care Revenue', amount: 28900000.00 },
  ], total: 175800000.00 },
  { category: 'Cost of Goods Sold (COGS)', items: [
    { name: 'Manufacturer Inventory Procurement', amount: -112400000.00 },
    { name: 'Logistics, Haulage & Freight', amount: -8600000.00 },
    { name: 'Packaging & Warehouse Handling', amount: -3200000.00 },
  ], total: -124200000.00 },
  { category: 'Operating Expenses (OPEX)', items: [
    { name: 'Staff Wages & Payroll Remittances', amount: -14500000.00 },
    { name: 'Software Infrastructure & Cloud Hosting', amount: -2800000.00 },
    { name: 'Regulatory & NAFDAC Compliance Fees', amount: -1750000.00 },
  ], total: -19050000.00 },
];

const customerAging = [
  { customer: 'Shoprite Supermarkets Nigeria', total: 45200000.00, current: 45200000.00, days30: 0.00, days60: 0.00, days90Plus: 0.00 },
  { customer: 'MedPlus Pharmacy Group', total: 8450000.00, current: 4450000.00, days30: 4000000.00, days60: 0.00, days90Plus: 0.00 },
  { customer: 'Ebeano Supermarket', total: 3900000.00, current: 0.00, days30: 0.00, days60: 3900000.00, days90Plus: 0.00 },
  { customer: 'Justrite Superstores', total: 1200000.00, current: 0.00, days30: 1200000.00, days60: 0.00, days90Plus: 0.00 },
];

export default function AccountingReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2026-Q3');
  const [activeReportTab, setActiveReportTab] = useState('pnl');

  const formatNaira = (amt) => {
    const isNeg = amt < 0;
    const abs = Math.abs(amt);
    const str = `₦${abs.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return isNeg ? `(${str})` : str;
  };

  const grossProfit = 175800000.00 - 124200000.00; // 51,600,000
  const netIncome = grossProfit - 19050000.00; // 32,550,000

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', minWidth: 0, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>

          {/* Header & Page Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Accounting & <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Financial Reports</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Comprehensive financial statements, profit & loss analysis, customer aging balances, and tax reconciliation.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                className="input-field"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{ fontSize: '13px', padding: '8px 12px', width: 'auto' }}
              >
                <option value="2026-Q3">Q3 2026 (Current Period)</option>
                <option value="2026-Q2">Q2 2026 (Apr - Jun)</option>
                <option value="2026-Q1">Q1 2026 (Jan - Mar)</option>
                <option value="2025-FY">Full Year 2025</option>
              </select>

              <button className="btn btn-secondary" onClick={() => alert('Exporting report...')}>
                Export PDF / CSV
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', width: '100%' }}>
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Operating Gross Revenue</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{formatNaira(175800000)}</span>
              <span style={{ fontSize: '12px', color: '#ff6600', fontWeight: 600 }}>+18.4% vs last quarter</span>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Gross Operating Margin</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{formatNaira(grossProfit)}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>29.35% margin ratio</span>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Net Period Profit</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#ff6600' }}>{formatNaira(netIncome)}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>After OPEX & statutory deductions</span>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Accounts Receivable</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#475569' }}>{formatNaira(13550000)}</span>
              <span style={{ fontSize: '12px', color: '#ff6600' }}>₦3.9M aging &gt; 60 days</span>
            </div>
          </div>

          {/* Report Sub-tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            {[
              { key: 'pnl', label: 'Profit & Loss Statement' },
              { key: 'aging', label: 'Accounts Receivable Aging' },
              { key: 'tax', label: 'Tax & VAT Summary' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveReportTab(tab.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: activeReportTab === tab.key ? 600 : 400,
                  background: activeReportTab === tab.key ? '#fff7ed' : 'transparent',
                  color: activeReportTab === tab.key ? '#ff6600' : '#64748b',
                  border: activeReportTab === tab.key ? '1px solid #ffedd5' : '1px solid transparent',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Report 1: Profit & Loss Statement */}
          {activeReportTab === 'pnl' && (
            <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 600, color: '#1e293b' }}>
                    Income Statement (Profit & Loss)
                  </h3>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                    For the period ending 31 August 2026 • Reporting Currency: NGN (₦)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {pnlSummary.map((sec, idx) => (
                  <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{sec.category}</span>
                      <span>{formatNaira(sec.total)}</span>
                    </div>
                    <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column' }}>
                      {sec.items.map((item, itemIdx) => (
                        <div key={itemIdx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: itemIdx === sec.items.length - 1 ? 'none' : '1px solid #f1f5f9', fontSize: '13.5px' }}>
                          <span style={{ color: '#475569' }}>{item.name}</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{formatNaira(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Net Income Summary Banner */}
                <div style={{ padding: '18px 20px', background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>Net Operating Profit</div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Retained earnings for current quarter</span>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff6600' }}>
                    {formatNaira(netIncome)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Report 2: Aging Schedule */}
          {activeReportTab === 'aging' && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                Accounts Receivable Aging Breakdown
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Total outstanding</th>
                      <th>Current (0-30d)</th>
                      <th>31 - 60 days</th>
                      <th>61 - 90 days</th>
                      <th>90+ days overdue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerAging.map((c, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{c.customer}</td>
                        <td style={{ fontWeight: 700, color: '#1e293b' }}>{formatNaira(c.total)}</td>
                        <td style={{ color: '#1e293b' }}>{formatNaira(c.current)}</td>
                        <td style={{ color: '#475569' }}>{formatNaira(c.days30)}</td>
                        <td style={{ color: '#475569' }}>{formatNaira(c.days60)}</td>
                        <td style={{ color: '#475569' }}>{formatNaira(c.days90Plus)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report 3: Tax Summary */}
          {activeReportTab === 'tax' && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                Value Added Tax (VAT 7.5%) & Withholding Tax Summary
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Tax category</th>
                      <th>Taxable revenue basis</th>
                      <th>Output tax collected</th>
                      <th>Input tax paid</th>
                      <th>Net tax payable to FIRS</th>
                      <th>Filing status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Standard Output VAT (7.5%)</td>
                      <td>₦175,800,000.00</td>
                      <td style={{ color: '#1e293b', fontWeight: 600 }}>₦13,185,000.00</td>
                      <td style={{ color: '#64748b' }}>₦9,315,000.00</td>
                      <td style={{ color: '#ff6600', fontWeight: 700 }}>₦3,870,000.00</td>
                      <td><span className="badge badge-success"><span className="badge-dot"></span> Ready to File</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Withholding Tax (WHT 5%)</td>
                      <td>₦42,500,000.00</td>
                      <td style={{ color: '#1e293b', fontWeight: 600 }}>₦2,125,000.00</td>
                      <td style={{ color: '#64748b' }}>₦0.00</td>
                      <td style={{ color: '#ff6600', fontWeight: 700 }}>₦2,125,000.00</td>
                      <td><span className="badge badge-warning"><span className="badge-dot"></span> Pending Remittance</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </AdminSidebar>
  );
}
