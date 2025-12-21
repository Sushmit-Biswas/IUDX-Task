/**
 * IUDX Mock Data
 * Sample data matching the reference UI structure
 */

import type { Connection } from './types';

/**
 * Mock Data Resources
 * 
 * Used to simulate files in the organization's secure locker.
 * In a real app, these would be fetched from a Resource Server (RS).
 */

// Kaveri Hospital's resources (Guest)
const kaveriResources = [
  { id: 'kr-1', name: 'Insurance Claim Receipt', type: 'pdf' as const, size: '620 KB' },
  { id: 'kr-2', name: 'Chest X-Ray Report', type: 'image' as const, size: '3.4 MB' },
  { id: 'kr-3', name: 'CBC Blood Test Report', type: 'pdf' as const, size: '980 KB' },
  { id: 'kr-4', name: 'Treatment Summary', type: 'text' as const, size: '12 KB' },
  { id: 'kr-5', name: 'Patient Medical History', type: 'pdf' as const, size: '1.2 MB' },
];

// LIC Insurance's resources (Host)
const licResources = [
  { id: 'lr-1', name: 'Policy Document #A2024', type: 'pdf' as const, size: '2.1 MB' },
  { id: 'lr-2', name: 'Claim Form Template', type: 'pdf' as const, size: '340 KB' },
  { id: 'lr-3', name: 'Coverage Details', type: 'text' as const, size: '28 KB' },
  { id: 'lr-4', name: 'Premium Payment Receipt', type: 'pdf' as const, size: '156 KB' },
];

/**
 * Initial Connection State
 * 
 * Defines the starting point of the demo scenario:
 * - A connection is "Established" between Kaveri Hospital and LIC Insurance.
 * - Obligations are "Pending", waiting for user action.
 * 
 * This object is deep-copied to reset the state when the user clicks "Reset Demo".
 */
export const initialConnection: Connection = {
  id: 'conn-1',
  name: 'LIC Policy Link',
  description: 'Sharing policy coverage details for cashless treatment authorization.',
  status: 'Established',

  host: {
    organization: {
      id: 'org-lic',
      name: 'LIC Insurance',
      type: 'Insurance Provider',
    },
    locker: {
      id: 'locker-lic',
      name: 'Kaveri Hospital Insurance Claims',
      owner: { id: 'org-lic', name: 'LIC Insurance', type: 'Insurance Provider' },
      resources: licResources,
    },
  },

  guest: {
    organization: {
      id: 'org-kaveri',
      name: 'Kaveri Hospital',
      type: 'Healthcare Provider',
    },
    locker: {
      id: 'locker-kaveri',
      name: 'Health Records Locker',
      owner: { id: 'org-kaveri', name: 'Kaveri Hospital', type: 'Healthcare Provider' },
      resources: kaveriResources,
    },
  },

  // Obligations - matching the reference UI structure
  obligations: [
    {
      id: 'obl-1',
      sno: 1,
      name: 'Insurance Claim Receipt',
      purpose: 'Claiming Insurance for Patient Data',
      transactionType: 'share',
      status: 'Pending',
      providerRole: 'GUEST', // Kaveri provides to LIC
      selectedResourceId: null,
      consentArtefact: null,
    },
    {
      id: 'obl-2',
      sno: 2,
      name: 'Medical Records Request',
      purpose: 'Verification of Treatment History',
      transactionType: 'share',
      status: 'Pending',
      providerRole: 'GUEST', // Kaveri provides to LIC
      selectedResourceId: null,
      consentArtefact: null,
    },
    {
      id: 'obl-3',
      sno: 3,
      name: 'Policy Coverage Information',
      purpose: 'Patient Coverage Verification',
      transactionType: 'share',
      status: 'Pending',
      providerRole: 'HOST', // LIC provides to Kaveri
      selectedResourceId: null,
      consentArtefact: null,
    },
  ],
};

export function getInitialConnection(): Connection {
  return JSON.parse(JSON.stringify(initialConnection));
}
