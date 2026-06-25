import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, User, Mail, Phone, Calendar as CalendarIcon, BookOpen, ShieldCheck, UserCheck, Search, Users, Save, Fingerprint } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { Picker } from '@react-native-picker/picker';

import { useTheme } from '@/contexts/ThemeContext';

export default function StudentAdmissionScreen() {
    const router = useRouter();
    const { theme, isDark } = useTheme();
    const colors = Colors[theme];

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        classSection: '', // combined ID for now based on apiService.getClasses
        gender: 'Male',
        dateOfBirth: new Date().toISOString().split('T')[0],
    });

    const [classes, setClasses] = useState<any[]>([]);
    const [loadingClasses, setLoadingClasses] = useState(true);
    const [submitting, setSubmitting] = useState(false);

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
        const fetchClasses = async () => {
            try {
                const data = await apiService.getClasses();
                setClasses(data);
                if (data.length > 0) {
                    setForm(prev => ({ ...prev, classSection: `${data[0].classId}-${data[0].sectionId}` }));
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Matrix Error', 'Failed to synchronize academic nodes.');
            } finally {
                setLoadingClasses(false);
            }
        };
        fetchClasses();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const handleSave = async () => {
        if (!form.firstName || !form.lastName || !form.classSection) {
            Alert.alert('Incomplete Allocation', 'Identity Designation and Placement Node are mandatory.');
            return;
        }

        setSubmitting(true);
        try {
            const [classId, sectionId] = form.classSection.split('-').map(Number);
            const studentData = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                classId,
                sectionId,
                gender: form.gender,
                dateOfBirth: form.dateOfBirth
            };

            await apiService.createStudent(studentData);
            Alert.alert('Access Granted', 'New student registered onto the nexus.', [
                { text: 'ACKNOWLEDGE', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Transmission Failed', 'Failed to secure student registry. Verify uplink.');
        } finally {
            setSubmitting(false);
        }
    };

    const FormInput = ({ label, icon: Icon, placeholder, value, onChangeText, keyboardType = 'default', delay = 0 }: any) => (
        <Animated.View entering={FadeInUp.delay(delay).duration(800)} style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputWrapper}>
                <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                <Icon color={colors.subtitle} size={20} style={{ marginLeft: 16 }} />
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.subtitle}
                    value={value}
                    onChangeText={onChangeText}
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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Student Admission</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Initiate Registry</Text>
                </View>
                <View style={styles.headerRight}>
                    <User color={colors.primary} size={22} />
                    <View style={[styles.backBtnBg, { backgroundColor: isDark ? colors.primary + '15' : colors.surface, borderColor: colors.primary + '30', borderWidth: 1 }]} />
                </View>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Personal Section */}
                <Animated.View entering={FadeInDown.duration(800)}>
                    <View style={styles.formCard}>
                        <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.cardPadding}>
                            <View style={styles.sectionHeader}>
                                <UserCheck color={colors.primary} size={16} />
                                <Text style={styles.sectionLabel}>IDENTITY ATTRIBUTES</Text>
                            </View>

                            <FormInput
                                label="FIRST DESIGNATOR *"
                                icon={User}
                                placeholder="Enter first name"
                                value={form.firstName}
                                onChangeText={(txt: string) => setForm({ ...form, firstName: txt })}
                                delay={100}
                            />

                            <FormInput
                                label="SURNAME *"
                                icon={User}
                                placeholder="Enter surname"
                                value={form.lastName}
                                onChangeText={(txt: string) => setForm({ ...form, lastName: txt })}
                                delay={200}
                            />

                            <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>BIOLOGICAL GENDER</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                                        <Users color={colors.subtitle} size={20} style={{ marginLeft: 16 }} />
                                        <Picker
                                            selectedValue={form.gender}
                                            onValueChange={(itemValue) => setForm({ ...form, gender: itemValue })}
                                            style={[styles.pickerStyle, { color: colors.text }]}
                                            dropdownIconColor={colors.subtitle}
                                        >
                                            <Picker.Item label="Male" value="Male" color={isDark ? '#fff' : '#000'} />
                                            <Picker.Item label="Female" value="Female" color={isDark ? '#fff' : '#000'} />
                                            <Picker.Item label="Other" value="Other" color={isDark ? '#fff' : '#000'} />
                                        </Picker>
                                    </View>
                            </Animated.View>

                            <FormInput
                                label="INCEPTION DATE"
                                icon={CalendarIcon}
                                placeholder="YYYY-MM-DD"
                                value={form.dateOfBirth}
                                onChangeText={(txt: string) => setForm({ ...form, dateOfBirth: txt })}
                                delay={400}
                            />
                        </View>
                    </View>
                </Animated.View>

                {/* Academic Placement */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)}>
                    <View style={styles.formCard}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.cardPadding}>
                            <View style={styles.sectionHeader}>
                                <BookOpen color={colors.primary} size={16} />
                                <Text style={styles.sectionLabel}>ACADEMIC PLACEMENT</Text>
                            </View>

                                <View style={styles.inputGroup}>
                                    <Text style={[styles.inputLabel, { color: colors.subtitle }]}>TARGET NODE (CLASS) *</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[styles.cardInlay, { backgroundColor: colors.surface, borderRadius: 16 }]} />
                                        <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder, borderRadius: 16 }]} />
                                        <Search color={colors.subtitle} size={20} style={{ marginLeft: 16 }} />
                                        {loadingClasses ? (
                                            <ActivityIndicator size="small" color={colors.primary} style={{ marginLeft: 16 }} />
                                        ) : (
                                            <Picker
                                                selectedValue={form.classSection}
                                                onValueChange={(itemValue) => setForm({ ...form, classSection: itemValue })}
                                                style={[styles.pickerStyle, { color: colors.text }]}
                                                dropdownIconColor={colors.subtitle}
                                            >
                                                {classes.map((c) => (
                                                    <Picker.Item key={`${c.classId}-${c.sectionId}`} label={c.displayName} value={`${c.classId}-${c.sectionId}`} color={isDark ? '#fff' : '#000'} />
                                                ))}
                                            </Picker>
                                        )}
                                    </View>
                                </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Contact Area */}
                <Animated.View entering={FadeInDown.delay(400).duration(800)}>
                    <View style={styles.formCard}>
                                <View style={[styles.cardInlay, { backgroundColor: colors.cardBg }]} />
                                <View style={[styles.cardBorder, { borderColor: colors.surfaceBorder }]} />

                        <View style={styles.cardPadding}>
                            <View style={styles.sectionHeader}>
                                <ShieldCheck color={colors.primary} size={16} />
                                <Text style={styles.sectionLabel}>CONTACT MATRIX</Text>
                            </View>

                            <FormInput
                                label="COMMS LINK (EMAIL)"
                                icon={Mail}
                                placeholder="e.g. init@nexus.com"
                                value={form.email}
                                onChangeText={(txt: string) => setForm({ ...form, email: txt })}
                                keyboardType="email-address"
                                delay={100}
                            />

                            <FormInput
                                label="DIRECT VECTOR (PHONE)"
                                icon={Phone}
                                placeholder="e.g. +1234567890"
                                value={form.phone}
                                onChangeText={(txt: string) => setForm({ ...form, phone: txt })}
                                keyboardType="phone-pad"
                                delay={200}
                            />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(600).duration(800)}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSave}
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
                                <Text style={[styles.submitBtnText, { color: '#fff' }]}>AUTHORIZE ADMISSION</Text>
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
        marginLeft: 4,
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
