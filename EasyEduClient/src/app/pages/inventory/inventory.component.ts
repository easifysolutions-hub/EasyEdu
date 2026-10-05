import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  store: string;
  unit: string;
  inStock: number;
  minimumStock: number;
  unitPrice: number;
  supplier: string;
}

interface IssuedItemRecord {
  id: number;
  itemName: string;
  issuedToName: string;
  issuedToType: 'Student' | 'Staff' | 'Department';
  quantity: number;
  issueDate: string;
  returnDueDate?: string;
  status: 'Issued' | 'Returned';
}

interface ItemSupplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  activeTab: 'items' | 'issue' | 'receive' | 'suppliers' | 'categories' = 'items';
  searchTerm = '';
  categoryFilter = 'All';

  items: InventoryItem[] = [
    { id: 1, name: 'A4 Printing Paper Ream (75 GSM)', category: 'Stationery & Office', store: 'Main Admin Store', unit: 'Ream', inStock: 120, minimumStock: 30, unitPrice: 280, supplier: 'National Paper Mart' },
    { id: 2, name: 'Whiteboard Marker Pens (Box of 10)', category: 'Classroom Supplies', store: 'Academic Wing Store', unit: 'Box', inStock: 45, minimumStock: 15, unitPrice: 350, supplier: 'Camlin Educational' },
    { id: 3, name: 'Football Match Balls (Size 5)', category: 'Sports Goods', store: 'Athletic Pavilion', unit: 'Piece', inStock: 18, minimumStock: 10, unitPrice: 1200, supplier: 'Nivia Sports India' },
    { id: 4, name: 'Physics Optical Glass Prism & Lens Kit', category: 'Science Laboratory', store: 'Physics Lab Store', unit: 'Kit', inStock: 25, minimumStock: 8, unitPrice: 1850, supplier: 'Scientific Lab Equipments' },
    { id: 5, name: 'School Uniform Blazer (Medium - Navy)', category: 'Uniforms & Apparel', store: 'Uniform Store', unit: 'Piece', inStock: 60, minimumStock: 20, unitPrice: 1450, supplier: 'Raymond Apparels' }
  ];

  issuedItems: IssuedItemRecord[] = [
    { id: 101, itemName: 'Whiteboard Marker Pens (Box of 10)', issuedToName: 'Dr. Ramesh Sharma', issuedToType: 'Staff', quantity: 2, issueDate: '2025-05-01', returnDueDate: '2025-05-30', status: 'Issued' },
    { id: 102, itemName: 'Football Match Balls (Size 5)', issuedToName: 'Sports Dept (Kabir Singh)', issuedToType: 'Student', quantity: 3, issueDate: '2025-05-03', returnDueDate: '2025-05-03', status: 'Returned' },
    { id: 103, itemName: 'A4 Printing Paper Ream (75 GSM)', issuedToName: 'Examination Cell', issuedToType: 'Department', quantity: 15, issueDate: '2025-04-28', status: 'Issued' }
  ];

  suppliers: ItemSupplier[] = [
    { id: 1, name: 'National Paper Mart', contactPerson: 'Mr. Arvind Saxena', phone: '+91 98450 77101', email: 'sales@nationalpaper.com', address: 'Commercial Street, Bengaluru' },
    { id: 2, name: 'Scientific Lab Equipments Ltd', contactPerson: 'Dr. V.K. Rao', phone: '+91 98450 77102', email: 'support@scientificlab.in', address: 'Peenya Industrial Area, Bengaluru' },
    { id: 3, name: 'Nivia Sports India', contactPerson: 'Harpreet Singh', phone: '+91 98450 77103', email: 'orders@niviasports.com', address: 'Sports Complex Road, Jalandhar' }
  ];

  // Modals state
  showAddItemModal = false;
  newItem: Partial<InventoryItem> = {
    name: '',
    category: 'Stationery & Office',
    store: 'Main Admin Store',
    unit: 'Piece',
    inStock: 10,
    minimumStock: 5,
    unitPrice: 100,
    supplier: 'National Paper Mart'
  };

  showIssueModal = false;
  issueForm = {
    itemName: 'A4 Printing Paper Ream (75 GSM)',
    issuedToName: '',
    issuedToType: 'Staff' as const,
    quantity: 1,
    returnDueDate: new Date(Date.now() + 14 * 86400000).toISOString().substring(0, 10)
  };

  ngOnInit(): void {}

  get totalItemsCount(): number {
    return this.items.reduce((acc, i) => acc + i.inStock, 0);
  }

  get lowStockCount(): number {
    return this.items.filter(i => i.inStock <= i.minimumStock).length;
  }

  get filteredItems(): InventoryItem[] {
    return this.items.filter(i => {
      const matchCat = this.categoryFilter === 'All' || i.category === this.categoryFilter;
      const matchSearch = !this.searchTerm ||
        i.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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

    const item: InventoryItem = {
      id: this.items.length + 1,
      name: this.newItem.name,
      category: this.newItem.category || 'Stationery & Office',
      store: this.newItem.store || 'Main Admin Store',
      unit: this.newItem.unit || 'Piece',
      inStock: Number(this.newItem.inStock) || 10,
      minimumStock: Number(this.newItem.minimumStock) || 5,
      unitPrice: Number(this.newItem.unitPrice) || 100,
      supplier: this.newItem.supplier || 'National Paper Mart'
    };

    this.items.unshift(item);
    this.showAddItemModal = false;
    this.newItem = { name: '', category: 'Stationery & Office', store: 'Main Admin Store', unit: 'Piece', inStock: 10, minimumStock: 5, unitPrice: 100 };

    Swal.fire('Item Added', 'New inventory item added to catalog.', 'success');
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

    this.issuedItems.unshift({
      id: 100 + this.issuedItems.length + 1,
      itemName: this.issueForm.itemName,
      issuedToName: this.issueForm.issuedToName,
      issuedToType: this.issueForm.issuedToType,
      quantity: Number(this.issueForm.quantity),
      issueDate: new Date().toISOString().substring(0, 10),
      returnDueDate: this.issueForm.returnDueDate,
      status: 'Issued'
    });

    this.showIssueModal = false;
    this.activeTab = 'issue';

    Swal.fire('Item Issued', 'Stock deducted and issuance voucher logged.', 'success');
  }

  returnIssuedItem(record: IssuedItemRecord): void {
    record.status = 'Returned';
    const targetItem = this.items.find(i => i.name === record.itemName);
    if (targetItem) {
      targetItem.inStock += record.quantity;
    }
    Swal.fire('Item Returned', 'Item marked returned and returned to store inventory.', 'success');
  }
}
