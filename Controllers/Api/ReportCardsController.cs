using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReportCardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportCardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetReportCards(int? studentId = null)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Marks
                .Include(m => m.Student)
                .Include(m => m.Examination)
                .Include(m => m.Subject)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(m => m.Student.CompanyId == companyId);
            }

            if (studentId.HasValue)
            {
                query = query.Where(m => m.StudentId == studentId);
            }

            // Group marks by Examination and Student
            var marksList = await query
                .OrderByDescending(m => m.Examination.StartDate)
                .ToListAsync();

            var reportCards = marksList
                .GroupBy(m => new { m.ExaminationId, m.Examination.Name, m.StudentId, m.Student.FullName, m.Student.AdmissionNumber })
                .Select(g => new
                {
                    id = $"{g.Key.ExaminationId}-{g.Key.StudentId}",
                    examName = g.Key.Name,
                    studentName = g.Key.FullName,
                    admissionNumber = g.Key.AdmissionNumber,
                    totalMarksObtained = g.Sum(m => m.MarksObtained),
                    totalMaxMarks = g.Sum(m => m.MaxMarks),
                    percentage = g.Sum(m => m.MaxMarks) > 0 ? Math.Round((g.Sum(m => m.MarksObtained) / g.Sum(m => m.MaxMarks)) * 100, 2) : 0,
                    subjects = g.Select(m => new
                    {
                        subjectId = m.SubjectId,
                        subjectName = m.Subject.Name,
                        marksObtained = m.MarksObtained,
                        maxMarks = m.MaxMarks,
                        grade = m.Grade,
                        remarks = m.Remarks
                    }).ToList()
                })
                .ToList();

            return Ok(reportCards);
        }
    }
}
