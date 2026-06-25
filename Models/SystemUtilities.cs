using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class UserAuditLog
    {
        public int Id { get; set; }
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        public virtual ApplicationUser? User { get; set; }
        
        [Required]
        public string Action { get; set; } = string.Empty; // Login, Logout, Update, Delete, etc.
        
        public string? Module { get; set; }
        public string? Description { get; set; }
        
        public string? IpAddress { get; set; }
        public string? UserAgent { get; set; }
        
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class SystemModule
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        public bool IsEnabled { get; set; } = true;
        
        public string? Version { get; set; }
        public DateTime InstalledAt { get; set; } = DateTime.UtcNow;
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class ThemeSettings
    {
        public int Id { get; set; }
        
        public string ThemeName { get; set; } = "Default";
        
        public string PrimaryColor { get; set; } = "#6366f1";
        public string SecondaryColor { get; set; } = "#4f46e5";
        
        public string SidebarBackground { get; set; } = "#ffffff";
        public string SidebarText { get; set; } = "#334155";
        
        public string BodyBackground { get; set; } = "#f8fafc";
        
        public string? BackgroundImageUrl { get; set; }
        public string? LogoUrl { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }
}
