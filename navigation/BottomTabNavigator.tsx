/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import VisitasScreen from '../screens/visitas/VisitasScreen';
import NotificacoesScreen from '../screens/notificacoes';
import MapaScreen from '../screens/mapa';
import PerfilScreen from '../screens/PerfilScreen';

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
const TabNotifcacoesStack = createStackNavigator();

function TabNotificacoesNavigator() {
  return (
    <TabNotifcacoesStack.Navigator>
      <TabNotifcacoesStack.Screen
        name="TabNotificacoesScreen"
        component={NotificacoesScreen}
        options={{ headerTitle: 'Notifica????es' }}
      />
    </TabNotifcacoesStack.Navigator>
  );
}

const TabVisitasStack = createStackNavigator();

function TabVisitasNavigator() {
  return (
    <TabVisitasStack.Navigator>
      <TabVisitasStack.Screen
        name="TabVisitasScreen"
        component={VisitasScreen}
        options={{ headerTitle: 'Visitas' }}
      />
      {/* <TabVisitasStack.Screen
        name="FormularioVisitasScreen"
        component={FormularioVisitaScreen}
        options={{ headerTitle: 'Formul??rio de Visita' }}
      /> */}
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
