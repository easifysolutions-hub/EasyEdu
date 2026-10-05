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

  activeTab: 'group' | 'bank' | 'exam' = 'exam';

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
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const t = params['tab'].toLowerCase();
        if (t === 'group' || t === 'questiongroup') this.activeTab = 'group';
        else if (t === 'bank' || t === 'questionbank') this.activeTab = 'bank';
        else this.activeTab = 'exam';
      }
    });

    const url = this.router.url.toLowerCase();
    if (url.includes('/onlineexam/questiongroup')) this.activeTab = 'group';
    else if (url.includes('/onlineexam/questionbank')) this.activeTab = 'bank';
    else if (url.includes('/onlineexam')) this.activeTab = 'exam';
  }

  setTab(tab: 'group' | 'bank' | 'exam'): void {
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
    this.newExam = { title: '', classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', startDate: new Date().toISOString().substring(0, 10), endDate: new Date(Date.now() + 2 * 86400000).toISOString().substring(0, 10), durationMinutes: 45, totalMarks: 50, isPublished: true };
    Swal.fire({ icon: 'success', title: 'Evaluation Nexus Initialized', text: 'Online examination cycle published.', timer: 1500, showConfirmButton: false });
  }

  deleteExam(ex: DigitalOnlineExam): void {
    this.exams = this.exams.filter(e => e.id !== ex.id);
    Swal.fire({ icon: 'success', title: 'Evaluation Node Terminated', timer: 1200, showConfirmButton: false });
  }
}
