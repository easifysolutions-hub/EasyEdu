import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Clock, CheckCircle, XCircle, Plus, CalendarRange, Fingerprint } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function LeaveManagementScreen() {
    const router = useRouter();
    const { theme, isDark } = useTheme();
    const colors = Colors[theme];

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [leaves, setLeaves] = useState<any[]>([]);

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
        fetchLeaves();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchLeaves = async () => {
        try {
            const data = await apiService.getMyLeaves();
            setLeaves(data);
        } catch (error) {
            console.error('Failed to load leaves', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchLeaves();
        setRefreshing(false);
    }, []);

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'Approved': return { color: '#10B981', icon: CheckCircle, label: 'GRANTED' };
            case 'Rejected': return { color: '#EF4444', icon: XCircle, label: 'DENIED' };
            default: return { color: '#6366F1', icon: Clock, label: 'PENDING' };
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Absence Protocol</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Leave Directory</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/apply-leave')} style={styles.headerRight} activeOpacity={0.7}>
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        style={styles.backBtnBg}
                    />
                    <Plus color="#fff" size={24} />
                </TouchableOpacity>
            </Animated.View>

            {/* Leaves List */}
            {loading && !refreshing ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={leaves}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
                    renderItem={({ item, index }) => {
                        const { color, icon: StatusIcon, label } = getStatusInfo(item.status);

                        return (
                            <LeaveCardItem
                                item={item}
                                index={index}
                                colors={colors}
                                color={color}
                                StatusIcon={StatusIcon}
                                label={label}
                            />
                        );
                    }}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <CalendarRange color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ACTIVE PROTOCOLS</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>You remain at your designated station.</Text>
                        </Animated.View>
                    }
                />
            )}

            {/* floating action button */}
            <Animated.View entering={FadeInUp.delay(800).duration(800)} style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    activeOpacity={0.8}
                    onPress={() => router.push('/apply-leave')}
                >
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        style={styles.fabGradient}
                    >
                        <Plus color="#fff" size={24} />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const LeaveCardItem = ({ item, index, colors, color, StatusIcon, label }: any) => {
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View entering={FadeInUp.delay(200 + Math.min(index, 10) * 100).duration(800)} layout={Layout.springify()} style={cardStyle}>
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
                style={styles.leaveCard}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={styles.leaveHeader}>
                    <View>
                        <Text style={[styles.leaveType, { color: colors.text }]}>{item.type}</Text>
                        <Text style={[styles.leaveDate, { color: colors.subtitle }]}>Processed: {item.applyDate}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: color + '15' }]}>
                        <StatusIcon color={color} size={12} />
                        <Text style={[styles.statusText, { color }]}>{label}</Text>
                    </View>
                </View>

                <View style={styles.durationBox}>
                    <View style={[styles.durationBg, { backgroundColor: colors.surface }]} />
                    <CalendarRange color={colors.primary} size={20} />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={[styles.durationLabel, { color: colors.subtitle }]}>Requested Duration</Text>
                        <Text style={[styles.durationValue, { color: colors.text }]}>{item.fromDate} - {item.toDate}</Text>
                    </View>
                </View>

                <View style={styles.reasonBox}>
                    <Text style={[styles.reasonLabel, { color: colors.subtitle }]}>OBJECTIVE / REASON</Text>
                    <Text style={[styles.reasonText, { color: colors.text }]}>{item.reason || 'No description provided.'}</Text>
                </View>

                {item.approvedBy && (
                    <View style={[styles.approverBox, { borderTopColor: colors.surfaceBorder }]}>
                        <View style={[styles.approverDot, { backgroundColor: color }]} />
                        <Text style={[styles.approverText, { color: colors.subtitle }]}>Action by: <Text style={{ color: colors.text }}>{item.approvedBy}</Text></Text>
                    </View>
                )}
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
        paddingTop: 8,
        gap: 16,
        paddingBottom: 120, // Space for FAB
    },
    leaveCard: {
        padding: 20,
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
    leaveHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    leaveType: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: -0.3,
    },
    leaveDate: {
        fontSize: 12,
        color: '#71717A',
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        gap: 4,
    },
    statusText: {
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
    durationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        position: 'relative',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    durationBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
    },
    durationLabel: {
        fontSize: 10,
        color: '#71717A',
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    durationValue: {
        fontSize: 14,
        fontWeight: '800',
    },
    reasonBox: {
        marginBottom: 16,
    },
    reasonLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#A1A1AA',
        letterSpacing: 1,
        marginBottom: 8,
    },
    reasonText: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '500',
    },
    approverBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 16,
        borderTopWidth: 1,
    },
    approverDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
        marginRight: 8,
    },
    approverText: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
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
    },
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        right: 24,
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        elevation: 10,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        overflow: 'hidden',
    },
    fabGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
