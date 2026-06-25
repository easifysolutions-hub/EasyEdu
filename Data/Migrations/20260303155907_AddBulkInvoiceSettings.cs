using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBulkInvoiceSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BulkInvoiceSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    InvoicePrefix = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    NextInvoiceNumber = table.Column<int>(type: "int", nullable: false),
                    TermsAndConditions = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ShowInstitutionalLogo = table.Column<bool>(type: "bit", nullable: false),
                    ShowAuthorizedSignature = table.Column<bool>(type: "bit", nullable: false),
                    FooterNote = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SignaturePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulkInvoiceSettings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BulkInvoiceSettings");
        }
    }
}
