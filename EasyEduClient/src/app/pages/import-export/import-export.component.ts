import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CurrencyService } from '../../core/services/currency.service';

declare const Swal: any;

export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  fileFormat: string;
  columnsCount: number;
  sampleColumns: string[];
  lastUpdated: string;
  downloadFilename: string;
}

export interface ImportLog {
  id: number;
  jobName: string;
  moduleType: 'Students' | 'Staff' | 'Fees' | 'Vouchers' | 'Inventory';
  fileName: string;
  recordsCount: number;
  successCount: number;
  failedCount: number;
  importedAt: string;
  importedBy: string;
  status: 'Completed' | 'Partially Imported' | 'Failed';
}

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {
  currencyService = inject(CurrencyService);
  activeTab: 'templates' | 'students-import' | 'staff-import' | 'fees-import' | 'vouchers-import' | 'export-hub' | 'history' = 'templates';
  selectedTemplateType: string = 'students';

  templates: TemplateDefinition[] = [
    {
      id: 'students',
      name: 'Students Master Template',
      category: 'Student Information System',
      icon: 'fa-user-graduate',
      description: 'Official Excel/CSV structure for bulk student admissions, parent records, and roll numbers.',
      fileFormat: 'XLSX / CSV',
      columnsCount: 14,
      sampleColumns: ['AdmissionNo', 'FirstName', 'LastName', 'Class', 'Section', 'RollNo', 'Gender', 'DOB', 'GuardianName', 'GuardianPhone', 'GuardianEmail', 'Address', 'BloodGroup', 'NationalID'],
      lastUpdated: '2026-10-01',
      downloadFilename: 'EasyEdu_Students_Import_Template.xlsx'
    },
    {
      id: 'staff',
      name: 'Staff & Faculty Master Template',
      category: 'Human Resource Management',
      icon: 'fa-users-gear',
      description: 'Official template for bulk faculty onboarding, designations, salary retainers, and contact records.',
      fileFormat: 'XLSX / CSV',
      columnsCount: 12,
      sampleColumns: ['StaffNo', 'FirstName', 'LastName', 'Department', 'Designation', 'Email', 'Phone', 'BasicSalary', 'JoiningDate', 'ContractType', 'Qualification', 'EmergencyContact'],
      lastUpdated: '2026-10-01',
      downloadFilename: 'EasyEdu_Staff_Import_Template.xlsx'
    },
    {
      id: 'fees',
      name: 'Fees & Invoices Master Template',
      category: 'Finance & Accounts',
      icon: 'fa-file-invoice-dollar',
      description: 'Bulk billing structure for student term fee invoices, head allocations, and discount concessions.',
      fileFormat: 'XLSX / CSV',
      columnsCount: 10,
      sampleColumns: ['AdmissionNo', 'StudentName', 'FeeGroup', 'FeeHead', 'Amount', 'DueDate', 'DiscountAmount', 'FineAmount', 'AcademicSession', 'Remarks'],
      lastUpdated: '2026-10-01',
      downloadFilename: 'EasyEdu_Fee_Invoices_Template.xlsx'
    },
    {
      id: 'vouchers',
      name: 'Accounting Vouchers Master Template',
      category: 'Financial Ledger & Books',
      icon: 'fa-wallet',
      description: 'Double-entry bulk voucher template for Payment, Receipt, Journal, Contra, and Stock vouchers.',
      fileFormat: 'XLSX / CSV',
      columnsCount: 9,
      sampleColumns: ['VoucherDate', 'VoucherType', 'DebitAccount', 'CreditAccount', 'Amount', 'Narration', 'ReferenceChequeNo', 'CostCenter', 'ApprovedBy'],
      lastUpdated: '2026-10-01',
      downloadFilename: 'EasyEdu_Vouchers_Import_Template.xlsx'
    }
  ];

  // Preview Data for Sample Grid
  studentsPreviewData = [
    { admissionNo: 'ADM-2026-101', firstName: 'Aarav', lastName: 'Sharma', class: 'Grade 10', section: 'A', rollNo: 1, phone: '+91 98450 11001', guardian: 'Sanjay Sharma', status: 'Valid' },
    { admissionNo: 'ADM-2026-102', firstName: 'Diya', lastName: 'Patel', class: 'Grade 10', section: 'B', rollNo: 2, phone: '+91 98450 11002', guardian: 'Kiran Patel', status: 'Valid' },
    { admissionNo: 'ADM-2026-103', firstName: 'Rohan', lastName: 'Gupta', class: 'Grade 9', section: 'B', rollNo: 15, phone: '+91 98450 11003', guardian: 'Manoj Gupta', status: 'Valid' },
    { admissionNo: 'ADM-2026-104', firstName: 'Ananya', lastName: 'Verma', class: 'Grade 9', section: 'A', rollNo: 8, phone: '+91 98450 11004', guardian: 'Sunil Verma', status: 'Valid' }
  ];

  get staffPreviewData() {
    return [
      { staffNo: 'STF-501', name: 'Dr. Ramesh Sharma', department: 'Academics', designation: 'Senior Faculty Teacher', email: 'ramesh.sharma@easyedu.org', phone: '+91 98450 78123', salary: this.currencyService.format(65000), status: 'Valid' },
      { staffNo: 'STF-502', name: 'Sunita Nair', department: 'Science', designation: 'Head of Department', email: 'sunita.nair@easyedu.org', phone: '+91 98450 78124', salary: this.currencyService.format(55000), status: 'Valid' },
      { staffNo: 'STF-503', name: 'Vikram Joshi', department: 'Finance', designation: 'Chief Accountant', email: 'vikram.joshi@easyedu.org', phone: '+91 98450 78125', salary: this.currencyService.format(52000), status: 'Valid' }
    ];
  }

  get feesPreviewData() {
    return [
      { admissionNo: 'ADM-2026-101', studentName: 'Aarav Sharma', feeGroup: 'Senior Secondary Term 1', feeHead: 'Tuition Fee', amount: this.currencyService.format(18500), dueDate: '2026-10-15', status: 'Valid' },
      { admissionNo: 'ADM-2026-102', studentName: 'Diya Patel', feeGroup: 'Senior Secondary Term 1', feeHead: 'Laboratory Fee', amount: this.currencyService.format(4500), dueDate: '2026-10-15', status: 'Valid' },
      { admissionNo: 'ADM-2026-103', studentName: 'Rohan Gupta', feeGroup: 'Secondary Term 1', feeHead: 'Sports & Library', amount: this.currencyService.format(3000), dueDate: '2026-10-15', status: 'Valid' }
    ];
  }

  get vouchersPreviewData() {
    return [
      { date: '2026-10-05', type: 'Payment Voucher', debit: 'Faculty Salary Expense', credit: 'Bank Current Account', amount: this.currencyService.format(72500), memo: 'October salary disbursement', status: 'Valid' },
      { date: '2026-10-04', type: 'Receipt Voucher', debit: 'Bank Current Account', credit: 'Student Fee Revenue', amount: this.currencyService.format(18500), memo: 'Term 1 fee collection', status: 'Valid' },
      { date: '2026-10-03', type: 'Purchase Voucher', debit: 'Library Books Asset', credit: 'National Paper Mart', amount: this.currencyService.format(12400), memo: 'Acquisitions batch #4', status: 'Valid' }
    ];
  }

  importLogs: ImportLog[] = [
    { id: 901, jobName: 'Bulk Grade 10 Admission Ingestion', moduleType: 'Students', fileName: 'Grade10_Admissions_Batch1.xlsx', recordsCount: 140, successCount: 140, failedCount: 0, importedAt: '2026-10-04 11:20', importedBy: 'System Administrator', status: 'Completed' },
    { id: 902, jobName: 'Q3 Term 1 Fee Billing Schedule', moduleType: 'Fees', fileName: 'Term1_Fee_Invoices.xlsx', recordsCount: 450, successCount: 448, failedCount: 2, importedAt: '2026-10-02 16:45', importedBy: 'Chief Accountant', status: 'Partially Imported' },
    { id: 903, jobName: 'Annual Faculty Payroll Calibration', moduleType: 'Staff', fileName: 'Faculty_Master_2026.csv', recordsCount: 65, successCount: 65, failedCount: 0, importedAt: '2026-09-28 09:15', importedBy: 'HR Manager', status: 'Completed' },
    { id: 904, jobName: 'Opening General Ledger Balances', moduleType: 'Vouchers', fileName: 'Opening_Trial_Vouchers.xlsx', recordsCount: 88, successCount: 88, failedCount: 0, importedAt: '2026-09-25 14:30', importedBy: 'System Administrator', status: 'Completed' }
  ];

  selectedUploadFileName = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.syncActiveTabFromUrl();

    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.selectedTemplateType = params['type'].toLowerCase();
        this.switchTabByTemplateType(this.selectedTemplateType);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.syncActiveTabFromUrl();
    });
  }

  private syncActiveTabFromUrl(): void {
    const url = this.router.url.toLowerCase();
    if (url.includes('downloadtemplate')) {
      const type = this.route.snapshot.queryParams['type'] || 'students';
      this.switchTabByTemplateType(type.toLowerCase());
    } else if (url.includes('students')) {
      this.activeTab = 'students-import';
    } else if (url.includes('staff')) {
      this.activeTab = 'staff-import';
    } else if (url.includes('fee')) {
      this.activeTab = 'fees-import';
    } else if (url.includes('voucher')) {
      this.activeTab = 'vouchers-import';
    } else {
      this.activeTab = 'templates';
    }
  }

  switchTabByTemplateType(type: string): void {
    if (type === 'students') this.activeTab = 'students-import';
    else if (type === 'staff') this.activeTab = 'staff-import';
    else if (type === 'fees' || type === 'fee') this.activeTab = 'fees-import';
    else if (type === 'vouchers' || type === 'voucher') this.activeTab = 'vouchers-import';
    else this.activeTab = 'templates';
  }

  downloadTemplate(template: TemplateDefinition): void {
    Swal.fire({
      title: 'Downloading Template',
      text: `Generating "${template.downloadFilename}" with verified schema columns...`,
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  }

  simulateFileUpload(moduleName: string): void {
    this.selectedUploadFileName = `${moduleName}_Bulk_Ingestion_${new Date().toISOString().substring(0, 10)}.xlsx`;
    Swal.fire({
      title: 'File Selected',
      text: `Selected "${this.selectedUploadFileName}". Ready for schema validation & ingestion.`,
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  }

  executeImport(moduleName: 'Students' | 'Staff' | 'Fees' | 'Vouchers'): void {
    if (!this.selectedUploadFileName) {
      Swal.fire('No File Selected', 'Please upload or select an Excel/CSV file to import.', 'warning');
      return;
    }

    Swal.fire({
      title: `Importing ${moduleName} Dataset...`,
      html: `
        <div class="p-3 text-start">
          <div class="d-flex justify-content-between small fw-bold mb-1">
            <span>Parsing records...</span>
            <span class="text-success">100%</span>
          </div>
          <div class="progress mb-3" style="height: 8px;">
            <div class="progress-bar bg-success" style="width: 100%;"></div>
          </div>
          <p class="small text-muted mb-0">Validating unique constraints, format integrity, and foreign keys.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonColor: '#002B49',
      confirmButtonText: 'View Import Summary'
    }).then(() => {
      this.importLogs.unshift({
        id: Date.now(),
        jobName: `Manual ${moduleName} Import`,
        moduleType: moduleName,
        fileName: this.selectedUploadFileName,
        recordsCount: 50,
        successCount: 50,
        failedCount: 0,
        importedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        importedBy: 'System Administrator',
        status: 'Completed'
      });
      this.selectedUploadFileName = '';
      this.activeTab = 'history';
    });
  }

  exportDataset(datasetName: string, format: string): void {
    Swal.fire({
      title: `Exporting ${datasetName}`,
      text: `Compiling institutional records into ${format} package...`,
      icon: 'success',
      timer: 1600,
      showConfirmButton: false
    });
  }
}
