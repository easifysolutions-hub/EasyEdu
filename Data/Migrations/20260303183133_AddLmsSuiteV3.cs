using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddLmsSuiteV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LmsCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsCategories_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LmsCourseLevels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsCourseLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsCourseLevels_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LmsFeesInvoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaidAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsFeesInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsFeesInvoices_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LmsFeesInvoices_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LmsSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    EnableRegistration = table.Column<bool>(type: "bit", nullable: false),
                    ShowCoursePrice = table.Column<bool>(type: "bit", nullable: false),
                    TermsAndConditions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VimeoClientId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VimeoClientSecret = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VimeoAccessToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsSettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LmsCourses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShortDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    LevelId = table.Column<int>(type: "int", nullable: false),
                    Thumbnail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrailerUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsFree = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InstructorId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsCourses_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LmsCourses_LmsCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "LmsCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LmsCourses_LmsCourseLevels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "LmsCourseLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LmsEnrollments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    EnrollmentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProgressPercent = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsEnrollments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsEnrollments_LmsCourses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "LmsCourses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LmsEnrollments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LmsPurchaseLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LmsPurchaseLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LmsPurchaseLogs_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LmsPurchaseLogs_LmsCourses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "LmsCourses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LmsPurchaseLogs_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LmsCategories_CompanyId",
                table: "LmsCategories",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsCourseLevels_CompanyId",
                table: "LmsCourseLevels",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsCourses_CategoryId",
                table: "LmsCourses",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsCourses_CompanyId",
                table: "LmsCourses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsCourses_LevelId",
                table: "LmsCourses",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsEnrollments_CourseId",
                table: "LmsEnrollments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsEnrollments_StudentId",
                table: "LmsEnrollments",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsFeesInvoices_CompanyId",
                table: "LmsFeesInvoices",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsFeesInvoices_StudentId",
                table: "LmsFeesInvoices",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsPurchaseLogs_CompanyId",
                table: "LmsPurchaseLogs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsPurchaseLogs_CourseId",
                table: "LmsPurchaseLogs",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsPurchaseLogs_StudentId",
                table: "LmsPurchaseLogs",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_LmsSettings_CompanyId",
                table: "LmsSettings",
                column: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LmsEnrollments");

            migrationBuilder.DropTable(
                name: "LmsFeesInvoices");

            migrationBuilder.DropTable(
                name: "LmsPurchaseLogs");

            migrationBuilder.DropTable(
                name: "LmsSettings");

            migrationBuilder.DropTable(
                name: "LmsCourses");

            migrationBuilder.DropTable(
                name: "LmsCategories");

            migrationBuilder.DropTable(
                name: "LmsCourseLevels");
        }
    }
}
