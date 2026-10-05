import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  books = [
    { id: 1, title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', isbn: '978-8177091878', category: 'Science', rackNo: 'RK-102', quantity: 15, available: 11 },
    { id: 2, title: 'Higher Algebra', author: 'Hall & Knight', isbn: '978-9351441632', category: 'Mathematics', rackNo: 'RK-204', quantity: 20, available: 18 },
    { id: 3, title: 'Modern Indian History', author: 'Bipan Chandra', isbn: '978-8125036845', category: 'Social Science', rackNo: 'RK-305', quantity: 12, available: 8 },
    { id: 4, title: 'Computer Science with Python', author: 'Sumita Arora', isbn: '978-8177002447', category: 'Technology', rackNo: 'RK-401', quantity: 25, available: 20 }
  ];

  issuedBooks = [
    { bookTitle: 'Concepts of Physics (Vol 1)', studentName: 'Aarav Sharma', rollNo: '101', issueDate: '2026-10-01', returnDate: '2026-10-15', status: 'Issued' },
    { bookTitle: 'Modern Indian History', studentName: 'Ananya Iyer', rollNo: '902', issueDate: '2026-09-25', returnDate: '2026-10-09', status: 'Issued' }
  ];
}
