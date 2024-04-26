﻿using System;
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
    }
}