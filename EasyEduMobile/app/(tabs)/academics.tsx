import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeIn, useAnimatedStyle, withSpring, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { KeyboardAvoidingView } from 'react-native';
import { Book, FileText, ClipboardList, Award, Calendar, BookOpen, Library, GraduationCap, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

const ACADEMIC_MODULES = [
    { id: '1', name: 'Curriculum', icon: Book, color: '#10B981', count: 'Active', link: '/subjects' },
    { id: '2', name: 'Exams', icon: FileText, color: '#059669', count: 'Available', link: '/exams' },
    { id: '3', name: 'Study Hub', icon: ClipboardList, color: '#34D399', count: 'New Assets', link: '/study-materials?type=Assignment' },
    { id: '4', name: 'Syllabus', icon: GraduationCap, color: '#047857', count: 'Latest', link: '/study-materials?type=Syllabus' },
    { id: '5', name: 'Class Routine', icon: Calendar, color: '#6EE7B7', count: 'Live', link: '/routine' },
    { id: '6', name: 'Library', icon: Library, color: '#A7F3D0', count: 'Archive', link: '/library' },
    { id: '7', name: 'Merit', icon: Award, color: '#047857', count: 'Summary', link: '/report-cards' },
];

const ModuleCard = ({ item, index, colors, isDark, router }: any) => {
    const IconComponent = item.icon as any;
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View
            entering={FadeInUp.delay(200 + index * 100).duration(800)}
            style={[styles.moduleWrapper, animatedStyle]}
        >
            <TouchableOpacity
                style={styles.moduleCard}
                activeOpacity={0.8}
                onPressIn={() => scale.value = withSpring(0.92)}
                onPressOut={() => scale.value = withSpring(1)}
                onPress={() => item.link && router.push(item.link as any)}
            >
                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                <View style={[styles.iconBox, { backgroundColor: (isDark ? colors.primary : item.color) + '15' }]}>
                    <IconComponent color={isDark ? colors.primary : item.color} size={32} />
                </View>

                <Text style={[styles.moduleName, { color: colors.text }]}>{item.name}</Text>
                <View style={[styles.badge, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.moduleCount, { color: colors.primary }]}>{item.count}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

import { useTheme } from '@/contexts/ThemeContext';

export default function AcademicsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const glowValue = useSharedValue(0.15);

    React.useEffect(() => {
        glowValue.value = withRepeat(
            withSequence(
                withTiming(0.25, { duration: 3000 }),
                withTiming(0.15, { duration: 3000 })
            ),
            -1,
            true
        );
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <View style={styles.headerTop}>
                    <View style={styles.titleSection}>
                        <BookOpen color={colors.primary} size={28} />
                        <Text style={[styles.screenTitle, { color: colors.text }]}>Academic Core</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Zap color={colors.primary} size={22} />
                        <View style={[styles.headerIconBg, { backgroundColor: colors.surface }]} />
                    </View>
                </View>
                <Text style={[styles.subtitle, { color: colors.subtitle }]}>Manage institutional curriculum and assessments</Text>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {ACADEMIC_MODULES.map((item, index) => (
                        <ModuleCard
                            key={item.id}
                            item={item}
                            index={index}
                            colors={colors}
                            isDark={isDark}
                            router={router}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgGlow: {
        position: 'absolute',
        top: -100,
        left: -100,
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
        marginBottom: 12,
    },
    headerRight: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerIconBg: {
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
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 32,
        paddingBottom: 100,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    moduleWrapper: {
        width: '47%',
        marginBottom: 16,
    },
    moduleCard: {
        padding: 12,
        borderRadius: 24,
        alignItems: 'center',
        gap: 12,
        position: 'relative',
        minHeight: 140,
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
        borderWidth: 1.5,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moduleName: {
        fontSize: 13,
        fontWeight: '800',
        textAlign: 'center',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    moduleCount: {
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    }
});
