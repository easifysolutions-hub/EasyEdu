import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        const hide = async () => {
            await SplashScreen.hideAsync();
        };
        hide();
    }, []);

    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="vouchers" />
                <Stack.Screen name="create-voucher" />
                <Stack.Screen name="students" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </ThemeProvider>
    );
}
