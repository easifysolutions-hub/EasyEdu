import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

declare const Swal: any;

export interface DirectoryUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  invited: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  activeTab: 'directory' | 'chat-box' | 'invitation' | 'blocked' | 'settings' = 'chat-box';
  searchQuery = '';

  // 7 Personnel from Screenshot Image 4
  personnelList: DirectoryUser[] = [
    { id: 1, name: 'Test Librarian', email: 'librarian@easyedu.com', avatar: 'T', role: 'Librarian', invited: false },
    { id: 2, name: 'Test Parent', email: 'parent@easyedu.com', avatar: 'T', role: 'Parent', invited: false },
    { id: 3, name: 'Test Receptionist', email: 'receptionist@easyedu.com', avatar: 'T', role: 'Receptionist', invited: false },
    { id: 4, name: 'Admin Staff', email: 'admin_staff@easyedu.com', avatar: 'A', role: 'Staff', invited: false },
    { id: 5, name: 'SHARIEF. M. A', email: 'student@easyedu.com', avatar: 'S', role: 'Student', invited: false },
    { id: 6, name: 'Test Accountant', email: 'accountant@easyedu.com', avatar: 'T', role: 'Accountant', invited: false },
    { id: 7, name: 'Test Teacher', email: 'teacher@easyedu.com', avatar: 'T', role: 'Teacher', invited: false }
  ];

  recentConversations: any[] = [];
  blockedUsers: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const tab = params['tab'];
        if (tab === 'directory' || tab === 'chat-box' || tab === 'invitation' || tab === 'blocked' || tab === 'settings') {
          this.activeTab = tab;
        }
      }
    });
  }

  setTab(tab: 'directory' | 'chat-box' | 'invitation' | 'blocked' | 'settings'): void {
    this.activeTab = tab;
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab: tab } });
  }

  get filteredPersonnel(): DirectoryUser[] {
    if (!this.searchQuery.trim()) return this.personnelList;
    const q = this.searchQuery.toLowerCase();
    return this.personnelList.filter(p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
  }

  inviteUser(user: DirectoryUser): void {
    user.invited = !user.invited;
    if (typeof Swal !== 'undefined') {
      if (user.invited) {
        Swal.fire({ icon: 'success', title: 'Invitation Sent', text: `Chat invitation dispatched to ${user.name}`, timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ icon: 'info', title: 'Invitation Cancelled', text: `Invitation to ${user.name} was revoked.`, timer: 1200, showConfirmButton: false });
      }
    }
  }
}
