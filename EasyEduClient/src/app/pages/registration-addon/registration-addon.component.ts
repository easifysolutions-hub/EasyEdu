import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../../core/services/currency.service';

declare const Swal: any;

export interface OnlineApplicant {
  id: number;
  applicationNo: string;
  studentName: string;
  appliedClass: string;
  parentName: string;
  phone: string;
  email: string;
  appliedDate: string;
  applicationFeeStatus: 'Paid' | 'Unpaid';
  admissionStatus: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-registration-addon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration-addon.component.html',
  styleUrls: ['./registration-addon.component.css']
})
export class RegistrationAddonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  currencyService = inject(CurrencyService);

  activeTab: 'dashboard' | 'student-list' | 'settings' = 'dashboard';

  applicants: OnlineApplicant[] = [
    { id: 1, applicationNo: 'APP-2025-0101', studentName: 'Vihan Malhotra', appliedClass: 'Grade 10', parentName: 'Rajesh Malhotra', phone: '+91 98112 34567', email: 'rajesh.m@gmail.com', appliedDate: 'Today, 10:15 AM', applicationFeeStatus: 'Paid', admissionStatus: 'Under Review' },
    { id: 2, applicationNo: 'APP-2025-0102', studentName: 'Sanya Gupta', appliedClass: 'Grade 9', parentName: 'Meenakshi Gupta', phone: '+91 98223 45678', email: 'meenakshi.g@yahoo.com', appliedDate: 'Yesterday', applicationFeeStatus: 'Paid', admissionStatus: 'Interview Scheduled' },
    { id: 3, applicationNo: 'APP-2025-0103', studentName: 'Aditya Deshmukh', appliedClass: 'Grade 11 - Science', parentName: 'Sunil Deshmukh', phone: '+91 98334 56789', email: 'sunil.desh@gmail.com', appliedDate: '02 May 2025', applicationFeeStatus: 'Paid', admissionStatus: 'Approved' },
    { id: 4, applicationNo: 'APP-2025-0104', studentName: 'Anushka Sen', appliedClass: 'Grade 6', parentName: 'Priyanka Sen', phone: '+91 98445 67890', email: 'priyanka.s@gmail.com', appliedDate: '01 May 2025', applicationFeeStatus: 'Unpaid', admissionStatus: 'Submitted' }
  ];

  portalSettings = {
    isOnlineAdmissionOpen: true,
    applicationFeeAmount: 500,
    academicSession: '2025-26',
    requireBirthCertificate: true,
    requirePreviousMarksheet: true,
    autoSendSmsConfirmation: true,
    portalUrl: 'https://admissions.easyedu.com'
  };

  ngOnInit(): void {
    this.syncRoute();
    this.route.url.subscribe(() => this.syncRoute());
  }

  private syncRoute(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('studentlist')) this.activeTab = 'student-list';
    else if (path.includes('settings')) this.activeTab = 'settings';
    else this.activeTab = 'dashboard';
  }

  updateStatus(app: OnlineApplicant, status: any): void {
    app.admissionStatus = status;
    Swal.fire('Status Updated', `Application ${app.applicationNo} marked as ${status}. Notification dispatched to parent.`, 'success');
  }

  saveSettings(): void {
    Swal.fire('Portal Config Saved', 'Public online registration portal parameters updated.', 'success');
  }
}
