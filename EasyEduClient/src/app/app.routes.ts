import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { StudentAdmissionComponent } from './pages/students/student-admission/student-admission.component';
import { StaffListComponent } from './pages/staff/staff-list/staff-list.component';
import { ClassesComponent } from './pages/academic/classes/classes.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { FeesComponent } from './pages/fees/fees.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { ExaminationsComponent } from './pages/examinations/examinations.component';
import { OnlineExamComponent } from './pages/online-exam/online-exam.component';
import { TeacherEvaluationComponent } from './pages/teacher-evaluation/teacher-evaluation.component';
import { LibraryComponent } from './pages/library/library.component';
import { TransportComponent } from './pages/transport/transport.component';
import { VirtualClassComponent } from './pages/virtual-class/virtual-class.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeworkComponent } from './pages/homework/homework.component';
import { CommunicationComponent } from './pages/communication/communication.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { DormitoryComponent } from './pages/dormitory/dormitory.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { BehaviourComponent } from './pages/behaviour/behaviour.component';
import { LessonPlanComponent } from './pages/lesson-plan/lesson-plan.component';
import { DownloadCenterComponent } from './pages/download-center/download-center.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UtilitiesComponent } from './pages/utilities/utilities.component';
import { RolePermissionComponent } from './pages/role-permission/role-permission.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'administration', component: AdministrationComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'students/admission', component: StudentAdmissionComponent },
      { path: 'staff', component: StaffListComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'behaviour', component: BehaviourComponent },
      { path: 'academic/classes', component: ClassesComponent },
      { path: 'academic/subjects', component: ClassesComponent },
      { path: 'academic/timetable', component: ClassesComponent },
      { path: 'lesson-plan', component: LessonPlanComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'attendance/report', component: AttendanceComponent },
      { path: 'homework', component: HomeworkComponent },
      { path: 'communication', component: CommunicationComponent },
      { path: 'download-center', component: DownloadCenterComponent },
      { path: 'examinations', component: ExaminationsComponent },
      { path: 'online-exam', component: OnlineExamComponent },
      { path: 'teacher-evaluation', component: TeacherEvaluationComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'accounting', component: AccountingComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'dormitory', component: DormitoryComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'virtual-class', component: VirtualClassComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: 'role-permission', component: RolePermissionComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
