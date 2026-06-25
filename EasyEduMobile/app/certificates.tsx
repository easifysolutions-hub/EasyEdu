import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { FileCheck, ArrowLeft, Search, Filter, ShieldCheck, Download, Award, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { apiService } from '@/services/apiService';

export default function CertificatesScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [certificates, setCertificates] = useState<any[]>([]);

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
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const data = await apiService.getCertificates();
            setCertificates(data);
        } catch (error) {
            console.error('Liaison failure:', error);
        } finally {
            setLoading(false);
        }
    };

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Diplomas & Records</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>CERTIFICATE REGISTRY</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient colors={[colors.primary + '20', colors.primary + '05']} style={styles.backBtnBg} />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Award color={colors.primary} size={20} />
                </View>
            </Animated.View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={certificates}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => (
                        <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(800)} style={styles.card}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            
                            <View style={styles.cardInfo}>
                                <View style={[styles.typeBadge, { backgroundColor: colors.primary + '10' }]}>
                                    <Text style={[styles.typeText, { color: colors.primary }]}>{item.type}</Text>
                                </View>
                                <Text style={[styles.studentName, { color: colors.text }]}>{item.student}</Text>
                                <Text style={[styles.studentId, { color: colors.subtitle }]}>SID: {item.id_no}</Text>
                                
                                <View style={styles.footerRow}>
                                    <Text style={[styles.dateText, { color: colors.subtitle }]}>{item.date}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: item.status === 'ISSUED' ? colors.primary + '15' : colors.secondary + '15' }]}>
                                        <Text style={[styles.statusText, { color: item.status === 'ISSUED' ? colors.primary : colors.secondary }]}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.primary + '30' }]}>
                                <Download color={colors.primary} size={20} />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
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
    card: { flexDirection: 'row', alignItems: 'center', borderRadius: 24, marginBottom: 16, padding: 20, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1 },
    cardInfo: { flex: 1 },
    typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
    typeText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    studentName: { fontSize: 17, fontWeight: '900', letterSpacing: -0.3, marginBottom: 2 },
    studentId: { fontSize: 12, fontWeight: '600' },
    footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
    dateText: { fontSize: 11, fontWeight: '700' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    statusText: { fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
    actionBtn: { width: 48, height: 48, borderRadius: 16, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }
});
