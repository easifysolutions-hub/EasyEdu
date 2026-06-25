import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, withRepeat, withSequence, withTiming, withDelay } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { LogIn, GraduationCap, Sparkles, BrainCircuit, ChevronRight } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();
    const colors = Colors.dark;

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withRepeat(withSequence(withTiming(1, { duration: 1000 }), withTiming(1.05, { duration: 1000 })), -1, true) }],
        opacity: withRepeat(withSequence(withTiming(0.8, { duration: 1000 }), withTiming(1, { duration: 1000 })), -1, true),
    }));

    const handleGetStarted = () => {
        router.push('/login');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Elite Background Layers */}
            <ImageBackground
                source={require('../assets/images/welcome-bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(3,4,6,0.4)', 'rgba(3,4,6,0.95)', colors.background]}
                    style={styles.overlay}
                >
                    {/* Ambient Glows */}
                    <View style={styles.ambientGlowTop} />

                    <View style={styles.content}>
                        <Animated.View
                            entering={FadeInUp.delay(300).duration(1200).springify()}
                            style={styles.headerContainer}
                        >
                            <View style={styles.badge}>
                                <Sparkles color={colors.primary} size={14} fill={colors.primary} />
                                <Text style={styles.badgeText}>V16.2 NEXUS PROTOCOL</Text>
                            </View>

                            <View style={styles.logoSlot}>
                                <LinearGradient
                                    colors={[colors.primary, colors.secondary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.logoCircle}
                                >
                                    <BrainCircuit color="#fff" size={42} />
                                </LinearGradient>
                                <View style={styles.logoRing} />
                            </View>

                            <Text style={styles.appName}>EasyEdu <Text style={{ color: colors.primary }}>Nexus</Text></Text>
                            <Text style={styles.tagline}>Institutional Intelligence & Global Control</Text>
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
                                style={styles.secondaryButton}
                                onPress={() => { }}
                            >
                                <Text style={styles.secondaryButtonText}>Architecture Specs</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.delay(1200).duration(1000)}
                            style={styles.footer}
                        >
                            <Text style={styles.footerText}>© 2026 SOVEREIGN FRAMEWORKS. ENCRYPTED.</Text>
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
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        alignItems: 'center',
        paddingTop: height * 0.15,
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
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.2)',
        marginBottom: 32,
    },
    badgeText: {
        color: '#6366F1',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
    },
    logoSlot: {
        position: 'relative',
        marginBottom: 32,
    },
    logoCircle: {
        width: 90,
        height: 90,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    logoRing: {
        position: 'absolute',
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        borderRadius: 34,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    appName: {
        fontSize: 52,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -2,
        textAlign: 'center',
    },
    tagline: {
        fontSize: 14,
        color: '#8A8A91',
        marginTop: 12,
        textAlign: 'center',
        fontWeight: '500',
        maxWidth: '80%',
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
        borderRadius: 20,
        overflow: 'hidden',
    },
    primaryButton: {
        height: 70,
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
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.02)',
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
        color: '#4B5563',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
