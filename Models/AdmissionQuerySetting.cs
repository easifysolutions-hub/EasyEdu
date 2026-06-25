using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class AdmissionQuerySetting
    {
        public int Id { get; set; }
        
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        
        [Required]
        public string FormTitle { get; set; } = "Admission Inquiry Form";
        
        public string FormDescription { get; set; } = "Please fill in the form below to enquire about student admissions.";
        
        public bool ShowEmail { get; set; } = true;
        public bool RequireEmail { get; set; } = false;
        
        public bool ShowPhone { get; set; } = true;
        public bool RequirePhone { get; set; } = true;
        
        public bool ShowAddress { get; set; } = true;
        public bool RequireAddress { get; set; } = false;
        
        public bool ShowDescription { get; set; } = true;
        public bool RequireDescription { get; set; } = false;
        
        public bool ShowClass { get; set; } = true;
        public bool RequireClass { get; set; } = false;
        
        public bool ShowNumberOfChildren { get; set; } = false;
        public bool RequireNumberOfChildren { get; set; } = false;

        [Required]
        public string AccentColor { get; set; } = "#4f46e5";
    }
}
