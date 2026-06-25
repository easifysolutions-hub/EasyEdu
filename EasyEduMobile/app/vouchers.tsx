import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Search, Plus, Banknote, Receipt, Calendar as CalendarIcon, ArrowLeft, Fingerprint, ChevronRight, FileText, ArrowUpDown } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { authService } from '@/services/authService';
import { useTheme } from '@/contexts/ThemeContext';

export default function VouchersScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [vouchers, setVouchers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(null);

    const glowValue = useSharedValue(0.4);

    useFocusEffect(
        useCallback(() => {
            fetchVouchers(false);
        }, [selectedType])
    );

    useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.7, { duration: 3000 }),
                withTiming(0.4, { duration: 3000 })
            ),
            -1,
            true
        );
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const userData = await authService.getUser();
        setUser(userData);
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchVouchers = async (isInitial = true) => {
        if (isInitial) setLoading(true);
        try {
            const data = await apiService.getVouchers(selectedType || undefined);
            setVouchers(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchVouchers(true);
    }, [selectedType]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchVouchers(false);
    };

    const getTypeConfig = (type: string) => {
        switch (type) {
            case 'Receipt': return { color: colors.primary, icon: Receipt };
            case 'Payment': return { color: colors.error, icon: Banknote };
            case 'Contra': return { color: colors.secondary, icon: ArrowUpDown };
            case 'Journal': return { color: colors.accent, icon: FileText };
            default: return { color: colors.primary, icon: Receipt };
        }
    };

    const filteredVouchers = (Array.isArray(vouchers) ? vouchers : []).filter((v: any) => 
        v.voucherNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.narration?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <View style={[styles.backBtnBg, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <ArrowLeft color={colors.primary} size={28} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Accounting Vouchers</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Fiscal Registry</Text>
                </View>
                {(user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin')) && (
                    <TouchableOpacity style={styles.headerRight} activeOpacity={0.7} onPress={() => router.push('/create-voucher')}>
                        <View style={[styles.backBtnBg, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <Plus color={colors.primary} size={24} />
                    </TouchableOpacity>
                )}
            </Animated.View>

            <View style={[styles.searchContainer, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
                <Search color={colors.primary} size={20} />
                <TextInput
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholder="Search Number/Narration..."
                    placeholderTextColor={colors.subtitle}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
                {[
                    { label: 'ALL', value: null },
                    { label: 'PAYMENTS', value: 1 },
                    { label: 'RECEIPTS', value: 2 },
                    { label: 'CONTRA', value: 3 },
                    { label: 'JOURNAL', value: 4 }
                ].map(type => (
                    <TouchableOpacity
                        key={type.label}
                        onPress={() => setSelectedType(type.value)}
                        style={[
                            styles.tab,
                            { backgroundColor: selectedType === type.value ? colors.primary : colors.surface, borderColor: selectedType === type.value ? colors.primary : colors.surfaceBorder }
                        ]}
                    >
                        <Text style={[styles.tabText, { color: selectedType === type.value ? '#fff' : colors.subtitle }]}>{type.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {loading && !refreshing ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredVouchers}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    renderItem={({ item, index }) => (
                        <VoucherCard 
                            item={item} 
                            index={index} 
                            colors={colors} 
                            isDark={isDark} 
                            getTypeConfig={getTypeConfig} 
                            isExpanded={expandedId === item.id}
                            onPress={() => toggleExpand(item.id)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Receipt color={colors.subtitle} size={40} opacity={0.5} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO RECORDS FOUND</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>The fiscal registry is currently offline or empty.</Text>
                            {(user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin')) && (
                                <TouchableOpacity 
                                    style={[styles.initBtn, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}
                                    onPress={() => router.push('/create-voucher')}
                                >
                                    <Plus color={colors.primary} size={18} />
                                    <Text style={[styles.initBtnText, { color: colors.primary }]}>INITIALIZE FIRST VOUCHER</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    }
                />
            )}
        </View>
    );
}

const VoucherCard = ({ item, index, colors, isDark, getTypeConfig, isExpanded, onPress }: any) => {
    const scale = useSharedValue(1);
    const { color, icon: TypeIcon } = getTypeConfig(item.typeName || '');
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    if (!item) return null;

    return (
        <Animated.View 
            entering={FadeInUp.delay(100 + Math.min(index, 5) * 50).duration(800)} 
            style={animatedStyle}
        >
            <TouchableOpacity 
                style={styles.voucherCard}
                activeOpacity={0.9}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
                onPress={onPress}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={[styles.typeIndicator, { backgroundColor: color }]} />

                <View style={styles.voucherMain}>
                    <View style={styles.voucherHeader}>
                        <View style={styles.headerTitleRow}>
                            <View style={[styles.typeIconBox, { backgroundColor: color + '15' }]}>
                                <TypeIcon color={color} size={16} />
                            </View>
                            <View>
                                <Text style={[styles.voucherNumber, { color: colors.text }]}>{item.voucherNumber || 'N/A'}</Text>
                                <View style={[styles.typeBadge, { backgroundColor: color + '15' }]}>
                                    <Text style={[styles.typeText, { color: color }]}>{(item.typeName || 'Unknown').toUpperCase()}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.voucherAmount, { color: colors.text }]}>${(item.totalAmount || 0).toLocaleString()}</Text>
                    </View>
                    
                    {item.narration && (
                        <Text style={[styles.narration, { color: colors.subtitle }]} numberOfLines={isExpanded ? undefined : 1}>{item.narration}</Text>
                    )}

                    {isExpanded && (
                        <View style={[styles.detailsContainer, { borderTopColor: colors.surfaceBorder }]}>
                            {(item.details || []).map((detail: any, dIdx: number) => (
                                <View key={dIdx} style={styles.detailRow}>
                                    <View style={styles.detailLedger}>
                                        <Text style={[styles.detailLedgerText, { color: colors.text }]}>{detail.ledgerName}</Text>
                                        {detail.note && <Text style={[styles.detailNote, { color: colors.subtitle }]}>{detail.note}</Text>}
                                    </View>
                                    <View style={styles.detailAmounts}>
                                        {detail.debitAmount > 0 && <Text style={[styles.detailDr, { color: colors.primary }]}>DR ${(detail.debitAmount).toLocaleString()}</Text>}
                                        {detail.creditAmount > 0 && <Text style={[styles.detailCr, { color: colors.error }]}>CR ${(detail.creditAmount).toLocaleString()}</Text>}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.voucherFooter}>
                        <View style={styles.metaRow}>
                            <CalendarIcon color={colors.subtitle} size={12} />
                            <Text style={[styles.metaText, { color: colors.subtitle }]}>
                                {item.date ? new Date(item.date).toLocaleDateString() : '--/--/----'}
                            </Text>
                        </View>
                        <View style={styles.metaRow}>
                            <FileText color={colors.subtitle} size={12} />
                            <Text style={[styles.metaText, { color: colors.subtitle }]}>{(item.details || []).length} Entries</Text>
                        </View>
                        {isExpanded && (
                            <TouchableOpacity style={styles.exportBtn}>
                                <FileText color={colors.subtitle} size={12} />
                                <Text style={[styles.exportText, { color: colors.subtitle }]}>GENERATE PDF</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgGlow: { position: 'absolute', top: -150, right: -150, width: 400, height: 400, borderRadius: 200, opacity: 0.15 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 20, gap: 16 },
    backBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 },
    headerTitleContainer: { flex: 1 },
    headerTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.6 },
    headerRight: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, paddingHorizontal: 16, height: 56, borderRadius: 20, borderWidth: 1, marginBottom: 20 },
    searchInput: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '600' },
    listContent: { paddingHorizontal: 24, paddingBottom: 40 },
    voucherCard: { padding: 20, marginBottom: 16, borderRadius: 28, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 28, opacity: 0.5 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 28, borderWidth: 1 },
    typeIndicator: { position: 'absolute', left: 0, top: 20, bottom: 20, width: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
    voucherMain: { gap: 12 },
    voucherHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    voucherNumber: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
    typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginTop: 4 },
    typeText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    voucherAmount: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
    narration: { fontSize: 13, fontWeight: '500', opacity: 0.8 },
    voucherFooter: { flexDirection: 'row', gap: 16, marginTop: 4 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { fontSize: 11, fontWeight: '700' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyContainer: { alignItems: 'center', marginTop: 100, gap: 16 },
    emptyText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
    tabsScroll: { maxHeight: 50, marginBottom: 16 },
    tabsContent: { paddingHorizontal: 24, gap: 10 },
    tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
    tabText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    detailsContainer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, gap: 10 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    detailLedger: { flex: 1 },
    detailLedgerText: { fontSize: 14, fontWeight: '800' },
    detailNote: { fontSize: 11, fontStyle: 'italic', marginTop: 2 },
    detailAmounts: { alignItems: 'flex-end' },
    detailDr: { fontSize: 13, fontWeight: '900' },
    detailCr: { fontSize: 13, fontWeight: '900' },
    headerTitleRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    typeIconBox: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    emptyIconBox: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    emptyTitle: { fontSize: 16, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
    initBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, borderWidth: 1, marginTop: 24 },
    initBtnText: { fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
    exportBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto' },
    exportText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 }
});
