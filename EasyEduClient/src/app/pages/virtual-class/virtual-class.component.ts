import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface VirtualMeeting {
  id: number;
  topic: string;
  type: 'Class' | 'Meeting';
  provider: 'Zoom' | 'Google Meet' | 'Jitsi' | 'BigBlueButton' | 'InAppLive';
  class?: string;
  subject?: string;
  department?: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  meetingId: string;
  passcode: string;
  joinUrl: string;
  status: 'Live Now' | 'Scheduled' | 'Upcoming' | 'Completed';
  participantsCount: number;
  attendanceRate?: number;
}

export interface ClassRecording {
  id: number;
  topic: string;
  provider: 'Zoom' | 'Google Meet' | 'Jitsi' | 'BigBlueButton';
  type: 'Class' | 'Meeting';
  subject: string;
  class: string;
  teacher: string;
  date: string;
  duration: string;
  viewsCount: number;
  fileSize: string;
  downloadUrl: string;
}

@Component({
  selector: 'app-virtual-class',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './virtual-class.component.html',
  styleUrls: ['./virtual-class.component.css']
})
export class VirtualClassComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeSuite: 'zoom' | 'gmeet' | 'jitsi' | 'bbb' | 'inapp' | 'all' = 'all';
  activeSubTab: 'dashboard' | 'class' | 'meeting' | 'class-reports' | 'meeting-reports' | 'recordings' | 'settings' = 'dashboard';

  searchTerm = '';
  statusFilter = 'All';

  // Live Studio State
  isStreamActive = false;
  isMicMuted = false;
  isCameraOff = false;
  isScreenSharing = false;

  // Virtual Meetings & Classes Store
  meetings: VirtualMeeting[] = [
    { id: 1, topic: 'Grade 10 Mathematics - Trigonometry Live Problem Solving', type: 'Class', provider: 'Zoom', class: 'Grade 10-A', subject: 'Mathematics', date: 'Today', time: '04:00 PM - 04:45 PM', duration: '45 mins', host: 'Dr. Ramesh Sharma', meetingId: '892 4410 9128', passcode: 'EASY2025', joinUrl: 'https://zoom.us/j/89244109128', status: 'Live Now', participantsCount: 38, attendanceRate: 95 },
    { id: 2, topic: 'Physics Optics & Wave Theory Interactive Lab Review', type: 'Class', provider: 'Google Meet', class: 'Grade 10-B', subject: 'Physics', date: 'Today', time: '05:30 PM - 06:30 PM', duration: '60 mins', host: 'Sunita Nair', meetingId: 'gmeet-optics-2025', passcode: 'Direct Link', joinUrl: 'https://meet.google.com/abc-defg-hij', status: 'Scheduled', participantsCount: 42, attendanceRate: 92 },
    { id: 3, topic: 'Computer Science Data Structures & Python Algorithms', type: 'Class', provider: 'Jitsi', class: 'Grade 11-Science', subject: 'Computer Science', date: 'Tomorrow', time: '10:00 AM - 10:45 AM', duration: '45 mins', host: 'Prof. Rajesh Khanna', meetingId: 'jitsi-cs-algo', passcode: 'Open SSL', joinUrl: 'https://meet.jit.si/EasyEduCS101', status: 'Upcoming', participantsCount: 35, attendanceRate: 88 },
    { id: 4, topic: 'Faculty Academic Senate & Curriculum Committee Sync', type: 'Meeting', provider: 'BigBlueButton', department: 'Academic Administration', subject: 'Administration', date: 'Today', time: '03:00 PM - 04:00 PM', duration: '60 mins', host: 'Principal Dr. V. Rao', meetingId: 'BBB-SENATE-01', passcode: 'ADMIN#99', joinUrl: 'https://bbb.easyedu.cloud/b/adm-99', status: 'Live Now', participantsCount: 18, attendanceRate: 100 },
    { id: 5, topic: 'English Literature Poetry & Creative Writing Workshop', type: 'Class', provider: 'Zoom', class: 'Grade 9-A', subject: 'English', date: 'Yesterday', time: '02:00 PM - 03:00 PM', duration: '60 mins', host: 'Pooja Hegde', meetingId: '772 1092 3341', passcode: 'LIT99', joinUrl: 'https://zoom.us/j/77210923341', status: 'Completed', participantsCount: 40, attendanceRate: 94 },
    { id: 6, topic: 'Parents-Teacher Consultation Assembly (Quarter 1)', type: 'Meeting', provider: 'Zoom', department: 'Senior Wing', subject: 'Parent Consultation', date: 'Yesterday', time: '05:00 PM - 06:30 PM', duration: '90 mins', host: 'Vice Principal', meetingId: '992 0184 7712', passcode: 'PTA2025', joinUrl: 'https://zoom.us/j/99201847712', status: 'Completed', participantsCount: 84, attendanceRate: 98 },
    { id: 7, topic: 'Biology Cytology & Genetics Microscopic Review', type: 'Class', provider: 'BigBlueButton', class: 'Grade 12-Bio', subject: 'Biology', date: 'Today', time: '02:30 PM - 03:30 PM', duration: '60 mins', host: 'Dr. Anand Joshi', meetingId: 'BBB-BIO-12', passcode: 'BIO#44', joinUrl: 'https://bbb.easyedu.cloud/b/bio-12', status: 'Scheduled', participantsCount: 32, attendanceRate: 91 }
  ];

  recordings: ClassRecording[] = [
    { id: 1, topic: 'Chemical Bonding & Periodic Molecular Structure', provider: 'BigBlueButton', type: 'Class', subject: 'Chemistry', class: 'Grade 10-A', teacher: 'Dr. Ramesh Sharma', date: '02 May 2025', duration: '52 mins', viewsCount: 142, fileSize: '280 MB', downloadUrl: '#' },
    { id: 2, topic: 'Calculus Fundamentals: Limits & Derivatives', provider: 'Zoom', type: 'Class', subject: 'Mathematics', class: 'Grade 11-Science', teacher: 'Sunita Nair', date: '28 Apr 2025', duration: '58 mins', viewsCount: 198, fileSize: '320 MB', downloadUrl: '#' },
    { id: 3, topic: 'Python Object Oriented Programming Classes', provider: 'Jitsi', type: 'Class', subject: 'Computer Science', class: 'Grade 12-CS', teacher: 'Prof. Rajesh Khanna', date: '25 Apr 2025', duration: '48 mins', viewsCount: 220, fileSize: '260 MB', downloadUrl: '#' },
    { id: 4, topic: 'Board of Trustees Annual Strategy Assembly', provider: 'BigBlueButton', type: 'Meeting', subject: 'Governance', class: 'Administration', teacher: 'Dean Academics', date: '20 Apr 2025', duration: '75 mins', viewsCount: 45, fileSize: '410 MB', downloadUrl: '#' }
  ];

  // Suite Integration Configurations
  zoomSettings = {
    apiKey: 'zm_live_9942a0b4cd81774e',
    apiSecret: '••••••••••••••••••••••••••••••••',
    accountEmail: 'admin@easyedu.com',
    sdkKey: 'sdk_pk_819203910293847',
    sdkSecret: '••••••••••••••••••••••••••••••••',
    autoRecording: true,
    waitingRoomDefault: true,
    joinBeforeHost: false,
    muteUponEntry: true
  };

  gmeetSettings = {
    clientId: '782910394819-apps.googleusercontent.com',
    clientSecret: '••••••••••••••••••••••••••••••••',
    domain: 'easyedu.edu.in',
    autoSyncGoogleCalendar: true,
    sendEmailInvitations: true
  };

  jitsiSettings = {
    serverDomain: 'meet.jit.si',
    useSelfHosted: false,
    appId: 'easyedu_live_cluster',
    jwtSecret: '••••••••••••••••••••••••••••••••',
    watermarkUrl: 'https://easyedu.com/assets/logo-white.png',
    enableTileView: true,
    disableDeepLinking: true
  };

  bbbSettings = {
    serverBaseUrl: 'https://bbb.easyedu.cloud/bigbluebutton/api/',
    securitySalt: '8b99104c99a0b12e34f8921a9e8832c1',
    recordByDefault: true,
    autoPublishRecordings: true,
    maxParticipantsPerRoom: 100,
    allowGuestUsers: false
  };

  // Modals state
  showCreateMeetingModal = false;
  newMeeting: Partial<VirtualMeeting> = {
    topic: '',
    type: 'Class',
    provider: 'Zoom',
    class: 'Grade 10-A',
    subject: 'Mathematics',
    department: 'Academic Wing',
    date: 'Today',
    time: '04:00 PM',
    duration: '45 mins',
    host: 'Dr. Ramesh Sharma',
    passcode: 'EDU2025'
  };

  ngOnInit(): void {
    this.syncRouteState();
    this.route.url.subscribe(() => this.syncRouteState());
  }

  private syncRouteState(): void {
    const path = this.router.url.toLowerCase();

    if (path.includes('zoom')) {
      this.activeSuite = 'zoom';
      if (path.includes('virtualclass')) this.activeSubTab = 'class';
      else if (path.includes('virtualmeeting')) this.activeSubTab = 'meeting';
      else if (path.includes('classreports')) this.activeSubTab = 'class-reports';
      else if (path.includes('meetingreports')) this.activeSubTab = 'meeting-reports';
      else if (path.includes('settings')) this.activeSubTab = 'settings';
      else this.activeSubTab = 'dashboard';
    } else if (path.includes('gmeet')) {
      this.activeSuite = 'gmeet';
      if (path.includes('virtualclass')) this.activeSubTab = 'class';
      else if (path.includes('virtualmeeting')) this.activeSubTab = 'meeting';
      else if (path.includes('classreports')) this.activeSubTab = 'class-reports';
      else if (path.includes('meetingreports')) this.activeSubTab = 'meeting-reports';
      else if (path.includes('settings')) this.activeSubTab = 'settings';
      else this.activeSubTab = 'dashboard';
    } else if (path.includes('jitsi')) {
      this.activeSuite = 'jitsi';
      if (path.includes('virtualclass')) this.activeSubTab = 'class';
      else if (path.includes('virtualmeeting')) this.activeSubTab = 'meeting';
      else if (path.includes('settings')) this.activeSubTab = 'settings';
      else this.activeSubTab = 'dashboard';
    } else if (path.includes('bigbluebutton') || path.includes('bbb')) {
      this.activeSuite = 'bbb';
      if (path.includes('virtualclass')) this.activeSubTab = 'class';
      else if (path.includes('virtualmeeting')) this.activeSubTab = 'meeting';
      else if (path.includes('classreports')) this.activeSubTab = 'class-reports';
      else if (path.includes('meetingreports')) this.activeSubTab = 'meeting-reports';
      else if (path.includes('classrecordlist') || path.includes('meetingrecordlist')) this.activeSubTab = 'recordings';
      else if (path.includes('settings')) this.activeSubTab = 'settings';
      else this.activeSubTab = 'dashboard';
    } else if (path.includes('inapplive')) {
      this.activeSuite = 'inapp';
      this.activeSubTab = 'dashboard';
    } else {
      this.activeSuite = 'all';
      this.activeSubTab = 'dashboard';
    }
  }

  setSuite(suite: 'zoom' | 'gmeet' | 'jitsi' | 'bbb' | 'inapp' | 'all'): void {
    this.activeSuite = suite;
    this.activeSubTab = 'dashboard';
  }

  get liveNowCount(): number {
    return this.meetings.filter(m => m.status === 'Live Now').length;
  }

  get filteredMeetings(): VirtualMeeting[] {
    return this.meetings.filter(m => {
      const matchProvider =
        this.activeSuite === 'all' ? true :
        this.activeSuite === 'zoom' ? m.provider === 'Zoom' :
        this.activeSuite === 'gmeet' ? m.provider === 'Google Meet' :
        this.activeSuite === 'jitsi' ? m.provider === 'Jitsi' :
        this.activeSuite === 'bbb' ? m.provider === 'BigBlueButton' :
        this.activeSuite === 'inapp' ? m.provider === 'InAppLive' : true;

      const matchType =
        this.activeSubTab === 'class' || this.activeSubTab === 'class-reports' ? m.type === 'Class' :
        this.activeSubTab === 'meeting' || this.activeSubTab === 'meeting-reports' ? m.type === 'Meeting' : true;

      const matchSearch = !this.searchTerm ||
        m.topic.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        m.host.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (m.class && m.class.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchStatus = this.statusFilter === 'All' || m.status === this.statusFilter;

      return matchProvider && matchType && matchSearch && matchStatus;
    });
  }

  get filteredRecordings(): ClassRecording[] {
    return this.recordings.filter(r => {
      const matchProvider =
        this.activeSuite === 'all' ? true :
        this.activeSuite === 'zoom' ? r.provider === 'Zoom' :
        this.activeSuite === 'gmeet' ? r.provider === 'Google Meet' :
        this.activeSuite === 'jitsi' ? r.provider === 'Jitsi' :
        this.activeSuite === 'bbb' ? r.provider === 'BigBlueButton' : true;

      const matchType =
        this.activeSubTab === 'class-reports' ? r.type === 'Class' :
        this.activeSubTab === 'meeting-reports' ? r.type === 'Meeting' : true;

      return matchProvider && matchType;
    });
  }

  joinMeeting(meeting: VirtualMeeting): void {
    Swal.fire({
      title: 'Join Virtual Room?',
      html: `
        <div class="text-start p-2">
          <p class="mb-1"><strong>Topic:</strong> ${meeting.topic}</p>
          <p class="mb-1"><strong>Platform:</strong> ${meeting.provider}</p>
          <p class="mb-1"><strong>Host:</strong> ${meeting.host}</p>
          <p class="mb-0"><strong>Meeting ID:</strong> ${meeting.meetingId} (Passcode: <code>${meeting.passcode}</code>)</p>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0ea5e9',
      confirmButtonText: '<i class="fas fa-video me-1"></i> Launch Session'
    }).then((res: any) => {
      if (res.isConfirmed) {
        window.open(meeting.joinUrl, '_blank');
      }
    });
  }

  saveMeeting(): void {
    if (!this.newMeeting.topic) {
      Swal.fire('Missing Topic', 'Please enter Live Class or Meeting Topic.', 'warning');
      return;
    }

    const providerName: any =
      this.activeSuite === 'zoom' ? 'Zoom' :
      this.activeSuite === 'gmeet' ? 'Google Meet' :
      this.activeSuite === 'jitsi' ? 'Jitsi' :
      this.activeSuite === 'bbb' ? 'BigBlueButton' :
      this.activeSuite === 'inapp' ? 'InAppLive' : (this.newMeeting.provider || 'Zoom');

    const meeting: VirtualMeeting = {
      id: this.meetings.length + 1,
      topic: this.newMeeting.topic!,
      type: this.newMeeting.type || 'Class',
      provider: providerName,
      class: this.newMeeting.class || 'Grade 10-A',
      subject: this.newMeeting.subject || 'Mathematics',
      department: this.newMeeting.department || 'Academic Wing',
      date: this.newMeeting.date || 'Today',
      time: this.newMeeting.time || '04:00 PM',
      duration: this.newMeeting.duration || '45 mins',
      host: this.newMeeting.host || 'Dr. Ramesh Sharma',
      meetingId: `${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      passcode: this.newMeeting.passcode || 'EASY123',
      joinUrl: 'https://meet.easyedu.cloud/j/' + Date.now(),
      status: 'Scheduled',
      participantsCount: 40,
      attendanceRate: 90
    };

    this.meetings.unshift(meeting);
    this.showCreateMeetingModal = false;
    this.newMeeting = { topic: '', type: 'Class', provider: 'Zoom', class: 'Grade 10-A', subject: 'Mathematics', passcode: 'EDU2025' };

    Swal.fire({
      title: 'Session Scheduled!',
      text: `${meeting.type} "${meeting.topic}" configured via ${meeting.provider}. Calendar invites dispatched.`,
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  saveSettings(suiteName: string): void {
    Swal.fire({
      title: `${suiteName} Settings Saved!`,
      text: 'API credentials and room configurations updated and synchronized with platform relays.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  watchRecording(rec: ClassRecording): void {
    Swal.fire({
      title: rec.topic,
      html: `
        <div class="text-center p-3">
          <i class="fas fa-play-circle fa-4x text-primary mb-3"></i>
          <p class="mb-1"><strong>Platform:</strong> ${rec.provider} • <strong>Teacher:</strong> ${rec.teacher}</p>
          <p class="small text-muted mb-0">Recorded on ${rec.date} • Duration: ${rec.duration} • File Size: ${rec.fileSize}</p>
        </div>
      `,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Play Stream'
    });
  }

  toggleLiveStudio(): void {
    this.isStreamActive = !this.isStreamActive;
    if (this.isStreamActive) {
      Swal.fire({
        title: 'Live Studio Started!',
        text: 'In-App WebRTC Direct Stream broadcast is now live. Student terminals connected.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
}
