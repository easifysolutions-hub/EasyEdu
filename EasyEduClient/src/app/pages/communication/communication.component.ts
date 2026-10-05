import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface Notice {
  id: number;
  title: string;
  publishDate: string;
  noticeDate: string;
  targetAudience: 'All' | 'Students' | 'Parents' | 'Staff';
  isPinned: boolean;
  content: string;
  author: string;
}

interface SchoolEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Holiday' | 'Sports' | 'Academic' | 'Cultural';
  description: string;
}

interface MessageLog {
  id: string;
  channel: 'SMS' | 'Email' | 'WhatsApp';
  title: string;
  recipientsCount: number;
  date: string;
  status: 'Delivered' | 'Sent' | 'Failed';
  sender: string;
}

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  activeTab: 'notices' | 'sms' | 'email' | 'events' | 'logs' = 'notices';

  notices: Notice[] = [
    { id: 1, title: 'Annual Sports Day & Athletic Meet 2025 Schedule', publishDate: '2025-05-02', noticeDate: '2025-05-15', targetAudience: 'All', isPinned: true, content: 'The Annual Sports Meet will be inaugurated by the District Sports Council. All students must assemble on the main athletic ground in standard sports attire by 08:30 AM.', author: 'Principal Office' },
    { id: 2, title: 'Term 1 Mid-Semester Examination Date Sheet & Syllabus', publishDate: '2025-05-01', noticeDate: '2025-05-20', targetAudience: 'Students', isPinned: true, content: 'Detailed timetable and unit syllabus for Term 1 examinations has been published on the student portal. Admit cards will be issued from the examination cell.', author: 'Controller of Exams' },
    { id: 3, title: 'Quarter 1 Tuition & Transport Fee Due Date Notice', publishDate: '2025-04-28', noticeDate: '2025-05-15', targetAudience: 'Parents', isPinned: false, content: 'Parents are kindly requested to remit Q1 tuition fees before 15th May 2025 through the online parent payment portal or school cash counter.', author: 'Accounts Dept' },
    { id: 4, title: 'Staff Faculty Development Workshop on STEM Pedagogy', publishDate: '2025-04-25', noticeDate: '2025-05-10', targetAudience: 'Staff', isPinned: false, content: 'A full-day teacher training seminar on modern robotics and interactive pedagogy will be conducted in the Audio-Visual Seminar Hall.', author: 'Academic Director' }
  ];

  events: SchoolEvent[] = [
    { id: 1, title: 'Annual Inter-School Debate & Model UN', date: '2025-05-18', time: '09:00 AM - 04:00 PM', venue: 'Main Auditorium', category: 'Academic', description: 'Over 14 schools participating in Model United Nations debate competition.' },
    { id: 2, title: 'Founder\'s Day Celebrations & Cultural Gala', date: '2025-05-25', time: '05:00 PM - 08:30 PM', venue: 'Open Amphitheatre', category: 'Cultural', description: 'Music, drama, and awards ceremony for meritorious scholars.' },
    { id: 3, title: 'Buddha Purnima Institutional Holiday', date: '2025-05-12', time: 'Full Day', venue: 'Campus Closed', category: 'Holiday', description: 'School closed on account of public holiday.' },
    { id: 4, title: 'Science & Robotics Innovation Exhibition', date: '2025-06-02', time: '10:00 AM - 03:00 PM', venue: 'Senior STEM Labs', category: 'Academic', description: 'Working prototype display by junior and senior students.' }
  ];

  logs: MessageLog[] = [
    { id: 'LOG-9921', channel: 'WhatsApp', title: 'Q1 Fee Invoice Alert & Payment Link', recipientsCount: 1248, date: 'Today, 11:45 AM', status: 'Delivered', sender: 'System Auto-Trigger' },
    { id: 'LOG-9920', channel: 'SMS', title: 'Daily Attendance Absent Notification', recipientsCount: 24, date: 'Today, 09:30 AM', status: 'Delivered', sender: 'Attendance Module' },
    { id: 'LOG-9919', channel: 'Email', title: 'Monthly Newsletter - May 2025 Edition', recipientsCount: 1450, date: 'Yesterday, 04:00 PM', status: 'Sent', sender: 'Admin Communications' },
    { id: 'LOG-9918', channel: 'SMS', title: 'Sports Day Rehearsal Schedule Update', recipientsCount: 420, date: '02 May 2025', status: 'Delivered', sender: 'Sports Dept' }
  ];

  // Notice Modal
  showAddNoticeModal = false;
  newNotice: Partial<Notice> = {
    title: '',
    targetAudience: 'All',
    noticeDate: new Date().toISOString().substring(0, 10),
    isPinned: false,
    content: ''
  };

  // SMS Form
  smsForm = {
    targetGroup: 'All Parents',
    template: 'Custom Message',
    message: 'Dear Parent, this is an official reminder from EasyEdu Academy regarding upcoming academic assessments.'
  };

  // Email Form
  emailForm = {
    targetGroup: 'All Parents & Students',
    subject: '',
    message: ''
  };

  // Event Modal
  showAddEventModal = false;
  newEvent: Partial<SchoolEvent> = {
    title: '',
    date: new Date().toISOString().substring(0, 10),
    time: '09:00 AM - 01:00 PM',
    venue: 'Main Auditorium',
    category: 'Academic',
    description: ''
  };

  ngOnInit(): void {}

  saveNotice(): void {
    if (!this.newNotice.title || !this.newNotice.content) {
      Swal.fire('Missing Details', 'Please enter Notice Title and Message Body.', 'warning');
      return;
    }

    const n: Notice = {
      id: this.notices.length + 1,
      title: this.newNotice.title!,
      publishDate: new Date().toISOString().substring(0, 10),
      noticeDate: this.newNotice.noticeDate || new Date().toISOString().substring(0, 10),
      targetAudience: this.newNotice.targetAudience || 'All',
      isPinned: !!this.newNotice.isPinned,
      content: this.newNotice.content!,
      author: 'Administration Office'
    };

    if (n.isPinned) {
      this.notices.unshift(n);
    } else {
      this.notices.push(n);
    }

    this.showAddNoticeModal = false;
    this.newNotice = { title: '', targetAudience: 'All', noticeDate: new Date().toISOString().substring(0, 10), isPinned: false, content: '' };

    Swal.fire({
      title: 'Circular Published!',
      text: 'Notice posted to institutional bulletin board and portal feed.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  sendSmsBroadcast(): void {
    if (!this.smsForm.message) {
      Swal.fire('Empty Message', 'Please enter SMS body text.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Dispatch SMS Campaign?',
      text: `Send SMS to ${this.smsForm.targetGroup} via Cloud SMS Gateway?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Yes, Send Now'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.logs.unshift({
          id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
          channel: 'SMS',
          title: this.smsForm.message.substring(0, 40) + '...',
          recipientsCount: 450,
          date: 'Just Now',
          status: 'Delivered',
          sender: 'Logged-in Admin'
        });

        Swal.fire('Campaign Dispatched', 'SMS broadcast delivered to 450 mobile numbers.', 'success');
      }
    });
  }

  sendEmailBroadcast(): void {
    if (!this.emailForm.subject || !this.emailForm.message) {
      Swal.fire('Missing Content', 'Please enter Subject and Email Body.', 'warning');
      return;
    }

    this.logs.unshift({
      id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      channel: 'Email',
      title: this.emailForm.subject,
      recipientsCount: 1420,
      date: 'Just Now',
      status: 'Sent',
      sender: 'Logged-in Admin'
    });

    Swal.fire('Emails Dispatched', 'Newsletter broadcasted to 1,420 registered emails.', 'success');
  }

  saveEvent(): void {
    if (!this.newEvent.title) {
      Swal.fire('Missing Title', 'Please enter Event Title.', 'warning');
      return;
    }

    const ev: SchoolEvent = {
      id: this.events.length + 1,
      title: this.newEvent.title!,
      date: this.newEvent.date || '2025-06-01',
      time: this.newEvent.time || '09:00 AM',
      venue: this.newEvent.venue || 'Main Campus',
      category: this.newEvent.category || 'Academic',
      description: this.newEvent.description || 'Institutional event.'
    };

    this.events.push(ev);
    this.showAddEventModal = false;
    this.newEvent = { title: '', date: new Date().toISOString().substring(0, 10), time: '09:00 AM', venue: 'Main Auditorium', category: 'Academic' };

    Swal.fire('Event Scheduled', 'Calendar event added and synchronized with student calendar.', 'success');
  }
}
