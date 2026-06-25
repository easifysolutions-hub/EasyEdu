using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    public class JitsiController : Controller
    {
        private readonly ApplicationDbContext _context;

        public JitsiController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetCompanyId() => 1;

        // Settings
        public async Task<IActionResult> Settings()
        {
            var cid = GetCompanyId();
            var setting = await _context.JitsiSettings.FirstOrDefaultAsync(x => x.CompanyId == cid);
            if (setting == null)
            {
                setting = new JitsiSetting { CompanyId = cid };
                _context.JitsiSettings.Add(setting);
                await _context.SaveChangesAsync();
            }
            return View(setting);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSettings(JitsiSetting model)
        {
            var cid = GetCompanyId();
            var existing = await _context.JitsiSettings.FirstOrDefaultAsync(x => x.CompanyId == cid);
            if (existing != null)
            {
                existing.ServerDomain = model.ServerDomain;
                existing.AllowScreenShare = model.AllowScreenShare;
                existing.MuteOnStart = model.MuteOnStart;
                existing.UpdatedAt = DateTime.UtcNow;
                _context.Update(existing);
            }
            else
            {
                model.CompanyId = cid;
                model.UpdatedAt = DateTime.UtcNow;
                _context.JitsiSettings.Add(model);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Settings));
        }

        // Virtual Class
        public async Task<IActionResult> VirtualClass()
        {
            var cid = GetCompanyId();
            var classes = await _context.JitsiVirtualClasses
                .Include(x => x.Class)
                .Include(x => x.Section)
                .Include(x => x.Subject)
                .Where(x => x.CompanyId == cid)
                .OrderByDescending(x => x.Date)
                .ThenByDescending(x => x.StartTime)
                .ToListAsync();

            ViewBag.Classes = await _context.Classes.Where(x => x.CompanyId == cid).ToListAsync();
            ViewBag.Sections = await _context.Sections.ToListAsync();
            ViewBag.Subjects = await _context.Subjects.Where(x => x.Class.CompanyId == cid).ToListAsync();
            
            return View(classes);
        }

        [HttpPost]
        public async Task<IActionResult> SaveVirtualClass(JitsiVirtualClass model)
        {
            model.CompanyId = GetCompanyId();
            model.CreatedAt = DateTime.UtcNow;
            
            if(string.IsNullOrEmpty(model.MeetingId))
            {
                 model.MeetingId = $"EasyEdu-Class-{Guid.NewGuid().ToString().Substring(0,8)}";
            }

            if (model.Id == 0)
            {
                _context.JitsiVirtualClasses.Add(model);
            }
            else
            {
                _context.Update(model);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualClass));
        }

        // Virtual Meeting
        public async Task<IActionResult> VirtualMeeting()
        {
            var cid = GetCompanyId();
            var meetings = await _context.JitsiVirtualMeetings
                .Where(x => x.CompanyId == cid)
                .OrderByDescending(x => x.Date)
                .ThenByDescending(x => x.StartTime)
                .ToListAsync();
            
            return View(meetings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveVirtualMeeting(JitsiVirtualMeeting model)
        {
            model.CompanyId = GetCompanyId();
            model.CreatedAt = DateTime.UtcNow;

            if(string.IsNullOrEmpty(model.MeetingId))
            {
                 model.MeetingId = $"EasyEdu-Meeting-{Guid.NewGuid().ToString().Substring(0,8)}";
            }

            if (model.Id == 0)
            {
                _context.JitsiVirtualMeetings.Add(model);
            }
            else
            {
                _context.Update(model);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualMeeting));
        }

        // Host View
        public async Task<IActionResult> HostRoom(string meetingId)
        {
            var cid = GetCompanyId();
            var settings = await _context.JitsiSettings.FirstOrDefaultAsync(x => x.CompanyId == cid);
            if(settings == null) return NotFound();

            ViewBag.RoomId = meetingId;
            ViewBag.Domain = settings.ServerDomain;
            ViewBag.IsHost = true;
            ViewBag.UserName = "Host Instructor";
            ViewBag.AllowScreenShare = settings.AllowScreenShare;
            ViewBag.MuteOnStart = settings.MuteOnStart;

            return View("Room");
        }

        // Join View
        public async Task<IActionResult> JoinRoom(string meetingId)
        {
            var cid = GetCompanyId();
            var settings = await _context.JitsiSettings.FirstOrDefaultAsync(x => x.CompanyId == cid);
            if(settings == null) return NotFound();

            ViewBag.RoomId = meetingId;
            ViewBag.Domain = settings.ServerDomain;
            ViewBag.IsHost = false;
            ViewBag.UserName = "Student User";
            ViewBag.AllowScreenShare = settings.AllowScreenShare;
            ViewBag.MuteOnStart = settings.MuteOnStart;

            return View("Room");
        }
    }
}
