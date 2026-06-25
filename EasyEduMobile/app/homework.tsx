import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, BookOpen, Clock, AlertCircle, Fingerprint, Sparkles } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function HomeworkScreen() {
    const router = useRouter();
    const { theme, isDark } = useTheme();
    const colors = Colors[theme];

    const [loading, setLoading] = useState(true);
    const [homeworks, setHomeworks] = useState<any[]>([]);

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
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    useEffect(() => {
        fetchHomeworks();
    }, []);

    const fetchHomeworks = async () => {
        try {
            const data = await apiService.getHomeworks();
            setHomeworks(data || []);
        } catch (error) {
            console.error('Failed to load homeworks', error);
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Assignment Feed</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Academic Protocols</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <BookOpen color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {/* Homework List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={homeworks}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HomeworkCard item={item} index={index} colors={colors} isDark={isDark} />
                    )}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO DIRECTIVES</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>You hold no active assignments at this time.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const HomeworkCard = ({ item, index, colors, isDark }: any) => {
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
                <View style={styles.homeworkCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={styles.cardHeader}>
                        <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                            <BookOpen color={colors.primary} size={20} />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={[styles.subjectName, { color: colors.primary }]}>{item.subjectName}</Text>
                            <Text style={[styles.className, { color: colors.subtitle }]}>{item.className}</Text>
                        </View>
                        {item.isOverdue ? (
                            <View style={[styles.statusBadge, { backgroundColor: colors.error + '15' }]}>
                                <AlertCircle color={colors.error} size={14} />
                                <Text style={[styles.statusText, { color: colors.error }]}>BREACHED</Text>
                            </View>
                        ) : (
                            <View style={[styles.statusBadge, { backgroundColor: colors.primary + '15' }]}>
                                <Clock color={colors.primary} size={14} />
                                <Text style={[styles.statusText, { color: colors.primary }]}>ACTIVE</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.description, { color: colors.subtitle }]} numberOfLines={2}>
                            {item.description || 'No supplementary data provided for this assignment.'}
                        </Text>
                    </View>

                    <View style={[styles.cardFooter, { borderTopColor: colors.surfaceBorder, backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : colors.surface }]}>
                        <View>
                            <Text style={[styles.dateLabel, { color: colors.subtitle }]}>Dispatched</Text>
                            <Text style={[styles.dateValue, { color: colors.text }]}>{item.assignDate}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={[styles.dateLabel, { color: colors.subtitle }]}>Deadline</Text>
                            <Text style={[styles.dateValue, { color: item.isOverdue ? colors.error : colors.text }]}>{item.submissionDate}</Text>
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
    homeworkCard: {
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
        paddingBottom: 8,
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
    subjectName: {
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    className: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
        marginTop: 2,
        letterSpacing: 0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '800',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    description: {
        fontSize: 13,
        lineHeight: 20,
        color: '#71717A',
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
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '700',
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
