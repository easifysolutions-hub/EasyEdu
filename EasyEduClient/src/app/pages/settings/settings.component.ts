import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  themeService = inject(ThemeService);

  schoolName = 'EasyEdu International Academy';
  schoolEmail = 'admin@easyedu.com';
  schoolPhone = '+91 98765 43210';
  currency = 'INR (₹)';
  language = 'en';
  isSaved = false;

  saveSettings(): void {
    this.isSaved = true;
    setTimeout(() => this.isSaved = false, 2500);
  }
}
