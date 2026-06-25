using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModelsForAddons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DormitoryId",
                table: "Students",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DormitoryRoomId",
                table: "Students",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_DormitoryId",
                table: "Students",
                column: "DormitoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_DormitoryRoomId",
                table: "Students",
                column: "DormitoryRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Dormitories_DormitoryId",
                table: "Students",
                column: "DormitoryId",
                principalTable: "Dormitories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_DormitoryRooms_DormitoryRoomId",
                table: "Students",
                column: "DormitoryRoomId",
                principalTable: "DormitoryRooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Dormitories_DormitoryId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_DormitoryRooms_DormitoryRoomId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_DormitoryId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_DormitoryRoomId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "DormitoryId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "DormitoryRoomId",
                table: "Students");
        }
    }
}
