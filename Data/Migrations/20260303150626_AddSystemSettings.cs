using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSystemSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SystemSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    EnableTwoFactor = table.Column<bool>(type: "bit", nullable: false),
                    TawkToWidgetId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnableTawkTo = table.Column<bool>(type: "bit", nullable: false),
                    MessengerAppId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnableMessenger = table.Column<bool>(type: "bit", nullable: false),
                    CurrencyCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencySymbol = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailNotification = table.Column<bool>(type: "bit", nullable: false),
                    SmsNotification = table.Column<bool>(type: "bit", nullable: false),
                    SmtpServer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SmtpPort = table.Column<int>(type: "int", nullable: false),
                    SmtpUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SmtpPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SmtpEnableSsl = table.Column<bool>(type: "bit", nullable: false),
                    SmsGatewayUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SmsApiKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SmsSenderId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StripePublicKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StripeSecretKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnableOnlinePayment = table.Column<bool>(type: "bit", nullable: false),
                    PreloaderLogo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreloaderBackgroundColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnablePreloader = table.Column<bool>(type: "bit", nullable: false),
                    WeekendDays = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AutoHolidayNotification = table.Column<bool>(type: "bit", nullable: false),
                    LastCronRun = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CronSecretToken = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SystemSettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SystemSettings_CompanyId",
                table: "SystemSettings",
                column: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SystemSettings");
        }
    }
}
