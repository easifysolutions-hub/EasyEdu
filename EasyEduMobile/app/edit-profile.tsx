import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, Layout, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, User, Phone, CheckCircle, Save } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';

import { useTheme } from '@/contexts/ThemeContext';

export default function EditProfileScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await apiService.getProfile();
            setFullName(data.fullName || '');
            setPhoneNumber(data.phoneNumber || '');
        } catch (error) {
            console.error('Failed to load profile for editing', error);
            Alert.alert('Error', 'Could not access identity matrix. Please retry.');
        } finally {
            setLoading(false);
        }
    };

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const handleUpdate = async () => {
        if (!fullName.trim()) {
            Alert.alert('Validation Error', 'Identity Designation (Full Name) is required.');
            return;
        }

        setSubmitting(true);
        try {
            await apiService.updateProfile({ fullName, phoneNumber });
            Alert.alert('Protocol Secured', 'Identity attributes updated successfully.', [
                { text: 'ACKNOWLEDGE', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Update failed', error);
            Alert.alert('Anomaly Detected', 'Update protocol failed. Please verify uplink.');
        } finally {
            setSubmitting(false);
        }
    };

    const FormInput = ({ label, value, onChangeText, placeholder, icon: Icon, keyboardType = 'default', delay }: any) => (
        <Animated.View entering={FadeInUp.delay(delay).duration(800)} style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{label}</Text>
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Modify Identity</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Parameter Override</Text>
                </View>
                <View style={styles.headerRight}>
                    <User color={colors.primary} size={22} />
                    <View style={[styles.backBtnBg, { backgroundColor: colors.surface }]} />
                </View>
            </Animated.View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <Animated.View entering={FadeInDown.duration(800)}>
                            <View style={styles.formCard}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                                <View style={styles.cardPadding}>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionLabel}>CORE ATTRIBUTES</Text>
                                    </View>

                                    <FormInput
                                        label="IDENTITY DESIGNATION (FULL NAME)"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        placeholder="Enter designation"
                                        icon={User}
                                        delay={100}
                                    />

                                    <FormInput
                                        label="COMMS VECTOR (PHONE)"
                                        value={phoneNumber}
                                        onChangeText={setPhoneNumber}
                                        placeholder="Enter comms vector"
                                        icon={Phone}
                                        keyboardType="phone-pad"
                                        delay={200}
                                    />
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(500).duration(800)}>
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={handleUpdate}
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
                                        <Text style={styles.submitBtnText}>OVERRIDE PARAMETERS</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
    },
    formCard: {
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 32,
    },
    cardPadding: {
        padding: 24,
    },
    sectionHeader: {
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#71717A',
        letterSpacing: 1.5,
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
        fontSize: 15,
        fontWeight: '500',
        height: '100%',
    },
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        gap: 12,
        position: 'relative',
    },
    submitBtnText: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    }
});
