/**
 * IUDX App Color System
 * Professional color palette with proper light/dark mode support
 */

export const palette = {
  // Primary brand colors
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  
  // Success colors
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  
  // Warning colors
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  // Danger colors
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  // Neutral grays
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Slate (blue-gray)
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

export const lightTheme = {
  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: palette.gray[50],
  backgroundTertiary: palette.gray[100],
  
  // Card backgrounds
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  
  // Text colors
  text: palette.slate[900],
  textSecondary: palette.slate[600],
  textTertiary: palette.slate[400],
  textInverse: '#FFFFFF',
  
  // Border colors
  border: palette.gray[200],
  borderLight: palette.gray[100],
  borderFocus: palette.primary[500],
  
  // Interactive elements
  primary: palette.primary[600],
  primaryLight: palette.primary[50],
  primaryText: '#FFFFFF',
  
  // Status colors
  success: palette.success[600],
  successLight: palette.success[50],
  successText: palette.success[800],
  
  warning: palette.warning[500],
  warningLight: palette.warning[50],
  warningText: palette.warning[800],
  
  danger: palette.danger[600],
  dangerLight: palette.danger[50],
  dangerText: palette.danger[800],
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  // Backgrounds
  background: palette.slate[900],
  backgroundSecondary: palette.slate[800],
  backgroundTertiary: palette.slate[700],
  
  // Card backgrounds
  card: palette.slate[800],
  cardElevated: palette.slate[700],
  
  // Text colors
  text: palette.slate[50],
  textSecondary: palette.slate[300],
  textTertiary: palette.slate[400],
  textInverse: palette.slate[900],
  
  // Border colors
  border: palette.slate[600],
  borderLight: palette.slate[700],
  borderFocus: palette.primary[400],
  
  // Interactive elements
  primary: palette.primary[500],
  primaryLight: palette.primary[900],
  primaryText: '#FFFFFF',
  
  // Status colors
  success: palette.success[500],
  successLight: palette.success[900],
  successText: palette.success[300],
  
  warning: palette.warning[500],
  warningLight: palette.warning[900],
  warningText: palette.warning[300],
  
  danger: palette.danger[500],
  dangerLight: palette.danger[900],
  dangerText: palette.danger[300],
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export type Theme = typeof lightTheme;
