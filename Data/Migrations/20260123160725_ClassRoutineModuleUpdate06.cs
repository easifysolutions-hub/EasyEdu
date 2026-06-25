using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class ClassRoutineModuleUpdate06 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Classes_ClassId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Subjects_SubjectId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Teachers_TeacherId",
                table: "TimeTables");

            migrationBuilder.DropColumn(
                name: "Room",
                table: "TimeTables");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "TimeTables",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClassRoomId",
                table: "TimeTables",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SectionId",
                table: "TimeTables",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TimeTables_ClassRoomId",
                table: "TimeTables",
                column: "ClassRoomId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTables_SectionId",
                table: "TimeTables",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_ClassRooms_ClassRoomId",
                table: "TimeTables",
                column: "ClassRoomId",
                principalTable: "ClassRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Classes_ClassId",
                table: "TimeTables",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Sections_SectionId",
                table: "TimeTables",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Subjects_SubjectId",
                table: "TimeTables",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Teachers_TeacherId",
                table: "TimeTables",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_ClassRooms_ClassRoomId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Classes_ClassId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Sections_SectionId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Subjects_SubjectId",
                table: "TimeTables");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTables_Teachers_TeacherId",
                table: "TimeTables");

            migrationBuilder.DropIndex(
                name: "IX_TimeTables_ClassRoomId",
                table: "TimeTables");

            migrationBuilder.DropIndex(
                name: "IX_TimeTables_SectionId",
                table: "TimeTables");

            migrationBuilder.DropColumn(
                name: "ClassRoomId",
                table: "TimeTables");

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "TimeTables");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "TimeTables",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Room",
                table: "TimeTables",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Classes_ClassId",
                table: "TimeTables",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Subjects_SubjectId",
                table: "TimeTables",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTables_Teachers_TeacherId",
                table: "TimeTables",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");
        }
    }
}
