import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModuleManagerService, ModuleItem } from '../../core/services/module-manager.service';

declare const Swal: any;

@Component({
  selector: 'app-module-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './module-manager.component.html',
  styleUrls: ['./module-manager.component.css']
})
export class ModuleManagerComponent implements OnInit {
  moduleService = inject(ModuleManagerService);

  showUploadModal = false;
  uploadForm = {
    name: '',
    version: 'v1.0.0',
    category: 'Virtual Classroom',
    description: '',
    file: null as File | null
  };

  uploadProgress = 0;
  isUploading = false;

  get modules(): ModuleItem[] {
    return this.moduleService.modules();
  }

  ngOnInit(): void {}

  onToggle(module: ModuleItem): void {
    const newState = this.moduleService.toggleModule(module.id);
    const stateText = newState ? 'Activated' : 'Deactivated';
    const iconType = newState ? 'success' : 'info';
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      icon: iconType,
      title: `${module.name} is now ${stateText}`,
      text: newState ? 'Module is now active and available in navigation.' : 'Module is now disabled and hidden across the system.'
    });
  }

  openUploadModal(): void {
    this.showUploadModal = true;
    this.uploadForm = {
      name: '',
      version: 'v1.0.0',
      category: 'Virtual Classroom',
      description: '',
      file: null
    };
    this.uploadProgress = 0;
    this.isUploading = false;
  }

  closeUploadModal(): void {
    if (!this.isUploading) {
      this.showUploadModal = false;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.file = file;
      if (!this.uploadForm.name) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        this.uploadForm.name = cleanName.charAt(0).toUpperCase() + cleanName.slice(1) + ' Addon';
      }
    }
  }

  submitUpload(): void {
    if (!this.uploadForm.name || !this.uploadForm.description) {
      Swal.fire('Missing Details', 'Please provide module title and description.', 'warning');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 15;

    const interval = setInterval(() => {
      this.uploadProgress += 20;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.isUploading = false;
        
        this.moduleService.addModule({
          name: this.uploadForm.name,
          version: this.uploadForm.version || 'v1.0.0',
          category: this.uploadForm.category,
          description: this.uploadForm.description,
          icon: 'fas fa-puzzle-piece',
          iconBg: '#ede9fe',
          iconColor: '#7c3aed',
          isActive: true,
          route: '/dashboard'
        });

        this.showUploadModal = false;
        Swal.fire({
          title: 'Module Installed!',
          text: `"${this.uploadForm.name}" has been registered and activated successfully.`,
          icon: 'success',
          confirmButtonColor: '#7c3aed'
        });
      }
    }, 250);
  }
}
