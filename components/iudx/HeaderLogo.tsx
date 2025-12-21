/**
 * Custom Header Logo Component
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Spacing } from '@/constants/theme';

export function HeaderLogo() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: theme.primaryLight }]}>
        <Ionicons name="shield-checkmark" size={20} color={theme.primary} />
      </View>
      <View>
        <Text style={[styles.title, { color: theme.text, fontFamily: Typography.family.bold }]}>
          IUDX
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary, fontFamily: Typography.family.medium }]}>
          Consent Flow
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconContainer: {
    width: 36, // Increased
    height: 36, // Increased
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20, // Increased
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 12, // Increased
    lineHeight: 14,
    letterSpacing: 0.5,
  },
});
