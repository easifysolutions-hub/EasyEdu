import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ScrollText, ArrowLeft, BookOpen, Clock, Download, ChevronRight, Sparkles, LayoutGrid } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

export default function SyllabusScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [syllabusList, setSyllabusList] = useState<any[]>([
        { id: 1, subject: 'Advanced Mathematics', class: 'Grade 12-A', topic: 'Quantum Calculus', progress: 85, date: '2026-03-20' },
        { id: 2, subject: 'Quantum Physics', class: 'Grade 12-A', topic: 'Wave-Particle Duality', progress: 70, date: '2026-03-22' },
        { id: 3, subject: 'Neural Biology', class: 'Grade 11-B', topic: 'Synaptic Mapping', progress: 45, date: '2026-03-25' },
    ]);

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
        // Simulate API fetch
        setTimeout(() => setLoading(false), 800);
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <LinearGradient colors={[colors.primary + '20', colors.primary + '05']} style={styles.backBtnBg} />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <ArrowLeft color={colors.primary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Academic Syllabus</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>CURRICULUM MATRIX</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient colors={[colors.primary + '20', colors.primary + '05']} style={styles.backBtnBg} />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <LayoutGrid color={colors.primary} size={20} />
                </View>
            </Animated.View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={syllabusList}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => (
                        <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(800)} style={styles.card}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            
                            <View style={styles.cardHeader}>
                                <View style={[styles.subjectIcon, { backgroundColor: colors.primary + '15' }]}>
                                    <BookOpen color={colors.primary} size={18} />
                                </View>
                                <View style={styles.subjectInfo}>
                                    <Text style={[styles.subjectName, { color: colors.text }]}>{item.subject}</Text>
                                    <Text style={[styles.className, { color: colors.subtitle }]}>{item.class}</Text>
                                </View>
                                <TouchableOpacity style={styles.downloadBtn}>
                                    <Download color={colors.primary} size={18} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.topicRow}>
                                <ScrollText color={colors.subtitle} size={14} />
                                <Text style={[styles.topicText, { color: colors.text }]}>{item.topic}</Text>
                            </View>

                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: `${item.progress}%`, backgroundColor: colors.primary }]} />
                                </View>
                                <Text style={[styles.progressText, { color: colors.subtitle }]}>{item.progress}% Protocol Complete</Text>
                            </View>
                        </Animated.View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Sparkles color={colors.subtitle} size={40} style={{ opacity: 0.3 }} />
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>Curriculum data synchronized. No pending assignments.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgGlow: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, opacity: 0.1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 20, borderBottomWidth: 1 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12 },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1, marginTop: 2 },
    headerRight: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { padding: 24, paddingBottom: 40 },
    card: { borderRadius: 24, marginBottom: 16, padding: 20, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    subjectIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    subjectInfo: { flex: 1 },
    subjectName: { fontSize: 16, fontWeight: '800' },
    className: { fontSize: 12, fontWeight: '600' },
    downloadBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    topicRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
    topicText: { fontSize: 13, fontWeight: '600' },
    progressContainer: { gap: 8 },
    progressBarBg: { height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.05)', overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 3 },
    progressText: { fontSize: 11, fontWeight: '700' },
    emptyContainer: { alignItems: 'center', paddingTop: 60, gap: 16 },
    emptyText: { fontSize: 13, fontWeight: '600', textAlign: 'center', opacity: 0.6, width: '80%' }
});
