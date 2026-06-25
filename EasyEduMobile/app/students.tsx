import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Search, ChevronLeft, GraduationCap, ArrowRight, User, Fingerprint, BookOpen, UserCheck } from 'lucide-react-native';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

export default function StudentsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        fetchStudents();
    }, []);

    const fetchStudents = async (query?: string) => {
        setLoading(true);
        try {
            const data = await apiService.getStudents(query);
            setStudents(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        // Debounce or search on every keystroke
        fetchStudents(text);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchStudents(searchQuery);
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Ambient Background Glow */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                        <LinearGradient
                            colors={[colors.primary + '20', colors.primary + '05']}
                            style={styles.backBtnBg}
                        />
                        <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <ChevronLeft color={colors.primary} size={28} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Student Matrix</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Institutional Directory</Text>
                    </View>
                    <TouchableOpacity style={styles.headerRight} activeOpacity={0.7} onPress={() => router.push('/student-admission')}>
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            style={styles.backBtnBg}
                        />
                        <UserCheck color="#fff" size={24} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={[styles.searchContainer, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
                    <Search color={colors.primary} size={20} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder="Search by name or admission ID..."
                        placeholderTextColor={colors.subtitle}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>

                {/* Content */}
                {loading && !refreshing ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={students}
                        keyExtractor={(item, index) => (item.id || index).toString()}
                        renderItem={({ item, index }) => <StudentCard item={item} index={index} colors={colors} isDark={isDark} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Fingerprint color={colors.subtitle} size={64} opacity={0.3} />
                                <Text style={[styles.emptyText, { color: colors.subtitle }]}>No identities found in the current sector.</Text>
                            </View>
                        }
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

const StudentCard = ({ item, index, colors, isDark }: any) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View 
            entering={FadeInDown.delay(100 + Math.min(index, 10) * 80).duration(600)} 
            style={animatedStyle}
        >
            <TouchableOpacity 
                style={styles.card}
                activeOpacity={0.9}
                onPressIn={() => scale.value = withSpring(0.97)}
                onPressOut={() => scale.value = withSpring(1)}
                onPress={() => {}} // Could link to student profile
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={styles.cardMain}>
                    <View style={[styles.avatarBox, { backgroundColor: colors.primary + '10' }]}>
                        <GraduationCap color={colors.primary} size={24} />
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <View style={styles.nameRow}>
                            <Text style={[styles.studentName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                            <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
                                <Text style={[styles.badgeText, { color: colors.primary }]}>{item.admissionNumber}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <BookOpen color={colors.subtitle} size={12} />
                                <Text style={[styles.metaText, { color: colors.subtitle }]}>{item.className}</Text>
                            </View>
                            <View style={styles.dot} />
                            <View style={styles.metaItem}>
                                <User color={colors.subtitle} size={12} />
                                <Text style={[styles.metaText, { color: colors.subtitle }]}>Roll: {item.roll}</Text>
                            </View>
                        </View>
                    </View>

                    <ArrowRight color={colors.primary} size={16} opacity={0.5} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgGlow: { position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: 200 },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 20, gap: 16 },
    backBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 },
    headerTitleContainer: { flex: 1 },
    headerTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.6 },
    headerRight: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, paddingHorizontal: 16, height: 56, borderRadius: 20, borderWidth: 1, marginBottom: 20 },
    searchInput: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '600' },
    listContent: { paddingHorizontal: 24, paddingBottom: 40 },
    card: { marginBottom: 16, borderRadius: 24, padding: 16, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, opacity: 0.5 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1 },
    cardMain: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    avatarBox: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    infoContainer: { flex: 1, gap: 4 },
    nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    studentName: { fontSize: 16, fontWeight: '800', letterSpacing: -0.3, flex: 1 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    badgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { fontSize: 12, fontWeight: '600' },
    dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.1)' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyContainer: { alignItems: 'center', marginTop: 100, gap: 16 },
    emptyText: { fontSize: 15, fontWeight: '600', textAlign: 'center' }
});
