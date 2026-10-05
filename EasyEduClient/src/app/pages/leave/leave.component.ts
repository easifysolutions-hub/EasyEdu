import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface LeaveRequest {
  id: number;
  applicantName: string;
  applicantRole: string;
  department: string;
  leaveType: string;
  applyDate: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
}

export interface LeaveTypeItem {
  id: number;
  typeName: string;
  daysAllowed: number;
  description: string;
}

export interface LeaveDefineItem {
  id: number;
  role: string;
  leaveType: string;
  days: number;
}

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'pending' | 'apply' | 'approved' | 'define' | 'types' = 'pending';

  requests: LeaveRequest[] = [
    { id: 1, applicantName: 'Dr. Ramesh Sharma', applicantRole: 'Senior Teacher', department: 'Science & Physics', leaveType: 'Casual Leave (CL)', applyDate: '2025-05-02', fromDate: '2025-05-10', toDate: '2025-05-12', totalDays: 3, reason: 'Family wedding event in native town.', status: 'Pending' },
    { id: 2, applicantName: 'Sunita Nair', applicantRole: 'Physics Lecturer', department: 'Academic Faculty', leaveType: 'Medical Leave (ML)', applyDate: '2025-05-01', fromDate: '2025-05-03', toDate: '2025-05-04', totalDays: 2, reason: 'Viral fever and medical rest advice.', status: 'Approved', approvedBy: 'Principal' },
    { id: 3, applicantName: 'Irfan Pasha', applicantRole: 'Bus Driver', department: 'Transport Logistics', leaveType: 'Casual Leave (CL)', applyDate: '2025-04-28', fromDate: '2025-05-06', toDate: '2025-05-06', totalDays: 1, reason: 'Vehicle maintenance and personal errand.', status: 'Approved', approvedBy: 'Transport Manager' },
    { id: 4, applicantName: 'Pooja Hegde', applicantRole: 'English Faculty', department: 'Languages', leaveType: 'Duty Leave (OD)', applyDate: '2025-05-04', fromDate: '2025-05-14', toDate: '2025-05-15', totalDays: 2, reason: 'Accompanying debate team to Inter-School Model UN.', status: 'Pending' }
  ];

  leaveTypes: LeaveTypeItem[] = [
    { id: 1, typeName: 'Casual Leave (CL)', daysAllowed: 12, description: 'General personal exigencies and urgent errands' },
    { id: 2, typeName: 'Medical Leave (ML)', daysAllowed: 10, description: 'Health ailments requiring medical rest' },
    { id: 3, typeName: 'Earned / Privilege Leave (EL)', daysAllowed: 15, description: 'Annual accumulated vacation entitlement' },
    { id: 4, typeName: 'Duty Leave (OD)', daysAllowed: 6, description: 'Official off-campus representation / seminars' },
    { id: 5, typeName: 'Maternity / Paternity Leave', daysAllowed: 90, description: 'Parental leave entitlement as per labor law' }
  ];
  newType = { typeName: '', daysAllowed: 10, description: '' };

  leaveDefines: LeaveDefineItem[] = [
    { id: 1, role: 'Senior Teacher', leaveType: 'Casual Leave (CL)', days: 12 },
    { id: 2, role: 'Senior Teacher', leaveType: 'Medical Leave (ML)', days: 10 },
    { id: 3, role: 'Accountant', leaveType: 'Casual Leave (CL)', days: 12 },
    { id: 4, role: 'Driver', leaveType: 'Casual Leave (CL)', days: 10 },
    { id: 5, role: 'Librarian', leaveType: 'Earned / Privilege Leave (EL)', days: 15 }
  ];
  newDefine = { role: 'Senior Teacher', leaveType: 'Casual Leave (CL)', days: 12 };

  // Apply Form
  applyForm = {
    applicantName: 'Dr. Ramesh Sharma',
    applicantRole: 'Senior Teacher',
    department: 'Academics',
    leaveType: 'Casual Leave (CL)',
    fromDate: new Date().toISOString().substring(0, 10),
    toDate: new Date(Date.now() + 2 * 86400000).toISOString().substring(0, 10),
    totalDays: 2,
    reason: ''
  };

  ngOnInit(): void {
    this.syncActiveTabFromUrl();

    this.route.url.subscribe(() => {
      this.syncActiveTabFromUrl();
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  private syncActiveTabFromUrl(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('pendingleaverequest')) {
      this.activeTab = 'pending';
    } else if (path.includes('approveleaverequest')) {
      this.activeTab = 'approved';
    } else if (path.includes('leavedefine')) {
      this.activeTab = 'define';
    } else if (path.includes('leavetype')) {
      this.activeTab = 'types';
    } else if (path.includes('leave') || path.includes('apply')) {
      this.activeTab = 'apply';
    }
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  get pendingCount(): number {
    return this.requests.filter(r => r.status === 'Pending').length;
  }

  get approvedCount(): number {
    return this.requests.filter(r => r.status === 'Approved').length;
  }

  get approvedRequests(): LeaveRequest[] {
    return this.requests.filter(r => r.status === 'Approved');
  }

  get pendingRequests(): LeaveRequest[] {
    return this.requests.filter(r => r.status === 'Pending');
  }

  approveLeave(req: LeaveRequest): void {
    req.status = 'Approved';
    req.approvedBy = 'Logged-in Admin';
    Swal.fire('Leave Approved', `Leave request for ${req.applicantName} marked Approved.`, 'success');
  }

  rejectLeave(req: LeaveRequest): void {
    req.status = 'Rejected';
    req.approvedBy = 'Logged-in Admin';
    Swal.fire('Leave Rejected', `Leave request for ${req.applicantName} marked Rejected.`, 'info');
  }

  submitLeaveApplication(): void {
    if (!this.applyForm.reason) {
      Swal.fire('Missing Reason', 'Please describe reason for leave application.', 'warning');
      return;
    }

    const req: LeaveRequest = {
      id: this.requests.length + 1,
      applicantName: this.applyForm.applicantName,
      applicantRole: this.applyForm.applicantRole,
      department: this.applyForm.department,
      leaveType: this.applyForm.leaveType,
      applyDate: new Date().toISOString().substring(0, 10),
      fromDate: this.applyForm.fromDate,
      toDate: this.applyForm.toDate,
      totalDays: Number(this.applyForm.totalDays) || 2,
      reason: this.applyForm.reason,
      status: 'Pending'
    };

    this.requests.unshift(req);
    this.activeTab = 'pending';
    this.applyForm.reason = '';

    Swal.fire('Leave Application Submitted', 'Your request has been forwarded to the Principal / HR Dept.', 'success');
  }

  addLeaveType(): void {
    if (!this.newType.typeName) return;
    this.leaveTypes.push({
      id: this.leaveTypes.length + 1,
      typeName: this.newType.typeName,
      daysAllowed: this.newType.daysAllowed,
      description: this.newType.description
    });
    this.newType = { typeName: '', daysAllowed: 10, description: '' };
    Swal.fire('Saved', 'Leave Category Registered.', 'success');
  }

  addLeaveDefine(): void {
    this.leaveDefines.push({
      id: this.leaveDefines.length + 1,
      role: this.newDefine.role,
      leaveType: this.newDefine.leaveType,
      days: Number(this.newDefine.days)
    });
    Swal.fire('Saved', 'Role leave quota defined.', 'success');
  }
}

