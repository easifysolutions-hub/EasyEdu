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
import { CbseExamComponent } from './pages/cbse-exam/cbse-exam.component';
import { LmsComponent } from './pages/lms/lms.component';
import { AiContentComponent } from './pages/ai-content/ai-content.component';
import { RegistrationAddonComponent } from './pages/registration-addon/registration-addon.component';
import { WhatsAppAddonComponent } from './pages/whatsapp-addon/whatsapp-addon.component';
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
import { ImportExportComponent } from './pages/import-export/import-export.component';
import { FrontendCmsComponent } from './pages/frontend-cms/frontend-cms.component';
import { ExamReportsComponent } from './pages/exam-reports/exam-reports.component';
import { ModuleManagerComponent } from './pages/module-manager/module-manager.component';
import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

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

  // Secured Application Portal (Guarded with Authentication and Admin Permissions)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard, permissionGuard],
    canActivateChild: [permissionGuard],
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

      // Attendance & Smart Attendance
      { path: 'attendance', component: AttendanceComponent },
      { path: 'Attendance', component: AttendanceComponent },
      { path: 'Attendance/SubjectWiseAttendance', component: AttendanceComponent },
      { path: 'attendance/report', component: AttendanceComponent },
      { path: 'smart-attendance', component: AttendanceComponent },
      { path: 'SmartAttendance', component: AttendanceComponent },
      { path: 'Biometrics', component: AttendanceComponent },
      { path: 'Biometrics/StudentReport', component: AttendanceComponent },
      { path: 'Biometrics/StaffReport', component: AttendanceComponent },
      { path: 'Biometrics/Settings', component: AttendanceComponent },
      { path: 'QrAttendance', component: AttendanceComponent },
      { path: 'QrAttendance/Settings', component: AttendanceComponent },
      { path: 'QrAttendance/AutoSubmission', component: AttendanceComponent },

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

      // Online Exam Suite
      { path: 'online-exam', component: OnlineExamComponent },
      { path: 'OnlineExam', component: OnlineExamComponent },
      { path: 'OnlineExam/OnlineExam', component: OnlineExamComponent },
      { path: 'OnlineExam/AddOnlineExam', component: OnlineExamComponent },
      { path: 'OnlineExam/QuestionGroup', component: OnlineExamComponent },
      { path: 'OnlineExam/QuestionBank', component: OnlineExamComponent },
      { path: 'OnlineExam/WrittenExam', component: OnlineExamComponent },
      { path: 'OnlineExam/Settings', component: OnlineExamComponent },

      // CBSE Suite
      { path: 'cbse-exam', component: CbseExamComponent },
      { path: 'CbseExam', component: CbseExamComponent },
      { path: 'CbseExam/Terms', component: CbseExamComponent },
      { path: 'CbseExam/Exams', component: CbseExamComponent },
      { path: 'CbseExam/ExamSchedule', component: CbseExamComponent },
      { path: 'CbseExam/ExamGrade', component: CbseExamComponent },
      { path: 'CbseExam/Assessments', component: CbseExamComponent },
      { path: 'CbseExam/Observations', component: CbseExamComponent },
      { path: 'CbseExam/ObservationParameters', component: CbseExamComponent },
      { path: 'CbseExam/AssignObservations', component: CbseExamComponent },
      { path: 'CbseExam/Templates', component: CbseExamComponent },
      { path: 'CbseExam/PrintMarksheet', component: CbseExamComponent },
      { path: 'CbseExam/Reports', component: CbseExamComponent },

      // LMS Suite
      { path: 'lms', component: LmsComponent },
      { path: 'Lms', component: LmsComponent },
      { path: 'Lms/AllCourses', component: LmsComponent },
      { path: 'Lms/AddCourse', component: LmsComponent },
      { path: 'Lms/PendingCourse', component: LmsComponent },
      { path: 'Lms/CategoryList', component: LmsComponent },
      { path: 'Lms/CourseLevel', component: LmsComponent },
      { path: 'Lms/EnrollmentHistory', component: LmsComponent },
      { path: 'Lms/PurchaseLog', component: LmsComponent },
      { path: 'Lms/FeesInvoice', component: LmsComponent },
      { path: 'Lms/Settings', component: LmsComponent },

      // AI Content Addon
      { path: 'ai-content', component: AiContentComponent },
      { path: 'AiContent', component: AiContentComponent },

      // Admission Suite
      { path: 'registration-addon', component: RegistrationAddonComponent },
      { path: 'RegistrationAddon', component: RegistrationAddonComponent },
      { path: 'RegistrationAddon/StudentList', component: RegistrationAddonComponent },
      { path: 'RegistrationAddon/Settings', component: RegistrationAddonComponent },

      // WhatsApp Suite
      { path: 'whatsapp', component: WhatsAppAddonComponent },
      { path: 'WhatsApp', component: WhatsAppAddonComponent },
      { path: 'WhatsApp/Settings', component: WhatsAppAddonComponent },
      { path: 'WhatsApp/Agents', component: WhatsAppAddonComponent },
      { path: 'WhatsApp/Analytics', component: WhatsAppAddonComponent },

      // Virtual Classrooms (Zoom, Gmeet, Jitsi, BBB, InAppLive)
      { path: 'virtual-class', component: VirtualClassComponent },
      { path: 'VirtualClassrooms', component: VirtualClassComponent },
      { path: 'Zoom', component: VirtualClassComponent },
      { path: 'Zoom/VirtualClass', component: VirtualClassComponent },
      { path: 'Zoom/VirtualMeeting', component: VirtualClassComponent },
      { path: 'Zoom/ClassReports', component: VirtualClassComponent },
      { path: 'Zoom/MeetingReports', component: VirtualClassComponent },
      { path: 'Zoom/Settings', component: VirtualClassComponent },
      { path: 'Gmeet', component: VirtualClassComponent },
      { path: 'Gmeet/VirtualClass', component: VirtualClassComponent },
      { path: 'Gmeet/VirtualMeeting', component: VirtualClassComponent },
      { path: 'Gmeet/ClassReports', component: VirtualClassComponent },
      { path: 'Gmeet/MeetingReports', component: VirtualClassComponent },
      { path: 'Gmeet/Settings', component: VirtualClassComponent },
      { path: 'Jitsi', component: VirtualClassComponent },
      { path: 'Jitsi/VirtualClass', component: VirtualClassComponent },
      { path: 'Jitsi/VirtualMeeting', component: VirtualClassComponent },
      { path: 'Jitsi/Settings', component: VirtualClassComponent },
      { path: 'BigBlueButton', component: VirtualClassComponent },
      { path: 'BigBlueButton/VirtualClass', component: VirtualClassComponent },
      { path: 'BigBlueButton/VirtualMeeting', component: VirtualClassComponent },
      { path: 'BigBlueButton/ClassReports', component: VirtualClassComponent },
      { path: 'BigBlueButton/MeetingReports', component: VirtualClassComponent },
      { path: 'BigBlueButton/ClassRecordList', component: VirtualClassComponent },
      { path: 'BigBlueButton/MeetingRecordList', component: VirtualClassComponent },
      { path: 'BigBlueButton/Settings', component: VirtualClassComponent },
      { path: 'InAppLive', component: VirtualClassComponent },

      // Teacher Evaluation
      { path: 'teacher-evaluation', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/ApprovedReport', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/PendingReport', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/TeacherWiseReport', component: TeacherEvaluationComponent },
      { path: 'TeacherEvaluation/Settings', component: TeacherEvaluationComponent },

      // Operations & Finance
      { path: 'certificates', component: CertificatesComponent },
      { path: 'Certificates', component: CertificatesComponent },
      { path: 'Certificates/Index', component: CertificatesComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'Fees', component: FeesComponent },
      { path: 'Finance', component: FeesComponent },
      { path: 'Finance/FeesGroup', component: FeesComponent },
      { path: 'Finance/FeesType', component: FeesComponent },
      { path: 'Finance/BulkInvoice', component: FeesComponent },
      { path: 'Finance/BulkInvoicePrint', component: FeesComponent },
      { path: 'Finance/BulkInvoicePrintSettings', component: FeesComponent },
      { path: 'Finance/FeesInvoice', component: FeesComponent },
      { path: 'Finance/CollectFee', component: FeesComponent },
      { path: 'Finance/BankPayment', component: FeesComponent },
      { path: 'Finance/FeesDueReport', component: FeesComponent },
      { path: 'accounting', component: AccountingComponent },
      { path: 'Accounts', component: AccountingComponent },
      { path: 'Accounting', component: AccountingComponent },
      { path: 'Accounting/PaymentVoucher', component: AccountingComponent },
      { path: 'Accounting/ReceiptVoucher', component: AccountingComponent },
      { path: 'Accounting/JournalVoucher', component: AccountingComponent },
      { path: 'Accounting/ContraVoucher', component: AccountingComponent },
      { path: 'Accounting/SalesVoucher', component: AccountingComponent },
      { path: 'Accounting/PurchaseVoucher', component: AccountingComponent },
      { path: 'Accounting/ChartOfAccounts', component: AccountingComponent },
      { path: 'Accounting/ItemAccountMaster', component: AccountingComponent },
      { path: 'Accounting/VoucherList', component: AccountingComponent },
      { path: 'Accounting/AccountLedger', component: AccountingComponent },
      { path: 'Accounting/TrialBalance', component: AccountingComponent },
      { path: 'Accounting/ReceiptPayment', component: AccountingComponent },
      { path: 'Accounting/IncomeExpenditure', component: AccountingComponent },
      { path: 'Accounting/BalanceSheet', component: AccountingComponent },
      { path: 'Accounts/Voucher', component: AccountingComponent },
      { path: 'Accounts/ChartOfAccounts', component: AccountingComponent },
      { path: 'Accounts/TrialBalance', component: AccountingComponent },
      { path: 'Accounts/BalanceSheet', component: AccountingComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'Library', component: LibraryComponent },
      { path: 'Library/CreateBook', component: LibraryComponent },
      { path: 'Library/AddBook', component: LibraryComponent },
      { path: 'Library/BookList', component: LibraryComponent },
      { path: 'Library/BookCategory', component: LibraryComponent },
      { path: 'Library/Categories', component: LibraryComponent },
      { path: 'Library/AddMember', component: LibraryComponent },
      { path: 'Library/Members', component: LibraryComponent },
      { path: 'Library/IssueBook', component: LibraryComponent },
      { path: 'Library/IssueBooks', component: LibraryComponent },
      { path: 'Library/IssuedBooks', component: LibraryComponent },
      { path: 'Library/Reports', component: LibraryComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'Transport', component: TransportComponent },
      { path: 'Transport/Vehicles', component: TransportComponent },
      { path: 'Transport/AssignVehicle', component: TransportComponent },
      { path: 'Transport/AssignStudents', component: TransportComponent },
      { path: 'Transport/Reports', component: TransportComponent },
      { path: 'dormitory', component: DormitoryComponent },
      { path: 'Dormitory', component: DormitoryComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'Inventory', component: InventoryComponent },
      { path: 'Inventory/ItemCategory', component: InventoryComponent },
      { path: 'Inventory/Supplier', component: InventoryComponent },
      { path: 'Inventory/ItemReceive', component: InventoryComponent },
      { path: 'Inventory/IssueItem', component: InventoryComponent },
      { path: 'Inventory/Transactions', component: InventoryComponent },
      { path: 'Inventory/Reports', component: InventoryComponent },
      { path: 'advanced-academics', component: ClassesComponent },
      { path: 'AdvancedAcademics', component: ClassesComponent },
      { path: 'growth-comms', component: CommunicationComponent },
      { path: 'GrowthComms', component: CommunicationComponent },
      { path: 'download-center', component: DownloadCenterComponent },
      { path: 'DownloadCenter', component: DownloadCenterComponent },
      { path: 'DownloadCenter/ContentType', component: DownloadCenterComponent },
      { path: 'DownloadCenter/UploadContent', component: DownloadCenterComponent },
      { path: 'DownloadCenter/ContentList', component: DownloadCenterComponent },
      { path: 'DownloadCenter/SharedContent', component: DownloadCenterComponent },
      { path: 'DownloadCenter/VideoList', component: DownloadCenterComponent },
      { path: 'import-export', component: ImportExportComponent },
      { path: 'ImportExport', component: ImportExportComponent },
      { path: 'ImportExport/DownloadTemplate', component: ImportExportComponent },
      { path: 'DataManagement', component: ImportExportComponent },
      { path: 'DataManagement/ImportExport', component: ImportExportComponent },
      { path: 'frontend-cms', component: FrontendCmsComponent },
      { path: 'FrontendCMS', component: FrontendCmsComponent },
      { path: 'FrontSettings', component: FrontendCmsComponent },
      { path: 'FrontSettings/ManageTheme', component: FrontendCmsComponent },
      { path: 'FrontSettings/Slider', component: FrontendCmsComponent },
      { path: 'FrontSettings/PageList', component: FrontendCmsComponent },
      { path: 'FrontSettings/ExpertTeachers', component: FrontendCmsComponent },
      { path: 'FrontSettings/Gallery', component: FrontendCmsComponent },
      { path: 'FrontSettings/NewsList', component: FrontendCmsComponent },
      { path: 'FrontSettings/Testimonials', component: FrontendCmsComponent },
      { path: 'FrontSettings/FormDownloads', component: FrontendCmsComponent },
      { path: 'FrontSettings/ContactMessages', component: FrontendCmsComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: 'role-permission', component: RolePermissionComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'Reports', component: ReportsComponent },
      { path: 'Reports/StudentReport', component: ReportsComponent },
      { path: 'Reports/StudentAttendanceReport', component: ReportsComponent },
      { path: 'Reports/SubjectAttendanceReport', component: ReportsComponent },
      { path: 'Reports/HomeworkEvaluationReport', component: ReportsComponent },
      { path: 'Reports/GuardianReport', component: ReportsComponent },
      { path: 'Reports/StudentHistory', component: ReportsComponent },
      { path: 'Reports/StudentLoginReport', component: ReportsComponent },
      { path: 'Reports/ClassReport', component: ReportsComponent },
      { path: 'Reports/ClassRoutineReport', component: ReportsComponent },
      { path: 'Reports/PreviousRecord', component: ReportsComponent },
      { path: 'Reports/StudentTransportReport', component: ReportsComponent },
      { path: 'Reports/StudentDormitoryReport', component: ReportsComponent },
      { path: 'Reports/FeesReport', component: ReportsComponent },
      { path: 'Reports/FeesDueReport', component: ReportsComponent },
      { path: 'Reports/FineReport', component: ReportsComponent },
      { path: 'Reports/BalanceReport', component: ReportsComponent },
      { path: 'Reports/WaiverReport', component: ReportsComponent },
      { path: 'Reports/WalletReport', component: ReportsComponent },
      { path: 'Reports/PayrollReport', component: ReportsComponent },
      { path: 'Reports/TransactionReport', component: ReportsComponent },
      { path: 'Reports/StaffReport', component: ReportsComponent },
      { path: 'Reports/StaffAttendanceReport', component: ReportsComponent },
      { path: 'ExamReports', component: ExamReportsComponent },
      { path: 'ExamReports/ExamRoutine', component: ExamReportsComponent },
      { path: 'ExamReports/MeritList', component: ExamReportsComponent },
      { path: 'ExamReports/OnlineExamReport', component: ExamReportsComponent },
      { path: 'ExamReports/SubjectWiseMarksheet', component: ExamReportsComponent },
      { path: 'ExamReports/TabulationSheet', component: ExamReportsComponent },
      { path: 'ExamReports/ProgressCard', component: ExamReportsComponent },
      { path: 'ExamReports/MarkSheetReport', component: ExamReportsComponent },
      { path: 'ExamReports/ProgressCard100Percent', component: ExamReportsComponent },
      { path: 'ExamReports/PreviousResult', component: ExamReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'Settings', component: SettingsComponent },
      { path: 'Settings/Holiday', component: SettingsComponent },
      { path: 'GeneralSettings', component: SettingsComponent },
      { path: 'GeneralSettings/AcademicYear', component: SettingsComponent },
      { path: 'GeneralSettings/BaseSetup', component: SettingsComponent },
      { path: 'GeneralSettings/Backup', component: SettingsComponent },
      { path: 'RolePermission', component: RolePermissionComponent },
      { path: 'RolePermission/Role', component: RolePermissionComponent },
      { path: 'RolePermission/LoginPermission', component: RolePermissionComponent },
      { path: 'RolePermission/ApiPermission', component: SettingsComponent },
      { path: 'Administration/Users', component: SettingsComponent },
      { path: 'Administration/Updates', component: SettingsComponent },
      { path: 'CustomFields', component: SettingsComponent },
      { path: 'SystemSettings', component: SettingsComponent },
      { path: 'Style', component: SettingsComponent },
      { path: 'System/ModuleManager', component: ModuleManagerComponent },
      { path: 'system/modulemanager', component: ModuleManagerComponent },
      { path: 'ModuleManager', component: ModuleManagerComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
