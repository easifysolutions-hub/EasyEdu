import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ClassItem, DashboardStats, FeeInvoice, Staff, Student } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.base}/dashboard/stats`).pipe(
      catchError(() => of({
        totalStudents: 1250,
        totalTeachers: 84,
        totalParents: 1120,
        totalStaff: 45,
        todayAttendancePercentage: 94.8,
        totalEarnings: 845000,
        totalExpenses: 320000,
        recentStudents: [
          { admissionNo: 'ADM-2026-001', name: 'Aarav Sharma', className: 'Grade 10 - A', gender: 'Male', status: 'Active' },
          { admissionNo: 'ADM-2026-002', name: 'Ananya Iyer', className: 'Grade 9 - B', gender: 'Female', status: 'Active' },
          { admissionNo: 'ADM-2026-003', name: 'Rohan Patel', className: 'Grade 12 - Science', gender: 'Male', status: 'Active' },
          { admissionNo: 'ADM-2026-004', name: 'Diya Menon', className: 'Grade 8 - A', gender: 'Female', status: 'Active' },
          { admissionNo: 'ADM-2026-005', name: 'Kavya Reddy', className: 'Grade 11 - Commerce', gender: 'Female', status: 'Active' }
        ],
        recentFeeCollections: [
          { invoiceNo: 'INV-8821', studentName: 'Aarav Sharma', amount: 15000, date: '2026-10-04', status: 'Paid' },
          { invoiceNo: 'INV-8822', studentName: 'Ananya Iyer', amount: 12500, date: '2026-10-04', status: 'Paid' },
          { invoiceNo: 'INV-8823', studentName: 'Pooja Verma', amount: 18000, date: '2026-10-03', status: 'Paid' }
        ]
      }))
    );
  }

  // Students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.base}/students`).pipe(
      catchError(() => of([
        { id: 1, admissionNo: 'ADM-2026-001', firstName: 'Aarav', lastName: 'Sharma', gender: 'Male', classId: 1, className: 'Grade 10', rollNo: '101', email: 'aarav@example.com', phone: '+91 9876543210', isActive: true },
        { id: 2, admissionNo: 'ADM-2026-002', firstName: 'Ananya', lastName: 'Iyer', gender: 'Female', classId: 2, className: 'Grade 9', rollNo: '902', email: 'ananya@example.com', phone: '+91 9876543211', isActive: true },
        { id: 3, admissionNo: 'ADM-2026-003', firstName: 'Rohan', lastName: 'Patel', gender: 'Male', classId: 3, className: 'Grade 12', rollNo: '1205', email: 'rohan@example.com', phone: '+91 9876543212', isActive: true },
        { id: 4, admissionNo: 'ADM-2026-004', firstName: 'Diya', lastName: 'Menon', gender: 'Female', classId: 4, className: 'Grade 8', rollNo: '804', email: 'diya@example.com', phone: '+91 9876543213', isActive: true },
        { id: 5, admissionNo: 'ADM-2026-005', firstName: 'Kavya', lastName: 'Reddy', gender: 'Female', classId: 5, className: 'Grade 11', rollNo: '1103', email: 'kavya@example.com', phone: '+91 9876543214', isActive: true }
      ]))
    );
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.base}/students`, student);
  }

  // Staff / Teachers
  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.base}/staff`).pipe(
      catchError(() => of([
        { id: 1, staffNo: 'STF-01', firstName: 'Dr. Ramesh', lastName: 'Kumar', designation: 'Senior Lecturer', department: 'Mathematics', email: 'ramesh@easyedu.com', phone: '+91 9845012345', salary: 65000, isActive: true },
        { id: 2, staffNo: 'STF-02', firstName: 'Sunita', lastName: 'Nair', designation: 'Head of Department', department: 'Physics', email: 'sunita@easyedu.com', phone: '+91 9845012346', salary: 72000, isActive: true },
        { id: 3, staffNo: 'STF-03', firstName: 'Vikram', lastName: 'Singh', designation: 'Teacher', department: 'Computer Science', email: 'vikram@easyedu.com', phone: '+91 9845012347', salary: 58000, isActive: true }
      ]))
    );
  }

  // Classes & Academic
  getClasses(): Observable<ClassItem[]> {
    return this.http.get<ClassItem[]>(`${this.base}/academic/classes`).pipe(
      catchError(() => of([
        { id: 1, name: 'Grade 10', sections: [{ id: 1, name: 'Section A', classId: 1 }, { id: 2, name: 'Section B', classId: 1 }] },
        { id: 2, name: 'Grade 9', sections: [{ id: 3, name: 'Section A', classId: 2 }, { id: 4, name: 'Section B', classId: 2 }] },
        { id: 3, name: 'Grade 12', sections: [{ id: 5, name: 'Science', classId: 3 }, { id: 6, name: 'Commerce', classId: 3 }] }
      ]))
    );
  }

  // Fees
  getFeeInvoices(): Observable<FeeInvoice[]> {
    const mockInvoices: FeeInvoice[] = [
      { id: 1, studentId: 1, studentName: 'Aarav Sharma', admissionNo: 'ADM-2026-001', amount: 25000, paidAmount: 25000, balanceAmount: 0, dueDate: '2026-10-15', status: 'Paid', feeGroup: 'Term 1 Tuition' },
      { id: 2, studentId: 2, studentName: 'Ananya Iyer', admissionNo: 'ADM-2026-002', amount: 22000, paidAmount: 15000, balanceAmount: 7000, dueDate: '2026-10-15', status: 'Partial', feeGroup: 'Term 1 Tuition' },
      { id: 3, studentId: 3, studentName: 'Rohan Patel', admissionNo: 'ADM-2026-003', amount: 28000, paidAmount: 0, balanceAmount: 28000, dueDate: '2026-10-20', status: 'Unpaid', feeGroup: 'Term 1 Tuition' }
    ];
    return this.http.get<FeeInvoice[]>(`${this.base}/fees/invoices`).pipe(
      catchError(() => of(mockInvoices))
    );
  }
}
