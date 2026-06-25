import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming, Layout } from 'react-native-reanimated';
import { ArrowLeft, Award, CheckCircle, BarChart3, Binary, Activity, Sparkles, BrainCircuit } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ExamResultsScreen() {
    const router = useRouter();
    const { id, name } = useLocalSearchParams();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<any[]>([]);

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

        // Simulated high-fidelity data fetch
        setTimeout(() => {
            setResults([
                { subject: 'Advanced Accounting', marks: 88, max: 100, grade: 'A', status: 'Passed', color: '#10b981' },
                { subject: 'Financial Management', marks: 92, max: 100, grade: 'A+', status: 'Passed', color: '#6366f1' },
                { subject: 'Taxation Protocol', marks: 75, max: 100, grade: 'B+', status: 'Passed', color: '#f59e0b' },
                { subject: 'Quantitative Intelligence', marks: 95, max: 100, grade: 'A+', status: 'Passed', color: '#a855f7' },
                { subject: 'Business Ethics Node', marks: 82, max: 100, grade: 'A', status: 'Passed', color: '#06b6d4' },
            ]);
            setLoading(false);
        }, 1200);
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const calculateGPA = () => {
        if (results.length === 0) return '0.0';
        const total = results.reduce((acc, curr) => acc + curr.marks, 0);
        return ((total / (results.length * 100)) * 10).toFixed(1);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <SafeAreaView style={{ flex: 1 }}>
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
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Result Matrix</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Quantum Synthesis</Text>
                    </View>
                    <View style={styles.headerRight}>
                         <LinearGradient
                            colors={[colors.primary + '20', colors.primary + '05']}
                            style={styles.backBtnBg}
                        />
                        <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <Binary color={colors.primary} size={22} />
                    </View>
                </Animated.View>

                {loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={[styles.loaderText, { color: colors.subtitle }]}>Synthesizing Performance Data...</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {/* Global Intelligence Card */}
                        <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.summaryCard}>
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.summaryGradient}
                            />
                            <View style={styles.summaryHeader}>
                                <View>
                                    <Text style={styles.summaryTitle}>{name || 'Performance Assessment'}</Text>
                                    <View style={styles.badge}>
                                        <Sparkles color="#fff" size={12} fill="#fff" />
                                        <Text style={styles.badgeText}>ELITE ACCREDITATION</Text>
                                    </View>
                                </View>
                                <View style={styles.gpaContainer}>
                                    <Text style={styles.gpaLabel}>INDEX</Text>
                                    <Text style={styles.gpaValue}>{calculateGPA()}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.summaryFooter}>
                                <View style={styles.statBox}>
                                    <Activity color="#fff" size={16} />
                                    <Text style={styles.statLabel}>Efficiency: 94%</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statBox}>
                                    <Award color="#fff" size={16} />
                                    <Text style={styles.statLabel}>Rank: #4 / 240</Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* Metrics Breakdown */}
                        <View style={styles.metricsContainer}>
                            <View style={styles.sectionHeader}>
                                <BarChart3 color={colors.primary} size={20} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Metric Breakdown</Text>
                            </View>

                            {results.map((item, index) => (
                                <Animated.View 
                                    key={index}
                                    entering={FadeInDown.delay(400 + index * 100).duration(800)}
                                    style={styles.resultItem}
                                >
                                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                    
                                    <View style={styles.resultHeader}>
                                        <View>
                                            <Text style={[styles.subjectName, { color: colors.text }]}>{item.subject}</Text>
                                            <Text style={[styles.gradeInfo, { color: item.color }]}>GRADE: {item.grade}</Text>
                                        </View>
                                        <View style={styles.marksCircle}>
                                            <Text style={[styles.marksValue, { color: colors.text }]}>{item.marks}</Text>
                                            <Text style={[styles.marksMax, { color: colors.subtitle }]}>/ {item.max}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.progressTrack}>
                                        <View style={[styles.progressBase, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} />
                                        <LinearGradient
                                            colors={[item.color, item.color + 'aa']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.progressBar, { width: `${(item.marks / item.max) * 100}%` }]}
                                        />
                                    </View>

                                    <View style={styles.resultFooter}>
                                        <View style={styles.statusChip}>
                                            <CheckCircle color={item.color} size={14} />
                                            <Text style={[styles.statusText, { color: item.color }]}>{item.status.toUpperCase()}</Text>
                                        </View>
                                        <Text style={[styles.percentLabel, { color: colors.subtitle }]}>{((item.marks / item.max) * 100).toFixed(0)}% SYNCHRONIZATION</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgGlow: { position: 'absolute', top: -150, right: -100, width: 350, height: 350, borderRadius: 175, opacity: 0.15 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 10 : 30, paddingBottom: 20, borderBottomWidth: 1 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12 },
    headerRight: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loaderText: { fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },
    scrollContent: { padding: 24, paddingBottom: 100 },
    summaryCard: { borderRadius: 32, padding: 24, overflow: 'hidden', marginBottom: 32, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
    summaryGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    summaryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
    summaryTitle: { color: '#fff', fontSize: 24, fontWeight: '900', maxWidth: '75%', lineHeight: 28 },
    badge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10, alignSelf: 'flex-start' },
    badgeText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    gpaContainer: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
    gpaLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    gpaValue: { color: '#fff', fontSize: 28, fontWeight: '900' },
    summaryFooter: { flexDirection: 'row', alignItems: 'center', gap: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 20 },
    statBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    statLabel: { color: '#fff', fontSize: 12, fontWeight: '700' },
    statDivider: { width: 1, height: 15, backgroundColor: 'rgba(255,255,255,0.2)' },
    metricsContainer: { gap: 16 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
    sectionTitle: { fontSize: 15, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
    resultItem: { borderRadius: 24, padding: 20, overflow: 'hidden', position: 'relative' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: 24 },
    resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    subjectName: { fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
    gradeInfo: { fontSize: 12, fontWeight: '900', marginTop: 4 },
    marksCircle: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
    marksValue: { fontSize: 22, fontWeight: '900' },
    marksMax: { fontSize: 12, fontWeight: '700' },
    progressTrack: { height: 8, width: '100%', marginBottom: 16, borderRadius: 4, overflow: 'hidden', position: 'relative' },
    progressBase: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    progressBar: { height: '100%', borderRadius: 4 },
    resultFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statusChip: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statusText: { fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
    percentLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }
});
