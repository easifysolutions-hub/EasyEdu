import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Fingerprint, ChevronRight, Wallet } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function FeesScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState<any[]>([]);

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
        fetchInvoices();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchInvoices = async () => {
        try {
            const data = await apiService.getFeesInvoices();
            setInvoices(data || []);
        } catch (error) {
            console.error('Failed to load invoices', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'Paid': return { color: colors.primary, icon: CheckCircle, label: 'CLEARED' };
            case 'Partial': return { color: colors.accent, icon: Clock, label: 'PARTIAL' };
            case 'Overdue': return { color: colors.error, icon: AlertCircle, label: 'OVERDUE' };
            default: return { color: colors.secondary, icon: Clock, label: 'PENDING' };
        }
    };

    const InvoiceCard = ({ item, index, colors, isDark, router }: any) => {
        const scale = useSharedValue(1);
        const { color, icon: StatusIcon, label } = getStatusInfo(item.status);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }]
        }));

        const handlePressIn = () => {
            scale.value = withSpring(0.97);
        };

        const handlePressOut = () => {
            scale.value = withSpring(1);
        };

        return (
            <Animated.View 
                entering={FadeInUp.delay(200 + Math.min(index, 10) * 100).duration(800)}
                style={animatedStyle}
            >
                <TouchableOpacity 
                    style={styles.invoiceCard}
                    activeOpacity={0.9}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={styles.invoiceHeader}>
                        <View>
                            <Text style={[styles.invoiceNumber, { color: colors.text }]}>{item.invoiceNumber}</Text>
                            <Text style={[styles.invoiceDate, { color: colors.subtitle }]}>{item.date}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
                            <StatusIcon color={color} size={12} />
                            <Text style={[styles.statusText, { color }]}>{label}</Text>
                        </View>
                    </View>

                    <View style={[styles.studentInfo, { borderTopColor: colors.surfaceBorder }]}>
                        <Text style={[styles.studentName, { color: colors.text }]}>{item.studentName}</Text>
                        <Text style={[styles.className, { color: colors.subtitle }]}>{item.className}</Text>
                    </View>

                    <View style={[styles.amountContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)' }]}>
                        <View style={[styles.cardInlay, { backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: 16 }]} />
                        <View style={[styles.cardBorder, { borderColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)', borderRadius: 16 }]} />
                        <View>
                            <Text style={[styles.amountLabel, { color: colors.subtitle }]}>Total Allocation</Text>
                            <Text style={[styles.amountValue, { color: colors.text }]}>${(item.amount || 0).toFixed(2)}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={[styles.amountLabel, { color: colors.subtitle }]}>Secured</Text>
                            <Text style={[styles.amountValue, { color: '#10B981' }]}>${(item.paidAmount || 0).toFixed(2)}</Text>
                        </View>
                    </View>

                    {item.status !== 'Paid' && (
                        <TouchableOpacity
                            style={[styles.collectBtn, { backgroundColor: colors.primary + '15' }]}
                            activeOpacity={0.8}
                            onPress={() => router.push({
                                pathname: '/collect-payment',
                                params: {
                                    invoiceId: item.id,
                                    studentId: item.studentId || 0,
                                    invoiceNumber: item.invoiceNumber,
                                    studentName: item.studentName,
                                    pendingAmount: item.amount - item.paidAmount
                                }
                            })}
                        >
                            <View style={[styles.cardBorder, { borderColor: colors.primary + '30', borderRadius: 14 }]} />
                            <Text style={[styles.collectBtnText, { color: colors.primary }]}>INITIATE TRANSFER</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Financial Nodes</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Transaction Ledger</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Wallet color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {/* Invoices List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={invoices}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <InvoiceCard item={item} index={index} colors={colors} isDark={isDark} router={router} />}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                             <Text style={[styles.emptyTitle, { color: colors.text }]}>NO LEDGER ENTRIES</Text>
                             <Text style={[styles.emptyText, { color: colors.subtitle }]}>Financial records are currently empty in the quantum stack.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

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
        borderColor: 'transparent',
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
        paddingBottom: 40,
    },
    invoiceCard: {
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
    invoiceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
    },
    invoiceNumber: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.3,
    },
    invoiceDate: {
        fontSize: 12,
        color: '#A1A1AA',
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
    studentInfo: {
        marginBottom: 16,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: -0.3,
    },
    className: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '500',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        position: 'relative',
    },
    amountLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#71717A',
        fontWeight: '800',
        marginBottom: 4,
    },
    amountValue: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff',
    },
    collectBtn: {
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        position: 'relative',
    },
    collectBtnText: {
        color: '#10B981',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
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
    }
});
