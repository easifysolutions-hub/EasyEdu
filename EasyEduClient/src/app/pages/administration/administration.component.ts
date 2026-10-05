import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  activeTab: 'queries' | 'visitors' | 'complaints' | 'postal' | 'calls' = 'queries';

  queries = [
    { id: 1, name: 'Vikram Joshi', phone: '+91 98765 11223', source: 'Online Web', class: 'Grade 11 - Science', date: '2026-10-04', status: 'Follow Up' },
    { id: 2, name: 'Priya Sharma', phone: '+91 98450 44556', source: 'Front Desk', class: 'Grade 8', date: '2026-10-03', status: 'Converted' },
    { id: 3, name: 'Sanjay Deshmukh', phone: '+91 97410 77889', source: 'Referral', class: 'Grade 9 - B', date: '2026-10-02', status: 'Pending' }
  ];

  visitors = [
    { id: 1, name: 'Rajesh Nair', purpose: 'Parent Meeting with Principal', visitorId: 'VIS-991', inTime: '10:15 AM', outTime: '11:00 AM', date: '2026-10-05' },
    { id: 2, name: 'Kavita Menon', purpose: 'Fee Submission Inquiry', visitorId: 'VIS-992', inTime: '11:30 AM', outTime: '12:10 PM', date: '2026-10-05' }
  ];

  complaints = [
    { id: 1, by: 'Mrs. Sunita Iyer (Parent)', type: 'Transport Route Delay', assignedTo: 'Transport Manager', date: '2026-10-03', status: 'In Progress' },
    { id: 2, by: 'Mr. Arvind Gupta (Parent)', type: 'Canteen Food Hygiene', assignedTo: 'Admin Section', date: '2026-10-01', status: 'Resolved' }
  ];

  postalLogs = [
    { id: 1, refNo: 'PST-RCV-041', sender: 'CBSE Regional Board Office', receiver: 'Principal Desk', type: 'Receive', date: '2026-10-04' },
    { id: 2, refNo: 'PST-DSP-088', sender: 'Finance Department', receiver: 'Bank of Baroda', type: 'Dispatch', date: '2026-10-03' }
  ];

  phoneLogs = [
    { id: 1, name: 'Dr. Mohan Lal', phone: '+91 98860 12345', callType: 'Incoming', duration: '4m 12s', followUp: '2026-10-08', note: 'Inquired about Grade 12 board preparation curriculum' },
    { id: 2, name: 'Deepa Hegde', phone: '+91 94480 67890', callType: 'Outgoing', duration: '2m 45s', followUp: 'None', note: 'Confirmed fee receipt generation' }
  ];
}
