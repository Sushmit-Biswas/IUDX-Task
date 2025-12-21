/**
 * Connection Hub Screen
 * Main screen for IUDX consent-driven data sharing demo
 */

import React, { useReducer, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  View,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import {
  ConnectionHeader,
  TabSelector,
  ObligationsList,
  ResourceModal,
  ConsentModal,
  ActionBar,
} from "@/components/iudx";
import {
  getInitialConnection,
  connectionReducer,
  type Role,
  type Obligation,
} from "@/lib/iudx";
import { Spacing } from "@/constants/theme";

type TabKey = "shared" | "received";

export default function ConnectionHubScreen() {
  const { theme } = useTheme();

  // State management
  const [connection, dispatch] = useReducer(
    connectionReducer,
    null,
    getInitialConnection
  );
  const [currentRole, setCurrentRole] = useState<Role>("HOST");
  const [activeTab, setActiveTab] = useState<TabKey>("shared");
  const [refreshing, setRefreshing] = useState(false);

  // Modal state
  const [resourceModalObligation, setResourceModalObligation] = useState<
    string | null
  >(null);
  const [consentModalObligation, setConsentModalObligation] = useState<
    string | null
  >(null);

  // Derived data
  const currentParty =
    currentRole === "HOST" ? connection.host : connection.guest;
  const partnerParty =
    currentRole === "HOST" ? connection.guest : connection.host;

  // Filter obligations based on current view
  const getFilteredObligations = (): Obligation[] => {
    if (activeTab === "shared") {
      // Show obligations where current role is provider (sharing data)
      return connection.obligations.filter(
        (o) => o.providerRole === currentRole
      );
    } else {
      // Show obligations where current role is receiver (receiving data)
      return connection.obligations.filter(
        (o) => o.providerRole !== currentRole
      );
    }
  };

  // Get resources for the provider's locker
  const getProviderResources = (obligation: Obligation) => {
    const provider =
      obligation.providerRole === "HOST" ? connection.host : connection.guest;
    return provider.locker.resources;
  };

  // Event handlers
  const handleRoleSwitch = useCallback(() => {
    setCurrentRole((prev) => (prev === "HOST" ? "GUEST" : "HOST"));
  }, []);

  const handleSelectResource = useCallback(
    (obligationId: string, resourceId: string) => {
      dispatch({ type: "SELECT_RESOURCE", obligationId, resourceId });
      setResourceModalObligation(null);
    },
    []
  );

  const handleApprove = useCallback((obligationId: string) => {
    dispatch({ type: "APPROVE_CONSENT", obligationId });
    setConsentModalObligation(null);
  }, []);

  const handleReject = useCallback((obligationId: string) => {
    dispatch({ type: "REJECT_CONSENT", obligationId });
    setConsentModalObligation(null);
  }, []);

  const handleRevoke = useCallback(() => {
    dispatch({ type: "REVOKE_CONNECTION" });
  }, []);

  const handleRestore = useCallback(() => {
    dispatch({ type: "RESTORE_CONNECTION" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  // Current modal data
  const resourceObligation = resourceModalObligation
    ? connection.obligations.find((o) => o.id === resourceModalObligation)
    : null;

  const consentObligation = consentModalObligation
    ? connection.obligations.find((o) => o.id === consentModalObligation)
    : null;

  const tabs = [
    { key: "shared", label: `Shared by me` },
    { key: "received", label: `From ${partnerParty.organization.name}` },
  ];

  const filteredObligations = getFilteredObligations();
  const allResources = [
    ...currentParty.locker.resources,
    ...partnerParty.locker.resources,
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
        }
      >
        {/* Connection Header (Bento Grid) */}
        <ConnectionHeader
          connection={connection}
          currentRole={currentRole}
          onRoleSwitch={handleRoleSwitch}
        />

        {/* Connection Actions (Modernized) */}
        <ActionBar
          connectionActive={connection.status === "Established"}
          onRevoke={handleRevoke}
          onRestore={handleRestore}
          onReset={handleReset}
        />

        {/* Tab Navigation (Segmented Control) */}
        <TabSelector
          tabs={tabs}
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key as TabKey)}
        />

        {/* Obligations List (Replaces Table) */}
        <ObligationsList
          obligations={filteredObligations}
          currentRole={currentRole}
          resources={allResources}
          connectionActive={connection.status === "Established"}
          onSelectResource={(id) => setResourceModalObligation(id)}
          onViewConsent={(id) => setConsentModalObligation(id)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </ScrollView>

      {/* Resource Selection Modal */}
      {resourceObligation && (
        <ResourceModal
          visible={!!resourceModalObligation}
          title={`Select Resource for ${resourceObligation.name}`}
          resources={getProviderResources(resourceObligation)}
          onSelect={(resourceId) =>
            handleSelectResource(resourceObligation.id, resourceId)
          }
          onCancel={() => setResourceModalObligation(null)}
        />
      )}

      {/* Consent Artefact Modal */}
      {consentObligation && (
        <ConsentModal
          visible={!!consentModalObligation}
          artefact={consentObligation.consentArtefact}
          currentRole={currentRole}
          canDecide={
            consentObligation.status === "Fulfilled" &&
            connection.status === "Established"
          }
          onClose={() => setConsentModalObligation(null)}
          onApprove={() => handleApprove(consentObligation.id)}
          onReject={() => handleReject(consentObligation.id)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});
