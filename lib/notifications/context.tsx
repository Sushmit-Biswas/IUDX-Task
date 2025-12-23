/**
 * Notification Context
 * Provides notification state and methods throughout the app
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { Notification, NotificationType, NotificationConfig } from './types';

interface NotificationContextType {
    notifications: Notification[];
    showNotification: (
        type: NotificationType,
        title: string,
        message?: string,
        config?: NotificationConfig
    ) => void;
    dismissNotification: (id: string) => void;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const DEFAULT_DURATION = 4000;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

    const dismissNotification = useCallback((id: string) => {
        // Clear any existing timeout
        const existingTimeout = timeoutRefs.current.get(id);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
            timeoutRefs.current.delete(id);
        }

        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showNotification = useCallback(
        (
            type: NotificationType,
            title: string,
            message?: string,
            config?: NotificationConfig
        ) => {
            const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const notification: Notification = {
                id,
                type,
                title,
                message,
                timestamp: Date.now(),
            };

            setNotifications((prev) => [notification, ...prev].slice(0, 3)); // Max 3 notifications

            // Auto-dismiss
            const duration = config?.duration ?? DEFAULT_DURATION;
            const timeout = setTimeout(() => {
                dismissNotification(id);
            }, duration);
            timeoutRefs.current.set(id, timeout);
        },
        [dismissNotification]
    );

    const clearAll = useCallback(() => {
        // Clear all timeouts
        timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
        timeoutRefs.current.clear();
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider
            value={{ notifications, showNotification, dismissNotification, clearAll }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification(): NotificationContextType {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
