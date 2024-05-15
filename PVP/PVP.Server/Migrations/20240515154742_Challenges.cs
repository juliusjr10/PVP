using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PVP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Challenges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChallengeRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    ReceiverId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HabitId = table.Column<int>(type: "int", nullable: false),
                    ChallengeType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequestDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChallengeRequests_Habits_HabitId",
                        column: x => x.HabitId,
                        principalTable: "Habits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChallengeRequests_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChallengeRequests_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Challenges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChallengeType = table.Column<int>(type: "int", nullable: false),
                    ChallengeStatus = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChallengeStart = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FirstChallengerId = table.Column<int>(type: "int", nullable: false),
                    SecondChallengerId = table.Column<int>(type: "int", nullable: false),
                    HabitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Challenges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Challenges_Habits_HabitId",
                        column: x => x.HabitId,
                        principalTable: "Habits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Challenges_Users_FirstChallengerId",
                        column: x => x.FirstChallengerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Challenges_Users_SecondChallengerId",
                        column: x => x.SecondChallengerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeRequests_HabitId",
                table: "ChallengeRequests",
                column: "HabitId");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeRequests_ReceiverId",
                table: "ChallengeRequests",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeRequests_SenderId",
                table: "ChallengeRequests",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Challenges_FirstChallengerId",
                table: "Challenges",
                column: "FirstChallengerId");

            migrationBuilder.CreateIndex(
                name: "IX_Challenges_HabitId",
                table: "Challenges",
                column: "HabitId");

            migrationBuilder.CreateIndex(
                name: "IX_Challenges_SecondChallengerId",
                table: "Challenges",
                column: "SecondChallengerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChallengeRequests");

            migrationBuilder.DropTable(
                name: "Challenges");
        }
    }
}
