/**
 * ObligationsList Component
 * List of obligations with staggered fade-in animation.
 * Refactored for smooth performance and no background layout glitches.
 */

import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Animated, Easing } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { ObligationCard } from "./ObligationCard";
import { Spacing, Typography, Radius } from "@/constants/theme";
import type { Obligation, Role, Resource } from "@/lib/iudx";
import { Ionicons } from "@expo/vector-icons";

// Animated Card Wrapper
// Using opacity and translation only on the wrapper view logic to prevent layout shifts/background artifacts
const AnimatedCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            delay: index * 100, // Stagger effect
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)), // Nice bounce effect
        }).start();
    }, [index, animatedValue]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    return (
        <Animated.View
            style={{
                opacity: animatedValue,
                transform: [{ translateY }],
                marginBottom: Spacing.xs, // Ensure spacing is handled outside the card
            }}
        >
            {children}
        </Animated.View>
    );
};

interface ObligationsListProps {
    obligations: Obligation[];
    currentRole: Role;
    resources: Resource[];
    connectionActive: boolean;
    onSelectResource: (obligationId: string) => void;
    onViewConsent: (obligationId: string) => void;
    onApprove: (obligationId: string) => void;
    onReject: (obligationId: string) => void;
}

export function ObligationsList({
    obligations,
    currentRole,
    resources,
    connectionActive,
    onSelectResource,
    onViewConsent,
    onApprove,
    onReject,
}: ObligationsListProps) {
    const { theme } = useTheme();

    if (obligations.length === 0) {
        return (
            <View style={styles.emptyState}>
                <View style={[styles.iconCircle, { backgroundColor: theme.backgroundSecondary }]}>
                    <Ionicons name="documents-outline" size={32} color={theme.textTertiary} />
                </View>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                    No obligations found
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={[styles.listHeader, { color: theme.textSecondary }]}>
                    {currentRole === "HOST" ? "Host" : "Guest"} Obligations
                </Text>
                <View style={[styles.countBadge, { backgroundColor: theme.primaryLight }]}>
                    <Text style={[styles.countText, { color: theme.primary }]}>{obligations.length}</Text>
                </View>
            </View>

            <FlatList
                data={obligations}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <AnimatedCard index={index}>
                        <ObligationCard
                            obligation={item}
                            currentRole={currentRole}
                            resources={resources}
                            connectionActive={connectionActive}
                            onSelectResource={onSelectResource}
                            onViewConsent={onViewConsent}
                            onApprove={onApprove}
                            onReject={onReject}
                        />
                    </AnimatedCard>
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: Spacing.xl,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.xs,
        gap: 8,
    },
    listHeader: {
        fontSize: Typography.sizes.xs,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    countBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: Radius.full,
    },
    countText: {
        fontSize: 10,
        fontWeight: '700',
    },
    listContent: {
        // Gap is handled by the marginBottom in AnimatedCard to avoid animation clipping issues often caused by gap in FlatList
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    emptyText: {
        fontSize: Typography.sizes.sm,
        fontWeight: '500',
    },
});
