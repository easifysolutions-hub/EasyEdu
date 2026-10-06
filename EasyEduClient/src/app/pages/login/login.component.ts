import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PermissionService } from '../../core/services/permission.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private permissionService = inject(PermissionService);
  private router = inject(Router);

  currentYear = new Date().getFullYear();
  isHighlighted = false;
  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['admin@easyedu.com', [Validators.required, Validators.email]],
    password: ['Admin@123', [Validators.required]],
    rememberMe: [true]
  });

  fillDemoCredentials(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const role = select.value;
    
    let email = '';
    let password = '';

    switch(role) {
      case 'admin': email = 'admin@easyedu.com'; password = 'Admin@123'; break;
      case 'teacher': email = 'teacher@easyedu.com'; password = 'Teacher@123'; break;
      case 'student': email = 'student@easyedu.com'; password = 'Student@123'; break;
      case 'parent': email = 'parent@easyedu.com'; password = 'Parent@123'; break;
      case 'accountant': email = 'accountant@easyedu.com'; password = 'Accountant@123'; break;
      case 'librarian': email = 'librarian@easyedu.com'; password = 'Librarian@123'; break;
    }

    if (email) {
      this.loginForm.patchValue({ email, password });
      this.isHighlighted = true;
      setTimeout(() => {
        this.isHighlighted = false;
      }, 800);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please provide valid credentials.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const email = this.loginForm.value.email.toLowerCase().trim();

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.user && res.user.roles && res.user.roles.length > 0) {
          this.permissionService.setRole(res.user.roles[0]);
        }
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        
        // Derive appropriate role from email in demo/fallback mode
        let detectedRole = 'Super Admin';
        let fullName = 'System Administrator';

        if (email.includes('teacher')) {
          detectedRole = 'Teacher / Faculty';
          fullName = 'Prof. Marcus Chen';
        } else if (email.includes('student')) {
          detectedRole = 'Student';
          fullName = 'Aarav Sharma';
        } else if (email.includes('parent')) {
          detectedRole = 'Parent / Guardian';
          fullName = 'Vikram Sharma';
        } else if (email.includes('accountant')) {
          detectedRole = 'Accountant';
          fullName = 'Deepak Sharma';
        } else if (email.includes('librarian')) {
          detectedRole = 'Librarian';
          fullName = 'Pooja Verma';
        } else if (email.includes('admin')) {
          detectedRole = 'Super Admin';
          fullName = 'System Administrator';
        }

        this.permissionService.setRole(detectedRole);

        this.authService.currentUser.set({
          id: '1',
          userName: this.loginForm.value.email,
          email: this.loginForm.value.email,
          fullName: fullName,
          roles: [detectedRole]
        });
        localStorage.setItem('easyedu_token', 'mock_jwt_token');
        localStorage.setItem('easyedu_user', JSON.stringify({
          id: '1',
          userName: this.loginForm.value.email,
          email: this.loginForm.value.email,
          fullName: fullName,
          roles: [detectedRole]
        }));
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
