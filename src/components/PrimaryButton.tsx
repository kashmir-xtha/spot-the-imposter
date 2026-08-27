import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, fontWeights, letterSpacing, radius, shadows, spacing } from '../constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  variant?: Variant;
  fullWidth?: boolean;
};

export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  fullWidth = true,
}: Props) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isGhost && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon && iconPosition === 'left' && !loading ? (
          <Ionicons
            name={icon}
            size={18}
            color={isPrimary ? colors.white : colors.textPrimary}
            style={styles.iconLeft}
          />
        ) : null}
        {loading ? (
          <ActivityIndicator color={isPrimary ? colors.white : colors.textPrimary} />
        ) : (
          <Text
            style={[
              styles.label,
              isPrimary && styles.labelPrimary,
              isGhost && styles.labelGhost,
              disabled && styles.labelDisabled,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
        {icon && iconPosition === 'right' && !loading ? (
          <Ionicons
            name={icon}
            size={18}
            color={isPrimary ? colors.white : colors.textPrimary}
            style={styles.iconRight}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.button,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.primaryDisabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  label: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    letterSpacing: letterSpacing.wide,
  },
  labelPrimary: {
    color: colors.white,
  },
  labelGhost: {
    color: colors.textSecondary,
    fontWeight: fontWeights.semibold,
  },
  labelDisabled: {
    color: 'rgba(255,255,255,0.55)',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
});
