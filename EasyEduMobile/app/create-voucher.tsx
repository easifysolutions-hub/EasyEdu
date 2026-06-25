import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator, TouchableOpacity, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ArrowLeft, Save, Plus, Trash2, FileText, Fingerprint, RefreshCcw, ArrowUpDown } from 'lucide-react-native';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

export default function CreateVoucherScreen() {
    const router = useRouter();
    const { theme, isDark, colors } = useTheme();

    const [ledgers, setLedgers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [voucherType, setVoucherType] = useState(1);
    const [narration, setNarration] = useState('');
    const [rows, setRows] = useState([
        { ledgerId: 0, debit: '0', credit: '0', note: '' },
        { ledgerId: 0, debit: '0', credit: '0', note: '' }
    ]);

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
        fetchLedgers();
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowValue.value
    }));

    const fetchLedgers = async () => {
        setLoading(true);
        try {
            const data = await apiService.getLedgers();
            setLedgers(data || []);
            if (!data || data.length === 0) {
                Alert.alert('Registry Warning', 'No active ledger nodes detected. Fiscal registry initialization required.');
            }
        } catch (error) {
            console.error('Failed to load ledgers', error);
            Alert.alert('Network Protocol Error', 'Failed to synchronize with ledger registry.');
        } finally {
            setLoading(false);
        }
    };

    const addRow = () => {
        setRows([...rows, { ledgerId: 0, debit: '0', credit: '0', note: '' }]);
    };

    const removeRow = (index: number) => {
        if (rows.length <= 2) return;
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const updateRow = (index: number, field: string, value: string | number) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        
        // Smart Balancing Logic
        if (index === 0 && field === 'debit' && rows.length >= 2 && rows[1].credit === '0' && rows[1].debit === '0') {
            newRows[1] = { ...newRows[1], credit: value.toString() };
        } else if (index === 0 && field === 'credit' && rows.length >= 2 && rows[1].debit === '0' && rows[1].credit === '0') {
            newRows[1] = { ...newRows[1], debit: value.toString() };
        }
        
        setRows(newRows);
    };

    const calculateTotals = () => {
        const drTotal = rows.reduce((sum, row) => sum + (parseFloat(row.debit) || 0), 0);
        const crTotal = rows.reduce((sum, row) => sum + (parseFloat(row.credit) || 0), 0);
        return { drTotal, crTotal };
    };

    const handleSubmit = async () => {
        const { drTotal, crTotal } = calculateTotals();
        
        if (drTotal === 0 || crTotal === 0) {
            Alert.alert('Protocol Error', 'Debit and Credit amounts must be greater than zero.');
            return;
        }

        if (drTotal !== crTotal) {
            Alert.alert('Balance Mismatch', `Debit ($${drTotal}) does not align with Credit ($${crTotal}). Balance required.`);
            return;
        }

        if (rows.some(r => r.ledgerId === 0)) {
            Alert.alert('Identity Missing', 'All registry rows must be assigned to an active ledger node.');
            return;
        }

        const payload = {
            date: new Date().toISOString(),
            type: voucherType,
            narration: narration || 'Digital fiscal entry',
            rows: rows.map(r => ({
                ledgerId: r.ledgerId,
                debit: parseFloat(r.debit) || 0,
                credit: parseFloat(r.credit) || 0,
                note: r.note || ''
            }))
        };

        setLoading(true);
        try {
            await apiService.createVoucher(payload);
            Alert.alert('Protocol Success', 'Fiscal record has been synchronized with the main ledger.');
            router.back();
        } catch (error) {
            console.error('Submission error', error);
            Alert.alert('Sync Failure', 'Failed to commit record to the central registry.');
        } finally {
            setLoading(false);
        }
    };

    const { drTotal, crTotal } = calculateTotals();
    const isBalanced = drTotal > 0 && drTotal === crTotal;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View style={[styles.bgGlow, { backgroundColor: colors.primaryGlow }, glowStyle]} />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                {/* Header */}
                <Animated.View entering={FadeIn.duration(800)} style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                        <View style={[styles.backBtnBg, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        <ArrowLeft color={colors.primary} size={28} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Voucher Forge</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Initialize Fiscal Record</Text>
                    </View>
                    <TouchableOpacity 
                        style={[styles.saveBtn, { opacity: loading ? 0.6 : 1 }]} 
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <View style={[styles.backBtnBg, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30', borderWidth: 1 }]} />
                        {loading ? <ActivityIndicator size="small" color={colors.primary} /> : <Save color={colors.primary} size={24} />}
                    </TouchableOpacity>
                </Animated.View>

                {loading && ledgers.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={[styles.loadingText, { color: colors.subtitle, marginTop: 16 }]}>SYNCHRONIZING REGISTRY...</Text>
                        <TouchableOpacity onPress={fetchLedgers} style={styles.syncBtn}>
                            <RefreshCcw color={colors.primary} size={16} />
                            <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 10 }}>RE-SYNC LEDGERS</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                        {/* Transaction Balance Summary */}
                        <Animated.View entering={FadeInDown.delay(50).duration(800)} style={[styles.summaryMatrix, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
                            <View style={styles.matrixRow}>
                                <View style={styles.matrixCol}>
                                    <Text style={styles.matrixLabel}>TOTAL DEBIT (DR)</Text>
                                    <Text style={[styles.matrixValue, { color: colors.primary }]}>${drTotal.toLocaleString()}</Text>
                                </View>
                                <View style={[styles.matrixDivider, { backgroundColor: colors.surfaceBorder }]} />
                                <View style={styles.matrixCol}>
                                    <Text style={styles.matrixLabel}>TOTAL CREDIT (CR)</Text>
                                    <Text style={[styles.matrixValue, { color: colors.error }]}>${crTotal.toLocaleString()}</Text>
                                </View>
                            </View>
                            {!isBalanced && drTotal > 0 && (
                                <View style={[styles.balanceError, { backgroundColor: colors.error + '10' }]}>
                                    <Text style={[styles.balanceErrorText, { color: colors.error }]}>MATRIX IMBALANCE: DIFF ${(Math.abs(drTotal - crTotal)).toLocaleString()}</Text>
                                </View>
                            )}
                            {isBalanced && (
                                <View style={[styles.balanceSuccess, { backgroundColor: colors.primary + '10' }]}>
                                    <Text style={[styles.balanceSuccessText, { color: colors.primary }]}>READY TO SYNCHRONIZE</Text>
                                </View>
                            )}
                        </Animated.View>
                        {/* Type Selector */}
                        <Animated.View entering={FadeInDown.delay(100).duration(800)} style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
                            <View style={styles.sectionHeader}>
                                <ArrowUpDown color={colors.primary} size={20} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Protocol Type</Text>
                            </View>
                            <View style={[styles.pickerContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : colors.surface }]}>
                                <Picker
                                    selectedValue={voucherType}
                                    onValueChange={(val) => setVoucherType(val)}
                                    style={{ color: colors.text }}
                                    dropdownIconColor={colors.primary}
                                >
                                    <Picker.Item label="Payment Protocol" value={1} />
                                    <Picker.Item label="Receipt Protocol" value={2} />
                                    <Picker.Item label="Contra Protocol" value={3} />
                                    <Picker.Item label="Journal Protocol" value={4} />
                                </Picker>
                            </View>
                            <View style={styles.idPreview}>
                                <Fingerprint color={colors.primary} size={12} opacity={0.5} />
                                <Text style={[styles.idPreviewText, { color: colors.subtitle }]}>AUTO-ID: {voucherType === 1 ? 'PAY' : voucherType === 2 ? 'REC' : voucherType === 3 ? 'CON' : 'JOU'}-SCANNING...</Text>
                            </View>
                        </Animated.View>

                        {/* Entry Matrix */}
                        <View style={styles.rowsContainer}>
                            <View style={styles.rowsHeader}>
                                <View style={styles.sectionHeader}>
                                    <FileText color={colors.primary} size={20} />
                                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Entry Matrix</Text>
                                </View>
                                <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary + '15' }]} onPress={addRow}>
                                    <Plus color={colors.primary} size={16} />
                                    <Text style={[styles.addBtnText, { color: colors.primary }]}>ADD ROW</Text>
                                </TouchableOpacity>
                            </View>

                            {rows.map((row, index) => (
                                <Animated.View key={index} entering={FadeInDown.delay(200 + index * 100).duration(600)} style={[styles.rowCard, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
                                    <View style={styles.rowTop}>
                                        <View style={[styles.pickerContainerSmall, { flex: 1, backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : colors.surface }]}>
                                            <Picker
                                                selectedValue={row.ledgerId}
                                                onValueChange={(val) => updateRow(index, 'ledgerId', val)}
                                                style={{ color: colors.text }}
                                                dropdownIconColor={colors.primary}
                                            >
                                                <Picker.Item label="Select Ledger..." value={0} />
                                                {(Array.isArray(ledgers) ? ledgers : []).map(l => (
                                                    <Picker.Item key={l.id} label={l.name} value={l.id} />
                                                ))}
                                            </Picker>
                                        </View>
                                        <TouchableOpacity onPress={() => removeRow(index)} style={styles.removeBtn}>
                                            <Trash2 color={colors.error} size={20} opacity={index < 2 ? 0.3 : 1} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.amountGrid}>
                                        <View style={styles.inputBox}>
                                            <Text style={[styles.inputLabel, { color: colors.subtitle }]}>DEBIT (DR)</Text>
                                            <TextInput
                                                style={[styles.smallInput, { color: colors.primary, backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : colors.surface }]}
                                                keyboardType="numeric"
                                                value={row.debit}
                                                onChangeText={(val) => updateRow(index, 'debit', val)}
                                            />
                                        </View>
                                        <View style={styles.inputBox}>
                                            <Text style={[styles.inputLabel, { color: colors.subtitle }]}>CREDIT (CR)</Text>
                                            <TextInput
                                                style={[styles.smallInput, { color: colors.error, backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : colors.surface }]}
                                                keyboardType="numeric"
                                                value={row.credit}
                                                onChangeText={(val) => updateRow(index, 'credit', val)}
                                            />
                                        </View>
                                    </View>

                                    <TextInput
                                        style={[styles.noteInput, { color: colors.text, backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : colors.surface }]}
                                        placeholder="Entry Note..."
                                        placeholderTextColor={colors.subtitle}
                                        value={row.note}
                                        onChangeText={(val) => updateRow(index, 'note', val)}
                                    />
                                </Animated.View>
                            ))}
                        </View>


                        {/* Narration */}
                        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder, marginTop: 20 }]}>
                            <View style={styles.sectionHeader}>
                                <FileText color={colors.primary} size={20} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Final Narration</Text>
                            </View>
                            <TextInput
                                style={[styles.largeInput, { color: colors.text, backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : colors.surface, height: 100 }]}
                                multiline
                                placeholder="Enter fiscal notes or record narration..."
                                placeholderTextColor={colors.subtitle}
                                value={narration}
                                onChangeText={setNarration}
                            />
                        </View>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase' },
    syncBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(59, 130, 246, 0.1)' },
    bgGlow: { position: 'absolute', top: -150, right: -150, width: 400, height: 400, borderRadius: 200, opacity: 0.15 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 20, gap: 16, borderBottomWidth: 1 },
    backBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    saveBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
    backBtnBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 },
    headerTitleContainer: { flex: 1 },
    headerTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.6 },
    content: { paddingHorizontal: 24 },
    section: { padding: 16, borderRadius: 24, borderWidth: 1, marginBottom: 20 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
    sectionTitle: { fontSize: 13, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
    pickerContainer: { borderRadius: 12, overflow: 'hidden' },
    pickerContainerSmall: { borderRadius: 12, overflow: 'hidden', height: 50, justifyContent: 'center' },
    rowsContainer: { marginBottom: 20 },
    rowsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingRight: 4 },
    addBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    addBtnText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
    rowCard: { padding: 16, borderRadius: 24, borderWidth: 1, marginBottom: 16 },
    rowTop: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 12 },
    removeBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    amountGrid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    inputBox: { flex: 1, gap: 6 },
    inputLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    smallInput: { height: 45, borderRadius: 10, paddingHorizontal: 12, fontSize: 15, fontWeight: '800' },
    noteInput: { height: 45, borderRadius: 10, paddingHorizontal: 12, fontSize: 13, fontWeight: '500' },
    largeInput: { borderRadius: 12, padding: 12, fontSize: 14, fontWeight: '500', textAlignVertical: 'top' },
    summaryMatrix: { padding: 20, borderRadius: 24, borderWidth: 1, gap: 12, marginBottom: 20, marginTop: 10 },
    matrixRow: { flexDirection: 'row', alignItems: 'center' },
    matrixCol: { flex: 1, alignItems: 'center', gap: 4 },
    matrixLabel: { fontSize: 9, fontWeight: '900', color: '#71717A', letterSpacing: 1 },
    matrixValue: { fontSize: 18, fontWeight: '900' },
    matrixDivider: { width: 1, height: 30, opacity: 0.5 },
    balanceError: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, alignItems: 'center' },
    balanceErrorText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    balanceSuccess: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, alignItems: 'center' },
    balanceSuccessText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    idPreview: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, opacity: 0.8 },
    idPreviewText: { fontSize: 9, fontWeight: '800', letterSpacing: 1 }
});
