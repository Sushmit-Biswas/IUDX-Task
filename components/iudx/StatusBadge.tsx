/**
 * StatusBadge Component
 * Modern Pill Design
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, Typography } from '@/constants/theme';
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
          bg: theme.successBg,
          text: theme.success,
        };
      case 'Pending':
        return {
          bg: theme.warningBg,
          text: theme.warning,
        };
      case 'Fulfilled':
        return {
          bg: theme.primaryLight,
          text: theme.primary,
        };
      case 'Rejected':
      case 'Revoked':
        return {
          bg: theme.errorBg,
          text: theme.error,
        };
      default:
        return {
          bg: theme.borderLight,
          text: theme.textSecondary,
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
          paddingHorizontal: isSmall ? Spacing.sm : Spacing.md,
          paddingVertical: isSmall ? 2 : 6,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: isSmall ? 11 : Typography.sizes.xs,
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
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
