import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, withRepeat, withSequence, withTiming, withDelay, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { LogIn, GraduationCap, Sparkles, BrainCircuit, ChevronRight } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const handleGetStarted = () => {
        router.push('/login');
    };

    const glowValue = useSharedValue(0.4);

    React.useEffect(() => {
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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Elite Background Layers */}
            <ImageBackground
                source={require('../assets/images/welcome-bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={isDark ? ['rgba(3,4,6,0.5)', 'rgba(3,4,6,0.98)', colors.background] : ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.95)', colors.background]}
                    style={styles.overlay}
                >
                    {/* Ambient Glows */}
                    <Animated.View style={[styles.ambientGlowTop, { backgroundColor: colors.primaryGlow }, glowStyle]} />

                    <View style={styles.content}>
                        <Animated.View
                            entering={FadeInUp.delay(300).duration(1200).springify()}
                            style={styles.headerContainer}
                        >
                            <View style={[styles.badge, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                                <Sparkles color={colors.primary} size={14} fill={colors.primary} />
                                <Text style={[styles.badgeText, { color: colors.primary }]}>V17.0 EMERALD PROTOCOL</Text>
                            </View>

                            <View style={styles.logoSlot}>
                                <LinearGradient
                                    colors={[colors.primary, colors.secondary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.logoCircle, { shadowColor: colors.primary }]}
                                >
                                    <BrainCircuit color="#fff" size={46} />
                                </LinearGradient>
                                <View style={styles.logoRing} />
                                <View style={[styles.logoRing, { transform: [{ scale: 1.15 }], opacity: 0.1 }]} />
                            </View>

                            <Text style={[styles.appName, { color: colors.text }]}>EasyEdu <Text style={{ color: colors.primary }}>Nexus</Text></Text>
                            <Text style={[styles.tagline, { color: colors.subtitle }]}>Institutional Intelligence & Quantum Control</Text>
                        </Animated.View>

                        <View style={styles.spacer} />

                        <Animated.View
                            entering={FadeInDown.delay(800).duration(1000)}
                            style={styles.actionContainer}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleGetStarted}
                                style={styles.buttonWrapper}
                            >
                                <LinearGradient
                                    colors={[colors.primary, colors.secondary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.primaryButton}
                                >
                                    <Text style={styles.buttonText}>Initialize Command</Text>
                                    <ChevronRight color="#fff" size={20} />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.secondaryButton, { borderColor: colors.surfaceBorder, backgroundColor: colors.surface }]}
                                onPress={() => { }}
                            >
                                <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Nexus Architecture</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.delay(1200).duration(1000)}
                            style={styles.footer}
                        >
                            <Text style={[styles.footerText, { color: colors.subtitle }]}>© 2026 EMERALD SOVEREIGN. ENCRYPTED.</Text>
                        </Animated.View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    ambientGlowTop: {
        position: 'absolute',
        top: -150,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.4,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        alignItems: 'center',
        paddingTop: height * 0.12,
        paddingBottom: 60,
    },
    headerContainer: {
        alignItems: 'center',
        width: '100%',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 32,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
    },
    logoSlot: {
        position: 'relative',
        marginBottom: 32,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
    },
    logoRing: {
        position: 'absolute',
        top: -12,
        left: -12,
        right: -12,
        bottom: -12,
        borderRadius: 42,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    appName: {
        fontSize: 56,
        fontWeight: '900',
        letterSpacing: -2,
        textAlign: 'center',
    },
    tagline: {
        fontSize: 14,
        marginTop: 12,
        textAlign: 'center',
        fontWeight: '500',
        maxWidth: '85%',
        lineHeight: 20,
    },
    spacer: {
        flex: 1,
    },
    actionContainer: {
        width: '100%',
        gap: 16,
    },
    buttonWrapper: {
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
    },
    primaryButton: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    secondaryButton: {
        height: 75,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 40,
    },
    footerText: {
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
