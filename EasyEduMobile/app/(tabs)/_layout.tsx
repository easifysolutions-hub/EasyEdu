import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Users, BookOpen, Fingerprint, Activity, Radio, Cpu } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Platform, View, StyleSheet, useColorScheme } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
    const { colors, isDark } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.tabIconDefault,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    right: 24,
                    height: 76,
                    borderRadius: 28,
                    backgroundColor: isDark ? 'rgba(9, 9, 11, 0.96)' : 'rgba(255, 255, 255, 0.96)',
                    borderTopWidth: 0,
                    elevation: 25,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.2,
                    shadowRadius: 24,
                    borderWidth: 1,
                    borderColor: colors.surfaceBorder,
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]}>
                            <LayoutDashboard color={color} size={focused ? 26 : 22} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="students"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]}>
                            <Users color={color} size={focused ? 26 : 22} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="academics"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]}>
                            <Cpu color={color} size={focused ? 26 : 22} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]}>
                            <Fingerprint color={color} size={focused ? 26 : 22} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
    },
});
