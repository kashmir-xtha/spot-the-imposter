import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import PlayersScreen from '../screens/PlayersScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ImpostersScreen from '../screens/ImpostersScreen';
import RevealScreen from '../screens/RevealScreen';
import DiscussionScreen from '../screens/DiscussionScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
        <Stack.Screen name="Players" component={PlayersScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Imposters" component={ImpostersScreen} />
      </Stack.Group>

      <Stack.Screen
        name="Reveal"
        component={RevealScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Discussion" component={DiscussionScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
