using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class StudentCategoryModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentCategoryId",
                table: "Students",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StudentCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_StudentCategoryId",
                table: "Students",
                column: "StudentCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_StudentCategories_StudentCategoryId",
                table: "Students",
                column: "StudentCategoryId",
                principalTable: "StudentCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_StudentCategories_StudentCategoryId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "StudentCategories");

            migrationBuilder.DropIndex(
                name: "IX_Students_StudentCategoryId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "StudentCategoryId",
                table: "Students");
        }
    }
}
