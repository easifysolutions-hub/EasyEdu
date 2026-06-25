import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Search, UserPlus, GraduationCap, ChevronRight, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { apiService } from '@/services/apiService';

const { width } = Dimensions.get('window');

const StudentCard = ({ item, index, colors, isDark }: any) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <Animated.View 
            entering={FadeInUp.delay(300 + Math.min(index, 10) * 100).duration(800)}
            style={animatedStyle}
        >
            <TouchableOpacity 
                style={styles.studentCard} 
                activeOpacity={0.9}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={styles.avatarContainer}>
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        style={styles.avatarGradient}
                    >
                        <Text style={styles.avatarText}>
                            {item.name ? item.name[0]?.toUpperCase() : '?'}
                        </Text>
                    </LinearGradient>
                </View>

                <View style={styles.studentInfo}>
                    <Text style={[styles.studentName, { color: colors.text }]}>{item.name}</Text>
                    <View style={styles.metaRow}>
                        <View style={[styles.metaBadge, { backgroundColor: colors.primary + '15' }]}>
                            <Text style={[styles.metaText, { color: colors.primary }]}>{item.className}</Text>
                        </View>
                        <Text style={[styles.studentDetail, { color: colors.subtitle }]}>Roll: {item.roll}</Text>
                    </View>
                    <Text style={[styles.studentSubDetail, { color: colors.subtitle }]}>ID: {item.admissionNumber}</Text>
                </View>

                <ChevronRight color={colors.subtitle} size={20} />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function StudentsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        const fetchStudents = async () => {
            try {
                const data = await apiService.getStudents();
                setStudents(data);
            } catch (error) {
                console.error('Failed to load students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                    <View style={styles.headerTop}>
                        <View style={styles.titleSection}>
                            <GraduationCap color={colors.primary} size={28} />
                            <Text style={[styles.screenTitle, { color: colors.text }]}>Cadet Roster</Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight}>
                            <LinearGradient
                                colors={[colors.primary + '20', colors.primary + '05']}
                                style={styles.backBtnBg}
                            />
                            <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                            <Search color={colors.primary} size={22} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.actionRow}>
                        <View style={styles.searchContainer}>
                            <View style={[styles.searchInner, { backgroundColor: colors.surface }]} />
                            <View style={[styles.searchBorder, { borderColor: colors.surfaceBorder }]} />
                            <Search color={colors.subtitle} size={18} style={styles.searchIcon} />
                            <TextInput
                                style={[styles.searchInput, { color: colors.text }]}
                                placeholder="Locate cadet..."
                                placeholderTextColor={colors.subtitle}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => router.push('/student-admission')}
                        >
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                style={styles.addGradient}
                            >
                                <UserPlus color="#fff" size={20} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {loading && students.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={(Array.isArray(students) ? students : []).filter(s => s.name?.toLowerCase().includes(searchQuery.toLowerCase()))}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <StudentCard item={item} index={index} colors={colors} isDark={isDark} />}
                        ListEmptyComponent={
                            <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                                <User color={colors.subtitle} size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
                                <Text style={[styles.emptyText, { color: colors.subtitle }]}>
                                    {loading ? 'Scanning matrix...' : 'No cadets found matching criteria.'}
                                </Text>
                            </Animated.View>
                        }
                    />
                )}
            </KeyboardAvoidingView>
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
        right: -100,
        width: 350,
        height: 350,
        borderRadius: 175,
        opacity: 0.15,
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerRight: {
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
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    searchContainer: {
        flex: 1,
        height: 54,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    searchInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
    },
    searchBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
    },
    addButton: {
        width: 54,
        height: 54,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    addGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 24,
        paddingTop: 8,
        paddingBottom: 100,
        gap: 16,
    },
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        position: 'relative',
        borderRadius: 24,
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
    avatarContainer: {
        width: 52,
        height: 52,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 16,
    },
    avatarGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    metaBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    metaText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    studentDetail: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
    },
    studentSubDetail: {
        fontSize: 10,
        color: '#71717A',
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    emptyContainer: {
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#71717A',
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: '500',
    }
});
