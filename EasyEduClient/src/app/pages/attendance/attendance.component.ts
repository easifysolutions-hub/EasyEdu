import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AttendanceRecord } from '../../core/models';

declare const Swal: any;

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  viewMode: 'daily' | 'subject' | 'report' = 'daily';
  attendanceType: 'student' | 'staff' = 'student';
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedClass: string = 'Grade 10';
  selectedSection: string = 'Section A';
  selectedSubject: string = 'Physics';

  attendanceRecords: AttendanceRecord[] = [];
  staffAttendanceRecords: AttendanceRecord[] = [];

  subjects = ['Physics', 'Mathematics', 'Chemistry', 'English Literature', 'Biology', 'Computer Science'];

  ngOnInit(): void {
    this.loadStudentAttendance();
    this.loadStaffAttendance();

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        if (params['tab'] === 'subject') this.viewMode = 'subject';
        else if (params['tab'] === 'report') this.viewMode = 'report';
        else this.viewMode = 'daily';
      }
    });

    this.route.url.subscribe(() => {
      const path = this.router.url.toLowerCase();
      if (path.includes('subjectwiseattendance')) {
        this.viewMode = 'subject';
      } else if (path.includes('attendance/report')) {
        this.viewMode = 'report';
      }
    });
  }

  loadStudentAttendance(): void {
    this.api.getStudents().subscribe(students => {
      this.attendanceRecords = students.map((s, index) => ({
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        rollNo: s.rollNo || (101 + index).toString(),
        date: this.selectedDate,
        status: index === 3 ? 'Absent' : index === 5 ? 'Late' : 'Present'
      }));
    });
  }

  loadStaffAttendance(): void {
    this.api.getStaff().subscribe(staff => {
      this.staffAttendanceRecords = staff.map((st) => ({
        studentId: st.id,
        studentName: `${st.firstName} ${st.lastName} (${st.designation})`,
        rollNo: st.staffNo,
        date: this.selectedDate,
        status: 'Present'
      }));
    });
  }

  get activeRecords(): AttendanceRecord[] {
    return this.attendanceType === 'student' ? this.attendanceRecords : this.staffAttendanceRecords;
  }

  get totalCount(): number { return this.activeRecords.length; }
  get presentCount(): number { return this.activeRecords.filter(r => r.status === 'Present').length; }
  get absentCount(): number { return this.activeRecords.filter(r => r.status === 'Absent').length; }
  get lateCount(): number { return this.activeRecords.filter(r => r.status === 'Late').length; }
  get attendancePercent(): number {
    if (this.totalCount === 0) return 100;
    return Math.round((this.presentCount / this.totalCount) * 100);
  }

  setStatus(record: AttendanceRecord, status: 'Present' | 'Absent' | 'Late' | 'HalfDay'): void {
    record.status = status;
  }

  markAll(status: 'Present' | 'Absent'): void {
    this.activeRecords.forEach(r => r.status = status);
  }

  saveAttendance(): void {
    Swal.fire({
      icon: 'success',
      title: 'Attendance Recorded!',
      text: `Saved ${this.presentCount} present, ${this.absentCount} absent, and ${this.lateCount} late records for ${this.selectedDate}.`,
      timer: 2000,
      showConfirmButton: false
    });
  }
}

