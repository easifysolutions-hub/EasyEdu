import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle, Save, Fingerprint, Users, Calendar } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function AttendanceScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 

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
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const data = await apiService.getClasses();
            setClasses(data);
            if (data && data.length > 0) {
                handleClassSelect(data[0]);
            }
        } catch (error) {
            console.error('Failed to load classes', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassSelect = async (classItem: any) => {
        setSelectedClass(classItem);
        setLoading(true);
        try {
            const data = await apiService.getStudentsForAttendance(classItem.classId, classItem.sectionId, date);
            setStudents(data);
        } catch (error) {
            console.error('Failed to load students for attendance', error);
        } finally {
            setLoading(false);
        }
    };

    const markStudent = (studentId: number, status: string) => {
        setStudents(current =>
            current.map(s => s.id === studentId ? { ...s, status } : s)
        );
    };

    const markAll = (status: string) => {
        setStudents(current =>
            current.map(s => ({ ...s, status }))
        );
    };

    const submitAttendance = async () => {
        if (!selectedClass) return;

        const unmarked = students.filter(s => s.status === 'Not Marked');
        if (unmarked.length > 0) {
            Alert.alert('Incomplete Protocol', `Acknowledge all entities. ${unmarked.length} remaining.`);
            return;
        }

        setSubmitting(true);
        try {
            const attendances = students.map(s => ({
                studentId: s.id,
                status: s.status
            }));

            await apiService.markAttendance(selectedClass.classId, selectedClass.sectionId, date, attendances);
            Alert.alert('Protocol Secured', 'Attendance records synchronized.');
            router.back();
        } catch (error) {
            console.error('Submission failed', error);
            Alert.alert('Error', 'Failed to save attendance. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const StatusButton = ({ student, type, icon: Icon, color, label }: any) => {
        const isSelected = student.status === type;
        const scale = useSharedValue(1);
        
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }]
        }));

        const handlePressIn = () => { scale.value = withSpring(0.92); };
        const handlePressOut = () => { scale.value = withSpring(1); };

        return (
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                <TouchableOpacity
                    style={[
                        styles.statusBtn,
                        isSelected ? { backgroundColor: color, borderColor: color } : { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }
                    ]}
                    onPress={() => markStudent(student.id, type)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.9}
                >
                    <Icon color={isSelected ? '#fff' : color} size={14} />
                    <Text style={[styles.statusBtnText, { color: isSelected ? '#fff' : colors.subtitle }, isSelected && { fontWeight: '800' }]}>{label}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const StudentAttendanceCard = ({ item, index }: any) => {
        const scale = useSharedValue(1);
        const cardStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }]
        }));

        return (
            <Animated.View entering={FadeInUp.delay(300 + Math.min(index, 10) * 100).duration(800)} layout={Layout.springify()}>
                <TouchableOpacity activeOpacity={1} onPressIn={() => scale.value = withSpring(0.98)} onPressOut={() => scale.value = withSpring(1)}>
                    <Animated.View style={[styles.studentCard, cardStyle]}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.studentInfo}>
                            <View style={[styles.avatar, { backgroundColor: colors.primary + '15' }]}>
                                <Text style={{ color: colors.primary, fontWeight: '900', fontSize: 16 }}>{item.name[0]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.studentName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                                <Text style={[styles.studentRoll, { color: colors.subtitle }]}>Matrix ID: {item.roll}</Text>
                            </View>
                        </View>

                        <View style={styles.statusButtons}>
                            <StatusButton student={item} type="Present" icon={CheckCircle} color={colors.primary} label="ACT" />
                            <StatusButton student={item} type="Absent" icon={XCircle} color={colors.error} label="NUL" />
                            <StatusButton student={item} type="Late" icon={Clock} color={colors.accent} label="DLY" />
                            <StatusButton student={item} type="HalfDay" icon={AlertCircle} color={colors.secondary} label="HLF" />
                        </View>
                    </Animated.View>
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Roll Call Matrix</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>{new Date(date).toDateString()}</Text>
                </View>
                <TouchableOpacity 
                    onPress={submitAttendance} 
                    disabled={submitting || loading || students.length === 0} 
                    style={styles.headerRight} 
                    activeOpacity={0.7}
                >
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        style={styles.backBtnBg}
                    />
                    {submitting ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Save color="#fff" size={24} />
                    )}
                </TouchableOpacity>
            </Animated.View>

            {/* Class Selector */}
            <Animated.View entering={FadeInDown.duration(800)} style={styles.classSelectorContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={classes}
                    keyExtractor={(item) => `${item.classId}-${item.sectionId}`}
                    contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
                    renderItem={({ item }) => {
                        const isSelected = selectedClass?.classId === item.classId && selectedClass?.sectionId === item.sectionId;
                        return (
                            <TouchableOpacity
                                style={[
                                    styles.classTab,
                                    { backgroundColor: isSelected ? colors.primary : colors.surface }
                                ]}
                                onPress={() => handleClassSelect(item)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.classTabText, { color: isSelected ? '#fff' : colors.subtitle }, isSelected && { fontWeight: '900', letterSpacing: 0.5 }]}>
                                    {item.displayName}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </Animated.View>

            {/* Quick Actions */}
            {students.length > 0 && !loading && (
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.quickActions}>
                    <TouchableOpacity style={[styles.quickActionBtn, { backgroundColor: colors.primary + '15' }]} onPress={() => markAll('Present')} activeOpacity={0.7}>
                        <CheckCircle color={colors.primary} size={16} />
                        <Text style={[styles.quickActionTextP, { color: colors.primary }]}>MARK ALL ACTIVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.quickActionBtn, { backgroundColor: colors.error + '15' }]} onPress={() => markAll('Absent')} activeOpacity={0.7}>
                        <XCircle color={colors.error} size={16} />
                        <Text style={[styles.quickActionTextA, { color: colors.error }]}>MARK ALL NULL</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Students List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <StudentAttendanceCard item={item} index={index} />
                    )}
                    ListEmptyComponent={
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: colors.surface }]}>
                                <Fingerprint color={colors.subtitle} size={40} style={{ opacity: 0.5 }} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 50 }]} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>NO ENTITIES</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>Node repository is empty for this sector.</Text>
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
    saveBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginRight: 8,
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
    classSelectorContainer: {
        paddingVertical: 20,
        paddingBottom: 16,
    },
    classTab: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
    },
    classTabText: {
        fontWeight: '700',
        fontSize: 13,
    },
    quickActions: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 12,
    },
    quickActionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 16,
    },
    quickActionTextP: {
        color: '#10B981',
        fontWeight: '900',
        marginLeft: 6,
        fontSize: 11,
        letterSpacing: 0.5,
    },
    quickActionTextA: {
        color: '#EF4444',
        fontWeight: '900',
        marginLeft: 6,
        fontSize: 11,
        letterSpacing: 0.5,
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
    studentCard: {
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
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.3,
    },
    studentRoll: {
        fontSize: 12,
        color: '#A1A1AA',
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    statusBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        gap: 6,
    },
    statusBtnText: {
        fontSize: 10,
        fontWeight: '700',
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
