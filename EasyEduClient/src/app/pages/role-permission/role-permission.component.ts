import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService, SystemRoleDefinition, ALL_MODULE_KEYS, ModuleKey } from '../../core/services/permission.service';

declare const Swal: any;

export interface ModulePermissionRow {
  moduleKey: ModuleKey;
  moduleName: string;
  category: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export const MODULE_METADATA: { [key in ModuleKey]: { name: string; category: string } } = {
  dashboard: { name: 'Main Campus Dashboard', category: 'Core' },
  adminSection: { name: 'Admin Section & Front Desk', category: 'Administration' },
  utilities: { name: 'Utilities & Campus Chat', category: 'Administration' },
  communicate: { name: 'Notice Board & SMS/Email', category: 'Communication' },
  academic: { name: 'Academics & Classroom Routine', category: 'Academics' },
  lessonPlan: { name: 'Lesson Planning & Syllabus', category: 'Academics' },
  homework: { name: 'Homework & Assignments', category: 'Academics' },
  exams: { name: 'Examinations & Marks Register', category: 'Examinations' },
  onlineExam: { name: 'Online CBT Exam & Question Bank', category: 'Examinations' },
  teacherEvaluation: { name: 'Teacher & Faculty Evaluation', category: 'Examinations' },
  students: { name: 'Student Information & Admission', category: 'Students' },
  attendance: { name: 'Student & Staff Attendance', category: 'Students' },
  behaviour: { name: 'Behaviour & Incident Records', category: 'Students' },
  hr: { name: 'Human Resource & Staff Payroll', category: 'Staff' },
  fees: { name: 'Fees Invoicing & POS Collection', category: 'Finance' },
  accounts: { name: 'Accounting, Ledgers & Vouchers', category: 'Finance' },
  inventory: { name: 'Inventory & Store Requests', category: 'Logistics' },
  transport: { name: 'Transport Fleet & Bus Routes', category: 'Logistics' },
  dormitory: { name: 'Hostel & Bed Allocation', category: 'Logistics' },
  certificates: { name: 'Certificates & ID Cards', category: 'Logistics' },
  virtualClass: { name: 'Live Classes (Zoom/GMeet/Jitsi)', category: 'Live Learning' },
  smartAttendanceMenu: { name: 'Smart Biometric & QR Attendance', category: 'Smart Systems' },
  advancedAcademicMenu: { name: 'CBSE Exam Suite & LMS Courses', category: 'Advanced Academics' },
  commSubMenu: { name: 'Registration & WhatsApp Addons', category: 'Addons' },
  downloadCenter: { name: 'Download Center & Media Uploads', category: 'Media' },
  dataManagement: { name: 'Import / Export System Data', category: 'Data' },
  frontendCms: { name: 'Frontend CMS & Public Website', category: 'CMS' },
  styleArchitect: { name: 'Design System & Style Architect', category: 'Design' },
  reports: { name: 'Institutional Management Reports', category: 'Reports' },
  examReports: { name: 'Examination & Assessment Reports', category: 'Reports' },
  systemSettings: { name: 'Global Settings & Security Matrix', category: 'Settings' },
  moduleManager: { name: 'System Module Manager', category: 'Settings' }
};

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  permissionService = inject(PermissionService);

  roles: SystemRoleDefinition[] = [];
  selectedRole: SystemRoleDefinition | null = null;
  permissionRows: ModulePermissionRow[] = [];

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roles = this.permissionService.roles();
    if (this.roles.length > 0) {
      // Default to Teacher/Faculty or first role
      const defaultRole = this.roles.find(r => r.name === 'Teacher / Faculty') || this.roles[0];
      this.selectRole(defaultRole);
    }
  }

  selectRole(role: SystemRoleDefinition): void {
    this.selectedRole = role;
    this.permissionRows = ALL_MODULE_KEYS.map(key => {
      const meta = MODULE_METADATA[key] || { name: key, category: 'General' };
      const current = role.permissions[key] || { view: false, add: false, edit: false, delete: false };
      return {
        moduleKey: key,
        moduleName: meta.name,
        category: meta.category,
        view: !!current.view,
        add: !!current.add,
        edit: !!current.edit,
        delete: !!current.delete
      };
    });
  }

  toggleAll(action: 'view' | 'add' | 'edit' | 'delete', event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.permissionRows.forEach(row => {
      row[action] = isChecked;
    });
  }

  savePermissions(): void {
    if (!this.selectedRole) return;

    const updatedPermissionsMap: any = {};
    this.permissionRows.forEach(row => {
      updatedPermissionsMap[row.moduleKey] = {
        view: row.view,
        add: row.add,
        edit: row.edit,
        delete: row.delete
      };
    });

    this.permissionService.saveRolePermissions(this.selectedRole.name, updatedPermissionsMap);
    this.loadRoles();

    Swal.fire({
      title: 'Permissions Synchronized!',
      text: `Security access rules updated for role "${this.selectedRole.name}". Changes take effect immediately.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  activateRoleForTesting(roleName: string): void {
    this.permissionService.setRole(roleName);
    Swal.fire({
      title: `Switched Role to ${roleName}`,
      text: `Your current view is now demonstrating the exact permissions permitted for ${roleName}.`,
      icon: 'info',
      confirmButtonColor: '#002B49'
    });
  }
}
