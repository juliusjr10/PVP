using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PVP.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixedHabitUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckIns_HabitUser_UserHabitId",
                table: "CheckIns");

            migrationBuilder.DropForeignKey(
                name: "FK_HabitUser_Habits_HabitId",
                table: "HabitUser");

            migrationBuilder.DropForeignKey(
                name: "FK_HabitUser_Users_UserId",
                table: "HabitUser");

            migrationBuilder.DropIndex(
                name: "IX_CheckIns_UserHabitId",
                table: "CheckIns");

            migrationBuilder.DropColumn(
                name: "UserHabitId",
                table: "CheckIns");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "HabitUser",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "HabitId",
                table: "HabitUser",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HabitUserId",
                table: "CheckIns",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CheckIns_HabitUserId",
                table: "CheckIns",
                column: "HabitUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckIns_HabitUser_HabitUserId",
                table: "CheckIns",
                column: "HabitUserId",
                principalTable: "HabitUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HabitUser_Habits_HabitId",
                table: "HabitUser",
                column: "HabitId",
                principalTable: "Habits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HabitUser_Users_UserId",
                table: "HabitUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckIns_HabitUser_HabitUserId",
                table: "CheckIns");

            migrationBuilder.DropForeignKey(
                name: "FK_HabitUser_Habits_HabitId",
                table: "HabitUser");

            migrationBuilder.DropForeignKey(
                name: "FK_HabitUser_Users_UserId",
                table: "HabitUser");

            migrationBuilder.DropIndex(
                name: "IX_CheckIns_HabitUserId",
                table: "CheckIns");

            migrationBuilder.DropColumn(
                name: "HabitUserId",
                table: "CheckIns");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "HabitUser",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "HabitId",
                table: "HabitUser",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "UserHabitId",
                table: "CheckIns",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CheckIns_UserHabitId",
                table: "CheckIns",
                column: "UserHabitId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckIns_HabitUser_UserHabitId",
                table: "CheckIns",
                column: "UserHabitId",
                principalTable: "HabitUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HabitUser_Habits_HabitId",
                table: "HabitUser",
                column: "HabitId",
                principalTable: "Habits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HabitUser_Users_UserId",
                table: "HabitUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
