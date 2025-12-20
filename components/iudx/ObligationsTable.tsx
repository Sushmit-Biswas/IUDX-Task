/**
 * ObligationsTable Component
 * Table-style layout matching the reference UI
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { StatusBadge } from './StatusBadge';
import type { Obligation, Role, Resource } from '@/lib/iudx';

interface ObligationsTableProps {
  obligations: Obligation[];
  currentRole: Role;
  resources: Resource[];
  connectionActive: boolean;
  onSelectResource: (obligationId: string) => void;
  onViewConsent: (obligationId: string) => void;
  onApprove: (obligationId: string) => void;
  onReject: (obligationId: string) => void;
}

export function ObligationsTable({
  obligations,
  currentRole,
  resources,
  connectionActive,
  onSelectResource,
  onViewConsent,
  onApprove,
  onReject,
}: ObligationsTableProps) {
  const { theme } = useTheme();

  const getResourceName = (resourceId: string | null) => {
    if (!resourceId) return '—';
    const resource = resources.find(r => r.id === resourceId);
    return resource?.name || '—';
  };

  const isProvider = (obl: Obligation) => obl.providerRole === currentRole;
  const isRequester = (obl: Obligation) => obl.providerRole !== currentRole;

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {currentRole === 'HOST' ? 'Host' : 'Guest'} Obligations
      </Text>

      {/* Table Header */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={[styles.headerRow, { backgroundColor: theme.backgroundSecondary }]}>
            <Text style={[styles.headerCell, styles.snoCol, { color: theme.textSecondary }]}>SNO</Text>
            <Text style={[styles.headerCell, styles.nameCol, { color: theme.textSecondary }]}>NAME</Text>
            <Text style={[styles.headerCell, styles.purposeCol, { color: theme.textSecondary }]}>PURPOSE</Text>
            <Text style={[styles.headerCell, styles.typeCol, { color: theme.textSecondary }]}>TYPE OF DATA TRANSACTION</Text>
            <Text style={[styles.headerCell, styles.dataCol, { color: theme.textSecondary }]}>ENTER DATA</Text>
            <Text style={[styles.headerCell, styles.consentCol, { color: theme.textSecondary }]}>CONSENT ARTEFACT</Text>
            <Text style={[styles.headerCell, styles.statusCol, { color: theme.textSecondary }]}>STATUS</Text>
          </View>

          {/* Table Body */}
          {obligations.map((obl) => (
            <View key={obl.id} style={[styles.row, { borderBottomColor: theme.border }]}>
              <Text style={[styles.cell, styles.snoCol, { color: theme.text }]}>{obl.sno}</Text>
              <Text style={[styles.cell, styles.nameCol, { color: theme.text }]}>{obl.name}</Text>
              <Text style={[styles.cell, styles.purposeCol, { color: theme.textSecondary }]}>{obl.purpose}</Text>
              <Text style={[styles.cell, styles.typeCol, { color: theme.textSecondary }]}>{obl.transactionType}</Text>
              
              {/* Enter Data Column */}
              <View style={[styles.cell, styles.dataCol]}>
                {obl.selectedResourceId && (
                  <Text style={[styles.resourceLink, { color: theme.primary }]}>
                    {getResourceName(obl.selectedResourceId)}
                  </Text>
                )}
                {isProvider(obl) && obl.status === 'Pending' && connectionActive && (
                  <Pressable
                    onPress={() => onSelectResource(obl.id)}
                    style={[styles.actionBtn, { backgroundColor: theme.primary }]}
                  >
                    <Text style={styles.actionBtnText}>Select Resource</Text>
                  </Pressable>
                )}
              </View>

              {/* Consent Artefact Column */}
              <View style={[styles.cell, styles.consentCol]}>
                {obl.consentArtefact && (
                  <Pressable
                    onPress={() => onViewConsent(obl.id)}
                    style={[styles.viewBtn, { backgroundColor: theme.warning }]}
                  >
                    <Text style={styles.viewBtnText}>View</Text>
                  </Pressable>
                )}
              </View>

              {/* Status Column */}
              <View style={[styles.cell, styles.statusCol]}>
                {isRequester(obl) && obl.status === 'Fulfilled' && connectionActive ? (
                  <View style={styles.statusActions}>
                    <Pressable
                      onPress={() => onApprove(obl.id)}
                      style={[styles.approveBtn, { backgroundColor: theme.success }]}
                    >
                      <Text style={styles.statusBtnText}>Approve</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => onReject(obl.id)}
                      style={[styles.rejectBtn, { backgroundColor: theme.danger }]}
                    >
                      <Text style={styles.statusBtnText}>Reject</Text>
                    </Pressable>
                  </View>
                ) : (
                  <StatusBadge status={obl.status} size="small" />
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    padding: 16,
    paddingBottom: 12,
  },
  table: {
    minWidth: 800,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cell: {
    fontSize: 13,
    paddingHorizontal: 4,
  },
  snoCol: { width: 50 },
  nameCol: { width: 150 },
  purposeCol: { width: 200 },
  typeCol: { width: 120 },
  dataCol: { width: 150, gap: 6 },
  consentCol: { width: 100 },
  statusCol: { width: 120 },
  resourceLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  viewBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  statusActions: {
    gap: 4,
  },
  approveBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  rejectBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});
