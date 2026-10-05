import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  routes = [
    { id: 1, routeTitle: 'North Campus Route (Route 1)', vehicleNo: 'KA-01-EB-1204', driverName: 'Suresh Gowda', driverPhone: '+91 98450 78123', fare: 2500, studentsCount: 38 },
    { id: 2, routeTitle: 'South Metro Ring Road (Route 2)', vehicleNo: 'KA-01-EB-1205', driverName: 'Manjunath B', driverPhone: '+91 98450 78124', fare: 2800, studentsCount: 42 },
    { id: 3, routeTitle: 'East IT Corridor (Route 3)', vehicleNo: 'KA-01-EB-1206', driverName: 'Irfan Pasha', driverPhone: '+91 98450 78125', fare: 3000, studentsCount: 35 }
  ];
}
