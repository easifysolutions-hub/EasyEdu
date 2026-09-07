import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// In development with an emulator, 'localhost' often refers to the emulator itself,
// not your laptop. '10.0.2.2' is the special alias for the host loopback interface in Android Emulator.
// Note: iOS Simulator can use 'localhost'.
// For a real device, you need your laptop's Wi-Fi IP address.
// Update this to your host IP for real device testing
const API_URL = 'https://easyedu.easifysolutions.com/api/';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 seconds timeout for better resilience
});

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = {
    getDashboardSummary: async () => {
        try {
            const response = await api.get('Dashboard/summary');
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    },

    getStudents: async (searchQuery?: string) => {
        try {
            const params = searchQuery ? { searchQuery } : {};
            const response = await api.get('Students', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },

    createStudent: async (studentData: any) => {
        try {
            const response = await api.post('Students', studentData);
            return response.data;
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    },

    getClasses: async () => {
        try {
            const response = await api.get('Attendance/classes');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getStudentsForAttendance: async (classId: number, sectionId: number, date: string) => {
        try {
            const response = await api.get('Attendance/students', {
                params: { classId, sectionId, date }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    markAttendance: async (classId: number, sectionId: number, date: string, attendances: any[]) => {
        try {
            const response = await api.post('Attendance/mark', {
                classId,
                sectionId,
                date,
                attendances
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getExpenses: async () => {
        try {
            const response = await api.get('Expenses');
            return response.data;
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    },

    createExpense: async (expenseData: any) => {
        try {
            const response = await api.post('Expenses', expenseData);
            return response.data;
        } catch (error) {
            console.error('Error creating expense:', error);
            throw error;
        }
    },

    getFeesInvoices: async () => {
        try {
            const response = await api.get('Fees/invoices');
            return response.data;
        } catch (error) {
            console.error('Error fetching fees invoices:', error);
            throw error;
        }
    },

    collectFee: async (data: { studentId: number; invoiceId: number; amountPaid: number; paymentMode: string }) => {
        try {
            const response = await api.post('Fees/collect', data);
            return response.data;
        } catch (error) {
            console.error('Error collecting fee:', error);
            throw error;
        }
    },

    getStaff: async () => {
        try {
            const response = await api.get('Staff');
            return response.data;
        } catch (error) {
            console.error('Error fetching staff:', error);
            throw error;
        }
    },

    createStaff: async (staffData: any) => {
        try {
            const response = await api.post('Staff', staffData);
            return response.data;
        } catch (error) {
            console.error('Error creating staff member:', error);
            throw error;
        }
    },

    getStaffMeta: async () => {
        try {
            const response = await api.get('Staff/meta');
            return response.data;
        } catch (error) {
            console.error('Error fetching staff metadata:', error);
            throw error;
        }
    },

    getHomeworks: async () => {
        try {
            const response = await api.get('Homework');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getExams: async () => {
        try {
            const response = await api.get('Exams');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getReportCards: async (studentId?: number) => {
        try {
            const params = studentId ? { studentId } : {};
            const response = await api.get('ReportCards', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getNotifications: async () => {
        try {
            const response = await api.get('Notifications');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },

    getProfile: async () => {
        try {
            const response = await api.get('Profile');
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },
    updateProfile: async (data: { fullName: string; phoneNumber: string }) => {
        try {
            const response = await api.put('Profile', data);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    getRoutine: async () => {
        try {
            const response = await api.get('Routine');
            return response.data;
        } catch (error) {
            console.error('Error fetching routine:', error);
            throw error;
        }
    },

    getSubjects: async () => {
        try {
            const response = await api.get('Subjects');
            return response.data;
        } catch (error) {
            console.error('Error fetching subjects:', error);
            throw error;
        }
    },

    getLibraryBooks: async (search?: string) => {
        try {
            const response = await api.get('Library/books', { params: { search } });
            return response.data;
        } catch (error) {
            console.error('Error fetching library books:', error);
            throw error;
        }
    },

    getMyIssuedBooks: async () => {
        try {
            const response = await api.get('Library/my-issued');
            return response.data;
        } catch (error) {
            console.error('Error fetching issued books:', error);
            throw error;
        }
    },

    getMyLeaves: async () => {
        try {
            const response = await api.get('Leave');
            return response.data;
        } catch (error) {
            console.error('Error fetching leaves:', error);
            throw error;
        }
    },

    getLeaveTypes: async () => {
        try {
            const response = await api.get('Leave/types');
            return response.data;
        } catch (error) {
            console.error('Error fetching leave types:', error);
            throw error;
        }
    },

    applyLeave: async (data: { fromDate: string; toDate: string; leaveTypeId: number; reason: string }) => {
        try {
            const response = await api.post('Leave', data);
            return response.data;
        } catch (error) {
            console.error('Error applying leave:', error);
            throw error;
        }
    },

    getMyTransit: async () => {
        try {
            const response = await api.get('Transport/MyTransit');
            return response.data;
        } catch (error) {
            console.error('Error fetching transit profile:', error);
            throw error;
        }
    },

    getLiveClasses: async () => {
        try {
            const response = await api.get('LiveClasses');
            return response.data;
        } catch (error) {
            console.error('Error fetching live classes:', error);
            throw error;
        }
    },

    getMyDormitory: async () => {
        try {
            const response = await api.get('Hostel/MyAllocation');
            return response.data;
        } catch (error) {
            console.error('Error fetching dormitory allocation:', error);
            throw error;
        }
    },
    
    getStudyMaterials: async (type?: string) => {
        try {
            const params = type ? { type } : {};
            const response = await api.get('Contents', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching study materials:', error);
            throw error;
        }
    },

    getInventory: async () => {
        try {
            const response = await api.get('Inventory');
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    },

    getInventoryTransactions: async () => {
        try {
            const response = await api.get('Inventory/transactions');
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory transactions:', error);
            throw error;
        }
    },

    getVouchers: async (type?: number) => {
        try {
            const params = type ? { type } : {};
            const response = await api.get('Accounting/vouchers', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            throw error;
        }
    },

    getLedgers: async () => {
        try {
            const response = await api.get('Accounting/ledgers');
            return response.data;
        } catch (error) {
            console.error('Error fetching ledgers:', error);
            throw error;
        }
    },

    createVoucher: async (data: any) => {
        try {
            const response = await api.post('Accounting/vouchers', data);
            return response.data;
        } catch (error) {
            console.error('Error creating voucher:', error);
            throw error;
        }
    },

    // User & Role Management
    getUsers: async () => {
        try {
            const response = await api.get('Users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getAvailableRoles: async () => {
        try {
            const response = await api.get('Users/roles');
            return response.data;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    },

    createUser: async (data: any) => {
        try {
            const response = await api.post('Users', data);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async (id: string, data: any) => {
        try {
            const response = await api.put(`Users/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (id: string) => {
        try {
            const response = await api.delete(`Users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    // Front Office & Administration
    getAdmissionQueries: async () => {
        try {
            const response = await api.get('Administration/AdmissionQuery');
            return response.data;
        } catch (error) {
            console.error('Error fetching admission queries:', error);
            throw error;
        }
    },

    createAdmissionQuery: async (data: any) => {
        try {
            const response = await api.post('Administration/AdmissionQuery', data);
            return response.data;
        } catch (error) {
            console.error('Error creating admission query:', error);
            throw error;
        }
    },

    getVisitors: async () => {
        try {
            const response = await api.get('Administration/VisitorBook');
            return response.data;
        } catch (error) {
            console.error('Error fetching visitor book:', error);
            throw error;
        }
    },

    createVisitor: async (data: any) => {
        try {
            const response = await api.post('Administration/VisitorBook', data);
            return response.data;
        } catch (error) {
            console.error('Error creating visitor record:', error);
            throw error;
        }
    },

    getComplaints: async () => {
        try {
            const response = await api.get('Administration/Complaint');
            return response.data;
        } catch (error) {
            console.error('Error fetching complaints:', error);
            throw error;
        }
    },

    createComplaint: async (data: any) => {
        try {
            const response = await api.post('Administration/Complaint', data);
            return response.data;
        } catch (error) {
            console.error('Error creating complaint:', error);
            throw error;
        }
    },

    getPostalLogs: async (type: 'Receive' | 'Dispatch' = 'Receive') => {
        try {
            const response = await api.get('Administration/PostalLog', { params: { type } });
            return response.data;
        } catch (error) {
            console.error('Error fetching postal logs:', error);
            throw error;
        }
    },

    createPostalLog: async (data: any) => {
        try {
            const response = await api.post('Administration/PostalLog', data);
            return response.data;
        } catch (error) {
            console.error('Error creating postal log:', error);
            throw error;
        }
    },

    getCertificates: async () => {
        try {
            const response = await api.get('Administration/Certificates');
            return response.data;
        } catch (error) {
            console.error('Error fetching certificates:', error);
            throw error;
        }
    },

    // Communication & Liaison
    getNotices: async () => {
        try {
            const response = await api.get('Communicate/notices');
            return response.data;
        } catch (error) {
            console.error('Error fetching notices:', error);
            throw error;
        }
    },

    sendMessage: async (data: { type: string; recipient: string; subject: string; body: string }) => {
        try {
            const response = await api.post('Communicate/send', data);
            return response.data;
        } catch (error) {
            console.error('Error dispatching message:', error);
            throw error;
        }
    },

    getMessageLogs: async () => {
        try {
            const response = await api.get('Communicate/logs');
            return response.data;
        } catch (error) {
            console.error('Error fetching message logs:', error);
            throw error;
        }
    },

    // Institutional Settings
    getSettings: async () => {
        try {
            const response = await api.get('Settings');
            return response.data;
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    },

    updateSettings: async (data: any) => {
        try {
            const response = await api.post('Settings', data);
            return response.data;
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    },

    getAcademicYears: async () => {
        try {
            const response = await api.get('Settings/academic-years');
            return response.data;
        } catch (error) {
            console.error('Error fetching academic years:', error);
            throw error;
        }
    }
};

export default api;
