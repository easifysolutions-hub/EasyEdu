import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Dimensions, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInRight, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { User, Lock, ArrowRight, Home, BrainCircuit, ShieldCheck, Sparkles, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { authService } from '@/services/authService';

const { width, height } = Dimensions.get('window');

import { useTheme } from '@/contexts/ThemeContext';

export default function LoginScreen() {
    const router = useRouter();
    const { theme, isDark } = useTheme();
    const colors = Colors[theme];

    const [email, setEmail] = useState('student@easyedu.com');
    const [password, setPassword] = useState('Student@123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const glowValue = useSharedValue(0.15);

    React.useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.25, { duration: 3000 }),
                withTiming(0.15, { duration: 3000 })
            ),
            -1,
            true
        );
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        const result = await authService.login(email, password);
        if (result.success) {
            router.replace('/(tabs)/dashboard');
        } else {
            setError(result.message || 'Access Denied: Protocol Mismatch');
        }
        setLoading(false);
    };

    const handleGoBack = () => {
        router.replace('/');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Elite Background Atmosphere */}
            <Animated.View style={[styles.ambientGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.header}>
                        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                            <LinearGradient
                                colors={[colors.primary + '20', colors.primary + '05']}
                                style={styles.backBtnBg}
                            />
                            <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                            <ChevronLeft color={colors.primary} size={24} />
                        </TouchableOpacity>

                        <View style={styles.nexusBranding}>
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                style={styles.miniLogo}
                            >
                                <BrainCircuit color="#fff" size={24} />
                            </LinearGradient>
                            <Text style={[styles.nexusTitle, { color: colors.text }]}>NEXUS <Text style={{ color: colors.primary }}>PROTOCOL</Text></Text>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(400).duration(1000)} style={styles.heroSection}>
                        <Text style={[styles.title, { color: colors.text }]}>Initialize Command</Text>
                        <Text style={[styles.subtitle, { color: colors.subtitle }]}>Secure institutional gateway for authorized personnel.</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(500).duration(1000)} style={styles.quickAccess}>
                        <Text style={[styles.quickAccessLabel, { color: colors.primary }]}>
                            <Sparkles size={12} color={colors.primary} /> QUICK ACCESS PROTOCOL
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAccessScroll}>
                            {[
                                { role: 'Admin', email: 'admin@easyedu.com', pass: 'Admin@123', icon: '🛡️' },
                                { role: 'Staff', email: 'admin_staff@easyedu.com', pass: 'Admin@123', icon: '👨‍💼' },
                                { role: 'Teacher', email: 'teacher@easyedu.com', pass: 'Teacher@123', icon: '👨‍🏫' },
                                { role: 'Student', email: 'student@easyedu.com', pass: 'Student@123', icon: '🎓' },
                                { role: 'Accountant', email: 'accountant@easyedu.com', pass: 'Accountant@123', icon: '💰' },
                                { role: 'Librarian', email: 'librarian@easyedu.com', pass: 'Librarian@123', icon: '📚' },
                            ].map((item, idx) => (
                                <TouchableOpacity 
                                    key={idx} 
                                    style={[styles.roleChip, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}
                                    onPress={() => {
                                        setEmail(item.email);
                                        setPassword(item.pass);
                                    }}
                                >
                                    <Text style={styles.roleIcon}>{item.icon}</Text>
                                    <Text style={[styles.roleText, { color: colors.text }]}>{item.role}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).duration(1000)} style={styles.form}>
                        <View style={styles.inputStack}>
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputInner}>
                                    <User color={colors.primary} size={20} style={styles.inputIcon} />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Identification"
                                        placeholderTextColor={colors.subtitle}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                                <View style={[styles.inputBorder, { borderColor: colors.surfaceBorder }]} />
                            </View>

                            <View style={styles.inputWrapper}>
                                <View style={styles.inputInner}>
                                    <Lock color={colors.primary} size={20} style={styles.inputIcon} />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Access Key"
                                        placeholderTextColor={colors.subtitle}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>
                                <View style={[styles.inputBorder, { borderColor: colors.surfaceBorder }]} />
                            </View>
                        </View>

                        {error && (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>RECOVER PROTOCOL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleLogin}
                            disabled={loading}
                            style={[styles.loginBtnWrapper, { shadowColor: colors.primary }]}
                        >
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.loginButton}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Text style={styles.loginButtonText}>ACTIVATE HUB</Text>
                                        <ShieldCheck color="#fff" size={20} />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.footer}>
                        <View style={[styles.securityBadge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.1)' }]}>
                            <Sparkles color={colors.primary} size={14} />
                            <Text style={[styles.securityText, { color: colors.primary }]}>AES-256 ENCRYPTED UPLINK</Text>
                        </View>
                        <Text style={[styles.footerInfo, { color: colors.subtitle }]}>
                            Access restricted to registered institutional nodes.
                            <Text style={{ color: colors.primary }}> Authorization Support</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ambientGlow: {
        position: 'absolute',
        bottom: -150,
        right: -150,
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.15,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 32,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    backButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backBtnBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
    },
    nexusBranding: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    miniLogo: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nexusTitle: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
    heroSection: {
        marginBottom: 32,
    },
    quickAccess: {
        marginBottom: 32,
        gap: 12,
    },
    quickAccessLabel: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    quickAccessScroll: {
        gap: 12,
        paddingRight: 32,
    },
    roleChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        gap: 8,
    },
    roleIcon: {
        fontSize: 16,
    },
    roleText: {
        fontSize: 13,
        fontWeight: '700',
    },
    title: {
        fontSize: 40,
        fontWeight: '900',
        letterSpacing: -1,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
    },
    form: {
        gap: 24,
    },
    inputStack: {
        gap: 16,
    },
    inputWrapper: {
        width: '100%',
        position: 'relative',
    },
    inputInner: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        borderRadius: 20,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    inputBorder: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 20,
        borderWidth: 1,
    },
    inputIcon: {
        marginRight: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    forgotPassword: {
        alignSelf: 'flex-start',
    },
    forgotPasswordText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    loginBtnWrapper: {
        marginTop: 12,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 10,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    loginButton: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    errorBox: {
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(244, 63, 94, 0.2)',
    },
    errorText: {
        color: '#F43F5E',
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'center',
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: 40,
        alignItems: 'center',
        gap: 16,
    },
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    securityText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    footerInfo: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        fontWeight: '500',
    },
});
