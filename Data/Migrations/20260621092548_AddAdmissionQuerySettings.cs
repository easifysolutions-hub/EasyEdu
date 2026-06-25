using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyEdu.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAdmissionQuerySettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdmissionQuerySettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    FormTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShowEmail = table.Column<bool>(type: "bit", nullable: false),
                    RequireEmail = table.Column<bool>(type: "bit", nullable: false),
                    ShowPhone = table.Column<bool>(type: "bit", nullable: false),
                    RequirePhone = table.Column<bool>(type: "bit", nullable: false),
                    ShowAddress = table.Column<bool>(type: "bit", nullable: false),
                    RequireAddress = table.Column<bool>(type: "bit", nullable: false),
                    ShowDescription = table.Column<bool>(type: "bit", nullable: false),
                    RequireDescription = table.Column<bool>(type: "bit", nullable: false),
                    ShowClass = table.Column<bool>(type: "bit", nullable: false),
                    RequireClass = table.Column<bool>(type: "bit", nullable: false),
                    ShowNumberOfChildren = table.Column<bool>(type: "bit", nullable: false),
                    RequireNumberOfChildren = table.Column<bool>(type: "bit", nullable: false),
                    AccentColor = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmissionQuerySettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdmissionQuerySettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionQuerySettings_CompanyId",
                table: "AdmissionQuerySettings",
                column: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdmissionQuerySettings");
        }
    }
}
