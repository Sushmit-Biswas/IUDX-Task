/**
 * ActionBar Component
 * Connection control actions
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

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
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {connectionActive ? (
        <View style={[styles.warningBox, { backgroundColor: theme.warningLight, borderColor: theme.warning }]}>
          <Text style={[styles.warningText, { color: theme.warningText }]}>
            ⚠️ The Connection is active. You can revoke it at any time.
          </Text>
        </View>
      ) : (
        <View style={[styles.warningBox, { backgroundColor: theme.dangerLight, borderColor: theme.danger }]}>
          <Text style={[styles.warningText, { color: theme.dangerText }]}>
            🚫 Connection is revoked. No data transactions are possible.
          </Text>
        </View>
      )}

      <View style={styles.buttons}>
        {connectionActive ? (
          <Pressable
            onPress={onRevoke}
            style={[styles.btn, { backgroundColor: theme.danger }]}
          >
            <Text style={styles.btnText}>Revoke Connection</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={onRestore}
            style={[styles.btn, { backgroundColor: theme.success }]}
          >
            <Text style={styles.btnText}>Restore Connection</Text>
          </Pressable>
        )}

        <Pressable
          onPress={onReset}
          style={[styles.btn, styles.resetBtn, { borderColor: theme.border }]}
        >
          <Text style={[styles.resetBtnText, { color: theme.textSecondary }]}>Reset Demo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  warningBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '500',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  resetBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
