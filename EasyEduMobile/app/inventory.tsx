import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Box, Archive, AlertTriangle, ArrowRightLeft, Search, Info, Package } from 'lucide-react-native';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

const InventoryCard = ({ item, index, colors }: any) => {
    const scale = useSharedValue(1);

    return (
        <Animated.View entering={FadeInUp.delay(300 + Math.min(index, 10) * 100).duration(800)}>
            <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.9}
                onPressIn={() => scale.value = withSpring(0.96)}
                onPressOut={() => scale.value = withSpring(1)}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={styles.cardHeader}>
                    <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                        <Package color={colors.primary} size={24} />
                    </View>
                    <View style={styles.titleInfo}>
                        <Text style={[styles.itemName, { color: colors.text }]}>{item.itemName}</Text>
                        <Text style={[styles.category, { color: colors.subtitle }]}>{item.categoryName} • SKU: {item.SKU || 'N/A'}</Text>
                    </View>
                    {item.isLowStock && (
                        <View style={[styles.alertBadge, { backgroundColor: colors.error + '15' }]}>
                            <AlertTriangle color={colors.error} size={14} />
                        </View>
                    )}
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={[styles.statLabel, { color: colors.subtitle }]}>QUANTITY</Text>
                        <Text style={[styles.statValue, { color: item.isLowStock ? colors.error : colors.text }]}>{item.quantity} {item.unit || 'pcs'}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={[styles.statLabel, { color: colors.subtitle }]}>UNIT PRICE</Text>
                        <Text style={[styles.statValue, { color: colors.text }]}>${item.unitPrice}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={[styles.statLabel, { color: colors.subtitle }]}>TOTAL VALUE</Text>
                        <Text style={[styles.statValue, { color: colors.primary }]}>${item.totalValue}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function InventoryScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('Stock');
    
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
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [stockData, transData] = await Promise.all([
                apiService.getInventory(),
                apiService.getInventoryTransactions()
            ]);
            setInventory(stockData || []);
            setTransactions(transData || []);
        } catch (error) {
            console.error('Failed to load asset nodes:', error);
        } finally {
            setLoading(false);
        }
    };

    const glowStyle = useAnimatedStyle(() => ({ opacity: glowValue.value }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Logistics Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Inventory Stream</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Search color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {/* Quick Stats Grid */}
            <View style={styles.statsGrid}>
                 <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                     <Archive color={colors.primary} size={18} />
                     <Text style={[styles.statsLabelMain, { color: colors.subtitle }]}>Total Assets</Text>
                     <Text style={[styles.statsValueMain, { color: colors.text }]}>{(Array.isArray(inventory) ? inventory : []).length}</Text>
                 </View>
                 <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                     <AlertTriangle color={colors.error} size={18} />
                     <Text style={[styles.statsLabelMain, { color: colors.subtitle }]}>Low Stock</Text>
                     <Text style={[styles.statsValueMain, { color: colors.error }]}>{(Array.isArray(inventory) ? inventory : []).filter(i => i.isLowStock).length}</Text>
                 </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {['Stock', 'History'].map((tab) => (
                    <TouchableOpacity 
                        key={tab}
                        style={[styles.tab, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder, borderWidth: 1 }, activeTab === tab && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.subtitle }]}>{tab.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={activeTab === 'Stock' ? inventory : transactions}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => 
                        activeTab === 'Stock' ? 
                        <InventoryCard item={item} index={index} colors={colors} /> :
                        <TransactionCard item={item} index={index} colors={colors} />
                    }
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <Package color={colors.subtitle} size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>No asset {activeTab === 'Stock' ? 'nodes' : 'logs'} identified in current sector.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const TransactionCard = ({ item, index, colors }: any) => {
    return (
        <Animated.View entering={FadeInUp.delay(100 + Math.min(index, 10) * 100).duration(800)} style={styles.card}>
            <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
            
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: (item.transactionType === 'Issue' ? colors.secondary : colors.primary) + '15' }]}>
                    <ArrowRightLeft color={item.transactionType === 'Issue' ? colors.secondary : colors.primary} size={20} />
                </View>
                <View style={styles.titleInfo}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.itemName}</Text>
                    <Text style={[styles.category, { color: colors.subtitle }]}>{item.recipientName}</Text>
                </View>
                <View style={styles.amountInfo}>
                    <Text style={[styles.statValue, { color: colors.text, textAlign: 'right' }]}>{item.quantity > 0 ? '-' : ''}{item.quantity}</Text>
                    <Text style={[styles.statLabel, { color: colors.subtitle, textAlign: 'right' }]}>{item.date}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgGlow: {
        position: 'absolute',
        top: -150,
        right: -100,
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
        paddingBottom: 24,
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
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 12, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
    headerRight: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 8,
        gap: 12,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    tabText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    statsGrid: {
        flexDirection: 'row',
        padding: 24,
        paddingBottom: 8,
        gap: 12,
    },
    statsCard: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
    },
    statsLabelMain: { fontSize: 10, fontWeight: '800', marginTop: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
    statsValueMain: { fontSize: 20, fontWeight: '900', marginTop: 4 },
    amountInfo: {
        alignItems: 'flex-end',
    },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { padding: 24, gap: 16, paddingBottom: 40 },
    card: { borderRadius: 24, padding: 20, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: 24 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    iconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    titleInfo: { flex: 1 },
    itemName: { fontSize: 16, fontWeight: '900', letterSpacing: -0.3 },
    category: { fontSize: 12, fontWeight: '600', marginTop: 2 },
    alertBadge: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 16 },
    stat: { alignItems: 'flex-start' },
    statLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5, marginBottom: 4 },
    statValue: { fontSize: 14, fontWeight: '900' },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 100 },
    emptyText: { fontSize: 14, textAlign: 'center', fontStyle: 'italic', fontWeight: '500' }
});
