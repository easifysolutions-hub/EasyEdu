import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Student } from '../../../core/models';

declare const Swal: any;

export interface StudentCategory {
  id: number;
  categoryName: string;
  code: string;
  studentCount: number;
}

export interface StudentGroup {
  id: number;
  groupName: string;
  description: string;
  memberCount: number;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'list' | 'category' | 'multiclass' | 'unassigned' | 'group' | 'promote' | 'disabled' | 'export' | 'sms-time' | 'settings' = 'list';

  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm = '';
  selectedClass = 'all';
  selectedSection = 'all';

  // Category State
  categories: StudentCategory[] = [
    { id: 1, categoryName: 'General', code: 'GEN', studentCount: 142 },
    { id: 2, categoryName: 'OBC / Merit Scholar', code: 'OBC-M', studentCount: 85 },
    { id: 3, categoryName: 'Special Needs / Differently Abled', code: 'SP-NEED', studentCount: 14 },
    { id: 4, categoryName: 'Sports Quota / Athletes', code: 'SPT', studentCount: 29 },
    { id: 5, categoryName: 'Staff Dependent / Institutional', code: 'STF-DEP', studentCount: 18 }
  ];
  newCategory = { categoryName: '', code: '' };

  // Student Group State
  groups: StudentGroup[] = [
    { id: 1, groupName: 'Red House (Ruby Phoenix)', description: 'Inter-house athletic and cultural contingent', memberCount: 75 },
    { id: 2, groupName: 'Blue House (Sapphire Titans)', description: 'Inter-house debating and science Olympiad', memberCount: 72 },
    { id: 3, groupName: 'Green House (Emerald Rangers)', description: 'Campus eco-sustainability and robotics club', memberCount: 68 },
    { id: 4, groupName: 'Yellow House (Amber Falcons)', description: 'Fine arts, drama, and public speaking squad', memberCount: 70 }
  ];
  newGroup = { groupName: '', description: '' };

  // Promote State
  promoteState = {
    currentSession: '2024-2025',
    targetSession: '2025-2026',
    currentClass: 'Grade 10',
    currentSection: 'Section A',
    targetClass: 'Grade 11',
    targetSection: 'Section A'
  };

  // SMS Time Settings
  smsSettings = {
    morningArrivalSmsTime: '08:30',
    morningSmsEnabled: true,
    absentAlertTime: '09:15',
    absentAlertEnabled: true,
    eveningDepartureSmsTime: '15:45',
    eveningSmsEnabled: true,
    homeworkAlertTime: '17:00',
    homeworkAlertEnabled: true
  };

  // Student General Settings
  studentSettings = {
    admissionNoPrefix: 'ADM-',
    admissionNoDigits: 5,
    autoGenerateRoll: true,
    rollPrefix: 'R-',
    requireGuardianApproval: true,
    allowOnlineSelfRegistration: false,
    defaultCategoryId: 1
  };

  selectedStudent: Student | null = null;
  showProfileModal = false;

  ngOnInit(): void {
    this.loadStudents();

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
    if (path.includes('studentcategory')) {
      this.activeTab = 'category';
    } else if (path.includes('multiclassstudent')) {
      this.activeTab = 'multiclass';
    } else if (path.includes('unassignedstudent')) {
      this.activeTab = 'unassigned';
    } else if (path.includes('studentgroup')) {
      this.activeTab = 'group';
    } else if (path.includes('studentpromote')) {
      this.activeTab = 'promote';
    } else if (path.includes('disabledstudents')) {
      this.activeTab = 'disabled';
    } else if (path.includes('studentexport')) {
      this.activeTab = 'export';
    } else if (path.includes('smssendingtime')) {
      this.activeTab = 'sms-time';
    } else if (path.includes('studentsettings')) {
      this.activeTab = 'settings';
    } else if (path.endsWith('/students') || path.endsWith('/students/')) {
      this.activeTab = 'list';
    }
  }

  loadStudents(): void {
    this.api.getStudents().subscribe(res => {
      this.students = res;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredStudents = this.students.filter(s => {
      const matchSearch = !this.searchTerm || 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (s.rollNo && s.rollNo.includes(this.searchTerm));

      const matchClass = this.selectedClass === 'all' || s.className?.toLowerCase().includes(this.selectedClass.toLowerCase());

      return matchSearch && matchClass;
    });
  }

  get disabledStudents(): Student[] {
    return this.students.filter(s => !s.isActive);
  }

  get unassignedStudents(): Student[] {
    return this.students.filter(s => !s.className || s.className === 'Unassigned' || !s.rollNo);
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  viewProfile(student: Student): void {
    this.selectedStudent = student;
    this.showProfileModal = true;
  }

  toggleStatus(student: Student): void {
    student.isActive = !student.isActive;
    Swal.fire({
      icon: 'info',
      title: 'Status Updated',
      text: `${student.firstName}'s status changed to ${student.isActive ? 'Active' : 'Inactive'}.`,
      timer: 1500,
      showConfirmButton: false
    });
  }

  addCategory(): void {
    if (!this.newCategory.categoryName || !this.newCategory.code) {
      Swal.fire('Required Fields', 'Please enter Category Name and Code.', 'warning');
      return;
    }
    this.categories.push({
      id: this.categories.length + 1,
      categoryName: this.newCategory.categoryName,
      code: this.newCategory.code.toUpperCase(),
      studentCount: 0
    });
    this.newCategory = { categoryName: '', code: '' };
    Swal.fire('Saved', 'New student category registered successfully.', 'success');
  }

  addGroup(): void {
    if (!this.newGroup.groupName) {
      Swal.fire('Required', 'Please enter Group Name.', 'warning');
      return;
    }
    this.groups.push({
      id: this.groups.length + 1,
      groupName: this.newGroup.groupName,
      description: this.newGroup.description,
      memberCount: 0
    });
    this.newGroup = { groupName: '', description: '' };
    Swal.fire('Created', 'Student group created successfully.', 'success');
  }

  executePromotion(): void {
    Swal.fire({
      title: 'Confirm Student Promotion?',
      text: `Promote students from ${this.promoteState.currentClass} (${this.promoteState.currentSession}) to ${this.promoteState.targetClass} (${this.promoteState.targetSession})?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Promote All Passed Students',
      confirmButtonColor: '#002B49'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire('Promoted!', 'Selected students promoted to next academic tier.', 'success');
      }
    });
  }

  saveSmsTime(): void {
    Swal.fire('Settings Saved', 'SMS Dispatch schedule updated.', 'success');
  }

  saveStudentSettings(): void {
    Swal.fire('Settings Saved', 'Student management system configuration saved.', 'success');
  }

  exportData(format: 'excel' | 'csv' | 'pdf'): void {
    Swal.fire({
      icon: 'success',
      title: `Exporting to ${format.toUpperCase()}`,
      text: `Student database archive generated in ${format.toUpperCase()} format. Download will start automatically.`,
      timer: 2000,
      showConfirmButton: false
    });
  }

  deleteStudent(student: Student): void {
    Swal.fire({
      title: 'Delete Student Record?',
      text: `Are you sure you want to remove ${student.firstName} ${student.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.students = this.students.filter(s => s.id !== student.id);
        this.applyFilter();
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Student profile removed successfully.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}

