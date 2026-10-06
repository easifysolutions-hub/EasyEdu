import { Injectable, signal, computed } from '@angular/core';

export interface ModuleItem {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  publishedDate: string;
  isVerified: boolean;
  icon: string;
  iconBg?: string;
  iconColor?: string;
  isActive: boolean;
  route: string;
  permissionKey?: string;
}

export const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 'zoom',
    name: 'Zoom Addon',
    version: 'v2.3.3',
    category: 'Virtual Classroom',
    description: 'Live virtual classes and meetings integration',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-video',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/Zoom',
    permissionKey: 'virtualClass'
  },
  {
    id: 'gmeet',
    name: 'Gmeet Addon',
    version: 'v2.0.3',
    category: 'Virtual Classroom',
    description: 'Google Meet integration for virtual sessions',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-microphone-lines',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/Gmeet',
    permissionKey: 'virtualClass'
  },
  {
    id: 'jitsi',
    name: 'Jitsi Addon',
    version: 'v1.4.8',
    category: 'Virtual Classroom',
    description: 'Open-source video conferencing integration',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-headset',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/Jitsi',
    permissionKey: 'virtualClass'
  },
  {
    id: 'bbb',
    name: 'BigBlueButton Addon',
    version: 'v2.0.3',
    category: 'Virtual Classroom',
    description: 'BBB integration for collaborative learning',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-chalkboard-user',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/BigBlueButton',
    permissionKey: 'virtualClass'
  },
  {
    id: 'inAppLive',
    name: 'In App Live Addon',
    version: 'v1.0.0',
    category: 'Virtual Classroom',
    description: 'Native in-app live streaming capability',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-tower-broadcast',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/InAppLive',
    permissionKey: 'virtualClass'
  },
  {
    id: 'onlineExam',
    name: 'Online Exam Addon',
    version: 'v1.0',
    category: 'Examinations',
    description: 'Comprehensive online examination engine',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-laptop-code',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/OnlineExam',
    permissionKey: 'onlineExam'
  },
  {
    id: 'cbse',
    name: 'CBSE Exam Addon',
    version: 'v1.0',
    category: 'Academics',
    description: 'CBSE pattern examination and grading',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-graduation-cap',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/CbseExam',
    permissionKey: 'advancedAcademicMenu'
  },
  {
    id: 'lms',
    name: 'LMS Addon',
    version: 'v1.4',
    category: 'E-Learning',
    description: 'Learning management & course distribution platform',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-cubes',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/Lms',
    permissionKey: 'advancedAcademicMenu'
  },
  {
    id: 'biometrics',
    name: 'Biometric Attendance Addon',
    version: 'v2.1.0',
    category: 'Attendance',
    description: 'Fingerprint & hardware biometric device relay',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-fingerprint',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/Biometrics',
    permissionKey: 'smartAttendanceMenu'
  },
  {
    id: 'qrAttendance',
    name: 'QR Attendance Addon',
    version: 'v1.2.0',
    category: 'Attendance',
    description: 'Dynamic student QR badge generation & scanning',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-qrcode',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/QrAttendance',
    permissionKey: 'smartAttendanceMenu'
  },
  {
    id: 'registration',
    name: 'Registration & Admission Addon',
    version: 'v2.0',
    category: 'Administration',
    description: 'Online public application portal and inquiry forms',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-user-plus',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/RegistrationAddon',
    permissionKey: 'commSubMenu'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Gateway Addon',
    version: 'v1.8.4',
    category: 'Communication',
    description: 'Cloud API notifications, alert automation & bot support',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fab fa-whatsapp',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/WhatsApp',
    permissionKey: 'commSubMenu'
  },
  {
    id: 'aiContent',
    name: 'AI Content Studio Addon',
    version: 'v1.0.2',
    category: 'Academics',
    description: 'Generative AI automated question & lesson planner',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-robot',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/AiContent',
    permissionKey: 'commSubMenu'
  },
  {
    id: 'certificates',
    name: 'Certificates & Badges Addon',
    version: 'v1.5.0',
    category: 'Operations',
    description: 'Automated student ID card and TC printing engine',
    publishedDate: 'October 5, 2026',
    isVerified: true,
    icon: 'fas fa-certificate',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    isActive: true,
    route: '/certificates',
    permissionKey: 'certificates'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {
  modules = signal<ModuleItem[]>(this.loadModulesFromStorage());

  activeModulesMap = computed<{ [id: string]: boolean }>(() => {
    const map: { [id: string]: boolean } = {};
    for (const m of this.modules()) {
      map[m.id] = m.isActive;
    }
    return map;
  });

  private loadModulesFromStorage(): ModuleItem[] {
    const saved = localStorage.getItem('easyedu_modules_status');
    if (saved) {
      try {
        const parsed: ModuleItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge defaults with saved to account for new modules
          return INITIAL_MODULES.map(def => {
            const found = parsed.find(p => p.id === def.id);
            return found ? { ...def, isActive: found.isActive } : def;
          });
        }
      } catch (e) {
        console.warn('Failed to parse saved modules state', e);
      }
    }
    return INITIAL_MODULES;
  }

  private saveModulesToStorage(mods: ModuleItem[]): void {
    localStorage.setItem('easyedu_modules_status', JSON.stringify(mods));
  }

  toggleModule(id: string): boolean {
    const current = [...this.modules()];
    const index = current.findIndex(m => m.id === id);
    if (index !== -1) {
      const newState = !current[index].isActive;
      current[index] = { ...current[index], isActive: newState };
      this.modules.set(current);
      this.saveModulesToStorage(current);
      return newState;
    }
    return false;
  }

  isModuleActive(id: string): boolean {
    const m = this.modules().find(item => item.id === id);
    return m ? m.isActive : true;
  }

  isAnyVirtualClassActive(): boolean {
    return this.isModuleActive('zoom') || this.isModuleActive('gmeet') || this.isModuleActive('jitsi') || this.isModuleActive('bbb') || this.isModuleActive('inAppLive');
  }

  isAnySmartAttendanceActive(): boolean {
    return this.isModuleActive('biometrics') || this.isModuleActive('qrAttendance');
  }

  isAnyAdvancedAcademicActive(): boolean {
    return this.isModuleActive('cbse') || this.isModuleActive('lms');
  }

  isAnyGrowthCommsActive(): boolean {
    return this.isModuleActive('registration') || this.isModuleActive('whatsapp') || this.isModuleActive('aiContent');
  }

  addModule(module: Omit<ModuleItem, 'id' | 'isVerified' | 'publishedDate'>): ModuleItem {
    const newMod: ModuleItem = {
      ...module,
      id: `custom_${Date.now()}`,
      isVerified: true,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    const updated = [newMod, ...this.modules()];
    this.modules.set(updated);
    this.saveModulesToStorage(updated);
    return newMod;
  }
}
