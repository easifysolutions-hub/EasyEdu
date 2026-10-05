import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

interface FeeStructureItem {
  id: number;
  className: string;
  groupName: string;
  totalFee: number;
  installments: number;
  dueDate: string;
  assignedStudents: number;
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
  type?: 'Income' | 'Expense';
}

interface VoucherItem {
  id: string;
  voucherNo: string;
  type: 'Payment' | 'Receipt' | 'Journal' | 'Contra' | 'Sales' | 'Purchase';
  date: string;
  accountHead: string;
  debit: number;
  credit: number;
  narration: string;
  status: 'Approved' | 'Pending' | 'Draft';
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

  activeTab: 'dashboard' | 'invoices' | 'collect' | 'heads' | 'groups' | 'structure' | 'ledger' | 'accounting' | 'bulk-print' | 'print-settings' = 'dashboard';
  searchTerm = '';
  statusFilter = 'All';
  classFilter = 'All';

  // Invoice Layout Settings
  invoiceSettings = {
    instituteTitle: 'EasyEdu International Academy',
    subHeading: 'Affiliated to CBSE Board • School Center Code: 830412',
    addressLine: '#42, Campus Green Valley, Main Tech Park Road, Bengaluru - 560001',
    phone: '+91 80 2845 9900',
    email: 'accounts@easyedu.org',
    receiptPrefix: 'REC-2026-',
    printLayout: 'A4 Multi-Part (2-Up)',
    copiesCount: 3,
    includeStudentCopy: true,
    includeParentCopy: true,
    includeSchoolCopy: true,
    includeBankCopy: false,
    showQrPayment: true,
    showWatermark: true,
    watermarkText: 'PAID & AUDITED',
    showFeeBreakdown: true,
    showPreviousDues: true,
    termsConditions: '1. Fees once deposited are non-refundable.\n2. In case of delay, a late fee of ₹50 per day will be levied.\n3. Retain official physical receipt for statutory tax verification.',
    authorizedSignatory: 'Accounts Bursar / Finance Controller'
  };

  // Bulk Print Spool Queue State
  selectedInvoiceIds: { [id: number]: boolean } = { 1: true, 2: true };
  selectAllInvoices = false;

  toggleSelectAllInvoices(): void {
    this.selectAllInvoices = !this.selectAllInvoices;
    this.filteredInvoices.forEach(inv => {
      this.selectedInvoiceIds[inv.id] = this.selectAllInvoices;
    });
  }

  get selectedInvoicesCount(): number {
    return Object.values(this.selectedInvoiceIds).filter(Boolean).length;
  }

  get selectedInvoicesTotalValue(): number {
    return this.invoices
      .filter(i => this.selectedInvoiceIds[i.id])
      .reduce((sum, i) => sum + (i.amount || 0), 0);
  }

  triggerBatchPrint(mode: 'PDF' | 'Thermal' | 'CSV'): void {
    if (this.selectedInvoicesCount === 0) {
      Swal.fire('No Invoices Selected', 'Please check at least one invoice in the spool queue.', 'warning');
      return;
    }
    Swal.fire({
      title: `Batch Spool Dispatched (${mode})`,
      text: `Printing ${this.selectedInvoicesCount} invoices totaling ₹${this.selectedInvoicesTotalValue.toLocaleString()}...`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }

  saveInvoiceSettings(): void {
    Swal.fire('Settings Saved', 'Fees invoice branding, copies count, and print templates saved successfully.', 'success');
  }

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

  feeStructures: FeeStructureItem[] = [
    { id: 1, className: 'Grade 10 - Section A', groupName: 'Academic Tuition + Labs', totalFee: 31000, installments: 4, dueDate: '15th of Every Quarter', assignedStudents: 42 },
    { id: 2, className: 'Grade 9 - Section A', groupName: 'Academic Tuition + Labs', totalFee: 28000, installments: 4, dueDate: '15th of Every Quarter', assignedStudents: 38 },
    { id: 3, className: 'Grade 11 - Science', groupName: 'Senior Science + Lab + Hostel', totalFee: 72000, installments: 2, dueDate: '30th June / 30th Nov', assignedStudents: 35 },
    { id: 4, className: 'Grade 12 - Commerce', groupName: 'Senior Commerce Tuition', totalFee: 26000, installments: 4, dueDate: '15th of Every Quarter', assignedStudents: 40 },
    { id: 5, className: 'Grade 5 - Primary', groupName: 'Primary Composite Fee', totalFee: 21500, installments: 4, dueDate: '10th of Every Quarter', assignedStudents: 30 }
  ];

  recentTransactions: PaymentTransaction[] = [
    { id: 'TXN-9901', invoiceNo: 'INV-001', studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', amount: 25000, paymentMode: 'UPI / Online', referenceNo: 'UPI98234710', date: 'Today, 11:30 AM', collectedBy: 'Cashier (Deepak S.)', type: 'Income' },
    { id: 'TXN-9902', invoiceNo: 'INV-002', studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', class: 'Grade 10-B', amount: 16000, paymentMode: 'Net Banking', referenceNo: 'HDFC6629104', date: 'Yesterday, 03:45 PM', collectedBy: 'Accounts Dept.', type: 'Income' },
    { id: 'TXN-9903', invoiceNo: 'INV-004', studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', class: 'Grade 9-A', amount: 25000, paymentMode: 'Cash', referenceNo: 'CSH-0912', date: '03 May 2025', collectedBy: 'Cashier (Deepak S.)', type: 'Income' },
    { id: 'TXN-9904', invoiceNo: 'INV-005', studentName: 'Kabir Singh', admissionNo: 'ADM-2024-005', class: 'Grade 11-Science', amount: 24000, paymentMode: 'Debit Card', referenceNo: 'POS-882194', date: '02 May 2025', collectedBy: 'Cashier (Deepak S.)', type: 'Income' }
  ];

  vouchers: VoucherItem[] = [
    { id: 'VCH-101', voucherNo: 'JV-2025-001', type: 'Receipt', date: '2025-05-10', accountHead: 'Tuition Fees Collection', debit: 90000, credit: 0, narration: 'Quarterly tuition fees collected from Grade 10 students', status: 'Approved' },
    { id: 'VCH-102', voucherNo: 'PV-2025-002', type: 'Payment', date: '2025-05-09', accountHead: 'Campus Electric & Water Utilities', debit: 0, credit: 28400, narration: 'Monthly electrical bill paid via NEFT to Power Corp', status: 'Approved' },
    { id: 'VCH-103', voucherNo: 'JV-2025-003', type: 'Journal', date: '2025-05-08', accountHead: 'Depreciation on Lab Equipment', debit: 15000, credit: 15000, narration: 'Monthly accumulated depreciation for Physics & STEM Labs', status: 'Approved' },
    { id: 'VCH-104', voucherNo: 'PV-2025-004', type: 'Payment', date: '2025-05-07', accountHead: 'Staff Monthly Payroll & Allowances', debit: 0, credit: 485000, narration: 'Faculty & Administrative Staff salaries for April 2025', status: 'Approved' }
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

  // Fees Received Voucher Window state matching screenshot 3
  selectedAdmission = 'ADM-2024-002';
  selectedInvoiceId: number = 2;
  cashReceived = 16000;
  paymentMode = 'Cash Currency';
  transactionDate = '2026-10-05';
  referenceNote = '';

  get currentSelectedInvoice(): FeeInvoice | undefined {
    return this.invoices.find(i => i.id === Number(this.selectedInvoiceId));
  }

  get feeTotalDue(): number {
    return this.currentSelectedInvoice ? this.currentSelectedInvoice.amount : 0;
  }

  get feeBalanceUnpaid(): number {
    const due = this.currentSelectedInvoice ? this.currentSelectedInvoice.balanceAmount : 0;
    return Math.max(0, due - (Number(this.cashReceived) || 0));
  }

  onAdmissionChange(): void {
    const inv = this.invoices.find(i => i.admissionNo === this.selectedAdmission);
    if (inv) {
      this.selectedInvoiceId = inv.id;
      this.cashReceived = inv.balanceAmount;
    }
  }

  postFeePayment(): void {
    const amt = Number(this.cashReceived) || 0;
    if (amt <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid cash received amount.', 'warning');
      return;
    }

    const inv = this.currentSelectedInvoice;
    if (inv) {
      inv.paidAmount += amt;
      inv.balanceAmount = Math.max(0, inv.amount - inv.paidAmount);
      if (inv.balanceAmount === 0) {
        inv.status = 'Paid';
      } else {
        inv.status = 'Partial';
      }
    }

    Swal.fire({
      title: 'Payment Posted Successfully!',
      text: `Receipt recorded for ₹${amt.toLocaleString()} against ${inv?.studentName || 'Student'} (${inv?.admissionNo}). Posted to General Ledger.`,
      icon: 'success',
      confirmButtonColor: '#2563eb'
    });

    this.cashReceived = 0;
    this.referenceNote = '';
  }

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

  showCreateInvoiceModal = false;
  newInvoiceForm = {
    studentName: '',
    admissionNo: '',
    feeGroup: 'Quarter 1 Tuition',
    amount: 25000,
    dueDate: '2025-05-30',
    remarks: ''
  };

  showVoucherModal = false;
  newVoucherForm = {
    type: 'Payment',
    accountHead: 'Campus Maintenance & Supplies',
    amount: 5000,
    narration: '',
    paymentMode: 'Bank Transfer'
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.api.getFeeInvoices().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.invoices = res;
        }
      },
      error: () => {
        // Keep initial fallback data
      }
    });

    this.syncActiveTabFromUrl();

    this.route.url.subscribe(() => {
      this.syncActiveTabFromUrl();
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  private syncActiveTabFromUrl(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('bulkinvoiceprintsettings') || path.includes('invoicesettings')) {
      this.activeTab = 'print-settings';
    } else if (path.includes('bulkinvoiceprint') || path.includes('printqueue')) {
      this.activeTab = 'bulk-print';
    } else if (path.includes('feesgroup')) {
      this.activeTab = 'groups';
    } else if (path.includes('feestype')) {
      this.activeTab = 'heads';
    } else if (path.includes('bulkinvoice')) {
      this.activeTab = 'invoices';
      this.showBulkInvoiceModal = true;
    } else if (path.includes('feesinvoice')) {
      this.activeTab = 'invoices';
    } else if (path.includes('collectfee')) {
      this.activeTab = 'collect';
    } else if (path.includes('bankpayment')) {
      this.activeTab = 'ledger';
    } else if (path.includes('feesduereport')) {
      this.activeTab = 'invoices';
      this.statusFilter = 'Unpaid';
    }
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

  openCollectModal(inv?: FeeInvoice): void {
    const target = inv || this.invoices[0];
    this.selectedInvoice = target;
    this.collectForm = {
      amount: target ? (target.balanceAmount > 0 ? target.balanceAmount : target.amount) : 5000,
      paymentMode: 'Cash',
      referenceNo: '',
      note: 'Payment received towards ' + (target ? target.feeGroup : 'Fees'),
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
      collectedBy: 'Cashier (System Administrator)',
      type: 'Income'
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

  generateReceipt(inv: FeeInvoice): void {
    this.openReceiptModal(inv);
  }

  printReceipt(): void {
    window.print();
  }

  saveNewInvoice(): void {
    if (!this.newInvoiceForm.studentName || !this.newInvoiceForm.amount) {
      Swal.fire('Missing Information', 'Please provide student name and invoice amount.', 'warning');
      return;
    }

    const newInv: FeeInvoice = {
      id: this.invoices.length + 1,
      studentId: 100 + this.invoices.length,
      studentName: this.newInvoiceForm.studentName,
      admissionNo: this.newInvoiceForm.admissionNo || `ADM-2025-0${this.invoices.length + 1}`,
      feeGroup: this.newInvoiceForm.feeGroup,
      amount: Number(this.newInvoiceForm.amount),
      paidAmount: 0,
      balanceAmount: Number(this.newInvoiceForm.amount),
      dueDate: this.newInvoiceForm.dueDate,
      status: 'Unpaid'
    };

    this.invoices.unshift(newInv);
    this.showCreateInvoiceModal = false;
    this.activeTab = 'invoices';

    Swal.fire({
      title: 'Invoice Created!',
      text: `Invoice INV-00${newInv.id} for ₹${newInv.amount.toLocaleString()} generated successfully.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
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

  saveVoucher(): void {
    const amount = Number(this.newVoucherForm.amount) || 0;
    if (amount <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid amount.', 'warning');
      return;
    }

    const newV: VoucherItem = {
      id: 'VCH-' + (100 + this.vouchers.length + 1),
      voucherNo: `${this.newVoucherForm.type.substring(0, 2).toUpperCase()}V-2025-${(this.vouchers.length + 1).toString().padStart(3, '0')}`,
      type: this.newVoucherForm.type as any,
      date: new Date().toISOString().split('T')[0],
      accountHead: this.newVoucherForm.accountHead,
      debit: this.newVoucherForm.type === 'Receipt' ? amount : 0,
      credit: this.newVoucherForm.type === 'Payment' ? amount : (this.newVoucherForm.type === 'Journal' ? amount : 0),
      narration: this.newVoucherForm.narration || 'General accounting transaction',
      status: 'Approved'
    };

    this.vouchers.unshift(newV);
    this.showVoucherModal = false;
    this.newVoucherForm = { type: 'Payment', accountHead: 'Campus Maintenance & Supplies', amount: 5000, narration: '', paymentMode: 'Bank Transfer' };

    Swal.fire('Voucher Posted', `Voucher ${newV.voucherNo} has been posted to general ledger.`, 'success');
  }
}
