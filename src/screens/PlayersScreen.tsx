import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame, MAX_PLAYERS, MIN_PLAYERS } from '../context/GameContext';
import PlayerCounter from '../components/PlayerCounter';
import PrimaryButton from '../components/PrimaryButton';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacing,
  radius,
  spacing,
} from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Players'>;

export default function PlayersScreen({ navigation }: Props) {
  const { state, setPlayerCount, setPlayerName } = useGame();
  const { playerCount, playerNames } = state.settings;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>PLAYERS</Text>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="close" size={26} color={colors.textSecondary} />
          </Pressable>
        </View>

        <PlayerCounter
          value={playerCount}
          onIncrement={() => setPlayerCount(playerCount + 1)}
          onDecrement={() => setPlayerCount(playerCount - 1)}
          min={MIN_PLAYERS}
          max={MAX_PLAYERS}
        />

        <Text style={styles.listLabel}>PLAYER NAMES (OPTIONAL)</Text>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {playerNames.map((name, index) => (
            <View style={styles.inputRow} key={index}>
              <View style={styles.indexBadge}>
                <Text style={styles.indexBadgeText}>{index + 1}</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={(text) => setPlayerName(index, text)}
                placeholder={`Player ${index + 1}`}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                returnKeyType="done"
                maxLength={20}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label="Done" onPress={() => navigation.goBack()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  flex: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
  },
  listLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  indexBadgeText: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    paddingVertical: spacing.md,
  },
  footer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
