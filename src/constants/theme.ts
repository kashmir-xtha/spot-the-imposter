/**
 * Central design tokens for "Find the Imposter".
 * Derived from the reference screenshots: near-black background,
 * dark navy/gray cards, subtle borders, red primary actions,
 * purple/indigo reveal card, white headings, muted gray secondary text.
 */

export const colors = {
  // Backgrounds
  background: '#0A0A0D',
  backgroundElevated: '#0F1015',

  // Cards / surfaces
  card: '#15161D',
  cardAlt: '#191A22',
  cardBorder: '#24252F',
  cardBorderStrong: 'rgba(239, 68, 68, 0.35)',

  // Text
  textPrimary: '#F5F5F7',
  textSecondary: '#9497A6',
  textMuted: '#6B6E7D',

  // Brand / actions
  primary: '#EF4444',
  primaryDark: '#B91C1C',
  primaryDisabled: '#5A2323',
  primaryPressed: '#DC2626',

  // Imposter / danger accents
  danger: '#FF6161',
  dangerBg: 'rgba(239, 68, 68, 0.12)',
  dangerBorder: 'rgba(239, 68, 68, 0.4)',

  // Success / innocent
  success: '#4ADE80',
  successBg: 'rgba(74, 222, 128, 0.12)',

  // Purple reveal gradient
  gradientStart: '#3730A3',
  gradientMid: '#4C1D95',
  gradientEnd: '#6D28D9',

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.6)',
  chipBg: '#191A22',
  chipBgSelected: '#EF4444',
  chipBorder: '#2A2B36',
  divider: '#22232C',
  gold: '#F5B942',
  silver: '#C7C9D3',
  bronze: '#D08A52',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const fontSizes = {
  xs: 12,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  display: 34,
  jumbo: 44,
};

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  heavy: '800' as const,
};

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  button: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 1.5,
};
