import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Book, ChevronRight, GraduationCap, Layers, Fingerprint, BrainCircuit, MessageSquare } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function SubjectsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [subjects, setSubjects] = useState<any[]>([]);

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
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await apiService.getSubjects();
            setSubjects(data || []);
        } catch (error) {
            console.error('Failed to load subjects', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    }, []);

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Subject Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Institutional Roadmap</Text>
                </View>
                <TouchableOpacity style={styles.headerRight} activeOpacity={0.7} onPress={() => router.push('/settings')}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <MessageSquare color={colors.primary} size={22} />
                </TouchableOpacity>
            </Animated.View>

            {loading && !refreshing ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={subjects}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                    }
                    renderItem={({ item, index }) => (
                        <SubjectCard item={item} index={index} colors={colors} isDark={isDark} />
                    )}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO DATA FOUND</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>Subject matrix is empty for the requested node.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const SubjectCard = ({ item, index, colors, isDark }: any) => {
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View 
            entering={FadeInUp.delay(300 + Math.min(index, 10) * 100).duration(800)}
            style={cardStyle}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
            >
                <View style={styles.subjectCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={styles.cardMain}>
                        <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                            <Book color={colors.primary} size={24} />
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={[styles.subjectName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                                <View style={[styles.typeBadge, { backgroundColor: colors.primary + '15' }]}>
                                    <Text style={[styles.typeText, { color: colors.primary }]}>
                                        {item.type || 'Mandatory'}
                                    </Text>
                                </View>
                            </View>
                            <Text style={[styles.subjectCode, { color: colors.subtitle }]}>{item.code || 'SYS-X0' + (index + 1)}</Text>

                            <View style={styles.metaRow}>
                                <View style={styles.metaItem}>
                                    <GraduationCap color={colors.subtitle} size={14} />
                                    <Text style={[styles.metaText, { color: colors.subtitle }]}>{item.teacherName || 'DR. MATRIX'}</Text>
                                </View>
                                <View style={[styles.metaSeparator, { backgroundColor: colors.surfaceBorder }]} />
                                <View style={styles.metaItem}>
                                    <Layers color={colors.subtitle} size={14} />
                                    <Text style={[styles.metaText, { color: colors.subtitle }]}>{item.credits || '4'} Credits</Text>
                                </View>
                            </View>
                        </View>
                        <ChevronRight color={colors.subtitle} size={20} />
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
    subjectCard: {
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
    cardMain: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
        flex: 1,
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginLeft: 8,
    },
    typeText: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    subjectCode: {
        fontSize: 12,
        fontWeight: '700',
        color: '#71717A',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
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
