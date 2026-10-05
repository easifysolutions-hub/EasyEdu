import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

declare const Swal: any;

export interface AcademicSection {
  id: number;
  name: string;
  isActive: boolean;
}

export interface AcademicClass {
  id: number;
  name: string;
  sections: { id: number; name: string }[];
  studentCount: number;
}

export interface AcademicSubject {
  id: number;
  name: string;
  code: string;
  type: 'Theory' | 'Practical';
  classIds: number[];
  className?: string;
  isOptional: boolean;
  teacher?: string;
}

export interface AssignedClassTeacher {
  id: number;
  classId: number;
  className: string;
  sectionId: number;
  sectionName: string;
  teacherId: number;
  teacherName: string;
  avatarInitial: string;
}

export interface AssignedSubject {
  id: number;
  classId: number;
  className: string;
  sectionId: number;
  sectionName: string;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
}

export interface AcademicClassRoom {
  id: number;
  roomNo: string;
  capacity: number;
  isActive: boolean;
}

export interface ClassRoutineEntry {
  id: number;
  classId: number;
  sectionId: number;
  dayOfWeek: string;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
  classRoomId: number;
  roomNo: string;
  startTime: string;
  endTime: string;
}

export interface StudentOptionalAssignment {
  studentId: number;
  admissionNo: string;
  studentName: string;
  profilePicture?: string;
  assignedSubjectId: number | null;
}

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);

  activeTab: 'classes' | 'sections' | 'subjects' | 'assign-teacher' | 'assign-subject' | 'class-rooms' | 'routine' | 'optional-subject' = 'classes';

  // Master Data Lists
  availableSections: AcademicSection[] = [
    { id: 1, name: 'Section A', isActive: true },
    { id: 2, name: 'Section B', isActive: true },
    { id: 3, name: 'Section C', isActive: true },
    { id: 4, name: 'Section D', isActive: true },
    { id: 5, name: 'Section PCM', isActive: true },
    { id: 6, name: 'Section PCB', isActive: true },
    { id: 7, name: 'Section Commerce', isActive: true }
  ];

  classes: AcademicClass[] = [
    { id: 1, name: 'Class 10', sections: [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }], studentCount: 42 },
    { id: 2, name: 'Class 9', sections: [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }], studentCount: 38 },
    { id: 3, name: 'Class 12 - Science', sections: [{ id: 5, name: 'Section PCM' }, { id: 6, name: 'Section PCB' }], studentCount: 45 },
    { id: 4, name: 'Class 11 - Commerce', sections: [{ id: 7, name: 'Section Commerce' }], studentCount: 30 },
    { id: 5, name: 'Class 8', sections: [{ id: 1, name: 'Section A' }, { id: 3, name: 'Section C' }], studentCount: 35 }
  ];

  subjects: AcademicSubject[] = [
    { id: 1, name: 'Mathematics - Calculus & Algebra', code: 'MATH101', type: 'Theory', classIds: [1, 2, 3], className: 'Class 10', isOptional: false, teacher: 'Dr. Abdul Hakeem' },
    { id: 2, name: 'Physics & Experimental Lab', code: 'PHY202', type: 'Practical', classIds: [1, 3], className: 'Class 12 - Science', isOptional: false, teacher: 'Prof. Sharief Abdull' },
    { id: 3, name: 'Chemistry - Organic & Inorganic', code: 'CHEM303', type: 'Theory', classIds: [1, 3], className: 'Class 12 - Science', isOptional: false, teacher: 'Mrs. Priya Nair' },
    { id: 4, name: 'Computer Science & Python', code: 'CS404', type: 'Practical', classIds: [1, 3, 4], className: 'Class 10', isOptional: true, teacher: 'Mr. Arvind Rao' },
    { id: 5, name: 'English Literature & Grammar', code: 'ENG505', type: 'Theory', classIds: [1, 2, 3, 4, 5], className: 'Class 10', isOptional: false, teacher: 'Ms. Sunita Joshi' },
    { id: 6, name: 'Physical Education & Sports', code: 'PED101', type: 'Practical', classIds: [1, 2, 3, 4], className: 'Class 10', isOptional: true, teacher: 'Coach Rajesh Kumar' },
    { id: 7, name: 'Sanskrit & Ancient Ethics', code: 'SKT201', type: 'Theory', classIds: [1, 2], className: 'Class 9', isOptional: true, teacher: 'Acharya Sharma' }
  ];

  teachers = [
    { id: 1, name: 'Dr. Abdul Hakeem' },
    { id: 2, name: 'Prof. Sharief Abdull' },
    { id: 3, name: 'Mrs. Priya Nair' },
    { id: 4, name: 'Mr. Arvind Rao' },
    { id: 5, name: 'Ms. Sunita Joshi' },
    { id: 6, name: 'Coach Rajesh Kumar' }
  ];

  classTeachers: AssignedClassTeacher[] = [
    { id: 1, classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', teacherId: 1, teacherName: 'Dr. Abdul Hakeem', avatarInitial: 'A' },
    { id: 2, classId: 1, className: 'Class 10', sectionId: 2, sectionName: 'Section B', teacherId: 3, teacherName: 'Mrs. Priya Nair', avatarInitial: 'P' },
    { id: 3, classId: 2, className: 'Class 9', sectionId: 1, sectionName: 'Section A', teacherId: 2, teacherName: 'Prof. Sharief Abdull', avatarInitial: 'S' },
    { id: 4, classId: 3, className: 'Class 12 - Science', sectionId: 5, sectionName: 'Section PCM', teacherId: 4, teacherName: 'Mr. Arvind Rao', avatarInitial: 'A' },
    { id: 5, classId: 4, className: 'Class 11 - Commerce', sectionId: 7, sectionName: 'Section Commerce', teacherId: 5, teacherName: 'Ms. Sunita Joshi', avatarInitial: 'S' }
  ];

  assignedSubjects: AssignedSubject[] = [
    { id: 1, classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 1, subjectName: 'Mathematics - Calculus & Algebra', teacherId: 1, teacherName: 'Dr. Abdul Hakeem' },
    { id: 2, classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 2, subjectName: 'Physics & Experimental Lab', teacherId: 2, teacherName: 'Prof. Sharief Abdull' },
    { id: 3, classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 3, subjectName: 'Chemistry - Organic & Inorganic', teacherId: 3, teacherName: 'Mrs. Priya Nair' },
    { id: 4, classId: 1, className: 'Class 10', sectionId: 1, sectionName: 'Section A', subjectId: 4, subjectName: 'Computer Science & Python', teacherId: 4, teacherName: 'Mr. Arvind Rao' },
    { id: 5, classId: 3, className: 'Class 12 - Science', sectionId: 5, sectionName: 'Section PCM', subjectId: 1, subjectName: 'Mathematics - Calculus & Algebra', teacherId: 1, teacherName: 'Dr. Abdul Hakeem' }
  ];

  classRooms: AcademicClassRoom[] = [
    { id: 1, roomNo: 'Room 101 - A Block', capacity: 45, isActive: true },
    { id: 2, roomNo: 'Room 102 - A Block', capacity: 45, isActive: true },
    { id: 3, roomNo: 'Physics Lab 201', capacity: 40, isActive: true },
    { id: 4, roomNo: 'Chemistry Lab 202', capacity: 40, isActive: true },
    { id: 5, roomNo: 'Computer Lab 301', capacity: 50, isActive: true },
    { id: 6, roomNo: 'Auditorium 001', capacity: 200, isActive: true }
  ];

  // Routine Matrix
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  routines: ClassRoutineEntry[] = [
    { id: 1, classId: 1, sectionId: 1, dayOfWeek: 'Monday', subjectId: 1, subjectName: 'Mathematics', teacherId: 1, teacherName: 'Dr. Abdul Hakeem', classRoomId: 1, roomNo: 'Room 101', startTime: '09:00', endTime: '09:45' },
    { id: 2, classId: 1, sectionId: 1, dayOfWeek: 'Monday', subjectId: 2, subjectName: 'Physics', teacherId: 2, teacherName: 'Prof. Sharief Abdull', classRoomId: 3, roomNo: 'Physics Lab', startTime: '09:45', endTime: '10:30' },
    { id: 3, classId: 1, sectionId: 1, dayOfWeek: 'Monday', subjectId: 3, subjectName: 'Chemistry', teacherId: 3, teacherName: 'Mrs. Priya Nair', classRoomId: 4, roomNo: 'Chemistry Lab', startTime: '10:45', endTime: '11:30' },
    { id: 4, classId: 1, sectionId: 1, dayOfWeek: 'Monday', subjectId: 4, subjectName: 'Computer Science', teacherId: 4, teacherName: 'Mr. Arvind Rao', classRoomId: 5, roomNo: 'Comp Lab', startTime: '11:30', endTime: '12:15' },
    { id: 5, classId: 1, sectionId: 1, dayOfWeek: 'Tuesday', subjectId: 2, subjectName: 'Physics', teacherId: 2, teacherName: 'Prof. Sharief Abdull', classRoomId: 1, roomNo: 'Room 101', startTime: '09:00', endTime: '09:45' },
    { id: 6, classId: 1, sectionId: 1, dayOfWeek: 'Tuesday', subjectId: 3, subjectName: 'Chemistry', teacherId: 3, teacherName: 'Mrs. Priya Nair', classRoomId: 1, roomNo: 'Room 101', startTime: '09:45', endTime: '10:30' },
    { id: 7, classId: 1, sectionId: 1, dayOfWeek: 'Wednesday', subjectId: 4, subjectName: 'Computer Science', teacherId: 4, teacherName: 'Mr. Arvind Rao', classRoomId: 5, roomNo: 'Comp Lab', startTime: '09:00', endTime: '10:30' },
    { id: 8, classId: 1, sectionId: 1, dayOfWeek: 'Thursday', subjectId: 1, subjectName: 'Mathematics', teacherId: 1, teacherName: 'Dr. Abdul Hakeem', classRoomId: 1, roomNo: 'Room 101', startTime: '09:00', endTime: '09:45' },
    { id: 9, classId: 1, sectionId: 1, dayOfWeek: 'Friday', subjectId: 5, subjectName: 'English Literature', teacherId: 5, teacherName: 'Ms. Sunita Joshi', classRoomId: 1, roomNo: 'Room 101', startTime: '09:00', endTime: '09:45' },
    { id: 10, classId: 1, sectionId: 1, dayOfWeek: 'Saturday', subjectId: 6, subjectName: 'Physical Education', teacherId: 6, teacherName: 'Coach Rajesh Kumar', classRoomId: 6, roomNo: 'Playground', startTime: '09:00', endTime: '10:30' }
  ];

  // Optional Subject Assignments
  studentsForOptional: StudentOptionalAssignment[] = [
    { studentId: 101, admissionNo: 'ADM-2025-001', studentName: 'Aarav Sharma', assignedSubjectId: 4 },
    { studentId: 102, admissionNo: 'ADM-2025-002', studentName: 'Diya Patel', assignedSubjectId: 6 },
    { studentId: 103, admissionNo: 'ADM-2025-003', studentName: 'Rohan Mehra', assignedSubjectId: 7 },
    { studentId: 104, admissionNo: 'ADM-2025-004', studentName: 'Ananya Iyer', assignedSubjectId: 4 },
    { studentId: 105, admissionNo: 'ADM-2025-005', studentName: 'Vikramaditya Rao', assignedSubjectId: null },
    { studentId: 106, admissionNo: 'ADM-2025-006', studentName: 'Zoya Siddiqui', assignedSubjectId: 6 }
  ];

  // Search Queries
  searchClassQuery = '';
  searchSectionQuery = '';
  searchSubjectQuery = '';
  searchTeacherQuery = '';
  searchAssignSubQuery = '';
  searchRoomQuery = '';

  // Form Models - Class
  newClass = { name: '', selectedSectionIds: [] as number[] };
  editingClass: { id: number; name: string; selectedSectionIds: number[] } | null = null;
  showEditClassModal = false;

  // Form Models - Section
  newSection = { name: '', isActive: true };
  editingSection: { id: number; name: string; isActive: boolean } | null = null;
  showEditSectionModal = false;

  // Form Models - Subject
  newSubject = { name: '', code: '', type: 'Theory' as 'Theory' | 'Practical', classIds: [] as number[], isOptional: false };
  editingSubject: { id: number; name: string; code: string; type: 'Theory' | 'Practical'; classId: number; isOptional: boolean } | null = null;
  showEditSubjectModal = false;

  // Form Models - Assign Class Teacher
  newAssignTeacher = { classId: null as number | null, sectionId: null as number | null, teacherId: null as number | null };
  availableSectionsForTeacher: { id: number; name: string }[] = [];

  // Form Models - Assign Subject
  newAssignSubject = { classId: null as number | null, sectionId: null as number | null, subjectId: null as number | null, teacherId: null as number | null };
  availableSectionsForAssignSub: { id: number; name: string }[] = [];
  availableSubjectsForAssignSub: AcademicSubject[] = [];

  // Form Models - Class Room
  newRoom = { roomNo: '', capacity: 40, isActive: true };
  editingRoom: { id: number; roomNo: string; capacity: number; isActive: boolean } | null = null;
  showEditRoomModal = false;

  // Form Models - Routine Search & Add
  routineFilter = { classId: 1, sectionId: 1 };
  routineSections: { id: number; name: string }[] = [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }];
  showAddRoutineModal = false;
  newRoutine = {
    dayOfWeek: 'Monday',
    subjectId: null as number | null,
    teacherId: null as number | null,
    classRoomId: null as number | null,
    startTime: '09:00',
    endTime: '09:45'
  };

  // Form Models - Optional Subject
  optionalSubjectFilter = { classId: 1 };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });

    const url = this.router.url.toLowerCase();
    if (url.includes('/classes')) {
      this.activeTab = 'classes';
    } else if (url.includes('/section')) {
      this.activeTab = 'sections';
    } else if (url.includes('/subjects')) {
      this.activeTab = 'subjects';
    } else if (url.includes('/assignclassteacher')) {
      this.activeTab = 'assign-teacher';
    } else if (url.includes('/assignsubject')) {
      this.activeTab = 'assign-subject';
    } else if (url.includes('/classroom')) {
      this.activeTab = 'class-rooms';
    } else if (url.includes('/classroutine') || url.includes('/timetable')) {
      this.activeTab = 'routine';
    } else if (url.includes('/optionalsubject')) {
      this.activeTab = 'optional-subject';
    }
  }

  setTab(tab: 'classes' | 'sections' | 'subjects' | 'assign-teacher' | 'assign-subject' | 'class-rooms' | 'routine' | 'optional-subject'): void {
    this.activeTab = tab;
  }

  // --- SUBMODULE 1: CLASSES ---
  isSectionSelected(sectionId: number, isEditing = false): boolean {
    if (isEditing && this.editingClass) {
      return this.editingClass.selectedSectionIds.includes(sectionId);
    }
    return this.newClass.selectedSectionIds.includes(sectionId);
  }

  toggleSectionForClass(sectionId: number, isEditing = false): void {
    if (isEditing && this.editingClass) {
      const idx = this.editingClass.selectedSectionIds.indexOf(sectionId);
      if (idx > -1) {
        this.editingClass.selectedSectionIds.splice(idx, 1);
      } else {
        this.editingClass.selectedSectionIds.push(sectionId);
      }
    } else {
      const idx = this.newClass.selectedSectionIds.indexOf(sectionId);
      if (idx > -1) {
        this.newClass.selectedSectionIds.splice(idx, 1);
      } else {
        this.newClass.selectedSectionIds.push(sectionId);
      }
    }
  }

  saveClass(): void {
    if (!this.newClass.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Class Name Required', text: 'Please enter a name for the class.' });
      return;
    }
    const matchedSections = this.availableSections
      .filter(s => this.newClass.selectedSectionIds.includes(s.id))
      .map(s => ({ id: s.id, name: s.name }));

    const newId = Date.now();
    const item: AcademicClass = {
      id: newId,
      name: this.newClass.name.trim(),
      sections: matchedSections.length > 0 ? matchedSections : [{ id: 1, name: 'Section A' }],
      studentCount: 0
    };
    this.classes.unshift(item);
    this.newClass = { name: '', selectedSectionIds: [] };
    Swal.fire({ icon: 'success', title: 'Class Saved', text: `${item.name} has been added successfully.`, timer: 1500, showConfirmButton: false });
  }

  openEditClass(cls: AcademicClass): void {
    this.editingClass = {
      id: cls.id,
      name: cls.name,
      selectedSectionIds: cls.sections.map(s => s.id)
    };
    this.showEditClassModal = true;
  }

  updateClass(): void {
    if (!this.editingClass || !this.editingClass.name.trim()) return;
    const target = this.classes.find(c => c.id === this.editingClass!.id);
    if (target) {
      target.name = this.editingClass.name.trim();
      target.sections = this.availableSections
        .filter(s => this.editingClass!.selectedSectionIds.includes(s.id))
        .map(s => ({ id: s.id, name: s.name }));
    }
    this.showEditClassModal = false;
    this.editingClass = null;
    Swal.fire({ icon: 'success', title: 'Class Updated', timer: 1200, showConfirmButton: false });
  }

  deleteClass(cls: AcademicClass): void {
    Swal.fire({
      title: 'Delete Class?',
      text: `Are you sure you want to delete ${cls.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.classes = this.classes.filter(c => c.id !== cls.id);
        Swal.fire({ icon: 'success', title: 'Class Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 2: SECTIONS ---
  saveSection(): void {
    if (!this.newSection.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Section Name Required', text: 'Please enter section name.' });
      return;
    }
    const item: AcademicSection = {
      id: Date.now(),
      name: this.newSection.name.trim(),
      isActive: this.newSection.isActive
    };
    this.availableSections.push(item);
    this.newSection = { name: '', isActive: true };
    Swal.fire({ icon: 'success', title: 'Section Created', text: `${item.name} added.`, timer: 1500, showConfirmButton: false });
  }

  openEditSection(sec: AcademicSection): void {
    this.editingSection = { ...sec };
    this.showEditSectionModal = true;
  }

  updateSection(): void {
    if (!this.editingSection || !this.editingSection.name.trim()) return;
    const target = this.availableSections.find(s => s.id === this.editingSection!.id);
    if (target) {
      target.name = this.editingSection.name.trim();
      target.isActive = this.editingSection.isActive;
    }
    this.showEditSectionModal = false;
    this.editingSection = null;
    Swal.fire({ icon: 'success', title: 'Section Updated', timer: 1200, showConfirmButton: false });
  }

  deleteSection(sec: AcademicSection): void {
    Swal.fire({
      title: 'Delete Section?',
      text: `Do you want to delete ${sec.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.availableSections = this.availableSections.filter(s => s.id !== sec.id);
        Swal.fire({ icon: 'success', title: 'Section Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 3: SUBJECTS ---
  isClassSelectedForSubject(classId: number): boolean {
    return this.newSubject.classIds.includes(classId);
  }

  toggleClassForSubject(classId: number): void {
    const idx = this.newSubject.classIds.indexOf(classId);
    if (idx > -1) {
      this.newSubject.classIds.splice(idx, 1);
    } else {
      this.newSubject.classIds.push(classId);
    }
  }

  saveSubject(): void {
    if (!this.newSubject.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Subject Name Required', text: 'Please enter subject name.' });
      return;
    }
    const targetClass = this.classes.find(c => this.newSubject.classIds.includes(c.id));
    const item: AcademicSubject = {
      id: Date.now(),
      name: this.newSubject.name.trim(),
      code: this.newSubject.code.trim() || 'SUB-' + Math.floor(100 + Math.random() * 900),
      type: this.newSubject.type,
      classIds: [...this.newSubject.classIds],
      className: targetClass ? targetClass.name : 'All Classes',
      isOptional: this.newSubject.isOptional,
      teacher: 'Assigned Faculty'
    };
    this.subjects.unshift(item);
    this.newSubject = { name: '', code: '', type: 'Theory', classIds: [], isOptional: false };
    Swal.fire({ icon: 'success', title: 'Subject Saved', text: `${item.name} added to subjects master.`, timer: 1500, showConfirmButton: false });
  }

  openEditSubject(sub: AcademicSubject): void {
    this.editingSubject = {
      id: sub.id,
      name: sub.name,
      code: sub.code,
      type: sub.type,
      classId: sub.classIds.length > 0 ? sub.classIds[0] : (this.classes[0]?.id || 1),
      isOptional: sub.isOptional
    };
    this.showEditSubjectModal = true;
  }

  updateSubject(): void {
    if (!this.editingSubject || !this.editingSubject.name.trim()) return;
    const target = this.subjects.find(s => s.id === this.editingSubject!.id);
    if (target) {
      target.name = this.editingSubject.name.trim();
      target.code = this.editingSubject.code.trim();
      target.type = this.editingSubject.type;
      target.isOptional = this.editingSubject.isOptional;
      target.classIds = [Number(this.editingSubject.classId)];
      const c = this.classes.find(cl => cl.id === Number(this.editingSubject!.classId));
      if (c) target.className = c.name;
    }
    this.showEditSubjectModal = false;
    this.editingSubject = null;
    Swal.fire({ icon: 'success', title: 'Subject Updated', timer: 1200, showConfirmButton: false });
  }

  deleteSubject(sub: AcademicSubject): void {
    Swal.fire({
      title: 'Remove Subject?',
      text: `Do you want to remove ${sub.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.subjects = this.subjects.filter(s => s.id !== sub.id);
        Swal.fire({ icon: 'success', title: 'Subject Removed', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 4: ASSIGN CLASS TEACHER ---
  onTeacherClassChange(): void {
    if (this.newAssignTeacher.classId) {
      const cls = this.classes.find(c => c.id === Number(this.newAssignTeacher.classId));
      this.availableSectionsForTeacher = cls ? cls.sections : [];
      this.newAssignTeacher.sectionId = this.availableSectionsForTeacher.length > 0 ? this.availableSectionsForTeacher[0].id : null;
    } else {
      this.availableSectionsForTeacher = [];
      this.newAssignTeacher.sectionId = null;
    }
  }

  saveAssignTeacher(): void {
    if (!this.newAssignTeacher.classId || !this.newAssignTeacher.sectionId || !this.newAssignTeacher.teacherId) {
      Swal.fire({ icon: 'warning', title: 'Fields Required', text: 'Please select class, section, and teacher.' });
      return;
    }
    const cls = this.classes.find(c => c.id === Number(this.newAssignTeacher.classId));
    const sec = this.availableSections.find(s => s.id === Number(this.newAssignTeacher.sectionId));
    const teacher = this.teachers.find(t => t.id === Number(this.newAssignTeacher.teacherId));

    if (!cls || !sec || !teacher) return;

    const item: AssignedClassTeacher = {
      id: Date.now(),
      classId: cls.id,
      className: cls.name,
      sectionId: sec.id,
      sectionName: sec.name,
      teacherId: teacher.id,
      teacherName: teacher.name,
      avatarInitial: teacher.name.charAt(0).toUpperCase()
    };
    this.classTeachers.unshift(item);
    this.newAssignTeacher = { classId: null, sectionId: null, teacherId: null };
    this.availableSectionsForTeacher = [];
    Swal.fire({ icon: 'success', title: 'Teacher Assigned', text: `${teacher.name} assigned to ${cls.name} (${sec.name}).`, timer: 1500, showConfirmButton: false });
  }

  deleteAssignTeacher(item: AssignedClassTeacher): void {
    Swal.fire({
      title: 'Remove Assignment?',
      text: `Remove ${item.teacherName} from ${item.className}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.classTeachers = this.classTeachers.filter(t => t.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Assignment Removed', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 5: ASSIGN SUBJECT ---
  onAssignSubClassChange(): void {
    if (this.newAssignSubject.classId) {
      const cls = this.classes.find(c => c.id === Number(this.newAssignSubject.classId));
      this.availableSectionsForAssignSub = cls ? cls.sections : [];
      this.newAssignSubject.sectionId = this.availableSectionsForAssignSub.length > 0 ? this.availableSectionsForAssignSub[0].id : null;
      
      this.availableSubjectsForAssignSub = this.subjects.filter(s => s.classIds.includes(Number(this.newAssignSubject.classId)));
      if (this.availableSubjectsForAssignSub.length === 0) {
        this.availableSubjectsForAssignSub = this.subjects;
      }
      this.newAssignSubject.subjectId = this.availableSubjectsForAssignSub[0]?.id || null;
    } else {
      this.availableSectionsForAssignSub = [];
      this.availableSubjectsForAssignSub = [];
      this.newAssignSubject.sectionId = null;
      this.newAssignSubject.subjectId = null;
    }
  }

  saveAssignSubject(): void {
    if (!this.newAssignSubject.classId || !this.newAssignSubject.sectionId || !this.newAssignSubject.subjectId || !this.newAssignSubject.teacherId) {
      Swal.fire({ icon: 'warning', title: 'Fields Required', text: 'Please select class, section, subject and teacher.' });
      return;
    }
    const cls = this.classes.find(c => c.id === Number(this.newAssignSubject.classId));
    const sec = this.availableSections.find(s => s.id === Number(this.newAssignSubject.sectionId));
    const sub = this.subjects.find(s => s.id === Number(this.newAssignSubject.subjectId));
    const teacher = this.teachers.find(t => t.id === Number(this.newAssignSubject.teacherId));

    if (!cls || !sec || !sub || !teacher) return;

    const item: AssignedSubject = {
      id: Date.now(),
      classId: cls.id,
      className: cls.name,
      sectionId: sec.id,
      sectionName: sec.name,
      subjectId: sub.id,
      subjectName: sub.name,
      teacherId: teacher.id,
      teacherName: teacher.name
    };
    this.assignedSubjects.unshift(item);
    this.newAssignSubject = { classId: null, sectionId: null, subjectId: null, teacherId: null };
    this.availableSectionsForAssignSub = [];
    this.availableSubjectsForAssignSub = [];
    Swal.fire({ icon: 'success', title: 'Subject Assigned', text: `${sub.name} allocated to ${cls.name} (${sec.name}).`, timer: 1500, showConfirmButton: false });
  }

  deleteAssignSubject(item: AssignedSubject): void {
    Swal.fire({
      title: 'Remove Allocation?',
      text: `Remove ${item.subjectName} allocation?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.assignedSubjects = this.assignedSubjects.filter(s => s.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Allocation Removed', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 6: CLASS ROOM ---
  saveClassRoom(): void {
    if (!this.newRoom.roomNo.trim()) {
      Swal.fire({ icon: 'warning', title: 'Room No Required', text: 'Please enter room number.' });
      return;
    }
    const item: AcademicClassRoom = {
      id: Date.now(),
      roomNo: this.newRoom.roomNo.trim(),
      capacity: this.newRoom.capacity || 40,
      isActive: this.newRoom.isActive
    };
    this.classRooms.push(item);
    this.newRoom = { roomNo: '', capacity: 40, isActive: true };
    Swal.fire({ icon: 'success', title: 'Class Room Saved', text: `${item.roomNo} is ready for scheduling.`, timer: 1500, showConfirmButton: false });
  }

  openEditRoom(room: AcademicClassRoom): void {
    this.editingRoom = { ...room };
    this.showEditRoomModal = true;
  }

  updateRoom(): void {
    if (!this.editingRoom || !this.editingRoom.roomNo.trim()) return;
    const target = this.classRooms.find(r => r.id === this.editingRoom!.id);
    if (target) {
      target.roomNo = this.editingRoom.roomNo.trim();
      target.capacity = this.editingRoom.capacity;
      target.isActive = this.editingRoom.isActive;
    }
    this.showEditRoomModal = false;
    this.editingRoom = null;
    Swal.fire({ icon: 'success', title: 'Room Updated', timer: 1200, showConfirmButton: false });
  }

  deleteRoom(room: AcademicClassRoom): void {
    Swal.fire({
      title: 'Delete Class Room?',
      text: `Are you sure you want to delete ${room.roomNo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.classRooms = this.classRooms.filter(r => r.id !== room.id);
        Swal.fire({ icon: 'success', title: 'Class Room Deleted', timer: 1200, showConfirmButton: false });
      }
    });
  }

  // --- SUBMODULE 7: CLASS ROUTINE ---
  onRoutineClassChange(): void {
    const cls = this.classes.find(c => c.id === Number(this.routineFilter.classId));
    this.routineSections = cls ? cls.sections : [];
    this.routineFilter.sectionId = this.routineSections.length > 0 ? this.routineSections[0].id : 1;
  }

  getRoutinesForDay(day: string): ClassRoutineEntry[] {
    return this.routines.filter(r => 
      r.classId === Number(this.routineFilter.classId) && 
      r.sectionId === Number(this.routineFilter.sectionId) && 
      r.dayOfWeek === day
    );
  }

  openAddRoutine(): void {
    this.newRoutine = {
      dayOfWeek: 'Monday',
      subjectId: this.subjects[0]?.id || null,
      teacherId: this.teachers[0]?.id || null,
      classRoomId: this.classRooms[0]?.id || null,
      startTime: '09:00',
      endTime: '09:45'
    };
    this.showAddRoutineModal = true;
  }

  saveRoutine(): void {
    if (!this.newRoutine.subjectId || !this.newRoutine.teacherId || !this.newRoutine.classRoomId) {
      Swal.fire({ icon: 'warning', title: 'Fields Required', text: 'Please fill all routine details.' });
      return;
    }
    const sub = this.subjects.find(s => s.id === Number(this.newRoutine.subjectId));
    const teacher = this.teachers.find(t => t.id === Number(this.newRoutine.teacherId));
    const room = this.classRooms.find(r => r.id === Number(this.newRoutine.classRoomId));

    if (!sub || !teacher || !room) return;

    const item: ClassRoutineEntry = {
      id: Date.now(),
      classId: Number(this.routineFilter.classId),
      sectionId: Number(this.routineFilter.sectionId),
      dayOfWeek: this.newRoutine.dayOfWeek,
      subjectId: sub.id,
      subjectName: sub.name,
      teacherId: teacher.id,
      teacherName: teacher.name,
      classRoomId: room.id,
      roomNo: room.roomNo,
      startTime: this.newRoutine.startTime,
      endTime: this.newRoutine.endTime
    };
    this.routines.push(item);
    this.showAddRoutineModal = false;
    Swal.fire({ icon: 'success', title: 'Routine Saved', text: `Slot added for ${item.dayOfWeek}.`, timer: 1500, showConfirmButton: false });
  }

  deleteRoutine(item: ClassRoutineEntry): void {
    Swal.fire({
      title: 'Delete Routine Slot?',
      text: `Remove ${item.subjectName} on ${item.dayOfWeek}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.routines = this.routines.filter(r => r.id !== item.id);
        Swal.fire({ icon: 'success', title: 'Routine Removed', timer: 1200, showConfirmButton: false });
      }
    });
  }

  printRoutine(): void {
    window.print();
  }

  // --- SUBMODULE 8: OPTIONAL SUBJECT ---
  getOptionalSubjectsForClass(): AcademicSubject[] {
    return this.subjects.filter(s => s.isOptional);
  }

  saveOptionalAssignments(): void {
    Swal.fire({
      icon: 'success',
      title: 'Assignments Saved',
      text: 'Student optional subject choices recorded successfully.',
      timer: 1600,
      showConfirmButton: false
    });
  }

  // Helpers
  getSelectedClassName(): string {
    const cls = this.classes.find(c => c.id === Number(this.routineFilter.classId));
    return cls ? cls.name : 'Class';
  }

  getSelectedSectionName(): string {
    const sec = this.availableSections.find(s => s.id === Number(this.routineFilter.sectionId));
    return sec ? sec.name : 'Section';
  }
}
