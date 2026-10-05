import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  activeTab: 'queries' | 'visitors' | 'complaints' | 'postal' | 'calls' = 'queries';

  // Modals
  showQueryModal = false;
  showVisitorModal = false;
  showComplaintModal = false;
  showPostalModal = false;
  showCallModal = false;

  newQuery = { name: '', phone: '', source: 'Online Web', class: 'Grade 10', date: new Date().toISOString().split('T')[0], status: 'Pending' };
  newVisitor = { name: '', purpose: 'General Enquiry', visitorId: 'VIS-' + Math.floor(100 + Math.random() * 900), inTime: '10:00 AM', outTime: '10:30 AM', date: new Date().toISOString().split('T')[0] };
  newComplaint = { by: '', type: 'General', assignedTo: 'Admin Desk', date: new Date().toISOString().split('T')[0], status: 'Pending' };
  newPostal = { refNo: 'PST-' + Math.floor(100 + Math.random() * 900), sender: '', receiver: '', type: 'Receive', date: new Date().toISOString().split('T')[0] };
  newCall = { name: '', phone: '', callType: 'Incoming', duration: '3m 00s', followUp: 'None', note: '' };

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

  addQuery() {
    if (!this.newQuery.name || !this.newQuery.phone) return;
    this.queries.unshift({ id: Date.now(), ...this.newQuery });
    this.showQueryModal = false;
    this.newQuery = { name: '', phone: '', source: 'Online Web', class: 'Grade 10', date: new Date().toISOString().split('T')[0], status: 'Pending' };
    Swal.fire({ icon: 'success', title: 'Query Logged', text: 'Admission inquiry saved successfully!', timer: 1500, showConfirmButton: false });
  }

  addVisitor() {
    if (!this.newVisitor.name) return;
    this.visitors.unshift({ id: Date.now(), ...this.newVisitor });
    this.showVisitorModal = false;
    this.newVisitor = { name: '', purpose: 'General Enquiry', visitorId: 'VIS-' + Math.floor(100 + Math.random() * 900), inTime: '10:00 AM', outTime: '10:30 AM', date: new Date().toISOString().split('T')[0] };
    Swal.fire({ icon: 'success', title: 'Visitor Registered', text: 'Visitor entry recorded.', timer: 1500, showConfirmButton: false });
  }

  addComplaint() {
    if (!this.newComplaint.by) return;
    this.complaints.unshift({ id: Date.now(), ...this.newComplaint });
    this.showComplaintModal = false;
    this.newComplaint = { by: '', type: 'General', assignedTo: 'Admin Desk', date: new Date().toISOString().split('T')[0], status: 'Pending' };
    Swal.fire({ icon: 'success', title: 'Complaint Registered', text: 'Ticket dispatched to administration.', timer: 1500, showConfirmButton: false });
  }

  addPostal() {
    if (!this.newPostal.sender || !this.newPostal.receiver) return;
    this.postalLogs.unshift({ id: Date.now(), ...this.newPostal });
    this.showPostalModal = false;
    this.newPostal = { refNo: 'PST-' + Math.floor(100 + Math.random() * 900), sender: '', receiver: '', type: 'Receive', date: new Date().toISOString().split('T')[0] };
    Swal.fire({ icon: 'success', title: 'Postal Logged', text: 'Postal entry recorded.', timer: 1500, showConfirmButton: false });
  }

  addCall() {
    if (!this.newCall.name || !this.newCall.phone) return;
    this.phoneLogs.unshift({ id: Date.now(), ...this.newCall });
    this.showCallModal = false;
    this.newCall = { name: '', phone: '', callType: 'Incoming', duration: '3m 00s', followUp: 'None', note: '' };
    Swal.fire({ icon: 'success', title: 'Call Logged', text: 'Phone record saved successfully!', timer: 1500, showConfirmButton: false });
  }

  deleteItem(list: 'queries' | 'visitors' | 'complaints' | 'postal' | 'calls', id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel'
    }).then((res: any) => {
      if (res.isConfirmed) {
        if (list === 'queries') this.queries = this.queries.filter(i => i.id !== id);
        if (list === 'visitors') this.visitors = this.visitors.filter(i => i.id !== id);
        if (list === 'complaints') this.complaints = this.complaints.filter(i => i.id !== id);
        if (list === 'postal') this.postalLogs = this.postalLogs.filter(i => i.id !== id);
        if (list === 'calls') this.phoneLogs = this.phoneLogs.filter(i => i.id !== id);
        Swal.fire({ icon: 'success', title: 'Deleted', text: 'Record removed successfully', timer: 1200, showConfirmButton: false });
      }
    });
  }
}
