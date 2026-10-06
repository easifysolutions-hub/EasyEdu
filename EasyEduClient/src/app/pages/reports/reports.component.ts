import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExportReportService } from '../../core/services/export-report.service';

export interface ReportDefinition {
  id: string;
  slug: string;
  title: string;
  category: 'Student & Academic' | 'Attendance & Homework' | 'Finance & Fees' | 'Logistics & Dormitory' | 'Staff & Operations';
  description: string;
  icon: string;
  color: string;
  badge: string;
  columns: string[];
  records: any[];
  kpis: { label: string; value: string; trend?: string; isPositive?: boolean }[];
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  selectedCategory = 'All';
  searchTerm = '';
  activeReport: ReportDefinition | null = null;
  viewMode: 'catalog' | 'detail' = 'catalog';

  // Filter Bar Form State
  filterClass = 'All Classes';
  filterSection = 'All Sections';
  filterAcademicYear = '2025-2026';
  filterDateFrom = '2026-09-01';
  filterDateTo = '2026-10-06';
  filterPaymentMode = 'All Modes';
  filterSearchQuery = '';

  // Toast / Export state
  showSuccessToast = false;
  toastMessage = '';

  // Catalog of all 20 Institutional Reports
  reports: ReportDefinition[] = [
    {
      id: 'RPT-STU-01',
      slug: 'studentreport',
      title: 'Students Report',
      category: 'Student & Academic',
      description: 'Comprehensive student profile directory, admission register, parent credentials, and enrollment status.',
      icon: 'fas fa-user-graduate',
      color: '#4f46e5',
      badge: 'Academic',
      columns: ['Admission No', 'Roll', 'Student Name', 'Class & Sec', 'Guardian Name', 'Mobile No', 'Gender', 'Status'],
      kpis: [
        { label: 'Total Enrolled', value: '1,420', trend: '+4.8% YoY', isPositive: true },
        { label: 'Active Students', value: '1,395', trend: '98.2%', isPositive: true },
        { label: 'Gender Ratio', value: '52% M / 48% F' }
      ],
      records: [
        { c1: 'ADM-2026-001', c2: '101', c3: 'Aarav Sharma', c4: 'Grade 10-A', c5: 'Rajesh Sharma', c6: '+91 98765 43210', c7: 'Male', c8: 'Active' },
        { c1: 'ADM-2026-002', c2: '102', c3: 'Diya Patel', c4: 'Grade 10-A', c5: 'Suresh Patel', c6: '+91 98765 43211', c7: 'Female', c8: 'Active' },
        { c1: 'ADM-2026-003', c2: '103', c3: 'Rohan Gupta', c4: 'Grade 10-B', c5: 'Manoj Gupta', c6: '+91 98765 43212', c7: 'Male', c8: 'Active' },
        { c1: 'ADM-2026-004', c2: '104', c3: 'Ananya Verma', c4: 'Grade 9-A', c5: 'Vikram Verma', c6: '+91 98765 43213', c7: 'Female', c8: 'Active' },
        { c1: 'ADM-2026-005', c2: '105', c3: 'Kabir Mehta', c4: 'Grade 11-Sci', c5: 'Arun Mehta', c6: '+91 98765 43214', c7: 'Male', c8: 'Active' }
      ]
    },
    {
      id: 'RPT-STU-02',
      slug: 'studentattendancereport',
      title: 'Student Attendance Report',
      category: 'Attendance & Homework',
      description: 'Daily and monthly biometric roll call logs, aggregate presenteeism, leaves taken, and chronic defaulters.',
      icon: 'fas fa-calendar-check',
      color: '#10b981',
      badge: 'Attendance',
      columns: ['Roll', 'Student Name', 'Class', 'Total Days', 'Present', 'Absent', 'Late / Leave', 'Attendance %'],
      kpis: [
        { label: 'Overall Attendance', value: '94.2%', trend: '+1.5% this month', isPositive: true },
        { label: 'Chronic Defaulters', value: '18 Students', trend: '< 75% attendance', isPositive: false },
        { label: 'Perfect 100%', value: '412 Students' }
      ],
      records: [
        { c1: '101', c2: 'Aarav Sharma', c3: 'Grade 10-A', c4: '120', c5: '116', c6: '2', c7: '2', c8: '96.7%' },
        { c1: '102', c2: 'Diya Patel', c3: 'Grade 10-A', c4: '120', c5: '118', c6: '1', c7: '1', c8: '98.3%' },
        { c1: '103', c2: 'Rohan Gupta', c3: 'Grade 10-B', c4: '120', c5: '102', c6: '12', c7: '6', c8: '85.0%' },
        { c1: '104', c2: 'Ananya Verma', c3: 'Grade 9-A', c4: '120', c5: '120', c6: '0', c7: '0', c8: '100%' },
        { c1: '105', c2: 'Kabir Mehta', c3: 'Grade 11-Sci', c4: '120', c5: '110', c6: '7', c7: '3', c8: '91.6%' }
      ]
    },
    {
      id: 'RPT-STU-03',
      slug: 'subjectattendancereport',
      title: 'Subject Attendance Report',
      category: 'Attendance & Homework',
      description: 'Period-by-period lecture logs, lab attendance analytics, and faculty lesson delivery records.',
      icon: 'fas fa-clipboard-user',
      color: '#06b6d4',
      badge: 'Attendance',
      columns: ['Subject Code', 'Subject Title', 'Faculty Mentor', 'Total Lectures', 'Attended', 'Absent', 'Avg Attendance', 'Status'],
      kpis: [
        { label: 'Lectures Delivered', value: '840 Hrs' },
        { label: 'Top Attended Subject', value: 'Physics (97.1%)' },
        { label: 'Lab Attendance', value: '95.8%' }
      ],
      records: [
        { c1: 'PHY-101', c2: 'Advanced Physics', c3: 'Dr. Eleanor Vance', c4: '45', c5: '43', c6: '2', c7: '95.5%', c8: 'Excellent' },
        { c1: 'MTH-201', c2: 'Pure Calculus', c3: 'Prof. Marcus Chen', c4: '50', c5: '48', c6: '2', c7: '96.0%', c8: 'Excellent' },
        { c1: 'BIO-301', c2: 'Biotechnology & Genetics', c3: 'Dr. Sarah Al-Mansoor', c4: '40', c5: '37', c6: '3', c7: '92.5%', c8: 'Good' },
        { c1: 'ENG-102', c2: 'World Literature', c3: 'Prof. Robert Sterling', c4: '35', c5: '31', c6: '4', c7: '88.5%', c8: 'Average' }
      ]
    },
    {
      id: 'RPT-STU-04',
      slug: 'homeworkevaluationreport',
      title: 'Homework Evaluation Report',
      category: 'Attendance & Homework',
      description: 'Digital assignment submission tracker, grading status, late turn-ins, and subject completion indices.',
      icon: 'fas fa-book-open-reader',
      color: '#ec4899',
      badge: 'Academics',
      columns: ['Assignment ID', 'Title', 'Subject', 'Class', 'Due Date', 'Submitted', 'Pending', 'Evaluated %'],
      kpis: [
        { label: 'Assignments Assigned', value: '142' },
        { label: 'Submission Rate', value: '91.4%', isPositive: true },
        { label: 'Avg Grade Score', value: 'A (86.2%)' }
      ],
      records: [
        { c1: 'HW-094', c2: 'Electromagnetic Induction Lab', c3: 'Physics', c4: 'Grade 10-A', c5: '2026-10-02', c6: '38/40', c7: '2', c8: '95%' },
        { c1: 'HW-095', c2: 'Differential Equations Set 4', c3: 'Mathematics', c4: 'Grade 10-B', c5: '2026-10-03', c6: '36/38', c7: '2', c8: '94%' },
        { c1: 'HW-096', c2: 'Shakespearean Sonnets Critique', c3: 'English', c4: 'Grade 9-A', c5: '2026-10-04', c6: '42/42', c7: '0', c8: '100%' },
        { c1: 'HW-097', c2: 'Plant Cell Microscopy Sketches', c3: 'Biology', c4: 'Grade 11-Sci', c5: '2026-10-05', c6: '32/35', c7: '3', c8: '91%' }
      ]
    },
    {
      id: 'RPT-STU-05',
      slug: 'guardianreport',
      title: 'Guardian Reports',
      category: 'Student & Academic',
      description: 'Family registry, primary parent contacts, emergency phone routing, occupation, and residential addresses.',
      icon: 'fas fa-people-roof',
      color: '#8b5cf6',
      badge: 'Records',
      columns: ['Student Name', 'Admission No', 'Father / Guardian', 'Mother Name', 'Emergency Contact', 'Occupation', 'Email ID'],
      kpis: [
        { label: 'Verified Contacts', value: '100%', isPositive: true },
        { label: 'Primary SMS Linked', value: '1,420 Nos' }
      ],
      records: [
        { c1: 'Aarav Sharma', c2: 'ADM-2026-001', c3: 'Rajesh Sharma', c4: 'Meena Sharma', c5: '+91 98765 43210', c6: 'Civil Engineer', c7: 'rajesh.sharma@gmail.com' },
        { c1: 'Diya Patel', c2: 'ADM-2026-002', c3: 'Suresh Patel', c4: 'Kavita Patel', c5: '+91 98765 43211', c6: 'Physician / Doctor', c7: 'suresh.patel@healthcare.org' },
        { c1: 'Rohan Gupta', c2: 'ADM-2026-003', c3: 'Manoj Gupta', c4: 'Pooja Gupta', c5: '+91 98765 43212', c6: 'Chartered Accountant', c7: 'mgupta.ca@apexfin.com' }
      ]
    },
    {
      id: 'RPT-STU-06',
      slug: 'studenthistory',
      title: 'Student History',
      category: 'Student & Academic',
      description: 'Longitudinal student performance, behavioral citations, honors, disciplinary remarks, and year-over-year GPA.',
      icon: 'fas fa-timeline',
      color: '#3b82f6',
      badge: 'Academic',
      columns: ['Admission No', 'Student Name', 'Entry Session', 'Previous School', 'Cumulative GPA', 'Honors & Badges', 'TC Status'],
      kpis: [
        { label: 'Alumni Retention', value: '96.2%' },
        { label: 'National Honor Scholars', value: '48 Students' }
      ],
      records: [
        { c1: 'ADM-2026-001', c2: 'Aarav Sharma', c3: '2020-21 (Grade 5)', c4: 'St. Xavier High School', c5: '3.92 / 4.0', c6: 'Science Olympiad Gold', c7: 'Enrolled' },
        { c1: 'ADM-2026-002', c2: 'Diya Patel', c3: '2019-20 (Grade 4)', c4: 'Delhi Public School', c5: '3.98 / 4.0', c6: 'Debate Champion 2025', c7: 'Enrolled' },
        { c1: 'ADM-2026-003', c2: 'Rohan Gupta', c3: '2022-23 (Grade 7)', c4: 'Oakridge International', c5: '3.65 / 4.0', c6: 'Robotics Finalist', c7: 'Enrolled' }
      ]
    },
    {
      id: 'RPT-STU-07',
      slug: 'studentloginreport',
      title: 'Student Login Report',
      category: 'Staff & Operations',
      description: 'LMS access logs, active sessions, browser footprints, IP audit trails, and multi-factor security alerts.',
      icon: 'fas fa-shield-halved',
      color: '#64748b',
      badge: 'Security',
      columns: ['Student Name', 'Username', 'IP Address', 'Device / OS', 'Last Login Time', 'Sessions This Month', 'Security Flag'],
      kpis: [
        { label: 'Active LMS Users', value: '1,310 / Day' },
        { label: 'Failed Attempts', value: '3 (Blocked)', isPositive: true }
      ],
      records: [
        { c1: 'Aarav Sharma', c2: 'aarav.sharma26', c3: '192.168.1.45 (Local)', c4: 'Chrome / Windows 11', c5: 'Today, 08:15 AM', c6: '44', c7: 'Verified Safe' },
        { c1: 'Diya Patel', c2: 'diya.patel26', c3: '103.22.45.12 (Airtel)', c4: 'Safari / macOS Sonoma', c5: 'Today, 07:50 AM', c6: '62', c7: 'Verified Safe' },
        { c1: 'Rohan Gupta', c2: 'rohan.gupta26', c3: '49.36.12.88 (Jio)', c4: 'EasyEdu Mobile App (iOS)', c5: 'Yesterday, 09:20 PM', c6: '38', c7: 'Verified Safe' }
      ]
    },
    {
      id: 'RPT-STU-08',
      slug: 'classreport',
      title: 'Class Report',
      category: 'Student & Academic',
      description: 'Section capacity analytics, teacher allocations, boy/girl demographics, and room assignment density.',
      icon: 'fas fa-chalkboard-user',
      color: '#f59e0b',
      badge: 'Academics',
      columns: ['Class Name', 'Class Teacher', 'Room No', 'Capacity', 'Boys', 'Girls', 'Total Enrolled', 'Avg GPA'],
      kpis: [
        { label: 'Total Classes', value: '36 Sections' },
        { label: 'Avg Class Size', value: '38 Students' },
        { label: 'Teacher-Student Ratio', value: '1:18' }
      ],
      records: [
        { c1: 'Grade 10-A', c2: 'Dr. Eleanor Vance', c3: 'Lab-A (Room 204)', c4: '40', c5: '21', c6: '19', c7: '40 (Full)', c8: '3.88' },
        { c1: 'Grade 10-B', c2: 'Prof. Marcus Chen', c3: 'Room 205', c4: '40', c5: '20', c6: '18', c7: '38', c8: '3.74' },
        { c1: 'Grade 9-A', c2: 'Dr. Sarah Al-Mansoor', c3: 'Room 102', c4: '45', c5: '23', c6: '19', c7: '42', c8: '3.82' },
        { c1: 'Grade 11-Sci', c2: 'Prof. Robert Sterling', c3: 'Science Hall 1', c4: '35', c5: '18', c6: '17', c7: '35 (Full)', c8: '3.91' }
      ]
    },
    {
      id: 'RPT-STU-09',
      slug: 'classroutinereport',
      title: 'Class Routine',
      category: 'Student & Academic',
      description: 'Master master timetables, lecture periods, lab slots, teacher substitution logs, and interval schedules.',
      icon: 'fas fa-clock-rotate-left',
      color: '#0284c7',
      badge: 'Academics',
      columns: ['Day', 'Period Slot', 'Time', 'Subject', 'Class', 'Room', 'Faculty Assigned'],
      kpis: [
        { label: 'Active Periods / Day', value: '8 Periods' },
        { label: 'Zero Clash Schedule', value: '100% Verified', isPositive: true }
      ],
      records: [
        { c1: 'Monday', c2: 'Period 1', c3: '08:30 - 09:15 AM', c4: 'Advanced Physics', c5: 'Grade 10-A', c6: 'Room 204', c7: 'Dr. Eleanor Vance' },
        { c1: 'Monday', c2: 'Period 2', c3: '09:15 - 10:00 AM', c4: 'Pure Calculus', c5: 'Grade 10-A', c6: 'Room 204', c7: 'Prof. Marcus Chen' },
        { c1: 'Monday', c2: 'Period 3', c3: '10:15 - 11:00 AM', c4: 'Biotechnology Lab', c5: 'Grade 10-A', c6: 'Bio Lab 2', c7: 'Dr. Sarah Al-Mansoor' },
        { c1: 'Monday', c2: 'Period 4', c3: '11:00 - 11:45 AM', c4: 'World Literature', c5: 'Grade 10-A', c6: 'Room 204', c7: 'Prof. Robert Sterling' }
      ]
    },
    {
      id: 'RPT-STU-10',
      slug: 'previousrecord',
      title: 'Previous Record',
      category: 'Student & Academic',
      description: 'Historical board exam marks, matriculation certificates, transfer certificates, and prior institution records.',
      icon: 'fas fa-folder-closed',
      color: '#7c3aed',
      badge: 'Archive',
      columns: ['Student Name', 'Prior Institution', 'Qualifying Exam', 'Year', 'Marks Obtained', 'Percentage', 'Board Roll #', 'Verification'],
      kpis: [
        { label: 'Prior Records Digitized', value: '100%' },
        { label: 'Transcripts Verified', value: '1,420 Docs' }
      ],
      records: [
        { c1: 'Aarav Sharma', c2: 'St. Xavier High School', c3: 'Grade 9 Annual Exam', c4: '2025', c5: '570 / 600', c6: '95.0%', c7: 'CBSE-2025-9981', c8: 'Authenticated' },
        { c1: 'Diya Patel', c2: 'Delhi Public School', c3: 'Grade 9 Annual Exam', c4: '2025', c5: '588 / 600', c6: '98.0%', c7: 'ICSE-2025-4412', c8: 'Authenticated' },
        { c1: 'Rohan Gupta', c2: 'Oakridge International', c3: 'Grade 9 Annual Exam', c4: '2025', c5: '520 / 600', c6: '86.6%', c7: 'IB-2025-1029', c8: 'Authenticated' }
      ]
    },
    {
      id: 'RPT-STU-11',
      slug: 'studenttransportreport',
      title: 'Student Transport Report',
      category: 'Logistics & Dormitory',
      description: 'Fleet allocations, passenger manifests, pick-up/drop waypoints, driver logs, and monthly transport fares.',
      icon: 'fas fa-bus',
      color: '#06b6d4',
      badge: 'Transport',
      columns: ['Student Name', 'Class', 'Bus Route', 'Vehicle No', 'Pick-up Stop', 'Driver & Phone', 'Monthly Fare', 'Status'],
      kpis: [
        { label: 'Active Commuters', value: '640 Students' },
        { label: 'Fleet In-Service', value: '14 Buses' },
        { label: 'On-Time Accuracy', value: '99.2%', isPositive: true }
      ],
      records: [
        { c1: 'Aarav Sharma', c2: 'Grade 10-A', c3: 'Route #4 (North Corridor)', c4: 'DL-01-AB-1020', c5: 'Palm Avenue Gate', c6: 'Ramesh Singh (+91 98111 22334)', c7: '₹2,400', c8: 'Active Pass' },
        { c1: 'Diya Patel', c2: 'Grade 10-A', c3: 'Route #1 (South Hub)', c4: 'DL-01-CD-3040', c5: 'Tech Park Circle', c6: 'Harpreet Singh (+91 98222 33445)', c7: '₹2,800', c8: 'Active Pass' },
        { c1: 'Rohan Gupta', c2: 'Grade 10-B', c3: 'Route #4 (North Corridor)', c4: 'DL-01-AB-1020', c5: 'Central Metro Stn', c6: 'Ramesh Singh (+91 98111 22334)', c7: '₹2,400', c8: 'Active Pass' }
      ]
    },
    {
      id: 'RPT-STU-12',
      slug: 'studentdormitoryreport',
      title: 'Student Dormitory Report',
      category: 'Logistics & Dormitory',
      description: 'Hostel room allotments, bed inventory, mess subscriptions, warden logs, and boarder check-in history.',
      icon: 'fas fa-hotel',
      color: '#d97706',
      badge: 'Hostel',
      columns: ['Student Name', 'Class', 'Hostel Block', 'Room No', 'Bed #', 'Mess Meal Plan', 'Warden Contact', 'Status'],
      kpis: [
        { label: 'Hostel Occupancy', value: '380 / 420 Beds (90.4%)' },
        { label: 'Mess Subscriptions', value: '380 Active' }
      ],
      records: [
        { c1: 'Kabir Mehta', c2: 'Grade 11-Sci', c3: 'Newton Scholars Block (Boys)', c4: 'Room 304', c5: 'Bed B-1', c6: 'Full 4-Meal Plan (Veg/Non-Veg)', c7: 'Mr. Joshi (+91 98333 44556)', c8: 'Occupied' },
        { c1: 'Ananya Verma', c2: 'Grade 9-A', c3: 'Curie Executive Wing (Girls)', c4: 'Room 108', c5: 'Bed G-2', c6: 'Standard Meal Plan', c7: 'Mrs. Sharma (+91 98444 55667)', c8: 'Occupied' }
      ]
    },
    {
      id: 'RPT-FIN-13',
      slug: 'feesreport',
      title: 'Payment Report (Fees)',
      category: 'Finance & Fees',
      description: 'Day-to-day fee receipt collection journal, payment gateway transactions, cash counter logs, and bank deposits.',
      icon: 'fas fa-cash-register',
      color: '#10b981',
      badge: 'Finance',
      columns: ['Receipt No', 'Student Name', 'Fee Head', 'Payment Date', 'Payment Mode', 'Transaction Ref #', 'Amount Paid', 'Cashier'],
      kpis: [
        { label: 'Total Collections (YTD)', value: '₹4,82,40,000', trend: '+12.4% vs Target', isPositive: true },
        { label: 'Today’s Inflow', value: '₹3,45,000' },
        { label: 'Online Gateway %', value: '78.5%' }
      ],
      records: [
        { c1: 'REC-2026-8801', c2: 'Aarav Sharma', c3: 'Term 1 Tuition + STEM Lab', c4: '2026-10-04', c5: 'UPI (PhonePe)', c6: 'UPI-982347102938', c7: '₹35,000', c8: 'Online Portal' },
        { c1: 'REC-2026-8802', c2: 'Diya Patel', c3: 'Annual Composite Fee', c4: '2026-10-04', c5: 'Net Banking (HDFC)', c6: 'HDFC-8839201948', c7: '₹75,000', c8: 'Online Portal' },
        { c1: 'REC-2026-8803', c2: 'Rohan Gupta', c3: 'Quarterly Tuition Installment', c4: '2026-10-03', c5: 'Cash Counter', c6: 'CASH-REC-091', c7: '₹18,500', c8: 'Deepak S. (Counter 1)' },
        { c1: 'REC-2026-8804', c2: 'Kabir Mehta', c3: 'Hostel & Mess Advance', c4: '2026-10-02', c5: 'Credit Card (Stripe)', c6: 'TXN-STRIPE-4421', c7: '₹45,000', c8: 'Online Portal' }
      ]
    },
    {
      id: 'RPT-FIN-14',
      slug: 'feesduereport',
      title: 'Fees Due Report',
      category: 'Finance & Fees',
      description: 'Outstanding tuition and transport balances, installment aging, defaulter lists, and automated reminder status.',
      icon: 'fas fa-file-invoice-dollar',
      color: '#ef4444',
      badge: 'Finance',
      columns: ['Invoice No', 'Student Name', 'Class', 'Fee Head', 'Total Payable', 'Paid Amount', 'Due Balance', 'Due Date', 'Status'],
      kpis: [
        { label: 'Total Dues Outstanding', value: '₹14,80,000', trend: '-8% MoM', isPositive: true },
        { label: 'Pending Invoices', value: '84 Records' },
        { label: 'Collection Efficiency', value: '96.9%' }
      ],
      records: [
        { c1: 'INV-2026-104', c2: 'Rohan Gupta', c3: 'Grade 10-B', c4: 'Term 2 Tuition Fee', c5: '₹35,000', c6: '₹15,000', c7: '₹20,000', c8: '2026-10-15', c9: 'Partially Paid' },
        { c1: 'INV-2026-218', c2: 'Vikram Choudhury', c3: 'Grade 8-A', c4: 'Transport Fee Q3', c5: '₹7,200', c6: '₹0', c7: '₹7,200', c8: '2026-10-10', c9: 'Unpaid (Due Soon)' },
        { c1: 'INV-2026-312', c2: 'Meera Nambiar', c3: 'Grade 11-Com', c4: 'Lab & Computer Fee', c5: '₹12,000', c6: '₹0', c7: '₹12,000', c8: '2026-09-30', c9: 'Overdue' }
      ]
    },
    {
      id: 'RPT-FIN-15',
      slug: 'finereport',
      title: 'Fine Report',
      category: 'Finance & Fees',
      description: 'Penalties assessed for late fee payments, library overdue books, lost ID cards, and campus asset damage.',
      icon: 'fas fa-gavel',
      color: '#dc2626',
      badge: 'Finance',
      columns: ['Fine ID', 'Student Name', 'Class', 'Category / Reason', 'Fine Amount', 'Waiver', 'Net Payable', 'Payment Status'],
      kpis: [
        { label: 'Total Fines Levied', value: '₹68,500' },
        { label: 'Collected Fines', value: '₹54,200' },
        { label: 'Discretionary Waivers', value: '₹14,300' }
      ],
      records: [
        { c1: 'FIN-091', c2: 'Rohan Gupta', c3: 'Grade 10-B', c4: 'Late Fee Payment (>15 Days)', c5: '₹1,500', c6: '₹500', c7: '₹1,000', c8: 'Paid' },
        { c1: 'FIN-092', c2: 'Meera Nambiar', c3: 'Grade 11-Com', c4: 'Overdue Library Book (Physics Vol 2)', c5: '₹350', c6: '₹0', c7: '₹350', c8: 'Unpaid' },
        { c1: 'FIN-093', c2: 'Anil Deshmukh', c3: 'Grade 9-B', c4: 'Replacement Smart ID Card', c5: '₹500', c6: '₹0', c7: '₹500', c8: 'Paid' }
      ]
    },
    {
      id: 'RPT-FIN-16',
      slug: 'balancereport',
      title: 'Balance Report',
      category: 'Finance & Fees',
      description: 'Account ledger reconciliation by student, net receivables, credits, advance deposits, and settlement status.',
      icon: 'fas fa-scale-balanced',
      color: '#d97706',
      badge: 'Ledger',
      columns: ['Admission No', 'Student Name', 'Class', 'Total Annual Fees', 'Total Received', 'Concessions', 'Net Balance', 'Account Health'],
      kpis: [
        { label: 'Net Receivables', value: '₹14,80,000' },
        { label: 'Advance Deposits', value: '₹8,40,000' }
      ],
      records: [
        { c1: 'ADM-2026-001', c2: 'Aarav Sharma', c3: 'Grade 10-A', c4: '₹85,000', c5: '₹85,000', c6: '₹0', c7: '₹0', c8: 'Clear / In Good Standing' },
        { c1: 'ADM-2026-002', c2: 'Diya Patel', c3: 'Grade 10-A', c4: '₹85,000', c5: '₹85,000', c6: '₹0', c7: '₹0', c8: 'Clear / In Good Standing' },
        { c1: 'ADM-2026-003', c2: 'Rohan Gupta', c3: 'Grade 10-B', c4: '₹85,000', c5: '₹65,000', c6: '₹0', c7: '₹20,000', c8: 'Pending Balance' }
      ]
    },
    {
      id: 'RPT-FIN-17',
      slug: 'waiverreport',
      title: 'Waiver Report',
      category: 'Finance & Fees',
      description: 'Scholarship grant disbursements, merit fee waivers, sibling discounts, and management concessions.',
      icon: 'fas fa-hand-holding-dollar',
      color: '#8b5cf6',
      badge: 'Concessions',
      columns: ['Waiver ID', 'Student Name', 'Scheme / Category', 'Approved By', 'Discount %', 'Amount Waived', 'Approval Date', 'Status'],
      kpis: [
        { label: 'Total Scholarships Awarded', value: '₹24,50,000', trend: '48 Beneficiaries' },
        { label: 'Merit Grants', value: '75%' }
      ],
      records: [
        { c1: 'WVR-2026-01', c2: 'Diya Patel', c3: 'Merit Scholar Gold (Top 1% Rank)', c4: 'Principal Dr. Vance', c5: '50% Tuition', c6: '₹35,000', c7: '2026-08-10', c8: 'Active Grant' },
        { c1: 'WVR-2026-02', c2: 'Ananya Verma', c3: 'Sibling Enrolled Concession', c4: 'Finance Committee', c5: '15% Tuition', c6: '₹10,500', c7: '2026-08-12', c8: 'Active Grant' },
        { c1: 'WVR-2026-03', c2: 'Kabir Mehta', c3: 'National Athletic Representation', c4: 'Sports Director', c5: '100% Sports Fee', c6: '₹8,000', c7: '2026-08-15', c8: 'Active Grant' }
      ]
    },
    {
      id: 'RPT-FIN-18',
      slug: 'walletreport',
      title: 'Wallet Report',
      category: 'Finance & Fees',
      description: 'Smart campus cashless prepaid cards, canteen purchases, stationery store debits, and balance top-up logs.',
      icon: 'fas fa-wallet',
      color: '#06b6d4',
      badge: 'Prepaid',
      columns: ['Card / Account #', 'Student Name', 'Current Balance', 'Last Top-Up Amount', 'Top-Up Date', 'Monthly Spend', 'Card Status'],
      kpis: [
        { label: 'Total Wallet Float', value: '₹6,40,000' },
        { label: 'Canteen POS Transactions', value: '18,400' }
      ],
      records: [
        { c1: 'WLT-88401', c2: 'Aarav Sharma', c3: '₹1,450', c4: '₹2,000', c5: '2026-10-01', c6: '₹1,820', c7: 'Active NFC Card' },
        { c1: 'WLT-88402', c2: 'Diya Patel', c3: '₹3,200', c4: '₹5,000', c5: '2026-09-28', c6: '₹2,450', c7: 'Active NFC Card' },
        { c1: 'WLT-88403', c2: 'Rohan Gupta', c3: '₹420', c4: '₹1,000', c5: '2026-09-15', c6: '₹1,180', c7: 'Active NFC Card' }
      ]
    },
    {
      id: 'RPT-HR-19',
      slug: 'payrollreport',
      title: 'Payroll Report',
      category: 'Staff & Operations',
      description: 'Faculty and staff remuneration register, allowances, EPF/Tax deductions, direct bank payouts, and pay slips.',
      icon: 'fas fa-money-check-dollar',
      color: '#7c3aed',
      badge: 'Payroll',
      columns: ['Staff ID', 'Employee Name', 'Designation', 'Department', 'Basic Salary', 'Allowances', 'Deductions (PF/Tax)', 'Net Salary', 'Payout Mode'],
      kpis: [
        { label: 'Monthly Payroll Outflow', value: '₹38,40,000', trend: '124 Staff Members' },
        { label: 'Disbursement Status', value: '100% Cleared on Oct 1', isPositive: true }
      ],
      records: [
        { c1: 'STF-001', c2: 'Dr. Eleanor Vance', c3: 'Dean & Principal', c4: 'Administration', c5: '₹1,20,000', c6: '₹30,000', c7: '₹18,000', c8: '₹1,32,000', c9: 'Direct Bank NEFT' },
        { c1: 'STF-002', c2: 'Prof. Marcus Chen', c3: 'Head of Mathematics', c4: 'Computer Science', c5: '₹95,000', c6: '₹20,000', c7: '₹14,000', c8: '₹1,01,000', c9: 'Direct Bank NEFT' },
        { c1: 'STF-003', c2: 'Dr. Sarah Al-Mansoor', c3: 'Senior Biotech Faculty', c4: 'Applied Sciences', c5: '₹90,000', c6: '₹18,000', c7: '₹13,000', c8: '₹95,000', c9: 'Direct Bank NEFT' },
        { c1: 'STF-004', c2: 'Prof. Robert Sterling', c3: 'Chair of Humanities', c4: 'Literature', c5: '₹85,000', c6: '₹15,000', c7: '₹12,000', c8: '₹88,000', c9: 'Direct Bank NEFT' }
      ]
    },
    {
      id: 'RPT-FIN-20',
      slug: 'transactionreport',
      title: 'Transaction Report',
      category: 'Finance & Fees',
      description: 'Master general ledger transactions, debit/credit audit trails, vendor payments, utility payouts, and cashier summaries.',
      icon: 'fas fa-arrow-right-arrow-left',
      color: '#4f46e5',
      badge: 'Audit',
      columns: ['Txn ID', 'Date & Time', 'Ledger Head', 'Type', 'Amount', 'Payment Mode', 'Approved By', 'Narration'],
      kpis: [
        { label: 'Total Monthly Volume', value: '₹1,12,00,000' },
        { label: 'Audit Trail Health', value: '100% Balanced', isPositive: true }
      ],
      records: [
        { c1: 'TXN-99101', c2: '2026-10-04 11:20 AM', c3: 'Tuition Fee Collections', c4: 'CREDIT', c5: '₹35,000', c6: 'Online (UPI)', c7: 'System Auto', c8: 'Fee Receipt REC-8801' },
        { c1: 'TXN-99102', c2: '2026-10-04 10:15 AM', c3: 'Science Lab Equipment Procurement', c4: 'DEBIT', c5: '₹42,500', c6: 'Bank Transfer', c7: 'Finance Officer', c8: 'Apex Instruments PO-882' },
        { c1: 'TXN-99103', c2: '2026-10-03 04:30 PM', c3: 'Campus High-Speed Fiber Internet', c4: 'DEBIT', c5: '₹18,000', c6: 'Direct Debit', c7: 'Estate Manager', c8: 'Monthly ISP Bill Oct 2026' },
        { c1: 'TXN-99104', c2: '2026-10-01 09:00 AM', c3: 'Monthly Staff Payroll Bulk Disbursement', c4: 'DEBIT', c5: '₹38,40,000', c6: 'HDFC Corporate Portal', c7: 'Treasurer', c8: 'Salaries for Month of Sept 2026' }
      ]
    }
  ];

  ngOnInit(): void {
    // Route matching to auto-load specific report if URL matches slug
    this.route.url.subscribe(() => {
      const url = this.router.url.toLowerCase();
      this.detectReportFromUrl(url);
    });

    this.route.queryParams.subscribe(params => {
      if (params['report']) {
        const rep = this.reports.find(r => r.slug === params['report'].toLowerCase() || r.id.toLowerCase() === params['report'].toLowerCase());
        if (rep) {
          this.openReportDetail(rep);
        }
      }
    });
  }

  detectReportFromUrl(url: string): void {
    for (const rep of this.reports) {
      if (url.includes(rep.slug)) {
        this.openReportDetail(rep);
        return;
      }
    }
  }

  get filteredReports(): ReportDefinition[] {
    return this.reports.filter(r => {
      const matchCat = this.selectedCategory === 'All' || r.category === this.selectedCategory;
      const matchSearch = !this.searchTerm ||
        r.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  openReportDetail(report: ReportDefinition): void {
    this.activeReport = report;
    this.viewMode = 'detail';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToCatalog(): void {
    this.viewMode = 'catalog';
  }

  applyFilters(): void {
    this.showToast(`Applied filters for ${this.filterClass} | ${this.filterAcademicYear}`);
  }

  resetFilters(): void {
    this.filterClass = 'All Classes';
    this.filterSection = 'All Sections';
    this.filterDateFrom = '2026-09-01';
    this.filterDateTo = '2026-10-06';
    this.filterPaymentMode = 'All Modes';
    this.filterSearchQuery = '';
    this.showToast('Reset filters to default.');
  }

  exportReportService = inject(ExportReportService);

  exportData(format: string): void {
    if (!this.activeReport) {
      this.showToast('Please select a report first.');
      return;
    }

    const title = this.activeReport.title;
    const headers = this.activeReport.columns;
    const rows = this.activeReport.records.map(rec => 
      this.activeReport!.columns.map((_, i) => rec['c' + (i + 1)] || '')
    );

    if (format === 'csv') {
      this.exportReportService.exportToCsv(title, headers, rows);
      this.showToast(`CSV data export generated for "${title}". Download starting...`);
    } else if (format === 'excel' || format === 'xls') {
      this.exportReportService.exportToExcel(title, headers, rows);
      this.showToast(`Excel spreadsheet created for "${title}". Download starting...`);
    } else if (format === 'pdf') {
      this.exportReportService.printOrPdf(title, headers, rows, {
        category: this.activeReport.category,
        filters: `${this.filterClass} &bull; ${this.filterAcademicYear}`,
        kpis: this.activeReport.kpis
      });
      this.showToast(`PDF Document generated for "${title}". Ready to print or Save as PDF.`);
    }
  }

  printReport(): void {
    if (!this.activeReport) return;
    const title = this.activeReport.title;
    const headers = this.activeReport.columns;
    const rows = this.activeReport.records.map(rec => 
      this.activeReport!.columns.map((_, i) => rec['c' + (i + 1)] || '')
    );

    this.exportReportService.printOrPdf(title, headers, rows, {
      category: this.activeReport.category,
      filters: `${this.filterClass} &bull; ${this.filterAcademicYear}`,
      kpis: this.activeReport.kpis
    });
    this.showToast(`Print layout loaded with official institutional header.`);
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3500);
  }
}
