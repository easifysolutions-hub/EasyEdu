import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface Role {
  id: number;
  name: string;
  userCount: number;
  description: string;
  isSystem: boolean;
}

interface ModulePermission {
  moduleName: string;
  category: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent {
  roles: Role[] = [
    { id: 1, name: 'Super Admin', userCount: 2, description: 'Full unrestricted campus administrative access', isSystem: true },
    { id: 2, name: 'Teacher / Faculty', userCount: 48, description: 'Academic timetable, grading, homework, and attendance', isSystem: false },
    { id: 3, name: 'Accountant', userCount: 4, description: 'Fees invoicing, cashier pos, voucher entries, and ledgers', isSystem: false },
    { id: 4, name: 'Librarian', userCount: 3, description: 'Book catalogs, rack inventory, issue & return circulation', isSystem: false },
    { id: 5, name: 'Receptionist', userCount: 3, description: 'Visitor passes, phone logs, postal dispatches, inquiries', isSystem: false },
    { id: 6, name: 'Student', userCount: 1250, description: 'View timetable, attendance, marksheet, and submit homework', isSystem: true },
    { id: 7, name: 'Parent / Guardian', userCount: 980, description: 'Fee payment gateway, attendance alerts, exam marksheets', isSystem: true }
  ];

  selectedRole: Role = this.roles[1];

  permissions: ModulePermission[] = [
    { moduleName: 'Student Directory & Profiles', category: 'Student Info', view: true, add: true, edit: true, delete: false },
    { moduleName: 'Student Admission Desk', category: 'Student Info', view: true, add: true, edit: true, delete: false },
    { moduleName: 'Student & Staff Attendance', category: 'Academics', view: true, add: true, edit: true, delete: false },
    { moduleName: 'Homework & Assignments', category: 'Academics', view: true, add: true, edit: true, delete: true },
    { moduleName: 'Lesson Plans & Syllabus', category: 'Academics', view: true, add: true, edit: true, delete: false },
    { moduleName: 'Examinations & Marks Register', category: 'Examinations', view: true, add: true, edit: true, delete: false },
    { moduleName: 'Online Exam & CBT Question Bank', category: 'Examinations', view: true, add: true, edit: true, delete: false },
    { moduleName: 'Fees & Invoicing Management', category: 'Finance', view: false, add: false, edit: false, delete: false },
    { moduleName: 'Voucher Entries & Ledgers', category: 'Finance', view: false, add: false, edit: false, delete: false },
    { moduleName: 'Library Circulation & Books', category: 'Logistics', view: true, add: false, edit: false, delete: false },
    { moduleName: 'Transport & GPS Fleet', category: 'Logistics', view: true, add: false, edit: false, delete: false },
    { moduleName: 'Hostel & Bed Allocations', category: 'Logistics', view: false, add: false, edit: false, delete: false },
    { moduleName: 'Inventory & Store Requests', category: 'Logistics', view: true, add: true, edit: false, delete: false },
    { moduleName: 'Global Settings & System Config', category: 'Settings', view: false, add: false, edit: false, delete: false }
  ];

  selectRole(r: Role): void {
    this.selectedRole = r;
    if (r.name === 'Super Admin') {
      this.permissions.forEach(p => { p.view = true; p.add = true; p.edit = true; p.delete = true; });
    } else if (r.name === 'Accountant') {
      this.permissions.forEach(p => {
        const isFin = p.category === 'Finance';
        p.view = isFin; p.add = isFin; p.edit = isFin; p.delete = false;
      });
    }
  }

  savePermissions(): void {
    Swal.fire({
      title: 'Permissions Saved!',
      text: `Security permissions matrix updated for role "${this.selectedRole.name}".`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }
}
