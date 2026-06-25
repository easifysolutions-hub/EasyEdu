import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Award, ChevronDown, ChevronUp, Download, Fingerprint, TrendingUp } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function ReportCardsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [reportCards, setReportCards] = useState<any[]>([]);
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

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
        fetchReportCards();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchReportCards = async () => {
        try {
            const data = await apiService.getReportCards();
            setReportCards(data || []);
        } catch (error) {
            console.error('Failed to load report cards', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return colors.primary; // Green A
        if (percentage >= 75) return colors.secondary; // Blue B
        if (percentage >= 60) return colors.accent; // Yellow C
        return colors.error; // Red F
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Performance Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Report Cards</Text>
                </View>
                <TouchableOpacity style={styles.headerRight} activeOpacity={0.7}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <TrendingUp color={colors.primary} size={22} />
                </TouchableOpacity>
            </Animated.View>

            {/* Content List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={reportCards}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        const isExpanded = expandedCardId === item.id;
                        const gradeColor = getGradeColor(item.percentage);

                        return (
                            <ReportCardItem
                                item={item}
                                index={index}
                                colors={colors}
                                isDark={isDark}
                                isExpanded={isExpanded}
                                toggleExpand={toggleExpand}
                                gradeColor={gradeColor}
                            />
                        );
                    }}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ARCHIVES</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>Performance data is currently unavailable.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const ReportCardItem = ({ item, index, colors, isDark, isExpanded, toggleExpand, gradeColor }: any) => {
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View entering={FadeInUp.delay(200 + Math.min(index, 10) * 100).duration(800)} layout={Layout.springify()} style={cardStyle}>
            <View style={styles.cardContainer}>
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                {/* Card Header / Summary */}
                <TouchableOpacity
                    style={styles.cardHeader}
                    activeOpacity={1}
                    onPressIn={() => scale.value = withSpring(0.98)}
                    onPressOut={() => scale.value = withSpring(1)}
                    onPress={() => toggleExpand(item.id)}
                >
                    <View style={styles.cardHeaderTop}>
                        <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                            <Award color={colors.primary} size={24} />
                        </View>
                        <View style={styles.titleInfo}>
                            <Text style={[styles.examName, { color: colors.text }]}>{item.examName}</Text>
                            <Text style={[styles.studentName, { color: colors.subtitle }]}>
                                {item.studentName} <Text style={{ color: colors.surfaceBorder }}>|</Text> <Text style={{ color: colors.primary }}>ID: {item.admissionNumber}</Text>
                            </Text>
                        </View>
                        <View style={[styles.expandIcon, { backgroundColor: colors.surface }]}>
                            {isExpanded ? (
                                <ChevronUp color={colors.primary} size={18} />
                            ) : (
                                <ChevronDown color={colors.icon} size={18} />
                            )}
                        </View>
                    </View>

                    {/* Score Summary Banner */}
                    <View style={[styles.scoreBanner, { backgroundColor: gradeColor + '15' }]}>
                        <View style={styles.scoreItem}>
                            <Text style={[styles.scoreLabel, { color: colors.subtitle }]}>Accumulated</Text>
                            <Text style={[styles.scoreValue, { color: colors.text }]}>
                                {item.totalMarksObtained} <Text style={{ fontSize: 13, color: colors.subtitle }}>/ {item.totalMaxMarks}</Text>
                            </Text>
                        </View>
                        <View style={[styles.scoreDivider, { backgroundColor: gradeColor + '40' }]} />
                        <View style={styles.scoreItem}>
                            <Text style={[styles.scoreLabel, { color: colors.subtitle }]}>Success Rate</Text>
                            <Text style={[styles.scoreValue, { color: gradeColor }]}>
                                {item.percentage}%
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Expanded Subject Breakdown */}
                {isExpanded && (
                    <Animated.View entering={FadeIn.duration(400)} style={[styles.cardBody, { borderTopColor: colors.surfaceBorder, backgroundColor: isDark ? 'rgba(0,0,0,0.1)' : colors.background }]}>
                        <Text style={[styles.breakdownTitle, { color: colors.text }]}>Matrix Breakdown</Text>

                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableHeader, styles.flex2]}>Subject Node</Text>
                            <Text style={[styles.tableHeader, styles.flex1, { textAlign: 'center' }]}>Cap</Text>
                            <Text style={[styles.tableHeader, styles.flex1, { textAlign: 'center' }]}>Output</Text>
                            <Text style={[styles.tableHeader, styles.flex1, { textAlign: 'right' }]}>Rating</Text>
                        </View>

                        {/* Table Rows */}
                        {(item.subjects || []).map((sub: any, idx: number) => (
                            <View key={idx} style={[styles.tableRow, { borderTopColor: colors.surfaceBorder, borderTopWidth: 1, borderStyle: 'dashed' }]}>
                                <Text style={[styles.tableCell, styles.flex2, { color: colors.text, fontWeight: '700' }]} numberOfLines={1}>
                                    {sub.subjectName}
                                </Text>
                                <Text style={[styles.tableCell, styles.flex1, { color: colors.subtitle, textAlign: 'center', fontWeight: '600' }]}>
                                    {sub.maxMarks}
                                </Text>
                                <Text style={[styles.tableCell, styles.flex1, { color: colors.primary, textAlign: 'center', fontWeight: '800' }]}>
                                    {sub.marksObtained}
                                </Text>
                                <Text style={[styles.tableCell, styles.flex1, { color: colors.text, textAlign: 'right', fontWeight: '900' }]}>
                                    {sub.grade || '-'}
                                </Text>
                            </View>
                        ))}
                    </Animated.View>
                )}
            </View>
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
        left: -100,
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
    cardContainer: {
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
        padding: 20,
    },
    cardHeaderTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    titleInfo: {
        flex: 1,
    },
    examName: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    studentName: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    expandIcon: {
        padding: 8,
        borderRadius: 20,
    },
    scoreBanner: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    scoreItem: {
        flex: 1,
        alignItems: 'center',
    },
    scoreDivider: {
        width: 1,
        height: '80%',
    },
    scoreLabel: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 6,
    },
    scoreValue: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff',
    },
    cardBody: {
        padding: 24,
        borderTopWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    breakdownTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
    },
    tableHeader: {
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: '800',
        letterSpacing: 1,
        color: '#71717A',
    },
    tableCell: {
        fontSize: 13,
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
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
