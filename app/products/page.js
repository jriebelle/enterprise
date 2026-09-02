'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../components/AdminSidebar';
import Portal from '../components/Portal';

const initialProducts = [
  { id: 'SKU-8801', barcode: '615110023401', name: 'Emzor Paracetamol 500mg', size: '100 Caplets', brand: 'Emzor Pharma', category: 'Analgesics', costPrice: 2800.00, sellingPrice: 3500.00, stock: 150, expiryDate: '2028-04-30', status: 'Active', iconType: 'meds' },
  { id: 'SKU-8802', barcode: '615110023402', name: 'Indomie Super Pack Chicken', size: '80g (Carton 40)', brand: 'Dufil Prima', category: 'Packaged Foods', costPrice: 14500.00, sellingPrice: 16800.00, stock: 45, expiryDate: '2027-09-15', status: 'Active', iconType: 'food' },
  { id: 'SKU-8803', barcode: '615110023403', name: 'Augmentin 625mg Film-Coated', size: '14 Tablets', brand: 'GSK Nigeria', category: 'Antibiotics', costPrice: 12000.00, sellingPrice: 14200.00, stock: 0, expiryDate: '2027-11-20', status: 'Out-of-Stock', iconType: 'meds' },
  { id: 'SKU-8804', barcode: '615110023404', name: 'Milo Chocolate Malt Powder Refill', size: '800g Pack', brand: 'Nestlé Nigeria', category: 'Beverages', costPrice: 4600.00, sellingPrice: 5400.00, stock: 200, expiryDate: '2028-02-28', status: 'Active', iconType: 'beverage' },
  { id: 'SKU-8805', barcode: '615110023405', name: 'Dettol Antiseptic Disinfectant Liquid', size: '500ml Bottle', brand: 'Reckitt Benckiser', category: 'Household Care', costPrice: 3500.00, sellingPrice: 4200.00, stock: 85, expiryDate: '2029-01-15', status: 'Active', iconType: 'care' },
  { id: 'SKU-8806', barcode: '615110023406', name: 'Ventolin Salbutamol Inhaler', size: '100mcg (200 Doses)', brand: 'GSK Nigeria', category: 'First Aid', costPrice: 7500.00, sellingPrice: 8900.00, stock: 12, expiryDate: '2027-10-31', status: 'Suspended', iconType: 'meds' },
  { id: 'SKU-8807', barcode: '615110023407', name: 'Seven Seas Cod Liver Oil', size: '100 Capsules', brand: 'Merck Healthcare', category: 'Supplements', costPrice: 8200.00, sellingPrice: 9600.00, stock: 0, expiryDate: '2028-06-30', status: 'Out-of-Stock', iconType: 'meds' },
  { id: 'SKU-8808', barcode: '615110023408', name: 'Colgate Triple Action Toothpaste', size: '140g Tube', brand: 'Colgate-Palmolive', category: 'Personal Care', costPrice: 1500.00, sellingPrice: 1850.00, stock: 310, expiryDate: '2028-08-15', status: 'Active', iconType: 'care' },
  { id: 'SKU-8809', barcode: '615110023409', name: 'Golden Morn Maize & Soya Cereal', size: '900g Pack', brand: 'Nestlé Nigeria', category: 'Packaged Foods', costPrice: 3200.00, sellingPrice: 3950.00, stock: 120, expiryDate: '2027-12-10', status: 'Active', iconType: 'food' },
  { id: 'SKU-8810', barcode: '615110023410', name: 'Panadol Extra Caplets', size: '24 Caplets', brand: 'GSK Nigeria', category: 'Analgesics', costPrice: 1800.00, sellingPrice: 2200.00, stock: 180, expiryDate: '2028-11-30', status: 'Active', iconType: 'meds' },
  { id: 'SKU-8811', barcode: '615110023411', name: 'Hypo Super Bleach Liquid', size: '1 Litre Bottle', brand: 'Tolaram Group', category: 'Household Care', costPrice: 1300.00, sellingPrice: 1600.00, stock: 95, expiryDate: '2029-05-20', status: 'Active', iconType: 'care' },
  { id: 'SKU-8812', barcode: '615110023412', name: 'Amoxil Amoxicillin 500mg', size: '20 Capsules', brand: 'Emzor Pharma', category: 'Antibiotics', costPrice: 2500.00, sellingPrice: 3100.00, stock: 60, expiryDate: '2027-08-15', status: 'Active', iconType: 'meds' },
  { id: 'SKU-8813', barcode: '615110023413', name: 'Peak Full Cream Milk Powder Tin', size: '900g Tin', brand: 'FrieslandCampina', category: 'Beverages', costPrice: 7200.00, sellingPrice: 8500.00, stock: 40, expiryDate: '2028-03-31', status: 'Active', iconType: 'beverage' },
  { id: 'SKU-8814', barcode: '615110023414', name: 'Lipton Yellow Label Tea Bags', size: '100 Tea Bags', brand: 'Unilever Nigeria', category: 'Beverages', costPrice: 2600.00, sellingPrice: 3200.00, stock: 150, expiryDate: '2028-10-15', status: 'Active', iconType: 'beverage' },
  { id: 'SKU-8815', barcode: '615110023415', name: 'Omo Fast Action Detergent Powder', size: '1kg Pack', brand: 'Unilever Nigeria', category: 'Household Care', costPrice: 2300.00, sellingPrice: 2800.00, stock: 0, expiryDate: '2029-08-30', status: 'Out-of-Stock', iconType: 'care' },
  { id: 'SKU-8816', barcode: '615110023416', name: 'Chemiron Blood Tonic Syrup', size: '300ml Bottle', brand: 'Chemiron Care', category: 'Supplements', costPrice: 3700.00, sellingPrice: 4500.00, stock: 75, expiryDate: '2027-09-30', status: 'Active', iconType: 'meds' },
  { id: 'SKU-8817', barcode: '615110023417', name: 'Close-Up Red Hot Gel Toothpaste', size: '140g Tube', brand: 'Unilever Nigeria', category: 'Personal Care', costPrice: 1400.00, sellingPrice: 1750.00, stock: 220, expiryDate: '2028-07-20', status: 'Active', iconType: 'care' },
  { id: 'SKU-8818', barcode: '615110023418', name: 'Pampers Baby-Dry Diapers', size: 'Size 4 (64s)', brand: 'Procter & Gamble', category: 'Personal Care', costPrice: 16000.00, sellingPrice: 18500.00, stock: 30, expiryDate: '2029-12-31', status: 'Active', iconType: 'care' },
  { id: 'SKU-8819', barcode: '615110023419', name: 'Ciprofloxacin 500mg Tablets', size: '10 Tablets', brand: 'Fidson Healthcare', category: 'Antibiotics', costPrice: 2300.00, sellingPrice: 2900.00, stock: 85, expiryDate: '2027-07-15', status: 'Active', iconType: 'meds' },
  { id: 'SKU-8820', barcode: '615110023420', name: 'Eva Sparkling White Grape Juice', size: '75cl Bottle', brand: 'Premium FMCG', category: 'Beverages', costPrice: 3900.00, sellingPrice: 4800.00, stock: 50, expiryDate: '2028-05-15', status: 'Suspended', iconType: 'beverage' },
  { id: 'SKU-8821', barcode: '615110023421', name: 'St. Louis Cube Sugar Box', size: '500g Box', brand: 'Sugar Corp', category: 'Packaged Foods', costPrice: 1550.00, sellingPrice: 1900.00, stock: 110, expiryDate: '2029-03-20', status: 'Active', iconType: 'food' },
  { id: 'SKU-8822', barcode: '615110023422', name: 'Procold Cold & Flu Caplets', size: '10 Caplets', brand: 'Kalbe Pharma', category: 'Analgesics', costPrice: 1150.00, sellingPrice: 1450.00, stock: 0, expiryDate: '2027-06-30', status: 'Out-of-Stock', iconType: 'meds' },
  { id: 'SKU-8823', barcode: '615110023423', name: 'Morning Fresh Dishwashing Liquid', size: '1 Litre Bottle', brand: 'PZ Cussons', category: 'Household Care', costPrice: 2500.00, sellingPrice: 3100.00, stock: 140, expiryDate: '2029-04-15', status: 'Active', iconType: 'care' },
  { id: 'SKU-8824', barcode: '615110023424', name: 'Vitamin C 100mg Chewable', size: '100 Caplets', brand: 'Emzor Pharma', category: 'Supplements', costPrice: 950.00, sellingPrice: 1200.00, stock: 400, expiryDate: '2028-12-31', status: 'Active', iconType: 'meds' },
  { id: 'SKU-8825', barcode: '615110023425', name: 'Band-Aid Sterile Fabric Plasters', size: '50 Strips Box', brand: 'Johnson & Johnson', category: 'First Aid', costPrice: 2100.00, sellingPrice: 2650.00, stock: 90, expiryDate: '2029-10-31', status: 'Active', iconType: 'meds' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'out-of-stock', 'suspended'
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Pagination & Range State (Options: 10, 25, 50, 100)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const router = useRouter();

  // Selection Checkbox State
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Bulk Upload Progress & Countdown State
  const [uploadStage, setUploadStage] = useState('idle'); // 'idle' | 'uploading' | 'completed'
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('Parsing CSV rows...');
  const [countdown, setCountdown] = useState(10);
  const [uploadedFileName, setUploadedFileName] = useState('shopkite_fmcg_pharma_august_batch4.csv');
  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Bulk Action Confirmation Modal State: 'export' | 'activate' | 'suspend' | 'delete' | null
  const [bulkActionModal, setBulkActionModal] = useState(null);

  // New Product Form State
  const [name, setName] = useState('');
  const [size, setSize] = useState('500ml Bottle');
  const [brand, setBrand] = useState('Emzor Pharma');
  const [category, setCategory] = useState('Packaged Foods');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [expiryDate, setExpiryDate] = useState('2028-12-31');
  const [status, setStatus] = useState('Active');
  const [stock, setStock] = useState('100');

  // Edit Product Form State
  const [editName, setEditName] = useState('');
  const [editSize, setEditSize] = useState('');
  const [editCostPrice, setEditCostPrice] = useState('');
  const [editSellingPrice, setEditSellingPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [editStatus, setEditStatus] = useState('Active');

  // Tab Counts
  const allCount = products.length;
  const activeCount = products.filter(p => p.status === 'Active').length;
  const outOfStockCount = products.filter(p => p.status === 'Out-of-Stock').length;
  const suspendedCount = products.filter(p => p.status === 'Suspended').length;

  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'active' && p.status === 'Active') || 
      (activeTab === 'out-of-stock' && p.status === 'Out-of-Stock') ||
      (activeTab === 'suspended' && p.status === 'Suspended');

    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesTab && matchesSearch && matchesCategory;
  });

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Bulk Actions Handlers Triggered by Modal Confirmations
  const confirmBulkActivate = () => {
    setProducts(products.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Active' } : p));
    setSelectedIds([]);
    setBulkActionModal(null);
  };

  const confirmBulkSuspend = () => {
    setProducts(products.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Suspended' } : p));
    setSelectedIds([]);
    setBulkActionModal(null);
  };

  const confirmBulkDelete = () => {
    setProducts(products.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    setBulkActionModal(null);
  };

  const confirmBulkExport = () => {
    const itemsToExport = selectedIds.length > 0 
      ? products.filter(p => selectedIds.includes(p.id)) 
      : filteredProducts;

    const headers = ['SKU ID', 'Barcode', 'Product Name', 'Size', 'Brand', 'Category', 'Cost Unit Price (NGN)', 'Selling Unit Price (NGN)', 'Stock Qty', 'Expiry Date', 'Status'];
    const rows = itemsToExport.map(p => [
      p.id,
      p.barcode,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.size}"`,
      `"${p.brand}"`,
      `"${p.category}"`,
      p.costPrice,
      p.sellingPrice,
      p.stock,
      p.expiryDate,
      p.status
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shopkite-products-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setBulkActionModal(null);
  };

  const [addMode, setAddMode] = useState('single');

  const downloadCsvTemplate = (e) => {
    if (e) e.preventDefault();
    const headers = ['Barcode_GTIN', 'Product_Name', 'Size_Pack', 'Brand', 'Category', 'Cost_Price_NGN', 'Selling_Price_NGN', 'Initial_Stock', 'Expiry_Date', 'Status'];
    const sampleRows = [
      ['615110001099', 'Sample Product Item', '100g', 'Sample Brand', 'Packaged Foods', '1500.00', '2000.00', '50', '2028-12-31', 'Active'],
      ['615110001105', 'Sample Pharma SKU', '100 Caplets', 'Sample Pharma', 'Analgesics', '2800.00', '3500.00', '120', '2028-12-31', 'Active']
    ];
    const csvContent = [headers.join(','), ...sampleRows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'shopkite_product_skus_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk Upload Modal Progress & Countdown Handlers
  const resetUploadModal = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setUploadStage('idle');
    setUploadProgress(0);
    setCountdown(10);
    setShowCsvModal(false);
  };

  const startCountdown = () => {
    let timeLeft = 10;
    setCountdown(10);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdownIntervalRef.current);
        setShowCsvModal(false);
        setUploadStage('idle');
        router.push('/products/bulk-upload-results');
      }
    }, 1000);
  };

  const handleStartBulkUpload = (customFileName) => {
    if (customFileName && typeof customFileName === 'string') {
      setUploadedFileName(customFileName);
    }
    setUploadStage('uploading');
    setUploadProgress(0);
    setUploadStatusText('Reading and parsing CSV spreadsheet rows...');

    let current = 0;
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(progressIntervalRef.current);
        setUploadProgress(100);
        setUploadStatusText('Upload & catalog validation complete!');
        setUploadStage('completed');
        startCountdown();
      } else {
        setUploadProgress(current);
        if (current > 70) {
          setUploadStatusText('Registering SKUs & pack dimensions...');
        } else if (current > 35) {
          setUploadStatusText('Validating barcode checksums & GTIN registry...');
        }
      }
    }, 240);
  };

  const handleViewReportNow = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setShowCsvModal(false);
    setUploadStage('idle');
    router.push('/products/bulk-upload-results');
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Open Edit Modal
  const openEditModal = (prod) => {
    setEditTarget(prod);
    setEditName(prod.name);
    setEditSize(prod.size || '');
    setEditCostPrice(prod.costPrice ? prod.costPrice.toString() : '');
    setEditSellingPrice(prod.sellingPrice ? prod.sellingPrice.toString() : '');
    setEditStock(prod.stock.toString());
    setEditExpiryDate(prod.expiryDate || '');
    setEditStatus(prod.status);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTarget || !editName) return;

    const stockQty = parseInt(editStock, 10) || 0;
    const cost = parseFloat(editCostPrice) || editTarget.costPrice;
    const selling = parseFloat(editSellingPrice) || editTarget.sellingPrice;

    setProducts(products.map(p => {
      if (p.id === editTarget.id) {
        return {
          ...p,
          name: editName,
          size: editSize || editTarget.size,
          costPrice: cost,
          sellingPrice: selling,
          stock: stockQty,
          expiryDate: editExpiryDate || editTarget.expiryDate,
          status: editStatus,
        };
      }
      return p;
    }));

    setEditTarget(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name || !sellingPrice) return;

    const stockQty = parseInt(stock, 10) || 0;
    const cost = parseFloat(costPrice) || (parseFloat(sellingPrice) * 0.8);
    const selling = parseFloat(sellingPrice);

    const newProd = {
      id: `SKU-${Math.floor(8800 + Math.random() * 1000)}`,
      barcode: barcode || `${Math.floor(615110000000 + Math.random() * 999999)}`,
      name,
      size: size || 'Standard',
      brand: brand || 'ShopKite Merchant',
      category,
      costPrice: cost,
      sellingPrice: selling,
      stock: stockQty,
      expiryDate: expiryDate || '2028-12-31',
      status: status || 'Active',
      iconType: ['Analgesics', 'Antibiotics', 'Supplements', 'First Aid'].includes(category) ? 'meds' : 'food',
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    setName('');
    setSize('');
    setCostPrice('');
    setSellingPrice('');
    setBarcode('');
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProducts(products.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const getStatusBadge = (statusVal) => {
    switch (statusVal) {
      case 'Active':
        return <span className="badge badge-success"><span className="badge-dot"></span> Active</span>;
      case 'Out-of-Stock':
        return <span className="badge badge-warning"><span className="badge-dot"></span> Out of Stock</span>;
      case 'Suspended':
        return <span className="badge badge-danger"><span className="badge-dot"></span> Suspended</span>;
      default:
        return <span className="badge badge-neutral">{statusVal}</span>;
    }
  };

  const renderProductSvgIcon = (type) => {
    switch (type) {
      case 'meds':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"></path>
            <path d="M8.5 8.5l7 7"></path>
          </svg>
        );
      case 'beverage':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="2" x2="6" y2="4"></line>
            <line x1="10" y1="2" x2="10" y2="4"></line>
            <line x1="14" y1="2" x2="14" y2="4"></line>
          </svg>
        );
      case 'care':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'food':
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
    }
  };

  const isAllSelected = paginatedProducts.length > 0 && paginatedProducts.every(p => selectedIds.includes(p.id));

  return (
    <AdminSidebar>
      <div style={{ padding: '32px 32px 60px 32px', fontFamily: 'var(--font-roboto), sans-serif', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', width: '100%', minWidth: 0, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
          
          {/* Header & Page Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 300, fontStyle: 'normal', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Products <span style={{ color: '#ff6600', fontStyle: 'normal', fontWeight: 500 }}>(SKUs)</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Manage Product SKUs for FMCG consumer brands, pharmaceutical products, pack sizes, expiry dates, and unit margins.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                href="/products/upload-history"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Update History
              </Link>
              <button className="btn btn-secondary" onClick={() => setShowCsvModal(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Bulk Product Edit
              </button>
              <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => setShowAddModal(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Product(s) SKU
              </button>
            </div>
          </div>

          {/* Filter Status Tabs (All Products, Active, Out-of-Stock, Suspended) */}
          <div className="filter-tabs-container" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px',
          }}>
            {[
              { id: 'all', label: 'All Products', count: allCount },
              { id: 'active', label: 'Active', count: activeCount },
              { id: 'out-of-stock', label: 'Out-of-Stock', count: outOfStockCount },
              { id: 'suspended', label: 'Suspended', count: suspendedCount },
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
            
            {/* Filter & Action Bar */}
            <div style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1 1 320px' }}>
                <input
                  type="text"
                  placeholder="Search product, SKU, or barcode..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="input-field"
                />
              </div>

              {/* Bulk Action Controls if items are checked */}
              {selectedIds.length > 0 ? (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#fff7ed', padding: '6px 14px', borderRadius: '10px', border: '1px solid #ffedd5' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#ff6600' }}>
                    {selectedIds.length} item(s) selected
                  </span>
                  
                  {/* Export Action Button with Confirm Popup */}
                  <button onClick={() => setBulkActionModal('export')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#ff6600', borderColor: 'rgba(255,102,0,0.3)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Export Selected
                  </button>

                  {/* Set Active Button */}
                  <button onClick={() => setBulkActionModal('activate')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#64748b' }}>
                    Set Active
                  </button>

                  {/* Suspend Button */}
                  <button onClick={() => setBulkActionModal('suspend')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#64748b' }}>
                    Suspend
                  </button>

                  {/* Delete Button */}
                  <button onClick={() => setBulkActionModal('delete')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: '#64748b' }}>
                    Delete
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* Export All Button when no checkbox selection */}
                  <button onClick={() => setBulkActionModal('export')} className="btn btn-secondary" style={{ padding: '10px 14px', fontSize: '13px', color: '#64748b' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Export CSV
                  </button>

                  <select
                    className="input-field"
                    style={{ width: '200px' }}
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Categories</option>
                    <option value="Packaged Foods">Packaged Foods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Household Care">Household Care</option>
                    <option value="Analgesics">Analgesics</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Supplements">Supplements</option>
                    <option value="First Aid">First Aid</option>
                  </select>
                </div>
              )}
            </div>

            {/* Products Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px', paddingRight: '0' }}>
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        style={{ cursor: 'pointer' }}
                      />
                    </th>
                    <th>Product & brand</th>
                    <th>SKU & barcode</th>
                    <th>Category</th>
                    <th>Size / pack</th>
                    <th>Stock qty</th>
                    <th>Cost unit price (₦)</th>
                    <th>Selling unit price (₦)</th>
                    <th>Expiry date</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={11} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        No products found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((prod) => {
                      const isChecked = selectedIds.includes(prod.id);
                      return (
                        <tr key={prod.id} style={{ background: isChecked ? '#fff7ed' : 'transparent' }}>
                          <td style={{ paddingRight: '0' }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleSelectRow(prod.id)}
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                          <td>
                            <div>
                              <div
                                onClick={() => openEditModal(prod)}
                                style={{ fontWeight: 600, color: '#1e293b', cursor: 'pointer', transition: 'color 0.15s ease' }}
                                onMouseEnter={(e) => e.target.style.color = '#ff6600'}
                                onMouseLeave={(e) => e.target.style.color = '#1e293b'}
                              >
                                {prod.name}
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748b' }}>{prod.brand}</div>
                            </div>
                          </td>
                          <td>
                            <div style={{ fontFamily: 'monospace', color: '#ff6600', fontWeight: 600, fontSize: '13px' }}>
                              {prod.id}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                              {prod.barcode}
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
                            }}>
                              {prod.category}
                            </span>
                          </td>
                          <td>
                            <span style={{
                              fontSize: '13px',
                              fontWeight: 500,
                              color: '#475569',
                            }}>
                              {prod.size}
                            </span>
                          </td>
                          <td>
                            <span style={{
                              fontWeight: 600,
                              color: '#64748b',
                            }}>
                              {prod.stock} units
                            </span>
                          </td>
                          <td style={{ color: '#64748b', fontSize: '13.5px' }}>
                            ₦{prod.costPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ fontWeight: 600, color: '#1e293b' }}>
                            ₦{prod.sellingPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                          </td>
                          <td>
                            <span style={{
                              fontSize: '12.5px',
                              fontFamily: 'monospace',
                              color: '#475569',
                            }}>
                              {prod.expiryDate}
                            </span>
                          </td>
                          <td>{getStatusBadge(prod.status)}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setDeleteTarget(prod)}
                                className="btn btn-secondary"
                                style={{ padding: '6px 12px', fontSize: '12px', color: '#64748b' }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination & Range Selector Footer (10, 25, 50, 100) */}
            <div className="admin-pagination-card">
              <div className="admin-pagination-info">
                Showing <strong>{filteredProducts.length === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> SKUs
                
                {/* Per Page Range Selector Dropdown */}
                <span style={{ marginLeft: '16px', color: '#64748b', fontSize: '13px' }}>
                  Show:{' '}
                  <select
                    className="admin-pagination-select"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      color: '#1e293b',
                      background: '#ffffff',
                      cursor: 'pointer',
                      margin: '0 4px',
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  per page
                </span>
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
                  disabled={currentPage === totalPages || filteredProducts.length === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next ❯
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bulk Actions Confirmation Pop-up Modals ──────────────── */}
      {bulkActionModal && (
        <Portal>
          <div className="modal-overlay" onClick={() => setBulkActionModal(null)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '440px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Bulk Export Confirmation Popup */}
            {bulkActionModal === 'export' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Confirm CSV Export
                  </h2>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  You are about to export <strong>{selectedIds.length > 0 ? selectedIds.length : filteredProducts.length}</strong> product SKUs into a CSV spreadsheet file. Do you wish to proceed with the download?
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-secondary" onClick={() => setBulkActionModal(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={confirmBulkExport}>
                    Confirm & Download CSV
                  </button>
                </div>
              </>
            )}

            {/* 2. Bulk Set Active Confirmation Popup */}
            {bulkActionModal === 'activate' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Set Products as Active
                  </h2>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Are you sure you want to mark <strong>{selectedIds.length}</strong> selected product(s) as <strong>Active</strong>? They will become immediately available for retail transactions across all connected store channels.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-secondary" onClick={() => setBulkActionModal(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={confirmBulkActivate}>
                    Confirm & Set Active
                  </button>
                </div>
              </>
            )}

            {/* 3. Bulk Suspend Confirmation Popup */}
            {bulkActionModal === 'suspend' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Suspend Selected Products
                  </h2>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Are you sure you want to <strong>Suspend {selectedIds.length}</strong> selected product(s)? Suspended products will be immediately hidden from checkout scanners and POS products lists until reactivated.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-secondary" onClick={() => setBulkActionModal(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={confirmBulkSuspend}>
                    Confirm Suspension
                  </button>
                </div>
              </>
            )}

            {/* 4. Bulk Delete Confirmation Popup */}
            {bulkActionModal === 'delete' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Delete Selected Products
                  </h2>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  You are about to permanently delete <strong>{selectedIds.length}</strong> selected product SKU(s) from the database. <strong>This action cannot be undone.</strong>
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-secondary" onClick={() => setBulkActionModal(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={confirmBulkDelete}>
                    Permanently Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        </Portal>
      )}

      {/* Modal: Pop-up to Edit Product (Name, Size, Cost Unit Price, Selling Unit Price, Quantity, Expiry Date, Status) */}
      {editTarget && (
        <Portal>
          <div className="modal-overlay" onClick={() => setEditTarget(null)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '520px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>
                  Edit Product SKU
                </h2>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#ff6600' }}>
                  {editTarget.id} — {editTarget.barcode}
                </div>
              </div>
              <button
                onClick={() => setEditTarget(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Product Name & Size Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Product Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Size / Pack</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500ml Bottle"
                    value={editSize}
                    onChange={(e) => setEditSize(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Cost & Selling Unit Price Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Cost Unit Price (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editCostPrice}
                    onChange={(e) => setEditCostPrice(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Selling Unit Price (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editSellingPrice}
                    onChange={(e) => setEditSellingPrice(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Quantity, Expiry Date & Status Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Stock Qty</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Expiry Date</label>
                  <input
                    type="date"
                    value={editExpiryDate}
                    onChange={(e) => setEditExpiryDate(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Status</label>
                  <select
                    className="input-field"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Out-of-Stock">Out-of-Stock</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditTarget(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        </Portal>
      )}

      {/* Modal: Delete Single Product SKU */}
      {deleteTarget && (
        <Portal>
          <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '440px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Delete Product SKU
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Are you sure you want to delete <strong>&ldquo;{deleteTarget.name}&rdquo;</strong>? This item will be permanently removed from the products list.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" style={{ background: '#ff6600', color: '#fff' }} onClick={confirmDelete}>
                Delete Item
              </button>
            </div>
          </div>
        </div>
        </Portal>
      )}

      {/* Modal: Add Product(s) SKU */}
      {showAddModal && (
        <Portal>
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '560px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                  Add Product(s) SKU
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0 0' }}>
                  Register individual Product SKUs manually or import multiple products via CSV.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <button
                type="button"
                onClick={() => setAddMode('single')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: addMode === 'single' ? 600 : 500,
                  background: addMode === 'single' ? '#fff7ed' : 'transparent',
                  color: addMode === 'single' ? '#ff6600' : '#64748b',
                  border: addMode === 'single' ? '1px solid #ffedd5' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Add new single Product SKU
              </button>
              <button
                type="button"
                onClick={() => setAddMode('bulk')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: addMode === 'bulk' ? 600 : 500,
                  background: addMode === 'bulk' ? '#fff7ed' : 'transparent',
                  color: addMode === 'bulk' ? '#ff6600' : '#64748b',
                  border: addMode === 'bulk' ? '1px solid #ffedd5' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Add multiple new Product SKUs
              </button>
            </div>

            {/* SECTION 1: Single SKU Form */}
            {addMode === 'single' && (
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Add new single Product SKU
                  </h3>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Enter details to register an individual Product SKU.
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emzor Paracetamol"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Size / Pack Size</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 100 Caplets"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Brand / Manufacturer</label>
                    <input
                      type="text"
                      placeholder="e.g. Emzor Pharma"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Category</label>
                    <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="Packaged Foods">Packaged Foods</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Personal Care">Personal Care</option>
                      <option value="Household Care">Household Care</option>
                      <option value="Analgesics">Analgesics</option>
                      <option value="Antibiotics">Antibiotics</option>
                      <option value="Supplements">Supplements</option>
                      <option value="First Aid">First Aid</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Cost Unit Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="2800.00"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Selling Unit Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="3500.00"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Stock Quantity</label>
                    <input
                      type="number"
                      required
                      placeholder="100"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Expiry Date</label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Status</label>
                    <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="Out-of-Stock">Out-of-Stock</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }}>
                    Save SKU
                  </button>
                </div>
              </form>
            )}

            {/* SECTION 2: Bulk CSV Upload for Multiple New Product SKUs */}
            {addMode === 'bulk' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    Add multiple new Product SKUs
                  </h3>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Bulk register new Product SKUs by uploading a formatted spreadsheet.
                  </span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const selectedFile = e.target.files[0].name;
                      setShowAddModal(false);
                      setShowCsvModal(true);
                      handleStartBulkUpload(selectedFile);
                    }
                  }}
                />

                {/* Drag and Drop Zone */}
                <div
                  onClick={() => fileInputRef.current ? fileInputRef.current.click() : null}
                  style={{
                    padding: '36px 20px',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff6600';
                    e.currentTarget.style.background = '#fff7ed';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff6600',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                      Drag and drop your .csv file here
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                      Or click to browse from your computer
                    </div>
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={downloadCsvTemplate}
                    className="btn btn-secondary"
                    style={{ fontSize: '13px', color: '#ff6600', background: '#fff7ed', borderColor: '#ffedd5', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download template csv
                  </button>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ background: '#ff6600', color: '#ffffff' }}
                      onClick={() => {
                        setShowAddModal(false);
                        setShowCsvModal(true);
                        handleStartBulkUpload('new_products_batch.csv');
                      }}
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </Portal>
      )}

      {/* Modal: Bulk Upload CSV */}
      {showCsvModal && (
        <Portal>
          <div className="modal-overlay" onClick={resetUploadModal}>
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '500px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                {uploadStage === 'idle' && 'Upload Edited Products'}
                {uploadStage === 'uploading' && 'File Uploading...'}
                {uploadStage === 'completed' && 'File Uploaded Successfully'}
              </h2>
              <button
                onClick={resetUploadModal}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* STAGE 1: Idle / File Picker */}
            {uploadStage === 'idle' && (
              <>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Only upload edited products that were downloaded from the products SKU page, for fresh uploads, use the <strong><em>Add Product(s) SKU</em></strong> button
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const selectedFile = e.target.files[0].name;
                      setUploadedFileName(selectedFile);
                      handleStartBulkUpload(selectedFile);
                    }
                  }}
                />

                <div
                  onClick={() => fileInputRef.current ? fileInputRef.current.click() : handleStartBulkUpload()}
                  style={{
                    padding: '32px 20px',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff6600'; e.currentTarget.style.background = '#fffbf8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6600' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                      Drag and drop your .csv file here
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                      Or click to browse from computer
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '8px' }}>
                  <button className="btn btn-primary" style={{ background: '#ff6600', color: '#ffffff' }} onClick={() => handleStartBulkUpload()}>
                    Upload File
                  </button>
                </div>
              </>
            )}

            {/* STAGE 2: Uploading with Progress Bar */}
            {uploadStage === 'uploading' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Processing batch <strong style={{ color: '#ff6600', fontFamily: 'monospace' }}>IMP-2026-0831-B4</strong> and validating GTIN records.
                </p>

                {/* Progress Card */}
                <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                      {uploadStatusText}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#ff6600' }}>
                      {uploadProgress}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #ff8533, #ff6600)',
                        borderRadius: '9999px',
                        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button className="btn btn-secondary" onClick={resetUploadModal}>
                    Cancel Upload
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: Completed with Countdown & Instant View Button */}
            {uploadStage === 'completed' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Success Card */}
                <div style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#fff7ed',
                  border: '1px solid #ffedd5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ff6600', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>
                      File Uploaded Successfully
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#ff6600' }}>{uploadedFileName}</span> uploaded successfully
                    </div>
                  </div>
                </div>

                {/* Countdown Alert Banner */}
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#fff7ed',
                  border: '1px solid #ffedd5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}>
                  <div style={{ fontSize: '13.5px', color: '#475569' }}>
                    Redirecting to Upload Status in <strong style={{ color: '#ff6600', fontSize: '15px' }}>{countdown} seconds...</strong>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6600' }}></div>
                </div>

                {/* Modal Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <button className="btn btn-secondary" onClick={resetUploadModal} style={{ color: '#64748b' }}>
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ background: '#ff6600', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onClick={handleViewReportNow}
                  >
                    View Upload Status ➔
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
        </Portal>
      )}
    </AdminSidebar>
  );
}
