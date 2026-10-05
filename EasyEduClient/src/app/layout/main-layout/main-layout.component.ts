import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  openMenus: { [key: string]: boolean } = {
    adminSection: false,
    utilities: false,
    communicate: false,
    academic: true,
    lessonPlan: false,
    homework: false,
    exams: false,
    onlineExam: true,
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
    certificates: true,
    library: false,
    downloadCenter: false,
    dataManagement: false,
    frontendCms: false,
    styleArchitect: false,
    reports: false,
    examReports: false,
    systemSettings: false,
    moduleManager: false,
    virtualClass: true,
    zoomSub: true,
    gmeetSub: true,
    jitsiSub: true,
    bbbSub: true,
    smartAttendanceMenu: true,
    bioSub: true,
    qrSub: true,
    advancedAcademicMenu: true,
    onlineExamSub: true,
    cbseSub: true,
    lmsSub: true,
    aiContent: true,
    commSubMenu: true,
    regSub: true,
    whatsAppSub: true,
    addons: true
  };

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.expandMenuByFragment(fragment);
      }
    });

    this.syncActiveMenuByUrl();

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      const hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        const hash = url.substring(hashIndex + 1);
        this.expandMenuByFragment(hash);
      }
      this.syncActiveMenuByUrl();
    });
  }

  private syncActiveMenuByUrl(): void {
    const url = this.router.url.toLowerCase();
    if (url.includes('transport')) this.openMenus['transport'] = true;
    if (url.includes('library')) this.openMenus['library'] = true;
    if (url.includes('inventory')) this.openMenus['inventory'] = true;
    if (url.includes('accounting') || url.includes('accounts')) this.openMenus['accounts'] = true;
    if (url.includes('finance') || url.includes('fees')) this.openMenus['fees'] = true;
    if (url.includes('humanresource') || url.includes('staff') || url.includes('leave')) this.openMenus['hr'] = true;
    if (url.includes('students') || url.includes('student') || url.includes('attendance')) this.openMenus['students'] = true;
    if (url.includes('behaviour')) this.openMenus['behaviour'] = true;
    if (url.includes('classes') || url.includes('section') || url.includes('subjects')) this.openMenus['academic'] = true;
    if (url.includes('lessonplan')) this.openMenus['lessonPlan'] = true;
    if (url.includes('homework')) this.openMenus['homework'] = true;
    if (url.includes('examination') || url.includes('examsettings')) this.openMenus['exams'] = true;
    if (url.includes('onlineexam')) this.openMenus['onlineExam'] = true;
    if (url.includes('teacherevaluation')) this.openMenus['teacherEvaluation'] = true;
    if (url.includes('dormitory')) this.openMenus['dormitory'] = true;
    if (url.includes('certificates')) this.openMenus['certificates'] = true;
    if (url.includes('virtual')) this.openMenus['virtualClass'] = true;
    if (url.includes('download')) this.openMenus['downloadCenter'] = true;
    if (url.includes('importexport') || url.includes('datamanagement')) this.openMenus['dataManagement'] = true;
    if (url.includes('frontsettings') || url.includes('frontend-cms') || url.includes('frontendcms')) this.openMenus['frontendCms'] = true;
    if (url.includes('stylearchitect')) this.openMenus['styleArchitect'] = true;
    if (url.includes('examreport') || url.includes('examreports')) this.openMenus['examReports'] = true;
    if (url.includes('report')) this.openMenus['reports'] = true;
    if (url.includes('zoom')) { this.openMenus['virtualClass'] = true; this.openMenus['zoomSub'] = true; }
    if (url.includes('gmeet')) { this.openMenus['virtualClass'] = true; this.openMenus['gmeetSub'] = true; }
    if (url.includes('jitsi')) { this.openMenus['virtualClass'] = true; this.openMenus['jitsiSub'] = true; }
    if (url.includes('bigbluebutton') || url.includes('bbb')) { this.openMenus['virtualClass'] = true; this.openMenus['bbbSub'] = true; }
    if (url.includes('biometric')) { this.openMenus['smartAttendanceMenu'] = true; this.openMenus['bioSub'] = true; }
    if (url.includes('qrattendance')) { this.openMenus['smartAttendanceMenu'] = true; this.openMenus['qrSub'] = true; }
    if (url.includes('cbse')) { this.openMenus['advancedAcademicMenu'] = true; this.openMenus['cbseSub'] = true; }
    if (url.includes('lms')) { this.openMenus['advancedAcademicMenu'] = true; this.openMenus['lmsSub'] = true; }
    if (url.includes('registrationaddon')) { this.openMenus['commSubMenu'] = true; this.openMenus['regSub'] = true; }
    if (url.includes('whatsapp')) { this.openMenus['commSubMenu'] = true; this.openMenus['whatsAppSub'] = true; }
    if (url.includes('setting') || url.includes('role')) this.openMenus['systemSettings'] = true;
  }

  expandMenuByFragment(fragment: string): void {
    const f = fragment.toLowerCase();
    if (f.includes('zoom')) { this.openMenus['virtualClass'] = true; this.openMenus['zoomSub'] = true; }
    else if (f.includes('gmeet')) { this.openMenus['virtualClass'] = true; this.openMenus['gmeetSub'] = true; }
    else if (f.includes('jitsi')) { this.openMenus['virtualClass'] = true; this.openMenus['jitsiSub'] = true; }
    else if (f.includes('bbb')) { this.openMenus['virtualClass'] = true; this.openMenus['bbbSub'] = true; }
    else if (f.includes('virtualclass')) this.openMenus['virtualClass'] = true;
    else if (f.includes('bio')) { this.openMenus['smartAttendanceMenu'] = true; this.openMenus['bioSub'] = true; }
    else if (f.includes('qr')) { this.openMenus['smartAttendanceMenu'] = true; this.openMenus['qrSub'] = true; }
    else if (f.includes('smartattendance')) this.openMenus['smartAttendanceMenu'] = true;
    else if (f.includes('onlineexam')) { this.openMenus['advancedAcademicMenu'] = true; this.openMenus['onlineExamSub'] = true; }
    else if (f.includes('cbse')) { this.openMenus['advancedAcademicMenu'] = true; this.openMenus['cbseSub'] = true; }
    else if (f.includes('lms')) { this.openMenus['advancedAcademicMenu'] = true; this.openMenus['lmsSub'] = true; }
    else if (f.includes('advancedacademic')) this.openMenus['advancedAcademicMenu'] = true;
    else if (f.includes('reg')) { this.openMenus['commSubMenu'] = true; this.openMenus['regSub'] = true; }
    else if (f.includes('whatsapp')) { this.openMenus['commSubMenu'] = true; this.openMenus['whatsAppSub'] = true; }
    else if (f.includes('comm')) this.openMenus['commSubMenu'] = true;
    else if (f.includes('adminsection')) this.openMenus['adminSection'] = true;
    else if (f.includes('utilities')) this.openMenus['utilities'] = true;
    else if (f.includes('academic')) this.openMenus['academic'] = true;
    else if (f.includes('lessonplan')) this.openMenus['lessonPlan'] = true;
    else if (f.includes('homework')) this.openMenus['homework'] = true;
    else if (f.includes('exam') || f.includes('examsuite')) this.openMenus['exams'] = true;
    else if (f.includes('evaluation')) this.openMenus['teacherEvaluation'] = true;
    else if (f.includes('student')) this.openMenus['students'] = true;
    else if (f.includes('behaviour')) this.openMenus['behaviour'] = true;
    else if (f.includes('hr') || f.includes('staff')) this.openMenus['hr'] = true;
    else if (f.includes('fee')) this.openMenus['fees'] = true;
    else if (f.includes('account')) this.openMenus['accounts'] = true;
    else if (f.includes('inventory')) this.openMenus['inventory'] = true;
    else if (f.includes('transport')) this.openMenus['transport'] = true;
    else if (f.includes('library')) this.openMenus['library'] = true;
    else if (f.includes('download')) this.openMenus['downloadCenter'] = true;
    else if (f.includes('datamanagement') || f.includes('importexport')) this.openMenus['dataManagement'] = true;
    else if (f.includes('frontendcms') || f.includes('frontsettings')) this.openMenus['frontendCms'] = true;
    else if (f.includes('stylearchitect')) this.openMenus['styleArchitect'] = true;
    else if (f.includes('report')) this.openMenus['reports'] = true;
    else if (f.includes('system') || f.includes('setting')) this.openMenus['systemSettings'] = true;
  }

  toggleMenu(menuKey: string): void {
    this.openMenus[menuKey] = !this.openMenus[menuKey];
  }

  goBack(): void {
    window.history.back();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
