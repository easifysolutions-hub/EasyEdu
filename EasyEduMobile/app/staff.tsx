import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, UserPlus, ArrowLeft, Phone, Mail, Briefcase, Fingerprint, Users2 } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { authService } from '@/services/authService';

import { useTheme } from '@/contexts/ThemeContext';

export default function StaffScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [staff, setStaff] = useState<any[]>([]);
    const [filteredStaff, setFilteredStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

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
        fetchStaff();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const userData = await authService.getUser();
        setUser(userData);
    };

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const data = await apiService.getStaff();
            setStaff(data);
            setFilteredStaff(data);
        } catch (error) {
            console.error('Error fetching staff directive', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const filtered = (Array.isArray(staff) ? staff : []).filter(s =>
            (s.name && s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (s.department && s.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (s.designation && s.designation.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredStaff(filtered);
    }, [searchQuery, staff]);

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Personnel Nodes</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Institutional Roster</Text>
                </View>
                {(user?.roles?.includes('SuperAdmin') || user?.roles?.includes('Admin')) && (
                    <TouchableOpacity
                        style={styles.headerRight}
                        onPress={() => router.push('/staff-onboarding')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            style={styles.backBtnBg}
                        />
                        <UserPlus color="#fff" size={22} />
                    </TouchableOpacity>
                )}
            </Animated.View>

            {/* Search Bar */}
            <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.searchSection}>
                <View style={styles.searchContainer}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                    <Search color={colors.subtitle} size={20} style={{ marginLeft: 16 }} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder="Extrapolate personnel query..."
                        placeholderTextColor={colors.subtitle}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </Animated.View>

            {/* Content List */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredStaff}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <StaffCard item={item} index={index} colors={colors} isDark={isDark} />
                    )}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO PERSONNEL REGISTRATION</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>Query returned empty nodes. Refine search parameters of the roster.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const StaffCard = ({ item, index, colors, isDark }: any) => {
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
                <View style={styles.staffCard}>
                    <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                    <View style={styles.cardHeader}>
                        <View style={[styles.avatar, { backgroundColor: colors.primary + '15' }]}>
                            <Text style={[styles.avatarText, { color: colors.primary }]}>
                                {item.name ? item.name[0]?.toUpperCase() : 'X'}
                            </Text>
                        </View>
                        <View style={styles.staffInfo}>
                            <Text style={[styles.staffName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>

                            <View style={styles.detailRow}>
                                <Briefcase color={colors.primary} size={12} style={{ marginRight: 6 }} />
                                <Text style={[styles.staffDetail, { color: colors.subtitle }]} numberOfLines={1}>
                                    <Text style={{ color: colors.primary, fontWeight: '800' }}>{item.designation || 'UNASSIGNED'}</Text>
                                    <Text style={{ color: colors.surfaceBorder }}> | </Text>
                                    <Text>{item.department || 'GENERAL'}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.contactRow, { borderTopColor: colors.surfaceBorder, backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : colors.surface }]}>
                        <View style={styles.contactItem}>
                            <Phone color={colors.subtitle} size={14} />
                            <Text style={[styles.contactText, { color: colors.subtitle }]}>{item.phone || 'NO LINK'}</Text>
                        </View>
                        <View style={[styles.contactItem, { justifyContent: 'flex-start', marginLeft: 16 }]}>
                            <Mail color={colors.subtitle} size={14} />
                            <Text style={[styles.contactText, { color: colors.subtitle }]} numberOfLines={1}>{item.email || 'NO VECTOR'}</Text>
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
    headerRight: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    searchSection: {
        paddingHorizontal: 24,
        paddingVertical: 16,
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
        marginRight: 16,
        fontSize: 14,
        fontWeight: '500',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 24,
        paddingTop: 8,
        gap: 16,
        paddingBottom: 60,
    },
    staffCard: {
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '900',
    },
    staffInfo: {
        flex: 1,
    },
    staffName: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 6,
        letterSpacing: -0.3,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    staffDetail: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    contactRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    contactText: {
        fontSize: 11,
        fontWeight: '600',
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
