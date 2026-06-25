import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, SlideInRight } from 'react-native-reanimated';
import { Contact, ShieldCheck, ChevronLeft, MapPin, Phone, GraduationCap, Grid, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiService } from '@/services/apiService';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function IdCardsScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const data = await apiService.getStudents();
            setStudents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const IdCard = ({ student }: { student: any }) => (
        <Animated.View 
            entering={SlideInRight.duration(800)}
            style={[styles.idCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderColor: colors.primary + '30' }]}
        >
            <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardHeader}
            >
                <View style={styles.headerTop}>
                    <GraduationCap color="#fff" size={24} />
                    <Text style={styles.instName}>EASYEDU ACADEMY</Text>
                </View>
                <Text style={styles.cardType}>STUDENT IDENTIFICATION</Text>
            </LinearGradient>

            <View style={styles.cardContent}>
                <View style={styles.photoContainer}>
                    {student.profilePicture ? (
                        <Image source={{ uri: student.profilePicture }} style={styles.photo} />
                    ) : (
                        <View style={[styles.photoPlaceholder, { backgroundColor: colors.surface }]}>
                            <Contact size={40} color={colors.primary} />
                        </View>
                    )}
                    <View style={[styles.chip, { backgroundColor: colors.accent }]} />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.name, { color: colors.text }]}>{(student.firstName + ' ' + (student.lastName || '')).toUpperCase()}</Text>
                    <Text style={[styles.admissionNo, { color: colors.primary }]}>ID: {student.admissionNumber}</Text>
                    
                    <View style={styles.metaGrid}>
                        <View style={styles.metaItem}>
                            <Grid size={12} color={colors.subtitle} />
                            <Text style={[styles.metaValue, { color: colors.text }]}>{student.class?.name || 'Class N/A'}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Phone size={12} color={colors.subtitle} />
                            <Text style={[styles.metaValue, { color: colors.text }]}>{student.phone || 'N/A'}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <MapPin size={12} color={colors.subtitle} />
                            <Text style={[styles.metaValue, { color: colors.text }]} numberOfLines={1}>{student.address || 'Campus Resident'}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.cardFooter, { backgroundColor: colors.surface }]}>
                <ShieldCheck color={colors.primary} size={16} />
                <Text style={[styles.footerText, { color: colors.subtitle }]}>AUTORIZED INSTITUTIONAL PASS</Text>
                <View style={styles.barcodePlaceholder} />
            </View>
        </Animated.View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                    <ChevronLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Identity Hub</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Digital Identity Management</Text>
                </View>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {loading ? (
                    <ActivityIndicator color={colors.primary} size="large" style={styles.loader} />
                ) : (
                    students.map((student) => <IdCard key={student.id} student={student} />)
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '900',
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        opacity: 0.7,
    },
    scrollContent: {
        padding: 20,
        gap: 24,
    },
    loader: {
        marginTop: 100,
    },
    idCard: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    cardHeader: {
        padding: 15,
        alignItems: 'center',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    instName: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
    cardType: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
    },
    cardContent: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        gap: 20,
    },
    photoContainer: {
        position: 'relative',
    },
    photo: {
        width: 100,
        height: 120,
        borderRadius: 16,
    },
    photoPlaceholder: {
        width: 100,
        height: 120,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        position: 'absolute',
        top: 10,
        right: -5,
        width: 15,
        height: 25,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 4,
    },
    admissionNo: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 12,
    },
    metaGrid: {
        gap: 6,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaValue: {
        fontSize: 11,
        fontWeight: '700',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 20,
        gap: 10,
    },
    footerText: {
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
        flex: 1,
    },
    barcodePlaceholder: {
        width: 60,
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 2,
    }
});
