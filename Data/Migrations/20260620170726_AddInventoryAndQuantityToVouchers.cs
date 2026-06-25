using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddInventoryAndQuantityToVouchers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InventoryId",
                table: "VoucherDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "VoucherDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_VoucherDetails_InventoryId",
                table: "VoucherDetails",
                column: "InventoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_VoucherDetails_Inventories_InventoryId",
                table: "VoucherDetails",
                column: "InventoryId",
                principalTable: "Inventories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VoucherDetails_Inventories_InventoryId",
                table: "VoucherDetails");

            migrationBuilder.DropIndex(
                name: "IX_VoucherDetails_InventoryId",
                table: "VoucherDetails");

            migrationBuilder.DropColumn(
                name: "InventoryId",
                table: "VoucherDetails");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "VoucherDetails");
        }
    }
}
