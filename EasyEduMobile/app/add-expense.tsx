import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ChevronLeft, Save, FileText, DollarSign, Tag, CreditCard, Hash } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { Picker } from '@react-native-picker/picker';

const CATEGORIES = ['General', 'Electricity', 'Rent', 'Supplies', 'Maintenance', 'Salaries', 'Transport', 'Marketing'];
const METHODS = ['Cash', 'Bank', 'Cheque', 'Online'];

import { useTheme } from '@/contexts/ThemeContext';

export default function AddExpenseScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        amount: '',
        category: 'General',
        paymentMethod: 'Cash',
        referenceNumber: ''
    });

    const glowValue = useSharedValue(0.4);

    React.useEffect(() => {
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

    const handleInputChange = (name: string, value: any) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.title || !form.amount || parseFloat(form.amount) <= 0) {
            Alert.alert('Validation Error', 'Valid identity and allocation required.');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...form,
                amount: parseFloat(form.amount)
            };
            await apiService.createExpense(payload);
            Alert.alert('Protocol Secured', 'Outflow recorded in ledger.', [
                { text: 'ACKNOWLEDGE', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to synchronize with ledger.');
        } finally {
            setSubmitting(false);
        }
    };

    const FormInput = ({ label, value, onChangeText, placeholder, icon: Icon, keyboardType = 'default', multiline = false, delay }: any) => (
        <Animated.View entering={FadeInUp.delay(delay).duration(800)} style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={[styles.inputWrapper, multiline && { height: 120, alignItems: 'flex-start', paddingTop: 16 }]}>
                <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                <Icon color={colors.subtitle} size={20} style={[multiline && { marginTop: 2 }, { marginLeft: 16 }]} />
                <TextInput
                    style={[styles.input, { color: colors.text }, multiline && { height: 100, textAlignVertical: 'top' }]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.subtitle}
                    keyboardType={keyboardType}
                    multiline={multiline}
                />
            </View>
        </Animated.View>
    );

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
                    <ChevronLeft color={colors.primary} size={28} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Initialize Outflow</Text>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <DollarSign color={colors.primary} size={24} />
                </View>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <FormInput
                    label="NODE IDENTITY"
                    value={form.title}
                    onChangeText={(v: string) => handleInputChange('title', v)}
                    placeholder="e.g. Server Maintenance"
                    icon={FileText}
                    delay={100}
                />

                <FormInput
                    label="ALLOCATION ($)"
                    value={form.amount}
                    onChangeText={(v: string) => handleInputChange('amount', v)}
                    placeholder="0.00"
                    icon={DollarSign}
                    keyboardType="numeric"
                    delay={200}
                />

                <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>CLASSIFICATION</Text>
                    <View style={styles.pickerWrapper}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                        <Picker
                            selectedValue={form.category}
                            onValueChange={(v) => handleInputChange('category', v)}
                            style={{ color: colors.text, height: 60 }}
                            dropdownIconColor={colors.text}
                        >
                            {CATEGORIES.map(c => <Picker.Item key={c} label={c} value={c} color={isDark ? '#fff' : '#000'} />)}
                        </Picker>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>TRANSFER VECTOR</Text>
                    <View style={styles.pickerWrapper}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                        <Picker
                            selectedValue={form.paymentMethod}
                            onValueChange={(v) => handleInputChange('paymentMethod', v)}
                            style={{ color: colors.text, height: 60 }}
                            dropdownIconColor={colors.text}
                        >
                            {METHODS.map(m => <Picker.Item key={m} label={m} value={m} color={isDark ? '#fff' : '#000'} />)}
                        </Picker>
                    </View>
                </Animated.View>

                <FormInput
                    label="REFERENCE HASH"
                    value={form.referenceNumber}
                    onChangeText={(v: string) => handleInputChange('referenceNumber', v)}
                    placeholder="Optional TXID"
                    icon={Hash}
                    delay={500}
                />

                <FormInput
                    label="METADATA"
                    value={form.description}
                    onChangeText={(v: string) => handleInputChange('description', v)}
                    placeholder="Additional parameters..."
                    icon={Tag}
                    multiline
                    delay={600}
                />

                <Animated.View entering={FadeInUp.delay(700).duration(800)}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
                        disabled={submitting}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.cardInlay, { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderRadius: 20 }]} />
                        <View style={[styles.cardBorder, { borderColor: 'rgba(16, 185, 129, 0.3)', borderRadius: 20 }]} />

                        {submitting ? (
                            <ActivityIndicator color={colors.primary} />
                        ) : (
                            <>
                                <Save color={colors.primary} size={20} />
                                <Text style={styles.submitBtnText}>COMMIT LEDGER ENTRY</Text>
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
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#71717A',
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
        fontSize: 15,
        fontWeight: '500',
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
        marginTop: 16,
        marginBottom: 40,
        position: 'relative',
    },
    submitBtnText: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
