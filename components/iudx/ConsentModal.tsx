/**
 * ConsentModal Component
 * Modern Consent Artefact Viewer
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, Typography, Shadows } from '@/constants/theme';
import type { ConsentArtefact, Role } from '@/lib/iudx';
import { Ionicons } from '@expo/vector-icons';

interface ConsentModalProps {
  visible: boolean;
  artefact: ConsentArtefact | null;
  currentRole: Role;
  canDecide: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function ConsentModal({
  visible,
  artefact,
  currentRole,
  canDecide,
  onClose,
  onApprove,
  onReject,
}: ConsentModalProps) {
  const { theme } = useTheme();

  if (!artefact) return null;

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={[styles.detailRow, { borderBottomColor: theme.borderLight }]}>
      <Text style={[styles.detailLabel, { color: theme.textTertiary }]}>{label}</Text>
      <Text style={[styles.detailValue, { color: theme.textSecondary }]}>{value}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
        <View style={[styles.container, { backgroundColor: theme.card }, Shadows.lg]}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: theme.text }]}>Consent Artefact</Text>
              <Text style={styles.subtitle}>{artefact.id}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={theme.textTertiary} />
            </Pressable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Critical Info Card */}
            <View style={[styles.infoCard, { backgroundColor: theme.backgroundSecondary }]}>
              <DetailRow label="PURPOSE" value={artefact.purpose} />
              <DetailRow label="RESOURCE" value={artefact.resourceName} />
              <DetailRow label="VALID UNTIL" value={formatDate(artefact.validUntil)} />
            </View>

            {/* Conditions */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Usage Conditions</Text>
              {artefact.conditions.map((condition, index) => (
                <View key={index} style={styles.conditionItem}>
                  <Ionicons name="checkmark-circle" size={16} color={theme.primary} />
                  <Text style={[styles.conditionText, { color: theme.textSecondary }]}>
                    {condition}
                  </Text>
                </View>
              ))}
            </View>

            {/* Parties */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Parties Involved</Text>
              <View style={styles.partiesRow}>
                <View style={styles.party}>
                  <Text style={styles.partyLabel}>PROVIDER</Text>
                  <Text style={[styles.partyValue, { color: theme.text }]}>{artefact.ownerRole}</Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color={theme.textTertiary} />
                <View style={styles.party}>
                  <Text style={styles.partyLabel}>CONSUMER</Text>
                  <Text style={[styles.partyValue, { color: theme.text }]}>{artefact.receiverRole}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={styles.footer}>
            {canDecide && currentRole === artefact.receiverRole ? (
              <View style={styles.decisionRow}>
                <Pressable
                  onPress={onReject}
                  style={[styles.actionBtn, { backgroundColor: theme.errorBg }]}
                >
                  <Ionicons name="close" size={20} color={theme.error} />
                  <Text style={[styles.actionText, { color: theme.error }]}>Reject</Text>
                </Pressable>
                <Pressable
                  onPress={onApprove}
                  style={[styles.actionBtn, { backgroundColor: theme.successBg }]}
                >
                  <Ionicons name="checkmark" size={20} color={theme.success} />
                  <Text style={[styles.actionText, { color: theme.success }]}>Approve</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={onClose}
                style={[styles.closeAction, { backgroundColor: theme.backgroundSecondary }]}
              >
                <Text style={[styles.closeText, { color: theme.text }]}>Close</Text>
              </Pressable>
            )}
          </View>

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
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    marginBottom: Spacing.md,
  },
  infoCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: '500',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  conditionItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: 8,
    alignItems: 'center',
  },
  conditionText: {
    fontSize: Typography.sizes.sm,
    flex: 1,
  },
  partiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  party: {
    alignItems: 'center',
  },
  partyLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 2,
  },
  partyValue: {
    fontWeight: '600',
    fontSize: 12,
  },
  footer: {
    marginTop: Spacing.sm,
  },
  decisionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Radius.full,
    gap: 8,
  },
  actionText: {
    fontWeight: '700',
    fontSize: Typography.sizes.sm,
  },
  closeAction: {
    paddingVertical: 12,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  closeText: {
    fontWeight: '600',
  },
});
