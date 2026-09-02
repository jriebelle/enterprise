'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '../../components/AdminSidebar';
import Portal from '../../components/Portal';

const initialUploadRows = [
  {
    rowNumber: 1,
    name: 'Ribena Blackcurrant Drink',
    size: '850ml Bottle',
    brand: 'Suntory Beverage',
    category: 'Beverages',
    sku: 'SKU-8901',
    barcode: '615110099101',
    costPrice: 2800.00,
    sellingPrice: 3400.00,
    stock: 120,
    expiryDate: '2028-11-30',
    status: 'Successful',
    remark: 'Validated & Added to Products List',
  },
  {
    rowNumber: 2,
    name: 'Emzor Paracetamol 500mg',
    size: '100 Caplets',
    brand: 'Emzor Pharma',
    category: 'Analgesics',
    sku: 'SKU-8801',
    barcode: '615110023401',
    costPrice: 2800.00,
    sellingPrice: 3500.00,
    stock: 150,
    expiryDate: '2028-04-30',
    status: 'Failed',
    remark: 'Duplicate Product (SKU-8801 already exists in master registry)',
  },
  {
    rowNumber: 3,
    name: 'Indomie Onion Chicken Flavour',
    size: '70g (Carton 40)',
    brand: 'Dufil Prima',
    category: 'Packaged Foods',
    sku: 'SKU-8902',
    barcode: '615110099102',
    costPrice: 13500.00,
    sellingPrice: 15800.00,
    stock: 60,
    expiryDate: '2027-10-15',
    status: 'Successful',
    remark: 'Validated & Added to Products List',
  },
  {
    rowNumber: 4,
    name: 'Airtel 4G LTE SIM Starter Pack',
    size: '1 Pack (Trio SIM)',
    brand: 'Airtel Nigeria',
    category: 'Household Care',
    sku: 'SKU-8903',
    barcode: '615110099103',
    costPrice: 500.00,
    sellingPrice: 0.00,
    stock: 500,
    expiryDate: '2029-12-31',
    status: 'Failed',
    remark: 'Invalid Selling Price (Selling unit price must be greater than ₦0.00)',
  },
  {
    rowNumber: 5,
    name: 'Sensodyne Rapid Relief Toothpaste',
    size: '75ml Tube',
    brand: 'GSK Nigeria',
    category: 'Personal Care',
    sku: 'SKU-8904',
    barcode: '615110099104',
    costPrice: 3200.00,
    sellingPrice: 3900.00,
    stock: 90,
    expiryDate: '2028-08-20',
    status: 'Successful',
    remark: 'Validated & Added to Products List',
  },
  {
    rowNumber: 6,
    name: 'Golden Morn Family Saver Pack',
    size: '1.5kg Pack',
    brand: 'Nestlé Nigeria',
    category: 'Packaged Foods',
    sku: 'SKU-8905',
    barcode: '615110099105',
    costPrice: 5400.00,
    sellingPrice: 6600.00,
    stock: -25,
    expiryDate: '2027-12-15',
    status: 'Failed',
    remark: 'Invalid Quantity (Stock count cannot be negative: found -25)',
  },
  {
    rowNumber: 7,
    name: 'Maltina Malt Drink Can',
    size: '330ml (Pack 24)',
    brand: 'Nigerian Breweries',
    category: 'Beverages',
    sku: 'SKU-8906',
    barcode: '615110099106',
    costPrice: 9800.00,
    sellingPrice: 11500.00,
    stock: 80,
    expiryDate: '2028-05-30',
    status: 'Processing',
    remark: 'Validating barcode checksum against GS1 Nigeria registry...',
  },
  {
    rowNumber: 8,
    name: 'Panadol Night Extra Strength',
    size: '20 Caplets',
    brand: 'GSK Nigeria',
    category: 'Analgesics',
    sku: 'SKU-8907',
    barcode: '61511',
    costPrice: 2200.00,
    sellingPrice: 2800.00,
    stock: 140,
    expiryDate: '2028-09-15',
    status: 'Failed',
    remark: 'Invalid Barcode (Barcode "61511" is shorter than standard 12-digit EAN/UPC)',
  },
  {
    rowNumber: 9,
    name: 'Ariel Automatic Detergent Powder',
    size: '2kg Bag',
    brand: 'Procter & Gamble',
    category: 'Household Care',
    sku: 'SKU-8908',
    barcode: '615110099108',
    costPrice: 4800.00,
    sellingPrice: 5900.00,
    stock: 65,
    expiryDate: '2029-06-30',
    status: 'Successful',
    remark: 'Validated & Added to Products List',
  },
  {
    rowNumber: 10,
    name: 'Strepsils Honey & Lemon Lozenges',
    size: 'Pack of 24',
    brand: 'Reckitt Benckiser',
    category: 'First Aid',
    sku: 'SKU-8909',
    barcode: '615110099109',
    costPrice: 1950.00,
    sellingPrice: 2500.00,
    stock: 210,
    expiryDate: '2028-03-31',
    status: 'Successful',
    remark: 'Validated & Added to Products List',
  },
  {
    rowNumber: 11,
    name: 'Nestlé Cerelac Maize & Milk',
    size: '400g Tin',
    brand: 'Nestlé Nigeria',
    category: 'Packaged Foods',
    sku: 'SKU-8910',
    barcode: '615110099110',
    costPrice: 3800.00,
    sellingPrice: 4600.00,
    stock: 95,
    expiryDate: '2028-01-20',
    status: 'Processing',
    remark: 'Verifying NAFDAC regulatory compliance certificate...',
  },
  {
    rowNumber: 12,
    name: 'Goya Extra Virgin Olive Oil',
    size: '500ml Glass Bottle',
    brand: 'Goya Foods',
    category: 'Packaged Foods',
    sku: 'SKU-8911',
    barcode: '615110099111',
    costPrice: 6200.00,
    sellingPrice: 7500.00,
    stock: 40,
    expiryDate: '2029-02-28',
    status: 'Successful',
    remark: 'Validated & Added to Products List',
  },
];

export default function BulkUploadResultsPage() {
  const [rows, setRows] = useState(initialUploadRows);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'Successful' | 'Processing' | 'Failed'
  const [search, setSearch] = useState('');
  const [showNoticeModal, setShowNoticeModal] = useState(true);

  // Counts
  const totalCount = rows.length;
  const successCount = rows.filter(r => r.status === 'Successful').length;
  const processingCount = rows.filter(r => r.status === 'Processing').length;
  const failedCount = rows.filter(r => r.status === 'Failed').length;

  const filteredRows = rows.filter(r => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.sku.toLowerCase().includes(search.toLowerCase()) ||
      r.barcode.includes(search) ||
      r.remark.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Successful':
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
            Successful
          </span>
        );
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
            Processing
          </span>
        );
      case 'Failed':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#64748b' }}></span>
            Failed
          </span>
        );
      default:
        return status;
    }
  };

  const handleExportErrorReport = () => {
    const failedItems = rows.filter(r => r.status === 'Failed');
    const headers = ['Row Number', 'Product Name', 'Size', 'Brand', 'Category', 'SKU', 'Barcode', 'Cost Price (NGN)', 'Selling Price (NGN)', 'Stock Qty', 'Expiry Date', 'Status', 'Failure Remarks'];
    const csvRows = (failedItems.length > 0 ? failedItems : rows).map(r => [
      r.rowNumber,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.size}"`,
      `"${r.brand}"`,
      `"${r.category}"`,
      r.sku,
      r.barcode,
      r.costPrice,
      r.sellingPrice,
      r.stock,
      r.expiryDate,
      r.status,
      `"${r.remark.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...csvRows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bulk-upload-errors-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Bulk Upload <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Status</span>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '13.5px', color: '#475569', fontWeight: 600 }}>
                  shopkite_fmcg_pharma_august_batch4.csv
                </span>
                {processingCount > 0 ? (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: '#fff7ed',
                    border: '1px solid #ffedd5',
                    color: '#ff6600',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6600' }}></span>
                    Processing
                  </span>
                ) : (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#1e293b',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6600' }}></span>
                    Completed
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={handleExportErrorReport} style={{ color: '#64748b' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Error Report (.CSV)
              </button>

              <Link href="/products" className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                View In Products List ❯
              </Link>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', width: '100%' }}>
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Total Rows In File</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>{totalCount}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Processed from uploaded CSV</div>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Successful Imports</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>{successCount}</div>
              <div style={{ fontSize: '12px', color: '#ff6600', fontWeight: 500 }}>Ready and added to products list</div>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Processing Validation</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#ff6600' }}>{processingCount}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Awaiting external GTIN sync</div>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Failed / Rejected</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#475569' }}>{failedCount}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Requires correction</div>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px',
            flexWrap: 'wrap',
          }}>
            {[
              { id: 'all', label: 'All Items', count: totalCount },
              { id: 'Successful', label: 'Successful', count: successCount },
              { id: 'Processing', label: 'Processing', count: processingCount },
              { id: 'Failed', label: 'Failed', count: failedCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

          {/* Table Container with clean responsive wrapping */}
          <div className="glass-card" style={{ padding: '0px', width: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
            
            {/* Search Filter Bar */}
            <div style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1 1 320px', minWidth: '240px' }}>
                <input
                  type="text"
                  placeholder="Filter uploaded items by name, barcode, remark reason..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Showing <strong>{filteredRows.length}</strong> of <strong>{totalCount}</strong> imported items
              </div>
            </div>

            {/* Uploaded Products Data Table */}
            <div className="table-container" style={{ width: '100%', overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', minWidth: '1000px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>Row</th>
                    <th style={{ minWidth: '180px' }}>Product & brand</th>
                    <th style={{ minWidth: '130px' }}>SKU & barcode</th>
                    <th style={{ minWidth: '120px' }}>Category</th>
                    <th style={{ minWidth: '110px' }}>Size / pack</th>
                    <th style={{ minWidth: '100px' }}>Cost unit price (₦)</th>
                    <th style={{ minWidth: '100px' }}>Selling unit price (₦)</th>
                    <th style={{ minWidth: '80px' }}>Stock qty</th>
                    <th style={{ minWidth: '95px' }}>Expiry date</th>
                    <th style={{ minWidth: '110px' }}>Status</th>
                    <th style={{ minWidth: '240px' }}>Remarks & diagnostics</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={11} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        No items found matching the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((item) => (
                      <tr key={item.rowNumber} style={{ background: item.status === 'Failed' ? '#fffaf8' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#94a3b8', fontSize: '13px' }}>
                          #{item.rowNumber}
                        </td>
                        <td>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1e293b', wordBreak: 'break-word' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{item.brand}</div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'monospace', color: '#ff6600', fontWeight: 600, fontSize: '13px' }}>
                            {item.sku}
                          </div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                            {item.barcode}
                          </div>
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: '#f1f5f9',
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: 500,
                            display: 'inline-block',
                          }}>
                            {item.category}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '13px', color: '#475569' }}>
                            {item.size}
                          </span>
                        </td>
                        <td style={{ color: '#64748b', fontSize: '13px', whiteSpace: 'nowrap' }}>
                          ₦{item.costPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </td>
                        <td style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', whiteSpace: 'nowrap' }}>
                          ₦{item.sellingPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </td>
                        <td>
                          <span style={{
                            fontWeight: 600,
                            color: '#64748b',
                          }}>
                            {item.stock}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                            {item.expiryDate}
                          </span>
                        </td>
                        <td>
                          {getStatusBadge(item.status)}
                        </td>
                        <td style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                          <span style={{
                            fontSize: '12.5px',
                            color: item.status === 'Failed' ? '#475569' : item.status === 'Processing' ? '#ff6600' : '#64748b',
                            fontWeight: item.status === 'Failed' ? 600 : 400,
                            lineHeight: 1.4,
                            display: 'block',
                          }}>
                            {item.remark}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="admin-pagination-card">
              <div className="admin-pagination-info">
                Import Batch ID: <strong style={{ fontFamily: 'monospace', color: '#ff6600' }}>IMP-2026-0831-B4</strong> — Processed on {new Date().toLocaleDateString('en-NG', { dateStyle: 'medium' })}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link href="/products/upload-history" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '13px', textDecoration: 'none', color: '#64748b' }}>
                  All Upload Logs
                </Link>
                <Link href="/products" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '13px', textDecoration: 'none', color: '#64748b' }}>
                  Return to Products List
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Informational On-Load Notice Modal */}
      {showNoticeModal && (
        <Portal>
          <div className="modal-overlay" onClick={() => setShowNoticeModal(false)}>
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '28px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#fff7ed',
                  border: '1px solid #ffedd5',
                  color: '#ff6600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Processing In Progress
                  </h2>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
                    shopkite_fmcg_pharma_august_batch4.csv
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowNoticeModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer', padding: '0 4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                The validation and registration process might take a while depending on the number of products in your file.
              </p>
              <p style={{ margin: 0 }}>
                Once processing is complete, you will get notified via <strong>email</strong> and an in-app popup on the <strong>Bulk Upload</strong> page.
              </p>
              <div style={{
                padding: '12px 14px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12.5px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>
                  This page can safely be closed at any time. You can return to view this report at any point via the <strong>View Upload History</strong> button on the Products page.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
              <button
                className="btn btn-primary"
                style={{ background: '#ff6600', color: '#ffffff', padding: '9px 20px', fontSize: '13px' }}
                onClick={() => setShowNoticeModal(false)}
              >
                Got it, Continue
              </button>
            </div>
          </div>
        </div>
        </Portal>
      )}
    </AdminSidebar>
  );
}
