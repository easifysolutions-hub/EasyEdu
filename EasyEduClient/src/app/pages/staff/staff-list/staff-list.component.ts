import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Staff } from '../../../core/models';

declare const Swal: any;

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  private api = inject(ApiService);
  staffList: Staff[] = [];
  searchTerm = '';

  showAddModal = false;
  newStaff = {
    staffNo: 'STF-' + Math.floor(100 + Math.random() * 900),
    firstName: '',
    lastName: '',
    department: 'Academics',
    designation: 'Senior Teacher',
    email: '',
    phone: '',
    isActive: true
  };

  ngOnInit(): void {
    this.api.getStaff().subscribe(res => {
      this.staffList = res;
    });
  }

  get filteredStaff(): Staff[] {
    if (!this.searchTerm) return this.staffList;
    return this.staffList.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addStaff(): void {
    if (!this.newStaff.firstName || !this.newStaff.email) return;
    const staffMember: Staff = {
      id: Date.now(),
      ...this.newStaff
    };
    this.staffList.unshift(staffMember);
    this.showAddModal = false;
    this.newStaff = {
      staffNo: 'STF-' + Math.floor(100 + Math.random() * 900),
      firstName: '',
      lastName: '',
      department: 'Academics',
      designation: 'Senior Teacher',
      email: '',
      phone: '',
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
