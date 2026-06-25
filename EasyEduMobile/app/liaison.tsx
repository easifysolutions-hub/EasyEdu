import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { MessageSquare, Send, History, Smartphone, Mail, ArrowLeft, ShieldCheck, Sparkles, Filter } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

export default function LiaisonScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [type, setType] = useState('SMS');
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<any[]>([]);
    const [view, setView] = useState<'send' | 'logs'>('send');

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
        fetchLogs();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchLogs = async () => {
        try {
            const data = await apiService.getMessageLogs();
            setLogs(data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const handleSend = async () => {
        if (!recipient || !body) {
            Alert.alert('Protocol Error', 'Recipient and Message body are required for uplink.');
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.sendMessage({ type, recipient, subject, body });
            if (response.success) {
                Alert.alert('Transmission Successful', 'Message dispatched through institutional channels.');
                setRecipient('');
                setSubject('');
                setBody('');
                fetchLogs();
            }
        } catch (error) {
            Alert.alert('Transmission Failure', 'Failed to establish message link.');
        } finally {
            setLoading(false);
        }
    };

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
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Liaison Protocol</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>COMMUNICATION MATRIX</Text>
                </View>
                <TouchableOpacity style={styles.headerRight} onPress={() => setView(view === 'send' ? 'logs' : 'send')}>
                    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.backBtnBg} />
                    {view === 'send' ? <History color="#fff" size={22} /> : <Send color="#fff" size={20} />}
                </TouchableOpacity>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {view === 'send' ? (
                    <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.section}>
                        <View style={styles.typeSelector}>
                            <TouchableOpacity 
                                style={[styles.typeBtn, type === 'SMS' && { backgroundColor: colors.primary + '15', borderColor: colors.primary }]} 
                                onPress={() => setType('SMS')}
                            >
                                <Smartphone color={type === 'SMS' ? colors.primary : colors.subtitle} size={18} />
                                <Text style={[styles.typeText, { color: type === 'SMS' ? colors.primary : colors.subtitle }]}>SMS TRANSMIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.typeBtn, type === 'Email' && { backgroundColor: colors.primary + '15', borderColor: colors.primary }]} 
                                onPress={() => setType('Email')}
                            >
                                <Mail color={type === 'Email' ? colors.primary : colors.subtitle} size={18} />
                                <Text style={[styles.typeText, { color: type === 'Email' ? colors.primary : colors.subtitle }]}>EMAIL RELAY</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formStack}>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>RECIPIENT VECTOR</Text>
                                <View style={styles.inputWrapper}>
                                    <View style={[styles.inputInlay, { backgroundColor: colors.surface }]} />
                                    <View style={[styles.inputBorder, { borderColor: colors.surfaceBorder }]} />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Phone or Identity Vector..."
                                        placeholderTextColor={colors.subtitle}
                                        value={recipient}
                                        onChangeText={setRecipient}
                                    />
                                </View>
                            </View>

                            {type === 'Email' && (
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>PROTOCOL SUBJECT</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[styles.inputInlay, { backgroundColor: colors.surface }]} />
                                        <View style={[styles.inputBorder, { borderColor: colors.surfaceBorder }]} />
                                        <TextInput
                                            style={[styles.input, { color: colors.text }]}
                                            placeholder="Transmission header..."
                                            placeholderTextColor={colors.subtitle}
                                            value={subject}
                                            onChangeText={setSubject}
                                        />
                                    </View>
                                </View>
                            )}

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>MESSAGE PAYLOAD</Text>
                                <View style={[styles.inputWrapper, { height: 160 }]}>
                                    <View style={[styles.inputInlay, { backgroundColor: colors.surface, borderRadius: 20 }]} />
                                    <View style={[styles.inputBorder, { borderColor: colors.surfaceBorder, borderRadius: 20 }]} />
                                    <TextInput
                                        style={[styles.input, { color: colors.text, textAlignVertical: 'top', paddingTop: 16 }]}
                                        placeholder="Enter institutional communiqué..."
                                        placeholderTextColor={colors.subtitle}
                                        value={body}
                                        onChangeText={setBody}
                                        multiline
                                    />
                                </View>
                            </View>

                            <TouchableOpacity 
                                style={styles.sendBtn} 
                                activeOpacity={0.8}
                                onPress={handleSend}
                                disabled={loading}
                            >
                                <LinearGradient colors={[colors.primary, colors.secondary]} start={{ x:0, y:0 }} end={{ x:1, y:0 }} style={styles.sendBtnGradient}>
                                    {loading ? <ActivityIndicator color="#fff" /> : (
                                        <>
                                            <Text style={styles.sendBtnText}>DISPATCH TRANSMISSION</Text>
                                            <ShieldCheck color="#fff" size={20} />
                                        </>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.logsList}>
                        {logs.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Sparkles color={colors.subtitle} size={40} opacity={0.3} />
                                <Text style={[styles.emptyText, { color: colors.subtitle }]}>NO RECENT TRANSMISSIONS</Text>
                            </View>
                        ) : (
                            logs.map((log, idx) => (
                                <View key={idx} style={styles.logCard}>
                                    <View style={[styles.logInlay, { backgroundColor: colors.cardBg }]} />
                                    <View style={[styles.logBorder, { borderColor: colors.surfaceBorder }]} />
                                    <View style={styles.logHeader}>
                                        <View style={[styles.typeIndicator, { backgroundColor: log.type === 'SMS' ? colors.primary : colors.secondary }]}>
                                            <Text style={styles.typeIndicatorText}>{log.type}</Text>
                                        </View>
                                        <Text style={[styles.logTime, { color: colors.subtitle }]}>{new Date(log.sentAt).toLocaleString()}</Text>
                                    </View>
                                    <Text style={[styles.logRecipient, { color: colors.text }]}>TO: {log.recipient}</Text>
                                    <Text style={[styles.logBody, { color: colors.subtitle }]} numberOfLines={2}>{log.body}</Text>
                                    <View style={styles.logStatus}>
                                        <ShieldCheck color={colors.primary} size={12} />
                                        <Text style={[styles.statusText, { color: colors.primary }]}>{log.status}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </Animated.View>
                )}
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
    typeSelector: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    typeBtn: { flex: 1, height: 54, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
    typeText: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    formStack: { gap: 24 },
    inputGroup: { gap: 8 },
    label: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
    inputWrapper: { height: 56, position: 'relative' },
    inputInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 },
    inputBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16, borderWidth: 1 },
    input: { flex: 1, paddingHorizontal: 20, fontSize: 14, fontWeight: '600' },
    sendBtn: { marginTop: 12, borderRadius: 20, overflow: 'hidden', height: 70 },
    sendBtnGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
    sendBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },
    logsList: { gap: 16 },
    logCard: { padding: 20, borderRadius: 24, position: 'relative', overflow: 'hidden' },
    logInlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    logBorder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24, borderWidth: 1 },
    logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    typeIndicator: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    typeIndicatorText: { color: '#fff', fontSize: 9, fontWeight: '900' },
    logTime: { fontSize: 10, fontWeight: '600' },
    logRecipient: { fontSize: 14, fontWeight: '900', marginBottom: 6 },
    logBody: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
    logStatus: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statusText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
    emptyState: { paddingVertical: 100, alignItems: 'center', gap: 16 },
    emptyText: { fontSize: 12, fontWeight: '900', letterSpacing: 1, opacity: 0.5 }
});
