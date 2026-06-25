using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class ClassRoomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClassRoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.ClassRooms.OrderBy(r => r.RoomNo).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ClassRoom classRoom)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (await _context.ClassRooms.AnyAsync(r => r.RoomNo == classRoom.RoomNo))
                    {
                        ModelState.AddModelError("RoomNo", "Room Number already exists.");
                    }
                    else
                    {
                        _context.Add(classRoom);
                        await _context.SaveChangesAsync();
                        return RedirectToAction(nameof(Index));
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Error: " + ex.Message);
                }
            }
            return View("Index", await _context.ClassRooms.OrderBy(r => r.RoomNo).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, string roomNo, int? capacity, bool isActive)
        {
            try
            {
                var room = await _context.ClassRooms.FindAsync(id);
                if (room != null)
                {
                    room.RoomNo = roomNo;
                    room.Capacity = capacity;
                    room.IsActive = isActive;
                    _context.Update(room);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error updating: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var room = await _context.ClassRooms.FindAsync(id);
                if (room != null)
                {
                    _context.ClassRooms.Remove(room);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error deleting: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
