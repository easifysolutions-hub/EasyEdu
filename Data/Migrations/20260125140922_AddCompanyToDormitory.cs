using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCompanyToDormitory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Dormitories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Dormitories_CompanyId",
                table: "Dormitories",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dormitories_Companies_CompanyId",
                table: "Dormitories",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dormitories_Companies_CompanyId",
                table: "Dormitories");

            migrationBuilder.DropIndex(
                name: "IX_Dormitories_CompanyId",
                table: "Dormitories");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Dormitories");
        }
    }
}
