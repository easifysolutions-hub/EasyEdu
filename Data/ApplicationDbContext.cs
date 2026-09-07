using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Models;

namespace EasyEdu.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Core Entities
        public DbSet<Company> Companies { get; set; }
        public DbSet<AcademicYear> AcademicYears { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Parent> Parents { get; set; }

        // Attendance
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<TeacherAttendance> TeacherAttendances { get; set; }

        // Examination & Marks
        public DbSet<Examination> Examinations { get; set; }
        public DbSet<Mark> Marks { get; set; }

        // Finance
        public DbSet<FeeStructure> FeeStructures { get; set; }
        public DbSet<FeeCollection> FeeCollections { get; set; }
        public DbSet<Payroll> Payrolls { get; set; }

        // Transport
        public DbSet<EasyEdu.Models.Route> Routes { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Driver> Drivers { get; set; }

        // Library & Inventory
        public DbSet<Book> Books { get; set; }
        public DbSet<BookIssue> BookIssues { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<InventoryTransaction> InventoryTransactions { get; set; }

        // Other
        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<TimeTable> TimeTables { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        // public DbSet<Notice> Notices { get; set; }
        public DbSet<ToDo> ToDos { get; set; }
        // public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<TrainingAttendance> TrainingAttendances { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<VehicleMaintenance> VehicleMaintenances { get; set; }

        // Admin Section Entities
        public DbSet<AdmissionQuery> AdmissionQueries { get; set; }
        public DbSet<AdmissionQuerySetting> AdmissionQuerySettings { get; set; }
        public DbSet<VisitorBook> VisitorBooks { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<PostalLog> PostalLogs { get; set; }
        public DbSet<PhoneCallLog> PhoneCallLogs { get; set; }
        public DbSet<AdminSetupItem> AdminSetupItems { get; set; }

        // Student Info Extended Entities
        public DbSet<StudentGroup> StudentGroups { get; set; }
        public DbSet<StudentPromotion> StudentPromotions { get; set; }
        public DbSet<SubjectWiseAttendance> SubjectWiseAttendances { get; set; }
        public DbSet<StudentSettings> StudentSettings { get; set; }

        // Behaviour Records Entities
        public DbSet<Incident> Incidents { get; set; }
        public DbSet<StudentIncident> StudentIncidents { get; set; }
        public DbSet<BehaviourSettings> BehaviourSettings { get; set; }
        public DbSet<LessonPlanSettings> LessonPlanSettings { get; set; }


        // Finance Extended Entities
        public DbSet<FeesGroup> FeesGroups { get; set; }
        public DbSet<FeesType> FeesTypes { get; set; }
        public DbSet<FeesInvoice> FeesInvoices { get; set; }
        public DbSet<FeesInvoiceDetail> FeesInvoiceDetails { get; set; }
        public DbSet<BankPayment> BankPayments { get; set; }
        public DbSet<FeesCarryForward> FeesCarryForwards { get; set; }

        // Exam Extended Entities
        public DbSet<ExamSchedule> ExamSchedules { get; set; }
        public DbSet<MarkGrade> MarkGrades { get; set; }
        public DbSet<ExamSettings> ExamSettings { get; set; }

        // HR Extended Entities
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<StaffSettings> StaffSettings { get; set; }

        // Leave Management Entities
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<LeaveDefine> LeaveDefines { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        // Accounts Extended Entities
        public DbSet<Income> Incomes { get; set; }
        public DbSet<ChartOfAccount> ChartOfAccounts { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<FundTransfer> FundTransfers { get; set; }

        // Inventory Extended Entities
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<ItemStore> ItemStores { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ItemReceive> ItemReceives { get; set; }

        // Library Extended Entities
        public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<LibraryMember> LibraryMembers { get; set; }

        // Examination Depth Entities
        public DbSet<ExamType> ExamTypes { get; set; }
        // public DbSet<ExamAttendance> ExamAttendances { get; set; }
        public DbSet<QuestionGroup> QuestionGroups { get; set; }
        public DbSet<QuestionBank> QuestionBanks { get; set; }
        public DbSet<OnlineExam> OnlineExams { get; set; }
        public DbSet<WrittenExam> WrittenExams { get; set; }
        public DbSet<OnlineExamSetting> OnlineExamSettings { get; set; }

        // Front CMS Entities
        public DbSet<HomeSlider> HomeSliders { get; set; }
        public DbSet<CustomPage> CustomPages { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }
        public DbSet<AboutUs> AboutUsEntries { get; set; }
        public DbSet<ExpertTeacher> ExpertTeachers { get; set; }
        public DbSet<GalleryItem> GalleryItems { get; set; }
        public DbSet<NewsPost> NewsPosts { get; set; }
        public DbSet<NewsCategory> NewsCategories { get; set; }
        public DbSet<NewsComment> NewsComments { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<FrontSettings> FrontSettings { get; set; }
        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<FrontCourse> FrontCourses { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<FormDownload> FormDownloads { get; set; }
        public DbSet<BulkInvoiceSettings> BulkInvoiceSettings { get; set; }

        // --- Exam Settings Modules ---
        public DbSet<ExamRule> ExamRules { get; set; }
        public DbSet<ExamPosition> ExamPositions { get; set; }
        public DbSet<ExamSignatureSetting> ExamSignatureSettings { get; set; }
        public DbSet<ExamFormatSetting> ExamFormatSettings { get; set; }
        public DbSet<AdmitCardSetting> AdmitCardSettings { get; set; }
        public DbSet<SeatPlanSetting> SeatPlanSettings { get; set; }

        // --- Zoom Integration ---
        public DbSet<ZoomSetting> ZoomSettings { get; set; }
        public DbSet<ZoomVirtualClass> ZoomVirtualClasses { get; set; }
        public DbSet<ZoomVirtualMeeting> ZoomVirtualMeetings { get; set; }

        // --- Online Student Registration Addon ---
        public DbSet<OnlineRegistrationSetting> OnlineRegistrationSettings { get; set; }
        public DbSet<RegistrationSubmission> RegistrationSubmissions { get; set; }

        // --- BigBlueButton Integration ---
        public DbSet<BBBSetting> BBBSettings { get; set; }
        public DbSet<BBBVirtualClass> BBBVirtualClasses { get; set; }
        public DbSet<BBBVirtualMeeting> BBBVirtualMeetings { get; set; }
        public DbSet<BBBRecording> BBBRecordings { get; set; }

        // --- Smart Attendance: QR Code Addon ---
        public DbSet<QrAttendanceSetting> QrAttendanceSettings { get; set; }

        // --- Google Meet (Gmeet) Integration ---
        public DbSet<GmeetSetting> GmeetSettings { get; set; }
        public DbSet<GmeetVirtualClass> GmeetVirtualClasses { get; set; }
        public DbSet<GmeetVirtualMeeting> GmeetVirtualMeetings { get; set; }

        public DbSet<BiometricSetting> BiometricSettings { get; set; }

        // --- Jitsi Integration Addon ---
        public DbSet<JitsiSetting> JitsiSettings { get; set; }
        public DbSet<JitsiVirtualClass> JitsiVirtualClasses { get; set; }
        public DbSet<JitsiVirtualMeeting> JitsiVirtualMeetings { get; set; }

        // --- CBSE Examination Suite ---
        public DbSet<CbseExam> CbseExams { get; set; }
        public DbSet<CbseTerm> CbseTerms { get; set; }
        public DbSet<CbseAssessment> CbseAssessments { get; set; }
        public DbSet<CbseGrade> CbseGrades { get; set; }
        public DbSet<CbseExamSchedule> CbseExamSchedules { get; set; }
        public DbSet<CbseObservation> CbseObservations { get; set; }
        public DbSet<CbseObservationParameter> CbseObservationParameters { get; set; }
        public DbSet<CbseAssignObservation> CbseAssignObservations { get; set; }
        public DbSet<CbseMarkSheetTemplate> CbseMarkSheetTemplates { get; set; }

        // --- WhatsApp Support Suite ---
        public DbSet<WhatsAppSetting> WhatsAppSettings { get; set; }
        public DbSet<WhatsAppAgent> WhatsAppAgents { get; set; }
        public DbSet<WhatsAppLog> WhatsAppLogs { get; set; }

        // --- LMS (Learning Management System) Suite ---
        public DbSet<LmsCategory> LmsCategories { get; set; }
        public DbSet<LmsCourseLevel> LmsCourseLevels { get; set; }
        public DbSet<LmsCourse> LmsCourses { get; set; }
        public DbSet<LmsEnrollment> LmsEnrollments { get; set; }
        public DbSet<LmsPurchaseLog> LmsPurchaseLogs { get; set; }
        public DbSet<LmsFeesInvoice> LmsFeesInvoices { get; set; }
        public DbSet<LmsSettings> LmsSettings { get; set; }

        // Modules added for Infix compatibility
        public DbSet<Homework> Homeworks { get; set; }
        public DbSet<HomeworkSubmission> HomeworkSubmissions { get; set; }
        public DbSet<Dormitory> Dormitories { get; set; }
        public DbSet<DormitoryRoom> DormitoryRooms { get; set; }
        public DbSet<StudyMaterial> StudyMaterials { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<LessonPlan> LessonPlans { get; set; }
        public DbSet<WalletTransaction> WalletTransactions { get; set; }
        public DbSet<CustomField> CustomFields { get; set; }
        public DbSet<CustomFieldValue> CustomFieldValues { get; set; }
        public DbSet<SystemSettings> SystemSettings { get; set; }
        public DbSet<StudentOptionalSubject> StudentOptionalSubjects { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<ClassSection> ClassSections { get; set; }
        public DbSet<AssignClassTeacher> AssignClassTeachers { get; set; }
        public DbSet<AssignSubject> AssignSubjects { get; set; }
        public DbSet<ClassRoom> ClassRooms { get; set; }
        public DbSet<StudentCategory> StudentCategories { get; set; }
        public DbSet<StudentDocument> StudentDocuments { get; set; }

        // Double Entry Accounting System
        public DbSet<AccountGroup> AccountGroups { get; set; }
        public DbSet<Ledger> Ledgers { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<VoucherDetail> VoucherDetails { get; set; }

        // Teacher Evaluation Entities
        public DbSet<EvaluationCriterion> EvaluationCriteria { get; set; }
        public DbSet<TeacherEvaluation> TeacherEvaluations { get; set; }
        public DbSet<EvaluationResponse> EvaluationResponses { get; set; }

        // Chat & Utilities
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ChatInvitation> ChatInvitations { get; set; }
        public DbSet<ChatBlockedUser> ChatBlockedUsers { get; set; }
        public DbSet<ChatSettings> ChatUserSettings { get; set; }
        public DbSet<TodoTask> TodoTasks { get; set; }

        // System Utilities & Style
        public DbSet<UserAuditLog> UserAuditLogs { get; set; }
        public DbSet<SystemModule> SystemModules { get; set; }
        public DbSet<ThemeSettings> ThemeSettings { get; set; }

        // Communicate Module
        public DbSet<Notice> Notices { get; set; }
        public DbSet<MessageLog> MessageLogs { get; set; }
        public DbSet<MessageTemplate> MessageTemplates { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Chat & Utilities Relationships
            modelBuilder.Entity<ChatMessage>()
                .HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChatMessage>()
                .HasOne(m => m.Receiver)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChatInvitation>()
                .HasOne(i => i.Sender)
                .WithMany()
                .HasForeignKey(i => i.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChatInvitation>()
                .HasOne(i => i.Receiver)
                .WithMany()
                .HasForeignKey(i => i.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChatBlockedUser>()
                .HasOne(b => b.Blocker)
                .WithMany()
                .HasForeignKey(b => b.BlockerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChatBlockedUser>()
                .HasOne(b => b.Blocked)
                .WithMany()
                .HasForeignKey(b => b.BlockedId)
                .OnDelete(DeleteBehavior.Restrict);

            // Wallet Transactions
            modelBuilder.Entity<WalletTransaction>()
                .HasOne(wt => wt.Student)
                .WithMany()
                .HasForeignKey(wt => wt.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // CBSE Examination Configurations
            modelBuilder.Entity<CbseExam>()
                .HasOne(e => e.Term)
                .WithMany()
                .HasForeignKey(e => e.TermId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CbseExamSchedule>()
                .HasOne(s => s.CbseExam)
                .WithMany(e => e.Schedules)
                .HasForeignKey(s => s.CbseExamId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CbseObservationParameter>()
                .HasOne(p => p.Observation)
                .WithMany(o => o.Parameters)
                .HasForeignKey(p => p.ObservationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CbseAssignObservation>()
                .HasOne(a => a.Parameter)
                .WithMany()
                .HasForeignKey(a => a.ParameterId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure relationships and constraints to prevent multiple cascade paths

            // Company relationships
            modelBuilder.Entity<Company>()
                .HasMany(c => c.Users)
                .WithOne(u => u.Company)
                .HasForeignKey(u => u.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AcademicYear>()
                .HasOne(a => a.Company)
                .WithMany(c => c.AcademicYears)
                .HasForeignKey(a => a.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Class>()
                .HasOne(c => c.Company)
                .WithMany(co => co.Classes)
                .HasForeignKey(c => c.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Class>()
                .HasOne(c => c.AcademicYear)
                .WithMany(a => a.Classes)
                .HasForeignKey(c => c.AcademicYearId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Subject>()
                .HasOne(s => s.Class)
                .WithMany(c => c.Subjects)
                .HasForeignKey(s => s.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Student>()
                .HasOne(s => s.Company)
                .WithMany(c => c.Students)
                .HasForeignKey(s => s.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Student>()
                .HasOne(s => s.Class)
                .WithMany(c => c.Students)
                .HasForeignKey(s => s.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Teacher>()
                .HasOne(t => t.Company)
                .WithMany(c => c.Teachers)
                .HasForeignKey(t => t.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            // Student relationships
            modelBuilder.Entity<Student>()
                .HasOne(s => s.User)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Teacher relationships
            modelBuilder.Entity<Teacher>()
                .HasOne(t => t.User)
                .WithOne(u => u.Teacher)
                .HasForeignKey<Teacher>(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Parent relationship with Student
            modelBuilder.Entity<Parent>()
                .HasOne(p => p.Student)
                .WithMany()
                .HasForeignKey(p => p.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Attendance relationships
            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Student)
                .WithMany(s => s.Attendances)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Mark relationships
            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Student)
                .WithMany(s => s.Marks)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Subject)
                .WithMany(s => s.Marks)
                .HasForeignKey(m => m.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Examination)
                .WithMany(e => e.Marks)
                .HasForeignKey(m => m.ExaminationId)
                .OnDelete(DeleteBehavior.Restrict);

            // Fee relationships
            modelBuilder.Entity<FeeCollection>()
                .HasOne(f => f.Student)
                .WithMany(s => s.FeeCollections)
                .HasForeignKey(f => f.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FeeCollection>()
                .HasOne(f => f.FeeStructure)
                .WithMany()
                .HasForeignKey(f => f.FeeStructureId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FeeStructure>()
                .HasOne(f => f.Class)
                .WithMany()
                .HasForeignKey(f => f.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // Payroll relationships
            modelBuilder.Entity<Payroll>()
                .HasOne(p => p.Teacher)
                .WithMany(t => t.Payrolls)
                .HasForeignKey(p => p.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // Transport
            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.Driver)
                .WithMany(d => d.Vehicles)
                .HasForeignKey(v => v.DriverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.Route)
                .WithMany(r => r.Vehicles)
                .HasForeignKey(v => v.RouteId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Student>()
                .HasOne(s => s.Route)
                .WithMany(r => r.Students)
                .HasForeignKey(s => s.RouteId)
                .OnDelete(DeleteBehavior.Restrict);

            // Library
            modelBuilder.Entity<BookIssue>()
                .HasOne(b => b.Book)
                .WithMany(bk => bk.BookIssues)
                .HasForeignKey(b => b.BookId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BookIssue>()
                .HasOne(b => b.Student)
                .WithMany()
                .HasForeignKey(b => b.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Book>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Books)
                .HasForeignKey(b => b.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Inventory
            modelBuilder.Entity<InventoryTransaction>()
                .HasOne(it => it.Inventory)
                .WithMany(inv => inv.Transactions)
                .HasForeignKey(it => it.InventoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Inventory>()
                .HasOne(i => i.Category)
                .WithMany(c => c.Inventories)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<InventoryTransaction>()
                .HasOne(it => it.Student)
                .WithMany()
                .HasForeignKey(it => it.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Certificates
            modelBuilder.Entity<Certificate>()
                .HasOne(c => c.Student)
                .WithMany()
                .HasForeignKey(c => c.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Training
            modelBuilder.Entity<TrainingAttendance>()
                .HasOne(ta => ta.Training)
                .WithMany(t => t.Attendances)
                .HasForeignKey(ta => ta.TrainingId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TrainingAttendance>()
                .HasOne(ta => ta.Teacher)
                .WithMany()
                .HasForeignKey(ta => ta.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // Decimal precision for financial fields
            modelBuilder.Entity<FeeCollection>()
                .Property(f => f.AmountDue)
                .HasPrecision(18, 2);

            modelBuilder.Entity<FeeCollection>()
                .Property(f => f.AmountPaid)
                .HasPrecision(18, 2);

            modelBuilder.Entity<FeeCollection>()
                .Property(f => f.AmountPending)
                .HasPrecision(18, 2);

            modelBuilder.Entity<FeeStructure>()
                .Property(f => f.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Payroll>()
                .Property(p => p.BasicSalary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Payroll>()
                .Property(p => p.GrossSalary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Payroll>()
                .Property(p => p.NetSalary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Mark>()
                .Property(m => m.MarksObtained)
                .HasPrecision(5, 2);

            modelBuilder.Entity<Mark>()
                .Property(m => m.MaxMarks)
                .HasPrecision(5, 2);

            // Additional missing decimal precisions
            modelBuilder.Entity<Teacher>().Property(t => t.Salary).HasPrecision(18, 2);
            modelBuilder.Entity<EasyEdu.Models.Route>().Property(r => r.RouteFee).HasPrecision(18, 2);
            modelBuilder.Entity<Book>().Property(b => b.Price).HasPrecision(18, 2);
            modelBuilder.Entity<BookIssue>().Property(bi => bi.LateFee).HasPrecision(18, 2);
            modelBuilder.Entity<Inventory>().Property(i => i.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<Inventory>().Property(i => i.TotalValue).HasPrecision(18, 2);
            modelBuilder.Entity<InventoryTransaction>().Property(it => it.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<InventoryTransaction>().Property(it => it.TotalAmount).HasPrecision(18, 2);

            // Payroll allowances/deductions
            modelBuilder.Entity<Payroll>().Property(p => p.HRA).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.DA).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.TA).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.OtherAllowances).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.PF).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.TDS).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.ESI).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.LoanDeduction).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.OtherDeductions).HasPrecision(18, 2);
            modelBuilder.Entity<Payroll>().Property(p => p.TotalDeductions).HasPrecision(18, 2);

            // Expense & Maintenance
            modelBuilder.Entity<Expense>().Property(e => e.Amount).HasPrecision(18, 2);
            modelBuilder.Entity<VehicleMaintenance>().Property(vm => vm.Cost).HasPrecision(18, 2);
            modelBuilder.Entity<VehicleMaintenance>()
                .HasOne(vm => vm.Vehicle)
                .WithMany(v => v.Maintenances)
                .HasForeignKey(vm => vm.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Unique constraints
            modelBuilder.Entity<Student>()
                .HasIndex(s => s.AdmissionNumber)
                .IsUnique();

            modelBuilder.Entity<Teacher>()
                .HasIndex(t => t.EmployeeNumber)
                .IsUnique();

            modelBuilder.Entity<Certificate>()
                .HasIndex(c => c.CertificateNumber)
                .IsUnique();

            // Homework
            modelBuilder.Entity<Homework>()
                .HasOne(h => h.Class)
                .WithMany()
                .HasForeignKey(h => h.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HomeworkSubmission>()
                .HasOne(hs => hs.Student)
                .WithMany()
                .HasForeignKey(hs => hs.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Dormitory
            modelBuilder.Entity<DormitoryRoom>()
                .Property(dr => dr.CostPerBed)
                .HasPrecision(18, 2);

            modelBuilder.Entity<DormitoryRoom>()
                .HasOne(dr => dr.Dormitory)
                .WithMany(d => d.Rooms)
                .HasForeignKey(dr => dr.DormitoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Lesson Plan
            modelBuilder.Entity<Lesson>()
                .HasOne(l => l.Class)
                .WithMany()
                .HasForeignKey(l => l.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Topic>()
                .HasOne(t => t.Lesson)
                .WithMany(l => l.Topics)
                .HasForeignKey(t => t.LessonId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LessonPlan>()
                .HasOne(lp => lp.Lesson)
                .WithMany()
                .HasForeignKey(lp => lp.LessonId)
                .OnDelete(DeleteBehavior.Restrict);

            // Student Optional Subjects
            modelBuilder.Entity<StudentOptionalSubject>()
                .HasOne(sos => sos.Student)
                .WithMany()
                .HasForeignKey(sos => sos.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<StudentOptionalSubject>()
                .HasOne(sos => sos.Subject)
                .WithMany()
                .HasForeignKey(sos => sos.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            // Class Sections
            modelBuilder.Entity<ClassSection>()
                .HasOne(cs => cs.Class)
                .WithMany()
                .HasForeignKey(cs => cs.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ClassSection>()
                .HasOne(cs => cs.Section)
                .WithMany()
                .HasForeignKey(cs => cs.SectionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Assign Class Teacher
            modelBuilder.Entity<AssignClassTeacher>()
                .HasOne(act => act.Class)
                .WithMany()
                .HasForeignKey(act => act.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AssignClassTeacher>()
                .HasOne(act => act.Section)
                .WithMany()
                .HasForeignKey(act => act.SectionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AssignClassTeacher>()
                .HasOne(act => act.Teacher)
                .WithMany()
                .HasForeignKey(act => act.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // Assign Subject
            modelBuilder.Entity<AssignSubject>()
                .HasOne(asub => asub.Class)
                .WithMany()
                .HasForeignKey(asub => asub.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AssignSubject>()
                .HasOne(asub => asub.Section)
                .WithMany()
                .HasForeignKey(asub => asub.SectionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AssignSubject>()
                .HasOne(asub => asub.Subject)
                .WithMany()
                .HasForeignKey(asub => asub.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AssignSubject>()
                .HasOne(asub => asub.Teacher)
                .WithMany()
                .HasForeignKey(asub => asub.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // TimeTable (Class Routine)
            modelBuilder.Entity<TimeTable>()
                .HasOne(t => t.Class)
                .WithMany(c => c.TimeTables)
                .HasForeignKey(t => t.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeTable>()
                .HasOne(t => t.Section)
                .WithMany()
                .HasForeignKey(t => t.SectionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeTable>()
                .HasOne(t => t.Subject)
                .WithMany()
                .HasForeignKey(t => t.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeTable>()
                .HasOne(t => t.Teacher)
                .WithMany()
                .HasForeignKey(t => t.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeTable>()
                .HasOne(t => t.ClassRoom)
                .WithMany()
                .HasForeignKey(t => t.ClassRoomId)
                .OnDelete(DeleteBehavior.Restrict);

            // Admin Section relationships
            modelBuilder.Entity<AdmissionQuery>().HasOne(a => a.Company).WithMany().HasForeignKey(a => a.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<AdmissionQuerySetting>().HasOne(a => a.Company).WithMany().HasForeignKey(a => a.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<VisitorBook>().HasOne(v => v.Company).WithMany().HasForeignKey(v => v.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Complaint>().HasOne(c => c.Company).WithMany().HasForeignKey(c => c.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<PostalLog>().HasOne(p => p.Company).WithMany().HasForeignKey(p => p.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<PhoneCallLog>().HasOne(p => p.Company).WithMany().HasForeignKey(p => p.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<AdminSetupItem>().HasOne(a => a.Company).WithMany().HasForeignKey(a => a.CompanyId).OnDelete(DeleteBehavior.Restrict);

            // Transport Relationships
            modelBuilder.Entity<EasyEdu.Models.Route>().HasOne(r => r.Company).WithMany().HasForeignKey(r => r.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Vehicle>().HasOne(v => v.Company).WithMany().HasForeignKey(v => v.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Driver>().HasOne(d => d.Company).WithMany().HasForeignKey(d => d.CompanyId).OnDelete(DeleteBehavior.Restrict);

            // Student Extended relationships
            modelBuilder.Entity<StudentGroup>().HasOne(g => g.Company).WithMany().HasForeignKey(g => g.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StudentPromotion>().HasOne(p => p.Student).WithMany().HasForeignKey(p => p.StudentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<SubjectWiseAttendance>().HasOne(a => a.Student).WithMany().HasForeignKey(a => a.StudentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<SubjectWiseAttendance>().HasOne(a => a.Subject).WithMany().HasForeignKey(a => a.SubjectId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StudentSettings>().HasOne(s => s.Company).WithMany().HasForeignKey(s => s.CompanyId).OnDelete(DeleteBehavior.Restrict);

            // Behaviour Records relationships
            modelBuilder.Entity<Incident>().HasOne(i => i.Company).WithMany().HasForeignKey(i => i.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StudentIncident>().HasOne(si => si.Student).WithMany().HasForeignKey(si => si.StudentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StudentIncident>().HasOne(si => si.Incident).WithMany().HasForeignKey(si => si.IncidentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BehaviourSettings>().HasOne(s => s.Company).WithMany().HasForeignKey(s => s.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<LessonPlanSettings>().HasOne(s => s.Company).WithMany().HasForeignKey(s => s.CompanyId).OnDelete(DeleteBehavior.Restrict);


            // Finance Extended relationships
            modelBuilder.Entity<FeesGroup>().HasOne(g => g.Company).WithMany().HasForeignKey(g => g.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<FeesType>().HasOne(t => t.FeesGroup).WithMany(g => g.FeesTypes).HasForeignKey(t => t.FeesGroupId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<FeesInvoice>().HasOne(i => i.Student).WithMany().HasForeignKey(i => i.StudentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<FeesInvoice>().HasOne(i => i.AcademicYear).WithMany().HasForeignKey(i => i.AcademicYearId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<FeesInvoiceDetail>().HasOne(id => id.FeesInvoice).WithMany(i => i.Details).HasForeignKey(id => id.FeesInvoiceId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<FeesInvoiceDetail>().HasOne(id => id.FeesType).WithMany().HasForeignKey(id => id.FeesTypeId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BankPayment>().HasOne(bp => bp.Student).WithMany().HasForeignKey(bp => bp.StudentId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BankPayment>().HasOne(bp => bp.FeesInvoice).WithMany().HasForeignKey(bp => bp.FeesInvoiceId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<FeesCarryForward>().HasOne(cf => cf.Student).WithMany().HasForeignKey(cf => cf.StudentId).OnDelete(DeleteBehavior.Restrict);

            // Precision for finance extended
            modelBuilder.Entity<FeesType>().Property(t => t.Amount).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoice>().Property(i => i.TotalAmount).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoice>().Property(i => i.PaidAmount).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoice>().Property(i => i.TotalWaiver).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoice>().Property(i => i.TotalFine).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoiceDetail>().Property(id => id.Amount).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoiceDetail>().Property(id => id.Waiver).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoiceDetail>().Property(id => id.Fine).HasPrecision(18, 2);
            modelBuilder.Entity<FeesInvoiceDetail>().Property(id => id.PaidAmount).HasPrecision(18, 2);
            modelBuilder.Entity<BankPayment>().Property(bp => bp.Amount).HasPrecision(18, 2);
            modelBuilder.Entity<FeesCarryForward>().Property(cf => cf.DueAmount).HasPrecision(18, 2);

            // Exam Extended relationships
            modelBuilder.Entity<ExamSchedule>().HasOne(e => e.Examination).WithMany().HasForeignKey(e => e.ExaminationId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ExamSchedule>().HasOne(e => e.Subject).WithMany().HasForeignKey(e => e.SubjectId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ExamSchedule>().HasOne(e => e.ClassRoom).WithMany().HasForeignKey(e => e.ClassRoomId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ExamSchedule>().Property(e => e.FullMarks).HasPrecision(18, 2);
            modelBuilder.Entity<ExamSchedule>().Property(e => e.PassMarks).HasPrecision(18, 2);
            modelBuilder.Entity<ExamSettings>().HasOne(s => s.Company).WithMany().HasForeignKey(s => s.CompanyId).OnDelete(DeleteBehavior.Restrict);

            // Exam Attendance fix - REMOVED to fix migration
            /*
            modelBuilder.Entity<ExamAttendance>()
                .HasOne(ea => ea.ExamSchedule)
                .WithMany()
                .HasForeignKey(ea => ea.ExamScheduleId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ExamAttendance>()
                .HasOne(ea => ea.Student)
                .WithMany()
                .HasForeignKey(ea => ea.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
            */

            // HR Extended relationships
            modelBuilder.Entity<Designation>().HasOne(d => d.Company).WithMany().HasForeignKey(d => d.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Department>().HasOne(d => d.Company).WithMany().HasForeignKey(d => d.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StaffSettings>().HasOne(s => s.Company).WithMany().HasForeignKey(s => s.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Teacher>().HasOne(t => t.Designation).WithMany().HasForeignKey(t => t.DesignationId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Teacher>().HasOne(t => t.Department).WithMany().HasForeignKey(t => t.DepartmentId).OnDelete(DeleteBehavior.Restrict);

            // Leave Management relationships
            modelBuilder.Entity<LeaveType>().HasOne(lt => lt.Company).WithMany().HasForeignKey(lt => lt.CompanyId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<LeaveDefine>().HasOne(ld => ld.LeaveType).WithMany().HasForeignKey(ld => ld.LeaveTypeId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<LeaveRequest>().HasOne(lr => lr.User).WithMany().HasForeignKey(lr => lr.UserId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<LeaveRequest>().HasOne(lr => lr.LeaveType).WithMany().HasForeignKey(lr => lr.LeaveTypeId).OnDelete(DeleteBehavior.Restrict);

            // Accounts Extended precisions
            modelBuilder.Entity<Income>().Property(i => i.Amount).HasPrecision(18, 2);
            modelBuilder.Entity<BankAccount>().Property(b => b.OpeningBalance).HasPrecision(18, 2);
            modelBuilder.Entity<BankAccount>().Property(b => b.CurrentBalance).HasPrecision(18, 2);
            modelBuilder.Entity<FundTransfer>().Property(f => f.Amount).HasPrecision(18, 2);

            // Added precision fixes for exam and registration entities
            modelBuilder.Entity<OnlineExam>().Property(e => e.PassPercentage).HasPrecision(18, 2);
            modelBuilder.Entity<OnlineRegistrationSetting>().Property(e => e.RegistrationFee).HasPrecision(18, 2);
            modelBuilder.Entity<WrittenExam>().Property(e => e.MaxMarks).HasPrecision(18, 2);

            // Inventory Extended precisions
            modelBuilder.Entity<ItemReceive>().Property(r => r.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<ItemReceive>().Property(r => r.TotalPrice).HasPrecision(18, 2);

            // Accounting System Configurations
            modelBuilder.Entity<AccountGroup>()
                .HasOne(ag => ag.ParentGroup)
                .WithMany(pg => pg.SubGroups)
                .HasForeignKey(ag => ag.ParentGroupId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ledger>()
                .HasOne(l => l.AccountGroup)
                .WithMany(ag => ag.Ledgers)
                .HasForeignKey(l => l.AccountGroupId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<VoucherDetail>()
                .HasOne(vd => vd.Voucher)
                .WithMany(v => v.Details)
                .HasForeignKey(vd => vd.VoucherId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VoucherDetail>()
                .HasOne(vd => vd.Ledger)
                .WithMany()
                .HasForeignKey(vd => vd.LedgerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ledger>().Property(l => l.OpeningBalance).HasPrecision(18, 2);
            modelBuilder.Entity<VoucherDetail>().Property(vd => vd.DebitAmount).HasPrecision(18, 2);
            modelBuilder.Entity<VoucherDetail>().Property(vd => vd.CreditAmount).HasPrecision(18, 2);

            modelBuilder.Entity<TeacherEvaluation>().Property(te => te.TotalRating).HasPrecision(18, 2);

            // --- LMS Protocol Configuration ---
            modelBuilder.Entity<LmsEnrollment>()
                .HasOne(e => e.Student)
                .WithMany()
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsEnrollment>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsPurchaseLog>()
                .HasOne(l => l.Student)
                .WithMany()
                .HasForeignKey(l => l.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsPurchaseLog>()
                .HasOne(l => l.Course)
                .WithMany()
                .HasForeignKey(l => l.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsPurchaseLog>()
                .HasOne(l => l.Company)
                .WithMany()
                .HasForeignKey(l => l.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsFeesInvoice>()
                .HasOne(i => i.Student)
                .WithMany()
                .HasForeignKey(i => i.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsFeesInvoice>()
                .HasOne(i => i.Company)
                .WithMany()
                .HasForeignKey(i => i.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsCourse>()
                .HasOne(c => c.Company)
                .WithMany()
                .HasForeignKey(c => c.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsCourse>()
                .HasOne(c => c.Category)
                .WithMany()
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsCourse>()
                .HasOne(c => c.Level)
                .WithMany()
                .HasForeignKey(c => c.LevelId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsCategory>()
                .HasOne(c => c.Company)
                .WithMany()
                .HasForeignKey(c => c.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LmsCourseLevel>()
                .HasOne(c => c.Company)
                .WithMany()
                .HasForeignKey(c => c.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            ApplyTableNamePrefix(modelBuilder);
        }

        private const string TablePrefix = "easyEdu_";

        private static void ApplyTableNamePrefix(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName();
                if (string.IsNullOrEmpty(tableName) || tableName.StartsWith(TablePrefix, StringComparison.Ordinal))
                    continue;

                entityType.SetTableName(TablePrefix + tableName);
            }
        }
    }
}
