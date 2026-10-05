import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-class',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-class.component.html',
  styleUrls: ['./virtual-class.component.css']
})
export class VirtualClassComponent {
  meetings = [
    { id: 1, topic: 'Grade 10 Mathematics - Trigonometry Live Session', provider: 'Zoom', time: 'Today 04:00 PM', duration: '45 mins', host: 'Dr. Ramesh Kumar', status: 'Live Soon' },
    { id: 2, topic: 'Physics Optics & Wave Theory Review', provider: 'Google Meet', time: 'Today 05:30 PM', duration: '60 mins', host: 'Sunita Nair', status: 'Scheduled' },
    { id: 3, topic: 'Computer Science Data Structures Assembly', provider: 'Jitsi', time: 'Tomorrow 10:00 AM', duration: '45 mins', host: 'Vikram Singh', status: 'Upcoming' }
  ];
}
