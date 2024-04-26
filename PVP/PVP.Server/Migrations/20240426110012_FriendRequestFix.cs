using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PVP.Server.Migrations
{
    /// <inheritdoc />
    public partial class FriendRequestFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "FriendRequests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "FriendRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
