/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import VisitasScreen from '../screens/VisitasScreen';
import NotificacoesScreen from '../screens/notificacoes';
import MapaScreen from '../screens/mapa';
import PerfilScreen from '../screens/PerfilScreen';

import { TabOneParamList, TabTwoParamList } from '../types';
import { useTheme } from 'react-native-paper';

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Avisos"
        screenOptions={{
          tabBarColor: theme.colors.surface,
        }}
        >
        <BottomTab.Screen
          name="Avisos"
          component={TabNotificacoesNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications-outline" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Visitas"
          component={TabVisitasNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-home-outline" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Mapa"
          component={TabMapaNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-map-outline" color={color} />,
          }}
        />

        <BottomTab.Screen
          name="Perfil"
          component={TabPerfilNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-person-outline" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabNotifcacoesStack = createStackNavigator<TabOneParamList>();

function TabNotificacoesNavigator() {
  return (
    <TabNotifcacoesStack.Navigator>
      <TabNotifcacoesStack.Screen
        name="TabNotificacoesScreen"
        component={NotificacoesScreen}
        options={{ headerTitle: 'Notificações' }}
      />
    </TabNotifcacoesStack.Navigator>
  );
}

const TabVisitasStack = createStackNavigator<TabTwoParamList>();

function TabVisitasNavigator() {
  return (
    <TabVisitasStack.Navigator>
      <TabVisitasStack.Screen
        name="TabVisitasScreen"
        component={VisitasScreen}
        options={{ headerTitle: 'Visitas' }}
      />
    </TabVisitasStack.Navigator>
  );
}

const TabMapaStack = createStackNavigator();

function TabMapaNavigator() {
  return (
    <TabMapaStack.Navigator>
      <TabMapaStack.Screen
        name="TabMapaScreen"
        component={MapaScreen}
        options={{ headerTitle: 'Mapa' }}
      />
    </TabMapaStack.Navigator>
  );
}

const TabPerfilStack = createStackNavigator();

function TabPerfilNavigator() {
  return (
    <TabPerfilStack.Navigator>
      <TabPerfilStack.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{ headerTitle: 'Perfil' }}
      />
    </TabPerfilStack.Navigator>
  );
}
