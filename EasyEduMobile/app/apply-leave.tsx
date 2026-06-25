import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, withSpring } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft, Send, Calendar as CalendarIcon, FileText, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function ApplyLeaveScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [types, setTypes] = useState<any[]>([]);
    const [leaveTypeId, setLeaveTypeId] = useState<number>(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingTypes, setFetchingTypes] = useState(true);

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
        const fetchTypes = async () => {
            try {
                const data = await apiService.getLeaveTypes();
                setTypes(data);
                if (data && data.length > 0) {
                    setLeaveTypeId(data[0].id);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setFetchingTypes(false);
            }
        };
        fetchTypes();
    }, []);

    const handleSubmit = async () => {
        if (!fromDate || !toDate || !reason || leaveTypeId === 0) {
            alert("All parameters are required to initialize leave protocol.");
            return;
        }

        setLoading(true);
        try {
            await apiService.applyLeave({
                leaveTypeId,
                fromDate,
                toDate,
                reason
            });
            router.back();
        } catch (error) {
            console.error('Failed to submit leave', error);
            alert("Protocol transmission failed. Verify node status.");
        } finally {
            setLoading(false);
        }
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Leave Protocol</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Initiate Request</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <CalendarIcon color={colors.primary} size={22} />
                </View>
            </Animated.View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.formCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        {/* Leave Type Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>LEAVE CLASSIFICATION</Text>
                            <View style={styles.pickerWrapper}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                {fetchingTypes ? (
                                    <View style={{ padding: 16 }}>
                                        <ActivityIndicator size="small" color={colors.primary} />
                                    </View>
                                ) : (
                                    <>
                                        <Picker
                                            selectedValue={leaveTypeId}
                                            onValueChange={(itemValue) => setLeaveTypeId(itemValue)}
                                            style={[styles.picker, { color: colors.text }]}
                                            dropdownIconColor={colors.subtitle}
                                        >
                                            <Picker.Item label="Select Classification..." value={0} color={isDark ? '#fff' : '#000'} />
                                            {types.map((t: any) => (
                                                <Picker.Item key={t.id} label={t.name} value={t.id} color={isDark ? '#fff' : '#000'} />
                                            ))}
                                        </Picker>
                                        {Platform.OS === 'ios' && (
                                            <View style={styles.pickerIcon}>
                                                <ChevronDown color={colors.subtitle} size={20} />
                                            </View>
                                        )}
                                    </>
                                )}
                            </View>
                        </View>

                        {/* From Date Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>START DATE (YYYY-MM-DD)</Text>
                            <View style={styles.inputWrapper}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                <CalendarIcon color={colors.primary} size={20} style={styles.inputIcon} />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="2026-03-20"
                                    placeholderTextColor={colors.subtitle}
                                    value={fromDate}
                                    onChangeText={setFromDate}
                                />
                            </View>
                        </View>

                        {/* To Date Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>END DATE (YYYY-MM-DD)</Text>
                            <View style={styles.inputWrapper}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                <CalendarIcon color={colors.primary} size={20} style={styles.inputIcon} />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="2026-03-25"
                                    placeholderTextColor={colors.subtitle}
                                    value={toDate}
                                    onChangeText={setToDate}
                                />
                            </View>
                        </View>

                        {/* Reason Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>OBJECTIVE / REASON</Text>
                            <View style={[styles.inputWrapper, { height: 120, alignItems: 'flex-start', paddingTop: 16 }]}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.surface }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />
                                <FileText color={colors.primary} size={20} style={[styles.inputIcon, { marginTop: 2 }]} />
                                <TextInput
                                    style={[styles.input, { height: 88, textAlignVertical: 'top', color: colors.text }]}
                                    placeholder="State purpose of absence..."
                                    placeholderTextColor={colors.subtitle}
                                    multiline
                                    value={reason}
                                    onChangeText={setReason}
                                />
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(800)}>
                        <TouchableOpacity
                            style={styles.submitBtnWrapper}
                            activeOpacity={0.8}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submitButton}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Text style={styles.submitButtonText}>TRANSMIT PROTOCOL</Text>
                                        <Send color="#fff" size={20} />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
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
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
    },
    formCard: {
        padding: 24,
        borderRadius: 24,
        marginBottom: 24,
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
        borderWidth: 1,
        borderRadius: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 10,
        color: '#A1A1AA',
        fontWeight: '900',
        letterSpacing: 1.5,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
        position: 'relative',
    },
    pickerWrapper: {
        height: 56,
        justifyContent: 'center',
        position: 'relative',
        ...Platform.select({
            ios: { paddingHorizontal: 16 }
        })
    },
    picker: {
        height: 56,
        ...Platform.select({
            android: { marginLeft: 8 }
        })
    },
    pickerIcon: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
    },
    submitBtnWrapper: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    submitButton: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
