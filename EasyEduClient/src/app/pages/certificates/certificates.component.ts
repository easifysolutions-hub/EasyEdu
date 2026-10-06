import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare const Swal: any;

interface CertificateRecord {
  id: number;
  certificateNo: string;
  type: 'Transfer Certificate (TC)' | 'Bonafide Certificate' | 'Character Certificate' | 'Sports Merit';
  studentName: string;
  admissionNo: string;
  class: string;
  issueDate: string;
  purpose: string;
  issuedBy: string;
}

interface IdCardRecord {
  id: number;
  name: string;
  type: 'Student' | 'Staff';
  identifier: string; // Admission # or Emp #
  roleOrClass: string;
  bloodGroup: string;
  phone: string;
  validTill: string;
}

interface CertificateTemplate {
  id: number;
  name: string;
  type: string;
  headerText: string;
  footerSignatory: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  private route = inject(ActivatedRoute);

  activeTab: 'issued' | 'generate' | 'idcards' | 'staffcards' | 'templates' = 'issued';

  records: CertificateRecord[] = [
    { id: 1, certificateNo: 'TC-2025-089', type: 'Transfer Certificate (TC)', studentName: 'Aarav Sharma', admissionNo: 'ADM-2024-001', class: 'Grade 10-A', issueDate: '2025-05-02', purpose: 'Relocation to another state', issuedBy: 'Principal Office' },
    { id: 2, certificateNo: 'BON-2025-112', type: 'Bonafide Certificate', studentName: 'Diya Patel', admissionNo: 'ADM-2024-002', class: 'Grade 10-B', issueDate: '2025-04-29', purpose: 'Passport Application Verification', issuedBy: 'Administration Office' },
    { id: 3, certificateNo: 'CHR-2025-045', type: 'Character Certificate', studentName: 'Ananya Verma', admissionNo: 'ADM-2024-004', class: 'Grade 9-A', issueDate: '2025-04-25', purpose: 'National Science Olympiad Scholarship', issuedBy: 'Academic Director' },
    { id: 4, certificateNo: 'SPT-2025-018', type: 'Sports Merit', studentName: 'Kabir Singh', admissionNo: 'ADM-2024-005', class: 'Grade 11-Science', issueDate: '2025-04-20', purpose: 'Inter-School Football Championship Gold Medal', issuedBy: 'Sports Dept' }
  ];

  students: IdCardRecord[] = [
    { id: 1, name: 'Aarav Sharma', type: 'Student', identifier: 'ADM-2024-001', roleOrClass: 'Grade 10-A', bloodGroup: 'O+', phone: '+91 98450 11001', validTill: 'Mar 2026' },
    { id: 2, name: 'Diya Patel', type: 'Student', identifier: 'ADM-2024-002', roleOrClass: 'Grade 10-B', bloodGroup: 'B+', phone: '+91 98450 11002', validTill: 'Mar 2026' },
    { id: 3, name: 'Rohan Gupta', type: 'Student', identifier: 'ADM-2024-003', roleOrClass: 'Grade 10-A', bloodGroup: 'A+', phone: '+91 98450 11003', validTill: 'Mar 2026' },
    { id: 4, name: 'Ananya Verma', type: 'Student', identifier: 'ADM-2024-004', roleOrClass: 'Grade 9-A', bloodGroup: 'AB+', phone: '+91 98450 11004', validTill: 'Mar 2026' }
  ];

  staffCards: IdCardRecord[] = [
    { id: 101, name: 'Dr. Ramesh Sharma', type: 'Staff', identifier: 'EMP-101', roleOrClass: 'Head of Department (Science)', bloodGroup: 'O+', phone: '+91 98765 00101', validTill: 'Dec 2028' },
    { id: 102, name: 'Sunita Nair', type: 'Staff', identifier: 'EMP-102', roleOrClass: 'Senior Physics Lecturer', bloodGroup: 'A+', phone: '+91 98765 00102', validTill: 'Dec 2028' },
    { id: 103, name: 'Prof. Rajesh Khanna', type: 'Staff', identifier: 'EMP-103', roleOrClass: 'Professor of Computer Science', bloodGroup: 'B+', phone: '+91 98765 00103', validTill: 'Dec 2028' }
  ];

  templates: CertificateTemplate[] = [
    { id: 1, name: 'Standard Transfer Certificate (TC)', type: 'Transfer Certificate (TC)', headerText: 'EASYEDU INTERNATIONAL ACADEMY - TRANSFER CERTIFICATE', footerSignatory: 'Principal & Examination Board' },
    { id: 2, name: 'Official Bonafide Scholar Certificate', type: 'Bonafide Certificate', headerText: 'TO WHOMSOEVER IT MAY CONCERN - BONAFIDE CERTIFICATE', footerSignatory: 'Administrative Officer' },
    { id: 3, name: 'Certificate of Academic & Character Merit', type: 'Character Certificate', headerText: 'CERTIFICATE OF CHARACTER & MERITORIOUS CONDUCT', footerSignatory: 'Principal' }
  ];

  // Modals state
  showCertificatePrintModal = false;
  selectedCertificate: CertificateRecord | null = null;

  showIdCardPrintModal = false;
  selectedIdCard: IdCardRecord | null = null;

  // Generate Form
  generateForm = {
    studentName: 'Aarav Sharma',
    admissionNo: 'ADM-2024-001',
    class: 'Grade 10-A',
    type: 'Transfer Certificate (TC)' as const,
    purpose: '',
    conduct: 'Exemplary & Excellent'
  };

  ngOnInit(): void {
    this.selectedCertificate = this.records[0];
    this.selectedIdCard = this.students[0];

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const t = params['tab'].toLowerCase();
        if (t === 'issued' || t === 'generate' || t === 'idcards' || t === 'staffcards' || t === 'templates') {
          this.activeTab = t as any;
        }
      }
    });
  }

  openCertificatePrint(rec: CertificateRecord): void {
    this.selectedCertificate = rec;
    this.showCertificatePrintModal = true;
  }

  openIdCardPrint(card: IdCardRecord): void {
    this.selectedIdCard = card;
    this.showIdCardPrintModal = true;
  }

  generateNewCertificate(): void {
    if (!this.generateForm.studentName || !this.generateForm.purpose) {
      Swal.fire('Missing Information', 'Please provide Student Name and Purpose of Certificate.', 'warning');
      return;
    }

    const rec: CertificateRecord = {
      id: this.records.length + 1,
      certificateNo: `CERT-2025-0${Math.floor(100 + Math.random() * 900)}`,
      type: this.generateForm.type,
      studentName: this.generateForm.studentName,
      admissionNo: this.generateForm.admissionNo,
      class: this.generateForm.class,
      issueDate: new Date().toISOString().substring(0, 10),
      purpose: this.generateForm.purpose,
      issuedBy: 'Principal Office'
    };

    this.records.unshift(rec);
    this.activeTab = 'issued';

    Swal.fire({
      title: 'Certificate Generated!',
      text: `${rec.type} issued for ${rec.studentName}.`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#002B49',
      confirmButtonText: '<i class="fas fa-print me-1"></i> Print Certificate'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.openCertificatePrint(rec);
      }
    });
  }

  printDocument(): void {
    window.print();
  }
}
