using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddExamConfigModules : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdmitCardSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    InstitutionalHeader = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExamInstructions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShowExamSchedule = table.Column<bool>(type: "bit", nullable: false),
                    ShowClassRoom = table.Column<bool>(type: "bit", nullable: false),
                    BackgroundWatermark = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmitCardSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExamFormatSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    MarksheetHeader = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MarksheetFooter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShowStudentPhoto = table.Column<bool>(type: "bit", nullable: false),
                    ShowGradeSystem = table.Column<bool>(type: "bit", nullable: false),
                    ResultPublishDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaperSize = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Layout = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamFormatSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExamPositions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    ExaminationId = table.Column<int>(type: "int", nullable: false),
                    TotalMarks = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Percentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    Gpa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeneratedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamPositions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExamPositions_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamPositions_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExamRules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    RuleName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CalculationLogic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WeightsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IncludePreviousTerms = table.Column<bool>(type: "bit", nullable: false),
                    PassThresholdPercent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamRules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExamSignatureSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    PrincipalSignaturePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrincipalName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TeacherSignaturePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShowTeacherSignature = table.Column<bool>(type: "bit", nullable: false),
                    ShowPrincipalSignature = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamSignatureSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SeatPlanSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Rows = table.Column<int>(type: "int", nullable: false),
                    Columns = table.Column<int>(type: "int", nullable: false),
                    ShowBenchNumber = table.Column<bool>(type: "bit", nullable: false),
                    ShowExamName = table.Column<bool>(type: "bit", nullable: false),
                    LayoutStyle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeatPlanSettings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExamPositions_ExaminationId",
                table: "ExamPositions",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamPositions_StudentId",
                table: "ExamPositions",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdmitCardSettings");

            migrationBuilder.DropTable(
                name: "ExamFormatSettings");

            migrationBuilder.DropTable(
                name: "ExamPositions");

            migrationBuilder.DropTable(
                name: "ExamRules");

            migrationBuilder.DropTable(
                name: "ExamSignatureSettings");

            migrationBuilder.DropTable(
                name: "SeatPlanSettings");
        }
    }
}
