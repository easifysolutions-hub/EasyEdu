import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, TextInput, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Book, Library, Search, Clock, AlertCircle, BookOpen, Fingerprint, Archive } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

const { width } = Dimensions.get('window');

import { useTheme } from '@/contexts/ThemeContext';

export default function LibraryScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [activeTab, setActiveTab] = useState('browse'); // browse or issued
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<any[]>([]);
    const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        if (activeTab === 'browse') {
            loadBooks();
        } else {
            loadIssued();
        }
    }, [activeTab]);

    const loadBooks = async (query = searchQuery) => {
        setLoading(true);
        try {
            const data = await apiService.getLibraryBooks(query);
            setBooks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadIssued = async () => {
        setLoading(true);
        try {
            const data = await apiService.getMyIssuedBooks();
            setIssuedBooks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        // Add a simple debounce if desired
    };

    const BookCard = ({ item, index }: any) => {
        const scale = useSharedValue(1);
        const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

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
                    <View style={styles.bookCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={[styles.coverPlaceholder, { backgroundColor: colors.primary + '10' }]}>
                            <Book color={colors.primary} size={32} />
                            <View style={[styles.cardBorder, { borderColor: colors.primary + '20', borderRadius: 16 }]} />
                        </View>

                        <View style={styles.bookInfo}>
                            <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.bookAuthor, { color: colors.subtitle }]}>{item.author}</Text>

                            <View style={styles.bookMeta}>
                                <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '15' }]}>
                                    <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category || 'GENERAL'}</Text>
                                </View>
                                <Text style={[styles.availability, { color: item.available > 0 ? '#10B981' : '#EF4444' }]}>
                                    {item.available > 0 ? `${item.available} NODE` : 'DEPLETED'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const IssuedCard = ({ item, index }: any) => {
        const scale = useSharedValue(1);
        const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

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
                    <View style={styles.issuedCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.issuedHeader}>
                            <View style={[styles.issueIconBox, { backgroundColor: item.overDue ? 'rgba(239, 68, 68, 0.15)' : colors.primary + '15' }]}>
                                {item.overDue ? <AlertCircle color="#EF4444" size={20} /> : <BookOpen color={colors.primary} size={20} />}
                            </View>
                            <View style={styles.issueTextContainer}>
                                <Text style={[styles.issuedBookTitle, { color: colors.text }]} numberOfLines={1}>{item.bookTitle}</Text>
                                <Text style={[styles.issueDate, { color: colors.subtitle }]}>Extracted: {item.issueDate}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: item.overDue ? 'rgba(239, 68, 68, 0.2)' : colors.surface }]}>
                                <Text style={[styles.statusText, { color: item.overDue ? '#EF4444' : colors.text }]}>{item.status}</Text>
                            </View>
                        </View>

                        <View style={[styles.dueContainer, { borderTopColor: colors.surfaceBorder, backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : colors.surface }]}>
                            <View>
                                <Text style={[styles.dueLabel, { color: colors.subtitle }]}>Return Deadline</Text>
                                <Text style={[styles.dueValue, { color: item.overDue ? '#EF4444' : colors.text }]}>{item.dueDate}</Text>
                            </View>
                            {item.returnDate !== 'Not Set' && (
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.dueLabel, { color: colors.subtitle }]}>Returned</Text>
                                    <Text style={[styles.dueValue, { color: colors.primary }]}>{item.returnDate}</Text>
                                </View>
                            )}
                        </View>
                    </View>
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Knowledge Repository</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Library Index</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Archive color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {/* Custom Pill Tabs */}
            <Animated.View entering={FadeInDown.duration(800)} style={styles.tabsWrapper}>
                <View style={[styles.pillContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : colors.surface }]}>
                    <TouchableOpacity
                        style={[styles.pillBtn, activeTab === 'browse' ? { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : colors.primary } : null]}
                        onPress={() => setActiveTab('browse')}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.pillText, { color: activeTab === 'browse' ? '#fff' : colors.subtitle }]}>DIRECTORY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.pillBtn, activeTab === 'issued' ? { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : colors.primary } : null]}
                        onPress={() => setActiveTab('issued')}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.pillText, { color: activeTab === 'issued' ? '#fff' : colors.subtitle }]}>MY ASSETS</Text>
                    </TouchableOpacity>
                    <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 20 }]} />
                </View>
            </Animated.View>

            {/* Search Bar */}
            {activeTab === 'browse' && (
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.searchSection}>
                    <View style={styles.searchContainer}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                        <Search color={colors.icon} size={20} style={{ marginLeft: 16 }} />
                        <TextInput
                            style={[styles.searchInput, { color: colors.text }]}
                            placeholder="Query archives..."
                            placeholderTextColor={colors.subtitle}
                            value={searchQuery}
                            onChangeText={handleSearch}
                            onSubmitEditing={() => loadBooks()}
                        />
                    </View>
                </Animated.View>
            )}

            {/* Content Lists */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={activeTab === 'browse' ? books : issuedBooks}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        activeTab === 'browse' ? <BookCard item={item} index={index} /> : <IssuedCard item={item} index={index} />
                    )}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ASSETS LOCATED</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>
                                {activeTab === 'browse' ? 'No matching query logged in the archive.' : 'No modules currently extracted from the node.'}
                            </Text>
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
    tabsWrapper: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 8,
    },
    pillContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 4,
        position: 'relative',
    },
    pillBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 16,
    },
    pillText: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
    },
    searchSection: {
        paddingHorizontal: 24,
        paddingVertical: 12,
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
        color: '#fff',
        fontWeight: '500',
        height: '100%',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 24,
        gap: 16,
        paddingBottom: 40,
    },
    bookCard: {
        flexDirection: 'row',
        padding: 16,
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
    coverPlaceholder: {
        width: 80,
        height: 110,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    bookInfo: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 6,
        letterSpacing: -0.3,
    },
    bookAuthor: {
        fontSize: 13,
        color: '#A1A1AA',
        fontWeight: '500',
        marginBottom: 12,
    },
    bookMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    availability: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    issuedCard: {
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    issuedHeader: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    issueIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    issueTextContainer: {
        flex: 1,
    },
    issuedBookTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.3,
    },
    issueDate: {
        fontSize: 11,
        color: '#71717A',
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    dueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderTopWidth: 1,
    },
    dueLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#71717A',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    dueValue: {
        fontSize: 14,
        fontWeight: '800',
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
