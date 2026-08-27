import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import DiscussionCard from '../components/DiscussionCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fontSizes, fontWeights, letterSpacing, radius, spacing } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Discussion'>;

const DEFAULT_SECONDS = 2 * 60;

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function DiscussionScreen({ navigation }: Props) {
  const { endGame } = useGame();
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleEndGame = () => {
    endGame();
    // `replace`, not `navigate` — see the comment in RevealScreen's
    // handleStartDiscussion for why: "Results" can already be further back
    // in the stack after a Play Again loop, and `navigate` would silently
    // reuse that old, already-mounted screen instead of a fresh one.
    navigation.replace('Results');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <DiscussionCard
          timeLabel={formatTime(secondsLeft)}
          isRunning={isRunning}
          onToggleRunning={() => setIsRunning((r) => !r)}
          onAddTime={() => setSecondsLeft((s) => s + 30)}
        />

        <View style={styles.centerWrap}>
          <View style={styles.micBadge}>
            <Ionicons name="mic" size={30} color={colors.danger} />
          </View>
          <Text style={styles.title}>Hint Round</Text>
          <Text style={styles.description}>
            Discuss amongst yourselves. The imposter must blend in.{'\n'}
            Everyone else, try to find the liar!
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="END GAME" icon="flag" onPress={handleEndGame} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xxxl,
  },
  micBadge: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    backgroundColor: colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.danger,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
