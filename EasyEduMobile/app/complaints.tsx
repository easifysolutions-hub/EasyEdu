import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInLeft } from 'react-native-reanimated';
import { MessageCircle, AlertCircle, Clock, CheckCircle2, ChevronLeft, Plus, User, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

export default function ComplaintsScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {
        try {
            const data = await apiService.getComplaints();
            setComplaints(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const GetStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending': return { color: colors.error, bg: 'rgba(244, 63, 94, 0.1)', icon: AlertCircle };
            case 'resolved': return { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 };
            default: return { color: colors.primary, bg: 'rgba(59, 130, 246, 0.1)', icon: Clock };
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[colors.error + '10', 'transparent']}
                style={styles.headerGlow}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                    <ChevronLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Reports Hub</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Institutional Feedback Matrix</Text>
                </View>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.error }]}>
                    <Plus color="#fff" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadComplaints} tintColor={colors.error} />}
            >
                {loading ? (
                    <ActivityIndicator color={colors.error} size="large" style={styles.loader} />
                ) : complaints.length === 0 ? (
                    <View style={styles.emptyState}>
                        <MessageCircle size={64} color={colors.surfaceBorder} />
                        <Text style={[styles.emptyText, { color: colors.subtitle }]}>No anomalies detected in the feedback feed.</Text>
                    </View>
                ) : (
                    complaints.map((item, index) => {
                        const status = GetStatusStyle(item.status || 'Pending');
                        const StatusIcon = status.icon;
                        
                        return (
                            <Animated.View
                                key={item.id}
                                entering={FadeInUp.delay(index * 100).duration(600)}
                                style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={[styles.typeBadge, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder, borderWidth: 1 }]}>
                                        <Text style={[styles.typeText, { color: colors.text }]}>{item.complaintType || 'General'}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                                        <StatusIcon size={12} color={status.color} />
                                        <Text style={[styles.statusText, { color: status.color }]}>{(item.status || 'Pending').toUpperCase()}</Text>
                                    </View>
                                </View>

                                <Text style={[styles.complaintBy, { color: colors.primary }]}>By {item.complaintBy}</Text>
                                <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>

                                <View style={[styles.divider, { backgroundColor: colors.surfaceBorder }]} />

                                <View style={styles.footer}>
                                    <View style={styles.footerItem}>
                                        <User size={14} color={colors.subtitle} />
                                        <Text style={[styles.footerText, { color: colors.subtitle }]}>Assigned: {item.assignedTo || 'Unassigned'}</Text>
                                    </View>
                                    <View style={styles.footerItem}>
                                        <Calendar size={14} color={colors.subtitle} />
                                        <Text style={[styles.footerText, { color: colors.subtitle }]}>{new Date(item.date).toLocaleDateString()}</Text>
                                    </View>
                                </View>
                            </Animated.View>
                        );
                    })
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
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        opacity: 0.7,
    },
    addButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
    },
    complaintBy: {
        fontSize: 13,
        fontWeight: '800',
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 15,
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '700',
    }
});
