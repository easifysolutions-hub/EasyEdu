import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Clock, MapPin, User, Calendar, Fingerprint, LayoutList } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function RoutineScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [routineData, setRoutineData] = useState<any[]>([]);
    const [activeDay, setActiveDay] = useState<string>('Monday');

    const glowValue = useSharedValue(0.4);

    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.8, { duration: 3000 }),
                withTiming(0.4, { duration: 3000 })
            ),
            -1,
            true
        );
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setActiveDay(DAYS.includes(today) ? today : 'Monday');
        loadData();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const loadData = async () => {
        try {
            const data = await apiService.getRoutine();
            setRoutineData(data);
        } catch (error) {
            console.error('Failed to load routine', error);
        } finally {
            setLoading(false);
        }
    };

    const getActiveDayClasses = () => {
        const dayGroup = routineData.find(g => g.day === activeDay);
        return dayGroup ? dayGroup.classes : [];
    };

    const activeClasses = getActiveDayClasses();

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Daily Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Class Routine</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <LayoutList color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {/* Days Tabs - Glass Implementation */}
            <Animated.View entering={FadeInDown.duration(800)} style={[styles.daysWrapper, { backgroundColor: isDark ? 'rgba(9,9,11,0.5)' : colors.background }]}>
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderTopWidth: 0, borderBottomWidth: 1 }]} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysScroll}>
                    {DAYS.map(day => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.dayTab,
                                activeDay === day ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface }
                            ]}
                            onPress={() => setActiveDay(day)}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.dayTabText,
                                { color: activeDay === day ? '#FFFFFF' : colors.subtitle },
                                activeDay === day && { fontWeight: '900', letterSpacing: 0.5 }
                            ]}>
                                {day.substring(0, 3).toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>

            {/* Timetable List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.routineContent} showsVerticalScrollIndicator={false}>
                    {activeClasses.length > 0 ? (
                        <View style={styles.timelineContainer}>
                            {activeClasses.map((item: any, index: number) => (
                                <RoutineCard key={item.id} item={item} index={index} colors={colors} isDark={isDark} isLast={index === activeClasses.length - 1} />
                            ))}
                        </View>
                    ) : (
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                             <Text style={[styles.emptyTitle, { color: colors.text }]}>SYSTEM IDLE</Text>
                             <Text style={[styles.emptyText, { color: colors.subtitle }]}>No routines logged for {activeDay} in the quantum matrix.</Text>
                        </Animated.View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const RoutineCard = ({ item, index, colors, isDark, isLast }: any) => {
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(800)} style={styles.timelineItem}>
            {/* Timeline Line & Dot */}
            <View style={styles.timelineLeft}>
                <Text style={[styles.timeLabel, { color: colors.primary }]}>{item.startTime}</Text>
                <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
                {!isLast && (
                    <View style={[styles.timelineLine, { backgroundColor: colors.primaryGlow }]} />
                )}
            </View>

            {/* Class Card */}
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
                style={[styles.classCard, cardStyle]}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={styles.classCardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={[styles.subjectName, { color: colors.text }]} numberOfLines={1}>{item.subjectName}</Text>
                        <View style={[styles.durationBadge, { backgroundColor: colors.primary + '15' }]}>
                            <Text style={[styles.durationText, { color: colors.primary }]}>{item.endTime}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsRow}>
                        <View style={styles.detailItem}>
                            <User color={colors.subtitle} size={14} />
                            <Text style={[styles.detailText, { color: colors.subtitle }]} numberOfLines={1}>{item.teacherName}</Text>
                        </View>
                        <View style={[styles.metaSeparator, { backgroundColor: colors.surfaceBorder }]} />
                        <View style={styles.detailItem}>
                            <MapPin color={colors.subtitle} size={14} />
                            <Text style={[styles.detailText, { color: colors.subtitle }]} numberOfLines={1}>{item.roomName}</Text>
                        </View>
                    </View>
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
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    daysWrapper: {
        position: 'relative',
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 1,
    },
    daysScroll: {
        padding: 20,
        paddingHorizontal: 24,
        gap: 12,
    },
    dayTab: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
    },
    dayTabText: {
        fontWeight: '700',
        fontSize: 13,
        letterSpacing: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    routineContent: {
        padding: 24,
        paddingTop: 32,
        paddingBottom: 60,
    },
    timelineContainer: {
        flex: 1,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timelineLeft: {
        width: 70,
        alignItems: 'center',
        marginRight: 16,
    },
    timeLabel: {
        fontSize: 12,
        fontWeight: '900',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        zIndex: 2,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        marginTop: -6,
        marginBottom: -30,
        zIndex: 1,
    },
    classCard: {
        flex: 1,
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    cardInlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
    },
    classCardContent: {
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        flex: 1,
        marginRight: 10,
        letterSpacing: -0.3,
    },
    durationBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    durationText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
    },
    metaSeparator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3F3F46',
        marginHorizontal: 12,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
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
