using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class FriendRequest
    {
        [Key]
        public int Id { get; set; }

        // Sender user ID
        public int SenderId { get; set; }
        [JsonIgnore]
        public User Sender { get; set; }

        // Receiver user ID
        public int ReceiverId { get; set; }
        [JsonIgnore]
        public User Receiver { get; set; }

        public DateTime RequestDateTime { get; set; }

        // Status of the friend request (pending, accepted, declined, etc.)
        public FriendRequestStatus Status { get; set; }
    }

    // Define possible status values for a friend request
    public enum FriendRequestStatus
    {
        Pending,
        Accepted,
        Declined,
        Blocked // Optionally add more statuses as needed
    }
}