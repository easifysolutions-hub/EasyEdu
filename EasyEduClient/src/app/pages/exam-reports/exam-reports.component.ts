import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExportReportService } from '../../core/services/export-report.service';

export interface ExamRoutineItem {
  id: number;
  date: string;
  day: string;
  timeSlot: string;
  subject: string;
  class: string;
  roomNo: string;
  invigilator: string;
  maxMarks: number;
}

export interface MeritStudent {
  rank: number;
  admissionNo: string;
  rollNo: string;
  studentName: string;
  class: string;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  gpa: string;
  grade: string;
  badge: 'Gold' | 'Silver' | 'Bronze' | 'Distinction' | 'Pass';
}

export interface OnlineExamReportItem {
  id: string;
  studentName: string;
  examTitle: string;
  subject: string;
  class: string;
  startTime: string;
  submitTime: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  scorePercentage: number;
  status: 'Passed' | 'Failed';
}

export interface SubjectWiseMarksheetItem {
  rollNo: string;
  studentName: string;
  class: string;
  theoryMarks: number;
  practicalMarks: number;
  vivaMarks: number;
  totalObtained: number;
  maxMarks: number;
  grade: string;
  status: 'Pass' | 'Fail';
}

export interface TabulationRow {
  rollNo: string;
  studentName: string;
  physics: number;
  mathematics: number;
  chemistry: number;
  english: number;
  computerScience: number;
  totalMarks: number;
  percentage: number;
  gpa: string;
  result: 'Passed' | 'Compartment' | 'Failed';
}

export interface ProgressCardData {
  studentName: string;
  admissionNo: string;
  rollNo: string;
  class: string;
  academicYear: string;
  term: string;
  dob: string;
  guardianName: string;
  attendancePct: string;
  subjects: { name: string; maxMarks: number; passingMarks: number; marksObtained: number; grade: string }[];
  totalObtained: number;
  maxTotal: number;
  percentage: number;
  cgpa: string;
  overallGrade: string;
  rank: number;
  teacherRemarks: string;
  principalRemarks: string;
}

export interface PreviousResultItem {
  admissionNo: string;
  studentName: string;
  priorSession: string;
  qualifyingExam: string;
  boardRollNo: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  resultStatus: string;
}

@Component({
  selector: 'app-exam-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exam-reports.component.html',
  styleUrls: ['./exam-reports.component.css']
})
export class ExamReportsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private exportService = inject(ExportReportService);

  activeTab: 'routine' | 'merit' | 'online' | 'subject' | 'tabulation' | 'progress' | 'marksheet' | 'progress100' | 'previous' = 'routine';

  // Global Query Parameters
  filterSession = '2025-2026';
  filterExamTerm = 'Autumn Mid-Term Examination 2026';
  filterClass = 'Grade 10-A';
  filterSubject = 'All Subjects';
  filterSearchQuery = '';

  // Toast
  showSuccessToast = false;
  toastMessage = '';

  // 1. Exam Routine
  examRoutines: ExamRoutineItem[] = [
    { id: 1, date: '2026-10-12', day: 'Monday', timeSlot: '09:00 AM - 12:00 PM', subject: 'Advanced Physics (Theory + Lab)', class: 'Grade 10-A', roomNo: 'Hall A (Room 201)', invigilator: 'Dr. Eleanor Vance', maxMarks: 100 },
    { id: 2, date: '2026-10-14', day: 'Wednesday', timeSlot: '09:00 AM - 12:00 PM', subject: 'Pure Mathematics & Calculus', class: 'Grade 10-A', roomNo: 'Hall A (Room 201)', invigilator: 'Prof. Marcus Chen', maxMarks: 100 },
    { id: 3, date: '2026-10-16', day: 'Friday', timeSlot: '09:00 AM - 12:00 PM', subject: 'Organic & Inorganic Chemistry', class: 'Grade 10-A', roomNo: 'Hall B (Room 202)', invigilator: 'Dr. Sarah Al-Mansoor', maxMarks: 100 },
    { id: 4, date: '2026-10-19', day: 'Monday', timeSlot: '09:00 AM - 12:00 PM', subject: 'World Literature & Composition', class: 'Grade 10-A', roomNo: 'Hall A (Room 201)', invigilator: 'Prof. Robert Sterling', maxMarks: 100 },
    { id: 5, date: '2026-10-21', day: 'Wednesday', timeSlot: '09:00 AM - 12:00 PM', subject: 'Computer Science & AI Lab', class: 'Grade 10-A', roomNo: 'Computer Lab 1', invigilator: 'Mr. Arvind Rao', maxMarks: 100 }
  ];

  // 2. Merit List
  meritList: MeritStudent[] = [
    { rank: 1, admissionNo: 'ADM-2026-004', rollNo: '104', studentName: 'Ananya Verma', class: 'Grade 10-A', totalMarks: 492, maxMarks: 500, percentage: 98.4, gpa: '4.00', grade: 'A+ (Outstanding)', badge: 'Gold' },
    { rank: 2, admissionNo: 'ADM-2026-002', rollNo: '102', studentName: 'Diya Patel', class: 'Grade 10-A', totalMarks: 486, maxMarks: 500, percentage: 97.2, gpa: '3.98', grade: 'A+ (Outstanding)', badge: 'Silver' },
    { rank: 3, admissionNo: 'ADM-2026-001', rollNo: '101', studentName: 'Aarav Sharma', class: 'Grade 10-A', totalMarks: 478, maxMarks: 500, percentage: 95.6, gpa: '3.92', grade: 'A+ (Outstanding)', badge: 'Bronze' },
    { rank: 4, admissionNo: 'ADM-2026-005', rollNo: '105', studentName: 'Kabir Mehta', class: 'Grade 10-A', totalMarks: 461, maxMarks: 500, percentage: 92.2, gpa: '3.80', grade: 'A (Distinction)', badge: 'Distinction' },
    { rank: 5, admissionNo: 'ADM-2026-003', rollNo: '103', studentName: 'Rohan Gupta', class: 'Grade 10-A', totalMarks: 428, maxMarks: 500, percentage: 85.6, gpa: '3.50', grade: 'A (First Class)', badge: 'Pass' }
  ];

  // 3. Online Exam Report
  onlineExamReports: OnlineExamReportItem[] = [
    { id: 'CBT-8801', studentName: 'Ananya Verma', examTitle: 'STEM National Olympiad Mock Test', subject: 'Physics & Math', class: 'Grade 10-A', startTime: '10:00:15 AM', submitTime: '10:48:22 AM', totalQuestions: 60, correctAnswers: 59, wrongAnswers: 1, scorePercentage: 98.3, status: 'Passed' },
    { id: 'CBT-8802', studentName: 'Diya Patel', examTitle: 'STEM National Olympiad Mock Test', subject: 'Physics & Math', class: 'Grade 10-A', startTime: '10:00:10 AM', submitTime: '10:52:10 AM', totalQuestions: 60, correctAnswers: 58, wrongAnswers: 2, scorePercentage: 96.6, status: 'Passed' },
    { id: 'CBT-8803', studentName: 'Aarav Sharma', examTitle: 'STEM National Olympiad Mock Test', subject: 'Physics & Math', class: 'Grade 10-A', startTime: '10:00:20 AM', submitTime: '10:55:40 AM', totalQuestions: 60, correctAnswers: 57, wrongAnswers: 3, scorePercentage: 95.0, status: 'Passed' },
    { id: 'CBT-8804', studentName: 'Rohan Gupta', examTitle: 'STEM National Olympiad Mock Test', subject: 'Physics & Math', class: 'Grade 10-A', startTime: '10:01:00 AM', submitTime: '11:00:00 AM', totalQuestions: 60, correctAnswers: 48, wrongAnswers: 12, scorePercentage: 80.0, status: 'Passed' }
  ];

  // 4. Subject Wise Marksheet
  subjectMarksheets: SubjectWiseMarksheetItem[] = [
    { rollNo: '104', studentName: 'Ananya Verma', class: 'Grade 10-A', theoryMarks: 68, practicalMarks: 20, vivaMarks: 10, totalObtained: 98, maxMarks: 100, grade: 'A+', status: 'Pass' },
    { rollNo: '102', studentName: 'Diya Patel', class: 'Grade 10-A', theoryMarks: 66, practicalMarks: 20, vivaMarks: 10, totalObtained: 96, maxMarks: 100, grade: 'A+', status: 'Pass' },
    { rollNo: '101', studentName: 'Aarav Sharma', class: 'Grade 10-A', theoryMarks: 65, practicalMarks: 19, vivaMarks: 10, totalObtained: 94, maxMarks: 100, grade: 'A+', status: 'Pass' },
    { rollNo: '105', studentName: 'Kabir Mehta', class: 'Grade 10-A', theoryMarks: 61, practicalMarks: 18, vivaMarks: 10, totalObtained: 89, maxMarks: 100, grade: 'A', status: 'Pass' },
    { rollNo: '103', studentName: 'Rohan Gupta', class: 'Grade 10-A', theoryMarks: 54, practicalMarks: 18, vivaMarks: 9, totalObtained: 81, maxMarks: 100, grade: 'A', status: 'Pass' }
  ];

  // 5. Tabulation Sheet
  tabulationRows: TabulationRow[] = [
    { rollNo: '101', studentName: 'Aarav Sharma', physics: 94, mathematics: 96, chemistry: 95, english: 95, computerScience: 98, totalMarks: 478, percentage: 95.6, gpa: '3.92', result: 'Passed' },
    { rollNo: '102', studentName: 'Diya Patel', physics: 96, mathematics: 98, chemistry: 97, english: 96, computerScience: 99, totalMarks: 486, percentage: 97.2, gpa: '3.98', result: 'Passed' },
    { rollNo: '103', studentName: 'Rohan Gupta', physics: 81, mathematics: 86, chemistry: 84, english: 88, computerScience: 89, totalMarks: 428, percentage: 85.6, gpa: '3.50', result: 'Passed' },
    { rollNo: '104', studentName: 'Ananya Verma', physics: 98, mathematics: 99, chemistry: 98, english: 98, computerScience: 99, totalMarks: 492, percentage: 98.4, gpa: '4.00', result: 'Passed' },
    { rollNo: '105', studentName: 'Kabir Mehta', physics: 89, mathematics: 94, chemistry: 91, english: 92, computerScience: 95, totalMarks: 461, percentage: 92.2, gpa: '3.80', result: 'Passed' }
  ];

  // 6. Progress Card & 7. Marksheet Sample Data
  sampleProgressCard: ProgressCardData = {
    studentName: 'Aarav Sharma',
    admissionNo: 'ADM-2026-001',
    rollNo: '101',
    class: 'Grade 10 - Section A',
    academicYear: '2025 - 2026',
    term: 'Autumn Mid-Term Summative Assessment',
    dob: '14 May 2010',
    guardianName: 'Mr. Rajesh Sharma',
    attendancePct: '98.2% (118 / 120 Days)',
    subjects: [
      { name: 'Advanced Physics (Theory + Lab)', maxMarks: 100, passingMarks: 33, marksObtained: 94, grade: 'A+' },
      { name: 'Pure Mathematics & Calculus', maxMarks: 100, passingMarks: 33, marksObtained: 96, grade: 'A+' },
      { name: 'Organic & Inorganic Chemistry', maxMarks: 100, passingMarks: 33, marksObtained: 95, grade: 'A+' },
      { name: 'World Literature & Composition', maxMarks: 100, passingMarks: 33, marksObtained: 95, grade: 'A+' },
      { name: 'Computer Science & AI Lab', maxMarks: 100, passingMarks: 33, marksObtained: 98, grade: 'A+' }
    ],
    totalObtained: 478,
    maxTotal: 500,
    percentage: 95.6,
    cgpa: '3.92 / 4.00',
    overallGrade: 'A+ Outstanding',
    rank: 3,
    teacherRemarks: 'Aarav demonstrates extraordinary conceptual clarity in STEM disciplines and consistently leads team robotics initiatives.',
    principalRemarks: 'Promoted with High Honors and Academic Distinction.'
  };

  // 8. Progress Card 100% Normalized Appraisals
  continuousAppraisals = [
    { component: 'Formative Assessment 1 (FA-1)', weight: '15%', score: '14.5 / 15', status: 'Exemplary' },
    { component: 'Formative Assessment 2 (FA-2)', weight: '15%', score: '14.8 / 15', status: 'Exemplary' },
    { component: 'Summative Assessment 1 (SA-1)', weight: '30%', score: '28.8 / 30', status: 'Distinction' },
    { component: 'Summative Assessment 2 (SA-2)', weight: '30%', score: '29.0 / 30', status: 'Distinction' },
    { component: 'Co-Curricular & Ethics Portfolio', weight: '10%', score: '9.8 / 10', status: 'Grade A+' }
  ];

  // 9. Previous Result
  previousResults: PreviousResultItem[] = [
    { admissionNo: 'ADM-2026-001', studentName: 'Aarav Sharma', priorSession: '2024-2025', qualifyingExam: 'Grade 9 Annual Board Evaluation', boardRollNo: 'CBSE-2025-9910', marksObtained: 570, maxMarks: 600, percentage: 95.0, resultStatus: 'Passed with Distinction' },
    { admissionNo: 'ADM-2026-002', studentName: 'Diya Patel', priorSession: '2024-2025', qualifyingExam: 'Grade 9 Annual Board Evaluation', boardRollNo: 'ICSE-2025-4421', marksObtained: 588, maxMarks: 600, percentage: 98.0, resultStatus: 'Passed with Distinction' },
    { admissionNo: 'ADM-2026-003', studentName: 'Rohan Gupta', priorSession: '2024-2025', qualifyingExam: 'Grade 9 Annual Board Evaluation', boardRollNo: 'IB-2025-1029', marksObtained: 520, maxMarks: 600, percentage: 86.6, resultStatus: 'First Division' }
  ];

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/').toLowerCase();
      this.detectTabFromUrl(path);
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.setTab(params['tab']);
      }
    });
  }

  detectTabFromUrl(path: string): void {
    if (path.includes('examroutine') || path.includes('routine')) this.activeTab = 'routine';
    else if (path.includes('meritlist') || path.includes('merit')) this.activeTab = 'merit';
    else if (path.includes('onlineexamreport') || path.includes('online')) this.activeTab = 'online';
    else if (path.includes('subjectwisemarksheet') || path.includes('subject')) this.activeTab = 'subject';
    else if (path.includes('tabulationsheet') || path.includes('tabulation')) this.activeTab = 'tabulation';
    else if (path.includes('progresscard100percent') || path.includes('100percent')) this.activeTab = 'progress100';
    else if (path.includes('progresscard') || path.includes('progress')) this.activeTab = 'progress';
    else if (path.includes('marksheetreport') || path.includes('marksheet')) this.activeTab = 'marksheet';
    else if (path.includes('previousresult') || path.includes('previous')) this.activeTab = 'previous';
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  applyFilters(): void {
    this.showToast(`Applied filters for ${this.filterClass} • ${this.filterExamTerm}`);
  }

  exportReport(format: string): void {
    let title = 'Exam Report';
    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    switch (this.activeTab) {
      case 'routine':
        title = 'Master Examination Timetable';
        headers = ['Date & Day', 'Time Slot', 'Subject', 'Class', 'Room / Hall', 'Invigilator', 'Max Marks'];
        rows = this.examRoutines.map(i => [`${i.date} (${i.day})`, i.timeSlot, i.subject, i.class, i.roomNo, i.invigilator, i.maxMarks]);
        break;
      case 'merit':
        title = 'Academic Merit List & Honor Roll';
        headers = ['Rank', 'Roll #', 'Admission No', 'Student Name', 'Total Marks', 'Max Marks', 'Percentage', 'GPA', 'Grade'];
        rows = this.meritList.map(s => [s.rank, s.rollNo, s.admissionNo, s.studentName, s.totalMarks, s.maxMarks, `${s.percentage}%`, s.gpa, s.grade]);
        break;
      case 'online':
        title = 'Online Computer-Based Test (CBT) Logs';
        headers = ['Test ID', 'Student Name', 'Exam Title', 'Time Slot', 'Total Qs', 'Correct', 'Wrong', 'Score %', 'Status'];
        rows = this.onlineExamReports.map(i => [i.id, i.studentName, i.examTitle, `${i.startTime} - ${i.submitTime}`, i.totalQuestions, i.correctAnswers, i.wrongAnswers, `${i.scorePercentage}%`, i.status]);
        break;
      case 'subject':
        title = 'Subject-Wise Marksheet Ledger';
        headers = ['Roll #', 'Student Name', 'Theory (70)', 'Practical Lab (20)', 'Viva Voce (10)', 'Total (100)', 'Grade', 'Status'];
        rows = this.subjectMarksheets.map(i => [i.rollNo, i.studentName, i.theoryMarks, i.practicalMarks, i.vivaMarks, i.totalObtained, i.grade, i.status]);
        break;
      case 'tabulation':
        title = 'Master Tabulation Matrix';
        headers = ['Roll #', 'Student Name', 'Physics', 'Mathematics', 'Chemistry', 'English', 'CS / AI', 'Total (500)', 'Percentage', 'GPA', 'Result'];
        rows = this.tabulationRows.map(r => [r.rollNo, r.studentName, r.physics, r.mathematics, r.chemistry, r.english, r.computerScience, r.totalMarks, `${r.percentage}%`, r.gpa, r.result]);
        break;
      case 'marksheet':
        title = 'Official Marksheet Transcript';
        headers = ['Roll #', 'Student Name', 'Physics', 'Mathematics', 'Chemistry', 'English', 'CS / AI', 'Total', 'Division'];
        rows = this.tabulationRows.map(s => [s.rollNo, s.studentName, s.physics, s.mathematics, s.chemistry, s.english, s.computerScience, `${s.totalMarks} / 500`, 'First Division']);
        break;
      case 'progress100':
        title = '100-Point Normalized Continuous Evaluation';
        headers = ['Evaluation Component', 'Weightage %', 'Score / Max', 'Performance Status'];
        rows = this.continuousAppraisals.map(a => [a.component, a.weight, a.score, a.status]);
        break;
      case 'previous':
        title = 'Historical Academic Exam Records';
        headers = ['Admission No', 'Student Name', 'Prior Session', 'Qualifying Examination', 'Board Roll #', 'Marks Obtained', 'Percentage', 'Result Status'];
        rows = this.previousResults.map(i => [i.admissionNo, i.studentName, i.priorSession, i.qualifyingExam, i.boardRollNo, `${i.marksObtained} / ${i.maxMarks}`, `${i.percentage}%`, i.resultStatus]);
        break;
      default:
        title = 'Student Progress Card';
        headers = ['Subject', 'Max Marks', 'Passing Marks', 'Marks Obtained', 'Grade'];
        rows = this.sampleProgressCard.subjects.map(s => [s.name, s.maxMarks, s.passingMarks, s.marksObtained, s.grade]);
        break;
    }

    const metadata = {
      category: 'Examination & Assessment Intelligence',
      filters: `${this.filterClass} • ${this.filterExamTerm} • Session ${this.filterSession}`
    };

    if (format.toLowerCase() === 'csv') {
      this.exportService.exportToCsv(`${title}_${this.filterClass}`, headers, rows, metadata);
      this.showToast(`CSV data export generated for "${title}". Download started.`);
    } else if (format.toLowerCase() === 'excel') {
      this.exportService.exportToExcel(`${title}_${this.filterClass}`, headers, rows, metadata);
      this.showToast(`Excel spreadsheet created for "${title}". Download started.`);
    } else {
      this.exportService.printOrPdf(title, headers, rows, metadata);
      this.showToast(`Document prepared for "${title}". Ready to Print or Save as PDF.`);
    }
  }

  printReport(): void {
    this.exportReport('PDF');
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3500);
  }
}
