/**
 * IUDX Connection Reducer
 * Manages state transitions for the consent flow
 */

import type { Connection, ConnectionAction, ConsentArtefact } from './types';
import { getInitialConnection } from './data';

function generateConsentArtefact(
  connection: Connection,
  obligationId: string,
  resourceId: string
): ConsentArtefact {
  const obligation = connection.obligations.find(o => o.id === obligationId)!;
  const providerRole = obligation.providerRole;
  const receiverRole = providerRole === 'HOST' ? 'GUEST' : 'HOST';
  
  const provider = providerRole === 'HOST' ? connection.host : connection.guest;
  const resource = provider.locker.resources.find(r => r.id === resourceId)!;
  
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setMonth(validUntil.getMonth() + 1);

  return {
    id: `ca-${obligationId}-${Date.now()}`,
    connectionId: connection.id,
    obligationId,
    ownerRole: providerRole,
    receiverRole,
    purpose: obligation.purpose,
    resourceId,
    resourceName: resource.name,
    validFrom: now.toISOString(),
    validUntil: validUntil.toISOString(),
    conditions: [
      'Data will be used only for the stated purpose',
      'Data must not be shared with third parties',
      'Access expires after the validity period',
      'Data owner can revoke consent at any time',
    ],
    createdAt: now.toISOString(),
  };
}

export function connectionReducer(
  state: Connection,
  action: ConnectionAction
): Connection {
  switch (action.type) {
    case 'SELECT_RESOURCE': {
      if (state.status !== 'Established') return state;
      
      return {
        ...state,
        obligations: state.obligations.map(obl => {
          if (obl.id !== action.obligationId) return obl;
          if (obl.status !== 'Pending') return obl;
          
          const consentArtefact = generateConsentArtefact(
            state,
            action.obligationId,
            action.resourceId
          );
          
          return {
            ...obl,
            selectedResourceId: action.resourceId,
            status: 'Fulfilled' as const,
            consentArtefact,
          };
        }),
      };
    }
    
    case 'APPROVE_CONSENT': {
      if (state.status !== 'Established') return state;
      
      return {
        ...state,
        obligations: state.obligations.map(obl => {
          if (obl.id !== action.obligationId) return obl;
          if (obl.status !== 'Fulfilled') return obl;
          
          return { ...obl, status: 'Approved' as const };
        }),
      };
    }
    
    case 'REJECT_CONSENT': {
      if (state.status !== 'Established') return state;
      
      return {
        ...state,
        obligations: state.obligations.map(obl => {
          if (obl.id !== action.obligationId) return obl;
          if (obl.status !== 'Fulfilled') return obl;
          
          return { ...obl, status: 'Rejected' as const };
        }),
      };
    }
    
    case 'REVOKE_CONNECTION': {
      return { ...state, status: 'Revoked' as const };
    }
    
    case 'RESTORE_CONNECTION': {
      return { ...state, status: 'Established' as const };
    }
    
    case 'RESET': {
      return getInitialConnection();
    }
    
    default:
      return state;
  }
}
