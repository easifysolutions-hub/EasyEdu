using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class WhatsAppSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Provider { get; set; } = "Twilio"; // Twilio, Meta, CloudAPI
        [Required] public string ApiKey { get; set; } = string.Empty;
        public string? AccountSid { get; set; }
        public string? FromNumber { get; set; }
        public bool IsEnabled { get; set; } = true;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class WhatsAppAgent
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string PhoneNumber { get; set; } = string.Empty;
        public string Designation { get; set; } = "Support Agent";
        public bool IsOnline { get; set; } = true;
        public string? WorkingHours { get; set; } // e.g., "09:00 - 18:00"
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class WhatsAppLog
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public string Recipient { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "Sent"; // Sent, Delivered, Read, Failed
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}
