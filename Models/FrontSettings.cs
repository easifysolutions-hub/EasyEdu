using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    // 1. Home Slider
    public class HomeSlider
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string? SubTitle { get; set; }
        public string? Description { get; set; }
        public string? ImagePath { get; set; }
        public string? ButtonText { get; set; }
        public string? ButtonUrl { get; set; }
        public bool IsActive { get; set; } = true;
        public int DisplayOrder { get; set; }
    }

    // 2. Custom Pages & Home Page
    public class CustomPage
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        [Required] public string Content { get; set; } = string.Empty;
        public string? MetaTitle { get; set; }
        public string? MetaDescription { get; set; }
        public bool IsPublished { get; set; } = true;
        public bool ShowInNavbar { get; set; } = false;
        public bool ShowInFooter { get; set; } = false;
    }

    // 3. Expert Teacher (Linked to Staff/Teacher but with Front specific info)
    public class ExpertTeacher
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;
        public string? Specialization { get; set; }
        public string? ShortBio { get; set; }
        public string? FacebookUrl { get; set; }
        public string? TwitterUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public bool ShowOnHome { get; set; } = true;
        public int DisplayOrder { get; set; }
    }

    // 4. Photo & Video Gallery
    public class GalleryItem
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Type { get; set; } = "Photo"; // Photo or Video
        public string? MediaPath { get; set; } // Image Path or YouTube Link
        public string? ThumbnailPath { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // 5. News & Testimonials
    public class NewsPost
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string? Slug { get; set; }
        [Required] public string Content { get; set; } = string.Empty;
        public string? ImagePath { get; set; }
        public int CategoryId { get; set; }
        public virtual NewsCategory Category { get; set; } = null!;
        public bool IsPublished { get; set; } = true;
        public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public virtual ICollection<NewsComment> Comments { get; set; } = new List<NewsComment>();
    }

    public class NewsCategory
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }

    public class NewsComment
    {
        public int Id { get; set; }
        public int NewsPostId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorEmail { get; set; } = string.Empty;
        public string CommentText { get; set; } = string.Empty;
        public bool IsApproved { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Testimonial
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string? AuthorImage { get; set; }
        public string? Designation { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Rating { get; set; } = 5;
        public bool IsActive { get; set; } = true;
    }

    // 6. Header/Footer & About
    public class FrontSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        
        // Header
        public string? HeaderPhone { get; set; }
        public string? HeaderEmail { get; set; }
        public string? HeaderLogo { get; set; }
        public string? AnnouncementText { get; set; }
        
        // Footer
        public string? FooterAboutText { get; set; }
        public string? FooterCopyrightText { get; set; }
        public string? Address { get; set; }
        
        // Social
        public string? FacebookUrl { get; set; }
        public string? TwitterUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? YoutubeUrl { get; set; }

        // Speech Slider (Principal Message etc)
        public string? PrincipalName { get; set; }
        public string? PrincipalDesignation { get; set; }
        public string? PrincipalSpeech { get; set; }
        public string? PrincipalImage { get; set; }
    }

    public class CourseCategory
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public string? IconClass { get; set; }
    }

    public class FrontCourse
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int CategoryId { get; set; }
        public virtual CourseCategory Category { get; set; } = null!;
        [Required] public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ImagePath { get; set; }
        public decimal Price { get; set; }
        public int DurationHours { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class ContactMessage
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
    }

    public class FormDownload
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required] public string FilePath { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }

    // Legacy Support (Optional)
    public class SocialMedia
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        [Required] public string PlatformName { get; set; } = string.Empty;
        [Required] public string Url { get; set; } = string.Empty;
        public string? IconClass { get; set; }
    }

    public class AboutUs
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Title { get; set; } = "About Our School";
        public string Content { get; set; } = string.Empty;
        public string? ImagePath { get; set; }
        public string? Mission { get; set; }
        public string? Vision { get; set; }
    }
}
