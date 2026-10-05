import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactComponent } from './pages/contact/contact.component';
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
  // Public Landing and Institutional Pages
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'Home/Products', component: ProductsComponent },
  { path: 'modules', component: ModulesComponent },
  { path: 'Home/Modules', component: ModulesComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'Home/Presentation', component: PresentationComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'Home/Pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'Home/Contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Account/Login', component: LoginComponent },

  // Secured Application Portal (Guard Protected with Local Fallback)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'administration', component: AdministrationComponent },
      { path: 'Administration', component: AdministrationComponent },
      { path: 'AdminSection', component: AdministrationComponent },
      { path: 'Communicate', component: CommunicationComponent },
      { path: 'Academics', component: ClassesComponent },
      // Student Management
      { path: 'students', component: StudentListComponent },
      { path: 'Students', component: StudentListComponent },
      { path: 'StudentCategory', component: StudentListComponent },
      { path: 'Students/Create', component: StudentAdmissionComponent },
      { path: 'students/admission', component: StudentAdmissionComponent },
      { path: 'Students/MultiClassStudent', component: StudentListComponent },
      { path: 'Students/UnassignedStudent', component: StudentListComponent },
      { path: 'Students/StudentGroup', component: StudentListComponent },
      { path: 'Students/StudentPromote', component: StudentListComponent },
      { path: 'Students/DisabledStudents', component: StudentListComponent },
      { path: 'Students/StudentExport', component: StudentListComponent },
      { path: 'Students/SmsSendingTime', component: StudentListComponent },
      { path: 'Students/StudentSettings', component: StudentListComponent },

      // Attendance
      { path: 'attendance', component: AttendanceComponent },
      { path: 'Attendance', component: AttendanceComponent },
      { path: 'Attendance/SubjectWiseAttendance', component: AttendanceComponent },
      { path: 'attendance/report', component: AttendanceComponent },

      // Behaviour Records
      { path: 'behaviour', component: BehaviourComponent },
      { path: 'BehaviourRecords/Incidents', component: BehaviourComponent },
      { path: 'BehaviourRecords/AssignIncident', component: BehaviourComponent },
      { path: 'BehaviourRecords/StudentIncidentReport', component: BehaviourComponent },
      { path: 'BehaviourRecords/BehaviourReport', component: BehaviourComponent },
      { path: 'BehaviourRecords/ClassSectionReport', component: BehaviourComponent },
      { path: 'BehaviourRecords/IncidentWiseReport', component: BehaviourComponent },
      { path: 'BehaviourRecords/Settings', component: BehaviourComponent },

      // Human Resource & Staff
      { path: 'staff', component: StaffListComponent },
      { path: 'HumanResource/StaffDirectory', component: StaffListComponent },
      { path: 'HumanResource/AddStaff', component: StaffListComponent },
      { path: 'HumanResource/Designation', component: StaffListComponent },
      { path: 'HumanResource/Department', component: StaffListComponent },
      { path: 'HumanResource/StaffAttendance', component: StaffListComponent },
      { path: 'HumanResource/Payroll', component: StaffListComponent },
      { path: 'HumanResource/StaffSettings', component: StaffListComponent },
      { path: 'HumanResource/BulkPayrollPrint', component: StaffListComponent },

      // Leave
      { path: 'leave', component: LeaveComponent },
      { path: 'Leave', component: LeaveComponent },
      { path: 'api/Leave', component: LeaveComponent },
      { path: 'Leave/PendingLeaveRequest', component: LeaveComponent },
      { path: 'Leave/ApproveLeaveRequest', component: LeaveComponent },
      { path: 'Leave/LeaveDefine', component: LeaveComponent },
      { path: 'Leave/LeaveType', component: LeaveComponent },

      // Academic & Classes
      { path: 'academic/classes', component: ClassesComponent },
      { path: 'academic/sections', component: ClassesComponent },
      { path: 'academic/subjects', component: ClassesComponent },
      { path: 'academic/assign-teacher', component: ClassesComponent },
      { path: 'academic/assign-subject', component: ClassesComponent },
      { path: 'academic/class-room', component: ClassesComponent },
      { path: 'academic/timetable', component: ClassesComponent },
      { path: 'academic/optional-subject', component: ClassesComponent },
      { path: 'Classes', component: ClassesComponent },
      { path: 'Section', component: ClassesComponent },
      { path: 'Subjects', component: ClassesComponent },
      { path: 'AssignClassTeacher', component: ClassesComponent },
      { path: 'AssignSubject', component: ClassesComponent },
      { path: 'ClassRoom', component: ClassesComponent },
      { path: 'ClassRoutine', component: ClassesComponent },
      { path: 'OptionalSubject/Assign', component: ClassesComponent },
      { path: 'OptionalSubject', component: ClassesComponent },

      // Lesson Plan
      { path: 'lesson-plan', component: LessonPlanComponent },
      { path: 'LessonPlan', component: LessonPlanComponent },
      { path: 'LessonPlan/Lesson', component: LessonPlanComponent },
      { path: 'LessonPlan/Topic', component: LessonPlanComponent },
      { path: 'LessonPlan/LessonPlanOverview', component: LessonPlanComponent },
      { path: 'LessonPlan/Settings', component: LessonPlanComponent },

      // Homework
      { path: 'homework', component: HomeworkComponent },
      { path: 'Homework', component: HomeworkComponent },
      { path: 'Homework/Create', component: HomeworkComponent },
      { path: 'Homework/HomeworkReport', component: HomeworkComponent },

      // Communication
      { path: 'communication', component: CommunicationComponent },
      { path: 'Communicate/NoticeBoard', component: CommunicationComponent },
      { path: 'Communicate/SendEmail', component: CommunicationComponent },
      { path: 'Communicate/MessageLog', component: CommunicationComponent },
      { path: 'Communicate/EventList', component: CommunicationComponent },
      { path: 'Communicate/Calendar', component: CommunicationComponent },
      { path: 'Communicate/EmailTemplates', component: CommunicationComponent },
      { path: 'Communicate/SmsTemplates', component: CommunicationComponent },

      // Examinations & Exam Settings
      { path: 'examinations', component: ExaminationsComponent },
      { path: 'Examinations', component: ExaminationsComponent },
      { path: 'Examinations/ExamType', component: ExaminationsComponent },
      { path: 'Examinations/ExamSchedule', component: ExaminationsComponent },
      { path: 'Examinations/ExamAttendance', component: ExaminationsComponent },
      { path: 'Examinations/MarksRegister', component: ExaminationsComponent },
      { path: 'Examinations/MarksGrade', component: ExaminationsComponent },
      { path: 'Examinations/SendMarksBySms', component: ExaminationsComponent },
      { path: 'ExamSettings/FormatSettings', component: ExaminationsComponent },
      { path: 'ExamSettings/SetupExamRule', component: ExaminationsComponent },
      { path: 'ExamSettings/Position', component: ExaminationsComponent },
      { path: 'ExamSettings/SignatureSettings', component: ExaminationsComponent },
      { path: 'ExamSettings/AdmitCardSetting', component: ExaminationsComponent },
      { path: 'ExamSettings/SeatPlanSetting', component: ExaminationsComponent },

      // Online Exam
      { path: 'online-exam', component: OnlineExamComponent },
      { path: 'OnlineExam', component: OnlineExamComponent },
      { path: 'OnlineExam/QuestionGroup', component: OnlineExamComponent },
      { path: 'OnlineExam/QuestionBank', component: OnlineExamComponent },
      { path: 'OnlineExam/OnlineExam', component: OnlineExamComponent },

      // Teacher Evaluation
      { path: 'teacher-evaluation', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/ApprovedReport', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/PendingReport', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/TeacherWiseReport', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/Settings', component: TeacherEvaluationComponent },

      // Operations & Finance
      { path: 'certificates', component: CertificatesComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'Fees', component: FeesComponent },
      { path: 'Finance', component: FeesComponent },
      { path: 'Finance/FeesGroup', component: FeesComponent },
      { path: 'Finance/FeesType', component: FeesComponent },
      { path: 'Finance/BulkInvoice', component: FeesComponent },
      { path: 'Finance/BulkInvoicePrint', component: FeesComponent },
      { path: 'Finance/FeesInvoice', component: FeesComponent },
      { path: 'Finance/CollectFee', component: FeesComponent },
      { path: 'Finance/BankPayment', component: FeesComponent },
      { path: 'Finance/FeesDueReport', component: FeesComponent },
      { path: 'accounting', component: AccountingComponent },
      { path: 'Accounts', component: AccountingComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'Library', component: LibraryComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'Transport', component: TransportComponent },
      { path: 'dormitory', component: DormitoryComponent },
      { path: 'Dormitory', component: DormitoryComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'Inventory', component: InventoryComponent },
      { path: 'virtual-class', component: VirtualClassComponent },
      { path: 'VirtualClassrooms', component: VirtualClassComponent },
      { path: 'smart-attendance', component: AttendanceComponent },
      { path: 'SmartAttendance', component: AttendanceComponent },
      { path: 'advanced-academics', component: ClassesComponent },
      { path: 'AdvancedAcademics', component: ClassesComponent },
      { path: 'growth-comms', component: CommunicationComponent },
      { path: 'GrowthComms', component: CommunicationComponent },
      { path: 'download-center', component: DownloadCenterComponent },
      { path: 'DownloadCenter', component: DownloadCenterComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: 'role-permission', component: RolePermissionComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'Reports', component: ReportsComponent },
      { path: 'Reports/StaffReport', component: ReportsComponent },
      { path: 'Reports/StaffAttendanceReport', component: ReportsComponent },
      { path: 'Reports/PayrollReport', component: ReportsComponent },
      { path: 'ExamReports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'SystemSettings', component: SettingsComponent },
      { path: 'Style', component: SettingsComponent },
      { path: 'System/ModuleManager', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
