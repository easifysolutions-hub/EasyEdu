import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CurrencyService } from '../../core/services/currency.service';

declare const Swal: any;

export interface InventoryAsset {
  id: number;
  itemCode: string;
  name: string;
  category: string;
  store: string;
  unit: string;
  inStock: number;
  minimumStock: number;
  unitPrice: number;
  supplier: string;
  condition: string;
  barcode: string;
}

export interface IssuedItemRecord {
  id: number;
  itemCode: string;
  itemName: string;
  issuedToName: string;
  issuedToType: 'Student' | 'Staff' | 'Department';
  quantity: number;
  issueDate: string;
  returnDueDate?: string;
  status: 'Issued' | 'Returned';
  remarks?: string;
}

export interface ProcurementRecord {
  id: number;
  poNumber: string;
  supplierName: string;
  itemName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  receivedDate: string;
  invoiceNo: string;
  status: 'Received' | 'Inspected' | 'Paid';
}

export interface ItemSupplier {
  id: number;
  supplierCode: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  activeOrders: number;
}

export interface ItemCategory {
  id: number;
  code: string;
  name: string;
  description: string;
  itemCount: number;
  totalValuation: number;
}

export interface AuditTransaction {
  id: number;
  timestamp: string;
  actionType: 'Procurement' | 'Issuance' | 'Return' | 'Stock Adjustment' | 'Write-off';
  itemName: string;
  itemCode: string;
  quantity: number;
  performedBy: string;
  referenceNo: string;
  details: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  currencyService = inject(CurrencyService);
  activeTab: 'registry' | 'categories' | 'suppliers' | 'receive' | 'issue' | 'transactions' | 'reports' = 'registry';
  searchTerm = '';
  categoryFilter = 'All';

  // 1. Asset Registry State
  items: InventoryAsset[] = [
    { id: 1, itemCode: 'AST-1001', name: 'A4 Printing Paper Ream (75 GSM)', category: 'Stationery & Office', store: 'Main Admin Store', unit: 'Ream', inStock: 120, minimumStock: 30, unitPrice: 280, supplier: 'National Paper Mart', condition: 'Brand New', barcode: 'BAR-892101' },
    { id: 2, itemCode: 'AST-1002', name: 'Whiteboard Marker Pens (Box of 10)', category: 'Classroom Supplies', store: 'Academic Wing Store', unit: 'Box', inStock: 45, minimumStock: 15, unitPrice: 350, supplier: 'Camlin Educational', condition: 'Brand New', barcode: 'BAR-892102' },
    { id: 3, itemCode: 'AST-1003', name: 'Football Match Balls (Size 5)', category: 'Sports Goods', store: 'Athletic Pavilion', unit: 'Piece', inStock: 18, minimumStock: 10, unitPrice: 1200, supplier: 'Nivia Sports India', condition: 'Good', barcode: 'BAR-892103' },
    { id: 4, itemCode: 'AST-1004', name: 'Physics Optical Glass Prism & Lens Kit', category: 'Science Laboratory', store: 'Physics Lab Store', unit: 'Kit', inStock: 25, minimumStock: 8, unitPrice: 1850, supplier: 'Scientific Lab Equipments Ltd', condition: 'Precision Calibrated', barcode: 'BAR-892104' },
    { id: 5, itemCode: 'AST-1005', name: 'School Uniform Blazer (Medium - Navy)', category: 'Uniforms & Apparel', store: 'Uniform Store', unit: 'Piece', inStock: 60, minimumStock: 20, unitPrice: 1450, supplier: 'Raymond Apparels', condition: 'Brand New', barcode: 'BAR-892105' },
    { id: 6, itemCode: 'AST-1006', name: 'Digital Overhead Projector (HD 4K)', category: 'IT & Electronics', store: 'Tech Media Center', unit: 'Unit', inStock: 12, minimumStock: 4, unitPrice: 42000, supplier: 'Epson Systems India', condition: 'Operational', barcode: 'BAR-892106' }
  ];

  // 2. Category Logic State
  categories: ItemCategory[] = [
    { id: 1, code: 'STAT', name: 'Stationery & Office', description: 'General paper, pens, binders, official folders', itemCount: 120, totalValuation: 33600 },
    { id: 2, code: 'CLAS', name: 'Classroom Supplies', description: 'Whiteboards, markers, chalks, dusters, charts', itemCount: 45, totalValuation: 15750 },
    { id: 3, code: 'SPRT', name: 'Sports Goods', description: 'Athletic footballs, basketballs, kits, nets', itemCount: 18, totalValuation: 21600 },
    { id: 4, code: 'LABS', name: 'Science Laboratory', description: 'Glassware, chemical reagents, optics, sensors', itemCount: 25, totalValuation: 46250 },
    { id: 5, code: 'UNIF', name: 'Uniforms & Apparel', description: 'Institutional blazers, shirts, ties, badges', itemCount: 60, totalValuation: 87000 },
    { id: 6, code: 'ELEC', name: 'IT & Electronics', description: 'Smart boards, projectors, audio mic systems', itemCount: 12, totalValuation: 504000 }
  ];

  // 3. Supplier Nexus State
  suppliers: ItemSupplier[] = [
    { id: 1, supplierCode: 'SUP-001', name: 'National Paper Mart', contactPerson: 'Mr. Arvind Saxena', phone: '+91 98450 77101', email: 'sales@nationalpaper.com', address: 'Commercial Street, Bengaluru', rating: 4.8, activeOrders: 2 },
    { id: 2, supplierCode: 'SUP-002', name: 'Scientific Lab Equipments Ltd', contactPerson: 'Dr. V.K. Rao', phone: '+91 98450 77102', email: 'support@scientificlab.in', address: 'Peenya Industrial Area, Bengaluru', rating: 4.9, activeOrders: 1 },
    { id: 3, supplierCode: 'SUP-003', name: 'Nivia Sports India', contactPerson: 'Harpreet Singh', phone: '+91 98450 77103', email: 'orders@niviasports.com', address: 'Sports Complex Road, Jalandhar', rating: 4.7, activeOrders: 0 },
    { id: 4, supplierCode: 'SUP-004', name: 'Raymond Apparels', contactPerson: 'Sunil Mehta', phone: '+91 98450 77104', email: 'corporate@raymond.in', address: 'MG Road Hub, Mumbai', rating: 4.6, activeOrders: 3 },
    { id: 5, supplierCode: 'SUP-005', name: 'Epson Systems India', contactPerson: 'Anand Kumar', phone: '+91 98450 77105', email: 'b2b@epson.co.in', address: 'Electronic City, Bengaluru', rating: 5.0, activeOrders: 1 }
  ];

  // 4. Procurement Log State
  procurements: ProcurementRecord[] = [
    { id: 1, poNumber: 'PO-2026-081', supplierName: 'National Paper Mart', itemName: 'A4 Printing Paper Ream (75 GSM)', category: 'Stationery & Office', quantity: 100, unitPrice: 280, totalCost: 28000, receivedDate: '2026-10-02', invoiceNo: 'INV-NP-8821', status: 'Received' },
    { id: 2, poNumber: 'PO-2026-079', supplierName: 'Epson Systems India', itemName: 'Digital Overhead Projector (HD 4K)', category: 'IT & Electronics', quantity: 5, unitPrice: 42000, totalCost: 210000, receivedDate: '2026-09-28', invoiceNo: 'INV-EP-3341', status: 'Inspected' },
    { id: 3, poNumber: 'PO-2026-075', supplierName: 'Raymond Apparels', itemName: 'School Uniform Blazer (Medium - Navy)', category: 'Uniforms & Apparel', quantity: 50, unitPrice: 1450, totalCost: 72500, receivedDate: '2026-09-20', invoiceNo: 'INV-RM-1092', status: 'Paid' }
  ];

  // 5. Asset Issuance State
  issuedItems: IssuedItemRecord[] = [
    { id: 101, itemCode: 'AST-1002', itemName: 'Whiteboard Marker Pens (Box of 10)', issuedToName: 'Dr. Ramesh Sharma', issuedToType: 'Staff', quantity: 2, issueDate: '2026-10-01', returnDueDate: '2026-10-30', status: 'Issued', remarks: 'Classroom teaching kit' },
    { id: 102, itemCode: 'AST-1003', itemName: 'Football Match Balls (Size 5)', issuedToName: 'Sports Dept (Kabir Singh)', issuedToType: 'Student', quantity: 3, issueDate: '2026-10-03', returnDueDate: '2026-10-05', status: 'Returned', remarks: 'Inter-school tournament' },
    { id: 103, itemCode: 'AST-1001', itemName: 'A4 Printing Paper Ream (75 GSM)', issuedToName: 'Examination Cell', issuedToType: 'Department', quantity: 15, issueDate: '2026-09-28', status: 'Issued', remarks: 'Mid-term question paper printing' }
  ];

  // 6. Audit Trail State
  auditTrail: AuditTransaction[] = [
    { id: 501, timestamp: '2026-10-05 14:32', actionType: 'Procurement', itemName: 'A4 Printing Paper Ream (75 GSM)', itemCode: 'AST-1001', quantity: 100, performedBy: 'System Administrator', referenceNo: 'PO-2026-081', details: 'Added 100 units to Main Admin Store from National Paper Mart' },
    { id: 502, timestamp: '2026-10-03 10:15', actionType: 'Issuance', itemName: 'Football Match Balls (Size 5)', itemCode: 'AST-1003', quantity: 3, performedBy: 'Store Manager', referenceNo: 'ISS-0092', details: 'Issued to Kabir Singh (Student Captain)' },
    { id: 503, timestamp: '2026-10-05 16:45', actionType: 'Return', itemName: 'Football Match Balls (Size 5)', itemCode: 'AST-1003', quantity: 3, performedBy: 'Store Manager', referenceNo: 'RET-0041', details: 'Returned in good playable condition' },
    { id: 504, timestamp: '2026-10-01 09:20', actionType: 'Issuance', itemName: 'Whiteboard Marker Pens (Box of 10)', itemCode: 'AST-1002', quantity: 2, performedBy: 'Academic Bursar', referenceNo: 'ISS-0089', details: 'Issued to Dr. Ramesh Sharma for Science block' }
  ];

  // Forms and Modals
  showAddItemModal = false;
  newItem: Partial<InventoryAsset> = {
    name: '',
    category: 'Stationery & Office',
    store: 'Main Admin Store',
    unit: 'Piece',
    inStock: 10,
    minimumStock: 5,
    unitPrice: 100,
    supplier: 'National Paper Mart',
    condition: 'Brand New'
  };

  showIssueModal = false;
  issueForm = {
    itemName: 'A4 Printing Paper Ream (75 GSM)',
    issuedToName: '',
    issuedToType: 'Staff' as const,
    quantity: 1,
    returnDueDate: new Date(Date.now() + 14 * 86400000).toISOString().substring(0, 10),
    remarks: ''
  };

  showProcureModal = false;
  procureForm = {
    supplierName: 'National Paper Mart',
    itemName: '',
    category: 'Stationery & Office',
    quantity: 10,
    unitPrice: 250,
    invoiceNo: ''
  };

  showAddSupplierModal = false;
  newSupplier: Partial<ItemSupplier> = {
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: ''
  };

  showAddCategoryModal = false;
  newCategory: Partial<ItemCategory> = {
    name: '',
    code: '',
    description: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.syncActiveTabFromUrl();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.syncActiveTabFromUrl();
    });
  }

  private syncActiveTabFromUrl(): void {
    const url = this.router.url.toLowerCase();
    if (url.includes('itemcategory')) {
      this.activeTab = 'categories';
    } else if (url.includes('supplier')) {
      this.activeTab = 'suppliers';
    } else if (url.includes('itemreceive')) {
      this.activeTab = 'receive';
    } else if (url.includes('issueitem')) {
      this.activeTab = 'issue';
    } else if (url.includes('transactions')) {
      this.activeTab = 'transactions';
    } else if (url.includes('reports')) {
      this.activeTab = 'reports';
    } else {
      this.activeTab = 'registry';
    }
  }

  get totalItemsCount(): number {
    return this.items.reduce((acc, i) => acc + i.inStock, 0);
  }

  get totalValuation(): number {
    return this.items.reduce((acc, i) => acc + (i.inStock * i.unitPrice), 0);
  }

  get lowStockCount(): number {
    return this.items.filter(i => i.inStock <= i.minimumStock).length;
  }

  get totalIssuedCount(): number {
    return this.issuedItems.filter(i => i.status === 'Issued').reduce((acc, i) => acc + i.quantity, 0);
  }

  get filteredItems(): InventoryAsset[] {
    return this.items.filter(i => {
      const matchCat = this.categoryFilter === 'All' || i.category === this.categoryFilter;
      const matchSearch = !this.searchTerm ||
        i.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.itemCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.store.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  saveItem(): void {
    if (!this.newItem.name) {
      Swal.fire('Missing Name', 'Please enter Item Name.', 'warning');
      return;
    }

    const item: InventoryAsset = {
      id: Date.now(),
      itemCode: `AST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: this.newItem.name,
      category: this.newItem.category || 'Stationery & Office',
      store: this.newItem.store || 'Main Admin Store',
      unit: this.newItem.unit || 'Piece',
      inStock: Number(this.newItem.inStock) || 10,
      minimumStock: Number(this.newItem.minimumStock) || 5,
      unitPrice: Number(this.newItem.unitPrice) || 100,
      supplier: this.newItem.supplier || 'National Paper Mart',
      condition: this.newItem.condition || 'Brand New',
      barcode: `BAR-${Math.floor(800000 + Math.random() * 100000)}`
    };

    this.items.unshift(item);
    
    // Add audit trail
    this.auditTrail.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actionType: 'Stock Adjustment',
      itemName: item.name,
      itemCode: item.itemCode,
      quantity: item.inStock,
      performedBy: 'System Administrator',
      referenceNo: 'REG-NEW',
      details: `Asset registered into ${item.store}`
    });

    this.showAddItemModal = false;
    this.newItem = { name: '', category: 'Stationery & Office', store: 'Main Admin Store', unit: 'Piece', inStock: 10, minimumStock: 5, unitPrice: 100, condition: 'Brand New' };

    Swal.fire('Asset Registered', 'New inventory asset added to registry catalog.', 'success');
  }

  submitIssueItem(): void {
    if (!this.issueForm.issuedToName) {
      Swal.fire('Missing Recipient', 'Please specify who the item is being issued to.', 'warning');
      return;
    }

    const targetItem = this.items.find(i => i.name === this.issueForm.itemName);
    if (targetItem) {
      if (targetItem.inStock < this.issueForm.quantity) {
        Swal.fire('Insufficient Stock', `Only ${targetItem.inStock} ${targetItem.unit} remaining in stock.`, 'error');
        return;
      }
      targetItem.inStock -= this.issueForm.quantity;
    }

    const newIssue: IssuedItemRecord = {
      id: 100 + this.issuedItems.length + 1,
      itemCode: targetItem ? targetItem.itemCode : 'AST-0000',
      itemName: this.issueForm.itemName,
      issuedToName: this.issueForm.issuedToName,
      issuedToType: this.issueForm.issuedToType,
      quantity: Number(this.issueForm.quantity),
      issueDate: new Date().toISOString().substring(0, 10),
      returnDueDate: this.issueForm.returnDueDate,
      status: 'Issued',
      remarks: this.issueForm.remarks
    };

    this.issuedItems.unshift(newIssue);

    this.auditTrail.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actionType: 'Issuance',
      itemName: newIssue.itemName,
      itemCode: newIssue.itemCode,
      quantity: newIssue.quantity,
      performedBy: 'Store Manager',
      referenceNo: `ISS-${newIssue.id}`,
      details: `Issued ${newIssue.quantity} units to ${newIssue.issuedToName} (${newIssue.issuedToType})`
    });

    this.showIssueModal = false;
    this.activeTab = 'issue';

    Swal.fire('Asset Issued', 'Stock updated and issuance voucher registered.', 'success');
  }

  returnIssuedItem(record: IssuedItemRecord): void {
    record.status = 'Returned';
    const targetItem = this.items.find(i => i.name === record.itemName);
    if (targetItem) {
      targetItem.inStock += record.quantity;
    }

    this.auditTrail.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actionType: 'Return',
      itemName: record.itemName,
      itemCode: record.itemCode,
      quantity: record.quantity,
      performedBy: 'Store Manager',
      referenceNo: `RET-${record.id}`,
      details: `Returned from ${record.issuedToName} back to store stock`
    });

    Swal.fire('Item Returned', 'Item marked returned and returned to store inventory.', 'success');
  }

  saveProcurement(): void {
    if (!this.procureForm.itemName) {
      Swal.fire('Missing Details', 'Please specify Item Name for procurement.', 'warning');
      return;
    }

    const cost = Number(this.procureForm.quantity) * Number(this.procureForm.unitPrice);
    const newProc: ProcurementRecord = {
      id: Date.now(),
      poNumber: `PO-2026-0${Math.floor(80 + Math.random() * 20)}`,
      supplierName: this.procureForm.supplierName,
      itemName: this.procureForm.itemName,
      category: this.procureForm.category,
      quantity: Number(this.procureForm.quantity),
      unitPrice: Number(this.procureForm.unitPrice),
      totalCost: cost,
      receivedDate: new Date().toISOString().substring(0, 10),
      invoiceNo: this.procureForm.invoiceNo || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Received'
    };

    this.procurements.unshift(newProc);

    // Update item stock or create
    const existing = this.items.find(i => i.name.toLowerCase() === newProc.itemName.toLowerCase());
    if (existing) {
      existing.inStock += newProc.quantity;
    }

    this.auditTrail.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actionType: 'Procurement',
      itemName: newProc.itemName,
      itemCode: existing ? existing.itemCode : 'AST-NEW',
      quantity: newProc.quantity,
      performedBy: 'Procurement Officer',
      referenceNo: newProc.poNumber,
      details: `Received ${newProc.quantity} units from ${newProc.supplierName}`
    });

    this.showProcureModal = false;
    this.activeTab = 'receive';

    Swal.fire('Procurement Logged', 'Purchase reception documented and stock levels updated.', 'success');
  }

  saveCategory(): void {
    if (!this.newCategory.name || !this.newCategory.code) {
      Swal.fire('Missing Fields', 'Please fill Category Name and Code.', 'warning');
      return;
    }

    this.categories.push({
      id: Date.now(),
      code: this.newCategory.code!.toUpperCase(),
      name: this.newCategory.name!,
      description: this.newCategory.description || '',
      itemCount: 0,
      totalValuation: 0
    });

    this.showAddCategoryModal = false;
    this.newCategory = { name: '', code: '', description: '' };
    Swal.fire('Category Registered', 'New category logic created.', 'success');
  }

  saveSupplier(): void {
    if (!this.newSupplier.name || !this.newSupplier.phone) {
      Swal.fire('Missing Fields', 'Please fill Supplier Name and Phone.', 'warning');
      return;
    }

    this.suppliers.push({
      id: Date.now(),
      supplierCode: `SUP-00${this.suppliers.length + 1}`,
      name: this.newSupplier.name!,
      contactPerson: this.newSupplier.contactPerson || 'Account Representative',
      phone: this.newSupplier.phone!,
      email: this.newSupplier.email || 'contact@supplier.com',
      address: this.newSupplier.address || 'Commercial Center',
      rating: 5.0,
      activeOrders: 0
    });

    this.showAddSupplierModal = false;
    this.newSupplier = { name: '', contactPerson: '', phone: '', email: '', address: '' };
    Swal.fire('Supplier Registered', 'New supplier profile added to Nexus.', 'success');
  }
}
