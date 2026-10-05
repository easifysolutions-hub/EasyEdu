import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

export interface WhatsAppAgent {
  id: number;
  name: string;
  phone: string;
  role: 'Admissions Desk' | 'Accounts & Fees' | 'Principal Office' | 'Technical Support';
  activeChats: number;
  status: 'Online' | 'Away' | 'Offline';
}

export interface WhatsAppMessageLog {
  id: string;
  recipientName: string;
  recipientPhone: string;
  type: 'Fee Due Reminder' | 'Attendance Alert' | 'Homework Digest' | 'Admissions Bot';
  sentTime: string;
  deliveryStatus: 'Read' | 'Delivered' | 'Sent';
}

@Component({
  selector: 'app-whatsapp-addon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whatsapp-addon.component.html',
  styleUrls: ['./whatsapp-addon.component.css']
})
export class WhatsAppAddonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab: 'hub' | 'settings' | 'agents' | 'analytics' = 'hub';

  agents: WhatsAppAgent[] = [
    { id: 1, name: 'Deepak Sharma', phone: '+91 98112 00991', role: 'Accounts & Fees', activeChats: 14, status: 'Online' },
    { id: 2, name: 'Sunita Nair', phone: '+91 98112 00992', role: 'Admissions Desk', activeChats: 22, status: 'Online' },
    { id: 3, name: 'Rohan Mehra', phone: '+91 98112 00993', role: 'Technical Support', activeChats: 5, status: 'Away' }
  ];

  messageLogs: WhatsAppMessageLog[] = [
    { id: 'WA-901', recipientName: 'Rajesh Sharma (Father of Aarav)', recipientPhone: '+91 98112 34567', type: 'Fee Due Reminder', sentTime: '08:30 AM', deliveryStatus: 'Read' },
    { id: 'WA-902', recipientName: 'Meenakshi Patel (Mother of Diya)', recipientPhone: '+91 98223 45678', type: 'Attendance Alert', sentTime: '08:45 AM', deliveryStatus: 'Delivered' },
    { id: 'WA-903', recipientName: 'Sunil Verma (Father of Kabir)', recipientPhone: '+91 98334 56789', type: 'Homework Digest', sentTime: 'Yesterday', deliveryStatus: 'Read' }
  ];

  apiConfig = {
    whatsappBusinessAccountId: 'WABA_99210482910482',
    phoneNumberId: 'PNID_882019481920',
    metaAccessToken: '••••••••••••••••••••••••••••••••',
    webhookVerifyToken: 'easyedu_meta_verify_2025',
    enableAutoBot: true,
    autoSendAttendanceAlert: true,
    autoSendFeeInvoice: true
  };

  broadcastText = '';
  selectedAudience = 'All Guardians';

  ngOnInit(): void {
    this.syncRoute();
    this.route.url.subscribe(() => this.syncRoute());
  }

  private syncRoute(): void {
    const path = this.router.url.toLowerCase();
    if (path.includes('settings')) this.activeTab = 'settings';
    else if (path.includes('agents')) this.activeTab = 'agents';
    else if (path.includes('analytics')) this.activeTab = 'analytics';
    else this.activeTab = 'hub';
  }

  sendBroadcast(): void {
    if (!this.broadcastText) {
      Swal.fire('Message Required', 'Please enter broadcast message text.', 'warning');
      return;
    }
    Swal.fire({
      title: 'Dispatch WhatsApp Broadcast?',
      text: `Are you sure you want to send this template broadcast to ${this.selectedAudience}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#25D366',
      confirmButtonText: '<i class="fab fa-whatsapp me-1"></i> Send Now'
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire('Broadcast Dispatched!', `Message queued for 420 recipients via Meta WhatsApp Cloud API.`, 'success');
        this.broadcastText = '';
      }
    });
  }

  saveConfig(): void {
    Swal.fire('API Infrastructure Configured', 'Meta Cloud WhatsApp Business API parameters updated and webhook active.', 'success');
  }
}
