import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Staff } from '../../../core/models';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  private api = inject(ApiService);
  staffList: Staff[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.api.getStaff().subscribe(res => {
      this.staffList = res;
    });
  }

  get filteredStaff(): Staff[] {
    if (!this.searchTerm) return this.staffList;
    return this.staffList.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
