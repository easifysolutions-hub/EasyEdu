using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddQrAttendanceSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QrAttendanceSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AutoSubmission = table.Column<bool>(type: "bit", nullable: false),
                    AutoSubmissionTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DefaultStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QrSecret = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpiryDurationSeconds = table.Column<int>(type: "int", nullable: false),
                    RequireSelfie = table.Column<bool>(type: "bit", nullable: false),
                    RequireGeolocation = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QrAttendanceSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QrAttendanceSettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QrAttendanceSettings_CompanyId",
                table: "QrAttendanceSettings",
                column: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QrAttendanceSettings");
        }
    }
}
