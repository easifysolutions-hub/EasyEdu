import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';

declare const Swal: any;

interface AcademicSession {
  id: number;
  yearName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  themeService = inject(ThemeService);

  activeTab: 'profile' | 'sessions' | 'payments' | 'notifications' | 'backup' = 'profile';

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

  ngOnInit(): void {}

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
