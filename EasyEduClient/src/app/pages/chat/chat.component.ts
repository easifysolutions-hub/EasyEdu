import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatChannel {
  id: string;
  name: string;
  type: 'channel' | 'direct';
  unread: number;
  lastMessage: string;
  time: string;
  avatarIcon?: string;
}

interface ChatMessage {
  id: number;
  sender: string;
  role: string;
  avatar: string;
  text: string;
  time: string;
  isSelf: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  channels: ChatChannel[] = [
    { id: 'gen', name: 'General Staff Announcements', type: 'channel', unread: 2, lastMessage: 'Staff meeting at 3 PM in Conference Hall', time: '12:45 PM', avatarIcon: 'bullhorn' },
    { id: 'math', name: 'Mathematics Department', type: 'channel', unread: 0, lastMessage: 'Term 1 question papers finalized', time: 'Yesterday', avatarIcon: 'square-root-variable' },
    { id: 'sci', name: 'Science & Lab Coordinators', type: 'channel', unread: 1, lastMessage: 'Physics apparatus order received', time: 'Yesterday', avatarIcon: 'flask' },
    { id: 'd1', name: 'Dr. Ramesh Sharma (Physics)', type: 'direct', unread: 0, lastMessage: 'Yes, syllabus for Grade 10 is on schedule.', time: '11:20 AM', avatarIcon: 'user' },
    { id: 'd2', name: 'Prof. Ananya Iyer (Math)', type: 'direct', unread: 0, lastMessage: 'Thank you for the timetable update.', time: '09:10 AM', avatarIcon: 'user' },
    { id: 'd3', name: 'Deepak S. (Cashier)', type: 'direct', unread: 3, lastMessage: 'Morning fee collections reconciled.', time: '10:05 AM', avatarIcon: 'user' }
  ];

  activeChannel: ChatChannel = this.channels[0];

  messages: ChatMessage[] = [
    { id: 1, sender: 'Principal Dr. Nair', role: 'SuperAdmin', avatar: 'N', text: 'Good morning faculty. Please ensure all internal term assessment marks are submitted by Friday.', time: '10:15 AM', isSelf: false },
    { id: 2, sender: 'Dr. Ramesh Sharma', role: 'Faculty', avatar: 'R', text: 'Grade 10 Science practical assessment is complete. Entering marks into the register today.', time: '10:30 AM', isSelf: false },
    { id: 3, sender: 'System Administrator', role: 'Admin', avatar: 'S', text: 'All marks matrices and online exam modules are active for all departments.', time: '10:45 AM', isSelf: true },
    { id: 4, sender: 'Prof. Ananya Iyer', role: 'HOD Math', avatar: 'A', text: 'Staff meeting at 3 PM in Conference Hall to discuss CBSE board schedule.', time: '12:45 PM', isSelf: false }
  ];

  messageText = '';

  selectChannel(ch: ChatChannel): void {
    this.activeChannel = ch;
    ch.unread = 0;
  }

  sendMessage(): void {
    if (!this.messageText.trim()) return;

    this.messages.push({
      id: this.messages.length + 1,
      sender: 'System Administrator',
      role: 'Admin',
      avatar: 'S',
      text: this.messageText,
      time: 'Just Now',
      isSelf: true
    });

    this.activeChannel.lastMessage = this.messageText;
    this.activeChannel.time = 'Just Now';
    this.messageText = '';
  }
}
