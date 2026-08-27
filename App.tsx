import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/context/GameContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/constants/theme';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.textPrimary,
    border: colors.cardBorder,
    primary: colors.primary,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </GameProvider>
    </SafeAreaProvider>
  );
}
