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

export interface HolidayItem {
  id: number;
  name: string;
  type: 'National' | 'Festival' | 'Academic' | 'Gazetted';
  startDate: string;
  endDate: string;
  durationDays: number;
  applicableTo: 'All' | 'Students Only' | 'Staff Only';
  status: 'Published' | 'Draft';
}

export interface OptionalSubjectAssignment {
  id: number;
  studentName: string;
  admissionNo: string;
  class: string;
  electiveSubject: string;
  assignedDate: string;
  status: 'Confirmed' | 'Pending';
}

export interface BaseLookupItem {
  id: number;
  category: 'Blood Group' | 'Religion' | 'Caste/Quota' | 'Document Type' | 'Gender Code';
  codeName: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface SystemUserItem {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  linkedEntity: string;
  lastLogin: string;
  isTwoFactorEnabled: boolean;
  status: 'Active' | 'Suspended';
  avatarUrl: string;
}

export interface ApiTokenItem {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  rateLimit: string;
  createdDate: string;
  expiryDate: string;
  status: 'Active' | 'Revoked';
}

export interface CustomFieldItem {
  id: number;
  moduleTarget: 'Student Admission' | 'Staff Onboarding' | 'Fee Invoices' | 'Library Books';
  fieldLabel: string;
  fieldType: 'Text' | 'Number' | 'Dropdown' | 'Date' | 'File Upload' | 'Checkbox';
  isRequired: boolean;
  showOnPublicPortal: boolean;
  status: 'Active' | 'Disabled';
}

export interface BackupItem {
  id: string;
  fileName: string;
  size: string;
  date: string;
  destination: string;
  type: string;
}

export interface RolePermissionItem {
  id: number;
  roleName: string;
  usersCount: number;
  description: string;
  permissions: { [module: string]: { view: boolean; create: boolean; edit: boolean; delete: boolean } };
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

  activeTab: 'overview' | 'profile' | 'academicYear' | 'optionalSubject' | 'holiday' | 'baseSetup' | 'role' | 'users' | 'apiPermission' | 'customFields' | 'backup' | 'updates' = 'overview';

  // 1. System Health & Control Center
  systemHealth = {
    uptime: '99.98% (42 Days Continuous)',
    dbLatency: '11 ms (Healthy)',
    activeSessions: 1420,
    storageUsed: '142.6 GB / 500 GB',
    storagePercent: 28.5,
    memoryUsed: '4.2 GB / 16 GB',
    memoryPercent: 26.2,
    cpuLoad: '14%',
    licenseType: 'Enterprise Multi-Campus Cloud',
    licenseExpiry: '31 Dec 2027'
  };

  // Currencies list with Indian Rupee (INR) as the default standard
  currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', label: 'INR (₹) - Indian Rupee (Default)' },
    { code: 'USD', symbol: '$', name: 'US Dollar', label: 'USD ($) - United States Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro', label: 'EUR (€) - European Union Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound', label: 'GBP (£) - British Pound Sterling' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', label: 'AED (د.إ) - UAE Dirham' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', label: 'SAR (﷼) - Saudi Arabian Riyal' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', label: 'CAD (C$) - Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', label: 'AUD (A$) - Australian Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', label: 'SGD (S$) - Singapore Dollar' },
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', label: 'BDT (৳) - Bangladeshi Taka' },
    { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee', label: 'NPR (रू) - Nepalese Rupee' },
    { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', label: 'LKR (Rs) - Sri Lankan Rupee' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', label: 'MYR (RM) - Malaysian Ringgit' },
    { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal', label: 'QAR (QR) - Qatari Riyal' },
    { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', label: 'KWD (KD) - Kuwaiti Dinar' }
  ];

  // 2. Institutional Identity (General Settings)
  profile = {
    schoolName: 'EasyEdu International Academy',
    schoolCode: 'EE-BLR-001',
    affiliation: 'CBSE Affiliation # 830412',
    email: 'admin@easyedu.org',
    phone: '+91 80 2845 9900',
    tollFree: '1800 200 4488',
    website: 'https://easyedu.easifysolutions.com',
    address: '#42, Campus Green Valley, Main Tech Park Road, Bengaluru, Karnataka - 560001',
    currency: 'INR (₹)',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Asia/Kolkata (IST +5:30)',
    headerNote: 'Excellence in Education • Character • Scientific Inquiry',
    footerNote: 'EasyEdu System Generated Official Educational Document • ISO 9001:2015 Certified',
    logoUrl: '/images/easyedu_full_logo.png'
  };

  // 3. Academic Year Cycle
  sessions: AcademicSession[] = [
    { id: 1, yearName: '2025-2026', startDate: '2025-04-01', endDate: '2026-03-31', isCurrent: true, status: 'Active (Current)' },
    { id: 2, yearName: '2024-2025', startDate: '2024-04-01', endDate: '2025-03-31', isCurrent: false, status: 'Archived' },
    { id: 3, yearName: '2026-2027', startDate: '2026-04-01', endDate: '2027-03-31', isCurrent: false, status: 'Upcoming Planning' }
  ];

  newSession = {
    yearName: '',
    startDate: '2026-04-01',
    endDate: '2027-03-31'
  };

  // 4. Optional Subject Assignment
  optionalAssignments: OptionalSubjectAssignment[] = [
    { id: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2026-001', class: 'Grade 10-A', electiveSubject: 'Advanced Robotics & AI', assignedDate: '2026-09-01', status: 'Confirmed' },
    { id: 2, studentName: 'Diya Patel', admissionNo: 'ADM-2026-002', class: 'Grade 10-A', electiveSubject: 'French Language & Literature', assignedDate: '2026-09-01', status: 'Confirmed' },
    { id: 3, studentName: 'Rohan Gupta', admissionNo: 'ADM-2026-003', class: 'Grade 10-B', electiveSubject: 'Applied Graphic Design', assignedDate: '2026-09-02', status: 'Confirmed' },
    { id: 4, studentName: 'Ananya Verma', admissionNo: 'ADM-2026-004', class: 'Grade 9-A', electiveSubject: 'Classical Music & Symphony', assignedDate: '2026-09-04', status: 'Confirmed' },
    { id: 5, studentName: 'Kabir Mehta', admissionNo: 'ADM-2026-005', class: 'Grade 11-Sci', electiveSubject: 'Aerospace Engineering Fundamentals', assignedDate: '2026-09-05', status: 'Confirmed' }
  ];

  availableElectives = [
    'Advanced Robotics & AI',
    'French Language & Literature',
    'Applied Graphic Design',
    'Classical Music & Symphony',
    'Aerospace Engineering Fundamentals',
    'Physical Education & Sports Science'
  ];

  selectedElectiveFilter = 'All';

  // 5. Holiday Master
  holidays: HolidayItem[] = [
    { id: 1, name: 'Independence Day', type: 'National', startDate: '2026-08-15', endDate: '2026-08-15', durationDays: 1, applicableTo: 'All', status: 'Published' },
    { id: 2, name: 'Diwali & Festival of Lights Recess', type: 'Festival', startDate: '2026-11-01', endDate: '2026-11-05', durationDays: 5, applicableTo: 'All', status: 'Published' },
    { id: 3, name: 'Winter Break & Christmas Holidays', type: 'Academic', startDate: '2026-12-24', endDate: '2027-01-02', durationDays: 10, applicableTo: 'All', status: 'Published' },
    { id: 4, name: 'Republic Day Celebration', type: 'National', startDate: '2027-01-26', endDate: '2027-01-26', durationDays: 1, applicableTo: 'All', status: 'Published' },
    { id: 5, name: 'Staff Annual Development Retreat', type: 'Academic', startDate: '2026-10-18', endDate: '2026-10-19', durationDays: 2, applicableTo: 'Staff Only', status: 'Published' }
  ];

  newHoliday: Partial<HolidayItem> = {
    name: '',
    type: 'Festival',
    startDate: '',
    endDate: '',
    durationDays: 1,
    applicableTo: 'All',
    status: 'Published'
  };

  // 6. Base / Environmental Setup
  baseLookups: BaseLookupItem[] = [
    { id: 1, category: 'Blood Group', codeName: 'O+', description: 'Universal Red Cell Donor', status: 'Active' },
    { id: 2, category: 'Blood Group', codeName: 'A+', description: 'Standard A Positive', status: 'Active' },
    { id: 3, category: 'Blood Group', codeName: 'B+', description: 'Standard B Positive', status: 'Active' },
    { id: 4, category: 'Blood Group', codeName: 'AB+', description: 'Universal Plasma Recipient', status: 'Active' },
    { id: 5, category: 'Religion', codeName: 'Secular / All Faiths', description: 'Universal Enrollment', status: 'Active' },
    { id: 6, category: 'Caste/Quota', codeName: 'General Merit', description: 'Open Category Quota', status: 'Active' },
    { id: 7, category: 'Caste/Quota', codeName: 'Sports & Talent Quota', description: 'Special Representation', status: 'Active' },
    { id: 8, category: 'Document Type', codeName: 'Birth Certificate', description: 'Primary Age Proof', status: 'Active' },
    { id: 9, category: 'Document Type', codeName: 'Transfer Certificate (TC)', description: 'Previous School Clearance', status: 'Active' }
  ];

  // 7. Role Jurisdiction
  roles: RolePermissionItem[] = [
    {
      id: 1,
      roleName: 'Super Administrator',
      usersCount: 2,
      description: 'Unrestricted full access across all modules, system configurations, and security policies.',
      permissions: {
        'Students': { view: true, create: true, edit: true, delete: true },
        'Academics': { view: true, create: true, edit: true, delete: true },
        'Finance': { view: true, create: true, edit: true, delete: true },
        'System': { view: true, create: true, edit: true, delete: true }
      }
    },
    {
      id: 2,
      roleName: 'Principal / Dean',
      usersCount: 4,
      description: 'Executive academic oversight, staff evaluations, timetable approvals, and student welfare.',
      permissions: {
        'Students': { view: true, create: true, edit: true, delete: false },
        'Academics': { view: true, create: true, edit: true, delete: true },
        'Finance': { view: true, create: false, edit: false, delete: false },
        'System': { view: true, create: false, edit: false, delete: false }
      }
    },
    {
      id: 3,
      roleName: 'Senior Teacher / Faculty',
      usersCount: 86,
      description: 'Attendance roll call, marks entry, lesson planning, and homework assignments.',
      permissions: {
        'Students': { view: true, create: false, edit: false, delete: false },
        'Academics': { view: true, create: true, edit: true, delete: false },
        'Finance': { view: false, create: false, edit: false, delete: false },
        'System': { view: false, create: false, edit: false, delete: false }
      }
    },
    {
      id: 4,
      roleName: 'Accountant & Bursar',
      usersCount: 6,
      description: 'Fee receipts, invoices, voucher ledgers, payroll disbursement, and bank reconciliations.',
      permissions: {
        'Students': { view: true, create: false, edit: false, delete: false },
        'Academics': { view: false, create: false, edit: false, delete: false },
        'Finance': { view: true, create: true, edit: true, delete: false },
        'System': { view: false, create: false, edit: false, delete: false }
      }
    }
  ];

  // 8. User Management Matrix
  users: SystemUserItem[] = [
    { id: 1, name: 'Dr. Eleanor Vance', username: 'principal.vance', email: 'eleanor.vance@easyedu.org', role: 'Principal / Dean', linkedEntity: 'Staff STF-001', lastLogin: 'Today, 08:30 AM', isTwoFactorEnabled: true, status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' },
    { id: 2, name: 'Prof. Marcus Chen', username: 'mchen.math', email: 'marcus.chen@easyedu.org', role: 'Senior Teacher', linkedEntity: 'Staff STF-002', lastLogin: 'Today, 08:15 AM', isTwoFactorEnabled: true, status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: 3, name: 'Deepak Sharma', username: 'dsharma.accounts', email: 'deepak.sharma@easyedu.org', role: 'Accountant', linkedEntity: 'Staff STF-015', lastLogin: 'Yesterday, 04:45 PM', isTwoFactorEnabled: false, status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 4, name: 'Aarav Sharma', username: 'aarav.sharma26', email: 'aarav.sharma@student.easyedu.org', role: 'Student Portal', linkedEntity: 'Student ADM-2026-001', lastLogin: 'Today, 09:10 AM', isTwoFactorEnabled: false, status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }
  ];

  // 9. API Access Nexus
  apiTokens: ApiTokenItem[] = [
    { id: 'TOK-01', name: 'EasyEdu Student Mobile App Gateway', keyPrefix: 'eea_live_88392019...', scopes: ['students:read', 'attendance:read', 'fees:read'], rateLimit: '50,000 req/hr', createdDate: '2026-08-01', expiryDate: '2027-08-01', status: 'Active' },
    { id: 'TOK-02', name: 'Campus Biometric Turnstile Scanner Sync', keyPrefix: 'eea_live_99401283...', scopes: ['attendance:write', 'biometrics:sync'], rateLimit: '10,000 req/hr', createdDate: '2026-08-15', expiryDate: '2027-08-15', status: 'Active' },
    { id: 'TOK-03', name: 'Fleet GPS Telemetry Stream', keyPrefix: 'eea_live_44102938...', scopes: ['transport:gps:write', 'routes:read'], rateLimit: '20,000 req/hr', createdDate: '2026-09-01', expiryDate: '2027-09-01', status: 'Active' }
  ];

  // 10. Field Customization
  customFields: CustomFieldItem[] = [
    { id: 1, moduleTarget: 'Student Admission', fieldLabel: 'Mother Tongue / Primary Spoken Language', fieldType: 'Dropdown', isRequired: true, showOnPublicPortal: true, status: 'Active' },
    { id: 2, moduleTarget: 'Student Admission', fieldLabel: 'National Identification / Aadhaar / SSN', fieldType: 'Text', isRequired: true, showOnPublicPortal: false, status: 'Active' },
    { id: 3, moduleTarget: 'Staff Onboarding', fieldLabel: 'Emergency Blood Group Donor Consent', fieldType: 'Checkbox', isRequired: false, showOnPublicPortal: false, status: 'Active' },
    { id: 4, moduleTarget: 'Fee Invoices', fieldLabel: 'Corporate GST / Tax Registration Number', fieldType: 'Text', isRequired: false, showOnPublicPortal: true, status: 'Active' }
  ];

  // 11. Data Archive & Backup
  backups: BackupItem[] = [
    { id: 'BKP-01', fileName: 'EasyEdu_Enterprise_Full_2026_10_05.sql.gz', size: '48.6 MB', date: '2026-10-05 02:00 AM', destination: 'AWS S3 Vault (eu-west-1)', type: 'Automated Snapshot' },
    { id: 'BKP-02', fileName: 'EasyEdu_Enterprise_Full_2026_10_01.sql.gz', size: '47.2 MB', date: '2026-10-01 02:00 AM', destination: 'AWS S3 Vault (eu-west-1)', type: 'Automated Snapshot' },
    { id: 'BKP-03', fileName: 'EasyEdu_Enterprise_Full_2026_09_25.sql.gz', size: '45.8 MB', date: '2026-09-25 02:00 AM', destination: 'Local Storage Archive', type: 'Manual Admin Snapshot' }
  ];

  // Modals state
  showNewSessionModal = false;
  showNewHolidayModal = false;
  showNewUserModal = false;
  showNewApiTokenModal = false;
  showNewFieldModal = false;

  ngOnInit(): void {
    // Load persisted institutional profile from localStorage if present
    const savedProfile = localStorage.getItem('easyedu_settings_profile');
    if (savedProfile) {
      try {
        this.profile = { ...this.profile, ...JSON.parse(savedProfile) };
      } catch (e) {
        console.warn('Failed to parse saved profile', e);
      }
    }

    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/').toLowerCase();
      this.detectTabFromUrl(path);
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.setTab(params['tab']);
      }
    });
  }

  detectTabFromUrl(path: string): void {
    if (path.includes('generalsettings/academicyear') || path.includes('academicyear')) this.activeTab = 'academicYear';
    else if (path.includes('optionalsubject') || path.includes('assign')) this.activeTab = 'optionalSubject';
    else if (path.includes('holiday')) this.activeTab = 'holiday';
    else if (path.includes('basesetup') || path.includes('environmental')) this.activeTab = 'baseSetup';
    else if (path.includes('rolepermission/role') || path.includes('role')) this.activeTab = 'role';
    else if (path.includes('administration/users') || path.includes('users')) this.activeTab = 'users';
    else if (path.includes('apipermission') || path.includes('api')) this.activeTab = 'apiPermission';
    else if (path.includes('customfields') || path.includes('customfield')) this.activeTab = 'customFields';
    else if (path.includes('backup') || path.includes('archive')) this.activeTab = 'backup';
    else if (path.includes('administration/updates') || path.includes('updates')) this.activeTab = 'updates';
    else if (path.includes('generalsettings') || path.includes('identity')) this.activeTab = 'profile';
    else if (path.includes('settings')) this.activeTab = 'overview';
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  saveIdentity(): void {
    localStorage.setItem('easyedu_settings_profile', JSON.stringify(this.profile));
    Swal.fire({
      title: 'Institutional Profile Updated',
      text: `Institutional settings saved. Primary currency set to: ${this.profile.currency}`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  saveProfile(): void {
    this.saveIdentity();
  }

  createSession(): void {
    if (!this.newSession.yearName) {
      Swal.fire('Session Name Required', 'Please enter Academic Year session name (e.g. 2026-2027).', 'warning');
      return;
    }
    const session: AcademicSession = {
      id: Date.now(),
      yearName: this.newSession.yearName,
      startDate: this.newSession.startDate || '2026-04-01',
      endDate: this.newSession.endDate || '2027-03-31',
      isCurrent: false,
      status: 'Upcoming Planning'
    };
    this.sessions.push(session);
    this.showNewSessionModal = false;
    this.newSession = { yearName: '', startDate: '2026-04-01', endDate: '2027-03-31' };
    Swal.fire('Academic Session Created', `Session ${session.yearName} registered.`, 'success');
  }

  setCurrentSession(s: AcademicSession): void {
    this.sessions.forEach(x => {
      x.isCurrent = false;
      x.status = 'Archived';
    });
    s.isCurrent = true;
    s.status = 'Active (Current)';
    Swal.fire('Active Session Updated', `Current active academic cycle switched to "${s.yearName}".`, 'success');
  }

  createHoliday(): void {
    if (!this.newHoliday.name) {
      Swal.fire('Holiday Title Required', 'Please provide a title for the holiday.', 'warning');
      return;
    }
    const h: HolidayItem = {
      id: Date.now(),
      name: this.newHoliday.name || '',
      type: this.newHoliday.type || 'Festival',
      startDate: this.newHoliday.startDate || '2026-10-15',
      endDate: this.newHoliday.endDate || '2026-10-15',
      durationDays: this.newHoliday.durationDays || 1,
      applicableTo: this.newHoliday.applicableTo || 'All',
      status: 'Published'
    };
    this.holidays.unshift(h);
    this.showNewHolidayModal = false;
    this.newHoliday = { name: '', type: 'Festival', startDate: '', endDate: '', durationDays: 1, applicableTo: 'All', status: 'Published' };
    Swal.fire('Holiday Registered', `Holiday "${h.name}" added to master calendar.`, 'success');
  }

  toggleUserStatus(u: SystemUserItem): void {
    u.status = u.status === 'Active' ? 'Suspended' : 'Active';
    Swal.fire('User Status Updated', `Account for ${u.name} is now ${u.status}.`, 'info');
  }

  revokeToken(tok: ApiTokenItem): void {
    tok.status = tok.status === 'Active' ? 'Revoked' : 'Active';
    Swal.fire('API Key Updated', `Access Token ${tok.name} is now ${tok.status}.`, 'info');
  }

  triggerBackup(): void {
    Swal.fire({
      title: 'Initiate Database Backup?',
      text: 'Create a full SQL dump snapshot and upload to cloud archive.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Yes, Snapshot Now'
    }).then((res: any) => {
      if (res.isConfirmed) {
        const backup: BackupItem = {
          id: `BKP-${Date.now().toString().slice(-4)}`,
          fileName: `EasyEdu_Enterprise_Manual_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}.sql.gz`,
          size: '49.1 MB',
          date: 'Just Now',
          destination: 'AWS S3 Glacier Vault',
          type: 'Manual Admin Snapshot'
        };
        this.backups.unshift(backup);
        Swal.fire('Database Snapshot Completed', 'Secure backup compressed and stored to S3 vault.', 'success');
      }
    });
  }

  restoreBackup(bk: BackupItem): void {
    Swal.fire({
      title: `Restore from ${bk.fileName}?`,
      text: 'Warning: This will restore database tables to the selected state.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Confirm Restore'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire('Database Restored', 'Database state verified and synchronized.', 'success');
      }
    });
  }

  checkForUpdates(): void {
    Swal.fire({
      title: 'Checking for Cloud Updates...',
      html: '<div class="text-center p-2"><i class="fas fa-spinner fa-spin fa-2x text-primary mb-2"></i><p class="small text-muted mb-0">Querying release repository...</p></div>',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      Swal.fire('Platform Up to Date', 'EasyEdu Enterprise Core v4.2.0 is running the latest stable release.', 'success');
    });
  }
}
