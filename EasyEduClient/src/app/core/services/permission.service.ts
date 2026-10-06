import { Injectable, signal, computed } from '@angular/core';

export interface ActionPermissions {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export type ModulePermissionsMap = { [moduleKey: string]: ActionPermissions };

export interface SystemRoleDefinition {
  id: number;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: ModulePermissionsMap;
}

export const ALL_MODULE_KEYS = [
  'dashboard',
  'adminSection',
  'utilities',
  'communicate',
  'academic',
  'lessonPlan',
  'homework',
  'exams',
  'onlineExam',
  'teacherEvaluation',
  'students',
  'attendance',
  'behaviour',
  'hr',
  'fees',
  'accounts',
  'inventory',
  'transport',
  'dormitory',
  'certificates',
  'virtualClass',
  'smartAttendanceMenu',
  'advancedAcademicMenu',
  'commSubMenu',
  'downloadCenter',
  'dataManagement',
  'frontendCms',
  'styleArchitect',
  'reports',
  'examReports',
  'systemSettings',
  'moduleManager'
] as const;

export type ModuleKey = typeof ALL_MODULE_KEYS[number];

const fullAccess = (): ActionPermissions => ({ view: true, add: true, edit: true, delete: true });
const readOnly = (): ActionPermissions => ({ view: true, add: false, edit: false, delete: false });
const noAccess = (): ActionPermissions => ({ view: false, add: false, edit: false, delete: false });

export const DEFAULT_ROLE_DEFINITIONS: SystemRoleDefinition[] = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Complete unrestricted governance over all academic, financial, operational, and system modules.',
    isSystem: true,
    permissions: ALL_MODULE_KEYS.reduce((acc, mod) => {
      acc[mod] = fullAccess();
      return acc;
    }, {} as ModulePermissionsMap)
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Institutional management with operational permissions across academic, student, and staff records.',
    isSystem: true,
    permissions: ALL_MODULE_KEYS.reduce((acc, mod) => {
      if (mod === 'moduleManager' || mod === 'styleArchitect') {
        acc[mod] = noAccess();
      } else {
        acc[mod] = fullAccess();
      }
      return acc;
    }, {} as ModulePermissionsMap)
  },
  {
    id: 3,
    name: 'Teacher / Faculty',
    description: 'Academic lesson planning, classroom routine, homework grading, examinations, and attendance.',
    isSystem: false,
    permissions: {
      dashboard: readOnly(),
      academic: fullAccess(),
      lessonPlan: fullAccess(),
      homework: fullAccess(),
      exams: fullAccess(),
      onlineExam: fullAccess(),
      teacherEvaluation: readOnly(),
      students: readOnly(),
      attendance: fullAccess(),
      behaviour: fullAccess(),
      virtualClass: fullAccess(),
      smartAttendanceMenu: readOnly(),
      advancedAcademicMenu: fullAccess(),
      downloadCenter: fullAccess(),
      communicate: readOnly(),
      reports: readOnly(),
      examReports: fullAccess(),
      adminSection: noAccess(),
      utilities: readOnly(),
      hr: noAccess(),
      fees: noAccess(),
      accounts: noAccess(),
      inventory: readOnly(),
      transport: readOnly(),
      dormitory: noAccess(),
      certificates: noAccess(),
      commSubMenu: noAccess(),
      dataManagement: noAccess(),
      frontendCms: noAccess(),
      styleArchitect: noAccess(),
      systemSettings: noAccess(),
      moduleManager: noAccess()
    }
  },
  {
    id: 4,
    name: 'Accountant',
    description: 'Cashier collection, fee invoicing, bank settlements, financial vouchers, ledgers, and balance sheets.',
    isSystem: false,
    permissions: {
      dashboard: readOnly(),
      fees: fullAccess(),
      accounts: fullAccess(),
      reports: fullAccess(),
      inventory: fullAccess(),
      students: readOnly(),
      communicate: readOnly(),
      downloadCenter: readOnly(),
      academic: noAccess(),
      lessonPlan: noAccess(),
      homework: noAccess(),
      exams: noAccess(),
      onlineExam: noAccess(),
      teacherEvaluation: noAccess(),
      attendance: noAccess(),
      behaviour: noAccess(),
      hr: noAccess(),
      transport: readOnly(),
      dormitory: readOnly(),
      certificates: noAccess(),
      virtualClass: noAccess(),
      smartAttendanceMenu: noAccess(),
      advancedAcademicMenu: noAccess(),
      commSubMenu: noAccess(),
      dataManagement: readOnly(),
      frontendCms: noAccess(),
      styleArchitect: noAccess(),
      adminSection: noAccess(),
      utilities: readOnly(),
      examReports: noAccess(),
      systemSettings: noAccess(),
      moduleManager: noAccess()
    }
  },
  {
    id: 5,
    name: 'Librarian',
    description: 'Circulation desk, catalog management, book issue/return registers, and library reports.',
    isSystem: false,
    permissions: {
      dashboard: readOnly(),
      inventory: fullAccess(),
      reports: readOnly(),
      students: readOnly(),
      downloadCenter: fullAccess(),
      communicate: readOnly(),
      adminSection: noAccess(),
      utilities: readOnly(),
      academic: noAccess(),
      lessonPlan: noAccess(),
      homework: noAccess(),
      exams: noAccess(),
      onlineExam: noAccess(),
      teacherEvaluation: noAccess(),
      attendance: noAccess(),
      behaviour: noAccess(),
      hr: noAccess(),
      fees: noAccess(),
      accounts: noAccess(),
      transport: noAccess(),
      dormitory: noAccess(),
      certificates: noAccess(),
      virtualClass: noAccess(),
      smartAttendanceMenu: noAccess(),
      advancedAcademicMenu: noAccess(),
      commSubMenu: noAccess(),
      dataManagement: noAccess(),
      frontendCms: noAccess(),
      styleArchitect: noAccess(),
      examReports: noAccess(),
      systemSettings: noAccess(),
      moduleManager: noAccess()
    }
  },
  {
    id: 6,
    name: 'Receptionist',
    description: 'Front desk visitor records, admission inquiries, phone logs, and postal dispatches.',
    isSystem: false,
    permissions: {
      dashboard: readOnly(),
      adminSection: fullAccess(),
      communicate: fullAccess(),
      certificates: fullAccess(),
      students: readOnly(),
      utilities: readOnly(),
      downloadCenter: readOnly(),
      academic: noAccess(),
      lessonPlan: noAccess(),
      homework: noAccess(),
      exams: noAccess(),
      onlineExam: noAccess(),
      teacherEvaluation: noAccess(),
      attendance: noAccess(),
      behaviour: noAccess(),
      hr: noAccess(),
      fees: noAccess(),
      accounts: noAccess(),
      inventory: noAccess(),
      transport: readOnly(),
      dormitory: readOnly(),
      virtualClass: noAccess(),
      smartAttendanceMenu: noAccess(),
      advancedAcademicMenu: noAccess(),
      commSubMenu: noAccess(),
      dataManagement: noAccess(),
      frontendCms: noAccess(),
      styleArchitect: noAccess(),
      reports: noAccess(),
      examReports: noAccess(),
      systemSettings: noAccess(),
      moduleManager: noAccess()
    }
  },
  {
    id: 7,
    name: 'Student',
    description: 'Personalized portal for class routine, homework submissions, exam progress cards, and learning media.',
    isSystem: true,
    permissions: {
      dashboard: readOnly(),
      academic: readOnly(),
      homework: { view: true, add: true, edit: false, delete: false },
      examReports: readOnly(),
      virtualClass: readOnly(),
      downloadCenter: readOnly(),
      communicate: readOnly(),
      utilities: readOnly(),
      adminSection: noAccess(),
      lessonPlan: noAccess(),
      exams: noAccess(),
      onlineExam: { view: true, add: true, edit: false, delete: false },
      teacherEvaluation: noAccess(),
      students: noAccess(),
      attendance: readOnly(),
      behaviour: noAccess(),
      hr: noAccess(),
      fees: noAccess(),
      accounts: noAccess(),
      inventory: noAccess(),
      transport: noAccess(),
      dormitory: noAccess(),
      certificates: noAccess(),
      smartAttendanceMenu: noAccess(),
      advancedAcademicMenu: readOnly(),
      commSubMenu: noAccess(),
      dataManagement: noAccess(),
      frontendCms: noAccess(),
      styleArchitect: noAccess(),
      reports: noAccess(),
      systemSettings: noAccess(),
      moduleManager: noAccess()
    }
  },
  {
    id: 8,
    name: 'Parent / Guardian',
    description: 'Ward academic overview, biometric attendance, report cards, and fee payment receipts.',
    isSystem: true,
    permissions: {
      dashboard: readOnly(),
      academic: readOnly(),
      homework: readOnly(),
      attendance: readOnly(),
      examReports: readOnly(),
      fees: readOnly(),
      communicate: readOnly(),
      downloadCenter: readOnly(),
      adminSection: noAccess(),
      utilities: readOnly(),
      lessonPlan: noAccess(),
      exams: noAccess(),
      onlineExam: noAccess(),
      teacherEvaluation: noAccess(),
      students: noAccess(),
      behaviour: noAccess(),
      hr: noAccess(),
      accounts: noAccess(),
      inventory: noAccess(),
      transport: noAccess(),
      dormitory: noAccess(),
      certificates: noAccess(),
      virtualClass: noAccess(),
      smartAttendanceMenu: noAccess(),
      advancedAcademicMenu: noAccess(),
      commSubMenu: noAccess(),
      dataManagement: noAccess(),
      frontendCms: noAccess(),
      styleArchitect: noAccess(),
      reports: noAccess(),
      systemSettings: noAccess(),
      moduleManager: noAccess()
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  roles = signal<SystemRoleDefinition[]>(this.loadRolesFromStorage());
  activeRole = signal<string>(this.loadActiveRoleFromStorage());

  activePermissions = computed<ModulePermissionsMap>(() => {
    const roleName = this.activeRole();
    const current = this.roles().find(r => r.name === roleName);
    if (current) {
      return current.permissions;
    }
    const superAdmin = this.roles().find(r => r.name === 'Super Admin');
    return superAdmin?.permissions || DEFAULT_ROLE_DEFINITIONS[0].permissions;
  });

  private loadRolesFromStorage(): SystemRoleDefinition[] {
    const saved = localStorage.getItem('easyedu_role_permissions_matrix');
    if (saved) {
      try {
        const parsed: SystemRoleDefinition[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse saved permission matrix', e);
      }
    }
    return DEFAULT_ROLE_DEFINITIONS;
  }

  private loadActiveRoleFromStorage(): string {
    const savedRole = localStorage.getItem('easyedu_active_role');
    if (savedRole) {
      return savedRole;
    }
    // Check if user object has roles
    const userStr = localStorage.getItem('easyedu_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.roles && user.roles.length > 0) {
          return user.roles[0];
        }
      } catch (e) {}
    }
    return 'Super Admin';
  }

  setRole(roleName: string): void {
    const target = this.roles().find(r => r.name.toLowerCase() === roleName.toLowerCase());
    const validName = target ? target.name : roleName;
    this.activeRole.set(validName);
    localStorage.setItem('easyedu_active_role', validName);

    // Update user profile in storage if present
    const userStr = localStorage.getItem('easyedu_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.roles = [validName];
        localStorage.setItem('easyedu_user', JSON.stringify(user));
      } catch (e) {}
    }
  }

  isSuperAdmin(): boolean {
    const r = this.activeRole().toLowerCase();
    return r === 'super admin' || r === 'super administrator';
  }

  isAdmin(): boolean {
    const r = this.activeRole().toLowerCase();
    return this.isSuperAdmin() || r === 'admin' || r === 'administrator';
  }

  canAccess(moduleKey: string): boolean {
    if (this.isSuperAdmin()) return true;
    const perms = this.activePermissions();
    const mod = perms[moduleKey];
    return !!(mod && mod.view);
  }

  hasPermission(moduleKey: string, action: 'view' | 'add' | 'edit' | 'delete'): boolean {
    if (this.isSuperAdmin()) return true;
    const perms = this.activePermissions();
    const mod = perms[moduleKey];
    if (!mod) return false;
    return !!mod[action];
  }

  saveRolePermissions(roleName: string, updatedPermissions: ModulePermissionsMap): void {
    const currentRoles = [...this.roles()];
    const index = currentRoles.findIndex(r => r.name.toLowerCase() === roleName.toLowerCase());
    if (index !== -1) {
      currentRoles[index] = {
        ...currentRoles[index],
        permissions: { ...updatedPermissions }
      };
    } else {
      currentRoles.push({
        id: Date.now(),
        name: roleName,
        description: `Custom security role: ${roleName}`,
        isSystem: false,
        permissions: { ...updatedPermissions }
      });
    }

    this.roles.set(currentRoles);
    localStorage.setItem('easyedu_role_permissions_matrix', JSON.stringify(currentRoles));
  }

  resetToDefaults(): void {
    this.roles.set(DEFAULT_ROLE_DEFINITIONS);
    localStorage.removeItem('easyedu_role_permissions_matrix');
  }

  isCategoryVisible(category: 'main' | 'admin' | 'academics' | 'student' | 'finance' | 'logistics' | 'settings' | 'exam' | 'reports'): boolean {
    if (this.isSuperAdmin()) return true;

    switch (category) {
      case 'main':
        return this.canAccess('dashboard');
      case 'admin':
        return this.canAccess('adminSection') || this.canAccess('utilities') || this.canAccess('communicate');
      case 'academics':
        return this.canAccess('academic') || this.canAccess('lessonPlan') || this.canAccess('homework');
      case 'exam':
        return this.canAccess('exams') || this.canAccess('onlineExam') || this.canAccess('teacherEvaluation');
      case 'student':
        return this.canAccess('students') || this.canAccess('behaviour') || this.canAccess('hr');
      case 'finance':
        return this.canAccess('fees') || this.canAccess('accounts');
      case 'logistics':
        return this.canAccess('inventory') || this.canAccess('transport') || this.canAccess('dormitory') || this.canAccess('certificates') || this.canAccess('library') || this.canAccess('downloadCenter') || this.canAccess('dataManagement');
      case 'reports':
        return this.canAccess('reports') || this.canAccess('examReports');
      case 'settings':
        return this.canAccess('systemSettings') || this.canAccess('moduleManager') || this.canAccess('styleArchitect') || this.canAccess('frontendCms');
      default:
        return true;
    }
  }

  isRouteAllowed(rawUrl: string): boolean {
    if (this.isSuperAdmin()) return true;

    const url = rawUrl.toLowerCase().split('?')[0].split('#')[0];

    // Public & General routes always allowed
    if (url === '' || url === '/' || url.startsWith('/home') || url.startsWith('/products') ||
        url.startsWith('/modules') || url.startsWith('/pricing') || url.startsWith('/presentation') ||
        url.startsWith('/contact') || url.startsWith('/login') || url.startsWith('/dashboard')) {
      return true;
    }

    // System Settings & Configuration
    if (url.startsWith('/settings') || url.startsWith('/generalsettings') || url.startsWith('/rolepermission') ||
        url.startsWith('/customfields') || url.startsWith('/systemsettings') || url.startsWith('/administration/users') ||
        url.startsWith('/administration/updates')) {
      return this.canAccess('systemSettings');
    }

    // System Module Manager
    if (url.startsWith('/system/modulemanager')) {
      return this.canAccess('moduleManager');
    }

    // Style Architect
    if (url.startsWith('/style')) {
      return this.canAccess('styleArchitect');
    }

    // Frontend CMS
    if (url.startsWith('/frontsettings') || url.startsWith('/frontendcms') || url.startsWith('/frontend-cms')) {
      return this.canAccess('frontendCms');
    }

    // Finance & Fees
    if (url.startsWith('/finance') || url.startsWith('/fees')) {
      return this.canAccess('fees');
    }

    // Accounting & Vouchers
    if (url.startsWith('/accounting') || url.startsWith('/accounts')) {
      return this.canAccess('accounts');
    }

    // Human Resource & Staff
    if (url.startsWith('/humanresource') || url.startsWith('/staff') || url.startsWith('/leave')) {
      return this.canAccess('hr');
    }

    // Inventory
    if (url.startsWith('/inventory')) {
      return this.canAccess('inventory');
    }

    // Transport
    if (url.startsWith('/transport')) {
      return this.canAccess('transport');
    }

    // Dormitory / Hostel
    if (url.startsWith('/dormitory')) {
      return this.canAccess('dormitory');
    }

    // Library
    if (url.startsWith('/library')) {
      return this.canAccess('library');
    }

    // Certificates
    if (url.startsWith('/certificates')) {
      return this.canAccess('certificates') || this.canAccess('adminSection');
    }

    // Download Center
    if (url.startsWith('/downloadcenter')) {
      return this.canAccess('downloadCenter');
    }

    // Data Management (Import / Export)
    if (url.startsWith('/importexport') || url.startsWith('/datamanagement')) {
      return this.canAccess('dataManagement');
    }

    // Reports Suite
    if (url.startsWith('/reports')) {
      return this.canAccess('reports');
    }

    // Exam Reports Suite
    if (url.startsWith('/examreports')) {
      return this.canAccess('examReports');
    }

    // Examinations
    if (url.startsWith('/examinations') || url.startsWith('/examsettings')) {
      return this.canAccess('exams');
    }

    // Online Exam
    if (url.startsWith('/onlineexam') && !url.includes('cbse')) {
      return this.canAccess('onlineExam') || this.canAccess('advancedAcademicMenu');
    }

    // CBSE & LMS Advanced Academics
    if (url.startsWith('/cbseexam') || url.startsWith('/cbse') || url.startsWith('/lms')) {
      return this.canAccess('advancedAcademicMenu');
    }

    // Virtual Class (Zoom, GMeet, Jitsi, BBB)
    if (url.startsWith('/zoom') || url.startsWith('/gmeet') || url.startsWith('/jitsi') ||
        url.startsWith('/bigbluebutton') || url.startsWith('/virtual') || url.startsWith('/inapplive')) {
      return this.canAccess('virtualClass');
    }

    // Smart Biometric & QR Attendance
    if (url.startsWith('/biometrics') || url.startsWith('/qrattendance') || url.startsWith('/smartattendance')) {
      return this.canAccess('smartAttendanceMenu');
    }

    // Students & Admission
    if (url.startsWith('/students') || url.startsWith('/studentcategory')) {
      return this.canAccess('students');
    }

    // Attendance
    if (url.startsWith('/attendance')) {
      return this.canAccess('attendance') || this.canAccess('students');
    }

    // Behaviour Records
    if (url.startsWith('/behaviourrecords') || url.startsWith('/behaviour')) {
      return this.canAccess('behaviour');
    }

    // Academics (Classes, Sections, Subjects, Routines)
    if (url.startsWith('/classes') || url.startsWith('/section') || url.startsWith('/subjects') ||
        url.startsWith('/assignclassteacher') || url.startsWith('/assignsubject') ||
        url.startsWith('/classroom') || url.startsWith('/classroutine') ||
        url.startsWith('/optionalsubject') || url.startsWith('/academics')) {
      return this.canAccess('academic');
    }

    // Lesson Plan
    if (url.startsWith('/lessonplan')) {
      return this.canAccess('lessonPlan');
    }

    // Homework
    if (url.startsWith('/homework')) {
      return this.canAccess('homework');
    }

    // Teacher Evaluation
    if (url.startsWith('/teacherevaluation')) {
      return this.canAccess('teacherEvaluation');
    }

    // Communication (Notice board, SMS/Email)
    if (url.startsWith('/communicate')) {
      return this.canAccess('communicate');
    }

    // Registration & WhatsApp Addons
    if (url.startsWith('/registrationaddon') || url.startsWith('/whatsapp')) {
      return this.canAccess('commSubMenu');
    }

    // Administration & Front Desk
    if (url.startsWith('/administration') || url.startsWith('/adminsection')) {
      return this.canAccess('adminSection');
    }

    // Utilities & Chat
    if (url.startsWith('/utilities') || url.startsWith('/chat')) {
      return this.canAccess('utilities');
    }

    return true;
  }
}
