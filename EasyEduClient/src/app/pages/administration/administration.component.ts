import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare const Swal: any;

export interface AdmissionLead {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  reference: string;
  className: string;
  date: string;
  status: 'Won' | 'Pending' | 'Lost';
  nextFollowUpDate: string;
  notes: string;
}

export interface VisitorRecord {
  id: number;
  name: string;
  phone: string;
  visitorId: string;
  purpose: string;
  inTime: string;
  outTime: string;
  numberOfPersons: number;
  date: string;
  notes: string;
}

export interface ComplaintTicket {
  id: number;
  by: string;
  phone: string;
  type: string;
  assignedTo: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  description: string;
}

export interface PostalRecord {
  id: number;
  refNo: string;
  sender: string;
  receiver: string;
  type: 'Receive' | 'Dispatch';
  confidential: boolean;
  date: string;
}

export interface PhoneRecord {
  id: number;
  name: string;
  phone: string;
  callType: 'Incoming' | 'Outgoing';
  duration: string;
  followUp: string;
  note: string;
  date: string;
}

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  activeTab: 'queries' | 'visitors' | 'complaints' | 'postal' | 'calls' | 'setup' = 'queries';

  // Sliding Drawer Controls
  isFormOpen = false;
  showPublicModal = false;
  publicAdmissionUrl = 'http://localhost:4200/home#admissions';

  // Lead Funnel Data
  queries: AdmissionLead[] = [
    { id: 1, name: 'Vikram Joshi', phone: '+91 98765 11223', email: 'vikram.j@gmail.com', source: 'Online Web', reference: 'Google Ads', className: 'Grade 11 - Science', date: '2026-10-04', status: 'Pending', nextFollowUpDate: '2026-10-08', notes: 'Interested in IIT-JEE integrated coaching stream' },
    { id: 2, name: 'Priya Sharma', phone: '+91 98450 44556', email: 'priya.sharma@outlook.com', source: 'Front Desk', reference: 'Campus Walk-in', className: 'Grade 8', date: '2026-10-03', status: 'Won', nextFollowUpDate: '2026-10-05', notes: 'Completed registration and paid seat booking token' },
    { id: 3, name: 'Sanjay Deshmukh', phone: '+91 97410 77889', email: 'sanjay.d@yahoo.com', source: 'Referral', reference: 'Alumni Network', className: 'Grade 9 - B', date: '2026-10-02', status: 'Pending', nextFollowUpDate: '2026-10-07', notes: 'Requested fee structure breakdown and bus route availability' },
    { id: 4, name: 'Ananya Rao', phone: '+91 99001 22334', email: 'ananya.rao@gmail.com', source: 'Direct / Web', reference: 'Social Media', className: 'Grade 10', date: '2026-09-28', status: 'Lost', nextFollowUpDate: '', notes: 'Relocated to another city' }
  ];

  // Visitor Book Data
  visitors: VisitorRecord[] = [
    { id: 1, name: 'Robert Smith', phone: '+91 98860 11223', visitorId: 'VIS-991', purpose: 'Principal Meeting', inTime: '10:15 AM', outTime: '11:00 AM', numberOfPersons: 2, date: '2026-10-05', notes: 'Quarterly academic review discussion' },
    { id: 2, name: 'Kavita Menon', phone: '+91 94480 55667', visitorId: 'VIS-992', purpose: 'Fee Submission', inTime: '11:30 AM', outTime: '12:10 PM', numberOfPersons: 1, date: '2026-10-05', notes: 'Submitted Term 2 tuition demand draft' }
  ];

  // Complaint Tickets
  complaints: ComplaintTicket[] = [
    { id: 1, by: 'Mrs. Sunita Iyer (Parent)', phone: '+91 98800 44332', type: 'Transport Route Delay', assignedTo: 'Transport Cell', date: '2026-10-03', status: 'In Progress', description: 'Bus Route 4 arrival delayed by 25 mins on morning pick up' },
    { id: 2, by: 'Mr. Arvind Gupta (Parent)', phone: '+91 97411 99882', type: 'Canteen Food Hygiene', assignedTo: 'Admin Section', date: '2026-10-01', status: 'Resolved', description: 'Request to increase fresh fruit and hot meal options in cafeteria' }
  ];

  // Postal Logs
  postalLogs: PostalRecord[] = [
    { id: 1, refNo: 'PST-RCV-041', sender: 'CBSE Regional Board Office', receiver: 'Principal Desk', type: 'Receive', confidential: true, date: '2026-10-04' },
    { id: 2, refNo: 'PST-DSP-088', sender: 'Finance Department', receiver: 'Bank of Baroda Head Office', type: 'Dispatch', confidential: false, date: '2026-10-03' }
  ];

  // Phone Logs
  phoneLogs: PhoneRecord[] = [
    { id: 1, name: 'Dr. Mohan Lal', phone: '+91 98860 12345', callType: 'Incoming', duration: '4m 12s', followUp: '2026-10-08', note: 'Inquired about Grade 12 board preparation curriculum', date: '2026-10-05' },
    { id: 2, name: 'Deepa Hegde', phone: '+91 94480 67890', callType: 'Outgoing', duration: '2m 45s', followUp: 'Completed', note: 'Confirmed fee receipt generation & sports uniform dispatch', date: '2026-10-04' }
  ];

  // Forms
  newLead: Partial<AdmissionLead> = {
    name: '',
    phone: '',
    email: '',
    className: 'Grade 10',
    source: 'Direct / Web',
    reference: 'Online Form',
    status: 'Pending',
    nextFollowUpDate: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0],
    notes: ''
  };

  newVisitor: Partial<VisitorRecord> = {
    name: '',
    phone: '',
    visitorId: 'VIS-' + Math.floor(100 + Math.random() * 900),
    purpose: 'Principal Discussion',
    inTime: '10:00 AM',
    outTime: '10:30 AM',
    numberOfPersons: 1,
    notes: ''
  };

  newComplaint: Partial<ComplaintTicket> = {
    by: '',
    phone: '',
    type: 'Academic Query',
    assignedTo: 'Admin Cell',
    description: '',
    status: 'Pending'
  };

  newPostal: Partial<PostalRecord> = {
    refNo: 'PST-' + Math.floor(1000 + Math.random() * 9000),
    sender: '',
    receiver: '',
    type: 'Receive',
    confidential: false
  };

  newCall: Partial<PhoneRecord> = {
    name: '',
    phone: '',
    callType: 'Incoming',
    duration: '3m 15s',
    followUp: 'Pending',
    note: ''
  };

  // Metrics
  get totalQueries(): number { return this.queries.length; }
  get wonQueries(): number { return this.queries.filter(q => q.status === 'Won').length; }
  get pendingQueries(): number { return this.queries.filter(q => q.status === 'Pending').length; }
  get lostQueries(): number { return this.queries.filter(q => q.status === 'Lost').length; }

  ngOnInit(): void {}

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  saveLead(): void {
    if (!this.newLead.name || !this.newLead.phone) return;
    const lead: AdmissionLead = {
      id: Date.now(),
      name: this.newLead.name,
      phone: this.newLead.phone,
      email: this.newLead.email || 'enquiry@easyedu.com',
      className: this.newLead.className || 'Grade 10',
      source: this.newLead.source || 'Direct / Web',
      reference: this.newLead.reference || 'Walk-in',
      date: new Date().toISOString().split('T')[0],
      status: (this.newLead.status as any) || 'Pending',
      nextFollowUpDate: this.newLead.nextFollowUpDate || '',
      notes: this.newLead.notes || ''
    };
    this.queries.unshift(lead);
    this.isFormOpen = false;
    this.newLead = { name: '', phone: '', email: '', className: 'Grade 10', source: 'Direct / Web', reference: 'Online Form', status: 'Pending', nextFollowUpDate: new Date().toISOString().split('T')[0], notes: '' };
    Swal.fire({ icon: 'success', title: 'Lead Registered', text: `${lead.name} added to the conversion funnel!`, timer: 1500, showConfirmButton: false });
  }

  convertLead(lead: AdmissionLead): void {
    lead.status = 'Won';
    Swal.fire({
      icon: 'success',
      title: 'Enrolled Successfully!',
      text: `${lead.name} has been marked as WON and converted into an official Student Admission profile.`,
      confirmButtonText: 'Great!'
    });
  }

  dropLead(lead: AdmissionLead): void {
    lead.status = 'Lost';
    Swal.fire({
      icon: 'info',
      title: 'Status Updated',
      text: `${lead.name} marked as Lead Dropped.`,
      timer: 1500,
      showConfirmButton: false
    });
  }

  saveVisitor(): void {
    if (!this.newVisitor.name || !this.newVisitor.phone) return;
    this.visitors.unshift({
      id: Date.now(),
      name: this.newVisitor.name,
      phone: this.newVisitor.phone,
      visitorId: this.newVisitor.visitorId || 'VIS-' + Math.floor(100 + Math.random() * 900),
      purpose: this.newVisitor.purpose || 'Official Visit',
      inTime: this.newVisitor.inTime || '10:00 AM',
      outTime: this.newVisitor.outTime || '10:30 AM',
      numberOfPersons: this.newVisitor.numberOfPersons || 1,
      date: new Date().toISOString().split('T')[0],
      notes: this.newVisitor.notes || ''
    });
    this.isFormOpen = false;
    Swal.fire({ icon: 'success', title: 'Entry Authorized', text: 'Visitor badge & gate pass generated.', timer: 1500, showConfirmButton: false });
  }

  saveComplaint(): void {
    if (!this.newComplaint.by || !this.newComplaint.description) return;
    this.complaints.unshift({
      id: Date.now(),
      by: this.newComplaint.by,
      phone: this.newComplaint.phone || '+91 98000 00000',
      type: this.newComplaint.type || 'General Inquiry',
      assignedTo: this.newComplaint.assignedTo || 'Admin Desk',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      description: this.newComplaint.description
    });
    this.isFormOpen = false;
    Swal.fire({ icon: 'success', title: 'Ticket Lodged', text: 'Complaint recorded and dispatched.', timer: 1500, showConfirmButton: false });
  }

  resolveComplaint(c: ComplaintTicket): void {
    c.status = 'Resolved';
    Swal.fire({ icon: 'success', title: 'Ticket Resolved', text: 'Complaint status marked as Resolved.', timer: 1500, showConfirmButton: false });
  }

  savePostal(): void {
    if (!this.newPostal.sender || !this.newPostal.receiver) return;
    this.postalLogs.unshift({
      id: Date.now(),
      refNo: this.newPostal.refNo || 'PST-' + Math.floor(1000 + Math.random() * 9000),
      sender: this.newPostal.sender,
      receiver: this.newPostal.receiver,
      type: this.newPostal.type || 'Receive',
      confidential: !!this.newPostal.confidential,
      date: new Date().toISOString().split('T')[0]
    });
    this.isFormOpen = false;
    Swal.fire({ icon: 'success', title: 'Postal Dispatched', text: 'Postal tracking record saved.', timer: 1500, showConfirmButton: false });
  }

  saveCall(): void {
    if (!this.newCall.name || !this.newCall.phone) return;
    this.phoneLogs.unshift({
      id: Date.now(),
      name: this.newCall.name,
      phone: this.newCall.phone,
      callType: this.newCall.callType || 'Incoming',
      duration: this.newCall.duration || '2m 30s',
      followUp: this.newCall.followUp || 'Completed',
      note: this.newCall.note || 'General inquiry',
      date: new Date().toISOString().split('T')[0]
    });
    this.isFormOpen = false;
    Swal.fire({ icon: 'success', title: 'Call Record Logged', text: 'Phone register updated.', timer: 1500, showConfirmButton: false });
  }

  deleteItem(list: 'queries' | 'visitors' | 'complaints' | 'postal' | 'calls', id: number): void {
    Swal.fire({
      title: 'Confirm Deletion?',
      text: 'Do you want to permanently remove this institutional record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancel'
    }).then((res: any) => {
      if (res.isConfirmed) {
        if (list === 'queries') this.queries = this.queries.filter(i => i.id !== id);
        if (list === 'visitors') this.visitors = this.visitors.filter(i => i.id !== id);
        if (list === 'complaints') this.complaints = this.complaints.filter(i => i.id !== id);
        if (list === 'postal') this.postalLogs = this.postalLogs.filter(i => i.id !== id);
        if (list === 'calls') this.phoneLogs = this.phoneLogs.filter(i => i.id !== id);
        Swal.fire({ icon: 'success', title: 'Removed', text: 'Record removed successfully.', timer: 1200, showConfirmButton: false });
      }
    });
  }

  copyPublicLink(): void {
    navigator.clipboard.writeText(this.publicAdmissionUrl);
    Swal.fire({
      icon: 'success',
      title: 'URL Copied!',
      text: 'Public admission link copied to clipboard.',
      timer: 1500,
      showConfirmButton: false
    });
  }
}
