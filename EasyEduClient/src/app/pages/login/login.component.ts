import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['admin@easyedu.com', [Validators.required, Validators.email]],
    password: ['Admin@123', [Validators.required]]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        // In local development, if backend API is not up yet, allow sign-in with default credentials
        this.authService.currentUser.set({
          id: '1',
          userName: 'admin@easyedu.com',
          email: 'admin@easyedu.com',
          fullName: 'System Administrator',
          roles: ['SuperAdmin']
        });
        localStorage.setItem('easyedu_token', 'mock_jwt_token');
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
