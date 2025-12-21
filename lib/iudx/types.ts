/**
 * IUDX Domain Types
 * Core type definitions for the consent-driven data sharing system
 */

/**
 * Defines the role of a participant in the data exchange.
 * - HOST: Typically the data provider (e.g., Hospital).
 * - GUEST: Typically the data consumer (e.g., Insurance Company).
 */
export type Role = 'HOST' | 'GUEST';

export type ConnectionStatus = 'Established' | 'Pending' | 'Revoked';

export type ObligationStatus = 'Pending' | 'Fulfilled' | 'Approved' | 'Rejected';

/**
 * Defines how the data is exchanged.
 * - share: One-time file transfer.
 * - stream: Continuous data stream.
 * - query: API-based query access.
 */
export type TransactionType = 'share' | 'stream' | 'query';

export interface Organization {
  id: string;
  name: string;
  type: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text' | 'json';
  size: string;
}

export interface Locker {
  id: string;
  name: string;
  owner: Organization;
  resources: Resource[];
}

/**
 * Represents a specific data sharing requirement or agreement line item.
 * Tracks the state of a single resource request from pending to approved/rejected.
 */
export interface Obligation {
  id: string;
  sno: number;
  name: string;
  purpose: string;
  transactionType: TransactionType;
  status: ObligationStatus;
  providerRole: Role;
  selectedResourceId: string | null;
  consentArtefact: ConsentArtefact | null;
}

/**
 * The digital contract generated once a resource is selected.
 * Contains the terms, validity, and purpose of the data share.
 */
export interface ConsentArtefact {
  id: string;
  connectionId: string;
  obligationId: string;
  ownerRole: Role;
  receiverRole: Role;
  purpose: string;
  resourceId: string;
  resourceName: string;
  validFrom: string;
  validUntil: string;
  conditions: string[];
  createdAt: string;
}

/**
 * The root aggregate representing the entire relationship between two parties.
 * Contains the nested structure of organizations, lockers, and obligations.
 */
export interface Connection {
  id: string;
  name: string;
  description: string;
  status: ConnectionStatus;
  host: {
    organization: Organization;
    locker: Locker;
  };
  guest: {
    organization: Organization;
    locker: Locker;
  };
  obligations: Obligation[];
}

export type ConnectionAction =
  | { type: 'SELECT_RESOURCE'; obligationId: string; resourceId: string }
  | { type: 'APPROVE_CONSENT'; obligationId: string }
  | { type: 'REJECT_CONSENT'; obligationId: string }
  | { type: 'REVOKE_CONNECTION' }
  | { type: 'RESTORE_CONNECTION' }
  | { type: 'RESET' };
