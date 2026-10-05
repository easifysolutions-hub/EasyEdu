import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

declare const Swal: any;

export interface Notice {
  id: number;
  title: string;
  publishDate: string;
  noticeDate: string;
  targetAudience: 'All Stakeholders' | 'Students Only' | 'Academic Staff' | 'Guardians / Parents';
  isActive: boolean;
  content: string;
  author: string;
}

export interface SchoolEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Holiday' | 'Sports' | 'Academic' | 'Cultural';
  description: string;
}

export interface MessageLog {
  id: string;
  channel: 'SMS' | 'Email' | 'WhatsApp';
  title: string;
  recipientsCount: number;
  date: string;
  status: 'Delivered' | 'Sent' | 'Failed';
  sender: string;
}

export interface MessageTemplate {
  id: number;
  name: string;
  type: 'Email' | 'SMS';
  subject?: string;
  body: string;
  isActive: boolean;
  dltId?: string;
}

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  activeTab: 'notice-board' | 'send-email' | 'message-log' | 'event-list' | 'calendar' | 'email-templates' | 'sms-templates' = 'notice-board';
  sendChannel: 'email' | 'sms' | 'whatsapp' = 'email';

  // Notices
  notices: Notice[] = [
    { id: 1, title: 'Annual Sports Day & Athletic Meet 2026 Schedule', publishDate: '2026-10-04', noticeDate: '2026-10-15', targetAudience: 'All Stakeholders', isActive: true, content: 'The Annual Sports Meet will be inaugurated by the District Sports Council. All students must assemble on the main athletic ground in standard sports attire by 08:30 AM.', author: 'Principal Office' },
    { id: 2, title: 'Term 1 Mid-Semester Examination Date Sheet & Syllabus', publishDate: '2026-10-03', noticeDate: '2026-10-20', targetAudience: 'Students Only', isActive: true, content: 'Detailed timetable and unit syllabus for Term 1 examinations has been published on the student portal. Admit cards will be issued from the examination cell.', author: 'Controller of Exams' },
    { id: 3, title: 'Quarter 1 Tuition & Transport Fee Due Date Notice', publishDate: '2026-10-01', noticeDate: '2026-10-15', targetAudience: 'Guardians / Parents', isActive: true, content: 'Parents are kindly requested to remit Q1 tuition fees before 15th October 2026 through the online parent payment portal or school cash counter.', author: 'Accounts Dept' },
    { id: 4, title: 'Staff Faculty Development Workshop on STEM Pedagogy', publishDate: '2026-09-28', noticeDate: '2026-10-10', targetAudience: 'Academic Staff', isActive: false, content: 'A full-day teacher training seminar on modern robotics and interactive pedagogy will be conducted in the Audio-Visual Seminar Hall.', author: 'Academic Director' }
  ];

  // Events
  events: SchoolEvent[] = [
    { id: 1, title: 'Annual Inter-School Debate & Model UN', date: '2026-10-18', time: '09:00 AM - 04:00 PM', venue: 'Main Auditorium', category: 'Academic', description: 'Over 14 schools participating in Model United Nations debate competition.' },
    { id: 2, title: 'Founder\'s Day Celebrations & Cultural Gala', date: '2026-10-25', time: '05:00 PM - 08:30 PM', venue: 'Open Amphitheatre', category: 'Cultural', description: 'Music, drama, and awards ceremony for meritorious scholars.' },
    { id: 3, title: 'Gandhi Jayanti / Dussehra Institutional Holiday', date: '2026-10-12', time: 'Full Day', venue: 'Campus Closed', category: 'Holiday', description: 'School closed on account of gazetted holiday.' },
    { id: 4, title: 'Science & Robotics Innovation Exhibition', date: '2026-11-02', time: '10:00 AM - 03:00 PM', venue: 'Senior STEM Labs', category: 'Academic', description: 'Working prototype display by junior and senior students.' }
  ];

  // Message Logs
  logs: MessageLog[] = [
    { id: 'LOG-9921', channel: 'WhatsApp', title: 'Q1 Fee Invoice Alert & Payment Link', recipientsCount: 1248, date: 'Today, 11:45 AM', status: 'Delivered', sender: 'System Auto-Trigger' },
    { id: 'LOG-9920', channel: 'SMS', title: 'Daily Attendance Absent Notification', recipientsCount: 24, date: 'Today, 09:30 AM', status: 'Delivered', sender: 'Attendance Module' },
    { id: 'LOG-9919', channel: 'Email', title: 'Monthly Newsletter - October 2026 Edition', recipientsCount: 1450, date: 'Yesterday, 04:00 PM', status: 'Sent', sender: 'Admin Communications' },
    { id: 'LOG-9918', channel: 'SMS', title: 'Sports Day Rehearsal Schedule Update', recipientsCount: 420, date: '02 Oct 2026', status: 'Delivered', sender: 'Sports Dept' }
  ];

  // Email Templates
  emailTemplates: MessageTemplate[] = [
    { id: 1, name: 'Admission Welcome & Portal Credentials', type: 'Email', subject: 'Welcome to EasyEdu - Your Student Account Details', body: 'Dear {student_name}, Welcome to {school_name}! Your student registration is confirmed. Portal Login: {portal_url}, Username: {username}, Password: {password}.', isActive: true },
    { id: 2, name: 'Fee Invoice Due Notification', type: 'Email', subject: 'Fee Invoice Reminder for {student_name}', body: 'Dear Parent, this is to notify that the Term fee of ₹{amount} for {student_name} is due on {due_date}. Please pay via {payment_link}.', isActive: true },
    { id: 3, name: 'Term Examination Report Card Release', type: 'Email', subject: 'Report Card Published - {student_name}', body: 'Dear Parent, the academic term performance report card for {student_name} is now available for download on the portal.', isActive: true }
  ];

  // SMS Templates
  smsTemplates: MessageTemplate[] = [
    { id: 1, name: 'Daily Student Absence SMS', type: 'SMS', body: 'Dear Parent, your ward {student_name} is marked ABSENT today ({date}). Kindly contact the school office if unauthorized.', isActive: true, dltId: 'DLT-1107161234567' },
    { id: 2, name: 'Urgent Fee Due Reminder SMS', type: 'SMS', body: 'EasyEdu: Fee of Rs.{amount} for {student_name} is pending. Please pay before {due_date} to avoid late fine. Link: {link}', isActive: true, dltId: 'DLT-1107167654321' },
    { id: 3, name: 'Emergency Campus Holiday Broadcast', type: 'SMS', body: 'Important: The school will remain CLOSED tomorrow ({date}) as per government advisory. Online classes continue.', isActive: true, dltId: 'DLT-1107169998877' }
  ];

  // Form Models
  newNotice: Partial<Notice> = {
    title: '',
    targetAudience: 'All Stakeholders',
    publishDate: new Date().toISOString().split('T')[0],
    content: ''
  };

  showNoticeModal = false;

  broadcastForm = {
    targetAudience: 'All Parents & Students',
    subject: '',
    template: '',
    message: '',
    sendSmsCopy: false,
    sendWhatsAppCopy: false
  };

  newEvent: Partial<SchoolEvent> = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM - 01:00 PM',
    venue: 'Main Auditorium',
    category: 'Academic',
    description: ''
  };

  showEventModal = false;

  newEmailTemplate: Partial<MessageTemplate> = {
    name: '',
    subject: '',
    body: '',
    isActive: true,
    type: 'Email'
  };

  newSmsTemplate: Partial<MessageTemplate> = {
    name: '',
    body: '',
    dltId: '',
    isActive: true,
    type: 'SMS'
  };

  showTemplateModal = false;

  // Calendar properties
  currentMonth = 'October 2026';
  calendarDays: { day: number; isCurrentMonth: boolean; hasEvent?: boolean; eventTitle?: string; isHoliday?: boolean }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initCalendar();
    const url = this.router.url.toLowerCase();
    if (url.includes('noticeboard')) this.activeTab = 'notice-board';
    else if (url.includes('sendemail')) this.activeTab = 'send-email';
    else if (url.includes('messagelog')) this.activeTab = 'message-log';
    else if (url.includes('eventlist')) this.activeTab = 'event-list';
    else if (url.includes('calendar')) this.activeTab = 'calendar';
    else if (url.includes('emailtemplates')) this.activeTab = 'email-templates';
    else if (url.includes('smstemplates')) this.activeTab = 'sms-templates';

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const tab = params['tab'];
        if (['notice-board', 'send-email', 'message-log', 'event-list', 'calendar', 'email-templates', 'sms-templates'].includes(tab)) {
          this.activeTab = tab as any;
        }
      }
    });
  }

  setTab(tab: 'notice-board' | 'send-email' | 'message-log' | 'event-list' | 'calendar' | 'email-templates' | 'sms-templates'): void {
    this.activeTab = tab;
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab: tab } });
  }

  initCalendar(): void {
    // Generate 35 calendar cells for Oct 2026
    this.calendarDays = [];
    for (let i = 27; i <= 30; i++) {
      this.calendarDays.push({ day: i, isCurrentMonth: false });
    }
    for (let i = 1; i <= 31; i++) {
      const isHoliday = i === 12;
      const hasEvent = i === 18 || i === 25;
      let eventTitle = '';
      if (i === 12) eventTitle = 'Institutional Holiday';
      if (i === 18) eventTitle = 'Inter-School Debate';
      if (i === 25) eventTitle = 'Founder\'s Day Gala';
      this.calendarDays.push({ day: i, isCurrentMonth: true, isHoliday, hasEvent, eventTitle });
    }
  }

  saveNotice(): void {
    if (!this.newNotice.title || !this.newNotice.content) return;
    this.notices.unshift({
      id: Date.now(),
      title: this.newNotice.title,
      publishDate: this.newNotice.publishDate || new Date().toISOString().split('T')[0],
      noticeDate: this.newNotice.publishDate || new Date().toISOString().split('T')[0],
      targetAudience: this.newNotice.targetAudience || 'All Stakeholders',
      isActive: true,
      content: this.newNotice.content,
      author: 'Principal Office'
    });
    this.showNoticeModal = false;
    this.newNotice = { title: '', targetAudience: 'All Stakeholders', publishDate: new Date().toISOString().split('T')[0], content: '' };
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Broadcast Posted', text: 'Notice published to all relevant institutional portals.', timer: 1500, showConfirmButton: false });
    }
  }

  sendBroadcast(): void {
    if (!this.broadcastForm.message) return;
    const channelName = this.sendChannel === 'email' ? 'Email' : (this.sendChannel === 'sms' ? 'SMS' : 'WhatsApp');
    this.logs.unshift({
      id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      channel: channelName as any,
      title: this.broadcastForm.subject || (this.sendChannel === 'sms' ? 'Instant SMS Broadcast' : 'Instant WhatsApp Alert'),
      recipientsCount: 1450,
      date: 'Just Now',
      status: 'Delivered',
      sender: 'Admin Console'
    });
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Transmission Dispatched', text: `Message broadcast sent to 1,450 recipients via ${channelName}.`, timer: 1500, showConfirmButton: false });
    }
    this.broadcastForm.message = '';
    this.broadcastForm.subject = '';
  }

  saveEvent(): void {
    if (!this.newEvent.title) return;
    this.events.unshift({
      id: Date.now(),
      title: this.newEvent.title,
      date: this.newEvent.date || new Date().toISOString().split('T')[0],
      time: this.newEvent.time || '09:00 AM - 01:00 PM',
      venue: this.newEvent.venue || 'Main Auditorium',
      category: this.newEvent.category || 'Academic',
      description: this.newEvent.description || ''
    });
    this.showEventModal = false;
    this.newEvent = { title: '', date: new Date().toISOString().split('T')[0], time: '09:00 AM - 01:00 PM', venue: 'Main Auditorium', category: 'Academic', description: '' };
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Event Scheduled', text: 'Institutional event added to master calendar.', timer: 1500, showConfirmButton: false });
    }
  }

  saveEmailTemplate(): void {
    if (!this.newEmailTemplate.name || !this.newEmailTemplate.body) return;
    this.emailTemplates.unshift({
      id: Date.now(),
      name: this.newEmailTemplate.name,
      subject: this.newEmailTemplate.subject || 'Institutional Communication',
      body: this.newEmailTemplate.body,
      isActive: true,
      type: 'Email'
    });
    this.showTemplateModal = false;
    this.newEmailTemplate = { name: '', subject: '', body: '', isActive: true, type: 'Email' };
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Template Saved', text: 'Email structure archived in template library.', timer: 1500, showConfirmButton: false });
    }
  }

  saveSmsTemplate(): void {
    if (!this.newSmsTemplate.name || !this.newSmsTemplate.body) return;
    this.smsTemplates.unshift({
      id: Date.now(),
      name: this.newSmsTemplate.name,
      body: this.newSmsTemplate.body,
      dltId: this.newSmsTemplate.dltId || 'DLT-' + Math.floor(1000000000000 + Math.random()*9000000000000),
      isActive: true,
      type: 'SMS'
    });
    this.showTemplateModal = false;
    this.newSmsTemplate = { name: '', body: '', dltId: '', isActive: true, type: 'SMS' };
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Template Saved', text: 'SMS structure stored with DLT registration.', timer: 1500, showConfirmButton: false });
    }
  }

  insertTag(tag: string): void {
    this.broadcastForm.message += ` {${tag}}`;
  }
}
