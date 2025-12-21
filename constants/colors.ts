/**
 * IUDX App Color System
 * Refined 'Deep Blue' palette for a premium, trustworthy mobile experience.
 */

export const palette = {
  // Premium Deep Blue (Primary)
  primary: {
    50: '#F0F5FF',
    100: '#E0EAFF',
    200: '#C7D9FE',
    300: '#A4C2FC',
    400: '#609AF8',
    500: '#3B82F6', // Standard Blue
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#0F172A', // Deep Navy
  },

  // Vibrant Accent (Teal/Cyan)
  accent: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
  },

  // Semantic Colors
  success: {
    bg: '#ECFDF5',
    text: '#047857',
    border: '#A7F3D0',
    icon: '#10B981',
  },
  warning: {
    bg: '#FFFBEB',
    text: '#B45309',
    border: '#FDE68A',
    icon: '#F59E0B',
  },
  error: {
    bg: '#FEF2F2',
    text: '#B91C1C',
    border: '#FECACA',
    icon: '#EF4444',
  },

  // Neutral / Grayscale (Cool Tones)
  gray: {
    white: '#FFFFFF',
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
  // Base
  background: '#FDFDFD', // Slightly warmer white instead of gray[50]
  backgroundSecondary: palette.gray[50], // Added back for compatibility
  card: palette.gray.white,

  // Typography - Softened from 900/0F172A
  text: palette.gray[800], // #1E293B (Softer Navy)
  textSecondary: palette.gray[600], // #475569
  textTertiary: palette.gray[400],
  textInverse: palette.gray.white,

  // Accents - Using 600 instead of 900 for Primary to be brighter/friendlier
  primary: palette.primary[600], // #2563EB (Bright Royal Blue)
  primaryLight: palette.primary[50],
  tint: palette.primary[500],

  // Borders
  border: palette.gray[200],
  borderLight: palette.gray[100],

  // Semantic
  success: palette.success.text,
  successBg: palette.success.bg,
  warning: palette.warning.text,
  warningBg: palette.warning.bg,
  error: palette.error.text,
  errorBg: palette.error.bg,
};

export const darkTheme = {
  // Base
  background: '#020617', // Very dark slate
  backgroundSecondary: '#0F172A', // Deep navy
  card: '#0F172A', // Deep navy card

  // Typography
  text: palette.gray[50],
  textSecondary: palette.gray[400],
  textTertiary: palette.gray[500],
  textInverse: palette.gray[900],

  // Accents
  primary: palette.primary[400], // Lighter blue for dark mode
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  tint: palette.primary[400],

  // Borders
  border: '#1E293B',
  borderLight: '#334155',

  // Semantic
  success: '#34D399',
  successBg: 'rgba(6, 95, 70, 0.3)',
  warning: '#FBBF24',
  warningBg: 'rgba(146, 64, 14, 0.3)',
  error: '#F87171',
  errorBg: 'rgba(153, 27, 27, 0.3)',
};

export type Theme = typeof lightTheme;
