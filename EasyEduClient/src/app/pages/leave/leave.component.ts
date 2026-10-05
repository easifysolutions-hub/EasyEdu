import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface LeaveRequest {
  id: number;
  applicantName: string;
  applicantRole: string;
  department: string;
  leaveType: 'Casual Leave (CL)' | 'Medical Leave (ML)' | 'Maternity / Paternity' | 'Duty Leave (OD)';
  applyDate: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
}

interface LeaveQuota {
  type: string;
  totalAllowed: number;
  used: number;
  balance: number;
}

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  activeTab: 'pending' | 'apply' | 'history' | 'types' = 'pending';

  requests: LeaveRequest[] = [
    { id: 1, applicantName: 'Dr. Ramesh Sharma', applicantRole: 'Senior Teacher', department: 'Science & Physics', leaveType: 'Casual Leave (CL)', applyDate: '2025-05-02', fromDate: '2025-05-10', toDate: '2025-05-12', totalDays: 3, reason: 'Family wedding event in native town.', status: 'Pending' },
    { id: 2, applicantName: 'Sunita Nair', applicantRole: 'Physics Lecturer', department: 'Academic Faculty', leaveType: 'Medical Leave (ML)', applyDate: '2025-05-01', fromDate: '2025-05-03', toDate: '2025-05-04', totalDays: 2, reason: 'Viral fever and medical rest advice.', status: 'Approved', approvedBy: 'Principal' },
    { id: 3, applicantName: 'Irfan Pasha', applicantRole: 'Bus Driver', department: 'Transport Logistics', leaveType: 'Casual Leave (CL)', applyDate: '2025-04-28', fromDate: '2025-05-06', toDate: '2025-05-06', totalDays: 1, reason: 'Vehicle maintenance and personal errand.', status: 'Approved', approvedBy: 'Transport Manager' },
    { id: 4, applicantName: 'Pooja Hegde', applicantRole: 'English Faculty', department: 'Languages', leaveType: 'Duty Leave (OD)', applyDate: '2025-05-04', fromDate: '2025-05-14', toDate: '2025-05-15', totalDays: 2, reason: 'Accompanying debate team to Inter-School Model UN.', status: 'Pending' }
  ];

  quotas: LeaveQuota[] = [
    { type: 'Casual Leave (CL)', totalAllowed: 12, used: 4, balance: 8 },
    { type: 'Medical Leave (ML)', totalAllowed: 10, used: 2, balance: 8 },
    { type: 'Earned / Privilege Leave', totalAllowed: 15, used: 0, balance: 15 },
    { type: 'Duty Leave (On-Duty)', totalAllowed: 6, used: 2, balance: 4 }
  ];

  // Apply Form
  applyForm = {
    applicantName: 'Dr. Ramesh Sharma',
    leaveType: 'Casual Leave (CL)' as const,
    fromDate: new Date().toISOString().substring(0, 10),
    toDate: new Date(Date.now() + 2 * 86400000).toISOString().substring(0, 10),
    totalDays: 2,
    reason: ''
  };

  ngOnInit(): void {}

  get pendingCount(): number {
    return this.requests.filter(r => r.status === 'Pending').length;
  }

  get approvedCount(): number {
    return this.requests.filter(r => r.status === 'Approved').length;
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
      applicantRole: 'Faculty',
      department: 'Academic Faculty',
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
}
