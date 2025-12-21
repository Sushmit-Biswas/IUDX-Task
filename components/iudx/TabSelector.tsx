/**
 * TabSelector Component
 * Modern Segmented Control Style
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, Radius, Typography, Shadows } from '@/constants/theme';

interface Tab {
  key: string;
  label: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
}

export function TabSelector({ tabs, activeTab, onChange }: TabSelectorProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[
              styles.tab,
              isActive && styles.activeTab,
              isActive && { backgroundColor: theme.card },
              isActive && Shadows.sm,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive ? theme.primary : theme.textSecondary,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md - 2,
  },
  activeTab: {
    // shadow handled by style prop
  },
  tabText: {
    fontSize: Typography.sizes.sm,
  },
});
