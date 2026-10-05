import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    fullName: '',
    email: '',
    phone: '',
    instituteName: '',
    message: ''
  };

  submitted = false;
  isSending = false;

  onSubmit(): void {
    this.isSending = true;
    setTimeout(() => {
      this.isSending = false;
      this.submitted = true;
    }, 800);
  }
}
