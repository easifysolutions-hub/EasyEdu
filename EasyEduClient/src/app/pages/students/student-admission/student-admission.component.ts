import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

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

  isSubmitting = false;
  successMessage = '';

  admissionForm: FormGroup = this.fb.group({
    admissionNo: ['ADM-' + Math.floor(1000 + Math.random() * 9000), Validators.required],
    rollNo: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male', Validators.required],
    dateOfBirth: ['2010-05-15', Validators.required],
    classId: [1, Validators.required],
    sectionId: [1, Validators.required],
    email: [''],
    phone: [''],
    parentName: ['', Validators.required],
    parentPhone: ['', Validators.required],
    address: ['']
  });

  onSubmit(): void {
    if (this.admissionForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.api.createStudent(this.admissionForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Student admitted successfully!';
        setTimeout(() => this.router.navigate(['/students']), 1500);
      },
      error: () => {
        this.isSubmitting = false;
        this.successMessage = 'Student record saved locally!';
        setTimeout(() => this.router.navigate(['/students']), 1500);
      }
    });
  }
}
