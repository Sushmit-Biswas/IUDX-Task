/**
 * IUDX Semantics Screen
 * Documentation and explanation of the system - Modernized
 */

import React from "react";
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Radius, Spacing, Typography, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SemanticsScreen() {
  const { theme } = useTheme();

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View
      style={[
        styles.section,
        { backgroundColor: theme.card },
        Shadows.sm
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      {children}
    </View>
  );

  const Bullet = ({ children }: { children: string }) => (
    <View style={styles.bulletRow}>
      <Ionicons name="ellipse" size={6} color={theme.primary} style={{ marginTop: 8 }} />
      <Text style={[styles.bulletText, { color: theme.textSecondary }]}>
        {children}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          IUDX System Semantics
        </Text>
        <Text style={[styles.pageSubtitle, { color: theme.textSecondary }]}>
          Understanding the consent-driven data sharing architecture
        </Text>

        <Section title="1. Locker">
          <Bullet>A user's secure data container</Bullet>
          <Bullet>Owns files and metadata</Bullet>
          <Bullet>A user can have multiple lockers</Bullet>
          <Bullet>All resources belong to exactly one locker</Bullet>
        </Section>

        <Section title="2. Connection">
          <Bullet>A logical link between two lockers</Bullet>
          <Bullet>Defines who can access whose data</Bullet>
          <Bullet>No data flows without an active connection</Bullet>
          <Bullet>Can be revoked by either party at any time</Bullet>
          <Bullet>
            Contains obligations defining data sharing requirements
          </Bullet>
        </Section>

        <Section title="3. Consent Artefact">
          <Bullet>A permission slip granted by the data owner</Bullet>
          <Bullet>
            Always belongs to one locker (owner) and one connection (receiver)
          </Bullet>
          <Bullet>Specifies what data is shared</Bullet>
          <Bullet>Specifies for what purpose</Bullet>
          <Bullet>Specifies for how long</Bullet>
          <Bullet>Specifies under what conditions</Bullet>
          <Bullet>
            NOT the actual data - just the permission to access it
          </Bullet>
        </Section>

        <Section title="Data Flow State Machine">
          <View
            style={[
              styles.flowBox,
              { backgroundColor: theme.backgroundSecondary },
            ]}
          >
            <View style={styles.flowStep}>
              <View style={[styles.stepNum, { backgroundColor: theme.warningBg }]}>
                <Text style={[styles.stepText, { color: theme.warning }]}>1</Text>
              </View>
              <Text style={[styles.stepDesc, { color: theme.textSecondary }]}>
                <Text style={{ fontWeight: '700', color: theme.text }}>Pending</Text> → Provider selects resource
              </Text>
            </View>

            <View style={styles.flowLine} />

            <View style={styles.flowStep}>
              <View style={[styles.stepNum, { backgroundColor: theme.primaryLight }]}>
                <Text style={[styles.stepText, { color: theme.primary }]}>2</Text>
              </View>
              <Text style={[styles.stepDesc, { color: theme.textSecondary }]}>
                <Text style={{ fontWeight: '700', color: theme.text }}>Fulfilled</Text> → Consent artefact generated
              </Text>
            </View>

            <View style={styles.flowLine} />

            <View style={styles.flowStep}>
              <View style={[styles.stepNum, { backgroundColor: theme.successBg }]}>
                <Text style={[styles.stepText, { color: theme.success }]}>3</Text>
              </View>
              <Text style={[styles.stepDesc, { color: theme.textSecondary }]}>
                <Text style={{ fontWeight: '700', color: theme.text }}>Decision</Text> → Requester Approve / Reject
              </Text>
            </View>
          </View>
        </Section>

        <Section title="Key Principle">
          <View
            style={[
              styles.principleBox,
              {
                backgroundColor: theme.primaryLight,
                borderLeftColor: theme.primary,
              },
            ]}
          >
            <Text style={[styles.principleText, { color: theme.primary }]}>
              "No data flows without an active Connection"
            </Text>
            <Text
              style={[styles.principleSubtext, { color: theme.textSecondary }]}
            >
              When a connection is revoked, all data sharing actions are
              immediately disabled. Only viewing existing consent artefacts
              remains possible.
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
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  pageTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: "700",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: Typography.sizes.sm,
    marginBottom: Spacing.lg,
  },
  section: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
  flowBox: {
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  flowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
  },
  stepDesc: {
    fontSize: Typography.sizes.sm,
    flex: 1,
  },
  flowLine: {
    height: 16,
    width: 1,
    backgroundColor: '#E2E8F0',
    marginLeft: 11.5,
    marginVertical: 4,
  },
  principleBox: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
  },
  principleText: {
    fontSize: Typography.sizes.md,
    fontWeight: "700",
    fontStyle: "italic",
    marginBottom: 8,
  },
  principleSubtext: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
});
