using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFinanceExtendedSuite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FeesInvoiceId",
                table: "FeeCollections",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FeesCarryForwards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    FromAcademicYearId = table.Column<int>(type: "int", nullable: false),
                    ToAcademicYearId = table.Column<int>(type: "int", nullable: false),
                    DueAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TransferDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeesCarryForwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeesCarryForwards_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FeesGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeesGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeesGroups_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FeesInvoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    AcademicYearId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    PaidAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TotalWaiver = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TotalFine = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeesInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeesInvoices_AcademicYears_AcademicYearId",
                        column: x => x.AcademicYearId,
                        principalTable: "AcademicYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeesInvoices_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FeesTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FeesCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FeesGroupId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeesTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeesTypes_FeesGroups_FeesGroupId",
                        column: x => x.FeesGroupId,
                        principalTable: "FeesGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BankPayments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    FeesInvoiceId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    BankName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SlipPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BankPayments_FeesInvoices_FeesInvoiceId",
                        column: x => x.FeesInvoiceId,
                        principalTable: "FeesInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BankPayments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FeesInvoiceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeesInvoiceId = table.Column<int>(type: "int", nullable: false),
                    FeesTypeId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Waiver = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Fine = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    PaidAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeesInvoiceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeesInvoiceDetails_FeesInvoices_FeesInvoiceId",
                        column: x => x.FeesInvoiceId,
                        principalTable: "FeesInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeesInvoiceDetails_FeesTypes_FeesTypeId",
                        column: x => x.FeesTypeId,
                        principalTable: "FeesTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeeCollections_FeesInvoiceId",
                table: "FeeCollections",
                column: "FeesInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_BankPayments_FeesInvoiceId",
                table: "BankPayments",
                column: "FeesInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_BankPayments_StudentId",
                table: "BankPayments",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesCarryForwards_StudentId",
                table: "FeesCarryForwards",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesGroups_CompanyId",
                table: "FeesGroups",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesInvoiceDetails_FeesInvoiceId",
                table: "FeesInvoiceDetails",
                column: "FeesInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesInvoiceDetails_FeesTypeId",
                table: "FeesInvoiceDetails",
                column: "FeesTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesInvoices_AcademicYearId",
                table: "FeesInvoices",
                column: "AcademicYearId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesInvoices_StudentId",
                table: "FeesInvoices",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_FeesTypes_FeesGroupId",
                table: "FeesTypes",
                column: "FeesGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_FeeCollections_FeesInvoices_FeesInvoiceId",
                table: "FeeCollections",
                column: "FeesInvoiceId",
                principalTable: "FeesInvoices",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeeCollections_FeesInvoices_FeesInvoiceId",
                table: "FeeCollections");

            migrationBuilder.DropTable(
                name: "BankPayments");

            migrationBuilder.DropTable(
                name: "FeesCarryForwards");

            migrationBuilder.DropTable(
                name: "FeesInvoiceDetails");

            migrationBuilder.DropTable(
                name: "FeesInvoices");

            migrationBuilder.DropTable(
                name: "FeesTypes");

            migrationBuilder.DropTable(
                name: "FeesGroups");

            migrationBuilder.DropIndex(
                name: "IX_FeeCollections_FeesInvoiceId",
                table: "FeeCollections");

            migrationBuilder.DropColumn(
                name: "FeesInvoiceId",
                table: "FeeCollections");
        }
    }
}
