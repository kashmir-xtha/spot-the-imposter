import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAvatarById } from '../data/avatars';
import { colors } from '../constants/theme';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<Size, { box: number; emoji: number; ring: number }> = {
  sm: { box: 36, emoji: 18, ring: 2 },
  md: { box: 52, emoji: 26, ring: 2 },
  lg: { box: 84, emoji: 42, ring: 3 },
  xl: { box: 108, emoji: 54, ring: 3 },
};

type Props = {
  avatarId: string;
  size?: Size;
  highlighted?: boolean;
};

export default function AvatarDisplay({ avatarId, size = 'md', highlighted = false }: Props) {
  const avatar = getAvatarById(avatarId);
  const dims = SIZE_MAP[size];

  return (
    <View
      style={[
        styles.circle,
        {
          width: dims.box,
          height: dims.box,
          borderRadius: dims.box / 2,
          borderWidth: dims.ring,
          borderColor: highlighted ? avatar.color : colors.cardBorder,
          backgroundColor: colors.cardAlt,
        },
      ]}
    >
      <Text style={{ fontSize: dims.emoji }}>{avatar.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
