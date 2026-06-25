import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, Fingerprint, ChevronRight, Target } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function ExamsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [exams, setExams] = useState<any[]>([]);

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
        fetchExams();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const ExamCard = ({ item, index, colors, isDark }: any) => {
        const scale = useSharedValue(1);
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }]
        }));

        const handlePressIn = () => {
            scale.value = withSpring(0.97);
        };

        const handlePressOut = () => {
            scale.value = withSpring(1);
        };

        let statusColor = colors.primary;
        let StatusIcon = CheckCircle;
        let statusBg = colors.primary + '15';

        if (item.status === 'Upcoming') {
            statusColor = colors.accent;
            statusBg = colors.accent + '15';
            StatusIcon = Calendar;
        } else if (item.status === 'Ongoing') {
            statusColor = colors.secondary;
            statusBg = colors.secondary + '15';
            StatusIcon = Clock;
        }

        return (
            <Animated.View 
                entering={FadeInUp.delay(200 + Math.min(index, 10) * 100).duration(800)}
                style={animatedStyle}
            >
                <TouchableOpacity 
                    style={styles.examCard} 
                    activeOpacity={0.9}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => router.push({ 
                        pathname: '/exam-results', 
                        params: { id: item.id, name: item.name } 
                    })}
                >
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={styles.cardHeader}>
                        <View style={[styles.iconBox, { backgroundColor: statusBg }]}>
                            <FileText color={statusColor} size={20} />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={[styles.examName, { color: colors.text }]}>{item.name}</Text>
                            <Text style={[styles.academicYear, { color: colors.subtitle }]}>{item.academicYear}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                            <StatusIcon color={statusColor} size={14} />
                            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
                        </View>
                    </View>

                    {item.description && (
                        <View style={styles.cardBody}>
                            <Text style={[styles.description, { color: colors.subtitle }]} numberOfLines={2}>
                                {item.description}
                            </Text>
                        </View>
                    )}

                    <View style={[styles.cardFooter, { borderTopColor: colors.surfaceBorder, backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.03)' }]}>
                        <View>
                            <Text style={[styles.dateLabel, { color: colors.subtitle }]}>Commences</Text>
                            <Text style={[styles.dateValue, { color: colors.text }]}>{item.startDate}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={[styles.dateLabel, { color: colors.subtitle }]}>Concludes</Text>
                            <Text style={[styles.dateValue, { color: colors.text }]}>{item.endDate}</Text>
                        </View>
                    </View>

                    <View style={[styles.marksBanner, { backgroundColor: statusBg }]}>
                        <Text style={[styles.marksText, { color: statusColor }]}>
                            COMPILATION INDEX: {item.marksCount} METRICS
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const fetchExams = async () => {
        try {
            const data = await apiService.getExams();
            setExams(data || []);
        } catch (error) {
            console.error('Failed to load exams', error);
        } finally {
            setLoading(false);
        }
    };

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Assessment Feed</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Academic Milestones</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Target color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {/* Exams List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={exams}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <ExamCard item={item} index={index} colors={colors} isDark={isDark} />}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ASSETS</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>No examination records found for the current term.</Text>
                        </Animated.View>
                    }
                />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'transparent',
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 24,
        gap: 16,
        paddingBottom: 40,
    },
    examCard: {
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 16,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerText: {
        flex: 1,
    },
    examName: {
        fontSize: 16,
        fontWeight: '800',
    },
    academicYear: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    description: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '500',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderTopWidth: 1,
    },
    dateLabel: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    marksBanner: {
        padding: 12,
        alignItems: 'center',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    marksText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
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
