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
    academic: false,
    lessonPlan: false,
    homework: false,
    exams: false,
    onlineExam: false,
    teacherEvaluation: false,
    students: false,
    behaviour: false,
    hr: false,
    staffReports: false,
    fees: false,
    accounts: false,
    inventory: false,
    transport: false,
    dormitory: false,
    certificates: false,
    library: false,
    downloadCenter: false,
    dataManagement: false,
    frontendCms: false,
    styleArchitect: false,
    reports: false,
    examReports: false,
    systemSettings: false,
    moduleManager: false,
    virtualClass: false,
    zoomSub: true,
    gmeetSub: true,
    jitsiSub: true,
    bbbSub: true,
    smartAttendanceMenu: false,
    bioSub: true,
    qrSub: true,
    advancedAcademicMenu: false,
    onlineExamSub: true,
    cbseSub: true,
    lmsSub: true,
    aiContent: false,
    commSubMenu: false,
    regSub: true,
    whatsAppSub: true,
    addons: false
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

  private closeAllMainMenus(): void {
    const subMenus = ['zoomSub', 'gmeetSub', 'jitsiSub', 'bbbSub', 'bioSub', 'qrSub', 'onlineExamSub', 'cbseSub', 'lmsSub', 'regSub', 'whatsAppSub'];
    for (const key of Object.keys(this.openMenus)) {
      if (!subMenus.includes(key)) {
        this.openMenus[key] = false;
      }
    }
  }

  isMenuParentActive(menuKey: string): boolean {
    const url = this.router.url.toLowerCase();
    switch (menuKey) {
      case 'adminSection':
        return (url.startsWith('/administration') && !url.startsWith('/administration/users') && !url.startsWith('/administration/updates')) || url.startsWith('/adminsection');
      case 'utilities':
        return url.startsWith('/utilities') || url.startsWith('/chat');
      case 'communicate':
        return url.startsWith('/communicate');
      case 'academic':
        return url.startsWith('/classes') || url.startsWith('/section') || url.startsWith('/subjects') ||
               url.startsWith('/assignclassteacher') || url.startsWith('/assignsubject') ||
               url.startsWith('/classroom') || (url.startsWith('/classroutine') && !url.startsWith('/reports/classroutine')) ||
               url.startsWith('/optionalsubject') || url.startsWith('/academics');
      case 'lessonPlan':
        return url.startsWith('/lessonplan');
      case 'homework':
        return url.startsWith('/homework') && !url.startsWith('/reports/homework');
      case 'exams':
        return url.startsWith('/examinations') || url.startsWith('/examsettings');
      case 'onlineExam':
        return url.startsWith('/onlineexam') && !this.isMenuParentActive('advancedAcademicMenu');
      case 'teacherEvaluation':
        return url.startsWith('/teacherevaluation');
      case 'students':
        return url.startsWith('/studentcategory') ||
               (url.startsWith('/students') && !url.startsWith('/reports/student')) ||
               (url.startsWith('/attendance') && !url.startsWith('/attendance/subjectwiseattendance'));
      case 'behaviour':
        return (url.startsWith('/behaviourrecords') || url.startsWith('/behaviour')) && !url.startsWith('/reports');
      case 'hr':
        return url.startsWith('/humanresource') || url.startsWith('/leave') || (url.startsWith('/staff') && !url.startsWith('/reports/staff'));
      case 'fees':
        return url.startsWith('/finance') || (url.startsWith('/fees') && !url.startsWith('/reports/fees'));
      case 'accounts':
        return url.startsWith('/accounting') || (url.startsWith('/accounts') && !url.startsWith('/reports'));
      case 'transport':
        return url.startsWith('/transport') && !url.startsWith('/reports/studenttransport');
      case 'library':
        return url.startsWith('/library');
      case 'inventory':
        return url.startsWith('/inventory');
      case 'dormitory':
        return url.startsWith('/dormitory') && !url.startsWith('/reports/studentdormitory');
      case 'certificates':
        return url.startsWith('/certificates');
      case 'virtualClass':
        return url.startsWith('/zoom') || url.startsWith('/gmeet') || url.startsWith('/jitsi') ||
               url.startsWith('/bigbluebutton') || url.startsWith('/virtual') || url.startsWith('/inapplive');
      case 'smartAttendanceMenu':
        return url.startsWith('/biometrics') || url.startsWith('/qrattendance') || url.startsWith('/smartattendance');
      case 'advancedAcademicMenu':
        return url.startsWith('/cbseexam') || url.startsWith('/cbse') || url.startsWith('/lms') ||
               (url.startsWith('/onlineexam') && (url.includes('onlineexam') || url.includes('addonlineexam') || url.includes('question')));
      case 'commSubMenu':
        return url.startsWith('/registrationaddon') || url.startsWith('/whatsapp');
      case 'downloadCenter':
        return url.startsWith('/downloadcenter');
      case 'dataManagement':
        return url.startsWith('/importexport') || url.startsWith('/datamanagement');
      case 'frontendCms':
        return url.startsWith('/frontsettings') || url.startsWith('/frontendcms') || url.startsWith('/frontend-cms');
      case 'styleArchitect':
        return url.startsWith('/style');
      case 'reports':
        return url.startsWith('/reports');
      case 'examReports':
        return url.startsWith('/examreports');
      case 'systemSettings':
        return url.startsWith('/settings') || url.startsWith('/generalsettings') ||
               url.startsWith('/rolepermission') || url.startsWith('/customfields') ||
               url.startsWith('/systemsettings') || url.startsWith('/system') ||
               url.startsWith('/administration/users') || url.startsWith('/administration/updates');
      case 'moduleManager':
        return url.startsWith('/system/modulemanager');
      default:
        return false;
    }
  }

  private syncActiveMenuByUrl(): void {
    this.closeAllMainMenus();
    for (const key of Object.keys(this.openMenus)) {
      if (this.isMenuParentActive(key)) {
        this.openMenus[key] = true;
        break;
      }
    }
  }

  expandMenuByFragment(fragment: string): void {
    const f = fragment.toLowerCase();
    this.closeAllMainMenus();
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
    else if (f.includes('examreport')) this.openMenus['examReports'] = true;
    else if (f.includes('report')) this.openMenus['reports'] = true;
    else if (f.includes('system') || f.includes('setting')) this.openMenus['systemSettings'] = true;
  }

  toggleMenu(menuKey: string): void {
    const isCurrentlyOpen = !!this.openMenus[menuKey];
    
    // Sub-menus toggle within their container
    const isSubMenu = ['zoomSub', 'gmeetSub', 'jitsiSub', 'bbbSub', 'bioSub', 'qrSub', 'onlineExamSub', 'cbseSub', 'lmsSub', 'regSub', 'whatsAppSub'].includes(menuKey);

    if (isSubMenu) {
      this.openMenus[menuKey] = !isCurrentlyOpen;
      return;
    }

    // Main menus: Accordion mode - close all other main menus, toggle clicked one only
    this.closeAllMainMenus();
    this.openMenus[menuKey] = !isCurrentlyOpen;
  }

  goBack(): void {
    window.history.back();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
