import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AttendanceRecord } from '../../core/models';

declare const Swal: any;

export interface BiometricDevice {
  id: number;
  name: string;
  ipAddress: string;
  port: number;
  location: string;
  status: 'Online' | 'Offline' | 'Syncing';
  lastPing: string;
  totalLogsToday: number;
  deviceType: 'ZKTeco K40' | 'eSSL SilkBio' | 'Realtime Facial POS' | 'Anviz Optical';
}

export interface BiometricPunchLog {
  id: string;
  userId: string;
  name: string;
  role: 'Student' | 'Staff';
  classOrDept: string;
  punchTime: string;
  deviceLocation: string;
  verificationType: 'Fingerprint' | 'Facial Recognition' | 'RFID Card';
  status: 'Accepted' | 'Late Entry' | 'Duplicate Skipped';
}

export interface QrScanRecord {
  id: string;
  studentName: string;
  admissionNo: string;
  class: string;
  scanTime: string;
  gateLocation: string;
  smsDispatched: boolean;
  status: 'Present' | 'Late';
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  viewMode: 'daily' | 'subject' | 'report' | 'biometrics' | 'qr' = 'daily';
  bioSubTab: 'dashboard' | 'student-report' | 'staff-report' | 'settings' = 'dashboard';
  qrSubTab: 'dashboard' | 'settings' | 'auto-submission' = 'dashboard';

  attendanceType: 'student' | 'staff' = 'student';
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedClass: string = 'Grade 10';
  selectedSection: string = 'Section A';
  selectedSubject: string = 'Physics';

  attendanceRecords: AttendanceRecord[] = [];
  staffAttendanceRecords: AttendanceRecord[] = [];
  subjects = ['Physics', 'Mathematics', 'Chemistry', 'English Literature', 'Biology', 'Computer Science'];

  // Smart Biometric Terminals
  biometricDevices: BiometricDevice[] = [
    { id: 1, name: 'Main Campus Gate 1 Terminal', ipAddress: '192.168.1.201', port: 4370, location: 'North Gate Entrance', status: 'Online', lastPing: 'Just Now (2s ago)', totalLogsToday: 412, deviceType: 'eSSL SilkBio' },
    { id: 2, name: 'Senior Wing Staff Lounge', ipAddress: '192.168.1.202', port: 4370, location: 'Faculty Room Block B', status: 'Online', lastPing: 'Just Now (4s ago)', totalLogsToday: 86, deviceType: 'ZKTeco K40' },
    { id: 3, name: 'Science & STEM Lab Entrance', ipAddress: '192.168.1.205', port: 4370, location: 'Lab Complex 2nd Floor', status: 'Online', lastPing: '12s ago', totalLogsToday: 154, deviceType: 'Realtime Facial POS' },
    { id: 4, name: 'Hostel & Dormitory East Wing', ipAddress: '192.168.1.208', port: 4370, location: 'Hostel Main Foyer', status: 'Syncing', lastPing: '35s ago', totalLogsToday: 210, deviceType: 'Anviz Optical' }
  ];

  punchLogs: BiometricPunchLog[] = [
    { id: 'LOG-9921', userId: 'ADM-2024-001', name: 'Aarav Sharma', role: 'Student', classOrDept: 'Grade 10-A', punchTime: '08:14:22 AM', deviceLocation: 'North Gate Entrance', verificationType: 'Facial Recognition', status: 'Accepted' },
    { id: 'LOG-9922', userId: 'ADM-2024-002', name: 'Diya Patel', role: 'Student', classOrDept: 'Grade 10-B', punchTime: '08:16:05 AM', deviceLocation: 'North Gate Entrance', verificationType: 'Fingerprint', status: 'Accepted' },
    { id: 'LOG-9923', userId: 'STF-001', name: 'Dr. Ramesh Sharma', role: 'Staff', classOrDept: 'Mathematics Dept', punchTime: '08:05:11 AM', deviceLocation: 'Faculty Room Block B', verificationType: 'Fingerprint', status: 'Accepted' },
    { id: 'LOG-9924', userId: 'STF-002', name: 'Sunita Nair', role: 'Staff', classOrDept: 'Physics Dept', punchTime: '08:22:40 AM', deviceLocation: 'Faculty Room Block B', verificationType: 'Facial Recognition', status: 'Accepted' },
    { id: 'LOG-9925', userId: 'ADM-2024-005', name: 'Kabir Singh', role: 'Student', classOrDept: 'Grade 11-Science', punchTime: '08:42:15 AM', deviceLocation: 'North Gate Entrance', verificationType: 'RFID Card', status: 'Late Entry' },
    { id: 'LOG-9926', userId: 'ADM-2024-008', name: 'Rohan Mehra', role: 'Student', classOrDept: 'Grade 9-A', punchTime: '08:19:30 AM', deviceLocation: 'North Gate Entrance', verificationType: 'Fingerprint', status: 'Accepted' }
  ];

  // QR Attendance System
  qrScans: QrScanRecord[] = [
    { id: 'QR-101', studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', scanTime: '08:12 AM', gateLocation: 'Kiosk Scanner 1', smsDispatched: true, status: 'Present' },
    { id: 'QR-102', studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', class: 'Grade 10-B', scanTime: '08:15 AM', gateLocation: 'Kiosk Scanner 1', smsDispatched: true, status: 'Present' },
    { id: 'QR-103', studentName: 'Kabir Singh', admissionNo: 'ADM-2024-005', class: 'Grade 11-Science', scanTime: '08:38 AM', gateLocation: 'Kiosk Scanner 2', smsDispatched: true, status: 'Late' },
    { id: 'QR-104', studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', class: 'Grade 9-A', scanTime: '08:20 AM', gateLocation: 'Kiosk Scanner 1', smsDispatched: true, status: 'Present' }
  ];

  // Device Settings
  bioSettings = {
    autoPollIntervalSeconds: 30,
    lateGracePeriodMinutes: 15,
    enableAutoAttendanceConversion: true,
    pushSmsOnAbsence: true,
    zkTecoCommKey: '0'
  };

  qrSettings = {
    codeRefreshSeconds: 15,
    allowMobileQrScanner: true,
    geoFencingEnabled: true,
    allowedRadiusMeters: 200,
    kioskModePin: '8899'
  };

  ngOnInit(): void {
    this.loadStudentAttendance();
    this.loadStaffAttendance();
    this.syncRoute();

    this.route.queryParams.subscribe(() => this.syncRoute());
    this.route.url.subscribe(() => this.syncRoute());
  }

  private syncRoute(): void {
    const path = this.router.url.toLowerCase();

    if (path.includes('biometrics')) {
      this.viewMode = 'biometrics';
      if (path.includes('studentreport')) this.bioSubTab = 'student-report';
      else if (path.includes('staffreport')) this.bioSubTab = 'staff-report';
      else if (path.includes('settings')) this.bioSubTab = 'settings';
      else this.bioSubTab = 'dashboard';
    } else if (path.includes('qrattendance')) {
      this.viewMode = 'qr';
      if (path.includes('settings')) this.qrSubTab = 'settings';
      else if (path.includes('autosubmission')) this.qrSubTab = 'auto-submission';
      else this.qrSubTab = 'dashboard';
    } else if (path.includes('subjectwiseattendance')) {
      this.viewMode = 'subject';
    } else if (path.includes('attendance/report')) {
      this.viewMode = 'report';
    }
  }

  loadStudentAttendance(): void {
    this.api.getStudents().subscribe(students => {
      this.attendanceRecords = students.map((s, index) => ({
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        rollNo: s.rollNo || (101 + index).toString(),
        date: this.selectedDate,
        status: index === 3 ? 'Absent' : index === 5 ? 'Late' : 'Present'
      }));
    });
  }

  loadStaffAttendance(): void {
    this.api.getStaff().subscribe(staff => {
      this.staffAttendanceRecords = staff.map((st) => ({
        studentId: st.id,
        studentName: `${st.firstName} ${st.lastName} (${st.designation})`,
        rollNo: st.staffNo,
        date: this.selectedDate,
        status: 'Present'
      }));
    });
  }

  get activeRecords(): AttendanceRecord[] {
    return this.attendanceType === 'student' ? this.attendanceRecords : this.staffAttendanceRecords;
  }

  get totalCount(): number { return this.activeRecords.length; }
  get presentCount(): number { return this.activeRecords.filter(r => r.status === 'Present').length; }
  get absentCount(): number { return this.activeRecords.filter(r => r.status === 'Absent').length; }
  get lateCount(): number { return this.activeRecords.filter(r => r.status === 'Late').length; }
  get attendancePercent(): number {
    if (this.totalCount === 0) return 100;
    return Math.round((this.presentCount / this.totalCount) * 100);
  }

  setStatus(record: AttendanceRecord, status: 'Present' | 'Absent' | 'Late' | 'HalfDay'): void {
    record.status = status;
  }

  markAll(status: 'Present' | 'Absent'): void {
    this.activeRecords.forEach(r => r.status = status);
  }

  saveAttendance(): void {
    Swal.fire({
      title: 'Attendance Recorded!',
      text: `Successfully saved ${this.attendanceType} attendance for ${this.selectedDate}. Notifications sent to parents for absent students.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  syncBiometricsNow(): void {
    Swal.fire({
      title: 'Polling Biometric Terminals...',
      html: '<div class="text-center p-2"><i class="fas fa-fingerprint fa-spin fa-3x text-primary mb-3"></i><p class="small text-muted mb-0">Connecting to TCP port 4370 across 4 terminals...</p></div>',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      Swal.fire({
        title: 'Biometrics Synced!',
        text: 'All 862 punch transactions successfully imported from hardware terminals and converted to class registers.',
        icon: 'success',
        confirmButtonColor: '#002B49'
      });
    });
  }

  triggerQrSimulation(): void {
    const newScan: QrScanRecord = {
      id: 'QR-' + Math.floor(100 + Math.random() * 900),
      studentName: 'Riya Sen',
      admissionNo: 'ADM-2024-012',
      class: 'Grade 10-A',
      scanTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gateLocation: 'Main Kiosk',
      smsDispatched: true,
      status: 'Present'
    };
    this.qrScans.unshift(newScan);
    Swal.fire({
      title: 'QR Badge Verified!',
      text: `Student ${newScan.studentName} (${newScan.admissionNo}) scanned at ${newScan.gateLocation}. Instant SMS sent to parent.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }

  saveBioSettings(): void {
    Swal.fire('Settings Saved', 'Biometric terminal synchronization parameters updated.', 'success');
  }

  saveQrSettings(): void {
    Swal.fire('QR Config Saved', 'QR code validity and geo-fence parameters updated.', 'success');
  }
}
