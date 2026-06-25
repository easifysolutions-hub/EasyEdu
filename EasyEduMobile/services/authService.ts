import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// In development with an emulator, '10.0.2.2' is the special alias for the host loopback interface in Android Emulator.
const API_URL = 'http://10.0.2.2:5004/api/';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const authService = {
    login: async (email: string, password: string) => {
        try {
            console.log(`[AuthService] Attempting login for: ${email}`);
            console.log(`[AuthService] Target URL: ${API_URL}auth/login`);

            const response = await api.post('auth/login', { email, password });
            
            console.log(`[AuthService] Response status: ${response.status}`);
            const { token, user } = response.data;

            if (token) {
                console.log(`[AuthService] Token received. Storing in SecureStore...`);
                await SecureStore.setItemAsync('userToken', token);
                await SecureStore.setItemAsync('userData', JSON.stringify(user));
                console.log(`[AuthService] Storage complete.`);
            } else {
                console.warn(`[AuthService] No token found in response.`);
            }

            return { success: true, user };
        } catch (error: any) {
            console.error('[AuthService] Login Exception:', error?.message);
            if (error.response) {
                console.error('[AuthService] Server Error Response:', error.response.data);
                console.error('[AuthService] Status Code:', error.response.status);
            } else if (error.request) {
                console.error('[AuthService] No response received from server. Is the backend running at 10.0.2.2:5004?');
            }
            return { success: false, message: error?.response?.data?.message || 'Login failed: Connection Error' };
        }
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
    },

    getToken: async () => {
        return await SecureStore.getItemAsync('userToken');
    },

    getUser: async () => {
        const data = await SecureStore.getItemAsync('userData');
        return data ? JSON.parse(data) : null;
    }
};
