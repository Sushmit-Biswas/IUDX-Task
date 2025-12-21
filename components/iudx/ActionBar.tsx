/**
 * ActionBar Component
 * Connection control actions - Modernized
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, Typography, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface ActionBarProps {
  connectionActive: boolean;
  onRevoke: () => void;
  onRestore: () => void;
  onReset: () => void;
}

export function ActionBar({
  connectionActive,
  onRevoke,
  onRestore,
  onReset,
}: ActionBarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }, Shadows.sm]}>

      {/* Status Banner */}
      <View
        style={[
          styles.banner,
          {
            backgroundColor: connectionActive ? theme.warningBg : theme.errorBg,
            // borderColor: connectionActive ? theme.warning : theme.error
          }
        ]}
      >
        <Ionicons
          name={connectionActive ? "information-circle" : "alert-circle"}
          size={20}
          color={connectionActive ? theme.warning : theme.error}
        />
        <Text style={[styles.bannerText, { color: connectionActive ? theme.warning : theme.error }]}>
          {connectionActive
            ? "Connection is active & secure."
            : "Connection revoked. Data flow paused."}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Pressable
          onPress={connectionActive ? onRevoke : onRestore}
          style={[
            styles.btn,
            { backgroundColor: connectionActive ? theme.error : theme.success }
          ]}
        >
          <Ionicons
            name={connectionActive ? "power" : "refresh"}
            size={16}
            color="white"
          />
          <Text style={styles.btnText}>
            {connectionActive ? "Revoke Connection" : "Restore Connection"}
          </Text>
        </Pressable>

        <Pressable
          onPress={onReset}
          style={[styles.resetBtn, { borderColor: theme.border }]}
        >
          <Text style={[styles.resetBtnText, { color: theme.textSecondary }]}>Reset Demo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  bannerText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  btn: {
    flex: 2,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
  },
});
