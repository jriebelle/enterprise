'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '../../components/AdminSidebar';

const initialBatches = [
  {
    batchId: 'IMP-2026-0831-B4',
    fileName: 'shopkite_fmcg_pharma_august_batch4.csv',
    uploadedBy: 'Joshua Riebelle',
    userRole: 'Business Owner',
    timestamp: 'Today, 17:12',
    totalItems: 12,
    successful: 6,
    processing: 2,
    failed: 4,
    status: 'Still processing',
  },
  {
    batchId: 'IMP-2026-0828-B3',
    fileName: 'nestle_beverages_cereal_products_list.csv',
    uploadedBy: 'Sarah Jenkins',
    userRole: 'Accounts Director',
    timestamp: '28 Aug 2026, 14:30',
    totalItems: 45,
    successful: 45,
    processing: 0,
    failed: 0,
    status: 'Completed',
  },
  {
    batchId: 'IMP-2026-0822-B2',
    fileName: 'emzor_pharmaceutical_analgesics.csv',
    uploadedBy: 'Marcus Vance',
    userRole: 'Finance Manager',
    timestamp: '22 Aug 2026, 09:15',
    totalItems: 80,
    successful: 78,
    processing: 0,
    failed: 2,
    status: 'Completed with Errors',
  },
  {
    batchId: 'IMP-2026-0815-B1',
    fileName: 'unilever_hygiene_personal_care.csv',
    uploadedBy: 'Joshua Riebelle',
    userRole: 'Business Owner',
    timestamp: '15 Aug 2026, 11:40',
    totalItems: 120,
    successful: 120,
    processing: 0,
    failed: 0,
    status: 'Completed',
  },
  {
    batchId: 'IMP-2026-0805-B0',
    fileName: 'initial_master_products_list_migration.csv',
    uploadedBy: 'Joshua Riebelle',
    userRole: 'Business Owner',
    timestamp: '05 Aug 2026, 08:00',
    totalItems: 500,
    successful: 492,
    processing: 0,
    failed: 8,
    status: 'Completed with Errors',
  },
];

export default function UploadHistoryPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalUploadedSKUs = batches.reduce((acc, b) => acc + b.totalItems, 0);
  const totalSuccessful = batches.reduce((acc, b) => acc + b.successful, 0);
  const totalFailed = batches.reduce((acc, b) => acc + b.failed, 0);

  const filteredBatches = batches.filter((b) => {
    return b.batchId.toLowerCase().includes(search.toLowerCase()) ||
      b.fileName.toLowerCase().includes(search.toLowerCase()) ||
      b.uploadedBy.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.max(1, Math.ceil(filteredBatches.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBatches = filteredBatches.slice(startIndex, startIndex + itemsPerPage);

  const getBatchStatusBadge = (status) => {
    switch (status) {
      case 'Still processing':
      case 'Processing':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: '#fff7ed',
            border: '1px solid #ffedd5',
            color: '#ff6600',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6600' }}></span>
            Still processing
          </span>
        );
      case 'Completed':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            color: '#1e293b',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6600' }}></span>
            Completed
          </span>
        );
      case 'Completed with Errors':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#64748b' }}></span>
            Completed (Errors)
          </span>
        );
      default:
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#64748b' }}></span>
            {status}
          </span>
        );
    }
  };

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Link
                  href="/products"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  ❮ Back to Products List
                </Link>
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Product Upload & <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Import History</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Audit log of all CSV spreadsheet batch uploads, products list validation outcomes, and import reports.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/products" className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                + Add Product SKUs
              </Link>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', width: '100%' }}>
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Total Batches Uploaded</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>{batches.length}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Historical import jobs</div>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Total SKUs Processed</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>{totalUploadedSKUs.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Across all CSV uploads</div>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Successfully Added</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>{totalSuccessful.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: '#ff6600', fontWeight: 500 }}>{((totalSuccessful / totalUploadedSKUs) * 100).toFixed(1)}% success rate</div>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Failed Rows Flagged</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#475569' }}>{totalFailed}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Diagnosed with error remarks</div>
            </div>
          </div>

          {/* History Table Container */}
          <div className="glass-card" style={{ padding: '0px', width: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
            
            {/* Filter Bar */}
            <div style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1 1 320px', minWidth: '240px' }}>
                <input
                  type="text"
                  placeholder="Search by batch ID, file name, or uploader..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="input-field"
                />
              </div>

              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Showing <strong>{filteredBatches.length}</strong> upload log entries
              </div>
            </div>

            {/* Table */}
            <div className="table-container" style={{ width: '100%', overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', minWidth: '920px' }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: '150px' }}>Batch ID</th>
                    <th style={{ minWidth: '220px' }}>File name</th>
                    <th style={{ minWidth: '160px' }}>Uploaded by</th>
                    <th style={{ minWidth: '140px' }}>Date & time</th>
                    <th style={{ minWidth: '160px' }}>Outcome breakdown</th>
                    <th style={{ minWidth: '140px' }}>Batch status</th>
                    <th style={{ minWidth: '150px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBatches.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        No upload batches found.
                      </td>
                    </tr>
                  ) : (
                    paginatedBatches.map((batch) => (
                      <tr key={batch.batchId}>
                        <td>
                          <div style={{ fontFamily: 'monospace', color: '#ff6600', fontWeight: 600, fontSize: '13px' }}>
                            {batch.batchId}
                          </div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                            {batch.totalItems} items
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#1e293b', wordBreak: 'break-word' }}>
                            {batch.fileName}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 500, color: '#1e293b' }}>
                            {batch.uploadedBy}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            {batch.userRole}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '13px', color: '#64748b' }}>
                            {batch.timestamp}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12px' }}>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>
                              {batch.successful} Successful
                            </span>
                            {batch.processing > 0 && (
                              <span style={{ color: '#ff6600', fontWeight: 500 }}>
                                {batch.processing} Processing
                              </span>
                            )}
                            {batch.failed > 0 && (
                              <span style={{ color: '#64748b', fontWeight: 500 }}>
                                {batch.failed} Failed
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          {getBatchStatusBadge(batch.status)}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Link
                            href="/products/bulk-upload-results"
                            className="btn btn-secondary"
                            style={{
                              padding: '6px 12px',
                              fontSize: '12px',
                              color: '#ff6600',
                              borderColor: 'rgba(255,102,0,0.3)',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            View Results ➔
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="admin-pagination-card">
              <div className="admin-pagination-info">
                Showing <strong>{filteredBatches.length === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredBatches.length)}</strong> of <strong>{filteredBatches.length}</strong> Batches
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
                  disabled={currentPage === totalPages || filteredBatches.length === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next ❯
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
