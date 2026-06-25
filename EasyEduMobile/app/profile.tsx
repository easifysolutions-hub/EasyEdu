import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, User, Mail, Phone, Calendar, Shield, MapPin, Hash, Edit3, Fingerprint } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

export default function ProfileScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    const glowValue = useSharedValue(0.4);

    useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.8, { duration: 3000 }),
                withTiming(0.4, { duration: 3000 })
            ),
            -1,
            true
        );
        loadData();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const loadData = async () => {
        try {
            const data = await apiService.getProfile();
            setProfile(data);
        } catch (error) {
            console.error('Failed to load profile parameters', error);
        } finally {
            setLoading(false);
        }
    };

    const InfoRow = ({ icon: Icon, label, value, delay }: any) => (
        <Animated.View entering={FadeInUp.delay(delay).duration(800)} style={styles.infoRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                <Icon color={colors.primary} size={18} />
                <View style={[styles.cardBorder, { borderColor: colors.primary + '30', borderRadius: 14 }]} />
            </View>
            <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.subtitle }]}>{label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]} numberOfLines={1}>{value || 'CLASSIFIED'}</Text>
            </View>
        </Animated.View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <ArrowLeft color={colors.primary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Entity Profile</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Identity Details</Text>
                </View>
                <TouchableOpacity style={styles.headerRight} activeOpacity={0.7} onPress={() => router.push('/edit-profile')}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Edit3 color={colors.primary} size={20} />
                </TouchableOpacity>
            </Animated.View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : profile ? (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Top Avatar Panel */}
                    <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarPanel}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.avatarWrapper}>
                            {profile.profilePicture ? (
                                <Image source={{ uri: profile.profilePicture }} style={styles.avatarImage} />
                            ) : (
                                <View style={[styles.avatarFallback, { backgroundColor: colors.primary + '15' }]}>
                                    <Text style={[styles.avatarInitial, { color: colors.primary }]}>
                                        {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'X'}
                                    </Text>
                                    <View style={[styles.cardBorder, { borderColor: colors.primary + '30', borderRadius: 50, borderWidth: 2 }]} />
                                </View>
                            )}
                        </View>

                        <Animated.Text entering={FadeIn.delay(200).duration(800)} style={[styles.nameText, { color: colors.text }]}>
                            {profile.fullName}
                        </Animated.Text>

                        <Animated.View entering={FadeIn.delay(300).duration(800)} style={[styles.roleBadge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)' }]}>
                            <Shield color={colors.primary} size={12} />
                            <Text style={[styles.roleText, { color: colors.primary }]}>{profile.role}</Text>
                            <View style={[styles.cardBorder, { borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)', borderRadius: 20 }]} />
                        </Animated.View>
                    </Animated.View>

                    {/* Information Module */}
                    <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.infoCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={[styles.sectionHeader, { borderBottomColor: colors.surfaceBorder }]}>
                            <User color={colors.primary} size={16} />
                            <Text style={styles.cardTitle}>CLASSIFIED IDENTITY</Text>
                        </View>

                        <InfoRow icon={Mail} label="COMMS LINK" value={profile.email} delay={500} />
                        <InfoRow icon={Phone} label="DIRECT VECTOR" value={profile.phoneNumber} delay={600} />

                        {profile.role === 'Student' && (
                            <>
                                <InfoRow icon={Hash} label="ADMISSION REGISTRY" value={profile.admissionNumber} delay={700} />
                                <InfoRow icon={Hash} label="ROLL SEQUENCE" value={profile.rollNumber} delay={750} />
                                <InfoRow icon={Shield} label="ACADEMIC UNIT" value={`${profile.className} - ${profile.sectionName}`} delay={800} />
                            </>
                        )}

                        {(profile.role === 'Teacher' || profile.role === 'Staff' || profile.role === 'Admin') && (
                            <>
                                <InfoRow icon={Hash} label="EMPLOYEE ID" value={profile.employeeId} delay={700} />
                                <InfoRow icon={Shield} label="DESIGNATION" value={profile.designation} delay={750} />
                                <InfoRow icon={MapPin} label="DEPARTMENT" value={profile.department} delay={800} />
                                <InfoRow icon={Edit3} label="QUALIFICATION" value={profile.qualification} delay={850} />
                            </>
                        )}

                        <InfoRow icon={Calendar} label="INCEPTION DATE" value={profile.joinedDate} delay={900} />
                    </Animated.View>
                </ScrollView>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Identity sequence not found.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgGlow: {
        position: 'absolute',
        top: -150,
        right: -100,
        width: 350,
        height: 350,
        borderRadius: 175,
        opacity: 0.15,
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
        borderWidth: 1,
        borderRadius: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    backBtn: {
        width: 44,
        height: 44,
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    headerRight: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
        alignItems: 'center',
    },
    avatarPanel: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 24,
        borderRadius: 24,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    avatarWrapper: {
        marginBottom: 20,
        position: 'relative',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    avatarFallback: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    avatarInitial: {
        fontSize: 40,
        fontWeight: '900',
    },
    nameText: {
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 10,
        letterSpacing: -0.5,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        position: 'relative',
    },
    roleText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#10B981',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    infoCard: {
        width: '100%',
        borderRadius: 24,
        padding: 24,
        paddingTop: 0,
        position: 'relative',
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.03)',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        position: 'relative',
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#A1A1AA',
        fontWeight: '800',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#71717A',
        fontWeight: '500',
    }
});
