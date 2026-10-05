import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface Incident {
  id: number;
  title: string;
  type: 'Positive Merit (+)' | 'Negative Infraction (-)';
  point: number;
  description: string;
}

export interface AssignedIncident {
  id: number;
  studentName: string;
  admissionNo: string;
  class: string;
  incidentTitle: string;
  type: 'Positive Merit (+)' | 'Negative Infraction (-)';
  point: number;
  assignedDate: string;
  assignedBy: string;
  remarks: string;
}

@Component({
  selector: 'app-behaviour',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './behaviour.component.html',
  styleUrls: ['./behaviour.component.css']
})
export class BehaviourComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'incidents' | 'assign' | 'student-report' | 'behaviour-report' | 'class-section-report' | 'incident-wise-report' | 'settings' | 'log' = 'incidents';

  incidentsMaster: Incident[] = [
    { id: 1, title: 'Exemplary Leadership in School Event', type: 'Positive Merit (+)', point: 10, description: 'Demonstrated proactive leadership and team coordination in inter-house competitions.' },
    { id: 2, title: 'Outstanding Academic Scholastic Effort', type: 'Positive Merit (+)', point: 8, description: 'Exceptional diligence in classroom assignments and peer tutoring.' },
    { id: 3, title: 'Civic Duty & Campus Cleanliness Champion', type: 'Positive Merit (+)', point: 5, description: 'Voluntarily organized campus eco-drive and waste segregation.' },
    { id: 4, title: 'Unexcused Classroom Disruption / Late Arrival', type: 'Negative Infraction (-)', point: -3, description: 'Repeatedly entering classroom after bell without teacher pass.' },
    { id: 5, title: 'Incomplete Homework & Missing Lab Record', type: 'Negative Infraction (-)', point: -5, description: 'Failure to submit coursework on time despite reminders.' },
    { id: 6, title: 'Improper Uniform / Missing ID Card', type: 'Negative Infraction (-)', point: -2, description: 'Attending assembly without institutional ID badge.' }
  ];

  assignedList: AssignedIncident[] = [
    { id: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', incidentTitle: 'Exemplary Leadership in School Event', type: 'Positive Merit (+)', point: 10, assignedDate: '2025-05-02', assignedBy: 'Dr. Ramesh Sharma', remarks: 'Led science fair team to victory.' },
    { id: 2, studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', class: 'Grade 9-A', incidentTitle: 'Outstanding Academic Scholastic Effort', type: 'Positive Merit (+)', point: 8, assignedDate: '2025-05-01', assignedBy: 'Pooja Hegde', remarks: 'Highest score in term essay.' },
    { id: 3, studentName: 'Rohan Gupta', admissionNo: 'ADM-2024-003', class: 'Grade 10-A', incidentTitle: 'Unexcused Classroom Disruption / Late Arrival', type: 'Negative Infraction (-)', point: -3, assignedDate: '2025-04-29', assignedBy: 'Sunita Nair', remarks: 'Arrived 20 mins late for chemistry practicals.' },
    { id: 4, studentName: 'Aditi Rao', admissionNo: 'ADM-2024-002', class: 'Grade 10-A', incidentTitle: 'Civic Duty & Campus Cleanliness Champion', type: 'Positive Merit (+)', point: 5, assignedDate: '2025-05-03', assignedBy: 'Admin Team', remarks: 'Tree plantation drive coordinator.' }
  ];

  // Assign Modal / Form
  assignForm = {
    studentName: 'Aarav Sharma',
    admissionNo: 'ADM-2024-001',
    class: 'Grade 10-A',
    incidentId: 1,
    remarks: 'Commendable behavior.'
  };

  // Add Incident Master Modal
  showAddIncidentModal = false;
  newIncident: Partial<Incident> = {
    title: '',
    type: 'Positive Merit (+)',
    point: 5,
    description: ''
  };

  // Settings
  behaviourSettings = {
    warningThresholdPoints: -10,
    commendationThresholdPoints: 25,
    sendSmsOnNegativeIncident: true,
    sendSmsOnPositiveIncident: true,
    allowTeacherDirectAssign: true
  };

  ngOnInit(): void {
    this.syncActiveTabFromUrl();

    this.route.url.subscribe(() => {
      this.syncActiveTabFromUrl();
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  private syncActiveTabFromUrl(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('assignincident')) {
      this.activeTab = 'assign';
    } else if (path.includes('studentincidentreport')) {
      this.activeTab = 'student-report';
    } else if (path.includes('behaviourreport')) {
      this.activeTab = 'behaviour-report';
    } else if (path.includes('classsectionreport')) {
      this.activeTab = 'class-section-report';
    } else if (path.includes('incidentwisereport')) {
      this.activeTab = 'incident-wise-report';
    } else if (path.includes('behaviourrecords/settings') || path.includes('behaviour/settings')) {
      this.activeTab = 'settings';
    } else if (path.includes('incidents')) {
      this.activeTab = 'incidents';
    }
  }

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  saveAssignedIncident(): void {
    const inc = this.incidentsMaster.find(i => i.id === Number(this.assignForm.incidentId));
    if (!inc) return;

    const assigned: AssignedIncident = {
      id: this.assignedList.length + 1,
      studentName: this.assignForm.studentName,
      admissionNo: this.assignForm.admissionNo,
      class: this.assignForm.class,
      incidentTitle: inc.title,
      type: inc.type,
      point: inc.point,
      assignedDate: new Date().toISOString().substring(0, 10),
      assignedBy: 'Logged-in Faculty',
      remarks: this.assignForm.remarks
    };

    this.assignedList.unshift(assigned);
    this.activeTab = 'log';

    Swal.fire({
      title: 'Incident Logged!',
      text: `${inc.title} (${inc.point > 0 ? '+' : ''}${inc.point} pts) recorded for ${assigned.studentName}.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  saveNewIncidentMaster(): void {
    if (!this.newIncident.title) {
      Swal.fire('Missing Title', 'Please enter Incident Title.', 'warning');
      return;
    }

    const inc: Incident = {
      id: this.incidentsMaster.length + 1,
      title: this.newIncident.title!,
      type: this.newIncident.type || 'Positive Merit (+)',
      point: Number(this.newIncident.point) || 5,
      description: this.newIncident.description || ''
    };

    this.incidentsMaster.push(inc);
    this.showAddIncidentModal = false;
    this.newIncident = { title: '', type: 'Positive Merit (+)', point: 5, description: '' };

    Swal.fire('Incident Rule Saved', 'New behavioral incident metric registered.', 'success');
  }

  saveSettings(): void {
    Swal.fire('Settings Saved', 'Disciplinary policy configurations updated.', 'success');
  }
}

