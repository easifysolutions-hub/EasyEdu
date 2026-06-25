using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCbseSuiteFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CbseAssessments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Weightage = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseAssessments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseAssessments_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseGrades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MinPercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaxPercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseGrades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseGrades_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseMarkSheetTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeaderContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FooterContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShowSignature = table.Column<bool>(type: "bit", nullable: false),
                    LogoPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseMarkSheetTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseMarkSheetTemplates_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseObservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseObservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseObservations_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseTerms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseTerms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseTerms_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseObservationParameters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ObservationId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseObservationParameters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseObservationParameters_CbseObservations_ObservationId",
                        column: x => x.ObservationId,
                        principalTable: "CbseObservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CbseExams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TermId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseExams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseExams_CbseTerms_TermId",
                        column: x => x.TermId,
                        principalTable: "CbseTerms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CbseExams_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseAssignObservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    ParameterId = table.Column<int>(type: "int", nullable: false),
                    Grade = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TermId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseAssignObservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseAssignObservations_CbseObservationParameters_ParameterId",
                        column: x => x.ParameterId,
                        principalTable: "CbseObservationParameters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CbseAssignObservations_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CbseExamSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CbseExamId = table.Column<int>(type: "int", nullable: false),
                    ClassId = table.Column<int>(type: "int", nullable: false),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    ExamDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    RoomNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CbseExamSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CbseExamSchedules_CbseExams_CbseExamId",
                        column: x => x.CbseExamId,
                        principalTable: "CbseExams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CbseExamSchedules_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CbseExamSchedules_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CbseAssessments_CompanyId",
                table: "CbseAssessments",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseAssignObservations_ParameterId",
                table: "CbseAssignObservations",
                column: "ParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseAssignObservations_StudentId",
                table: "CbseAssignObservations",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseExams_CompanyId",
                table: "CbseExams",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseExams_TermId",
                table: "CbseExams",
                column: "TermId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseExamSchedules_CbseExamId",
                table: "CbseExamSchedules",
                column: "CbseExamId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseExamSchedules_ClassId",
                table: "CbseExamSchedules",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseExamSchedules_SubjectId",
                table: "CbseExamSchedules",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseGrades_CompanyId",
                table: "CbseGrades",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseMarkSheetTemplates_CompanyId",
                table: "CbseMarkSheetTemplates",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseObservationParameters_ObservationId",
                table: "CbseObservationParameters",
                column: "ObservationId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseObservations_CompanyId",
                table: "CbseObservations",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CbseTerms_CompanyId",
                table: "CbseTerms",
                column: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CbseAssessments");

            migrationBuilder.DropTable(
                name: "CbseAssignObservations");

            migrationBuilder.DropTable(
                name: "CbseExamSchedules");

            migrationBuilder.DropTable(
                name: "CbseGrades");

            migrationBuilder.DropTable(
                name: "CbseMarkSheetTemplates");

            migrationBuilder.DropTable(
                name: "CbseObservationParameters");

            migrationBuilder.DropTable(
                name: "CbseExams");

            migrationBuilder.DropTable(
                name: "CbseObservations");

            migrationBuilder.DropTable(
                name: "CbseTerms");
        }
    }
}
