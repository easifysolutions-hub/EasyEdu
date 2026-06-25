import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Settings, Save, ArrowLeft, School, Mail, Phone, MapPin, Calendar, ShieldCheck, Sparkles, Database, Globe, HardDrive } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [academicYears, setAcademicYears] = useState<any[]>([]);

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
        fetchData();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, yData] = await Promise.all([
                apiService.getSettings(),
                apiService.getAcademicYears()
            ]);
            setSettings(sData || {});
            setAcademicYears(yData || []);
        } catch (error) {
            console.error('Error fetching terminal data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await apiService.updateSettings(settings);
            Alert.alert('Configuration Locked', 'Institutional core parameters updated successfully.');
        } catch (error) {
            Alert.alert('Protocol Error', 'Failed to commit settings to neural core.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <LinearGradient colors={[colors.primary + '20', colors.primary + '05']} style={styles.backBtnBg} />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <ArrowLeft color={colors.primary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Neural Terminal</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>CORE CONFIGURATION</Text>
                </View>
                <TouchableOpacity style={styles.headerRight} onPress={handleSave} disabled={saving}>
                    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.backBtnBg} />
                    {saving ? <ActivityIndicator color="#fff" size={20} /> : <Save color="#fff" size={20} />}
                </TouchableOpacity>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Institutional Core */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <School color={colors.primary} size={18} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>INSTITUTIONAL CORE</Text>
                    </View>

                    <View style={styles.formStack}>
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.subtitle }]}>INSTITUTION NAME</Text>
                            <View style={styles.inputWrapper}>
                                <View style={[styles.inputInlay, { backgroundColor: colors.surface }]} />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    value={settings.name}
                                    onChangeText={(text) => setSettings({ ...settings, name: text })}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.subtitle }]}>SECURE EMAIL ADDRESS</Text>
                            <View style={styles.inputWrapper}>
                                <View style={[styles.inputInlay, { backgroundColor: colors.surface }]} />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    value={settings.email}
                                    onChangeText={(text) => setSettings({ ...settings, email: text })}
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.subtitle }]}>UPLINK PHONE</Text>
                            <View style={styles.inputWrapper}>
                                <View style={[styles.inputInlay, { backgroundColor: colors.surface }]} />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    value={settings.phone}
                                    onChangeText={(text) => setSettings({ ...settings, phone: text })}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.subtitle }]}>GEOGRAPHIC COORDINATES</Text>
                            <View style={[styles.inputWrapper, { height: 100 }]}>
                                <View style={[styles.inputInlay, { backgroundColor: colors.surface, borderRadius: 20 }]} />
                                <TextInput
                                    style={[styles.input, { color: colors.text, textAlignVertical: 'top', paddingTop: 16 }]}
                                    value={settings.address}
                                    onChangeText={(text) => setSettings({ ...settings, address: text })}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Academic Matrix */}
                <Animated.View entering={FadeInDown.delay(400).duration(800)} style={[styles.section, { marginTop: 32 }]}>
                    <View style={styles.sectionHeader}>
                        <Calendar color={colors.secondary} size={18} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>ACADEMIC MATRIX</Text>
                    </View>

                    <View style={styles.yearsCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                        {academicYears.map((year, idx) => (
                            <View key={idx} style={[styles.yearRow, idx < academicYears.length - 1 && { borderBottomColor: colors.surfaceBorder, borderBottomWidth: 1 }]}>
                                <View>
                                    <Text style={[styles.yearName, { color: colors.text }]}>{year.name}</Text>
                                    <Text style={[styles.yearDates, { color: colors.subtitle }]}>
                                        {new Date(year.startDate).getFullYear()} - {new Date(year.endDate).getFullYear()}
                                    </Text>
                                </View>
                                {year.isCurrent && (
                                    <View style={[styles.activeBadge, { backgroundColor: colors.primary + '15' }]}>
                                        <ShieldCheck color={colors.primary} size={12} />
                                        <Text style={[styles.activeBadgeText, { color: colors.primary }]}>ACTIVE</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </Animated.View>

                {/* System Diagnostics */}
                <Animated.View entering={FadeInDown.delay(600).duration(800)} style={[styles.section, { marginTop: 32 }]}>
                    <View style={styles.sectionHeader}>
                        <Database color={colors.tertiary} size={18} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>SYSTEM DIAGNOSTICS</Text>
                    </View>

                    <View style={styles.diagnosticGrid}>
                        <View style={[styles.diagBox, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                            <HardDrive color={colors.subtitle} size={16} />
                            <Text style={[styles.diagText, { color: colors.subtitle }]}>DATABASE: <Text style={{ color: colors.text }}>CONNECTED</Text></Text>
                        </View>
                        <View style={[styles.diagBox, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                            <Globe color={colors.subtitle} size={16} />
                            <Text style={[styles.diagText, { color: colors.subtitle }]}>UPLINK: <Text style={{ color: colors.text }}>STABLE</Text></Text>
                        </View>
                    </View>
                </Animated.View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    bgGlow: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, opacity: 0.1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 20, borderBottomWidth: 1 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12 },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1, marginTop: 2 },
    headerRight: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    scrollContent: { padding: 24, paddingBottom: 60 },
    section: { gap: 16 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    sectionTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
    formStack: { gap: 20 },
    inputGroup: { gap: 8 },
    label: { fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
    inputWrapper: { height: 56, position: 'relative' },
    inputInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 },
    input: { flex: 1, paddingHorizontal: 20, fontSize: 14, fontWeight: '600' },
    yearsCard: { borderRadius: 24, overflow: 'hidden', position: 'relative' },
    cardInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    cardBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1 },
    yearRow: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    yearName: { fontSize: 16, fontWeight: '900' },
    yearDates: { fontSize: 12, fontWeight: '600', marginTop: 4 },
    activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
    activeBadgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    diagnosticGrid: { flexDirection: 'row', gap: 12 },
    diagBox: { flex: 1, height: 80, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
    diagText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 }
});
