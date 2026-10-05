import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

declare const Swal: any;

export interface LedgerAccount {
  code: string;
  name: string;
  category: 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';
  balance: number;
}

export interface VoucherItem {
  id: string;
  voucherNo: string;
  type: 'Payment' | 'Receipt' | 'Journal' | 'Contra' | 'Sales' | 'Purchase';
  date: string;
  accountHead: string;
  debit: number;
  credit: number;
  narration: string;
  status: 'Approved' | 'Pending';
}

export interface VoucherEntryRow {
  type: 'BY (DR)' | 'TO (CR)';
  accountHead: string;
  balance: string;
  debit: number;
  credit: number;
  remarks: string;
}

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'entry' | 'dashboard' | 'vouchers' | 'chart' | 'trial' | 'profit-loss' | 'balance-sheet' = 'entry';
  trendPeriod: 'yearly' | 'monthly' = 'yearly';
  searchTerm = '';
  selectedType = 'All';

  // Financial Entry Form Model matching screenshot
  voucherCategory: 'Payment' | 'Receipt' | 'Journal' | 'Contra' | 'Sales' | 'Purchase' = 'Payment';
  fiscalDate: string = '2026-10-05';
  officialNarration: string = '';

  entryRows: VoucherEntryRow[] = [
    { type: 'BY (DR)', accountHead: '', balance: 'Awaiting...', debit: 0, credit: 0, remarks: '' },
    { type: 'TO (CR)', accountHead: '', balance: 'Awaiting...', debit: 0, credit: 0, remarks: '' }
  ];

  accounts: LedgerAccount[] = [
    { code: '1010', name: 'Cash in Hand (Cashier Desk)', category: 'Asset', balance: 185000 },
    { code: '1020', name: 'HDFC Bank Campus Current A/c', category: 'Asset', balance: 840000 },
    { code: '1030', name: 'State Bank of India Operations A/c', category: 'Asset', balance: 460000 },
    { code: '2010', name: 'Vendor & Supplier Payables', category: 'Liability', balance: 75000 },
    { code: '3010', name: 'Institutional Capital Fund', category: 'Equity', balance: 2500000 },
    { code: '4010', name: 'Tuition Fees Collection', category: 'Income', balance: 1480000 },
    { code: '4020', name: 'Transport Bus Facility Fees', category: 'Income', balance: 290000 },
    { code: '5010', name: 'Staff Monthly Payroll & Salaries', category: 'Expense', balance: 485000 },
    { code: '5020', name: 'Campus Utilities, Electricity & Water', category: 'Expense', balance: 64000 },
    { code: '5030', name: 'Science Labs Consumables & Reagents', category: 'Expense', balance: 32000 }
  ];

  vouchers: VoucherItem[] = [
    { id: '1', voucherNo: 'RV-2026-001', type: 'Receipt', date: '2026-10-05', accountHead: 'Tuition Fees Collection', debit: 90000, credit: 0, narration: 'Quarter 1 Tuition receipts collected', status: 'Approved' },
    { id: '2', voucherNo: 'PV-2026-002', type: 'Payment', date: '2026-10-04', accountHead: 'Campus Utilities, Electricity & Water', debit: 0, credit: 28400, narration: 'Monthly electrical bill paid via NEFT', status: 'Approved' },
    { id: '3', voucherNo: 'JV-2026-003', type: 'Journal', date: '2026-10-03', accountHead: 'Depreciation on Science Labs', debit: 15000, credit: 15000, narration: 'Monthly accumulated depreciation entry', status: 'Approved' },
    { id: '4', voucherNo: 'PV-2026-004', type: 'Payment', date: '2026-10-02', accountHead: 'Staff Monthly Payroll & Salaries', debit: 0, credit: 485000, narration: 'Faculty & Admin staff salaries for October', status: 'Approved' },
    { id: '5', voucherNo: 'CV-2026-005', type: 'Contra', date: '2026-10-01', accountHead: 'Cash Deposited to HDFC Bank', debit: 50000, credit: 50000, narration: 'Daily counter cash deposit to bank current A/c', status: 'Approved' }
  ];

  showNewVoucherModal = false;
  newVoucher = {
    type: 'Payment',
    accountHead: 'Campus Utilities, Electricity & Water',
    amount: 5000,
    narration: '',
    date: '2026-10-05'
  };

  ngOnInit(): void {
    this.syncActiveTabFromUrl();

    this.route.url.subscribe(() => {
      this.syncActiveTabFromUrl();
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
      if (params['type']) {
        this.voucherCategory = params['type'];
      }
    });
  }

  private syncActiveTabFromUrl(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('paymentvoucher')) {
      this.activeTab = 'entry';
      this.voucherCategory = 'Payment';
    } else if (path.includes('receiptvoucher')) {
      this.activeTab = 'entry';
      this.voucherCategory = 'Receipt';
    } else if (path.includes('journalvoucher')) {
      this.activeTab = 'entry';
      this.voucherCategory = 'Journal';
    } else if (path.includes('contravoucher')) {
      this.activeTab = 'entry';
      this.voucherCategory = 'Contra';
    } else if (path.includes('salesvoucher')) {
      this.activeTab = 'entry';
      this.voucherCategory = 'Sales';
    } else if (path.includes('purchasevoucher')) {
      this.activeTab = 'entry';
      this.voucherCategory = 'Purchase';
    } else if (path.includes('chartofaccounts') || path.includes('itemaccountmaster') || path.includes('accountledger')) {
      this.activeTab = 'chart';
    } else if (path.includes('trialbalance')) {
      this.activeTab = 'trial';
    } else if (path.includes('incomeexpenditure')) {
      this.activeTab = 'profit-loss';
    } else if (path.includes('balancesheet')) {
      this.activeTab = 'balance-sheet';
    } else if (path.includes('receiptpayment') || path.includes('voucherlist')) {
      this.activeTab = 'vouchers';
    } else if (path.includes('dashboard') || path.includes('financialcenter')) {
      this.activeTab = 'dashboard';
    } else {
      this.activeTab = 'entry';
    }
  }

  get filteredVouchers(): VoucherItem[] {
    return this.vouchers.filter(v => {
      const matchSearch = !this.searchTerm || v.voucherNo.toLowerCase().includes(this.searchTerm.toLowerCase()) || v.accountHead.toLowerCase().includes(this.searchTerm.toLowerCase()) || v.narration.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.selectedType === 'All' || v.type === this.selectedType;
      return matchSearch && matchType;
    });
  }

  // Row Management
  addDrRow(): void {
    this.entryRows.push({
      type: 'BY (DR)',
      accountHead: '',
      balance: 'Awaiting...',
      debit: 0,
      credit: 0,
      remarks: ''
    });
  }

  addCrRow(): void {
    this.entryRows.push({
      type: 'TO (CR)',
      accountHead: '',
      balance: 'Awaiting...',
      debit: 0,
      credit: 0,
      remarks: ''
    });
  }

  removeEntryRow(index: number): void {
    if (this.entryRows.length <= 1) {
      Swal.fire('Notice', 'A voucher must contain at least one ledger entry line.', 'info');
      return;
    }
    this.entryRows.splice(index, 1);
  }

  toggleRowType(row: VoucherEntryRow): void {
    if (row.type === 'BY (DR)') {
      row.type = 'TO (CR)';
      if (row.debit > 0 && row.credit === 0) {
        row.credit = row.debit;
        row.debit = 0;
      }
    } else {
      row.type = 'BY (DR)';
      if (row.credit > 0 && row.debit === 0) {
        row.debit = row.credit;
        row.credit = 0;
      }
    }
  }

  onAccountSelect(row: VoucherEntryRow): void {
    const matched = this.accounts.find(a => a.name === row.accountHead);
    if (matched) {
      row.balance = `$ ${matched.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    } else {
      row.balance = 'Awaiting...';
    }
  }

  get totalDebit(): number {
    return this.entryRows.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
  }

  get totalCredit(): number {
    return this.entryRows.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);
  }

  postFinancialVoucher(): void {
    if (this.entryRows.length === 0) {
      Swal.fire('Incomplete Entry', 'Please add debit and credit entries.', 'warning');
      return;
    }

    const unselected = this.entryRows.some(r => !r.accountHead);
    if (unselected) {
      Swal.fire('Missing Account Head', 'Please select an account head for all ledger entry rows.', 'warning');
      return;
    }

    const tDebit = this.totalDebit;
    const tCredit = this.totalCredit;

    if (tDebit <= 0 && tCredit <= 0) {
      Swal.fire('Zero Amount', 'Please specify non-zero debit and credit amounts.', 'warning');
      return;
    }

    if (Math.abs(tDebit - tCredit) > 0.001) {
      Swal.fire({
        title: 'Unbalanced Entry',
        text: `Total Debit ($${tDebit.toFixed(2)}) must equal Total Credit ($${tCredit.toFixed(2)}). Difference: $${Math.abs(tDebit - tCredit).toFixed(2)}`,
        icon: 'error',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    // Build voucher record
    const prefix = this.voucherCategory.substring(0, 2).toUpperCase();
    const vNo = `${prefix}V-2026-${(this.vouchers.length + 1).toString().padStart(3, '0')}`;
    const mainHead = this.entryRows[0].accountHead;

    const newV: VoucherItem = {
      id: (this.vouchers.length + 1).toString(),
      voucherNo: vNo,
      type: this.voucherCategory,
      date: this.fiscalDate,
      accountHead: mainHead,
      debit: tDebit,
      credit: tCredit,
      narration: this.officialNarration || `${this.voucherCategory} voucher posted to general ledger`,
      status: 'Approved'
    };

    this.vouchers.unshift(newV);

    Swal.fire({
      title: 'Voucher Posted Successfully!',
      text: `${this.voucherCategory} Voucher ${vNo} with total $${tDebit.toFixed(2)} has been recorded into General Ledger.`,
      icon: 'success',
      confirmButtonColor: '#2563eb'
    });

    // Reset rows to initial state
    this.officialNarration = '';
    this.entryRows = [
      { type: 'BY (DR)', accountHead: '', balance: 'Awaiting...', debit: 0, credit: 0, remarks: '' },
      { type: 'TO (CR)', accountHead: '', balance: 'Awaiting...', debit: 0, credit: 0, remarks: '' }
    ];
  }

  openVoucher(type: string): void {
    this.voucherCategory = type as any;
    this.activeTab = 'entry';
  }

  seedData(): void {
    Swal.fire({
      title: 'Seed Startup Accounting Data?',
      text: 'This will seed sample ledger charts, vouchers, and trial balances for demonstration.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Seed Now',
      confirmButtonColor: '#7c3aed'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire('Data Seeded!', 'Fiscal chart & sample records loaded successfully.', 'success');
      }
    });
  }

  saveVoucher(): void {
    const amt = Number(this.newVoucher.amount) || 0;
    if (amt <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid amount.', 'warning');
      return;
    }

    const item: VoucherItem = {
      id: (this.vouchers.length + 1).toString(),
      voucherNo: `${this.newVoucher.type.substring(0, 2).toUpperCase()}V-2026-${(this.vouchers.length + 1).toString().padStart(3, '0')}`,
      type: this.newVoucher.type as any,
      date: this.newVoucher.date,
      accountHead: this.newVoucher.accountHead,
      debit: this.newVoucher.type === 'Receipt' ? amt : 0,
      credit: this.newVoucher.type === 'Payment' ? amt : (this.newVoucher.type === 'Journal' ? amt : 0),
      narration: this.newVoucher.narration || 'General ledger entry',
      status: 'Approved'
    };

    this.vouchers.unshift(item);
    this.showNewVoucherModal = false;
    this.newVoucher = { type: 'Payment', accountHead: 'Campus Utilities, Electricity & Water', amount: 5000, narration: '', date: '2026-10-05' };

    Swal.fire('Voucher Posted!', `Voucher ${item.voucherNo} recorded successfully into general ledger.`, 'success');
  }

  printReport(): void {
    window.print();
  }
}
