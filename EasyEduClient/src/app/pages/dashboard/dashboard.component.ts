import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { CurrencyService } from '../../core/services/currency.service';
import { DashboardStats } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  currencyService = inject(CurrencyService);
  stats: DashboardStats | null = null;
  surveyFilter: 'year' | 'month' = 'year';

  notices = [
    { day: '05', month: 'OCT', title: 'Mid-Term Assessment Examination Schedule', description: 'Exam time tables for Grades 8-12 have been published on the student portal.' },
    { day: '02', month: 'OCT', title: 'Gandhi Jayanti Holiday Notice', description: 'The institution will remain closed on Thursday, October 2nd for national holiday.' },
    { day: '28', month: 'SEP', title: 'Annual Science & Tech Exhibition 2026', description: 'Submission of project prototypes is open till October 15th.' },
    { day: '25', month: 'SEP', title: 'Parent-Teacher Meeting for Grade 10', description: 'Quarterly review discussions will be held this Saturday from 9:00 AM.' }
  ];

  todos = [
    { id: 1, title: 'Approve teacher leave applications for October', isCompleted: false },
    { id: 2, title: 'Verify Term 1 fee collection reconciliation', isCompleted: true },
    { id: 3, title: 'Upload Physics and Chemistry lab routine for Grade 12', isCompleted: false },
    { id: 4, title: 'Send SMS notifications for bus route 4 maintenance', isCompleted: false }
  ];

  newTodoTitle = '';
  showTodoModal = false;

  calendarDays: { day: number | null; isToday: boolean; hasEvent: boolean }[] = [];

  ngOnInit(): void {
    this.api.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
    this.generateCalendar();
  }

  generateCalendar(): void {
    const totalDays = 30; // November
    const startDayOffset = 6; // starts on Saturday
    this.calendarDays = [];

    for (let i = 0; i < startDayOffset; i++) {
      this.calendarDays.push({ day: null, isToday: false, hasEvent: false });
    }

    const todayDate = new Date().getDate();
    for (let d = 1; d <= totalDays; d++) {
      this.calendarDays.push({
        day: d,
        isToday: d === todayDate,
        hasEvent: [4, 10, 15, 22, 28].includes(d)
      });
    }
  }

  toggleTodo(todo: any): void {
    todo.isCompleted = !todo.isCompleted;
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todos.unshift({
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        isCompleted: false
      });
      this.newTodoTitle = '';
      this.showTodoModal = false;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  setSurveyFilter(type: 'year' | 'month'): void {
    this.surveyFilter = type;
  }
}
