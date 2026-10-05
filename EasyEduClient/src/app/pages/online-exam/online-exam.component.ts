import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface Question {
  id: number;
  questionText: string;
  type: 'MCQ' | 'TrueFalse' | 'MultipleSelect' | 'FillBlank';
  subject: string;
  group: string;
  level: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  options?: string[];
  correctAnswer: string | number | number[];
}

interface OnlineExam {
  id: number;
  title: string;
  subject: string;
  className: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  totalQuestions: number;
  status: 'Published' | 'In Progress' | 'Completed' | 'Draft';
  autoEvaluate: boolean;
}

@Component({
  selector: 'app-online-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './online-exam.component.html',
  styleUrls: ['./online-exam.component.css']
})
export class OnlineExamComponent {
  activeTab: 'exams' | 'questions' | 'groups' | 'grading' | 'simulator' = 'exams';
  searchTerm = '';
  selectedSubject = 'All';

  exams: OnlineExam[] = [
    { id: 1, title: 'Term 1 Science & Physics Quiz', subject: 'Science', className: 'Grade 10-A', date: '2025-05-15', startTime: '10:00 AM', durationMinutes: 45, totalMarks: 50, passingMarks: 20, totalQuestions: 25, status: 'Published', autoEvaluate: true },
    { id: 2, title: 'Mathematics Algebra & Geometry Test', subject: 'Mathematics', className: 'Grade 10-B', date: '2025-05-18', startTime: '11:30 AM', durationMinutes: 60, totalMarks: 50, passingMarks: 20, totalQuestions: 20, status: 'Published', autoEvaluate: true },
    { id: 3, title: 'English Literature & Comprehension', subject: 'English', className: 'Grade 9-A', date: '2025-05-12', startTime: '09:00 AM', durationMinutes: 40, totalMarks: 40, passingMarks: 16, totalQuestions: 20, status: 'Completed', autoEvaluate: false },
    { id: 4, title: 'Computer Science Python Basics', subject: 'Computer', className: 'Grade 11-Science', date: '2025-05-20', startTime: '02:00 PM', durationMinutes: 60, totalMarks: 50, passingMarks: 25, totalQuestions: 30, status: 'Draft', autoEvaluate: true }
  ];

  questions: Question[] = [
    { id: 1, questionText: 'What is the SI unit of electric current?', type: 'MCQ', subject: 'Science', group: 'Physics Foundation', level: 'Easy', marks: 2, options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctAnswer: 1 },
    { id: 2, questionText: 'Light travels faster in water than in a vacuum.', type: 'TrueFalse', subject: 'Science', group: 'Optics', level: 'Easy', marks: 1, options: ['True', 'False'], correctAnswer: 1 },
    { id: 3, questionText: 'Which of the following are prime numbers?', type: 'MultipleSelect', subject: 'Mathematics', group: 'Number Theory', level: 'Medium', marks: 3, options: ['2', '9', '17', '21', '29'], correctAnswer: '2, 17, 29' },
    { id: 4, questionText: 'The chemical formula for table salt is _______.', type: 'FillBlank', subject: 'Science', group: 'Chemistry', level: 'Easy', marks: 2, correctAnswer: 'NaCl' },
    { id: 5, questionText: 'Solve for x: 3x + 15 = 45', type: 'MCQ', subject: 'Mathematics', group: 'Algebra', level: 'Medium', marks: 2, options: ['x = 8', 'x = 10', 'x = 12', 'x = 15'], correctAnswer: 1 }
  ];

  questionGroups = [
    { id: 1, name: 'Physics Foundation', subject: 'Science', questionCount: 42, description: 'Mechanics, Optics, Electricity' },
    { id: 2, name: 'Algebra & Matrices', subject: 'Mathematics', questionCount: 65, description: 'Linear equations, polynomials, quadratic formulas' },
    { id: 3, name: 'Organic Chemistry', subject: 'Science', questionCount: 38, description: 'Hydrocarbons, functional groups, reactions' },
    { id: 4, name: 'Python Programming', subject: 'Computer', questionCount: 50, description: 'Syntax, loops, functions, OOP concepts' }
  ];

  // Modals & Quiz Simulator
  showAddExamModal = false;
  newExamForm: Partial<OnlineExam> = {
    title: '',
    subject: 'Science',
    className: 'Grade 10-A',
    date: '2025-05-25',
    startTime: '10:00 AM',
    durationMinutes: 45,
    totalMarks: 50,
    passingMarks: 20,
    status: 'Published',
    autoEvaluate: true
  };

  showAddQuestionModal = false;
  newQuestionForm: Partial<Question> = {
    questionText: '',
    type: 'MCQ',
    subject: 'Science',
    group: 'Physics Foundation',
    level: 'Medium',
    marks: 2,
    options: ['', '', '', ''],
    correctAnswer: 0
  };

  // Simulator state
  activeExam: OnlineExam | null = null;
  currentQuestionIndex = 0;
  selectedAnswers: { [key: number]: any } = {};
  examSubmitted = false;
  quizScore = 0;

  get filteredExams(): OnlineExam[] {
    return this.exams.filter(e => {
      const matchSearch = !this.searchTerm || e.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || e.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchSub = this.selectedSubject === 'All' || e.subject === this.selectedSubject;
      return matchSearch && matchSub;
    });
  }

  createExam(): void {
    if (!this.newExamForm.title) {
      Swal.fire('Missing Information', 'Please enter Exam Title.', 'warning');
      return;
    }

    const exam: OnlineExam = {
      id: this.exams.length + 1,
      title: this.newExamForm.title!,
      subject: this.newExamForm.subject || 'General',
      className: this.newExamForm.className || 'Grade 10-A',
      date: this.newExamForm.date || '2025-06-01',
      startTime: this.newExamForm.startTime || '10:00 AM',
      durationMinutes: Number(this.newExamForm.durationMinutes) || 45,
      totalMarks: Number(this.newExamForm.totalMarks) || 50,
      passingMarks: Number(this.newExamForm.passingMarks) || 20,
      totalQuestions: 15,
      status: 'Published',
      autoEvaluate: true
    };

    this.exams.unshift(exam);
    this.showAddExamModal = false;
    this.newExamForm = { title: '', subject: 'Science', className: 'Grade 10-A', date: '2025-05-25', startTime: '10:00 AM', durationMinutes: 45, totalMarks: 50, passingMarks: 20, status: 'Published', autoEvaluate: true };

    Swal.fire('Exam Created!', `Online Exam "${exam.title}" has been published.`, 'success');
  }

  saveQuestion(): void {
    if (!this.newQuestionForm.questionText) {
      Swal.fire('Missing Details', 'Please enter Question prompt text.', 'warning');
      return;
    }

    const q: Question = {
      id: this.questions.length + 1,
      questionText: this.newQuestionForm.questionText!,
      type: this.newQuestionForm.type || 'MCQ',
      subject: this.newQuestionForm.subject || 'Science',
      group: this.newQuestionForm.group || 'General',
      level: this.newQuestionForm.level || 'Medium',
      marks: Number(this.newQuestionForm.marks) || 2,
      options: this.newQuestionForm.options?.filter(o => o.trim() !== '') || ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: this.newQuestionForm.correctAnswer ?? 0
    };

    this.questions.unshift(q);
    this.showAddQuestionModal = false;
    this.newQuestionForm = { questionText: '', type: 'MCQ', subject: 'Science', group: 'Physics Foundation', level: 'Medium', marks: 2, options: ['', '', '', ''], correctAnswer: 0 };

    Swal.fire('Question Added', 'Question has been added to Question Bank.', 'success');
  }

  startQuizSimulator(exam: OnlineExam): void {
    this.activeExam = exam;
    this.currentQuestionIndex = 0;
    this.selectedAnswers = {};
    this.examSubmitted = false;
    this.quizScore = 0;
    this.activeTab = 'simulator';
  }

  selectOption(qIndex: number, optIndex: number): void {
    this.selectedAnswers[qIndex] = optIndex;
  }

  submitExam(): void {
    Swal.fire({
      title: 'Submit Online Exam?',
      text: `You have answered ${Object.keys(this.selectedAnswers).length} out of ${this.questions.length} questions.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Yes, Submit Now'
    }).then((res: any) => {
      if (res.isConfirmed) {
        let earned = 0;
        this.questions.forEach((q, idx) => {
          if (this.selectedAnswers[idx] === q.correctAnswer) {
            earned += q.marks;
          }
        });

        this.quizScore = earned;
        this.examSubmitted = true;

        Swal.fire({
          title: 'Exam Evaluated!',
          text: `Score: ${earned} / 10 marks (${(earned / 10) * 100}%). Result saved!`,
          icon: earned >= 4 ? 'success' : 'warning',
          confirmButtonColor: '#002B49'
        });
      }
    });
  }
}
