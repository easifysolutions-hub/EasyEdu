import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService, SystemRoleDefinition, ALL_MODULE_KEYS, ModuleKey, ModulePermissionsMap } from '../../core/services/permission.service';
import { ExportReportService } from '../../core/services/export-report.service';

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
  library: { name: 'Library Catalog & Circulation Desk', category: 'Logistics' },
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
  exportReportService = inject(ExportReportService);

  roles: SystemRoleDefinition[] = [];
  selectedRole: SystemRoleDefinition | null = null;
  permissionRows: ModulePermissionRow[] = [];

  // Search & Filter
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Core', 'Administration', 'Academics', 'Examinations', 'Students', 'Staff', 'Finance', 'Logistics', 'Reports', 'Settings', 'Live Learning', 'Smart Systems', 'Advanced Academics', 'Addons', 'Media', 'Data', 'CMS', 'Design'];

  // Modal States
  showCreateRoleModal = false;
  showEditRoleModal = false;

  newRole = {
    name: '',
    description: '',
    cloneFromRole: 'Teacher / Faculty'
  };

  editRoleData = {
    id: 0,
    name: '',
    description: ''
  };

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roles = this.permissionService.roles();
    if (this.roles.length > 0) {
      if (this.selectedRole) {
        const found = this.roles.find(r => r.id === this.selectedRole?.id || r.name.toLowerCase() === this.selectedRole?.name.toLowerCase());
        this.selectRole(found || this.roles[0]);
      } else {
        const defaultRole = this.roles.find(r => r.name === 'Teacher / Faculty') || this.roles[0];
        this.selectRole(defaultRole);
      }
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

  get filteredRows(): ModulePermissionRow[] {
    return this.permissionRows.filter(row => {
      const matchesSearch = !this.searchQuery || 
        row.moduleName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        row.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        row.moduleKey.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCat = this.selectedCategory === 'All' || row.category === this.selectedCategory;
      return matchesSearch && matchesCat;
    });
  }

  onViewChange(row: ModulePermissionRow): void {
    if (!row.view) {
      row.add = false;
      row.edit = false;
      row.delete = false;
    }
  }

  toggleAllAction(action: 'view' | 'add' | 'edit' | 'delete', event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.filteredRows.forEach(row => {
      row[action] = isChecked;
      if (action === 'view' && !isChecked) {
        row.add = false;
        row.edit = false;
        row.delete = false;
      }
    });
  }

  grantFullAccess(): void {
    this.filteredRows.forEach(row => {
      row.view = true;
      row.add = true;
      row.edit = true;
      row.delete = true;
    });
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
      icon: 'info',
      title: 'Granted Full Access to filtered modules'
    });
  }

  grantReadOnly(): void {
    this.filteredRows.forEach(row => {
      row.view = true;
      row.add = false;
      row.edit = false;
      row.delete = false;
    });
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
      icon: 'info',
      title: 'Set Read-Only access for filtered modules'
    });
  }

  revokeAllAccess(): void {
    this.filteredRows.forEach(row => {
      row.view = false;
      row.add = false;
      row.edit = false;
      row.delete = false;
    });
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
      icon: 'warning',
      title: 'Revoked all access (Completely Hidden)'
    });
  }

  savePermissions(): void {
    if (!this.selectedRole) return;

    const updatedPermissionsMap: ModulePermissionsMap = {};
    this.permissionRows.forEach(row => {
      updatedPermissionsMap[row.moduleKey] = {
        view: row.view,
        add: row.view ? row.add : false,
        edit: row.view ? row.edit : false,
        delete: row.view ? row.delete : false
      };
    });

    this.permissionService.saveRolePermissions(this.selectedRole.name, updatedPermissionsMap);
    this.loadRoles();

    Swal.fire({
      title: 'Permissions Synchronized!',
      text: `Security access rules updated for role "${this.selectedRole.name}". Changes apply immediately across all users with this role.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  // --- Role Creation & Management ---

  openCreateRoleModal(): void {
    this.newRole = {
      name: '',
      description: '',
      cloneFromRole: this.roles.length > 0 ? this.roles[0].name : ''
    };
    this.showCreateRoleModal = true;
  }

  createRoleSubmit(): void {
    if (!this.newRole.name || !this.newRole.name.trim()) {
      Swal.fire('Role Name Required', 'Please enter a valid unique role name.', 'warning');
      return;
    }

    try {
      const created = this.permissionService.createRole(
        this.newRole.name,
        this.newRole.description,
        this.newRole.cloneFromRole
      );
      this.showCreateRoleModal = false;
      this.loadRoles();
      this.selectRole(created);

      Swal.fire({
        title: 'Role Created Successfully',
        text: `Role "${created.name}" is now ready for permissions configuration.`,
        icon: 'success',
        confirmButtonColor: '#002B49'
      });
    } catch (e: any) {
      Swal.fire('Cannot Create Role', e.message || 'Error occurred while creating role.', 'error');
    }
  }

  openEditRoleModal(role: SystemRoleDefinition): void {
    this.editRoleData = {
      id: role.id,
      name: role.name,
      description: role.description
    };
    this.showEditRoleModal = true;
  }

  editRoleSubmit(): void {
    if (!this.editRoleData.name || !this.editRoleData.name.trim()) {
      Swal.fire('Role Name Required', 'Please provide a valid name.', 'warning');
      return;
    }

    this.permissionService.updateRole(
      this.editRoleData.id,
      this.editRoleData.name,
      this.editRoleData.description
    );

    this.showEditRoleModal = false;
    this.loadRoles();

    Swal.fire({
      title: 'Role Updated',
      text: 'Role details successfully updated.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  deleteRolePrompt(role: SystemRoleDefinition, event?: Event): void {
    if (event) event.stopPropagation();

    if (role.isSystem || role.name === 'Super Admin' || role.name === 'Admin') {
      Swal.fire('Protected System Role', `The system role "${role.name}" is core to the application and cannot be deleted.`, 'info');
      return;
    }

    Swal.fire({
      title: `Delete Role "${role.name}"?`,
      text: 'Are you sure you want to permanently delete this role? Users assigned to this role will revert to Super Admin access.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete Role'
    }).then((res: any) => {
      if (res.isConfirmed) {
        try {
          this.permissionService.deleteRole(role.id);
          this.loadRoles();
          Swal.fire('Role Deleted', `Role "${role.name}" has been removed.`, 'success');
        } catch (e: any) {
          Swal.fire('Error', e.message || 'Could not delete role.', 'error');
        }
      }
    });
  }

  activateRoleForTesting(roleName: string): void {
    this.permissionService.setRole(roleName);
    Swal.fire({
      title: `Active View: ${roleName}`,
      html: `
        <div class="p-2 text-start">
          <p class="mb-2">Your current portal session is now demonstrating the <strong>exact allowed and blocked permissions</strong> for <strong>${roleName}</strong>.</p>
          <ul class="small text-muted mb-0">
            <li>Blocked menus are completely hidden from the sidebar.</li>
            <li>Direct URL access to blocked routes is safely denied.</li>
            <li>Restricted action buttons are hidden.</li>
          </ul>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#002B49'
    });
  }

  resetAllRolesToDefaults(): void {
    Swal.fire({
      title: 'Restore Default Roles & Permissions?',
      text: 'This will reset all security roles and module permissions to the factory institutional standard.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Reset to Defaults'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.permissionService.resetToDefaults();
        this.loadRoles();
        Swal.fire('Permissions Restored', 'Standard institutional security matrix restored.', 'success');
      }
    });
  }

  exportMatrix(format: 'csv' | 'excel' | 'pdf' | 'print'): void {
    const roleName = this.selectedRole ? this.selectedRole.name : 'All Roles';
    const headers = ['Module / Section', 'Category', 'View (Access)', 'Add', 'Edit', 'Delete'];
    const rows = this.permissionRows.map(r => [
      r.moduleName,
      r.category,
      r.view ? 'ALLOWED (Visible)' : 'BLOCKED (Hidden)',
      r.add ? 'YES' : 'NO',
      r.edit ? 'YES' : 'NO',
      r.delete ? 'YES' : 'NO'
    ]);

    const title = `Role Permission Matrix - ${roleName}`;

    if (format === 'csv') this.exportReportService.exportToCsv(title, headers, rows);
    else if (format === 'excel') this.exportReportService.exportToExcel(title, headers, rows);
    else this.exportReportService.printOrPdf(title, headers, rows, {
      category: 'Security & Access Control Matrix',
      filters: `Role: ${roleName} • Status: Active Governance`
    });
  }
}
