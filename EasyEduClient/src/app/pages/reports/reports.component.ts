import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

interface ReportModule {
  id: string;
  title: string;
  category: 'Academic' | 'Finance' | 'Attendance' | 'Human Resource' | 'Operations';
  description: string;
  icon: string;
  color: string;
  lastGenerated: string;
  downloadsCount: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  selectedCategory = 'All';
  searchTerm = '';

  reports: ReportModule[] = [
    { id: 'RPT-01', title: 'Student Comprehensive Profile & History', category: 'Academic', description: 'Student enrollment history, demographic data, and sibling relationships', icon: 'fas fa-user-graduate', color: '#0284c7', lastGenerated: 'Today, 10:15 AM', downloadsCount: 240 },
    { id: 'RPT-02', title: 'Class-Wise Academic Marksheet & GPA', category: 'Academic', description: 'Term exam tabulation sheets, subject marks, and grade averages', icon: 'fas fa-chart-line', color: '#4f46e5', lastGenerated: 'Yesterday', downloadsCount: 185 },
    { id: 'RPT-03', title: 'Daily & Monthly Student Attendance Summary', category: 'Attendance', description: 'Class wise attendance percentages, leave counts, and defaulters list', icon: 'fas fa-calendar-check', color: '#10b981', lastGenerated: 'Today, 09:30 AM', downloadsCount: 310 },
    { id: 'RPT-04', title: 'Subject-Wise Attendance Analytics', category: 'Attendance', description: 'Lecture attendance by individual subject and teacher logs', icon: 'fas fa-clipboard-user', color: '#059669', lastGenerated: '03 May 2025', downloadsCount: 94 },
    { id: 'RPT-05', title: 'Institutional Fees Collection Journal', category: 'Finance', description: 'Day-to-day fee receipt register by payment mode (Cash, UPI, Card)', icon: 'fas fa-cash-register', color: '#f59e0b', lastGenerated: 'Today, 12:00 PM', downloadsCount: 420 },
    { id: 'RPT-06', title: 'Outstanding Student Fees & Dues Ledger', category: 'Finance', description: 'Defaulter student list with parent contact and pending installment balance', icon: 'fas fa-file-invoice-dollar', color: '#ef4444', lastGenerated: 'Yesterday', downloadsCount: 275 },
    { id: 'RPT-07', title: 'Trial Balance & Financial Balance Sheet', category: 'Finance', description: 'Institution ledger assets, liabilities, tuition income, and expenses', icon: 'fas fa-balance-scale', color: '#d97706', lastGenerated: '01 May 2025', downloadsCount: 160 },
    { id: 'RPT-08', title: 'Staff Attendance & Bio-Metric Log', category: 'Human Resource', description: 'Faculty check-in/out timestamps, overtime, and leave balance summary', icon: 'fas fa-fingerprint', color: '#8b5cf6', lastGenerated: 'Today, 08:45 AM', downloadsCount: 120 },
    { id: 'RPT-09', title: 'Payroll Disbursement & Salary Slips', category: 'Human Resource', description: 'Monthly payroll register with deductions, allowances, and net pay', icon: 'fas fa-money-check-dollar', color: '#7c3aed', lastGenerated: '30 Apr 2025', downloadsCount: 88 },
    { id: 'RPT-10', title: 'Transport Route Utilization & Student Bus List', category: 'Operations', description: 'Passenger manifest by bus route, stop waypoints, and driver logs', icon: 'fas fa-bus', color: '#06b6d4', lastGenerated: '02 May 2025', downloadsCount: 145 },
    { id: 'RPT-11', title: 'Library Book Circulation & Overdue Tracker', category: 'Operations', description: 'Book lending history, overdue fines collected, and inventory rack report', icon: 'fas fa-book-reader', color: '#ec4899', lastGenerated: '03 May 2025', downloadsCount: 110 },
    { id: 'RPT-12', title: 'User Audit & Security Login Logs', category: 'Operations', description: 'System access audit log, IP addresses, timestamp, and activity history', icon: 'fas fa-shield-halved', color: '#64748b', lastGenerated: 'Just Now', downloadsCount: 65 }
  ];

  // Report Generation Modal state
  showPreviewModal = false;
  activeReport: ReportModule | null = null;
  filterForm = {
    dateRange: 'This Academic Year',
    class: 'Grade 10-A',
    format: 'PDF',
    includeInactive: false
  };

  previewRows: any[] = [];

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      const path = this.router.url.toLowerCase();
      if (path.includes('staffattendance')) {
        this.selectedCategory = 'Human Resource';
        const r = this.reports.find(x => x.id === 'RPT-08');
        if (r) this.generateReport(r);
      } else if (path.includes('payrollreport')) {
        this.selectedCategory = 'Human Resource';
        const r = this.reports.find(x => x.id === 'RPT-09');
        if (r) this.generateReport(r);
      } else if (path.includes('staffreport')) {
        this.selectedCategory = 'Human Resource';
      }
    });
  }

  get filteredReports(): ReportModule[] {
    return this.reports.filter(r => {
      const matchCat = this.selectedCategory === 'All' || r.category === this.selectedCategory;
      const matchSearch = !this.searchTerm ||
        r.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  generateReport(report: ReportModule): void {
    this.activeReport = report;
    
    // Sample preview rows based on report
    if (report.category === 'Academic' || report.category === 'Attendance') {
      this.previewRows = [
        { c1: 'ADM-2024-001', c2: 'Aarav Sharma', c3: 'Grade 10-A', c4: '94.5%', c5: '98.2% Present', c6: 'Pass with Distinction' },
        { c1: 'ADM-2024-002', c2: 'Diya Patel', c3: 'Grade 10-B', c4: '88.0%', c5: '95.0% Present', c6: 'First Division' },
        { c1: 'ADM-2024-003', c2: 'Rohan Gupta', c3: 'Grade 10-A', c4: '76.5%', c5: '88.4% Present', c6: 'Second Division' },
        { c1: 'ADM-2024-004', c2: 'Ananya Verma', c3: 'Grade 9-A', c4: '98.0%', c5: '99.1% Present', c6: 'Topper (Rank 1)' }
      ];
    } else {
      this.previewRows = [
        { c1: 'INV-001', c2: 'Aarav Sharma', c3: '₹25,000', c4: '₹25,000 Paid', c5: '₹0 Due', c6: 'Cashier (Deepak S.)' },
        { c1: 'INV-002', c2: 'Diya Patel', c3: '₹32,000', c4: '₹16,000 Paid', c5: '₹16,000 Due', c6: 'Online Gateway' },
        { c1: 'INV-003', c2: 'Rohan Gupta', c3: '₹12,000', c4: '₹0 Paid', c5: '₹12,000 Due', c6: 'Pending' },
        { c1: 'INV-004', c2: 'Ananya Verma', c3: '₹25,000', c4: '₹25,000 Paid', c5: '₹0 Due', c6: 'Cash (Counter)' }
      ];
    }

    this.showPreviewModal = true;
  }

  exportData(format: string): void {
    Swal.fire({
      title: `Exporting as ${format}`,
      text: `Generating and downloading "${this.activeReport?.title}"...`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }

  printReport(): void {
    window.print();
  }
}
