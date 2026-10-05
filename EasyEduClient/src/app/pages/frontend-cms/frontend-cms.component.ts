import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

export interface ThemeConfig {
  themeName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  headerStyle: string;
  footerLayout: string;
  heroStyle: string;
  isDarkModeDefault: boolean;
  isRtlSupported: boolean;
  isStickyNavbar: boolean;
  borderRadius: string;
}

export interface SliderItem {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  animation: string;
}

export interface CmsPage {
  id: number;
  title: string;
  slug: string;
  template: string;
  metaTitle: string;
  metaDescription: string;
  status: 'Published' | 'Draft';
  lastModified: string;
  showInNavbar: boolean;
  showInFooter: boolean;
  content: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  photoUrl: string;
  isFeatured: boolean;
  email: string;
  phone: string;
  linkedIn?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  album: string;
  mediaType: 'image' | 'video';
  thumbnailUrl: string;
  uploadDate: string;
  views: number;
}

export interface NewsItem {
  id: number;
  headline: string;
  category: string;
  author: string;
  date: string;
  status: 'Published' | 'Scheduled' | 'Draft';
  imageUrl: string;
  isPinned: boolean;
  summary: string;
}

export interface TestimonialItem {
  id: number;
  authorName: string;
  role: string;
  rating: number;
  quote: string;
  avatarUrl: string;
  isVerified: boolean;
  isFeatured: boolean;
  date: string;
}

export interface PublicDownload {
  id: number;
  title: string;
  category: string;
  fileFormat: string;
  fileSize: string;
  downloadCount: number;
  uploadDate: string;
  audience: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Resolved';
  priority: 'Urgent' | 'Normal';
  replyNotes?: string;
}

@Component({
  selector: 'app-frontend-cms',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './frontend-cms.component.html',
  styleUrls: ['./frontend-cms.component.css']
})
export class FrontendCmsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  activeTab: 'theme' | 'slider' | 'pages' | 'faculty' | 'gallery' | 'news' | 'testimonials' | 'downloads' | 'messages' = 'theme';

  // Global Theme Settings
  themeConfig: ThemeConfig = {
    themeName: 'Modern Oxford Indigo',
    primaryColor: '#4f46e5',
    secondaryColor: '#06b6d4',
    accentColor: '#f59e0b',
    fontFamily: 'Inter, sans-serif',
    headerStyle: 'Floating Glassmorphism',
    footerLayout: '4-Column Comprehensive',
    heroStyle: 'Full Interactive Slider',
    isDarkModeDefault: false,
    isRtlSupported: false,
    isStickyNavbar: true,
    borderRadius: '12px'
  };

  presetThemes = [
    { name: 'Oxford Indigo', primary: '#4f46e5', secondary: '#06b6d4', accent: '#f59e0b' },
    { name: 'Emerald Scholar', primary: '#059669', secondary: '#10b981', accent: '#3b82f6' },
    { name: 'Royal Crimson', primary: '#e11d48', secondary: '#f43f5e', accent: '#fbbf24' },
    { name: 'Sapphire Academic', primary: '#2563eb', secondary: '#38bdf8', accent: '#10b981' },
    { name: 'Midnight Cyber', primary: '#6366f1', secondary: '#a855f7', accent: '#06b6d4' }
  ];

  // Sliders
  sliders: SliderItem[] = [
    {
      id: 1,
      title: 'Empowering Minds, Shaping Tomorrow',
      subtitle: 'Admissions Open for Academic Year 2026-27 across STEM, Humanities, and Arts.',
      buttonText: 'Apply Online',
      buttonLink: '/admission',
      secondaryButtonText: 'Virtual Campus Tour',
      secondaryButtonLink: '/campus-tour',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
      order: 1,
      isActive: true,
      animation: 'Zoom In'
    },
    {
      id: 2,
      title: 'State-of-the-Art Research & Robotics Labs',
      subtitle: 'Nurturing innovative thinking through hands-on practical inquiry and mentorship.',
      buttonText: 'Explore Facilities',
      buttonLink: '/facilities',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
      order: 2,
      isActive: true,
      animation: 'Slide Left'
    },
    {
      id: 3,
      title: 'Excellence in Sports & Cultural Arts',
      subtitle: 'Over 40+ athletic championships and inter-collegiate artistic accolades.',
      buttonText: 'Student Life',
      buttonLink: '/student-life',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
      order: 3,
      isActive: true,
      animation: 'Fade'
    }
  ];

  // CMS Pages
  cmsPages: CmsPage[] = [
    {
      id: 1,
      title: 'About Our Institution',
      slug: 'about-us',
      template: 'Standard Informative',
      metaTitle: 'About EasyEdu Global Academy - History & Vision',
      metaDescription: 'Discover our legacy of academic excellence since 1998.',
      status: 'Published',
      lastModified: '2026-10-04',
      showInNavbar: true,
      showInFooter: true,
      content: 'EasyEdu Global Academy is a pioneering educational center of learning...'
    },
    {
      id: 2,
      title: "Principal's Official Address",
      slug: 'principals-message',
      template: 'Executive Profile',
      metaTitle: "Principal's Message | Inspiring Student Potential",
      metaDescription: 'Read the visionary welcome note from Dr. Eleanor Vance.',
      status: 'Published',
      lastModified: '2026-09-28',
      showInNavbar: true,
      showInFooter: false,
      content: 'Welcome to our vibrant campus where curiosity meets discovery...'
    },
    {
      id: 3,
      title: 'Admissions Criteria & Scholarships',
      slug: 'admissions-policy',
      template: 'Application Process',
      metaTitle: 'Admissions 2026-27 Requirements & Merit Grants',
      metaDescription: 'Eligibility criteria, document checklists, and financial aid options.',
      status: 'Published',
      lastModified: '2026-10-02',
      showInNavbar: true,
      showInFooter: true,
      content: 'Detailed step-by-step admission roadmap for domestic and international applicants...'
    },
    {
      id: 4,
      title: 'Campus Code of Ethics & Anti-Bullying',
      slug: 'student-conduct',
      template: 'Policy Document',
      metaTitle: 'Campus Code of Conduct and Student Welfare Regulations',
      metaDescription: 'Policies regarding integrity, safety, and inclusive campus standards.',
      status: 'Published',
      lastModified: '2026-08-15',
      showInNavbar: false,
      showInFooter: true,
      content: 'Our core charter guarantees equal safety and respect for all students...'
    }
  ];

  // Faculty
  facultyList: FacultyMember[] = [
    {
      id: 1,
      name: 'Dr. Eleanor Vance, Ph.D.',
      designation: 'Dean of Sciences & Principal',
      department: 'Physics & Applied Sciences',
      qualification: 'Ph.D. in Astrophysics, MIT',
      experience: '22 Years',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      email: 'eleanor.vance@easyedu.org',
      phone: '+1 (555) 234-8901',
      linkedIn: 'linkedin.com/in/eleanor-vance'
    },
    {
      id: 2,
      name: 'Prof. Marcus Chen, M.Sc.',
      designation: 'Head of Mathematics & Computing',
      department: 'Computer Science',
      qualification: 'M.Sc. Artificial Intelligence, Stanford',
      experience: '14 Years',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      email: 'marcus.chen@easyedu.org',
      phone: '+1 (555) 345-6789',
      linkedIn: 'linkedin.com/in/marcus-chen'
    },
    {
      id: 3,
      name: 'Dr. Sarah Al-Mansoor',
      designation: 'Senior Faculty & Research Lead',
      department: 'Biotechnology & Genetics',
      qualification: 'Ph.D. Molecular Biology, Oxford',
      experience: '11 Years',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      isFeatured: true,
      email: 'sarah.mansoor@easyedu.org',
      phone: '+1 (555) 789-0123'
    },
    {
      id: 4,
      name: 'Prof. Robert Sterling, M.A.',
      designation: 'Chair of Literature & World History',
      department: 'Humanities',
      qualification: 'M.A. Comparative Literature, Cambridge',
      experience: '18 Years',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      isFeatured: false,
      email: 'robert.sterling@easyedu.org',
      phone: '+1 (555) 456-7890'
    }
  ];

  // Gallery
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Annual STEM Robo-War Showcase 2026',
      album: 'Science & Innovation',
      mediaType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      uploadDate: '2026-10-01',
      views: 1420
    },
    {
      id: 2,
      title: 'Olympic-Standard Indoor Aquatic Center',
      album: 'Campus Facilities',
      mediaType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop&q=80',
      uploadDate: '2026-09-22',
      views: 980
    },
    {
      id: 3,
      title: 'Inter-Collegiate Symphony Orchestra Fest',
      album: 'Cultural Arts',
      mediaType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
      uploadDate: '2026-09-15',
      views: 2310
    },
    {
      id: 4,
      title: 'Central Digital Knowledge Commons & Library',
      album: 'Campus Facilities',
      mediaType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=80',
      uploadDate: '2026-08-30',
      views: 3100
    },
    {
      id: 5,
      title: 'Class of 2025 Grand Convocation Ceremony',
      album: 'Ceremonies',
      mediaType: 'image',
      thumbnailUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=80',
      uploadDate: '2026-07-20',
      views: 4500
    }
  ];

  selectedGalleryAlbum = 'All';
  galleryAlbums = ['All', 'Science & Innovation', 'Campus Facilities', 'Cultural Arts', 'Ceremonies'];

  // News & Press
  newsList: NewsItem[] = [
    {
      id: 1,
      headline: 'EasyEdu Students Secure First Prize in Global NASA Space Settlement Challenge',
      category: 'Student Achievements',
      author: 'Academic Press Bureau',
      date: '2026-10-03',
      status: 'Published',
      imageUrl: 'https://images.unsplash.com/photo-1517976487507-59b48b789069?w=600&auto=format&fit=crop&q=80',
      isPinned: true,
      summary: 'A team of four Grade 11 science scholars developed an AI-assisted orbital life support module to earn international accolades.'
    },
    {
      id: 2,
      headline: 'Inauguration of New 500-Seater Digital Amphitheatre & Media Lab',
      category: 'Campus Expansion',
      author: 'Estate Management',
      date: '2026-09-29',
      status: 'Published',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
      isPinned: false,
      summary: 'The futuristic auditorium features Dolby Atmos acoustics and interactive holographic display systems for global guest lecturers.'
    },
    {
      id: 3,
      headline: 'Schedule Announcement for Mid-Term Autumn Examinations 2026',
      category: 'Official Notice',
      author: 'Examination Controller',
      date: '2026-09-25',
      status: 'Published',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
      isPinned: false,
      summary: 'Comprehensive timetables and admit card generation protocols are now active via the student & parent portal.'
    }
  ];

  // Testimonials
  testimonials: TestimonialItem[] = [
    {
      id: 1,
      authorName: 'Dr. Aris Thorne',
      role: 'Parent of Class XII Valedictorian',
      rating: 5,
      quote: 'The holistic curriculum and individual faculty mentoring at EasyEdu gave my daughter both academic excellence and lifelong confidence.',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      isFeatured: true,
      date: '2026-09-18'
    },
    {
      id: 2,
      authorName: 'Samantha Raye, B.Tech',
      role: 'Alumna, Class of 2023 | Software Engineer at Google',
      rating: 5,
      quote: 'The competitive robotics lab and early coding exposure at EasyEdu laid the foundational bedrock for my career trajectory in tech.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      isFeatured: true,
      date: '2026-08-10'
    },
    {
      id: 3,
      authorName: 'Major Gen. V. Nair (Retd.)',
      role: 'Chief Guest, National Youth Leadership Summit',
      rating: 5,
      quote: 'I was thoroughly impressed by the discipline, eloquence, and ethical leadership qualities exhibited by the student council here.',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      isFeatured: true,
      date: '2026-07-04'
    }
  ];

  // Resource Downloads
  downloads: PublicDownload[] = [
    {
      id: 1,
      title: 'Institutional Prospectus & Curriculum Guide 2026-27',
      category: 'Admissions',
      fileFormat: 'PDF Document',
      fileSize: '12.4 MB',
      downloadCount: 4320,
      uploadDate: '2026-09-01',
      audience: 'Prospective Parents & Students'
    },
    {
      id: 2,
      title: 'Merit-Cum-Means Scholarship Application Form',
      category: 'Financial Aid',
      fileFormat: 'PDF Document',
      fileSize: '1.8 MB',
      downloadCount: 1890,
      uploadDate: '2026-09-12',
      audience: 'Enrolled Applicants'
    },
    {
      id: 3,
      title: 'School Transport & Bus Route Stop Matrix',
      category: 'Logistics',
      fileFormat: 'PDF Document',
      fileSize: '3.2 MB',
      downloadCount: 2640,
      uploadDate: '2026-08-20',
      audience: 'Commuting Students'
    },
    {
      id: 4,
      title: 'Student Medical History & Immunization Clearance Form',
      category: 'Health & Wellness',
      fileFormat: 'DOCX Form',
      fileSize: '650 KB',
      downloadCount: 970,
      uploadDate: '2026-08-15',
      audience: 'New Admissions'
    }
  ];

  // Public Messages & Inquiries
  contactMessages: ContactMessage[] = [
    {
      id: 1,
      name: 'Claire Kensington',
      email: 'claire.kensington@gmail.com',
      phone: '+1 (555) 902-3344',
      subject: 'Inquiry regarding Grade 9 Admission for Twin Daughters',
      message: 'Greetings. We are relocating from Chicago next month and would love to schedule an on-campus tour and interview for our two daughters entering Grade 9.',
      date: '2026-10-05 14:32',
      status: 'New',
      priority: 'Urgent'
    },
    {
      id: 2,
      name: 'David O’Connor',
      email: 'doconnor@apexventures.io',
      subject: 'Corporate CSR Sponsorship for Science Robotics Lab',
      phone: '+1 (555) 881-2200',
      message: 'Apex Ventures would like to explore funding the annual hackathon and donating 20 high-performance workstations to the AI lab.',
      date: '2026-10-04 09:15',
      status: 'In Progress',
      priority: 'Normal',
      replyNotes: 'Transferred to Dean of Sciences Dr. Eleanor Vance.'
    },
    {
      id: 3,
      name: 'Pooja Bhattacharya',
      email: 'pooja.bhatt@outlook.com',
      phone: '+91 98450 11223',
      subject: 'Hostel Accommodation Availability for Senior Secondary',
      message: 'Are single-occupancy rooms with attached washrooms available for female Grade 11 students preparing for medical entrance exams?',
      date: '2026-10-02 18:40',
      status: 'Resolved',
      priority: 'Normal',
      replyNotes: 'Hostel warden sent detailed brochure and fee structure on Oct 3.'
    }
  ];

  // Active Modals & Selected items
  showAddSlideModal = false;
  showAddPageModal = false;
  showAddFacultyModal = false;
  showAddMediaModal = false;
  showAddNewsModal = false;
  showAddTestimonialModal = false;
  showAddDownloadModal = false;
  showMessageModal = false;
  showSuccessToast = false;
  toastMessage = '';

  selectedMessage: ContactMessage | null = null;
  messageReplyText = '';

  // New slide form model
  newSlide: Partial<SliderItem> = {
    title: '',
    subtitle: '',
    buttonText: 'Learn More',
    buttonLink: '/about',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    order: 1,
    isActive: true,
    animation: 'Zoom In'
  };

  // New Page model
  newPage: Partial<CmsPage> = {
    title: '',
    slug: '',
    template: 'Standard Informative',
    metaTitle: '',
    metaDescription: '',
    status: 'Published',
    showInNavbar: true,
    showInFooter: true,
    content: ''
  };

  // New Faculty model
  newFaculty: Partial<FacultyMember> = {
    name: '',
    designation: '',
    department: 'Science',
    qualification: '',
    experience: '5 Years',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    isFeatured: true,
    email: '',
    phone: ''
  };

  // New Media model
  newMedia: Partial<GalleryItem> = {
    title: '',
    album: 'Science & Innovation',
    mediaType: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
  };

  // New News model
  newNews: Partial<NewsItem> = {
    headline: '',
    category: 'Student Achievements',
    author: 'Editorial Desk',
    status: 'Published',
    isPinned: false,
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-59b48b789069?w=600&auto=format&fit=crop&q=80',
    summary: ''
  };

  // New Testimonial model
  newTestimonial: Partial<TestimonialItem> = {
    authorName: '',
    role: 'Parent / Alumnus',
    rating: 5,
    quote: '',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    isVerified: true,
    isFeatured: true
  };

  // New Download model
  newDownload: Partial<PublicDownload> = {
    title: '',
    category: 'Admissions',
    fileFormat: 'PDF Document',
    fileSize: '2.5 MB',
    audience: 'Public'
  };

  ngOnInit(): void {
    // Check route query params or path segment to set tab
    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/').toLowerCase();
      if (path.includes('managetheme') || path.includes('theme')) this.activeTab = 'theme';
      else if (path.includes('slider')) this.activeTab = 'slider';
      else if (path.includes('pagelist') || path.includes('pages')) this.activeTab = 'pages';
      else if (path.includes('expertteachers') || path.includes('faculty')) this.activeTab = 'faculty';
      else if (path.includes('gallery')) this.activeTab = 'gallery';
      else if (path.includes('newslist') || path.includes('news')) this.activeTab = 'news';
      else if (path.includes('testimonials')) this.activeTab = 'testimonials';
      else if (path.includes('formdownloads') || path.includes('downloads')) this.activeTab = 'downloads';
      else if (path.includes('contactmessages') || path.includes('messages') || path.includes('inquiries')) this.activeTab = 'messages';
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        const t = params['tab'].toLowerCase();
        if (t === 'theme') this.activeTab = 'theme';
        else if (t === 'slider') this.activeTab = 'slider';
        else if (t === 'pages') this.activeTab = 'pages';
        else if (t === 'faculty') this.activeTab = 'faculty';
        else if (t === 'gallery') this.activeTab = 'gallery';
        else if (t === 'news') this.activeTab = 'news';
        else if (t === 'testimonials') this.activeTab = 'testimonials';
        else if (t === 'downloads') this.activeTab = 'downloads';
        else if (t === 'messages') this.activeTab = 'messages';
      }
    });
  }

  setTab(tab: 'theme' | 'slider' | 'pages' | 'faculty' | 'gallery' | 'news' | 'testimonials' | 'downloads' | 'messages'): void {
    this.activeTab = tab;
  }

  applyPresetTheme(preset: any): void {
    this.themeConfig.primaryColor = preset.primary;
    this.themeConfig.secondaryColor = preset.secondary;
    this.themeConfig.accentColor = preset.accent;
    this.showToast(`Applied "${preset.name}" preset theme palette!`);
  }

  saveThemeSettings(): void {
    this.showToast('Global Website Theme successfully saved and deployed live!');
  }

  // Slider operations
  toggleSliderStatus(slider: SliderItem): void {
    slider.isActive = !slider.isActive;
    this.showToast(`Slider "${slider.title}" is now ${slider.isActive ? 'Active' : 'Inactive'}.`);
  }

  deleteSlider(id: number): void {
    this.sliders = this.sliders.filter(s => s.id !== id);
    this.showToast('Slide removed from home header.');
  }

  addSlide(): void {
    if (!this.newSlide.title) return;
    const slide: SliderItem = {
      id: Date.now(),
      title: this.newSlide.title || '',
      subtitle: this.newSlide.subtitle || '',
      buttonText: this.newSlide.buttonText || 'Learn More',
      buttonLink: this.newSlide.buttonLink || '/',
      imageUrl: this.newSlide.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
      order: this.sliders.length + 1,
      isActive: true,
      animation: this.newSlide.animation || 'Fade'
    };
    this.sliders.push(slide);
    this.showAddSlideModal = false;
    this.showToast('New header slide published successfully!');
  }

  // Pages operations
  generateSlug(): void {
    if (this.newPage.title) {
      this.newPage.slug = this.newPage.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  }

  addPage(): void {
    if (!this.newPage.title) return;
    const page: CmsPage = {
      id: Date.now(),
      title: this.newPage.title || '',
      slug: this.newPage.slug || 'custom-page',
      template: this.newPage.template || 'Standard Informative',
      metaTitle: this.newPage.metaTitle || this.newPage.title || '',
      metaDescription: this.newPage.metaDescription || '',
      status: this.newPage.status || 'Published',
      lastModified: new Date().toISOString().split('T')[0],
      showInNavbar: !!this.newPage.showInNavbar,
      showInFooter: !!this.newPage.showInFooter,
      content: this.newPage.content || ''
    };
    this.cmsPages.unshift(page);
    this.showAddPageModal = false;
    this.showToast(`Dynamic CMS Page "${page.title}" created!`);
  }

  deletePage(id: number): void {
    this.cmsPages = this.cmsPages.filter(p => p.id !== id);
    this.showToast('Page removed from public routing.');
  }

  // Faculty operations
  addFaculty(): void {
    if (!this.newFaculty.name) return;
    const faculty: FacultyMember = {
      id: Date.now(),
      name: this.newFaculty.name || '',
      designation: this.newFaculty.designation || '',
      department: this.newFaculty.department || 'Academics',
      qualification: this.newFaculty.qualification || '',
      experience: this.newFaculty.experience || '5 Years',
      photoUrl: this.newFaculty.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      isFeatured: !!this.newFaculty.isFeatured,
      email: this.newFaculty.email || '',
      phone: this.newFaculty.phone || ''
    };
    this.facultyList.push(faculty);
    this.showAddFacultyModal = false;
    this.showToast(`Faculty profile for "${faculty.name}" enrolled!`);
  }

  deleteFaculty(id: number): void {
    this.facultyList = this.facultyList.filter(f => f.id !== id);
    this.showToast('Faculty profile removed.');
  }

  // Gallery
  get filteredGallery(): GalleryItem[] {
    if (this.selectedGalleryAlbum === 'All') return this.galleryItems;
    return this.galleryItems.filter(g => g.album === this.selectedGalleryAlbum);
  }

  addMedia(): void {
    if (!this.newMedia.title) return;
    const media: GalleryItem = {
      id: Date.now(),
      title: this.newMedia.title || '',
      album: this.newMedia.album || 'Science & Innovation',
      mediaType: this.newMedia.mediaType || 'image',
      thumbnailUrl: this.newMedia.thumbnailUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600',
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0
    };
    this.galleryItems.unshift(media);
    this.showAddMediaModal = false;
    this.showToast('Media item added to institutional gallery!');
  }

  deleteMedia(id: number): void {
    this.galleryItems = this.galleryItems.filter(g => g.id !== id);
    this.showToast('Gallery item deleted.');
  }

  // News
  addNews(): void {
    if (!this.newNews.headline) return;
    const news: NewsItem = {
      id: Date.now(),
      headline: this.newNews.headline || '',
      category: this.newNews.category || 'General',
      author: this.newNews.author || 'Editorial Team',
      date: new Date().toISOString().split('T')[0],
      status: this.newNews.status || 'Published',
      imageUrl: this.newNews.imageUrl || 'https://images.unsplash.com/photo-1517976487507-59b48b789069?w=600',
      isPinned: !!this.newNews.isPinned,
      summary: this.newNews.summary || ''
    };
    this.newsList.unshift(news);
    this.showAddNewsModal = false;
    this.showToast('News article published live!');
  }

  deleteNews(id: number): void {
    this.newsList = this.newsList.filter(n => n.id !== id);
    this.showToast('News article removed.');
  }

  // Testimonials
  addTestimonial(): void {
    if (!this.newTestimonial.authorName) return;
    const t: TestimonialItem = {
      id: Date.now(),
      authorName: this.newTestimonial.authorName || '',
      role: this.newTestimonial.role || 'Alumnus',
      rating: this.newTestimonial.rating || 5,
      quote: this.newTestimonial.quote || '',
      avatarUrl: this.newTestimonial.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      isVerified: true,
      isFeatured: !!this.newTestimonial.isFeatured,
      date: new Date().toISOString().split('T')[0]
    };
    this.testimonials.unshift(t);
    this.showAddTestimonialModal = false;
    this.showToast('Testimonial featured on homepage!');
  }

  deleteTestimonial(id: number): void {
    this.testimonials = this.testimonials.filter(t => t.id !== id);
    this.showToast('Testimonial removed.');
  }

  // Downloads
  addDownload(): void {
    if (!this.newDownload.title) return;
    const d: PublicDownload = {
      id: Date.now(),
      title: this.newDownload.title || '',
      category: this.newDownload.category || 'General',
      fileFormat: this.newDownload.fileFormat || 'PDF Document',
      fileSize: this.newDownload.fileSize || '1.5 MB',
      downloadCount: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      audience: this.newDownload.audience || 'Public'
    };
    this.downloads.unshift(d);
    this.showAddDownloadModal = false;
    this.showToast('Resource form uploaded for public access!');
  }

  deleteDownload(id: number): void {
    this.downloads = this.downloads.filter(d => d.id !== id);
    this.showToast('Download resource removed.');
  }

  // Messages
  openMessage(msg: ContactMessage): void {
    this.selectedMessage = msg;
    this.messageReplyText = '';
    this.showMessageModal = true;
  }

  sendReply(): void {
    if (!this.selectedMessage) return;
    this.selectedMessage.status = 'Resolved';
    this.selectedMessage.replyNotes = this.messageReplyText || 'Response dispatched via official email gateway.';
    this.showMessageModal = false;
    this.showToast(`Reply sent to ${this.selectedMessage.email}!`);
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3500);
  }
}
