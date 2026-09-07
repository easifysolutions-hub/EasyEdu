using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenameTablesWithEasyEduPrefix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AcademicYears_Companies_CompanyId",
                table: "AcademicYears");

            migrationBuilder.DropForeignKey(
                name: "FK_AccountGroups_AccountGroups_ParentGroupId",
                table: "AccountGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_AdminSetupItems_Companies_CompanyId",
                table: "AdminSetupItems");

            migrationBuilder.DropForeignKey(
                name: "FK_AdmissionQueries_Classes_ClassId",
                table: "AdmissionQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_AdmissionQueries_Companies_CompanyId",
                table: "AdmissionQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_AdmissionQuerySettings_Companies_CompanyId",
                table: "AdmissionQuerySettings");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                table: "AspNetRoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Companies_CompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignClassTeachers_Classes_ClassId",
                table: "AssignClassTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignClassTeachers_Sections_SectionId",
                table: "AssignClassTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignClassTeachers_Teachers_TeacherId",
                table: "AssignClassTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignSubjects_Classes_ClassId",
                table: "AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignSubjects_Sections_SectionId",
                table: "AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignSubjects_Subjects_SubjectId",
                table: "AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignSubjects_Teachers_TeacherId",
                table: "AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Students_StudentId",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_BankPayments_FeesInvoices_FeesInvoiceId",
                table: "BankPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_BankPayments_Students_StudentId",
                table: "BankPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBRecordings_Companies_CompanyId",
                table: "BBBRecordings");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBSettings_Companies_CompanyId",
                table: "BBBSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBVirtualClasses_Classes_ClassId",
                table: "BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBVirtualClasses_Companies_CompanyId",
                table: "BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBVirtualClasses_Sections_SectionId",
                table: "BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBVirtualClasses_Subjects_SubjectId",
                table: "BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_BBBVirtualMeetings_Companies_CompanyId",
                table: "BBBVirtualMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_BehaviourSettings_Companies_CompanyId",
                table: "BehaviourSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_BiometricSettings_Companies_CompanyId",
                table: "BiometricSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_BookIssues_Books_BookId",
                table: "BookIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_BookIssues_Students_StudentId",
                table: "BookIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_Books_BookCategories_CategoryId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_Books_Companies_CompanyId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_CalendarEvents_Companies_CompanyId",
                table: "CalendarEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseAssessments_Companies_CompanyId",
                table: "CbseAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseAssignObservations_CbseObservationParameters_ParameterId",
                table: "CbseAssignObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseAssignObservations_Students_StudentId",
                table: "CbseAssignObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseExams_CbseTerms_TermId",
                table: "CbseExams");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseExams_Companies_CompanyId",
                table: "CbseExams");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseExamSchedules_CbseExams_CbseExamId",
                table: "CbseExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseExamSchedules_Classes_ClassId",
                table: "CbseExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseExamSchedules_Subjects_SubjectId",
                table: "CbseExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseGrades_Companies_CompanyId",
                table: "CbseGrades");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseMarkSheetTemplates_Companies_CompanyId",
                table: "CbseMarkSheetTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseObservationParameters_CbseObservations_ObservationId",
                table: "CbseObservationParameters");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseObservations_Companies_CompanyId",
                table: "CbseObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_CbseTerms_Companies_CompanyId",
                table: "CbseTerms");

            migrationBuilder.DropForeignKey(
                name: "FK_Certificates_Students_StudentId",
                table: "Certificates");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatBlockedUsers_AspNetUsers_BlockedId",
                table: "ChatBlockedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatBlockedUsers_AspNetUsers_BlockerId",
                table: "ChatBlockedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatBlockedUsers_Companies_CompanyId",
                table: "ChatBlockedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatInvitations_AspNetUsers_ReceiverId",
                table: "ChatInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatInvitations_AspNetUsers_SenderId",
                table: "ChatInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatInvitations_Companies_CompanyId",
                table: "ChatInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_AspNetUsers_ReceiverId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_AspNetUsers_SenderId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_Companies_CompanyId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatUserSettings_AspNetUsers_UserId",
                table: "ChatUserSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatUserSettings_Companies_CompanyId",
                table: "ChatUserSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Classes_AcademicYears_AcademicYearId",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Companies_CompanyId",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassSections_Classes_ClassId",
                table: "ClassSections");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassSections_Sections_SectionId",
                table: "ClassSections");

            migrationBuilder.DropForeignKey(
                name: "FK_Complaints_Companies_CompanyId",
                table: "Complaints");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomFields_Companies_CompanyId",
                table: "CustomFields");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomFieldValues_CustomFields_CustomFieldId",
                table: "CustomFieldValues");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Companies_CompanyId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Designations_Companies_CompanyId",
                table: "Designations");

            migrationBuilder.DropForeignKey(
                name: "FK_DormitoryRooms_Dormitories_DormitoryId",
                table: "DormitoryRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Companies_CompanyId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_EvaluationResponses_EvaluationCriteria_EvaluationCriterionId",
                table: "EvaluationResponses");

            migrationBuilder.DropForeignKey(
                name: "FK_EvaluationResponses_TeacherEvaluations_TeacherEvaluationId",
                table: "EvaluationResponses");

            migrationBuilder.DropForeignKey(
                name: "FK_Examinations_AcademicYears_AcademicYearId",
                table: "Examinations");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamPositions_Examinations_ExaminationId",
                table: "ExamPositions");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamPositions_Students_StudentId",
                table: "ExamPositions");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamSchedules_ClassRooms_ClassRoomId",
                table: "ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamSchedules_Classes_ClassId",
                table: "ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamSchedules_Examinations_ExaminationId",
                table: "ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamSchedules_Sections_SectionId",
                table: "ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamSchedules_Subjects_SubjectId",
                table: "ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamSettings_Companies_CompanyId",
                table: "ExamSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Companies_CompanyId",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpertTeachers_Teachers_TeacherId",
                table: "ExpertTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_FeeCollections_FeeStructures_FeeStructureId",
                table: "FeeCollections");

            migrationBuilder.DropForeignKey(
                name: "FK_FeeCollections_FeesInvoices_FeesInvoiceId",
                table: "FeeCollections");

            migrationBuilder.DropForeignKey(
                name: "FK_FeeCollections_Students_StudentId",
                table: "FeeCollections");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesCarryForwards_Students_StudentId",
                table: "FeesCarryForwards");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesGroups_Companies_CompanyId",
                table: "FeesGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesInvoiceDetails_FeesInvoices_FeesInvoiceId",
                table: "FeesInvoiceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesInvoiceDetails_FeesTypes_FeesTypeId",
                table: "FeesInvoiceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesInvoices_AcademicYears_AcademicYearId",
                table: "FeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesInvoices_Students_StudentId",
                table: "FeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesInvoices_Students_StudentId1",
                table: "FeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_FeeStructures_Classes_ClassId",
                table: "FeeStructures");

            migrationBuilder.DropForeignKey(
                name: "FK_FeesTypes_FeesGroups_FeesGroupId",
                table: "FeesTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_FrontCourses_CourseCategories_CategoryId",
                table: "FrontCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_GmeetSettings_Companies_CompanyId",
                table: "GmeetSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_GmeetVirtualClasses_Classes_ClassId",
                table: "GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_GmeetVirtualClasses_Companies_CompanyId",
                table: "GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_GmeetVirtualClasses_Sections_SectionId",
                table: "GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_GmeetVirtualClasses_Subjects_SubjectId",
                table: "GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_GmeetVirtualMeetings_Companies_CompanyId",
                table: "GmeetVirtualMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_Homeworks_Classes_ClassId",
                table: "Homeworks");

            migrationBuilder.DropForeignKey(
                name: "FK_Homeworks_Subjects_SubjectId",
                table: "Homeworks");

            migrationBuilder.DropForeignKey(
                name: "FK_HomeworkSubmissions_Homeworks_HomeworkId",
                table: "HomeworkSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_HomeworkSubmissions_Students_StudentId",
                table: "HomeworkSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Incidents_Companies_CompanyId",
                table: "Incidents");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Companies_CompanyId",
                table: "Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_ItemCategories_CategoryId",
                table: "Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_InventoryTransactions_Inventories_InventoryId",
                table: "InventoryTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_InventoryTransactions_Students_StudentId",
                table: "InventoryTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemReceives_Inventories_InventoryId",
                table: "ItemReceives");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemReceives_Suppliers_SupplierId",
                table: "ItemReceives");

            migrationBuilder.DropForeignKey(
                name: "FK_JitsiSettings_Companies_CompanyId",
                table: "JitsiSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_JitsiVirtualClasses_Classes_ClassId",
                table: "JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_JitsiVirtualClasses_Companies_CompanyId",
                table: "JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_JitsiVirtualClasses_Sections_SectionId",
                table: "JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_JitsiVirtualClasses_Subjects_SubjectId",
                table: "JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_JitsiVirtualMeetings_Companies_CompanyId",
                table: "JitsiVirtualMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveDefines_LeaveTypes_LeaveTypeId",
                table: "LeaveDefines");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_UserId",
                table: "LeaveRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_LeaveTypes_LeaveTypeId",
                table: "LeaveRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveTypes_Companies_CompanyId",
                table: "LeaveTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_Ledgers_AccountGroups_AccountGroupId",
                table: "Ledgers");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlans_Lessons_LessonId",
                table: "LessonPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlans_Teachers_TeacherId",
                table: "LessonPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlans_Topics_TopicId",
                table: "LessonPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlanSettings_Companies_CompanyId",
                table: "LessonPlanSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Classes_ClassId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Subjects_SubjectId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_LibraryMembers_Students_StudentId",
                table: "LibraryMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_LibraryMembers_Teachers_StaffId",
                table: "LibraryMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsCategories_Companies_CompanyId",
                table: "LmsCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsCourseLevels_Companies_CompanyId",
                table: "LmsCourseLevels");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsCourses_Companies_CompanyId",
                table: "LmsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsCourses_LmsCategories_CategoryId",
                table: "LmsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsCourses_LmsCourseLevels_LevelId",
                table: "LmsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsEnrollments_LmsCourses_CourseId",
                table: "LmsEnrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsEnrollments_Students_StudentId",
                table: "LmsEnrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsFeesInvoices_Companies_CompanyId",
                table: "LmsFeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsFeesInvoices_Students_StudentId",
                table: "LmsFeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsPurchaseLogs_Companies_CompanyId",
                table: "LmsPurchaseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsPurchaseLogs_LmsCourses_CourseId",
                table: "LmsPurchaseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsPurchaseLogs_Students_StudentId",
                table: "LmsPurchaseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_LmsSettings_Companies_CompanyId",
                table: "LmsSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Marks_Examinations_ExaminationId",
                table: "Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_Marks_Students_StudentId",
                table: "Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_Marks_Subjects_SubjectId",
                table: "Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_MenuItems_ParentId",
                table: "MenuItems");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageLogs_Companies_CompanyId",
                table: "MessageLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageTemplates_Companies_CompanyId",
                table: "MessageTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_NewsComments_NewsPosts_NewsPostId",
                table: "NewsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_NewsPosts_NewsCategories_CategoryId",
                table: "NewsPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_Notices_Companies_CompanyId",
                table: "Notices");

            migrationBuilder.DropForeignKey(
                name: "FK_OnlineExamSettings_Companies_CompanyId",
                table: "OnlineExamSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_OnlineRegistrationSettings_Companies_CompanyId",
                table: "OnlineRegistrationSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Parents_AspNetUsers_UserId",
                table: "Parents");

            migrationBuilder.DropForeignKey(
                name: "FK_Parents_Students_StudentId",
                table: "Parents");

            migrationBuilder.DropForeignKey(
                name: "FK_Payrolls_Teachers_TeacherId",
                table: "Payrolls");

            migrationBuilder.DropForeignKey(
                name: "FK_PhoneCallLogs_Companies_CompanyId",
                table: "PhoneCallLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_PostalLogs_Companies_CompanyId",
                table: "PostalLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_QrAttendanceSettings_Companies_CompanyId",
                table: "QrAttendanceSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionBanks_QuestionGroups_QuestionGroupId",
                table: "QuestionBanks");

            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationSubmissions_AcademicYears_AcademicYearId",
                table: "RegistrationSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationSubmissions_Classes_ClassId",
                table: "RegistrationSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationSubmissions_Companies_CompanyId",
                table: "RegistrationSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Routes_Companies_CompanyId",
                table: "Routes");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffSettings_Companies_CompanyId",
                table: "StaffSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentDocuments_Students_StudentId",
                table: "StudentDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentGroups_Companies_CompanyId",
                table: "StudentGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentIncidents_Incidents_IncidentId",
                table: "StudentIncidents");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentIncidents_Students_StudentId",
                table: "StudentIncidents");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentOptionalSubjects_AcademicYears_AcademicYearId",
                table: "StudentOptionalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentOptionalSubjects_Students_StudentId",
                table: "StudentOptionalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentOptionalSubjects_Subjects_SubjectId",
                table: "StudentOptionalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentPromotions_Students_StudentId",
                table: "StudentPromotions");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_AspNetUsers_UserId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Classes_ClassId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Companies_CompanyId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Dormitories_DormitoryId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_DormitoryRooms_DormitoryRoomId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Routes_RouteId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Sections_SectionId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_StudentCategories_StudentCategoryId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSettings_Companies_CompanyId",
                table: "StudentSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_StudyMaterials_Classes_ClassId",
                table: "StudyMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_StudyMaterials_Subjects_SubjectId",
                table: "StudyMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_Subjects_Classes_ClassId",
                table: "Subjects");

            migrationBuilder.DropForeignKey(
                name: "FK_Subjects_Teachers_TeacherId",
                table: "Subjects");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectWiseAttendances_Students_StudentId",
                table: "SubjectWiseAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectWiseAttendances_Subjects_SubjectId",
                table: "SubjectWiseAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_SystemModules_Companies_CompanyId",
                table: "SystemModules");

            migrationBuilder.DropForeignKey(
                name: "FK_SystemSettings_Companies_CompanyId",
                table: "SystemSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherAttendances_Teachers_TeacherId",
                table: "TeacherAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherEvaluations_Teachers_TeacherId",
                table: "TeacherEvaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_AspNetUsers_UserId",
                table: "Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Companies_CompanyId",
                table: "Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Departments_DepartmentId",
                table: "Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Designations_DesignationId",
                table: "Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_ThemeSettings_Companies_CompanyId",
                table: "ThemeSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_ClassRooms_ClassRoomId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Classes_ClassId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Sections_SectionId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Subjects_SubjectId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Teachers_TeacherId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TodoTasks_AspNetUsers_UserId",
                table: "TodoTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_TodoTasks_Companies_CompanyId",
                table: "TodoTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Lessons_LessonId",
                table: "Topics");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingAttendances_Teachers_TeacherId",
                table: "TrainingAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingAttendances_Trainings_TrainingId",
                table: "TrainingAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Companies_CompanyId",
                table: "Trainings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAuditLogs_AspNetUsers_UserId",
                table: "UserAuditLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAuditLogs_Companies_CompanyId",
                table: "UserAuditLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleMaintenances_Vehicles_VehicleId",
                table: "VehicleMaintenances");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Companies_CompanyId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Drivers_DriverId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Routes_RouteId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_VisitorBooks_Companies_CompanyId",
                table: "VisitorBooks");

            migrationBuilder.DropForeignKey(
                name: "FK_VoucherDetails_Inventories_InventoryId",
                table: "VoucherDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_VoucherDetails_Ledgers_LedgerId",
                table: "VoucherDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_VoucherDetails_Vouchers_VoucherId",
                table: "VoucherDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_WalletTransactions_Students_StudentId",
                table: "WalletTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_WalletTransactions_Students_StudentId1",
                table: "WalletTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_WhatsAppAgents_Companies_CompanyId",
                table: "WhatsAppAgents");

            migrationBuilder.DropForeignKey(
                name: "FK_WhatsAppLogs_Companies_CompanyId",
                table: "WhatsAppLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_WhatsAppSettings_Companies_CompanyId",
                table: "WhatsAppSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_WrittenExams_Companies_CompanyId",
                table: "WrittenExams");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoomSettings_Companies_CompanyId",
                table: "ZoomSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoomVirtualClasses_Classes_ClassId",
                table: "ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoomVirtualClasses_Companies_CompanyId",
                table: "ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoomVirtualClasses_Sections_SectionId",
                table: "ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoomVirtualClasses_Subjects_SubjectId",
                table: "ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoomVirtualMeetings_Companies_CompanyId",
                table: "ZoomVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ZoomVirtualMeetings",
                table: "ZoomVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ZoomVirtualClasses",
                table: "ZoomVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ZoomSettings",
                table: "ZoomSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WrittenExams",
                table: "WrittenExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WhatsAppSettings",
                table: "WhatsAppSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WhatsAppLogs",
                table: "WhatsAppLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WhatsAppAgents",
                table: "WhatsAppAgents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WalletTransactions",
                table: "WalletTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vouchers",
                table: "Vouchers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VoucherDetails",
                table: "VoucherDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VisitorBooks",
                table: "VisitorBooks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleMaintenances",
                table: "VehicleMaintenances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuditLogs",
                table: "UserAuditLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trainings",
                table: "Trainings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingAttendances",
                table: "TrainingAttendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Topics",
                table: "Topics");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TodoTasks",
                table: "TodoTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ToDos",
                table: "ToDos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeTables",
                table: "TimeTables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ThemeSettings",
                table: "ThemeSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Testimonials",
                table: "Testimonials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teachers",
                table: "Teachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherEvaluations",
                table: "TeacherEvaluations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherAttendances",
                table: "TeacherAttendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SystemSettings",
                table: "SystemSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SystemModules",
                table: "SystemModules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Suppliers",
                table: "Suppliers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectWiseAttendances",
                table: "SubjectWiseAttendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subjects",
                table: "Subjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudyMaterials",
                table: "StudyMaterials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentSettings",
                table: "StudentSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Students",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentPromotions",
                table: "StudentPromotions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentOptionalSubjects",
                table: "StudentOptionalSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentIncidents",
                table: "StudentIncidents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentGroups",
                table: "StudentGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentDocuments",
                table: "StudentDocuments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentCategories",
                table: "StudentCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StaffSettings",
                table: "StaffSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SocialMedias",
                table: "SocialMedias");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sections",
                table: "Sections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeatPlanSettings",
                table: "SeatPlanSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Routes",
                table: "Routes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RegistrationSubmissions",
                table: "RegistrationSubmissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionGroups",
                table: "QuestionGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionBanks",
                table: "QuestionBanks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QrAttendanceSettings",
                table: "QrAttendanceSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PostalLogs",
                table: "PostalLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PhoneCallLogs",
                table: "PhoneCallLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payrolls",
                table: "Payrolls");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Parents",
                table: "Parents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnlineRegistrationSettings",
                table: "OnlineRegistrationSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnlineExamSettings",
                table: "OnlineExamSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnlineExams",
                table: "OnlineExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notifications",
                table: "Notifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notices",
                table: "Notices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewsPosts",
                table: "NewsPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewsComments",
                table: "NewsComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewsCategories",
                table: "NewsCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MessageTemplates",
                table: "MessageTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MessageLogs",
                table: "MessageLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenuItems",
                table: "MenuItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Marks",
                table: "Marks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MarkGrades",
                table: "MarkGrades");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsSettings",
                table: "LmsSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsPurchaseLogs",
                table: "LmsPurchaseLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsFeesInvoices",
                table: "LmsFeesInvoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsEnrollments",
                table: "LmsEnrollments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsCourses",
                table: "LmsCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsCourseLevels",
                table: "LmsCourseLevels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LmsCategories",
                table: "LmsCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LibraryMembers",
                table: "LibraryMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lessons",
                table: "Lessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonPlanSettings",
                table: "LessonPlanSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonPlans",
                table: "LessonPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ledgers",
                table: "Ledgers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveTypes",
                table: "LeaveTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveRequests",
                table: "LeaveRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveDefines",
                table: "LeaveDefines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JitsiVirtualMeetings",
                table: "JitsiVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JitsiVirtualClasses",
                table: "JitsiVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JitsiSettings",
                table: "JitsiSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemStores",
                table: "ItemStores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemReceives",
                table: "ItemReceives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemCategories",
                table: "ItemCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventoryTransactions",
                table: "InventoryTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Inventories",
                table: "Inventories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Incomes",
                table: "Incomes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Incidents",
                table: "Incidents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HomeworkSubmissions",
                table: "HomeworkSubmissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Homeworks",
                table: "Homeworks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HomeSliders",
                table: "HomeSliders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GmeetVirtualMeetings",
                table: "GmeetVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GmeetVirtualClasses",
                table: "GmeetVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GmeetSettings",
                table: "GmeetSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GalleryItems",
                table: "GalleryItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FundTransfers",
                table: "FundTransfers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FrontSettings",
                table: "FrontSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FrontCourses",
                table: "FrontCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FormDownloads",
                table: "FormDownloads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeesTypes",
                table: "FeesTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeeStructures",
                table: "FeeStructures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeesInvoices",
                table: "FeesInvoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeesInvoiceDetails",
                table: "FeesInvoiceDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeesGroups",
                table: "FeesGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeesCarryForwards",
                table: "FeesCarryForwards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeeCollections",
                table: "FeeCollections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExpertTeachers",
                table: "ExpertTeachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Expenses",
                table: "Expenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamTypes",
                table: "ExamTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamSignatureSettings",
                table: "ExamSignatureSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamSettings",
                table: "ExamSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamSchedules",
                table: "ExamSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamRules",
                table: "ExamRules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamPositions",
                table: "ExamPositions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Examinations",
                table: "Examinations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamFormatSettings",
                table: "ExamFormatSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EvaluationResponses",
                table: "EvaluationResponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EvaluationCriteria",
                table: "EvaluationCriteria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Drivers",
                table: "Drivers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DormitoryRooms",
                table: "DormitoryRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dormitories",
                table: "Dormitories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Designations",
                table: "Designations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Departments",
                table: "Departments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomPages",
                table: "CustomPages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomFieldValues",
                table: "CustomFieldValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomFields",
                table: "CustomFields");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseCategories",
                table: "CourseCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactMessages",
                table: "ContactMessages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Complaints",
                table: "Complaints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassSections",
                table: "ClassSections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassRooms",
                table: "ClassRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Classes",
                table: "Classes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatUserSettings",
                table: "ChatUserSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatMessages",
                table: "ChatMessages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatInvitations",
                table: "ChatInvitations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatBlockedUsers",
                table: "ChatBlockedUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChartOfAccounts",
                table: "ChartOfAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Certificates",
                table: "Certificates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseTerms",
                table: "CbseTerms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseObservations",
                table: "CbseObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseObservationParameters",
                table: "CbseObservationParameters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseMarkSheetTemplates",
                table: "CbseMarkSheetTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseGrades",
                table: "CbseGrades");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseExamSchedules",
                table: "CbseExamSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseExams",
                table: "CbseExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseAssignObservations",
                table: "CbseAssignObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CbseAssessments",
                table: "CbseAssessments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CalendarEvents",
                table: "CalendarEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BulkInvoiceSettings",
                table: "BulkInvoiceSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Books",
                table: "Books");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookIssues",
                table: "BookIssues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookCategories",
                table: "BookCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BiometricSettings",
                table: "BiometricSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BehaviourSettings",
                table: "BehaviourSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BBBVirtualMeetings",
                table: "BBBVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BBBVirtualClasses",
                table: "BBBVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BBBSettings",
                table: "BBBSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BBBRecordings",
                table: "BBBRecordings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BankPayments",
                table: "BankPayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BankAccounts",
                table: "BankAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendances",
                table: "Attendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AssignSubjects",
                table: "AssignSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AssignClassTeachers",
                table: "AssignClassTeachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserTokens",
                table: "AspNetUserTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserRoles",
                table: "AspNetUserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserLogins",
                table: "AspNetUserLogins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserClaims",
                table: "AspNetUserClaims");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetRoles",
                table: "AspNetRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetRoleClaims",
                table: "AspNetRoleClaims");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdmitCardSettings",
                table: "AdmitCardSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdmissionQuerySettings",
                table: "AdmissionQuerySettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdmissionQueries",
                table: "AdmissionQueries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminSetupItems",
                table: "AdminSetupItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AccountGroups",
                table: "AccountGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AcademicYears",
                table: "AcademicYears");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AboutUsEntries",
                table: "AboutUsEntries");

            migrationBuilder.RenameTable(
                name: "ZoomVirtualMeetings",
                newName: "easyEdu_ZoomVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "ZoomVirtualClasses",
                newName: "easyEdu_ZoomVirtualClasses");

            migrationBuilder.RenameTable(
                name: "ZoomSettings",
                newName: "easyEdu_ZoomSettings");

            migrationBuilder.RenameTable(
                name: "WrittenExams",
                newName: "easyEdu_WrittenExams");

            migrationBuilder.RenameTable(
                name: "WhatsAppSettings",
                newName: "easyEdu_WhatsAppSettings");

            migrationBuilder.RenameTable(
                name: "WhatsAppLogs",
                newName: "easyEdu_WhatsAppLogs");

            migrationBuilder.RenameTable(
                name: "WhatsAppAgents",
                newName: "easyEdu_WhatsAppAgents");

            migrationBuilder.RenameTable(
                name: "WalletTransactions",
                newName: "easyEdu_WalletTransactions");

            migrationBuilder.RenameTable(
                name: "Vouchers",
                newName: "easyEdu_Vouchers");

            migrationBuilder.RenameTable(
                name: "VoucherDetails",
                newName: "easyEdu_VoucherDetails");

            migrationBuilder.RenameTable(
                name: "VisitorBooks",
                newName: "easyEdu_VisitorBooks");

            migrationBuilder.RenameTable(
                name: "Vehicles",
                newName: "easyEdu_Vehicles");

            migrationBuilder.RenameTable(
                name: "VehicleMaintenances",
                newName: "easyEdu_VehicleMaintenances");

            migrationBuilder.RenameTable(
                name: "UserAuditLogs",
                newName: "easyEdu_UserAuditLogs");

            migrationBuilder.RenameTable(
                name: "Trainings",
                newName: "easyEdu_Trainings");

            migrationBuilder.RenameTable(
                name: "TrainingAttendances",
                newName: "easyEdu_TrainingAttendances");

            migrationBuilder.RenameTable(
                name: "Topics",
                newName: "easyEdu_Topics");

            migrationBuilder.RenameTable(
                name: "TodoTasks",
                newName: "easyEdu_TodoTasks");

            migrationBuilder.RenameTable(
                name: "ToDos",
                newName: "easyEdu_ToDos");

            migrationBuilder.RenameTable(
                name: "TimeTables",
                newName: "easyEdu_TimeTables");

            migrationBuilder.RenameTable(
                name: "ThemeSettings",
                newName: "easyEdu_ThemeSettings");

            migrationBuilder.RenameTable(
                name: "Testimonials",
                newName: "easyEdu_Testimonials");

            migrationBuilder.RenameTable(
                name: "Teachers",
                newName: "easyEdu_Teachers");

            migrationBuilder.RenameTable(
                name: "TeacherEvaluations",
                newName: "easyEdu_TeacherEvaluations");

            migrationBuilder.RenameTable(
                name: "TeacherAttendances",
                newName: "easyEdu_TeacherAttendances");

            migrationBuilder.RenameTable(
                name: "SystemSettings",
                newName: "easyEdu_SystemSettings");

            migrationBuilder.RenameTable(
                name: "SystemModules",
                newName: "easyEdu_SystemModules");

            migrationBuilder.RenameTable(
                name: "Suppliers",
                newName: "easyEdu_Suppliers");

            migrationBuilder.RenameTable(
                name: "SubjectWiseAttendances",
                newName: "easyEdu_SubjectWiseAttendances");

            migrationBuilder.RenameTable(
                name: "Subjects",
                newName: "easyEdu_Subjects");

            migrationBuilder.RenameTable(
                name: "StudyMaterials",
                newName: "easyEdu_StudyMaterials");

            migrationBuilder.RenameTable(
                name: "StudentSettings",
                newName: "easyEdu_StudentSettings");

            migrationBuilder.RenameTable(
                name: "Students",
                newName: "easyEdu_Students");

            migrationBuilder.RenameTable(
                name: "StudentPromotions",
                newName: "easyEdu_StudentPromotions");

            migrationBuilder.RenameTable(
                name: "StudentOptionalSubjects",
                newName: "easyEdu_StudentOptionalSubjects");

            migrationBuilder.RenameTable(
                name: "StudentIncidents",
                newName: "easyEdu_StudentIncidents");

            migrationBuilder.RenameTable(
                name: "StudentGroups",
                newName: "easyEdu_StudentGroups");

            migrationBuilder.RenameTable(
                name: "StudentDocuments",
                newName: "easyEdu_StudentDocuments");

            migrationBuilder.RenameTable(
                name: "StudentCategories",
                newName: "easyEdu_StudentCategories");

            migrationBuilder.RenameTable(
                name: "StaffSettings",
                newName: "easyEdu_StaffSettings");

            migrationBuilder.RenameTable(
                name: "SocialMedias",
                newName: "easyEdu_SocialMedias");

            migrationBuilder.RenameTable(
                name: "Sections",
                newName: "easyEdu_Sections");

            migrationBuilder.RenameTable(
                name: "SeatPlanSettings",
                newName: "easyEdu_SeatPlanSettings");

            migrationBuilder.RenameTable(
                name: "Routes",
                newName: "easyEdu_Routes");

            migrationBuilder.RenameTable(
                name: "RegistrationSubmissions",
                newName: "easyEdu_RegistrationSubmissions");

            migrationBuilder.RenameTable(
                name: "QuestionGroups",
                newName: "easyEdu_QuestionGroups");

            migrationBuilder.RenameTable(
                name: "QuestionBanks",
                newName: "easyEdu_QuestionBanks");

            migrationBuilder.RenameTable(
                name: "QrAttendanceSettings",
                newName: "easyEdu_QrAttendanceSettings");

            migrationBuilder.RenameTable(
                name: "PostalLogs",
                newName: "easyEdu_PostalLogs");

            migrationBuilder.RenameTable(
                name: "PhoneCallLogs",
                newName: "easyEdu_PhoneCallLogs");

            migrationBuilder.RenameTable(
                name: "Payrolls",
                newName: "easyEdu_Payrolls");

            migrationBuilder.RenameTable(
                name: "Parents",
                newName: "easyEdu_Parents");

            migrationBuilder.RenameTable(
                name: "OnlineRegistrationSettings",
                newName: "easyEdu_OnlineRegistrationSettings");

            migrationBuilder.RenameTable(
                name: "OnlineExamSettings",
                newName: "easyEdu_OnlineExamSettings");

            migrationBuilder.RenameTable(
                name: "OnlineExams",
                newName: "easyEdu_OnlineExams");

            migrationBuilder.RenameTable(
                name: "Notifications",
                newName: "easyEdu_Notifications");

            migrationBuilder.RenameTable(
                name: "Notices",
                newName: "easyEdu_Notices");

            migrationBuilder.RenameTable(
                name: "NewsPosts",
                newName: "easyEdu_NewsPosts");

            migrationBuilder.RenameTable(
                name: "NewsComments",
                newName: "easyEdu_NewsComments");

            migrationBuilder.RenameTable(
                name: "NewsCategories",
                newName: "easyEdu_NewsCategories");

            migrationBuilder.RenameTable(
                name: "MessageTemplates",
                newName: "easyEdu_MessageTemplates");

            migrationBuilder.RenameTable(
                name: "MessageLogs",
                newName: "easyEdu_MessageLogs");

            migrationBuilder.RenameTable(
                name: "MenuItems",
                newName: "easyEdu_MenuItems");

            migrationBuilder.RenameTable(
                name: "Marks",
                newName: "easyEdu_Marks");

            migrationBuilder.RenameTable(
                name: "MarkGrades",
                newName: "easyEdu_MarkGrades");

            migrationBuilder.RenameTable(
                name: "LmsSettings",
                newName: "easyEdu_LmsSettings");

            migrationBuilder.RenameTable(
                name: "LmsPurchaseLogs",
                newName: "easyEdu_LmsPurchaseLogs");

            migrationBuilder.RenameTable(
                name: "LmsFeesInvoices",
                newName: "easyEdu_LmsFeesInvoices");

            migrationBuilder.RenameTable(
                name: "LmsEnrollments",
                newName: "easyEdu_LmsEnrollments");

            migrationBuilder.RenameTable(
                name: "LmsCourses",
                newName: "easyEdu_LmsCourses");

            migrationBuilder.RenameTable(
                name: "LmsCourseLevels",
                newName: "easyEdu_LmsCourseLevels");

            migrationBuilder.RenameTable(
                name: "LmsCategories",
                newName: "easyEdu_LmsCategories");

            migrationBuilder.RenameTable(
                name: "LibraryMembers",
                newName: "easyEdu_LibraryMembers");

            migrationBuilder.RenameTable(
                name: "Lessons",
                newName: "easyEdu_Lessons");

            migrationBuilder.RenameTable(
                name: "LessonPlanSettings",
                newName: "easyEdu_LessonPlanSettings");

            migrationBuilder.RenameTable(
                name: "LessonPlans",
                newName: "easyEdu_LessonPlans");

            migrationBuilder.RenameTable(
                name: "Ledgers",
                newName: "easyEdu_Ledgers");

            migrationBuilder.RenameTable(
                name: "LeaveTypes",
                newName: "easyEdu_LeaveTypes");

            migrationBuilder.RenameTable(
                name: "LeaveRequests",
                newName: "easyEdu_LeaveRequests");

            migrationBuilder.RenameTable(
                name: "LeaveDefines",
                newName: "easyEdu_LeaveDefines");

            migrationBuilder.RenameTable(
                name: "JitsiVirtualMeetings",
                newName: "easyEdu_JitsiVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "JitsiVirtualClasses",
                newName: "easyEdu_JitsiVirtualClasses");

            migrationBuilder.RenameTable(
                name: "JitsiSettings",
                newName: "easyEdu_JitsiSettings");

            migrationBuilder.RenameTable(
                name: "ItemStores",
                newName: "easyEdu_ItemStores");

            migrationBuilder.RenameTable(
                name: "ItemReceives",
                newName: "easyEdu_ItemReceives");

            migrationBuilder.RenameTable(
                name: "ItemCategories",
                newName: "easyEdu_ItemCategories");

            migrationBuilder.RenameTable(
                name: "InventoryTransactions",
                newName: "easyEdu_InventoryTransactions");

            migrationBuilder.RenameTable(
                name: "Inventories",
                newName: "easyEdu_Inventories");

            migrationBuilder.RenameTable(
                name: "Incomes",
                newName: "easyEdu_Incomes");

            migrationBuilder.RenameTable(
                name: "Incidents",
                newName: "easyEdu_Incidents");

            migrationBuilder.RenameTable(
                name: "HomeworkSubmissions",
                newName: "easyEdu_HomeworkSubmissions");

            migrationBuilder.RenameTable(
                name: "Homeworks",
                newName: "easyEdu_Homeworks");

            migrationBuilder.RenameTable(
                name: "HomeSliders",
                newName: "easyEdu_HomeSliders");

            migrationBuilder.RenameTable(
                name: "GmeetVirtualMeetings",
                newName: "easyEdu_GmeetVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "GmeetVirtualClasses",
                newName: "easyEdu_GmeetVirtualClasses");

            migrationBuilder.RenameTable(
                name: "GmeetSettings",
                newName: "easyEdu_GmeetSettings");

            migrationBuilder.RenameTable(
                name: "GalleryItems",
                newName: "easyEdu_GalleryItems");

            migrationBuilder.RenameTable(
                name: "FundTransfers",
                newName: "easyEdu_FundTransfers");

            migrationBuilder.RenameTable(
                name: "FrontSettings",
                newName: "easyEdu_FrontSettings");

            migrationBuilder.RenameTable(
                name: "FrontCourses",
                newName: "easyEdu_FrontCourses");

            migrationBuilder.RenameTable(
                name: "FormDownloads",
                newName: "easyEdu_FormDownloads");

            migrationBuilder.RenameTable(
                name: "FeesTypes",
                newName: "easyEdu_FeesTypes");

            migrationBuilder.RenameTable(
                name: "FeeStructures",
                newName: "easyEdu_FeeStructures");

            migrationBuilder.RenameTable(
                name: "FeesInvoices",
                newName: "easyEdu_FeesInvoices");

            migrationBuilder.RenameTable(
                name: "FeesInvoiceDetails",
                newName: "easyEdu_FeesInvoiceDetails");

            migrationBuilder.RenameTable(
                name: "FeesGroups",
                newName: "easyEdu_FeesGroups");

            migrationBuilder.RenameTable(
                name: "FeesCarryForwards",
                newName: "easyEdu_FeesCarryForwards");

            migrationBuilder.RenameTable(
                name: "FeeCollections",
                newName: "easyEdu_FeeCollections");

            migrationBuilder.RenameTable(
                name: "ExpertTeachers",
                newName: "easyEdu_ExpertTeachers");

            migrationBuilder.RenameTable(
                name: "Expenses",
                newName: "easyEdu_Expenses");

            migrationBuilder.RenameTable(
                name: "ExamTypes",
                newName: "easyEdu_ExamTypes");

            migrationBuilder.RenameTable(
                name: "ExamSignatureSettings",
                newName: "easyEdu_ExamSignatureSettings");

            migrationBuilder.RenameTable(
                name: "ExamSettings",
                newName: "easyEdu_ExamSettings");

            migrationBuilder.RenameTable(
                name: "ExamSchedules",
                newName: "easyEdu_ExamSchedules");

            migrationBuilder.RenameTable(
                name: "ExamRules",
                newName: "easyEdu_ExamRules");

            migrationBuilder.RenameTable(
                name: "ExamPositions",
                newName: "easyEdu_ExamPositions");

            migrationBuilder.RenameTable(
                name: "Examinations",
                newName: "easyEdu_Examinations");

            migrationBuilder.RenameTable(
                name: "ExamFormatSettings",
                newName: "easyEdu_ExamFormatSettings");

            migrationBuilder.RenameTable(
                name: "EvaluationResponses",
                newName: "easyEdu_EvaluationResponses");

            migrationBuilder.RenameTable(
                name: "EvaluationCriteria",
                newName: "easyEdu_EvaluationCriteria");

            migrationBuilder.RenameTable(
                name: "Drivers",
                newName: "easyEdu_Drivers");

            migrationBuilder.RenameTable(
                name: "DormitoryRooms",
                newName: "easyEdu_DormitoryRooms");

            migrationBuilder.RenameTable(
                name: "Dormitories",
                newName: "easyEdu_Dormitories");

            migrationBuilder.RenameTable(
                name: "Designations",
                newName: "easyEdu_Designations");

            migrationBuilder.RenameTable(
                name: "Departments",
                newName: "easyEdu_Departments");

            migrationBuilder.RenameTable(
                name: "CustomPages",
                newName: "easyEdu_CustomPages");

            migrationBuilder.RenameTable(
                name: "CustomFieldValues",
                newName: "easyEdu_CustomFieldValues");

            migrationBuilder.RenameTable(
                name: "CustomFields",
                newName: "easyEdu_CustomFields");

            migrationBuilder.RenameTable(
                name: "CourseCategories",
                newName: "easyEdu_CourseCategories");

            migrationBuilder.RenameTable(
                name: "ContactMessages",
                newName: "easyEdu_ContactMessages");

            migrationBuilder.RenameTable(
                name: "Complaints",
                newName: "easyEdu_Complaints");

            migrationBuilder.RenameTable(
                name: "Companies",
                newName: "easyEdu_Companies");

            migrationBuilder.RenameTable(
                name: "ClassSections",
                newName: "easyEdu_ClassSections");

            migrationBuilder.RenameTable(
                name: "ClassRooms",
                newName: "easyEdu_ClassRooms");

            migrationBuilder.RenameTable(
                name: "Classes",
                newName: "easyEdu_Classes");

            migrationBuilder.RenameTable(
                name: "ChatUserSettings",
                newName: "easyEdu_ChatUserSettings");

            migrationBuilder.RenameTable(
                name: "ChatMessages",
                newName: "easyEdu_ChatMessages");

            migrationBuilder.RenameTable(
                name: "ChatInvitations",
                newName: "easyEdu_ChatInvitations");

            migrationBuilder.RenameTable(
                name: "ChatBlockedUsers",
                newName: "easyEdu_ChatBlockedUsers");

            migrationBuilder.RenameTable(
                name: "ChartOfAccounts",
                newName: "easyEdu_ChartOfAccounts");

            migrationBuilder.RenameTable(
                name: "Certificates",
                newName: "easyEdu_Certificates");

            migrationBuilder.RenameTable(
                name: "CbseTerms",
                newName: "easyEdu_CbseTerms");

            migrationBuilder.RenameTable(
                name: "CbseObservations",
                newName: "easyEdu_CbseObservations");

            migrationBuilder.RenameTable(
                name: "CbseObservationParameters",
                newName: "easyEdu_CbseObservationParameters");

            migrationBuilder.RenameTable(
                name: "CbseMarkSheetTemplates",
                newName: "easyEdu_CbseMarkSheetTemplates");

            migrationBuilder.RenameTable(
                name: "CbseGrades",
                newName: "easyEdu_CbseGrades");

            migrationBuilder.RenameTable(
                name: "CbseExamSchedules",
                newName: "easyEdu_CbseExamSchedules");

            migrationBuilder.RenameTable(
                name: "CbseExams",
                newName: "easyEdu_CbseExams");

            migrationBuilder.RenameTable(
                name: "CbseAssignObservations",
                newName: "easyEdu_CbseAssignObservations");

            migrationBuilder.RenameTable(
                name: "CbseAssessments",
                newName: "easyEdu_CbseAssessments");

            migrationBuilder.RenameTable(
                name: "CalendarEvents",
                newName: "easyEdu_CalendarEvents");

            migrationBuilder.RenameTable(
                name: "BulkInvoiceSettings",
                newName: "easyEdu_BulkInvoiceSettings");

            migrationBuilder.RenameTable(
                name: "Books",
                newName: "easyEdu_Books");

            migrationBuilder.RenameTable(
                name: "BookIssues",
                newName: "easyEdu_BookIssues");

            migrationBuilder.RenameTable(
                name: "BookCategories",
                newName: "easyEdu_BookCategories");

            migrationBuilder.RenameTable(
                name: "BiometricSettings",
                newName: "easyEdu_BiometricSettings");

            migrationBuilder.RenameTable(
                name: "BehaviourSettings",
                newName: "easyEdu_BehaviourSettings");

            migrationBuilder.RenameTable(
                name: "BBBVirtualMeetings",
                newName: "easyEdu_BBBVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "BBBVirtualClasses",
                newName: "easyEdu_BBBVirtualClasses");

            migrationBuilder.RenameTable(
                name: "BBBSettings",
                newName: "easyEdu_BBBSettings");

            migrationBuilder.RenameTable(
                name: "BBBRecordings",
                newName: "easyEdu_BBBRecordings");

            migrationBuilder.RenameTable(
                name: "BankPayments",
                newName: "easyEdu_BankPayments");

            migrationBuilder.RenameTable(
                name: "BankAccounts",
                newName: "easyEdu_BankAccounts");

            migrationBuilder.RenameTable(
                name: "Attendances",
                newName: "easyEdu_Attendances");

            migrationBuilder.RenameTable(
                name: "AssignSubjects",
                newName: "easyEdu_AssignSubjects");

            migrationBuilder.RenameTable(
                name: "AssignClassTeachers",
                newName: "easyEdu_AssignClassTeachers");

            migrationBuilder.RenameTable(
                name: "AspNetUserTokens",
                newName: "easyEdu_AspNetUserTokens");

            migrationBuilder.RenameTable(
                name: "AspNetUsers",
                newName: "easyEdu_AspNetUsers");

            migrationBuilder.RenameTable(
                name: "AspNetUserRoles",
                newName: "easyEdu_AspNetUserRoles");

            migrationBuilder.RenameTable(
                name: "AspNetUserLogins",
                newName: "easyEdu_AspNetUserLogins");

            migrationBuilder.RenameTable(
                name: "AspNetUserClaims",
                newName: "easyEdu_AspNetUserClaims");

            migrationBuilder.RenameTable(
                name: "AspNetRoles",
                newName: "easyEdu_AspNetRoles");

            migrationBuilder.RenameTable(
                name: "AspNetRoleClaims",
                newName: "easyEdu_AspNetRoleClaims");

            migrationBuilder.RenameTable(
                name: "AdmitCardSettings",
                newName: "easyEdu_AdmitCardSettings");

            migrationBuilder.RenameTable(
                name: "AdmissionQuerySettings",
                newName: "easyEdu_AdmissionQuerySettings");

            migrationBuilder.RenameTable(
                name: "AdmissionQueries",
                newName: "easyEdu_AdmissionQueries");

            migrationBuilder.RenameTable(
                name: "AdminSetupItems",
                newName: "easyEdu_AdminSetupItems");

            migrationBuilder.RenameTable(
                name: "AccountGroups",
                newName: "easyEdu_AccountGroups");

            migrationBuilder.RenameTable(
                name: "AcademicYears",
                newName: "easyEdu_AcademicYears");

            migrationBuilder.RenameTable(
                name: "AboutUsEntries",
                newName: "easyEdu_AboutUsEntries");

            migrationBuilder.RenameIndex(
                name: "IX_ZoomVirtualMeetings_CompanyId",
                table: "easyEdu_ZoomVirtualMeetings",
                newName: "IX_easyEdu_ZoomVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ZoomVirtualClasses_SubjectId",
                table: "easyEdu_ZoomVirtualClasses",
                newName: "IX_easyEdu_ZoomVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ZoomVirtualClasses_SectionId",
                table: "easyEdu_ZoomVirtualClasses",
                newName: "IX_easyEdu_ZoomVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_ZoomVirtualClasses_CompanyId",
                table: "easyEdu_ZoomVirtualClasses",
                newName: "IX_easyEdu_ZoomVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ZoomVirtualClasses_ClassId",
                table: "easyEdu_ZoomVirtualClasses",
                newName: "IX_easyEdu_ZoomVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_ZoomSettings_CompanyId",
                table: "easyEdu_ZoomSettings",
                newName: "IX_easyEdu_ZoomSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_WrittenExams_CompanyId",
                table: "easyEdu_WrittenExams",
                newName: "IX_easyEdu_WrittenExams_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_WhatsAppSettings_CompanyId",
                table: "easyEdu_WhatsAppSettings",
                newName: "IX_easyEdu_WhatsAppSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_WhatsAppLogs_CompanyId",
                table: "easyEdu_WhatsAppLogs",
                newName: "IX_easyEdu_WhatsAppLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_WhatsAppAgents_CompanyId",
                table: "easyEdu_WhatsAppAgents",
                newName: "IX_easyEdu_WhatsAppAgents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_WalletTransactions_StudentId1",
                table: "easyEdu_WalletTransactions",
                newName: "IX_easyEdu_WalletTransactions_StudentId1");

            migrationBuilder.RenameIndex(
                name: "IX_WalletTransactions_StudentId",
                table: "easyEdu_WalletTransactions",
                newName: "IX_easyEdu_WalletTransactions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_VoucherDetails_VoucherId",
                table: "easyEdu_VoucherDetails",
                newName: "IX_easyEdu_VoucherDetails_VoucherId");

            migrationBuilder.RenameIndex(
                name: "IX_VoucherDetails_LedgerId",
                table: "easyEdu_VoucherDetails",
                newName: "IX_easyEdu_VoucherDetails_LedgerId");

            migrationBuilder.RenameIndex(
                name: "IX_VoucherDetails_InventoryId",
                table: "easyEdu_VoucherDetails",
                newName: "IX_easyEdu_VoucherDetails_InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_VisitorBooks_CompanyId",
                table: "easyEdu_VisitorBooks",
                newName: "IX_easyEdu_VisitorBooks_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_RouteId",
                table: "easyEdu_Vehicles",
                newName: "IX_easyEdu_Vehicles_RouteId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_DriverId",
                table: "easyEdu_Vehicles",
                newName: "IX_easyEdu_Vehicles_DriverId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_CompanyId",
                table: "easyEdu_Vehicles",
                newName: "IX_easyEdu_Vehicles_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleMaintenances_VehicleId",
                table: "easyEdu_VehicleMaintenances",
                newName: "IX_easyEdu_VehicleMaintenances_VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_UserAuditLogs_UserId",
                table: "easyEdu_UserAuditLogs",
                newName: "IX_easyEdu_UserAuditLogs_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserAuditLogs_CompanyId",
                table: "easyEdu_UserAuditLogs",
                newName: "IX_easyEdu_UserAuditLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Trainings_CompanyId",
                table: "easyEdu_Trainings",
                newName: "IX_easyEdu_Trainings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingAttendances_TrainingId",
                table: "easyEdu_TrainingAttendances",
                newName: "IX_easyEdu_TrainingAttendances_TrainingId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingAttendances_TeacherId",
                table: "easyEdu_TrainingAttendances",
                newName: "IX_easyEdu_TrainingAttendances_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Topics_LessonId",
                table: "easyEdu_Topics",
                newName: "IX_easyEdu_Topics_LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_TodoTasks_UserId",
                table: "easyEdu_TodoTasks",
                newName: "IX_easyEdu_TodoTasks_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TodoTasks_CompanyId",
                table: "easyEdu_TodoTasks",
                newName: "IX_easyEdu_TodoTasks_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_TimeTables_TeacherId",
                table: "easyEdu_TimeTables",
                newName: "IX_easyEdu_TimeTables_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_TimeTables_SubjectId",
                table: "easyEdu_TimeTables",
                newName: "IX_easyEdu_TimeTables_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_TimeTables_SectionId",
                table: "easyEdu_TimeTables",
                newName: "IX_easyEdu_TimeTables_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_TimeTables_ClassRoomId",
                table: "easyEdu_TimeTables",
                newName: "IX_easyEdu_TimeTables_ClassRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_TimeTables_ClassId",
                table: "easyEdu_TimeTables",
                newName: "IX_easyEdu_TimeTables_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_ThemeSettings_CompanyId",
                table: "easyEdu_ThemeSettings",
                newName: "IX_easyEdu_ThemeSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Teachers_UserId",
                table: "easyEdu_Teachers",
                newName: "IX_easyEdu_Teachers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Teachers_EmployeeNumber",
                table: "easyEdu_Teachers",
                newName: "IX_easyEdu_Teachers_EmployeeNumber");

            migrationBuilder.RenameIndex(
                name: "IX_Teachers_DesignationId",
                table: "easyEdu_Teachers",
                newName: "IX_easyEdu_Teachers_DesignationId");

            migrationBuilder.RenameIndex(
                name: "IX_Teachers_DepartmentId",
                table: "easyEdu_Teachers",
                newName: "IX_easyEdu_Teachers_DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Teachers_CompanyId",
                table: "easyEdu_Teachers",
                newName: "IX_easyEdu_Teachers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherEvaluations_TeacherId",
                table: "easyEdu_TeacherEvaluations",
                newName: "IX_easyEdu_TeacherEvaluations_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherAttendances_TeacherId",
                table: "easyEdu_TeacherAttendances",
                newName: "IX_easyEdu_TeacherAttendances_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_SystemSettings_CompanyId",
                table: "easyEdu_SystemSettings",
                newName: "IX_easyEdu_SystemSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_SystemModules_CompanyId",
                table: "easyEdu_SystemModules",
                newName: "IX_easyEdu_SystemModules_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectWiseAttendances_SubjectId",
                table: "easyEdu_SubjectWiseAttendances",
                newName: "IX_easyEdu_SubjectWiseAttendances_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectWiseAttendances_StudentId",
                table: "easyEdu_SubjectWiseAttendances",
                newName: "IX_easyEdu_SubjectWiseAttendances_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Subjects_TeacherId",
                table: "easyEdu_Subjects",
                newName: "IX_easyEdu_Subjects_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Subjects_ClassId",
                table: "easyEdu_Subjects",
                newName: "IX_easyEdu_Subjects_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_StudyMaterials_SubjectId",
                table: "easyEdu_StudyMaterials",
                newName: "IX_easyEdu_StudyMaterials_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_StudyMaterials_ClassId",
                table: "easyEdu_StudyMaterials",
                newName: "IX_easyEdu_StudyMaterials_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentSettings_CompanyId",
                table: "easyEdu_StudentSettings",
                newName: "IX_easyEdu_StudentSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_UserId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_StudentCategoryId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_StudentCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_SectionId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_RouteId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_RouteId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_DormitoryRoomId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_DormitoryRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_DormitoryId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_DormitoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_CompanyId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_ClassId",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_AdmissionNumber",
                table: "easyEdu_Students",
                newName: "IX_easyEdu_Students_AdmissionNumber");

            migrationBuilder.RenameIndex(
                name: "IX_StudentPromotions_StudentId",
                table: "easyEdu_StudentPromotions",
                newName: "IX_easyEdu_StudentPromotions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentOptionalSubjects_SubjectId",
                table: "easyEdu_StudentOptionalSubjects",
                newName: "IX_easyEdu_StudentOptionalSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentOptionalSubjects_StudentId",
                table: "easyEdu_StudentOptionalSubjects",
                newName: "IX_easyEdu_StudentOptionalSubjects_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentOptionalSubjects_AcademicYearId",
                table: "easyEdu_StudentOptionalSubjects",
                newName: "IX_easyEdu_StudentOptionalSubjects_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentIncidents_StudentId",
                table: "easyEdu_StudentIncidents",
                newName: "IX_easyEdu_StudentIncidents_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentIncidents_IncidentId",
                table: "easyEdu_StudentIncidents",
                newName: "IX_easyEdu_StudentIncidents_IncidentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentGroups_CompanyId",
                table: "easyEdu_StudentGroups",
                newName: "IX_easyEdu_StudentGroups_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentDocuments_StudentId",
                table: "easyEdu_StudentDocuments",
                newName: "IX_easyEdu_StudentDocuments_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StaffSettings_CompanyId",
                table: "easyEdu_StaffSettings",
                newName: "IX_easyEdu_StaffSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Routes_CompanyId",
                table: "easyEdu_Routes",
                newName: "IX_easyEdu_Routes_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_RegistrationSubmissions_CompanyId",
                table: "easyEdu_RegistrationSubmissions",
                newName: "IX_easyEdu_RegistrationSubmissions_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_RegistrationSubmissions_ClassId",
                table: "easyEdu_RegistrationSubmissions",
                newName: "IX_easyEdu_RegistrationSubmissions_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_RegistrationSubmissions_AcademicYearId",
                table: "easyEdu_RegistrationSubmissions",
                newName: "IX_easyEdu_RegistrationSubmissions_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionBanks_QuestionGroupId",
                table: "easyEdu_QuestionBanks",
                newName: "IX_easyEdu_QuestionBanks_QuestionGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_QrAttendanceSettings_CompanyId",
                table: "easyEdu_QrAttendanceSettings",
                newName: "IX_easyEdu_QrAttendanceSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_PostalLogs_CompanyId",
                table: "easyEdu_PostalLogs",
                newName: "IX_easyEdu_PostalLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_PhoneCallLogs_CompanyId",
                table: "easyEdu_PhoneCallLogs",
                newName: "IX_easyEdu_PhoneCallLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Payrolls_TeacherId",
                table: "easyEdu_Payrolls",
                newName: "IX_easyEdu_Payrolls_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Parents_UserId",
                table: "easyEdu_Parents",
                newName: "IX_easyEdu_Parents_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Parents_StudentId",
                table: "easyEdu_Parents",
                newName: "IX_easyEdu_Parents_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_OnlineRegistrationSettings_CompanyId",
                table: "easyEdu_OnlineRegistrationSettings",
                newName: "IX_easyEdu_OnlineRegistrationSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_OnlineExamSettings_CompanyId",
                table: "easyEdu_OnlineExamSettings",
                newName: "IX_easyEdu_OnlineExamSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Notices_CompanyId",
                table: "easyEdu_Notices",
                newName: "IX_easyEdu_Notices_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_NewsPosts_CategoryId",
                table: "easyEdu_NewsPosts",
                newName: "IX_easyEdu_NewsPosts_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_NewsComments_NewsPostId",
                table: "easyEdu_NewsComments",
                newName: "IX_easyEdu_NewsComments_NewsPostId");

            migrationBuilder.RenameIndex(
                name: "IX_MessageTemplates_CompanyId",
                table: "easyEdu_MessageTemplates",
                newName: "IX_easyEdu_MessageTemplates_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_MessageLogs_CompanyId",
                table: "easyEdu_MessageLogs",
                newName: "IX_easyEdu_MessageLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_MenuItems_ParentId",
                table: "easyEdu_MenuItems",
                newName: "IX_easyEdu_MenuItems_ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Marks_SubjectId",
                table: "easyEdu_Marks",
                newName: "IX_easyEdu_Marks_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Marks_StudentId",
                table: "easyEdu_Marks",
                newName: "IX_easyEdu_Marks_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Marks_ExaminationId",
                table: "easyEdu_Marks",
                newName: "IX_easyEdu_Marks_ExaminationId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsSettings_CompanyId",
                table: "easyEdu_LmsSettings",
                newName: "IX_easyEdu_LmsSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsPurchaseLogs_StudentId",
                table: "easyEdu_LmsPurchaseLogs",
                newName: "IX_easyEdu_LmsPurchaseLogs_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsPurchaseLogs_CourseId",
                table: "easyEdu_LmsPurchaseLogs",
                newName: "IX_easyEdu_LmsPurchaseLogs_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsPurchaseLogs_CompanyId",
                table: "easyEdu_LmsPurchaseLogs",
                newName: "IX_easyEdu_LmsPurchaseLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsFeesInvoices_StudentId",
                table: "easyEdu_LmsFeesInvoices",
                newName: "IX_easyEdu_LmsFeesInvoices_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsFeesInvoices_CompanyId",
                table: "easyEdu_LmsFeesInvoices",
                newName: "IX_easyEdu_LmsFeesInvoices_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsEnrollments_StudentId",
                table: "easyEdu_LmsEnrollments",
                newName: "IX_easyEdu_LmsEnrollments_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsEnrollments_CourseId",
                table: "easyEdu_LmsEnrollments",
                newName: "IX_easyEdu_LmsEnrollments_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsCourses_LevelId",
                table: "easyEdu_LmsCourses",
                newName: "IX_easyEdu_LmsCourses_LevelId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsCourses_CompanyId",
                table: "easyEdu_LmsCourses",
                newName: "IX_easyEdu_LmsCourses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsCourses_CategoryId",
                table: "easyEdu_LmsCourses",
                newName: "IX_easyEdu_LmsCourses_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsCourseLevels_CompanyId",
                table: "easyEdu_LmsCourseLevels",
                newName: "IX_easyEdu_LmsCourseLevels_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LmsCategories_CompanyId",
                table: "easyEdu_LmsCategories",
                newName: "IX_easyEdu_LmsCategories_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LibraryMembers_StudentId",
                table: "easyEdu_LibraryMembers",
                newName: "IX_easyEdu_LibraryMembers_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_LibraryMembers_StaffId",
                table: "easyEdu_LibraryMembers",
                newName: "IX_easyEdu_LibraryMembers_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_SubjectId",
                table: "easyEdu_Lessons",
                newName: "IX_easyEdu_Lessons_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_ClassId",
                table: "easyEdu_Lessons",
                newName: "IX_easyEdu_Lessons_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonPlanSettings_CompanyId",
                table: "easyEdu_LessonPlanSettings",
                newName: "IX_easyEdu_LessonPlanSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonPlans_TopicId",
                table: "easyEdu_LessonPlans",
                newName: "IX_easyEdu_LessonPlans_TopicId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonPlans_TeacherId",
                table: "easyEdu_LessonPlans",
                newName: "IX_easyEdu_LessonPlans_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonPlans_LessonId",
                table: "easyEdu_LessonPlans",
                newName: "IX_easyEdu_LessonPlans_LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_Ledgers_AccountGroupId",
                table: "easyEdu_Ledgers",
                newName: "IX_easyEdu_Ledgers_AccountGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveTypes_CompanyId",
                table: "easyEdu_LeaveTypes",
                newName: "IX_easyEdu_LeaveTypes_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveRequests_UserId",
                table: "easyEdu_LeaveRequests",
                newName: "IX_easyEdu_LeaveRequests_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveRequests_LeaveTypeId",
                table: "easyEdu_LeaveRequests",
                newName: "IX_easyEdu_LeaveRequests_LeaveTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveDefines_LeaveTypeId",
                table: "easyEdu_LeaveDefines",
                newName: "IX_easyEdu_LeaveDefines_LeaveTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_JitsiVirtualMeetings_CompanyId",
                table: "easyEdu_JitsiVirtualMeetings",
                newName: "IX_easyEdu_JitsiVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_JitsiVirtualClasses_SubjectId",
                table: "easyEdu_JitsiVirtualClasses",
                newName: "IX_easyEdu_JitsiVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_JitsiVirtualClasses_SectionId",
                table: "easyEdu_JitsiVirtualClasses",
                newName: "IX_easyEdu_JitsiVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_JitsiVirtualClasses_CompanyId",
                table: "easyEdu_JitsiVirtualClasses",
                newName: "IX_easyEdu_JitsiVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_JitsiVirtualClasses_ClassId",
                table: "easyEdu_JitsiVirtualClasses",
                newName: "IX_easyEdu_JitsiVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_JitsiSettings_CompanyId",
                table: "easyEdu_JitsiSettings",
                newName: "IX_easyEdu_JitsiSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemReceives_SupplierId",
                table: "easyEdu_ItemReceives",
                newName: "IX_easyEdu_ItemReceives_SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemReceives_InventoryId",
                table: "easyEdu_ItemReceives",
                newName: "IX_easyEdu_ItemReceives_InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_InventoryTransactions_StudentId",
                table: "easyEdu_InventoryTransactions",
                newName: "IX_easyEdu_InventoryTransactions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_InventoryTransactions_InventoryId",
                table: "easyEdu_InventoryTransactions",
                newName: "IX_easyEdu_InventoryTransactions_InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Inventories_CompanyId",
                table: "easyEdu_Inventories",
                newName: "IX_easyEdu_Inventories_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Inventories_CategoryId",
                table: "easyEdu_Inventories",
                newName: "IX_easyEdu_Inventories_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Incidents_CompanyId",
                table: "easyEdu_Incidents",
                newName: "IX_easyEdu_Incidents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_HomeworkSubmissions_StudentId",
                table: "easyEdu_HomeworkSubmissions",
                newName: "IX_easyEdu_HomeworkSubmissions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_HomeworkSubmissions_HomeworkId",
                table: "easyEdu_HomeworkSubmissions",
                newName: "IX_easyEdu_HomeworkSubmissions_HomeworkId");

            migrationBuilder.RenameIndex(
                name: "IX_Homeworks_SubjectId",
                table: "easyEdu_Homeworks",
                newName: "IX_easyEdu_Homeworks_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Homeworks_ClassId",
                table: "easyEdu_Homeworks",
                newName: "IX_easyEdu_Homeworks_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_GmeetVirtualMeetings_CompanyId",
                table: "easyEdu_GmeetVirtualMeetings",
                newName: "IX_easyEdu_GmeetVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_GmeetVirtualClasses_SubjectId",
                table: "easyEdu_GmeetVirtualClasses",
                newName: "IX_easyEdu_GmeetVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_GmeetVirtualClasses_SectionId",
                table: "easyEdu_GmeetVirtualClasses",
                newName: "IX_easyEdu_GmeetVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_GmeetVirtualClasses_CompanyId",
                table: "easyEdu_GmeetVirtualClasses",
                newName: "IX_easyEdu_GmeetVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_GmeetVirtualClasses_ClassId",
                table: "easyEdu_GmeetVirtualClasses",
                newName: "IX_easyEdu_GmeetVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_GmeetSettings_CompanyId",
                table: "easyEdu_GmeetSettings",
                newName: "IX_easyEdu_GmeetSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_FrontCourses_CategoryId",
                table: "easyEdu_FrontCourses",
                newName: "IX_easyEdu_FrontCourses_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesTypes_FeesGroupId",
                table: "easyEdu_FeesTypes",
                newName: "IX_easyEdu_FeesTypes_FeesGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_FeeStructures_ClassId",
                table: "easyEdu_FeeStructures",
                newName: "IX_easyEdu_FeeStructures_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesInvoices_StudentId1",
                table: "easyEdu_FeesInvoices",
                newName: "IX_easyEdu_FeesInvoices_StudentId1");

            migrationBuilder.RenameIndex(
                name: "IX_FeesInvoices_StudentId",
                table: "easyEdu_FeesInvoices",
                newName: "IX_easyEdu_FeesInvoices_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesInvoices_AcademicYearId",
                table: "easyEdu_FeesInvoices",
                newName: "IX_easyEdu_FeesInvoices_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesInvoiceDetails_FeesTypeId",
                table: "easyEdu_FeesInvoiceDetails",
                newName: "IX_easyEdu_FeesInvoiceDetails_FeesTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesInvoiceDetails_FeesInvoiceId",
                table: "easyEdu_FeesInvoiceDetails",
                newName: "IX_easyEdu_FeesInvoiceDetails_FeesInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesGroups_CompanyId",
                table: "easyEdu_FeesGroups",
                newName: "IX_easyEdu_FeesGroups_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_FeesCarryForwards_StudentId",
                table: "easyEdu_FeesCarryForwards",
                newName: "IX_easyEdu_FeesCarryForwards_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_FeeCollections_StudentId",
                table: "easyEdu_FeeCollections",
                newName: "IX_easyEdu_FeeCollections_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_FeeCollections_FeeStructureId",
                table: "easyEdu_FeeCollections",
                newName: "IX_easyEdu_FeeCollections_FeeStructureId");

            migrationBuilder.RenameIndex(
                name: "IX_FeeCollections_FeesInvoiceId",
                table: "easyEdu_FeeCollections",
                newName: "IX_easyEdu_FeeCollections_FeesInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_ExpertTeachers_TeacherId",
                table: "easyEdu_ExpertTeachers",
                newName: "IX_easyEdu_ExpertTeachers_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_CompanyId",
                table: "easyEdu_Expenses",
                newName: "IX_easyEdu_Expenses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamSettings_CompanyId",
                table: "easyEdu_ExamSettings",
                newName: "IX_easyEdu_ExamSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamSchedules_SubjectId",
                table: "easyEdu_ExamSchedules",
                newName: "IX_easyEdu_ExamSchedules_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamSchedules_SectionId",
                table: "easyEdu_ExamSchedules",
                newName: "IX_easyEdu_ExamSchedules_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamSchedules_ExaminationId",
                table: "easyEdu_ExamSchedules",
                newName: "IX_easyEdu_ExamSchedules_ExaminationId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamSchedules_ClassRoomId",
                table: "easyEdu_ExamSchedules",
                newName: "IX_easyEdu_ExamSchedules_ClassRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamSchedules_ClassId",
                table: "easyEdu_ExamSchedules",
                newName: "IX_easyEdu_ExamSchedules_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamPositions_StudentId",
                table: "easyEdu_ExamPositions",
                newName: "IX_easyEdu_ExamPositions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamPositions_ExaminationId",
                table: "easyEdu_ExamPositions",
                newName: "IX_easyEdu_ExamPositions_ExaminationId");

            migrationBuilder.RenameIndex(
                name: "IX_Examinations_AcademicYearId",
                table: "easyEdu_Examinations",
                newName: "IX_easyEdu_Examinations_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_EvaluationResponses_TeacherEvaluationId",
                table: "easyEdu_EvaluationResponses",
                newName: "IX_easyEdu_EvaluationResponses_TeacherEvaluationId");

            migrationBuilder.RenameIndex(
                name: "IX_EvaluationResponses_EvaluationCriterionId",
                table: "easyEdu_EvaluationResponses",
                newName: "IX_easyEdu_EvaluationResponses_EvaluationCriterionId");

            migrationBuilder.RenameIndex(
                name: "IX_Drivers_CompanyId",
                table: "easyEdu_Drivers",
                newName: "IX_easyEdu_Drivers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_DormitoryRooms_DormitoryId",
                table: "easyEdu_DormitoryRooms",
                newName: "IX_easyEdu_DormitoryRooms_DormitoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Designations_CompanyId",
                table: "easyEdu_Designations",
                newName: "IX_easyEdu_Designations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_CompanyId",
                table: "easyEdu_Departments",
                newName: "IX_easyEdu_Departments_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomFieldValues_CustomFieldId",
                table: "easyEdu_CustomFieldValues",
                newName: "IX_easyEdu_CustomFieldValues_CustomFieldId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomFields_CompanyId",
                table: "easyEdu_CustomFields",
                newName: "IX_easyEdu_CustomFields_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Complaints_CompanyId",
                table: "easyEdu_Complaints",
                newName: "IX_easyEdu_Complaints_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ClassSections_SectionId",
                table: "easyEdu_ClassSections",
                newName: "IX_easyEdu_ClassSections_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_ClassSections_ClassId",
                table: "easyEdu_ClassSections",
                newName: "IX_easyEdu_ClassSections_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_Classes_CompanyId",
                table: "easyEdu_Classes",
                newName: "IX_easyEdu_Classes_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Classes_AcademicYearId",
                table: "easyEdu_Classes",
                newName: "IX_easyEdu_Classes_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatUserSettings_UserId",
                table: "easyEdu_ChatUserSettings",
                newName: "IX_easyEdu_ChatUserSettings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatUserSettings_CompanyId",
                table: "easyEdu_ChatUserSettings",
                newName: "IX_easyEdu_ChatUserSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_SenderId",
                table: "easyEdu_ChatMessages",
                newName: "IX_easyEdu_ChatMessages_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_ReceiverId",
                table: "easyEdu_ChatMessages",
                newName: "IX_easyEdu_ChatMessages_ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_CompanyId",
                table: "easyEdu_ChatMessages",
                newName: "IX_easyEdu_ChatMessages_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatInvitations_SenderId",
                table: "easyEdu_ChatInvitations",
                newName: "IX_easyEdu_ChatInvitations_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatInvitations_ReceiverId",
                table: "easyEdu_ChatInvitations",
                newName: "IX_easyEdu_ChatInvitations_ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatInvitations_CompanyId",
                table: "easyEdu_ChatInvitations",
                newName: "IX_easyEdu_ChatInvitations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatBlockedUsers_CompanyId",
                table: "easyEdu_ChatBlockedUsers",
                newName: "IX_easyEdu_ChatBlockedUsers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatBlockedUsers_BlockerId",
                table: "easyEdu_ChatBlockedUsers",
                newName: "IX_easyEdu_ChatBlockedUsers_BlockerId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatBlockedUsers_BlockedId",
                table: "easyEdu_ChatBlockedUsers",
                newName: "IX_easyEdu_ChatBlockedUsers_BlockedId");

            migrationBuilder.RenameIndex(
                name: "IX_Certificates_StudentId",
                table: "easyEdu_Certificates",
                newName: "IX_easyEdu_Certificates_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Certificates_CertificateNumber",
                table: "easyEdu_Certificates",
                newName: "IX_easyEdu_Certificates_CertificateNumber");

            migrationBuilder.RenameIndex(
                name: "IX_CbseTerms_CompanyId",
                table: "easyEdu_CbseTerms",
                newName: "IX_easyEdu_CbseTerms_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseObservations_CompanyId",
                table: "easyEdu_CbseObservations",
                newName: "IX_easyEdu_CbseObservations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseObservationParameters_ObservationId",
                table: "easyEdu_CbseObservationParameters",
                newName: "IX_easyEdu_CbseObservationParameters_ObservationId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseMarkSheetTemplates_CompanyId",
                table: "easyEdu_CbseMarkSheetTemplates",
                newName: "IX_easyEdu_CbseMarkSheetTemplates_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseGrades_CompanyId",
                table: "easyEdu_CbseGrades",
                newName: "IX_easyEdu_CbseGrades_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseExamSchedules_SubjectId",
                table: "easyEdu_CbseExamSchedules",
                newName: "IX_easyEdu_CbseExamSchedules_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseExamSchedules_ClassId",
                table: "easyEdu_CbseExamSchedules",
                newName: "IX_easyEdu_CbseExamSchedules_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseExamSchedules_CbseExamId",
                table: "easyEdu_CbseExamSchedules",
                newName: "IX_easyEdu_CbseExamSchedules_CbseExamId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseExams_TermId",
                table: "easyEdu_CbseExams",
                newName: "IX_easyEdu_CbseExams_TermId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseExams_CompanyId",
                table: "easyEdu_CbseExams",
                newName: "IX_easyEdu_CbseExams_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseAssignObservations_StudentId",
                table: "easyEdu_CbseAssignObservations",
                newName: "IX_easyEdu_CbseAssignObservations_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseAssignObservations_ParameterId",
                table: "easyEdu_CbseAssignObservations",
                newName: "IX_easyEdu_CbseAssignObservations_ParameterId");

            migrationBuilder.RenameIndex(
                name: "IX_CbseAssessments_CompanyId",
                table: "easyEdu_CbseAssessments",
                newName: "IX_easyEdu_CbseAssessments_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CalendarEvents_CompanyId",
                table: "easyEdu_CalendarEvents",
                newName: "IX_easyEdu_CalendarEvents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Books_CompanyId",
                table: "easyEdu_Books",
                newName: "IX_easyEdu_Books_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Books_CategoryId",
                table: "easyEdu_Books",
                newName: "IX_easyEdu_Books_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_BookIssues_StudentId",
                table: "easyEdu_BookIssues",
                newName: "IX_easyEdu_BookIssues_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_BookIssues_BookId",
                table: "easyEdu_BookIssues",
                newName: "IX_easyEdu_BookIssues_BookId");

            migrationBuilder.RenameIndex(
                name: "IX_BiometricSettings_CompanyId",
                table: "easyEdu_BiometricSettings",
                newName: "IX_easyEdu_BiometricSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_BehaviourSettings_CompanyId",
                table: "easyEdu_BehaviourSettings",
                newName: "IX_easyEdu_BehaviourSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBVirtualMeetings_CompanyId",
                table: "easyEdu_BBBVirtualMeetings",
                newName: "IX_easyEdu_BBBVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBVirtualClasses_SubjectId",
                table: "easyEdu_BBBVirtualClasses",
                newName: "IX_easyEdu_BBBVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBVirtualClasses_SectionId",
                table: "easyEdu_BBBVirtualClasses",
                newName: "IX_easyEdu_BBBVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBVirtualClasses_CompanyId",
                table: "easyEdu_BBBVirtualClasses",
                newName: "IX_easyEdu_BBBVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBVirtualClasses_ClassId",
                table: "easyEdu_BBBVirtualClasses",
                newName: "IX_easyEdu_BBBVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBSettings_CompanyId",
                table: "easyEdu_BBBSettings",
                newName: "IX_easyEdu_BBBSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_BBBRecordings_CompanyId",
                table: "easyEdu_BBBRecordings",
                newName: "IX_easyEdu_BBBRecordings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_BankPayments_StudentId",
                table: "easyEdu_BankPayments",
                newName: "IX_easyEdu_BankPayments_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_BankPayments_FeesInvoiceId",
                table: "easyEdu_BankPayments",
                newName: "IX_easyEdu_BankPayments_FeesInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendances_StudentId",
                table: "easyEdu_Attendances",
                newName: "IX_easyEdu_Attendances_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignSubjects_TeacherId",
                table: "easyEdu_AssignSubjects",
                newName: "IX_easyEdu_AssignSubjects_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignSubjects_SubjectId",
                table: "easyEdu_AssignSubjects",
                newName: "IX_easyEdu_AssignSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignSubjects_SectionId",
                table: "easyEdu_AssignSubjects",
                newName: "IX_easyEdu_AssignSubjects_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignSubjects_ClassId",
                table: "easyEdu_AssignSubjects",
                newName: "IX_easyEdu_AssignSubjects_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignClassTeachers_TeacherId",
                table: "easyEdu_AssignClassTeachers",
                newName: "IX_easyEdu_AssignClassTeachers_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignClassTeachers_SectionId",
                table: "easyEdu_AssignClassTeachers",
                newName: "IX_easyEdu_AssignClassTeachers_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_AssignClassTeachers_ClassId",
                table: "easyEdu_AssignClassTeachers",
                newName: "IX_easyEdu_AssignClassTeachers_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_CompanyId",
                table: "easyEdu_AspNetUsers",
                newName: "IX_easyEdu_AspNetUsers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "easyEdu_AspNetUserRoles",
                newName: "IX_easyEdu_AspNetUserRoles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "easyEdu_AspNetUserLogins",
                newName: "IX_easyEdu_AspNetUserLogins_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "easyEdu_AspNetUserClaims",
                newName: "IX_easyEdu_AspNetUserClaims_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "easyEdu_AspNetRoleClaims",
                newName: "IX_easyEdu_AspNetRoleClaims_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_AdmissionQuerySettings_CompanyId",
                table: "easyEdu_AdmissionQuerySettings",
                newName: "IX_easyEdu_AdmissionQuerySettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AdmissionQueries_CompanyId",
                table: "easyEdu_AdmissionQueries",
                newName: "IX_easyEdu_AdmissionQueries_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AdmissionQueries_ClassId",
                table: "easyEdu_AdmissionQueries",
                newName: "IX_easyEdu_AdmissionQueries_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_AdminSetupItems_CompanyId",
                table: "easyEdu_AdminSetupItems",
                newName: "IX_easyEdu_AdminSetupItems_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AccountGroups_ParentGroupId",
                table: "easyEdu_AccountGroups",
                newName: "IX_easyEdu_AccountGroups_ParentGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_AcademicYears_CompanyId",
                table: "easyEdu_AcademicYears",
                newName: "IX_easyEdu_AcademicYears_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ZoomVirtualMeetings",
                table: "easyEdu_ZoomVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ZoomVirtualClasses",
                table: "easyEdu_ZoomVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ZoomSettings",
                table: "easyEdu_ZoomSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_WrittenExams",
                table: "easyEdu_WrittenExams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_WhatsAppSettings",
                table: "easyEdu_WhatsAppSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_WhatsAppLogs",
                table: "easyEdu_WhatsAppLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_WhatsAppAgents",
                table: "easyEdu_WhatsAppAgents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_WalletTransactions",
                table: "easyEdu_WalletTransactions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Vouchers",
                table: "easyEdu_Vouchers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_VoucherDetails",
                table: "easyEdu_VoucherDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_VisitorBooks",
                table: "easyEdu_VisitorBooks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Vehicles",
                table: "easyEdu_Vehicles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_VehicleMaintenances",
                table: "easyEdu_VehicleMaintenances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_UserAuditLogs",
                table: "easyEdu_UserAuditLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Trainings",
                table: "easyEdu_Trainings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_TrainingAttendances",
                table: "easyEdu_TrainingAttendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Topics",
                table: "easyEdu_Topics",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_TodoTasks",
                table: "easyEdu_TodoTasks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ToDos",
                table: "easyEdu_ToDos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_TimeTables",
                table: "easyEdu_TimeTables",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ThemeSettings",
                table: "easyEdu_ThemeSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Testimonials",
                table: "easyEdu_Testimonials",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Teachers",
                table: "easyEdu_Teachers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_TeacherEvaluations",
                table: "easyEdu_TeacherEvaluations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_TeacherAttendances",
                table: "easyEdu_TeacherAttendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_SystemSettings",
                table: "easyEdu_SystemSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_SystemModules",
                table: "easyEdu_SystemModules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Suppliers",
                table: "easyEdu_Suppliers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_SubjectWiseAttendances",
                table: "easyEdu_SubjectWiseAttendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Subjects",
                table: "easyEdu_Subjects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudyMaterials",
                table: "easyEdu_StudyMaterials",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentSettings",
                table: "easyEdu_StudentSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Students",
                table: "easyEdu_Students",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentPromotions",
                table: "easyEdu_StudentPromotions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentOptionalSubjects",
                table: "easyEdu_StudentOptionalSubjects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentIncidents",
                table: "easyEdu_StudentIncidents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentGroups",
                table: "easyEdu_StudentGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentDocuments",
                table: "easyEdu_StudentDocuments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StudentCategories",
                table: "easyEdu_StudentCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_StaffSettings",
                table: "easyEdu_StaffSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_SocialMedias",
                table: "easyEdu_SocialMedias",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Sections",
                table: "easyEdu_Sections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_SeatPlanSettings",
                table: "easyEdu_SeatPlanSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Routes",
                table: "easyEdu_Routes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_RegistrationSubmissions",
                table: "easyEdu_RegistrationSubmissions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_QuestionGroups",
                table: "easyEdu_QuestionGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_QuestionBanks",
                table: "easyEdu_QuestionBanks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_QrAttendanceSettings",
                table: "easyEdu_QrAttendanceSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_PostalLogs",
                table: "easyEdu_PostalLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_PhoneCallLogs",
                table: "easyEdu_PhoneCallLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Payrolls",
                table: "easyEdu_Payrolls",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Parents",
                table: "easyEdu_Parents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_OnlineRegistrationSettings",
                table: "easyEdu_OnlineRegistrationSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_OnlineExamSettings",
                table: "easyEdu_OnlineExamSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_OnlineExams",
                table: "easyEdu_OnlineExams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Notifications",
                table: "easyEdu_Notifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Notices",
                table: "easyEdu_Notices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_NewsPosts",
                table: "easyEdu_NewsPosts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_NewsComments",
                table: "easyEdu_NewsComments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_NewsCategories",
                table: "easyEdu_NewsCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_MessageTemplates",
                table: "easyEdu_MessageTemplates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_MessageLogs",
                table: "easyEdu_MessageLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_MenuItems",
                table: "easyEdu_MenuItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Marks",
                table: "easyEdu_Marks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_MarkGrades",
                table: "easyEdu_MarkGrades",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsSettings",
                table: "easyEdu_LmsSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsPurchaseLogs",
                table: "easyEdu_LmsPurchaseLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsFeesInvoices",
                table: "easyEdu_LmsFeesInvoices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsEnrollments",
                table: "easyEdu_LmsEnrollments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsCourses",
                table: "easyEdu_LmsCourses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsCourseLevels",
                table: "easyEdu_LmsCourseLevels",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LmsCategories",
                table: "easyEdu_LmsCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LibraryMembers",
                table: "easyEdu_LibraryMembers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Lessons",
                table: "easyEdu_Lessons",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LessonPlanSettings",
                table: "easyEdu_LessonPlanSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LessonPlans",
                table: "easyEdu_LessonPlans",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Ledgers",
                table: "easyEdu_Ledgers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LeaveTypes",
                table: "easyEdu_LeaveTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LeaveRequests",
                table: "easyEdu_LeaveRequests",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_LeaveDefines",
                table: "easyEdu_LeaveDefines",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_JitsiVirtualMeetings",
                table: "easyEdu_JitsiVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_JitsiVirtualClasses",
                table: "easyEdu_JitsiVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_JitsiSettings",
                table: "easyEdu_JitsiSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ItemStores",
                table: "easyEdu_ItemStores",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ItemReceives",
                table: "easyEdu_ItemReceives",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ItemCategories",
                table: "easyEdu_ItemCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_InventoryTransactions",
                table: "easyEdu_InventoryTransactions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Inventories",
                table: "easyEdu_Inventories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Incomes",
                table: "easyEdu_Incomes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Incidents",
                table: "easyEdu_Incidents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_HomeworkSubmissions",
                table: "easyEdu_HomeworkSubmissions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Homeworks",
                table: "easyEdu_Homeworks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_HomeSliders",
                table: "easyEdu_HomeSliders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_GmeetVirtualMeetings",
                table: "easyEdu_GmeetVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_GmeetVirtualClasses",
                table: "easyEdu_GmeetVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_GmeetSettings",
                table: "easyEdu_GmeetSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_GalleryItems",
                table: "easyEdu_GalleryItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FundTransfers",
                table: "easyEdu_FundTransfers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FrontSettings",
                table: "easyEdu_FrontSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FrontCourses",
                table: "easyEdu_FrontCourses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FormDownloads",
                table: "easyEdu_FormDownloads",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeesTypes",
                table: "easyEdu_FeesTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeeStructures",
                table: "easyEdu_FeeStructures",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeesInvoices",
                table: "easyEdu_FeesInvoices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeesInvoiceDetails",
                table: "easyEdu_FeesInvoiceDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeesGroups",
                table: "easyEdu_FeesGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeesCarryForwards",
                table: "easyEdu_FeesCarryForwards",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_FeeCollections",
                table: "easyEdu_FeeCollections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExpertTeachers",
                table: "easyEdu_ExpertTeachers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Expenses",
                table: "easyEdu_Expenses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamTypes",
                table: "easyEdu_ExamTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamSignatureSettings",
                table: "easyEdu_ExamSignatureSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamSettings",
                table: "easyEdu_ExamSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamSchedules",
                table: "easyEdu_ExamSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamRules",
                table: "easyEdu_ExamRules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamPositions",
                table: "easyEdu_ExamPositions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Examinations",
                table: "easyEdu_Examinations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ExamFormatSettings",
                table: "easyEdu_ExamFormatSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_EvaluationResponses",
                table: "easyEdu_EvaluationResponses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_EvaluationCriteria",
                table: "easyEdu_EvaluationCriteria",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Drivers",
                table: "easyEdu_Drivers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_DormitoryRooms",
                table: "easyEdu_DormitoryRooms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Dormitories",
                table: "easyEdu_Dormitories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Designations",
                table: "easyEdu_Designations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Departments",
                table: "easyEdu_Departments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CustomPages",
                table: "easyEdu_CustomPages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CustomFieldValues",
                table: "easyEdu_CustomFieldValues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CustomFields",
                table: "easyEdu_CustomFields",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CourseCategories",
                table: "easyEdu_CourseCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ContactMessages",
                table: "easyEdu_ContactMessages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Complaints",
                table: "easyEdu_Complaints",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Companies",
                table: "easyEdu_Companies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ClassSections",
                table: "easyEdu_ClassSections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ClassRooms",
                table: "easyEdu_ClassRooms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Classes",
                table: "easyEdu_Classes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ChatUserSettings",
                table: "easyEdu_ChatUserSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ChatMessages",
                table: "easyEdu_ChatMessages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ChatInvitations",
                table: "easyEdu_ChatInvitations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ChatBlockedUsers",
                table: "easyEdu_ChatBlockedUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_ChartOfAccounts",
                table: "easyEdu_ChartOfAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Certificates",
                table: "easyEdu_Certificates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseTerms",
                table: "easyEdu_CbseTerms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseObservations",
                table: "easyEdu_CbseObservations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseObservationParameters",
                table: "easyEdu_CbseObservationParameters",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseMarkSheetTemplates",
                table: "easyEdu_CbseMarkSheetTemplates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseGrades",
                table: "easyEdu_CbseGrades",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseExamSchedules",
                table: "easyEdu_CbseExamSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseExams",
                table: "easyEdu_CbseExams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseAssignObservations",
                table: "easyEdu_CbseAssignObservations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CbseAssessments",
                table: "easyEdu_CbseAssessments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_CalendarEvents",
                table: "easyEdu_CalendarEvents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BulkInvoiceSettings",
                table: "easyEdu_BulkInvoiceSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Books",
                table: "easyEdu_Books",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BookIssues",
                table: "easyEdu_BookIssues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BookCategories",
                table: "easyEdu_BookCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BiometricSettings",
                table: "easyEdu_BiometricSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BehaviourSettings",
                table: "easyEdu_BehaviourSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BBBVirtualMeetings",
                table: "easyEdu_BBBVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BBBVirtualClasses",
                table: "easyEdu_BBBVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BBBSettings",
                table: "easyEdu_BBBSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BBBRecordings",
                table: "easyEdu_BBBRecordings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BankPayments",
                table: "easyEdu_BankPayments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_BankAccounts",
                table: "easyEdu_BankAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_Attendances",
                table: "easyEdu_Attendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AssignSubjects",
                table: "easyEdu_AssignSubjects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AssignClassTeachers",
                table: "easyEdu_AssignClassTeachers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetUserTokens",
                table: "easyEdu_AspNetUserTokens",
                columns: new[] { "UserId", "LoginProvider", "Name" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetUsers",
                table: "easyEdu_AspNetUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetUserRoles",
                table: "easyEdu_AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetUserLogins",
                table: "easyEdu_AspNetUserLogins",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetUserClaims",
                table: "easyEdu_AspNetUserClaims",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetRoles",
                table: "easyEdu_AspNetRoles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AspNetRoleClaims",
                table: "easyEdu_AspNetRoleClaims",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AdmitCardSettings",
                table: "easyEdu_AdmitCardSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AdmissionQuerySettings",
                table: "easyEdu_AdmissionQuerySettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AdmissionQueries",
                table: "easyEdu_AdmissionQueries",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AdminSetupItems",
                table: "easyEdu_AdminSetupItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AccountGroups",
                table: "easyEdu_AccountGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AcademicYears",
                table: "easyEdu_AcademicYears",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_easyEdu_AboutUsEntries",
                table: "easyEdu_AboutUsEntries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AcademicYears_easyEdu_Companies_CompanyId",
                table: "easyEdu_AcademicYears",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AccountGroups_easyEdu_AccountGroups_ParentGroupId",
                table: "easyEdu_AccountGroups",
                column: "ParentGroupId",
                principalTable: "easyEdu_AccountGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AdminSetupItems_easyEdu_Companies_CompanyId",
                table: "easyEdu_AdminSetupItems",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AdmissionQueries_easyEdu_Classes_ClassId",
                table: "easyEdu_AdmissionQueries",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AdmissionQueries_easyEdu_Companies_CompanyId",
                table: "easyEdu_AdmissionQueries",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AdmissionQuerySettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_AdmissionQuerySettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetRoleClaims_easyEdu_AspNetRoles_RoleId",
                table: "easyEdu_AspNetRoleClaims",
                column: "RoleId",
                principalTable: "easyEdu_AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetUserClaims_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserClaims",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetUserLogins_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserLogins",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetUserRoles_easyEdu_AspNetRoles_RoleId",
                table: "easyEdu_AspNetUserRoles",
                column: "RoleId",
                principalTable: "easyEdu_AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetUserRoles_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserRoles",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetUsers_easyEdu_Companies_CompanyId",
                table: "easyEdu_AspNetUsers",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AspNetUserTokens_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserTokens",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignClassTeachers_easyEdu_Classes_ClassId",
                table: "easyEdu_AssignClassTeachers",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignClassTeachers_easyEdu_Sections_SectionId",
                table: "easyEdu_AssignClassTeachers",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignClassTeachers_easyEdu_Teachers_TeacherId",
                table: "easyEdu_AssignClassTeachers",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Classes_ClassId",
                table: "easyEdu_AssignSubjects",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Sections_SectionId",
                table: "easyEdu_AssignSubjects",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Subjects_SubjectId",
                table: "easyEdu_AssignSubjects",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Teachers_TeacherId",
                table: "easyEdu_AssignSubjects",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Attendances_easyEdu_Students_StudentId",
                table: "easyEdu_Attendances",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BankPayments_easyEdu_FeesInvoices_FeesInvoiceId",
                table: "easyEdu_BankPayments",
                column: "FeesInvoiceId",
                principalTable: "easyEdu_FeesInvoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BankPayments_easyEdu_Students_StudentId",
                table: "easyEdu_BankPayments",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBRecordings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBRecordings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_BBBVirtualClasses",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBVirtualClasses",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_BBBVirtualClasses",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_BBBVirtualClasses",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BBBVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBVirtualMeetings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BehaviourSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BehaviourSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BiometricSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BiometricSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BookIssues_easyEdu_Books_BookId",
                table: "easyEdu_BookIssues",
                column: "BookId",
                principalTable: "easyEdu_Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_BookIssues_easyEdu_Students_StudentId",
                table: "easyEdu_BookIssues",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Books_easyEdu_BookCategories_CategoryId",
                table: "easyEdu_Books",
                column: "CategoryId",
                principalTable: "easyEdu_BookCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Books_easyEdu_Companies_CompanyId",
                table: "easyEdu_Books",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CalendarEvents_easyEdu_Companies_CompanyId",
                table: "easyEdu_CalendarEvents",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseAssessments_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseAssessments",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseAssignObservations_easyEdu_CbseObservationParameters_ParameterId",
                table: "easyEdu_CbseAssignObservations",
                column: "ParameterId",
                principalTable: "easyEdu_CbseObservationParameters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseAssignObservations_easyEdu_Students_StudentId",
                table: "easyEdu_CbseAssignObservations",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseExams_easyEdu_CbseTerms_TermId",
                table: "easyEdu_CbseExams",
                column: "TermId",
                principalTable: "easyEdu_CbseTerms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseExams_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseExams",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseExamSchedules_easyEdu_CbseExams_CbseExamId",
                table: "easyEdu_CbseExamSchedules",
                column: "CbseExamId",
                principalTable: "easyEdu_CbseExams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseExamSchedules_easyEdu_Classes_ClassId",
                table: "easyEdu_CbseExamSchedules",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseExamSchedules_easyEdu_Subjects_SubjectId",
                table: "easyEdu_CbseExamSchedules",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseGrades_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseGrades",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseMarkSheetTemplates_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseMarkSheetTemplates",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseObservationParameters_easyEdu_CbseObservations_ObservationId",
                table: "easyEdu_CbseObservationParameters",
                column: "ObservationId",
                principalTable: "easyEdu_CbseObservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseObservations_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseObservations",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CbseTerms_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseTerms",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Certificates_easyEdu_Students_StudentId",
                table: "easyEdu_Certificates",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatBlockedUsers_easyEdu_AspNetUsers_BlockedId",
                table: "easyEdu_ChatBlockedUsers",
                column: "BlockedId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatBlockedUsers_easyEdu_AspNetUsers_BlockerId",
                table: "easyEdu_ChatBlockedUsers",
                column: "BlockerId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatBlockedUsers_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatBlockedUsers",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatInvitations_easyEdu_AspNetUsers_ReceiverId",
                table: "easyEdu_ChatInvitations",
                column: "ReceiverId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatInvitations_easyEdu_AspNetUsers_SenderId",
                table: "easyEdu_ChatInvitations",
                column: "SenderId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatInvitations_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatInvitations",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatMessages_easyEdu_AspNetUsers_ReceiverId",
                table: "easyEdu_ChatMessages",
                column: "ReceiverId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatMessages_easyEdu_AspNetUsers_SenderId",
                table: "easyEdu_ChatMessages",
                column: "SenderId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatMessages_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatMessages",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatUserSettings_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_ChatUserSettings",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ChatUserSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatUserSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Classes_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_Classes",
                column: "AcademicYearId",
                principalTable: "easyEdu_AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Classes_easyEdu_Companies_CompanyId",
                table: "easyEdu_Classes",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ClassSections_easyEdu_Classes_ClassId",
                table: "easyEdu_ClassSections",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ClassSections_easyEdu_Sections_SectionId",
                table: "easyEdu_ClassSections",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Complaints_easyEdu_Companies_CompanyId",
                table: "easyEdu_Complaints",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CustomFields_easyEdu_Companies_CompanyId",
                table: "easyEdu_CustomFields",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_CustomFieldValues_easyEdu_CustomFields_CustomFieldId",
                table: "easyEdu_CustomFieldValues",
                column: "CustomFieldId",
                principalTable: "easyEdu_CustomFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Departments_easyEdu_Companies_CompanyId",
                table: "easyEdu_Departments",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Designations_easyEdu_Companies_CompanyId",
                table: "easyEdu_Designations",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_DormitoryRooms_easyEdu_Dormitories_DormitoryId",
                table: "easyEdu_DormitoryRooms",
                column: "DormitoryId",
                principalTable: "easyEdu_Dormitories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Drivers_easyEdu_Companies_CompanyId",
                table: "easyEdu_Drivers",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_EvaluationResponses_easyEdu_EvaluationCriteria_EvaluationCriterionId",
                table: "easyEdu_EvaluationResponses",
                column: "EvaluationCriterionId",
                principalTable: "easyEdu_EvaluationCriteria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_EvaluationResponses_easyEdu_TeacherEvaluations_TeacherEvaluationId",
                table: "easyEdu_EvaluationResponses",
                column: "TeacherEvaluationId",
                principalTable: "easyEdu_TeacherEvaluations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Examinations_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_Examinations",
                column: "AcademicYearId",
                principalTable: "easyEdu_AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamPositions_easyEdu_Examinations_ExaminationId",
                table: "easyEdu_ExamPositions",
                column: "ExaminationId",
                principalTable: "easyEdu_Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamPositions_easyEdu_Students_StudentId",
                table: "easyEdu_ExamPositions",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_ClassRooms_ClassRoomId",
                table: "easyEdu_ExamSchedules",
                column: "ClassRoomId",
                principalTable: "easyEdu_ClassRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Classes_ClassId",
                table: "easyEdu_ExamSchedules",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Examinations_ExaminationId",
                table: "easyEdu_ExamSchedules",
                column: "ExaminationId",
                principalTable: "easyEdu_Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Sections_SectionId",
                table: "easyEdu_ExamSchedules",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Subjects_SubjectId",
                table: "easyEdu_ExamSchedules",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExamSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ExamSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Expenses_easyEdu_Companies_CompanyId",
                table: "easyEdu_Expenses",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ExpertTeachers_easyEdu_Teachers_TeacherId",
                table: "easyEdu_ExpertTeachers",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeeCollections_easyEdu_FeeStructures_FeeStructureId",
                table: "easyEdu_FeeCollections",
                column: "FeeStructureId",
                principalTable: "easyEdu_FeeStructures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeeCollections_easyEdu_FeesInvoices_FeesInvoiceId",
                table: "easyEdu_FeeCollections",
                column: "FeesInvoiceId",
                principalTable: "easyEdu_FeesInvoices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeeCollections_easyEdu_Students_StudentId",
                table: "easyEdu_FeeCollections",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesCarryForwards_easyEdu_Students_StudentId",
                table: "easyEdu_FeesCarryForwards",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesGroups_easyEdu_Companies_CompanyId",
                table: "easyEdu_FeesGroups",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesInvoiceDetails_easyEdu_FeesInvoices_FeesInvoiceId",
                table: "easyEdu_FeesInvoiceDetails",
                column: "FeesInvoiceId",
                principalTable: "easyEdu_FeesInvoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesInvoiceDetails_easyEdu_FeesTypes_FeesTypeId",
                table: "easyEdu_FeesInvoiceDetails",
                column: "FeesTypeId",
                principalTable: "easyEdu_FeesTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesInvoices_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_FeesInvoices",
                column: "AcademicYearId",
                principalTable: "easyEdu_AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesInvoices_easyEdu_Students_StudentId",
                table: "easyEdu_FeesInvoices",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesInvoices_easyEdu_Students_StudentId1",
                table: "easyEdu_FeesInvoices",
                column: "StudentId1",
                principalTable: "easyEdu_Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeeStructures_easyEdu_Classes_ClassId",
                table: "easyEdu_FeeStructures",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FeesTypes_easyEdu_FeesGroups_FeesGroupId",
                table: "easyEdu_FeesTypes",
                column: "FeesGroupId",
                principalTable: "easyEdu_FeesGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_FrontCourses_easyEdu_CourseCategories_CategoryId",
                table: "easyEdu_FrontCourses",
                column: "CategoryId",
                principalTable: "easyEdu_CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_GmeetSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_GmeetSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_GmeetVirtualClasses",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_GmeetVirtualClasses",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_GmeetVirtualClasses",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_GmeetVirtualClasses",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_GmeetVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_GmeetVirtualMeetings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Homeworks_easyEdu_Classes_ClassId",
                table: "easyEdu_Homeworks",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Homeworks_easyEdu_Subjects_SubjectId",
                table: "easyEdu_Homeworks",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_HomeworkSubmissions_easyEdu_Homeworks_HomeworkId",
                table: "easyEdu_HomeworkSubmissions",
                column: "HomeworkId",
                principalTable: "easyEdu_Homeworks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_HomeworkSubmissions_easyEdu_Students_StudentId",
                table: "easyEdu_HomeworkSubmissions",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Incidents_easyEdu_Companies_CompanyId",
                table: "easyEdu_Incidents",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Inventories_easyEdu_Companies_CompanyId",
                table: "easyEdu_Inventories",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Inventories_easyEdu_ItemCategories_CategoryId",
                table: "easyEdu_Inventories",
                column: "CategoryId",
                principalTable: "easyEdu_ItemCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_InventoryTransactions_easyEdu_Inventories_InventoryId",
                table: "easyEdu_InventoryTransactions",
                column: "InventoryId",
                principalTable: "easyEdu_Inventories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_InventoryTransactions_easyEdu_Students_StudentId",
                table: "easyEdu_InventoryTransactions",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ItemReceives_easyEdu_Inventories_InventoryId",
                table: "easyEdu_ItemReceives",
                column: "InventoryId",
                principalTable: "easyEdu_Inventories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ItemReceives_easyEdu_Suppliers_SupplierId",
                table: "easyEdu_ItemReceives",
                column: "SupplierId",
                principalTable: "easyEdu_Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_JitsiSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_JitsiSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_JitsiVirtualClasses",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_JitsiVirtualClasses",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_JitsiVirtualClasses",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_JitsiVirtualClasses",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_JitsiVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_JitsiVirtualMeetings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LeaveDefines_easyEdu_LeaveTypes_LeaveTypeId",
                table: "easyEdu_LeaveDefines",
                column: "LeaveTypeId",
                principalTable: "easyEdu_LeaveTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LeaveRequests_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_LeaveRequests",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LeaveRequests_easyEdu_LeaveTypes_LeaveTypeId",
                table: "easyEdu_LeaveRequests",
                column: "LeaveTypeId",
                principalTable: "easyEdu_LeaveTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LeaveTypes_easyEdu_Companies_CompanyId",
                table: "easyEdu_LeaveTypes",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Ledgers_easyEdu_AccountGroups_AccountGroupId",
                table: "easyEdu_Ledgers",
                column: "AccountGroupId",
                principalTable: "easyEdu_AccountGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LessonPlans_easyEdu_Lessons_LessonId",
                table: "easyEdu_LessonPlans",
                column: "LessonId",
                principalTable: "easyEdu_Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LessonPlans_easyEdu_Teachers_TeacherId",
                table: "easyEdu_LessonPlans",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LessonPlans_easyEdu_Topics_TopicId",
                table: "easyEdu_LessonPlans",
                column: "TopicId",
                principalTable: "easyEdu_Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LessonPlanSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_LessonPlanSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Lessons_easyEdu_Classes_ClassId",
                table: "easyEdu_Lessons",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Lessons_easyEdu_Subjects_SubjectId",
                table: "easyEdu_Lessons",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LibraryMembers_easyEdu_Students_StudentId",
                table: "easyEdu_LibraryMembers",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LibraryMembers_easyEdu_Teachers_StaffId",
                table: "easyEdu_LibraryMembers",
                column: "StaffId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsCategories_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsCategories",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsCourseLevels_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsCourseLevels",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsCourses_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsCourses",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsCourses_easyEdu_LmsCategories_CategoryId",
                table: "easyEdu_LmsCourses",
                column: "CategoryId",
                principalTable: "easyEdu_LmsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsCourses_easyEdu_LmsCourseLevels_LevelId",
                table: "easyEdu_LmsCourses",
                column: "LevelId",
                principalTable: "easyEdu_LmsCourseLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsEnrollments_easyEdu_LmsCourses_CourseId",
                table: "easyEdu_LmsEnrollments",
                column: "CourseId",
                principalTable: "easyEdu_LmsCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsEnrollments_easyEdu_Students_StudentId",
                table: "easyEdu_LmsEnrollments",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsFeesInvoices_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsFeesInvoices",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsFeesInvoices_easyEdu_Students_StudentId",
                table: "easyEdu_LmsFeesInvoices",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsPurchaseLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsPurchaseLogs",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsPurchaseLogs_easyEdu_LmsCourses_CourseId",
                table: "easyEdu_LmsPurchaseLogs",
                column: "CourseId",
                principalTable: "easyEdu_LmsCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsPurchaseLogs_easyEdu_Students_StudentId",
                table: "easyEdu_LmsPurchaseLogs",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_LmsSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Marks_easyEdu_Examinations_ExaminationId",
                table: "easyEdu_Marks",
                column: "ExaminationId",
                principalTable: "easyEdu_Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Marks_easyEdu_Students_StudentId",
                table: "easyEdu_Marks",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Marks_easyEdu_Subjects_SubjectId",
                table: "easyEdu_Marks",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_MenuItems_easyEdu_MenuItems_ParentId",
                table: "easyEdu_MenuItems",
                column: "ParentId",
                principalTable: "easyEdu_MenuItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_MessageLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_MessageLogs",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_MessageTemplates_easyEdu_Companies_CompanyId",
                table: "easyEdu_MessageTemplates",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_NewsComments_easyEdu_NewsPosts_NewsPostId",
                table: "easyEdu_NewsComments",
                column: "NewsPostId",
                principalTable: "easyEdu_NewsPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_NewsPosts_easyEdu_NewsCategories_CategoryId",
                table: "easyEdu_NewsPosts",
                column: "CategoryId",
                principalTable: "easyEdu_NewsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Notices_easyEdu_Companies_CompanyId",
                table: "easyEdu_Notices",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_OnlineExamSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_OnlineExamSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_OnlineRegistrationSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_OnlineRegistrationSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Parents_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_Parents",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Parents_easyEdu_Students_StudentId",
                table: "easyEdu_Parents",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Payrolls_easyEdu_Teachers_TeacherId",
                table: "easyEdu_Payrolls",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_PhoneCallLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_PhoneCallLogs",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_PostalLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_PostalLogs",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_QrAttendanceSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_QrAttendanceSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_QuestionBanks_easyEdu_QuestionGroups_QuestionGroupId",
                table: "easyEdu_QuestionBanks",
                column: "QuestionGroupId",
                principalTable: "easyEdu_QuestionGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_RegistrationSubmissions_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_RegistrationSubmissions",
                column: "AcademicYearId",
                principalTable: "easyEdu_AcademicYears",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_RegistrationSubmissions_easyEdu_Classes_ClassId",
                table: "easyEdu_RegistrationSubmissions",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_RegistrationSubmissions_easyEdu_Companies_CompanyId",
                table: "easyEdu_RegistrationSubmissions",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Routes_easyEdu_Companies_CompanyId",
                table: "easyEdu_Routes",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StaffSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_StaffSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentDocuments_easyEdu_Students_StudentId",
                table: "easyEdu_StudentDocuments",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentGroups_easyEdu_Companies_CompanyId",
                table: "easyEdu_StudentGroups",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentIncidents_easyEdu_Incidents_IncidentId",
                table: "easyEdu_StudentIncidents",
                column: "IncidentId",
                principalTable: "easyEdu_Incidents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentIncidents_easyEdu_Students_StudentId",
                table: "easyEdu_StudentIncidents",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentOptionalSubjects_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_StudentOptionalSubjects",
                column: "AcademicYearId",
                principalTable: "easyEdu_AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentOptionalSubjects_easyEdu_Students_StudentId",
                table: "easyEdu_StudentOptionalSubjects",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentOptionalSubjects_easyEdu_Subjects_SubjectId",
                table: "easyEdu_StudentOptionalSubjects",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentPromotions_easyEdu_Students_StudentId",
                table: "easyEdu_StudentPromotions",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_Students",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Classes_ClassId",
                table: "easyEdu_Students",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Companies_CompanyId",
                table: "easyEdu_Students",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Dormitories_DormitoryId",
                table: "easyEdu_Students",
                column: "DormitoryId",
                principalTable: "easyEdu_Dormitories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_DormitoryRooms_DormitoryRoomId",
                table: "easyEdu_Students",
                column: "DormitoryRoomId",
                principalTable: "easyEdu_DormitoryRooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Routes_RouteId",
                table: "easyEdu_Students",
                column: "RouteId",
                principalTable: "easyEdu_Routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Sections_SectionId",
                table: "easyEdu_Students",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Students_easyEdu_StudentCategories_StudentCategoryId",
                table: "easyEdu_Students",
                column: "StudentCategoryId",
                principalTable: "easyEdu_StudentCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudentSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_StudentSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudyMaterials_easyEdu_Classes_ClassId",
                table: "easyEdu_StudyMaterials",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_StudyMaterials_easyEdu_Subjects_SubjectId",
                table: "easyEdu_StudyMaterials",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Subjects_easyEdu_Classes_ClassId",
                table: "easyEdu_Subjects",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Subjects_easyEdu_Teachers_TeacherId",
                table: "easyEdu_Subjects",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_SubjectWiseAttendances_easyEdu_Students_StudentId",
                table: "easyEdu_SubjectWiseAttendances",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_SubjectWiseAttendances_easyEdu_Subjects_SubjectId",
                table: "easyEdu_SubjectWiseAttendances",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_SystemModules_easyEdu_Companies_CompanyId",
                table: "easyEdu_SystemModules",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_SystemSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_SystemSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TeacherAttendances_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TeacherAttendances",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TeacherEvaluations_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TeacherEvaluations",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_Teachers",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_Companies_CompanyId",
                table: "easyEdu_Teachers",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_Departments_DepartmentId",
                table: "easyEdu_Teachers",
                column: "DepartmentId",
                principalTable: "easyEdu_Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_Designations_DesignationId",
                table: "easyEdu_Teachers",
                column: "DesignationId",
                principalTable: "easyEdu_Designations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ThemeSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ThemeSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_ClassRooms_ClassRoomId",
                table: "easyEdu_TimeTables",
                column: "ClassRoomId",
                principalTable: "easyEdu_ClassRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Classes_ClassId",
                table: "easyEdu_TimeTables",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Sections_SectionId",
                table: "easyEdu_TimeTables",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Subjects_SubjectId",
                table: "easyEdu_TimeTables",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TimeTables",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TodoTasks_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_TodoTasks",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TodoTasks_easyEdu_Companies_CompanyId",
                table: "easyEdu_TodoTasks",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Topics_easyEdu_Lessons_LessonId",
                table: "easyEdu_Topics",
                column: "LessonId",
                principalTable: "easyEdu_Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TrainingAttendances_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TrainingAttendances",
                column: "TeacherId",
                principalTable: "easyEdu_Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_TrainingAttendances_easyEdu_Trainings_TrainingId",
                table: "easyEdu_TrainingAttendances",
                column: "TrainingId",
                principalTable: "easyEdu_Trainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Trainings_easyEdu_Companies_CompanyId",
                table: "easyEdu_Trainings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_UserAuditLogs_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_UserAuditLogs",
                column: "UserId",
                principalTable: "easyEdu_AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_UserAuditLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_UserAuditLogs",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_VehicleMaintenances_easyEdu_Vehicles_VehicleId",
                table: "easyEdu_VehicleMaintenances",
                column: "VehicleId",
                principalTable: "easyEdu_Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Vehicles_easyEdu_Companies_CompanyId",
                table: "easyEdu_Vehicles",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Vehicles_easyEdu_Drivers_DriverId",
                table: "easyEdu_Vehicles",
                column: "DriverId",
                principalTable: "easyEdu_Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_Vehicles_easyEdu_Routes_RouteId",
                table: "easyEdu_Vehicles",
                column: "RouteId",
                principalTable: "easyEdu_Routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_VisitorBooks_easyEdu_Companies_CompanyId",
                table: "easyEdu_VisitorBooks",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_VoucherDetails_easyEdu_Inventories_InventoryId",
                table: "easyEdu_VoucherDetails",
                column: "InventoryId",
                principalTable: "easyEdu_Inventories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_VoucherDetails_easyEdu_Ledgers_LedgerId",
                table: "easyEdu_VoucherDetails",
                column: "LedgerId",
                principalTable: "easyEdu_Ledgers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_VoucherDetails_easyEdu_Vouchers_VoucherId",
                table: "easyEdu_VoucherDetails",
                column: "VoucherId",
                principalTable: "easyEdu_Vouchers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_WalletTransactions_easyEdu_Students_StudentId",
                table: "easyEdu_WalletTransactions",
                column: "StudentId",
                principalTable: "easyEdu_Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_WalletTransactions_easyEdu_Students_StudentId1",
                table: "easyEdu_WalletTransactions",
                column: "StudentId1",
                principalTable: "easyEdu_Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_WhatsAppAgents_easyEdu_Companies_CompanyId",
                table: "easyEdu_WhatsAppAgents",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_WhatsAppLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_WhatsAppLogs",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_WhatsAppSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_WhatsAppSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_WrittenExams_easyEdu_Companies_CompanyId",
                table: "easyEdu_WrittenExams",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ZoomSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ZoomSettings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_ZoomVirtualClasses",
                column: "ClassId",
                principalTable: "easyEdu_Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_ZoomVirtualClasses",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_ZoomVirtualClasses",
                column: "SectionId",
                principalTable: "easyEdu_Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_ZoomVirtualClasses",
                column: "SubjectId",
                principalTable: "easyEdu_Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_easyEdu_ZoomVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ZoomVirtualMeetings",
                column: "CompanyId",
                principalTable: "easyEdu_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AcademicYears_easyEdu_Companies_CompanyId",
                table: "easyEdu_AcademicYears");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AccountGroups_easyEdu_AccountGroups_ParentGroupId",
                table: "easyEdu_AccountGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AdminSetupItems_easyEdu_Companies_CompanyId",
                table: "easyEdu_AdminSetupItems");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AdmissionQueries_easyEdu_Classes_ClassId",
                table: "easyEdu_AdmissionQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AdmissionQueries_easyEdu_Companies_CompanyId",
                table: "easyEdu_AdmissionQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AdmissionQuerySettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_AdmissionQuerySettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetRoleClaims_easyEdu_AspNetRoles_RoleId",
                table: "easyEdu_AspNetRoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetUserClaims_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetUserLogins_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetUserRoles_easyEdu_AspNetRoles_RoleId",
                table: "easyEdu_AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetUserRoles_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetUsers_easyEdu_Companies_CompanyId",
                table: "easyEdu_AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AspNetUserTokens_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignClassTeachers_easyEdu_Classes_ClassId",
                table: "easyEdu_AssignClassTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignClassTeachers_easyEdu_Sections_SectionId",
                table: "easyEdu_AssignClassTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignClassTeachers_easyEdu_Teachers_TeacherId",
                table: "easyEdu_AssignClassTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Classes_ClassId",
                table: "easyEdu_AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Sections_SectionId",
                table: "easyEdu_AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Subjects_SubjectId",
                table: "easyEdu_AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_AssignSubjects_easyEdu_Teachers_TeacherId",
                table: "easyEdu_AssignSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Attendances_easyEdu_Students_StudentId",
                table: "easyEdu_Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BankPayments_easyEdu_FeesInvoices_FeesInvoiceId",
                table: "easyEdu_BankPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BankPayments_easyEdu_Students_StudentId",
                table: "easyEdu_BankPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBRecordings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBRecordings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_BBBVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BBBVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BBBVirtualMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BehaviourSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BehaviourSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BiometricSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_BiometricSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BookIssues_easyEdu_Books_BookId",
                table: "easyEdu_BookIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_BookIssues_easyEdu_Students_StudentId",
                table: "easyEdu_BookIssues");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Books_easyEdu_BookCategories_CategoryId",
                table: "easyEdu_Books");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Books_easyEdu_Companies_CompanyId",
                table: "easyEdu_Books");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CalendarEvents_easyEdu_Companies_CompanyId",
                table: "easyEdu_CalendarEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseAssessments_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseAssignObservations_easyEdu_CbseObservationParameters_ParameterId",
                table: "easyEdu_CbseAssignObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseAssignObservations_easyEdu_Students_StudentId",
                table: "easyEdu_CbseAssignObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseExams_easyEdu_CbseTerms_TermId",
                table: "easyEdu_CbseExams");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseExams_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseExams");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseExamSchedules_easyEdu_CbseExams_CbseExamId",
                table: "easyEdu_CbseExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseExamSchedules_easyEdu_Classes_ClassId",
                table: "easyEdu_CbseExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseExamSchedules_easyEdu_Subjects_SubjectId",
                table: "easyEdu_CbseExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseGrades_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseGrades");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseMarkSheetTemplates_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseMarkSheetTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseObservationParameters_easyEdu_CbseObservations_ObservationId",
                table: "easyEdu_CbseObservationParameters");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseObservations_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CbseTerms_easyEdu_Companies_CompanyId",
                table: "easyEdu_CbseTerms");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Certificates_easyEdu_Students_StudentId",
                table: "easyEdu_Certificates");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatBlockedUsers_easyEdu_AspNetUsers_BlockedId",
                table: "easyEdu_ChatBlockedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatBlockedUsers_easyEdu_AspNetUsers_BlockerId",
                table: "easyEdu_ChatBlockedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatBlockedUsers_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatBlockedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatInvitations_easyEdu_AspNetUsers_ReceiverId",
                table: "easyEdu_ChatInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatInvitations_easyEdu_AspNetUsers_SenderId",
                table: "easyEdu_ChatInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatInvitations_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatMessages_easyEdu_AspNetUsers_ReceiverId",
                table: "easyEdu_ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatMessages_easyEdu_AspNetUsers_SenderId",
                table: "easyEdu_ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatMessages_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatUserSettings_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_ChatUserSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ChatUserSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ChatUserSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Classes_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Classes_easyEdu_Companies_CompanyId",
                table: "easyEdu_Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ClassSections_easyEdu_Classes_ClassId",
                table: "easyEdu_ClassSections");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ClassSections_easyEdu_Sections_SectionId",
                table: "easyEdu_ClassSections");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Complaints_easyEdu_Companies_CompanyId",
                table: "easyEdu_Complaints");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CustomFields_easyEdu_Companies_CompanyId",
                table: "easyEdu_CustomFields");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_CustomFieldValues_easyEdu_CustomFields_CustomFieldId",
                table: "easyEdu_CustomFieldValues");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Departments_easyEdu_Companies_CompanyId",
                table: "easyEdu_Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Designations_easyEdu_Companies_CompanyId",
                table: "easyEdu_Designations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_DormitoryRooms_easyEdu_Dormitories_DormitoryId",
                table: "easyEdu_DormitoryRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Drivers_easyEdu_Companies_CompanyId",
                table: "easyEdu_Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_EvaluationResponses_easyEdu_EvaluationCriteria_EvaluationCriterionId",
                table: "easyEdu_EvaluationResponses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_EvaluationResponses_easyEdu_TeacherEvaluations_TeacherEvaluationId",
                table: "easyEdu_EvaluationResponses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Examinations_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_Examinations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamPositions_easyEdu_Examinations_ExaminationId",
                table: "easyEdu_ExamPositions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamPositions_easyEdu_Students_StudentId",
                table: "easyEdu_ExamPositions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_ClassRooms_ClassRoomId",
                table: "easyEdu_ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Classes_ClassId",
                table: "easyEdu_ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Examinations_ExaminationId",
                table: "easyEdu_ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Sections_SectionId",
                table: "easyEdu_ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamSchedules_easyEdu_Subjects_SubjectId",
                table: "easyEdu_ExamSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExamSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ExamSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Expenses_easyEdu_Companies_CompanyId",
                table: "easyEdu_Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ExpertTeachers_easyEdu_Teachers_TeacherId",
                table: "easyEdu_ExpertTeachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeeCollections_easyEdu_FeeStructures_FeeStructureId",
                table: "easyEdu_FeeCollections");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeeCollections_easyEdu_FeesInvoices_FeesInvoiceId",
                table: "easyEdu_FeeCollections");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeeCollections_easyEdu_Students_StudentId",
                table: "easyEdu_FeeCollections");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesCarryForwards_easyEdu_Students_StudentId",
                table: "easyEdu_FeesCarryForwards");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesGroups_easyEdu_Companies_CompanyId",
                table: "easyEdu_FeesGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesInvoiceDetails_easyEdu_FeesInvoices_FeesInvoiceId",
                table: "easyEdu_FeesInvoiceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesInvoiceDetails_easyEdu_FeesTypes_FeesTypeId",
                table: "easyEdu_FeesInvoiceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesInvoices_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_FeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesInvoices_easyEdu_Students_StudentId",
                table: "easyEdu_FeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesInvoices_easyEdu_Students_StudentId1",
                table: "easyEdu_FeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeeStructures_easyEdu_Classes_ClassId",
                table: "easyEdu_FeeStructures");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FeesTypes_easyEdu_FeesGroups_FeesGroupId",
                table: "easyEdu_FeesTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_FrontCourses_easyEdu_CourseCategories_CategoryId",
                table: "easyEdu_FrontCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_GmeetSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_GmeetSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_GmeetVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_GmeetVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_GmeetVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_GmeetVirtualMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Homeworks_easyEdu_Classes_ClassId",
                table: "easyEdu_Homeworks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Homeworks_easyEdu_Subjects_SubjectId",
                table: "easyEdu_Homeworks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_HomeworkSubmissions_easyEdu_Homeworks_HomeworkId",
                table: "easyEdu_HomeworkSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_HomeworkSubmissions_easyEdu_Students_StudentId",
                table: "easyEdu_HomeworkSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Incidents_easyEdu_Companies_CompanyId",
                table: "easyEdu_Incidents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Inventories_easyEdu_Companies_CompanyId",
                table: "easyEdu_Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Inventories_easyEdu_ItemCategories_CategoryId",
                table: "easyEdu_Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_InventoryTransactions_easyEdu_Inventories_InventoryId",
                table: "easyEdu_InventoryTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_InventoryTransactions_easyEdu_Students_StudentId",
                table: "easyEdu_InventoryTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ItemReceives_easyEdu_Inventories_InventoryId",
                table: "easyEdu_ItemReceives");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ItemReceives_easyEdu_Suppliers_SupplierId",
                table: "easyEdu_ItemReceives");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_JitsiSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_JitsiSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_JitsiVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_JitsiVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_JitsiVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_JitsiVirtualMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LeaveDefines_easyEdu_LeaveTypes_LeaveTypeId",
                table: "easyEdu_LeaveDefines");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LeaveRequests_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_LeaveRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LeaveRequests_easyEdu_LeaveTypes_LeaveTypeId",
                table: "easyEdu_LeaveRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LeaveTypes_easyEdu_Companies_CompanyId",
                table: "easyEdu_LeaveTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Ledgers_easyEdu_AccountGroups_AccountGroupId",
                table: "easyEdu_Ledgers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LessonPlans_easyEdu_Lessons_LessonId",
                table: "easyEdu_LessonPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LessonPlans_easyEdu_Teachers_TeacherId",
                table: "easyEdu_LessonPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LessonPlans_easyEdu_Topics_TopicId",
                table: "easyEdu_LessonPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LessonPlanSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_LessonPlanSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Lessons_easyEdu_Classes_ClassId",
                table: "easyEdu_Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Lessons_easyEdu_Subjects_SubjectId",
                table: "easyEdu_Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LibraryMembers_easyEdu_Students_StudentId",
                table: "easyEdu_LibraryMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LibraryMembers_easyEdu_Teachers_StaffId",
                table: "easyEdu_LibraryMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsCategories_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsCourseLevels_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsCourseLevels");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsCourses_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsCourses_easyEdu_LmsCategories_CategoryId",
                table: "easyEdu_LmsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsCourses_easyEdu_LmsCourseLevels_LevelId",
                table: "easyEdu_LmsCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsEnrollments_easyEdu_LmsCourses_CourseId",
                table: "easyEdu_LmsEnrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsEnrollments_easyEdu_Students_StudentId",
                table: "easyEdu_LmsEnrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsFeesInvoices_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsFeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsFeesInvoices_easyEdu_Students_StudentId",
                table: "easyEdu_LmsFeesInvoices");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsPurchaseLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsPurchaseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsPurchaseLogs_easyEdu_LmsCourses_CourseId",
                table: "easyEdu_LmsPurchaseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsPurchaseLogs_easyEdu_Students_StudentId",
                table: "easyEdu_LmsPurchaseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_LmsSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_LmsSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Marks_easyEdu_Examinations_ExaminationId",
                table: "easyEdu_Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Marks_easyEdu_Students_StudentId",
                table: "easyEdu_Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Marks_easyEdu_Subjects_SubjectId",
                table: "easyEdu_Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_MenuItems_easyEdu_MenuItems_ParentId",
                table: "easyEdu_MenuItems");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_MessageLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_MessageLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_MessageTemplates_easyEdu_Companies_CompanyId",
                table: "easyEdu_MessageTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_NewsComments_easyEdu_NewsPosts_NewsPostId",
                table: "easyEdu_NewsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_NewsPosts_easyEdu_NewsCategories_CategoryId",
                table: "easyEdu_NewsPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Notices_easyEdu_Companies_CompanyId",
                table: "easyEdu_Notices");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_OnlineExamSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_OnlineExamSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_OnlineRegistrationSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_OnlineRegistrationSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Parents_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_Parents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Parents_easyEdu_Students_StudentId",
                table: "easyEdu_Parents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Payrolls_easyEdu_Teachers_TeacherId",
                table: "easyEdu_Payrolls");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_PhoneCallLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_PhoneCallLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_PostalLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_PostalLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_QrAttendanceSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_QrAttendanceSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_QuestionBanks_easyEdu_QuestionGroups_QuestionGroupId",
                table: "easyEdu_QuestionBanks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_RegistrationSubmissions_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_RegistrationSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_RegistrationSubmissions_easyEdu_Classes_ClassId",
                table: "easyEdu_RegistrationSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_RegistrationSubmissions_easyEdu_Companies_CompanyId",
                table: "easyEdu_RegistrationSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Routes_easyEdu_Companies_CompanyId",
                table: "easyEdu_Routes");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StaffSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_StaffSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentDocuments_easyEdu_Students_StudentId",
                table: "easyEdu_StudentDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentGroups_easyEdu_Companies_CompanyId",
                table: "easyEdu_StudentGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentIncidents_easyEdu_Incidents_IncidentId",
                table: "easyEdu_StudentIncidents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentIncidents_easyEdu_Students_StudentId",
                table: "easyEdu_StudentIncidents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentOptionalSubjects_easyEdu_AcademicYears_AcademicYearId",
                table: "easyEdu_StudentOptionalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentOptionalSubjects_easyEdu_Students_StudentId",
                table: "easyEdu_StudentOptionalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentOptionalSubjects_easyEdu_Subjects_SubjectId",
                table: "easyEdu_StudentOptionalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentPromotions_easyEdu_Students_StudentId",
                table: "easyEdu_StudentPromotions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Classes_ClassId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Companies_CompanyId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Dormitories_DormitoryId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_DormitoryRooms_DormitoryRoomId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Routes_RouteId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_Sections_SectionId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Students_easyEdu_StudentCategories_StudentCategoryId",
                table: "easyEdu_Students");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudentSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_StudentSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudyMaterials_easyEdu_Classes_ClassId",
                table: "easyEdu_StudyMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_StudyMaterials_easyEdu_Subjects_SubjectId",
                table: "easyEdu_StudyMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Subjects_easyEdu_Classes_ClassId",
                table: "easyEdu_Subjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Subjects_easyEdu_Teachers_TeacherId",
                table: "easyEdu_Subjects");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_SubjectWiseAttendances_easyEdu_Students_StudentId",
                table: "easyEdu_SubjectWiseAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_SubjectWiseAttendances_easyEdu_Subjects_SubjectId",
                table: "easyEdu_SubjectWiseAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_SystemModules_easyEdu_Companies_CompanyId",
                table: "easyEdu_SystemModules");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_SystemSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_SystemSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TeacherAttendances_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TeacherAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TeacherEvaluations_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TeacherEvaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_Companies_CompanyId",
                table: "easyEdu_Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_Departments_DepartmentId",
                table: "easyEdu_Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Teachers_easyEdu_Designations_DesignationId",
                table: "easyEdu_Teachers");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ThemeSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ThemeSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_ClassRooms_ClassRoomId",
                table: "easyEdu_TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Classes_ClassId",
                table: "easyEdu_TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Sections_SectionId",
                table: "easyEdu_TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Subjects_SubjectId",
                table: "easyEdu_TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TimeTables_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TodoTasks_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_TodoTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TodoTasks_easyEdu_Companies_CompanyId",
                table: "easyEdu_TodoTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Topics_easyEdu_Lessons_LessonId",
                table: "easyEdu_Topics");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TrainingAttendances_easyEdu_Teachers_TeacherId",
                table: "easyEdu_TrainingAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_TrainingAttendances_easyEdu_Trainings_TrainingId",
                table: "easyEdu_TrainingAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Trainings_easyEdu_Companies_CompanyId",
                table: "easyEdu_Trainings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_UserAuditLogs_easyEdu_AspNetUsers_UserId",
                table: "easyEdu_UserAuditLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_UserAuditLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_UserAuditLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_VehicleMaintenances_easyEdu_Vehicles_VehicleId",
                table: "easyEdu_VehicleMaintenances");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Vehicles_easyEdu_Companies_CompanyId",
                table: "easyEdu_Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Vehicles_easyEdu_Drivers_DriverId",
                table: "easyEdu_Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_Vehicles_easyEdu_Routes_RouteId",
                table: "easyEdu_Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_VisitorBooks_easyEdu_Companies_CompanyId",
                table: "easyEdu_VisitorBooks");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_VoucherDetails_easyEdu_Inventories_InventoryId",
                table: "easyEdu_VoucherDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_VoucherDetails_easyEdu_Ledgers_LedgerId",
                table: "easyEdu_VoucherDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_VoucherDetails_easyEdu_Vouchers_VoucherId",
                table: "easyEdu_VoucherDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_WalletTransactions_easyEdu_Students_StudentId",
                table: "easyEdu_WalletTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_WalletTransactions_easyEdu_Students_StudentId1",
                table: "easyEdu_WalletTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_WhatsAppAgents_easyEdu_Companies_CompanyId",
                table: "easyEdu_WhatsAppAgents");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_WhatsAppLogs_easyEdu_Companies_CompanyId",
                table: "easyEdu_WhatsAppLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_WhatsAppSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_WhatsAppSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_WrittenExams_easyEdu_Companies_CompanyId",
                table: "easyEdu_WrittenExams");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ZoomSettings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ZoomSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Classes_ClassId",
                table: "easyEdu_ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Companies_CompanyId",
                table: "easyEdu_ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Sections_SectionId",
                table: "easyEdu_ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ZoomVirtualClasses_easyEdu_Subjects_SubjectId",
                table: "easyEdu_ZoomVirtualClasses");

            migrationBuilder.DropForeignKey(
                name: "FK_easyEdu_ZoomVirtualMeetings_easyEdu_Companies_CompanyId",
                table: "easyEdu_ZoomVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ZoomVirtualMeetings",
                table: "easyEdu_ZoomVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ZoomVirtualClasses",
                table: "easyEdu_ZoomVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ZoomSettings",
                table: "easyEdu_ZoomSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_WrittenExams",
                table: "easyEdu_WrittenExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_WhatsAppSettings",
                table: "easyEdu_WhatsAppSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_WhatsAppLogs",
                table: "easyEdu_WhatsAppLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_WhatsAppAgents",
                table: "easyEdu_WhatsAppAgents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_WalletTransactions",
                table: "easyEdu_WalletTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Vouchers",
                table: "easyEdu_Vouchers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_VoucherDetails",
                table: "easyEdu_VoucherDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_VisitorBooks",
                table: "easyEdu_VisitorBooks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Vehicles",
                table: "easyEdu_Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_VehicleMaintenances",
                table: "easyEdu_VehicleMaintenances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_UserAuditLogs",
                table: "easyEdu_UserAuditLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Trainings",
                table: "easyEdu_Trainings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_TrainingAttendances",
                table: "easyEdu_TrainingAttendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Topics",
                table: "easyEdu_Topics");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_TodoTasks",
                table: "easyEdu_TodoTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ToDos",
                table: "easyEdu_ToDos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_TimeTables",
                table: "easyEdu_TimeTables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ThemeSettings",
                table: "easyEdu_ThemeSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Testimonials",
                table: "easyEdu_Testimonials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Teachers",
                table: "easyEdu_Teachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_TeacherEvaluations",
                table: "easyEdu_TeacherEvaluations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_TeacherAttendances",
                table: "easyEdu_TeacherAttendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_SystemSettings",
                table: "easyEdu_SystemSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_SystemModules",
                table: "easyEdu_SystemModules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Suppliers",
                table: "easyEdu_Suppliers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_SubjectWiseAttendances",
                table: "easyEdu_SubjectWiseAttendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Subjects",
                table: "easyEdu_Subjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudyMaterials",
                table: "easyEdu_StudyMaterials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentSettings",
                table: "easyEdu_StudentSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Students",
                table: "easyEdu_Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentPromotions",
                table: "easyEdu_StudentPromotions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentOptionalSubjects",
                table: "easyEdu_StudentOptionalSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentIncidents",
                table: "easyEdu_StudentIncidents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentGroups",
                table: "easyEdu_StudentGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentDocuments",
                table: "easyEdu_StudentDocuments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StudentCategories",
                table: "easyEdu_StudentCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_StaffSettings",
                table: "easyEdu_StaffSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_SocialMedias",
                table: "easyEdu_SocialMedias");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Sections",
                table: "easyEdu_Sections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_SeatPlanSettings",
                table: "easyEdu_SeatPlanSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Routes",
                table: "easyEdu_Routes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_RegistrationSubmissions",
                table: "easyEdu_RegistrationSubmissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_QuestionGroups",
                table: "easyEdu_QuestionGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_QuestionBanks",
                table: "easyEdu_QuestionBanks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_QrAttendanceSettings",
                table: "easyEdu_QrAttendanceSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_PostalLogs",
                table: "easyEdu_PostalLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_PhoneCallLogs",
                table: "easyEdu_PhoneCallLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Payrolls",
                table: "easyEdu_Payrolls");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Parents",
                table: "easyEdu_Parents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_OnlineRegistrationSettings",
                table: "easyEdu_OnlineRegistrationSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_OnlineExamSettings",
                table: "easyEdu_OnlineExamSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_OnlineExams",
                table: "easyEdu_OnlineExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Notifications",
                table: "easyEdu_Notifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Notices",
                table: "easyEdu_Notices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_NewsPosts",
                table: "easyEdu_NewsPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_NewsComments",
                table: "easyEdu_NewsComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_NewsCategories",
                table: "easyEdu_NewsCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_MessageTemplates",
                table: "easyEdu_MessageTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_MessageLogs",
                table: "easyEdu_MessageLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_MenuItems",
                table: "easyEdu_MenuItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Marks",
                table: "easyEdu_Marks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_MarkGrades",
                table: "easyEdu_MarkGrades");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsSettings",
                table: "easyEdu_LmsSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsPurchaseLogs",
                table: "easyEdu_LmsPurchaseLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsFeesInvoices",
                table: "easyEdu_LmsFeesInvoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsEnrollments",
                table: "easyEdu_LmsEnrollments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsCourses",
                table: "easyEdu_LmsCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsCourseLevels",
                table: "easyEdu_LmsCourseLevels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LmsCategories",
                table: "easyEdu_LmsCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LibraryMembers",
                table: "easyEdu_LibraryMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Lessons",
                table: "easyEdu_Lessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LessonPlanSettings",
                table: "easyEdu_LessonPlanSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LessonPlans",
                table: "easyEdu_LessonPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Ledgers",
                table: "easyEdu_Ledgers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LeaveTypes",
                table: "easyEdu_LeaveTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LeaveRequests",
                table: "easyEdu_LeaveRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_LeaveDefines",
                table: "easyEdu_LeaveDefines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_JitsiVirtualMeetings",
                table: "easyEdu_JitsiVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_JitsiVirtualClasses",
                table: "easyEdu_JitsiVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_JitsiSettings",
                table: "easyEdu_JitsiSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ItemStores",
                table: "easyEdu_ItemStores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ItemReceives",
                table: "easyEdu_ItemReceives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ItemCategories",
                table: "easyEdu_ItemCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_InventoryTransactions",
                table: "easyEdu_InventoryTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Inventories",
                table: "easyEdu_Inventories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Incomes",
                table: "easyEdu_Incomes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Incidents",
                table: "easyEdu_Incidents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_HomeworkSubmissions",
                table: "easyEdu_HomeworkSubmissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Homeworks",
                table: "easyEdu_Homeworks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_HomeSliders",
                table: "easyEdu_HomeSliders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_GmeetVirtualMeetings",
                table: "easyEdu_GmeetVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_GmeetVirtualClasses",
                table: "easyEdu_GmeetVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_GmeetSettings",
                table: "easyEdu_GmeetSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_GalleryItems",
                table: "easyEdu_GalleryItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FundTransfers",
                table: "easyEdu_FundTransfers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FrontSettings",
                table: "easyEdu_FrontSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FrontCourses",
                table: "easyEdu_FrontCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FormDownloads",
                table: "easyEdu_FormDownloads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeesTypes",
                table: "easyEdu_FeesTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeeStructures",
                table: "easyEdu_FeeStructures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeesInvoices",
                table: "easyEdu_FeesInvoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeesInvoiceDetails",
                table: "easyEdu_FeesInvoiceDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeesGroups",
                table: "easyEdu_FeesGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeesCarryForwards",
                table: "easyEdu_FeesCarryForwards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_FeeCollections",
                table: "easyEdu_FeeCollections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExpertTeachers",
                table: "easyEdu_ExpertTeachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Expenses",
                table: "easyEdu_Expenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamTypes",
                table: "easyEdu_ExamTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamSignatureSettings",
                table: "easyEdu_ExamSignatureSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamSettings",
                table: "easyEdu_ExamSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamSchedules",
                table: "easyEdu_ExamSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamRules",
                table: "easyEdu_ExamRules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamPositions",
                table: "easyEdu_ExamPositions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Examinations",
                table: "easyEdu_Examinations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ExamFormatSettings",
                table: "easyEdu_ExamFormatSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_EvaluationResponses",
                table: "easyEdu_EvaluationResponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_EvaluationCriteria",
                table: "easyEdu_EvaluationCriteria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Drivers",
                table: "easyEdu_Drivers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_DormitoryRooms",
                table: "easyEdu_DormitoryRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Dormitories",
                table: "easyEdu_Dormitories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Designations",
                table: "easyEdu_Designations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Departments",
                table: "easyEdu_Departments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CustomPages",
                table: "easyEdu_CustomPages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CustomFieldValues",
                table: "easyEdu_CustomFieldValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CustomFields",
                table: "easyEdu_CustomFields");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CourseCategories",
                table: "easyEdu_CourseCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ContactMessages",
                table: "easyEdu_ContactMessages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Complaints",
                table: "easyEdu_Complaints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Companies",
                table: "easyEdu_Companies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ClassSections",
                table: "easyEdu_ClassSections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ClassRooms",
                table: "easyEdu_ClassRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Classes",
                table: "easyEdu_Classes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ChatUserSettings",
                table: "easyEdu_ChatUserSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ChatMessages",
                table: "easyEdu_ChatMessages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ChatInvitations",
                table: "easyEdu_ChatInvitations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ChatBlockedUsers",
                table: "easyEdu_ChatBlockedUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_ChartOfAccounts",
                table: "easyEdu_ChartOfAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Certificates",
                table: "easyEdu_Certificates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseTerms",
                table: "easyEdu_CbseTerms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseObservations",
                table: "easyEdu_CbseObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseObservationParameters",
                table: "easyEdu_CbseObservationParameters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseMarkSheetTemplates",
                table: "easyEdu_CbseMarkSheetTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseGrades",
                table: "easyEdu_CbseGrades");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseExamSchedules",
                table: "easyEdu_CbseExamSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseExams",
                table: "easyEdu_CbseExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseAssignObservations",
                table: "easyEdu_CbseAssignObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CbseAssessments",
                table: "easyEdu_CbseAssessments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_CalendarEvents",
                table: "easyEdu_CalendarEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BulkInvoiceSettings",
                table: "easyEdu_BulkInvoiceSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Books",
                table: "easyEdu_Books");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BookIssues",
                table: "easyEdu_BookIssues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BookCategories",
                table: "easyEdu_BookCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BiometricSettings",
                table: "easyEdu_BiometricSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BehaviourSettings",
                table: "easyEdu_BehaviourSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BBBVirtualMeetings",
                table: "easyEdu_BBBVirtualMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BBBVirtualClasses",
                table: "easyEdu_BBBVirtualClasses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BBBSettings",
                table: "easyEdu_BBBSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BBBRecordings",
                table: "easyEdu_BBBRecordings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BankPayments",
                table: "easyEdu_BankPayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_BankAccounts",
                table: "easyEdu_BankAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_Attendances",
                table: "easyEdu_Attendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AssignSubjects",
                table: "easyEdu_AssignSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AssignClassTeachers",
                table: "easyEdu_AssignClassTeachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetUserTokens",
                table: "easyEdu_AspNetUserTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetUsers",
                table: "easyEdu_AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetUserRoles",
                table: "easyEdu_AspNetUserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetUserLogins",
                table: "easyEdu_AspNetUserLogins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetUserClaims",
                table: "easyEdu_AspNetUserClaims");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetRoles",
                table: "easyEdu_AspNetRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AspNetRoleClaims",
                table: "easyEdu_AspNetRoleClaims");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AdmitCardSettings",
                table: "easyEdu_AdmitCardSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AdmissionQuerySettings",
                table: "easyEdu_AdmissionQuerySettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AdmissionQueries",
                table: "easyEdu_AdmissionQueries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AdminSetupItems",
                table: "easyEdu_AdminSetupItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AccountGroups",
                table: "easyEdu_AccountGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AcademicYears",
                table: "easyEdu_AcademicYears");

            migrationBuilder.DropPrimaryKey(
                name: "PK_easyEdu_AboutUsEntries",
                table: "easyEdu_AboutUsEntries");

            migrationBuilder.RenameTable(
                name: "easyEdu_ZoomVirtualMeetings",
                newName: "ZoomVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "easyEdu_ZoomVirtualClasses",
                newName: "ZoomVirtualClasses");

            migrationBuilder.RenameTable(
                name: "easyEdu_ZoomSettings",
                newName: "ZoomSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_WrittenExams",
                newName: "WrittenExams");

            migrationBuilder.RenameTable(
                name: "easyEdu_WhatsAppSettings",
                newName: "WhatsAppSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_WhatsAppLogs",
                newName: "WhatsAppLogs");

            migrationBuilder.RenameTable(
                name: "easyEdu_WhatsAppAgents",
                newName: "WhatsAppAgents");

            migrationBuilder.RenameTable(
                name: "easyEdu_WalletTransactions",
                newName: "WalletTransactions");

            migrationBuilder.RenameTable(
                name: "easyEdu_Vouchers",
                newName: "Vouchers");

            migrationBuilder.RenameTable(
                name: "easyEdu_VoucherDetails",
                newName: "VoucherDetails");

            migrationBuilder.RenameTable(
                name: "easyEdu_VisitorBooks",
                newName: "VisitorBooks");

            migrationBuilder.RenameTable(
                name: "easyEdu_Vehicles",
                newName: "Vehicles");

            migrationBuilder.RenameTable(
                name: "easyEdu_VehicleMaintenances",
                newName: "VehicleMaintenances");

            migrationBuilder.RenameTable(
                name: "easyEdu_UserAuditLogs",
                newName: "UserAuditLogs");

            migrationBuilder.RenameTable(
                name: "easyEdu_Trainings",
                newName: "Trainings");

            migrationBuilder.RenameTable(
                name: "easyEdu_TrainingAttendances",
                newName: "TrainingAttendances");

            migrationBuilder.RenameTable(
                name: "easyEdu_Topics",
                newName: "Topics");

            migrationBuilder.RenameTable(
                name: "easyEdu_TodoTasks",
                newName: "TodoTasks");

            migrationBuilder.RenameTable(
                name: "easyEdu_ToDos",
                newName: "ToDos");

            migrationBuilder.RenameTable(
                name: "easyEdu_TimeTables",
                newName: "TimeTables");

            migrationBuilder.RenameTable(
                name: "easyEdu_ThemeSettings",
                newName: "ThemeSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_Testimonials",
                newName: "Testimonials");

            migrationBuilder.RenameTable(
                name: "easyEdu_Teachers",
                newName: "Teachers");

            migrationBuilder.RenameTable(
                name: "easyEdu_TeacherEvaluations",
                newName: "TeacherEvaluations");

            migrationBuilder.RenameTable(
                name: "easyEdu_TeacherAttendances",
                newName: "TeacherAttendances");

            migrationBuilder.RenameTable(
                name: "easyEdu_SystemSettings",
                newName: "SystemSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_SystemModules",
                newName: "SystemModules");

            migrationBuilder.RenameTable(
                name: "easyEdu_Suppliers",
                newName: "Suppliers");

            migrationBuilder.RenameTable(
                name: "easyEdu_SubjectWiseAttendances",
                newName: "SubjectWiseAttendances");

            migrationBuilder.RenameTable(
                name: "easyEdu_Subjects",
                newName: "Subjects");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudyMaterials",
                newName: "StudyMaterials");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentSettings",
                newName: "StudentSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_Students",
                newName: "Students");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentPromotions",
                newName: "StudentPromotions");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentOptionalSubjects",
                newName: "StudentOptionalSubjects");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentIncidents",
                newName: "StudentIncidents");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentGroups",
                newName: "StudentGroups");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentDocuments",
                newName: "StudentDocuments");

            migrationBuilder.RenameTable(
                name: "easyEdu_StudentCategories",
                newName: "StudentCategories");

            migrationBuilder.RenameTable(
                name: "easyEdu_StaffSettings",
                newName: "StaffSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_SocialMedias",
                newName: "SocialMedias");

            migrationBuilder.RenameTable(
                name: "easyEdu_Sections",
                newName: "Sections");

            migrationBuilder.RenameTable(
                name: "easyEdu_SeatPlanSettings",
                newName: "SeatPlanSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_Routes",
                newName: "Routes");

            migrationBuilder.RenameTable(
                name: "easyEdu_RegistrationSubmissions",
                newName: "RegistrationSubmissions");

            migrationBuilder.RenameTable(
                name: "easyEdu_QuestionGroups",
                newName: "QuestionGroups");

            migrationBuilder.RenameTable(
                name: "easyEdu_QuestionBanks",
                newName: "QuestionBanks");

            migrationBuilder.RenameTable(
                name: "easyEdu_QrAttendanceSettings",
                newName: "QrAttendanceSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_PostalLogs",
                newName: "PostalLogs");

            migrationBuilder.RenameTable(
                name: "easyEdu_PhoneCallLogs",
                newName: "PhoneCallLogs");

            migrationBuilder.RenameTable(
                name: "easyEdu_Payrolls",
                newName: "Payrolls");

            migrationBuilder.RenameTable(
                name: "easyEdu_Parents",
                newName: "Parents");

            migrationBuilder.RenameTable(
                name: "easyEdu_OnlineRegistrationSettings",
                newName: "OnlineRegistrationSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_OnlineExamSettings",
                newName: "OnlineExamSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_OnlineExams",
                newName: "OnlineExams");

            migrationBuilder.RenameTable(
                name: "easyEdu_Notifications",
                newName: "Notifications");

            migrationBuilder.RenameTable(
                name: "easyEdu_Notices",
                newName: "Notices");

            migrationBuilder.RenameTable(
                name: "easyEdu_NewsPosts",
                newName: "NewsPosts");

            migrationBuilder.RenameTable(
                name: "easyEdu_NewsComments",
                newName: "NewsComments");

            migrationBuilder.RenameTable(
                name: "easyEdu_NewsCategories",
                newName: "NewsCategories");

            migrationBuilder.RenameTable(
                name: "easyEdu_MessageTemplates",
                newName: "MessageTemplates");

            migrationBuilder.RenameTable(
                name: "easyEdu_MessageLogs",
                newName: "MessageLogs");

            migrationBuilder.RenameTable(
                name: "easyEdu_MenuItems",
                newName: "MenuItems");

            migrationBuilder.RenameTable(
                name: "easyEdu_Marks",
                newName: "Marks");

            migrationBuilder.RenameTable(
                name: "easyEdu_MarkGrades",
                newName: "MarkGrades");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsSettings",
                newName: "LmsSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsPurchaseLogs",
                newName: "LmsPurchaseLogs");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsFeesInvoices",
                newName: "LmsFeesInvoices");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsEnrollments",
                newName: "LmsEnrollments");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsCourses",
                newName: "LmsCourses");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsCourseLevels",
                newName: "LmsCourseLevels");

            migrationBuilder.RenameTable(
                name: "easyEdu_LmsCategories",
                newName: "LmsCategories");

            migrationBuilder.RenameTable(
                name: "easyEdu_LibraryMembers",
                newName: "LibraryMembers");

            migrationBuilder.RenameTable(
                name: "easyEdu_Lessons",
                newName: "Lessons");

            migrationBuilder.RenameTable(
                name: "easyEdu_LessonPlanSettings",
                newName: "LessonPlanSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_LessonPlans",
                newName: "LessonPlans");

            migrationBuilder.RenameTable(
                name: "easyEdu_Ledgers",
                newName: "Ledgers");

            migrationBuilder.RenameTable(
                name: "easyEdu_LeaveTypes",
                newName: "LeaveTypes");

            migrationBuilder.RenameTable(
                name: "easyEdu_LeaveRequests",
                newName: "LeaveRequests");

            migrationBuilder.RenameTable(
                name: "easyEdu_LeaveDefines",
                newName: "LeaveDefines");

            migrationBuilder.RenameTable(
                name: "easyEdu_JitsiVirtualMeetings",
                newName: "JitsiVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "easyEdu_JitsiVirtualClasses",
                newName: "JitsiVirtualClasses");

            migrationBuilder.RenameTable(
                name: "easyEdu_JitsiSettings",
                newName: "JitsiSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_ItemStores",
                newName: "ItemStores");

            migrationBuilder.RenameTable(
                name: "easyEdu_ItemReceives",
                newName: "ItemReceives");

            migrationBuilder.RenameTable(
                name: "easyEdu_ItemCategories",
                newName: "ItemCategories");

            migrationBuilder.RenameTable(
                name: "easyEdu_InventoryTransactions",
                newName: "InventoryTransactions");

            migrationBuilder.RenameTable(
                name: "easyEdu_Inventories",
                newName: "Inventories");

            migrationBuilder.RenameTable(
                name: "easyEdu_Incomes",
                newName: "Incomes");

            migrationBuilder.RenameTable(
                name: "easyEdu_Incidents",
                newName: "Incidents");

            migrationBuilder.RenameTable(
                name: "easyEdu_HomeworkSubmissions",
                newName: "HomeworkSubmissions");

            migrationBuilder.RenameTable(
                name: "easyEdu_Homeworks",
                newName: "Homeworks");

            migrationBuilder.RenameTable(
                name: "easyEdu_HomeSliders",
                newName: "HomeSliders");

            migrationBuilder.RenameTable(
                name: "easyEdu_GmeetVirtualMeetings",
                newName: "GmeetVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "easyEdu_GmeetVirtualClasses",
                newName: "GmeetVirtualClasses");

            migrationBuilder.RenameTable(
                name: "easyEdu_GmeetSettings",
                newName: "GmeetSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_GalleryItems",
                newName: "GalleryItems");

            migrationBuilder.RenameTable(
                name: "easyEdu_FundTransfers",
                newName: "FundTransfers");

            migrationBuilder.RenameTable(
                name: "easyEdu_FrontSettings",
                newName: "FrontSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_FrontCourses",
                newName: "FrontCourses");

            migrationBuilder.RenameTable(
                name: "easyEdu_FormDownloads",
                newName: "FormDownloads");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeesTypes",
                newName: "FeesTypes");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeeStructures",
                newName: "FeeStructures");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeesInvoices",
                newName: "FeesInvoices");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeesInvoiceDetails",
                newName: "FeesInvoiceDetails");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeesGroups",
                newName: "FeesGroups");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeesCarryForwards",
                newName: "FeesCarryForwards");

            migrationBuilder.RenameTable(
                name: "easyEdu_FeeCollections",
                newName: "FeeCollections");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExpertTeachers",
                newName: "ExpertTeachers");

            migrationBuilder.RenameTable(
                name: "easyEdu_Expenses",
                newName: "Expenses");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamTypes",
                newName: "ExamTypes");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamSignatureSettings",
                newName: "ExamSignatureSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamSettings",
                newName: "ExamSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamSchedules",
                newName: "ExamSchedules");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamRules",
                newName: "ExamRules");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamPositions",
                newName: "ExamPositions");

            migrationBuilder.RenameTable(
                name: "easyEdu_Examinations",
                newName: "Examinations");

            migrationBuilder.RenameTable(
                name: "easyEdu_ExamFormatSettings",
                newName: "ExamFormatSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_EvaluationResponses",
                newName: "EvaluationResponses");

            migrationBuilder.RenameTable(
                name: "easyEdu_EvaluationCriteria",
                newName: "EvaluationCriteria");

            migrationBuilder.RenameTable(
                name: "easyEdu_Drivers",
                newName: "Drivers");

            migrationBuilder.RenameTable(
                name: "easyEdu_DormitoryRooms",
                newName: "DormitoryRooms");

            migrationBuilder.RenameTable(
                name: "easyEdu_Dormitories",
                newName: "Dormitories");

            migrationBuilder.RenameTable(
                name: "easyEdu_Designations",
                newName: "Designations");

            migrationBuilder.RenameTable(
                name: "easyEdu_Departments",
                newName: "Departments");

            migrationBuilder.RenameTable(
                name: "easyEdu_CustomPages",
                newName: "CustomPages");

            migrationBuilder.RenameTable(
                name: "easyEdu_CustomFieldValues",
                newName: "CustomFieldValues");

            migrationBuilder.RenameTable(
                name: "easyEdu_CustomFields",
                newName: "CustomFields");

            migrationBuilder.RenameTable(
                name: "easyEdu_CourseCategories",
                newName: "CourseCategories");

            migrationBuilder.RenameTable(
                name: "easyEdu_ContactMessages",
                newName: "ContactMessages");

            migrationBuilder.RenameTable(
                name: "easyEdu_Complaints",
                newName: "Complaints");

            migrationBuilder.RenameTable(
                name: "easyEdu_Companies",
                newName: "Companies");

            migrationBuilder.RenameTable(
                name: "easyEdu_ClassSections",
                newName: "ClassSections");

            migrationBuilder.RenameTable(
                name: "easyEdu_ClassRooms",
                newName: "ClassRooms");

            migrationBuilder.RenameTable(
                name: "easyEdu_Classes",
                newName: "Classes");

            migrationBuilder.RenameTable(
                name: "easyEdu_ChatUserSettings",
                newName: "ChatUserSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_ChatMessages",
                newName: "ChatMessages");

            migrationBuilder.RenameTable(
                name: "easyEdu_ChatInvitations",
                newName: "ChatInvitations");

            migrationBuilder.RenameTable(
                name: "easyEdu_ChatBlockedUsers",
                newName: "ChatBlockedUsers");

            migrationBuilder.RenameTable(
                name: "easyEdu_ChartOfAccounts",
                newName: "ChartOfAccounts");

            migrationBuilder.RenameTable(
                name: "easyEdu_Certificates",
                newName: "Certificates");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseTerms",
                newName: "CbseTerms");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseObservations",
                newName: "CbseObservations");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseObservationParameters",
                newName: "CbseObservationParameters");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseMarkSheetTemplates",
                newName: "CbseMarkSheetTemplates");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseGrades",
                newName: "CbseGrades");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseExamSchedules",
                newName: "CbseExamSchedules");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseExams",
                newName: "CbseExams");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseAssignObservations",
                newName: "CbseAssignObservations");

            migrationBuilder.RenameTable(
                name: "easyEdu_CbseAssessments",
                newName: "CbseAssessments");

            migrationBuilder.RenameTable(
                name: "easyEdu_CalendarEvents",
                newName: "CalendarEvents");

            migrationBuilder.RenameTable(
                name: "easyEdu_BulkInvoiceSettings",
                newName: "BulkInvoiceSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_Books",
                newName: "Books");

            migrationBuilder.RenameTable(
                name: "easyEdu_BookIssues",
                newName: "BookIssues");

            migrationBuilder.RenameTable(
                name: "easyEdu_BookCategories",
                newName: "BookCategories");

            migrationBuilder.RenameTable(
                name: "easyEdu_BiometricSettings",
                newName: "BiometricSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_BehaviourSettings",
                newName: "BehaviourSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_BBBVirtualMeetings",
                newName: "BBBVirtualMeetings");

            migrationBuilder.RenameTable(
                name: "easyEdu_BBBVirtualClasses",
                newName: "BBBVirtualClasses");

            migrationBuilder.RenameTable(
                name: "easyEdu_BBBSettings",
                newName: "BBBSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_BBBRecordings",
                newName: "BBBRecordings");

            migrationBuilder.RenameTable(
                name: "easyEdu_BankPayments",
                newName: "BankPayments");

            migrationBuilder.RenameTable(
                name: "easyEdu_BankAccounts",
                newName: "BankAccounts");

            migrationBuilder.RenameTable(
                name: "easyEdu_Attendances",
                newName: "Attendances");

            migrationBuilder.RenameTable(
                name: "easyEdu_AssignSubjects",
                newName: "AssignSubjects");

            migrationBuilder.RenameTable(
                name: "easyEdu_AssignClassTeachers",
                newName: "AssignClassTeachers");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetUserTokens",
                newName: "AspNetUserTokens");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetUsers",
                newName: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetUserRoles",
                newName: "AspNetUserRoles");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetUserLogins",
                newName: "AspNetUserLogins");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetUserClaims",
                newName: "AspNetUserClaims");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetRoles",
                newName: "AspNetRoles");

            migrationBuilder.RenameTable(
                name: "easyEdu_AspNetRoleClaims",
                newName: "AspNetRoleClaims");

            migrationBuilder.RenameTable(
                name: "easyEdu_AdmitCardSettings",
                newName: "AdmitCardSettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_AdmissionQuerySettings",
                newName: "AdmissionQuerySettings");

            migrationBuilder.RenameTable(
                name: "easyEdu_AdmissionQueries",
                newName: "AdmissionQueries");

            migrationBuilder.RenameTable(
                name: "easyEdu_AdminSetupItems",
                newName: "AdminSetupItems");

            migrationBuilder.RenameTable(
                name: "easyEdu_AccountGroups",
                newName: "AccountGroups");

            migrationBuilder.RenameTable(
                name: "easyEdu_AcademicYears",
                newName: "AcademicYears");

            migrationBuilder.RenameTable(
                name: "easyEdu_AboutUsEntries",
                newName: "AboutUsEntries");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ZoomVirtualMeetings_CompanyId",
                table: "ZoomVirtualMeetings",
                newName: "IX_ZoomVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ZoomVirtualClasses_SubjectId",
                table: "ZoomVirtualClasses",
                newName: "IX_ZoomVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ZoomVirtualClasses_SectionId",
                table: "ZoomVirtualClasses",
                newName: "IX_ZoomVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ZoomVirtualClasses_CompanyId",
                table: "ZoomVirtualClasses",
                newName: "IX_ZoomVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ZoomVirtualClasses_ClassId",
                table: "ZoomVirtualClasses",
                newName: "IX_ZoomVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ZoomSettings_CompanyId",
                table: "ZoomSettings",
                newName: "IX_ZoomSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_WrittenExams_CompanyId",
                table: "WrittenExams",
                newName: "IX_WrittenExams_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_WhatsAppSettings_CompanyId",
                table: "WhatsAppSettings",
                newName: "IX_WhatsAppSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_WhatsAppLogs_CompanyId",
                table: "WhatsAppLogs",
                newName: "IX_WhatsAppLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_WhatsAppAgents_CompanyId",
                table: "WhatsAppAgents",
                newName: "IX_WhatsAppAgents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_WalletTransactions_StudentId1",
                table: "WalletTransactions",
                newName: "IX_WalletTransactions_StudentId1");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_WalletTransactions_StudentId",
                table: "WalletTransactions",
                newName: "IX_WalletTransactions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_VoucherDetails_VoucherId",
                table: "VoucherDetails",
                newName: "IX_VoucherDetails_VoucherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_VoucherDetails_LedgerId",
                table: "VoucherDetails",
                newName: "IX_VoucherDetails_LedgerId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_VoucherDetails_InventoryId",
                table: "VoucherDetails",
                newName: "IX_VoucherDetails_InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_VisitorBooks_CompanyId",
                table: "VisitorBooks",
                newName: "IX_VisitorBooks_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Vehicles_RouteId",
                table: "Vehicles",
                newName: "IX_Vehicles_RouteId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Vehicles_DriverId",
                table: "Vehicles",
                newName: "IX_Vehicles_DriverId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Vehicles_CompanyId",
                table: "Vehicles",
                newName: "IX_Vehicles_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_VehicleMaintenances_VehicleId",
                table: "VehicleMaintenances",
                newName: "IX_VehicleMaintenances_VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_UserAuditLogs_UserId",
                table: "UserAuditLogs",
                newName: "IX_UserAuditLogs_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_UserAuditLogs_CompanyId",
                table: "UserAuditLogs",
                newName: "IX_UserAuditLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Trainings_CompanyId",
                table: "Trainings",
                newName: "IX_Trainings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TrainingAttendances_TrainingId",
                table: "TrainingAttendances",
                newName: "IX_TrainingAttendances_TrainingId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TrainingAttendances_TeacherId",
                table: "TrainingAttendances",
                newName: "IX_TrainingAttendances_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Topics_LessonId",
                table: "Topics",
                newName: "IX_Topics_LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TodoTasks_UserId",
                table: "TodoTasks",
                newName: "IX_TodoTasks_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TodoTasks_CompanyId",
                table: "TodoTasks",
                newName: "IX_TodoTasks_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TimeTables_TeacherId",
                table: "TimeTables",
                newName: "IX_TimeTables_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TimeTables_SubjectId",
                table: "TimeTables",
                newName: "IX_TimeTables_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TimeTables_SectionId",
                table: "TimeTables",
                newName: "IX_TimeTables_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TimeTables_ClassRoomId",
                table: "TimeTables",
                newName: "IX_TimeTables_ClassRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TimeTables_ClassId",
                table: "TimeTables",
                newName: "IX_TimeTables_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ThemeSettings_CompanyId",
                table: "ThemeSettings",
                newName: "IX_ThemeSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Teachers_UserId",
                table: "Teachers",
                newName: "IX_Teachers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Teachers_EmployeeNumber",
                table: "Teachers",
                newName: "IX_Teachers_EmployeeNumber");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Teachers_DesignationId",
                table: "Teachers",
                newName: "IX_Teachers_DesignationId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Teachers_DepartmentId",
                table: "Teachers",
                newName: "IX_Teachers_DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Teachers_CompanyId",
                table: "Teachers",
                newName: "IX_Teachers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TeacherEvaluations_TeacherId",
                table: "TeacherEvaluations",
                newName: "IX_TeacherEvaluations_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_TeacherAttendances_TeacherId",
                table: "TeacherAttendances",
                newName: "IX_TeacherAttendances_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_SystemSettings_CompanyId",
                table: "SystemSettings",
                newName: "IX_SystemSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_SystemModules_CompanyId",
                table: "SystemModules",
                newName: "IX_SystemModules_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_SubjectWiseAttendances_SubjectId",
                table: "SubjectWiseAttendances",
                newName: "IX_SubjectWiseAttendances_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_SubjectWiseAttendances_StudentId",
                table: "SubjectWiseAttendances",
                newName: "IX_SubjectWiseAttendances_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Subjects_TeacherId",
                table: "Subjects",
                newName: "IX_Subjects_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Subjects_ClassId",
                table: "Subjects",
                newName: "IX_Subjects_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudyMaterials_SubjectId",
                table: "StudyMaterials",
                newName: "IX_StudyMaterials_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudyMaterials_ClassId",
                table: "StudyMaterials",
                newName: "IX_StudyMaterials_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentSettings_CompanyId",
                table: "StudentSettings",
                newName: "IX_StudentSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_UserId",
                table: "Students",
                newName: "IX_Students_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_StudentCategoryId",
                table: "Students",
                newName: "IX_Students_StudentCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_SectionId",
                table: "Students",
                newName: "IX_Students_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_RouteId",
                table: "Students",
                newName: "IX_Students_RouteId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_DormitoryRoomId",
                table: "Students",
                newName: "IX_Students_DormitoryRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_DormitoryId",
                table: "Students",
                newName: "IX_Students_DormitoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_CompanyId",
                table: "Students",
                newName: "IX_Students_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_ClassId",
                table: "Students",
                newName: "IX_Students_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Students_AdmissionNumber",
                table: "Students",
                newName: "IX_Students_AdmissionNumber");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentPromotions_StudentId",
                table: "StudentPromotions",
                newName: "IX_StudentPromotions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentOptionalSubjects_SubjectId",
                table: "StudentOptionalSubjects",
                newName: "IX_StudentOptionalSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentOptionalSubjects_StudentId",
                table: "StudentOptionalSubjects",
                newName: "IX_StudentOptionalSubjects_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentOptionalSubjects_AcademicYearId",
                table: "StudentOptionalSubjects",
                newName: "IX_StudentOptionalSubjects_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentIncidents_StudentId",
                table: "StudentIncidents",
                newName: "IX_StudentIncidents_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentIncidents_IncidentId",
                table: "StudentIncidents",
                newName: "IX_StudentIncidents_IncidentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentGroups_CompanyId",
                table: "StudentGroups",
                newName: "IX_StudentGroups_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StudentDocuments_StudentId",
                table: "StudentDocuments",
                newName: "IX_StudentDocuments_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_StaffSettings_CompanyId",
                table: "StaffSettings",
                newName: "IX_StaffSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Routes_CompanyId",
                table: "Routes",
                newName: "IX_Routes_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_RegistrationSubmissions_CompanyId",
                table: "RegistrationSubmissions",
                newName: "IX_RegistrationSubmissions_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_RegistrationSubmissions_ClassId",
                table: "RegistrationSubmissions",
                newName: "IX_RegistrationSubmissions_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_RegistrationSubmissions_AcademicYearId",
                table: "RegistrationSubmissions",
                newName: "IX_RegistrationSubmissions_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_QuestionBanks_QuestionGroupId",
                table: "QuestionBanks",
                newName: "IX_QuestionBanks_QuestionGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_QrAttendanceSettings_CompanyId",
                table: "QrAttendanceSettings",
                newName: "IX_QrAttendanceSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_PostalLogs_CompanyId",
                table: "PostalLogs",
                newName: "IX_PostalLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_PhoneCallLogs_CompanyId",
                table: "PhoneCallLogs",
                newName: "IX_PhoneCallLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Payrolls_TeacherId",
                table: "Payrolls",
                newName: "IX_Payrolls_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Parents_UserId",
                table: "Parents",
                newName: "IX_Parents_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Parents_StudentId",
                table: "Parents",
                newName: "IX_Parents_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_OnlineRegistrationSettings_CompanyId",
                table: "OnlineRegistrationSettings",
                newName: "IX_OnlineRegistrationSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_OnlineExamSettings_CompanyId",
                table: "OnlineExamSettings",
                newName: "IX_OnlineExamSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Notices_CompanyId",
                table: "Notices",
                newName: "IX_Notices_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_NewsPosts_CategoryId",
                table: "NewsPosts",
                newName: "IX_NewsPosts_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_NewsComments_NewsPostId",
                table: "NewsComments",
                newName: "IX_NewsComments_NewsPostId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_MessageTemplates_CompanyId",
                table: "MessageTemplates",
                newName: "IX_MessageTemplates_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_MessageLogs_CompanyId",
                table: "MessageLogs",
                newName: "IX_MessageLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_MenuItems_ParentId",
                table: "MenuItems",
                newName: "IX_MenuItems_ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Marks_SubjectId",
                table: "Marks",
                newName: "IX_Marks_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Marks_StudentId",
                table: "Marks",
                newName: "IX_Marks_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Marks_ExaminationId",
                table: "Marks",
                newName: "IX_Marks_ExaminationId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsSettings_CompanyId",
                table: "LmsSettings",
                newName: "IX_LmsSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsPurchaseLogs_StudentId",
                table: "LmsPurchaseLogs",
                newName: "IX_LmsPurchaseLogs_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsPurchaseLogs_CourseId",
                table: "LmsPurchaseLogs",
                newName: "IX_LmsPurchaseLogs_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsPurchaseLogs_CompanyId",
                table: "LmsPurchaseLogs",
                newName: "IX_LmsPurchaseLogs_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsFeesInvoices_StudentId",
                table: "LmsFeesInvoices",
                newName: "IX_LmsFeesInvoices_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsFeesInvoices_CompanyId",
                table: "LmsFeesInvoices",
                newName: "IX_LmsFeesInvoices_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsEnrollments_StudentId",
                table: "LmsEnrollments",
                newName: "IX_LmsEnrollments_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsEnrollments_CourseId",
                table: "LmsEnrollments",
                newName: "IX_LmsEnrollments_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsCourses_LevelId",
                table: "LmsCourses",
                newName: "IX_LmsCourses_LevelId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsCourses_CompanyId",
                table: "LmsCourses",
                newName: "IX_LmsCourses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsCourses_CategoryId",
                table: "LmsCourses",
                newName: "IX_LmsCourses_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsCourseLevels_CompanyId",
                table: "LmsCourseLevels",
                newName: "IX_LmsCourseLevels_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LmsCategories_CompanyId",
                table: "LmsCategories",
                newName: "IX_LmsCategories_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LibraryMembers_StudentId",
                table: "LibraryMembers",
                newName: "IX_LibraryMembers_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LibraryMembers_StaffId",
                table: "LibraryMembers",
                newName: "IX_LibraryMembers_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Lessons_SubjectId",
                table: "Lessons",
                newName: "IX_Lessons_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Lessons_ClassId",
                table: "Lessons",
                newName: "IX_Lessons_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LessonPlanSettings_CompanyId",
                table: "LessonPlanSettings",
                newName: "IX_LessonPlanSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LessonPlans_TopicId",
                table: "LessonPlans",
                newName: "IX_LessonPlans_TopicId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LessonPlans_TeacherId",
                table: "LessonPlans",
                newName: "IX_LessonPlans_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LessonPlans_LessonId",
                table: "LessonPlans",
                newName: "IX_LessonPlans_LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Ledgers_AccountGroupId",
                table: "Ledgers",
                newName: "IX_Ledgers_AccountGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LeaveTypes_CompanyId",
                table: "LeaveTypes",
                newName: "IX_LeaveTypes_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LeaveRequests_UserId",
                table: "LeaveRequests",
                newName: "IX_LeaveRequests_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LeaveRequests_LeaveTypeId",
                table: "LeaveRequests",
                newName: "IX_LeaveRequests_LeaveTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_LeaveDefines_LeaveTypeId",
                table: "LeaveDefines",
                newName: "IX_LeaveDefines_LeaveTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_JitsiVirtualMeetings_CompanyId",
                table: "JitsiVirtualMeetings",
                newName: "IX_JitsiVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_JitsiVirtualClasses_SubjectId",
                table: "JitsiVirtualClasses",
                newName: "IX_JitsiVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_JitsiVirtualClasses_SectionId",
                table: "JitsiVirtualClasses",
                newName: "IX_JitsiVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_JitsiVirtualClasses_CompanyId",
                table: "JitsiVirtualClasses",
                newName: "IX_JitsiVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_JitsiVirtualClasses_ClassId",
                table: "JitsiVirtualClasses",
                newName: "IX_JitsiVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_JitsiSettings_CompanyId",
                table: "JitsiSettings",
                newName: "IX_JitsiSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ItemReceives_SupplierId",
                table: "ItemReceives",
                newName: "IX_ItemReceives_SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ItemReceives_InventoryId",
                table: "ItemReceives",
                newName: "IX_ItemReceives_InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_InventoryTransactions_StudentId",
                table: "InventoryTransactions",
                newName: "IX_InventoryTransactions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_InventoryTransactions_InventoryId",
                table: "InventoryTransactions",
                newName: "IX_InventoryTransactions_InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Inventories_CompanyId",
                table: "Inventories",
                newName: "IX_Inventories_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Inventories_CategoryId",
                table: "Inventories",
                newName: "IX_Inventories_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Incidents_CompanyId",
                table: "Incidents",
                newName: "IX_Incidents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_HomeworkSubmissions_StudentId",
                table: "HomeworkSubmissions",
                newName: "IX_HomeworkSubmissions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_HomeworkSubmissions_HomeworkId",
                table: "HomeworkSubmissions",
                newName: "IX_HomeworkSubmissions_HomeworkId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Homeworks_SubjectId",
                table: "Homeworks",
                newName: "IX_Homeworks_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Homeworks_ClassId",
                table: "Homeworks",
                newName: "IX_Homeworks_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_GmeetVirtualMeetings_CompanyId",
                table: "GmeetVirtualMeetings",
                newName: "IX_GmeetVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_GmeetVirtualClasses_SubjectId",
                table: "GmeetVirtualClasses",
                newName: "IX_GmeetVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_GmeetVirtualClasses_SectionId",
                table: "GmeetVirtualClasses",
                newName: "IX_GmeetVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_GmeetVirtualClasses_CompanyId",
                table: "GmeetVirtualClasses",
                newName: "IX_GmeetVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_GmeetVirtualClasses_ClassId",
                table: "GmeetVirtualClasses",
                newName: "IX_GmeetVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_GmeetSettings_CompanyId",
                table: "GmeetSettings",
                newName: "IX_GmeetSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FrontCourses_CategoryId",
                table: "FrontCourses",
                newName: "IX_FrontCourses_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesTypes_FeesGroupId",
                table: "FeesTypes",
                newName: "IX_FeesTypes_FeesGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeeStructures_ClassId",
                table: "FeeStructures",
                newName: "IX_FeeStructures_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesInvoices_StudentId1",
                table: "FeesInvoices",
                newName: "IX_FeesInvoices_StudentId1");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesInvoices_StudentId",
                table: "FeesInvoices",
                newName: "IX_FeesInvoices_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesInvoices_AcademicYearId",
                table: "FeesInvoices",
                newName: "IX_FeesInvoices_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesInvoiceDetails_FeesTypeId",
                table: "FeesInvoiceDetails",
                newName: "IX_FeesInvoiceDetails_FeesTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesInvoiceDetails_FeesInvoiceId",
                table: "FeesInvoiceDetails",
                newName: "IX_FeesInvoiceDetails_FeesInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesGroups_CompanyId",
                table: "FeesGroups",
                newName: "IX_FeesGroups_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeesCarryForwards_StudentId",
                table: "FeesCarryForwards",
                newName: "IX_FeesCarryForwards_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeeCollections_StudentId",
                table: "FeeCollections",
                newName: "IX_FeeCollections_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeeCollections_FeeStructureId",
                table: "FeeCollections",
                newName: "IX_FeeCollections_FeeStructureId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_FeeCollections_FeesInvoiceId",
                table: "FeeCollections",
                newName: "IX_FeeCollections_FeesInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExpertTeachers_TeacherId",
                table: "ExpertTeachers",
                newName: "IX_ExpertTeachers_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Expenses_CompanyId",
                table: "Expenses",
                newName: "IX_Expenses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamSettings_CompanyId",
                table: "ExamSettings",
                newName: "IX_ExamSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamSchedules_SubjectId",
                table: "ExamSchedules",
                newName: "IX_ExamSchedules_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamSchedules_SectionId",
                table: "ExamSchedules",
                newName: "IX_ExamSchedules_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamSchedules_ExaminationId",
                table: "ExamSchedules",
                newName: "IX_ExamSchedules_ExaminationId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamSchedules_ClassRoomId",
                table: "ExamSchedules",
                newName: "IX_ExamSchedules_ClassRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamSchedules_ClassId",
                table: "ExamSchedules",
                newName: "IX_ExamSchedules_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamPositions_StudentId",
                table: "ExamPositions",
                newName: "IX_ExamPositions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ExamPositions_ExaminationId",
                table: "ExamPositions",
                newName: "IX_ExamPositions_ExaminationId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Examinations_AcademicYearId",
                table: "Examinations",
                newName: "IX_Examinations_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_EvaluationResponses_TeacherEvaluationId",
                table: "EvaluationResponses",
                newName: "IX_EvaluationResponses_TeacherEvaluationId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_EvaluationResponses_EvaluationCriterionId",
                table: "EvaluationResponses",
                newName: "IX_EvaluationResponses_EvaluationCriterionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Drivers_CompanyId",
                table: "Drivers",
                newName: "IX_Drivers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_DormitoryRooms_DormitoryId",
                table: "DormitoryRooms",
                newName: "IX_DormitoryRooms_DormitoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Designations_CompanyId",
                table: "Designations",
                newName: "IX_Designations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Departments_CompanyId",
                table: "Departments",
                newName: "IX_Departments_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CustomFieldValues_CustomFieldId",
                table: "CustomFieldValues",
                newName: "IX_CustomFieldValues_CustomFieldId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CustomFields_CompanyId",
                table: "CustomFields",
                newName: "IX_CustomFields_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Complaints_CompanyId",
                table: "Complaints",
                newName: "IX_Complaints_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ClassSections_SectionId",
                table: "ClassSections",
                newName: "IX_ClassSections_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ClassSections_ClassId",
                table: "ClassSections",
                newName: "IX_ClassSections_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Classes_CompanyId",
                table: "Classes",
                newName: "IX_Classes_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Classes_AcademicYearId",
                table: "Classes",
                newName: "IX_Classes_AcademicYearId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatUserSettings_UserId",
                table: "ChatUserSettings",
                newName: "IX_ChatUserSettings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatUserSettings_CompanyId",
                table: "ChatUserSettings",
                newName: "IX_ChatUserSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatMessages_SenderId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatMessages_ReceiverId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatMessages_CompanyId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatInvitations_SenderId",
                table: "ChatInvitations",
                newName: "IX_ChatInvitations_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatInvitations_ReceiverId",
                table: "ChatInvitations",
                newName: "IX_ChatInvitations_ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatInvitations_CompanyId",
                table: "ChatInvitations",
                newName: "IX_ChatInvitations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatBlockedUsers_CompanyId",
                table: "ChatBlockedUsers",
                newName: "IX_ChatBlockedUsers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatBlockedUsers_BlockerId",
                table: "ChatBlockedUsers",
                newName: "IX_ChatBlockedUsers_BlockerId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_ChatBlockedUsers_BlockedId",
                table: "ChatBlockedUsers",
                newName: "IX_ChatBlockedUsers_BlockedId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Certificates_StudentId",
                table: "Certificates",
                newName: "IX_Certificates_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Certificates_CertificateNumber",
                table: "Certificates",
                newName: "IX_Certificates_CertificateNumber");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseTerms_CompanyId",
                table: "CbseTerms",
                newName: "IX_CbseTerms_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseObservations_CompanyId",
                table: "CbseObservations",
                newName: "IX_CbseObservations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseObservationParameters_ObservationId",
                table: "CbseObservationParameters",
                newName: "IX_CbseObservationParameters_ObservationId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseMarkSheetTemplates_CompanyId",
                table: "CbseMarkSheetTemplates",
                newName: "IX_CbseMarkSheetTemplates_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseGrades_CompanyId",
                table: "CbseGrades",
                newName: "IX_CbseGrades_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseExamSchedules_SubjectId",
                table: "CbseExamSchedules",
                newName: "IX_CbseExamSchedules_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseExamSchedules_ClassId",
                table: "CbseExamSchedules",
                newName: "IX_CbseExamSchedules_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseExamSchedules_CbseExamId",
                table: "CbseExamSchedules",
                newName: "IX_CbseExamSchedules_CbseExamId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseExams_TermId",
                table: "CbseExams",
                newName: "IX_CbseExams_TermId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseExams_CompanyId",
                table: "CbseExams",
                newName: "IX_CbseExams_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseAssignObservations_StudentId",
                table: "CbseAssignObservations",
                newName: "IX_CbseAssignObservations_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseAssignObservations_ParameterId",
                table: "CbseAssignObservations",
                newName: "IX_CbseAssignObservations_ParameterId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CbseAssessments_CompanyId",
                table: "CbseAssessments",
                newName: "IX_CbseAssessments_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_CalendarEvents_CompanyId",
                table: "CalendarEvents",
                newName: "IX_CalendarEvents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Books_CompanyId",
                table: "Books",
                newName: "IX_Books_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Books_CategoryId",
                table: "Books",
                newName: "IX_Books_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BookIssues_StudentId",
                table: "BookIssues",
                newName: "IX_BookIssues_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BookIssues_BookId",
                table: "BookIssues",
                newName: "IX_BookIssues_BookId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BiometricSettings_CompanyId",
                table: "BiometricSettings",
                newName: "IX_BiometricSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BehaviourSettings_CompanyId",
                table: "BehaviourSettings",
                newName: "IX_BehaviourSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBVirtualMeetings_CompanyId",
                table: "BBBVirtualMeetings",
                newName: "IX_BBBVirtualMeetings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBVirtualClasses_SubjectId",
                table: "BBBVirtualClasses",
                newName: "IX_BBBVirtualClasses_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBVirtualClasses_SectionId",
                table: "BBBVirtualClasses",
                newName: "IX_BBBVirtualClasses_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBVirtualClasses_CompanyId",
                table: "BBBVirtualClasses",
                newName: "IX_BBBVirtualClasses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBVirtualClasses_ClassId",
                table: "BBBVirtualClasses",
                newName: "IX_BBBVirtualClasses_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBSettings_CompanyId",
                table: "BBBSettings",
                newName: "IX_BBBSettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BBBRecordings_CompanyId",
                table: "BBBRecordings",
                newName: "IX_BBBRecordings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BankPayments_StudentId",
                table: "BankPayments",
                newName: "IX_BankPayments_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_BankPayments_FeesInvoiceId",
                table: "BankPayments",
                newName: "IX_BankPayments_FeesInvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_Attendances_StudentId",
                table: "Attendances",
                newName: "IX_Attendances_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignSubjects_TeacherId",
                table: "AssignSubjects",
                newName: "IX_AssignSubjects_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignSubjects_SubjectId",
                table: "AssignSubjects",
                newName: "IX_AssignSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignSubjects_SectionId",
                table: "AssignSubjects",
                newName: "IX_AssignSubjects_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignSubjects_ClassId",
                table: "AssignSubjects",
                newName: "IX_AssignSubjects_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignClassTeachers_TeacherId",
                table: "AssignClassTeachers",
                newName: "IX_AssignClassTeachers_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignClassTeachers_SectionId",
                table: "AssignClassTeachers",
                newName: "IX_AssignClassTeachers_SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AssignClassTeachers_ClassId",
                table: "AssignClassTeachers",
                newName: "IX_AssignClassTeachers_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AspNetUsers_CompanyId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                newName: "IX_AspNetUserRoles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                newName: "IX_AspNetUserLogins_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                newName: "IX_AspNetUserClaims_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                newName: "IX_AspNetRoleClaims_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AdmissionQuerySettings_CompanyId",
                table: "AdmissionQuerySettings",
                newName: "IX_AdmissionQuerySettings_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AdmissionQueries_CompanyId",
                table: "AdmissionQueries",
                newName: "IX_AdmissionQueries_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AdmissionQueries_ClassId",
                table: "AdmissionQueries",
                newName: "IX_AdmissionQueries_ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AdminSetupItems_CompanyId",
                table: "AdminSetupItems",
                newName: "IX_AdminSetupItems_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AccountGroups_ParentGroupId",
                table: "AccountGroups",
                newName: "IX_AccountGroups_ParentGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_easyEdu_AcademicYears_CompanyId",
                table: "AcademicYears",
                newName: "IX_AcademicYears_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ZoomVirtualMeetings",
                table: "ZoomVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ZoomVirtualClasses",
                table: "ZoomVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ZoomSettings",
                table: "ZoomSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WrittenExams",
                table: "WrittenExams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WhatsAppSettings",
                table: "WhatsAppSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WhatsAppLogs",
                table: "WhatsAppLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WhatsAppAgents",
                table: "WhatsAppAgents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WalletTransactions",
                table: "WalletTransactions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vouchers",
                table: "Vouchers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VoucherDetails",
                table: "VoucherDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VisitorBooks",
                table: "VisitorBooks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleMaintenances",
                table: "VehicleMaintenances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuditLogs",
                table: "UserAuditLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trainings",
                table: "Trainings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingAttendances",
                table: "TrainingAttendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topics",
                table: "Topics",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TodoTasks",
                table: "TodoTasks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ToDos",
                table: "ToDos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeTables",
                table: "TimeTables",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ThemeSettings",
                table: "ThemeSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Testimonials",
                table: "Testimonials",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teachers",
                table: "Teachers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherEvaluations",
                table: "TeacherEvaluations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherAttendances",
                table: "TeacherAttendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SystemSettings",
                table: "SystemSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SystemModules",
                table: "SystemModules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Suppliers",
                table: "Suppliers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectWiseAttendances",
                table: "SubjectWiseAttendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subjects",
                table: "Subjects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudyMaterials",
                table: "StudyMaterials",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentSettings",
                table: "StudentSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Students",
                table: "Students",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentPromotions",
                table: "StudentPromotions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentOptionalSubjects",
                table: "StudentOptionalSubjects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentIncidents",
                table: "StudentIncidents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentGroups",
                table: "StudentGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentDocuments",
                table: "StudentDocuments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentCategories",
                table: "StudentCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StaffSettings",
                table: "StaffSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SocialMedias",
                table: "SocialMedias",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sections",
                table: "Sections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeatPlanSettings",
                table: "SeatPlanSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Routes",
                table: "Routes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RegistrationSubmissions",
                table: "RegistrationSubmissions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionGroups",
                table: "QuestionGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionBanks",
                table: "QuestionBanks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QrAttendanceSettings",
                table: "QrAttendanceSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostalLogs",
                table: "PostalLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhoneCallLogs",
                table: "PhoneCallLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payrolls",
                table: "Payrolls",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Parents",
                table: "Parents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnlineRegistrationSettings",
                table: "OnlineRegistrationSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnlineExamSettings",
                table: "OnlineExamSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnlineExams",
                table: "OnlineExams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notifications",
                table: "Notifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notices",
                table: "Notices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewsPosts",
                table: "NewsPosts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewsComments",
                table: "NewsComments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewsCategories",
                table: "NewsCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MessageTemplates",
                table: "MessageTemplates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MessageLogs",
                table: "MessageLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenuItems",
                table: "MenuItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Marks",
                table: "Marks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MarkGrades",
                table: "MarkGrades",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsSettings",
                table: "LmsSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsPurchaseLogs",
                table: "LmsPurchaseLogs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsFeesInvoices",
                table: "LmsFeesInvoices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsEnrollments",
                table: "LmsEnrollments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsCourses",
                table: "LmsCourses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsCourseLevels",
                table: "LmsCourseLevels",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LmsCategories",
                table: "LmsCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LibraryMembers",
                table: "LibraryMembers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lessons",
                table: "Lessons",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonPlanSettings",
                table: "LessonPlanSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonPlans",
                table: "LessonPlans",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ledgers",
                table: "Ledgers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveTypes",
                table: "LeaveTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveRequests",
                table: "LeaveRequests",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveDefines",
                table: "LeaveDefines",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JitsiVirtualMeetings",
                table: "JitsiVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JitsiVirtualClasses",
                table: "JitsiVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JitsiSettings",
                table: "JitsiSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemStores",
                table: "ItemStores",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemReceives",
                table: "ItemReceives",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemCategories",
                table: "ItemCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventoryTransactions",
                table: "InventoryTransactions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Inventories",
                table: "Inventories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Incomes",
                table: "Incomes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Incidents",
                table: "Incidents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HomeworkSubmissions",
                table: "HomeworkSubmissions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Homeworks",
                table: "Homeworks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HomeSliders",
                table: "HomeSliders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GmeetVirtualMeetings",
                table: "GmeetVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GmeetVirtualClasses",
                table: "GmeetVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GmeetSettings",
                table: "GmeetSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GalleryItems",
                table: "GalleryItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FundTransfers",
                table: "FundTransfers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FrontSettings",
                table: "FrontSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FrontCourses",
                table: "FrontCourses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FormDownloads",
                table: "FormDownloads",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeesTypes",
                table: "FeesTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeeStructures",
                table: "FeeStructures",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeesInvoices",
                table: "FeesInvoices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeesInvoiceDetails",
                table: "FeesInvoiceDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeesGroups",
                table: "FeesGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeesCarryForwards",
                table: "FeesCarryForwards",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeeCollections",
                table: "FeeCollections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExpertTeachers",
                table: "ExpertTeachers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Expenses",
                table: "Expenses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamTypes",
                table: "ExamTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamSignatureSettings",
                table: "ExamSignatureSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamSettings",
                table: "ExamSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamSchedules",
                table: "ExamSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamRules",
                table: "ExamRules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamPositions",
                table: "ExamPositions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Examinations",
                table: "Examinations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamFormatSettings",
                table: "ExamFormatSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EvaluationResponses",
                table: "EvaluationResponses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EvaluationCriteria",
                table: "EvaluationCriteria",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Drivers",
                table: "Drivers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DormitoryRooms",
                table: "DormitoryRooms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dormitories",
                table: "Dormitories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Designations",
                table: "Designations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Departments",
                table: "Departments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomPages",
                table: "CustomPages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomFieldValues",
                table: "CustomFieldValues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomFields",
                table: "CustomFields",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseCategories",
                table: "CourseCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactMessages",
                table: "ContactMessages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Complaints",
                table: "Complaints",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassSections",
                table: "ClassSections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassRooms",
                table: "ClassRooms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Classes",
                table: "Classes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatUserSettings",
                table: "ChatUserSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatMessages",
                table: "ChatMessages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatInvitations",
                table: "ChatInvitations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatBlockedUsers",
                table: "ChatBlockedUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChartOfAccounts",
                table: "ChartOfAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Certificates",
                table: "Certificates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseTerms",
                table: "CbseTerms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseObservations",
                table: "CbseObservations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseObservationParameters",
                table: "CbseObservationParameters",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseMarkSheetTemplates",
                table: "CbseMarkSheetTemplates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseGrades",
                table: "CbseGrades",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseExamSchedules",
                table: "CbseExamSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseExams",
                table: "CbseExams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseAssignObservations",
                table: "CbseAssignObservations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CbseAssessments",
                table: "CbseAssessments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CalendarEvents",
                table: "CalendarEvents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BulkInvoiceSettings",
                table: "BulkInvoiceSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Books",
                table: "Books",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookIssues",
                table: "BookIssues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookCategories",
                table: "BookCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BiometricSettings",
                table: "BiometricSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BehaviourSettings",
                table: "BehaviourSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BBBVirtualMeetings",
                table: "BBBVirtualMeetings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BBBVirtualClasses",
                table: "BBBVirtualClasses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BBBSettings",
                table: "BBBSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BBBRecordings",
                table: "BBBRecordings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BankPayments",
                table: "BankPayments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BankAccounts",
                table: "BankAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendances",
                table: "Attendances",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AssignSubjects",
                table: "AssignSubjects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AssignClassTeachers",
                table: "AssignClassTeachers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserTokens",
                table: "AspNetUserTokens",
                columns: new[] { "UserId", "LoginProvider", "Name" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserRoles",
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserLogins",
                table: "AspNetUserLogins",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserClaims",
                table: "AspNetUserClaims",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetRoles",
                table: "AspNetRoles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetRoleClaims",
                table: "AspNetRoleClaims",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdmitCardSettings",
                table: "AdmitCardSettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdmissionQuerySettings",
                table: "AdmissionQuerySettings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdmissionQueries",
                table: "AdmissionQueries",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminSetupItems",
                table: "AdminSetupItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccountGroups",
                table: "AccountGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AcademicYears",
                table: "AcademicYears",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AboutUsEntries",
                table: "AboutUsEntries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AcademicYears_Companies_CompanyId",
                table: "AcademicYears",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AccountGroups_AccountGroups_ParentGroupId",
                table: "AccountGroups",
                column: "ParentGroupId",
                principalTable: "AccountGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AdminSetupItems_Companies_CompanyId",
                table: "AdminSetupItems",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AdmissionQueries_Classes_ClassId",
                table: "AdmissionQueries",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdmissionQueries_Companies_CompanyId",
                table: "AdmissionQueries",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AdmissionQuerySettings_Companies_CompanyId",
                table: "AdmissionQuerySettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Companies_CompanyId",
                table: "AspNetUsers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignClassTeachers_Classes_ClassId",
                table: "AssignClassTeachers",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignClassTeachers_Sections_SectionId",
                table: "AssignClassTeachers",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignClassTeachers_Teachers_TeacherId",
                table: "AssignClassTeachers",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignSubjects_Classes_ClassId",
                table: "AssignSubjects",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignSubjects_Sections_SectionId",
                table: "AssignSubjects",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignSubjects_Subjects_SubjectId",
                table: "AssignSubjects",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignSubjects_Teachers_TeacherId",
                table: "AssignSubjects",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Students_StudentId",
                table: "Attendances",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BankPayments_FeesInvoices_FeesInvoiceId",
                table: "BankPayments",
                column: "FeesInvoiceId",
                principalTable: "FeesInvoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BankPayments_Students_StudentId",
                table: "BankPayments",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBRecordings_Companies_CompanyId",
                table: "BBBRecordings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBSettings_Companies_CompanyId",
                table: "BBBSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBVirtualClasses_Classes_ClassId",
                table: "BBBVirtualClasses",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBVirtualClasses_Companies_CompanyId",
                table: "BBBVirtualClasses",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBVirtualClasses_Sections_SectionId",
                table: "BBBVirtualClasses",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBVirtualClasses_Subjects_SubjectId",
                table: "BBBVirtualClasses",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BBBVirtualMeetings_Companies_CompanyId",
                table: "BBBVirtualMeetings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BehaviourSettings_Companies_CompanyId",
                table: "BehaviourSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BiometricSettings_Companies_CompanyId",
                table: "BiometricSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookIssues_Books_BookId",
                table: "BookIssues",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BookIssues_Students_StudentId",
                table: "BookIssues",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Books_BookCategories_CategoryId",
                table: "Books",
                column: "CategoryId",
                principalTable: "BookCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Companies_CompanyId",
                table: "Books",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarEvents_Companies_CompanyId",
                table: "CalendarEvents",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CbseAssessments_Companies_CompanyId",
                table: "CbseAssessments",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseAssignObservations_CbseObservationParameters_ParameterId",
                table: "CbseAssignObservations",
                column: "ParameterId",
                principalTable: "CbseObservationParameters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseAssignObservations_Students_StudentId",
                table: "CbseAssignObservations",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseExams_CbseTerms_TermId",
                table: "CbseExams",
                column: "TermId",
                principalTable: "CbseTerms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseExams_Companies_CompanyId",
                table: "CbseExams",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseExamSchedules_CbseExams_CbseExamId",
                table: "CbseExamSchedules",
                column: "CbseExamId",
                principalTable: "CbseExams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseExamSchedules_Classes_ClassId",
                table: "CbseExamSchedules",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseExamSchedules_Subjects_SubjectId",
                table: "CbseExamSchedules",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseGrades_Companies_CompanyId",
                table: "CbseGrades",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseMarkSheetTemplates_Companies_CompanyId",
                table: "CbseMarkSheetTemplates",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseObservationParameters_CbseObservations_ObservationId",
                table: "CbseObservationParameters",
                column: "ObservationId",
                principalTable: "CbseObservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseObservations_Companies_CompanyId",
                table: "CbseObservations",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CbseTerms_Companies_CompanyId",
                table: "CbseTerms",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Certificates_Students_StudentId",
                table: "Certificates",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatBlockedUsers_AspNetUsers_BlockedId",
                table: "ChatBlockedUsers",
                column: "BlockedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatBlockedUsers_AspNetUsers_BlockerId",
                table: "ChatBlockedUsers",
                column: "BlockerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatBlockedUsers_Companies_CompanyId",
                table: "ChatBlockedUsers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatInvitations_AspNetUsers_ReceiverId",
                table: "ChatInvitations",
                column: "ReceiverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatInvitations_AspNetUsers_SenderId",
                table: "ChatInvitations",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatInvitations_Companies_CompanyId",
                table: "ChatInvitations",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_AspNetUsers_ReceiverId",
                table: "ChatMessages",
                column: "ReceiverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_AspNetUsers_SenderId",
                table: "ChatMessages",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_Companies_CompanyId",
                table: "ChatMessages",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatUserSettings_AspNetUsers_UserId",
                table: "ChatUserSettings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatUserSettings_Companies_CompanyId",
                table: "ChatUserSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_AcademicYears_AcademicYearId",
                table: "Classes",
                column: "AcademicYearId",
                principalTable: "AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Companies_CompanyId",
                table: "Classes",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassSections_Classes_ClassId",
                table: "ClassSections",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassSections_Sections_SectionId",
                table: "ClassSections",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Complaints_Companies_CompanyId",
                table: "Complaints",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFields_Companies_CompanyId",
                table: "CustomFields",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFieldValues_CustomFields_CustomFieldId",
                table: "CustomFieldValues",
                column: "CustomFieldId",
                principalTable: "CustomFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Companies_CompanyId",
                table: "Departments",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Designations_Companies_CompanyId",
                table: "Designations",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DormitoryRooms_Dormitories_DormitoryId",
                table: "DormitoryRooms",
                column: "DormitoryId",
                principalTable: "Dormitories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Companies_CompanyId",
                table: "Drivers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EvaluationResponses_EvaluationCriteria_EvaluationCriterionId",
                table: "EvaluationResponses",
                column: "EvaluationCriterionId",
                principalTable: "EvaluationCriteria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EvaluationResponses_TeacherEvaluations_TeacherEvaluationId",
                table: "EvaluationResponses",
                column: "TeacherEvaluationId",
                principalTable: "TeacherEvaluations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Examinations_AcademicYears_AcademicYearId",
                table: "Examinations",
                column: "AcademicYearId",
                principalTable: "AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamPositions_Examinations_ExaminationId",
                table: "ExamPositions",
                column: "ExaminationId",
                principalTable: "Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamPositions_Students_StudentId",
                table: "ExamPositions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamSchedules_ClassRooms_ClassRoomId",
                table: "ExamSchedules",
                column: "ClassRoomId",
                principalTable: "ClassRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamSchedules_Classes_ClassId",
                table: "ExamSchedules",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamSchedules_Examinations_ExaminationId",
                table: "ExamSchedules",
                column: "ExaminationId",
                principalTable: "Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamSchedules_Sections_SectionId",
                table: "ExamSchedules",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamSchedules_Subjects_SubjectId",
                table: "ExamSchedules",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamSettings_Companies_CompanyId",
                table: "ExamSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Companies_CompanyId",
                table: "Expenses",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExpertTeachers_Teachers_TeacherId",
                table: "ExpertTeachers",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FeeCollections_FeeStructures_FeeStructureId",
                table: "FeeCollections",
                column: "FeeStructureId",
                principalTable: "FeeStructures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeeCollections_FeesInvoices_FeesInvoiceId",
                table: "FeeCollections",
                column: "FeesInvoiceId",
                principalTable: "FeesInvoices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FeeCollections_Students_StudentId",
                table: "FeeCollections",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesCarryForwards_Students_StudentId",
                table: "FeesCarryForwards",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesGroups_Companies_CompanyId",
                table: "FeesGroups",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesInvoiceDetails_FeesInvoices_FeesInvoiceId",
                table: "FeesInvoiceDetails",
                column: "FeesInvoiceId",
                principalTable: "FeesInvoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesInvoiceDetails_FeesTypes_FeesTypeId",
                table: "FeesInvoiceDetails",
                column: "FeesTypeId",
                principalTable: "FeesTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesInvoices_AcademicYears_AcademicYearId",
                table: "FeesInvoices",
                column: "AcademicYearId",
                principalTable: "AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesInvoices_Students_StudentId",
                table: "FeesInvoices",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesInvoices_Students_StudentId1",
                table: "FeesInvoices",
                column: "StudentId1",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FeeStructures_Classes_ClassId",
                table: "FeeStructures",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FeesTypes_FeesGroups_FeesGroupId",
                table: "FeesTypes",
                column: "FeesGroupId",
                principalTable: "FeesGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FrontCourses_CourseCategories_CategoryId",
                table: "FrontCourses",
                column: "CategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GmeetSettings_Companies_CompanyId",
                table: "GmeetSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GmeetVirtualClasses_Classes_ClassId",
                table: "GmeetVirtualClasses",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GmeetVirtualClasses_Companies_CompanyId",
                table: "GmeetVirtualClasses",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GmeetVirtualClasses_Sections_SectionId",
                table: "GmeetVirtualClasses",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GmeetVirtualClasses_Subjects_SubjectId",
                table: "GmeetVirtualClasses",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GmeetVirtualMeetings_Companies_CompanyId",
                table: "GmeetVirtualMeetings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Homeworks_Classes_ClassId",
                table: "Homeworks",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Homeworks_Subjects_SubjectId",
                table: "Homeworks",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HomeworkSubmissions_Homeworks_HomeworkId",
                table: "HomeworkSubmissions",
                column: "HomeworkId",
                principalTable: "Homeworks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HomeworkSubmissions_Students_StudentId",
                table: "HomeworkSubmissions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Incidents_Companies_CompanyId",
                table: "Incidents",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Companies_CompanyId",
                table: "Inventories",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_ItemCategories_CategoryId",
                table: "Inventories",
                column: "CategoryId",
                principalTable: "ItemCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryTransactions_Inventories_InventoryId",
                table: "InventoryTransactions",
                column: "InventoryId",
                principalTable: "Inventories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryTransactions_Students_StudentId",
                table: "InventoryTransactions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemReceives_Inventories_InventoryId",
                table: "ItemReceives",
                column: "InventoryId",
                principalTable: "Inventories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemReceives_Suppliers_SupplierId",
                table: "ItemReceives",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JitsiSettings_Companies_CompanyId",
                table: "JitsiSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JitsiVirtualClasses_Classes_ClassId",
                table: "JitsiVirtualClasses",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JitsiVirtualClasses_Companies_CompanyId",
                table: "JitsiVirtualClasses",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JitsiVirtualClasses_Sections_SectionId",
                table: "JitsiVirtualClasses",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JitsiVirtualClasses_Subjects_SubjectId",
                table: "JitsiVirtualClasses",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JitsiVirtualMeetings_Companies_CompanyId",
                table: "JitsiVirtualMeetings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveDefines_LeaveTypes_LeaveTypeId",
                table: "LeaveDefines",
                column: "LeaveTypeId",
                principalTable: "LeaveTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_UserId",
                table: "LeaveRequests",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_LeaveTypes_LeaveTypeId",
                table: "LeaveRequests",
                column: "LeaveTypeId",
                principalTable: "LeaveTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveTypes_Companies_CompanyId",
                table: "LeaveTypes",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ledgers_AccountGroups_AccountGroupId",
                table: "Ledgers",
                column: "AccountGroupId",
                principalTable: "AccountGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlans_Lessons_LessonId",
                table: "LessonPlans",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlans_Teachers_TeacherId",
                table: "LessonPlans",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlans_Topics_TopicId",
                table: "LessonPlans",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlanSettings_Companies_CompanyId",
                table: "LessonPlanSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Classes_ClassId",
                table: "Lessons",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Subjects_SubjectId",
                table: "Lessons",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryMembers_Students_StudentId",
                table: "LibraryMembers",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryMembers_Teachers_StaffId",
                table: "LibraryMembers",
                column: "StaffId",
                principalTable: "Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LmsCategories_Companies_CompanyId",
                table: "LmsCategories",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsCourseLevels_Companies_CompanyId",
                table: "LmsCourseLevels",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsCourses_Companies_CompanyId",
                table: "LmsCourses",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsCourses_LmsCategories_CategoryId",
                table: "LmsCourses",
                column: "CategoryId",
                principalTable: "LmsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsCourses_LmsCourseLevels_LevelId",
                table: "LmsCourses",
                column: "LevelId",
                principalTable: "LmsCourseLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsEnrollments_LmsCourses_CourseId",
                table: "LmsEnrollments",
                column: "CourseId",
                principalTable: "LmsCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsEnrollments_Students_StudentId",
                table: "LmsEnrollments",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsFeesInvoices_Companies_CompanyId",
                table: "LmsFeesInvoices",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsFeesInvoices_Students_StudentId",
                table: "LmsFeesInvoices",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsPurchaseLogs_Companies_CompanyId",
                table: "LmsPurchaseLogs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsPurchaseLogs_LmsCourses_CourseId",
                table: "LmsPurchaseLogs",
                column: "CourseId",
                principalTable: "LmsCourses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsPurchaseLogs_Students_StudentId",
                table: "LmsPurchaseLogs",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LmsSettings_Companies_CompanyId",
                table: "LmsSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Marks_Examinations_ExaminationId",
                table: "Marks",
                column: "ExaminationId",
                principalTable: "Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Marks_Students_StudentId",
                table: "Marks",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Marks_Subjects_SubjectId",
                table: "Marks",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_MenuItems_ParentId",
                table: "MenuItems",
                column: "ParentId",
                principalTable: "MenuItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MessageLogs_Companies_CompanyId",
                table: "MessageLogs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MessageTemplates_Companies_CompanyId",
                table: "MessageTemplates",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NewsComments_NewsPosts_NewsPostId",
                table: "NewsComments",
                column: "NewsPostId",
                principalTable: "NewsPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NewsPosts_NewsCategories_CategoryId",
                table: "NewsPosts",
                column: "CategoryId",
                principalTable: "NewsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notices_Companies_CompanyId",
                table: "Notices",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OnlineExamSettings_Companies_CompanyId",
                table: "OnlineExamSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OnlineRegistrationSettings_Companies_CompanyId",
                table: "OnlineRegistrationSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Parents_AspNetUsers_UserId",
                table: "Parents",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parents_Students_StudentId",
                table: "Parents",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payrolls_Teachers_TeacherId",
                table: "Payrolls",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PhoneCallLogs_Companies_CompanyId",
                table: "PhoneCallLogs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PostalLogs_Companies_CompanyId",
                table: "PostalLogs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QrAttendanceSettings_Companies_CompanyId",
                table: "QrAttendanceSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionBanks_QuestionGroups_QuestionGroupId",
                table: "QuestionBanks",
                column: "QuestionGroupId",
                principalTable: "QuestionGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationSubmissions_AcademicYears_AcademicYearId",
                table: "RegistrationSubmissions",
                column: "AcademicYearId",
                principalTable: "AcademicYears",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationSubmissions_Classes_ClassId",
                table: "RegistrationSubmissions",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationSubmissions_Companies_CompanyId",
                table: "RegistrationSubmissions",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Routes_Companies_CompanyId",
                table: "Routes",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffSettings_Companies_CompanyId",
                table: "StaffSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentDocuments_Students_StudentId",
                table: "StudentDocuments",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentGroups_Companies_CompanyId",
                table: "StudentGroups",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentIncidents_Incidents_IncidentId",
                table: "StudentIncidents",
                column: "IncidentId",
                principalTable: "Incidents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentIncidents_Students_StudentId",
                table: "StudentIncidents",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentOptionalSubjects_AcademicYears_AcademicYearId",
                table: "StudentOptionalSubjects",
                column: "AcademicYearId",
                principalTable: "AcademicYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentOptionalSubjects_Students_StudentId",
                table: "StudentOptionalSubjects",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentOptionalSubjects_Subjects_SubjectId",
                table: "StudentOptionalSubjects",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentPromotions_Students_StudentId",
                table: "StudentPromotions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_AspNetUsers_UserId",
                table: "Students",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Classes_ClassId",
                table: "Students",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Companies_CompanyId",
                table: "Students",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Dormitories_DormitoryId",
                table: "Students",
                column: "DormitoryId",
                principalTable: "Dormitories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_DormitoryRooms_DormitoryRoomId",
                table: "Students",
                column: "DormitoryRoomId",
                principalTable: "DormitoryRooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Routes_RouteId",
                table: "Students",
                column: "RouteId",
                principalTable: "Routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Sections_SectionId",
                table: "Students",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_StudentCategories_StudentCategoryId",
                table: "Students",
                column: "StudentCategoryId",
                principalTable: "StudentCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSettings_Companies_CompanyId",
                table: "StudentSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudyMaterials_Classes_ClassId",
                table: "StudyMaterials",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudyMaterials_Subjects_SubjectId",
                table: "StudyMaterials",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Subjects_Classes_ClassId",
                table: "Subjects",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Subjects_Teachers_TeacherId",
                table: "Subjects",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectWiseAttendances_Students_StudentId",
                table: "SubjectWiseAttendances",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectWiseAttendances_Subjects_SubjectId",
                table: "SubjectWiseAttendances",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SystemModules_Companies_CompanyId",
                table: "SystemModules",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SystemSettings_Companies_CompanyId",
                table: "SystemSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherAttendances_Teachers_TeacherId",
                table: "TeacherAttendances",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherEvaluations_Teachers_TeacherId",
                table: "TeacherEvaluations",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_AspNetUsers_UserId",
                table: "Teachers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Companies_CompanyId",
                table: "Teachers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Departments_DepartmentId",
                table: "Teachers",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Designations_DesignationId",
                table: "Teachers",
                column: "DesignationId",
                principalTable: "Designations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ThemeSettings_Companies_CompanyId",
                table: "ThemeSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_ClassRooms_ClassRoomId",
                table: "TimeTables",
                column: "ClassRoomId",
                principalTable: "ClassRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Classes_ClassId",
                table: "TimeTables",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Sections_SectionId",
                table: "TimeTables",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Subjects_SubjectId",
                table: "TimeTables",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Teachers_TeacherId",
                table: "TimeTables",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TodoTasks_AspNetUsers_UserId",
                table: "TodoTasks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TodoTasks_Companies_CompanyId",
                table: "TodoTasks",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Lessons_LessonId",
                table: "Topics",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingAttendances_Teachers_TeacherId",
                table: "TrainingAttendances",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingAttendances_Trainings_TrainingId",
                table: "TrainingAttendances",
                column: "TrainingId",
                principalTable: "Trainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Companies_CompanyId",
                table: "Trainings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuditLogs_AspNetUsers_UserId",
                table: "UserAuditLogs",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuditLogs_Companies_CompanyId",
                table: "UserAuditLogs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleMaintenances_Vehicles_VehicleId",
                table: "VehicleMaintenances",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Companies_CompanyId",
                table: "Vehicles",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Drivers_DriverId",
                table: "Vehicles",
                column: "DriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Routes_RouteId",
                table: "Vehicles",
                column: "RouteId",
                principalTable: "Routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VisitorBooks_Companies_CompanyId",
                table: "VisitorBooks",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VoucherDetails_Inventories_InventoryId",
                table: "VoucherDetails",
                column: "InventoryId",
                principalTable: "Inventories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VoucherDetails_Ledgers_LedgerId",
                table: "VoucherDetails",
                column: "LedgerId",
                principalTable: "Ledgers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VoucherDetails_Vouchers_VoucherId",
                table: "VoucherDetails",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WalletTransactions_Students_StudentId",
                table: "WalletTransactions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WalletTransactions_Students_StudentId1",
                table: "WalletTransactions",
                column: "StudentId1",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WhatsAppAgents_Companies_CompanyId",
                table: "WhatsAppAgents",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WhatsAppLogs_Companies_CompanyId",
                table: "WhatsAppLogs",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WhatsAppSettings_Companies_CompanyId",
                table: "WhatsAppSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WrittenExams_Companies_CompanyId",
                table: "WrittenExams",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoomSettings_Companies_CompanyId",
                table: "ZoomSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoomVirtualClasses_Classes_ClassId",
                table: "ZoomVirtualClasses",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoomVirtualClasses_Companies_CompanyId",
                table: "ZoomVirtualClasses",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoomVirtualClasses_Sections_SectionId",
                table: "ZoomVirtualClasses",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoomVirtualClasses_Subjects_SubjectId",
                table: "ZoomVirtualClasses",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoomVirtualMeetings_Companies_CompanyId",
                table: "ZoomVirtualMeetings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
