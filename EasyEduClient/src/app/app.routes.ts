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
import { ExaminationsComponent } from './pages/examinations/examinations.component';
import { LibraryComponent } from './pages/library/library.component';
import { TransportComponent } from './pages/transport/transport.component';
import { VirtualClassComponent } from './pages/virtual-class/virtual-class.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeworkComponent } from './pages/homework/homework.component';
import { CommunicationComponent } from './pages/communication/communication.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { DormitoryComponent } from './pages/dormitory/dormitory.component';
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
      { path: 'academic/classes', component: ClassesComponent },
      { path: 'academic/subjects', component: ClassesComponent },
      { path: 'academic/timetable', component: ClassesComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'attendance/report', component: AttendanceComponent },
      { path: 'homework', component: HomeworkComponent },
      { path: 'communication', component: CommunicationComponent },
      { path: 'examinations', component: ExaminationsComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'dormitory', component: DormitoryComponent },
      { path: 'virtual-class', component: VirtualClassComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
