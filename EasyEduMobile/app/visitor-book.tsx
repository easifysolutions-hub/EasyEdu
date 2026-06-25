import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Users, Clock, Calendar, FileText, ChevronLeft, Plus, Trash2, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function VisitorBookScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [visitors, setVisitors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadVisitors();
    }, []);

    const loadVisitors = async () => {
        try {
            const data = await apiService.getVisitors();
            setVisitors(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadVisitors();
    };

    const StatusBadge = ({ inTime, outTime }: { inTime: string, outTime: string }) => {
        const isActive = inTime && !outTime;
        return (
            <View style={[styles.badge, { backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)' }]}>
                <View style={[styles.badgeDot, { backgroundColor: isActive ? '#10B981' : '#6B7280' }]} />
                <Text style={[styles.badgeText, { color: isActive ? '#10B981' : '#6B7280' }]}>
                    {isActive ? 'CURRENTLY IN' : 'DEPARTED'}
                </Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[colors.primary + '20', 'transparent']}
                style={styles.headerGlow}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                    <ChevronLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Visitor Book</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Institutional Access Registry</Text>
                </View>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
                    <Plus color="#fff" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
            >
                {loading ? (
                    <ActivityIndicator color={colors.primary} size="large" style={styles.loader} />
                ) : visitors.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Users size={64} color={colors.surfaceBorder} />
                        <Text style={[styles.emptyText, { color: colors.subtitle }]}>No active visit protocols found.</Text>
                    </View>
                ) : (
                    visitors.map((visitor, index) => (
                        <Animated.View
                            key={visitor.id}
                            entering={FadeInUp.delay(index * 100).duration(600)}
                            style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.visitorInfo}>
                                    <Text style={[styles.visitorName, { color: colors.text }]}>{visitor.name}</Text>
                                    <Text style={[styles.visitorPhone, { color: colors.subtitle }]}>{visitor.phone}</Text>
                                </View>
                                <StatusBadge inTime={visitor.inTime} outTime={visitor.outTime} />
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.surfaceBorder }]} />

                            <View style={styles.cardBody}>
                                <View style={styles.detailRow}>
                                    <Clock size={16} color={colors.primary} />
                                    <Text style={[styles.detailText, { color: colors.text }]}>
                                        {visitor.inTime} {visitor.outTime ? ` - ${visitor.outTime}` : ''}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <FileText size={16} color={colors.primary} />
                                    <Text style={[styles.detailText, { color: colors.text }]}>Purpose: {visitor.purpose}</Text>
                                </View>
                                {visitor.whomToMeet && (
                                    <View style={styles.detailRow}>
                                        <Users size={16} color={colors.primary} />
                                        <Text style={[styles.detailText, { color: colors.text }]}>Meeting: {visitor.whomToMeet}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.cardFooter}>
                                <View style={styles.dateInfo}>
                                    <Calendar size={14} color={colors.subtitle} />
                                    <Text style={[styles.dateText, { color: colors.subtitle }]}>
                                        {new Date(visitor.date).toLocaleDateString()}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.deleteBtn}>
                                    <Trash2 size={18} color={colors.error} />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '900',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        opacity: 0.7,
    },
    addButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    loader: {
        marginTop: 100,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 100,
        gap: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
    },
    card: {
        borderRadius: 24,
        borderWidth: 1,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    visitorInfo: {
        flex: 1,
    },
    visitorName: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    visitorPhone: {
        fontSize: 14,
        fontWeight: '500',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6,
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 15,
    },
    cardBody: {
        gap: 12,
        marginBottom: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailText: {
        fontSize: 14,
        fontWeight: '600',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '700',
    },
    deleteBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
