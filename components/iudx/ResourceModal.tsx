/**
 * ResourceModal Component
 * Modern Modal for selecting resources
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, Typography, Shadows } from '@/constants/theme';
import type { Resource } from '@/lib/iudx';
import { Ionicons } from '@expo/vector-icons';

interface ResourceModalProps {
  visible: boolean;
  title: string;
  resources: Resource[];
  onSelect: (resourceId: string) => void;
  onCancel: () => void;
}

export function ResourceModal({
  visible,
  title,
  resources,
  onSelect,
  onCancel,
}: ResourceModalProps) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
        <View style={[styles.container, { backgroundColor: theme.card }, Shadows.lg]}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Pressable onPress={onCancel} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={theme.textTertiary} />
            </Pressable>
          </View>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Select a resource from your locker to fulfill this obligation.
          </Text>

          {/* Resource List */}
          <FlatList
            data={resources}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onSelect(item.id)}
                style={({ pressed }) => [
                  styles.resourceItem,
                  {
                    borderColor: theme.border,
                    backgroundColor: pressed ? theme.backgroundSecondary : 'transparent',
                  }
                ]}
              >
                <View style={[styles.iconBox, { backgroundColor: theme.primaryLight }]}>
                  <Ionicons name="document-text" size={20} color={theme.primary} />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.resourceName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.resourceType, { color: theme.textSecondary }]}>{item.type}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
              </Pressable>
            )}
          />

          {/* Footer */}
          <Pressable
            onPress={onCancel}
            style={[styles.cancelBtn, { backgroundColor: theme.backgroundSecondary }]}
          >
            <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.md,
  },
  container: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: '700',
    flex: 1,
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    marginBottom: Spacing.lg,
  },
  listContent: {
    gap: Spacing.sm,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
    marginBottom: 2,
  },
  resourceType: {
    fontSize: 12,
  },
  cancelBtn: {
    marginTop: Spacing.lg,
    paddingVertical: 12,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '600',
  },
});
