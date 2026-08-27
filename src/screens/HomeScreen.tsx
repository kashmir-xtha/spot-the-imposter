import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import GameSettingCard from '../components/GameSettingCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fontSizes, fontWeights, letterSpacing, spacing } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { state, isConfigValid, categoryLabel, startGame } = useGame();
  const { playerCount, imposterCount } = state.settings;

  const handleStart = () => {
    if (!isConfigValid) return;
    startGame();
    navigation.navigate('Reveal');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoEmoji}>🕵️</Text>
        </View>
        <Text style={styles.title}>Find the Imposter</Text>
        <Text style={styles.subtitle}>Pass the phone. Spot the liar.</Text>
      </View>

      <View style={styles.cards}>
        <GameSettingCard
          icon="people-outline"
          title="PLAYERS"
          subtitle={`${playerCount} players`}
          onPress={() => navigation.navigate('Players')}
        />
        <GameSettingCard
          icon="albums-outline"
          title="CATEGORIES"
          subtitle={categoryLabel}
          onPress={() => navigation.navigate('Categories')}
        />
        <GameSettingCard
          icon="person-remove-outline"
          title="IMPOSTERS"
          subtitle={`${imposterCount} Imposter${imposterCount > 1 ? 's' : ''}`}
          onPress={() => navigation.navigate('Imposters')}
        />
      </View>

      <View style={styles.footer}>
        {!isConfigValid ? (
          <Text style={styles.warning}>Select at least one category to continue.</Text>
        ) : null}
        <PrimaryButton
          label="START GAME"
          icon="play"
          onPress={handleStart}
          disabled={!isConfigValid}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoEmoji: {
    fontSize: 30,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.tight,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  cards: {
    flex: 1,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
  warning: {
    color: colors.danger,
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
