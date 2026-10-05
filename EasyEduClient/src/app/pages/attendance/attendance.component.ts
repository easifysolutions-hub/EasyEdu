import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AttendanceRecord, Student } from '../../core/models';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  private api = inject(ApiService);
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedClass: string = 'Grade 10';
  attendanceRecords: AttendanceRecord[] = [];
  isSaved = false;

  ngOnInit(): void {
    this.api.getStudents().subscribe(students => {
      this.attendanceRecords = students.map(s => ({
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        rollNo: s.rollNo || '-',
        date: this.selectedDate,
        status: 'Present'
      }));
    });
  }

  setStatus(record: AttendanceRecord, status: 'Present' | 'Absent' | 'Late' | 'HalfDay'): void {
    record.status = status;
  }

  markAll(status: 'Present' | 'Absent'): void {
    this.attendanceRecords.forEach(r => r.status = status);
  }

  saveAttendance(): void {
    this.isSaved = true;
    setTimeout(() => this.isSaved = false, 3000);
  }
}
