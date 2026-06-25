using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class SystemSettings
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        // Two Factor Setting
        public bool EnableTwoFactor { get; set; } = false;

        // Tawk To Chat
        public string? TawkToWidgetId { get; set; }
        public bool EnableTawkTo { get; set; } = false;

        // Messenger Chat
        public string? MessengerAppId { get; set; }
        public bool EnableMessenger { get; set; } = false;

        // Manage Currency
        public string CurrencyCode { get; set; } = "USD";
        public string CurrencySymbol { get; set; } = "$";

        // Notification Setting
        public bool EmailNotification { get; set; } = true;
        public bool SmsNotification { get; set; } = false;

        // Email Settings
        public string? SmtpServer { get; set; }
        public int SmtpPort { get; set; } = 587;
        public string? SmtpUser { get; set; }
        public string? SmtpPassword { get; set; }
        public bool SmtpEnableSsl { get; set; } = true;

        // SMS Settings
        public string? SmsGatewayUrl { get; set; }
        public string? SmsApiKey { get; set; }
        public string? SmsSenderId { get; set; }

        // Payment Settings (Common fields for Stripe/PayPal/etc)
        public string? StripePublicKey { get; set; }
        public string? StripeSecretKey { get; set; }
        public bool EnableOnlinePayment { get; set; } = true;

        // Preloader Settings
        public string? PreloaderLogo { get; set; }
        public string? PreloaderBackgroundColor { get; set; } = "#ffffff";
        public bool EnablePreloader { get; set; } = true;

        // Weekend Settings
        public string? WeekendDays { get; set; } // Comma separated: Saturday,Sunday

        // Holiday Settings (This might need a separate model for list, but flag here?)
        public bool AutoHolidayNotification { get; set; } = false;

        // Cron Job
        public DateTime? LastCronRun { get; set; }
        public string CronSecretToken { get; set; } = Guid.NewGuid().ToString();

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
