import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface LedgerAccount {
  code: string;
  name: string;
  category: 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';
  balance: number;
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
  status: 'Approved' | 'Pending';
}

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent {
  activeTab: 'dashboard' | 'vouchers' | 'chart' | 'trial' | 'profit-loss' | 'balance-sheet' = 'dashboard';
  searchTerm = '';
  selectedType = 'All';

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
    { id: '1', voucherNo: 'RV-2025-001', type: 'Receipt', date: '2025-05-10', accountHead: 'Tuition Fees Collection', debit: 90000, credit: 0, narration: 'Quarter 1 Tuition receipts collected', status: 'Approved' },
    { id: '2', voucherNo: 'PV-2025-002', type: 'Payment', date: '2025-05-09', accountHead: 'Campus Utilities, Electricity & Water', debit: 0, credit: 28400, narration: 'Monthly electrical bill paid via NEFT', status: 'Approved' },
    { id: '3', voucherNo: 'JV-2025-003', type: 'Journal', date: '2025-05-08', accountHead: 'Depreciation on Science Labs', debit: 15000, credit: 15000, narration: 'Monthly accumulated depreciation entry', status: 'Approved' },
    { id: '4', voucherNo: 'PV-2025-004', type: 'Payment', date: '2025-05-07', accountHead: 'Staff Monthly Payroll & Salaries', debit: 0, credit: 485000, narration: 'Faculty & Admin staff salaries for April', status: 'Approved' },
    { id: '5', voucherNo: 'CV-2025-005', type: 'Contra', date: '2025-05-06', accountHead: 'Cash Deposited to HDFC Bank', debit: 50000, credit: 50000, narration: 'Daily counter cash deposit to bank current A/c', status: 'Approved' }
  ];

  showNewVoucherModal = false;
  newVoucher = {
    type: 'Payment',
    accountHead: 'Campus Utilities, Electricity & Water',
    amount: 5000,
    narration: '',
    date: new Date().toISOString().split('T')[0]
  };

  get filteredVouchers(): VoucherItem[] {
    return this.vouchers.filter(v => {
      const matchSearch = !this.searchTerm || v.voucherNo.toLowerCase().includes(this.searchTerm.toLowerCase()) || v.accountHead.toLowerCase().includes(this.searchTerm.toLowerCase()) || v.narration.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.selectedType === 'All' || v.type === this.selectedType;
      return matchSearch && matchType;
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
      voucherNo: `${this.newVoucher.type.substring(0, 2).toUpperCase()}V-2025-${(this.vouchers.length + 1).toString().padStart(3, '0')}`,
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
    this.newVoucher = { type: 'Payment', accountHead: 'Campus Utilities, Electricity & Water', amount: 5000, narration: '', date: new Date().toISOString().split('T')[0] };

    Swal.fire('Voucher Posted!', `Voucher ${item.voucherNo} recorded successfully into general ledger.`, 'success');
  }

  printReport(): void {
    window.print();
  }
}
