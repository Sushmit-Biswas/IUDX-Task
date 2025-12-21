/**
 * IUDX Domain Types
 * Core type definitions for the consent-driven data sharing system
 */

export type Role = 'HOST' | 'GUEST';

export type ConnectionStatus = 'Established' | 'Pending' | 'Revoked';

export type ObligationStatus = 'Pending' | 'Fulfilled' | 'Approved' | 'Rejected';

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
