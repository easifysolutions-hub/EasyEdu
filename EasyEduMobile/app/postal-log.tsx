import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { Mail, ArrowDownLeft, ArrowUpRight, Calendar, User, UserCheck, ChevronLeft, Plus, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

export default function PostalLogScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<'Receive' | 'Dispatch'>('Receive');

    useEffect(() => {
        loadLogs();
    }, [activeTab]);

    const loadLogs = async () => {
        try {
            const data = await apiService.getPostalLogs(activeTab);
            setLogs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadLogs();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={[colors.secondary + '15', 'transparent']}
                style={styles.headerGlow}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                    <ChevronLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Registry</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Postal Liaison Protocol</Text>
                </View>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.secondary }]}>
                    <Plus color="#fff" size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    onPress={() => setActiveTab('Receive')}
                    style={[styles.tab, activeTab === 'Receive' && { backgroundColor: colors.surface, borderColor: colors.secondary, borderWidth: 1 }]}
                >
                    <ArrowDownLeft size={18} color={activeTab === 'Receive' ? colors.secondary : colors.subtitle} />
                    <Text style={[styles.tabText, { color: activeTab === 'Receive' ? colors.text : colors.subtitle }]}>INBOUND</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab('Dispatch')}
                    style={[styles.tab, activeTab === 'Dispatch' && { backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 1 }]}
                >
                    <ArrowUpRight size={18} color={activeTab === 'Dispatch' ? colors.primary : colors.subtitle} />
                    <Text style={[styles.tabText, { color: activeTab === 'Dispatch' ? colors.text : colors.subtitle }]}>OUTBOUND</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.secondary} />}
            >
                {loading ? (
                    <ActivityIndicator color={colors.secondary} size="large" style={styles.loader} />
                ) : logs.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Mail size={64} color={colors.surfaceBorder} />
                        <Text style={[styles.emptyText, { color: colors.subtitle }]}>No {activeTab} protocols registered.</Text>
                    </View>
                ) : (
                    logs.map((log, index) => (
                        <Animated.View
                            key={log.id}
                            entering={FadeInUp.delay(index * 100).duration(600)}
                            style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}
                        >
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: activeTab === 'Receive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)' }]}>
                                    {activeTab === 'Receive' ? 
                                        <ArrowDownLeft size={20} color="#10B981" /> : 
                                        <ArrowUpRight size={20} color="#3B82F6" />
                                    }
                                </View>
                                <View style={styles.logMeta}>
                                    <Text style={[styles.refNo, { color: colors.secondary }]}>#{log.referenceNo}</Text>
                                    <Text style={[styles.date, { color: colors.subtitle }]}>
                                        {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </Text>
                                </View>
                            </View>

                            <Text style={[styles.title, { color: colors.text }]}>{log.title}</Text>
                            
                            <View style={[styles.divider, { backgroundColor: colors.surfaceBorder }]} />

                            <View style={styles.details}>
                                <View style={styles.detailItem}>
                                    <User size={14} color={colors.subtitle} />
                                    <Text style={[styles.detailLabel, { color: colors.subtitle }]}>From:</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>{log.fromTitle}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <UserCheck size={14} color={colors.subtitle} />
                                    <Text style={[styles.detailLabel, { color: colors.subtitle }]}>To:</Text>
                                    <Text style={[styles.detailValue, { color: colors.text }]}>{log.toTitle}</Text>
                                </View>
                            </View>

                            {log.note && (
                                <View style={[styles.noteContainer, { backgroundColor: colors.surface }]}>
                                    <Text style={[styles.noteText, { color: colors.subtitle }]}>{log.note}</Text>
                                </View>
                            )}
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 10,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 45,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    tabText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
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
        marginBottom: 15,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logMeta: {
        alignItems: 'flex-end',
    },
    refNo: {
        fontSize: 13,
        fontWeight: '900',
    },
    date: {
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 15,
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 15,
    },
    details: {
        gap: 10,
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailLabel: {
        fontSize: 13,
        fontWeight: '600',
        width: 45,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '700',
        flex: 1,
    },
    noteContainer: {
        padding: 12,
        borderRadius: 12,
    },
    noteText: {
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '500',
        lineHeight: 18,
    }
});
