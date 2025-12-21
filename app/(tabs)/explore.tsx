/**
 * IUDX Semantics Screen
 * Documentation and explanation of the system
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export default function SemanticsScreen() {
  const { theme } = useTheme();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      {children}
    </View>
  );

  const Bullet = ({ children }: { children: string }) => (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletPoint, { color: theme.primary }]}>•</Text>
      <Text style={[styles.bulletText, { color: theme.textSecondary }]}>{children}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>IUDX System Semantics</Text>
        <Text style={[styles.pageSubtitle, { color: theme.textSecondary }]}>
          Understanding the consent-driven data sharing architecture
        </Text>

        <Section title="1. Locker">
          <Bullet>A user&apos;s secure data container</Bullet>
          <Bullet>Owns files and metadata</Bullet>
          <Bullet>A user can have multiple lockers</Bullet>
          <Bullet>All resources belong to exactly one locker</Bullet>
        </Section>

        <Section title="2. Connection">
          <Bullet>A logical link between two lockers</Bullet>
          <Bullet>Defines who can access whose data</Bullet>
          <Bullet>No data flows without an active connection</Bullet>
          <Bullet>Can be revoked by either party at any time</Bullet>
          <Bullet>Contains obligations defining data sharing requirements</Bullet>
        </Section>

        <Section title="3. Consent Artefact">
          <Bullet>A permission slip granted by the data owner</Bullet>
          <Bullet>Always belongs to one locker (owner) and one connection (receiver)</Bullet>
          <Bullet>Specifies what data is shared</Bullet>
          <Bullet>Specifies for what purpose</Bullet>
          <Bullet>Specifies for how long</Bullet>
          <Bullet>Specifies under what conditions</Bullet>
          <Bullet>NOT the actual data - just the permission to access it</Bullet>
        </Section>

        <Section title="Data Flow State Machine">
          <View style={[styles.flowBox, { backgroundColor: theme.backgroundSecondary }]}>
            <Text style={[styles.flowStep, { color: theme.text }]}>
              1. <Text style={{ color: theme.warning }}>Pending</Text> → Provider selects resource
            </Text>
            <Text style={[styles.flowStep, { color: theme.text }]}>
              2. <Text style={{ color: theme.primary }}>Fulfilled</Text> → Consent artefact generated
            </Text>
            <Text style={[styles.flowStep, { color: theme.text }]}>
              3. <Text style={{ color: theme.success }}>Approved</Text> / <Text style={{ color: theme.danger }}>Rejected</Text> → Requester decides
            </Text>
          </View>
        </Section>

        <Section title="Key Principle">
          <View style={[styles.principleBox, { backgroundColor: theme.primaryLight, borderLeftColor: theme.primary }]}>
            <Text style={[styles.principleText, { color: theme.text }]}>
              &quot;No data flows without an active Connection&quot;
            </Text>
            <Text style={[styles.principleSubtext, { color: theme.textSecondary }]}>
              When a connection is revoked, all data sharing actions are immediately disabled. 
              Only viewing existing consent artefacts remains possible.
            </Text>
          </View>
        </Section>

        <Section title="Demo Implementation">
          <Bullet>Host: LIC Insurance (Insurance Provider)</Bullet>
          <Bullet>Guest: Kaveri Hospital (Healthcare Provider)</Bullet>
          <Bullet>Connection: Health records ↔ Insurance claims</Bullet>
          <Bullet>Mock data only - no actual file uploads</Bullet>
          <Bullet>Consent artefacts are permission slips, not files</Bullet>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 16,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  flowBox: {
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  flowStep: {
    fontSize: 14,
    fontWeight: '500',
  },
  principleBox: {
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
  },
  principleText: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  principleSubtext: {
    fontSize: 14,
    lineHeight: 20,
  },
});
