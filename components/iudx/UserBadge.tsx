/**
 * UserBadge Component
 * Shows current user identity like in the reference UI
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface UserBadgeProps {
  name: string;
  isActive?: boolean;
}

export function UserBadge({ name, isActive = true }: UserBadgeProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isActive ? theme.primary : theme.backgroundSecondary,
          borderColor: isActive ? theme.primary : theme.border,
        },
      ]}
    >
      <View
        style={[
          styles.avatar,
          { backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : theme.backgroundTertiary },
        ]}
      >
        <Text style={[styles.avatarText, { color: isActive ? '#FFFFFF' : theme.textSecondary }]}>
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={[styles.name, { color: isActive ? '#FFFFFF' : theme.text }]}>
        Hi, {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
});
