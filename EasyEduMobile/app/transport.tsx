import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, withRepeat, withTiming, useSharedValue, useAnimatedStyle, Easing, withSpring, withSequence } from 'react-native-reanimated';
import { ArrowLeft, MapPin, Navigation, Phone, Fingerprint, Calendar, Anchor, Radar, Radio } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

export default function TransportScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [transitData, setTransitData] = useState<any>(null);

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
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    // Radar animation
    const radarScale = useSharedValue(0.5);
    const radarOpacity = useSharedValue(1);

    useEffect(() => {
        radarScale.value = withRepeat(
            withTiming(2, { duration: 2500, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );
        radarOpacity.value = withRepeat(
            withTiming(0, { duration: 2500, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );
        loadTransit();
    }, []);

    const radarStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: radarScale.value }],
            opacity: radarOpacity.value,
        };
    });

    const loadTransit = async () => {
        try {
            const data = await apiService.getMyTransit();
            setTransitData(data);
        } catch (error) {
            console.error('Failed to load transit data', error);
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

    if (!transitData?.isSubscribed) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {/* Emerald Atmosphere */}
                <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Transit Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Route Logistics</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Radio color={colors.primary} size={22} />
                </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                    <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                        <Fingerprint color={colors.icon} size={40} style={{ opacity: 0.5 }} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                    </View>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ROUTES ALLOCATED</Text>
                    <Text style={[styles.emptyText, { color: colors.subtitle }]}>You are not currently synced to any active transit manifest.</Text>
                </Animated.View>
            </View>
        );
    }

    const { route, vehicle, boardingPoint, dropPoint, lastUpdated } = transitData;

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Transit Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Live Logistics</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Radio color={colors.primary} size={22} />
                </View>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Radar Visual */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.radarWrapper}>
                    <View style={styles.radarCenter}>
                        <Radar color={colors.primary} size={32} />
                    </View>
                    <Animated.View style={[styles.radarRing, radarStyle, { borderColor: colors.primaryGlow, backgroundColor: 'rgba(16, 185, 129, 0.05)' }]} />
                    <View style={styles.radarStatus}>
                        <Text style={[styles.radarStatusText, { color: colors.primary }]}>{vehicle?.status || 'TRACKING'}</Text>
                        <View style={[styles.liveIndicator, { backgroundColor: colors.primary }]} />
                    </View>
                </Animated.View>

                {/* ETA Card */}
                <EtaCard vehicle={vehicle} lastUpdated={lastUpdated} colors={colors} />

                {/* Logistics Info */}
                <Animated.View entering={FadeInUp.delay(500).duration(800)} style={styles.infoCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={[styles.infoHeader, { borderBottomColor: colors.surfaceBorder }]}>
                        <Text style={[styles.infoTitle, { color: colors.text }]}>ROUTE {route?.name?.toUpperCase()}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                            <MapPin color={colors.icon} size={20} />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>BOARDING ZONE</Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>{boardingPoint}</Text>
                        </View>
                    </View>
                    <View style={[styles.separator, { backgroundColor: colors.surfaceBorder }]} />
                    <View style={styles.infoRow}>
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                            <Anchor color={colors.icon} size={20} />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>DROP OFF POINT</Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>{dropPoint}</Text>
                        </View>
                    </View>

                    {vehicle && (
                        <>
                            <View style={[styles.separator, { marginVertical: 20 }]} />
                            <Text style={[styles.infoLabel, { marginBottom: 16, marginLeft: 4 }]}>VEHICLE MANIFEST</Text>

                            <View style={styles.vehicleGrid}>
                                <View style={[styles.vehicleItem, { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderColor: colors.surfaceBorder }]}>
                                    <Text style={styles.vehicleLabel}>IDENTIFIER</Text>
                                    <View style={styles.badgeLabel}>
                                        <Text style={styles.badgeText}>{vehicle.vehicleNumber}</Text>
                                    </View>
                                </View>
                                <View style={[styles.vehicleItem, { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderColor: colors.surfaceBorder }]}>
                                    <Text style={styles.vehicleLabel}>PILOT</Text>
                                    <Text style={[styles.vehicleValue, { color: colors.text }]}>{vehicle.driverName}</Text>
                                </View>
                            </View>

                            {vehicle.driverContact && (
                                <TouchableOpacity style={[styles.commsBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8}>
                                    <Phone color={colors.background} size={18} />
                                    <Text style={[styles.commsBtnText, { color: colors.background }]}>INITIATE COMMS</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </Animated.View>

            </ScrollView>
        </View>
    );
}

const EtaCard = ({ vehicle, lastUpdated, colors }: any) => {
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View 
            entering={FadeInUp.delay(300).duration(800)}
            style={cardStyle}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
            >
                <View style={styles.etaCard}>
                    <LinearGradient
                        colors={[colors.primary + '15', colors.cardBg]}
                        style={styles.etaGlass}
                    >
                        <View style={styles.etaContent}>
                            <View>
                                <Text style={[styles.etaLabel, { color: colors.primary }]}>ARRIVAL ESTIMATE</Text>
                                <Text style={[styles.etaValue, { color: colors.text }]}>{vehicle?.eta || 'SYNCING...'}</Text>
                            </View>
                            <View style={[styles.etaIconWrapper, { backgroundColor: colors.primary + '10' }]}>
                                <Navigation color={colors.primary} size={28} />
                            </View>
                        </View>
                        <View style={[styles.etaFooter, { borderTopColor: colors.surfaceBorder }]}>
                            <Text style={[styles.etaFooterText, { color: colors.subtitle }]}>Last sync: {lastUpdated}</Text>
                        </View>
                    </LinearGradient>
                    <View style={[styles.cardBorder, { borderColor: colors.primary + '20', borderRadius: 24 }]} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

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
        color: '#fff',
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
    radarWrapper: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    radarCenter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    radarRing: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
    },
    radarStatus: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    radarStatusText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
        marginRight: 6,
    },
    liveIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
    },
    etaCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        position: 'relative',
    },
    etaGlass: {
        padding: 24,
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 1,
    },
    etaContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    etaLabel: {
        fontSize: 11,
        color: '#10B981',
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 6,
    },
    etaValue: {
        fontSize: 36,
        fontWeight: '900',
        color: '#fff',
    },
    etaIconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    etaFooter: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 16,
    },
    etaFooterText: {
        fontSize: 10,
        color: '#71717A',
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    infoCard: {
        padding: 24,
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
    infoHeader: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 10,
        color: '#71717A',
        fontWeight: '900',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '700',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 16,
        marginLeft: 60,
    },
    vehicleGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    vehicleItem: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.02)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.04)',
    },
    vehicleLabel: {
        fontSize: 9,
        color: '#71717A',
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 8,
    },
    vehicleValue: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
    },
    badgeLabel: {
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: '#10B981',
        fontSize: 12,
        fontWeight: '900',
    },
    commsBtn: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    commsBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
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
        fontWeight: '500',
    }
});
