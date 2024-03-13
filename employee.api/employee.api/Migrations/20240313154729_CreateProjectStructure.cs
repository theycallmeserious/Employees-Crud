using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace employee.api.Migrations
{
    /// <inheritdoc />
    public partial class CreateProjectStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmployeeEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmployeePhone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    EmployeeSalary = table.Column<int>(type: "int", nullable: false),
                    EmployeeAge = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
