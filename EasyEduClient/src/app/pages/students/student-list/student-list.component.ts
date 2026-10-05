import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Student } from '../../../core/models';

declare const Swal: any;

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  private api = inject(ApiService);
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm = '';
  selectedClass = 'all';

  selectedStudent: Student | null = null;
  showProfileModal = false;

  ngOnInit(): void {
    this.loadStudents();
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
