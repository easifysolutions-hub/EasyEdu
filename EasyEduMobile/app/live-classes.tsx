import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Platform, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Video, Clock, Calendar, Fingerprint, ExternalLink, ShieldAlert, Radio } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function LiveClassesScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState<any[]>([]);

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
        loadLiveClasses();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const loadLiveClasses = async () => {
        try {
            const data = await apiService.getLiveClasses();
            setClasses(data);
        } catch (error) {
            console.error('Failed to load live classes', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinClass = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Error", "Your node doesn't know how to open this URL.");
            }
        } catch (error) {
            Alert.alert("Transmission Failed", "Unable to open Jitsi Meet portal.");
        }
    };

    const renderClassCard = ({ item, index }: { item: any, index: number }) => {
        return (
            <LiveClassCard
                item={item}
                index={index}
                colors={colors}
                onPress={() => handleJoinClass(item.url)}
            />
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Jitsi Portal</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Live Operations</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Radio color={colors.primary} size={22} />
                </View>
            </Animated.View>

            {loading ? (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={classes}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderClassCard}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ACTIVE SIGNALS</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>There are no virtual broadcasts transmitted for your clearance level today.</Text>
                        </Animated.View>
                    }
                />
            )}
        </View>
    );
}

const LiveClassCard = ({ item, index, colors, onPress }: any) => {
    const isLive = item.status.toLowerCase() === 'live';
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(800)} style={cardStyle}>
            <TouchableOpacity
                style={[styles.classCard, isLive ? { borderColor: colors.primary } : {}]}
                activeOpacity={1}
                onPressIn={() => scale.value = withSpring(0.98)}
                onPressOut={() => scale.value = withSpring(1)}
                onPress={onPress}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: isLive ? colors.primary + '40' : colors.surfaceBorder }]} />

                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <View style={[styles.iconBox, { backgroundColor: isLive ? colors.primary + '15' : colors.surface }]}>
                            <Video color={isLive ? colors.primary : colors.subtitle} size={24} />
                        </View>
                        {isLive && <View style={[styles.pulseDot, { backgroundColor: colors.primary, borderColor: colors.cardBg }]} />}
                    </View>
                    <View style={styles.headerText}>
                        <Text style={[styles.classSubject, { color: colors.primary }]}>{item.subjectName.toUpperCase()}</Text>
                        <Text style={[styles.classTopic, { color: colors.text }]}>{item.topic}</Text>
                    </View>
                </View>

                <View style={[styles.detailsSection, { borderTopColor: colors.surfaceBorder, backgroundColor: colors.surface }]}>
                    <View style={styles.detailRow}>
                        <Calendar color={colors.subtitle} size={14} />
                        <Text style={[styles.detailText, { color: colors.subtitle }]}>{item.date}</Text>
                    </View>
                    <View style={[styles.separator, { backgroundColor: colors.surfaceBorder }]} />
                    <View style={styles.detailRow}>
                        <Clock color={colors.subtitle} size={14} />
                        <Text style={[styles.detailText, { color: colors.subtitle }]}>{item.startTime} ({item.duration}M)</Text>
                    </View>
                </View>

                {item.password && (
                    <View style={styles.passwordPill}>
                        <ShieldAlert color="#F59E0B" size={12} />
                        <Text style={styles.passwordText}>PIN: {item.password}</Text>
                    </View>
                )}

                <LinearGradient
                    colors={isLive ? [colors.primary, colors.primary + 'dd'] : [colors.surface, colors.surface]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.joinButton}
                >
                    <Text style={[styles.joinText, { color: isLive ? '#fff' : colors.subtitle }]}>
                        {isLive ? 'INITIALIZE CONNECTION' : 'TRANSMISSION PENDING'}
                    </Text>
                    <ExternalLink color={isLive ? '#fff' : colors.subtitle} size={16} />
                </LinearGradient>
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
    listContent: {
        padding: 24,
        gap: 20,
        paddingBottom: 60,
    },
    classCard: {
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'transparent',
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
        borderRadius: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    iconContainer: {
        position: 'relative',
        marginRight: 16,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulseDot: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#09090B',
    },
    headerText: {
        flex: 1,
    },
    classSubject: {
        fontSize: 10,
        fontWeight: '900',
        color: '#10B981',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    classTopic: {
        fontSize: 17,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: -0.3,
    },
    detailsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        color: '#A1A1AA',
        fontSize: 12,
        fontWeight: '600',
    },
    separator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3F3F46',
        marginHorizontal: 12,
    },
    passwordPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        marginHorizontal: 20,
        marginBottom: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    passwordText: {
        color: '#F59E0B',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
    },
    joinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    joinText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1.5,
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
