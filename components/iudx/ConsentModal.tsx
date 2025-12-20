/**
 * ConsentModal Component
 * Consent artefact viewer with approve/reject actions
 */

import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import type { ConsentArtefact, Role } from '@/lib/iudx';

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
    <View style={[styles.detailRow, { borderBottomColor: theme.border }]}>
      <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.detailValue, { color: theme.text }]}>{value}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>Consent Artefact</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={[styles.closeText, { color: theme.textSecondary }]}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Details */}
            <DetailRow label="ARTEFACT ID" value={artefact.id} />
            <DetailRow label="CONNECTION" value={artefact.connectionId} />
            <DetailRow label="OWNER (LOCKER)" value={artefact.ownerRole} />
            <DetailRow label="RECEIVER" value={artefact.receiverRole} />
            <DetailRow label="PURPOSE" value={artefact.purpose} />
            <DetailRow label="RESOURCE" value={artefact.resourceName} />
            <DetailRow label="VALID FROM" value={formatDate(artefact.validFrom)} />
            <DetailRow label="VALID UNTIL" value={formatDate(artefact.validUntil)} />

            {/* Conditions */}
            <View style={styles.conditionsSection}>
              <Text style={[styles.conditionsTitle, { color: theme.text }]}>Conditions</Text>
              {artefact.conditions.map((condition, index) => (
                <View key={index} style={styles.conditionItem}>
                  <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
                  <Text style={[styles.conditionText, { color: theme.textSecondary }]}>
                    {condition}
                  </Text>
                </View>
              ))}
            </View>

            {/* Note */}
            <View style={[styles.note, { backgroundColor: theme.primaryLight, borderLeftColor: theme.primary }]}>
              <Text style={[styles.noteText, { color: theme.textSecondary }]}>
                Note: This artefact is a permission slip, not the actual file. The data stays in the owner&apos;s Locker; only a reference/token is transacted.
              </Text>
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={[styles.actions, { borderTopColor: theme.border }]}>
            <Pressable
              onPress={onClose}
              style={[styles.btn, { backgroundColor: theme.backgroundSecondary }]}
            >
              <Text style={[styles.btnText, { color: theme.textSecondary }]}>Close</Text>
            </Pressable>

            {canDecide && currentRole === artefact.receiverRole && (
              <>
                <Pressable
                  onPress={onReject}
                  style={[styles.btn, { backgroundColor: theme.danger }]}
                >
                  <Text style={[styles.btnText, { color: '#FFFFFF' }]}>Reject</Text>
                </Pressable>
                <Pressable
                  onPress={onApprove}
                  style={[styles.btn, { backgroundColor: theme.success }]}
                >
                  <Text style={[styles.btnText, { color: '#FFFFFF' }]}>Approve</Text>
                </Pressable>
              </>
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
    padding: 20,
  },
  card: {
    borderRadius: 16,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  conditionsSection: {
    marginTop: 20,
  },
  conditionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 22,
  },
  conditionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  note: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
