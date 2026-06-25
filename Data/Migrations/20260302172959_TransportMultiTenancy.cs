using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class TransportMultiTenancy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Routes_Companies_CompanyId",
                table: "Routes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "LibraryMembers");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "LibraryMembers");

            migrationBuilder.RenameColumn(
                name: "JoiningDate",
                table: "LibraryMembers",
                newName: "JoinedDate");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Vehicles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Suppliers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "LibraryMembers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "LibraryMembers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "LibraryMembers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "ItemStores",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "ItemReceives",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "ItemCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Drivers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "BookCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_CompanyId",
                table: "Vehicles",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryMembers_StaffId",
                table: "LibraryMembers",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryMembers_StudentId",
                table: "LibraryMembers",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_CompanyId",
                table: "Drivers",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Companies_CompanyId",
                table: "Drivers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryMembers_Students_StudentId",
                table: "LibraryMembers",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryMembers_Teachers_StaffId",
                table: "LibraryMembers",
                column: "StaffId",
                principalTable: "Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Routes_Companies_CompanyId",
                table: "Routes",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Companies_CompanyId",
                table: "Vehicles",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Companies_CompanyId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_LibraryMembers_Students_StudentId",
                table: "LibraryMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_LibraryMembers_Teachers_StaffId",
                table: "LibraryMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Routes_Companies_CompanyId",
                table: "Routes");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Companies_CompanyId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_CompanyId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_LibraryMembers_StaffId",
                table: "LibraryMembers");

            migrationBuilder.DropIndex(
                name: "IX_LibraryMembers_StudentId",
                table: "LibraryMembers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_CompanyId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "LibraryMembers");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "LibraryMembers");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "LibraryMembers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "ItemStores");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "ItemReceives");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "ItemCategories");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "BookCategories");

            migrationBuilder.RenameColumn(
                name: "JoinedDate",
                table: "LibraryMembers",
                newName: "JoiningDate");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "LibraryMembers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserType",
                table: "LibraryMembers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Routes_Companies_CompanyId",
                table: "Routes",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
