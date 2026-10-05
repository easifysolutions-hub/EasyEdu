import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  reportCards = [
    { title: 'Student Progress & History', category: 'Academic', icon: 'fas fa-user-graduate', color: '#2563eb' },
    { title: 'Attendance Analytics & Defaulters', category: 'Attendance', icon: 'fas fa-calendar-check', color: '#059669' },
    { title: 'Fee Collection & Dues Ledger', category: 'Finance', icon: 'fas fa-receipt', color: '#d97706' },
    { title: 'Staff Payroll & Performance Register', category: 'Human Resource', icon: 'fas fa-users-gear', color: '#7c3aed' },
    { title: 'Examination Merit & Tabulation Sheets', category: 'Examinations', icon: 'fas fa-file-signature', color: '#dc2626' },
    { title: 'Fleet Transport & Logistical Report', category: 'Operations', icon: 'fas fa-bus', color: '#0891b2' }
  ];
}
