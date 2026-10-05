import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

declare const Swal: any;

export interface ExamTypeItem {
  id: number;
  name: string;
  isPaid: boolean;
}

export interface ExaminationModel {
  id: number;
  name: string;
  typeId?: number;
  typeName?: string;
  startDate: string;
  endDate: string;
  academicYear: string;
  status: 'Scheduled' | 'Concluded' | 'Draft';
}

export interface ExamScheduleEntry {
  id: number;
  examId: number;
  examName: string;
  classId: number;
  className: string;
  sectionId: number;
  sectionName: string;
  subjectId: number;
  subjectName: string;
  examDate: string;
  startTime: string;
  endTime: string;
  classRoomId: number;
  roomNo: string;
  fullMarks: number;
  passMarks: number;
}

export interface ExamAttendanceStudent {
  studentId: number;
  rollNumber: string;
  admissionNumber: string;
  studentName: string;
  isPresent: boolean;
}

export interface MarkRegisterItem {
  id: number;
  studentId: number;
  studentName: string;
  rollNo: string;
  admissionNo: string;
  examId: number;
  examName: string;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  marksObtained: number;
  maxMarks: number;
  status: 'PASSED' | 'FAILED';
}

export interface MarkGradeItem {
  id: number;
  name: string;
  minPercentage: number;
  maxPercentage: number;
  gpa: number;
  isActive: boolean;
}

@Component({
  selector: 'app-examinations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);

  activeTab: 'type' | 'setup' | 'schedule' | 'attendance' | 'marks' | 'grade' | 'sms' | 'format-settings' | 'exam-rules' | 'positions' | 'signatures' | 'admit-card' | 'seat-plan' = 'setup';

  // Master Data Lists
  classes = [
    { id: 1, name: 'Class 10', sections: [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }] },
    { id: 2, name: 'Class 9', sections: [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }] },
    { id: 3, name: 'Class 12 - Science', sections: [{ id: 5, name: 'Section PCM' }, { id: 6, name: 'Section PCB' }] },
    { id: 4, name: 'Class 11 - Commerce', sections: [{ id: 7, name: 'Section Commerce' }] }
  ];

  subjects = [
    { id: 1, name: 'Mathematics - Calculus & Algebra' },
    { id: 2, name: 'Physics & Experimental Lab' },
    { id: 3, name: 'Chemistry - Organic & Inorganic' },
    { id: 4, name: 'Computer Science & Python' },
    { id: 5, name: 'English Literature & Grammar' }
  ];

  classRooms = [
    { id: 1, roomNo: 'Room 101' },
    { id: 2, roomNo: 'Room 102' },
    { id: 3, roomNo: 'Physics Lab 201' },
    { id: 4, roomNo: 'Chemistry Lab 202' },
    { id: 5, roomNo: 'Hall A' }
  ];

  // 1. Exam Types
  examTypes: ExamTypeItem[] = [
    { id: 1, name: 'Unit Test / Formative Assessment', isPaid: false },
    { id: 2, name: 'Mid-Semester Examination', isPaid: false },
    { id: 3, name: 'Annual Board Examination Mock', isPaid: true },
    { id: 4, name: 'Competitive Scholarship Olympiad', isPaid: true }
  ];

  // 2. Examination Setup
  exams: ExaminationModel[] = [
    { id: 1, name: 'Term 1 Mid-Semester Examination', typeName: 'Mid-Semester Examination', startDate: '2025-10-15', endDate: '2025-10-24', academicYear: '2025-26 Academic Session', status: 'Concluded' },
    { id: 2, name: 'Quarterly Assessment Test (Unit 2)', typeName: 'Unit Test', startDate: '2025-08-10', endDate: '2025-08-18', academicYear: '2025-26 Academic Session', status: 'Concluded' },
    { id: 3, name: 'Annual CBSE Final Board Mock', typeName: 'Annual Board', startDate: '2026-02-15', endDate: '2026-03-02', academicYear: '2025-26 Academic Session', status: 'Scheduled' }
  ];

  // 3. Exam Schedules
  schedules: ExamScheduleEntry[] = [
    { id: 1, examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 1, subjectName: 'Mathematics', examDate: '2025-10-15', startTime: '09:00', endTime: '12:00', classRoomId: 1, roomNo: 'Room 101', fullMarks: 100, passMarks: 33 },
    { id: 2, examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 2, subjectName: 'Physics', examDate: '2025-10-17', startTime: '09:00', endTime: '12:00', classRoomId: 3, roomNo: 'Physics Lab 201', fullMarks: 100, passMarks: 33 },
    { id: 3, examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 3, subjectName: 'Chemistry', examDate: '2025-10-19', startTime: '09:00', endTime: '12:00', classRoomId: 4, roomNo: 'Chemistry Lab 202', fullMarks: 100, passMarks: 33 },
    { id: 4, examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 4, subjectName: 'Computer Science', examDate: '2025-10-21', startTime: '09:00', endTime: '12:00', classRoomId: 5, roomNo: 'Hall A', fullMarks: 100, passMarks: 33 }
  ];

  // 4. Exam Attendance
  attendanceScheduleId: number = 1;
  attendanceStudents: ExamAttendanceStudent[] = [
    { studentId: 101, rollNumber: '1001', admissionNumber: 'ADM-2025-001', studentName: 'Aarav Sharma', isPresent: true },
    { studentId: 102, rollNumber: '1002', admissionNumber: 'ADM-2025-002', studentName: 'Diya Patel', isPresent: true },
    { studentId: 103, rollNumber: '1003', admissionNumber: 'ADM-2025-003', studentName: 'Rohan Mehra', isPresent: false },
    { studentId: 104, rollNumber: '1004', admissionNumber: 'ADM-2025-004', studentName: 'Ananya Iyer', isPresent: true },
    { studentId: 105, rollNumber: '1005', admissionNumber: 'ADM-2025-005', studentName: 'Vikramaditya Rao', isPresent: true }
  ];

  // 5. Marks Register
  marksRegister: MarkRegisterItem[] = [
    { id: 1, studentId: 101, studentName: 'Aarav Sharma', rollNo: '1001', admissionNo: 'ADM-2025-001', examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', marksObtained: 94, maxMarks: 100, status: 'PASSED' },
    { id: 2, studentId: 102, studentName: 'Diya Patel', rollNo: '1002', admissionNo: 'ADM-2025-002', examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', marksObtained: 88, maxMarks: 100, status: 'PASSED' },
    { id: 3, studentId: 103, studentName: 'Rohan Mehra', rollNo: '1003', admissionNo: 'ADM-2025-003', examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', marksObtained: 28, maxMarks: 100, status: 'FAILED' },
    { id: 4, studentId: 104, studentName: 'Ananya Iyer', rollNo: '1004', admissionNo: 'ADM-2025-004', examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', marksObtained: 97, maxMarks: 100, status: 'PASSED' },
    { id: 5, studentId: 105, studentName: 'Vikramaditya Rao', rollNo: '1005', admissionNo: 'ADM-2025-005', examId: 1, examName: 'Term 1 Mid-Semester Examination', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', marksObtained: 76, maxMarks: 100, status: 'PASSED' }
  ];

  // 6. Marks Grade
  grades: MarkGradeItem[] = [
    { id: 1, name: 'A+', minPercentage: 90.0, maxPercentage: 100.0, gpa: 4.0, isActive: true },
    { id: 2, name: 'A', minPercentage: 80.0, maxPercentage: 89.99, gpa: 3.7, isActive: true },
    { id: 3, name: 'B+', minPercentage: 70.0, maxPercentage: 79.99, gpa: 3.3, isActive: true },
    { id: 4, name: 'B', minPercentage: 60.0, maxPercentage: 69.99, gpa: 3.0, isActive: true },
    { id: 5, name: 'C', minPercentage: 40.0, maxPercentage: 59.99, gpa: 2.0, isActive: true },
    { id: 6, name: 'F', minPercentage: 0.0, maxPercentage: 39.99, gpa: 0.0, isActive: true }
  ];

  // 7. Exam Settings Models
  formatSettings = {
    marksheetLayout: 'Standard Tabulation with Grading Scale',
    headerWatermark: true,
    showPositionRank: true,
    showParentSignature: true,
    showTeacherRemarks: true,
    resultDateFormat: 'DD/MM/YYYY',
    showAttendanceSummary: true
  };

  examRules = {
    minAttendancePercent: 75,
    maxFailedSubjectsAllowed: 1,
    graceMarksLimit: 5,
    retestEligibility: true,
    practicalTheoryCombinedPass: false
  };

  meritPositions = {
    rankingCriteria: 'Total Aggregate Marks',
    tieBreakerRule: 'Higher marks in Mathematics/Science',
    scope: 'Class Wise and Section Wise',
    topPositionsAwarded: 3
  };

  signatureSettings = {
    principalSignTitle: 'Principal / Head of Institution',
    controllerSignTitle: 'Controller of Examinations',
    teacherSignTitle: 'Class Teacher Signature',
    showDigitalSignStamp: true
  };

  admitCardSettings = {
    templateTitle: 'OFFICIAL EXAMINATION ADMIT CARD & HALL TICKET',
    candidatePhotoEnabled: true,
    qrCodeVerification: true,
    candidateInstructions: '1. Candidate must report to exam hall 15 minutes before scheduled start time.\n2. Electronic devices, smartwatches, and unauthorized notes are strictly prohibited.\n3. Admit card and institutional student ID card must be placed on the desk throughout examination.',
    showRoomNumber: true
  };

  seatPlanSettings = {
    desksPerRow: 5,
    studentsPerDesk: 2,
    arrangementType: 'Alternate Class (Grade 10 & Grade 9)',
    orderDirection: 'Ascending Roll Numbers',
    roomAllocations: [
      { room: 'Room 101', capacity: 40, assignedClasses: 'Class 10-A & Class 9-A', invigilator: 'Dr. Ramesh Sharma' },
      { room: 'Room 102', capacity: 40, assignedClasses: 'Class 10-B & Class 9-B', invigilator: 'Sunita Nair' },
      { room: 'Hall A', capacity: 80, assignedClasses: 'Class 12-PCM & Class 11-Commerce', invigilator: 'Pooja Hegde' }
    ]
  };

  // Form Models - Exam Type
  newExamType = { name: '', isPaid: false };

  // Form Models - Propose Exam
  showAddExamModal = false;
  newExam = {
    name: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date(Date.now() + 10 * 86400000).toISOString().substring(0, 10),
    academicYear: '2025-26 Academic Session'
  };

  // Form Models - Add Schedule
  showAddScheduleModal = false;
  newSchedule = {
    examId: 1,
    classId: 1,
    sectionId: 1,
    subjectId: 1,
    examDate: new Date().toISOString().substring(0, 10),
    startTime: '09:00',
    endTime: '12:00',
    classRoomId: 1,
    fullMarks: 100,
    passMarks: 33
  };
  scheduleSections: { id: number; name: string }[] = [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }];

  // Form Models - Add Grade
  newGrade = { name: '', minPercentage: 80, maxPercentage: 90, gpa: 3.5 };

  // Form Models - SMS Result Broadcast
  smsBroadcast = { examId: 1, classId: 0 };

  // Filters & Search
  scheduleFilter = { examId: '', classId: '' };
  marksFilter = { examId: 1, classId: 1 };
  searchExamQuery = '';

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      const path = this.router.url.toLowerCase();
      if (path.includes('formatsettings')) {
        this.activeTab = 'format-settings';
      } else if (path.includes('setupexamrule')) {
        this.activeTab = 'exam-rules';
      } else if (path.includes('position')) {
        this.activeTab = 'positions';
      } else if (path.includes('signaturesettings')) {
        this.activeTab = 'signatures';
      } else if (path.includes('admitcardsetting')) {
        this.activeTab = 'admit-card';
      } else if (path.includes('seatplansetting')) {
        this.activeTab = 'seat-plan';
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const t = params['tab'].toLowerCase();
        if (t === 'type' || t === 'examtype') this.activeTab = 'type';
        else if (t === 'schedule' || t === 'examschedule') this.activeTab = 'schedule';
        else if (t === 'attendance' || t === 'examattendance') this.activeTab = 'attendance';
        else if (t === 'marks' || t === 'marksregister') this.activeTab = 'marks';
        else if (t === 'grade' || t === 'marksgrade') this.activeTab = 'grade';
        else if (t === 'sms' || t === 'sendmarksbysms') this.activeTab = 'sms';
        else if (t === 'format-settings' || t === 'formatsettings') this.activeTab = 'format-settings';
        else if (t === 'exam-rules' || t === 'setupexamrule') this.activeTab = 'exam-rules';
        else if (t === 'positions' || t === 'position') this.activeTab = 'positions';
        else if (t === 'signatures' || t === 'signaturesettings') this.activeTab = 'signatures';
        else if (t === 'admit-card' || t === 'admitcardsetting') this.activeTab = 'admit-card';
        else if (t === 'seat-plan' || t === 'seatplansetting') this.activeTab = 'seat-plan';
        else this.activeTab = 'setup';
      }
    });

    const url = this.router.url.toLowerCase();
    if (url.includes('/examinations/examtype')) this.activeTab = 'type';
    else if (url.includes('/examinations/examschedule')) this.activeTab = 'schedule';
    else if (url.includes('/examinations/examattendance')) this.activeTab = 'attendance';
    else if (url.includes('/examinations/marksregister')) this.activeTab = 'marks';
    else if (url.includes('/examinations/marksgrade')) this.activeTab = 'grade';
    else if (url.includes('/examinations/sendmarksbysms')) this.activeTab = 'sms';
    else if (url.includes('/examsettings/formatsettings')) this.activeTab = 'format-settings';
    else if (url.includes('/examsettings/setupexamrule')) this.activeTab = 'exam-rules';
    else if (url.includes('/examsettings/position')) this.activeTab = 'positions';
    else if (url.includes('/examsettings/signaturesettings')) this.activeTab = 'signatures';
    else if (url.includes('/examsettings/admitcardsetting')) this.activeTab = 'admit-card';
    else if (url.includes('/examsettings/seatplansetting')) this.activeTab = 'seat-plan';
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  saveExamSettings(): void {
    Swal.fire({
      icon: 'success',
      title: 'Settings Saved',
      text: 'Examination policy configurations updated successfully.',
      timer: 1500,
      showConfirmButton: false
    });
  }

  // --- SUBMODULE 1: EXAM TYPE ---
  saveExamType(): void {
    if (!this.newExamType.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Name Required', text: 'Please enter exam type name.' });
      return;
    }
    const item: ExamTypeItem = {
      id: Date.now(),
      name: this.newExamType.name.trim(),
      isPaid: this.newExamType.isPaid
    };
    this.examTypes.unshift(item);
    this.newExamType = { name: '', isPaid: false };
    Swal.fire({ icon: 'success', title: 'Exam Type Saved', text: `${item.name} has been added.`, timer: 1500, showConfirmButton: false });
  }

  deleteExamType(item: ExamTypeItem): void {
    this.examTypes = this.examTypes.filter(t => t.id !== item.id);
    Swal.fire({ icon: 'success', title: 'Exam Type Removed', timer: 1200, showConfirmButton: false });
  }

  // --- SUBMODULE 2: EXAM SETUP ---
  openAddExam(): void {
    this.showAddExamModal = true;
  }

  saveExam(): void {
    if (!this.newExam.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Title Required', text: 'Please enter assessment title.' });
      return;
    }
    const item: ExaminationModel = {
      id: Date.now(),
      name: this.newExam.name.trim(),
      typeName: 'Standard Assessment',
      startDate: this.newExam.startDate,
      endDate: this.newExam.endDate,
      academicYear: this.newExam.academicYear,
      status: 'Scheduled'
    };
    this.exams.unshift(item);
    this.showAddExamModal = false;
    this.newExam = { name: '', startDate: new Date().toISOString().substring(0, 10), endDate: new Date(Date.now() + 10 * 86400000).toISOString().substring(0, 10), academicYear: '2025-26 Academic Session' };
    Swal.fire({ icon: 'success', title: 'Examination Proposed', text: 'New assessment calendar initialized.', timer: 1500, showConfirmButton: false });
  }

  deleteExam(item: ExaminationModel): void {
    Swal.fire({
      title: 'Terminate Exam?',
      text: `Remove ${item.name} assessment registry?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Terminate',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.exams = this.exams.filter(e => e.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Assessment Terminated', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 3: EXAM SCHEDULE ---
  onScheduleClassChange(): void {
    const cls = this.classes.find(c => c.id === Number(this.newSchedule.classId));
    this.scheduleSections = cls ? cls.sections : [];
    this.newSchedule.sectionId = this.scheduleSections.length > 0 ? this.scheduleSections[0].id : 1;
  }

  openAddSchedule(): void {
    this.showAddScheduleModal = true;
  }

  saveSchedule(): void {
    const exam = this.exams.find(e => e.id === Number(this.newSchedule.examId));
    const cls = this.classes.find(c => c.id === Number(this.newSchedule.classId));
    const sec = cls?.sections.find(s => s.id === Number(this.newSchedule.sectionId));
    const sub = this.subjects.find(sb => sb.id === Number(this.newSchedule.subjectId));
    const room = this.classRooms.find(r => r.id === Number(this.newSchedule.classRoomId));

    if (!exam || !cls || !sec || !sub || !room) return;

    const item: ExamScheduleEntry = {
      id: Date.now(),
      examId: exam.id,
      examName: exam.name,
      classId: cls.id,
      className: cls.name,
      sectionId: sec.id,
      sectionName: sec.name,
      subjectId: sub.id,
      subjectName: sub.name,
      examDate: this.newSchedule.examDate,
      startTime: this.newSchedule.startTime,
      endTime: this.newSchedule.endTime,
      classRoomId: room.id,
      roomNo: room.roomNo,
      fullMarks: this.newSchedule.fullMarks || 100,
      passMarks: this.newSchedule.passMarks || 33
    };
    this.schedules.unshift(item);
    this.showAddScheduleModal = false;
    Swal.fire({ icon: 'success', title: 'Schedule Added', text: `${sub.name} exam scheduled on ${item.examDate}.`, timer: 1500, showConfirmButton: false });
  }

  // --- SUBMODULE 4: ATTENDANCE ---
  saveAttendance(): void {
    Swal.fire({
      icon: 'success',
      title: 'Attendance Saved',
      text: 'Examination student attendance recorded successfully.',
      timer: 1500,
      showConfirmButton: false
    });
  }

  // --- SUBMODULE 5: MARKS REGISTER ---
  getFilteredMarks(): MarkRegisterItem[] {
    return this.marksRegister.filter(m => 
      m.examId === Number(this.marksFilter.examId) && 
      m.classId === Number(this.marksFilter.classId)
    );
  }

  editMark(item: MarkRegisterItem): void {
    Swal.fire({
      title: `Update Marks for ${item.studentName}`,
      input: 'number',
      inputValue: item.marksObtained,
      showCancelButton: true,
      confirmButtonText: 'Save Score',
      confirmButtonColor: '#002B49'
    }).then((res: any) => {
      if (res.isConfirmed && res.value !== undefined) {
        const val = Number(res.value);
        item.marksObtained = val;
        item.status = val >= 33 ? 'PASSED' : 'FAILED';
        Swal.fire({ icon: 'success', title: 'Score Updated', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 6: MARKS GRADE ---
  saveGrade(): void {
    if (!this.newGrade.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Grade Name Required', text: 'e.g. A+, B, C' });
      return;
    }
    const item: MarkGradeItem = {
      id: Date.now(),
      name: this.newGrade.name.trim(),
      minPercentage: Number(this.newGrade.minPercentage),
      maxPercentage: Number(this.newGrade.maxPercentage),
      gpa: Number(this.newGrade.gpa),
      isActive: true
    };
    this.grades.push(item);
    this.newGrade = { name: '', minPercentage: 70, maxPercentage: 80, gpa: 3.0 };
    Swal.fire({ icon: 'success', title: 'Grade Configured', text: `Grade ${item.name} added.`, timer: 1500, showConfirmButton: false });
  }

  // --- SUBMODULE 7: SEND MARKS BY SMS ---
  broadcastSms(): void {
    Swal.fire({
      title: 'Initiate SMS Broadcast?',
      text: 'Results will be transmitted to primary guardian mobile numbers across the selected cohort.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Broadcast Now',
      confirmButtonColor: '#002B49'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Broadcast Dispatched',
          text: 'SMS Result Gateway queued 42 SMS dispatches successfully.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
