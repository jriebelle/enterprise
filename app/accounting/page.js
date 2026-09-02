'use client';

import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const initialTransactions = [
  { id: 'TXN-9021', date: '2026-08-30', description: 'Emzor Pharma Bulk Supply Settlement', category: 'Pharmaceuticals', type: 'Income', amount: 14850000.00, status: 'Settled' },
  { id: 'TXN-9022', date: '2026-08-29', description: 'Nestlé Nigeria FMCG Distribution Order', category: 'FMCG Goods', type: 'Expense', amount: 2420000.00, status: 'Reconciled' },
  { id: 'TXN-9023', date: '2026-08-28', description: 'GSK Nigeria Pharmaceutical Inventory Renewal', category: 'Pharmaceuticals', type: 'Expense', amount: 18500000.00, status: 'Settled' },
  { id: 'TXN-9024', date: '2026-08-27', description: 'Dufil Prima Noodles Logistics & Freight', category: 'FMCG Goods', type: 'Expense', amount: 412050.00, status: 'Reconciled' },
  { id: 'TXN-9025', date: '2026-08-25', description: 'Reckitt Benckiser Hygiene Products Order', category: 'FMCG Goods', type: 'Income', amount: 9500000.00, status: 'Pending' },
  { id: 'TXN-9026', date: '2026-08-24', description: 'NAFDAC Regulatory Compliance & Audit Fee', category: 'Tax & Compliance', type: 'Expense', amount: 1250000.00, status: 'Settled' },
  { id: 'TXN-9027', date: '2026-08-22', description: 'Merck Healthcare Supplements Batch Order', category: 'Pharmaceuticals', type: 'Income', amount: 3240000.00, status: 'Settled' },
];

export default function AccountingPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [showModal, setShowModal] = useState(false);

  // New Transaction Form State
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState('Pharmaceuticals');
  const [newType, setNewType] = useState('Income');
  const [newAmount, setNewAmount] = useState('');

  // Counts
  const allCount = transactions.length;
  const settledCount = transactions.filter(t => t.status === 'Settled').length;
  const reconciledCount = transactions.filter(t => t.status === 'Reconciled').length;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  const filteredTransactions = transactions.filter((t) => {
    const matchesTab = activeTab === 'all' || (activeTab === 'settled' && t.status === 'Settled') || (activeTab === 'reconciled' && t.status === 'Reconciled') || (activeTab === 'pending' && t.status === 'Pending');
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesTab && matchesSearch && matchesCategory;
  });

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      description: newDesc,
      category: newCat,
      type: newType,
      amount: parseFloat(newAmount),
      status: 'Pending',
    };

    setTransactions([newTxn, ...transactions]);
    setShowModal(false);
    setNewDesc('');
    setNewAmount('');
  };

  const getStatusBadge = (status) => {
    return (
      <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
        <span className="badge-dot" style={{ background: status === 'Settled' ? '#ff6600' : '#64748b' }}></span> {status}
      </span>
    );
  };

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', minWidth: 0, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
          
          {/* Header & Page Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Transactions & <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Financial Ledger</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Review FMCG distributor settlements, pharmaceutical ledger transactions, and general account reconciliation.
              </p>
            </div>

            <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => setShowModal(true)}>
              <span>+</span> Log Transaction
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px',
          }}>
            {[
              { id: 'all', label: 'All Transactions', count: allCount },
              { id: 'settled', label: 'Settled', count: settledCount },
              { id: 'reconciled', label: 'Reconciled', count: reconciledCount },
              { id: 'pending', label: 'Pending', count: pendingCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ff6600' : '#ffffff',
                  color: activeTab === tab.id ? '#ffffff' : '#64748b',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(255,102,0,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label} <span style={{
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: activeTab === tab.id ? '#ffffff' : '#475569',
                }}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Table Container & Filter Toolbar */}
          <div className="glass-card" style={{ padding: '0px', overflow: 'hidden' }}>
            
            {/* Filter Bar */}
            <div style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ flex: '1 1 320px' }}>
                <input
                  type="text"
                  placeholder="Search by transaction description or ID..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <select
                  className="input-field"
                  style={{ width: '200px' }}
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="All">All Categories</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                  <option value="FMCG Goods">FMCG Goods</option>
                  <option value="Tax & Compliance">Tax & Compliance</option>
                </select>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount (₦)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        No transactions found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedTransactions.map((txn) => (
                      <tr key={txn.id}>
                        <td style={{ fontFamily: 'monospace', color: '#ff6600', fontWeight: 600 }}>{txn.id}</td>
                        <td style={{ color: '#64748b' }}>{txn.date}</td>
                        <td style={{ fontWeight: 500, color: '#1e293b' }}>{txn.description}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: '#f1f5f9',
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: 500,
                          }}>
                            {txn.category}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>
                            {txn.type === 'Income' ? '+ Income' : '- Expense'}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600, color: '#1e293b' }}>
                          {txn.type === 'Income' ? '+' : '-'}₦{txn.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </td>
                        <td>{getStatusBadge(txn.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="admin-pagination-card">
              <div className="admin-pagination-info">
                Showing <strong>{filteredTransactions.length === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredTransactions.length)}</strong> of <strong>{filteredTransactions.length}</strong> Transactions
              </div>

              <div className="admin-pagination-controls">
                <button
                  className="admin-pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  ❮ Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`admin-pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="admin-pagination-btn"
                  disabled={currentPage === totalPages || filteredTransactions.length === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next ❯
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal: New Journal Entry */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '480px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                Log New Transaction
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emzor Pharma Distribution Order"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Category</label>
                  <select className="input-field" value={newCat} onChange={(e) => setNewCat(e.target.value)}>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="FMCG Goods">FMCG Goods</option>
                    <option value="Tax & Compliance">Tax & Compliance</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Type</label>
                  <select className="input-field" value={newType} onChange={(e) => setNewType(e.target.value)}>
                    <option value="Income">Income (+)</option>
                    <option value="Expense">Expense (-)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Amount (₦)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="500000.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }}>
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminSidebar>
  );
}
