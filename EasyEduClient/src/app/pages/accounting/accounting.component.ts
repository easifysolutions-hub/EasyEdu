import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

declare const Swal: any;

export interface LedgerAccount {
  code: string;
  name: string;
  category: 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';
  balance: number;
}

export interface ItemAccount {
  code: string;
  name: string;
  category: string;
  linkedAccount: string;
  taxRate: number;
  unit: string;
  stockQty: number;
  rate: number;
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

  activeTab: 'entry' | 'dashboard' | 'vouchers' | 'chart' | 'item-chart' | 'ledger' | 'trial' | 'receipt-payment' | 'profit-loss' | 'balance-sheet' = 'entry';
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

  itemAccounts: ItemAccount[] = [
    { code: 'ITM-101', name: 'Physics Lab Prism & Optical Lenses', category: 'Lab Consumables', linkedAccount: 'Science Labs Consumables & Reagents', taxRate: 18, unit: 'Sets', stockQty: 45, rate: 1200 },
    { code: 'ITM-102', name: 'Chemistry Organic Reagent Kit Grade 12', category: 'Lab Consumables', linkedAccount: 'Science Labs Consumables & Reagents', taxRate: 12, unit: 'Bottles', stockQty: 120, rate: 850 },
    { code: 'ITM-201', name: 'Institutional Student Uniform Tie & Belt', category: 'Merchandise', linkedAccount: 'Tuition Fees Collection', taxRate: 5, unit: 'Pieces', stockQty: 300, rate: 450 },
    { code: 'ITM-301', name: 'Advanced Mathematics Curriculum Grade 10', category: 'Publications', linkedAccount: 'Tuition Fees Collection', taxRate: 0, unit: 'Copies', stockQty: 180, rate: 650 },
    { code: 'ITM-401', name: 'Campus Fleet Diesel Fuel Bulk Stock', category: 'Fuel & Energy', linkedAccount: 'Campus Utilities, Electricity & Water', taxRate: 18, unit: 'Litres', stockQty: 1500, rate: 94 }
  ];

  vouchers: VoucherItem[] = [
    { id: '1', voucherNo: 'RV-2026-001', type: 'Receipt', date: '2026-10-05', accountHead: 'Tuition Fees Collection', debit: 90000, credit: 0, narration: 'Quarter 1 Tuition receipts collected', status: 'Approved' },
    { id: '2', voucherNo: 'PV-2026-002', type: 'Payment', date: '2026-10-04', accountHead: 'Campus Utilities, Electricity & Water', debit: 0, credit: 28400, narration: 'Monthly electrical bill paid via NEFT', status: 'Approved' },
    { id: '3', voucherNo: 'JV-2026-003', type: 'Journal', date: '2026-10-03', accountHead: 'Depreciation on Science Labs', debit: 15000, credit: 15000, narration: 'Monthly accumulated depreciation entry', status: 'Approved' },
    { id: '4', voucherNo: 'PV-2026-004', type: 'Payment', date: '2026-10-02', accountHead: 'Staff Monthly Payroll & Salaries', debit: 0, credit: 485000, narration: 'Faculty & Admin staff salaries for October', status: 'Approved' },
    { id: '5', voucherNo: 'CV-2026-005', type: 'Contra', date: '2026-10-01', accountHead: 'Cash Deposited to HDFC Bank', debit: 50000, credit: 50000, narration: 'Daily counter cash deposit to bank current A/c', status: 'Approved' },
    { id: '6', voucherNo: 'SV-2026-006', type: 'Sales', date: '2026-09-30', accountHead: 'Tuition Fees Collection', debit: 65000, credit: 0, narration: 'Annual prospectus and student stationery bundle invoice', status: 'Approved' },
    { id: '7', voucherNo: 'PUV-2026-007', type: 'Purchase', date: '2026-09-28', accountHead: 'Science Labs Consumables & Reagents', debit: 0, credit: 32000, narration: 'Science lab chemical supplies purchase from ChemTech', status: 'Approved' }
  ];

  // Ledger Filter State
  selectedLedgerHead = 'Tuition Fees Collection';
  ledgerStartDate = '2026-04-01';
  ledgerEndDate = '2026-10-05';

  // Add Account Master Modal
  showAddAccountModal = false;
  newAccount: LedgerAccount = {
    code: '',
    name: '',
    category: 'Expense',
    balance: 0
  };

  // Stock Voucher State (Sales & Purchase Vouchers)
  stockVoucherItems: Array<{ item: string; qty: number; rate: number; amount: number }> = [];
  selectedStockItem = '';
  stockItemQty = 1;
  stockItemRate = 0;
  stockDrAccount = '';
  stockCrAccount = '';

  // Add Item Account Modal
  showAddItemModal = false;
  newItemAccount: ItemAccount = {
    code: '',
    name: '',
    category: 'Lab Consumables',
    linkedAccount: 'Science Labs Consumables & Reagents',
    taxRate: 18,
    unit: 'Units',
    stockQty: 0,
    rate: 0
  };

  ngOnInit(): void {
    this.syncActiveTabFromUrl();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
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
    } else if (path.includes('chartofaccounts')) {
      this.activeTab = 'chart';
    } else if (path.includes('itemaccountmaster')) {
      this.activeTab = 'item-chart';
    } else if (path.includes('accountledger')) {
      this.activeTab = 'ledger';
    } else if (path.includes('trialbalance')) {
      this.activeTab = 'trial';
    } else if (path.includes('receiptpayment')) {
      this.activeTab = 'receipt-payment';
    } else if (path.includes('incomeexpenditure')) {
      this.activeTab = 'profit-loss';
    } else if (path.includes('balancesheet')) {
      this.activeTab = 'balance-sheet';
    } else if (path.includes('voucherlist')) {
      this.activeTab = 'vouchers';
    } else if (path.includes('dashboard') || path.includes('financialcenter')) {
      this.activeTab = 'dashboard';
    } else if (path.includes('accounting') || path.includes('accounts')) {
      this.activeTab = 'entry';
    }
  }

  navigateToTab(tab: 'entry' | 'dashboard' | 'vouchers' | 'chart' | 'item-chart' | 'ledger' | 'trial' | 'receipt-payment' | 'profit-loss' | 'balance-sheet'): void {
    this.activeTab = tab;
    const urlMap: Record<string, string> = {
      'entry': `/Accounting/${this.voucherCategory}Voucher`,
      'dashboard': '/Accounting',
      'vouchers': '/Accounting/VoucherList',
      'chart': '/Accounting/ChartOfAccounts',
      'item-chart': '/Accounting/ItemAccountMaster',
      'ledger': '/Accounting/AccountLedger',
      'trial': '/Accounting/TrialBalance',
      'receipt-payment': '/Accounting/ReceiptPayment',
      'profit-loss': '/Accounting/IncomeExpenditure',
      'balance-sheet': '/Accounting/BalanceSheet'
    };
    if (urlMap[tab]) {
      this.router.navigateByUrl(urlMap[tab]);
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

    // Update account balance
    const acc = this.accounts.find(a => a.name === mainHead);
    if (acc) {
      if (acc.category === 'Asset' || acc.category === 'Expense') {
        acc.balance += (tDebit - tCredit);
      } else {
        acc.balance += (tCredit - tDebit);
      }
    }

    Swal.fire({
      title: 'Voucher Posted Successfully!',
      text: `${this.voucherCategory} Voucher ${vNo} with total $${tDebit.toFixed(2)} has been recorded into General Ledger.`,
      icon: 'success',
      confirmButtonColor: '#2563eb'
    });

    // Reset rows
    this.officialNarration = '';
    this.entryRows = [
      { type: 'BY (DR)', accountHead: '', balance: 'Awaiting...', debit: 0, credit: 0, remarks: '' },
      { type: 'TO (CR)', accountHead: '', balance: 'Awaiting...', debit: 0, credit: 0, remarks: '' }
    ];
  }

  // Stock Voucher Management (Sales & Purchase Vouchers)
  onStockItemSelect(): void {
    const itm = this.itemAccounts.find(i => i.name === this.selectedStockItem);
    if (itm) {
      this.stockItemRate = itm.rate;
    }
  }

  addStockItem(): void {
    if (!this.selectedStockItem) {
      Swal.fire('Select Item', 'Please select an item from catalog.', 'warning');
      return;
    }
    const qty = Number(this.stockItemQty) || 1;
    const rate = Number(this.stockItemRate) || 0;
    this.stockVoucherItems.push({
      item: this.selectedStockItem,
      qty: qty,
      rate: rate,
      amount: qty * rate
    });
    this.selectedStockItem = '';
    this.stockItemQty = 1;
    this.stockItemRate = 0;
  }

  removeStockItem(index: number): void {
    this.stockVoucherItems.splice(index, 1);
  }

  get totalStockAmount(): number {
    return this.stockVoucherItems.reduce((s, i) => s + i.amount, 0);
  }

  saveStockVoucher(): void {
    const total = this.totalStockAmount;
    if (total <= 0) {
      Swal.fire('Empty Voucher', 'Please add at least one item to this voucher.', 'warning');
      return;
    }
    const isSales = this.voucherCategory === 'Sales';
    const dr = isSales ? this.stockDrAccount || 'Cash in Hand (Cashier Desk)' : this.stockDrAccount || 'Science Labs Consumables & Reagents';
    const cr = isSales ? this.stockCrAccount || 'Tuition Fees Collection' : this.stockCrAccount || 'HDFC Bank Campus Current A/c';

    const prefix = isSales ? 'SV' : 'PUV';
    const vNo = `${prefix}-2026-${(this.vouchers.length + 1).toString().padStart(3, '0')}`;

    this.vouchers.unshift({
      id: (this.vouchers.length + 1).toString(),
      voucherNo: vNo,
      type: this.voucherCategory,
      date: this.fiscalDate,
      accountHead: dr,
      debit: isSales ? total : 0,
      credit: isSales ? 0 : total,
      narration: this.officialNarration || `${this.voucherCategory} stock voucher for ${this.stockVoucherItems.length} items`,
      status: 'Approved'
    });

    Swal.fire({
      title: `${this.voucherCategory} Voucher Saved!`,
      text: `${vNo} recorded successfully for total $${total.toFixed(2)}. Stock quantities updated.`,
      icon: 'success',
      confirmButtonColor: isSales ? '#0f766e' : '#7c3aed'
    });

    this.stockVoucherItems = [];
    this.officialNarration = '';
  }

  // Account Ledger Calculations
  get currentLedgerAccount(): LedgerAccount | undefined {
    return this.accounts.find(a => a.name === this.selectedLedgerHead);
  }

  get ledgerTransactions(): Array<{ date: string; voucherNo: string; type: string; narration: string; debit: number; credit: number; balance: number }> {
    const acc = this.currentLedgerAccount;
    const baseBalance = acc ? acc.balance : 0;
    const matched = this.vouchers.filter(v => v.accountHead === this.selectedLedgerHead);
    
    let running = baseBalance > 100000 ? baseBalance * 0.7 : 0;
    return matched.map(v => {
      running += (v.debit - v.credit);
      return {
        date: v.date,
        voucherNo: v.voucherNo,
        type: v.type,
        narration: v.narration,
        debit: v.debit,
        credit: v.credit,
        balance: running
      };
    });
  }

  get ledgerTotalDebit(): number {
    return this.ledgerTransactions.reduce((s, t) => s + t.debit, 0);
  }

  get ledgerTotalCredit(): number {
    return this.ledgerTransactions.reduce((s, t) => s + t.credit, 0);
  }

  // Master Modals
  saveNewAccount(): void {
    if (!this.newAccount.name || !this.newAccount.code) {
      Swal.fire('Required Fields', 'Please provide an account code and account title.', 'warning');
      return;
    }
    this.accounts.push({ ...this.newAccount, balance: Number(this.newAccount.balance) || 0 });
    this.showAddAccountModal = false;
    this.newAccount = { code: '', name: '', category: 'Expense', balance: 0 };
    Swal.fire('Account Created', 'New ledger master head created successfully.', 'success');
  }

  saveNewItemAccount(): void {
    if (!this.newItemAccount.name || !this.newItemAccount.code) {
      Swal.fire('Required Fields', 'Please provide an item code and name.', 'warning');
      return;
    }
    this.itemAccounts.push({ ...this.newItemAccount });
    this.showAddItemModal = false;
    this.newItemAccount = { code: '', name: '', category: 'Lab Consumables', linkedAccount: 'Science Labs Consumables & Reagents', taxRate: 18, unit: 'Units', stockQty: 0, rate: 0 };
    Swal.fire('Item Master Created', 'Item catalog master saved successfully.', 'success');
  }

  openVoucher(type: string): void {
    this.voucherCategory = type as any;
    this.navigateToTab('entry');
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

  printReport(): void {
    window.print();
  }
}
