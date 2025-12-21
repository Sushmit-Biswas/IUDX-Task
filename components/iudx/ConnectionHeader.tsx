/**
 * ConnectionHeader Component
 * Bento-Grid style Dashboard for Connection Overview
 * Refactored for cleaner code and better UI/UX
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { StatusBadge } from './StatusBadge';
import { Spacing, Radius, Typography, Shadows } from '@/constants/theme';
import type { Connection, Role } from '@/lib/iudx';
import { Ionicons } from '@expo/vector-icons';

interface ConnectionHeaderProps {
    connection: Connection;
    currentRole: Role;
    pendingCount: number;
    activeCount: number;
    onSwitchRole: () => void;
    onManageConsent: () => void;
}

export function ConnectionHeader({
    connection,
    currentRole,
    pendingCount,
    activeCount,
    onSwitchRole,
    onManageConsent,
}: ConnectionHeaderProps) {
    const { theme } = useTheme();
    // Use a single animated value for the pulse loop
    const pulseAnim = useRef(new Animated.Value(0)).current;

    // Pulse Animation Effect
    useEffect(() => {
        if (connection.status === 'Established') {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            );
            loop.start();
            return () => loop.stop();
        } else {
            pulseAnim.setValue(0);
        }
    }, [connection.status, pulseAnim]);

    const currentOrg = currentRole === 'HOST'
        ? connection.host.organization
        : connection.guest.organization;

    const otherOrg = currentRole === 'HOST'
        ? connection.guest.organization
        : connection.host.organization;

    return (
        <View style={styles.container}>
            {/* Top Row: User Profile & Quick Actions */}
            <View style={[
                styles.profileCard,
                { backgroundColor: theme.primary, borderColor: theme.primary },
                Shadows.md
            ]}>
                <View style={styles.profileInfo}>
                    <View style={styles.avatarRow}>
                        <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Ionicons name="person" size={20} color="#FFFFFF" />
                        </View>
                        <View>
                            <Text style={styles.actingAsLabel}>ACTING AS</Text>
                            <Text style={styles.orgName} numberOfLines={1}>{currentOrg.name}</Text>
                        </View>
                    </View>
                </View>

                <Pressable
                    onPress={onSwitchRole}
                    style={({ pressed }) => [
                        styles.switchBtn,
                        { backgroundColor: 'rgba(255,255,255,0.15)' },
                        pressed && { opacity: 0.8 }
                    ]}
                >
                    <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
                    <Text style={styles.switchBtnText}>Switch Role</Text>
                </Pressable>
            </View>

            {/* Grid: Status & Metrics */}
            <View style={styles.gridRow}>
                {/* Block 2: Connection Status (Animated) */}
                <View style={[styles.statusCard, { backgroundColor: theme.card }, Shadows.sm]}>
                    <Text style={[styles.label, { color: theme.textTertiary }]}>CONNECTION</Text>
                    <Text style={[styles.connName, { color: theme.text }]} numberOfLines={1}>{connection.name}</Text>
                    <View style={styles.statusRow}>
                        <StatusBadge status={connection.status} size="small" />
                        {connection.status === 'Established' && (
                            <Animated.View style={[
                                styles.pulseDotWrapper,
                                {
                                    opacity: pulseAnim.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [0.3, 1, 0.3]
                                    }),
                                    transform: [{
                                        scale: pulseAnim.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [1, 1.2, 1]
                                        })
                                    }]
                                }
                            ]}>
                                <View style={[styles.dot, { backgroundColor: theme.success }]} />
                            </Animated.View>
                        )}
                    </View>
                </View>

                {/* Block 3: Metrics */}
                <View style={[styles.metricsCard, { backgroundColor: theme.card }, Shadows.sm]}>
                    <View style={[styles.metricItem, { borderBottomColor: theme.borderLight, borderBottomWidth: 1 }]}>
                        <Text style={[styles.metricVal, { color: theme.warning }]}>{pendingCount}</Text>
                        <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Pending</Text>
                    </View>
                    <View style={styles.metricItem}>
                        <Text style={[styles.metricVal, { color: theme.success }]}>{activeCount}</Text>
                        <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Active</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.lg,
        gap: Spacing.md,
    },
    // Profile Card (Top)
    profileCard: {
        borderRadius: Radius.lg,
        padding: Spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Spacing.md,
    },
    profileInfo: {
        flex: 1,
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    actingAsLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    orgName: {
        fontSize: Typography.sizes.md,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    switchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14, // Increased padding
        paddingVertical: 10,   // Increased height/padding
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    switchBtnText: {
        fontSize: Typography.sizes.sm,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    // Grid
    gridRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        height: 100, // Fixed height for alignment
    },
    statusCard: {
        flex: 2,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        justifyContent: 'space-between',
    },
    metricsCard: {
        flex: 1,
        borderRadius: Radius.lg,
        flexDirection: 'column',
    },
    metricItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },

    // Shared Styles
    label: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    connName: {
        fontSize: Typography.sizes.sm,
        fontWeight: '600',
        marginBottom: 'auto',
    },
    statusRow: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    pulseDotWrapper: {
        width: 8,
        height: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    metricVal: {
        fontSize: 18,
        fontWeight: '700',
    },
    metricLabel: {
        fontSize: 11,
        fontWeight: '500',
    },
});
