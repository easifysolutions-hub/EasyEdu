import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ChevronLeft, CreditCard, User, Hash, Calendar, Save, DollarSign, ChevronRight, AlertCircle } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { Picker } from '@react-native-picker/picker';

import { useTheme } from '@/contexts/ThemeContext';

export default function CollectPaymentScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme, isDark } = useTheme();
    const colors = Colors[theme];

    // Data from params
    const invoiceId = parseInt(params.invoiceId as string);
    const studentId = parseInt(params.studentId as string);
    const invoiceNumber = params.invoiceNumber as string;
    const studentName = params.studentName as string;
    const pendingAmount = parseFloat(params.pendingAmount as string);

    const [amountPaid, setAmountPaid] = useState(pendingAmount.toString());
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [submitting, setSubmitting] = useState(false);

    if (isNaN(invoiceId) || isNaN(studentId)) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: 40 }]}>
                <AlertCircle color="#EF4444" size={48} style={{ marginBottom: 16 }} />
                <Text style={[styles.headerTitle, { color: colors.text, textAlign: 'center' }]}>INVALID PROTOCOL</Text>
                <Text style={{ color: colors.subtitle, textAlign: 'center', marginTop: 12 }}>Initiate transmission from the Fees Matrix.</Text>
                <TouchableOpacity onPress={() => router.back()} style={[styles.submitBtn, { marginTop: 32, width: '100%' }]} activeOpacity={0.8}>
                    <Text style={styles.submitBtnText}>RETURN TO BASE</Text>
                </TouchableOpacity>
            </View>
        );
    }

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

    const handleCollect = async () => {
        const amount = parseFloat(amountPaid);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Allocation', 'Please enter a valid allocation greater than zero.');
            return;
        }

        if (amount > pendingAmount) {
            Alert.alert('Anomaly Detected', 'Allocation exceeds pending delta. Proceed?', [
                { text: 'ABORT', style: 'cancel' },
                { text: 'VERIFY', onPress: doCollect }
            ]);
        } else {
            doCollect();
        }
    };

    const doCollect = async () => {
        setSubmitting(true);
        try {
            await apiService.collectFee({
                studentId,
                invoiceId,
                amountPaid: parseFloat(amountPaid),
                paymentMode
            });
            Alert.alert('Protocol Secured', 'Transfer verified and logged.', [
                { text: 'ACKNOWLEDGE', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to synchronize. Please check network uplink.');
        } finally {
            setSubmitting(false);
        }
    };

    const InfoRow = ({ label, value, icon: Icon }: any) => (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <View style={[styles.cardInlay, { backgroundColor: colors.primary + '15', borderRadius: 12 }]} />
                <View style={[styles.cardBorder, { borderColor: colors.primary + '30', borderRadius: 12 }]} />
                <Icon color={colors.primary} size={18} style={{ opacity: 0.8 }} />
            </View>
            <View>
                <Text style={[styles.infoLabel, { color: colors.subtitle }]}>{label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Emerald Atmosphere */}
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

                <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                        <LinearGradient
                            colors={[colors.primary + '20', colors.primary + '05']}
                            style={styles.backBtnBg}
                        />
                        <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <ChevronLeft color={colors.primary} size={28} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Collect Transfer</Text>
                    <View style={styles.headerRight}>
                        <LinearGradient
                            colors={[colors.primary + '20', colors.primary + '05']}
                            style={styles.backBtnBg}
                        />
                        <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <CreditCard color={colors.primary} size={22} />
                    </View>
                </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.duration(800)}>
                    <View style={styles.summaryCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <Text style={styles.summaryTitle}>NODE SUMMARY</Text>
                        <InfoRow label="IDENTITY" value={studentName} icon={User} />
                        <InfoRow label="LEDGER REF" value={invoiceNumber} icon={Hash} />
                        <View style={{ marginTop: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.surfaceBorder }}>
                            <InfoRow label="PENDING DELTA" value={`$${pendingAmount.toFixed(2)}`} icon={DollarSign} />
                            <View style={{ marginTop: 12 }}>
                                <InfoRow 
                                    label="REMAINING BALANCE" 
                                    value={`$${Math.max(0, pendingAmount - (parseFloat(amountPaid) || 0)).toFixed(2)}`} 
                                    icon={Clock} 
                                />
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <View style={styles.formSection}>
                    <Animated.View entering={FadeInUp.delay(200).duration(800)}>
                        <Text style={styles.sectionLabel}>TRANSFER CONFIGURATION</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>ALLOCATION DELTA ($)</Text>
                        <View style={styles.inputWrapper}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                            <View style={[styles.cardBorder, { borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : colors.primary, borderRadius: 16 }]} />
                            <DollarSign color={colors.primary} size={20} style={{ marginLeft: 16 }} />
                            <TextInput
                                style={styles.input}
                                value={amountPaid}
                                onChangeText={setAmountPaid}
                                keyboardType="decimal-pad"
                                placeholder="0.00"
                                placeholderTextColor={colors.subtitle}
                            />
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>TRANSFER VECTOR</Text>
                        <View style={styles.pickerWrapper}>
                            <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                            <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                            <Picker
                                selectedValue={paymentMode}
                                onValueChange={(itemValue) => setPaymentMode(itemValue)}
                                style={{ color: colors.text, height: 60 }}
                                dropdownIconColor={colors.text}
                            >
                                <Picker.Item label="Cash" value="Cash" color={isDark ? '#fff' : '#000'} />
                                <Picker.Item label="Bank Transfer" value="Bank Transfer" color={isDark ? '#fff' : '#000'} />
                                <Picker.Item label="Cheque" value="Cheque" color={isDark ? '#fff' : '#000'} />
                                <Picker.Item label="Online" value="Online" color={isDark ? '#fff' : '#000'} />
                                <Picker.Item label="Other" value="Other" color={isDark ? '#fff' : '#000'} />
                            </Picker>
                        </View>
                    </Animated.View>
                </View>

                <Animated.View entering={FadeInUp.delay(600).duration(800)}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleCollect}
                        disabled={submitting}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            style={[styles.backBtnBg, { borderRadius: 20 }]}
                        />
                        <View style={[styles.cardBorder, { borderColor: colors.primary + '30', borderRadius: 20 }]} />
                        {submitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Save color="#fff" size={20} />
                                <Text style={[styles.submitBtnText, { color: '#fff' }]}>CONFIRM PROTOCOL</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </Animated.View>
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
        top: -150,
        right: -100,
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
    },
    cardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        borderColor: 'transparent',
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
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
    },
    summaryCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
    },
    summaryTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 16,
    },
    infoIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#A1A1AA',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '900',
        marginTop: 2,
        letterSpacing: -0.3,
    },
    formSection: {
        marginBottom: 30,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
        marginBottom: 20,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#A1A1AA',
        marginBottom: 8,
        marginLeft: 4,
        letterSpacing: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        position: 'relative',
    },
    input: {
        flex: 1,
        marginLeft: 12,
        marginRight: 16,
        fontSize: 20,
        fontWeight: '900',
        color: '#10B981',
        height: '100%',
    },
    pickerWrapper: {
        height: 60,
        justifyContent: 'center',
        position: 'relative',
    },
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        gap: 12,
        marginTop: 10,
        position: 'relative',
    },
    submitBtnText: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
