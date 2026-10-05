export interface User {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalStaff: number;
  todayAttendancePercentage: number;
  totalEarnings: number;
  totalExpenses: number;
  recentStudents?: any[];
  recentFeeCollections?: any[];
}

export interface Student {
  id: number;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  religion?: string;
  email?: string;
  phone?: string;
  address?: string;
  classId: number;
  className?: string;
  sectionId?: number;
  sectionName?: string;
  rollNo?: string;
  photoUrl?: string;
  isActive: boolean;
  guardianName?: string;
  fatherName?: string;
  motherName?: string;
}

export interface Staff {
  id: number;
  staffNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  dateOfJoining?: string;
  salary?: number;
  isActive: boolean;
}

export interface ClassItem {
  id: number;
  name: string;
  sections?: SectionItem[];
}

export interface SectionItem {
  id: number;
  name: string;
  classId: number;
}

export interface SubjectItem {
  id: number;
  name: string;
  code: string;
  type: string;
}

export interface AttendanceRecord {
  id?: number;
  studentId: number;
  studentName?: string;
  rollNo?: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'HalfDay' | 'Holiday';
  note?: string;
}

export interface FeeInvoice {
  id: number;
  studentId: number;
  studentName?: string;
  admissionNo?: string;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Partial';
  feeGroup?: string;
}

export interface Exam {
  id: number;
  title: string;
  term: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
}
