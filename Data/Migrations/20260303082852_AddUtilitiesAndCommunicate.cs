using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUtilitiesAndCommunicate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "IsVisibleToParents",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "IsVisibleToStudents",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "PostedBy",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CalendarEvents");

            migrationBuilder.DropColumn(
                name: "EventLocation",
                table: "CalendarEvents");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "CalendarEvents");

            migrationBuilder.RenameColumn(
                name: "PublishDate",
                table: "Notices",
                newName: "PublishOn");

            migrationBuilder.RenameColumn(
                name: "IsVisibleToTeachers",
                table: "Notices",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Notices",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "CalendarEvents",
                newName: "Color");

            migrationBuilder.RenameColumn(
                name: "EventTitle",
                table: "CalendarEvents",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "EventDate",
                table: "CalendarEvents",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "CalendarEvents",
                newName: "EndDate");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Notices",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Notices",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TargetAudience",
                table: "Notices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "CalendarEvents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAllDay",
                table: "CalendarEvents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "MessageLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Recipient = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessageLogs_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MessageTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessageTemplates_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TodoTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TodoTasks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TodoTasks_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notices_CompanyId",
                table: "Notices",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_CompanyId",
                table: "CalendarEvents",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageLogs_CompanyId",
                table: "MessageLogs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageTemplates_CompanyId",
                table: "MessageTemplates",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TodoTasks_CompanyId",
                table: "TodoTasks",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TodoTasks_UserId",
                table: "TodoTasks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarEvents_Companies_CompanyId",
                table: "CalendarEvents",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notices_Companies_CompanyId",
                table: "Notices",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarEvents_Companies_CompanyId",
                table: "CalendarEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_Notices_Companies_CompanyId",
                table: "Notices");

            migrationBuilder.DropTable(
                name: "MessageLogs");

            migrationBuilder.DropTable(
                name: "MessageTemplates");

            migrationBuilder.DropTable(
                name: "TodoTasks");

            migrationBuilder.DropIndex(
                name: "IX_Notices_CompanyId",
                table: "Notices");

            migrationBuilder.DropIndex(
                name: "IX_CalendarEvents_CompanyId",
                table: "CalendarEvents");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "TargetAudience",
                table: "Notices");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "CalendarEvents");

            migrationBuilder.DropColumn(
                name: "IsAllDay",
                table: "CalendarEvents");

            migrationBuilder.RenameColumn(
                name: "PublishOn",
                table: "Notices",
                newName: "PublishDate");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Notices",
                newName: "IsVisibleToTeachers");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Notices",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "CalendarEvents",
                newName: "EventTitle");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "CalendarEvents",
                newName: "EventDate");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "CalendarEvents",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "CalendarEvents",
                newName: "Url");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Notices",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Notices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsVisibleToParents",
                table: "Notices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVisibleToStudents",
                table: "Notices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PostedBy",
                table: "Notices",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CalendarEvents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EventLocation",
                table: "CalendarEvents",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "CalendarEvents",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
