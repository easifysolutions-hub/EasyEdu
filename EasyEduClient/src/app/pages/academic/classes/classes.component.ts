import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ClassItem } from '../../../core/models';

declare const Swal: any;

export interface SubjectItem {
  id: number;
  name: string;
  code: string;
  type: 'Theory' | 'Practical';
  teacher: string;
}

export interface TimetableSlot {
  day: string;
  period1: string;
  period2: string;
  period3: string;
  period4: string;
  period5: string;
}

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  private api = inject(ApiService);
  activeTab: 'classes' | 'subjects' | 'timetable' = 'classes';

  classes: ClassItem[] = [
    { id: 1, name: 'Grade 10', sections: [{ id: 1, name: 'Section A', classId: 1 }, { id: 2, name: 'Section B', classId: 1 }] },
    { id: 2, name: 'Grade 9', sections: [{ id: 3, name: 'Section A', classId: 2 }, { id: 4, name: 'Section B', classId: 2 }] },
    { id: 3, name: 'Grade 12 - Science', sections: [{ id: 5, name: 'Section PCM', classId: 3 }, { id: 6, name: 'Section PCB', classId: 3 }] },
    { id: 4, name: 'Grade 11 - Commerce', sections: [{ id: 7, name: 'Section A', classId: 4 }] }
  ];

  subjects: SubjectItem[] = [
    { id: 1, name: 'Mathematics - Calculus & Algebra', code: 'MATH-101', type: 'Theory', teacher: 'Dr. Abdul Hakeem' },
    { id: 2, name: 'Physics & Experimental Lab', code: 'PHY-202', type: 'Practical', teacher: 'Prof. Sharief Abdull' },
    { id: 3, name: 'Chemistry - Organic & Inorganic', code: 'CHEM-303', type: 'Theory', teacher: 'Mrs. Priya Nair' },
    { id: 4, name: 'Computer Science & Python', code: 'CS-404', type: 'Practical', teacher: 'Mr. Arvind Rao' },
    { id: 5, name: 'English Literature & Grammar', code: 'ENG-505', type: 'Theory', teacher: 'Ms. Sunita Joshi' }
  ];

  timetableSlots: TimetableSlot[] = [
    { day: 'Monday', period1: 'Maths (Hakeem)', period2: 'Physics (Sharief)', period3: 'Chemistry (Priya)', period4: 'CS Lab (Arvind)', period5: 'English' },
    { day: 'Tuesday', period1: 'Physics (Sharief)', period2: 'Chemistry (Priya)', period3: 'Maths (Hakeem)', period4: 'English', period5: 'Sports' },
    { day: 'Wednesday', period1: 'CS Lab (Arvind)', period2: 'CS Lab (Arvind)', period3: 'Physics Lab', period4: 'Maths', period5: 'Library' },
    { day: 'Thursday', period1: 'Chemistry (Priya)', period2: 'Maths (Hakeem)', period3: 'English', period4: 'Physics (Sharief)', period5: 'Biology' },
    { day: 'Friday', period1: 'Maths (Hakeem)', period2: 'CS Theory', period3: 'Physics Lab', period4: 'Chemistry Lab', period5: 'Activity' },
    { day: 'Saturday', period1: 'Weekly Test', period2: 'Doubt Clearing', period3: 'Maths', period4: 'Seminar', period5: 'Sports' }
  ];

  newClassName = '';
  newSectionName = '';
  selectedClassForSection: ClassItem | null = null;
  showSectionModal = false;

  showSubjectModal = false;
  newSubject: Partial<SubjectItem> = {
    name: '',
    code: '',
    type: 'Theory',
    teacher: 'Dr. Abdul Hakeem'
  };

  ngOnInit(): void {
    this.api.getClasses().subscribe(res => {
      if (res && res.length > 0) {
        this.classes = res;
      }
    });
  }

  addClass(): void {
    if (!this.newClassName.trim()) return;
    const newCls: ClassItem = {
      id: Date.now(),
      name: this.newClassName.trim(),
      sections: [{ id: 1, name: 'Section A', classId: Date.now() }]
    };
    this.classes.push(newCls);
    this.newClassName = '';
    Swal.fire({ icon: 'success', title: 'Class Created', text: `${newCls.name} added to curriculum.`, timer: 1500, showConfirmButton: false });
  }

  openAddSection(cls: ClassItem): void {
    this.selectedClassForSection = cls;
    this.newSectionName = '';
    this.showSectionModal = true;
  }

  saveSection(): void {
    if (!this.selectedClassForSection || !this.newSectionName.trim()) return;
    if (!this.selectedClassForSection.sections) {
      this.selectedClassForSection.sections = [];
    }
    this.selectedClassForSection.sections.push({
      id: Date.now(),
      name: this.newSectionName.trim(),
      classId: this.selectedClassForSection.id
    });
    this.showSectionModal = false;
    Swal.fire({ icon: 'success', title: 'Section Added', text: `Added to ${this.selectedClassForSection.name}.`, timer: 1500, showConfirmButton: false });
  }

  deleteClass(cls: ClassItem): void {
    Swal.fire({
      title: 'Delete Class?',
      text: `Are you sure you want to delete ${cls.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancel'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.classes = this.classes.filter(c => c.id !== cls.id);
        Swal.fire({ icon: 'success', title: 'Class Removed', timer: 1200, showConfirmButton: false });
      }
    });
  }

  addSubject(): void {
    if (!this.newSubject.name || !this.newSubject.code) return;
    this.subjects.push({
      id: Date.now(),
      name: this.newSubject.name,
      code: this.newSubject.code,
      type: this.newSubject.type || 'Theory',
      teacher: this.newSubject.teacher || 'Assigned Faculty'
    });
    this.showSubjectModal = false;
    this.newSubject = { name: '', code: '', type: 'Theory', teacher: 'Dr. Abdul Hakeem' };
    Swal.fire({ icon: 'success', title: 'Subject Added', text: 'New subject course master created.', timer: 1500, showConfirmButton: false });
  }

  deleteSubject(sub: SubjectItem): void {
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
        Swal.fire({ icon: 'success', title: 'Removed', timer: 1200, showConfirmButton: false });
      }
    });
  }
}
