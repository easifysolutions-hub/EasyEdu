import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  private router = inject(Router);

  openMenus: { [key: string]: boolean } = {
    adminSection: false,
    utilities: false,
    communicate: false,
    academic: true,
    lessonPlan: false,
    homework: false,
    exams: false,
    onlineExam: false,
    teacherEvaluation: false,
    students: true,
    behaviour: false,
    hr: false,
    staffReports: false,
    fees: true,
    accounts: false,
    inventory: false,
    transport: false,
    dormitory: false,
    certificates: false,
    library: false,
    downloadCenter: false,
    dataManagement: false,
    frontendCms: false,
    reports: false,
    examReports: false,
    systemSettings: false,
    virtualClass: false,
    addons: false
  };

  toggleMenu(menuKey: string): void {
    this.openMenus[menuKey] = !this.openMenus[menuKey];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
