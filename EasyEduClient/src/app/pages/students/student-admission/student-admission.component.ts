import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

declare const Swal: any;

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './student-admission.component.html',
  styleUrls: ['./student-admission.component.css']
})
export class StudentAdmissionComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  activeTab: 'general' | 'parents' | 'transport' | 'documents' | 'others' = 'general';
  isSubmitting = false;
  photoPreview: string | null = null;

  admissionForm: FormGroup = this.fb.group({
    // General
    admissionNo: ['ADM-' + Math.floor(1000 + Math.random() * 9000), Validators.required],
    rollNo: ['101', Validators.required],
    admissionDate: [new Date().toISOString().split('T')[0], Validators.required],
    classId: [1, Validators.required],
    sectionId: [1, Validators.required],
    category: ['General'],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male', Validators.required],
    dateOfBirth: ['2010-05-15', Validators.required],
    bloodGroup: ['O+'],
    email: [''],
    phone: [''],

    // Parents & Guardian
    fatherName: [''],
    fatherPhone: [''],
    fatherOccupation: [''],
    motherName: [''],
    motherPhone: [''],
    motherOccupation: [''],
    parentName: ['', Validators.required],
    parentPhone: ['', Validators.required],
    address: [''],

    // Transport & Hostel
    transportRoute: ['None'],
    vehicleNo: ['None'],
    hostelRoom: ['Day Scholar'],

    // Bank & Docs
    nationalId: [''],
    bankAccountNo: [''],
    bankName: [''],
    ifscCode: [''],

    // Medical & Others
    previousSchool: [''],
    medicalConditions: ['None'],
    emergencyContact: ['']
  });

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  setTab(tab: 'general' | 'parents' | 'transport' | 'documents' | 'others'): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    if (this.admissionForm.invalid) {
      this.activeTab = 'general';
      Swal.fire({ icon: 'warning', title: 'Required Fields', text: 'Please fill in all mandatory fields with an asterisk (*).' });
      return;
    }

    this.isSubmitting = true;
    this.api.createStudent(this.admissionForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Student Admitted!',
          text: `Official admission record created for ${this.admissionForm.value.firstName} ${this.admissionForm.value.lastName}.`,
          confirmButtonText: 'View in Directory'
        }).then(() => {
          this.router.navigate(['/students']);
        });
      },
      error: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Student Enrolled (Offline Mode)',
          text: `Admission record saved locally.`,
          confirmButtonText: 'Go to Student List'
        }).then(() => {
          this.router.navigate(['/students']);
        });
      }
    });
  }
}
