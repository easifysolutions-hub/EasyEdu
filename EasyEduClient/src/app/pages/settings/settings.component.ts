import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

declare const Swal: any;

export interface AcademicSession {
  id: number;
  yearName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: string;
}

export interface AppModuleInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  isEnabled: boolean;
  isCore: boolean;
  version: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  themeService = inject(ThemeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'profile' | 'sessions' | 'payments' | 'notifications' | 'backup' | 'style' | 'module-manager' = 'profile';

  // Module Manager State
  modules: AppModuleInfo[] = [
    { id: 'MOD-01', name: 'Student Management & Admissions', category: 'Core Academic', description: 'Student directory, admission wizard, batch promotion, ID cards', isEnabled: true, isCore: true, version: 'v3.5.0' },
    { id: 'MOD-02', name: 'Attendance & Biometrics', category: 'Core Academic', description: 'Daily attendance, subject-wise period roll, RFID & facial scanner sync', isEnabled: true, isCore: true, version: 'v3.2.0' },
    { id: 'MOD-03', name: 'Examination & Grade Books', category: 'Core Academic', description: 'Marks register, tabulations, hall tickets, SMS mark cards', isEnabled: true, isCore: true, version: 'v3.4.0' },
    { id: 'MOD-04', name: 'Online Examination & CBT', category: 'Platform Addon', description: 'Question bank, timed CBT exams, auto-grading', isEnabled: true, isCore: false, version: 'v2.1.0' },
    { id: 'MOD-05', name: 'Fees & Invoicing Engine', category: 'Finance', description: 'Fee heads, custom installments, online gateway collections', isEnabled: true, isCore: true, version: 'v3.8.0' },
    { id: 'MOD-06', name: 'Human Resources & Payroll', category: 'Operations', description: 'Staff onboarding, attendance, salary slips, leave sanctioning', isEnabled: true, isCore: true, version: 'v3.1.0' },
    { id: 'MOD-07', name: 'Transport Fleet & GPS', category: 'Logistics', description: 'Bus routes, student stops, vehicle live telemetry', isEnabled: true, isCore: false, version: 'v2.9.0' },
    { id: 'MOD-08', name: 'Library & OPAC Catalog', category: 'Academic Resources', description: 'Book circulation, barcode scanner, fines tracker', isEnabled: true, isCore: false, version: 'v2.4.0' },
    { id: 'MOD-09', name: 'Virtual Classrooms & Zoom', category: 'Digital Learning', description: 'Live video lecture scheduling, Google Meet / Zoom integration', isEnabled: true, isCore: false, version: 'v1.8.0' }
  ];

  // 1. Institution Profile
  profile = {
    schoolName: 'EasyEdu International Academy',
    schoolCode: 'EE-BLR-001',
    affiliation: 'CBSE Affiliation # 830412',
    email: 'admin@easyedu.com',
    phone: '+91 80 2845 9900',
    website: 'https://easyedu.easifysolutions.com',
    address: '#42, Campus Green Valley, Main Tech Park Road, Bengaluru, Karnataka - 560001',
    currency: 'INR (₹)',
    dateFormat: 'dd/MM/yyyy',
    timeZone: 'Asia/Kolkata (IST +5:30)',
    headerNote: 'Excellence in Education • Character • Leadership',
    footerNote: 'EasyEdu System Generated Official Educational Document'
  };

  // 2. Academic Sessions
  sessions: AcademicSession[] = [
    { id: 1, yearName: '2025-2026', startDate: '2025-04-01', endDate: '2026-03-31', isCurrent: true, status: 'Active (Current)' },
    { id: 2, yearName: '2024-2025', startDate: '2024-04-01', endDate: '2025-03-31', isCurrent: false, status: 'Archived' },
    { id: 3, yearName: '2026-2027', startDate: '2026-04-01', endDate: '2027-03-31', isCurrent: false, status: 'Upcoming Planning' }
  ];

  newSession = {
    yearName: '',
    startDate: '',
    endDate: ''
  };

  // 3. Payment Gateways
  paymentConfig = {
    currencySymbol: '₹',
    currencyCode: 'INR',
    enableRazorpay: true,
    razorpayKeyId: 'rzp_live_891024881029',
    razorpayKeySecret: '••••••••••••••••••••••••',
    enableStripe: false,
    stripePublishableKey: '',
    autoGenerateReceiptOnPayment: true,
    allowPartialFeeCollection: true
  };

  // 4. SMS & Notifications
  alertConfig = {
    enableSms: true,
    smsGateway: 'Twilio Cloud SMS',
    enableWhatsApp: true,
    whatsAppApiToken: '••••••••••••••••••••••••',
    notifyAttendanceAbsent: true,
    notifyFeeInvoiceGenerated: true,
    notifyFeeOverdueReminder: true,
    notifyExamAdmitCard: true,
    notifyReportCardPublished: true
  };

  // 5. Backup & Security
  backups = [
    { fileName: 'EasyEdu_Backup_2025_05_01.sql.gz', size: '42.8 MB', date: '01 May 2025, 02:00 AM', type: 'Full Database Backup' },
    { fileName: 'EasyEdu_Backup_2025_04_01.sql.gz', size: '39.4 MB', date: '01 Apr 2025, 02:00 AM', type: 'Full Database Backup' },
    { fileName: 'EasyEdu_Backup_2025_03_01.sql.gz', size: '36.1 MB', date: '01 Mar 2025, 02:00 AM', type: 'Full Database Backup' }
  ];

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      const path = this.router.url.toLowerCase();
      if (path.includes('style')) {
        this.activeTab = 'style';
      } else if (path.includes('modulemanager') || path.includes('module-manager')) {
        this.activeTab = 'module-manager';
      }
    });
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  toggleModule(mod: AppModuleInfo): void {
    if (mod.isCore) {
      Swal.fire('Core Module Locked', 'Core system modules cannot be disabled.', 'info');
      return;
    }
    mod.isEnabled = !mod.isEnabled;
    Swal.fire('Module Updated', `${mod.name} is now ${mod.isEnabled ? 'Active' : 'Disabled'}.`, 'success');
  }


  saveProfile(): void {
    Swal.fire({
      title: 'Profile Updated!',
      text: 'Institutional details and letterhead branding saved successfully.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  setCurrentSession(session: AcademicSession): void {
    this.sessions.forEach(s => {
      s.isCurrent = (s.id === session.id);
      s.status = s.isCurrent ? 'Active (Current)' : 'Archived';
    });

    Swal.fire({
      title: 'Academic Session Changed',
      text: `Active school session set to ${session.yearName}. All class registers now point to this term.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  saveNewSession(): void {
    if (!this.newSession.yearName || !this.newSession.startDate) {
      Swal.fire('Missing Information', 'Please provide Session Name and Start Date.', 'warning');
      return;
    }

    this.sessions.push({
      id: this.sessions.length + 1,
      yearName: this.newSession.yearName,
      startDate: this.newSession.startDate,
      endDate: this.newSession.endDate || this.newSession.startDate,
      isCurrent: false,
      status: 'Upcoming Planning'
    });

    this.newSession = { yearName: '', startDate: '', endDate: '' };
    Swal.fire('Session Added', 'New academic session configured.', 'success');
  }

  savePaymentSettings(): void {
    Swal.fire({
      title: 'Payment Gateway Saved!',
      text: 'Gateway credentials and receipt settings updated.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  saveNotificationSettings(): void {
    Swal.fire({
      title: 'Alert Triggers Saved!',
      text: 'SMS, WhatsApp, and parent notification preferences updated.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  triggerBackup(): void {
    Swal.fire({
      title: 'Generating Full Backup...',
      text: 'Exporting SQL database dump and media storage archive...',
      icon: 'info',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '_');
      this.backups.unshift({
        fileName: `EasyEdu_Backup_${dateStr}_Manual.sql.gz`,
        size: '44.2 MB',
        date: 'Just Now',
        type: 'On-Demand Manual Snapshot'
      });

      Swal.fire({
        title: 'Backup Completed!',
        text: 'Database snapshot created and safely stored.',
        icon: 'success',
        confirmButtonColor: '#002B49'
      });
    });
  }
}
