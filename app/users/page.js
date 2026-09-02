'use client';

import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const initialUsersData = [
  {
    id: 'USR-101',
    firstName: 'Joshua',
    lastName: 'Riebelle',
    name: 'Joshua Riebelle',
    email: 'joshua@shopkite.com.ng',
    role: 'Business Owner',
    status: 'Active',
    joined: 'Jan 10, 2025',
    lastActive: 'Online Now',
    isProtected: true,
    permissions: {
      dashboard: true,
      products: true,
      uploadHistory: true,
      quotes: true,
      invoices: true,
      recurring: true,
      customers: true,
      statements: true,
      reports: true,
      payroll: true,
      accounting: true,
      users: true,
    },
  },
  {
    id: 'USR-102',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    name: 'Sarah Jenkins',
    email: 's.jenkins@shopkite.com.ng',
    role: 'Accounts Director',
    status: 'Active',
    joined: 'Mar 15, 2025',
    lastActive: '14 mins ago',
    isProtected: false,
    permissions: {
      dashboard: true,
      products: true,
      uploadHistory: true,
      quotes: true,
      invoices: true,
      recurring: true,
      customers: true,
      statements: true,
      reports: true,
      payroll: true,
      accounting: true,
      users: false,
    },
  },
  {
    id: 'USR-103',
    firstName: 'Marcus',
    lastName: 'Vance',
    name: 'Marcus Vance',
    email: 'm.vance@shopkite.com.ng',
    role: 'Finance Manager',
    status: 'Active',
    joined: 'Apr 02, 2025',
    lastActive: '1 hour ago',
    isProtected: false,
    permissions: {
      dashboard: true,
      products: true,
      uploadHistory: true,
      quotes: true,
      invoices: true,
      recurring: true,
      customers: true,
      statements: true,
      reports: true,
      payroll: false,
      accounting: true,
      users: false,
    },
  },
  {
    id: 'USR-104',
    firstName: 'Elena',
    lastName: 'Rostova',
    name: 'Elena Rostova',
    email: 'e.rostova@shopkite.com.ng',
    role: 'Finance Manager',
    status: 'Active',
    joined: 'Jun 20, 2025',
    lastActive: '3 hours ago',
    isProtected: false,
    permissions: {
      dashboard: true,
      products: false,
      uploadHistory: false,
      quotes: true,
      invoices: true,
      recurring: false,
      customers: true,
      statements: true,
      reports: true,
      payroll: true,
      accounting: true,
      users: false,
    },
  },
  {
    id: 'USR-105',
    firstName: 'David',
    lastName: 'Chen',
    name: 'David Chen',
    email: 'd.chen@shopkite.com.ng',
    role: 'Finance Clerk',
    status: 'Active',
    joined: 'Aug 12, 2025',
    lastActive: 'Yesterday',
    isProtected: false,
    permissions: {
      dashboard: true,
      products: true,
      uploadHistory: true,
      quotes: true,
      invoices: true,
      recurring: false,
      customers: true,
      statements: false,
      reports: false,
      payroll: false,
      accounting: false,
      users: false,
    },
  },
  {
    id: 'USR-106',
    firstName: 'Amara',
    lastName: 'Okafor',
    name: 'Amara Okafor',
    email: 'a.okafor@shopkite.com.ng',
    role: 'Finance Clerk',
    status: 'Pending',
    joined: 'Aug 29, 2026',
    lastActive: 'Invited',
    isProtected: false,
    permissions: {
      dashboard: false,
      products: true,
      uploadHistory: false,
      quotes: true,
      invoices: false,
      recurring: false,
      customers: true,
      statements: false,
      reports: false,
      payroll: false,
      accounting: false,
      users: false,
    },
  },
];

// Enterprise Side Panel Section Definitions matching Nav Tree
const permissionSections = [
  {
    id: 'overview_intel',
    title: 'Overview & Intelligence',
    subtitle: 'High-level operational overview across master product catalogs and financial ledgers.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    items: [
      {
        key: 'dashboard',
        name: 'Executive Dashboard',
        description: 'High-level operational metrics, catalog telemetry, and executive activity log.',
      },
    ],
  },
  {
    id: 'products_list',
    title: 'Products List & Master Data',
    subtitle: 'Master SKUs, pack sizes, barcode registry, and batch CSV product uploads.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    ),
    items: [
      {
        key: 'products',
        name: 'Products (SKUs)',
        description: 'Master SKU catalog, unit costs & margins, pack sizes, barcode registry, and batch CSV imports.',
      },
      {
        key: 'uploadHistory',
        name: 'Upload History & Logs',
        description: 'Audit log of all CSV spreadsheet batch uploads, GTIN validation diagnostics, and import reports.',
      },
    ],
  },
  {
    id: 'accounting_suite',
    title: 'Accounting & Financial Suite',
    subtitle: 'Commercial sales quotes, customer invoices, recurring billing, ledger statements, reports, and staff payroll.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v16"></path>
        <path d="M6 4l12 16"></path>
        <path d="M18 4v16"></path>
        <path d="M4 10h16"></path>
        <path d="M4 14h16"></path>
      </svg>
    ),
    items: [
      {
        key: 'quotes',
        name: 'Estimates / Price Quotes',
        description: 'Draft, issue, and convert commercial pricing estimates & quotations for B2B distributors.',
      },
      {
        key: 'invoices',
        name: 'Customer Invoices & Receivables',
        description: 'Generate customer invoices, record partial settlements, and monitor overdue accounts.',
      },
      {
        key: 'recurring',
        name: 'Recurring Invoices Schedules',
        description: 'Configure and automate recurring billing cycles and subscription schedules.',
      },
      {
        key: 'customers',
        name: 'Customer Directory & Accounts',
        description: 'Manage B2B customer accounts, credit balances, payment terms, and contact records.',
      },
      {
        key: 'statements',
        name: 'Customer Statements of Account',
        description: 'Generate and export historical running ledger statements and receivables balances.',
      },
      {
        key: 'reports',
        name: 'Financial Reports & Profit/Loss',
        description: 'Access Income Statement (P&L), accounts receivable aging analysis, and VAT tax return summaries.',
      },
      {
        key: 'payroll',
        name: 'Staff Payroll & Salary Remittances',
        description: 'Review staff monthly salary breakdowns, PAYE tax withholding, and authorize bank disbursements.',
      },
    ],
  },
  {
    id: 'operations_management',
    title: 'Operations & Management',
    subtitle: 'Distributor settlements, pharmaceutical transactions, and staff access control.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 14 14"></polyline>
      </svg>
    ),
    items: [
      {
        key: 'accounting',
        name: 'Transactions & Financial Ledger',
        description: 'Review FMCG distributor settlements, pharmaceutical ledger transactions, and reconciliation.',
      },
      {
        key: 'users',
        name: 'Users & Access Control',
        description: 'Manage staff accounts, assign administrative roles, and configure section-by-section toggle permissions.',
      },
    ],
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsersData);
  const [selectedUserId, setSelectedUserId] = useState('USR-101');
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals State
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletePin, setDeletePin] = useState('');

  // Add User Form State
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Accounts Director');

  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];

  const getInitials = (name) => {
    if (!name) return 'SK';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Toggle individual permission
  const handleTogglePermission = (itemKey) => {
    if (!selectedUser) return;
    const currentVal = selectedUser.permissions?.[itemKey] ?? false;
    const updatedPermissions = {
      ...selectedUser.permissions,
      [itemKey]: !currentVal,
    };

    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, permissions: updatedPermissions } : u));
    showToast(`Updated access for ${selectedUser.name}`);
  };

  // Toggle entire category
  const handleToggleCategory = (category) => {
    if (!selectedUser) return;
    const allEnabled = category.items.every(item => selectedUser.permissions?.[item.key]);
    const nextState = !allEnabled;

    const updatedPermissions = { ...selectedUser.permissions };
    category.items.forEach(item => {
      updatedPermissions[item.key] = nextState;
    });

    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, permissions: updatedPermissions } : u));
    showToast(`${nextState ? 'Enabled all in' : 'Disabled all in'} ${category.title}`);
  };

  // Grant All / Revoke All for selected user
  const handleGrantAll = () => {
    if (!selectedUser) return;
    const allTrue = {};
    permissionSections.forEach(sec => {
      sec.items.forEach(item => {
        allTrue[item.key] = true;
      });
    });
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, permissions: allTrue } : u));
    showToast(`Granted all section access to ${selectedUser.name}`);
  };

  const handleRevokeAll = () => {
    if (!selectedUser) return;
    const allFalse = {};
    permissionSections.forEach(sec => {
      sec.items.forEach(item => {
        allFalse[item.key] = false;
      });
    });
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, permissions: allFalse } : u));
    showToast(`Revoked all section access from ${selectedUser.name}`);
  };

  // Filter users by role tab & search query
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'business_owner') return u.role === 'Business Owner';
    if (activeTab === 'accounts_director') return u.role === 'Accounts Director';
    if (activeTab === 'finance_manager') return u.role === 'Finance Manager';
    if (activeTab === 'finance_clerk') return u.role === 'Finance Clerk';
    return true;
  });

  // Handle Add User
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    const fullName = `${newFirstName} ${newLastName}`.trim();
    const newId = `USR-${100 + users.length + 1}`;
    
    const isDirector = newRole === 'Accounts Director' || newRole === 'Business Owner';
    const isManager = newRole === 'Finance Manager';

    const newUserObj = {
      id: newId,
      firstName: newFirstName,
      lastName: newLastName,
      name: fullName,
      email: newEmail,
      role: newRole,
      status: 'Active',
      joined: 'Today',
      lastActive: 'Just now',
      isProtected: false,
      permissions: {
        dashboard: true,
        products: true,
        uploadHistory: isDirector || isManager,
        quotes: true,
        invoices: true,
        recurring: isDirector || isManager,
        customers: true,
        statements: isDirector || isManager,
        reports: isDirector || isManager,
        payroll: isDirector,
        accounting: isDirector || isManager,
        users: newRole === 'Business Owner',
      },
    };

    setUsers([...users, newUserObj]);
    setSelectedUserId(newId);
    setShowAddModal(false);
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewRole('Accounts Director');
    showToast(`User '${fullName}' created successfully!`);
  };

  // Handle Delete User
  const confirmDeleteUser = () => {
    if (!deleteTarget) return;
    if (deleteTarget.isProtected) {
      alert('Business Owner user cannot be deleted.');
      return;
    }
    if (!deletePin || deletePin.length < 4) {
      alert('Please enter a valid 4-digit Admin PIN to confirm.');
      return;
    }

    const remaining = users.filter(u => u.id !== deleteTarget.id);
    setUsers(remaining);
    if (selectedUserId === deleteTarget.id) {
      setSelectedUserId(remaining[0]?.id || null);
    }
    setDeleteTarget(null);
    setDeletePin('');
    showToast(`User ${deleteTarget.name} deleted successfully.`);
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Business Owner':
        return 'badge-info';
      case 'Accounts Director':
        return 'badge-success';
      case 'Finance Manager':
        return 'badge-warning';
      case 'Finance Clerk':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
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
                Admin Team & <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>Access Control</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Manage internal administration staff, financial officers, and configure granular section-by-section permissions.
              </p>
            </div>

            <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowAddModal(true)}>
              <span>+</span> Create New Admin User
            </button>
          </div>

          {/* Role Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            {[
              { key: 'all', label: 'All Users', count: users.length },
              { key: 'business_owner', label: 'Business Owner', count: users.filter(u => u.role === 'Business Owner').length },
              { key: 'accounts_director', label: 'Accounts Director', count: users.filter(u => u.role === 'Accounts Director').length },
              { key: 'finance_manager', label: 'Finance Manager', count: users.filter(u => u.role === 'Finance Manager').length },
              { key: 'finance_clerk', label: 'Finance Clerk', count: users.filter(u => u.role === 'Finance Clerk').length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  background: activeTab === tab.key ? '#fff7ed' : 'transparent',
                  color: activeTab === tab.key ? '#ff6600' : '#64748b',
                  border: activeTab === tab.key ? '1px solid #ffedd5' : '1px solid transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  background: activeTab === tab.key ? '#ff6600' : '#f1f5f9',
                  color: activeTab === tab.key ? '#ffffff' : '#64748b',
                  fontWeight: 600,
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ── Master-Detail Two Column Layout ──────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 390px) 1fr',
            gap: '24px',
            alignItems: 'flex-start',
            width: '100%',
          }}>
            
            {/* ── LEFT: Users List Panel ───────────────────────────── */}
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                  Staff Members
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {filteredUsers.length} listed
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search staff by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field"
                style={{ fontSize: '13px', padding: '10px 14px' }}
              />

              {/* Users Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '680px', overflowY: 'auto', padding: '4px 2px' }}>
                {filteredUsers.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '13px' }}>
                    No staff members match your criteria.
                  </div>
                ) : (
                  filteredUsers.map((user) => {
                    const isSelected = selectedUser && selectedUser.id === user.id;
                    return (
                      <div
                        key={user.id}
                        className={`user-card-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                          <div
                            className="user-card-avatar"
                            style={{
                              background: isSelected ? '#ff6600' : '#f1f5f9',
                              color: isSelected ? '#ffffff' : '#334155',
                            }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {user.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {user.email}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '10px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <span className={`badge ${getRoleBadgeClass(user.role)}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                              {user.role}
                            </span>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>
                              {user.lastActive}
                            </div>
                          </div>

                          {/* Delete Button (Only for Non-Super Admin) */}
                          {!user.isProtected && (
                            <button
                              type="button"
                              title="Delete User Account"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTarget(user);
                              }}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                border: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                color: '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── RIGHT: Section Access Control & Toggle Switches ───── */}
            {selectedUser ? (
              <div className="glass-card" style={{ padding: '28px' }}>
                
                {/* Selected User Header Banner */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="user-card-avatar" style={{ width: '48px', height: '48px', fontSize: '16px', background: '#ff6600', color: '#ffffff' }}>
                      {getInitials(selectedUser.name)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 600, color: '#1e293b' }}>
                          {selectedUser.name}
                        </h2>
                        <span className={`badge ${getRoleBadgeClass(selectedUser.role)}`}>
                          <span className="badge-dot"></span> {selectedUser.role}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
                        {selectedUser.email} • User ID: <span style={{ fontFamily: 'monospace', color: '#ff6600' }}>{selectedUser.id}</span> • Joined {selectedUser.joined}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleGrantAll}
                      style={{ padding: '6px 14px', fontSize: '12.5px', color: '#ff6600', background: '#fff7ed', borderColor: '#ffedd5' }}
                    >
                      Grant All
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleRevokeAll}
                      style={{ padding: '6px 14px', fontSize: '12.5px', color: '#475569', background: '#f1f5f9', borderColor: '#cbd5e1' }}
                    >
                      Revoke All
                    </button>

                    {selectedUser.isProtected && (
                      <span style={{
                        fontSize: '12px',
                        color: '#64748b',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 500,
                      }}>
                        Protected Role (Owner)
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub-header info */}
                <div style={{
                  padding: '12px 16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  fontSize: '13px',
                  color: '#64748b',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Changes to toggle access apply automatically in real-time.</span>
                  </div>
                  {toastMessage && (
                    <span style={{ fontWeight: 600, color: '#ff6600', animation: 'fadeIn 0.2s ease' }}>
                      {toastMessage}
                    </span>
                  )}
                </div>

                {/* Categorized Permissions based on Enterprise Side Panels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {permissionSections.map((category) => {
                    const enabledCount = category.items.filter(item => selectedUser.permissions?.[item.key]).length;
                    const totalCount = category.items.length;
                    const allEnabled = enabledCount === totalCount;
                    const partial = enabledCount > 0 && enabledCount < totalCount;

                    return (
                      <div key={category.id} className="admin-permission-category-card">
                        
                        {/* Subsection Category Header with Master Control Switch */}
                        <div className="admin-permission-category-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ff6600',
                            }}>
                              {category.icon}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 600, color: '#1e293b' }}>
                                  {category.title}
                                </h4>
                                <span style={{
                                  fontSize: '11px',
                                  padding: '2px 7px',
                                  borderRadius: '6px',
                                  background: allEnabled ? '#fff7ed' : '#f1f5f9',
                                  color: allEnabled ? '#ff6600' : '#64748b',
                                  fontWeight: 600,
                                }}>
                                  {enabledCount}/{totalCount} Enabled
                                </span>
                              </div>
                              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                                {category.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Category Master Switch */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              fontSize: '11.5px',
                              fontWeight: 600,
                              color: allEnabled ? '#ff6600' : partial ? '#475569' : '#94a3b8',
                            }}>
                              {allEnabled ? 'All Enabled' : partial ? 'Partial' : 'Disabled'}
                            </span>
                            <label className="admin-switch" title={`Toggle all in ${category.title}`}>
                              <input
                                type="checkbox"
                                checked={allEnabled}
                                onChange={() => handleToggleCategory(category)}
                              />
                              <span className="admin-switch-slider"></span>
                            </label>
                          </div>
                        </div>

                        {/* Individual Sub-permissions List */}
                        <div className="admin-permission-sub-items">
                          {category.items.map((item) => {
                            const isGranted = selectedUser.permissions?.[item.key] ?? false;
                            return (
                              <div
                                key={item.key}
                                className={`admin-permission-item ${isGranted ? 'granted' : ''}`}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: isGranted ? '#1e293b' : '#64748b' }}>
                                    {item.name}
                                  </span>
                                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                                    {item.description}
                                  </span>
                                </div>

                                {/* Individual Sub Switch */}
                                <label className="admin-switch" title={`Toggle ${item.name} Access`}>
                                  <input
                                    type="checkbox"
                                    checked={isGranted}
                                    onChange={() => handleTogglePermission(item.key)}
                                  />
                                  <span className="admin-switch-slider"></span>
                                </label>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            ) : null}

          </div>
        </div>
      </div>

      {/* ── Modal: Create New Admin User ────────────────────────────── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '480px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                Create New Admin User
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jenkins"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. s.jenkins@shopkite.com.ng"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Assigned Enterprise Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="input-field"
                >
                  <option value="Accounts Director">Accounts Director</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Finance Clerk">Finance Clerk</option>
                  <option value="Business Owner">Business Owner</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#ff6600', color: '#ffffff' }}
                >
                  Create & Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Delete User Account ──────────────────────────────── */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '440px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f1f5f9', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                Delete User Account
              </h2>
            </div>

            <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Are you sure you want to permanently delete <strong>{deleteTarget.name}</strong> ({deleteTarget.role})? This user will immediately lose all system access privileges.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Confirm with Admin PIN (4 digits)</label>
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={deletePin}
                onChange={(e) => setDeletePin(e.target.value)}
                className="input-field"
                style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => { setDeleteTarget(null); setDeletePin(''); }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ background: '#ff6600', color: '#ffffff' }}
                onClick={confirmDeleteUser}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminSidebar>
  );
}
