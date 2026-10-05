import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const Swal: any;

export interface ContentTypeItem {
  id: number;
  name: string;
  code: string;
  description: string;
  icon: string;
  totalFiles: number;
}

export interface ContentDocument {
  id: number;
  title: string;
  contentType: string;
  class: string;
  subject: string;
  uploadDate: string;
  fileName: string;
  fileSize: string;
  fileFormat: string;
  uploadedBy: string;
  availableFor: 'All Students' | 'Class Specific' | 'Faculty Only' | 'Public Portal';
  downloadsCount: number;
}

export interface SharedContentRecord {
  id: number;
  contentTitle: string;
  sharedWith: string;
  sharedBy: string;
  shareDate: string;
  validUntil: string;
  accessCode: string;
  status: 'Active' | 'Revoked' | 'Expired';
}

export interface VideoLecture {
  id: number;
  title: string;
  subject: string;
  class: string;
  videoUrl: string;
  duration: string;
  instructor: string;
  publishedDate: string;
  viewsCount: number;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-download-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.css']
})
export class DownloadCenterComponent implements OnInit {
  activeTab: 'content-list' | 'upload' | 'types' | 'shared' | 'videos' = 'content-list';
  searchTerm = '';
  typeFilter = 'All';

  contentTypes: ContentTypeItem[] = [
    { id: 1, name: 'Syllabus & Curriculum', code: 'SYL', description: 'Annual course syllabus and term planners', icon: 'fa-book-bookmark', totalFiles: 14 },
    { id: 2, name: 'Assignments & Homework', code: 'ASN', description: 'Weekly subject worksheets and problem sets', icon: 'fa-file-lines', totalFiles: 42 },
    { id: 3, name: 'Study Material & Revision', code: 'MAT', description: 'Chapter summaries, formula sheets, lab guides', icon: 'fa-flask', totalFiles: 68 },
    { id: 4, name: 'Question Bank & Past Papers', code: 'QBK', description: 'Previous 5-year question papers & answers', icon: 'fa-clipboard-question', totalFiles: 35 },
    { id: 5, name: 'Lecture Handouts & Slides', code: 'HND', description: 'Teacher presentation slides and summaries', icon: 'fa-presentation-screen', totalFiles: 29 },
    { id: 6, name: 'Other Downloads & Circulars', code: 'OTH', description: 'Institutional handbook, calendar, notices', icon: 'fa-folder-open', totalFiles: 18 }
  ];

  contentList: ContentDocument[] = [
    { id: 1, title: 'Grade 10 Mathematics Complete Term 1 Formula Sheet & Revision', contentType: 'Study Material & Revision', class: 'Grade 10-A', subject: 'Mathematics', uploadDate: '2026-10-01', fileName: 'Class10_Math_Formulae.pdf', fileSize: '3.2 MB', fileFormat: 'PDF', uploadedBy: 'Dr. Ramesh Sharma', availableFor: 'All Students', downloadsCount: 245 },
    { id: 2, title: 'Physics Optics Ray Optics Solved Exemplar & Lab Manual', contentType: 'Study Material & Revision', class: 'Grade 10-B', subject: 'Physics', uploadDate: '2026-09-29', fileName: 'Physics_Optics_Lab_Guide.pdf', fileSize: '4.8 MB', fileFormat: 'PDF', uploadedBy: 'Sunita Nair', availableFor: 'Class Specific', downloadsCount: 198 },
    { id: 3, title: 'Annual Senior Secondary Academic Curriculum & Blueprint 2026-27', contentType: 'Syllabus & Curriculum', class: 'All Classes', subject: 'All Subjects', uploadDate: '2026-09-15', fileName: 'Official_Curriculum_2026.pdf', fileSize: '1.5 MB', fileFormat: 'PDF', uploadedBy: 'Academic Director', availableFor: 'Public Portal', downloadsCount: 512 },
    { id: 4, title: 'Python Programming Data Structures Workbook Set 1', contentType: 'Assignments & Homework', class: 'Grade 11-Science', subject: 'Computer Science', uploadDate: '2026-10-02', fileName: 'Python_DS_Workbook.pdf', fileSize: '2.1 MB', fileFormat: 'PDF', uploadedBy: 'Prof. Rajesh Khanna', availableFor: 'Class Specific', downloadsCount: 88 },
    { id: 5, title: 'Organic Chemistry Reactions Mechanism Flashcards', contentType: 'Study Material & Revision', class: 'Grade 12-Science', subject: 'Chemistry', uploadDate: '2026-09-20', fileName: 'Organic_Chemistry_Reactions.pdf', fileSize: '5.4 MB', fileFormat: 'PDF', uploadedBy: 'Sunita Nair', availableFor: 'All Students', downloadsCount: 310 },
    { id: 6, title: 'Social Sciences Indian Polity & Governance Past 5 Years Papers', contentType: 'Question Bank & Past Papers', class: 'Grade 10-A', subject: 'Social Science', uploadDate: '2026-09-10', fileName: 'Polity_Past_Papers.pdf', fileSize: '6.1 MB', fileFormat: 'PDF', uploadedBy: 'Pooja Hegde', availableFor: 'All Students', downloadsCount: 174 }
  ];

  sharedList: SharedContentRecord[] = [
    { id: 101, contentTitle: 'Grade 10 Mathematics Complete Term 1 Formula Sheet', sharedWith: 'Grade 10 (Sections A, B, C)', sharedBy: 'Dr. Ramesh Sharma', shareDate: '2026-10-01', validUntil: '2026-12-31', accessCode: 'MATH-G10-2026', status: 'Active' },
    { id: 102, contentTitle: 'Physics Optics Ray Optics Solved Exemplar', sharedWith: 'Grade 10-B', sharedBy: 'Sunita Nair', shareDate: '2026-09-29', validUntil: '2026-11-30', accessCode: 'PHY-LAB-992', status: 'Active' },
    { id: 103, contentTitle: 'Annual Senior Secondary Academic Curriculum', sharedWith: 'All Campus Students & Faculty', sharedBy: 'Academic Director', shareDate: '2026-09-15', validUntil: '2027-04-30', accessCode: 'PUB-SYLL-2026', status: 'Active' }
  ];

  videoList: VideoLecture[] = [
    { id: 1, title: 'Calculus & Differential Equations: Part 1 Limits and Continuity', subject: 'Mathematics', class: 'Grade 12', videoUrl: 'https://youtube.com/watch?v=sample1', duration: '45 Mins', instructor: 'Dr. Ramesh Sharma', publishedDate: '2026-10-02', viewsCount: 420 },
    { id: 2, title: 'Wave Optics: Young Double Slit Experiment Detailed Demo', subject: 'Physics', class: 'Grade 12', videoUrl: 'https://youtube.com/watch?v=sample2', duration: '38 Mins', instructor: 'Sunita Nair', publishedDate: '2026-09-28', viewsCount: 315 },
    { id: 3, title: 'Python Object-Oriented Programming Classes & Polymorphism', subject: 'Computer Science', class: 'Grade 11', videoUrl: 'https://youtube.com/watch?v=sample3', duration: '52 Mins', instructor: 'Prof. Rajesh Khanna', publishedDate: '2026-09-25', viewsCount: 650 },
    { id: 4, title: 'Modern Indian History: The Independence Movement 1920-1947', subject: 'Social Science', class: 'Grade 10', videoUrl: 'https://youtube.com/watch?v=sample4', duration: '40 Mins', instructor: 'Pooja Hegde', publishedDate: '2026-09-18', viewsCount: 280 }
  ];

  // Forms
  uploadForm: Partial<ContentDocument> = {
    title: '',
    contentType: 'Study Material & Revision',
    class: 'Grade 10-A',
    subject: 'Mathematics',
    availableFor: 'All Students',
    fileName: 'Curriculum_Material.pdf'
  };

  showAddTypeModal = false;
  newType = { name: '', code: '', description: '' };

  showAddVideoModal = false;
  newVideo: Partial<VideoLecture> = {
    title: '',
    subject: 'Mathematics',
    class: 'Grade 10',
    videoUrl: '',
    duration: '40 Mins',
    instructor: 'Logged-in Faculty'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.syncActiveTabFromUrl();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.syncActiveTabFromUrl();
    });
  }

  private syncActiveTabFromUrl(): void {
    const url = this.router.url.toLowerCase();
    if (url.includes('contenttype')) {
      this.activeTab = 'types';
    } else if (url.includes('uploadcontent')) {
      this.activeTab = 'upload';
    } else if (url.includes('sharedcontent')) {
      this.activeTab = 'shared';
    } else if (url.includes('videolist')) {
      this.activeTab = 'videos';
    } else {
      this.activeTab = 'content-list';
    }
  }

  get filteredContent(): ContentDocument[] {
    return this.contentList.filter(c => {
      const matchType = this.typeFilter === 'All' || c.contentType === this.typeFilter;
      const matchSearch = !this.searchTerm ||
        c.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.class.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.uploadedBy.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }

  saveUploadedContent(): void {
    if (!this.uploadForm.title) {
      Swal.fire('Missing Title', 'Please enter Content Title.', 'warning');
      return;
    }

    const item: ContentDocument = {
      id: Date.now(),
      title: this.uploadForm.title,
      contentType: this.uploadForm.contentType || 'Study Material & Revision',
      class: this.uploadForm.class || 'All Classes',
      subject: this.uploadForm.subject || 'General',
      uploadDate: new Date().toISOString().substring(0, 10),
      fileName: this.uploadForm.fileName || 'Document_Attachment.pdf',
      fileSize: '3.4 MB',
      fileFormat: 'PDF',
      uploadedBy: 'System Faculty',
      availableFor: this.uploadForm.availableFor || 'All Students',
      downloadsCount: 0
    };

    this.contentList.unshift(item);

    // Increment type count
    const t = this.contentTypes.find(type => type.name === item.contentType);
    if (t) t.totalFiles += 1;

    this.uploadForm = {
      title: '',
      contentType: 'Study Material & Revision',
      class: 'Grade 10-A',
      subject: 'Mathematics',
      availableFor: 'All Students',
      fileName: 'Curriculum_Material.pdf'
    };

    this.activeTab = 'content-list';

    Swal.fire({
      title: 'Content Uploaded!',
      text: 'Study resource has been successfully published to the Download Center repository.',
      icon: 'success',
      confirmButtonColor: '#002B49'
    });
  }

  saveNewType(): void {
    if (!this.newType.name || !this.newType.code) {
      Swal.fire('Missing Fields', 'Please enter Content Type Name and Code.', 'warning');
      return;
    }

    this.contentTypes.push({
      id: Date.now(),
      name: this.newType.name,
      code: this.newType.code.toUpperCase(),
      description: this.newType.description || 'Educational digital resource type',
      icon: 'fa-folder-open',
      totalFiles: 0
    });

    this.showAddTypeModal = false;
    this.newType = { name: '', code: '', description: '' };
    Swal.fire('Content Type Created', 'New content classification type saved.', 'success');
  }

  saveNewVideo(): void {
    if (!this.newVideo.title || !this.newVideo.videoUrl) {
      Swal.fire('Missing Details', 'Please fill in Video Title and Video URL.', 'warning');
      return;
    }

    this.videoList.unshift({
      id: Date.now(),
      title: this.newVideo.title,
      subject: this.newVideo.subject || 'General',
      class: this.newVideo.class || 'All Classes',
      videoUrl: this.newVideo.videoUrl,
      duration: this.newVideo.duration || '30 Mins',
      instructor: this.newVideo.instructor || 'Campus Faculty',
      publishedDate: new Date().toISOString().substring(0, 10),
      viewsCount: 0
    });

    this.showAddVideoModal = false;
    this.newVideo = { title: '', subject: 'Mathematics', class: 'Grade 10', videoUrl: '', duration: '40 Mins', instructor: 'Logged-in Faculty' };
    Swal.fire('Video Lecture Published', 'Video lecture added to campus digital repository.', 'success');
  }

  downloadContent(doc: ContentDocument): void {
    doc.downloadsCount += 1;
    Swal.fire({
      title: 'Downloading Resource',
      text: `Fetching "${doc.fileName}" (${doc.fileSize})...`,
      icon: 'info',
      timer: 1200,
      showConfirmButton: false
    });
  }
}
