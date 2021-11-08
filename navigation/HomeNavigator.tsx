import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTheme } from 'react-native-paper';

import FormularioVisitaScreen from '../screens/visitas/FormularioVisita';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}/>
      <Stack.Screen
        name="FormularioVisitasScreen"
        component={FormularioVisitaScreen}
        options={
          {
            headerTitle: 'Formulário de Visita',
            headerStyle: { backgroundColor: theme.colors.background },
            headerBackTitleVisible: false
          }
        }/>
    </Stack.Navigator>
  );
}
