import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface TeacherEvaluationRecord {
  id: number;
  teacherId: number;
  teacherName: string;
  employeeNo: string;
  avatarInitial: string;
  evaluationDate: string;
  totalRating: number;
  remarks: string;
  status: 'Approved' | 'Pending';
}

export interface EvaluationCriterionItem {
  id: number;
  title: string;
  maxPoint: number;
  weight: number;
  isActive: boolean;
}

@Component({
  selector: 'app-teacher-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-evaluation.component.html',
  styleUrls: ['./teacher-evaluation.component.css']
})
export class TeacherEvaluationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'approved' | 'pending' | 'teacher-wise' | 'settings' = 'approved';

  // Faculty Directory
  teachers = [
    { id: 1, name: 'Dr. Abdul Hakeem', employeeNo: 'FAC-1001', dept: 'Mathematics' },
    { id: 2, name: 'Prof. Sharief Abdull', employeeNo: 'FAC-1002', dept: 'Physics' },
    { id: 3, name: 'Mrs. Priya Nair', employeeNo: 'FAC-1003', dept: 'Chemistry' },
    { id: 4, name: 'Mr. Arvind Rao', employeeNo: 'FAC-1004', dept: 'Computer Science' },
    { id: 5, name: 'Ms. Sunita Joshi', employeeNo: 'FAC-1005', dept: 'English Literature' }
  ];

  // Evaluations
  evaluations: TeacherEvaluationRecord[] = [
    { id: 1, teacherId: 1, teacherName: 'Dr. Abdul Hakeem', employeeNo: 'FAC-1001', avatarInitial: 'A', evaluationDate: 'May 02, 2025', totalRating: 4.8, remarks: 'Flawless pedagogical delivery and exceptional mentorship in advanced mathematics.', status: 'Approved' },
    { id: 2, teacherId: 2, teacherName: 'Prof. Sharief Abdull', employeeNo: 'FAC-1002', avatarInitial: 'S', evaluationDate: 'May 04, 2025', totalRating: 4.6, remarks: 'High engagement during laboratory practicals with deep conceptual demonstrations.', status: 'Approved' },
    { id: 3, teacherId: 3, teacherName: 'Mrs. Priya Nair', employeeNo: 'FAC-1003', avatarInitial: 'P', evaluationDate: 'May 05, 2025', totalRating: 4.2, remarks: 'Timely grading of internal chemistry assignments and strong rapport with students.', status: 'Pending' },
    { id: 4, teacherId: 4, teacherName: 'Mr. Arvind Rao', employeeNo: 'FAC-1004', avatarInitial: 'A', evaluationDate: 'May 06, 2025', totalRating: 4.9, remarks: 'Outstanding curriculum design in Python OOP and AI content delivery.', status: 'Approved' },
    { id: 5, teacherId: 5, teacherName: 'Ms. Sunita Joshi', employeeNo: 'FAC-1005', avatarInitial: 'S', evaluationDate: 'May 08, 2025', totalRating: 4.0, remarks: 'Effective English communicative workshop and grammar reinforcement sessions.', status: 'Pending' }
  ];

  // Evaluation Matrix Criteria
  criteria: EvaluationCriterionItem[] = [
    { id: 1, title: 'Classroom Delivery & Communication Clarity', maxPoint: 5, weight: 1, isActive: true },
    { id: 2, title: 'Punctuality & Session Attendance Regularity', maxPoint: 5, weight: 1, isActive: true },
    { id: 3, title: 'Subject Matter Mastery & Curriculum Pacing', maxPoint: 5, weight: 2, isActive: true },
    { id: 4, title: 'Student Interaction, Mentorship & Doubt Resolution', maxPoint: 5, weight: 1, isActive: true }
  ];

  // Submodule 3: Teacher-wise report
  selectedTeacherIdForReport: number | null = 1;

  // Submodule 4: Add criterion
  newCriterion = { title: '', maxPoint: 5, weight: 1 };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const t = params['tab'].toLowerCase();
        if (t === 'pending' || t === 'pendingreport') this.activeTab = 'pending';
        else if (t === 'teacher-wise' || t === 'teacherwisereport') this.activeTab = 'teacher-wise';
        else if (t === 'settings') this.activeTab = 'settings';
        else this.activeTab = 'approved';
      }
    });

    const url = this.router.url.toLowerCase();
    if (url.includes('/teacherevaluation/pendingreport')) this.activeTab = 'pending';
    else if (url.includes('/teacherevaluation/teacherwisereport')) this.activeTab = 'teacher-wise';
    else if (url.includes('/teacherevaluation/settings')) this.activeTab = 'settings';
    else if (url.includes('/teacherevaluation')) this.activeTab = 'approved';
  }

  setTab(tab: 'approved' | 'pending' | 'teacher-wise' | 'settings'): void {
    this.activeTab = tab;
  }

  get approvedEvaluations(): TeacherEvaluationRecord[] {
    return this.evaluations.filter(e => e.status === 'Approved');
  }

  get pendingEvaluations(): TeacherEvaluationRecord[] {
    return this.evaluations.filter(e => e.status === 'Pending');
  }

  get teacherWiseEvaluations(): TeacherEvaluationRecord[] {
    if (!this.selectedTeacherIdForReport) return [];
    return this.evaluations.filter(e => e.teacherId === Number(this.selectedTeacherIdForReport));
  }

  approveEvaluation(item: TeacherEvaluationRecord): void {
    item.status = 'Approved';
    Swal.fire({ icon: 'success', title: 'Evaluation Verified', text: `Performance appraisal for ${item.teacherName} authorized.`, timer: 1500, showConfirmButton: false });
  }

  saveCriterion(): void {
    if (!this.newCriterion.title.trim()) {
      Swal.fire({ icon: 'warning', title: 'Criterion Title Required' });
      return;
    }
    const item: EvaluationCriterionItem = {
      id: Date.now(),
      title: this.newCriterion.title.trim(),
      maxPoint: Number(this.newCriterion.maxPoint) || 5,
      weight: Number(this.newCriterion.weight) || 1,
      isActive: true
    };
    this.criteria.push(item);
    this.newCriterion = { title: '', maxPoint: 5, weight: 1 };
    Swal.fire({ icon: 'success', title: 'Criterion Deployed', text: `${item.title} added to matrix.`, timer: 1500, showConfirmButton: false });
  }
}
