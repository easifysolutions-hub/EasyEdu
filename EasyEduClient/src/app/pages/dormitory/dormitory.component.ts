import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare const Swal: any;

interface DormitoryBlock {
  id: number;
  name: string;
  type: 'Boys Hostel' | 'Girls Hostel' | 'Faculty Residence';
  wardenName: string;
  wardenPhone: string;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  status: 'Operational' | 'Renovation';
}

interface DormRoom {
  id: number;
  blockName: string;
  roomNo: string;
  roomType: 'Single AC' | 'Double Sharing' | 'Triple Deluxe' | '4-Bed Dorm';
  totalBeds: number;
  availableBeds: number;
  costPerTerm: number;
  floor: string;
}

interface StudentBedAllocation {
  id: number;
  studentName: string;
  admissionNo: string;
  class: string;
  blockName: string;
  roomNo: string;
  bedNo: string;
  allocationDate: string;
  guardianPhone: string;
}

@Component({
  selector: 'app-dormitory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dormitory.component.html',
  styleUrls: ['./dormitory.component.css']
})
export class DormitoryComponent implements OnInit {
  activeTab: 'blocks' | 'rooms' | 'allocations' | 'mess' = 'blocks';

  blocks: DormitoryBlock[] = [
    { id: 1, name: 'Tagore Block (Senior Boys)', type: 'Boys Hostel', wardenName: 'Col. Sanjeev Nair (Retd)', wardenPhone: '+91 98450 66101', totalRooms: 45, totalBeds: 120, occupiedBeds: 108, status: 'Operational' },
    { id: 2, name: 'Sarojini Block (Girls Wing A)', type: 'Girls Hostel', wardenName: 'Dr. Meenakshi Sundaram', wardenPhone: '+91 98450 66102', totalRooms: 50, totalBeds: 140, occupiedBeds: 125, status: 'Operational' },
    { id: 3, name: 'Kalam Block (Junior Boys)', type: 'Boys Hostel', wardenName: 'Prof. Ramesh Sharma', wardenPhone: '+91 98450 66103', totalRooms: 30, totalBeds: 90, occupiedBeds: 72, status: 'Operational' }
  ];

  rooms: DormRoom[] = [
    { id: 1, blockName: 'Tagore Block (Senior Boys)', roomNo: 'T-101', roomType: 'Double Sharing', totalBeds: 2, availableBeds: 0, costPerTerm: 28000, floor: '1st Floor' },
    { id: 2, blockName: 'Tagore Block (Senior Boys)', roomNo: 'T-102', roomType: 'Single AC', totalBeds: 1, availableBeds: 0, costPerTerm: 45000, floor: '1st Floor' },
    { id: 3, blockName: 'Tagore Block (Senior Boys)', roomNo: 'T-103', roomType: '4-Bed Dorm', totalBeds: 4, availableBeds: 2, costPerTerm: 18000, floor: '1st Floor' },
    { id: 4, blockName: 'Sarojini Block (Girls Wing A)', roomNo: 'S-201', roomType: 'Triple Deluxe', totalBeds: 3, availableBeds: 1, costPerTerm: 24000, floor: '2nd Floor' },
    { id: 5, blockName: 'Sarojini Block (Girls Wing A)', roomNo: 'S-202', roomType: 'Double Sharing', totalBeds: 2, availableBeds: 1, costPerTerm: 28000, floor: '2nd Floor' }
  ];

  allocations: StudentBedAllocation[] = [
    { id: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', blockName: 'Tagore Block (Senior Boys)', roomNo: 'T-101', bedNo: 'Bed A', allocationDate: '2025-04-10', guardianPhone: '+91 98450 11001' },
    { id: 2, studentName: 'Kabir Singh', admissionNo: 'ADM-2024-005', class: 'Grade 11-Science', blockName: 'Tagore Block (Senior Boys)', roomNo: 'T-102', bedNo: 'Bed 1', allocationDate: '2025-04-12', guardianPhone: '+91 98450 11005' },
    { id: 3, studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', class: 'Grade 10-B', blockName: 'Sarojini Block (Girls Wing A)', roomNo: 'S-201', bedNo: 'Bed B', allocationDate: '2025-04-15', guardianPhone: '+91 98450 11002' }
  ];

  // Modals state
  showAddRoomModal = false;
  newRoom: Partial<DormRoom> = {
    blockName: 'Tagore Block (Senior Boys)',
    roomNo: '',
    roomType: 'Double Sharing',
    totalBeds: 2,
    costPerTerm: 25000,
    floor: '1st Floor'
  };

  showAllocateBedModal = false;
  newAllocation = {
    studentName: '',
    admissionNo: '',
    class: 'Grade 10-A',
    blockName: 'Tagore Block (Senior Boys)',
    roomNo: 'T-103',
    bedNo: 'Bed A',
    guardianPhone: '+91 98...'
  };

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const t = params['tab'].toLowerCase();
        if (t === 'blocks' || t === 'rooms' || t === 'allocations' || t === 'mess') {
          this.activeTab = t as any;
        }
      }
    });
  }

  get totalBedsCapacity(): number {
    return this.blocks.reduce((acc, b) => acc + b.totalBeds, 0);
  }

  get totalBedsOccupied(): number {
    return this.blocks.reduce((acc, b) => acc + b.occupiedBeds, 0);
  }

  saveRoom(): void {
    if (!this.newRoom.roomNo) {
      Swal.fire('Missing Room Number', 'Please enter Room Number.', 'warning');
      return;
    }

    const r: DormRoom = {
      id: this.rooms.length + 1,
      blockName: this.newRoom.blockName || 'Tagore Block (Senior Boys)',
      roomNo: this.newRoom.roomNo,
      roomType: this.newRoom.roomType || 'Double Sharing',
      totalBeds: Number(this.newRoom.totalBeds) || 2,
      availableBeds: Number(this.newRoom.totalBeds) || 2,
      costPerTerm: Number(this.newRoom.costPerTerm) || 25000,
      floor: this.newRoom.floor || '1st Floor'
    };

    this.rooms.push(r);
    this.showAddRoomModal = false;
    this.newRoom = { blockName: 'Tagore Block (Senior Boys)', roomNo: '', roomType: 'Double Sharing', totalBeds: 2, costPerTerm: 25000 };
    Swal.fire('Room Added', 'Hostel room added to dormitory inventory.', 'success');
  }

  saveBedAllocation(): void {
    if (!this.newAllocation.studentName || !this.newAllocation.roomNo) {
      Swal.fire('Missing Information', 'Please provide Student Name and Room Number.', 'warning');
      return;
    }

    const alloc: StudentBedAllocation = {
      id: this.allocations.length + 1,
      studentName: this.newAllocation.studentName,
      admissionNo: this.newAllocation.admissionNo || `ADM-2025-0${Math.floor(10 + Math.random() * 90)}`,
      class: this.newAllocation.class,
      blockName: this.newAllocation.blockName,
      roomNo: this.newAllocation.roomNo,
      bedNo: this.newAllocation.bedNo,
      allocationDate: new Date().toISOString().substring(0, 10),
      guardianPhone: this.newAllocation.guardianPhone
    };

    this.allocations.push(alloc);
    this.showAllocateBedModal = false;
    this.newAllocation = { studentName: '', admissionNo: '', class: 'Grade 10-A', blockName: 'Tagore Block (Senior Boys)', roomNo: 'T-103', bedNo: 'Bed A', guardianPhone: '+91 98...' };

    Swal.fire('Bed Allocated', 'Hostel room key and bed assignment confirmed.', 'success');
  }
}
