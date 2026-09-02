'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '../../components/AdminSidebar';

// Mock Data for Estimates / Quotes
const initialQuotes = [
  { id: 'EST-2026-001', customer: 'MedPlus Pharmacy Group', date: '2026-08-30', expiryDate: '2026-09-30', total: 4850000.00, itemsCount: 4, status: 'Sent', notes: 'Bulk order of analgesics & antibiotics' },
  { id: 'EST-2026-002', customer: 'Shoprite Supermarkets Nigeria', date: '2026-08-28', expiryDate: '2026-09-28', total: 12400000.00, itemsCount: 12, status: 'Accepted', notes: 'FMCG packaged foods & beverage restocking' },
  { id: 'EST-2026-003', customer: 'HealthPlus Ltd', date: '2026-08-25', expiryDate: '2026-09-10', total: 3200000.00, itemsCount: 3, status: 'Draft', notes: 'Nutritional supplements quarterly contract' },
  { id: 'EST-2026-004', customer: 'Spar Hypermarkets', date: '2026-08-15', expiryDate: '2026-08-30', total: 8900000.00, itemsCount: 8, status: 'Expired', notes: 'Household cleaning supplies promo pack' },
  { id: 'EST-2026-005', customer: 'Alpha Pharmacy & Stores', date: '2026-08-12', expiryDate: '2026-09-12', total: 1750000.00, itemsCount: 2, status: 'Sent', notes: 'First aid kits & medical supplies' },
];

// Mock Data for Invoices
const initialInvoices = [
  { id: 'INV-2026-8801', customer: 'Shoprite Supermarkets Nigeria', issueDate: '2026-08-29', dueDate: '2026-09-29', amount: 12400000.00, balanceDue: 0.00, status: 'Paid' },
  { id: 'INV-2026-8802', customer: 'MedPlus Pharmacy Group', issueDate: '2026-08-20', dueDate: '2026-09-20', amount: 8450000.00, balanceDue: 8450000.00, status: 'Pending' },
  { id: 'INV-2026-8803', customer: 'Ebeano Supermarket', issueDate: '2026-08-10', dueDate: '2026-08-24', amount: 3900000.00, balanceDue: 3900000.00, status: 'Overdue' },
  { id: 'INV-2026-8804', customer: 'Justrite Superstores', issueDate: '2026-08-05', dueDate: '2026-09-05', amount: 6200000.00, balanceDue: 1200000.00, status: 'Partially Paid' },
  { id: 'INV-2026-8805', customer: 'HealthPlus Ltd', issueDate: '2026-08-02', dueDate: '2026-09-02', amount: 4150000.00, balanceDue: 0.00, status: 'Paid' },
];

// Mock Data for Recurring Invoices
const initialRecurringInvoices = [
  { id: 'REC-101', customer: 'MedPlus Pharmacy Group', profile: 'Monthly Pharmaceuticals Supply', frequency: 'Monthly', nextDate: '2026-09-01', amount: 8450000.00, status: 'Active' },
  { id: 'REC-102', customer: 'Shoprite Supermarkets Nigeria', profile: 'Bi-Weekly FMCG Replenishment', frequency: 'Bi-Weekly', nextDate: '2026-09-10', amount: 6200000.00, status: 'Active' },
  { id: 'REC-103', customer: 'Spar Hypermarkets', profile: 'Quarterly Cleaning Detergents', frequency: 'Quarterly', nextDate: '2026-10-01', amount: 4800000.00, status: 'Paused' },
  { id: 'REC-104', customer: 'Ebeano Supermarket', profile: 'Monthly Cereal & Beverages Pack', frequency: 'Monthly', nextDate: '2026-09-05', amount: 3100000.00, status: 'Active' },
];

// Mock Data for Customers
const initialCustomers = [
  { id: 'CUST-001', name: 'MedPlus Pharmacy Group', contact: 'Dr. Chidi Okafor', email: 'procurement@medplus.ng', phone: '+234 803 123 4567', totalInvoiced: 28500000.00, outstanding: 8450000.00, status: 'Active' },
  { id: 'CUST-002', name: 'Shoprite Supermarkets Nigeria', contact: 'Adeola Adeleke', email: 'vendors@shoprite.ng', phone: '+234 802 987 6543', totalInvoiced: 45200000.00, outstanding: 0.00, status: 'Active' },
  { id: 'CUST-003', name: 'HealthPlus Ltd', contact: 'Bukola Daniels', email: 'b.daniels@healthplus.ng', phone: '+234 805 555 7890', totalInvoiced: 16800000.00, outstanding: 0.00, status: 'Active' },
  { id: 'CUST-004', name: 'Ebeano Supermarket', contact: 'Emeka Nwosu', email: 'invoices@ebeano.com', phone: '+234 809 333 2211', totalInvoiced: 12400000.00, outstanding: 3900000.00, status: 'Active' },
  { id: 'CUST-005', name: 'Justrite Superstores', contact: 'Fatima Ibrahim', email: 'accounts@justrite.ng', phone: '+234 818 777 4433', totalInvoiced: 19600000.00, outstanding: 1200000.00, status: 'Active' },
];

// Mock Statement Entries
const initialStatementEntries = [
  { date: '2026-08-01', type: 'Opening Balance', reference: 'BAL-FWD', amount: 0.00, balance: 0.00 },
  { date: '2026-08-05', type: 'Invoice', reference: 'INV-2026-8802', amount: 8450000.00, balance: 8450000.00 },
  { date: '2026-08-15', type: 'Payment (Bank Transfer)', reference: 'PAY-7701', amount: -4000000.00, balance: 4450000.00 },
  { date: '2026-08-20', type: 'Invoice', reference: 'INV-2026-8815', amount: 4000000.00, balance: 8450000.00 },
];

function SalesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(tabParam || 'quotes');
  const [search, setSearch] = useState('');

  // Sync state if URL query param changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    router.push(`/accounting/sales?tab=${tabKey}`, { scroll: false });
  };

  // Quotes state
  const [quotes, setQuotes] = useState(initialQuotes);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [newQuoteCustomer, setNewQuoteCustomer] = useState('MedPlus Pharmacy Group');
  const [newQuoteAmount, setNewQuoteAmount] = useState('');
  const [newQuoteNotes, setNewQuoteNotes] = useState('');

  // Invoices state
  const [invoices, setInvoices] = useState(initialInvoices);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Recurring state
  const [recurring, setRecurring] = useState(initialRecurringInvoices);

  // Customers state
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedStatementCustomer, setSelectedStatementCustomer] = useState('MedPlus Pharmacy Group');

  const formatNaira = (amt) => `₦${Number(amt).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleCreateQuote = (e) => {
    e.preventDefault();
    const newQ = {
      id: `EST-2026-00${quotes.length + 1}`,
      customer: newQuoteCustomer,
      date: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      total: parseFloat(newQuoteAmount) || 0,
      itemsCount: 5,
      status: 'Sent',
      notes: newQuoteNotes || 'Standard Commercial Quotation',
    };
    setQuotes([newQ, ...quotes]);
    setShowQuoteModal(false);
    setNewQuoteAmount('');
    setNewQuoteNotes('');
  };

  const getQuoteStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="badge badge-success"><span className="badge-dot"></span> Accepted</span>;
      case 'Sent':
        return <span className="badge badge-info"><span className="badge-dot"></span> Sent</span>;
      case 'Draft':
        return <span className="badge badge-neutral"><span className="badge-dot"></span> Draft</span>;
      case 'Expired':
        return <span className="badge badge-danger"><span className="badge-dot"></span> Expired</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  const getInvoiceStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <span className="badge badge-success"><span className="badge-dot"></span> Paid</span>;
      case 'Pending':
        return <span className="badge badge-warning"><span className="badge-dot"></span> Pending</span>;
      case 'Overdue':
        return <span className="badge badge-danger"><span className="badge-dot"></span> Overdue</span>;
      case 'Partially Paid':
        return <span className="badge badge-info"><span className="badge-dot"></span> Partial</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', minWidth: 0, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>

          {/* Header & Page Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Sales & <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Invoicing</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Manage customer quotations, issued invoices, recurring billing cycles, and client ledger statements.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {activeTab === 'quotes' && (
                <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => setShowQuoteModal(true)}>
                  <span>+</span> Create Estimate / Quote
                </button>
              )}
              {activeTab === 'invoices' && (
                <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => alert('New Invoice Generator ready.')}>
                  <span>+</span> Create Invoice
                </button>
              )}
              {activeTab === 'recurring' && (
                <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => alert('Recurring Profile creator ready.')}>
                  <span>+</span> Set Up Recurring Invoice
                </button>
              )}
              {activeTab === 'customers' && (
                <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => alert('New Customer Form ready.')}>
                  <span>+</span> Add Customer
                </button>
              )}
            </div>
          </div>

          {/* KPI Mini Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', width: '100%' }}>
            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>Active Estimates / Quotes</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{quotes.length} Quotes</span>
              <span style={{ fontSize: '12px', color: '#ff6600', fontWeight: 500 }}>{formatNaira(quotes.reduce((acc, q) => acc + q.total, 0))}</span>
            </div>

            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>Total Invoiced (This Month)</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{formatNaira(invoices.reduce((acc, i) => acc + i.amount, 0))}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>5 Invoices issued</span>
            </div>

            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>Outstanding Balance Due</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#475569' }}>{formatNaira(invoices.reduce((acc, i) => acc + i.balanceDue, 0))}</span>
              <span style={{ fontSize: '12px', color: '#ff6600', fontWeight: 500 }}>1 Overdue invoice</span>
            </div>

            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>Active B2B Customers</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{customers.length} Accounts</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>100% verified</span>
            </div>
          </div>

          {/* Top Sales Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            {[
              { key: 'quotes', label: 'Estimates / Quote', count: quotes.length },
              { key: 'invoices', label: 'Invoices', count: invoices.length },
              { key: 'recurring', label: 'Recurring Invoices', count: recurring.length },
              { key: 'customers', label: 'Customers', count: customers.length },
              { key: 'statements', label: 'Customer Statement', count: null },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  background: activeTab === tab.key ? '#fff7ed' : 'transparent',
                  color: activeTab === tab.key ? '#ff6600' : '#64748b',
                  border: activeTab === tab.key ? '1px solid #ffedd5' : '1px solid transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span style={{
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    background: activeTab === tab.key ? '#ff6600' : '#f1f5f9',
                    color: activeTab === tab.key ? '#ffffff' : '#64748b',
                    fontWeight: 600,
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* TAB 1: Estimates / Quotes */}
          {activeTab === 'quotes' && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                  Commercial Estimates & Price Quotes
                </h3>
                <input
                  type="text"
                  placeholder="Search quote # or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field"
                  style={{ maxWidth: '280px', fontSize: '13px', padding: '8px 12px' }}
                />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Quote number</th>
                      <th>Customer name</th>
                      <th>Issue date</th>
                      <th>Expiry date</th>
                      <th>Total value</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.filter(q => q.id.toLowerCase().includes(search.toLowerCase()) || q.customer.toLowerCase().includes(search.toLowerCase())).map((q) => (
                      <tr key={q.id}>
                        <td style={{ fontWeight: 600, fontFamily: 'monospace', color: '#ff6600' }}>{q.id}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{q.customer}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{q.notes}</div>
                        </td>
                        <td>{q.date}</td>
                        <td>{q.expiryDate}</td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{formatNaira(q.total)}</td>
                        <td>{getQuoteStatusBadge(q.status)}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => alert(`Converting ${q.id} to invoice...`)}>
                              Convert to Invoice
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px', display: 'inline-flex', alignItems: 'center' }} title="Send via Email">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Invoices */}
          {activeTab === 'invoices' && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                  Customer Invoices & Receivables
                </h3>
                <input
                  type="text"
                  placeholder="Search invoice # or customer..."
                  className="input-field"
                  style={{ maxWidth: '280px', fontSize: '13px', padding: '8px 12px' }}
                />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Invoice number</th>
                      <th>Customer name</th>
                      <th>Issue date</th>
                      <th>Due date</th>
                      <th>Total amount</th>
                      <th>Balance due</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td style={{ fontWeight: 600, fontFamily: 'monospace', color: '#ff6600' }}>{inv.id}</td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{inv.customer}</td>
                        <td>{inv.issueDate}</td>
                        <td>{inv.dueDate}</td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{formatNaira(inv.amount)}</td>
                        <td style={{ fontWeight: 600, color: inv.balanceDue > 0 ? '#475569' : '#1e293b' }}>{formatNaira(inv.balanceDue)}</td>
                        <td>{getInvoiceStatusBadge(inv.status)}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => alert(`Viewing invoice ${inv.id}`)}>
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Recurring Invoices */}
          {activeTab === 'recurring' && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                  Automated Recurring Invoices Schedules
                </h3>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Schedule profile</th>
                      <th>Customer name</th>
                      <th>Billing frequency</th>
                      <th>Next invoice date</th>
                      <th>Cycle amount</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recurring.map((rec) => (
                      <tr key={rec.id}>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>
                          <div>{rec.profile}</div>
                          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8' }}>{rec.id}</span>
                        </td>
                        <td>{rec.customer}</td>
                        <td>
                          <span className="badge badge-neutral">{rec.frequency}</span>
                        </td>
                        <td>{rec.nextDate}</td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{formatNaira(rec.amount)}</td>
                        <td>
                          <span className="badge badge-success">
                            <span className="badge-dot"></span> {rec.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                            Edit Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Customers Directory */}
          {activeTab === 'customers' && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                  B2B Customer Directory & Accounts
                </h3>
                <input
                  type="text"
                  placeholder="Search company or email..."
                  className="input-field"
                  style={{ maxWidth: '280px', fontSize: '13px', padding: '8px 12px' }}
                />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Customer company</th>
                      <th>Primary contact</th>
                      <th>Email & phone</th>
                      <th>Total invoiced</th>
                      <th>Outstanding</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{c.name}</div>
                          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#ff6600' }}>{c.id}</span>
                        </td>
                        <td>{c.contact}</td>
                        <td>
                          <div>{c.email}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{c.phone}</div>
                        </td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{formatNaira(c.totalInvoiced)}</td>
                        <td style={{ fontWeight: 600, color: c.outstanding > 0 ? '#475569' : '#1e293b' }}>{formatNaira(c.outstanding)}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '12px' }}
                            onClick={() => {
                              setSelectedStatementCustomer(c.name);
                              handleTabChange('statements');
                            }}
                          >
                            View Statement
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: Customer Statement */}
          {activeTab === 'statements' && (
            <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 600, color: '#1e293b' }}>
                    Client Statement of Account
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Generate detailed historical transaction statements and open receivables.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-secondary" style={{ padding: '7px 14px', fontSize: '13px' }} onClick={() => alert('Exporting PDF statement...')}>
                    Download PDF Statement
                  </button>
                  <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff', padding: '7px 14px', fontSize: '13px' }} onClick={() => alert(`Emailing statement to ${selectedStatementCustomer}...`)}>
                    Email to Client
                  </button>
                </div>
              </div>

              {/* Customer Selector & Filter Bar */}
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Select Customer</label>
                  <select
                    className="input-field"
                    value={selectedStatementCustomer}
                    onChange={(e) => setSelectedStatementCustomer(e.target.value)}
                    style={{ fontSize: '13px', padding: '8px 12px' }}
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Date Range</label>
                  <select className="input-field" defaultValue="30" style={{ fontSize: '13px', padding: '8px 12px' }}>
                    <option value="30">Last 30 Days (August 2026)</option>
                    <option value="90">Last Quarter (Q2 2026)</option>
                    <option value="365">Year to Date (2026)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Closing Balance Due</label>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', paddingTop: '4px' }}>
                    {formatNaira(8450000.00)}
                  </div>
                </div>
              </div>

              {/* Statement Ledger Table */}
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction type</th>
                      <th>Reference #</th>
                      <th>Amount</th>
                      <th>Running balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialStatementEntries.map((entry, idx) => (
                      <tr key={idx}>
                        <td>{entry.date}</td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>{entry.type}</td>
                        <td style={{ fontFamily: 'monospace', color: '#ff6600' }}>{entry.reference}</td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>
                          {entry.amount === 0 ? '—' : formatNaira(entry.amount)}
                        </td>
                        <td style={{ fontWeight: 700, color: '#1e293b' }}>
                          {formatNaira(entry.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal: Create Quote / Estimate */}
      {showQuoteModal && (
        <div className="modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '480px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                Create New Commercial Estimate
              </h2>
              <button
                onClick={() => setShowQuoteModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuote} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Select Customer</label>
                <select
                  className="input-field"
                  value={newQuoteCustomer}
                  onChange={(e) => setNewQuoteCustomer(e.target.value)}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Total Quote Amount (₦)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5000000"
                  value={newQuoteAmount}
                  onChange={(e) => setNewQuoteAmount(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Notes & SKU Descriptions</label>
                <textarea
                  rows={3}
                  placeholder="e.g. 100 Cartons of Paracetamol & Analgesics"
                  value={newQuoteNotes}
                  onChange={(e) => setNewQuoteNotes(e.target.value)}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowQuoteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }}>
                  Issue Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminSidebar>
  );
}

export default function SalesPage() {
  return (
    <Suspense fallback={<div>Loading sales...</div>}>
      <SalesContent />
    </Suspense>
  );
}
