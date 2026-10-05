import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface QuestionGroupItem {
  id: number;
  title: string;
  totalQuestions: number;
}

export interface QuestionBankItem {
  id: number;
  groupId: number;
  groupTitle: string;
  questionType: 'MultipleChoice' | 'TrueFalse' | 'ShortAnswer';
  question: string;
  options?: string;
  correctAnswer: string;
  marks: number;
}

export interface DigitalOnlineExam {
  id: number;
  title: string;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  startDate: string;
  endDate: string;
  durationMinutes: number;
  totalMarks: number;
  isPublished: boolean;
}

export interface WrittenExamNode {
  id: number;
  examTitle: string;
  className: string;
  subject: string;
  submissionDeadline: string;
  totalSubmissions: number;
  evaluatedCount: number;
  maxScore: number;
  status: 'Evaluating' | 'Completed' | 'Open for Submissions';
}

@Component({
  selector: 'app-online-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './online-exam.component.html',
  styleUrls: ['./online-exam.component.css']
})
export class OnlineExamComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'exam' | 'add-exam' | 'group' | 'bank' | 'written' | 'settings' = 'exam';

  // 1. Groups
  groups: QuestionGroupItem[] = [
    { id: 1, title: 'Science Midterm Foundation', totalQuestions: 15 },
    { id: 2, title: 'Mathematics Algebra & Geometry 2026', totalQuestions: 20 },
    { id: 3, title: 'Computer Science Python Basics', totalQuestions: 12 },
    { id: 4, title: 'General Knowledge & Aptitude', totalQuestions: 25 }
  ];

  // 2. Question Bank
  questions: QuestionBankItem[] = [
    { id: 1, groupId: 1, groupTitle: 'Science Midterm Foundation', questionType: 'MultipleChoice', question: 'What is the SI unit of electric current in standard physics?', options: 'Volt, Ampere, Ohm, Watt', correctAnswer: 'Ampere', marks: 2 },
    { id: 2, groupId: 1, groupTitle: 'Science Midterm Foundation', questionType: 'TrueFalse', question: 'Light travels faster in water than in a vacuum.', options: 'True, False', correctAnswer: 'False', marks: 1 },
    { id: 3, groupId: 2, groupTitle: 'Mathematics Algebra & Geometry 2026', questionType: 'MultipleChoice', question: 'What is the root of the quadratic equation x^2 - 5x + 6 = 0?', options: 'x=2 or 3, x=1 or 6, x=-2 or -3, x=0', correctAnswer: 'x=2 or 3', marks: 2 },
    { id: 4, groupId: 3, groupTitle: 'Computer Science Python Basics', questionType: 'ShortAnswer', question: 'Which keyword is used to define a function in Python?', correctAnswer: 'def', marks: 2 },
    { id: 5, groupId: 4, groupTitle: 'General Knowledge & Aptitude', questionType: 'MultipleChoice', question: 'Which planet is known as the Red Planet in our solar system?', options: 'Venus, Mars, Jupiter, Saturn', correctAnswer: 'Mars', marks: 1 }
  ];

  // 3. Online Exams
  exams: DigitalOnlineExam[] = [
    { id: 1, title: 'Term 1 Science & Physics CBT Quiz', classId: 1, className: 'Class 10', subjectId: 2, subjectName: 'Physics', startDate: '2025-05-15', endDate: '2025-05-16', durationMinutes: 45, totalMarks: 50, isPublished: true },
    { id: 2, title: 'Mathematics Algebra Online Assessment', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', startDate: '2025-05-18', endDate: '2025-05-19', durationMinutes: 60, totalMarks: 50, isPublished: true },
    { id: 3, title: 'Python Programming Mock Exam', classId: 3, className: 'Class 12 - Science', subjectId: 4, subjectName: 'Computer Science', startDate: '2025-05-20', endDate: '2025-05-21', durationMinutes: 60, totalMarks: 40, isPublished: false }
  ];

  // 4. Written Exam Nodes
  writtenExams: WrittenExamNode[] = [
    { id: 1, examTitle: 'English Essay & Creative Composition Midterm', className: 'Grade 10-A', subject: 'English', submissionDeadline: '2025-05-22 05:00 PM', totalSubmissions: 38, evaluatedCount: 26, maxScore: 50, status: 'Evaluating' },
    { id: 2, examTitle: 'History & Civics Long Answer Descriptive Node', className: 'Grade 9-B', subject: 'Social Studies', submissionDeadline: '2025-05-24 11:59 PM', totalSubmissions: 42, evaluatedCount: 42, maxScore: 40, status: 'Completed' },
    { id: 3, examTitle: 'Physics Circuit Diagram & Theory Proof Submission', className: 'Grade 11-Science', subject: 'Physics', submissionDeadline: '2025-05-28 06:00 PM', totalSubmissions: 15, evaluatedCount: 0, maxScore: 60, status: 'Open for Submissions' }
  ];

  // Settings
  examSettings = {
    enableAntiCheatingProctoring: true,
    preventTabSwitching: true,
    maxTabSwitchCount: 3,
    randomizeQuestions: true,
    randomizeOptions: true,
    autoSubmitOnTimerExpiry: true,
    showInstantResults: false,
    watermarkStudentIdOnScreen: true
  };

  // Modals
  showGroupModal = false;
  newGroupTitle = '';

  showQuestionModal = false;
  newQuestion = {
    groupId: 1,
    questionType: 'MultipleChoice' as 'MultipleChoice' | 'TrueFalse' | 'ShortAnswer',
    question: '',
    options: '',
    correctAnswer: '',
    marks: 1
  };

  showExamModal = false;
  newExam = {
    title: '',
    classId: 1,
    className: 'Class 10',
    subjectId: 1,
    subjectName: 'Mathematics',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date(Date.now() + 2 * 86400000).toISOString().substring(0, 10),
    durationMinutes: 45,
    totalMarks: 50,
    isPublished: true
  };

  ngOnInit(): void {
    this.syncFromUrl();
    this.route.url.subscribe(() => this.syncFromUrl());
    this.route.queryParams.subscribe(() => this.syncFromUrl());
  }

  private syncFromUrl(): void {
    const url = this.router.url.toLowerCase();
    if (url.includes('addonlineexam')) {
      this.activeTab = 'add-exam';
    } else if (url.includes('questiongroup')) {
      this.activeTab = 'group';
    } else if (url.includes('questionbank')) {
      this.activeTab = 'bank';
    } else if (url.includes('writtenexam')) {
      this.activeTab = 'written';
    } else if (url.includes('settings')) {
      this.activeTab = 'settings';
    } else if (url.includes('onlineexam')) {
      this.activeTab = 'exam';
    }
  }

  setTab(tab: 'exam' | 'add-exam' | 'group' | 'bank' | 'written' | 'settings'): void {
    this.activeTab = tab;
  }

  // --- QUESTION GROUP ---
  saveGroup(): void {
    if (!this.newGroupTitle.trim()) {
      Swal.fire({ icon: 'warning', title: 'Domain Title Required' });
      return;
    }
    const item: QuestionGroupItem = {
      id: Date.now(),
      title: this.newGroupTitle.trim(),
      totalQuestions: 0
    };
    this.groups.push(item);
    this.showGroupModal = false;
    this.newGroupTitle = '';
    Swal.fire({ icon: 'success', title: 'Domain Node Synchronized', text: `${item.title} created.`, timer: 1500, showConfirmButton: false });
  }

  deleteGroup(g: QuestionGroupItem): void {
    this.groups = this.groups.filter(item => item.id !== g.id);
    Swal.fire({ icon: 'success', title: 'Domain Node Removed', timer: 1200, showConfirmButton: false });
  }

  // --- QUESTION BANK ---
  saveQuestion(): void {
    if (!this.newQuestion.question.trim() || !this.newQuestion.correctAnswer.trim()) {
      Swal.fire({ icon: 'warning', title: 'Details Required', text: 'Please fill question statement and correct resolution.' });
      return;
    }
    const grp = this.groups.find(g => g.id === Number(this.newQuestion.groupId));
    const item: QuestionBankItem = {
      id: Date.now(),
      groupId: Number(this.newQuestion.groupId),
      groupTitle: grp ? grp.title : 'General Knowledge',
      questionType: this.newQuestion.questionType,
      question: this.newQuestion.question.trim(),
      options: this.newQuestion.options.trim(),
      correctAnswer: this.newQuestion.correctAnswer.trim(),
      marks: Number(this.newQuestion.marks) || 1
    };
    this.questions.unshift(item);
    if (grp) grp.totalQuestions++;
    this.showQuestionModal = false;
    this.newQuestion = { groupId: 1, questionType: 'MultipleChoice', question: '', options: '', correctAnswer: '', marks: 1 };
    Swal.fire({ icon: 'success', title: 'Question Deposited', text: 'Question node deposited to vault.', timer: 1500, showConfirmButton: false });
  }

  deleteQuestion(q: QuestionBankItem): void {
    this.questions = this.questions.filter(item => item.id !== q.id);
    Swal.fire({ icon: 'success', title: 'Question Node Deleted', timer: 1200, showConfirmButton: false });
  }

  // --- ONLINE EXAM ---
  saveExam(): void {
    if (!this.newExam.title.trim()) {
      Swal.fire({ icon: 'warning', title: 'Title Required' });
      return;
    }
    const item: DigitalOnlineExam = {
      id: Date.now(),
      title: this.newExam.title.trim(),
      classId: this.newExam.classId,
      className: this.newExam.classId === 1 ? 'Class 10' : 'Class 12',
      subjectId: this.newExam.subjectId,
      subjectName: 'Mathematics',
      startDate: this.newExam.startDate,
      endDate: this.newExam.endDate,
      durationMinutes: Number(this.newExam.durationMinutes) || 45,
      totalMarks: Number(this.newExam.totalMarks) || 50,
      isPublished: this.newExam.isPublished
    };
    this.exams.unshift(item);
    this.showExamModal = false;
    this.activeTab = 'exam';
    this.newExam = { title: '', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', startDate: new Date().toISOString().substring(0, 10), endDate: new Date(Date.now() + 2 * 86400000).toISOString().substring(0, 10), durationMinutes: 45, totalMarks: 50, isPublished: true };
    Swal.fire({ icon: 'success', title: 'Evaluation Nexus Initialized', text: 'Online examination cycle published.', timer: 1500, showConfirmButton: false });
  }

  deleteExam(ex: DigitalOnlineExam): void {
    this.exams = this.exams.filter(e => e.id !== ex.id);
    Swal.fire({ icon: 'success', title: 'Evaluation Node Terminated', timer: 1200, showConfirmButton: false });
  }

  saveExamSettings(): void {
    Swal.fire('Proctoring Config Saved', 'Anti-cheating, randomizer, and live monitor rules updated.', 'success');
  }

  gradeWrittenSubmission(node: WrittenExamNode): void {
    Swal.fire({
      title: `Evaluate: ${node.examTitle}`,
      html: `
        <div class="text-start p-2 small">
          <p class="mb-1"><strong>Class:</strong> ${node.className} &bull; <strong>Subject:</strong> ${node.subject}</p>
          <p class="mb-1"><strong>Pending Evaluations:</strong> ${node.totalSubmissions - node.evaluatedCount} of ${node.totalSubmissions}</p>
          <p class="mb-0 text-muted">Launching digital paper annotation interface...</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Open Digital Evaluator'
    });
  }
}
