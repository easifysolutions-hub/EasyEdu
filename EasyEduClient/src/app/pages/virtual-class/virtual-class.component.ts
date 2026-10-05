import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface VirtualMeeting {
  id: number;
  topic: string;
  provider: 'Zoom' | 'Google Meet' | 'Jitsi' | 'BigBlueButton';
  class: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  meetingId: string;
  passcode: string;
  joinUrl: string;
  status: 'Live Now' | 'Scheduled' | 'Upcoming' | 'Completed';
  participantsCount: number;
}

interface ClassRecording {
  id: number;
  topic: string;
  subject: string;
  class: string;
  teacher: string;
  date: string;
  duration: string;
  viewsCount: number;
  fileSize: string;
}

@Component({
  selector: 'app-virtual-class',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './virtual-class.component.html',
  styleUrls: ['./virtual-class.component.css']
})
export class VirtualClassComponent implements OnInit {
  activeTab: 'all' | 'zoom' | 'gmeet' | 'jitsi' | 'recordings' = 'all';

  meetings: VirtualMeeting[] = [
    { id: 1, topic: 'Grade 10 Mathematics - Trigonometry Live Problem Solving', provider: 'Zoom', class: 'Grade 10-A', subject: 'Mathematics', date: 'Today', time: '04:00 PM - 04:45 PM', duration: '45 mins', host: 'Dr. Ramesh Sharma', meetingId: '892 4410 9128', passcode: 'EASY2025', joinUrl: 'https://zoom.us/j/89244109128', status: 'Live Now', participantsCount: 38 },
    { id: 2, topic: 'Physics Optics & Wave Theory Interactive Lab Review', provider: 'Google Meet', class: 'Grade 10-B', subject: 'Physics', date: 'Today', time: '05:30 PM - 06:30 PM', duration: '60 mins', host: 'Sunita Nair', meetingId: 'gmeet-optics-2025', passcode: 'Direct Link', joinUrl: 'https://meet.google.com/abc-defg-hij', status: 'Scheduled', participantsCount: 42 },
    { id: 3, topic: 'Computer Science Data Structures & Python Algorithms', provider: 'Jitsi', class: 'Grade 11-Science', subject: 'Computer Science', date: 'Tomorrow', time: '10:00 AM - 10:45 AM', duration: '45 mins', host: 'Prof. Rajesh Khanna', meetingId: 'jitsi-cs-algo', passcode: 'None', joinUrl: 'https://meet.jit.si/EasyEduCS101', status: 'Upcoming', participantsCount: 35 },
    { id: 4, topic: 'English Literature Poetry & Creative Writing Workshop', provider: 'Zoom', class: 'Grade 9-A', subject: 'English', date: 'Yesterday', time: '02:00 PM - 03:00 PM', duration: '60 mins', host: 'Pooja Hegde', meetingId: '772 1092 3341', passcode: 'LIT99', joinUrl: 'https://zoom.us/j/77210923341', status: 'Completed', participantsCount: 40 }
  ];

  recordings: ClassRecording[] = [
    { id: 1, topic: 'Chemical Bonding & Periodic Molecular Structure', subject: 'Chemistry', class: 'Grade 10-A', teacher: 'Dr. Ramesh Sharma', date: '02 May 2025', duration: '52 mins', viewsCount: 142, fileSize: '280 MB' },
    { id: 2, topic: 'Calculus Fundamentals: Limits & Derivatives', subject: 'Mathematics', class: 'Grade 11-Science', teacher: 'Sunita Nair', date: '28 Apr 2025', duration: '58 mins', viewsCount: 198, fileSize: '320 MB' },
    { id: 3, topic: 'Python Object Oriented Programming Classes', subject: 'Computer Science', class: 'Grade 12-CS', teacher: 'Prof. Rajesh Khanna', date: '25 Apr 2025', duration: '48 mins', viewsCount: 220, fileSize: '260 MB' }
  ];

  // Modals state
  showCreateMeetingModal = false;
  newMeeting: Partial<VirtualMeeting> = {
    topic: '',
    provider: 'Zoom',
    class: 'Grade 10-A',
    subject: 'Mathematics',
    date: 'Today',
    time: '04:00 PM',
    duration: '45 mins',
    host: 'Dr. Ramesh Sharma',
    passcode: 'EDU2025'
  };

  ngOnInit(): void {}

  get liveNowCount(): number {
    return this.meetings.filter(m => m.status === 'Live Now').length;
  }

  get filteredMeetings(): VirtualMeeting[] {
    if (this.activeTab === 'zoom') {
      return this.meetings.filter(m => m.provider === 'Zoom');
    }
    if (this.activeTab === 'gmeet') {
      return this.meetings.filter(m => m.provider === 'Google Meet');
    }
    if (this.activeTab === 'jitsi') {
      return this.meetings.filter(m => m.provider === 'Jitsi' || m.provider === 'BigBlueButton');
    }
    return this.meetings;
  }

  joinMeeting(meeting: VirtualMeeting): void {
    Swal.fire({
      title: 'Join Live Classroom?',
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
      confirmButtonText: '<i class="fas fa-video me-1"></i> Launch Virtual Room'
    }).then((res: any) => {
      if (res.isConfirmed) {
        window.open(meeting.joinUrl, '_blank');
      }
    });
  }

  saveMeeting(): void {
    if (!this.newMeeting.topic) {
      Swal.fire('Missing Topic', 'Please enter Live Class Topic.', 'warning');
      return;
    }

    const meeting: VirtualMeeting = {
      id: this.meetings.length + 1,
      topic: this.newMeeting.topic!,
      provider: this.newMeeting.provider || 'Zoom',
      class: this.newMeeting.class || 'Grade 10-A',
      subject: this.newMeeting.subject || 'Mathematics',
      date: this.newMeeting.date || 'Today',
      time: this.newMeeting.time || '04:00 PM',
      duration: this.newMeeting.duration || '45 mins',
      host: this.newMeeting.host || 'Class Teacher',
      meetingId: `${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      passcode: this.newMeeting.passcode || 'EASY123',
      joinUrl: 'https://zoom.us/j/' + Date.now(),
      status: 'Scheduled',
      participantsCount: 40
    };

    this.meetings.unshift(meeting);
    this.showCreateMeetingModal = false;
    this.newMeeting = { topic: '', provider: 'Zoom', class: 'Grade 10-A', subject: 'Mathematics', passcode: 'EDU2025' };

    Swal.fire('Live Class Scheduled', 'Meeting URL and calendar invite generated.', 'success');
  }

  watchRecording(rec: ClassRecording): void {
    Swal.fire({
      title: rec.topic,
      html: `
        <div class="text-center p-3">
          <i class="fas fa-play-circle fa-4x text-primary mb-3"></i>
          <p class="mb-1"><strong>Teacher:</strong> ${rec.teacher} • <strong>Subject:</strong> ${rec.subject}</p>
          <p class="small text-muted mb-0">Recorded on ${rec.date} • Duration: ${rec.duration} • File Size: ${rec.fileSize}</p>
        </div>
      `,
      confirmButtonColor: '#002B49',
      confirmButtonText: 'Start Playback'
    });
  }
}
