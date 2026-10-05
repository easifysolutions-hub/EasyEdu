import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface CampusTask {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

interface UserLog {
  id: number;
  user: string;
  role: string;
  action: string;
  ip: string;
  timestamp: string;
}

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent {
  activeTab: 'tasks' | 'qr' | 'whatsapp' | 'ai' | 'logs' = 'tasks';

  // Tasks
  tasks: CampusTask[] = [
    { id: 1, title: 'Finalize CBSE Board Exam hall tickets & admit cards', assignee: 'System Admin', dueDate: '2025-05-15', priority: 'High', completed: false },
    { id: 2, title: 'Reconcile Q1 Fee receipts with HDFC Bank ledger', assignee: 'Accounts Dept.', dueDate: '2025-05-12', priority: 'High', completed: true },
    { id: 3, title: 'Annual science laboratory inventory audit & replenishment', assignee: 'Dr. Ramesh Sharma', dueDate: '2025-05-20', priority: 'Medium', completed: false },
    { id: 4, title: 'Bus fleet GPS telemetry check & route optimization', assignee: 'Transport Manager', dueDate: '2025-05-18', priority: 'Low', completed: false }
  ];

  newTaskTitle = '';
  newTaskAssignee = 'System Admin';
  newTaskPriority: 'High' | 'Medium' | 'Low' = 'Medium';

  // QR Attendance Scanner
  qrAdmissionNo = '';
  qrScanResult: any = null;

  // WhatsApp Campaign
  whatsAppForm = {
    template: 'Fee Due Reminder',
    recipientGroup: 'Parents with Outstanding Fees (24 Students)',
    message: 'Dear Parent, this is a reminder from EasyEdu Academy regarding pending Term 1 fees of ₹16,000 for your ward. Please settle before 15th May to avoid late charges. Pay online at https://easyedu.easifysolutions.com'
  };

  // AI Content Generator
  aiPrompt = '';
  aiContentType = 'Lesson Plan';
  aiGenerating = false;
  aiOutput = '';

  // User Logs
  logs: UserLog[] = [
    { id: 101, user: 'System Administrator (admin@easyedu.com)', role: 'SuperAdmin', action: 'Generated bulk fee invoices for Grade 10-A', ip: '192.168.1.45', timestamp: 'Today, 11:42 AM' },
    { id: 102, user: 'Deepak S. (Cashier)', role: 'Accountant', action: 'Collected fee ₹25,000 for Aarav Sharma (INV-001)', ip: '192.168.1.18', timestamp: 'Today, 11:30 AM' },
    { id: 103, user: 'Dr. Ramesh Sharma', role: 'Faculty', action: 'Uploaded Term 1 Physics Syllabus Lesson Plan', ip: '192.168.1.72', timestamp: 'Yesterday, 04:15 PM' },
    { id: 104, user: 'System Administrator', role: 'SuperAdmin', action: 'Database backup created and synced to secure storage', ip: '127.0.0.1', timestamp: '03 May 2025, 01:00 AM' }
  ];

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.tasks.unshift({
      id: this.tasks.length + 1,
      title: this.newTaskTitle,
      assignee: this.newTaskAssignee,
      dueDate: new Date().toISOString().split('T')[0],
      priority: this.newTaskPriority,
      completed: false
    });

    this.newTaskTitle = '';
    Swal.fire('Task Created', 'Campus task added to planner.', 'success');
  }

  toggleTask(task: CampusTask): void {
    task.completed = !task.completed;
  }

  simulateQrScan(): void {
    const adm = this.qrAdmissionNo.trim() || 'ADM-2024-001';
    this.qrScanResult = {
      studentName: 'Aarav Sharma',
      admissionNo: adm,
      class: 'Grade 10 - Section A',
      scanTime: new Date().toLocaleTimeString(),
      status: 'Present',
      avatar: 'A'
    };

    Swal.fire({
      title: 'QR Check-In Verified!',
      text: `Attendance marked: ${this.qrScanResult.studentName} (${adm}) at ${this.qrScanResult.scanTime}`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  sendWhatsAppCampaign(): void {
    Swal.fire({
      title: 'Broadcast WhatsApp Campaign?',
      text: `Send "${this.whatsAppForm.template}" to ${this.whatsAppForm.recipientGroup}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#25D366',
      confirmButtonText: '<i class="fab fa-whatsapp me-1"></i> Send Campaign'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire('Broadcast Dispatched!', 'WhatsApp messages sent via Cloud API successfully.', 'success');
      }
    });
  }

  generateAiContent(): void {
    if (!this.aiPrompt.trim()) {
      Swal.fire('Enter Topic Prompt', 'Please describe what content to generate.', 'warning');
      return;
    }

    this.aiGenerating = true;
    setTimeout(() => {
      this.aiGenerating = false;
      if (this.aiContentType === 'Lesson Plan') {
        this.aiOutput = `### AI-Generated Lesson Plan: ${this.aiPrompt}\n\n**Subject:** Science / Physics\n**Target Grade:** 10th Standard\n**Duration:** 45 Minutes\n\n#### Learning Objectives:\n1. Understand fundamental principles of ${this.aiPrompt}.\n2. Demonstrate practical real-world applications in laboratory settings.\n3. Formulate mathematical equations & solve standard problems.\n\n#### Pedagogical Breakdown:\n- **0-10 Mins:** Interactive introductory discussion & recall.\n- **10-25 Mins:** Core conceptual lecture & multimedia simulation.\n- **25-35 Mins:** Group problem-solving exercise.\n- **35-45 Mins:** Formative quiz assessment & homework assignment.\n\n#### Recommended Homework:\nComplete NCERT Chapter questions 1 through 8.`;
      } else if (this.aiContentType === 'Exam Questions') {
        this.aiOutput = `### AI-Generated Exam Questions: ${this.aiPrompt}\n\n1. **[MCQ - 2 Marks]** Which property is most significant in ${this.aiPrompt}?\n   (A) Option Alpha  (B) Option Beta  (C) Option Gamma  (D) Option Delta\n   *Correct Answer: (A)*\n\n2. **[Short Answer - 3 Marks]** State and explain the core theorem governing ${this.aiPrompt} with an illustrative diagram.\n\n3. **[Descriptive - 5 Marks]** Derive the general formula for ${this.aiPrompt} and discuss two practical engineering applications.`;
      } else {
        this.aiOutput = `### Official School Circular: ${this.aiPrompt}\n\n**Date:** ${new Date().toLocaleDateString('en-IN')}\n**To:** All Parents & Students\n**Subject:** ${this.aiPrompt}\n\nDear Parents and Students,\n\nWe would like to formally inform you regarding ${this.aiPrompt}. All academic and administrative proceedings will follow the updated schedule outlined on the EasyEdu portal.\n\nKindly check your student dashboard for timetable and logistical details.\n\nWarm regards,\n**Principal Dr. Nair**\n*EasyEdu International Academy*`;
      }
    }, 700);
  }
}
