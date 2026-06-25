using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFeesManagementFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Ledgers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LedgerId",
                table: "FeesTypes",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Ledgers");

            migrationBuilder.DropColumn(
                name: "LedgerId",
                table: "FeesTypes");
        }
    }
}
