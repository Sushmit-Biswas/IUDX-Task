/**
 * NotificationToast Component
 * Animated toast notification with slide-in/slide-out animation
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, Radius, Typography, Shadows } from '@/constants/theme';
import type { Notification, NotificationType } from '@/lib/notifications';

interface NotificationToastProps {
    notification: Notification;
    onDismiss: (id: string) => void;
    index: number;
}

const iconMap: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
    success: 'checkmark-circle',
    info: 'information-circle',
    warning: 'warning',
    error: 'close-circle',
};

// Solid opaque background colors for better visibility
const solidColors = {
    success: { bg: '#D1FAE5', icon: '#059669', border: '#10B981' },
    warning: { bg: '#FEF3C7', icon: '#D97706', border: '#F59E0B' },
    error: { bg: '#FEE2E2', icon: '#DC2626', border: '#EF4444' },
    info: { bg: '#DBEAFE', icon: '#2563EB', border: '#3B82F6' },
};

const darkSolidColors = {
    success: { bg: '#064E3B', icon: '#34D399', border: '#10B981' },
    warning: { bg: '#78350F', icon: '#FBBF24', border: '#F59E0B' },
    error: { bg: '#7F1D1D', icon: '#F87171', border: '#EF4444' },
    info: { bg: '#1E3A8A', icon: '#60A5FA', border: '#3B82F6' },
};

export function NotificationToast({ notification, onDismiss, index }: NotificationToastProps) {
    const { theme, isDark } = useTheme();
    const [isDismissing, setIsDismissing] = useState(false);
    const translateY = useSharedValue(-100);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);

    const colors = isDark
        ? darkSolidColors[notification.type]
        : solidColors[notification.type];

    // Play haptic feedback on mount
    useEffect(() => {
        // Trigger haptic feedback based on notification type
        const playHaptic = async () => {
            try {
                switch (notification.type) {
                    case 'success':
                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        break;
                    case 'warning':
                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        break;
                    case 'error':
                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                        break;
                    default:
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
            } catch (e) {
                // Haptics not available on web
            }
        };

        playHaptic();

        // Animate in
        translateY.value = withSpring(0, { damping: 18, stiffness: 140 });
        opacity.value = withTiming(1, { duration: 250 });
        scale.value = withSpring(1, { damping: 15, stiffness: 150 });

        // Auto-dismiss with smooth animation after 4 seconds
        const autoDismissTimer = setTimeout(() => {
            // Trigger smooth dismiss animation
            translateY.value = withTiming(-100, { duration: 300 });
            scale.value = withTiming(0.9, { duration: 300 });
            opacity.value = withTiming(0, { duration: 300 }, () => {
                runOnJS(onDismiss)(notification.id);
            });
        }, 4000);

        return () => clearTimeout(autoDismissTimer);
    }, [notification.id, notification.type, onDismiss]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scale: scale.value }
        ],
        opacity: opacity.value,
    }));

    const triggerDismiss = useCallback(() => {
        if (isDismissing) return;
        setIsDismissing(true);

        // Smooth dismiss animation
        translateY.value = withTiming(-100, { duration: 300 });
        scale.value = withTiming(0.9, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(onDismiss)(notification.id);
        });
    }, [isDismissing, notification.id, onDismiss]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: colors.bg,
                    borderLeftColor: colors.border,
                    top: index * 76,
                },
                Shadows.lg,
                animatedStyle,
            ]}
        >
            <Pressable style={styles.content} onPress={triggerDismiss}>
                <View style={[styles.iconContainer, { backgroundColor: colors.border + '20' }]}>
                    <Ionicons name={iconMap[notification.type]} size={22} color={colors.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]} numberOfLines={1}>
                        {notification.title}
                    </Text>
                    {notification.message && (
                        <Text style={[styles.message, { color: isDark ? '#D1D5DB' : '#4B5563' }]} numberOfLines={2}>
                            {notification.message}
                        </Text>
                    )}
                </View>
                <Pressable
                    style={styles.closeButton}
                    onPress={triggerDismiss}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="close" size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
                </Pressable>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: Spacing.md,
        right: Spacing.md,
        borderRadius: Radius.lg,
        borderLeftWidth: 4,
        zIndex: 1000,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: Typography.sizes.sm,
        fontWeight: '600',
        fontFamily: Typography.family.semibold,
    },
    message: {
        fontSize: Typography.sizes.xs,
        fontFamily: Typography.family.regular,
        marginTop: 2,
    },
    closeButton: {
        padding: 4,
    },
});

