using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Dormitory
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string Type { get; set; } // Boys/Girls/Mixed
        public string Address { get; set; }
        public int Capacity { get; set; }
        
        public List<DormitoryRoom> Rooms { get; set; }
    }

    public class DormitoryRoom
    {
        public int Id { get; set; }
        public int DormitoryId { get; set; }
        public Dormitory Dormitory { get; set; }
        
        [Required]
        public string RoomNumber { get; set; }
        public string RoomType { get; set; } // AC/Non-AC/Shared
        public int NumberOfBeds { get; set; }
        public decimal CostPerBed { get; set; }
        public string Description { get; set; }
    }
}
