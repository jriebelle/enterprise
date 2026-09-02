'use client';

import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Portal from '../../components/Portal';

const initialStaffPayroll = [
  { id: 'EMP-101', name: 'Joshua Riebelle', role: 'Business Owner', department: 'Executive', gross: 2500000.00, paye: 450000.00, pension: 200000.00, net: 1850000.00, status: 'Paid', date: '2026-08-28' },
  { id: 'EMP-102', name: 'Sarah Jenkins', role: 'Accounts Director', department: 'Finance', gross: 1800000.00, paye: 310000.00, pension: 144000.00, net: 1346000.00, status: 'Paid', date: '2026-08-28' },
  { id: 'EMP-103', name: 'Marcus Vance', role: 'Finance Manager', department: 'Finance', gross: 1200000.00, paye: 190000.00, pension: 96000.00, net: 914000.00, status: 'Paid', date: '2026-08-28' },
  { id: 'EMP-104', name: 'Elena Rostova', role: 'Finance Manager', department: 'Audit', gross: 1200000.00, paye: 190000.00, pension: 96000.00, net: 914000.00, status: 'Paid', date: '2026-08-28' },
  { id: 'EMP-105', name: 'David Chen', role: 'Finance Clerk', department: 'Operations', gross: 650000.00, paye: 85000.00, pension: 52000.00, net: 513000.00, status: 'Paid', date: '2026-08-28' },
  { id: 'EMP-106', name: 'Amara Okafor', role: 'Finance Clerk', department: 'Operations', gross: 600000.00, paye: 75000.00, pension: 48000.00, net: 477000.00, status: 'Pending', date: '2026-08-31' },
];

export default function PayrollPage() {
  const [payrollList, setPayrollList] = useState(initialStaffPayroll);
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [showRunModal, setShowRunModal] = useState(false);

  const formatNaira = (amt) => `₦${Number(amt).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const totalGross = payrollList.reduce((acc, p) => acc + p.gross, 0);
  const totalPaye = payrollList.reduce((acc, p) => acc + p.paye, 0);
  const totalPension = payrollList.reduce((acc, p) => acc + p.pension, 0);
  const totalNet = payrollList.reduce((acc, p) => acc + p.net, 0);

  const handleRunPayroll = () => {
    setPayrollList(payrollList.map(p => ({ ...p, status: 'Paid' })));
    setShowRunModal(false);
    alert('Payroll disbursements processed and bank transfer files generated.');
  };

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', minWidth: 0, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>

          {/* Header & Page Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Staff <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Payroll & Remittances</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Manage staff monthly salary schedules, PAYE tax withholdings, pension statutory deductions, and disbursements.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                className="input-field"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ fontSize: '13px', padding: '8px 12px', width: 'auto' }}
              >
                <option value="2026-08">August 2026 Payroll Cycle</option>
                <option value="2026-07">July 2026 Payroll Cycle</option>
                <option value="2026-06">June 2026 Payroll Cycle</option>
              </select>

              <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => setShowRunModal(true)}>
                Run Payroll Cycle
              </button>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', width: '100%' }}>
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Total Gross Salaries</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{formatNaira(totalGross)}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>6 Employees on roster</span>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>PAYE Tax Withholding</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#475569' }}>{formatNaira(totalPaye)}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>State IRS statutory remittance</span>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Pension Contributions (8%)</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#475569' }}>{formatNaira(totalPension)}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>PenCom RSA compliance</span>
            </div>

            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Total Net Take-Home</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{formatNaira(totalNet)}</span>
              <span style={{ fontSize: '12px', color: '#ff6600', fontWeight: 600 }}>Disbursement ready</span>
            </div>
          </div>

          {/* Payroll Staff Table */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                Employee Pay Slips & Breakdown
              </h3>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px' }} onClick={() => alert('Downloading bank schedule...')}>
                Download Bank Payment Schedule (.CSV)
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Role & Dept</th>
                    <th>Gross salary</th>
                    <th>PAYE tax</th>
                    <th>Pension</th>
                    <th>Net pay</th>
                    <th>Payment status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollList.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{emp.name}</div>
                        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8' }}>{emp.id}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, color: '#1e293b' }}>{emp.role}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{emp.department}</div>
                      </td>
                      <td style={{ fontWeight: 600, color: '#1e293b' }}>{formatNaira(emp.gross)}</td>
                      <td style={{ color: '#475569' }}>{formatNaira(emp.paye)}</td>
                      <td style={{ color: '#475569' }}>{formatNaira(emp.pension)}</td>
                      <td style={{ fontWeight: 700, color: '#1e293b' }}>{formatNaira(emp.net)}</td>
                      <td>
                        <span className="badge badge-success">
                          <span className="badge-dot"></span> {emp.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert(`Generating payslip for ${emp.name}`)}>
                          Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Modal: Run Payroll */}
      {showRunModal && (
        <Portal>
          <div className="modal-overlay" onClick={() => setShowRunModal(false)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '440px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Confirm Payroll Disbursement
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              You are about to authorize <strong>{formatNaira(totalNet)}</strong> in net salary payments across {payrollList.length} staff members for the August 2026 cycle.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowRunModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={handleRunPayroll}>
                Authorize & Disburse
              </button>
            </div>
          </div>
        </div>
        </Portal>
      )}

    </AdminSidebar>
  );
}
