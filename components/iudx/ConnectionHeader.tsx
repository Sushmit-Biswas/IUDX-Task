/**
 * ConnectionHeader Component
 * Shows connection info like the reference UI
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { StatusBadge } from './StatusBadge';
import type { Connection, Role } from '@/lib/iudx';

interface ConnectionHeaderProps {
  connection: Connection;
  currentRole: Role;
  onRoleSwitch: () => void;
  onManageConsent?: () => void;
}

export function ConnectionHeader({
  connection,
  currentRole,
  onRoleSwitch,
  onManageConsent,
}: ConnectionHeaderProps) {
  const { theme } = useTheme();
  
  const currentOrg = currentRole === 'HOST' 
    ? connection.host.organization 
    : connection.guest.organization;

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {/* Top row with user badge and connection title */}
      <View style={styles.topRow}>
        <Pressable
          onPress={onRoleSwitch}
          style={[styles.userBadge, { backgroundColor: theme.primary }]}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>{currentOrg.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>Hi, {currentOrg.name}</Text>
        </Pressable>
        
        <View style={styles.connectionInfo}>
          <Text style={[styles.connectionName, { color: theme.text }]} numberOfLines={2}>
            {connection.name}
          </Text>
          <StatusBadge status={connection.status} />
        </View>
      </View>

      {/* Connection details */}
      <View style={[styles.detailsBox, { backgroundColor: theme.backgroundSecondary }]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Connection Name:</Text>
          <Text style={[styles.detailValue, { color: theme.text }]} numberOfLines={1}>
            {connection.name}
          </Text>
          {onManageConsent && connection.status === 'Established' && (
            <Pressable
              onPress={onManageConsent}
              style={[styles.manageBtn, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.manageBtnText}>Manage Consent</Text>
            </Pressable>
          )}
        </View>
        
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {connection.description}
        </Text>

        {/* Party indicators */}
        <View style={styles.partiesRow}>
          <View style={styles.partyItem}>
            <Text style={[styles.partyIcon, { color: theme.textTertiary }]}>Ⓖ</Text>
            <Text style={[styles.partyName, { color: theme.text }]}>
              {connection.guest.organization.name}
            </Text>
            <Text style={[styles.arrow, { color: theme.textTertiary }]}>→</Text>
            <Text style={[styles.partyIcon, { color: theme.textTertiary }]}>Ⓗ</Text>
            <Text style={[styles.partyName, { color: theme.text }]}>
              {connection.host.organization.name}
            </Text>
          </View>
        </View>

        <View style={styles.lockerRow}>
          <Text style={[styles.lockerIcon, { color: theme.textTertiary }]}>🔒</Text>
          <Text style={[styles.lockerText, { color: theme.textSecondary }]}>
            {connection.guest.locker.name}
          </Text>
          <Text style={[styles.arrow, { color: theme.textTertiary }]}>→</Text>
          <Text style={[styles.lockerIcon, { color: theme.textTertiary }]}>🔒</Text>
          <Text style={[styles.lockerText, { color: theme.textSecondary }]}>
            {connection.host.locker.name}
          </Text>
        </View>
      </View>

      {/* Switch role hint */}
      <Text style={[styles.switchHint, { color: theme.textTertiary }]}>
        Tap user badge to switch between Host/Guest view
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    gap: 8,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  connectionInfo: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 8,
  },
  connectionName: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
  },
  detailsBox: {
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  manageBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  manageBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
  },
  partiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  partyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  partyIcon: {
    fontSize: 14,
  },
  partyName: {
    fontSize: 13,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 12,
    marginHorizontal: 4,
  },
  lockerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  lockerIcon: {
    fontSize: 12,
  },
  lockerText: {
    fontSize: 12,
  },
  switchHint: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
