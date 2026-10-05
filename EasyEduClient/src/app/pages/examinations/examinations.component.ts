import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface Examination {
  id: number;
  title: string;
  type: string;
  session: string;
  class: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Published';
  totalSubjects: number;
}

interface StudentMarkEntry {
  studentId: number;
  studentName: string;
  rollNo: string;
  admissionNo: string;
  marksObtained: number;
  maxMarks: number;
  remarks: string;
}

interface GradeScale {
  id: number;
  grade: string;
  minScore: number;
  maxScore: number;
  gradePoint: number;
  remarks: string;
}

interface ExamScheduleItem {
  id: number;
  subject: string;
  date: string;
  time: string;
  room: string;
  maxMarks: number;
}

@Component({
  selector: 'app-examinations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit {
  activeTab: 'schedules' | 'marks' | 'grades' | 'admit' | 'reportcard' = 'schedules';

  exams: Examination[] = [
    { id: 1, title: 'Term 1 Mid-Semester Examination', type: 'Term Exam', session: '2025-26', class: 'Grade 10-A', startDate: '2025-10-15', endDate: '2025-10-24', status: 'Ongoing', totalSubjects: 6 },
    { id: 2, title: 'Quarterly Assessment Test (Unit 2)', type: 'Unit Test', session: '2025-26', class: 'Grade 9-A', startDate: '2025-08-10', endDate: '2025-08-18', status: 'Completed', totalSubjects: 5 },
    { id: 3, title: 'Annual CBSE Final Board Mock', type: 'Annual Board', session: '2025-26', class: 'Grade 10-A', startDate: '2026-02-15', endDate: '2026-03-02', status: 'Upcoming', totalSubjects: 6 },
    { id: 4, title: 'Formative Assessment - 1', type: 'Class Test', session: '2025-26', class: 'Grade 8-B', startDate: '2025-07-05', endDate: '2025-07-12', status: 'Published', totalSubjects: 4 }
  ];

  selectedExamForMarks = 1;
  selectedSubjectForMarks = 'Mathematics';
  selectedClassForMarks = 'Grade 10-A';

  marksList: StudentMarkEntry[] = [
    { studentId: 1, studentName: 'Aarav Sharma', rollNo: '1001', admissionNo: 'ADM-2024-001', marksObtained: 94, maxMarks: 100, remarks: 'Outstanding conceptual clarity' },
    { studentId: 2, studentName: 'Diya Patel', rollNo: '1002', admissionNo: 'ADM-2024-002', marksObtained: 88, maxMarks: 100, remarks: 'Very good analytical skills' },
    { studentId: 3, studentName: 'Rohan Gupta', rollNo: '1003', admissionNo: 'ADM-2024-003', marksObtained: 76, maxMarks: 100, remarks: 'Needs practice in geometry' },
    { studentId: 4, studentName: 'Ananya Verma', rollNo: '1004', admissionNo: 'ADM-2024-004', marksObtained: 98, maxMarks: 100, remarks: 'Class Topper - Exemplary' },
    { studentId: 5, studentName: 'Kabir Singh', rollNo: '1005', admissionNo: 'ADM-2024-005', marksObtained: 68, maxMarks: 100, remarks: 'Scope for improvement' },
    { studentId: 6, studentName: 'Meera Nair', rollNo: '1006', admissionNo: 'ADM-2024-006', marksObtained: 85, maxMarks: 100, remarks: 'Consistent good performance' }
  ];

  gradeScales: GradeScale[] = [
    { id: 1, grade: 'A+', minScore: 90, maxScore: 100, gradePoint: 10.0, remarks: 'Outstanding / Distinction' },
    { id: 2, grade: 'A', minScore: 80, maxScore: 89.9, gradePoint: 9.0, remarks: 'Excellent' },
    { id: 3, grade: 'B+', minScore: 70, maxScore: 79.9, gradePoint: 8.0, remarks: 'Very Good' },
    { id: 4, grade: 'B', minScore: 60, maxScore: 69.9, gradePoint: 7.0, remarks: 'Good' },
    { id: 5, grade: 'C', minScore: 50, maxScore: 59.9, gradePoint: 6.0, remarks: 'Above Average' },
    { id: 6, grade: 'D', minScore: 35, maxScore: 49.9, gradePoint: 4.0, remarks: 'Pass / Marginal' },
    { id: 7, grade: 'F', minScore: 0, maxScore: 34.9, gradePoint: 0.0, remarks: 'Needs Re-examination (Fail)' }
  ];

  examSchedule: ExamScheduleItem[] = [
    { id: 1, subject: 'Mathematics', date: '2025-10-15', time: '09:00 AM - 12:00 PM', room: 'Hall 101', maxMarks: 100 },
    { id: 2, subject: 'Physics & Chemistry', date: '2025-10-17', time: '09:00 AM - 12:00 PM', room: 'Hall 101', maxMarks: 100 },
    { id: 3, subject: 'English Literature', date: '2025-10-19', time: '09:00 AM - 12:00 PM', room: 'Hall 102', maxMarks: 100 },
    { id: 4, subject: 'Computer Science', date: '2025-10-21', time: '09:00 AM - 12:00 PM', room: 'IT Lab 2', maxMarks: 100 },
    { id: 5, subject: 'Social Studies', date: '2025-10-24', time: '09:00 AM - 12:00 PM', room: 'Hall 101', maxMarks: 100 }
  ];

  // Modals state
  showCreateExamModal = false;
  newExam = {
    title: '',
    type: 'Term Exam',
    session: '2025-26',
    class: 'Grade 10-A',
    startDate: '',
    endDate: ''
  };

  showAdmitCardModal = false;
  selectedStudentForAdmit: any = null;

  showReportCardModal = false;
  selectedStudentForReport: any = null;

  ngOnInit(): void {
    this.selectedStudentForAdmit = this.marksList[0];
    this.selectedStudentForReport = this.marksList[3]; // Ananya Verma (98%)
  }

  getGrade(score: number): { grade: string; point: number; color: string } {
    for (const scale of this.gradeScales) {
      if (score >= scale.minScore && score <= scale.maxScore) {
        let color = '#10B981'; // Green
        if (scale.grade === 'F') color = '#EF4444';
        else if (scale.grade === 'D' || scale.grade === 'C') color = '#F59E0B';
        return { grade: scale.grade, point: scale.gradePoint, color };
      }
    }
    return { grade: 'N/A', point: 0, color: '#6B7280' };
  }

  saveMarks(): void {
    Swal.fire({
      title: 'Publish Marks?',
      text: `Save and publish marks for ${this.selectedSubjectForMarks} (${this.selectedClassForMarks})?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Yes, Save & Publish'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: 'Marks Saved!',
          text: `Marks register for ${this.selectedSubjectForMarks} has been saved and updated successfully.`,
          icon: 'success',
          confirmButtonColor: '#002B49'
        });
      }
    });
  }

  openCreateExamModal(): void {
    this.newExam = {
      title: '',
      type: 'Term Exam',
      session: '2025-26',
      class: 'Grade 10-A',
      startDate: '',
      endDate: ''
    };
    this.showCreateExamModal = true;
  }

  saveExam(): void {
    if (!this.newExam.title || !this.newExam.startDate) {
      Swal.fire('Missing Details', 'Please specify Exam Title and Start Date.', 'warning');
      return;
    }

    this.exams.unshift({
      id: this.exams.length + 1,
      title: this.newExam.title,
      type: this.newExam.type,
      session: this.newExam.session,
      class: this.newExam.class,
      startDate: this.newExam.startDate,
      endDate: this.newExam.endDate || this.newExam.startDate,
      status: 'Upcoming',
      totalSubjects: 5
    });

    this.showCreateExamModal = false;
    Swal.fire('Exam Scheduled', 'New examination has been scheduled.', 'success');
  }

  viewAdmitCard(student: StudentMarkEntry): void {
    this.selectedStudentForAdmit = student;
    this.showAdmitCardModal = true;
  }

  viewReportCard(student: StudentMarkEntry): void {
    this.selectedStudentForReport = student;
    this.showReportCardModal = true;
  }

  printDocument(): void {
    window.print();
  }
}
