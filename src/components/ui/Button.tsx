import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  children,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  default: {
    backgroundColor: colors.primary,
    height: 40,
    paddingHorizontal: spacing.md,
  },
  destructive: {
    backgroundColor: colors.destructive,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  defaultText: {
    color: colors.primaryForeground,
    ...typography.sm,
  },
  destructiveText: {
    color: colors.destructiveForeground,
  },
  outlineText: {
    color: colors.foreground,
  },
  secondaryText: {
    color: colors.secondaryForeground,
  },
  ghostText: {
    color: colors.foreground,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  sm: {
    height: 36,
    paddingHorizontal: spacing.sm,
  },
  lg: {
    height: 44,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    height: 40,
    width: 40,
  },
  text: {
    ...typography.sm,
    fontWeight: '500',
  },
  smText: {
    ...typography.xs,
  },
  lgText: {
    ...typography.base,
  },
  iconText: {
    ...typography.sm,
  },
}); 