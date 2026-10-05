import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { FeeInvoice } from '../../core/models';

declare const Swal: any;

interface FeeHead {
  id: number;
  name: string;
  code: string;
  group: string;
  amount: number;
  frequency: string;
  description: string;
}

interface FeeGroup {
  id: number;
  name: string;
  description: string;
  headCount: number;
}

interface PaymentTransaction {
  id: string;
  invoiceNo: string;
  studentName: string;
  admissionNo: string;
  class: string;
  amount: number;
  paymentMode: string;
  referenceNo: string;
  date: string;
  collectedBy: string;
}

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  private api = inject(ApiService);

  activeTab: 'invoices' | 'collect' | 'heads' | 'groups' | 'bulk' | 'ledger' = 'invoices';
  searchTerm = '';
  statusFilter = 'All';
  classFilter = 'All';

  invoices: FeeInvoice[] = [
    { id: 1, studentId: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', feeGroup: 'Quarter 1 Tuition', amount: 25000, paidAmount: 25000, balanceAmount: 0, dueDate: '2025-04-15', status: 'Paid' },
    { id: 2, studentId: 2, studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', feeGroup: 'Quarter 1 Tuition + Transport', amount: 32000, paidAmount: 16000, balanceAmount: 16000, dueDate: '2025-04-15', status: 'Partial' },
    { id: 3, studentId: 3, studentName: 'Rohan Gupta', admissionNo: 'ADM-2024-003', feeGroup: 'Annual Computer Lab & Library', amount: 12000, paidAmount: 0, balanceAmount: 12000, dueDate: '2025-05-01', status: 'Unpaid' },
    { id: 4, studentId: 4, studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', feeGroup: 'Quarter 1 Tuition', amount: 25000, paidAmount: 25000, balanceAmount: 0, dueDate: '2025-04-15', status: 'Paid' },
    { id: 5, studentId: 5, studentName: 'Kabir Singh', admissionNo: 'ADM-2024-005', feeGroup: 'Quarter 1 Tuition + Hostel', amount: 48000, paidAmount: 24000, balanceAmount: 24000, dueDate: '2025-04-15', status: 'Partial' },
    { id: 6, studentId: 6, studentName: 'Meera Nair', admissionNo: 'ADM-2024-006', feeGroup: 'Sports & Activity Fee', amount: 5000, paidAmount: 0, balanceAmount: 5000, dueDate: '2025-05-10', status: 'Unpaid' }
  ];

  feeHeads: FeeHead[] = [
    { id: 1, name: 'Tuition Fee - Primary', code: 'TUI-PRI', group: 'Academic Tuition', amount: 18000, frequency: 'Quarterly', description: 'Regular classroom tuition fee' },
    { id: 2, name: 'Tuition Fee - Secondary', code: 'TUI-SEC', group: 'Academic Tuition', amount: 25000, frequency: 'Quarterly', description: 'Senior secondary instruction & labs' },
    { id: 3, name: 'Computer & Science Lab', code: 'LAB-FEE', group: 'Facilities', amount: 6000, frequency: 'Annual', description: 'Advanced IT lab and STEM laboratory fee' },
    { id: 4, name: 'Transport Bus Service', code: 'TRN-ZONE1', group: 'Transport', amount: 7000, frequency: 'Quarterly', description: 'Door-to-door campus transportation' },
    { id: 5, name: 'Hostel & Boarding Fee', code: 'HST-FULL', group: 'Accommodation', amount: 23000, frequency: 'Quarterly', description: 'Boarding room, food & laundry service' },
    { id: 6, name: 'Annual Sports & Fest', code: 'SPT-ANN', group: 'Activities', amount: 3500, frequency: 'Annual', description: 'Sports facilities and annual events' }
  ];

  feeGroups: FeeGroup[] = [
    { id: 1, name: 'Academic Tuition', description: 'Standard quarterly class fees by grade level', headCount: 4 },
    { id: 2, name: 'Transport Logistics', description: 'Zone wise school bus and van transportation', headCount: 3 },
    { id: 3, name: 'Facilities & Labs', description: 'Library, IT Lab, Science equipment maintenance', headCount: 5 },
    { id: 4, name: 'Accommodation & Mess', description: 'Full-time boarding and hostel maintenance', headCount: 2 },
    { id: 5, name: 'Activities & Extracurricular', description: 'Clubs, tournaments, debate and annual functions', headCount: 6 }
  ];

  recentTransactions: PaymentTransaction[] = [
    { id: 'TXN-9901', invoiceNo: 'INV-001', studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', amount: 25000, paymentMode: 'UPI / Online', referenceNo: 'UPI98234710', date: 'Today, 11:30 AM', collectedBy: 'Cashier (Deepak S.)' },
    { id: 'TXN-9902', invoiceNo: 'INV-002', studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', class: 'Grade 10-B', amount: 16000, paymentMode: 'Net Banking', referenceNo: 'HDFC6629104', date: 'Yesterday, 03:45 PM', collectedBy: 'Accounts Dept.' },
    { id: 'TXN-9903', invoiceNo: 'INV-004', studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', class: 'Grade 9-A', amount: 25000, paymentMode: 'Cash', referenceNo: 'CSH-0912', date: '03 May 2025', collectedBy: 'Cashier (Deepak S.)' },
    { id: 'TXN-9904', invoiceNo: 'INV-005', studentName: 'Kabir Singh', admissionNo: 'ADM-2024-005', class: 'Grade 11-Science', amount: 24000, paymentMode: 'Debit Card', referenceNo: 'POS-882194', date: '02 May 2025', collectedBy: 'Cashier (Deepak S.)' }
  ];

  // Modals state
  showCollectModal = false;
  selectedInvoice: FeeInvoice | null = null;
  collectForm = {
    amount: 0,
    paymentMode: 'Cash',
    referenceNo: '',
    note: '',
    discount: 0,
    fine: 0
  };

  showReceiptModal = false;
  receiptData: any = null;

  showAddHeadModal = false;
  newHead: Partial<FeeHead> = {
    name: '',
    code: '',
    group: 'Academic Tuition',
    amount: 5000,
    frequency: 'Quarterly',
    description: ''
  };

  showAddGroupModal = false;
  newGroup = {
    name: '',
    description: ''
  };

  showBulkInvoiceModal = false;
  bulkForm = {
    targetClass: 'All Classes',
    feeGroup: 'Quarter 1 Tuition',
    amount: 25000,
    dueDate: '2025-06-30',
    notifyParents: true
  };

  ngOnInit(): void {
    this.api.getFeeInvoices().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.invoices = res;
        }
      },
      error: () => {
        // Keep fallback data
      }
    });
  }

  get totalInvoiced(): number {
    return this.invoices.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }

  get totalCollected(): number {
    return this.invoices.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0);
  }

  get totalPending(): number {
    return this.invoices.reduce((acc, curr) => acc + (curr.balanceAmount || 0), 0);
  }

  get filteredInvoices(): FeeInvoice[] {
    return this.invoices.filter(i => {
      const matchesSearch = !this.searchTerm ||
        i.studentName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.admissionNo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.feeGroup?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.statusFilter === 'All' || i.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  openCollectModal(inv: FeeInvoice): void {
    this.selectedInvoice = inv;
    this.collectForm = {
      amount: inv.balanceAmount > 0 ? inv.balanceAmount : inv.amount,
      paymentMode: 'Cash',
      referenceNo: '',
      note: 'Payment received towards ' + inv.feeGroup,
      discount: 0,
      fine: 0
    };
    this.showCollectModal = true;
  }

  closeCollectModal(): void {
    this.showCollectModal = false;
    this.selectedInvoice = null;
  }

  submitCollectFee(): void {
    if (!this.selectedInvoice) return;

    const amountPaid = Number(this.collectForm.amount) || 0;
    if (amountPaid <= 0) {
      Swal.fire({
        title: 'Invalid Amount',
        text: 'Please enter a valid collection amount greater than ₹0.',
        icon: 'warning',
        confirmButtonColor: '#002B49'
      });
      return;
    }

    this.selectedInvoice.paidAmount = (this.selectedInvoice.paidAmount || 0) + amountPaid;
    this.selectedInvoice.balanceAmount = Math.max(0, this.selectedInvoice.amount - this.selectedInvoice.paidAmount);

    if (this.selectedInvoice.balanceAmount === 0) {
      this.selectedInvoice.status = 'Paid';
    } else {
      this.selectedInvoice.status = 'Partial';
    }

    const newTxn: PaymentTransaction = {
      id: 'TXN-' + Math.floor(1000 + Math.random() * 9000),
      invoiceNo: 'INV-00' + this.selectedInvoice.id,
      studentName: this.selectedInvoice.studentName || 'Student',
      admissionNo: this.selectedInvoice.admissionNo || '',
      class: 'Class 10-A',
      amount: amountPaid,
      paymentMode: this.collectForm.paymentMode,
      referenceNo: this.collectForm.referenceNo || 'REF-' + Date.now().toString().slice(-6),
      date: 'Just Now',
      collectedBy: 'Logged-in Cashier'
    };

    this.recentTransactions.unshift(newTxn);

    // Prepare receipt
    this.receiptData = {
      receiptNo: 'REC-' + newTxn.id,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      studentName: this.selectedInvoice.studentName,
      admissionNo: this.selectedInvoice.admissionNo,
      feeGroup: this.selectedInvoice.feeGroup,
      amount: amountPaid,
      paymentMode: this.collectForm.paymentMode,
      referenceNo: newTxn.referenceNo,
      balanceRemaining: this.selectedInvoice.balanceAmount
    };

    this.closeCollectModal();

    Swal.fire({
      title: 'Payment Recorded!',
      text: `Successfully collected ₹${amountPaid.toLocaleString()} for ${this.selectedInvoice.studentName}.`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      cancelButtonColor: '#FFBC53',
      confirmButtonText: '<i class="fas fa-print me-1"></i> Print Receipt',
      cancelButtonText: 'Done'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.showReceiptModal = true;
      }
    });
  }

  openReceiptModal(inv: FeeInvoice): void {
    this.receiptData = {
      receiptNo: 'REC-INV-00' + inv.id,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      studentName: inv.studentName,
      admissionNo: inv.admissionNo,
      feeGroup: inv.feeGroup,
      amount: inv.paidAmount > 0 ? inv.paidAmount : inv.amount,
      paymentMode: 'Online / Bank Transfer',
      referenceNo: 'TXN-' + (89200 + inv.id),
      balanceRemaining: inv.balanceAmount
    };
    this.showReceiptModal = true;
  }

  printReceipt(): void {
    window.print();
  }

  saveNewHead(): void {
    if (!this.newHead.name || !this.newHead.code) {
      Swal.fire('Missing Details', 'Please provide Fee Head Name and Code.', 'warning');
      return;
    }

    const head: FeeHead = {
      id: this.feeHeads.length + 1,
      name: this.newHead.name!,
      code: this.newHead.code!,
      group: this.newHead.group || 'Academic Tuition',
      amount: Number(this.newHead.amount) || 0,
      frequency: this.newHead.frequency || 'Quarterly',
      description: this.newHead.description || ''
    };

    this.feeHeads.push(head);
    this.showAddHeadModal = false;
    this.newHead = { name: '', code: '', group: 'Academic Tuition', amount: 5000, frequency: 'Quarterly', description: '' };

    Swal.fire('Success', 'New fee head registered successfully.', 'success');
  }

  saveNewGroup(): void {
    if (!this.newGroup.name) {
      Swal.fire('Missing Name', 'Please enter Fee Group name.', 'warning');
      return;
    }

    this.feeGroups.push({
      id: this.feeGroups.length + 1,
      name: this.newGroup.name,
      description: this.newGroup.description || 'Custom category',
      headCount: 0
    });

    this.showAddGroupModal = false;
    this.newGroup = { name: '', description: '' };
    Swal.fire('Success', 'New fee group created.', 'success');
  }

  runBulkInvoicing(): void {
    Swal.fire({
      title: 'Generate Bulk Invoices?',
      text: `Are you sure you want to generate ${this.bulkForm.feeGroup} invoices for ${this.bulkForm.targetClass}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Yes, Generate Invoices'
    }).then((res: any) => {
      if (res.isConfirmed) {
        // Add mock bulk invoices
        const dummyNames = ['Isha Chawla', 'Varun Dhawan', 'Kritika Sen', 'Devansh Joshi'];
        dummyNames.forEach((name, idx) => {
          this.invoices.unshift({
            id: this.invoices.length + 1,
            studentId: 10 + idx,
            studentName: name,
            admissionNo: `ADM-2025-0${20 + idx}`,
            feeGroup: this.bulkForm.feeGroup,
            amount: Number(this.bulkForm.amount),
            paidAmount: 0,
            balanceAmount: Number(this.bulkForm.amount),
            dueDate: this.bulkForm.dueDate,
            status: 'Unpaid'
          });
        });

        this.showBulkInvoiceModal = false;
        this.activeTab = 'invoices';

        Swal.fire({
          title: 'Invoices Generated!',
          text: `Successfully generated ${dummyNames.length} new invoices for ${this.bulkForm.targetClass}.`,
          icon: 'success',
          confirmButtonColor: '#002B49'
        });
      }
    });
  }
}
