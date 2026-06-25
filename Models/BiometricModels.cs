using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class BiometricSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public bool IsEnabled { get; set; } = true;
        
        [Required] public string DeviceId { get; set; } = string.Empty;
        [Required] public string ApiKey { get; set; } = string.Empty;
        public string? IntegrationUserId { get; set; } // The User ID for external integration API
        
        public string? Provider { get; set; } // ZKTeco, HikVision, etc.
        public string? IpAddress { get; set; }
        public int Port { get; set; } = 4370;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
