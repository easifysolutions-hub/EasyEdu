using System;
using System.Collections.Generic;

namespace EasyEdu.ViewModels
{
    public class StudentAttendanceReportViewModel
    {
        public int ClassId { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public int Month { get; set; }
        public int Year { get; set; }
        public List<DateTime> Days { get; set; } = new List<DateTime>();
        public List<StudentAttendanceRow> Students { get; set; } = new List<StudentAttendanceRow>();
    }

    public class StudentAttendanceRow
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string AdmissionNumber { get; set; } = string.Empty;
        public string ProfilePicture { get; set; }
        public Dictionary<int, string> DailyStatuses { get; set; } = new Dictionary<int, string>();
        public int PresentCount { get; set; }
        public int AbsentCount { get; set; }
        public int LateCount { get; set; }
        public int HalfDayCount { get; set; }
        public int HolidayCount { get; set; }
        public int OnLeaveCount { get; set; }
    }
}
