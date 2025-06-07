import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F8FAFC',
  foreground: '#1F2937',
  card: '#FFFFFF',
  cardForeground: '#1F2937',
  primary: '#3B82F6',
  primaryForeground: '#FFFFFF',
  secondary: '#22C55E',
  secondaryForeground: '#FFFFFF',
  muted: '#E5E7EB',
  mutedForeground: '#6B7280',
  accent: '#F3F4F6',
  accentForeground: '#1F2937',
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  border: '#E5E7EB',
  input: '#E5E7EB',
  ring: '#3B82F6',
  success: '#22C55E',
  successForeground: '#FFFFFF',
  successBackground: '#ECFDF5',
  successBorder: '#86EFAC',
  warning: '#F59E0B',
  warningForeground: '#FFFFFF',
  warningBackground: '#FFFBEB',
  warningBorder: '#FCD34D',
  error: '#EF4444',
  errorForeground: '#FFFFFF',
  errorBackground: '#FEF2F2',
  errorBorder: '#FCA5A5',
  info: '#3B82F6',
  infoForeground: '#FFFFFF',
  infoBackground: '#EFF6FF',
  infoBorder: '#93C5FD',
  health: {
    green: '#22C55E',
    greenLight: '#86EFAC',
    greenDark: '#16A34A',
    blue: '#3B82F6',
    blueLight: '#93C5FD',
    blueDark: '#2563EB',
    orange: '#F97316',
    orangeLight: '#FDBA74',
    purple: '#A855F7',
    purpleLight: '#C4B5FD',
    red: '#EF4444'
  },
  gradient: {
    primary: ['#3B82F6', '#22C55E'] as const,
    secondary: ['#FEF3C7', '#FDE68A'] as const,
    success: ['#22C55E', '#16A34A'] as const,
    error: ['#EF4444', '#DC2626'] as const,
    info: ['#3B82F6', '#2563EB'] as const,
    health: ['#22C55E', '#3B82F6'] as const,
    healthLight: ['#86EFAC', '#93C5FD'] as const
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

export const typography = {
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 30,
  },
  '2xl': {
    fontSize: 24,
    lineHeight: 32,
  },
  '3xl': {
    fontSize: 30,
    lineHeight: 36,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export const animations = {
  fadeIn: {
    from: {
      opacity: 0,
      transform: [{ translateY: 10 }],
    },
    to: {
      opacity: 1,
      transform: [{ translateY: 0 }],
    },
  },
  bounceGentle: {
    from: {
      transform: [{ translateY: 0 }],
    },
    to: {
      transform: [{ translateY: -5 }],
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography['2xl'],
    color: colors.foreground,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.base,
    color: colors.mutedForeground,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.base,
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.lg,
    color: colors.foreground,
    fontWeight: '600',
  },
  cardContent: {
    gap: spacing.md,
  },
  button: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.base,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...typography.base,
    color: colors.foreground,
  },
  badge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.xs,
    fontWeight: '500',
  },
}); 