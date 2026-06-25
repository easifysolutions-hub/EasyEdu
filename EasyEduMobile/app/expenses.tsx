import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Search, Plus, Banknote, Receipt, Calendar as CalendarIcon, ChevronLeft, Fingerprint, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { authService } from '@/services/authService';

import { useTheme } from '@/contexts/ThemeContext';

export default function ExpensesScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(null);

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
        fetchExpenses();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const userData = await authService.getUser();
        setUser(userData);
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const data = await apiService.getExpenses();
            setExpenses(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchExpenses();
    };

    const ExpenseCard = ({ item, index, colors, isDark }: any) => {
        const scale = useSharedValue(1);
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
                    style={styles.expenseCard}
                    activeOpacity={0.9}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(item.category) }]} />

                    <View style={styles.expenseMain}>
                        <View style={styles.expenseHeader}>
                            <Text style={[styles.expenseTitle, { color: colors.text }]}> {item.title}</Text>
                            <Text style={[styles.expenseAmount, { color: colors.error }]}>-${(item.amount || 0).toFixed(2)}</Text>
                        </View>
                        <View style={styles.expenseFooter}>
                            <View style={styles.metaRow}>
                                <CalendarIcon color={colors.subtitle} size={12} />
                                <Text style={[styles.metaText, { color: colors.subtitle }]}>{item.date}</Text>
                            </View>
                            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '15' }]}>
                                <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>{item.category}</Text>
                            </View>
                        </View>
                        {item.referenceNumber && (
                            <View style={[styles.refRow, { borderTopColor: colors.surfaceBorder }]}>
                                <Receipt color={colors.subtitle} size={10} />
                                <Text style={[styles.refText, { color: colors.subtitle }]}>Ref Node: {item.referenceNumber}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const filteredExpenses = (Array.isArray(expenses) ? expenses : []).filter(e =>
        e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

    const getCategoryColor = (category: string) => {
        const cats: any = {
            'Electricity': '#F59E0B',
            'Rent': colors.error,
            'Supplies': colors.primary,
            'Maintenance': colors.secondary,
            'General': colors.tertiary
        };
        return cats[category] || colors.accent;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(800)} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <ChevronLeft color={colors.primary} size={28} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Fiscal Outflow</Text>
                {(user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin')) && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push('/add-expense')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            style={styles.backBtnBg}
                        />
                        <Plus color="#fff" size={24} />
                    </TouchableOpacity>
                )}
            </Animated.View>

            {/* Summary Card */}
            <Animated.View entering={FadeInDown.duration(800)} style={styles.summaryContainer}>
                <View style={[styles.summaryCard, { backgroundColor: isDark ? colors.primary + '15' : colors.cardBg }]}>
                    <View style={[styles.cardBorder, { borderColor: isDark ? colors.primary + '30' : colors.primary, borderRadius: 24 }]} />
                    <View>
                        <Text style={[styles.summaryLabel, { color: isDark ? 'rgba(255,255,255,0.7)' : colors.subtitle }]}>Total Outflow</Text>
                        <Text style={[styles.summaryValue, { color: colors.text }]}>
                            {(user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin')) ? `$${totalAmount.toFixed(2)}` : '***.**'}
                        </Text>
                    </View>
                    <View style={[styles.summaryIconBox, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : colors.surface }]}>
                        <Banknote color={colors.primary} size={32} opacity={0.6} />
                    </View>
                </View>
            </Animated.View>

            {/* Search Bar */}
            <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                    <Search color={colors.subtitle} size={20} style={{ marginLeft: 16 }} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder="Query outflows..."
                        placeholderTextColor={colors.subtitle}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </Animated.View>

            {/* Outflows List */}
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredExpenses}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                    }
                    renderItem={({ item, index }) => <ExpenseCard item={item} index={index} colors={colors} isDark={isDark} />}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO OUTFLOWS</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>Outflow ledger is currently empty.</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderWidth: 1,
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
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    addButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    summaryContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    summaryCard: {
        padding: 24,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    summaryLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '800',
        marginBottom: 8,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -1,
    },
    summaryIconBox: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchWrapper: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 16,
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        fontWeight: '500',
        height: '100%',
    },
    listContent: {
        padding: 24,
        gap: 16,
        paddingBottom: 40,
    },
    expenseCard: {
        flexDirection: 'row',
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    categoryIndicator: {
        width: 6,
        opacity: 0.8,
    },
    expenseMain: {
        flex: 1,
        padding: 20,
    },
    expenseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    expenseTitle: {
        fontSize: 16,
        fontWeight: '900',
        flex: 1,
        marginRight: 12,
        color: '#fff',
        letterSpacing: -0.3,
    },
    expenseAmount: {
        fontSize: 16,
        fontWeight: '900',
        color: '#EF4444',
    },
    expenseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    refRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 12,
        opacity: 0.8,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    refText: {
        fontSize: 11,
        color: '#71717A',
        fontWeight: '600',
        letterSpacing: 0.5,
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
