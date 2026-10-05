import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface LessonTopic {
  id: number;
  lessonName: string;
  topicTitle: string;
  subject: string;
  class: string;
  teacher: string;
  plannedDate: string;
  completionDate?: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

interface SyllabusProgress {
  subject: string;
  class: string;
  totalChapters: number;
  completedChapters: number;
  percentage: number;
  teacher: string;
}

@Component({
  selector: 'app-lesson-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.css']
})
export class LessonPlanComponent implements OnInit {
  activeTab: 'tracker' | 'topics' | 'add' = 'tracker';

  progressList: SyllabusProgress[] = [
    { subject: 'Mathematics', class: 'Grade 10-A', totalChapters: 15, completedChapters: 12, percentage: 80, teacher: 'Dr. Ramesh Sharma' },
    { subject: 'Physics', class: 'Grade 10-A', totalChapters: 12, completedChapters: 10, percentage: 83.3, teacher: 'Sunita Nair' },
    { subject: 'Chemistry', class: 'Grade 10-A', totalChapters: 14, completedChapters: 9, percentage: 64.2, teacher: 'Dr. Ramesh Sharma' },
    { subject: 'Computer Science', class: 'Grade 11-Science', totalChapters: 10, completedChapters: 9, percentage: 90, teacher: 'Prof. Rajesh Khanna' },
    { subject: 'English Literature', class: 'Grade 9-A', totalChapters: 16, completedChapters: 14, percentage: 87.5, teacher: 'Pooja Hegde' }
  ];

  topics: LessonTopic[] = [
    { id: 1, lessonName: 'Chapter 4: Trigonometric Identities', topicTitle: 'Section 4.1: Sine & Cosine Compound Angles', subject: 'Mathematics', class: 'Grade 10-A', teacher: 'Dr. Ramesh Sharma', plannedDate: '2025-05-02', completionDate: '2025-05-02', status: 'Completed' },
    { id: 2, lessonName: 'Chapter 4: Trigonometric Identities', topicTitle: 'Section 4.2: Heights & Distance Real-world Problems', subject: 'Mathematics', class: 'Grade 10-A', teacher: 'Dr. Ramesh Sharma', plannedDate: '2025-05-05', status: 'In Progress' },
    { id: 3, lessonName: 'Chapter 5: Light - Reflection & Refraction', topicTitle: 'Section 5.3: Lens Formula Numerical Workshop', subject: 'Physics', class: 'Grade 10-A', teacher: 'Sunita Nair', plannedDate: '2025-05-04', completionDate: '2025-05-04', status: 'Completed' },
    { id: 4, lessonName: 'Chapter 6: Python Object-Oriented Design', topicTitle: 'Section 6.1: Classes, Methods & Constructors (__init__)', subject: 'Computer Science', class: 'Grade 11-Science', teacher: 'Prof. Rajesh Khanna', plannedDate: '2025-05-06', status: 'Upcoming' }
  ];

  // Add Lesson / Topic Form
  newTopic = {
    lessonName: '',
    topicTitle: '',
    subject: 'Mathematics',
    class: 'Grade 10-A',
    teacher: 'Dr. Ramesh Sharma',
    plannedDate: new Date().toISOString().substring(0, 10)
  };

  ngOnInit(): void {}

  markCompleted(t: LessonTopic): void {
    t.status = 'Completed';
    t.completionDate = new Date().toISOString().substring(0, 10);
    Swal.fire('Topic Completed', `"${t.topicTitle}" marked as taught and completed.`, 'success');
  }

  saveTopic(): void {
    if (!this.newTopic.lessonName || !this.newTopic.topicTitle) {
      Swal.fire('Missing Information', 'Please provide Lesson Name and Topic Title.', 'warning');
      return;
    }

    const t: LessonTopic = {
      id: this.topics.length + 1,
      lessonName: this.newTopic.lessonName,
      topicTitle: this.newTopic.topicTitle,
      subject: this.newTopic.subject,
      class: this.newTopic.class,
      teacher: this.newTopic.teacher,
      plannedDate: this.newTopic.plannedDate,
      status: 'Upcoming'
    };

    this.topics.push(t);
    this.activeTab = 'topics';
    this.newTopic = { lessonName: '', topicTitle: '', subject: 'Mathematics', class: 'Grade 10-A', teacher: 'Dr. Ramesh Sharma', plannedDate: new Date().toISOString().substring(0, 10) };

    Swal.fire('Topic Added', 'New lesson topic added to teaching plan.', 'success');
  }
}
