import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-examinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent {
  exams = [
    { id: 1, title: 'Term 1 Mid-Semester Examination', session: '2026-27', startDate: '2026-10-15', endDate: '2026-10-24', status: 'Upcoming' },
    { id: 2, title: 'Quarterly Assessment Test', session: '2026-27', startDate: '2026-08-10', endDate: '2026-08-18', status: 'Completed' },
    { id: 3, title: 'Annual Final Examination', session: '2026-27', startDate: '2027-03-01', endDate: '2027-03-15', status: 'Draft' }
  ];
}
