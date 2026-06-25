import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Platform, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { HelpCircle, ArrowLeft, Search, Filter, MessageSquare, Phone, User, Calendar, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { apiService } from '@/services/apiService';

export default function AdmissionQueryScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [queries, setQueries] = useState<any[]>([]);

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
        loadQueries();
    }, []);

    const loadQueries = async () => {
        try {
            const data = await apiService.getAdmissionQueries();
            setQueries(data);
        } catch (error) {
            console.error('Telepathy failure:', error);
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Front Office</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>ADMISSION QUERIES</Text>
                </View>
                <View style={[styles.headerRight, { opacity: 0 }]} />
            </Animated.View>

            {/* Search Matrix */}
            <View style={styles.searchContainer}>
                <View style={[styles.searchBox, { borderColor: colors.surfaceBorder, backgroundColor: colors.surface }]}>
                    <Search color={colors.subtitle} size={18} />
                    <TextInput 
                        placeholder="Search Inquiries..." 
                        placeholderTextColor={colors.subtitle}
                        style={[styles.searchInput, { color: colors.text }]}
                    />
                </View>
                <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.primary + '15' }]}>
                    <Filter color={colors.primary} size={18} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={queries}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => (
                        <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(800)} style={styles.card}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                            
                            <View style={styles.cardHeader}>
                                <View style={[styles.avatar, { backgroundColor: colors.primary + '15' }]}>
                                    <User color={colors.primary} size={20} />
                                </View>
                                <View style={styles.mainInfo}>
                                    <Text style={[styles.nameText, { color: colors.text }]}>{item.name}</Text>
                                    <Text style={[styles.programText, { color: colors.primary }]}>{item.program}</Text>
                                </View>
                                <View style={[styles.statusTag, { backgroundColor: item.status === 'ACTIVE' ? colors.primary + '15' : colors.secondary + '15' }]}>
                                    <Text style={[styles.statusText, { color: item.status === 'ACTIVE' ? colors.primary : colors.secondary }]}>{item.status}</Text>
                                </View>
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.surfaceBorder }]} />

                            <View style={styles.metaGrid}>
                                <View style={styles.metaItem}>
                                    <Calendar color={colors.subtitle} size={14} />
                                    <Text style={[styles.metaText, { color: colors.subtitle }]}>{item.date}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <HelpCircle color={colors.subtitle} size={14} />
                                    <Text style={[styles.metaText, { color: colors.subtitle }]}>{item.source}</Text>
                                </View>
                            </View>

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={[styles.commBtn, { backgroundColor: colors.surfaceBorder }]}>
                                    <Phone color={colors.text} size={16} />
                                    <Text style={[styles.commText, { color: colors.text }]}>CALLBACK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.commBtn, { backgroundColor: colors.primary }]}>
                                    <MessageSquare color="#fff" size={16} />
                                    <Text style={[styles.commText, { color: '#fff' }]}>SECURE MSG</Text>
                                </TouchableOpacity>
                            </View>
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
    headerRight: { width: 44, height: 44 },
    searchContainer: { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 16, gap: 12 },
    searchBox: { flex: 1, height: 48, borderRadius: 16, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 10 },
    searchInput: { flex: 1, fontSize: 14, fontWeight: '600' },
    filterBtn: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { padding: 24, paddingTop: 8, paddingBottom: 40 },
    card: { borderRadius: 28, marginBottom: 20, padding: 20, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 28, borderWidth: 1.5 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    avatar: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    mainInfo: { flex: 1 },
    nameText: { fontSize: 18, fontWeight: '900', letterSpacing: -0.4 },
    programText: { fontSize: 12, fontWeight: '800', marginTop: 2 },
    statusTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
    divider: { height: 1.5, marginVertical: 4, width: '100%', opacity: 0.5 },
    metaGrid: { flexDirection: 'row', paddingVertical: 12, gap: 20 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { fontSize: 11, fontWeight: '700' },
    actionRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
    commBtn: { flex: 1, height: 44, borderRadius: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
    commText: { fontSize: 11, fontWeight: '900', letterSpacing: 0.5 }
});
