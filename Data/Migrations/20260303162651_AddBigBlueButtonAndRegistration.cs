using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBigBlueButtonAndRegistration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BBBRecordings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordingId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaybackUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BBBRecordings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BBBRecordings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BBBSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    BaseUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecretKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BBBSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BBBSettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BBBVirtualClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClassId = table.Column<int>(type: "int", nullable: false),
                    SectionId = table.Column<int>(type: "int", nullable: false),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MeetingId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModeratorPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttendeePassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Record = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BBBVirtualClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BBBVirtualClasses_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BBBVirtualClasses_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BBBVirtualClasses_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BBBVirtualClasses_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BBBVirtualMeetings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParticipationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MeetingId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModeratorPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttendeePassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Record = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BBBVirtualMeetings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BBBVirtualMeetings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnlineRegistrationSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                    RegistrationFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ActiveFieldsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeaderContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FooterContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SuccessMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineRegistrationSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnlineRegistrationSettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistrationSubmissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClassId = table.Column<int>(type: "int", nullable: false),
                    AcademicYearId = table.Column<int>(type: "int", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    PaymentTransactionId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationSubmissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrationSubmissions_AcademicYears_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "AcademicYears",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RegistrationSubmissions_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RegistrationSubmissions_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BBBRecordings_CompanyId",
                table: "BBBRecordings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_BBBSettings_CompanyId",
                table: "BBBSettings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_BBBVirtualClasses_ClassId",
                table: "BBBVirtualClasses",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_BBBVirtualClasses_CompanyId",
                table: "BBBVirtualClasses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_BBBVirtualClasses_SectionId",
                table: "BBBVirtualClasses",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_BBBVirtualClasses_SubjectId",
                table: "BBBVirtualClasses",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_BBBVirtualMeetings_CompanyId",
                table: "BBBVirtualMeetings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OnlineRegistrationSettings_CompanyId",
                table: "OnlineRegistrationSettings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationSubmissions_AcademicYearId",
                table: "RegistrationSubmissions",
                column: "AcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationSubmissions_ClassId",
                table: "RegistrationSubmissions",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationSubmissions_CompanyId",
                table: "RegistrationSubmissions",
                column: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BBBRecordings");

            migrationBuilder.DropTable(
                name: "BBBSettings");

            migrationBuilder.DropTable(
                name: "BBBVirtualClasses");

            migrationBuilder.DropTable(
                name: "BBBVirtualMeetings");

            migrationBuilder.DropTable(
                name: "OnlineRegistrationSettings");

            migrationBuilder.DropTable(
                name: "RegistrationSubmissions");
        }
    }
}
