import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface TeacherRating {
  id: number;
  teacherName: string;
  department: string;
  designation: string;
  totalReviews: number;
  avgRating: number;
  clarity: number;
  punctuality: number;
  subjectMastery: number;
  studentInteraction: number;
  status: 'Top Rated' | 'Satisfactory' | 'Needs Improvement';
}

interface FeedbackEntry {
  id: number;
  studentName: string;
  className: string;
  teacherName: string;
  subject: string;
  date: string;
  rating: number;
  comment: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-teacher-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-evaluation.component.html',
  styleUrls: ['./teacher-evaluation.component.css']
})
export class TeacherEvaluationComponent {
  activeTab: 'teachers' | 'approved' | 'pending' | 'submit' | 'settings' = 'teachers';
  searchTerm = '';

  teachers: TeacherRating[] = [
    { id: 1, teacherName: 'Dr. Ramesh Sharma', department: 'Science & Physics', designation: 'Senior Faculty', totalReviews: 128, avgRating: 4.9, clarity: 4.9, punctuality: 4.8, subjectMastery: 5.0, studentInteraction: 4.8, status: 'Top Rated' },
    { id: 2, teacherName: 'Prof. Ananya Iyer', department: 'Mathematics', designation: 'Head of Dept', totalReviews: 142, avgRating: 4.8, clarity: 4.7, punctuality: 5.0, subjectMastery: 4.9, studentInteraction: 4.6, status: 'Top Rated' },
    { id: 3, teacherName: 'Mr. Vikram Malhotra', department: 'Computer Science', designation: 'Assistant Professor', totalReviews: 95, avgRating: 4.7, clarity: 4.8, punctuality: 4.6, subjectMastery: 4.8, studentInteraction: 4.7, status: 'Top Rated' },
    { id: 4, teacherName: 'Mrs. Sunita Rao', department: 'English & Literature', designation: 'Senior Lecturer', totalReviews: 84, avgRating: 4.5, clarity: 4.6, punctuality: 4.4, subjectMastery: 4.7, studentInteraction: 4.3, status: 'Satisfactory' },
    { id: 5, teacherName: 'Mr. Suresh Menon', department: 'Social Studies', designation: 'Lecturer', totalReviews: 60, avgRating: 3.9, clarity: 3.8, punctuality: 4.0, subjectMastery: 4.1, studentInteraction: 3.7, status: 'Needs Improvement' }
  ];

  feedbacks: FeedbackEntry[] = [
    { id: 1, studentName: 'Aarav Sharma', className: 'Grade 10-A', teacherName: 'Dr. Ramesh Sharma', subject: 'Physics', date: 'Yesterday', rating: 5, comment: 'Exceptional explanations of electromagnetic induction. Lab demonstrations make concepts crystal clear!', status: 'Approved' },
    { id: 2, studentName: 'Diya Patel', className: 'Grade 10-B', teacherName: 'Prof. Ananya Iyer', subject: 'Mathematics', date: '02 May 2025', rating: 5, comment: 'Always patient during doubt-clearing sessions. Great shortcut methods for solving quadratic equations.', status: 'Approved' },
    { id: 3, studentName: 'Rohan Gupta', className: 'Grade 9-A', teacherName: 'Mr. Vikram Malhotra', subject: 'Python CS', date: '03 May 2025', rating: 5, comment: 'Hands-on coding exercises help us build real software projects.', status: 'Approved' },
    { id: 4, studentName: 'Kabir Singh', className: 'Grade 11-Science', teacherName: 'Mr. Suresh Menon', subject: 'History', date: 'Today, 09:15 AM', rating: 3, comment: 'Lectures feel a bit fast-paced. More multimedia presentations would make the timeline easier to follow.', status: 'Pending' },
    { id: 5, studentName: 'Meera Nair', className: 'Grade 10-A', teacherName: 'Mrs. Sunita Rao', subject: 'English', date: 'Today, 10:45 AM', rating: 4, comment: 'Grammar practice and essay writing critiques are very helpful.', status: 'Pending' }
  ];

  newFeedback = {
    teacherName: 'Dr. Ramesh Sharma',
    subject: 'Physics',
    studentName: 'Aarav Sharma',
    className: 'Grade 10-A',
    rating: 5,
    clarity: 5,
    punctuality: 5,
    interaction: 5,
    comment: ''
  };

  get pendingFeedbacks(): FeedbackEntry[] {
    return this.feedbacks.filter(f => f.status === 'Pending');
  }

  get approvedFeedbacks(): FeedbackEntry[] {
    return this.feedbacks.filter(f => f.status === 'Approved');
  }

  approveFeedback(fb: FeedbackEntry): void {
    fb.status = 'Approved';
    Swal.fire('Feedback Approved', 'Student feedback has been published to evaluation report.', 'success');
  }

  rejectFeedback(fb: FeedbackEntry): void {
    fb.status = 'Rejected';
    Swal.fire('Feedback Moderated', 'Feedback has been archived/rejected.', 'info');
  }

  submitNewFeedback(): void {
    if (!this.newFeedback.comment) {
      Swal.fire('Missing Feedback', 'Please provide descriptive comments on teacher performance.', 'warning');
      return;
    }

    this.feedbacks.unshift({
      id: this.feedbacks.length + 1,
      studentName: this.newFeedback.studentName,
      className: this.newFeedback.className,
      teacherName: this.newFeedback.teacherName,
      subject: this.newFeedback.subject,
      date: 'Just Now',
      rating: Number(this.newFeedback.rating),
      comment: this.newFeedback.comment,
      status: 'Approved'
    });

    this.newFeedback.comment = '';
    this.activeTab = 'approved';

    Swal.fire('Evaluation Submitted!', 'Thank you! Your teacher evaluation has been recorded.', 'success');
  }
}
