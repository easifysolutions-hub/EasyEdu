import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Home, Building, UserCheck, Shield, BookOpen, UserCircle2, Pocket, KeySquare, MapPin } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function HostelScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [dormData, setDormData] = useState<any>(null);

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
        loadMyDorm();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const loadMyDorm = async () => {
        try {
            const data = await apiService.getMyDormitory();
            setDormData(data);
        } catch (error) {
            console.error('Failed to load dorm profile', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!dormData?.dormitory) {
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Housing Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Allocations</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Home color={colors.primary} size={22} />
                </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                    <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                        <Home color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                    </View>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>NO LODGING ALLOCATED</Text>
                    <Text style={[styles.emptyText, { color: colors.subtitle }]}>You are currently not slotted for internal campus housing.</Text>
                </Animated.View>
            </View>
        );
    }

    const { dormitory, room, allocationStatus, wardenName, wardenContact, lastInspection } = dormData;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />
            <Animated.View style={[styles.bgGlowBottom, { backgroundColor: colors.primaryGlow }, glowStyle]} />

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Housing Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Base Assignment</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Building color={colors.primary} size={22} />
                </View>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Sector Card */}
                <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.heroCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: isDark ? 'rgba(16, 185, 129, 0.4)' : colors.primary }]} />

                    <View style={styles.heroHeader}>
                        <View style={styles.heroGlow}>
                            <Building color={colors.primary} size={32} />
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{allocationStatus}</Text>
                        </View>
                    </View>

                    <Text style={[styles.dormName, { color: colors.text }]}>{dormitory.name.toUpperCase()}</Text>
                    <View style={[styles.dormTypeBox, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.dormType, { color: colors.text }]}>{dormitory.type} • CAPACITY: {dormitory.capacity}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Shield color={colors.subtitle} size={14} style={{ marginRight: 6 }} />
                        <Text style={[styles.dormAddress, { color: colors.subtitle }]}>{dormitory.address}</Text>
                    </View>
                </Animated.View>

                {/* Sub-modules Grid */}
                {room && (
                    <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.gridContainer}>
                        <View style={styles.gridBox}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            <KeySquare color={colors.primary} size={20} style={{ marginBottom: 12 }} />
                            <Text style={styles.gridLabel}>IDENTIFIER</Text>
                            <Text style={[styles.gridValue, { color: colors.text }]}>{room.roomNumber}</Text>
                        </View>
                        <View style={styles.gridBox}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            <Pocket color={colors.primary} size={20} style={{ marginBottom: 12 }} />
                            <Text style={styles.gridLabel}>CLASSTYPE</Text>
                            <Text style={[styles.gridValue, { color: colors.text }]}>{room.roomType}</Text>
                        </View>
                        <View style={styles.gridBox}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            <View style={styles.multiIconBox}>
                                <Text style={[styles.gridValue, { color: colors.primary, fontSize: 20 }]}>{room.beds}</Text>
                            </View>
                            <Text style={styles.gridLabel}>MAX CAPACITY</Text>
                        </View>
                        <View style={styles.gridBox}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            <Text style={[styles.gridValue, { fontSize: 18, marginBottom: 4, color: colors.text }]}>₹{room.costPerBed}</Text>
                            <Text style={styles.gridLabel}>CAPITAL PER BAY</Text>
                        </View>
                    </Animated.View>
                )}

                {/* Warden / Admin Card */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.adminCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <Text style={styles.sectionHeader}>COMMAND SUPERVISOR</Text>

                    <View style={styles.wardenRow}>
                        <View style={[styles.avatarHolder, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                            <UserCheck color={colors.primary} size={24} />
                        </View>
                        <View style={styles.wardenDetails}>
                            <Text style={[styles.wardenName, { color: colors.text }]}>{wardenName.toUpperCase()}</Text>
                            <Text style={styles.wardenRole}>SECTOR WARDEN</Text>
                        </View>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>PING</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>COMM LINK</Text>
                        <Text style={[styles.metaValue, { color: colors.text }]}>{wardenContact}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>LAST INSPECTION</Text>
                        <Text style={[styles.metaValue, { color: colors.text }]}>{lastInspection}</Text>
                    </View>
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
        top: -200,
        right: -150,
        width: 450,
        height: 450,
        borderRadius: 225,
        opacity: 0.1,
    },
    bgGlowBottom: {
        position: 'absolute',
        bottom: -200,
        left: -150,
        width: 450,
        height: 450,
        borderRadius: 225,
        opacity: 0.05,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        backgroundColor: 'transparent',
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
        borderRadius: 12,
    },
    headerRight: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
    },
    heroCard: {
        padding: 30,
        borderRadius: 32,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 20,
        alignItems: 'center',
    },
    cardInlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 32,
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 1,
        borderRadius: 32,
    },
    heroHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    heroGlow: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    statusText: {
        color: '#10B981',
        fontWeight: '900',
        fontSize: 10,
        letterSpacing: 0.5,
    },
    dormName: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -0.5,
        marginBottom: 10,
        textAlign: 'center',
    },
    dormTypeBox: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 16,
    },
    dormType: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dormAddress: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 16,
    },
    gridBox: {
        width: '47%',
        padding: 20,
        borderRadius: 24,
        position: 'relative',
        alignItems: 'flex-start',
    },
    gridLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    gridValue: {
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    multiIconBox: {
        marginBottom: 8,
    },
    adminCard: {
        padding: 24,
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    sectionHeader: {
        fontSize: 10,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
        marginBottom: 20,
    },
    wardenRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarHolder: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginRight: 16,
    },
    wardenDetails: {
        flex: 1,
    },
    wardenName: {
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    wardenRole: {
        fontSize: 11,
        color: '#10B981',
        fontWeight: '900',
        letterSpacing: 1,
    },
    actionBtn: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    actionBtnText: {
        color: '#10B981',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginBottom: 20,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    metaLabel: {
        fontSize: 10,
        color: '#71717A',
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    metaValue: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    emptyContainer: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyIconBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#71717A',
        fontWeight: '500',
    }
});
