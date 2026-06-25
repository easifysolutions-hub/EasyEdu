using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class CustomField
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string FieldName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string FieldType { get; set; } = "Text"; // Text, Number, Date, Select

        [Required, StringLength(50)]
        public string FormType { get; set; } = "Student"; // Student, Staff

        public string? Options { get; set; } // Comma separated for select

        public bool IsRequired { get; set; } = false;

        public bool IsActive { get; set; } = true;

        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public virtual ICollection<CustomFieldValue> CustomFieldValues { get; set; } = new List<CustomFieldValue>();
    }

    public class CustomFieldValue
    {
        public int Id { get; set; }

        public int CustomFieldId { get; set; }
        public virtual CustomField CustomField { get; set; } = null!;

        public int RecordId { get; set; } // StudentId or StaffId

        [Required]
        public string Value { get; set; } = string.Empty;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
