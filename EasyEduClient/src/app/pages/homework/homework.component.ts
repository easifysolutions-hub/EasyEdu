import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

interface HomeworkTask {
  id: number;
  title: string;
  class: string;
  subject: string;
  teacher: string;
  assignDate: string;
  submissionDate: string;
  maxMarks: number;
  description: string;
  attachmentName?: string;
  totalSubmissions: number;
  evaluatedCount: number;
  status: 'Active' | 'Closed' | 'Draft';
}

interface StudentSubmission {
  id: number;
  homeworkId: number;
  studentName: string;
  admissionNo: string;
  rollNo: string;
  submissionDate: string;
  fileName: string;
  fileSize: string;
  status: 'Submitted' | 'Evaluated' | 'Late' | 'Pending';
  marksObtained?: number;
  teacherComment?: string;
}

@Component({
  selector: 'app-homework',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'list' | 'create' | 'evaluate' | 'report' = 'list';
  searchTerm = '';
  selectedClassFilter = 'All';

  tasks: HomeworkTask[] = [
    { id: 1, title: 'Trigonometric Identities & Quadratic Equations Practice', class: 'Grade 10-A', subject: 'Mathematics', teacher: 'Dr. Ramesh Sharma', assignDate: '2025-05-01', submissionDate: '2025-05-08', maxMarks: 25, description: 'Solve all numerical exercises from Section 4.2 to 4.5 in your assignment notebook.', attachmentName: 'Math_Worksheet_Ch4.pdf', totalSubmissions: 34, evaluatedCount: 28, status: 'Active' },
    { id: 2, title: 'Optics Ray Diagram & Lens Formula Case Study', class: 'Grade 10-B', subject: 'Physics', teacher: 'Sunita Nair', assignDate: '2025-04-28', submissionDate: '2025-05-05', maxMarks: 20, description: 'Draw ray diagrams for convex and concave lenses and compute focal length problems.', attachmentName: 'Physics_Optics_Assignment.pdf', totalSubmissions: 38, evaluatedCount: 38, status: 'Closed' },
    { id: 3, title: 'Python List Comprehension & Dictionary Operations', class: 'Grade 11-Science', subject: 'Computer Science', teacher: 'Prof. Rajesh Khanna', assignDate: '2025-05-03', submissionDate: '2025-05-10', maxMarks: 30, description: 'Implement 5 python functions using dictionary manipulation and nested lists.', attachmentName: 'Python_Lab_Ex3.py', totalSubmissions: 22, evaluatedCount: 15, status: 'Active' },
    { id: 4, title: 'Essay: The Role of Sustainable Energy in Modern Society', class: 'Grade 9-A', subject: 'English', teacher: 'Pooja Hegde', assignDate: '2025-05-02', submissionDate: '2025-05-09', maxMarks: 20, description: 'Write a 500-word structured argumentative essay on renewable alternatives.', attachmentName: 'Essay_Rubric.pdf', totalSubmissions: 29, evaluatedCount: 12, status: 'Active' }
  ];

  submissions: StudentSubmission[] = [
    { id: 101, homeworkId: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', rollNo: '1001', submissionDate: '2025-05-04 06:30 PM', fileName: 'Aarav_Math_Sol.pdf', fileSize: '2.4 MB', status: 'Evaluated', marksObtained: 24, teacherComment: 'Neat steps and flawless algebraic solution.' },
    { id: 102, homeworkId: 1, studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', rollNo: '1002', submissionDate: '2025-05-05 08:15 PM', fileName: 'Diya_Trig_HW.pdf', fileSize: '1.8 MB', status: 'Submitted', marksObtained: 0, teacherComment: '' },
    { id: 103, homeworkId: 1, studentName: 'Rohan Gupta', admissionNo: 'ADM-2024-003', rollNo: '1003', submissionDate: '2025-05-06 10:10 PM', fileName: 'Rohan_Math_Ex4.pdf', fileSize: '3.1 MB', status: 'Submitted', marksObtained: 0, teacherComment: '' },
    { id: 104, homeworkId: 1, studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', rollNo: '1004', submissionDate: '2025-05-03 04:20 PM', fileName: 'Ananya_Math_HW.pdf', fileSize: '2.1 MB', status: 'Evaluated', marksObtained: 25, teacherComment: 'Perfect score! Outstanding method presentation.' }
  ];

  // New Homework Form
  newHomework = {
    title: '',
    class: 'Grade 10-A',
    subject: 'Mathematics',
    assignDate: new Date().toISOString().substring(0, 10),
    submissionDate: new Date(Date.now() + 7 * 86400000).toISOString().substring(0, 10),
    maxMarks: 25,
    description: '',
    notifyParents: true
  };

  // Evaluation Modal
  showEvaluateModal = false;
  selectedSubmission: StudentSubmission | null = null;
  evalMarks = 20;
  evalComment = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        if (params['tab'] === 'add' || params['tab'] === 'create') this.activeTab = 'create';
        else if (params['tab'] === 'report') this.activeTab = 'report';
        else if (params['tab'] === 'evaluate') this.activeTab = 'evaluate';
        else this.activeTab = 'list';
      }
    });

    const url = this.router.url.toLowerCase();
    if (url.includes('/homework/create')) {
      this.activeTab = 'create';
    } else if (url.includes('/homework/homeworkreport') || url.includes('/report')) {
      this.activeTab = 'report';
    } else if (url.includes('/homework')) {
      this.activeTab = 'list';
    }
  }

  get filteredTasks(): HomeworkTask[] {
    return this.tasks.filter(t => {
      const matchClass = this.selectedClassFilter === 'All' || t.class === this.selectedClassFilter;
      const matchSearch = !this.searchTerm ||
        t.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.teacher.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchClass && matchSearch;
    });
  }

  saveHomework(): void {
    if (!this.newHomework.title || !this.newHomework.submissionDate) {
      Swal.fire('Required Details', 'Please enter Title and Submission Due Date.', 'warning');
      return;
    }

    const task: HomeworkTask = {
      id: this.tasks.length + 1,
      title: this.newHomework.title,
      class: this.newHomework.class,
      subject: this.newHomework.subject,
      teacher: 'Logged-in Faculty',
      assignDate: this.newHomework.assignDate,
      submissionDate: this.newHomework.submissionDate,
      maxMarks: Number(this.newHomework.maxMarks) || 20,
      description: this.newHomework.description || 'Complete the assignment before due date.',
      attachmentName: 'Assignment_Attachment.pdf',
      totalSubmissions: 0,
      evaluatedCount: 0,
      status: 'Active'
    };

    this.tasks.unshift(task);
    this.activeTab = 'list';
    this.newHomework = { title: '', class: 'Grade 10-A', subject: 'Mathematics', assignDate: new Date().toISOString().substring(0, 10), submissionDate: new Date(Date.now() + 7 * 86400000).toISOString().substring(0, 10), maxMarks: 25, description: '', notifyParents: true };

    Swal.fire({
      title: 'Homework Published!',
      text: 'Students and parents have been notified via mobile portal and push SMS.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  openEvaluateModal(sub: StudentSubmission): void {
    this.selectedSubmission = sub;
    this.evalMarks = sub.marksObtained || 20;
    this.evalComment = sub.teacherComment || 'Good effort.';
    this.showEvaluateModal = true;
  }

  submitEvaluation(): void {
    if (!this.selectedSubmission) return;

    this.selectedSubmission.status = 'Evaluated';
    this.selectedSubmission.marksObtained = Number(this.evalMarks);
    this.selectedSubmission.teacherComment = this.evalComment;
    this.showEvaluateModal = false;

    Swal.fire({
      title: 'Evaluation Saved',
      text: `Marks (${this.evalMarks}/25) and feedback updated for ${this.selectedSubmission.studentName}.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  downloadFile(fileName: string): void {
    Swal.fire({
      title: 'Downloading Attachment',
      text: `Fetching "${fileName}" from secure storage...`,
      icon: 'info',
      timer: 1200,
      showConfirmButton: false
    });
  }
}
