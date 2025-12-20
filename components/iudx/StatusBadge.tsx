/**
 * StatusBadge Component
 * Clean, professional status indicator matching the reference UI
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import type { ConnectionStatus, ObligationStatus } from '@/lib/iudx';

type Status = ConnectionStatus | ObligationStatus;

interface StatusBadgeProps {
  status: Status;
  size?: 'small' | 'medium';
}

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const { theme } = useTheme();
  
  const getColors = () => {
    switch (status) {
      case 'Established':
      case 'Approved':
        return {
          bg: theme.successLight,
          text: theme.successText,
          border: theme.success,
        };
      case 'Pending':
        return {
          bg: theme.warningLight,
          text: theme.warningText,
          border: theme.warning,
        };
      case 'Fulfilled':
        return {
          bg: theme.primaryLight,
          text: theme.primary,
          border: theme.primary,
        };
      case 'Rejected':
      case 'Revoked':
        return {
          bg: theme.dangerLight,
          text: theme.dangerText,
          border: theme.danger,
        };
      default:
        return {
          bg: theme.backgroundSecondary,
          text: theme.textSecondary,
          border: theme.border,
        };
    }
  };

  const colors = getColors();
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingHorizontal: isSmall ? 8 : 12,
          paddingVertical: isSmall ? 3 : 5,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: isSmall ? 11 : 12,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
