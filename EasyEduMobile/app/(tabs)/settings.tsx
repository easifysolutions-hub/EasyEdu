import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useTheme, ACCENT_COLORS } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeIn, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { 
    User, Bell, Shield, Moon, LogOut, ChevronRight, HelpCircle, Fingerprint, Palette, Check, Settings2 
} from 'lucide-react-native';
import { authService } from '@/services/authService';
import { useEffect } from 'react';

export default function SettingsScreen() {
    const router = useRouter();
    const { theme, toggleTheme, isDark, accentColor, setAccentColor, colors } = useTheme();

    const glowValue = useSharedValue(0.4);

    useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.7, { duration: 3000 }),
                withTiming(0.4, { duration: 3000 })
            ),
            -1,
            true
        );
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const handleLogout = async () => {
        await authService.logout();
        router.replace('/');
    };

    const SettingItem = ({ icon: Icon, title, value, type = 'navigate', link, isLast }: any) => {
        const scale = useSharedValue(1);
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }]
        }));

        const handlePressIn = () => {
            scale.value = withSpring(0.98);
        };

        const handlePressOut = () => {
            scale.value = withSpring(1);
        };

        return (
            <Animated.View style={animatedStyle}>
                <TouchableOpacity
                    style={[styles.item, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.surfaceBorder }]}
                    onPress={() => {
                        if (type === 'switch') toggleTheme();
                        else if (link) router.push(link);
                    }}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={!link && type !== 'switch'}
                    activeOpacity={0.9}
                >
                    <View style={[styles.iconBox, { backgroundColor: colors.surface }]}>
                        {(() => { const IconComp = Icon as any; return <IconComp color={colors.primary} size={20} />; })()}
                    </View>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>{title}</Text>
                    {type === 'switch' ? (
                        <Switch 
                            value={value} 
                            onValueChange={toggleTheme} 
                            thumbColor={colors.primary} 
                            trackColor={{ false: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', true: colors.primary + '50' }} 
                        />
                    ) : value ? (
                        <Text style={[styles.itemValue, { color: colors.subtitle }]}>{value}</Text>
                    ) : (
                        (() => { const IconComp = ChevronRight as any; return <IconComp color={colors.subtitle} size={20} />; })()
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <View style={styles.headerTop}>
                    <View style={styles.titleSection}>
                        <Fingerprint color={colors.primary} size={28} />
                        <Text style={[styles.screenTitle, { color: colors.text }]}>Settings Protocol</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Settings2 color={colors.primary} size={22} />
                        <View style={[styles.iconBoxBg, { backgroundColor: colors.surface }]} />
                    </View>
                </View>
                <Text style={[styles.subtitle, { color: colors.subtitle }]}>Configure institutional preferences & UI metrics</Text>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Account</Text>
                    <View style={styles.sectionCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <SettingItem icon={User} title="Profile Information" link="/profile" />
                        <SettingItem icon={Bell} title="Notifications" />
                        <SettingItem icon={Shield} title="Security & Privacy" isLast />
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Preferences</Text>
                    <View style={styles.sectionCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <SettingItem icon={Moon} title="Dark Mode" value={isDark} type="switch" />
                        <SettingItem icon={HelpCircle} title="Help & Support" isLast />
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(350).duration(800)} style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Aesthetics</Text>
                    <View style={styles.sectionCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                        
                        <View style={styles.paletteContainer}>
                            <View style={[styles.iconBox, { backgroundColor: colors.surface, marginBottom: 12 }]}>
                                <Palette color={colors.primary} size={20} />
                            </View>
                            <Text style={[styles.itemTitle, { color: colors.text, marginBottom: 16 }]}>Accent Protocol</Text>
                            
                            <View style={styles.colorGrid}>
                                {ACCENT_COLORS.map((color) => (
                                    <TouchableOpacity 
                                        key={color.value}
                                        style={[
                                            styles.colorOption, 
                                            { backgroundColor: color.value },
                                            accentColor === color.value && styles.activeColorOption
                                        ]}
                                        onPress={() => setAccentColor(color.value)}
                                    >
                                        {accentColor === color.value && <Check color="#fff" size={14} />}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(400).duration(800)}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        activeOpacity={0.8}
                        onPress={handleLogout}
                    >
                        <LogOut color="#EF4444" size={20} />
                        <Text style={styles.logoutText}>Terminate Session</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View entering={FadeIn.delay(600).duration(1000)} style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.text }]}>Nexus Protocol v17.0.0</Text>
                    <Text style={[styles.footerSubText, { color: colors.subtitle }]}>Integrated Institutional Roadmap</Text>
                    <Text style={[styles.footerSubText, { color: colors.subtitle, marginTop: 4 }]}>Powered by EasyEdu Academy</Text>
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgGlow: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 350,
        height: 350,
        borderRadius: 175,
        opacity: 0.15,
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerRight: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconBoxBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 12,
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        textTransform: 'uppercase',
        marginBottom: 12,
        marginLeft: 8,
        letterSpacing: 1.5,
    },
    sectionCard: {
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    cardInlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 24,
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 24,
        borderWidth: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    itemValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20,
        marginTop: 10,
        gap: 10,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#EF4444',
    },
    footer: {
        marginTop: 50,
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    footerSubText: {
        fontSize: 12,
        fontWeight: '500',
    },
    paletteContainer: {
        padding: 16,
    },
    colorGrid: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    colorOption: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeColorOption: {
        borderColor: 'rgba(255,255,255,0.5)',
        transform: [{ scale: 1.1 }],
    }
});
