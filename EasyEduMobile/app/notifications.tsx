import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Bell, Settings, AlertTriangle, Info, CheckCircle, HandCoins, Radar, MessageSquare } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function NotificationsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);

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
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await apiService.getNotifications();
            setNotifications(data || []);
        } catch (error) {
            console.error('Failed to intercept transmissions', error);
        } finally {
            setLoading(false);
        }
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    }, []);

    const getIconInfo = (type: string, priority: string) => {
        if (priority === 'High') {
            return { color: colors.error, icon: AlertTriangle, bg: colors.error + '15' }; // Red
        }

        switch (type.toLowerCase()) {
            case 'finance':
            case 'fee':
                return { color: colors.accent, icon: HandCoins, bg: colors.accent + '15' }; // Amber
            case 'welcome':
            case 'success':
                return { color: colors.primary, icon: CheckCircle, bg: colors.primary + '15' }; // Green
            case 'system':
                return { color: colors.secondary, icon: Settings, bg: colors.secondary + '15' }; // Indigo
            default:
                return { color: colors.primary, icon: Info, bg: colors.primary + '15' }; // Default
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Comms Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Intercepted Signals</Text>
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

            {/* Notifications List */}
            {loading && !refreshing ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                    }
                    renderItem={({ item, index }) => (
                        <NotificationCard item={item} index={index} colors={colors} isDark={isDark} getIconInfo={getIconInfo} />
                    )}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Radar color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>SILENT CHANNELS</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>No inbound transmissions detected in the quantum matrix.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const NotificationCard = ({ item, index, colors, isDark, getIconInfo }: any) => {
    const scale = useSharedValue(1);
    const { color, icon: Icon, bg } = getIconInfo(item.type, item.priority);

    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View 
            entering={FadeInUp.delay(100 + Math.min(index, 10) * 100).duration(800)} 
            layout={Layout.springify()}
            style={cardStyle}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
            >
                <View style={styles.notificationCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                    <View style={[
                        styles.cardBorder,
                        { borderColor: !item.isRead ? color : colors.surfaceBorder },
                        !item.isRead && { borderWidth: 1 }
                    ]} />

                    {!item.isRead && (
                        <View style={[styles.unreadDot, { backgroundColor: color }]} />
                    )}

                    <View style={styles.cardContent}>
                        <View style={[styles.iconBox, { backgroundColor: bg }]}>
                            <Icon color={color} size={20} />
                        </View>

                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={[styles.title, { color: colors.text, opacity: !item.isRead ? 1 : 0.7 }]} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.time, { color: colors.subtitle }]}>{item.time}</Text>
                            </View>
                            <Text style={[styles.message, { color: colors.subtitle }]} numberOfLines={2}>
                                {item.message}
                            </Text>
                            <Text style={[styles.date, { color: colors.subtitle }]}>{item.date}</Text>
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
        paddingBottom: 40,
    },
    notificationCard: {
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    cardInlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
        borderWidth: 1,
    },
    unreadDot: {
        position: 'absolute',
        top: 16,
        left: 12,
        width: 6,
        height: 6,
        borderRadius: 3,
        zIndex: 10,
    },
    cardContent: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
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
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        flex: 1,
        marginRight: 12,
        letterSpacing: -0.2,
    },
    time: {
        fontSize: 10,
        fontWeight: '700',
    },
    message: {
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 10,
    },
    date: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
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
