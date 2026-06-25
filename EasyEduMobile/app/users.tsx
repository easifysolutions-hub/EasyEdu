import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, TouchableOpacity, RefreshControl, Alert, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Search, Plus, User, Shield, Lock, Unlock, Mail, Edit2, Trash2, ArrowLeft, Check, X, ShieldCheck, Fingerprint } from 'lucide-react-native';
import { apiService } from '@/services/apiService';
import { authService } from '@/services/authService';
import { useTheme } from '@/contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

export default function UsersScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const [users, setUsers] = useState<any[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);
    
    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        selectedRoles: [] as string[],
        isEnabled: true
    });

    const fetchUsers = async () => {
        try {
            const data = await apiService.getUsers();
            setUsers(data || []);
        } catch (error) {
            console.error('Failed to load users:', error);
            Alert.alert('Protocol Error', 'Failed to synchronize user data.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await apiService.getAvailableRoles();
            setRoles(data || []);
        } catch (error) {
            console.error('Failed to load roles:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        const userData = await authService.getUser();
        setCurrentUser(userData);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUsers();
    }, []);

    const handleOpenModal = (user: any = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                email: user.email,
                fullName: user.fullName,
                password: '', // Password hidden for edit
                selectedRoles: user.roles,
                isEnabled: !user.isLockedOut
            });
        } else {
            setEditingUser(null);
            setFormData({
                email: '',
                fullName: '',
                password: '',
                selectedRoles: [],
                isEnabled: true
            });
        }
        setModalVisible(true);
    };

    const handleSaveUser = async () => {
        if (!formData.email || !formData.fullName || (!editingUser && !formData.password)) {
            Alert.alert('Validation Error', 'Required protocol fields are missing.');
            return;
        }

        try {
            if (editingUser) {
                await apiService.updateUser(editingUser.id, {
                    fullName: formData.fullName,
                    roles: formData.selectedRoles,
                    isEnabled: formData.isEnabled
                });
            } else {
                await apiService.createUser({
                    email: formData.email,
                    fullName: formData.fullName,
                    password: formData.password,
                    roles: formData.selectedRoles
                });
            }
            setModalVisible(false);
            fetchUsers();
            Alert.alert('Sync Success', 'User matrix updated successfully.');
        } catch (error) {
            console.error('Save failed:', error);
            Alert.alert('Sync Failure', 'Failed to update user registry.');
        }
    };

    const handleDeleteUser = (id: string, name: string) => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to permanently delete ${name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await apiService.deleteUser(id);
                            fetchUsers();
                        } catch (error) {
                            Alert.alert('Delete Failed', 'Institutional protocol prevents self-deletion.');
                        }
                    }
                }
            ]
        );
    };

    const toggleRole = (role: string) => {
        const current = [...formData.selectedRoles];
        if (current.includes(role)) {
            setFormData({ ...formData, selectedRoles: current.filter(r => r !== role) });
        } else {
            setFormData({ ...formData, selectedRoles: [...current, role] });
        }
    };

    const filteredUsers = users.filter(u => 
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.surfaceBorder }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft color={colors.primary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Identity Protocols</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>User Management Matrix</Text>
                </View>
                {(currentUser?.roles?.includes('SuperAdmin') || currentUser?.roles?.includes('Admin')) && (
                    <TouchableOpacity style={styles.addBtn} onPress={() => handleOpenModal()} activeOpacity={0.7}>
                        <Plus color={colors.primary} size={24} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Search */}
            <View style={[styles.searchContainer, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
                <Search color={colors.primary} size={20} />
                <TextInput
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholder="Search Identity Registry..."
                    placeholderTextColor={colors.subtitle}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <UserCard 
                            user={item} 
                            index={index} 
                            colors={colors} 
                            onEdit={() => handleOpenModal(item)}
                            onDelete={() => handleDeleteUser(item.id, item.fullName)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                    }
                />
            )}

            {/* Edit/Create Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>
                                {editingUser ? 'Sync Identity' : 'Generate New Identity'}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X color={colors.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.formGroup}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>FULL NAME</Text>
                                <TextInput
                                    style={[styles.input, { color: colors.text, backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}
                                    value={formData.fullName}
                                    onChangeText={val => setFormData({ ...formData, fullName: val })}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>EMAIL ADDRESS</Text>
                                <TextInput
                                    style={[styles.input, { color: colors.text, backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder, opacity: editingUser ? 0.6 : 1 }]}
                                    value={formData.email}
                                    editable={!editingUser}
                                    onChangeText={val => setFormData({ ...formData, email: val })}
                                    keyboardType="email-address"
                                />
                            </View>

                            {!editingUser && (
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>PASSWORD</Text>
                                    <TextInput
                                        style={[styles.input, { color: colors.text, backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}
                                        value={formData.password}
                                        onChangeText={val => setFormData({ ...formData, password: val })}
                                        secureTextEntry
                                    />
                                </View>
                            )}

                            <View style={styles.formGroup}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>PERMISSIONS (ROLES)</Text>
                                <View style={styles.rolesGrid}>
                                    {roles.map(role => (
                                        <TouchableOpacity 
                                            key={role}
                                            style={[
                                                styles.roleChip, 
                                                formData.selectedRoles.includes(role) ? 
                                                { backgroundColor: colors.primary, borderColor: colors.primary } :
                                                { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }
                                            ]}
                                            onPress={() => toggleRole(role)}
                                        >
                                            <Text style={[
                                                styles.roleChipText, 
                                                formData.selectedRoles.includes(role) ? { color: '#fff' } : { color: colors.text }
                                            ]}>
                                                {role}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {editingUser && (
                                <View style={styles.formGroup}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>IDENTITY STATUS</Text>
                                    <TouchableOpacity 
                                        style={[styles.statusToggle, { backgroundColor: formData.isEnabled ? colors.primary + '15' : colors.error + '15' }]}
                                        onPress={() => setFormData({ ...formData, isEnabled: !formData.isEnabled })}
                                    >
                                        {formData.isEnabled ? <Unlock color={colors.primary} size={18} /> : <Lock color={colors.error} size={18} />}
                                        <Text style={[styles.statusToggleText, { color: formData.isEnabled ? colors.primary : colors.error }]}>
                                            {formData.isEnabled ? 'ACCESS ENABLED' : 'ACCESS DENIED (LOCKED)'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>

                        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSaveUser}>
                            <Check color="#fff" size={20} />
                            <Text style={styles.saveBtnText}>COMMIT CHANGES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const UserCard = ({ user, index, colors, onEdit, onDelete }: any) => {
    return (
        <Animated.View entering={FadeInUp.delay(index * 100)} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.surfaceBorder }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                    <User color={colors.primary} size={24} />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={[styles.userName, { color: colors.text }]}>{user.fullName}</Text>
                    <View style={styles.emailRow}>
                        <Mail color={colors.subtitle} size={12} />
                        <Text style={[styles.userEmail, { color: colors.subtitle }]}>{user.email}</Text>
                    </View>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                        <Edit2 color={colors.primary} size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                        <Trash2 color={colors.error} size={18} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.rolesRow, { borderTopColor: colors.surfaceBorder }]}>
                <Shield color={colors.primary} size={14} style={{ marginRight: 8 }} />
                <View style={styles.roleBadges}>
                    {user.roles.map((role: string) => (
                        <View key={role} style={[styles.roleBadge, { backgroundColor: colors.primary + '10' }]}>
                            <Text style={[styles.roleBadgeText, { color: colors.primary }]}>{role}</Text>
                        </View>
                    ))}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: user.isLockedOut ? colors.error + '15' : colors.primary + '10' }]}>
                    <Text style={[styles.statusBadgeText, { color: user.isLockedOut ? colors.error : colors.primary }]}>
                        {user.isLockedOut ? 'DISABLED' : 'ACTIVE'}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, borderBottomWidth: 1 },
    backBtn: { padding: 8 },
    headerTitleContainer: { flex: 1, paddingLeft: 10 },
    headerTitle: { fontSize: 20, fontWeight: '900' },
    headerSubtitle: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
    addBtn: { padding: 8 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 20, paddingHorizontal: 15, height: 50, borderRadius: 15, borderWidth: 1 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontWeight: '600' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { padding: 20, paddingBottom: 40 },
    card: { borderRadius: 20, borderWidth: 1, marginBottom: 15, padding: 15 },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
    cardInfo: { flex: 1, marginLeft: 12 },
    userName: { fontSize: 16, fontWeight: '800' },
    emailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
    userEmail: { fontSize: 12, fontWeight: '500' },
    actionButtons: { flexDirection: 'row', gap: 10 },
    iconBtn: { padding: 8 },
    rolesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1 },
    roleBadges: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    roleBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    roleBadgeText: { fontSize: 9, fontWeight: '800' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 8 },
    statusBadgeText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
    lockIcon: { padding: 4, borderRadius: 6 },
    
    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalContent: { borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, maxHeight: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    modalTitle: { fontSize: 22, fontWeight: '900' },
    modalBody: { marginBottom: 20 },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
    input: { height: 55, borderRadius: 15, borderWidth: 1, paddingHorizontal: 15, fontSize: 15, fontWeight: '700' },
    rolesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    roleChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
    roleChipText: { fontSize: 11, fontWeight: '800' },
    statusToggle: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 15, borderRadius: 15 },
    statusToggleText: { fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
    saveBtn: { height: 55, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
    saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '900' }
});
