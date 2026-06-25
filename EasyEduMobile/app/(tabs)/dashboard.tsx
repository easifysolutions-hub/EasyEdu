import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, RefreshControl, ActivityIndicator, Platform, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInDown, FadeInUp, FadeInDown, useAnimatedStyle, withSpring, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import {
    ChevronRight, BookOpen, Clock, Award, Shield, LayoutGrid, CalendarRange, Archive,
    Wallet, Activity, Box, Receipt, Banknote, TrendingUp, TrendingDown, MessageSquare,
    ScrollText, DownloadCloud, FileCheck, Contact, ArrowUpCircle, HelpCircle, Package,
    MessageCircle, Globe, UserPlus, UserCheck, CreditCard, GraduationCap, FileText,
    Video, Bell, Bus, Users, Settings, Fingerprint, Warehouse
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { authService } from '@/services/authService';
import { apiService } from '@/services/apiService';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const isAdmin = user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin');
    const heroTitle = isAdmin ? 'FISCAL MOMENTUM' : 'ACADEMIC VELOCITY';
    const heroValue = isAdmin ? (summary?.feeCollection || '$0.00') : (summary?.academicIndex || '0.92');
    const HeroIcon = isAdmin ? Activity : Award;
    const glowValue = useSharedValue(0.1);

    useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.2, { duration: 3000 }),
                withTiming(0.1, { duration: 3000 })
            ),
            -1,
            true
        );
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));



    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await authService.getUser();
            setUser(userData);
            const summaryData = await apiService.getDashboardSummary();
            setSummary(summaryData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadData();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

// Standalone Roadmap Item Component
const RoadmapItem = ({ day, date, active, colors }: any) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => scale.value = withSpring(0.95)}
            onPressOut={() => scale.value = withSpring(1)}
            style={styles.roadmapItemWrapper}
        >
            <Animated.View style={[styles.roadmapItem, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }, active && { backgroundColor: colors.primary, borderColor: colors.primary }, animatedStyle]}>
                <Text style={[styles.roadmapDay, active ? { color: '#fff' } : { color: colors.subtitle }]}>{day}</Text>
                <Text style={[styles.roadmapDate, { color: colors.text }, active && { color: '#fff' }]}>{date}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Standalone Action Item Component
const ActionItem = ({ icon: Icon, label, color, delay, route, badge, colors, isDark, router }: any) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View entering={FadeInDown.delay(delay).duration(800)} style={styles.actionItemContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={() => scale.value = withSpring(0.9)}
                onPressOut={() => scale.value = withSpring(1)}
                onPress={() => route && router.push(route)}
            >
                <Animated.View style={[styles.actionIconButton, animatedStyle]}>
                    <View style={[styles.actionIconBg, { backgroundColor: colors.surface }]} />
                    <LinearGradient
                        colors={isDark ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.01)'] : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)']}
                        style={styles.actionIconGlass}
                    >
                        <Icon color={color || colors.primary} size={30} strokeWidth={2.5} />
                    </LinearGradient>
                    <View style={[styles.actionInnerBorder, { borderColor: colors.surfaceBorder }]} />
                    {badge > 0 && (
                        <View style={[styles.actionBadge, { backgroundColor: colors.primary, borderColor: colors.background }]}>
                            <Text style={styles.actionBadgeText}>{badge}</Text>
                        </View>
                    )}
                </Animated.View>
            </TouchableOpacity>
            <Text style={[styles.actionLabel, { color: colors.text }]} numberOfLines={1}>{label}</Text>
        </Animated.View>
    );
};

// Standalone Protocol Card Component
const ProtocolCard = ({ item, i, colors, isDark, router }: any) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));
    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
                onPress={() => { /* Add router navigation if needed */ }}
                style={[styles.protocolCard, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}
            >
                <View style={[styles.protocolIcon, { backgroundColor: colors.surface }]}>
                    <View style={[styles.iconInner, { backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary }]}>
                        <Activity color="#fff" size={16} />
                    </View>
                </View>
                <View style={styles.protocolContent}>
                    <View style={styles.protocolRow}>
                        <Text style={[styles.protocolName, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.protocolStatus, { backgroundColor: colors.primary + '15', color: colors.primary }]}>SYNCED</Text>
                    </View>
                    <Text style={[styles.protocolMeta, { color: colors.subtitle }]}>{item.time} • SECURE CHANNEL</Text>
                </View>
                <ChevronRight color={colors.subtitle} size={18} />
            </TouchableOpacity>
        </Animated.View>
    );
};


    if (loading && !refreshing) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />
            <Animated.View style={[styles.bgGlowBottom, { backgroundColor: colors.secondaryGlow }, glowStyle]} />

            {/* Premium Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.profileBox} onPress={() => router.push('/profile')}>
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            style={styles.avatarGlow}
                        />
                         <View style={[styles.avatarGlow, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
                            <Image source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=' + (user?.name || 'User') }} style={styles.avatarImg} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <View style={styles.welcomeRow}>
                            <Text style={[styles.welcomeText, { color: colors.text }]}>{user?.name?.split(' ')[0] || 'Nexus'} <Text style={{ color: colors.primary }}>Protocol</Text></Text>
                            <View style={[styles.statusTag, { backgroundColor: colors.primary + '15' }]}>
                                <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.statusText, { color: colors.primary }]}>ACTIVE</Text>
                            </View>
                        </View>
                        <View style={styles.locationRow}>
                            <Shield color={colors.subtitle} size={10} />
                            <Text style={[styles.locationText, { color: colors.subtitle }]}>SECURE PROTOCOL</Text>
                        </View>
                    </View>

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.notificationBtn} onPress={() => router.push('/notifications')}>
                            <LinearGradient
                                colors={[colors.primary + '20', colors.primary + '05']}
                                style={styles.backBtnBg}
                            />
                            <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                            <Bell color={colors.primary} size={22} />
                            {summary?.unreadNotifications > 0 && (
                                <View style={[styles.notifDot, { backgroundColor: colors.error, borderColor: colors.background }]}>
                                    <Text style={styles.notifDotText}>{summary.unreadNotifications}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Performance Hero Card */}
                <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={styles.heroCard}>
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroGradient}
                    >
                        <View style={styles.heroContent}>
                            <View>
                                <Text style={styles.heroLabel}>{heroTitle}</Text>
                                <Text style={styles.heroValue}>
                                    {heroValue} <Text style={styles.heroSubValue}> +8.4%</Text>
                                </Text>
                            </View>
                            <View style={styles.heroRight}>
                                <View style={styles.progressRing}>
                                    <View style={[styles.progressInner, { borderColor: 'rgba(255,255,255,0.3)', borderWidth: 4 }]} />
                                    <HeroIcon color="#fff" size={32} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.heroFooter}>
                            <View style={styles.syncStatus}>
                                <View style={[styles.syncDot, { backgroundColor: '#fff' }]} />
                                <Text style={styles.heroFooterText}>QUANTUM SYNC LIVE</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.heroAction, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)' }]}
                                onPress={() => {
                                    if (isAdmin) {
                                        router.push('/fiscal-forecast');
                                    } else {
                                        router.push('/exam-results');
                                    }
                                }}
                            >
                                <Text style={[styles.heroActionText, { color: '#fff' }]}>DETAILS</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
            >
                {/* Academic Roadmap (Horizontal scroll dates) */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Institutional Roadmap</Text>
                    <TouchableOpacity onPress={() => {}}><Text style={[styles.sectionAction, { color: colors.primary }]}>CHRONOS FEED</Text></TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roadmapScroll} contentContainerStyle={styles.roadmapContent}>
                    {summary?.roadmap && Array.isArray(summary.roadmap) ? (
                        summary.roadmap.map((item: any) => (
                            <RoadmapItem key={item.id} day={item.day} date={item.date.split(' ')[1]} active={item.status === 'Active'} colors={colors} />
                        ))
                    ) : (
                        <>
                            <RoadmapItem day="Mon" date="20" colors={colors} />
                            <RoadmapItem day="Tue" date="21" colors={colors} />
                            <RoadmapItem day="Wed" date="22" active colors={colors} />
                            <RoadmapItem day="Thu" date="23" colors={colors} />
                            <RoadmapItem day="Fri" date="24" colors={colors} />
                            <RoadmapItem day="Sat" date="25" colors={colors} />
                        </>
                    )}
                </ScrollView>

                {/* Mission Hub (Quick Actions) */}
                <View style={styles.missionHub}>
                    {/* Primary Financial Nodes */}
                    <ActionItem icon={CreditCard} label="Fees" color={colors.primary} delay={400} route="/fees" colors={colors} isDark={isDark} router={router} />
                    {(user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin')) && (
                        <>
                            <ActionItem icon={Banknote} label="Expenses" color={colors.error} delay={500} route="/expenses" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={Receipt} label="Vouchers" color={colors.secondary} delay={550} route="/vouchers" colors={colors} isDark={isDark} router={router} />
                        </>
                    )}

                    {/* Academic Protocols */}
                    <ActionItem icon={GraduationCap} label="Students" color={colors.primary} delay={600} route="/students" colors={colors} isDark={isDark} router={router} />
                    {isAdmin && (
                        <>
                            <ActionItem icon={UserCheck} label="Staff" color={colors.tertiary} delay={650} route="/staff" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={LayoutGrid} label="Matrix" color={colors.tertiary} delay={700} route="/subjects" colors={colors} isDark={isDark} router={router} />
                        </>
                    )}
                    <ActionItem icon={Clock} label="Routine" color={colors.primary} delay={750} route="/routine" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={ScrollText} label="Syllabus" color={colors.secondary} delay={800} route="/syllabus" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={BookOpen} label="Tasks" color={colors.accent} delay={850} route="/homework" badge={summary?.pendingHomework} colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={FileText} label="Exams" color={colors.error} delay={900} route="/exams" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Award} label="Merit" color={colors.accent} delay={950} route="/report-cards" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={DownloadCloud} label="Uplink" color={colors.primary} delay={1000} route="/study-materials" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Video} label="Live" color={colors.primary} delay={1050} route="/live-classes" colors={colors} isDark={isDark} router={router} />

                    {/* Institutional Liaison */}
                    {(isAdmin || user?.roles?.includes('Teacher')) && (
                        <ActionItem icon={MessageSquare} label="Liaison" color={colors.primary} delay={1100} route="/liaison" colors={colors} isDark={isDark} router={router} />
                    )}
                    <ActionItem icon={CalendarRange} label="Leaves" color={colors.primary} delay={1150} route="/leave-management" badge={summary?.pendingLeaves} colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Bell} label="Alarms" color={colors.primary} delay={1200} route="/notifications" colors={colors} isDark={isDark} router={router} />

                    {/* Logistic & Assets */}
                    <ActionItem icon={Archive} label="Archive" color={colors.secondary} delay={1250} route="/library" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Bus} label="Transit" color={colors.accent} delay={1300} route="/transport" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Warehouse} label="Housing" color={colors.secondary} delay={1350} route="/hostel" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Box} label="Assets" color={colors.accent} delay={1400} route="/inventory" colors={colors} isDark={isDark} router={router} />
                    <ActionItem icon={Fingerprint} label="Roll Call" color={colors.primary} delay={1450} route="/attendance" colors={colors} isDark={isDark} router={router} />

                    {/* Administrative Terminal */}
                    {isAdmin && (
                        <>
                            <ActionItem icon={UserPlus} label="Admit" color={colors.secondary} delay={1500} route="/student-admission" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={ArrowUpCircle} label="Promote" color={colors.accent} delay={1550} route="/promote-students" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={FileCheck} label="Diplomas" color={colors.primary} delay={1600} route="/certificates" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={Contact} label="Identity" color={colors.secondary} delay={1650} route="/id-cards" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={HelpCircle} label="Queries" color={colors.tertiary} delay={1700} route="/admission-query" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={Globe} label="Visitors" color={colors.primary} delay={1750} route="/visitor-book" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={Package} label="Registry" color={colors.secondary} delay={1800} route="/postal-log" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={MessageCircle} label="Reports" color={colors.error} delay={1850} route="/complaints" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={Users} label="Users" color={colors.primary} delay={1900} route="/users" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={Settings} label="Terminal" color={colors.secondary} delay={1950} route="/settings" colors={colors} isDark={isDark} router={router} />
                            <ActionItem icon={TrendingUp} label="Forecast" color={colors.primary} delay={2000} route="/fiscal-forecast" colors={colors} isDark={isDark} router={router} />
                        </>
                    )}
                </View>

                {/* Command Feed (Premium list items) */}
                <Animated.View entering={FadeInDown.delay(800).duration(1000)} style={styles.feedWrapper}>
                    <View style={styles.feedHeader}>
                        <Text style={[styles.feedTitle, { color: colors.text }]}>Neural Protocols</Text>
                        <TouchableOpacity><Text style={[styles.feedAction, { color: colors.primary }]}>CENTRAL FEED</Text></TouchableOpacity>
                    </View>

                    <View style={styles.feedList}>
                        {Array.isArray(summary?.recentActivity) ? summary.recentActivity.map((item: any, i: number) => (
                            <ProtocolCard key={item.id} item={item} i={i} colors={colors} router={router} isDark={isDark} />
                        )) : (
                            <View style={styles.emptyState}>
                                <Text style={[styles.emptyText, { color: colors.subtitle }]}>Monitoring quantum channels...</Text>
                            </View>
                        )}
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
        top: -100,
        right: -150,
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.1,
    },
    bgGlowBottom: {
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.05,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    profileBox: {
        position: 'relative',
        width: 54,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarGlow: {
        width: 52,
        height: 52,
        borderRadius: 18,
        position: 'absolute',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: 16,
    },
    welcomeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    statusTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    locationText: {
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationBtn: {
        width: 50,
        height: 50,
        borderRadius: 16,
        borderWidth: 1,
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
    notifDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        paddingHorizontal: 2,
    },
    notifDotText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: '900',
        textAlign: 'center',
    },
    heroCard: {
        height: 180,
        marginTop: 10,
        borderRadius: 36,
        overflow: 'hidden',
        position: 'relative',
        elevation: 20,
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
    },
    heroGradient: {
        flex: 1,
        padding: 28,
        justifyContent: 'space-between',
    },
    heroContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    heroLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)',
    },
    heroValue: {
        fontSize: 44,
        fontWeight: '900',
        marginTop: 6,
        color: '#fff',
        letterSpacing: -1,
    },
    heroSubValue: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '700',
    },
    heroRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressRing: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    progressInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 32,
    },
    heroFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    syncStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    syncDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    heroFooterText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
        color: '#fff',
    },
    heroAction: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    heroActionText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: -0.5,
        textTransform: 'capitalize',
    },
    sectionAction: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
    },
    roadmapScroll: {
        marginHorizontal: -24,
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    roadmapContent: {
        gap: 12,
        paddingRight: 48,
    },
    roadmapItemWrapper: {
        borderRadius: 24,
    },
    roadmapItem: {
        width: 70,
        height: 90,
        borderRadius: 24,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    roadmapDay: {
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    roadmapDate: {
        fontSize: 20,
        fontWeight: '900',
    },
    missionHub: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    actionItemContainer: {
        alignItems: 'center',
        width: '31%', 
        marginBottom: 20,
    },
    actionIconButton: {
        width: 78,
        height: 78,
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 12,
        elevation: 10,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    actionIconBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 24,
    },
    actionIconGlass: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionInnerBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 24,
        borderWidth: 1.5,
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: -0.2,
    },
    actionBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 1.5,
    },
    actionBadgeText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#fff',
    },
    feedWrapper: {
        gap: 20,
    },
    feedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    feedTitle: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    feedAction: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    feedList: {
        gap: 16,
    },
    protocolCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 24,
        borderWidth: 1.5,
        marginBottom: 8,
    },
    protocolIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconInner: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    protocolContent: {
        flex: 1,
    },
    protocolRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    protocolName: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    protocolStatus: {
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 0.5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    protocolMeta: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    emptyState: {
        paddingVertical: 32,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        fontStyle: 'italic',
    }
});
