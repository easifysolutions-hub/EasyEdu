import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

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
  interestLevel: 'High' | 'Medium' | 'Low';
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
  status: 'Active' | 'Resolved';
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
  notes: string;
  verifiedBy: string;
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
  activeTab: 'queries' | 'visitors' | 'complaints' | 'postal-receive' | 'postal-dispatch' | 'calls' | 'setup' = 'queries';
  postalSubTab: 'receive' | 'dispatch' = 'dispatch';

  // Sliding Drawer / Card controls
  isFormOpen = true;
  showPublicModal = false;
  publicAdmissionUrl = 'http://localhost:4200/home#admissions';

  // Lead Funnel Data (Empty by default or populated dynamically)
  queries: AdmissionLead[] = [];

  // Visitor Book Data
  visitors: VisitorRecord[] = [];

  // Complaint Tickets
  complaints: ComplaintTicket[] = [];

  // Postal Logs
  postalLogs: PostalRecord[] = [];

  // Phone Logs
  phoneLogs: PhoneRecord[] = [];

  // 15 Master Items from Screenshot Image 3
  setupMasterItems = [
    { name: 'Advertisement', category: 'Source', description: '' },
    { name: 'Website', category: 'Source', description: '' },
    { name: 'Direct Visit', category: 'Source', description: '' },
    { name: 'Referral', category: 'Source', description: '' },
    { name: 'Social Media', category: 'Source', description: '' },
    { name: 'Newspaper', category: 'Reference', description: '' },
    { name: 'Facebook', category: 'Reference', description: '' },
    { name: 'Google', category: 'Reference', description: '' },
    { name: 'Friend/Relative', category: 'Reference', description: '' },
    { name: 'Admission Inquiry', category: 'Purpose', description: '' },
    { name: 'Fees Payment', category: 'Purpose', description: '' },
    { name: 'Meeting', category: 'Purpose', description: '' },
    { name: 'Academic', category: 'ComplaintType', description: '' },
    { name: 'Transport', category: 'ComplaintType', description: '' },
    { name: 'Infrastructure', category: 'ComplaintType', description: '' }
  ];

  newSetupItem = {
    category: 'Source',
    name: '',
    description: ''
  };

  newCall = {
    responderName: '',
    phone: '',
    callType: 'Incoming Flow',
    duration: '',
    followUpDate: '',
    summary: ''
  };

  // Form Models
  newLead: Partial<AdmissionLead> = {
    name: '',
    phone: '',
    email: '',
    className: 'Grade 10',
    source: 'Direct / Web',
    reference: 'Online Form',
    interestLevel: 'High',
    status: 'Pending',
    nextFollowUpDate: '2026-10-08',
    notes: ''
  };

  newVisitor: Partial<VisitorRecord> = {
    name: '',
    phone: '',
    visitorId: '',
    purpose: '',
    inTime: '09:00',
    numberOfPersons: 1,
    notes: ''
  };

  newComplaint: Partial<ComplaintTicket> = {
    by: '',
    phone: '',
    type: '',
    assignedTo: 'Facility Manager / Academic Head',
    description: '',
    status: 'Active'
  };

  newPostalDispatch: Partial<PostalRecord> = {
    refNo: '',
    sender: 'Institution Dept',
    receiver: 'Mail Destination',
    date: '2026-10-05',
    notes: '',
    type: 'Dispatch',
    verifiedBy: 'Dispatch Desk'
  };

  newPostalReceive: Partial<PostalRecord> = {
    refNo: '',
    sender: '',
    receiver: '',
    date: '2026-10-05',
    notes: '',
    type: 'Receive',
    verifiedBy: 'Reception Desk'
  };

  // Metrics
  get totalQueries(): number { return this.queries.length; }
  get wonQueries(): number { return this.queries.filter(q => q.status === 'Won').length; }
  get pendingQueries(): number { return this.queries.filter(q => q.status === 'Pending').length; }
  get lostQueries(): number { return this.queries.filter(q => q.status === 'Lost').length; }

  get activeComplaints(): number { return this.complaints.filter(c => c.status === 'Active').length; }
  get resolvedComplaints(): number { return this.complaints.filter(c => c.status === 'Resolved').length; }

  get dispatchPostalLogs(): PostalRecord[] { return this.postalLogs.filter(p => p.type === 'Dispatch'); }
  get receivePostalLogs(): PostalRecord[] { return this.postalLogs.filter(p => p.type === 'Receive'); }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const tab = params['tab'];
        if (tab === 'queries' || tab === 'visitors' || tab === 'complaints' || tab === 'postal-receive' || tab === 'postal-dispatch' || tab === 'calls' || tab === 'setup') {
          this.activeTab = tab;
          if (tab === 'postal-receive') {
            this.postalSubTab = 'receive';
          } else if (tab === 'postal-dispatch') {
            this.postalSubTab = 'dispatch';
          }
        }
      }
    });
  }

  setTab(tab: 'queries' | 'visitors' | 'complaints' | 'postal-receive' | 'postal-dispatch' | 'calls' | 'setup'): void {
    this.activeTab = tab;
    if (tab === 'postal-receive') this.postalSubTab = 'receive';
    if (tab === 'postal-dispatch') this.postalSubTab = 'dispatch';
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab: tab } });
  }

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  saveLead(): void {
    if (!this.newLead.name || !this.newLead.phone) {
      this.queries.unshift({
        id: Date.now(),
        name: this.newLead.name || 'John Doe',
        phone: this.newLead.phone || '+91 98765 43210',
        email: this.newLead.email || 'lead@domain.com',
        source: this.newLead.source || 'Online Ad',
        reference: this.newLead.reference || 'Google',
        className: this.newLead.className || 'Grade 10',
        date: new Date().toISOString().split('T')[0],
        interestLevel: this.newLead.interestLevel || 'High',
        status: 'Pending',
        nextFollowUpDate: this.newLead.nextFollowUpDate || '2026-10-10',
        notes: this.newLead.notes || 'Counseling requested'
      });
    } else {
      this.queries.unshift({
        id: Date.now(),
        name: this.newLead.name,
        phone: this.newLead.phone,
        email: this.newLead.email || 'lead@domain.com',
        source: this.newLead.source || 'Online Ad',
        reference: this.newLead.reference || 'Google',
        className: this.newLead.className || 'Grade 10',
        date: new Date().toISOString().split('T')[0],
        interestLevel: this.newLead.interestLevel || 'High',
        status: 'Pending',
        nextFollowUpDate: this.newLead.nextFollowUpDate || '2026-10-10',
        notes: this.newLead.notes || ''
      });
    }
    this.isFormOpen = false;
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Lead Enrolled', text: 'Potential enrollment added successfully.', timer: 1500, showConfirmButton: false });
    }
  }

  saveVisitor(): void {
    this.visitors.unshift({
      id: Date.now(),
      name: this.newVisitor.name || 'Robert Smith',
      phone: this.newVisitor.phone || '+91 98765 43210',
      visitorId: this.newVisitor.visitorId || 'GOV-' + Math.floor(1000 + Math.random()*9000),
      purpose: this.newVisitor.purpose || 'Principal Meeting',
      inTime: this.newVisitor.inTime || '09:00 AM',
      outTime: 'Active Pass',
      numberOfPersons: this.newVisitor.numberOfPersons || 1,
      date: new Date().toISOString().split('T')[0],
      notes: this.newVisitor.notes || 'Authorized gate entry'
    });
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Passage Authorized', text: 'Visitor entry validated.', timer: 1500, showConfirmButton: false });
    }
  }

  saveComplaint(): void {
    this.complaints.unshift({
      id: Date.now(),
      by: this.newComplaint.by || 'Parent / Student Representative',
      phone: this.newComplaint.phone || '+91 98765 43210',
      type: this.newComplaint.type || 'Transport Issue',
      assignedTo: this.newComplaint.assignedTo || 'Facility Manager / Academic Head',
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      description: this.newComplaint.description || 'Grievance ticket created'
    });
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Grievance Registered', text: 'Formal complaint filed.', timer: 1500, showConfirmButton: false });
    }
  }

  savePostalDispatch(): void {
    this.postalLogs.unshift({
      id: Date.now(),
      refNo: this.newPostalDispatch.refNo || 'TRK-' + Math.floor(10000 + Math.random()*90000),
      sender: this.newPostalDispatch.sender || 'Institution Dept',
      receiver: this.newPostalDispatch.receiver || 'Mail Destination',
      type: 'Dispatch',
      confidential: false,
      date: this.newPostalDispatch.date || '05-10-2026',
      notes: this.newPostalDispatch.notes || 'Consignment logged',
      verifiedBy: 'Dispatch Officer'
    });
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Dispatch Recorded', text: 'Postal dispatch entry committed.', timer: 1500, showConfirmButton: false });
    }
  }

  savePostalReceive(): void {
    this.postalLogs.unshift({
      id: Date.now(),
      refNo: this.newPostalReceive.refNo || 'TRK-' + Math.floor(10000 + Math.random()*90000),
      sender: this.newPostalReceive.sender || 'Sender Express',
      receiver: this.newPostalReceive.receiver || 'Principal Office',
      type: 'Receive',
      confidential: false,
      date: this.newPostalReceive.date || '05-10-2026',
      notes: this.newPostalReceive.notes || 'Received parcel logged',
      verifiedBy: 'Receptionist'
    });
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Receive Recorded', text: 'Postal receive entry committed.', timer: 1500, showConfirmButton: false });
    }
  }

  saveCall(): void {
    this.phoneLogs.unshift({
      id: Date.now(),
      name: this.newCall.responderName || 'Caller Representative',
      phone: this.newCall.phone || '+91 98765 43210',
      callType: this.newCall.callType === 'Incoming Flow' ? 'Incoming' : 'Outgoing',
      duration: this.newCall.duration || '05:20',
      followUp: this.newCall.followUpDate || '2026-10-06',
      note: this.newCall.summary || 'General inquiry',
      date: new Date().toISOString().split('T')[0]
    });
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Call Logged', text: 'Telephonic communication archived.', timer: 1500, showConfirmButton: false });
    }
  }

  addSetupMaster(): void {
    if (!this.newSetupItem.name) return;
    this.setupMasterItems.push({
      name: this.newSetupItem.name,
      category: this.newSetupItem.category,
      description: this.newSetupItem.description || ''
    });
    this.newSetupItem.name = '';
    this.newSetupItem.description = '';
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Item Saved', text: 'Configuration master updated.', timer: 1200, showConfirmButton: false });
    }
  }

  deleteSetupMasterItem(index: number): void {
    this.setupMasterItems.splice(index, 1);
  }
}
