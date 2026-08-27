import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSizes, fontWeights, letterSpacing, radius, shadows, spacing } from '../constants/theme';

type Props = {
  revealed: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

export default function RevealCard({ revealed, onPress, children }: Props) {
  const contentAnim = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (revealed) {
      contentAnim.setValue(0);
      Animated.spring(contentAnim, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }).start();
    }
  }, [revealed, contentAnim]);

  const handlePressIn = () => {
    Animated.spring(pressScale, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
  };

  if (revealed) {
    return (
      <Animated.View
        style={{
          opacity: contentAnim,
          transform: [
            {
              scale: contentAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.92, 1],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: pressScale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, shadows.glow]}
        >
          <View style={styles.lockCircle}>
            <Ionicons name="lock-closed" size={26} color="rgba(255,255,255,0.85)" />
          </View>
          <Text style={styles.tapText}>TAP TO REVEAL</Text>
          <Text style={styles.hintText}>Make sure no one else is looking at your screen.</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radius.xl,
  },
  card: {
    borderRadius: radius.xl,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
  },
  lockCircle: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  tapText: {
    color: colors.white,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
    marginBottom: spacing.sm,
  },
  hintText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: fontSizes.sm,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: spacing.md,
  },
});
