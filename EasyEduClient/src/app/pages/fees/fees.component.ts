import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { FeeInvoice } from '../../core/models';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  private api = inject(ApiService);
  invoices: FeeInvoice[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.api.getFeeInvoices().subscribe(res => {
      this.invoices = res;
    });
  }

  get filteredInvoices(): FeeInvoice[] {
    if (!this.searchTerm) return this.invoices;
    return this.invoices.filter(i =>
      i.studentName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      i.admissionNo?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  collectFee(inv: FeeInvoice): void {
    inv.paidAmount = inv.amount;
    inv.balanceAmount = 0;
    inv.status = 'Paid';
  }
}
