import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

declare const Swal: any;

export interface UserAuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
}

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {
  activeTab: 'user-log' | 'tasks' | 'qr' | 'whatsapp' | 'ai' = 'user-log';

  searchActivity = '';
  searchModule = '';

  auditLogs: UserAuditLog[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const tab = params['tab'];
        if (tab === 'user-log' || tab === 'tasks' || tab === 'qr' || tab === 'whatsapp' || tab === 'ai') {
          this.activeTab = tab;
        }
      }
    });
  }

  setTab(tab: 'user-log' | 'tasks' | 'qr' | 'whatsapp' | 'ai'): void {
    this.activeTab = tab;
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab: tab } });
  }

  onSearch(): void {
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'info', title: 'Audit Filter Applied', text: 'Displaying logs matching current search filters.', timer: 1200, showConfirmButton: false });
    }
  }

  exportAudit(): void {
    if (typeof Swal !== 'undefined') {
      Swal.fire({ icon: 'success', title: 'Export Generated', text: 'User audit trail CSV document exported.', timer: 1500, showConfirmButton: false });
    }
  }
}
