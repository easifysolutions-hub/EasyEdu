import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../../core/services/currency.service';

declare const Swal: any;

export interface LmsCourse {
  id: number;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Masterclass';
  instructor: string;
  price: number;
  enrolledStudents: number;
  lessonsCount: number;
  rating: number;
  status: 'Published' | 'Pending Verification' | 'Draft';
  thumbnailUrl: string;
}

export interface LmsEnrollmentLog {
  id: string;
  studentName: string;
  courseTitle: string;
  enrolledDate: string;
  progressPercent: number;
  status: 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-lms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lms.component.html',
  styleUrls: ['./lms.component.css']
})
export class LmsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  currencyService = inject(CurrencyService);

  activeTab: 'hub' | 'all-courses' | 'add-course' | 'pending' | 'category' | 'level' | 'enrollments' | 'purchases' | 'invoices' | 'settings' = 'hub';

  courses: LmsCourse[] = [
    { id: 1, title: 'Mastering Python & AI Machine Learning Basics', category: 'Computer Science', level: 'Intermediate', instructor: 'Prof. Rajesh Khanna', price: 1499, enrolledStudents: 124, lessonsCount: 32, rating: 4.9, status: 'Published', thumbnailUrl: 'assets/images/python-course.jpg' },
    { id: 2, title: 'Calculus & Advanced Trigonometric Physics', category: 'Mathematics', level: 'Advanced', instructor: 'Sunita Nair', price: 999, enrolledStudents: 88, lessonsCount: 24, rating: 4.8, status: 'Published', thumbnailUrl: 'assets/images/math-course.jpg' },
    { id: 3, title: 'Spoken English Fluency & Public Oratory', category: 'Language & Arts', level: 'Beginner', instructor: 'Pooja Hegde', price: 799, enrolledStudents: 210, lessonsCount: 18, rating: 4.7, status: 'Published', thumbnailUrl: 'assets/images/english-course.jpg' },
    { id: 4, title: 'Organic Chemistry Reaction Mechanisms & Synthesis', category: 'Science', level: 'Masterclass', instructor: 'Dr. Ramesh Sharma', price: 1200, enrolledStudents: 45, lessonsCount: 28, rating: 4.9, status: 'Pending Verification', thumbnailUrl: 'assets/images/chem-course.jpg' }
  ];

  categories = [
    { id: 1, name: 'Computer Science & Coding', courseCount: 14, icon: 'fa-code' },
    { id: 2, name: 'Mathematics & Pure Sciences', courseCount: 22, icon: 'fa-square-root-alt' },
    { id: 3, name: 'Language, Arts & Communication', courseCount: 18, icon: 'fa-language' },
    { id: 4, name: 'Commerce & Financial Literacy', courseCount: 9, icon: 'fa-chart-line' }
  ];

  levels = [
    { id: 1, name: 'Foundation / Beginner', badgeColor: 'bg-info', description: 'Primary concepts and fundamental prerequisites' },
    { id: 2, name: 'Intermediate', badgeColor: 'bg-primary', description: 'Hands-on problem solving and project building' },
    { id: 3, name: 'Advanced Competitive', badgeColor: 'bg-warning', description: 'Olympiad, JEE, NEET, and Advanced Boards' },
    { id: 4, name: 'Masterclass Capstone', badgeColor: 'bg-danger', description: 'Research papers and industry practicals' }
  ];

  enrollments: LmsEnrollmentLog[] = [
    { id: 'ENR-881', studentName: 'Aarav Sharma', courseTitle: 'Mastering Python & AI Machine Learning Basics', enrolledDate: '02 May 2025', progressPercent: 75, status: 'In Progress' },
    { id: 'ENR-882', studentName: 'Diya Patel', courseTitle: 'Calculus & Advanced Trigonometric Physics', enrolledDate: '28 Apr 2025', progressPercent: 100, status: 'Completed' },
    { id: 'ENR-883', studentName: 'Kabir Singh', courseTitle: 'Mastering Python & AI Machine Learning Basics', enrolledDate: '01 May 2025', progressPercent: 40, status: 'In Progress' }
  ];

  newCourse = {
    title: '',
    category: 'Computer Science & Coding',
    level: 'Intermediate' as any,
    instructor: 'Prof. Rajesh Khanna',
    price: 999,
    description: ''
  };

  lmsSettings = {
    allowSelfEnrollment: true,
    enableCourseCertificates: true,
    requireAdminApprovalForTeacherCourses: true,
    enableDripContent: true,
    videoStreamingEngine: 'HLS Adaptive Bitrate'
  };

  ngOnInit(): void {
    this.syncRoute();
    this.route.url.subscribe(() => this.syncRoute());
  }

  private syncRoute(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('allcourses')) this.activeTab = 'all-courses';
    else if (path.includes('addcourse')) this.activeTab = 'add-course';
    else if (path.includes('pendingcourse') || path.includes('pending')) this.activeTab = 'pending';
    else if (path.includes('categorylist') || path.includes('category')) this.activeTab = 'category';
    else if (path.includes('courselevel') || path.includes('level')) this.activeTab = 'level';
    else if (path.includes('enrollmenthistory') || path.includes('enrollment')) this.activeTab = 'enrollments';
    else if (path.includes('purchaselog') || path.includes('purchase')) this.activeTab = 'purchases';
    else if (path.includes('feesinvoice') || path.includes('invoice')) this.activeTab = 'invoices';
    else if (path.includes('settings')) this.activeTab = 'settings';
    else this.activeTab = 'hub';
  }

  saveNewCourse(): void {
    if (!this.newCourse.title) {
      Swal.fire('Missing Title', 'Please enter course title.', 'warning');
      return;
    }
    const c: LmsCourse = {
      id: this.courses.length + 1,
      title: this.newCourse.title,
      category: this.newCourse.category,
      level: this.newCourse.level,
      instructor: this.newCourse.instructor,
      price: Number(this.newCourse.price) || 0,
      enrolledStudents: 0,
      lessonsCount: 1,
      rating: 5.0,
      status: 'Published',
      thumbnailUrl: 'assets/images/course.jpg'
    };
    this.courses.unshift(c);
    this.activeTab = 'all-courses';
    Swal.fire('Course Published', 'Course deployed to LMS catalog.', 'success');
  }

  saveSettings(): void {
    Swal.fire('Settings Saved', 'LMS video streaming and enrollment engine updated.', 'success');
  }
}
