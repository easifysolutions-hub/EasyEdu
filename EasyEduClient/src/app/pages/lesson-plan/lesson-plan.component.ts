import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

declare const Swal: any;

export interface LessonItem {
  id: number;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  lessonName: string;
}

export interface TopicItem {
  id: number;
  lessonId: number;
  lessonName: string;
  subjectName: string;
  className: string;
  topicName: string;
  description?: string;
}

export interface ExecutiveLessonPlan {
  id: number;
  teacherId: number;
  teacherName: string;
  lessonId: number;
  lessonName: string;
  topicId: number;
  topicName: string;
  subjectName: string;
  className: string;
  executionDate: string;
  status: 'Pending' | 'Ongoing' | 'Completed';
}

export interface LessonPlanSettingsModel {
  id: number;
  restrictEdit: boolean;
  notifyStudents: boolean;
  requireApproval: boolean;
  warningDays: number;
}

@Component({
  selector: 'app-lesson-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.css']
})
export class LessonPlanComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);

  activeTab: 'lesson' | 'topic' | 'plan' | 'overview' | 'settings' = 'lesson';

  // Master Data
  classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 12 - Science' },
    { id: 4, name: 'Class 11 - Commerce' },
    { id: 5, name: 'Class 8' }
  ];

  subjects = [
    { id: 1, name: 'Mathematics - Calculus & Algebra', classId: 1 },
    { id: 2, name: 'Physics & Experimental Lab', classId: 1 },
    { id: 3, name: 'Chemistry - Organic & Inorganic', classId: 1 },
    { id: 4, name: 'Computer Science & Python', classId: 1 },
    { id: 5, name: 'English Literature & Grammar', classId: 1 },
    { id: 6, name: 'Mathematics - Algebra & Geometry', classId: 2 },
    { id: 7, name: 'Physics - Mechanics & Waves', classId: 3 }
  ];

  teachers = [
    { id: 1, name: 'Dr. Abdul Hakeem' },
    { id: 2, name: 'Prof. Sharief Abdull' },
    { id: 3, name: 'Mrs. Priya Nair' },
    { id: 4, name: 'Mr. Arvind Rao' },
    { id: 5, name: 'Ms. Sunita Joshi' }
  ];

  // 1. Lessons
  lessons: LessonItem[] = [
    { id: 1, classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', lessonName: 'Chapter 1: Real Numbers & Polynomials' },
    { id: 2, classId: 1, className: 'Class 10', subjectId: 1, subjectName: 'Mathematics', lessonName: 'Chapter 2: Quadratic Equations & AP' },
    { id: 3, classId: 1, className: 'Class 10', subjectId: 2, subjectName: 'Physics', lessonName: 'Chapter 1: Light - Reflection and Refraction' },
    { id: 4, classId: 1, className: 'Class 10', subjectId: 3, subjectName: 'Chemistry', lessonName: 'Chapter 1: Chemical Reactions & Equations' },
    { id: 5, classId: 1, className: 'Class 10', subjectId: 4, subjectName: 'Computer Science', lessonName: 'Chapter 1: Python OOP & Data Structures' },
    { id: 6, classId: 3, className: 'Class 12 - Science', subjectId: 7, subjectName: 'Physics', lessonName: 'Chapter 1: Electrostatics & Potential' }
  ];

  // 2. Topics
  topics: TopicItem[] = [
    { id: 1, lessonId: 1, lessonName: 'Chapter 1: Real Numbers & Polynomials', subjectName: 'Mathematics', className: 'Class 10', topicName: 'Euclid Division Lemma & Fundamental Theorem of Arithmetic', description: 'Core principles of prime factorisation and uniqueness theorem.' },
    { id: 2, lessonId: 1, lessonName: 'Chapter 1: Real Numbers & Polynomials', subjectName: 'Mathematics', className: 'Class 10', topicName: 'Zeroes of a Polynomial & Geometric Representation', description: 'Quadratic parabola graphs and relationship between zeroes and coefficients.' },
    { id: 3, lessonId: 3, lessonName: 'Chapter 1: Light - Reflection and Refraction', subjectName: 'Physics', className: 'Class 10', topicName: 'Spherical Mirrors: Ray Diagrams for Concave & Convex Mirrors', description: 'Mirror formula derivations and magnification rules.' },
    { id: 4, lessonId: 4, lessonName: 'Chapter 1: Chemical Reactions & Equations', subjectName: 'Chemistry', className: 'Class 10', topicName: 'Balancing Chemical Equations & Redox Reactions', description: 'Oxidation, reduction, oxidizing agents in daily industrial processes.' },
    { id: 5, lessonId: 5, lessonName: 'Chapter 1: Python OOP & Data Structures', subjectName: 'Computer Science', className: 'Class 10', topicName: 'Classes, Objects, Constructors (__init__) & Inheritance', description: 'Single and multi-level inheritance with polymorphic methods.' }
  ];

  // 3. Executive Lesson Plans
  plans: ExecutiveLessonPlan[] = [
    { id: 1, teacherId: 1, teacherName: 'Dr. Abdul Hakeem', lessonId: 1, lessonName: 'Chapter 1: Real Numbers & Polynomials', topicId: 1, topicName: 'Euclid Division Lemma & Fundamental Theorem', subjectName: 'Mathematics', className: 'Class 10', executionDate: '2025-05-10', status: 'Completed' },
    { id: 2, teacherId: 1, teacherName: 'Dr. Abdul Hakeem', lessonId: 1, lessonName: 'Chapter 1: Real Numbers & Polynomials', topicId: 2, topicName: 'Zeroes of a Polynomial & Geometric Representation', subjectName: 'Mathematics', className: 'Class 10', executionDate: '2025-05-12', status: 'Ongoing' },
    { id: 3, teacherId: 2, teacherName: 'Prof. Sharief Abdull', lessonId: 3, lessonName: 'Chapter 1: Light - Reflection and Refraction', topicId: 3, topicName: 'Spherical Mirrors: Ray Diagrams', subjectName: 'Physics', className: 'Class 10', executionDate: '2025-05-14', status: 'Completed' },
    { id: 4, teacherId: 3, teacherName: 'Mrs. Priya Nair', lessonId: 4, lessonName: 'Chapter 1: Chemical Reactions & Equations', topicId: 4, topicName: 'Balancing Chemical Equations & Redox Reactions', subjectName: 'Chemistry', className: 'Class 10', executionDate: '2025-05-16', status: 'Pending' },
    { id: 5, teacherId: 4, teacherName: 'Mr. Arvind Rao', lessonId: 5, lessonName: 'Chapter 1: Python OOP & Data Structures', topicId: 5, topicName: 'Classes, Objects, Constructors & Inheritance', subjectName: 'Computer Science', className: 'Class 10', executionDate: '2025-05-18', status: 'Ongoing' }
  ];

  // 4. Settings
  settings: LessonPlanSettingsModel = {
    id: 1,
    restrictEdit: false,
    notifyStudents: true,
    requireApproval: true,
    warningDays: 3
  };

  // Form Models - Add Lesson
  showLessonForm = true;
  newLesson = { classId: null as number | null, subjectId: null as number | null, lessonName: '' };
  availableSubjectsForLesson: { id: number; name: string }[] = [];
  editingLesson: LessonItem | null = null;
  showEditLessonModal = false;

  // Form Models - Add Topic
  showTopicForm = true;
  newTopic = { lessonId: null as number | null, topicName: '', description: '' };
  editingTopic: TopicItem | null = null;
  showEditTopicModal = false;

  // Form Models - Plan
  showPlanForm = true;
  isEditingPlan = false;
  planForm = {
    id: 0,
    teacherId: null as number | null,
    lessonId: null as number | null,
    topicId: null as number | null,
    executionDate: new Date().toISOString().substring(0, 10),
    status: 'Pending' as 'Pending' | 'Ongoing' | 'Completed'
  };
  availableTopicsForPlan: TopicItem[] = [];

  // Overview Filter
  overviewTeacherFilter: number | null = null;

  // Search Queries
  searchLessonQuery = '';
  searchTopicQuery = '';
  searchPlanQuery = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });

    const url = this.router.url.toLowerCase();
    if (url.includes('/lessonplan/lesson') || url.endsWith('/lesson')) {
      this.activeTab = 'lesson';
    } else if (url.includes('/lessonplan/topic') || url.endsWith('/topic')) {
      this.activeTab = 'topic';
    } else if (url.includes('/lessonplan/lessonplanoverview') || url.endsWith('/overview')) {
      this.activeTab = 'overview';
    } else if (url.includes('/lessonplan/settings') || url.endsWith('/settings')) {
      this.activeTab = 'settings';
    } else if (url.includes('/lessonplan')) {
      this.activeTab = 'plan';
    }
  }

  setTab(tab: 'lesson' | 'topic' | 'plan' | 'overview' | 'settings'): void {
    this.activeTab = tab;
  }

  // --- SUBMODULE 1: LESSON ---
  onLessonClassChange(): void {
    if (this.newLesson.classId) {
      this.availableSubjectsForLesson = this.subjects.filter(s => s.classId === Number(this.newLesson.classId));
      this.newLesson.subjectId = this.availableSubjectsForLesson.length > 0 ? this.availableSubjectsForLesson[0].id : null;
    } else {
      this.availableSubjectsForLesson = [];
      this.newLesson.subjectId = null;
    }
  }

  toggleLessonForm(): void {
    this.showLessonForm = !this.showLessonForm;
  }

  saveLesson(): void {
    if (!this.newLesson.classId || !this.newLesson.subjectId || !this.newLesson.lessonName.trim()) {
      Swal.fire({ icon: 'warning', title: 'Fields Required', text: 'Please choose class, subject and enter lesson name.' });
      return;
    }
    const cls = this.classes.find(c => c.id === Number(this.newLesson.classId));
    const sub = this.subjects.find(s => s.id === Number(this.newLesson.subjectId));

    if (!cls || !sub) return;

    const item: LessonItem = {
      id: Date.now(),
      classId: cls.id,
      className: cls.name,
      subjectId: sub.id,
      subjectName: sub.name,
      lessonName: this.newLesson.lessonName.trim()
    };
    this.lessons.unshift(item);
    this.newLesson = { classId: null, subjectId: null, lessonName: '' };
    this.availableSubjectsForLesson = [];
    Swal.fire({ icon: 'success', title: 'Lesson Created', text: `${item.lessonName} added successfully.`, timer: 1500, showConfirmButton: false });
  }

  openEditLesson(item: LessonItem): void {
    this.editingLesson = { ...item };
    this.showEditLessonModal = true;
  }

  updateLesson(): void {
    if (!this.editingLesson || !this.editingLesson.lessonName.trim()) return;
    const target = this.lessons.find(l => l.id === this.editingLesson!.id);
    if (target) {
      target.lessonName = this.editingLesson.lessonName.trim();
    }
    this.showEditLessonModal = false;
    this.editingLesson = null;
    Swal.fire({ icon: 'success', title: 'Lesson Updated', timer: 1200, showConfirmButton: false });
  }

  deleteLesson(item: LessonItem): void {
    Swal.fire({
      title: 'Delete Lesson?',
      text: `Are you sure you want to delete ${item.lessonName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.lessons = this.lessons.filter(l => l.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Lesson Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 2: TOPIC ---
  toggleTopicForm(): void {
    this.showTopicForm = !this.showTopicForm;
  }

  saveTopic(): void {
    if (!this.newTopic.lessonId || !this.newTopic.topicName.trim()) {
      Swal.fire({ icon: 'warning', title: 'Fields Required', text: 'Please select a lesson and enter topic name.' });
      return;
    }
    const l = this.lessons.find(ls => ls.id === Number(this.newTopic.lessonId));
    if (!l) return;

    const item: TopicItem = {
      id: Date.now(),
      lessonId: l.id,
      lessonName: l.lessonName,
      subjectName: l.subjectName,
      className: l.className,
      topicName: this.newTopic.topicName.trim(),
      description: this.newTopic.description.trim()
    };
    this.topics.unshift(item);
    this.newTopic = { lessonId: null, topicName: '', description: '' };
    Swal.fire({ icon: 'success', title: 'Topic Created', text: `${item.topicName} added to ${l.lessonName}.`, timer: 1500, showConfirmButton: false });
  }

  openEditTopic(item: TopicItem): void {
    this.editingTopic = { ...item };
    this.showEditTopicModal = true;
  }

  updateTopic(): void {
    if (!this.editingTopic || !this.editingTopic.topicName.trim()) return;
    const target = this.topics.find(t => t.id === this.editingTopic!.id);
    if (target) {
      target.topicName = this.editingTopic.topicName.trim();
      target.description = this.editingTopic.description;
    }
    this.showEditTopicModal = false;
    this.editingTopic = null;
    Swal.fire({ icon: 'success', title: 'Topic Updated', timer: 1200, showConfirmButton: false });
  }

  deleteTopic(item: TopicItem): void {
    Swal.fire({
      title: 'Delete Topic?',
      text: `Do you want to delete ${item.topicName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.topics = this.topics.filter(t => t.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Topic Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 3: EXECUTIVE LESSON PLAN ---
  togglePlanForm(): void {
    this.showPlanForm = !this.showPlanForm;
  }

  onPlanLessonChange(): void {
    if (this.planForm.lessonId) {
      this.availableTopicsForPlan = this.topics.filter(t => t.lessonId === Number(this.planForm.lessonId));
      this.planForm.topicId = this.availableTopicsForPlan.length > 0 ? this.availableTopicsForPlan[0].id : null;
    } else {
      this.availableTopicsForPlan = [];
      this.planForm.topicId = null;
    }
  }

  savePlan(): void {
    if (!this.planForm.teacherId || !this.planForm.lessonId || !this.planForm.topicId || !this.planForm.executionDate) {
      Swal.fire({ icon: 'warning', title: 'Fields Required', text: 'Please fill teacher, lesson, topic, and execution date.' });
      return;
    }
    const t = this.teachers.find(tch => tch.id === Number(this.planForm.teacherId));
    const l = this.lessons.find(ls => ls.id === Number(this.planForm.lessonId));
    const top = this.topics.find(tp => tp.id === Number(this.planForm.topicId));

    if (!t || !l || !top) return;

    if (this.isEditingPlan && this.planForm.id > 0) {
      const existing = this.plans.find(p => p.id === this.planForm.id);
      if (existing) {
        existing.teacherId = t.id;
        existing.teacherName = t.name;
        existing.lessonId = l.id;
        existing.lessonName = l.lessonName;
        existing.topicId = top.id;
        existing.topicName = top.topicName;
        existing.subjectName = l.subjectName;
        existing.className = l.className;
        existing.executionDate = this.planForm.executionDate;
        existing.status = this.planForm.status;
      }
      this.resetPlanForm();
      Swal.fire({ icon: 'success', title: 'Plan Updated', text: 'Executive lesson plan updated successfully.', timer: 1500, showConfirmButton: false });
    } else {
      const newPlan: ExecutiveLessonPlan = {
        id: Date.now(),
        teacherId: t.id,
        teacherName: t.name,
        lessonId: l.id,
        lessonName: l.lessonName,
        topicId: top.id,
        topicName: top.topicName,
        subjectName: l.subjectName,
        className: l.className,
        executionDate: this.planForm.executionDate,
        status: this.planForm.status
      };
      this.plans.unshift(newPlan);
      this.resetPlanForm();
      Swal.fire({ icon: 'success', title: 'Plan Saved', text: 'New lesson plan recorded.', timer: 1500, showConfirmButton: false });
    }
  }

  editPlan(item: ExecutiveLessonPlan): void {
    this.isEditingPlan = true;
    this.showPlanForm = true;
    this.planForm = {
      id: item.id,
      teacherId: item.teacherId,
      lessonId: item.lessonId,
      topicId: item.topicId,
      executionDate: item.executionDate,
      status: item.status
    };
    this.availableTopicsForPlan = this.topics.filter(t => t.lessonId === item.lessonId);
  }

  resetPlanForm(): void {
    this.isEditingPlan = false;
    this.planForm = {
      id: 0,
      teacherId: null,
      lessonId: null,
      topicId: null,
      executionDate: new Date().toISOString().substring(0, 10),
      status: 'Pending'
    };
    this.availableTopicsForPlan = [];
  }

  deletePlan(item: ExecutiveLessonPlan): void {
    Swal.fire({
      title: 'Delete Lesson Plan?',
      text: `Delete plan for ${item.topicName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.plans = this.plans.filter(p => p.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Plan Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 4: OVERVIEW ---
  getFilteredOverviewPlans(): ExecutiveLessonPlan[] {
    if (!this.overviewTeacherFilter) return this.plans;
    return this.plans.filter(p => p.teacherId === Number(this.overviewTeacherFilter));
  }

  resetOverviewFilter(): void {
    this.overviewTeacherFilter = null;
  }

  // --- SUBMODULE 5: SETTINGS ---
  saveSettings(): void {
    Swal.fire({
      icon: 'success',
      title: 'Settings Saved',
      text: 'Lesson plan module preferences and alert rules have been saved.',
      timer: 1600,
      showConfirmButton: false
    });
  }
}
