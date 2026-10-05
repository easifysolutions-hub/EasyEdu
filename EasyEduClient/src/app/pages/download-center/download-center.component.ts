import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

interface StudyMaterial {
  id: number;
  title: string;
  type: 'Syllabus' | 'Assignments' | 'Study Material' | 'Other Downloads';
  class: string;
  subject: string;
  uploadDate: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  downloadsCount: number;
}

@Component({
  selector: 'app-download-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.css']
})
export class DownloadCenterComponent implements OnInit {
  activeTab: 'all' | 'syllabus' | 'assignments' | 'notes' | 'upload' = 'all';
  searchTerm = '';

  materials: StudyMaterial[] = [
    { id: 1, title: 'Grade 10 Mathematics Complete Term 1 Formula Sheet & Revision', type: 'Study Material', class: 'Grade 10-A', subject: 'Mathematics', uploadDate: '2025-05-01', fileName: 'Class10_Math_Formulae.pdf', fileSize: '3.2 MB', uploadedBy: 'Dr. Ramesh Sharma', downloadsCount: 245 },
    { id: 2, title: 'Physics Optics Ray Optics Solved Exemplar & Lab Manual', type: 'Study Material', class: 'Grade 10-B', subject: 'Physics', uploadDate: '2025-04-29', fileName: 'Physics_Optics_Lab_Guide.pdf', fileSize: '4.8 MB', uploadedBy: 'Sunita Nair', downloadsCount: 198 },
    { id: 3, title: 'Annual CBSE Senior Secondary Board Syllabus 2025-26', type: 'Syllabus', class: 'All Classes', subject: 'All Subjects', uploadDate: '2025-04-15', fileName: 'CBSE_Official_Curriculum_2025.pdf', fileSize: '1.5 MB', uploadedBy: 'Academic Director', downloadsCount: 512 },
    { id: 4, title: 'Python Programming Data Structures Workbook Set 1', type: 'Assignments', class: 'Grade 11-Science', subject: 'Computer Science', uploadDate: '2025-05-02', fileName: 'Python_DS_Workbook.pdf', fileSize: '2.1 MB', uploadedBy: 'Prof. Rajesh Khanna', downloadsCount: 88 }
  ];

  // Upload Form
  uploadForm = {
    title: '',
    type: 'Study Material' as const,
    class: 'Grade 10-A',
    subject: 'Mathematics',
    fileName: 'Material_Attachment.pdf'
  };

  ngOnInit(): void {}

  get filteredMaterials(): StudyMaterial[] {
    return this.materials.filter(m => {
      let matchTab = true;
      if (this.activeTab === 'syllabus') matchTab = (m.type === 'Syllabus');
      else if (this.activeTab === 'assignments') matchTab = (m.type === 'Assignments');
      else if (this.activeTab === 'notes') matchTab = (m.type === 'Study Material');

      const matchSearch = !this.searchTerm ||
        m.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        m.class.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchTab && matchSearch;
    });
  }

  saveContent(): void {
    if (!this.uploadForm.title) {
      Swal.fire('Missing Title', 'Please enter Content Title.', 'warning');
      return;
    }

    const item: StudyMaterial = {
      id: this.materials.length + 1,
      title: this.uploadForm.title,
      type: this.uploadForm.type,
      class: this.uploadForm.class,
      subject: this.uploadForm.subject,
      uploadDate: new Date().toISOString().substring(0, 10),
      fileName: this.uploadForm.fileName,
      fileSize: '2.5 MB',
      uploadedBy: 'Logged-in Faculty',
      downloadsCount: 0
    };

    this.materials.unshift(item);
    this.activeTab = 'all';
    this.uploadForm = { title: '', type: 'Study Material', class: 'Grade 10-A', subject: 'Mathematics', fileName: 'Material_Attachment.pdf' };

    Swal.fire({
      title: 'Content Uploaded!',
      text: 'Study material is now accessible to students on the mobile portal and download center.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  downloadMaterial(item: StudyMaterial): void {
    item.downloadsCount += 1;
    Swal.fire({
      title: 'Downloading Content',
      text: `Fetching "${item.fileName}" from cloud study repository...`,
      icon: 'info',
      timer: 1200,
      showConfirmButton: false
    });
  }
}
