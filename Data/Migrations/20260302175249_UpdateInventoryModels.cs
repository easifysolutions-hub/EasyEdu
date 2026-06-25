using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInventoryModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Inventories");

            migrationBuilder.RenameColumn(
                name: "CategoryName",
                table: "ItemCategories",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ItemCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Inventories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_CategoryId",
                table: "Inventories",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_ItemCategories_CategoryId",
                table: "Inventories",
                column: "CategoryId",
                principalTable: "ItemCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_ItemCategories_CategoryId",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_CategoryId",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ItemCategories");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Inventories");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ItemCategories",
                newName: "CategoryName");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Inventories",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
