import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Staff } from '../../../core/models';

declare const Swal: any;

export interface Designation {
  id: number;
  title: string;
  staffCount: number;
}

export interface Department {
  id: number;
  name: string;
  headOfDepartment: string;
  staffCount: number;
}

export interface PayrollRecord {
  id: number;
  staffNo: string;
  staffName: string;
  role: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Generated' | 'Paid';
  paymentDate?: string;
  paymentMode?: string;
}

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'directory' | 'add-staff' | 'designation' | 'department' | 'attendance' | 'payroll' | 'bulk-payroll' | 'settings' = 'directory';

  staffList: Staff[] = [];
  searchTerm = '';
  selectedDepartment = 'all';
  selectedRole = 'all';

  // Designation State
  designations: Designation[] = [
    { id: 1, title: 'Principal / Dean', staffCount: 1 },
    { id: 2, title: 'Vice Principal / Academic Head', staffCount: 2 },
    { id: 3, title: 'Senior Faculty Teacher', staffCount: 14 },
    { id: 4, title: 'Junior Lecturer', staffCount: 18 },
    { id: 5, title: 'Chief Accountant & Bursar', staffCount: 2 },
    { id: 6, title: 'Head Librarian', staffCount: 2 },
    { id: 7, title: 'Transport Logistics Officer', staffCount: 4 },
    { id: 8, title: 'Campus Security Supervisor', staffCount: 6 }
  ];
  newDesignation = '';

  // Department State
  departments: Department[] = [
    { id: 1, name: 'Academics & Curriculum', headOfDepartment: 'Dr. Ramesh Sharma', staffCount: 24 },
    { id: 2, name: 'Science & Laboratories', headOfDepartment: 'Sunita Nair', staffCount: 12 },
    { id: 3, name: 'Humanities & Social Sciences', headOfDepartment: 'Pooja Hegde', staffCount: 10 },
    { id: 4, name: 'Finance & Accounts', headOfDepartment: 'Vikram Joshi', staffCount: 5 },
    { id: 5, name: 'Logistics & Campus Transport', headOfDepartment: 'Irfan Pasha', staffCount: 8 },
    { id: 6, name: 'Information Technology & Systems', headOfDepartment: 'Karan Shah', staffCount: 4 }
  ];
  newDept = { name: '', headOfDepartment: '' };

  // Payroll State
  selectedPayrollMonth = '2025-05';
  payrollRecords: PayrollRecord[] = [
    { id: 1, staffNo: 'STF-101', staffName: 'Dr. Ramesh Sharma', role: 'Teacher', department: 'Academics', basicSalary: 65000, allowances: 12000, deductions: 4500, netSalary: 72500, status: 'Paid', paymentDate: '2025-05-01', paymentMode: 'Direct Bank Transfer' },
    { id: 2, staffNo: 'STF-102', staffName: 'Sunita Nair', role: 'Teacher', department: 'Science', basicSalary: 55000, allowances: 8500, deductions: 3500, netSalary: 60000, status: 'Paid', paymentDate: '2025-05-01', paymentMode: 'Direct Bank Transfer' },
    { id: 3, staffNo: 'STF-103', staffName: 'Pooja Hegde', role: 'Teacher', department: 'Humanities', basicSalary: 48000, allowances: 6000, deductions: 3000, netSalary: 51000, status: 'Generated' },
    { id: 4, staffNo: 'STF-104', staffName: 'Vikram Joshi', role: 'Accountant', department: 'Finance', basicSalary: 52000, allowances: 7000, deductions: 3200, netSalary: 55800, status: 'Generated' },
    { id: 5, staffNo: 'STF-105', staffName: 'Irfan Pasha', role: 'Driver', department: 'Transport', basicSalary: 28000, allowances: 3500, deductions: 1500, netSalary: 30000, status: 'Generated' }
  ];

  // Staff Settings
  staffSettings = {
    staffIdPrefix: 'STF-',
    staffIdDigits: 4,
    autoGenerateStaffNo: true,
    defaultWorkingHours: 40,
    probationMonths: 6,
    requireBiometricId: true
  };

  showAddModal = false;
  newStaff = {
    staffNo: 'STF-' + Math.floor(100 + Math.random() * 900),
    firstName: '',
    lastName: '',
    department: 'Academics',
    designation: 'Senior Teacher',
    email: '',
    phone: '',
    basicSalary: 50000,
    contractType: 'Permanent',
    isActive: true
  };

  ngOnInit(): void {
    this.api.getStaff().subscribe(res => {
      this.staffList = res;
    });

    this.route.url.subscribe(() => {
      const path = this.router.url.toLowerCase();
      if (path.includes('designation')) {
        this.activeTab = 'designation';
      } else if (path.includes('department')) {
        this.activeTab = 'department';
      } else if (path.includes('addstaff')) {
        this.activeTab = 'add-staff';
      } else if (path.includes('staffattendance')) {
        this.activeTab = 'attendance';
      } else if (path.includes('bulkpayrollprint')) {
        this.activeTab = 'bulk-payroll';
      } else if (path.includes('payroll')) {
        this.activeTab = 'payroll';
      } else if (path.includes('staffsettings')) {
        this.activeTab = 'settings';
      } else if (path.includes('staffdirectory') || path.includes('staff')) {
        this.activeTab = 'directory';
      }
    });
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  get filteredStaff(): Staff[] {
    return this.staffList.filter(s => {
      const matchSearch = !this.searchTerm ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.designation.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchDept = this.selectedDepartment === 'all' || s.department.toLowerCase().includes(this.selectedDepartment.toLowerCase());

      return matchSearch && matchDept;
    });
  }

  addStaff(): void {
    if (!this.newStaff.firstName || !this.newStaff.email) {
      Swal.fire('Required Fields', 'Please fill in mandatory staff details.', 'warning');
      return;
    }
    const staffMember: Staff = {
      id: Date.now(),
      ...this.newStaff
    };
    this.staffList.unshift(staffMember);
    this.showAddModal = false;
    this.activeTab = 'directory';
    this.newStaff = {
      staffNo: 'STF-' + Math.floor(100 + Math.random() * 900),
      firstName: '',
      lastName: '',
      department: 'Academics',
      designation: 'Senior Teacher',
      email: '',
      phone: '',
      basicSalary: 50000,
      contractType: 'Permanent',
      isActive: true
    };
    Swal.fire({
      icon: 'success',
      title: 'Staff Onboarded',
      text: `${staffMember.firstName} ${staffMember.lastName} added to faculty records.`,
      timer: 1500,
      showConfirmButton: false
    });
  }

  addDesignation(): void {
    if (!this.newDesignation) return;
    this.designations.push({
      id: this.designations.length + 1,
      title: this.newDesignation,
      staffCount: 0
    });
    this.newDesignation = '';
    Swal.fire('Saved', 'Designation title registered.', 'success');
  }

  addDepartment(): void {
    if (!this.newDept.name) return;
    this.departments.push({
      id: this.departments.length + 1,
      name: this.newDept.name,
      headOfDepartment: this.newDept.headOfDepartment || 'To be nominated',
      staffCount: 0
    });
    this.newDept = { name: '', headOfDepartment: '' };
    Swal.fire('Saved', 'Department registered successfully.', 'success');
  }

  processPayment(pr: PayrollRecord): void {
    pr.status = 'Paid';
    pr.paymentDate = new Date().toISOString().substring(0, 10);
    pr.paymentMode = 'Direct Bank Transfer';
    Swal.fire('Disbursed!', `Net salary of ₹${pr.netSalary.toLocaleString()} paid to ${pr.staffName}.`, 'success');
  }

  generatePayslip(pr: PayrollRecord): void {
    Swal.fire({
      title: `Salary Slip - ${pr.staffName}`,
      html: `
        <div class="text-start p-3 bg-light rounded-3">
          <p class="mb-1"><strong>Staff ID:</strong> ${pr.staffNo}</p>
          <p class="mb-1"><strong>Department:</strong> ${pr.department}</p>
          <p class="mb-1"><strong>Basic Pay:</strong> ₹${pr.basicSalary.toLocaleString()}</p>
          <p class="mb-1 text-success"><strong>Allowances (HRA/DA):</strong> +₹${pr.allowances.toLocaleString()}</p>
          <p class="mb-1 text-danger"><strong>Deductions (EPF/Tax):</strong> -₹${pr.deductions.toLocaleString()}</p>
          <hr/>
          <h5 class="fw-bold text-primary mb-0">Net Salary: ₹${pr.netSalary.toLocaleString()}</h5>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Print Slip',
      confirmButtonColor: '#002B49'
    });
  }

  saveSettings(): void {
    Swal.fire('Settings Saved', 'Staff HR policies updated.', 'success');
  }

  deleteStaff(staff: Staff): void {
    Swal.fire({
      title: 'Remove Staff Member?',
      text: `Are you sure you want to remove ${staff.firstName} ${staff.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancel'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.staffList = this.staffList.filter(s => s.id !== staff.id);
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Staff record updated successfully.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}

