import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface BusRoute {
  id: number;
  routeTitle: string;
  startPoint: string;
  endPoint: string;
  stopsCount: number;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  fare: number;
  studentsCount: number;
  capacity: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
}

interface Vehicle {
  id: number;
  vehicleNo: string;
  model: string;
  seatingCapacity: number;
  fuelType: 'Diesel' | 'Electric' | 'CNG';
  driverAssigned: string;
  insuranceExpiry: string;
  fitnessValidTill: string;
  gpsEnabled: boolean;
  status: 'Operational' | 'In Service' | 'Idle';
}

interface Driver {
  id: number;
  name: string;
  licenseNo: string;
  phone: string;
  experienceYears: number;
  assignedVehicle: string;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  rating: number;
}

interface StudentAllocation {
  id: number;
  studentName: string;
  admissionNo: string;
  class: string;
  routeTitle: string;
  vehicleNo: string;
  pickupStop: string;
  pickupTime: string;
  dropTime: string;
  fare: number;
}

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  activeTab: 'routes' | 'vehicles' | 'drivers' | 'students' | 'tracking' = 'routes';
  searchTerm = '';

  routes: BusRoute[] = [
    { id: 1, routeTitle: 'North Campus Route 1', startPoint: 'Hebbal Flyover', endPoint: 'Campus Gate 1', stopsCount: 8, vehicleNo: 'KA-01-EB-1204', driverName: 'Suresh Gowda', driverPhone: '+91 98450 78123', fare: 2500, studentsCount: 38, capacity: 42, status: 'Active' },
    { id: 2, routeTitle: 'South Metro Ring Road Route 2', startPoint: 'Silk Board Junction', endPoint: 'Campus Gate 1', stopsCount: 11, vehicleNo: 'KA-01-EB-1205', driverName: 'Manjunath B', driverPhone: '+91 98450 78124', fare: 2800, studentsCount: 42, capacity: 45, status: 'Active' },
    { id: 3, routeTitle: 'East IT Corridor Route 3', startPoint: 'Whitefield TTMC', endPoint: 'Campus Gate 2', stopsCount: 9, vehicleNo: 'KA-01-EB-1206', driverName: 'Irfan Pasha', driverPhone: '+91 98450 78125', fare: 3000, studentsCount: 35, capacity: 40, status: 'Active' },
    { id: 4, routeTitle: 'West City Express Route 4', startPoint: 'Rajajinagar Metro', endPoint: 'Campus Gate 1', stopsCount: 6, vehicleNo: 'KA-01-EB-1207', driverName: 'Ramesh Kumar', driverPhone: '+91 98450 78126', fare: 2400, studentsCount: 28, capacity: 35, status: 'Active' }
  ];

  vehicles: Vehicle[] = [
    { id: 1, vehicleNo: 'KA-01-EB-1204', model: 'Tata Starbus 42-Seater', seatingCapacity: 42, fuelType: 'Diesel', driverAssigned: 'Suresh Gowda', insuranceExpiry: '2026-03-31', fitnessValidTill: '2026-11-30', gpsEnabled: true, status: 'Operational' },
    { id: 2, vehicleNo: 'KA-01-EB-1205', model: 'Ashok Leyland Sunshine', seatingCapacity: 45, fuelType: 'Diesel', driverAssigned: 'Manjunath B', insuranceExpiry: '2026-04-15', fitnessValidTill: '2026-12-15', gpsEnabled: true, status: 'Operational' },
    { id: 3, vehicleNo: 'KA-01-EB-1206', model: 'Eicher Skyline Pro', seatingCapacity: 40, fuelType: 'CNG', driverAssigned: 'Irfan Pasha', insuranceExpiry: '2026-01-20', fitnessValidTill: '2026-09-30', gpsEnabled: true, status: 'Operational' },
    { id: 4, vehicleNo: 'KA-01-EB-1207', model: 'Force Traveller Mini 35', seatingCapacity: 35, fuelType: 'Diesel', driverAssigned: 'Ramesh Kumar', insuranceExpiry: '2025-12-10', fitnessValidTill: '2026-08-10', gpsEnabled: true, status: 'Operational' },
    { id: 5, vehicleNo: 'KA-01-EB-1208', model: 'Olectra Electric Bus 32', seatingCapacity: 32, fuelType: 'Electric', driverAssigned: 'Standby / Relief', insuranceExpiry: '2026-06-30', fitnessValidTill: '2027-01-15', gpsEnabled: true, status: 'Idle' }
  ];

  drivers: Driver[] = [
    { id: 1, name: 'Suresh Gowda', licenseNo: 'DL-KA0120150009', phone: '+91 98450 78123', experienceYears: 12, assignedVehicle: 'KA-01-EB-1204', status: 'On Duty', rating: 4.9 },
    { id: 2, name: 'Manjunath B', licenseNo: 'DL-KA0120170014', phone: '+91 98450 78124', experienceYears: 9, assignedVehicle: 'KA-01-EB-1205', status: 'On Duty', rating: 4.8 },
    { id: 3, name: 'Irfan Pasha', licenseNo: 'DL-KA0120120088', phone: '+91 98450 78125', experienceYears: 14, assignedVehicle: 'KA-01-EB-1206', status: 'On Duty', rating: 5.0 },
    { id: 4, name: 'Ramesh Kumar', licenseNo: 'DL-KA0120190032', phone: '+91 98450 78126', experienceYears: 7, assignedVehicle: 'KA-01-EB-1207', status: 'On Duty', rating: 4.7 }
  ];

  studentAllocations: StudentAllocation[] = [
    { id: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', routeTitle: 'North Campus Route 1', vehicleNo: 'KA-01-EB-1204', pickupStop: 'Hebbal Esteem Mall', pickupTime: '07:20 AM', dropTime: '03:45 PM', fare: 2500 },
    { id: 2, studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', class: 'Grade 10-B', routeTitle: 'South Metro Ring Road Route 2', vehicleNo: 'KA-01-EB-1205', pickupStop: 'HSR BDA Complex', pickupTime: '07:15 AM', dropTime: '03:50 PM', fare: 2800 },
    { id: 3, studentName: 'Rohan Gupta', admissionNo: 'ADM-2024-003', class: 'Grade 9-B', routeTitle: 'East IT Corridor Route 3', vehicleNo: 'KA-01-EB-1206', pickupStop: 'Marathahalli Bridge', pickupTime: '07:30 AM', dropTime: '03:40 PM', fare: 3000 },
    { id: 4, studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', class: 'Grade 9-A', routeTitle: 'North Campus Route 1', vehicleNo: 'KA-01-EB-1204', pickupStop: 'Sahakarnagar Main', pickupTime: '07:35 AM', dropTime: '03:30 PM', fare: 2500 }
  ];

  // Modals state
  showAddRouteModal = false;
  newRoute: Partial<BusRoute> = {
    routeTitle: '',
    startPoint: '',
    endPoint: 'Main Campus',
    stopsCount: 5,
    vehicleNo: 'KA-01-EB-1204',
    fare: 2500
  };

  showAddVehicleModal = false;
  newVehicle: Partial<Vehicle> = {
    vehicleNo: '',
    model: '',
    seatingCapacity: 40,
    fuelType: 'Diesel',
    driverAssigned: 'Unassigned',
    gpsEnabled: true
  };

  showAddDriverModal = false;
  newDriver: Partial<Driver> = {
    name: '',
    licenseNo: '',
    phone: '',
    experienceYears: 5,
    assignedVehicle: 'KA-01-EB-1204'
  };

  showAllocateStudentModal = false;
  newAllocation = {
    studentName: '',
    admissionNo: '',
    class: 'Grade 10-A',
    routeTitle: 'North Campus Route 1',
    pickupStop: '',
    pickupTime: '07:30 AM',
    dropTime: '03:30 PM'
  };

  ngOnInit(): void {}

  get totalStudentsTransported(): number {
    return this.routes.reduce((acc, r) => acc + r.studentsCount, 0);
  }

  saveRoute(): void {
    if (!this.newRoute.routeTitle || !this.newRoute.startPoint) {
      Swal.fire('Missing Information', 'Please fill Route Title and Starting Point.', 'warning');
      return;
    }

    const route: BusRoute = {
      id: this.routes.length + 1,
      routeTitle: this.newRoute.routeTitle!,
      startPoint: this.newRoute.startPoint!,
      endPoint: this.newRoute.endPoint || 'Main Campus',
      stopsCount: Number(this.newRoute.stopsCount) || 5,
      vehicleNo: this.newRoute.vehicleNo || 'KA-01-EB-1204',
      driverName: 'Assigned Driver',
      driverPhone: '+91 98450 00000',
      fare: Number(this.newRoute.fare) || 2500,
      studentsCount: 0,
      capacity: 40,
      status: 'Active'
    };

    this.routes.push(route);
    this.showAddRouteModal = false;
    this.newRoute = { routeTitle: '', startPoint: '', endPoint: 'Main Campus', stopsCount: 5, fare: 2500 };
    Swal.fire('Route Saved', 'New transport route and stops added.', 'success');
  }

  saveVehicle(): void {
    if (!this.newVehicle.vehicleNo || !this.newVehicle.model) {
      Swal.fire('Missing Information', 'Please enter Vehicle Registration # and Model.', 'warning');
      return;
    }

    const v: Vehicle = {
      id: this.vehicles.length + 1,
      vehicleNo: this.newVehicle.vehicleNo!,
      model: this.newVehicle.model!,
      seatingCapacity: Number(this.newVehicle.seatingCapacity) || 40,
      fuelType: this.newVehicle.fuelType || 'Diesel',
      driverAssigned: this.newVehicle.driverAssigned || 'Unassigned',
      insuranceExpiry: '2026-06-30',
      fitnessValidTill: '2026-12-31',
      gpsEnabled: true,
      status: 'Operational'
    };

    this.vehicles.push(v);
    this.showAddVehicleModal = false;
    this.newVehicle = { vehicleNo: '', model: '', seatingCapacity: 40, fuelType: 'Diesel' };
    Swal.fire('Vehicle Added', 'New bus added to fleet inventory.', 'success');
  }

  saveDriver(): void {
    if (!this.newDriver.name || !this.newDriver.phone) {
      Swal.fire('Missing Information', 'Please enter Driver Name and Contact Phone.', 'warning');
      return;
    }

    const d: Driver = {
      id: this.drivers.length + 1,
      name: this.newDriver.name!,
      licenseNo: this.newDriver.licenseNo || `DL-KA01202${Math.floor(1000 + Math.random() * 9000)}`,
      phone: this.newDriver.phone!,
      experienceYears: Number(this.newDriver.experienceYears) || 5,
      assignedVehicle: this.newDriver.assignedVehicle || 'KA-01-EB-1204',
      status: 'On Duty',
      rating: 5.0
    };

    this.drivers.push(d);
    this.showAddDriverModal = false;
    this.newDriver = { name: '', licenseNo: '', phone: '', experienceYears: 5 };
    Swal.fire('Driver Enrolled', 'Staff driver record created.', 'success');
  }

  saveAllocation(): void {
    if (!this.newAllocation.studentName || !this.newAllocation.pickupStop) {
      Swal.fire('Missing Information', 'Please provide Student Name and Pickup Stop.', 'warning');
      return;
    }

    const alloc: StudentAllocation = {
      id: this.studentAllocations.length + 1,
      studentName: this.newAllocation.studentName,
      admissionNo: this.newAllocation.admissionNo || `ADM-2025-0${Math.floor(10 + Math.random() * 90)}`,
      class: this.newAllocation.class,
      routeTitle: this.newAllocation.routeTitle,
      vehicleNo: 'KA-01-EB-1204',
      pickupStop: this.newAllocation.pickupStop,
      pickupTime: this.newAllocation.pickupTime,
      dropTime: this.newAllocation.dropTime,
      fare: 2500
    };

    this.studentAllocations.push(alloc);
    this.showAllocateStudentModal = false;
    this.newAllocation = { studentName: '', admissionNo: '', class: 'Grade 10-A', routeTitle: 'North Campus Route 1', pickupStop: '', pickupTime: '07:30 AM', dropTime: '03:30 PM' };
    Swal.fire('Student Allocated', 'Student assigned to bus route with seat confirmation.', 'success');
  }
}
