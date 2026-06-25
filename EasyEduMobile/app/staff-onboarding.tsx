import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, User, Mail, Phone, Calendar, Briefcase, Save, ShieldAlert, Fingerprint } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { Picker } from '@react-native-picker/picker';

import { useTheme } from '@/contexts/ThemeContext';

export default function StaffOnboardingScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Meta data
    const [departments, setDepartments] = useState<any[]>([]);
    const [designations, setDesignations] = useState<any[]>([]);

    // Form state
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: 'Male',
        dateOfBirth: '1990-01-01',
        departmentId: 0,
        designationId: 0
    });

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
        fetchMeta();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchMeta = async () => {
        try {
            const data = await apiService.getStaffMeta();
            setDepartments(data.departments);
            setDesignations(data.designations);

            if (data.departments.length > 0) handleInputChange('departmentId', data.departments[0].id);
            if (data.designations.length > 0) handleInputChange('designationId', data.designations[0].id);
        } catch (error) {
            console.error(error);
            Alert.alert('System Error', 'Failed to synchronize configuration matrix.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (name: string, value: any) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.firstName || !form.lastName || !form.email) {
            Alert.alert('Incomplete Allocation', 'Please populate required fields marked with (*).');
            return;
        }

        setSubmitting(true);
        try {
            await apiService.createStaff(form);
            Alert.alert('Access Granted', 'New personnel logged into the primary mainframe.', [
                { text: 'ACKNOWLEDGE', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Transmission Failed', 'Failed to secure personnel file.');
        } finally {
            setSubmitting(false);
        }
    };

    const FormInput = ({ label, value, onChangeText, placeholder, icon: Icon, required, keyboardType = 'default', delay }: any) => (
        <Animated.View entering={FadeInUp.delay(delay).duration(800)} style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
                {label} {required && <Text style={{ color: colors.primary }}>*</Text>}
            </Text>
            <View style={styles.inputWrapper}>
                <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                <Icon color={colors.subtitle} size={20} style={{ marginLeft: 16 }} />
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.subtitle}
                    keyboardType={keyboardType}
                />
            </View>
        </Animated.View>
    );

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </View>
        );
    }

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Staff Onboarding</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Initiate Personnel</Text>
                </View>
                <View style={styles.headerRight}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '05']}
                        style={styles.backBtnBg}
                    />
                    <View style={[styles.backBtnBg, { borderColor: colors.primary + '30', borderWidth: 1 }]} />
                    <Briefcase color={colors.primary} size={22} />
                </View>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.duration(800)}>
                    <View style={styles.formCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.cardPadding}>
                            <View style={styles.sectionHeader}>
                                <ShieldAlert color={colors.primary} size={16} />
                                <Text style={styles.sectionLabel}>BIOMETRIC LOG</Text>
                            </View>

                            <FormInput
                                label="FIRST DESIGNATOR"
                                value={form.firstName}
                                onChangeText={(v: string) => handleInputChange('firstName', v)}
                                placeholder="Enter first name"
                                icon={User}
                                required
                                delay={100}
                            />

                            <FormInput
                                label="SURNAME"
                                value={form.lastName}
                                onChangeText={(v: string) => handleInputChange('lastName', v)}
                                placeholder="Enter surname"
                                icon={User}
                                required
                                delay={200}
                            />

                            <FormInput
                                label="COMMS LINK (EMAIL)"
                                value={form.email}
                                onChangeText={(v: string) => handleInputChange('email', v)}
                                placeholder="e.g. operative@nexus.com"
                                icon={Mail}
                                required
                                keyboardType="email-address"
                                delay={300}
                            />

                            <FormInput
                                label="DIRECT VECTOR (PHONE)"
                                value={form.phone}
                                onChangeText={(v: string) => handleInputChange('phone', v)}
                                placeholder="Enter direct number"
                                icon={Phone}
                                keyboardType="phone-pad"
                                delay={400}
                            />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).duration(800)}>
                    <View style={styles.formCard}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.cardPadding}>
                            <View style={styles.sectionHeader}>
                                <Briefcase color={colors.primary} size={16} />
                                <Text style={styles.sectionLabel}>CLEARANCE & PLACEMENT</Text>
                            </View>

                                <View style={styles.inputGroup}>
                                    <Text style={[styles.inputLabel, { color: colors.subtitle }]}>SECTOR ALLOCATION (DEPT)</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                                        <Picker
                                            selectedValue={form.departmentId}
                                            onValueChange={(itemValue) => handleInputChange('departmentId', itemValue)}
                                            style={[styles.pickerStyle, { color: colors.text }]}
                                            dropdownIconColor={colors.subtitle}
                                        >
                                            {departments.map(d => (
                                                <Picker.Item key={d.id} label={d.name} value={d.id} color={isDark ? '#fff' : '#000'} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={[styles.inputLabel, { color: colors.subtitle }]}>OPERATIONAL RANK</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                                        <Picker
                                            selectedValue={form.designationId}
                                            onValueChange={(itemValue) => handleInputChange('designationId', itemValue)}
                                            style={[styles.pickerStyle, { color: colors.text }]}
                                            dropdownIconColor={colors.subtitle}
                                        >
                                            {designations.map(d => (
                                                <Picker.Item key={d.id} label={d.title} value={d.id} color={isDark ? '#fff' : '#000'} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(600).duration(800)}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
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
                                <Text style={[styles.submitBtnText, { color: '#fff' }]}>CONFIRM ASSIGNMENT</Text>
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 24,
    },
    cardPadding: {
        padding: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
    },
    inputGroup: {
        marginBottom: 20,
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
        fontSize: 15,
        fontWeight: '500',
        height: '100%',
    },
    pickerStyle: {
        height: '100%',
        width: '100%',
    },
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        gap: 12,
        position: 'relative',
        marginTop: 10,
    },
    submitBtnText: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
