/**
 * NotificationContainer Component
 * Renders notification toasts at the top of the screen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationToast } from './NotificationToast';
import { useNotification } from '@/lib/notifications';
import { Spacing } from '@/constants/theme';

export function NotificationContainer() {
    const { notifications, dismissNotification } = useNotification();
    const insets = useSafeAreaInsets();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <View style={[styles.container, { top: insets.top + Spacing.sm }]} pointerEvents="box-none">
            {notifications.map((notification, index) => (
                <NotificationToast
                    key={notification.id}
                    notification={notification}
                    onDismiss={dismissNotification}
                    index={index}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 9999,
    },
});
