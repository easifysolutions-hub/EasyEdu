import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowUpCircle, ArrowLeft, Users, ChevronRight, CheckCircle2, ShieldAlert, Zap, LayoutGrid } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function PromoteStudentsScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const [loading, setLoading] = useState(true);
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [students, setStudents] = useState<any[]>([
        { id: 1, name: 'Sharief M. A', currentClass: '10-A', rank: 'Distinction', gpa: '3.9' },
        { id: 2, name: 'Alice Thorne', currentClass: '10-A', rank: 'First Class', gpa: '3.7' },
        { id: 3, name: 'Bob Roberts', currentClass: '10-A', rank: 'Second Class', gpa: '2.8' },
        { id: 4, name: 'Charlie Dean', currentClass: '10-A', rank: 'Distinction', gpa: '4.0' },
    ]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const toggleSelect = (id: number) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter(sid => sid !== id));
        } else {
            setSelectedStudents([...selectedStudents, id]);
        }
    };

    const handlePromote = () => {
        if (selectedStudents.length === 0) {
            Alert.alert('Protocol Error', 'No academic units selected for promotion.');
            return;
        }
        Alert.alert('Academic Transition', `Promoting ${selectedStudents.length} students to the next level. Confirm transition?`, [
            { text: 'ABORT', style: 'cancel' },
            { text: 'INITIATE', onPress: () => {
                Alert.alert('Success', 'Academic migration complete. Students moved to new grade.');
                setSelectedStudents([]);
            }}
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <LinearGradient colors={[colors.primary + '20', colors.primary + '05']} style={styles.backBtnBg} />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <ArrowLeft color={colors.primary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Academic Transition</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>STUDENT PROMOTION PROTOCOL</Text>
                </View>
                <TouchableOpacity onPress={handlePromote} style={styles.headerRight}>
                    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.backBtnBg} />
                    <Zap color="#fff" size={20} />
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.statsRow}>
                <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.statLabel, { color: colors.subtitle }]}>SELECTED</Text>
                    <Text style={[styles.statValue, { color: colors.primary }]}>{selectedStudents.length}</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.statLabel, { color: colors.subtitle }]}>TOTAL NODES</Text>
                    <Text style={[styles.statValue, { color: colors.text }]}>{students.length}</Text>
                </View>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => {
                        const isSelected = selectedStudents.includes(item.id);
                        return (
                            <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(800)}>
                                <TouchableOpacity 
                                    activeOpacity={0.9} 
                                    onPress={() => toggleSelect(item.id)}
                                    style={[styles.card, { borderColor: isSelected ? colors.primary : colors.surfaceBorder }]}
                                >
                                    <View style={[styles.cardInlay, { backgroundColor: isSelected ? colors.primary + '05' : colors.cardBg }]} />
                                    
                                    <View style={[styles.selectionCircle, { borderColor: isSelected ? colors.primary : colors.subtitle }]}>
                                        {isSelected && <View style={[styles.selectionFill, { backgroundColor: colors.primary }]} />}
                                    </View>

                                    <View style={styles.cardInfo}>
                                        <Text style={[styles.nameText, { color: colors.text }]}>{item.name}</Text>
                                        <Text style={[styles.classText, { color: colors.subtitle }]}>Level: {item.currentClass} • GPA: {item.gpa}</Text>
                                    </View>

                                    <View style={[styles.rankBadge, { backgroundColor: colors.primary + '10' }]}>
                                        <Text style={[styles.rankText, { color: colors.primary }]}>{item.rank}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    }}
                />
            )}

            {/* Bottom Action Bar */}
            <Animated.View entering={FadeInDown.delay(600)} style={[styles.bottomBar, { borderTopColor: colors.surfaceBorder, backgroundColor: colors.surface }]}>
                <Text style={[styles.selectionInfo, { color: colors.subtitle }]}>Select students in good academic standing for migration.</Text>
                <TouchableOpacity 
                    style={[styles.promoteMainBtn, { backgroundColor: colors.primary }]}
                    onPress={handlePromote}
                >
                    <ArrowUpCircle color="#fff" size={20} />
                    <Text style={styles.promoteBtnText}>COMMENCE PROMOTION</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 20, borderBottomWidth: 1 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12 },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1, marginTop: 2 },
    headerRight: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    statsRow: { flexDirection: 'row', padding: 24, gap: 12 },
    statBox: { flex: 1, padding: 16, borderRadius: 20, alignItems: 'center' },
    statLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
    statValue: { fontSize: 22, fontWeight: '900' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { paddingHorizontal: 24, paddingBottom: 120 },
    card: { flexDirection: 'row', alignItems: 'center', borderRadius: 24, marginBottom: 16, padding: 20, borderWidth: 1.5, position: 'relative', overflow: 'hidden' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    selectionCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, marginRight: 16, justifyContent: 'center', alignItems: 'center' },
    selectionFill: { width: 12, height: 12, borderRadius: 6 },
    cardInfo: { flex: 1 },
    nameText: { fontSize: 16, fontWeight: '900', letterSpacing: -0.3 },
    classText: { fontSize: 12, fontWeight: '600', marginTop: 2 },
    rankBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    rankText: { fontSize: 9, fontWeight: '900' },
    bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, borderTopWidth: 1 },
    selectionInfo: { fontSize: 11, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
    promoteMainBtn: { height: 60, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
    promoteBtnText: { color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 0.5 }
});
