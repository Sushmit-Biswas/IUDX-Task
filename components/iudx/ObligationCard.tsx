/**
 * ObligationCard Component
 * Modern card layout for obligations, replacing table rows.
 */

import React from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { StatusBadge } from "./StatusBadge";
import { Spacing, Radius, Typography, Shadows } from "@/constants/theme";
import type { Obligation, Role, Resource } from "@/lib/iudx";
import { Ionicons } from "@expo/vector-icons";

interface ObligationCardProps {
    obligation: Obligation;
    currentRole: Role;
    resources: Resource[];
    connectionActive: boolean;
    onSelectResource: (obligationId: string) => void;
    onViewConsent: (obligationId: string) => void;
    onApprove: (obligationId: string) => void;
    onReject: (obligationId: string) => void;
}

export function ObligationCard({
    obligation,
    currentRole,
    resources,
    connectionActive,
    onSelectResource,
    onViewConsent,
    onApprove,
    onReject,
}: ObligationCardProps) {
    const { theme } = useTheme();

    const isProvider = obligation.providerRole === currentRole;
    const isRequester = obligation.providerRole !== currentRole;

    const resourceName = obligation.selectedResourceId
        ? resources.find(r => r.id === obligation.selectedResourceId)?.name
        : null;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: theme.card,
                    borderColor: theme.borderLight,
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                },
                Shadows.sm,
            ]}
        >
            {/* Header: Name & Status */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
                        {obligation.name}
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={1}>
                        {obligation.transactionType}
                    </Text>
                </View>
                <StatusBadge status={obligation.status} size="small" />
            </View>

            {/* Body: Purpose */}
            <View style={styles.body}>
                <Text style={[styles.label, { color: theme.textTertiary }]}>PURPOSE</Text>
                <Text style={[styles.purpose, { color: theme.textSecondary }]} numberOfLines={2}>
                    {obligation.purpose}
                </Text>
            </View>

            {/* Resource Info (if selected) */}
            {resourceName && (
                <View style={[styles.resourceInfo, { backgroundColor: theme.backgroundSecondary }]}>
                    <Ionicons name="document-text-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.resourceText, { color: theme.textSecondary }]} numberOfLines={1}>
                        {resourceName}
                    </Text>
                </View>
            )}

            {/* Actions */}
            <View style={styles.footer}>
                {/* Provider Actions */}
                {isProvider && obligation.status === "Pending" && connectionActive && (
                    <Pressable
                        onPress={() => onSelectResource(obligation.id)}
                        style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
                    >
                        <Text style={styles.btnText}>Select Resource</Text>
                        <Ionicons name="arrow-forward" size={16} color="white" />
                    </Pressable>
                )}

                {/* Requester Actions (View/Approve/Reject) */}
                <View style={styles.actionRow}>
                    {obligation.consentArtefact && (
                        <Pressable
                            onPress={() => onViewConsent(obligation.id)}
                            style={[styles.secondaryBtn, { borderColor: theme.border }]}
                        >
                            <Text style={[styles.secondaryBtnText, { color: theme.textSecondary }]}>View Consent</Text>
                        </Pressable>
                    )}

                    {isRequester && obligation.status === "Fulfilled" && connectionActive && (
                        <View style={styles.decisionBtns}>
                            <Pressable
                                onPress={() => onApprove(obligation.id)}
                                style={[styles.decisionBtn, { backgroundColor: theme.successBg }]}
                            >
                                <Ionicons name="checkmark" size={18} color={theme.success} />
                            </Pressable>
                            <Pressable
                                onPress={() => onReject(obligation.id)}
                                style={[styles.decisionBtn, { backgroundColor: theme.errorBg }]}
                            >
                                <Ionicons name="close" size={18} color={theme.error} />
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: Radius.lg,
        borderWidth: 1,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    titleContainer: {
        flex: 1,
        marginRight: Spacing.sm,
    },
    title: {
        fontSize: Typography.sizes.md,
        fontWeight: '700',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: Typography.sizes.xs,
        fontWeight: '500',
    },
    body: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    purpose: {
        fontSize: Typography.sizes.sm,
        lineHeight: 20,
    },
    resourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.sm,
        borderRadius: Radius.sm,
        marginBottom: Spacing.md,
        gap: 6,
    },
    resourceText: {
        fontSize: Typography.sizes.xs,
        fontWeight: '500',
    },
    footer: {
        marginTop: Spacing.xs,
    },
    primaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: Radius.md,
        gap: 8,
        width: '100%',
    },
    btnText: {
        color: 'white',
        fontSize: Typography.sizes.sm,
        fontWeight: '600',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    secondaryBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: Radius.md,
    },
    secondaryBtnText: {
        fontSize: Typography.sizes.xs,
        fontWeight: '600',
    },
    decisionBtns: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    decisionBtn: {
        width: 36,
        height: 36,
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
