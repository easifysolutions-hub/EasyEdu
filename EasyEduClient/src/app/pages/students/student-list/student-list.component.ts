import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Student } from '../../../core/models';

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
}
