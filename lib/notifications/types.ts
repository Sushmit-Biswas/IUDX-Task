/**
 * Notification Types
 * Type definitions for in-app toast notifications
 */

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  timestamp: number;
}

export interface NotificationConfig {
  duration?: number; // Auto-dismiss duration in ms (default: 4000)
}
