import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface CbseTerm {
  id: number;
  name: string;
  weightagePercentage: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

export interface CbseAssessment {
  id: number;
  termId: number;
  termName: string;
  title: string;
  type: 'Periodic Test (PT)' | 'Multiple Assessment (MA)' | 'Portfolio' | 'Subject Enrichment (SE)' | 'Term End Exam';
  maxMarks: number;
  weightage: number;
}

export interface CbseObservation {
  id: number;
  domain: 'Co-Scholastic' | 'Discipline' | 'Work Education' | 'Art Education' | 'Health & Physical Education';
  parameterName: string;
  gradeScale: '3-Point (A,B,C)' | '5-Point (A-E)';
}

@Component({
  selector: 'app-cbse-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cbse-exam.component.html',
  styleUrls: ['./cbse-exam.component.css']
})
export class CbseExamComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'dashboard' | 'terms' | 'exams' | 'schedule' | 'grade' | 'assessments' | 'observations' | 'observation-parameters' | 'assign-observations' | 'templates' | 'print-marksheet' | 'reports' = 'dashboard';

  terms: CbseTerm[] = [
    { id: 1, name: 'Term 1 (April - September 2025)', weightagePercentage: 50, startDate: '2025-04-01', endDate: '2025-09-30', status: 'Active' },
    { id: 2, name: 'Term 2 (October - March 2026)', weightagePercentage: 50, startDate: '2025-10-01', endDate: '2026-03-31', status: 'Upcoming' }
  ];

  assessments: CbseAssessment[] = [
    { id: 1, termId: 1, termName: 'Term 1', title: 'Periodic Test 1 (PT-1)', type: 'Periodic Test (PT)', maxMarks: 40, weightage: 10 },
    { id: 2, termId: 1, termName: 'Term 1', title: 'Multiple Assessment & Quizzes', type: 'Multiple Assessment (MA)', maxMarks: 20, weightage: 5 },
    { id: 3, termId: 1, termName: 'Term 1', title: 'Subject Portfolio & Notebooks', type: 'Portfolio', maxMarks: 10, weightage: 5 },
    { id: 4, termId: 1, termName: 'Term 1', title: 'Science Practical & Lab Enrichment', type: 'Subject Enrichment (SE)', maxMarks: 20, weightage: 5 },
    { id: 5, termId: 1, termName: 'Term 1', title: 'Half-Yearly Summative Exam', type: 'Term End Exam', maxMarks: 80, weightage: 80 }
  ];

  observations: CbseObservation[] = [
    { id: 1, domain: 'Co-Scholastic', parameterName: 'Critical Thinking & Scientific Aptitude', gradeScale: '5-Point (A-E)' },
    { id: 2, domain: 'Art Education', parameterName: 'Visual Arts & Craft Participation', gradeScale: '3-Point (A,B,C)' },
    { id: 3, domain: 'Health & Physical Education', parameterName: 'Sports, Team Spirit & Yoga Fitness', gradeScale: '3-Point (A,B,C)' },
    { id: 4, domain: 'Discipline', parameterName: 'Punctuality, Campus Conduct & Values', gradeScale: '3-Point (A,B,C)' }
  ];

  ngOnInit(): void {
    this.syncRoute();
    this.route.url.subscribe(() => this.syncRoute());
  }

  private syncRoute(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('terms')) this.activeTab = 'terms';
    else if (path.includes('examschedule') || path.includes('schedule')) this.activeTab = 'schedule';
    else if (path.includes('examgrade') || path.includes('grade')) this.activeTab = 'grade';
    else if (path.includes('assessments')) this.activeTab = 'assessments';
    else if (path.includes('observationparameters')) this.activeTab = 'observation-parameters';
    else if (path.includes('assignobservations')) this.activeTab = 'assign-observations';
    else if (path.includes('observations')) this.activeTab = 'observations';
    else if (path.includes('templates')) this.activeTab = 'templates';
    else if (path.includes('printmarksheet')) this.activeTab = 'print-marksheet';
    else if (path.includes('reports')) this.activeTab = 'reports';
    else if (path.includes('exams')) this.activeTab = 'exams';
    else this.activeTab = 'dashboard';
  }

  printReportCard(): void {
    window.print();
  }

  saveTerm(): void {
    Swal.fire('Term Saved', 'CBSE Academic Term synchronized.', 'success');
  }

  saveAssessment(): void {
    Swal.fire('Assessment Configured', 'CBSE Internal Assessment rubric added.', 'success');
  }
}
