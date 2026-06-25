import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, BookOpen, Download, FileText, Video, ClipboardList, Info, Search } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

const MaterialCard = ({ item, index, colors, isDark }: any) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    const handleDownload = () => {
        if (item.filePath) {
            const url = item.filePath.startsWith('http') ? item.filePath : `http://172.20.10.7:5004${item.filePath}`;
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }
    };

    const getIcon = () => {
        switch (item.type) {
            case 'Assignment': return <ClipboardList color={colors.primary} size={24} />;
            case 'Syllabus': return <BookOpen color={colors.primary} size={24} />;
            case 'Video': return <Video color={colors.primary} size={24} />;
            default: return <FileText color={colors.primary} size={24} />;
        }
    };

    return (
        <Animated.View entering={FadeInUp.delay(300 + Math.min(index, 10) * 100).duration(800)} style={animatedStyle}>
            <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.9}
                onPressIn={() => scale.value = withSpring(0.96)}
                onPressOut={() => scale.value = withSpring(1)}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                        {getIcon()}
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.subtitle, { color: colors.subtitle }]}>{item.subjectName} • {item.className}</Text>
                    </View>
                    <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                         <Download color={colors.primary} size={20} />
                         <View style={[styles.btnBg, { backgroundColor: colors.surface }]} />
                    </TouchableOpacity>
                </View>

                {item.description && (
                    <Text style={[styles.description, { color: colors.subtitle }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                )}

                <View style={styles.cardFooter}>
                    <Text style={[styles.date, { color: colors.subtitle }]}>Uploaded: {item.uploadDate}</Text>
                    <View style={[styles.badge, { backgroundColor: colors.primary + '10' }]}>
                        <Text style={[styles.badgeText, { color: colors.primary }]}>{item.fileExtension?.toUpperCase() || 'FILE'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function StudyMaterialsScreen() {
    const router = useRouter();
    const { type } = useLocalSearchParams();
    const { colors, isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState<any[]>([]);
    
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
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const data = await apiService.getStudyMaterials(type as string);
            setMaterials(data);
        } catch (error) {
            console.error('Failed to load materials:', error);
        } finally {
            setLoading(false);
        }
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const getScreenTitle = () => {
        if (!type || type === 'All') return 'Study Materials';
        return `${type} Hub`;
    };

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>{getScreenTitle()}</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Institutional Assets</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <BookOpen color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={materials}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <MaterialCard item={item} index={index} colors={colors} isDark={isDark} />}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <Info color={colors.subtitle} size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>
                                No {type?.toString().toLowerCase()} nodes available in the archive.
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
    card: {
        borderRadius: 24,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    cardInlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 1,
        borderRadius: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },
    downloadBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    btnBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 10,
    },
    description: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 16,
        fontWeight: '500',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    date: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
    }
});
