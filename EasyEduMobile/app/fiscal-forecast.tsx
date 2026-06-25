import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, withSpring } from 'react-native-reanimated';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Activity, Zap, PieChart, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function FiscalForecastScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
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

        setTimeout(() => setLoading(false), 1500);
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

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
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Fiscal Telemetry</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Predictive Intelligence</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <LinearGradient
                            colors={[colors.primary + '20', colors.primary + '05']}
                            style={styles.backBtnBg}
                        />
                        <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <Zap color={colors.primary} size={22} />
                    </View>
                </Animated.View>

                {loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={[styles.loaderText, { color: colors.subtitle }]}>Running Predictive Algorithms...</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {/* Forecast Hero */}
                        <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.heroCard}>
                            <LinearGradient
                                colors={['#6366f1', '#a855f7']}
                                style={styles.heroGradient}
                            />
                            <Text style={styles.heroLabel}>PROJECTED CAPITAL (Q3)</Text>
                            <Text style={styles.heroValue}>$1,248,000.00</Text>
                            <View style={styles.growthBadge}>
                                <TrendingUp color="#10b981" size={14} />
                                <Text style={styles.growthText}>+12.4% GROWTH INDEX</Text>
                            </View>
                        </Animated.View>

                        {/* Analysis Grid */}
                        <View style={styles.grid}>
                             <Animated.View entering={FadeInLeft.delay(400).duration(800)} style={styles.gridItem}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                <TrendingUp color="#10b981" size={24} />
                                <Text style={[styles.gridValue, { color: colors.text }]}>$450K</Text>
                                <Text style={[styles.gridLabel, { color: colors.subtitle }]}>INFLOW SIGNAL</Text>
                             </Animated.View>
                             
                             <Animated.View entering={FadeInRight.delay(500).duration(800)} style={styles.gridItem}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                <TrendingDown color={colors.error} size={24} />
                                <Text style={[styles.gridValue, { color: colors.text }]}>$120K</Text>
                                <Text style={[styles.gridLabel, { color: colors.subtitle }]}>DRAIN VECTOR</Text>
                             </Animated.View>
                        </View>

                        {/* Timeline Projection */}
                        <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.chartCard}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            
                            <View style={styles.chartHeader}>
                                <Activity color={colors.primary} size={20} />
                                <Text style={[styles.chartTitle, { color: colors.text }]}>QUARTERLY TRAJECTORY</Text>
                            </View>

                            <View style={styles.barChart}>
                                {[60, 85, 45, 95, 70, 80].map((h, i) => (
                                    <View key={i} style={styles.barContainer}>
                                        <View style={[styles.barBase, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} />
                                        <LinearGradient
                                            colors={[colors.primary, colors.secondary]}
                                            style={[styles.barFill, { height: `${h}%` }]}
                                        />
                                        <Text style={[styles.barLabel, { color: colors.subtitle }]}>M{i+1}</Text>
                                    </View>
                                ))}
                            </View>
                        </Animated.View>

                        {/* Security Ledger */}
                        <Animated.View entering={FadeInUp.delay(800).duration(800)} style={[styles.ledgerCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '20' }]}>
                            <ShieldCheck color={colors.primary} size={24} />
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.ledgerTitle, { color: colors.text }]}>Protocol Integrity: SECURED</Text>
                                <Text style={[styles.ledgerText, { color: colors.subtitle }]}>All fiscal forecasts are computed via the Emerald Neural Lattice with 99.9% precision.</Text>
                            </View>
                        </Animated.View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
}

const FadeInLeft = FadeIn.duration(800).withCallback((finished) => {});
const FadeInRight = FadeIn.duration(800).withCallback((finished) => {});

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
    heroCard: { borderRadius: 32, padding: 32, overflow: 'hidden', marginBottom: 24, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15 },
    heroGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    heroLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 8 },
    heroValue: { color: '#fff', fontSize: 36, fontWeight: '900', letterSpacing: -1 },
    growthBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 16, alignSelf: 'flex-start' },
    growthText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
    grid: { flexDirection: 'row', gap: 16, marginBottom: 24 },
    gridItem: { flex: 1, borderRadius: 24, padding: 20, gap: 12, overflow: 'hidden', position: 'relative' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: 24 },
    gridValue: { fontSize: 24, fontWeight: '900' },
    gridLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
    chartCard: { borderRadius: 24, padding: 24, overflow: 'hidden', position: 'relative', marginBottom: 24 },
    chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 30 },
    chartTitle: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
    barChart: { height: 180, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20 },
    barContainer: { alignItems: 'center', width: 28, height: '100%', justifyContent: 'flex-end' },
    barBase: { position: 'absolute', width: 8, height: '100%', borderRadius: 4, bottom: 0 },
    barFill: { width: 8, borderRadius: 4, bottom: 0 },
    barLabel: { fontSize: 8, fontWeight: '700', marginTop: 12 },
    ledgerCard: { borderRadius: 24, padding: 24, flexDirection: 'row', gap: 20, alignItems: 'center', borderWidth: 1 },
    ledgerTitle: { fontSize: 15, fontWeight: '900' },
    ledgerText: { fontSize: 12, lineHeight: 18, fontWeight: '500', marginTop: 4 }
});
