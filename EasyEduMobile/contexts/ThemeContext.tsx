import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
    accentColor: string;
    setAccentColor: (color: string) => void;
    colors: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ACCENT_COLORS = [
    { name: 'Emerald', value: '#10B981' },
    { name: 'Ocean', value: '#3B82F6' },
    { name: 'Royal', value: '#8B5CF6' },
    { name: 'Ruby', value: '#F43F5E' },
    { name: 'Sunset', value: '#F59E0B' },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState<Theme>(systemColorScheme === 'light' ? 'light' : 'dark');
    const [accentColor, setAccent] = useState('#10B981');

    useEffect(() => {
        const loadTheme = async () => {
            const [savedTheme, savedAccent] = await Promise.all([
                AsyncStorage.getItem('user-theme'),
                AsyncStorage.getItem('user-accent')
            ]);
            
            if (savedTheme) {
                setTheme(savedTheme as Theme);
            } else if (systemColorScheme === 'light' || systemColorScheme === 'dark') {
                setTheme(systemColorScheme);
            }

            if (savedAccent) {
                setAccent(savedAccent);
            }
        };
        loadTheme();
    }, [systemColorScheme]);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await AsyncStorage.setItem('user-theme', newTheme);
    };

    const setAccentColor = async (color: string) => {
        setAccent(color);
        await AsyncStorage.setItem('user-accent', color);
    };

    // Construct dynamic colors object
    const baseColors = Colors[theme];
    const dynamicColors = {
        ...baseColors,
        primary: accentColor,
        primaryGlow: accentColor + (theme === 'dark' ? '60' : '20'),
        tabIconSelected: accentColor,
        tint: theme === 'dark' ? '#FFFFFF' : accentColor,
    };

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            toggleTheme, 
            isDark: theme === 'dark', 
            accentColor, 
            setAccentColor,
            colors: dynamicColors
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
